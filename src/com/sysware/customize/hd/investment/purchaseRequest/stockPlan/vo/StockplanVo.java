package com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo;

/**
 * 采购计划 vo类
 * @author lit
 * @date 2011.10.10
 */
public class StockplanVo {
	
	private String   planId;    
	private String   planName;    
	private String   planNum ;   
	private String   planType;    
	private String   stockType;  
	private String   stockPlanStatus;    
	private String   money;
	private String   moneyCompare;  
	private String   status;    
	private String   markPerson;  
	private String   markTime; 
	private String   submitTime;
	private String truename;
	private String minAmount;
	private String maxAmount;
	
	private Integer limit;
	private Integer start;
	private Integer count;
	
	private String materialcatalogid;//物资种类ID
	private String materialcatalogname;//物资种类名称
	private String declarePlanId;//采购计划ID
	private String declarePlanDetailId;//采购计划详情ID
	private String materialitemname;//物资名称
	private String materialitemcode;//物资编号
	private String taskno;//任务编号
	private String desingnation;//牌号
	private String materialstandard;//规格
	private String deliveryStatus;//交货状态
	private String use;//用途
	private String procurementplanCode;//采购计划
	
	
	public String getDesingnation() {
		return desingnation;
	}
	public void setDesingnation(String desingnation) {
		this.desingnation = desingnation;
	}
	public String getMaterialstandard() {
		return materialstandard;
	}
	public void setMaterialstandard(String materialstandard) {
		this.materialstandard = materialstandard;
	}
	public String getDeliveryStatus() {
		return deliveryStatus;
	}
	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}
	public String getUse() {
		return use;
	}
	public void setUse(String use) {
		this.use = use;
	}
	public String getProcurementplanCode() {
		return procurementplanCode;
	}
	public void setProcurementplanCode(String procurementplanCode) {
		this.procurementplanCode = procurementplanCode;
	}
	public String getTruename() {
		return truename;
	}
	public void setTruename(String truename) {
		this.truename = truename;
	}
	public String getMinAmount() {
		return minAmount;
	}
	public void setMinAmount(String minAmount) {
		this.minAmount = minAmount;
	}
	public String getMaxAmount() {
		return maxAmount;
	}
	public void setMaxAmount(String maxAmount) {
		this.maxAmount = maxAmount;
	}
	public String getPlanId() {
		return planId;
	}
	public void setPlanId(String planId) {
		this.planId = planId;
	}
	public String getPlanName() {
		return planName;
	}
	public void setPlanName(String planName) {
		this.planName = planName;
	}
	public String getPlanNum() {
		return planNum;
	}
	public void setPlanNum(String planNum) {
		this.planNum = planNum;
	}
	public String getPlanType() {
		return planType;
	}
	public void setPlanType(String planType) {
		this.planType = planType;
	}
	public String getStockType() {
		return stockType;
	}
	public void setStockType(String stockType) {
		this.stockType = stockType;
	}
	public String getStockPlanStatus() {
		return stockPlanStatus;
	}
	public void setStockPlanStatus(String stockPlanStatus) {
		this.stockPlanStatus = stockPlanStatus;
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
	public String getMarkPerson() {
		return markPerson;
	}
	public void setMarkPerson(String markPerson) {
		this.markPerson = markPerson;
	}
	public String getMarkTime() {
		return markTime;
	}
	public void setMarkTime(String markTime) {
		this.markTime = markTime;
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
	public String getMoneyCompare() {
		return moneyCompare;
	}
	public void setMoneyCompare(String moneyCompare) {
		this.moneyCompare = moneyCompare;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public String getDeclarePlanId() {
		return declarePlanId;
	}
	public void setDeclarePlanId(String declarePlanId) {
		this.declarePlanId = declarePlanId;
	}
	public String getDeclarePlanDetailId() {
		return declarePlanDetailId;
	}
	public void setDeclarePlanDetailId(String declarePlanDetailId) {
		this.declarePlanDetailId = declarePlanDetailId;
	}
	public String getMaterialcatalogid() {
		return materialcatalogid;
	}
	public void setMaterialcatalogid(String materialcatalogid) {
		this.materialcatalogid = materialcatalogid;
	}
	public String getMaterialitemname() {
		return materialitemname;
	}
	public void setMaterialitemname(String materialitemname) {
		this.materialitemname = materialitemname;
	}
	public String getMaterialitemcode() {
		return materialitemcode;
	}
	public void setMaterialitemcode(String materialitemcode) {
		this.materialitemcode = materialitemcode;
	}
	public String getTaskno() {
		return taskno;
	}
	public void setTaskno(String taskno) {
		this.taskno = taskno;
	}
	public String getMaterialcatalogname() {
		return materialcatalogname;
	}
	public void setMaterialcatalogname(String materialcatalogname) {
		this.materialcatalogname = materialcatalogname;
	}

	
	
	
}
