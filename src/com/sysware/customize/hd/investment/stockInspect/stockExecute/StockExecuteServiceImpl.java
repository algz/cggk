package com.sysware.customize.hd.investment.stockInspect.stockExecute;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("StockExecuteServiceImpl")
public class StockExecuteServiceImpl implements StockExecuteService {

	@In(create=true,value="StockExecuteDaoImpl")
	private StockExecuteDaoImpl dao;
	
	/**
	 * 获得入场登记表中根基合同编号查询到的数据
	 * @param vo
	 * @return
	 */
	public List<StockExecuteVo> GetStockExecute(StockExecuteVo vo){
		return dao.GetStockExecute(vo);
	}
	
	/**
	 * 获得入场登记表中根基合同编号查询到的数据
	 * @param vo
	 * @return
	 */
	public long GetStockExecuteCount(StockExecuteVo vo){
		return dao.GetStockExecuteCount(vo);
	}
}
