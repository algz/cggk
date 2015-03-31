package com.sysware.customize.hd.investment.stockInspect.qualityInspect;


import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.common.JsonUtil;

@Name("QualityInspectRemote")
public class QualityInspectRemote {

	@In(create=true,value="QualityInspectServiceImpl")
	private QualityInspectServiceImpl service;
	/**
	 * 获取质量监控表格信息（此处查询是是数据库的视图：v_quality_monitor ）
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String GetQualityInspect(QualityInspectVo vo){
		GridData<QualityInspectVo> data = new GridData<QualityInspectVo>();
		List<QualityInspectVo> list = service.GetQualityInspect(vo);
		data.setResults(list);
		data.setTotalProperty(service.GetQualityInspectCount(vo));
		String dataJson = JsonUtil.toJsonStr(data);
		return dataJson;
	}
}
