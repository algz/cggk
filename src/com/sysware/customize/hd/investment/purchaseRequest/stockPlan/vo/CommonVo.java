package com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo;

import java.util.Date;

public class CommonVo {
	private String proName;

	private String planName;
	private String planCode;
	private String planType;
	private String userId;
	private String insertDate;
	private String declarePlanId;
	private String declarePlanDetailId;

	private String column;
	private String tableName;
	private String flagField;
	private String columnValue;
	private String flagValue;

	private String procurementPlan_ID;//申报计划ID

	private String codeRule;
	private Date date;
	
	
	private String sCode; // 审签编码
	private String contractCode; // 合同编码
	private String contractName; 
	private String contractAmount; 
	private String supplierId; 
	private String arrvialDate; 
	private String contractType; 
	private String reMark; 
	private String fileName; 
	private String stockId;  // 采购计划 ID

	private int flag; // 1：编号自动生成 2：生成计划 3：计划打回 4：生产采购合同
	
	private String materialtypename;//物料类别,申报计划按物料类别生成不同编号的采购计划.

	public String getProName() {
		return proName;
	}

	public void setProName(String proName) {
		this.proName = proName;
	}

	public String getPlanName() {
		return planName;
	}

	public void setPlanName(String planName) {
		this.planName = planName;
	}

	public String getPlanCode() {
		return planCode;
	}

	public void setPlanCode(String planCode) {
		this.planCode = planCode;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPlanType() {
		return planType;
	}

	public void setPlanType(String planType) {
		this.planType = planType;
	}

	public String getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(String insertDate) {
		this.insertDate = insertDate;
	}

	public String getDeclarePlanId() {
		return declarePlanId;
	}

	public void setDeclarePlanId(String declarePlanId) {
		this.declarePlanId = declarePlanId;
	}

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public String getProcurementPlan_ID() {
		return procurementPlan_ID;
	}

	public void setProcurementPlan_ID(String procurementPlanID) {
		procurementPlan_ID = procurementPlanID;
	}

	public String getCodeRule() {
		return codeRule;
	}

	public void setCodeRule(String codeRule) {
		this.codeRule = codeRule;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getColumn() {
		return column;
	}

	public void setColumn(String column) {
		this.column = column;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getFlagField() {
		return flagField;
	}

	public void setFlagField(String flagField) {
		this.flagField = flagField;
	}

	public String getColumnValue() {
		return columnValue;
	}

	public void setColumnValue(String columnValue) {
		this.columnValue = columnValue;
	}

	public String getFlagValue() {
		return flagValue;
	}

	public void setFlagValue(String flagValue) {
		this.flagValue = flagValue;
	}

	public String getSCode() {
		return sCode;
	}

	public void setSCode(String code) {
		sCode = code;
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

	public String getContractAmount() {
		return contractAmount;
	}

	public void setContractAmount(String contractAmount) {
		this.contractAmount = contractAmount;
	}

	public String getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(String supplierId) {
		this.supplierId = supplierId;
	}

	public String getArrvialDate() {
		return arrvialDate;
	}

	public void setArrvialDate(String arrvialDate) {
		this.arrvialDate = arrvialDate;
	}

	public String getContractType() {
		return contractType;
	}

	public void setContractType(String contractType) {
		this.contractType = contractType;
	}

	public String getReMark() {
		return reMark;
	}

	public void setReMark(String reMark) {
		this.reMark = reMark;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getStockId() {
		return stockId;
	}

	public void setStockId(String stockId) {
		this.stockId = stockId;
	}

	public String getDeclarePlanDetailId() {
		return declarePlanDetailId;
	}

	public void setDeclarePlanDetailId(String declarePlanDetailId) {
		this.declarePlanDetailId = declarePlanDetailId;
	}
	
	

}
