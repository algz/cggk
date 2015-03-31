package com.sysware.customize.hd.investment.baseData.material;

/**
 * 物料信息查询条件
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 2011-05-20 14:05:28
 */
public class MaterialCondition {
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
	private double preservePeriod;
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
	private String materialType;//用于入库登记的时候区分1金属2非金属
	public String getMaterialType() {
		return materialType;
	}

	public void setMaterialType(String materialType) {
		this.materialType = materialType;
	}

	public String getMaterialitemcode() {
		return materialitemcode;
	}

	public void setMaterialitemcode(String materialitemcode) {
		this.materialitemcode = materialitemcode;
	}

	/**
	 * 预警值。
	 */
	private Double warningValue;
	private String materialitemcode;//物资编码

	private int start;// 分页开始

	private int limit;// 分页条数
	
	private int count;//记录总数

	private String startId;// 获取树上的物料信息id

	private String materialcatalogid;// 物料种类id

	private String parentId;// 物料种类关联id
	
	private String parentidName ;//物料总类(小类)

	private String materialcatalogName;// 物料种类(大类)

	public String getParentidName() {
		return parentidName;
	}

	public void setParentidName(String parentidName) {
		this.parentidName = parentidName;
	}

	public String getMaterialcatalogName() {
		return materialcatalogName;
	}

	public void setMaterialcatalogName(String materialcatalogName) {
		this.materialcatalogName = materialcatalogName;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
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

	public double getPreservePeriod() {
		return preservePeriod;
	}

	public void setPreservePeriod(double preservePeriod) {
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

}
