package com.sysware.customize.hd.investment.equipreService;


public class EquipreServiceModel implements java.io.Serializable,Cloneable {
	
	private static final long serialVersionUID = 1L;

	
	@Override
	public Object clone(){ 
		EquipreServiceModel o = null; 
	try{ 
		o = (EquipreServiceModel)super.clone(); 
    }catch(CloneNotSupportedException e){ 
		e.printStackTrace(); 
    } 
		return o; 
    }
	
	
	
	
	
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
	private String lastServiceDate;//最后一次维修日期
	private String serviceCost;//维修费用估算/计划
	private String unit;//单位
	private String serviceStartTime;//维修开始时间
	private String serviceInspectionTime;//维修验收时间
	private String serviceDutyUnit;//维修责任单位
	private String remarks;//备注
	private String updateFlag;
	
	
	

	public String getUpdateFlag() {
		return updateFlag;
	}
	public void setUpdateFlag(String updateFlag) {
		this.updateFlag = updateFlag;
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
	
	
	
	
	
	
}