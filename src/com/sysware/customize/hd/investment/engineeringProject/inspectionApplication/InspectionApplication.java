package com.sysware.customize.hd.investment.engineeringProject.inspectionApplication;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;


/**
 * TbDeviceContractmanagement entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "TB_ENGINEERING_INSPECTION")
public class InspectionApplication implements java.io.Serializable {
	
	// Fields
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 4263632338997365343L;

	@Id
	@Column(name = "INSPECTIOAPPLICATIOID", unique = true, nullable = false, length = 50)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	private String inspectioapplicatioid;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "APPLICATIONTIME", length = 7)
	private Date applicationtime;
	
	@Column(name = "PROJECTDIRECTORTEL", length = 50)
	private String projectdirectortel;
	
	@Column(name = "SUPPLIERSCONTACT", length = 50)
	private String supplierscontact;
	
	@Column(name = "SUPPLIERSTEL", length = 50)
	private String supplierstel;
	
	@Column(name = "ADMINISTRATIVEUNIT", length = 50)
	private String administrativeunit;
	
	@Column(name = "OPINION", length = 200)
	private String opinion;

	@Column(name = "STATUS", length = 2)
	private String status;//状态:-1已退回;1待审批;2审批中;3已审批
	
	@ManyToOne(targetEntity=Vendor.class,fetch=FetchType.LAZY)
	@JoinColumn(name = "SUPPLIERSID")
	private Vendor suppliers;
	
	@ManyToOne(targetEntity=CivilRegist.class,fetch=FetchType.LAZY)
	@JoinColumn(name = "CIVILREGIST_ID")
	private CivilRegist civilregist;
	
	// Constructors

	/** default constructor */
	public InspectionApplication() {
	}

	/** minimal constructor */
	public InspectionApplication(String inspectioapplicatioid) {
		this.inspectioapplicatioid = inspectioapplicatioid;
	}

	/** full constructor */
	public InspectionApplication(String inspectioapplicatioid, Date applicationtime, String projectdirectortel, String suppliersid, String supplierscontact, String supplierstel,
			String administrativeunit, String opinion, String civilregistId) {
		this.inspectioapplicatioid = inspectioapplicatioid;
		this.applicationtime = applicationtime;
		this.projectdirectortel = projectdirectortel;
		this.supplierscontact = supplierscontact;
		this.supplierstel = supplierstel;
		this.administrativeunit = administrativeunit;
		this.opinion = opinion;
	}

	// Property accessors
	
	public String getInspectioapplicatioid() {
		return this.inspectioapplicatioid;
	}

	public void setInspectioapplicatioid(String inspectioapplicatioid) {
		this.inspectioapplicatioid = inspectioapplicatioid;
	}


	public Date getApplicationtime() {
		return this.applicationtime;
	}

	public void setApplicationtime(Date applicationtime) {
		this.applicationtime = applicationtime;
	}


	public String getProjectdirectortel() {
		return this.projectdirectortel;
	}

	public void setProjectdirectortel(String projectdirectortel) {
		this.projectdirectortel = projectdirectortel;
	}




	public Vendor getSuppliers() {
		return suppliers;
	}

	public void setSuppliers(Vendor suppliers) {
		this.suppliers = suppliers;
	}

	public String getSupplierscontact() {
		return this.supplierscontact;
	}

	public void setSupplierscontact(String supplierscontact) {
		this.supplierscontact = supplierscontact;
	}


	public String getSupplierstel() {
		return this.supplierstel;
	}

	public void setSupplierstel(String supplierstel) {
		this.supplierstel = supplierstel;
	}

	
	public String getAdministrativeunit() {
		return this.administrativeunit;
	}

	public void setAdministrativeunit(String administrativeunit) {
		this.administrativeunit = administrativeunit;
	}


	public String getOpinion() {
		return this.opinion;
	}

	public void setOpinion(String opinion) {
		this.opinion = opinion;
	}

	public CivilRegist getCivilregist() {
		return civilregist;
	}

	public void setCivilregist(CivilRegist civilregist) {
		this.civilregist = civilregist;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
}