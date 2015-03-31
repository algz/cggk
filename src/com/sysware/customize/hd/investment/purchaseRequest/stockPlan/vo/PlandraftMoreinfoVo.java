package com.sysware.customize.hd.investment.purchaseRequest.stockPlan.vo;

/**
 * 草案计划 详细信息vo类
 * 
 * @author Lit
 * @date 2011.10.11
 * 
 */
public class PlandraftMoreinfoVo {

	private String declare_detil_id;
	private String materialitemname;
	private String departmentname;

	private String MaterialStandard;
	private String technicCondition;
	private String deliveryStatus;//物资交货状态
	private String materialcatalog_name;
	private String use;
	private String quantity;
	private String amount;
	private String demension;
	private String usedate;
	private String report;
	private String fileName;
	private String fileId;
	private String reportType;
	private String taskno;
	private String declareType;
	
	private String materialcatalogid;//物资种类ID
	
	
	public String getDepartmentname() {
		return departmentname;
	}

	public void setDepartmentname(String departmentname) {
		this.departmentname = departmentname;
	}

	
	public String getReportType() {
		return reportType;
	}

	public void setReportType(String reportType) {
		this.reportType = reportType;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	private Integer limit;
	private Integer start;

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

	public String getDeclare_detil_id() {
		return declare_detil_id;
	}

	public void setDeclare_detil_id(String declareDetilId) {
		declare_detil_id = declareDetilId;
	}

	public String getMaterialitemname() {
		return materialitemname;
	}

	public void setMaterialitemname(String materialitemname) {
		this.materialitemname = materialitemname;
	}

	public String getMaterialStandard() {
		return MaterialStandard;
	}

	public void setMaterialStandard(String materialStandard) {
		MaterialStandard = materialStandard;
	}

	public String getTechnicCondition() {
		return technicCondition;
	}

	public void setTechnicCondition(String technicCondition) {
		this.technicCondition = technicCondition;
	}

	public String getMaterialcatalog_name() {
		return materialcatalog_name;
	}

	public void setMaterialcatalog_name(String materialcatalogName) {
		materialcatalog_name = materialcatalogName;
	}

	public String getUse() {
		return use;
	}

	public void setUse(String use) {
		this.use = use;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getDemension() {
		return demension;
	}

	public void setDemension(String demension) {
		this.demension = demension;
	}

	public String getUsedate() {
		return usedate;
	}

	public void setUsedate(String usedate) {
		this.usedate = usedate;
	}

	public String getReport() {
		return report;
	}

	public void setReport(String report) {
		this.report = report;
	}

	public String getMaterialcatalogid() {
		return materialcatalogid;
	}

	public void setMaterialcatalogid(String materialcatalogid) {
		this.materialcatalogid = materialcatalogid;
	}

	public String getTaskno() {
		return taskno;
	}

	public void setTaskno(String taskno) {
		this.taskno = taskno;
	}

	public String getDeclareType() {
		return declareType;
	}

	public void setDeclareType(String declareType) {
		this.declareType = declareType;
	}

	public String getDeliveryStatus() {
		return deliveryStatus;
	}

	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}



	
	
}
