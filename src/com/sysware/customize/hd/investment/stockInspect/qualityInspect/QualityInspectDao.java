package com.sysware.customize.hd.investment.stockInspect.qualityInspect;

import java.util.List;

public interface QualityInspectDao {

	/**
	 * 获取质量监控表格信息（此处查询是是数据库的视图：v_quality_monitor ）
	 * @param vo
	 * @return
	 */
	public List<QualityInspectVo> GetQualityInspect(QualityInspectVo vo);
	
	/**
	 * 获取质量监控表格信息总条数（此处查询是是数据库的视图：v_quality_monitor ）
	 * @param vo
	 * @return
	 */
	public long GetQualityInspectCount(QualityInspectVo vo);
}
