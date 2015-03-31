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
 * TbDeviceManageSelftender entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "TB_DEVICE_MANAGE_SELFTENDER")
public class DeviceManageSelftender implements java.io.Serializable {

	// Fields

	@Id
	@Column(name = "SELFTENDERID", nullable = false, length = 50)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	private String selftenderid;
	
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
	@Column(name = "AUDITINGREGISTRATION", length = 7)
	private Date auditingregistration;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "ENTRUSTMENTAGREEMENT", length = 7)
	private Date entrustmentagreement;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "SUBMITTECHNICALINDICATORS", length = 7)
	private Date submittechnicalindicators;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "LINKEDNETWORK", length = 7)
	private Date linkednetwork;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "TENDERASSESSMENT", length = 7)
	private Date tenderassessment;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "DIRECTEDTENDER", length = 7)
	private Date directedtender;
	
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
	public DeviceManageSelftender() {
	}

	/** minimal constructor */
	public DeviceManageSelftender(String selftenderid) {
		this.selftenderid = selftenderid;
	}

	/** full constructor */
	public DeviceManageSelftender(String selftenderid, Date measurescard,
			Date certificates, Date technicalindicators,
			Date auditingregistration, Date entrustmentagreement,
			Date submittechnicalindicators, Date linkednetwork,
			Date tenderassessment, Date directedtender,
			Date informationdissemination, Date tenderregistration,
			Date issuedtenders, Date bidevaluation, Date calibration,
			Date signedagreement, Date contractsigning) {
		this.selftenderid = selftenderid;
		this.measurescard = measurescard;
		this.certificates = certificates;
		this.technicalindicators = technicalindicators;
		this.auditingregistration = auditingregistration;
		this.entrustmentagreement = entrustmentagreement;
		this.submittechnicalindicators = submittechnicalindicators;
		this.linkednetwork = linkednetwork;
		this.tenderassessment = tenderassessment;
		this.directedtender = directedtender;
		this.informationdissemination = informationdissemination;
		this.tenderregistration = tenderregistration;
		this.issuedtenders = issuedtenders;
		this.bidevaluation = bidevaluation;
		this.calibration = calibration;
		this.signedagreement = signedagreement;
		this.contractsigning = contractsigning;
	}

	// Property accessors

	public String getSelftenderid() {
		return this.selftenderid;
	}

	public void setSelftenderid(String selftenderid) {
		this.selftenderid = selftenderid;
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


	public Date getAuditingregistration() {
		return this.auditingregistration;
	}

	public void setAuditingregistration(Date auditingregistration) {
		this.auditingregistration = auditingregistration;
	}


	public Date getEntrustmentagreement() {
		return this.entrustmentagreement;
	}

	public void setEntrustmentagreement(Date entrustmentagreement) {
		this.entrustmentagreement = entrustmentagreement;
	}


	public Date getSubmittechnicalindicators() {
		return this.submittechnicalindicators;
	}

	public void setSubmittechnicalindicators(Date submittechnicalindicators) {
		this.submittechnicalindicators = submittechnicalindicators;
	}


	public Date getLinkednetwork() {
		return this.linkednetwork;
	}

	public void setLinkednetwork(Date linkednetwork) {
		this.linkednetwork = linkednetwork;
	}


	public Date getTenderassessment() {
		return this.tenderassessment;
	}

	public void setTenderassessment(Date tenderassessment) {
		this.tenderassessment = tenderassessment;
	}


	public Date getDirectedtender() {
		return this.directedtender;
	}

	public void setDirectedtender(Date directedtender) {
		this.directedtender = directedtender;
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