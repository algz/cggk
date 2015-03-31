package com.sysware.customize.hd.investment.investmentTopMonitor.unplannedPurchase;

import java.util.List;

/**
 * 计划外采购监控Service
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-29
 * 
 */
public interface UnplannedPurchaseService {

	/**
	 * 获得计划外采购监控详情
	 * 
	 * @return 计划外采购监控详情
	 */
	List<UnplannedPurchase> getUnplanedPurchases(String[] materialIds, final int begin, final int max);
	
	/**
	 * 计算计划外采购监控详情记录总数
	 * 
	 * @return 计划外采购监控详情记录总数
	 */
	long countUnplanedPurchases(String[] materialIds);
}
