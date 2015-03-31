package com.sysware.customize.hd.investment.stockInspect.stockPlan;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.customize.cac.tc.material.MyTool;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.vo.StockPlanParticularVo;

@Name("StockInspectServiceImpl")
public class StockInspectServiceImpl implements StockInspectService {

	@In(create=true,value="StockInspectDaoImpl")
	private StockInspectDaoImpl dao;
	
	/**
	 * 获取所有的采购计划信息
	 * @return
	 */
	public List<StockInspectVo> GetStockInspect(StockInspectVo vo){
		return dao.GetStockInspect(vo);
	}
	
	/**
	 * 获取所有的采购计划信息的总数
	 * @param vo
	 * @return
	 */
	public long GetStockInspectCount(StockInspectVo vo){
		return dao.GetStockInspectCount(vo);
	}
	
	public List<StockInspectVo> GetFixedStockPlan(StockInspectVo vo) {
		return dao.GetFixedStockPlan(vo);
	}

	public long GetFixedStockPlanCount(StockInspectVo vo) {
		return dao.GetFixedStockPlanCount(vo);
	}

	/**
	 * 获取一个采购计划的详细信息（查询使用视图：v_profixed_declareplan）
	 * @param vo
	 * @return
	 */
	public List<StockPlanParticularVo> GetStockPlanParticular(StockPlanParticularVo vo){
		return dao.GetStockPlanParticular(vo);
	}
	
	/**
	 * 获取一个采购计划的详细信息汇总（查询使用视图：v_profixed_declareplan）
	 * @param vo
	 * @return
	 */
	public long GetStockPlanParticularCount(StockPlanParticularVo vo){
		return dao.GetStockPlanParticularCount(vo);
	}
}
