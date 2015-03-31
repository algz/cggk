package com.sysware.customize.hd.investment.productionMaterialsManagement.parity;


public class ParityCondition {
	private String parityId;//主键
	private String parityCode;// 编号
	private String createDate;// 创建时间
	private String deliveryDate;// 交货日期
	private  String applicationStatus;// 申请状态
	private String applicationStatusName;
	private  String editors;//编制人
	private  String editorsNmae;//编制人名称
	private  String editorsDept;//编制人部门
	private String purchaseId;// 清单大纲id
	private String purchaseCode;// 清单大纲code
	
	private String vendorId;// 供应商、中标厂商
	private String vendorName;// 中标厂商名
	private String type;//1比价，2招标
	private String typeName; 
	private String materialId;// 物资信息
	private String desingnation;// 物料牌号
	private String materialItemName;// 物料名称
	private String materialStandard;// 物料规格
	private String demension;// 量纲
	private Integer start;
	private Integer limit;
	private Integer count;
    private String searchCatlogName;//物料种类名称
	private String searchMaterialName;//物料名称
	
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public String getDemension() {
		return demension;
	}
	public void setDemension(String demension) {
		this.demension = demension;
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
	public String getParityId() {
		return parityId;
	}
	public void setParityId(String parityId) {
		this.parityId = parityId;
	}
	public String getParityCode() {
		return parityCode;
	}
	public void setParityCode(String parityCode) {
		this.parityCode = parityCode;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	public String getApplicationStatus() {
		return applicationStatus;
	}
	public void setApplicationStatus(String applicationStatus) {
		this.applicationStatus = applicationStatus;
	}
	public String getApplicationStatusName() {
		return applicationStatusName;
	}
	public void setApplicationStatusName(String applicationStatusName) {
		this.applicationStatusName = applicationStatusName;
	}
	public String getEditors() {
		return editors;
	}
	public void setEditors(String editors) {
		this.editors = editors;
	}
	public String getEditorsNmae() {
		return editorsNmae;
	}
	public void setEditorsNmae(String editorsNmae) {
		this.editorsNmae = editorsNmae;
	}
	public String getEditorsDept() {
		return editorsDept;
	}
	public void setEditorsDept(String editorsDept) {
		this.editorsDept = editorsDept;
	}
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
	public String getVendorId() {
		return vendorId;
	}
	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public String getMaterialId() {
		return materialId;
	}
	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}
	public String getDesingnation() {
		return desingnation;
	}
	public void setDesingnation(String desingnation) {
		this.desingnation = desingnation;
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
	
}
