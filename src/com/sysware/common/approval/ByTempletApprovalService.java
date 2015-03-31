package com.sysware.common.approval;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.beanutils.PropertyUtils;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;
import com.luck.itumserv.DataCenter.Guid;
import com.luck.itumserv.base.dao.InsitituteDAO;
import com.luck.itumserv.base.flow.Flow;
import com.luck.itumserv.base.flow.FlowActivity;
import com.luck.itumserv.base.flow.FlowActivityRelation;
import com.luck.itumserv.base.flow.FlowActivityVo;
import com.luck.itumserv.base.flow.FlowConstants;
import com.luck.itumserv.base.privilege.DataPrivilegeConstants;
import com.luck.itumserv.entity.Ginstitute;
import com.luck.itumserv.entity.Guser;
import com.luck.itumserv.entity.Task;
import com.luck.itumserv.entity.Tproject;
import com.luck.itumserv.message.messagesystem.MessageSystem;
import com.luck.itumserv.project.ProjectConstants;
import com.luck.itumserv.tasklist.TaskConstants;
import com.sysware.common.approval.exception.CannotFoundApprovalObjectIdException;
import com.sysware.common.approval.exception.CannotFoundComponentException;
import com.sysware.common.approval.exception.CannotFoundExaminerException;
import com.sysware.common.approval.exception.OutOfLockException;
import com.sysware.common.approval.templet.ApprovalTempletActivityVo;
import com.sysware.common.approval.vo.ApprovalCommentVo;
import com.sysware.common.approval.vo.ApprovalInfoVo;
import com.sysware.common.approval.vo.ApprovalVo;
import com.sysware.customize.approvalObject.ApprovalTaskListener;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;
import com.sysware.p2m.engine.Progress;
import com.sysware.util.I18nManager;
import com.sysware.util.StrUtil;

@Name("approval_ByTempletService")
public class ByTempletApprovalService extends BaseApprovalService implements IApprovalService {
	
	@In(create = true, value = "engine_Progress")
	private Progress _progress;

    @In(create = true, value = "engine_ApprovalTaskListener")
    private ApprovalTaskListener approvalTaskListener;
    
	@In(create = true, value = "com_base_dao_InsitituteDAO")
    private InsitituteDAO instsDAO;
	
	/**
	 * 启动前检查第一个节点的审批负责人，反馈给用户进行选择或确认
	 * @param approvalVo.approvalId 审批流程模板id
	 * @param approvalVo.objectID 审批对象id
	 * @return 反馈给用户的信息
	 */
	public String checkBegin(ApprovalVo approvalVo) {
		if(approvalVo.getJudgeInfo() != null) {
			return this.manualJudge(approvalVo.getJudgeInfo());
		}
		JSONObject obj = new JSONObject();
		
		// 准备approvalVo中的参数
		Long templateId = approvalVo.getApprovalId();
		String objectID = approvalVo.getObjectID();

		Guser user = _userSerivce.getUserById(identity.getLoginUser().getUserid().toString());
		// 获取流程模板中的第一个节点
		FlowActivity firstTemplateActivity = this.getTemplateFirstNode(templateId, objectID, user);
		
		// 获取开始流程时的提示信息，虚拟一个开始节点，获取提示信息时，只会用到节点类型
		FlowActivity startActivity = new FlowActivity();
		startActivity.setNodeTypeID("4");
		String startMsg = this.getMsgOfCurActivity(1, startActivity);
		
		// 获取下一个节点确认提示信息
		String nextMsg = this.getMsgOfNextActivity(firstTemplateActivity);
		
		// 获取下一个节点的配置信息（运行参数）
		JSONObject info = this.getConfigInfoOfActivity(firstTemplateActivity, identity.getLoginUser().getInstcode(), identity.getLoginUser().getUserid());
		
		obj.put("success", true);
		obj.put("activityInfo", info);
		obj.put("msg", startMsg + nextMsg);
		
		return obj.toString();
	}
	
	/**
	 * 下一步前，先假设当前审批已经通过或者不通过，获取该节点的完成情况，提示用户，如果有下一个节点，则反馈给用户进行选择或确认
	 * @param ApprovalCommentVo.approvalStatus 审批状态，同意或不同意
	 * @param ApprovalCommentVo.id 审批的id
	 * @param ApprovalCommentVo.examinerType 审批参与人类型（是否为负责人）
	 * @param ApprovalCommentVo.activityInstanceID 流程实例id
	 * @param ApprovalCommentVo.objectId 审批对象id
	 */
	public String checkNext(ApprovalCommentVo vo) {
		if(vo.getJudgeInfo() != null) {
			return this.manualJudge(vo.getJudgeInfo());
		}
		// 根据审批对象获取流程节点实例
		FlowActivity activityInstance = flowActivityDao.get(vo.getActivityInstanceID());
		
		// 模拟当前审批对象，假设该对象通过或者不通过
		Long approvalStatus = vo.getApprovalStatus();
		ApprovalComment comment = new ApprovalComment();
		comment.setId(vo.getId());
		comment.setApprovalStatus(approvalStatus);
		comment.setExaminerType(vo.getExaminerType());

		// 获取该节点所有的审批任务
		List<ApprovalComment> approvalCommentList = this.approvalCommentDao.getCommentByActivityId(vo.getActivityInstanceID());

		// 获取当前审批结束后当前节点的状态
		int isActivityEnd = this.getStateOfInstancedActivity(activityInstance, comment, approvalCommentList);
		
		JSONObject obj = new JSONObject();
		
		// 获取当前节点的完成情况的提示信息
		String curActivityMsg = this.getMsgOfCurActivity(isActivityEnd, activityInstance);
		
		if(isActivityEnd == 1) { // 该节点审批通过
			// 获取流程发起人
			Flow flowInstance = flowDao.get(activityInstance.getFlowID());
			Long starterId = flowInstance.getStarterId();
			Guser user = _userSerivce.getUserById(starterId.toString());
			
			// 获取下一个节点
			FlowActivity nextActivity = this.getTemplateNextNode(activityInstance.getActivityID(), vo.getObjectId(), user);

			// 获取下一个节点确认提示信息
			String nextMsg = this.getMsgOfNextActivity(nextActivity);
			
			// 获取下一个节点的配置信息（运行参数）
			JSONObject info = this.getConfigInfoOfActivity(nextActivity, user.getGinstitute().getInstcode(), starterId);
			
			obj.put("activityInfo", info);
			obj.put("msg", curActivityMsg + nextMsg);
		} else if (isActivityEnd == 2) { // 该节点审批不通过，导致流程终止
			obj.put("msg", curActivityMsg + "您审批结束后，该审批流程将终止！");
		} else if (isActivityEnd == 3) { // 本次审批完成，但该节点还有其他审批任务未完成
			obj.put("msg", curActivityMsg);
		}
		obj.put("success", true);
		return obj.toString();
	}
	
