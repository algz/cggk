package com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo;

/**
 * 计划草案 VO类
 * 
 * @author LIT
 * 
 * @date 2011.10.10
 * 
 */

public class PlandraftVo {
	private String declareId;
	private String declarePlanName;
	private String declarePlanNum;
	private String totalItem;
	private String money;
	private String status;
	private String makeTablePerson;
	//用户编号(后添加zhoup)
	private String makeTablePersonId;
	private String makeTime;
	private String submitTime;
    private String materialcatalogName;
    private String materialItemName;
    private String departmentName;
    private String procurementType;
    private String taskCode;
    private String quantity;
    private String amount;
    private String plant;
    private String materialStandard;
    private String planId;
    private String tenderId;
	public String getTenderId() {
		return tenderId;
	}

	public void setTenderId(String tenderId) {
		this.tenderId = tenderId;
	}

	public String getPlanId() {
		return planId;
	}

	public void setPlanId(String planId) {
		this.planId = planId;
	}

	private Integer limit;
	private Integer start;
   //申报计划资产类别
	private String propertyType;
	public String getDeclareId() {
		return declareId;
	}

	public void setDeclareId(String declareId) {
		this.declareId = declareId;
	}

	public String getDeclarePlanName() {
		return declarePlanName;
	}

	public void setDeclarePlanName(String declarePlanName) {
		this.declarePlanName = declarePlanName;
	}

	public String getDeclarePlanNum() {
		return declarePlanNum;
	}

	public void setDeclarePlanNum(String declarePlanNum) {
		this.declarePlanNum = declarePlanNum;
	}

	public String getTotalItem() {
		return totalItem;
	}

	public void setTotalItem(String totalItem) {
		this.totalItem = totalItem;
	}

	public String getMoney() {
		return money;
	}

	public void setMoney(String money) {
		this.money = money;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMakeTablePerson() {
		return makeTablePerson;
	}

	public void setMakeTablePerson(String makeTablePerson) {
		this.makeTablePerson = makeTablePerson;
	}

	public String getMakeTime() {
		return makeTime;
	}

	public void setMakeTime(String makeTime) {
		this.makeTime = makeTime;
	}

	public String getSubmitTime() {
		return submitTime;
	}

	public void setSubmitTime(String submitTime) {
		this.submitTime = submitTime;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public String getMaterialcatalogName() {
		return materialcatalogName;
	}

	public void setMaterialcatalogName(String materialcatalogName) {
		this.materialcatalogName = materialcatalogName;
	}

	public String getMaterialItemName() {
		return materialItemName;
	}

	public void setMaterialItemName(String materialItemName) {
		this.materialItemName = materialItemName;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getProcurementType() {
		return procurementType;
	}

	 

	public void setProcurementType(String procurementType) {
		this.procurementType = procurementType;
	} 
	public String getTaskCode() {
		return taskCode;
	}

	public void setTaskCode(String taskCode) {
		this.taskCode = taskCode;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

 

	public String getMaterialStandard() {
		return materialStandard;
	}

	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}

	public String getPlant() {
		return plant;
	}

	public void setPlant(String plant) {
		this.plant = plant;
	}

	public String getMakeTablePersonId() {
		return makeTablePersonId;
	}

	public void setMakeTablePersonId(String makeTablePersonId) {
		this.makeTablePersonId = makeTablePersonId;
	}

	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}
}
