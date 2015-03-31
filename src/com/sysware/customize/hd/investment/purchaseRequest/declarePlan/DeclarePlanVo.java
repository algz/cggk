package com.sysware.customize.hd.investment.purchaseRequest.declarePlan;

/**
 * 申报计划 vo
 * 
 * @author fanzhihui
 * 
 */
public class DeclarePlanVo {
	private String amount;// 金额
	private String declareIds;// 申报项

	private String declareplanCode;// 编号为9为流水号

	private String declareplanDetilID;// 申报子项计划ID

	private String declareplanID;// 申报计划ID
	private String declareplanName;// 申报计划名称
	private String departmentId;// 部门id
	private String departmentName;// 部门名称
	private String editDate;// 编制时间
	private String editer;// 编制人
	private int limit; // 每页记录条数
	private String procurementplanId;// 采购计划ID
	private String procurementplanType;// 采购计划类型
	private String quantity;// 项数
	private String rownum;// 行数
	private String sendDate;// 送审时间
	private int start; // 起始记录
	private String status;// 状态 1编制中2待审批3审批中4已审批
	private String totalAmount;// 总金额
	private String totalCount;// 总项数
	private String use;// 用途
	private String declareplanType;//采购类型
	private String propertyType;//资产类别
	private String generator;//生成方式或数据类型
	private String minAmount;//金额最小值
	private String maxAmount;//金额最大值
	
	public String getMinAmount() {
		return minAmount;
	}
	public void setMinAmount(String minAmount) {
		this.minAmount = minAmount;
	}
	public String getMaxAmount() {
		return maxAmount;
	}
	public void setMaxAmount(String maxAmount) {
		this.maxAmount = maxAmount;
	}
	public String getGenerator() {
		return generator;
	}
	public void setGenerator(String generator) {
		this.generator = generator;
	}
	public String getDeclareplanType() {
		return declareplanType;
	}
	public void setDeclareplanType(String declareplanType) {
		this.declareplanType = declareplanType;
	}
	public DeclarePlanVo() {

	}
	public String getAmount() {
		return amount;
	}

	public String getDeclareIds() {
		return declareIds;
	}

	public String getDeclareplanCode() {
		return declareplanCode;
	}

	public String getDeclareplanDetilID() {
		return declareplanDetilID;
	}

	public String getDeclareplanID() {
		return declareplanID;
	}

	public String getDeclareplanName() {
		return declareplanName;
	}

	public String getDepartmentId() {
		return departmentId;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public String getEditDate() {
		return editDate;
	}

	public String getEditer() {
		return editer;
	}

	public int getLimit() {
		return limit;
	}

	public String getProcurementplanId() {
		return procurementplanId;
	}

	public String getProcurementplanType() {
		return procurementplanType;
	}

	public String getQuantity() {
		return quantity;
	}

	public String getRownum() {
		return rownum;
	}

	public String getSendDate() {
		return sendDate;
	}

	public int getStart() {
		return start;
	}

	public String getStatus() {
		return status;
	}

	public String getTotalAmount() {
		return totalAmount;
	}

	public String getTotalCount() {
		return totalCount;
	}

	public String getUse() {
		return use;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public void setDeclareIds(String declareIds) {
		this.declareIds = declareIds;
	}

	public void setDeclareplanCode(String declareplanCode) {
		this.declareplanCode = declareplanCode;
	}

	public void setDeclareplanDetilID(String declareplanDetilID) {
		this.declareplanDetilID = declareplanDetilID;
	}

	public void setDeclareplanID(String declareplanID) {
		this.declareplanID = declareplanID;
	}

	public void setDeclareplanName(String declareplanName) {
		this.declareplanName = declareplanName;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public void setEditDate(String editDate) {
		this.editDate = editDate;
	}

	public void setEditer(String editer) {
		this.editer = editer;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public void setProcurementplanId(String procurementplanId) {
		this.procurementplanId = procurementplanId;
	}

	public void setProcurementplanType(String procurementplanType) {
		this.procurementplanType = procurementplanType;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public void setRownum(String rownum) {
		this.rownum = rownum;
	}

	public void setSendDate(String sendDate) {
		this.sendDate = sendDate;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}

	public void setTotalCount(String totalCount) {
		this.totalCount = totalCount;
	}

	public void setUse(String use) {
		this.use = use;
	}
	 
	public String getPropertyType() {
		return propertyType;
	}
	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}

}
