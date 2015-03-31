package com.sysware.customize.hd.investment.baseData.expert;

import java.util.List;

import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAO;
import com.sysware.customize.hd.investment.baseData.material.Material;
 
public interface ExpertDao extends GenericDAO<Expert>{
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
