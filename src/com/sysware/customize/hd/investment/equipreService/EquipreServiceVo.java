package com.sysware.customize.hd.investment.equipreService;

public class EquipreServiceVo {
	
	private String id;
	private String serviceEquipmentName;//维修设备名称
	private String serviceEquipmentModel;//维修设备型号
	private String equipmentAssetsNumber;//设备资产编号
	private String equipmentInstallFactory;//设备安装厂房
	private String taskNumber;//任务编号
	private String equipmentProduceFactory;//设备生产厂家
	private String equipmentFactoryDate;//设备出厂日期
	private String afterSaleServiceContact;//设备生产厂家售后服务联系人
	private String afterSaleServicePhone;//设备生产厂家售后服务联系人的电话
	private String customer;//设备生产厂家售后服务联系人及电话
	private String lastServiceDate;//最后一次维修日期
	private String serviceCost;//维修费用估算/计划
	private String unit;//单位
	private String serviceStartTime;//维修开始时间
	private String serviceInspectionTime;//维修验收时间
	private String serviceDutyUnit;//维修责任单位
	private String remarks;//备注
	
	private int start;//开始记录数
	private int limit;//每页记录数
	private String dir;//远程排序使用 asc or desc 
	private String sort; //排序字段
	private String time;//查询时间
	private String updateFlag;//更新字段,flag
	private Integer count;
	

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
	
	public String getProjectManagerId() {
		return projectManagerId;
	}
	public void setProjectManagerId(String projectManagerId) {
		this.projectManagerId = projectManagerId;
	}
	public String getHeadPersonId() {
		return headPersonId;
	}
	public void setHeadPersonId(String headPersonId) {
		this.headPersonId = headPersonId;
	}
	public String getImplementplanid() {
		return implementplanid;
	}
	public void setImplementplanid(String implementplanid) {
		this.implementplanid = implementplanid;
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
	public String getHeadPerson() {
		return headPerson;
	}
	public void setHeadPerson(String headPerson) {
		this.headPerson = headPerson;
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
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public String getUpdateFlag() {
		return updateFlag;
	}
	public void setUpdateFlag(String updateFlag) {
		this.updateFlag = updateFlag;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
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
	public String getDir() {
		return dir;
	}
	public void setDir(String dir) {
		this.dir = dir;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getServiceEquipmentName() {
		return serviceEquipmentName;
	}
	public void setServiceEquipmentName(String serviceEquipmentName) {
		this.serviceEquipmentName = serviceEquipmentName;
	}
	public String getServiceEquipmentModel() {
		return serviceEquipmentModel;
	}
	public void setServiceEquipmentModel(String serviceEquipmentModel) {
		this.serviceEquipmentModel = serviceEquipmentModel;
	}
	public String getEquipmentAssetsNumber() {
		return equipmentAssetsNumber;
	}
	public void setEquipmentAssetsNumber(String equipmentAssetsNumber) {
		this.equipmentAssetsNumber = equipmentAssetsNumber;
	}
	public String getEquipmentInstallFactory() {
		return equipmentInstallFactory;
	}
	public void setEquipmentInstallFactory(String equipmentInstallFactory) {
		this.equipmentInstallFactory = equipmentInstallFactory;
	}
	public String getTaskNumber() {
		return taskNumber;
	}
	public void setTaskNumber(String taskNumber) {
		this.taskNumber = taskNumber;
	}
	public String getEquipmentProduceFactory() {
		return equipmentProduceFactory;
	}
	public void setEquipmentProduceFactory(String equipmentProduceFactory) {
		this.equipmentProduceFactory = equipmentProduceFactory;
	}
	public String getEquipmentFactoryDate() {
		return equipmentFactoryDate;
	}
	public void setEquipmentFactoryDate(String equipmentFactoryDate) {
		this.equipmentFactoryDate = equipmentFactoryDate;
	}
	public String getAfterSaleServiceContact() {
		return afterSaleServiceContact;
	}
	public void setAfterSaleServiceContact(String afterSaleServiceContact) {
		this.afterSaleServiceContact = afterSaleServiceContact;
	}
	public String getAfterSaleServicePhone() {
		return afterSaleServicePhone;
	}
	public void setAfterSaleServicePhone(String afterSaleServicePhone) {
		this.afterSaleServicePhone = afterSaleServicePhone;
	}
	public String getLastServiceDate() {
		return lastServiceDate;
	}
	public void setLastServiceDate(String lastServiceDate) {
		this.lastServiceDate = lastServiceDate;
	}
	public String getServiceCost() {
		return serviceCost;
	}
	public void setServiceCost(String serviceCost) {
		this.serviceCost = serviceCost;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getServiceStartTime() {
		return serviceStartTime;
	}
	public void setServiceStartTime(String serviceStartTime) {
		this.serviceStartTime = serviceStartTime;
	}
	public String getServiceInspectionTime() {
		return serviceInspectionTime;
	}
	public void setServiceInspectionTime(String serviceInspectionTime) {
		this.serviceInspectionTime = serviceInspectionTime;
	}
	public String getServiceDutyUnit() {
		return serviceDutyUnit;
	}
	public void setServiceDutyUnit(String serviceDutyUnit) {
		this.serviceDutyUnit = serviceDutyUnit;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	
	
	
	
	
}
