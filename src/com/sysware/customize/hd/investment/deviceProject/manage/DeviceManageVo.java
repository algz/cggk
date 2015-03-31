package com.sysware.customize.hd.investment.deviceProject.manage;


/**
 * TbDeviceImplementplan entity. @author MyEclipse Persistence Tools
 */
public class DeviceManageVo  {


	private String implementplanid;

	private String categorys;
	private String projectmanagerid; //项目主管ID
	
	private String projectmanagername; //项目主管名称
	
	private String submitdate;
	
	private String completiondate;
	
	private String confirmdate;
	

	private String calibrationdate;
	

	private String agreementSigningdate;
	

	private String contractSigningdate;
	
	private String plansremarks;
	
	private String planningdate;
	
	private String status;
	
	private String remark;
	
	private String approvalstatus;
	
	private String equipregistId;
	private String projectname;//项目名称
	private String projectnum;//项目编号
	private String nums;//设备数量
	private String numsunit;//设备数量单位
	private String budgetnum;//总投资预算控制数
	private String fundunit;//资金单位
	
	private String managecontent;//执行管理内容
	private String managecontenttype;//执行管理内容的类型;1 定向采购;2自动招标;3委托招标
	private String approvaltime;//执行管理下发时间
	
	private String projectcategorys;//项目类别
	
	private Integer start;
	
	private Integer limit;
	
	private Integer count;
	
	
	private DeviceManageDirpurchase dmd;
	
	// Constructors

	
	
	public String getProjectname() {
		return projectname;
	}


	

	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}


	public String getProjectnum() {
		return projectnum;
	}


	public void setProjectnum(String projectnum) {
		this.projectnum = projectnum;
	}


	public Integer getStart() {
		return start;
	}


	public String getProjectmanagerid() {
		return projectmanagerid;
	}


	public void setProjectmanagerid(String projectmanagerid) {
		this.projectmanagerid = projectmanagerid;
	}


	public String getProjectmanagername() {
		return projectmanagername;
	}


	public void setProjectmanagername(String projectmanagername) {
		this.projectmanagername = projectmanagername;
	}


	public Integer getCount() {
		return count;
	}


	public void setCount(Integer count) {
		this.count = count;
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


	/** default constructor */
	public DeviceManageVo() {
	}


	public String getCategorys() {
		return categorys;
	}


	public void setCategorys(String categorys) {
		this.categorys = categorys;
	}


	public String getSubmitdate() {
		return submitdate;
	}


	public void setSubmitdate(String submitdate) {
		this.submitdate = submitdate;
	}


	public String getCompletiondate() {
		return completiondate;
	}


	public void setCompletiondate(String completiondate) {
		this.completiondate = completiondate;
	}


	public String getConfirmdate() {
		return confirmdate;
	}


	public void setConfirmdate(String confirmdate) {
		this.confirmdate = confirmdate;
	}


	public String getCalibrationdate() {
		return calibrationdate;
	}


	public void setCalibrationdate(String calibrationdate) {
		this.calibrationdate = calibrationdate;
	}


	public String getAgreementSigningdate() {
		return agreementSigningdate;
	}


	public void setAgreementSigningdate(String agreementSigningdate) {
		this.agreementSigningdate = agreementSigningdate;
	}


	public String getContractSigningdate() {
		return contractSigningdate;
	}


	public void setContractSigningdate(String contractSigningdate) {
		this.contractSigningdate = contractSigningdate;
	}


	public String getPlansremarks() {
		return plansremarks;
	}


	public void setPlansremarks(String plansremarks) {
		this.plansremarks = plansremarks;
	}


	public String getPlanningdate() {
		return planningdate;
	}


	public void setPlanningdate(String planningdate) {
		this.planningdate = planningdate;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getRemark() {
		return remark;
	}


	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getApprovalstatus() {
		return approvalstatus;
	}


	public void setApprovalstatus(String approvalstatus) {
		this.approvalstatus = approvalstatus;
	}


	public String getEquipregistId() {
		return equipregistId;
	}


	public void setEquipregistId(String equipregistId) {
		this.equipregistId = equipregistId;
	}

	public String getNums() {
		return nums;
	}


	public void setNums(String nums) {
		this.nums = nums;
	}


	public String getNumsunit() {
		return numsunit;
	}


	public void setNumsunit(String numsunit) {
		this.numsunit = numsunit;
	}


	public String getImplementplanid() {
		return implementplanid;
	}

	public void setImplementplanid(String implementplanid) {
		this.implementplanid = implementplanid;
	}




	public String getBudgetnum() {
		return budgetnum;
	}




	public void setBudgetnum(String budgetnum) {
		this.budgetnum = budgetnum;
	}




	public String getFundunit() {
		return fundunit;
	}




	public void setFundunit(String fundunit) {
		this.fundunit = fundunit;
	}




	public String getManagecontent() {
		return managecontent;
	}




	public void setManagecontent(String managecontent) {
		this.managecontent = managecontent;
	}




	public DeviceManageDirpurchase getDmd() {
		return dmd;
	}




	public void setDmd(DeviceManageDirpurchase dmd) {
		this.dmd = dmd;
	}




	public String getManagecontenttype() {
		return managecontenttype;
	}




	public void setManagecontenttype(String managecontenttype) {
		this.managecontenttype = managecontenttype;
	}




	public String getApprovaltime() {
		return approvaltime;
	}




	public void setApprovaltime(String approvaltime) {
		this.approvaltime = approvaltime;
	}




	public String getProjectcategorys() {
		return projectcategorys;
	}




	public void setProjectcategorys(String projectcategorys) {
		this.projectcategorys = projectcategorys;
	}


	
	
}