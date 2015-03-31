package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess;


public class PurchaseVo {
	private String purchaseId;//主键
	private String purchaseCode;//采购编号
	private String createDate;//生成日期
	private String status;//申请状态
	private String materialTypeName;//物资种类
	private String editor;//编辑人
	private String type;// 采购需求类型：1年度需求, 2 零星需求
	private String remark;//备注
	private String stateName;//申请状态名称
	private String editorName;//编辑人名称
	private String editorDeptName;//编辑人部门名称
	private String editorRoleName;//编辑人角色名称
	private String purchaseTypeName;//需求来源类型名称
	private Integer start;// 分页开始
	private Integer limit;// 分页条数
	private Integer count;//记录总数
	private String searchCatlogName;//物料种类名称
	private String searchMaterialName;//物料名称
	private String updateRecords;//产生记录
	
	private String purchaseName;//采购需求名称
	private String procurementId;//采购计划ID
	
	public String getPurchaseId() {
		return purchaseId;
	}
	public void setPurchaseId(String purchaseId) {
		this.purchaseId = purchaseId;
	}
	public String getPurchaseCode() {
		return purchaseCode;
	}
	public void setPurchaseCode(String purchaseCode) {
		this.purchaseCode = purchaseCode;
	}

	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMaterialTypeName() {
		return materialTypeName;
	}
	public void setMaterialTypeName(String materialTypeName) {
		this.materialTypeName = materialTypeName;
	}
	public String getEditor() {
		return editor;
	}
	public void setEditor(String editor) {
		this.editor = editor;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getStateName() {
		return stateName;
	}
	public void setStateName(String stateName) {
		this.stateName = stateName;
	}
	public String getEditorName() {
		return editorName;
	}
	public void setEditorName(String editorName) {
		this.editorName = editorName;
	}
	public String getEditorDeptName() {
		return editorDeptName;
	}
	public void setEditorDeptName(String editorDeptName) {
		this.editorDeptName = editorDeptName;
	}
	public String getEditorRoleName() {
		return editorRoleName;
	}
	public void setEditorRoleName(String editorRoleName) {
		this.editorRoleName = editorRoleName;
	}
	public String getPurchaseTypeName() {
		return purchaseTypeName;
	}
	public void setPurchaseTypeName(String purchaseTypeName) {
		this.purchaseTypeName = purchaseTypeName;
	}
	public Integer getStart() {
		return start;
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
	public String getSearchCatlogName() {
		return searchCatlogName;
	}
	public void setSearchCatlogName(String searchCatlogName) {
		this.searchCatlogName = searchCatlogName;
	}
	public String getSearchMaterialName() {
		return searchMaterialName;
	}
	public void setSearchMaterialName(String searchMaterialName) {
		this.searchMaterialName = searchMaterialName;
	}
	public String getUpdateRecords() {
		return updateRecords;
	}
	public void setUpdateRecords(String updateRecords) {
		this.updateRecords = updateRecords;
	}
	public String getPurchaseName() {
		return purchaseName;
	}
	public void setPurchaseName(String purchaseName) {
		this.purchaseName = purchaseName;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public String getProcurementId() {
		return procurementId;
	}
	public void setProcurementId(String procurementId) {
		this.procurementId = procurementId;
	}
	
	
	
	
}
