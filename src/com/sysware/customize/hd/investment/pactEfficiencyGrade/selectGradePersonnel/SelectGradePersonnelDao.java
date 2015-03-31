package com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel;

import java.util.List;

import net.sf.json.JSONArray;

import com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo.AnalysisDetailVo;
import com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo.EfficiencyAnalysisVo;
import com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo.ExpertVo;
import com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo.ProjectExpertRelationVo;

public interface SelectGradePersonnelDao {

	
	/**
	 * 查询项目方向
	 * @return
	 */
	public List<ProjectExpertRelationVo> GetProject();
	
	/**
	 * 查询某个方向的专家
	 * @param vo
	 * @return
	 */
	public List<ExpertVo> GetExpert(ProjectExpertRelationVo vo);
	
	/**
	 * 获得某个合同的评分参与人
	 * @return
	 */
	public List<EfficiencyAnalysisVo> GetGradeParticipant(EfficiencyAnalysisVo vo);
	
	/**
	 * 添加合同评分参与人员
	 * @param vo
	 * @return
	 */
	public int insertContractGradeParticipant(EfficiencyAnalysisVo vo);
	
	/**
	 * 删除某个项目中的部分参与人
	 * @param vo
	 * @return
	 */
	public int DelectContractGradeParticipant(EfficiencyAnalysisVo vo);
	
	/**
	 * 获取某个合同的所有评分信息
	 * @param vo
	 * @return
	 */
	public List<AnalysisDetailVo> GetAnalysisDetailForGrade(AnalysisDetailVo vo);
	
	/**
	 * 获取某个合同的所有评分信息条数
	 * @param vo
	 * @return
	 */
	public long GetAnalysisDetailForGradeCount(AnalysisDetailVo vo);
	
	/**
	 * 根据合同编号和专家号添加评分信息
	 * @param vo
	 * @return
	 */
	public int UpdateAnalysisDetail(AnalysisDetailVo vo);
	
	/**
	 * 判断某个合同下面的参与人评分是否已经全部都评分了，如果全部评分了就统计综合评分信息.在此判断有没有评分以表t_analysis_detail的ratio_price字段为准
	 * @param vo
	 * @return
	 */
	public String OpinionTheEAForScore(AnalysisDetailVo vo);
	
	/**
	 * 查询合同的所有评分人
	 * @param vo
	 * @return
	 */
	public JSONArray getScorersByContract(AnalysisDetailVo vo);
}
