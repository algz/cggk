package com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo;

public class EfficiencyAnalysisVo {

	//主键ID
	private String id;
	//合同表ID
	private String contract_id;
	//创建人
	private String creater;
	//创建时间
	private String create_date;
	//分值
	private String score;
	
	//获取专家组中的专家组基本信息
	//项目编号
	private String project_code;
	//项目名称
	private String project_name;
	
	//获取专家表中的专家基本信息
	//专家表主键ID
	private String expertId;
	//专家编号
	private String expert_code;
	//专家姓名
	private String expert_name;
	
	//保存从前台传递过来的某个合同需要添加的评分参与人
	private String expertCodeForContract;
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getContract_id() {
		return contract_id;
	}
	public void setContract_id(String contractId) {
		contract_id = contractId;
	}
	public String getCreater() {
		return creater;
	}
	public void setCreater(String creater) {
		this.creater = creater;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	public String getExpert_code() {
		return expert_code;
	}
	public void setExpert_code(String expertCode) {
		expert_code = expertCode;
	}
	public String getExpert_name() {
		return expert_name;
	}
	public void setExpert_name(String expertName) {
		expert_name = expertName;
	}
	public String getProject_code() {
		return project_code;
	}
	public void setProject_code(String projectCode) {
		project_code = projectCode;
	}
	public String getProject_name() {
		return project_name;
	}
	public void setProject_name(String projectName) {
		project_name = projectName;
	}
	public String getCreate_date() {
		return create_date;
	}
	public void setCreate_date(String createDate) {
		create_date = createDate;
	}
	public String getExpertCodeForContract() {
		return expertCodeForContract;
	}
	public void setExpertCodeForContract(String expertCodeForContract) {
		this.expertCodeForContract = expertCodeForContract;
	}
	public String getExpertId() {
		return expertId;
	}
	public void setExpertId(String expertId) {
		this.expertId = expertId;
	}
}