	/**
	 * 用户进行人工判断后继续执行流程流转
	 * @param judgeInfo
	 * @return
	 */
	public String manualJudge(String judgeInfo) {
		JSONObject obj = JSONObject.fromObject(judgeInfo);
		Long activityid = obj.getLong("activityid"); // 判断节点的id
		Long originalindex = obj.getLong("originalindex"); // 用户选择的判断节点出线序号，1是，2否
		
		// 根据用户的选择获取下一个节点
		FlowActivityRelation judgeNextRelation = this.flowActivityRelationDao.getJudgeDestinationRelation(activityid, originalindex).get(0);
		FlowActivity nextActivity = this.flowActivityDao.get(judgeNextRelation.getDestinationActivityID());

		// 获取下一个节点确认提示信息
		String nextMsg = this.getMsgOfNextActivity(nextActivity);

		// 获取下一个节点的配置信息（运行参数）
        Flow flowInstance = flowDao.get(nextActivity.getFlowID());
		JSONObject info = this.getConfigInfoOfActivity(nextActivity, identity.getLoginUser().getInstcode(), flowInstance.getStarterId());
		
		String judgeMsg = "“" + obj.getString("activityname") + "”步骤（判断）您选择了" + (originalindex.equals(1l) ? "“是”" : "“否”") + "。";
		
		obj.put("activityInfo", info);
		obj.put("msg", judgeMsg + nextMsg);
		obj.put("success", true);
		return obj.toString();
	}
	
	/**
	 * 获取当前节点的完成情况提示信息
	 * @param state 当前节点的状态，1为通过，2为不通过，3为需要继续进行
	 * @param curActivity 当前节点
	 * @return
	 */
	public String getMsgOfCurActivity(int state, FlowActivity curActivity) {
		String msg = "";
		String nodeType = curActivity.getNodeTypeID();
		if(state == 1) { // 该节点审批通过，开始节点是一个特殊节点，必定会完成，因此如果获取开始节点的提示信息时，state直接传1
			if(nodeType.equals("4")) { // 开始节点，开始节点必会完成，因此开始节点调用时直接传1，此时返回开始流程的提示信息
				msg = "审批流程即将启动。";
			} else if(nodeType.equals("6")) { // 审批节点
				msg = "本步骤（审批）将通过。";
			} else if(nodeType.equals("7")) { // 评审会签节点
				msg = "本步骤（会签）是否通过取决于所有审批参与人的通过率，您是本步骤（会签）的最后一个参与人，本步骤（会签）通过率最终将高于预订的" + curActivity.getAgreeRate() + "%（通过）。";
			} else if(nodeType.equals("8")) { // 决审会签节点
				msg = "本步骤（会签）是否通过取决于负责人的意见，您是本步骤（会签）的负责人，您将决定本步骤（会签）通过。";
			} else if(nodeType.equals("9")) { // 会审会签节点
				msg = "本步骤（会签）是否通过取决于第一个参与人的意见，您是本步骤（会签）的第一个参与人，您将决定本步骤（会签）通过。";
			}
		} else if(state == 2) { // 该节点审批不通过
			if(nodeType.equals("6")) { // 审批节点
				msg = "本步骤（审批）将不通过。";
			} else if(nodeType.equals("7")) { // 评审会签节点
				msg = "本步骤（会签）是否通过取决于所有审批参与人的通过率，您是本步骤（会签）的最后一个参与人，本步骤（会签）通过率最终将低于预订的" + curActivity.getAgreeRate() + "%（不通过）。";
			} else if(nodeType.equals("8")) { // 决审会签节点
				msg = "本步骤（会签）是否通过取决于负责人的意见，您是本步骤（会签）的负责人，您将决定本步骤（会签）不通过。";
			} else if(nodeType.equals("9")) { // 会审会签节点
				msg = "本步骤（会签）是否通过取决于第一个参与人的意见，您是本步骤（会签）的第一个参与人，您将决定本步骤（会签）不通过。";
			}
		} else if(state == 3) { // 还不能决定该节点是否通过，还需要等待其他参与人的审批，只有评审会签和决审会签会出现这种情况
			if(nodeType.equals("7")) {
				msg = "本步骤（会签）是否通过取决于所有审批参与人的通过率，还有其他参与人未执行审批，您将完成您的审批，完成后还需要等待其他参与人进行审批！";
			} else if(nodeType.equals("8")) {
				msg = "本步骤（会签）是否通过取决于负责人的意见，您不是本步骤（会签）的负责人，您将完成您的审批，完成后还需要等待负责人进行审批！";
			}
		}
		return msg;
	}
	
	/**
	 * 下一个节点的配置信息需要由用户来确认，确认时需要给用户的提示信息
	 * @param nextActivity 下一个节点
	 * @return
	 */
	public String getMsgOfNextActivity(FlowActivity nextActivity) {
		String msg = "";
		String nodeType = nextActivity.getNodeTypeID();
		if(nodeType.equals("5")) { // 结束节点
			msg = "该审批流程将结束！";
		} else if(nodeType.equals("6")) { // 审批节点
			msg = "将会进行“" + nextActivity.getText() + "”步骤（审批），请确认（选择）“" + nextActivity.getText() + "”步骤的审批负责人！";
		} else if(nodeType.equals("7")) { // 评审会签节点
			msg = "将会进行“" + nextActivity.getText() + "”步骤（会签），当通过率达到" + nextActivity.getAgreeRate() + "%时该步骤（会签）将通过，否则不通过，请确认“" + nextActivity.getText() + "”步骤（会签）的审批参与人！";
		} else if(nodeType.equals("8")) { // 决审会签节点
			msg = "将会进行“" + nextActivity.getText() + "”步骤（会签），该步骤（会签）的负责人将决定该步骤（会签）的审批结果，请确认“" + nextActivity.getText() + "”步骤（会签）的审批负责人与参与人！";
		} else if(nodeType.equals("9")) { // 会审会签节点
			msg = "将会进行“" + nextActivity.getText() + "”步骤（会签），第一个进行审批的人将决定该步骤（会签）的审批结果，请确认“" + nextActivity.getText() + "”步骤（会签）的审批参与人！";
		} else if(nodeType.equals("10")) { // 人工判断节点
			msg = "将会进行“" + nextActivity.getText() + "”步骤（判断），请进行选择！";
		}
		return msg;
	}
	
