package com.sysware.customize.hd.investment.civilService.service;

import java.util.List;

import com.sysware.customize.hd.investment.civilService.vo.CivilServiceImplPlanVo;
import com.sysware.customize.hd.investment.deviceProject.util.UtilVo;

public interface CivilServiceManageService {

	/**
	 * 查询执行计划数据
	 * @param vo
	 * @return
	 */
	List<CivilServiceImplPlanVo> getGridData(CivilServiceImplPlanVo vo);
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
