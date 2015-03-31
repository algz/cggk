package com.sysware.customize.hd.investment.engineeringProject.contractManagement;

import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;

public class EngineeringProjectVo {
	
	private String engineeringContractId ;//主键id
	private String contractCode;//合同编号
	private String contractName;//合同名称
	private String tbCivilregistId;//外键:土建登记表的ID
	private CivilRegist civilRegist; //外键:土建登记表的ID
	private String partTwo;//乙方
	private String unitName;//单位名称
	private String workPerson;//经办人
	private String contractManagerPerson;//合同管理员
	private String superiorPerson;//行政分管领导
	private String fund;//金额
	private String fundUnit;//金额单位
	private String contractLevel;//合同密级
	private String approvalLog;//审批记录
	private String remarks;//备注
	private String uploadFileId;//上传文件ID
	private String uploadFile;//上传文件
	private String status;//状态
	private String ymd;//年月日
	
	
	private String projectCode ;//项目编号
	private String projectName ;//项目名称
	private String action;//行为动作标记位
	
	private int start;//开始记录数
	private int limit;//每页记录数
	private String dir;//远程排序使用 asc or desc 
	private String sort; //排序字段
	private String time;//查询时间
	private String fuzzyQueryString;//模糊查询的条件
	
	
	
	
	public String getFuzzyQueryString() {
		return fuzzyQueryString;
	}
	public void setFuzzyQueryString(String fuzzyQueryString) {
		this.fuzzyQueryString = fuzzyQueryString;
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
	public String getDir() {
		return dir;
	}
	public void setDir(String dir) {
		this.dir = dir;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getEngineeringContractId() {
		return engineeringContractId;
	}
	public void setEngineeringContractId(String engineeringContractId) {
		this.engineeringContractId = engineeringContractId;
	}
	public String getContractCode() {
		return contractCode;
	}
	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}
	public String getContractName() {
		return contractName;
	}
	public void setContractName(String contractName) {
		this.contractName = contractName;
	}
	public CivilRegist getCivilRegist() {
		return civilRegist;
	}
	public void setCivilRegist(CivilRegist civilRegist) {
		this.civilRegist = civilRegist;
	}
	public String getPartTwo() {
		return partTwo;
	}
	public void setPartTwo(String partTwo) {
		this.partTwo = partTwo;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	public String getWorkPerson() {
		return workPerson;
	}
	public void setWorkPerson(String workPerson) {
		this.workPerson = workPerson;
	}
	public String getContractManagerPerson() {
		return contractManagerPerson;
	}
	public void setContractManagerPerson(String contractManagerPerson) {
		this.contractManagerPerson = contractManagerPerson;
	}
	public String getSuperiorPerson() {
		return superiorPerson;
	}
	public void setSuperiorPerson(String superiorPerson) {
		this.superiorPerson = superiorPerson;
	}
	public String getFund() {
		return fund;
	}
	public void setFund(String fund) {
		this.fund = fund;
	}
	public String getFundUnit() {
		return fundUnit;
	}
	public void setFundUnit(String fundUnit) {
		this.fundUnit = fundUnit;
	}
	public String getContractLevel() {
		return contractLevel;
	}
	public void setContractLevel(String contractLevel) {
		this.contractLevel = contractLevel;
	}
	public String getApprovalLog() {
		return approvalLog;
	}
	public void setApprovalLog(String approvalLog) {
		this.approvalLog = approvalLog;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getUploadFile() {
		return uploadFile;
	}
	public void setUploadFile(String uploadFile) {
		this.uploadFile = uploadFile;
	}
	public String getYmd() {
		return ymd;
	}
	public void setYmd(String ymd) {
		this.ymd = ymd;
	}
	public String getTbCivilregistId() {
		return tbCivilregistId;
	}
	public void setTbCivilregistId(String tbCivilregistId) {
		this.tbCivilregistId = tbCivilregistId;
	}
	public String getProjectCode() {
		return projectCode;
	}
	public void setProjectCode(String projectCode) {
		this.projectCode = projectCode;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getUploadFileId() {
		return uploadFileId;
	}
	public void setUploadFileId(String uploadFileId) {
		this.uploadFileId = uploadFileId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	
	
	
	
	
}
