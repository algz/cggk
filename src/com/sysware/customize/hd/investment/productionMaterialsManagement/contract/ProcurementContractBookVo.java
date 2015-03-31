package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;


public class ProcurementContractBookVo {

	private String procurementContractBookId;// 合同台账ID
	private String deliverNode;// 交付节点
	private String executetion;// 执行情况
	private String arriveCircs;// 货款支付情况
	private String remarks;// 备注
	private String procurementContractId;// 合同ID
	private String materialId;// 物资ID
	private String signDate;// 合同签订日期

	private int start;// 起始行号
	private int limit;// 每页行数
	private String contractCode;// 合同编号
	private String auditCode;// 合同审签编号
	private double contractAmount;// 合同金额
	private String attachments;// 合同附件
	private String vendor;
	private String vendName;// 签订单位
	private String mainMaterialName;// 主要产品
	private String desingnation;// 物料牌号
	private String materialStandard;// 物料规格
	private double referencePrice;// 单价
	private double materialCounts;// 材料需用总量

	private String updateRecords;// 待更新的表格数据
	
	private String editors;
	
	public String getEditors() {
		return editors;
	}

	public void setEditors(String editors) {
		this.editors = editors;
	}

	public String getProcurementContractBookId() {
		return procurementContractBookId;
	}

	public void setProcurementContractBookId(String procurementContractBookId) {
		this.procurementContractBookId = procurementContractBookId;
	}

	public String getDeliverNode() {
		return deliverNode;
	}

	public void setDeliverNode(String deliverNode) {
		this.deliverNode = deliverNode;
	}

	public String getExecutetion() {
		return executetion;
	}

	public void setExecutetion(String executetion) {
		this.executetion = executetion;
	}

	public String getArriveCircs() {
		return arriveCircs;
	}

	public void setArriveCircs(String arriveCircs) {
		this.arriveCircs = arriveCircs;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}

	public String getProcurementContractId() {
		return procurementContractId;
	}

	public void setProcurementContractId(String procurementContractId) {
		this.procurementContractId = procurementContractId;
	}

	public String getSignDate() {
		return signDate;
	}

	public void setSignDate(String signDate) {
		this.signDate = signDate;
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

	public String getContractCode() {
		return contractCode;
	}

	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}

	public String getAuditCode() {
		return auditCode;
	}

	public void setAuditCode(String auditCode) {
		this.auditCode = auditCode;
	}

	public double getContractAmount() {
		return contractAmount;
	}

	public void setContractAmount(double contractAmount) {
		this.contractAmount = contractAmount;
	}

	public String getAttachments() {
		return attachments;
	}

	public void setAttachments(String attachments) {
		this.attachments = attachments;
	}

	public String getVendor() {
		return vendor;
	}

	public void setVendor(String vendor) {
		this.vendor = vendor;
	}

	public String getVendName() {
		return vendName;
	}

	public void setVendName(String vendName) {
		this.vendName = vendName;
	}

	public String getMainMaterialName() {
		return mainMaterialName;
	}

	public void setMainMaterialName(String mainMaterialName) {
		this.mainMaterialName = mainMaterialName;
	}

	public String getDesingnation() {
		return desingnation;
	}

	public void setDesingnation(String desingnation) {
		this.desingnation = desingnation;
	}

	public String getMaterialStandard() {
		return materialStandard;
	}

	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}

	public double getReferencePrice() {
		return referencePrice;
	}

	public void setReferencePrice(double referencePrice) {
		this.referencePrice = referencePrice;
	}

	public double getMaterialCounts() {
		return materialCounts;
	}

	public void setMaterialCounts(double materialCounts) {
		this.materialCounts = materialCounts;
	}

	public String getUpdateRecords() {
		return updateRecords;
	}

	public void setUpdateRecords(String updateRecords) {
		this.updateRecords = updateRecords;
	}

}
