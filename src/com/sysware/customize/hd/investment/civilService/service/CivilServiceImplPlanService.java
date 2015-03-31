package com.sysware.customize.hd.investment.civilService.service;

import java.util.List;

import com.sysware.customize.hd.investment.civilService.vo.CivilServiceImplPlanVo;
import com.sysware.customize.hd.investment.equipreService.EquipreServiceVo;

public interface CivilServiceImplPlanService {

	/**
	 * 查询实施计划数据
	 * @param vo
	 * @return
	 */
	List<CivilServiceImplPlanVo> getGridData(CivilServiceImplPlanVo vo);
	
	/**
	 * 编辑设备大修实施计划
	 * @param vo
	 * @return
	 */
	String editCivilServiceImplPlan(CivilServiceImplPlanVo vo);
	
	/**
	 * 下发实施计划数据
	 * @param vo
	 * @return
	 */
	String sendImplementPlan(CivilServiceImplPlanVo vo);
}
