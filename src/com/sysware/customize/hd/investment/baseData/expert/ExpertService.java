package com.sysware.customize.hd.investment.baseData.expert;

import java.util.List;
 
public interface ExpertService {
	/**
	 * 获取专家表
	 * @param vo
	 * @return
	 */
	List<Expert> getExportList(ExpertVo vo);
	/**
	 * 获取专家与项目关联表
	 * @param vo
	 * @return
	 */
	List<ProjectExpertRelation> getProjectExportList(ExpertVo vo);
	
	/**
	 * 获取专家表总数
	 * @param vo
	 * @return
	 */
	Long getExportListCount(ExpertVo vo);
	/**
	 * 获取专家与项目关联表总数
	 * @param vo
	 * @return
	 */
	Long getProjectExportListCount(ExpertVo vo);
	/**
	 * 保存专家
	 * @param vo
	 * @return
	 */
	public String saveExpert(ExpertVo vo);
	/**
	 * 删除专家
	 * @param vo
	 * @return
	 */
	public String delExpert(ExpertVo vo);
}
