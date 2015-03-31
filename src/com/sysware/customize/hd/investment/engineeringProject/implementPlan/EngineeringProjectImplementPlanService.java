package com.sysware.customize.hd.investment.engineeringProject.implementPlan;

import java.util.List;

import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.cac.tc.model.Pager;

public interface EngineeringProjectImplementPlanService {

	/**
	 * 查询实施计划数据
	 * @param vo
	 * @return
	 */
	List<EngineeringProjectPlanVo> getGridData(EngineeringProjectPlanVo vo,Pager pager) ;
	
	/**
	 * 根据土建id查询实施计划数据
	 * @param id
	 * @return
	 */
	List<EngineeringProjectPlanVo> getImplementPlanById(String id);
	/**
	 * 保存实施计划数据
	 * @param vo
	 * @return
	 */
	String saveImplementPlan(EngineeringProjectPlanVo vo);

	/**
	 * 下发实施计划数据
	 * @param vo
	 * @return
	 */
	String sendImplementPlan(EngineeringProjectPlanVo vo);
	
	
	/**
	 * 编辑前新增一条数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String beforeEditAdd(EngineeringProjectPlanVo vo);
	
}