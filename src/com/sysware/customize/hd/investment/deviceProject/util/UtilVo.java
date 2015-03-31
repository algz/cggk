package com.sysware.customize.hd.investment.deviceProject.util;



/**
 * TbDeviceImplementplan entity. @author MyEclipse Persistence Tools
 */
public class UtilVo  {


	private String id;
	
	
	/**
	 * 1查询实施计划(执行管理与实施计划共用一张表)状态为3已下发;
	 * 2查询设备登记表中状态为7已审批数据
	 * 3查询合同管理获取执行管理数据

	 */
	private String projectDataType;
	
	/**
	 * 1查询实施计划日期;
	 * 2查询执行管理日期;
	 * 3查询合同管理日期;

	 */
	private String projectDateDataType;
	
	/**
	 * 部门ID
	 */
	private String depcode;
	
	/**
	 * 部门名称
	 */
	private String departmentName;
	
	
	
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

	private Integer start;
	
	private Integer limit;
	
	private Integer count;
	
	// Constructors

	
	
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
	public UtilVo() {
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
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


	public String getProjectDataType() {
		return projectDataType;
	}


	public void setProjectDataType(String projectDataType) {
		this.projectDataType = projectDataType;
	}


	public String getProjectDateDataType() {
		return projectDateDataType;
	}


	public void setProjectDateDataType(String projectDateDataType) {
		this.projectDateDataType = projectDateDataType;
	}


	public String getDepcode() {
		return depcode;
	}


	public void setDepcode(String depcode) {
		this.depcode = depcode;
	}


	public String getDepartmentName() {
		return departmentName;
	}


	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	

}