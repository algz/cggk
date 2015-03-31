package com.sysware.customize.hd.investment.stockInspect.stockContract;

import java.util.List;

public interface StockContractDao {

	
	/**
	 * 获取合同表的信息
	 * @param vo
	 * @return
	 */
	public List<StockContractVo> GetStockContract(StockContractVo vo);
	
	
	/**
	 * 获取合同表的信息总数
	 * @param vo
	 * @return
	 */
	public long GetStockContractCount(StockContractVo vo);
	/**
	 * 获取合同表(固定资产)的信息
	 * @param vo
	 * @return
	 */
	public List<StockContractVo> GetFixedStockContract(StockContractVo vo);
	
	
	/**
	 * 获取合同表（固定资产）的信息总数
	 * @param vo
	 * @return
	 */
	public long GetFixedStockContractCount(StockContractVo vo);
	
	/**
	 * 获取合同表的信息
	 * @param vo
	 * @return
	 */
	public List<StockContractVo> GetContractToAnalysis(StockContractVo vo);
}