	/**
	 * 获取流程模板节点的配置信息，需要反馈给用户进行选择或者确认
	 * @param activity 流程节点
	 * @param startDepId 提交人部门id，在提交时，没有流程实例，则是当前登陆人的部门id，下一步时，则需要通过流程实例来获取提交人的部门id
	 * @return
	 */
	public JSONObject getConfigInfoOfActivity(FlowActivity activity, String startDepId, Long starterId) {
		// 返回结果
		JSONObject obj = new JSONObject();
		obj.put("activityid", activity.getActivityID());
		obj.put("nodetypeid", activity.getNodeTypeID());
		obj.put("activityname", activity.getText());
		obj.put("agreeRate", activity.getAgreeRate());
		
		// 判断流程实例节点是否可以完成
		if(activity.getNodeTypeID().equals("5")) { // 结束节点
			return obj;
		} else if(activity.getNodeTypeID().equals("10")) { // 人工判断节点
			return obj;
		} else { 
			// 获取流程节点的全部审批对象模板
			List<ApprovalTempletActivityVo> list = this.approvalCommentDao.getApprovalCommentByNode(activity.getActivityID());

			JSONArray array = null;
			if(activity.getNodeTypeID().equals("6")) { // 审批节点
				array = getApprovalNodeConfigInfo(list, activity.getSelectManMode(), startDepId, starterId);
			} else if(activity.getNodeTypeID().equals("7")) { // 评审会签节点
				array = getAgreeRateMeetingApprovalConfigInfo(list);
			} else if(activity.getNodeTypeID().equals("8")) { // 决审会签节点
				array = getExaminerMeetingApprovalConfigInfo(list);
			} else if(activity.getNodeTypeID().equals("9")) { // 会审会签节点
				array = getMeetingApprovalConfigInfo(list);
			}
			obj.put("comments", array);
		}
		return obj;
	}
	
	/**
	 * 获取审批节点的配置信息，需要反馈给用户进行选择或者确认
	 * @param list 审批节点的所有ApprovalComment对象，在审批节点中如果没有配置，则没有该对象，如果配置也只有一个
	 * @param chooseType 当过滤条件过滤出的用户有多个时，确定用户的方式
	 * @param startDepId 流程提交人id
	 * @return
	 */
	public JSONArray getApprovalNodeConfigInfo(List<ApprovalTempletActivityVo> list, Long chooseType, String startDepId, Long starterId) {
		// 最终的返回结果
		JSONObject obj = new JSONObject();
		JSONArray array = new JSONArray();
		
		// 如果没有对该节点的人员进行配置和约束，则返回空，由用户自由选择
		if(list == null || list.size() == 0) {
			obj.put("chargedDepId", "");
			obj.put("chargedDepName", "");
			obj.put("chargedRoleId", "");
			obj.put("chargedRoleName", "");
			obj.put("examiner", "");
			obj.put("examinerName", "");
			array.add(obj);
			return array;
		}
		
		// 审批节点只能有一个ApprovalComment对象，获取到这个对象的配置信息
		ApprovalTempletActivityVo vo = list.get(0);
		Long userid = vo.getUserid();
		String username = vo.getUsername();
		String depid = vo.getDepartmentId();
		String depName = vo.getDepartmentname();
		
		if(depid!=null && depid.equals("-2")) {
            Guser user = _userSerivce.getUserById(starterId.toString());
		    JSONArray userList = new JSONArray();
		    JSONArray userObject = new JSONArray();
            userObject.add(user.getUserid());
            userObject.add(user.getTruename());
            userObject.add(user.getLoginname());
            userList.add(userObject);
            obj.put("userList", userObject);
            obj.put("chargedDepId", "");
            obj.put("chargedDepName", "");
            obj.put("chargedRoleId", "");
            obj.put("chargedRoleName", "");
            obj.put("examiner", starterId);
            obj.put("examinerName", user.getTruename());
            array.add(obj);
            return array;
		}
		
		if(depid!=null && depid.equals("-1")) {
		    depid = startDepId;
			Ginstitute department = ginstituteDAO.selectById(Ginstitute.class, startDepId);
			depName = department.getName();
		}
		
		// 获取该部门的上下级部门
		String queryDepIds = "";
        List<String> ginstituteList = instsDAO.getPriorDepartment(depid);
        for(int i = 0;i<ginstituteList.size();i++){
            String g = ginstituteList.get(i);
            queryDepIds = queryDepIds + g + ",";
        }
        if(ginstituteList.size()>0){
            queryDepIds = queryDepIds.substring(0, queryDepIds.length()-1);
        }
		Long roleid = vo.getRoleId();
		String roleName = vo.getRoleName();
		
		obj.put("chargedDepId", depid);
		obj.put("chargedDepName", depName);
		obj.put("chargedRoleId", roleid);
		obj.put("chargedRoleName", roleName);
		
		// 首先判断配置是否具体到人
		if(userid!=null) { // 如果具体到人，则返回人员让用户确认
		    JSONArray userList = new JSONArray();
            JSONArray userObject = new JSONArray();
            userObject.add(userid);
            userObject.add(username);
            userObject.add(username);
            userList.add(userObject);
            obj.put("userList", userObject);
			obj.put("examiner", userid);
			obj.put("examinerName", username);
		} else { // 如果没有具体到人，则通过过滤条件获取到所有符合条件的人员列表
			// 根据部门、角色获取到对应的人员列表
			List<Guser> users = _userSerivce.queryUserByCondition(queryDepIds,roleid);
			
			if(users == null || users.size() == 0) { // 如果获取到的人员列表为空，说明配置信息有误，抛出异常，提示用户
				throw new CannotFoundExaminerException("没有找到节点的审批人，请联系管理员！");
			} else if(users.size() == 1) { // 如果获取到的人员只有一个，返回人员让用户确认
			    JSONArray userList = new JSONArray();
			    JSONArray userObject = new JSONArray();
                userObject.add(users.get(0).getUserid());
                userObject.add(users.get(0).getTruename());
                userObject.add(users.get(0).getLoginname());
                userList.add(userObject);
                obj.put("userList", userObject);
                obj.put("examiner", users.get(0).getUserid());
                obj.put("examinerName", users.get(0).getTruename());
			} else {
				// 判断人员确认方式（随机或者人工选择）
				if(chooseType.equals(0l)) { // 随机选择，选择完通过用户确认
					int ran = (int) ((Math.random() * 100) % users.size());
					Guser user = users.get(ran);
					JSONArray userList = new JSONArray();
	                JSONArray userObject = new JSONArray();
	                userObject.add(user.getUserid());
	                userObject.add(user.getTruename());
	                userObject.add(user.getLoginname());
	                userList.add(userObject);
	                obj.put("userList", userList);
	                obj.put("examiner", user.getUserid());
	                obj.put("examinerName", user.getTruename());
				}else {
				    // 如果是人工选择，将过滤条件返回给用户，让用户从过滤结果中进行选择，过滤条件有部门和角色，在上边已经放入obj中
				    JSONArray userList = new JSONArray();
				    for(int i=0;i<users.size();i++){
				        Guser user = users.get(i);
				        JSONArray userObject = new JSONArray();
				        userObject.add(user.getUserid());
				        userObject.add(user.getTruename());
				        userObject.add(user.getLoginname());
				        userList.add(userObject);
				    }
				    obj.put("userList", userList);
				}
			}
		}
		
		array.add(obj);
		return array;
	}
	
