package com.sysware.customize.hd.investment.stockInspect.efficiencyAnalysis;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("EfficiencyAnalysisServiceImpl")
public class EfficiencyAnalysisServiceImpl implements EfficiencyAnalysisService {

	@In(create=true,value="EfficiencyAnalysisDaoImpl")
	private EfficiencyAnalysisDaoImpl dao;
	
	/**
	 * 获取效能分析表格信息（此处查询是是数据库的视图：v_Efficiency_Analysis）
	 * @param vo
	 * @return
	 */
	public List<EfficiencyAnalysisVo> GetEfficiencyAnalysis(EfficiencyAnalysisVo vo){
		return dao.GetEfficiencyAnalysis(vo);
	}
	
	/**
	 * 获取效能分析表格信息总条数（此处查询是是数据库的视图：v_Efficiency_Analysis）
	 * @param vo
	 * @return
	 */
	public long GetEfficiencyAnalysisCount(EfficiencyAnalysisVo vo){
		return dao.GetEfficiencyAnalysisCount(vo);
	}
}
