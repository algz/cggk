package com.sysware.customize.hd.investment.stockInspect.stockContract;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("StockContractServiceImpl")
public class StockContractServiceImpl implements StockContractService {

	@In(create=true,value="StockContractDaoImpl")
	private StockContractDaoImpl dao;
	
	/**
	 * 获取合同表的信息
	 * @param vo
	 * @return
	 */
	public List<StockContractVo> GetStockContract(StockContractVo vo){
		return dao.GetStockContract(vo);
	}
	
	
	/**
	 * 获取合同表的信息总数
	 * @param vo
	 * @return
	 */
	public long GetStockContractCount(StockContractVo vo){
		return dao.GetStockContractCount(vo);
	}
	
	public List<StockContractVo> GetFixedStockContract(StockContractVo vo) {
		return dao.GetFixedStockContract(vo);
	}


	public long GetFixedStockContractCount(StockContractVo vo) {
		return dao.GetFixedStockContractCount(vo);
	}


	/**
	 * 获取合同表的信息
	 * @param vo
	 * @return
	 */
	public List<StockContractVo> GetContractToAnalysis(StockContractVo vo){
		return dao.GetContractToAnalysis(vo);
	}
}
