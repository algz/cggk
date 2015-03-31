package com.sysware.customize.hd.investment.stockInspect.stockContract;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.common.JsonUtil;

@Name("StockContractRemote")
public class StockContractRemote {

	@In(create=true,value="StockContractServiceImpl")
	private StockContractServiceImpl service;
	
	/**
	 * 获取合同表的信息
	 * @param vo
	 * @return
	 */
	public String GetStockContract(StockContractVo vo){
		GridData<StockContractVo> data = new GridData<StockContractVo>();
		List<StockContractVo> list = service.GetStockContract(vo);
		data.setResults(list);
		data.setTotalProperty(Long.parseLong(vo.getCount()));
		String dataJson = JsonUtil.toJsonStr(data);
		return dataJson;
	}
	/**
	 * 获取合同表(固定资产)的信息
	 * @param vo
	 * @return
	 */
	public String GetFixedStockContract(StockContractVo vo){
		GridData<StockContractVo> data = new GridData<StockContractVo>();
		List<StockContractVo> list = service.GetFixedStockContract(vo);
		data.setResults(list);
		data.setTotalProperty(service.GetFixedStockContractCount(vo));
		String dataJson = JsonUtil.toJsonStr(data);
		return dataJson;
	}
	/**
	 * 获取合同表的信息(合同效能评分界面使用)
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String GetContractToAnalysis(StockContractVo vo){
		GridData<StockContractVo> data = new GridData<StockContractVo>();
		List<StockContractVo> list = service.GetContractToAnalysis(vo);
		data.setResults(list);
		data.setTotalProperty(service.GetStockContractCount(vo));
		String dataJson = JsonUtil.toJsonStr(data);
		return dataJson;
	}
}
