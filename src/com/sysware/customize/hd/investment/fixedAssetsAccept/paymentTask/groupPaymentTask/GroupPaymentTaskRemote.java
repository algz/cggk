package com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.groupPaymentTask;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.common.JsonUtil;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("GroupPaymentTaskRemote")
public class GroupPaymentTaskRemote {

	@In(create=true,value="GroupPaymentTaskServiceImpl")
	private GroupPaymentTaskService service;
	
	//获得登录的用户信息
	@In(create = true, value = "org.jboss.seam.security.identity")
	private Identity identity;
	
	/**
	 * 获取320用户信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getUserList(GroupPaymentTaskVo vo){
		GridData<GroupPaymentTaskVo> data = new GridData<GroupPaymentTaskVo>();
		List<GroupPaymentTaskVo> list = service.getUserList(vo);
		if(list!=null){
			for (GroupPaymentTaskVo groupPaymentTaskVo : list) {
				groupPaymentTaskVo.setTrueName(groupPaymentTaskVo.getTrueName()+"【"+groupPaymentTaskVo.getDepartmentName()+"】");
			}
		}
		data.setResults(list);
		data.setTotalProperty(service.getUserListCount(vo));
		return JsonUtil.toJsonStr(data);
	}
	
	/**
	 * 操作支付任务列表
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String useGroupPaymentTask(GroupPaymentTaskVo vo){
		JSONObject obj = new JSONObject();
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		GroupPaymentTask groupPaymentTask = new GroupPaymentTask();
		groupPaymentTask.setPgFinanceRemark(vo.getPgFinanceRemark());
		groupPaymentTask.setContractId(vo.getContractId());
		groupPaymentTask.setContractProof(vo.getContractProof());
		groupPaymentTask.setContractMoney(vo.getContractMoney());
		groupPaymentTask.setPaymentMoney(vo.getPaymentMoney());
		groupPaymentTask.setPgRemark(vo.getPgRemark());
		groupPaymentTask.setPgAuditingBrow(vo.getPgAuditingBrow());
		groupPaymentTask.setPgLiabilityPeopel(vo.getPgLiabilityPeopel());
		groupPaymentTask.setPgWorkPeopel(vo.getPgWorkPeopel());
		groupPaymentTask.setPgIdea(vo.getPgIdea());
		groupPaymentTask.setPgState(vo.getPgState());
		groupPaymentTask.setPgType(2);
		groupPaymentTask.setSelectType(vo.getSelectType());
		groupPaymentTask.setPgCreatePeopel(identity.getLoginUser().getUserid().toString());
		if(!(UtilForHD.IsStrEmpty(vo.getPgId()))){
			groupPaymentTask.setPgId(UtilForHD.GetNowTimeForId());
			groupPaymentTask.setPgCreateTime(new Date());
			groupPaymentTask.setPgState(1);
			service.insertGroupPaymentTask(groupPaymentTask);
		}else{
			groupPaymentTask.setPgId(vo.getPgId());
			GroupPaymentTask task = service.getGroupPaymentTask(vo);
			try {
				groupPaymentTask.setPgCreateTime(task.getPgCreateTime());
				groupPaymentTask.setPgAuditingTime(task.getPgAuditingTime());
			} catch (Exception e) {
				e.printStackTrace();
			}
			groupPaymentTask.setPgState(task.getPgState());
			service.updateGroupPaymentTask(groupPaymentTask);
		}
		obj.put("success", "success");
		return obj.toString();
	}
}
