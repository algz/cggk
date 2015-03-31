package com.sysware.customize.hd.investment.civilService.dao;

import java.util.List;

import com.sysware.customize.hd.investment.civilService.entity.CivilServiceImplPlan;
import com.sysware.customize.hd.investment.civilService.vo.CivilServiceImplPlanVo;
import com.sysware.customize.hd.investment.deviceProject.util.UtilVo;

public interface CivilServiceManageDao {

	/**
	 * 查询执行计划数据
	 * @param vo
	 * @return
	 */
	List<CivilServiceImplPlan> getGridData(CivilServiceImplPlanVo vo);
	
	/**
	 * 修改设备大修执行计划审批状态
	 * @param id
	 * @param flag
	 */
	public void updateApprovalState(String id,String flag);

	/**
	 * 查询执行计划项目编号
	 * @param vo
	 * @return
	 */
	List<Object[]> getProjectNums(UtilVo vo);
}
