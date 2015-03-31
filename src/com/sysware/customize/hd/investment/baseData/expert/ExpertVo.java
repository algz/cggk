package com.sysware.customize.hd.investment.baseData.expert;

public class ExpertVo {
	/**
	 * 专长
	 */
	private String expertise;
	/**
	 * 专家年龄
	 */
	private String exportAge;
	/**
	 * 专家编号
	 */
	private String exportCode;
	/**
	 * 主键专家表ID
	 */
	private String exportID;
	/**
	 * 专家姓名
	 */
	private String exportName;
	/**
	 * 专家职务
	 */
	private String exportPost;
	/**
	 * 专家性别
	 */
	private String exportSex;
	/**
	 * 专家职称
	 */
	private String exportTitle;
	 
	/**
	 * 项目金额
	 */
	private String projectAmount;
	/**
	 * 项目编号
	 */
	private String projectCode;
	/**
	 * 主键ID
	 */
    private String  projectExportRelationId;
	/**
	 * 项目名称
	 */
	private String projectName;
	
	private int start;
	private int limit;
	public String getExpertise() {
		return expertise;
	}
	public void setExpertise(String expertise) {
		this.expertise = expertise;
	}
	public String getExportAge() {
		return exportAge;
	}
	public void setExportAge(String exportAge) {
		this.exportAge = exportAge;
	}
	public String getExportCode() {
		return exportCode;
	}
	public void setExportCode(String exportCode) {
		this.exportCode = exportCode;
	}
	public String getExportID() {
		return exportID;
	}
	public void setExportID(String exportID) {
		this.exportID = exportID;
	}
	public String getExportName() {
		return exportName;
	}
	public void setExportName(String exportName) {
		this.exportName = exportName;
	}
	public String getExportPost() {
		return exportPost;
	}
	public void setExportPost(String exportPost) {
		this.exportPost = exportPost;
	}
	public String getExportSex() {
		return exportSex;
	}
	public void setExportSex(String exportSex) {
		this.exportSex = exportSex;
	}
	public String getExportTitle() {
		return exportTitle;
	}
	public void setExportTitle(String exportTitle) {
		this.exportTitle = exportTitle;
	}
	public String getProjectAmount() {
		return projectAmount;
	}
	public void setProjectAmount(String projectAmount) {
		this.projectAmount = projectAmount;
	}
	public String getProjectCode() {
		return projectCode;
	}
	public void setProjectCode(String projectCode) {
		this.projectCode = projectCode;
	}
	public String getProjectExportRelationId() {
		return projectExportRelationId;
	}
	public void setProjectExportRelationId(String projectExportRelationId) {
		this.projectExportRelationId = projectExportRelationId;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
}
