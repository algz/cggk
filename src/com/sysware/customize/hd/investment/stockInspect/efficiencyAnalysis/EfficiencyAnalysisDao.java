package com.sysware.customize.hd.investment.stockInspect.efficiencyAnalysis;

import java.util.List;

public interface EfficiencyAnalysisDao {

	/**
	 * 获取效能分析表格信息（此处查询是是数据库的视图：v_Efficiency_Analysis）
	 * @param vo
	 * @return
	 */
	public List<EfficiencyAnalysisVo> GetEfficiencyAnalysis(EfficiencyAnalysisVo vo);
	
	/**
	 * 获取效能分析表格信息总条数（此处查询是是数据库的视图：v_Efficiency_Analysis）
	 * @param vo
	 * @return
	 */
	public long GetEfficiencyAnalysisCount(EfficiencyAnalysisVo vo);
}
