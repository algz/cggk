package com.sysware.customize.hd.investment.stockInspect.qualityInspect;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("QualityInspectServiceImpl")
public class QualityInspectServiceImpl implements QualityInspectService {

	@In(create=true,value="QualityInspectDaoImpl")
	private QualityInspectDaoImpl dao;
	/**
	 * 获取质量监控表格信息（此处查询是是数据库的视图：v_quality_monitor ）
	 * @param vo
	 * @return
	 */
	public List<QualityInspectVo> GetQualityInspect(QualityInspectVo vo){
		return dao.GetQualityInspect(vo);
	}
	
	/**
	 * 获取质量监控表格信息总条数（此处查询是是数据库的视图：v_quality_monitor ）
	 * @param vo
	 * @return
	 */
	public long GetQualityInspectCount(QualityInspectVo vo){
		return dao.GetQualityInspectCount(vo);
	}
}
