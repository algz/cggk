package com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.stockPaymentTask;

import java.util.List;

public interface StockPaymentTaskService {

	List<StockPaymentTaskVo> getContractList(StockPaymentTaskVo vo);
	
	long getContractListCount(StockPaymentTaskVo vo);
	
	List<StockPaymentTaskVo> getVendorAccountList(StockPaymentTaskVo vo);
	
	void insertStockPaymentTask(StockPaymentTask vo);
	
	void updateStockPaymentTask(StockPaymentTask vo);
	
	List<StockPaymentTaskVo> getPaymentTask(StockPaymentTaskVo vo);
	long getPaymentTaskCount(StockPaymentTaskVo vo);
	
	StockPaymentTask getStockPaymentTask(StockPaymentTaskVo vo);
	StockPaymentTask getStockPaymentTask(String psId);
	void deleteStockPaymentTask(String psIds);
	
	void updateState(String ids,long state);
}