	/**
	 * 获取会签节点的配置信息，目前三种会签都可调用该方法
	 * @param list 节点的所有ApprovalComment对象
	 * @return
	 */
	public JSONArray getCounterApprovalConfigInfo(List<ApprovalTempletActivityVo> list) {
		JSONArray array = new JSONArray();
		if(list == null||list.size() == 0) {
			throw new CannotFoundExaminerException("没有找到节点的审批人，请联系管理员！");
		}else {
			for(int i=0;i<list.size();i++) {
				JSONObject obj = new JSONObject();
				ApprovalTempletActivityVo vo=list.get(i);
				obj.put("examiner", vo.getUserid());
				obj.put("examinerName", vo.getUsername());
				obj.put("examinerType", vo.getExaminerType());
				obj.put("chargedDepId", vo.getDepartmentId());
				obj.put("chargedDepName", vo.getDepartmentname());
				obj.put("chargedRoleId", vo.getRoleId());
				obj.put("chargedRoleName", vo.getRoleName());
				array.add(obj);
			}
		}
		return array;
	}
	
	/**
	 * 获取评审会签节点的配置信息，需要反馈给用户进行选择或者确认
	 * @param list 节点的所有ApprovalComment对象
	 * @return
	 */
	public JSONArray getAgreeRateMeetingApprovalConfigInfo(List<ApprovalTempletActivityVo> list) {
		return this.getCounterApprovalConfigInfo(list);
	}
	
	/**
	 * 获取决审会签节点的配置信息，需要反馈给用户进行选择或者确认
	 * @param list 节点的所有ApprovalComment对象
	 * @return
	 */
	public JSONArray getExaminerMeetingApprovalConfigInfo(List<ApprovalTempletActivityVo> list) {
		return this.getCounterApprovalConfigInfo(list);
	}
	
	/**
	 * 获取会审会签节点的配置信息，需要反馈给用户进行选择或者确认
	 * @param list 节点的所有ApprovalComment对象
	 * @return
	 */
	public JSONArray getMeetingApprovalConfigInfo(List<ApprovalTempletActivityVo> list) {
		return this.getCounterApprovalConfigInfo(list);
	}
	
	/**
	 * 启动一个审批流程实例
	 * @param approvalVo.objectType 审批对象类型
	 * @param approvalVo.objectID 审批对象id，可以是多个，以','分隔
	 * @param approvalVo.approvalId 审批流程模板id
	 * @param approvalVo.approvePressName 审批流程名称
	 * @param approvalVo.approveNote 送审附言
	 */
	@Transactional
	public boolean begin(ApprovalVo approvalVo) {
		// 准备approvalVo中的参数
		String objectType = approvalVo.getObjectType();
		String activityInfo = approvalVo.getActivityInfo();
		JSONObject info = JSONObject.fromObject(activityInfo);
		JSONArray array = info.getJSONArray("comments");
		Long nextActivityId = info.getLong("activityid");
		
		// 准备事件处理器，根据审批对象类型获取对应的事件处理器，在实例流程前需要处理流程启动事件，在实例第一个流程节点前，需要处理节点启动事件
		IApprovalHandler eventHandler = (IApprovalHandler) Component.getInstance("approval_" + objectType + "_Handler");
		
		if(eventHandler == null) {
			throw new CannotFoundComponentException("没有找到审批对象对应的事件处理器，请联系管理员！");
		}
		
		// 触发流程启动事件
		eventHandler.onFlowBegin(approvalVo.toApprovalObject());
		
		// 根据审批流程模板创建流程实例
		Flow flowInstance = this.createApprovalFlow(approvalVo);
		
		// 在实例流程的第一个节点前，触发流程节点开始事件
		eventHandler.onActivityBegin(approvalVo.toApprovalObject());

		// 获取开始节点的下一个节点
		FlowActivity nextActivity = this.flowActivityDao.get(nextActivityId);
		
		// 创建流程节点实例
		FlowActivity activityInstance = this.createFlowActivity(flowInstance.getId(), nextActivity);
		
		// 创建审批对象ApprovalObject
		this.createApprovalObjects(approvalVo, flowInstance);
		
		// 根据节点模板创建审批任务
		this.createApprovalComment(flowInstance.getId(), activityInstance.getActivityID(), array);
		
		//获取审批流程实例ID，返回到前台，供开发人员使用
		approvalVo.setFlowInstanceId(flowInstance.getId());
		return true;
	}
	
