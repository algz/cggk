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
 * TbDeviceManageEntrusttender entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "TB_DEVICE_MANAGE_ENTRUSTTENDER")
public class DeviceManageEntrusttender implements java.io.Serializable {

	// Fields
	
	@Id
	@Column(name = "ENTRUSTTENDERID", nullable = false, length = 50)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	private String entrusttenderid;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "MEASURESCARD", length = 7)
	private Date measurescard;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CERTIFICATES", length = 7)
	private Date certificates;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "TECHNICALINDICATORS", length = 7)
	private Date technicalindicators;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "INFORMATIONDISSEMINATION", length = 7)
	private Date informationdissemination;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "TENDERREGISTRATION", length = 7)
	private Date tenderregistration;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "ISSUEDTENDERS", length = 7)
	private Date issuedtenders;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "BIDEVALUATION", length = 7)
	private Date bidevaluation;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CALIBRATION", length = 7)
	private Date calibration;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "SIGNEDAGREEMENT", length = 7)
	private Date signedagreement;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "CONTRACTSIGNING", length = 7)
	private Date contractsigning;


	
	
	// Constructors

	/** default constructor */
	public DeviceManageEntrusttender() {
	}

	/** minimal constructor */
	public DeviceManageEntrusttender(String entrusttenderid) {
		this.entrusttenderid = entrusttenderid;
	}

	/** full constructor */
	public DeviceManageEntrusttender(String entrusttenderid,
			Date measurescard, Date certificates, Date technicalindicators,
			Date informationdissemination, Date tenderregistration,
			Date issuedtenders, Date bidevaluation, Date calibration,
			Date signedagreement, Date contractsigning) {
		this.entrusttenderid = entrusttenderid;
		this.measurescard = measurescard;
		this.certificates = certificates;
		this.technicalindicators = technicalindicators;
		this.informationdissemination = informationdissemination;
		this.tenderregistration = tenderregistration;
		this.issuedtenders = issuedtenders;
		this.bidevaluation = bidevaluation;
		this.calibration = calibration;
		this.signedagreement = signedagreement;
		this.contractsigning = contractsigning;
	}

	// Property accessors

	public String getEntrusttenderid() {
		return this.entrusttenderid;
	}

	public void setEntrusttenderid(String entrusttenderid) {
		this.entrusttenderid = entrusttenderid;
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


	public Date getTechnicalindicators() {
		return this.technicalindicators;
	}

	public void setTechnicalindicators(Date technicalindicators) {
		this.technicalindicators = technicalindicators;
	}


	public Date getInformationdissemination() {
		return this.informationdissemination;
	}

	public void setInformationdissemination(Date informationdissemination) {
		this.informationdissemination = informationdissemination;
	}


	public Date getTenderregistration() {
		return this.tenderregistration;
	}

	public void setTenderregistration(Date tenderregistration) {
		this.tenderregistration = tenderregistration;
	}


	public Date getIssuedtenders() {
		return this.issuedtenders;
	}

	public void setIssuedtenders(Date issuedtenders) {
		this.issuedtenders = issuedtenders;
	}


	public Date getBidevaluation() {
		return this.bidevaluation;
	}

	public void setBidevaluation(Date bidevaluation) {
		this.bidevaluation = bidevaluation;
	}


	public Date getCalibration() {
		return this.calibration;
	}

	public void setCalibration(Date calibration) {
		this.calibration = calibration;
	}


	public Date getSignedagreement() {
		return this.signedagreement;
	}

	public void setSignedagreement(Date signedagreement) {
		this.signedagreement = signedagreement;
	}


	public Date getContractsigning() {
		return this.contractsigning;
	}

	public void setContractsigning(Date contractsigning) {
		this.contractsigning = contractsigning;
	}


	
	
}