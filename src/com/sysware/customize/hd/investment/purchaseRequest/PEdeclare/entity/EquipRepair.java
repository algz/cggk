package com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "TB_EQUIPREPAIR")
public class EquipRepair {
	// Fields
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	private String id;
	
	@Column(name = "REPAIREQUIPNAME")
	private String repairequipname;
	
	@Column(name = "REPAIREQUIPMODEL")
	private String repairequipmodel;
	
	@Column(name = "EQUIPASSETNUM")
	private String equipassetnum;
	
	@Column(name = "EQUIPINSTALLFACTORY")
	private String equipinstallfactory;
	
	@Column(name = "TASKNUM")
	private String tasknum;
	
	@Column(name = "EQUIPMANUFACTURER")
	private String equipmanufacturer;
	
	@Column(name = "EQUIPDELIVERYTIME")
	private String equipdeliverytime;
	
	@Column(name = "CUSTOMER")
	private String customer;
	
	@Column(name = "LASTREPAIRTIME")
	private String lastrepairtime;
	
	@Column(name = "REPAIRCOSTESTIMATION")
	private String repaircostestimation;
	
	@Column(name = "REPAIRCOSTUNIT")
	private String repaircostunit;
	
	@Column(name = "CREATETIME")
	private String createtime;
	
	@Column(name = "APPROVALSTATE")
	private String approvalstate;
	
	@Column(name = "APPROVALTIME")
	private String approvaltime;
	
	@Column(name = "UPLOADFILE")
	private String uploadfile;


	@Column(name = "CREATEPERSON")
	private String createperson;
	
	@Column(name = "CATEGORYS")
	private String categorys;
	
	@Column(name = "HEADPERSON")
	private String headperson;
	
	@Column(name = "ASSIGNTIME")
	private Date assigntime;
	
	@Column(name = "PROJECTNUM")
	private String projectnum;
	
	@Column(name = "COSTNUM")
	private String costnum;
	
	@Column(name = "REMARK")
	private String remark;
	// Constructors

	public String getCategorys() {
		return categorys;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public void setCategorys(String categorys) {
		this.categorys = categorys;
	}

	/** default constructor */
	public EquipRepair() {
	}

	/** minimal constructor */
	public EquipRepair(String id) {
		this.id = id;
	}

	/** full constructor */
	public EquipRepair(String id, String repairequipname,
			String repairequipmodel, String equipassetnum,
			String equipinstallfactory, String tasknum,
			String equipmanufacturer, String equipdeliverytime,
			String customer, String lastrepairtime,
			String repaircostestimation, String repaircostunit,
			String createtime, String approvalstate, String approvaltime,
			String uploadfile) {
		this.id = id;
		this.repairequipname = repairequipname;
		this.repairequipmodel = repairequipmodel;
		this.equipassetnum = equipassetnum;
		this.equipinstallfactory = equipinstallfactory;
		this.tasknum = tasknum;
		this.equipmanufacturer = equipmanufacturer;
		this.equipdeliverytime = equipdeliverytime;
		this.customer = customer;
		this.lastrepairtime = lastrepairtime;
		this.repaircostestimation = repaircostestimation;
		this.repaircostunit = repaircostunit;
		this.createtime = createtime;
		this.approvalstate = approvalstate;
		this.approvaltime = approvaltime;
		this.uploadfile = uploadfile;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRepairequipname() {
		return this.repairequipname;
	}

	public void setRepairequipname(String repairequipname) {
		this.repairequipname = repairequipname;
	}

	public String getRepairequipmodel() {
		return this.repairequipmodel;
	}

	public void setRepairequipmodel(String repairequipmodel) {
		this.repairequipmodel = repairequipmodel;
	}

	public String getEquipassetnum() {
		return this.equipassetnum;
	}

	public void setEquipassetnum(String equipassetnum) {
		this.equipassetnum = equipassetnum;
	}

	public String getEquipinstallfactory() {
		return this.equipinstallfactory;
	}

	public void setEquipinstallfactory(String equipinstallfactory) {
		this.equipinstallfactory = equipinstallfactory;
	}

	public String getTasknum() {
		return this.tasknum;
	}

	public void setTasknum(String tasknum) {
		this.tasknum = tasknum;
	}

	public String getEquipmanufacturer() {
		return this.equipmanufacturer;
	}

	public void setEquipmanufacturer(String equipmanufacturer) {
		this.equipmanufacturer = equipmanufacturer;
	}

	public String getEquipdeliverytime() {
		return this.equipdeliverytime;
	}

	public void setEquipdeliverytime(String equipdeliverytime) {
		this.equipdeliverytime = equipdeliverytime;
	}

	public String getCustomer() {
		return this.customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public String getLastrepairtime() {
		return this.lastrepairtime;
	}

	public void setLastrepairtime(String lastrepairtime) {
		this.lastrepairtime = lastrepairtime;
	}

	public String getRepaircostestimation() {
		return this.repaircostestimation;
	}

	public void setRepaircostestimation(String repaircostestimation) {
		this.repaircostestimation = repaircostestimation;
	}

	public String getRepaircostunit() {
		return this.repaircostunit;
	}

	public void setRepaircostunit(String repaircostunit) {
		this.repaircostunit = repaircostunit;
	}

	public String getCreatetime() {
		return this.createtime;
	}

	public void setCreatetime(String createtime) {
		this.createtime = createtime;
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

	public String getUploadfile() {
		return this.uploadfile;
	}

	public void setUploadfile(String uploadfile) {
		this.uploadfile = uploadfile;
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
