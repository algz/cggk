package com.sysware.customize.hd.investment.civilService.dao;

import java.util.List;

import com.sysware.customize.hd.investment.civilService.entity.CivilServiceImplPlan;
import com.sysware.customize.hd.investment.civilService.vo.CivilServiceImplPlanVo;

public interface CivilServiceImplPlanDao {

	public List<CivilServiceImplPlan> getGridData(CivilServiceImplPlanVo vo);
	
	public String editCivilServiceImplPlan(CivilServiceImplPlanVo vo);
	/**
	 * 下发实施计划数据
	 * @param vo
	 * @return
	 */
	String sendImplementPlan(CivilServiceImplPlanVo vo);
}
