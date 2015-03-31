package com.sysware.customize.hd.investment.stockInspect.stockBill;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("StockBillServiceImpl")
public class StockBillServiceImpl implements StockBillService {

	@In(create=true,value="StockBillDaoImpl")
	private StockBillDaoImpl dao;
	
	/**
	 * 获取所有的采购清单信息（获取申报记录明细表中的信息“T_DECLARE_DETIL”）
	 * @param vo
	 * @return
	 */
	public List<StockBillVo> GetStockBill(StockBillVo vo){
		return dao.GetStockBill(vo);
	}
	
	/**
	 * 获取所有的采购清单信息总数（获取申报记录明细表中的信息“T_DECLARE_DETIL”）
	 * @param vo
	 * @return
	 */
	public long GetStockBillCount(StockBillVo vo){
		return dao.GetStockBillCount(vo);
	}
}
