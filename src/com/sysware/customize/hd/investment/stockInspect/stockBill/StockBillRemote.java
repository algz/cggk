package com.sysware.customize.hd.investment.stockInspect.stockBill;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.common.JsonUtil;

@Name("StockBillRemote")
public class StockBillRemote {

	@In(create=true,value="StockBillServiceImpl")
	private StockBillServiceImpl service;
	
	/**
	 * 获取所有的采购清单信息（获取申报记录明细表中的信息“T_DECLARE_DETIL”）
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String GetStockBill(StockBillVo vo){
		GridData<StockBillVo> data = new GridData<StockBillVo>();
		List<StockBillVo> list = service.GetStockBill(vo);
		data.setResults(list);
		data.setTotalProperty(service.GetStockBillCount(vo));
		String dataJson = JsonUtil.toJsonStr(data);
		return dataJson;
	}
}
