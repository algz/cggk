package com.sysware.customize.hd.investment.baseData.material;

/**
 * 物料信息Vo
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 16-五月-2011 13:46:08
 */
public class MaterialVo {

	/**
	 * 唯一标识（物资信息ID）
	 */
	private String materialid;
	/**
	 * 量纲。
	 */
	private String demension;
	/**
	 * 物料牌号。
	 */
	private String desingnation;
	/**
	 * 物料名称。
	 */
	private String materialItemName;
	/**
	 * 保管期。
	 */
	private String preservePeriod;
	/**
	 * 计划单价。
	 */
	private Double referencePrice;
	/**
	 * 备注。
	 */
	private String remarks;
	/**
	 * 物料规格。
	 */
	private String materialStandard;
	/**
	 * 技术条件。
	 */
	private String technicCondition;
	/**
	 * 预警值。
	 */
	private Double warningValue;
	private int start;// 分页开始
	private int limit;// 分页条数
	private Integer count;//记录总数
	private String startId;// 获取树上的物料信息id
	private String materialcatalogid;// 物料种类id
	private String materialCatalogName;//物料种类名称
	private String parentId;// 物料种类关联id
	private String fileName;
	private String fileId;
	private String materialType;//用于入库登记的时候区分1金属2非金属
	
	
	//为了接口,添加5个字段
	private String deliveryStatus ;//交货状态
	//private String demension;//计量单位
	private String materialClass;//库存系统的大类
	private String materialKind;//库存系统的小类
	private String approver;//审批人
	private int  materialLinkVendorNum;//物资关联的供应商条数
	private String parentidName ;//物料总类(小类)
	private String selectType ;//查询类别是带条件还是不带条件的查询
	private String materialcatalogName;// 物料种类(大类)
	
	private String purchaseNum;//入厂登记--采购数量
	
	public String getMaterialcatalogName() {
		return materialcatalogName;
	}

	public void setMaterialcatalogName(String materialcatalogName) {
		this.materialcatalogName = materialcatalogName;
	}

	public String getParentidName() {
		return parentidName;
	}

	public void setParentidName(String parentidName) {
		this.parentidName = parentidName;
	}

	public int getMaterialLinkVendorNum() {
		return materialLinkVendorNum;
	}

	public void setMaterialLinkVendorNum(int materialLinkVendorNum) {
		this.materialLinkVendorNum = materialLinkVendorNum;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getMaterialType() {
		return materialType;
	}

	public void setMaterialType(String materialType) {
		this.materialType = materialType;
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

	private String contractId;// 采购合同id
	private String materialitemcode;//物资图号
	public String getMaterialitemcode() {
		return materialitemcode;
	}

	public void setMaterialitemcode(String materialitemcode) {
		this.materialitemcode = materialitemcode;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getStartId() {
		return startId;
	}

	public void setStartId(String startId) {
		this.startId = startId;
	}

	public String getMaterialcatalogid() {
		return materialcatalogid;
	}

	public void setMaterialcatalogid(String materialcatalogid) {
		this.materialcatalogid = materialcatalogid;
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

	public String getMaterialid() {
		return materialid;
	}

	public void setMaterialid(String materialid) {
		this.materialid = materialid;
	}

	public String getDemension() {
		return demension;
	}

	public void setDemension(String demension) {
		this.demension = demension;
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

	public String getPreservePeriod() {
		return preservePeriod;
	}

	public void setPreservePeriod(String preservePeriod) {
		this.preservePeriod = preservePeriod;
	}

	public Double getReferencePrice() {
		return referencePrice;
	}

	public void setReferencePrice(Double referencePrice) {
		this.referencePrice = referencePrice;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
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

	public Double getWarningValue() {
		return warningValue;
	}

	public void setWarningValue(Double warningValue) {
		this.warningValue = warningValue;
	}

	public String getContractId() {
		return contractId;
	}

	public void setContractId(String contractId) {
		this.contractId = contractId;
	}

	public String getDeliveryStatus() {
		return deliveryStatus;
	}

	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}

	public String getMaterialClass() {
		return materialClass;
	}

	public void setMaterialClass(String materialClass) {
		this.materialClass = materialClass;
	}

	public String getMaterialKind() {
		return materialKind;
	}

	public void setMaterialKind(String materialKind) {
		this.materialKind = materialKind;
	}

	public String getApprover() {
		return approver;
	}

	public void setApprover(String approver) {
		this.approver = approver;
	}

	public String getSelectType() {
		return selectType;
	}

	public void setSelectType(String selectType) {
		this.selectType = selectType;
	}

	public String getMaterialCatalogName() {
		return materialCatalogName;
	}

	public void setMaterialCatalogName(String materialCatalogName) {
		this.materialCatalogName = materialCatalogName;
	}

	public String getPurchaseNum() {
		return purchaseNum;
	}

	public void setPurchaseNum(String purchaseNum) {
		this.purchaseNum = purchaseNum;
	}

	

	
	
}