	/**
	 * 结束一个流程节点，并进入下一个节点
	 * @param ApprovalCommentVo.objectType 审批对象类型
	 * @param ApprovalCommentVo.id 审批id
	 * @param ApprovalCommentVo.approvalStatus 审批状态
	 * @param ApprovalCommentVo.approvalComments 审批意见
	 * @param stepOrDirect 是否创建任务历程，0为创建，在审批任务时才需要
	 */
	@Transactional
	public boolean next(ApprovalCommentVo vo, int stepOrDirect) throws Exception {
		// 准备vo中的参数
		String approvalComments = vo.getApprovalComments();
		Long approvalStatus = vo.getApprovalStatus();
		String activityInfo = vo.getActivityInfo();
		JSONObject info = JSONObject.fromObject(activityInfo);

		// 准备事件处理器，根据审批对象类型获取对应的事件处理器
		IApprovalHandler eventHandler = (IApprovalHandler) Component.getInstance("approval_" + vo.getObjectType() + "_Handler");
		
		// 获取当前审批对象
		ApprovalComment comment = this.approvalCommentDao.get(vo.getId());
		// 根据审批对象获取流程节点实例
		FlowActivity activityInstance = flowActivityDao.get(comment.getActivityInstanceID());
		// 根据当前审批对象获取流程实例
		Flow flowInstance = flowDao.get(comment.getFlowInstanceID());
		
		// 先完成将当前的审批任务
		this.endApprovalComment(comment, approvalComments, approvalStatus);
		
		// 判断当前节点状态，决定是否结束当前节点，如果可以通过或不通过则结束该节点，需要根据该节点是否完成来决定是否需要进行下一个节点，因此返回了该节点的状态
		int isActivityEnd = this.endInstancedActivityIfCan(activityInstance, comment);

		/**
		 * 根据当前节点的状态做不同的处理：
		 * isActivityEnd为1表示该节点通过，则需要继续流转流程
		 * isActivityEnd为2表示该节点未通过，则需要终止流程
		 * isActivityEnd为3表示在该节点还没有完成，还有其他审批任务需要进行，则不需要进行其他操作，直接结束该方法
		 */
		eventHandler.onActivityEnd(vo.toApprovalObject());
		ApprovalObject approvalObject = vo.toApprovalObject();
		if(isActivityEnd == 1) {
			Long nextActivityId = info.getLong("activityid");
			// 该节点通过时，触发节点结束事件
			eventHandler.onActivityEnd(vo.toApprovalObject());
			
			// 获取下一个节点，通过用户确认后反馈的节点信息获取
			FlowActivity nextActivity = this.flowActivityDao.get(nextActivityId);
			if(nextActivity.getNodeTypeID().equals("5")) { // 下一个节点为结束节点，结束流程
				approvalObject.setApprovalStatus(1l);
				eventHandler.onFlowEnd(approvalObject);
				flowInstance.setEndTime(new Date());
				flowInstance.setFlowState(FlowConstants.FLOWSTATE_FINISHED); // 设置流程状态为完成
				flowDao.update(flowInstance);
			} else {
				JSONArray array = info.getJSONArray("comments");
				eventHandler.onActivityBegin(vo.toApprovalObject());
				// 实例下一个流程节点
				this.createNextNode(activityInstance, flowInstance, nextActivity, array);
			}
		} else if (isActivityEnd == 2) { // 当该节点不通过时，结束流程
			// 该节点不通过时，触发节点结束事件
			approvalObject.setApprovalStatus(0l);
			eventHandler.onFlowEnd(approvalObject);
			flowInstance.setEndTime(new Date());
			flowInstance.setFlowState(FlowConstants.FLOWSTATE_TERMINATED); // 设置流程状态为终止
			flowDao.update(flowInstance);
		} else if (isActivityEnd == 3) {
			return true;
		}
		
		if(stepOrDirect==0){ // 创建历程
			this.createHistory(vo);
		}
		
		return true;
	}
	
	/**
	 * 完成当前审批的审批对象
	 * @param comment 当前的审批对象
	 * @param approvalComments 当前审批对象在审批时，用户填写的审批意见
	 * @param approvalStatus 原意为审批对象的状态，1为通过，0为不通过，2为终止，这里为用户选择的通过和不通过
	 * @return
	 */
	public void endApprovalComment(ApprovalComment comment, String approvalComments, Long approvalStatus) {
		if(!comment.getApprovalStatus().equals(-1l)) {
			throw new OutOfLockException("该节点已经不是未审批状态，请刷新审批列表！");
		}
		comment.setApprovalComments(approvalComments); // 设置审批意见
		comment.setApprovalStatus(approvalStatus); // 设置审批状态
		comment.setApprovalTime(new Date()); // 设置审批时间
		this.approvalCommentDao.getHibernateSession().merge(comment);
		if(approvalStatus.equals(FlowConstants.APPROVALSTATUS_AGREE)) {
            approvalTaskListener.onPassApprovalTask(comment);
		} else if (approvalStatus.equals(FlowConstants.APPROVALSTATUS_DENIED)) {
            approvalTaskListener.onUnPassApprovalTask(comment);
		}
	}
	
	/**
	 * 如果该节点已完成，则结束该节点，如果没有完成则不做任何操作
	 * @param instancedActivity 流程实例节点
	 * @param comment 该节点对应的审批任务
	 */
	public int endInstancedActivityIfCan(FlowActivity instancedActivity, ApprovalComment comment) {
		// 获取该节点所有的审批任务
		List<ApprovalComment> approvalCommentList = this.approvalCommentDao.getCommentByActivityId(instancedActivity.getActivityID());
		
		// 判断当前节点是否已完成
		int isActivityEnd = this.getStateOfInstancedActivity(instancedActivity, comment, approvalCommentList);
		
		// 若节点审批完成
		if(isActivityEnd == 1 || isActivityEnd == 2){
			// 获的未审批的对象，终止此对象，并给未参加审批的审批人发送系统消息
			for(int i=0;i<approvalCommentList.size();i++) {
				if(approvalCommentList.get(i).getApprovalStatus()==-1l) {
					approvalCommentList.get(i).setApprovalStatus(FlowConstants.APPROVALSTATUS_TERMINATE);
					approvalCommentList.get(i).setApprovalTime(new Date());
					this.approvalTaskListener.onTerminateApprovalTask(approvalCommentList.get(i));
					this.sendMessageSystem(instancedActivity,approvalCommentList.get(i).getExaminer());
				}
			}
			// 设置节点结束时间，并结束节点
			instancedActivity.setEndTime(new Date());
			this.flowActivityDao.update(instancedActivity);
		}
		
		return isActivityEnd;
	}
	
