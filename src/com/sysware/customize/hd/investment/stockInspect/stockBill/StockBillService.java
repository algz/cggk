package com.sysware.customize.hd.investment.stockInspect.stockBill;

import java.util.List;

public interface StockBillService {

	/**
	 * 获取所有的采购清单信息（获取申报记录明细表中的信息“T_DECLARE_DETIL”）
	 * @param vo
	 * @return
	 */
	public List<StockBillVo> GetStockBill(StockBillVo vo);
	
	/**
	 * 获取所有的采购清单信息总数（获取申报记录明细表中的信息“T_DECLARE_DETIL”）
	 * @param vo
	 * @return
	 */
	public long GetStockBillCount(StockBillVo vo);
}
