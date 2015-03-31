package com.sysware.customize.hd.investment.deviceProject.contractManagement;


/**
 * TbDeviceContractmanagement entity. @author MyEclipse Persistence Tools
 */
public class DeviceContractmanagementVo {

	// Fields

	private String contractid;
	private String contractcode;
	private String contractname;
	private String partyb;
	private String partybname;
	private String amount;
	private String amountUnit;
	private String secrecy;
	private String partya;
	private String operatorid;
	private String contractmanager;
	private String leader;	
	private String fileid;//文件ID
	private String filename;
	private String remark;
	private String status;
	private String approvaltime;//送审时间
	private String contracttype;//合同类型:1或空设备类型;2工程类型；3设备大修；4土建大修
	private String contractlevel;//合同级别:1股份公司;2集团公司
	
	private String equipregistId;//项目ID
	private String projectnum;//项目编号
	private String projectname;//项目名称
	private String projectcategorys;//项目类别
	
	private Integer start;
	private Integer limit;
	private Integer count;
	
	// Constructors

	/** default constructor */
	public DeviceContractmanagementVo() {
	}


	
	
	public String getFilename() {
		return filename;
	}




	public void setFilename(String filename) {
		this.filename = filename;
	}




	public String getFileid() {
		return fileid;
	}

	public void setFileid(String fileid) {
		this.fileid = fileid;
	}




	public String getContractid() {
		return contractid;
	}




	public void setContractid(String contractid) {
		this.contractid = contractid;
	}




	public String getOperatorid() {
		return operatorid;
	}




	public void setOperatorid(String operatorid) {
		this.operatorid = operatorid;
	}




	public String getEquipregistId() {
		return equipregistId;
	}


	public void setEquipregistId(String equipregistId) {
		this.equipregistId = equipregistId;
	}




	public String getProjectnum() {
		return projectnum;
	}




	public void setProjectnum(String projectnum) {
		this.projectnum = projectnum;
	}




	public String getProjectname() {
		return projectname;
	}




	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}




	public String getRemark() {
		return remark;
	}



	public void setRemark(String remark) {
		this.remark = remark;
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



	public Integer getCount() {
		return count;
	}



	public void setCount(Integer count) {
		this.count = count;
	}

	public String getContractcode() {
		return contractcode;
	}

	public void setContractcode(String contractcode) {
		this.contractcode = contractcode;
	}

	public String getContractname() {
		return contractname;
	}

	public void setContractname(String contractname) {
		this.contractname = contractname;
	}

	public String getPartyb() {
		return partyb;
	}

	public void setPartyb(String partyb) {
		this.partyb = partyb;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getAmountUnit() {
		return amountUnit;
	}

	public void setAmountUnit(String amountUnit) {
		this.amountUnit = amountUnit;
	}

	public String getSecrecy() {
		return secrecy;
	}

	public void setSecrecy(String secrecy) {
		this.secrecy = secrecy;
	}

	public String getPartya() {
		return partya;
	}

	public void setPartya(String partya) {
		this.partya = partya;
	}

	public String getoperatorid() {
		return operatorid;
	}

	public void setoperatorid(String operatorid) {
		this.operatorid = operatorid;
	}

	public String getContractmanager() {
		return contractmanager;
	}

	public void setContractmanager(String contractmanager) {
		this.contractmanager = contractmanager;
	}

	public String getLeader() {
		return leader;
	}

	public void setLeader(String leader) {
		this.leader = leader;
	}




	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getApprovaltime() {
		return approvaltime;
	}

	public void setApprovaltime(String approvaltime) {
		this.approvaltime = approvaltime;
	}

	public String getPartybname() {
		return partybname;
	}
	
	public void setPartybname(String partybname) {
		this.partybname = partybname;
	}




	public String getContracttype() {
		return contracttype;
	}




	public void setContracttype(String contracttype) {
		this.contracttype = contracttype;
	}




	public String getContractlevel() {
		return contractlevel;
	}




	public void setContractlevel(String contractlevel) {
		this.contractlevel = contractlevel;
	}




	public String getProjectcategorys() {
		return projectcategorys;
	}




	public void setProjectcategorys(String projectcategorys) {
		this.projectcategorys = projectcategorys;
	}

	
	
}