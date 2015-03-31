package com.sysware.customize.hd.investment.engineeringProject.inspectionApplication;


import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;


/**
 * TbDeviceContractmanagement entity. @author MyEclipse Persistence Tools
 */
public class InspectionApplicationVo{

	// Fields
	
	private String inspectioapplicatioid;
	private String applicationtime;
	private String projectdirectortel;
	private String supplierscontact;
	private String supplierstel;
	private String administrativeunit;
	private String opinion;
	private String status;//状态:-1已退回;1待审批;2审批中;3已审批
	private Vendor suppliers;
	private CivilRegist civilregist;
	
	
	
	
	private String civilregistid;//土建项目ID
	private String projectname;//项目名称
	private String suppliersid;//供应商ID
	private String suppliersname;//供应商名称
	private String projectdirector;//项目主管
	private String useunit;//使用单位
	private Integer start;
	private Integer limit;
	private Integer count;
	
	// Constructors

	/** default constructor */
	public InspectionApplicationVo() {
	}
	
	public String getInspectioapplicatioid() {
		return inspectioapplicatioid;
	}




	public void setInspectioapplicatioid(String inspectioapplicatioid) {
		this.inspectioapplicatioid = inspectioapplicatioid;
	}







	public String getApplicationtime() {
		return applicationtime;
	}

	public void setApplicationtime(String applicationtime) {
		this.applicationtime = applicationtime;
	}

	public String getProjectdirectortel() {
		return projectdirectortel;
	}




	public void setProjectdirectortel(String projectdirectortel) {
		this.projectdirectortel = projectdirectortel;
	}




	public String getSupplierscontact() {
		return supplierscontact;
	}




	public void setSupplierscontact(String supplierscontact) {
		this.supplierscontact = supplierscontact;
	}




	public String getSupplierstel() {
		return supplierstel;
	}




	public void setSupplierstel(String supplierstel) {
		this.supplierstel = supplierstel;
	}




	public String getOpinion() {
		return opinion;
	}




	public void setOpinion(String opinion) {
		this.opinion = opinion;
	}




	public String getStatus() {
		return status;
	}




	public void setStatus(String status) {
		this.status = status;
	}




	public Vendor getSuppliers() {
		return suppliers;
	}




	public void setSuppliers(Vendor suppliers) {
		this.suppliers = suppliers;
	}




	public CivilRegist getCivilregist() {
		return civilregist;
	}




	public void setCivilregist(CivilRegist civilregist) {
		this.civilregist = civilregist;
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

	public String getCivilregistid() {
		return civilregistid;
	}

	public void setCivilregistid(String civilregistid) {
		this.civilregistid = civilregistid;
	}

	public String getProjectname() {
		return projectname;
	}

	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}

	public String getAdministrativeunit() {
		return administrativeunit;
	}

	public void setAdministrativeunit(String administrativeunit) {
		this.administrativeunit = administrativeunit;
	}

	public String getSuppliersname() {
		return suppliersname;
	}

	public void setSuppliersname(String suppliersname) {
		this.suppliersname = suppliersname;
	}

	public String getProjectdirector() {
		return projectdirector;
	}

	public void setProjectdirector(String projectdirector) {
		this.projectdirector = projectdirector;
	}

	public String getSuppliersid() {
		return suppliersid;
	}

	public void setSuppliersid(String suppliersid) {
		this.suppliersid = suppliersid;
	}

	public String getUseunit() {
		return useunit;
	}

	public void setUseunit(String useunit) {
		this.useunit = useunit;
	}


	
	
}