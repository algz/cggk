package com.sysware.customize.hd.investment.deviceProject.manage;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

/**
 * TbDeviceManageDirpurchase entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "TB_DEVICE_MANAGE_DIRPURCHASE")
public class DeviceManageDirpurchase extends DeviceManage implements java.io.Serializable {

	// Fields
	
	@Id
	@Column(name = "DIRPURCHASEID", nullable = false, length = 50)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	private String dirpurchaseid;

	@Temporal(TemporalType.DATE)
	@Column(name = "MEASURESCARD", length = 7)
	private Date measurescard;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CERTIFICATES", length = 7)
	private Date certificates;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "REPORT", length = 7)
	private Date report;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "INITIALLINGAGREEMENT", length = 7)
	private Date initiallingagreement;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "QUOTE", length = 7)
	private Date quote;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "ORGANIZATIONNEGOTIATIONS", length = 7)
	private Date organizationnegotiations;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CONTRACTSIGNING", length = 7)
	private Date contractsigning;

	
	// Constructors

	/** default constructor */
	public DeviceManageDirpurchase() {
	}

	/** minimal constructor */
	public DeviceManageDirpurchase(String dirpurchaseid) {
		this.dirpurchaseid = dirpurchaseid;
	}

	/** full constructor */
	public DeviceManageDirpurchase(String dirpurchaseid, Date measurescard,
			Date certificates, Date report, Date initiallingagreement,
			Date quote, Date organizationnegotiations, Date contractsigning) {
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

	public Date getMeasurescard() {
		return this.measurescard;
	}

	public void setMeasurescard(Date measurescard) {
		this.measurescard = measurescard;
	}


	public Date getCertificates() {
		return this.certificates;
	}

	public void setCertificates(Date certificates) {
		this.certificates = certificates;
	}


	public Date getReport() {
		return this.report;
	}

	public void setReport(Date report) {
		this.report = report;
	}


	public Date getInitiallingagreement() {
		return this.initiallingagreement;
	}

	public void setInitiallingagreement(Date initiallingagreement) {
		this.initiallingagreement = initiallingagreement;
	}


	public Date getQuote() {
		return this.quote;
	}

	public void setQuote(Date quote) {
		this.quote = quote;
	}


	public Date getOrganizationnegotiations() {
		return this.organizationnegotiations;
	}

	public void setOrganizationnegotiations(Date organizationnegotiations) {
		this.organizationnegotiations = organizationnegotiations;
	}


	public Date getContractsigning() {
		return this.contractsigning;
	}

	public void setContractsigning(Date contractsigning) {
		this.contractsigning = contractsigning;
	}


	
	
	
	
}