package com.sysware.customize.hd.investment.stockInspect.stockExecute;

import java.util.List;

public interface StockExecuteService {

	/**
	 * 获得入场登记表中根基合同编号查询到的数据
	 * @param vo
	 * @return
	 */
	public List<StockExecuteVo> GetStockExecute(StockExecuteVo vo);
	
	/**
	 * 获得入场登记表中根基合同编号查询到的数据
	 * @param vo
	 * @return
	 */
	public long GetStockExecuteCount(StockExecuteVo vo);
}
