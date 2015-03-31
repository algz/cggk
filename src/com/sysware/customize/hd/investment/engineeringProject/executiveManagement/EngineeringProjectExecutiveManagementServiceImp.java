/**
 * 
 */
package com.sysware.customize.hd.investment.engineeringProject.executiveManagement;

import java.text.ParseException;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.engineeringProject.contractManagement.EngineeringProjectFormVo;


/**
 * @author algz
 *
 */
@Name("engineeringProject_EngineeringProjectExecutiveManagementServiceImp")
public class EngineeringProjectExecutiveManagementServiceImp implements EngineeringProjectExecutiveManagementService {

	@In(create = true, value = "engineeringProject_EngineeringProjectExecutiveManagementDaoImp")
	private EngineeringProjectExecutiveManagementDaoImp dao;

	public List<EngineeringProjectExecutiveManagementVo> getGridData(EngineeringProjectExecutiveManagementVo vo,Pager pager){
		return dao.getGridData(vo,pager);
	}

	public List<EngineeringProjectExecutiveManagementVo> getCivilManageById(
			String id) {
		return dao.getCivilManageById(id);
	}

	public String saveImplementPlan(EngineeringProjectExecutiveManagementVo vo) {
		return dao.saveImplementPlan(vo);
	}

	public String sendImplementPlan(EngineeringProjectExecutiveManagementVo vo) {
		return dao.sendImplementPlan(vo);
	}
	
	
	
	/**
	 * 编辑前新增一条数据
	 * @param vo
	 * @return
	 */
	public String beforeEditAdd(EngineeringProjectExecutiveManagementVo vo){
		return dao.beforeEditAdd(vo);
	}
	
	
	/**
	 * 获取 项目编码
	 * @param vo
	 * @param pager
	 * @return
	 */
	public List<FixedAssetAcceptanceApplyModelVo> getVendorByGroup(FixedAssetAcceptanceApplyModelVo vo,Pager pager){
		return dao.getVendorByGroup(vo, pager);
	}
	
	
	
	/**
	 * ajax调用,是否有存在的记录了,如果没有就新增,返回成功
	 * @param vo
	 * @return
	 */
	@Transactional
	public String selectOrAdd(FixedAssetAcceptanceApplyModelVo vo)  throws Exception {
		String returnString1 = "",returnString2 ="",returnStringFinal ="";
		returnString1 = dao.selectModel(vo);
		if(returnString1.equals("yes")){
			returnString2 = dao.saveModel(vo);
			if(returnString2.equals("yes")){
				returnStringFinal = "0";//新增成功
			}else{
				returnStringFinal = "2";//错误2 插入数据库异常,需要检查
			}
		}else{
			returnStringFinal = "1";//错误1 有>=1条的数据了,不要再添加了
		}
		/*String action = StringUtils.isBlank(vo.getAction()) ? "" : vo.getAction();
		String returnString = "";
		if(action.equals("add")){
			returnString = engineeringProjectDao.addEngineeringProject(vo);
		}else if(action.equals("update")){
			returnString =  engineeringProjectDao.updateEngineeringProject(vo);
		}
		return returnString ;*/
		return returnStringFinal;
	}
	
	
	
	/**
	 * 修改审批状态
	 * @param id
	 * @param flag
	 */
	@Transactional
	public void updateApprovalState(String id,String flag){
		dao.updateApprovalState(id, flag);
	}
	
	
	
	
	
}
