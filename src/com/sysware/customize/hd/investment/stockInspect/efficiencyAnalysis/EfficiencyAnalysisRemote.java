package com.sysware.customize.hd.investment.stockInspect.efficiencyAnalysis;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.common.JsonUtil;

@Name("EfficiencyAnalysisRemote")
public class EfficiencyAnalysisRemote {

	@In(create=true,value="EfficiencyAnalysisServiceImpl")
	private EfficiencyAnalysisServiceImpl service;
	
	/**
	 * 获取效能分析表格信息（此处查询是是数据库的视图：v_Efficiency_Analysis）
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String GetEfficiencyAnalysis(EfficiencyAnalysisVo vo){
		GridData<EfficiencyAnalysisVo> data = new GridData<EfficiencyAnalysisVo>();
		List<EfficiencyAnalysisVo> list = service.GetEfficiencyAnalysis(vo);
		data.setResults(list);
		data.setTotalProperty(service.GetEfficiencyAnalysisCount(vo));
		String dataJson = JsonUtil.toJsonStr(data);
		return dataJson;
	}
}