	/**
	 * 获取流程节点的状态，是否通过，1表示通过，2表示未通过，3表示在该节点中还有其他审批任务需要进行
	 * @param instancedActivity 流程节点实例
	 * @param comment 当前审批任务
	 * @param approvalCommentList 该节点的所有审批任务集合
	 * @return
	 */
	public int getStateOfInstancedActivity(FlowActivity instancedActivity, ApprovalComment comment, List<ApprovalComment> approvalCommentList) {
		// 定义是否结束当前节点的标记： 1表示通过，2表示未通过，3表示在该节点中还有其他审批任务需要进行
		int isActivityEnd = 3;
		
		// 判断流程实例节点是否可以完成
		if(instancedActivity.getNodeTypeID().equals("6")) { // 审批节点
			isActivityEnd = this.getStateApprovalActivity(comment);
		} else if(instancedActivity.getNodeTypeID().equals("7")) { // 评审会签节点
			isActivityEnd = this.getStateAgreeRateMeetingApproval(comment, approvalCommentList, instancedActivity.getAgreeRate());
		} else if(instancedActivity.getNodeTypeID().equals("8")) { // 决审会签节点
			isActivityEnd = this.getStateExaminerMeetingApproval(comment);
		} else if(instancedActivity.getNodeTypeID().equals("9")) { // 会审会签节点
			isActivityEnd = this.getStateMeetingApproval(comment);
		}
		return isActivityEnd;
	}

	/**
	 * 获取审批节点的状态
	 * @param comment 当前审批任务
	 * @return
	 */
	public int getStateApprovalActivity(ApprovalComment comment) {
		// 如果该节点为审批节点，审批节点只有一个审批任务（实际上就是当前这个审批任务），如果这个任务通过则通过，如果这个任务则未通过
		if(comment.getApprovalStatus().equals(FlowConstants.APPROVALSTATUS_AGREE)) {
			return 1;
		} else {
			return 2;
		}
	}
	
	/**
	 * 获取评审会签节点的状态
	 * @param comment 当前审批任务
	 * @param approvalCommentList 审批节点的所有审批任务集合
	 * @param agreeRate 该会签节点配置的审批通过率
	 * @return
	 */
	public int getStateAgreeRateMeetingApproval(ApprovalComment comment, List<ApprovalComment> approvalCommentList, Integer agreeRate) {
		// 遍历所有审批任务，统计通过的任务个数和未通过的任务个数
		int agreeCount = 0;
		for(int i = 0; i < approvalCommentList.size(); i ++) {
			if(approvalCommentList.get(i).getId().equals(comment.getId())) { // 如果是当前节点，则从当前节点中取，这里边有可能会假设当前节点通过来进行判断
				if(comment.getApprovalStatus().equals(1l)) {
					agreeCount ++;
				}
			} else {
				if(approvalCommentList.get(i).getApprovalStatus().equals(1l)) {
					agreeCount ++;
				} else if (approvalCommentList.get(i).getApprovalStatus().equals(-1l)) { // 只要有一个节点没有执行审批，则该会签节点还需要继续进行
					return 3;
				}
			}
		}
		
		
		// 计算实际审批通过比例
		Integer actualAgreeRate = agreeCount*100/approvalCommentList.size();
		// 判断审批是否通过
		if(agreeRate <= actualAgreeRate) {
			return 1;
		} else {
			return 2;
		}
	}
	
	/**
	 * 获取决审会签节点的状态
	 * @param comment 当前审批任务
	 * @return
	 */
	public int getStateExaminerMeetingApproval(ApprovalComment comment) {
		// 决审会签节点如果负责人通过后，该节点则通过，如果负责人没有通过，该节点则不通过
		if(comment.getExaminerType()==1l) {
			if(comment.getApprovalStatus().equals(FlowConstants.APPROVALSTATUS_AGREE)) {
				return 1;
			} else {
				return 2;
			}
		}
		// 如果不是负责人审批，则不能决定该节点是否可以通过，所以需要继续进行该节点上其他审批任务的进行，直接返回3
		return 3;
	}
	
	/**
	 * 获取会审会签节点的状态
	 * @param comment 当前审批任务
	 * @return
	 */
	public int getStateMeetingApproval(ApprovalComment comment) {
		// 会审会签节点如果第一个人通过后或不通过后，都会决定该节点通过或不通过，因此不需要再进行其他审批任务
		if(comment.getApprovalStatus().equals(FlowConstants.APPROVALSTATUS_AGREE)) {
			return 1;
		} else {
			return 2;
		}
	}

	/**
	 * 根据审批流程模板创建新的流程实例
	 * @param approvalVo.approvePressName 流程实例名称
	 * @param approvalVo.approvalId 流程模板id
	 */
	@Override
	public Flow createApprovalFlow(ApprovalVo approvalVo) {
		Flow instanceFlow = new Flow();
		instanceFlow.setName(approvalVo.getApprovePressName()); // 设置流程实例名称
		instanceFlow.setIsTemplate(0L); // 设置流程为非模板
		instanceFlow.setFlowType(FlowConstants.FLOWTYPE_APPROVAL); // 设置流程为审批流程
		instanceFlow.setFlowTemplateID(approvalVo.getApprovalId()); // 设置流程实例应用的流程模板id
		instanceFlow.setFlowState(FlowConstants.FLOWSTATE_WORKING); // 设置流程状态为运行状态
		instanceFlow.setStartTime(new Date()); // 设置流程启动时间
		instanceFlow.setCreateTime(new Date()); // 设置流程启动时间，在这里没有实际意义
		if(identity!=null){
			instanceFlow.setCreaterId(identity.getLoginUser().getUserid()); // 设置创建流程人id
			instanceFlow.setStarterId(identity.getLoginUser().getUserid()); // 设置启动流程人id
		}
		instanceFlow = this.flowDao.save(instanceFlow);
		return instanceFlow;
	}

	/**
	 * 根据节点模板创建节点实例
	 * @param flowId 已经实例的流程id
	 * @param activityTemplet 节点模板
	 * @return
	 */
	public FlowActivity createFlowActivity(Long flowId, FlowActivity activityTemplet) {
		FlowActivity activityInstance = new FlowActivity();
		activityInstance.setFlowID(flowId); // 设置节点所处的流程实例的id
		activityInstance.setNodeTypeID(activityTemplet.getNodeTypeID()); // 根据节点模板的类型设置节点实例的节点类型
		
		/** 目前展示流程运行进度是按照流程模板来展示，因此现在流程实例的坐标、宽度、高度信息暂时没有使用，考虑以后按照流程实例来展示 */
		activityInstance.setPositionx(activityTemplet.getPositionx()); // 根据节点模板的x坐标设置节点实例的节点x坐标
		activityInstance.setPositiony(activityTemplet.getPositiony()); // 根据节点模板的y坐标设置节点实例的节点y坐标
		activityInstance.setWidth(activityTemplet.getWidth()); // 根据节点模板的宽度设置节点实例的宽度
		activityInstance.setHeight(activityTemplet.getHeight()); // 根据节点模板的高度设置节点实例的高度
		
		activityInstance.setText(activityTemplet.getText()); // 根据节点模板的名称设置节点实例的名称
		activityInstance.setActivityType("2"); // 设置节点的类型为审批流程的节点
		activityInstance.setStartTime(new Date()); // 设置该节点开始的时间
		activityInstance.setTemplateID(activityTemplet.getActivityID()); // 设置该流程对应在流程模板中的节点id
		activityInstance.setAgreeRate(activityTemplet.getAgreeRate()); // 如果是评审会签，根据节点模板中的通过率设置节点实例的通过率
		activityInstance = this.flowActivityDao.save(activityInstance);
		return activityInstance;
	}
	
