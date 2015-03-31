package com.sysware.customize.hd.investment.productionMaterialsManagement.contractExecute;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 
 * 
 */
@Entity
@Table(name = "T_ContractExecute")
public class ContractExecute implements Serializable {
	private static final long serialVersionUID = 1L;

	private String contractExecuteId;// 合同执行情况ID

	private String acceptance;// 保管验收盖章

	private String batchNo;// 批次号

	private String certificate;// 技术证明

	private Date createDate;// 创建日期

	private BigDecimal equipmentNumber;// 材料件数

	private String procurementContractId;// 合同ID

	private String remark;// 备注

	private Date storageDate;// 入库日期

	private String storageNo;// 入库单号

	private BigDecimal storageNumber;// 入库数量

	private Date testDate;// 请验日期

	private String testNo;// 请验单号

	private Date transportDate;// 运输日期

	private String transportMode;// 运输方式

	private String transportNo;// 运输单号

	private Date arrivalDate;// 到场时间

	@Id
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	@Column(unique = true, nullable = false)
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

	@Temporal(TemporalType.DATE)
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public BigDecimal getEquipmentNumber() {
		return equipmentNumber;
	}

	public void setEquipmentNumber(BigDecimal equipmentNumber) {
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

	@Temporal(TemporalType.DATE)
	public Date getStorageDate() {
		return storageDate;
	}

	public void setStorageDate(Date storageDate) {
		this.storageDate = storageDate;
	}

	public String getStorageNo() {
		return storageNo;
	}

	public void setStorageNo(String storageNo) {
		this.storageNo = storageNo;
	}

	public BigDecimal getStorageNumber() {
		return storageNumber;
	}

	public void setStorageNumber(BigDecimal storageNumber) {
		this.storageNumber = storageNumber;
	}

	@Temporal(TemporalType.DATE)
	public Date getTestDate() {
		return testDate;
	}

	public void setTestDate(Date testDate) {
		this.testDate = testDate;
	}

	public String getTestNo() {
		return testNo;
	}

	public void setTestNo(String testNo) {
		this.testNo = testNo;
	}

	@Temporal(TemporalType.DATE)
	public Date getTransportDate() {
		return transportDate;
	}

	public void setTransportDate(Date transportDate) {
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

	@Column(name = "ARRRIVALDATE")
	public Date getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(Date arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

}