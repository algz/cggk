package com.sysware.customize.hd.investment.productionMaterialsManagement.contractExecute;

import java.io.Serializable;

/**
 * 合同执行情况VO
 * 
 * @author tianlin
 * @version 1.0
 * @created 2011-08-03
 * 
 */
public class ContractExecuteVo implements Serializable {
	private static final long serialVersionUID = 1L;

	private String contractExecuteId;// 合同执行情况ID

	private String acceptance;// 保管验收盖章

	private String batchNo;// 批次号

	private String certificate;// 技术证明

	private String createDate;// 创建日期

	private String equipmentNumber;// 材料件数

	private String procurementContractId;// 合同ID

	private String remark;// 备注

	private String storageDate;// 入库日期

	private String storageNo;// 入库单号

	private String storageNumber;// 入库数量

	private String testDate;// 请验日期

	private String testNo;// 请验单号

	private String transportDate;// 运输日期

	private String transportMode;// 运输方式

	private String transportNo;// 运输单号
	
	private String arrivalDate;// 到场时间
	
	private int start;
	private int limit;

	public String getContractExecuteId() {
		return contractExecuteId;
	}

	public void setContractExecuteId(String contractExecuteId) {
		this.contractExecuteId = contractExecuteId;
	}

	public String getAcceptance() {
		return acceptance;
	}

	public void setAcceptance(String acceptance) {
		this.acceptance = acceptance;
	}

	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	public String getCertificate() {
		return certificate;
	}

	public void setCertificate(String certificate) {
		this.certificate = certificate;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getEquipmentNumber() {
		return equipmentNumber;
	}

	public void setEquipmentNumber(String equipmentNumber) {
		this.equipmentNumber = equipmentNumber;
	}

	public String getProcurementContractId() {
		return procurementContractId;
	}

	public void setProcurementContractId(String procurementContractId) {
		this.procurementContractId = procurementContractId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getStorageDate() {
		return storageDate;
	}

	public void setStorageDate(String storageDate) {
		this.storageDate = storageDate;
	}

	public String getStorageNo() {
		return storageNo;
	}

	public void setStorageNo(String storageNo) {
		this.storageNo = storageNo;
	}

	public String getStorageNumber() {
		return storageNumber;
	}

	public void setStorageNumber(String storageNumber) {
		this.storageNumber = storageNumber;
	}

	public String getTestDate() {
		return testDate;
	}

	public void setTestDate(String testDate) {
		this.testDate = testDate;
	}

	public String getTestNo() {
		return testNo;
	}

	public void setTestNo(String testNo) {
		this.testNo = testNo;
	}

	public String getTransportDate() {
		return transportDate;
	}

	public void setTransportDate(String transportDate) {
		this.transportDate = transportDate;
	}

	public String getTransportMode() {
		return transportMode;
	}

	public void setTransportMode(String transportMode) {
		this.transportMode = transportMode;
	}

	public String getTransportNo() {
		return transportNo;
	}

	public void setTransportNo(String transportNo) {
		this.transportNo = transportNo;
	}

	public String getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(String arrivalDate) {
		this.arrivalDate = arrivalDate;
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