	/**
	 * 根据节点模板对应的审批任务模板创建审批任务实例，创建的审批任务实例与实例的流程中的节点绑定
	 * @param instancedFlowId 实例的流程id
	 * @param instancedActivityId 实例的节点id 
	 * @param comments 经过用户确认的节点ApprovalComment模板
	 * @return
	 */
	public boolean createApprovalComment(Long instancedFlowId, Long instancedActivityId, JSONArray comments) {
		boolean sign = true;
		for(int i = 0; i < comments.size(); i ++){
			JSONObject commentInfo = comments.getJSONObject(i);
			ApprovalComment comment = new ApprovalComment();
			comment.setFlowInstanceID(instancedFlowId);
			comment.setActivityInstanceID(instancedActivityId);
			comment.setExaminer(commentInfo.getLong("examiner"));
			comment.setExaminerType(commentInfo.getLong("examinerType"));
			comment.setApprovalStatus(FlowConstants.APPROVALSTATUS_NONE);
			sign &= this.approvalCommentDao.add(comment);
			approvalTaskListener.onCreateApprovalTask(comment);
		}
		return sign;
	}
	
	/**
	 * 创建下一个节点实例
	 * @param activityInstance 当前节点实例
	 * @param flowInstance 当前流程实例
	 * @param nextActivity 下一个节点的模板
	 * @return
	 */
	public boolean createNextNode(FlowActivity activityInstance, Flow flowInstance, FlowActivity nextActivity, JSONArray comments) {
		// 创建下一个节点流程节点实例
		FlowActivity targetActivityInstance = this.createFlowActivity(flowInstance.getId(), nextActivity);
		
		// 创建当前节点实例和下一个节点实例之间的关系
		FlowActivityRelation relation = new FlowActivityRelation();
		relation.setOriginalActivieyID(activityInstance.getActivityID());
		relation.setDestinationActivityID(targetActivityInstance.getActivityID());
		relation.setFlowID(flowInstance.getId());
		relation.setOriginalIndex(-1L);
		relation.setDestinationIndex(-1L);
		relation.setFlowType(-1L);
		relation = this.flowActivityRelationDao.save(relation);
		
		// 创建下一个节点的审批任务
		this.createApprovalComment(flowInstance.getId(), targetActivityInstance.getActivityID(), comments);
		return true;
	}
	
	/**
	 * 根据模板ID获取流程模板的第一个真实节点
	 * @param templateFlowId 流程模板id
	 * @param objectId 审批对象id，用于判断节点调用判断器方法进行判断时传参用
	 * @return
	 */
	public FlowActivity getTemplateFirstNode(Long templateFlowId, String objectId, Guser starter) {
		// 根据审批流程模板的id获取开始节点
		FlowActivity startActivity= super.getActivitiesByType(templateFlowId, 4L).get(0);
		
		// 获取开始节点的后续节点
		return this.getNextActivity(startActivity.getActivityID(), objectId, starter);
	}
	
	/**
	 * 根据流程实例节点ID获取关联的模板中的节点的下一真实结点
	 * @param instancedActivityID 流程实例中当前节点的id
	 * @param objectId 审批对象id，用于判断节点调用判断器方法进行判断时传参用
	 * @return
	 */
	public FlowActivity getTemplateNextNode(Long instancedActivityID, String objectId, Guser starter) {
		// 根据实例节点ID获取实例节点
		FlowActivity activityInstance= this.flowActivityDao.get(instancedActivityID);

		// 获取当前节点在模板中的后续节点
		return this.getNextActivity(activityInstance.getTemplateID(), objectId, starter);
	}
	
	/**
	 * 在流程模板中根据当前节点获取下一个节点
	 * @param templateActivityId 流程实例运行中当前节点在模板中对应的节点模板
	 * @param objectId 审批对象id，用于判断节点调用判断器方法进行判断时传参用
	 * @return
	 */
	public FlowActivity getNextActivity(Long templateActivityId, String objectId, Guser starter) {
		// 获取当前模板节点的后续节点
		FlowActivityRelation nextRelation = this.flowActivityRelationDao.getDestinationRelation(templateActivityId).get(0);
		FlowActivity nextActivity= this.flowActivityDao.get(nextRelation.getDestinationActivityID());
		
		// 如果后续节点为判断节点，则继续查找后续节点
		while(nextActivity.getNodeTypeID().equals("1")) {
			// 获取判断节点所走的分支节点
			String runScript = nextActivity.getRunScript();

			// 获取判断节点对应的判断器的实现类
			IJudgeHandler handler;
			try {
				handler = (IJudgeHandler) Component.getInstance(runScript);
			} catch (Exception e) {
				e.printStackTrace();
				throw new CannotFoundComponentException("审批流程判断时出现问题，请联系系统管理员！");
			}
			// 判断是否能获取到判断器，如果不能正常获取判断器则停止流程运行
			if(handler==null) {
				throw new CannotFoundComponentException("审批流程判断时出现问题，请联系系统管理员！");
			}
			
			// 调用判断器的判断方法进行判断
			String[] ids = objectId.split(",");
			boolean result;
			if(ids.length == 1) {
				result = handler.judge(starter, ids[0]);
			} else if (ids.length > 1) {
				result = handler.judge(starter, ids);
			} else {
				throw new CannotFoundApprovalObjectIdException("没有找到审批对象，请联系系统管理员！");
			}
			
			// 根据判断方法判断的结果获取判断节点的后续节点
			FlowActivityRelation judgeNextRelation = this.flowActivityRelationDao.getJudgeDestinationRelation(nextActivity.getActivityID(), result ? 1l : 2l).get(0);
			nextActivity=this.flowActivityDao.get(judgeNextRelation.getDestinationActivityID());
		}
		
		return nextActivity;
	}
	
