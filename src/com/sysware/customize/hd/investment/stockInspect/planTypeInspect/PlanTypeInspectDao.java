package com.sysware.customize.hd.investment.stockInspect.planTypeInspect;

import java.util.List;

public interface PlanTypeInspectDao {

	/**
	 * 获取项数和金额总数和分别按采购类型统计出来的总数
	 * @return
	 */
	public List<PlanTypeInspectVo> GetAllAmoteAndQuantity(PlanTypeInspectVo vo);
	
	/**
	 * 获取项数和金额总数和分别按采购类型统计出来的总数
	 * @return
	 */
	public List<PlanTypeInspectVo> GetAmoteAndQuantity(PlanTypeInspectVo vo);
}
