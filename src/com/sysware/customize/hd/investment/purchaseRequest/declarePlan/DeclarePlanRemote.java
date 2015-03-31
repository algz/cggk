package com.sysware.customize.hd.investment.purchaseRequest.declarePlan;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.entity.Guser;
import com.luck.itumserv.services.security.Identity;
import com.sysware.p2m.department.DepartmentService;
import com.sysware.p2m.guser.GuserService;


/**
 * 申报计划Remote
 * 
 * @author fanzhihui
 *
 */
@Name("declarePlan_DeclarePlanRemote")
public class DeclarePlanRemote {
	// 设置BeanUtils转换缺省值
		{
			DateConverter dateConverter = new DateConverter(null);
			dateConverter.setPattern("yyyy-MM-dd");
			ConvertUtils.register(dateConverter, Date.class);
			ConvertUtils.register(dateConverter, String.class);
		}

		@In(create = true, value = "declarePlan_DeclarePlanServiceImpl")
		private DeclarePlanService declarePlanService;
		
		 @In(create = true, value = "department_DepartmentServiceImpl")	
		 private DepartmentService departmentService;

		 @In(create=true)
		 Identity identity; 
		 
		 @In(create = true, value = "guser_GuserServiceImpl")
		 GuserService guserService;
		 
		/**
		 * 根据查询条件获得申报计划列表
		 * 
		 * @param declarePlan
		 *            查询条件
		 * @return 符合条件的申报列表
		 * @throws Exception
		 */
		@WebRemote
		public GridData<DeclarePlanVo> getGridDataByConditon(DeclarePlanVo declarePlanvo)
				throws Exception {
			GridData<DeclarePlanVo> gridData = new GridData<DeclarePlanVo>();
			DeclarePlanCondition condition = new DeclarePlanCondition();
			BeanUtils.copyProperties(condition, declarePlanvo);
			
			List<DeclarePlan> declarePlans = declarePlanService.findDeclarePlanByCondition(condition);
			List<DeclarePlanVo> result = processListDeclarePlans(declarePlans);
			for(int i=0;i<result.size();i++){
				//修改状态显示值
				String states = result.get(i).getStatus();
				String[] states_flags = {"1","2","3","4","5","6"};//状态 1编制中2待审批3审批中4已审批5已生成
				String[] states_values = {"编制中","编制中","审批中","已审批","已生成","已退回"};
				for(int j=0;j<states_flags.length;j++){
					if(states_flags[j].equals(states)){
						result.get(i).setStatus(states_values[j]);
						continue;
					}
				}
				
				//修改编制人 显示值
				Guser guser = guserService.getGuserById(Long.parseLong(result.get(i).getEditer()));
				result.get(i).setEditer(guser.getTruename());
				
			}
			gridData.setTotalProperty(declarePlanService.countDeclarePlansByCondition(condition));
			gridData.setResults(result);
			return gridData;
		}
		@WebRemote
		public GridData<DeclarePlanVo> getGridDataByProcurement(DeclarePlanVo declarePlanvo)
				throws Exception {
			GridData<DeclarePlanVo> gridData = new GridData<DeclarePlanVo>(); 
			List<Object[]> declarePlans = declarePlanService.getDeclarePlanByCondition(declarePlanvo);
			List<DeclarePlanVo> result = new ArrayList<DeclarePlanVo>();
			DeclarePlanVo vo = null;
			for(Object[] obj :declarePlans){
				vo = new DeclarePlanVo();
				vo.setDeclareplanName(obj[0]==null?"":obj[0].toString());
				vo.setDeclareplanCode(obj[1]==null?"":obj[1].toString());
				vo.setDeclareplanDetilID(obj[2]==null?"":obj[2].toString());
				vo.setAmount(obj[3]==null?"":obj[3].toString());
				vo.setStatus(obj[4]==null?"":obj[4].toString());
				vo.setEditDate(obj[5]==null?"":obj[5].toString());
				vo.setEditer(obj[6]==null?"":obj[6].toString());
				result.add(vo);
			}
			gridData.setTotalProperty(declarePlanService.getDeclarePlanByConditionCount(declarePlanvo).longValue());
			gridData.setResults(result);
			return gridData;
		}
		private List<DeclarePlanVo> processListDeclarePlans(List<DeclarePlan> declarePlans) {
			List<DeclarePlanVo> result = new ArrayList<DeclarePlanVo>();
			for (DeclarePlan declarePlan : declarePlans) {
				DeclarePlanVo tempvo = new DeclarePlanVo();
				try {
					BeanUtils.copyProperties(tempvo, declarePlan);
					//数据库中没有类型的情况
					if(declarePlan.getDeclareplanType()==null)
						tempvo.setDeclareplanType("");
					else if(declarePlan.getDeclareplanType().equals("1"))
						tempvo.setDeclareplanType("计划内");
					else if(declarePlan.getDeclareplanType().equals("2"))
						tempvo.setDeclareplanType("应急");
					else
						tempvo.setDeclareplanType("非应急");
					if(declarePlan.getPropertyType()==null)
						tempvo.setPropertyType("");
					else if(declarePlan.getPropertyType().equals("1"))
						tempvo.setPropertyType("固定资产");
					else
						tempvo.setPropertyType("非固定资产");
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
				result.add(tempvo);
			}
			return result;
		}
		
		/**
		 * 根据获得申报单位列表
		 * @param vo
		 * 			条件
		 * @return
		 * 			申报单位列表
		 * @throws Exception
		 */
		@WebRemote
		public GridData<DeclarePlanVo> getDeclareDepartmentGridDataByConditon(DeclarePlanVo vo)
				throws Exception {
			GridData<DeclarePlanVo> gridData = new GridData<DeclarePlanVo>();
			DeclarePlanCondition condition = new DeclarePlanCondition();
			BeanUtils.copyProperties(condition, vo);
			condition.setEditer(identity.getLoginUser().getLoginname());
			List<DeclarePlanVo> result = declarePlanService.getDeclareDepartment(condition);
			gridData.setTotalProperty(declarePlanService.countDeclareDepartment(condition));
			gridData.setResults(result);
			return gridData;
		}
		
		
		/**
		 * 根据获得申报用途列表
		 * @param vo
		 * 			查询条件
		 * @return
		 * 			申报用途列表
		 * @throws Exception
		 */
		@WebRemote
		public GridData<DeclarePlanVo> getDeclareUseGridDataByConditon(DeclarePlanVo vo)
				throws Exception {
			GridData<DeclarePlanVo> gridData = new GridData<DeclarePlanVo>();
			DeclarePlanCondition condition = new DeclarePlanCondition();
			BeanUtils.copyProperties(condition, vo);
			condition.setEditer(identity.getLoginUser().getLoginname());
			List<DeclarePlanVo> result = declarePlanService.getDeclareUse(condition);
			gridData.setTotalProperty(declarePlanService.countDeclareUse(condition));
			gridData.setResults(result);
			return gridData;
		}
		
		/**
		 * 生成申报计划
		 * 
		 * 
		 * @param vo
		 *            申报计划Vo
		 * @return JSON信息
		 * @throws Exception
		 */
		@WebRemote
		public String saveDeclarePlan(DeclarePlanVo vo) throws Exception {
			Long userId = identity.getLoginUser().getUserid();// 登陆用户ID
			String[] declareIds = null;
			if((vo.getDeclareplanID()==null || vo.getDeclareplanID().equals(""))&& StringUtils.isNotEmpty(vo.getDeclareIds())){
				declareIds = vo.getDeclareIds().split(",");
				String declareplanCode = this.declarePlanService.getPlan_Code();
				for(String declareId : declareIds){ 
					this.declarePlanService.saveDeclarePlan(vo.getDeclareplanName(), declareplanCode, userId.toString(), declareId.toString(),vo.getDeclareplanType(),vo.getPropertyType());
				}
			}else{
				DeclarePlan declarePlan = declarePlanService.getDeclarePlan(vo.getDeclareplanID());
				if(declarePlan != null){
					declarePlan.setDeclareplanName(vo.getDeclareplanName());
 
					if(vo.getPropertyType().equals("固定资产"))
						vo.setPropertyType("1");
					else if(vo.getPropertyType().equals("非固定资产"))
						vo.setPropertyType("2");
					declarePlan.setPropertyType(vo.getPropertyType());
					if(vo.getStatus().equals("已退回")){
						declarePlan.setStatus("1");
					}
					this.declarePlanService.updateDeclarePlan(declarePlan);	
				}
			}
			
			return "{success:true}";
		}
		/**
		 * 生成申报计划
		 * 
		 * 
		 * @param vo
		 *            新建申报计划Vo
		 * @return JSON信息
		 * @throws Exception
		 */
		@WebRemote
		public String createDeclarePlan(DeclarePlanVo vo) throws Exception {
			Long userId = identity.getLoginUser().getUserid();// 登陆用户ID
			String declareplanCode = this.declarePlanService.getPlan_Code();
			vo.setDeclareplanCode(declareplanCode);
			vo.setEditer(userId.toString());
			declarePlanService.createDeclarePlan(vo);
			return "{success:true}";
		}
		/**
		 * 申报项打回
		 * declareDetilIds 申报详情Id集合
		 */
		@WebRemote
		public String callBack(String declareDetilIds[]){
			declarePlanService.callBack(declareDetilIds);
			return "{success:true}";
		}
		/**
		 * 申报项删除
		 * deleteDeclarePlan 申报计划Id集合
		 */
		@WebRemote
		public String deleteDeclarePlan(String declarePlanIds[]){
			declarePlanService.deleteDeclarePlan(declarePlanIds);
			return "{success:true}";
		}
		/**
		 * 申报项子项修改状态
		 * deleteDeclarePlan 申报计划Id集合
		 */
		@WebRemote
		public String updateProperties(String declarePlanIds[]){
			declarePlanService.updateProperties(declarePlanIds,"3");
			return "{success:true}";
		}
		
		/**
		 * 删除补充申报计划中的物资
		 * @param ids 申报记录明细id数组
		 * @param idd 申报记录明细所属的申报记录id
		 * @param amounts变动的金额
		 * @param declareplanId申报计划id
		 * @return
		 */
		@WebRemote
		public String delMaterial(String ids[],String idd,String[] amounts,String declareplanId){
			try {
				declarePlanService.delMaterial(ids,idd,amounts,declareplanId);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return "{success:true}";
		}
		
		/**
		 * 提交新建的申报计划
		 * @param ids
		 * @return
		 */
		@WebRemote
		public String submitDeclarePlan(String ids[]){
			try {
				declarePlanService.submitDeclarePlan(ids);
				return "{success:true}";
			} catch (Exception e) {
				e.printStackTrace();
				return "{success:false}";
			}
		}
		
		/**
		 * 删除新建的申报计划
		 * @param ids
		 * @return
		 */
		@WebRemote
		public String deleteDeclarePlan2(String[] ids){
			try {
				declarePlanService.deleteDeclarePlan2(ids);
				return "{success:true}";
			} catch (Exception e) {
				e.printStackTrace();
				return "{success:false}";
			}
		}
}
