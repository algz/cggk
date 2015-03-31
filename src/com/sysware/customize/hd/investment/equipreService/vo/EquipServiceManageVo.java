package com.sysware.customize.hd.investment.equipreService.vo;

public class EquipServiceManageVo {

	private String id;
	private String projectNum;//项目编号
	private String projectManager; //项目主管
	private String projectManagerId;//项目主管
	private String headPerson;//负责人
	private String headPersonId;//负责人id
	private String repairCardTime; //计划维修卡片时间
	private String repairUnitime; //计划确定维修单位时间
	private String contractSignTime; //计划合同签订时间
	private String subApprovalTime; //计划提交验收时间
	private String createTime; //计划编制时间
	private String status;//审批状态
	private String remark;//备注
	private String implementplanid;
	private String repairCardTimeExecute; //执行维修卡片时间
	private String repairUnitimeExecute; //执行确定维修单位时间
	private String contractSignTimeExecute; //执行合同签订时间
	private String subApprovalTimeExecute; //执行提交验收时间
	private String equipName;//项目名称
	private String equipModel;//设备编号
	
	private int start;//开始记录数
	private int limit;//每页记录数
	private Integer count;
	
	
	public String getEquipName() {
		return equipName;
	}
	public void setEquipName(String equipName) {
		this.equipName = equipName;
	}
	public String getEquipModel() {
		return equipModel;
	}
	public void setEquipModel(String equipModel) {
		this.equipModel = equipModel;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getProjectNum() {
		return projectNum;
	}
	public void setProjectNum(String projectNum) {
		this.projectNum = projectNum;
	}
	public String getProjectManager() {
		return projectManager;
	}
	public void setProjectManager(String projectManager) {
		this.projectManager = projectManager;
	}
	public String getProjectManagerId() {
		return projectManagerId;
	}
	public void setProjectManagerId(String projectManagerId) {
		this.projectManagerId = projectManagerId;
	}
	public String getHeadPerson() {
		return headPerson;
	}
	public void setHeadPerson(String headPerson) {
		this.headPerson = headPerson;
	}
	public String getHeadPersonId() {
		return headPersonId;
	}
	public void setHeadPersonId(String headPersonId) {
		this.headPersonId = headPersonId;
	}
	public String getRepairCardTime() {
		return repairCardTime;
	}
	public void setRepairCardTime(String repairCardTime) {
		this.repairCardTime = repairCardTime;
	}
	public String getRepairUnitime() {
		return repairUnitime;
	}
	public void setRepairUnitime(String repairUnitime) {
		this.repairUnitime = repairUnitime;
	}
	public String getContractSignTime() {
		return contractSignTime;
	}
	public void setContractSignTime(String contractSignTime) {
		this.contractSignTime = contractSignTime;
	}
	public String getSubApprovalTime() {
		return subApprovalTime;
	}
	public void setSubApprovalTime(String subApprovalTime) {
		this.subApprovalTime = subApprovalTime;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
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
	public String getImplementplanid() {
		return implementplanid;
	}
	public void setImplementplanid(String implementplanid) {
		this.implementplanid = implementplanid;
	}
	public String getRepairCardTimeExecute() {
		return repairCardTimeExecute;
	}
	public void setRepairCardTimeExecute(String repairCardTimeExecute) {
		this.repairCardTimeExecute = repairCardTimeExecute;
	}
	public String getRepairUnitimeExecute() {
		return repairUnitimeExecute;
	}
	public void setRepairUnitimeExecute(String repairUnitimeExecute) {
		this.repairUnitimeExecute = repairUnitimeExecute;
	}
	public String getContractSignTimeExecute() {
		return contractSignTimeExecute;
	}
	public void setContractSignTimeExecute(String contractSignTimeExecute) {
		this.contractSignTimeExecute = contractSignTimeExecute;
	}
	public String getSubApprovalTimeExecute() {
		return subApprovalTimeExecute;
	}
	public void setSubApprovalTimeExecute(String subApprovalTimeExecute) {
		this.subApprovalTimeExecute = subApprovalTimeExecute;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	
	
}
