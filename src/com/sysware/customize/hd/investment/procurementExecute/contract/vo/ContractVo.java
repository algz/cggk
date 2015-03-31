package com.sysware.customize.hd.investment.procurementExecute.contract.vo;

public class ContractVo {

	private String contractId;
	private String contractCode;
	private String contractName;
	private String tenderId;
	private String departmentA;
	private String departmentB;
	private String contractAmount;
	private String status;
	private String createDate;
	private String reMark;

	private String contractFile;
	private String filePath;

	private String enstrustFile;
	private String enstrustFilePath;
	private String fileName;
	private String fileId;
    private String tenderType;//1土建2者机电设备
    private String vendorId;//供应商Id
    
    private String acceptnum;//项目编号
 
	public String getVendorId() {
		return vendorId;
	}

	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}

	public String getTenderType() {
		return tenderType;
	}

	public void setTenderType(String tenderType) {
		this.tenderType = tenderType;
	}

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

	private Integer start;
	private Integer limit;

	private Integer flag;

	private String type;

	public String getEnstrustFile() {
		return enstrustFile;
	}

	public void setEnstrustFile(String enstrustFile) {
		this.enstrustFile = enstrustFile;
	}

	public String getContractId() {
		return contractId;
	}

	public void setContractId(String contractId) {
		this.contractId = contractId;
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

	public String getTenderId() {
		return tenderId;
	}

	public void setTenderId(String tenderId) {
		this.tenderId = tenderId;
	}

	public String getDepartmentA() {
		return departmentA;
	}

	public void setDepartmentA(String departmentA) {
		this.departmentA = departmentA;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDepartmentB() {
		return departmentB;
	}

	public void setDepartmentB(String departmentB) {
		this.departmentB = departmentB;
	}

	public String getContractAmount() {
		return contractAmount;
	}

	public void setContractAmount(String contractAmount) {
		this.contractAmount = contractAmount;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getContractFile() {
		return contractFile;
	}

	public void setContractFile(String contractFile) {
		this.contractFile = contractFile;
	}

	public String getReMark() {
		return reMark;
	}

	public void setReMark(String reMark) {
		this.reMark = reMark;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getEnstrustFilePath() {
		return enstrustFilePath;
	}

	public void setEnstrustFilePath(String enstrustFilePath) {
		this.enstrustFilePath = enstrustFilePath;
	}

	public String getAcceptnum() {
		return acceptnum;
	}

	public void setAcceptnum(String acceptnum) {
		this.acceptnum = acceptnum;
	}

}
