package com.sysware.customize.hd.investment.stockInspect.stockPlan;

import java.util.ArrayList;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.common.JsonUtil;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.vo.StockPlanParticularVo;

@Name("StockInspectRemote")
public class StockInspectRemote {

	@In(create=true,value="StockInspectServiceImpl")
	private StockInspectServiceImpl service;
	
	/**
	 * 获取所有的采购计划信息
	 * @return
	 */
	@WebRemote
	public String GetStockInspect(StockInspectVo vo){
		//判断前台传递过来的值
//		System.out.println("计划类型："+vo.getPlantype()+"||状态："+vo.getStatus()+"||符号和金额："+vo.getJudgment()+"-"+vo.getAmount()+"||编制时间："+vo.getEditdate());
		GridData<StockInspectVo> data = new GridData<StockInspectVo>();
		List<StockInspectVo> list = new ArrayList<StockInspectVo>();
//		1.加载非固定资产采购计划
		list = service.GetStockInspect(vo);
		data.setResults(list);
		data.setTotalProperty(service.GetStockInspectCount(vo));
		String dataJson = JsonUtil.toJsonStr(data);
		return dataJson;
	}
	/**
	 * 获取所有的采购计划(固定资产)信息
	 * @return
	 */
	@WebRemote
	public String GetFixedStockPlan(StockInspectVo vo){
		//判断前台传递过来的值
		GridData<StockInspectVo> data = new GridData<StockInspectVo>();
		List<StockInspectVo> list = new ArrayList<StockInspectVo>();
//		1.加载非固定资产采购计划
		list = service.GetFixedStockPlan(vo);
		data.setResults(list);
		data.setTotalProperty(service.GetFixedStockPlanCount(vo));
		String dataJson = JsonUtil.toJsonStr(data);
		return dataJson;
	}
	/**
	 * 获取所有的采购计划信息
	 * @return
	 */
	@WebRemote
	public String GetStockPlanParticular(StockPlanParticularVo vo){
		GridData<StockPlanParticularVo> data = new GridData<StockPlanParticularVo>();
		List<StockPlanParticularVo> list = service.GetStockPlanParticular(vo);
		data.setResults(list);
		data.setTotalProperty(service.GetStockPlanParticularCount(vo));
		String dataJson = JsonUtil.toJsonStr(data);
		return dataJson;
	}
}
