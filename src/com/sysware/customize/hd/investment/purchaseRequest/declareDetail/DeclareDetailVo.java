package com.sysware.customize.hd.investment.purchaseRequest.declareDetail;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 采购申报明细VO
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-09-28
 * 
 */
public class DeclareDetailVo implements Serializable {
	private static final long serialVersionUID = 1L;
	private String declareDetailId; // 采购申报表ID
	private String amount; // 资金预算
	private String declareDetailStatus; // 是否成功通过申报，0未提交，1已提交，2未通过，3通过，5变更
	private String declareId; // 所属申请记录
	private String declareType; // 申请记录类型，1计划内2应急3非应急
	private String materialid; // 物资信息ID
	private String materialitemcode;//物资编码
	private String materialCatalogName; // 物资类别
	private String deliveryStatus;//物资交货状态
	private String quantity; // 数量
	private String reason; // 未通过原因
	private String fileName; // 可行性分析报告
	private String fileId; // 可行性分析报告
	private String plantype;
	private String procurementplanId;
	private String reportType;//报告类型 1可行性报告、2需求报告、3申报依据
	private String remark;
	private String taskno;
	private String contactPerson;//联系人
	private String contactTelephone;//联系电话
	
	private String oldquantity;//变更前数量
	private String changer;//变更人
	private String changeTime;//变更时间
	private String changeReson;//变更原因
	private String referencePrice;//计划单价
	
	private String use; // 采购用途
	private String useDate; // 使用时间

	private String materialItemName;// 物资名称
	private String materialStandard;// 规格型号
	private String technicCondition;// 技术条件
	private String demension;// 计量单位
	private String departmentName;//部门名称

	private int start; // 起始记录
	private int limit; // 每页记录条数
	private String status;//状态
	private String departmentId; // 采购单位
	private String declareplanID;// 申报计划ID
	private String declareplanDetilID;// 申报计划ID
	private String rownum;//行数
	
	private String count;
	
	public String getReferencePrice() {
		return referencePrice;
	}

	public void setReferencePrice(String referencePrice) {
		this.referencePrice = referencePrice;
	}

	public void setMaterialitemcode(String materialitemcode) {
		this.materialitemcode = materialitemcode;
	}

	public String getMaterialitemcode() {
		return materialitemcode;
	}

	public String getReportType() {
		return reportType;
	}

	public void setReportType(String reportType) {
		this.reportType = reportType;
	}

	public String getPlantype() {
		return plantype;
	}

	public void setPlantype(String plantype) {
		this.plantype = plantype;
	}

	public String getProcurementplanId() {
		return procurementplanId;
	}

	public void setProcurementplanId(String procurementplanId) {
		this.procurementplanId = procurementplanId;
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

	public DeclareDetailVo() {
	}

	public String getDeclareDetailId() {
		return this.declareDetailId;
	}

	public void setDeclareDetailId(String declareDetailId) {
		this.declareDetailId = declareDetailId;
	}

	public String getAmount() {
		return this.amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getDeclareDetailStatus() {
		return this.declareDetailStatus;
	}

	public void setDeclareDetailStatus(String declareDetailStatus) {
		this.declareDetailStatus = declareDetailStatus;
	}

	public String getDeclareId() {
		return this.declareId;
	}

	public void setDeclareId(String declareId) {
		this.declareId = declareId;
	}

	public String getDeclareType() {
		return this.declareType;
	}

	public void setDeclareType(String declareType) {
		this.declareType = declareType;
	}

	public String getMaterialid() {
		return this.materialid;
	}

	public void setMaterialid(String materialid) {
		this.materialid = materialid;
	}

	public String getMaterialCatalogName() {
		return this.materialCatalogName;
	}

	public void setMaterialCatalogName(String materialCatalogName) {
		this.materialCatalogName = materialCatalogName;
	}

	public String getQuantity() {
		return this.quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getReason() {
		return this.reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}
 
	public String getUse() {
		return this.use;
	}

	public void setUse(String use) {
		this.use = use;
	}

	public String getUseDate() {
		return this.useDate;
	}

	public void setUseDate(String useDate) {
		this.useDate = useDate;
	}

	public String getMaterialItemName() {
		return materialItemName;
	}

	public void setMaterialItemName(String materialItemName) {
		this.materialItemName = materialItemName;
	}

	public String getMaterialStandard() {
		return materialStandard;
	}

	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}

	public String getTechnicCondition() {
		return technicCondition;
	}

	public void setTechnicCondition(String technicCondition) {
		this.technicCondition = technicCondition;
	}

	public String getDemension() {
		return demension;
	}

	public void setDemension(String demension) {
		this.demension = demension;
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

	public String getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getDeclareplanID() {
		return declareplanID;
	}

	public void setDeclareplanID(String declareplanID) {
		this.declareplanID = declareplanID;
	}

	public String getRownum() {
		return rownum;
	}

	public void setRownum(String rownum) {
		this.rownum = rownum;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDeclareplanDetilID() {
		return declareplanDetilID;
	}

	public void setDeclareplanDetilID(String declareplanDetilID) {
		this.declareplanDetilID = declareplanDetilID;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getTaskno() {
		return taskno;
	}

	public void setTaskno(String taskno) {
		this.taskno = taskno;
	}

	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	public String getContactTelephone() {
		return contactTelephone;
	}

	public void setContactTelephone(String contactTelephone) {
		this.contactTelephone = contactTelephone;
	}

	public String getOldquantity() {
		return oldquantity;
	}

	public void setOldquantity(String oldquantity) {
		this.oldquantity = oldquantity;
	}

	public String getChanger() {
		return changer;
	}

	public void setChanger(String changer) {
		this.changer = changer;
	}

	public String getChangeTime() {
		return changeTime;
	}

	public void setChangeTime(String changeTime) {
		this.changeTime = changeTime;
	}

	public String getChangeReson() {
		return changeReson;
	}

	public void setChangeReson(String changeReson) {
		this.changeReson = changeReson;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	public String getDeliveryStatus() {
		return deliveryStatus;
	}

	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}





	
	
}