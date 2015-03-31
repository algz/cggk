/**
 * 
 */
package com.sysware.customize.hd.investment.investmentTopMonitor.quotaStatistics;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.sysware.codemaker.common.vo.GridData;

/**
 * @author OAUser
 *
 */
@Name("quotaStatisticsRemote")
public class QuotaStatisticsRemote {

	@In(value="quotaStatisticsService",create=true)
	QuotaStatisticsService service;
	
	/**
	 * 获得执行率数据
	 * @return
	 */
	@WebRemote
	public GridData<JSONObject> getExecuteRateData(QuotaStatisticsVo vo){
		GridData<JSONObject> data=new GridData<JSONObject>();
		data.setResults(service.getExecuteRateData(vo));
		data.setSuccess(true);
		return data;
	}
	
	@WebRemote
	public GridData<JSONObject> scatteredPlanChart(QuotaStatisticsVo vo){
		GridData<JSONObject> gd=new GridData<JSONObject>();
		gd.setResults(service.scatteredPlanChart(vo));
		return gd;
	}
	
	@WebRemote
	public GridData<JSONObject> countContractAmoutChart(QuotaStatisticsVo vo){
		GridData<JSONObject> gd=new GridData<JSONObject>();
		gd.setResults(service.countContractAmoutChart(vo));
		gd.setSuccess(true);
		return gd;
	}
	
	@WebRemote
	public GridData<JSONObject> countAnnualBudgetAmoutChart(QuotaStatisticsVo vo){
		GridData<JSONObject> gd=new GridData<JSONObject>();
		gd.setResults(service.countAnnualBudgetAmoutChart(vo));
		gd.setSuccess(true);
		return gd;
	}
	
}
