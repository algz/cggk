package com.sysware.customize.hd.investment.baseData.materialQuota;

import com.sysware.customize.hd.investment.baseData.material.Material;

public class MaterialQuotaCondition {
	private String materialQuotaId;// 材料定额唯一标识
	private Double materialCount;// 物料数量
	private Material material;// 物资信息
	private String productCode;// 产品型号
	private String remark;// 备注

	private String materialitemcode;//物料编码
	private String materialItemName;// 物料名称
	private String materialStandard;// 物料规格
	private String technicCondition;// 技术条件
	
	private String inventoryID;// 各种清册明显唯一标示
	private Double numberOne;// 件数（1：1）
	private Double numberTwo;// 件数（1：4）
	private Double numberThree;// 件数（1：12）
	private Double numberFour;// 件数（1：26）
	private String useSite;// 使用部位
	private String partID;// 装配图号
	private String type;// 清册类型：1成品清单定额2备件清册3设备清册4工具清册5标准件清册
	private String[] types;// 清册类型集合

	private String startId;// 开始列表参数（父Id）
	private Integer start;// 分页开始
	private Integer limit;// 每页页列表数
    private Integer count;//总数
	
    
    
	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getMaterialQuotaId() {
		return materialQuotaId;
	}

	public void setMaterialQuotaId(String materialQuotaId) {
		this.materialQuotaId = materialQuotaId;
	}

	public Double getMaterialCount() {
		return materialCount;
	}

	public void setMaterialCount(Double materialCount) {
		this.materialCount = materialCount;
	}

	public Material getMaterial() {
		return material;
	}

	public void setMaterial(Material material) {
		this.material = material;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getInventoryID() {
		return inventoryID;
	}

	public void setInventoryID(String inventoryID) {
		this.inventoryID = inventoryID;
	}

	public Double getNumberOne() {
		return numberOne;
	}

	public void setNumberOne(Double numberOne) {
		this.numberOne = numberOne;
	}

	public Double getNumberTwo() {
		return numberTwo;
	}

	public void setNumberTwo(Double numberTwo) {
		this.numberTwo = numberTwo;
	}

	public Double getNumberThree() {
		return numberThree;
	}

	public void setNumberThree(Double numberThree) {
		this.numberThree = numberThree;
	}

	public Double getNumberFour() {
		return numberFour;
	}

	public void setNumberFour(Double numberFour) {
		this.numberFour = numberFour;
	}

	public String getUseSite() {
		return useSite;
	}

	public void setUseSite(String useSite) {
		this.useSite = useSite;
	}

	public String getPartID() {
		return partID;
	}

	public void setPartID(String partID) {
		this.partID = partID;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String[] getTypes() {
		return types;
	}

	public void setTypes(String[] types) {
		this.types = types;
	}

	public String getStartId() {
		return startId;
	}

	public void setStartId(String startId) {
		this.startId = startId;
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

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getMaterialitemcode() {
		return materialitemcode;
	}

	public void setMaterialitemcode(String materialitemcode) {
		this.materialitemcode = materialitemcode;
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
	
	
	
}
