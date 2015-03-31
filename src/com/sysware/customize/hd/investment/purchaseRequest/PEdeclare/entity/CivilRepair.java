package com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "TB_CIVILREPAIR")
public class CivilRepair implements Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	private String id;
	
	@Column(name = "CREATETIME")
	private String createtime;
	
	@Column(name = "REPAIRPROJECT")
	private String repairproject;
	
	@Column(name = "PLANCOST")
	private String plancost;
	
	@Column(name = "COSTUNIT")
	private String costunit;
	
	@Column(name = "ANNUALINVESTMENT")
	private String annualinvestment;
	
	@Column(name = "REPAIRAREA")
	private String repairarea;
	
	@Column(name = "AREAUNIT")
	private String areaunit;
	
	@Column(name = "USEUNIT")
	private String useunit;
	
	@Column(name = "REPAIRCONTENT")
	private String repaircontent;
	
	@Column(name = "CATEGORYS")
	private String categorys;
	
	@Column(name = "APPROVALSTATE")
	private String approvalstate;
	
	@Column(name = "APPROVALTIME")
	private String approvaltime;
	
	@Column(name = "REMARK")
	private String remark;
	
	@Column(name = "UPLOADFILE")
	private String uploadfile;

	@Column(name = "FILEID")
	private String fileid;
	
	@Column(name = "CREATEPERSON")
	private String createperson;
	
	@Column(name = "HEADPERSON")
	private String headperson;
	
	@Column(name = "ASSIGNTIME")
	private Date assigntime;
	
	@Column(name = "PROJECTNUM")
	private String projectnum;
	
	@Column(name = "COSTNUM")
	private String costnum;
	// Constructors

	/** default constructor */
	public CivilRepair() {
	}

	/** minimal constructor */
	public CivilRepair(String id) {
		this.id = id;
	}

	/** full constructor */
	public CivilRepair(String id, String createtime, String repairproject,
			String plancost, String costunit, String annualinvestment,
			String repairarea, String areaunit, String useunit,
			String repaircontent, String categorys, String approvalstate,
			String approvaltime, String remark, String uploadfile) {
		this.id = id;
		this.createtime = createtime;
		this.repairproject = repairproject;
		this.plancost = plancost;
		this.costunit = costunit;
		this.annualinvestment = annualinvestment;
		this.repairarea = repairarea;
		this.areaunit = areaunit;
		this.useunit = useunit;
		this.repaircontent = repaircontent;
		this.categorys = categorys;
		this.approvalstate = approvalstate;
		this.approvaltime = approvaltime;
		this.remark = remark;
		this.uploadfile = uploadfile;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCreatetime() {
		return this.createtime;
	}

	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}

	public String getRepairproject() {
		return this.repairproject;
	}

	public void setRepairproject(String repairproject) {
		this.repairproject = repairproject;
	}

	public String getPlancost() {
		return this.plancost;
	}

	public void setPlancost(String plancost) {
		this.plancost = plancost;
	}

	public String getCostunit() {
		return this.costunit;
	}

	public void setCostunit(String costunit) {
		this.costunit = costunit;
	}

	public String getAnnualinvestment() {
		return this.annualinvestment;
	}

	public void setAnnualinvestment(String annualinvestment) {
		this.annualinvestment = annualinvestment;
	}

	public String getRepairarea() {
		return this.repairarea;
	}

	public void setRepairarea(String repairarea) {
		this.repairarea = repairarea;
	}

	public String getAreaunit() {
		return this.areaunit;
	}

	public void setAreaunit(String areaunit) {
		this.areaunit = areaunit;
	}

	public String getUseunit() {
		return this.useunit;
	}

	public void setUseunit(String useunit) {
		this.useunit = useunit;
	}

	public String getRepaircontent() {
		return this.repaircontent;
	}

	public void setRepaircontent(String repaircontent) {
		this.repaircontent = repaircontent;
	}

	public String getCategorys() {
		return this.categorys;
	}

	public void setCategorys(String categorys) {
		this.categorys = categorys;
	}

	public String getApprovalstate() {
		return this.approvalstate;
	}

	public void setApprovalstate(String approvalstate) {
		this.approvalstate = approvalstate;
	}

	public String getApprovaltime() {
		return this.approvaltime;
	}

	public void setApprovaltime(String approvaltime) {
		this.approvaltime = approvaltime;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getUploadfile() {
		return this.uploadfile;
	}

	public void setUploadfile(String uploadfile) {
		this.uploadfile = uploadfile;
	}

	public String getFileid() {
		return fileid;
	}

	public void setFileid(String fileid) {
		this.fileid = fileid;
	}

	public String getCreateperson() {
		return createperson;
	}

	public void setCreateperson(String createperson) {
		this.createperson = createperson;
	}

	public String getHeadperson() {
		return headperson;
	}

	public void setHeadperson(String headperson) {
		this.headperson = headperson;
	}

	public Date getAssigntime() {
		return assigntime;
	}

	public void setAssigntime(Date assigntime) {
		this.assigntime = assigntime;
	}

	public String getProjectnum() {
		return projectnum;
	}

	public void setProjectnum(String projectnum) {
		this.projectnum = projectnum;
	}

	public String getCostnum() {
		return costnum;
	}

	public void setCostnum(String costnum) {
		this.costnum = costnum;
	}
}
