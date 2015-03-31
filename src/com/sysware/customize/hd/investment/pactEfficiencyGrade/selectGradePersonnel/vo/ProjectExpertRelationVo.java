package com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo;

public class ProjectExpertRelationVo {

	//主键ID
	private String id;
	//专家ID
	private String expert_id;
	//项目编号
	private String project_code;
	//项目名称
	private String project_name;
	//项目金额
	private String project_amount;

	//专家姓名，来自专家表(T_EXPERT)
	private String expert_name;
	
	//展开树时前台默认传递到前台的展开编号
	private String node;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getExpert_id() {
		return expert_id;
	}

	public void setExpert_id(String expertId) {
		expert_id = expertId;
	}

	public String getProject_code() {
		return project_code;
	}

	public void setProject_code(String projectCode) {
		project_code = projectCode;
	}

	public String getProject_amount() {
		return project_amount;
	}

	public void setProject_amount(String projectAmount) {
		project_amount = projectAmount;
	}

	public String getProject_name() {
		return project_name;
	}

	public void setProject_name(String projectName) {
		project_name = projectName;
	}

	public String getExpert_name() {
		return expert_name;
	}

	public void setExpert_name(String expertName) {
		expert_name = expertName;
	}

	public String getNode() {
		return node;
	}

	public void setNode(String node) {
		this.node = node;
	}
}
