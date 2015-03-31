package com.sysware.customize.hd.investment.productionMaterialsManagement.procurement;

/**
 * 物资需求大纲Vo
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-01
 * 
 */
public class ProcurementVo {

	private String procurementId;// 采购需求ID
	private String procurementCode;// 采购需求编号
	private String actualPurchase;// 实际采购数量
	private String deliveryDate;// 交货日期
	private String procurementType;// 需求类型：年度采购需求（N）； 零星采购需求（L）
	private String reportedor;// 填报人
	private String repDeptname;// 填报人部门
	private String createDate;// 生成日期
	private String remarks;// 备注
	private String flag;// 状态
	private String approvalPerson;// 申请人
	private String requireDemartment;// 需求单位
	
	private String procurementTypeStatus;//状态值，0为年度 1为零星
	private String isPurchaseDataSelect;//是否为计划清单生成时的下拉列表，1为是
	private String start;// 起始行号
	private String limit;// 每页行数
	private String count;
	
	private String updateRecords;// 待更新的表格数据

	public String getProcurementId() {
		return procurementId;
	}

	public void setProcurementId(String procurementId) {
		this.procurementId = procurementId;
	}

	public String getProcurementCode() {
		return procurementCode;
	}

	public void setProcurementCode(String procurementCode) {
		this.procurementCode = procurementCode;
	}

	public String getActualPurchase() {
		return actualPurchase;
	}

	public void setActualPurchase(String actualPurchase) {
		this.actualPurchase = actualPurchase;
	}

	public String getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public String getProcurementType() {
		return procurementType;
	}

	public void setProcurementType(String procurementType) {
		this.procurementType = procurementType;
	}

	public String getReportedor() {
		return reportedor;
	}

	public void setReportedor(String reportedor) {
		this.reportedor = reportedor;
	}

	public String getRepDeptname() {
		return repDeptname;
	}

	public void setRepDeptname(String repDeptname) {
		this.repDeptname = repDeptname;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getApprovalPerson() {
		return approvalPerson;
	}

	public void setApprovalPerson(String approvalPerson) {
		this.approvalPerson = approvalPerson;
	}

	public String getRequireDemartment() {
		return requireDemartment;
	}

	public void setRequireDemartment(String requireDemartment) {
		this.requireDemartment = requireDemartment;
	}

	public String getProcurementTypeStatus() {
		return procurementTypeStatus;
	}

	public void setProcurementTypeStatus(String procurementTypeStatus) {
		this.procurementTypeStatus = procurementTypeStatus;
	}

	public String getIsPurchaseDataSelect() {
		return isPurchaseDataSelect;
	}

	public void setIsPurchaseDataSelect(String isPurchaseDataSelect) {
		this.isPurchaseDataSelect = isPurchaseDataSelect;
	}

	public String getUpdateRecords() {
		return updateRecords;
	}

	public void setUpdateRecords(String updateRecords) {
		this.updateRecords = updateRecords;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public void setLimit(String limit) {
		this.limit = limit;
	}
		
	
}