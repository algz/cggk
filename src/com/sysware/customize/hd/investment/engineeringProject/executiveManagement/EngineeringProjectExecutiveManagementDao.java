package com.sysware.customize.hd.investment.engineeringProject.executiveManagement;


import java.util.List;

import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.cac.tc.model.Pager;

public interface EngineeringProjectExecutiveManagementDao {

	/**
	 * 查询实施计划数据
	 * @param vo
	 * @return
	 */
	List<EngineeringProjectExecutiveManagementVo> getGridData(EngineeringProjectExecutiveManagementVo vo,Pager pager) ;
	
	/**
	 *  根据土建id查询执行管理数据
	 * @param id
	 * @return
	 */
	List<EngineeringProjectExecutiveManagementVo> getCivilManageById(String id);
	/**
	 * 保存实施计划数据
	 * @param vo
	 * @return
	 */
	String saveImplementPlan(EngineeringProjectExecutiveManagementVo vo);
	
	/**
	 * 下发实施计划数据
	 * @param vo
	 * @return
	 */
	String sendImplementPlan(EngineeringProjectExecutiveManagementVo vo);
	
	
	/**
	 * 编辑前新增一条数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String beforeEditAdd(EngineeringProjectExecutiveManagementVo vo);
	
	
	/**
	 * 获取 项目编码
	 * @param vo
	 * @param pager
	 * @return
	 */
	public List<FixedAssetAcceptanceApplyModelVo> getVendorByGroup(FixedAssetAcceptanceApplyModelVo vo,Pager pager);
	
	
	/**
	 * ajax调用,是否有存在的记录了,如果没有就新增,返回成功
	 * @param vo
	 * @return
	 */
	public String selectModel(FixedAssetAcceptanceApplyModelVo vo);
	
	
	/**
	 * ajax调用,是否有存在的记录了,如果没有就新增,返回成功
	 * @param vo
	 * @return
	 */
	public String saveModel(FixedAssetAcceptanceApplyModelVo vo);
	
	
	/**
	 * 修改审批状态
	 * @param id
	 * @param flag
	 */
	public void updateApprovalState(String id,String flag);
	
	
	
	
}