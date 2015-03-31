package com.sysware.customize.hd.investment.stockInspect.stockPlan;

import java.util.List;

import com.sysware.customize.hd.investment.stockInspect.stockPlan.vo.StockPlanParticularVo;

public interface StockInspectService {

	/**
	 * 获取所有的采购计划信息
	 * @return
	 */
	public List<StockInspectVo> GetStockInspect(StockInspectVo vo);
	/**
	 * 获取所有的采购计划(固定资产)信息
	 * @return
	 */
	public List<StockInspectVo> GetFixedStockPlan(StockInspectVo vo);
	
	/**
	 * 获取所有的采购计划信息的总数
	 * @param vo
	 * @return
	 */
	public long GetStockInspectCount(StockInspectVo vo);
	/**
	 * 获取所有的采购计划（固定资产）信息的总数
	 * @param vo
	 * @return
	 */
	public long GetFixedStockPlanCount(StockInspectVo vo);
	
	/**
	 * 获取一个采购计划的详细信息（查询使用视图：v_profixed_declareplan）
	 * @param vo
	 * @return
	 */
	public List<StockPlanParticularVo> GetStockPlanParticular(StockPlanParticularVo vo);
	
	/**
	 * 获取一个采购计划的详细信息汇总（查询使用视图：v_profixed_declareplan）
	 * @param vo
	 * @return
	 */
	public long GetStockPlanParticularCount(StockPlanParticularVo vo);
}
