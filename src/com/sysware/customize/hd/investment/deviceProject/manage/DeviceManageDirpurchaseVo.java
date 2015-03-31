package com.sysware.customize.hd.investment.deviceProject.manage;



public class DeviceManageDirpurchaseVo {

	// Fields
	private String implementplanid;
	private String dirpurchaseid;
	private String measurescard;
	private String certificates;
	private String report;
	private String initiallingagreement;
	private String quote;
	private String organizationnegotiations;
	private String contractsigning;
	private String equipregistId;
	
	private Integer start;
	private Integer limit;
	private Integer count;
	
	
	
	
	// Constructors

	public String getEquipregistId() {
		return equipregistId;
	}

	public void setEquipregistId(String equipregistId) {
		this.equipregistId = equipregistId;
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

	/** default constructor */
	public DeviceManageDirpurchaseVo() {
	}

	/** minimal constructor */
	public DeviceManageDirpurchaseVo(String dirpurchaseid) {
		this.dirpurchaseid = dirpurchaseid;
	}

	/** full constructor */
	public DeviceManageDirpurchaseVo(String dirpurchaseid, String measurescard,
			String certificates, String report, String initiallingagreement,
			String quote, String organizationnegotiations, String contractsigning) {
		this.dirpurchaseid = dirpurchaseid;
		this.measurescard = measurescard;
		this.certificates = certificates;
		this.report = report;
		this.initiallingagreement = initiallingagreement;
		this.quote = quote;
		this.organizationnegotiations = organizationnegotiations;
		this.contractsigning = contractsigning;
	}

	// Property accessors

	public String getDirpurchaseid() {
		return this.dirpurchaseid;
	}

	public void setDirpurchaseid(String dirpurchaseid) {
		this.dirpurchaseid = dirpurchaseid;
	}

	public String getMeasurescard() {
		return this.measurescard;
	}

	public void setMeasurescard(String measurescard) {
		this.measurescard = measurescard;
	}


	public String getCertificates() {
		return this.certificates;
	}

	public void setCertificates(String certificates) {
		this.certificates = certificates;
	}


	public String getReport() {
		return this.report;
	}

	public void setReport(String report) {
		this.report = report;
	}


	public String getInitiallingagreement() {
		return this.initiallingagreement;
	}

	public void setInitiallingagreement(String initiallingagreement) {
		this.initiallingagreement = initiallingagreement;
	}


	public String getQuote() {
		return this.quote;
	}

	public void setQuote(String quote) {
		this.quote = quote;
	}


	public String getOrganizationnegotiations() {
		return this.organizationnegotiations;
	}

	public void setOrganizationnegotiations(String organizationnegotiations) {
		this.organizationnegotiations = organizationnegotiations;
	}


	public String getContractsigning() {
		return this.contractsigning;
	}

	public void setContractsigning(String contractsigning) {
		this.contractsigning = contractsigning;
	}

	public String getImplementplanid() {
		return implementplanid;
	}

	public void setImplementplanid(String implementplanid) {
		this.implementplanid = implementplanid;
	}

	
	
	
}