	/**
	 * 决审会签和会审会签结束后，有可能会有一部分人没有来得及参与会签，给这些人发送系统消息通知其会签结束
	 * @param activityInstance 会签节点实例
	 * @param userId 会签参与人
	 * @return
	 */
	public boolean sendMessageSystem(FlowActivity activityInstance,Long userId) {
		MessageSystem ms = new MessageSystem();
		ms.setMessageid(Guid.getGuid());
		ms.setMessagetype("5");//短消息
		ms.setMessagetitle("会签结束通知！");
		ms.setQuestion("1");
		ms.setUserid(userId.toString());
		ms.setMessagedate(new Date());
		if (activityInstance.getNodeTypeID().equals("8")) {//决审会签
			ms.setMessagebody("您参与的会签（"+activityInstance.getText()+"）已由审批负责人审批通过！已将您的审批任务取消！");
		} else if (activityInstance.getNodeTypeID().equals("9")) {//会审会签
			ms.setMessagebody("您参与的会签（"+activityInstance.getText()+"）已由其它人审批通过！已将您的审批任务取消！");
		}
		_messageSystemService.save(ms);
		return true;
	}
	
	public boolean agree(ApprovalVo approvalVo) throws DataTypeDuplicateNameException {
		return false;
	}

	public int synchroApprovalRows(ApprovalCommentVo approvalCommentVo) {
		return 0;
	}
	
	public void createHistory(ApprovalCommentVo approvalCommentVo) {
		String dataId = approvalCommentVo.getObjectId();
		String []ids=dataId.split(",");
		String dataType = approvalCommentVo.getObjectType();
		if (dataType.equals(DataPrivilegeConstants.DATATYPE_PROJECT)) {//判断是否是项目
			for (String id : ids) {
				Tproject project = _projectService.getProjectById(Long.valueOf(id));
				Long projectStatusId=project.getProjectStatusId();
				if (project == null) continue;
				if(approvalCommentVo.getApprovalStatus().equals(FlowConstants.APPROVALSTATUS_AGREE)){	
					if(projectStatusId.equals(ProjectConstants.WORKNING_STATUS)){
						try{
							_progress.addProjectBigVersion(project, 0);
						}catch(Exception e){
							log.info(e.getMessage());
						}
					}else if(projectStatusId.equals(ProjectConstants.FINISHED_STATUS)){
						try{
							_progress.addProjectSmallVersion(project, 0, Progress.APPROVE_ON_WORKING);
						}catch(Exception e){
							log.info(e.getMessage());
						}
					}
				}else if(approvalCommentVo.getApprovalStatus().equals(FlowConstants.APPROVALSTATUS_DENIED)){
					if(projectStatusId.equals(ProjectConstants.WORKNING_STATUS)){
						_progress.addProjectSmallVersion(project, 0, Progress.APPROVE_ON_WORKING);
					}
				}
			}
		} else if (dataType.equals(DataPrivilegeConstants.DATATYPE_TASK)) {//判断是否是任务
			for (String id : ids) {
				Task task = _taskService.getTaskById(Long.valueOf(id));
				if (task == null) continue;
				Long taskStatusId=task.getTaskstatusid();
				if(taskStatusId.equals(TaskConstants.FINISHED_STATUS)){
					try{
						_progress.addTaskSmallVersion(task, 0,Progress.APPROVE_ON_WORKING);
					}catch(Exception e){
						log.info(e.getMessage());
					}
				}else if(taskStatusId.equals(TaskConstants.WORKNING_STATUS)){
					try{
						_progress.addTaskSmallVersion(task, 0,Progress.APPROVE_ON_WORKING);
					}catch(Exception e){
						log.info(e.getMessage());
					}
				}
			}
		}
	}
	
	/**
	 * 根据流程模板实例ID获取当前流程审批历史记录
	 * @param activityId
	 */
	@Transactional
	public List<ApprovalInfoVo> getApproalFlowInfos(Long activityId) {
		//得到当前流程实例节点
		FlowActivity activityInstance=this.flowActivityDao.get(activityId);
		
		//得到所在流程实例ID
		Long flowInstanceId=activityInstance.getFlowID();
		
		//根据流程实例ID查找所有实例节点，并按照字段endTime排序
		List<FlowActivityVo> flowActivities = flowActivityDao.getFlowActivitiesByFlowInstanceId(flowInstanceId);

		List<ApprovalInfoVo> approvalInfoVoList = new ArrayList<ApprovalInfoVo>();

		//定义步骤序号
		int sequence_num=0;
		
		// 获取审批意见
		ApprovalInfoVo infoVo = null;
		for (FlowActivityVo flowActivity : flowActivities) {
			
			//根据审批流程节点实例获取审批节点参与人的审批意见
			List<ApprovalComment> commentList = this.getApprovalCommentsV(flowActivity);
			sequence_num++;
			
			for (ApprovalComment comment : commentList) {
				infoVo = new ApprovalInfoVo();
				try {
					PropertyUtils.copyProperties(infoVo, comment);
				} catch (Exception e) {
					log.error("ApprovalComment" + I18nManager.getProp().getProperty("resourceParam39") + "" + e.getLocalizedMessage());
				}
				
				// 处理获取到的审批历史记录信息
				infoVo.setStepAndApprovalName("第" + sequence_num + "" + I18nManager.getProp().getProperty("resourceParam55") + "" + flowActivity.getText());
				Guser user = guserDAO.selectById(Guser.class, infoVo.getExaminer());
				infoVo.setExaminerName(null != user ? user.getTruename() : "");
				infoVo.setDepartmentName(null != user ? user.getGinstitute().getName() : "");
				infoVo.setActivityInstanceName(flowActivity.getText());
			    infoVo.setAcceptTime(flowActivity.getStartTime());
				infoVo.setExaminerTypeName(FlowConstants.examinerTypeMap.get(infoVo.getExaminerType()));
				infoVo.setApprovalStatusName(FlowConstants.approvalStatusMap.get(infoVo.getApprovalStatus()));
				if (infoVo.getApprovalTime() != null) {
					infoVo.setApprovalTimeString(StrUtil.getLongDate(infoVo.getApprovalTime()));
				}
				approvalInfoVoList.add(infoVo);
			}
		}

		return approvalInfoVoList;
	}
}
