/**
 * 
 */
package com.sysware.customize.hd.investment.investmentTopMonitor.quotaStatistics;

import java.util.List;

import net.sf.json.JSONObject;

/**
 * @author OAUser
 *
 */
public interface QuotaStatisticsService {

	List<JSONObject> getExecuteRateData(QuotaStatisticsVo vo);
	
	List<JSONObject> scatteredPlanChart(QuotaStatisticsVo vo);
	
	List<JSONObject> countContractAmoutChart(QuotaStatisticsVo vo);
	
	List<JSONObject> countAnnualBudgetAmoutChart(QuotaStatisticsVo vo);
}
