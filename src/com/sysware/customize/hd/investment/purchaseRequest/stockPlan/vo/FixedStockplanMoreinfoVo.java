package com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo;

/**
 * 采购计划 固定资产 详细信息vo类
 * 
 * @author Lit
 * @date 2011.10.11
 * 
 */
public class FixedStockplanMoreinfoVo {

	private String materialitemname;
	private String materialId; 
	private String materialstandard;
	private String price;
	private String budget;
	private String budout;
	private String selfmoney;
	private String total;
	private String amount;
	private String procurementdate;
	private String procurementtype;
	private String materialcatalog_name;
	private String demartment;
	private String remark;

	private String fixid;
	private String taskCode;// 任务编号
	private String powerConsumption;// 耗电量
	private String area;// 使用面积
	private String plant;// 生产厂家
	private String installationofplant;// 安装厂房
	private String effectiveness;// 有效性
	private String updateDate;// 修改时间
	private String rownum;//行数
	private String fileId;//技借卡id
	private String fileName;//技借卡名称
	private Integer limit;
	private Integer start;
	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}
	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public String getFixid() {
		return fixid;
	}

	public void setFixid(String fixid) {
		this.fixid = fixid;
	}

	public String getMaterialitemname() {
		return materialitemname;
	}

	public void setMaterialitemname(String materialitemname) {
		this.materialitemname = materialitemname;
	}

	public String getMaterialstandard() {
		return materialstandard;
	}

	public void setMaterialstandard(String materialstandard) {
		this.materialstandard = materialstandard;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getBudget() {
		return budget;
	}

	public void setBudget(String budget) {
		this.budget = budget;
	}

	public String getBudout() {
		return budout;
	}

	public void setBudout(String budout) {
		this.budout = budout;
	}

	public String getSelfmoney() {
		return selfmoney;
	}

	public void setSelfmoney(String selfmoney) {
		this.selfmoney = selfmoney;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getProcurementdate() {
		return procurementdate;
	}

	public void setProcurementdate(String procurementdate) {
		this.procurementdate = procurementdate;
	}

	public String getProcurementtype() {
		return procurementtype;
	}

	public void setProcurementtype(String procurementtype) {
		this.procurementtype = procurementtype;
	}

	public String getMaterialcatalog_name() {
		return materialcatalog_name;
	}

	public void setMaterialcatalog_name(String materialcatalogName) {
		materialcatalog_name = materialcatalogName;
	}

	public String getDemartment() {
		return demartment;
	}

	public void setDemartment(String demartment) {
		this.demartment = demartment;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	 

	public String getPowerConsumption() {
		return powerConsumption;
	}

	public void setPowerConsumption(String powerConsumption) {
		this.powerConsumption = powerConsumption;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getPlant() {
		return plant;
	}

	public void setPlant(String plant) {
		this.plant = plant;
	}

	public String getInstallationofplant() {
		return installationofplant;
	}

	public void setInstallationofplant(String installationofplant) {
		this.installationofplant = installationofplant;
	}

	public String getEffectiveness() {
		return effectiveness;
	}

	public void setEffectiveness(String effectiveness) {
		this.effectiveness = effectiveness;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public String getRownum() {
		return rownum;
	}

	public void setRownum(String rownum) {
		this.rownum = rownum;
	}

	public String getTaskCode() {
		return taskCode;
	}

	public void setTaskCode(String taskCode) {
		this.taskCode = taskCode;
	}

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

}
