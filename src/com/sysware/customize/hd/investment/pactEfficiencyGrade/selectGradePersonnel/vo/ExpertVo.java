package com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.vo;

public class ExpertVo {

	//主键专家表ID
	private String id;
	//专家编号
	private String expert_code;
	//专家姓名
	private String expert_name;
	//专家性别
	private String expert_sex;
	//专家年龄
	private String expert_age;
	//专家职务
	private String expert_post;
	//专家职称
	private String expert_title;
	//专长
	private String expertise;
	
	//项目编号
	private String project_code;
	//项目名称
	private String project_name;
	
	//展开树时前台默认传递到前台的展开编号
	private String node;
	
	
	public String getProject_code() {
		return project_code;
	}
	public void setProject_code(String projectCode) {
		project_code = projectCode;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public String getExpert_sex() {
		return expert_sex;
	}
	public void setExpert_sex(String expertSex) {
		expert_sex = expertSex;
	}
	public String getExpert_age() {
		return expert_age;
	}
	public void setExpert_age(String expertAge) {
		expert_age = expertAge;
	}
	public String getExpert_post() {
		return expert_post;
	}
	public void setExpert_post(String expertPost) {
		expert_post = expertPost;
	}
	public String getExpert_title() {
		return expert_title;
	}
	public void setExpert_title(String expertTitle) {
		expert_title = expertTitle;
	}
	public String getExpertise() {
		return expertise;
	}
	public void setExpertise(String expertise) {
		this.expertise = expertise;
	}
	public String getNode() {
		return node;
	}
	public void setNode(String node) {
		this.node = node;
	}
	public String getProject_name() {
		return project_name;
	}
	public void setProject_name(String projectName) {
		project_name = projectName;
	}
}
