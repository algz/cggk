package com.sysware.customize.hd.investment.procurementExecute.contract.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 
 * 合同管理从表 实体类
 * 
 * @author LIT
 * 
 * @date2011-10-18
 * 
 */

@Entity
@Table(name = "T_CONTRACT")
public class Contract {

	private String contractId;
	private String contractCode;//合同编号 
	private String contractName;//合同名称 
	private String departmentA;//甲方 
	private String departmentB;//乙方 
	private BigDecimal contractAmount;//合同金额 
	private String status;//状态:1已生成，2审签中，3已审签，4已登记
	private Date createDate;//创建时间 
	private String contractFile;//合同文件 
	private String reMark;//备注 
	private String contract_type;//合同类型1土建2固定资产
	private String enstrust_file;
    private String vendorId;//乙方Id
	public String getVendorId() {
		return vendorId;
	}

	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}

	private String fileName;
	private String fileId;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	@Id
	@Column(name = "CONTRACT_ID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getContractId() {
		return contractId;
	}

	public void setContractId(String contractId) {
		this.contractId = contractId;
	}

	@Column(name = "CONTRACT_CODE")
	public String getContractCode() {
		return contractCode;
	}

	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}

	@Column(name = "CONTRACT_NAME")
	public String getContractName() {
		return contractName;
	}

	public void setContractName(String contractName) {
		this.contractName = contractName;
	}

	@Column(name = "DEPARTMENT_A")
	public String getDepartmentA() {
		return departmentA;
	}

	public void setDepartmentA(String departmentA) {
		this.departmentA = departmentA;
	}

	@Column(name = "STATUS")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "DEPARTMENT_B")
	public String getDepartmentB() {
		return departmentB;
	}

	public void setDepartmentB(String departmentB) {
		this.departmentB = departmentB;
	}

	@Column(name = "CONTRACT_AMOUNT")
	public BigDecimal getContractAmount() {
		return contractAmount;
	}

	public void setContractAmount(BigDecimal contractAmount) {
		this.contractAmount = contractAmount;
	}

	@Column(name = "CREATEDATE")
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	@Column(name = "CONTRACT_FILE")
	public String getContractFile() {
		return contractFile;
	}

	public void setContractFile(String contractFile) {
		this.contractFile = contractFile;
	}

	@Column(name = "REMARK")
	public String getReMark() {
		return reMark;
	}

	public void setReMark(String reMark) {
		this.reMark = reMark;
	}

	@Column(name = "Contract_type")
	public String getContract_type() {
		return contract_type;
	}

	public void setContract_type(String contractType) {
		contract_type = contractType;
	}

	@Column(name = "Enstrust_file")
	public String getEnstrust_file() {
		return enstrust_file;
	}

	public void setEnstrust_file(String enstrust_file) {
		this.enstrust_file = enstrust_file;
	}

}
