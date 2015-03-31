package com.sysware.customize.hd.investment.civilService;

public class CivilServiceVo {
	
	private String id;
	private String editId;
	private String repairProject  ;//维修项目 
	private String planCost ;//计划费用 
	private String costUnit ;//费用单位 
	private String annualInvestment ;//本年投资额 
	private String repairArea ;//修理面积 
	private String areaUnit ;//面积单位 
	private String useUnit ;//使用单位 
	private String repairContent ;//维修内容 
	private String repairStartTime ;//维修开始时间 
	private String repairAcceptanceTime ;//维修验收时间 
	private String repairDutyUnit ;//维修责任单位 
	private String remark ;//备注 
	private String updateFlag;//更新字段,flag
	
	
	
	private int start;//开始记录数
	private int limit;//每页记录数
	private String dir;//远程排序使用 asc or desc 
	private String sort; //排序字段
	private String time;//查询时间
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getRepairProject() {
		return repairProject;
	}
	public void setRepairProject(String repairProject) {
		this.repairProject = repairProject;
	}
	public String getPlanCost() {
		return planCost;
	}
	public void setPlanCost(String planCost) {
		this.planCost = planCost;
	}
	public String getCostUnit() {
		return costUnit;
	}
	public void setCostUnit(String costUnit) {
		this.costUnit = costUnit;
	}
	public String getAnnualInvestment() {
		return annualInvestment;
	}
	public void setAnnualInvestment(String annualInvestment) {
		this.annualInvestment = annualInvestment;
	}
	public String getRepairArea() {
		return repairArea;
	}
	public void setRepairArea(String repairArea) {
		this.repairArea = repairArea;
	}
	public String getAreaUnit() {
		return areaUnit;
	}
	public void setAreaUnit(String areaUnit) {
		this.areaUnit = areaUnit;
	}
	public String getUseUnit() {
		return useUnit;
	}
	public void setUseUnit(String useUnit) {
		this.useUnit = useUnit;
	}
	public String getRepairContent() {
		return repairContent;
	}
	public void setRepairContent(String repairContent) {
		this.repairContent = repairContent;
	}
	public String getRepairStartTime() {
		return repairStartTime;
	}
	public void setRepairStartTime(String repairStartTime) {
		this.repairStartTime = repairStartTime;
	}
	public String getRepairAcceptanceTime() {
		return repairAcceptanceTime;
	}
	public void setRepairAcceptanceTime(String repairAcceptanceTime) {
		this.repairAcceptanceTime = repairAcceptanceTime;
	}
	public String getRepairDutyUnit() {
		return repairDutyUnit;
	}
	public void setRepairDutyUnit(String repairDutyUnit) {
		this.repairDutyUnit = repairDutyUnit;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getUpdateFlag() {
		return updateFlag;
	}
	public void setUpdateFlag(String updateFlag) {
		this.updateFlag = updateFlag;
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
	public String getEditId() {
		return editId;
	}
	public void setEditId(String editId) {
		this.editId = editId;
	}
	
	
	
}
