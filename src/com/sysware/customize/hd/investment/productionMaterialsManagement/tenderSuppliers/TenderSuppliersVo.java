package com.sysware.customize.hd.investment.productionMaterialsManagement.tenderSuppliers;


public class TenderSuppliersVo {
	
	private String id;//主键
	private String parityId;//采购计划ID
	private String status;//状态,0参与投标的供应商(初始状态),1中标的供应商,2未中标的供应商
	private String vendorId;// 供应商、中标厂商
	private String vendorName;// 中标厂商名
	private String vendorAddress;//供应商经营地址
	private String vendorBusinessScope;//供应商经营范围
	private String vendorPrice;//供应商单价
	private String materialId;//关联到物料ID
	
	private String json;//用于传输数组,在保存时用到.
	private Integer start;
	private Integer limit;
	private Integer count;
	
	
	
	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}

	public String getParityId() {
		return parityId;
	}

	public void setParityId(String parityId) {
		this.parityId = parityId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
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
	
	public String getVendorAddress() {
		return vendorAddress;
	}
	
	public void setVendorAddress(String vendorAddress) {
		this.vendorAddress = vendorAddress;
	}
	
	public String getVendorBusinessScope() {
		return vendorBusinessScope;
	}
	
	public void setVendorBusinessScope(String vendorBusinessScope) {
		this.vendorBusinessScope = vendorBusinessScope;
	}
	
	public String getVendorPrice() {
		return vendorPrice;
	}
	
	public void setVendorPrice(String vendorPrice) {
		this.vendorPrice = vendorPrice;
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
	
	public Integer getCount() {
		return count;
	}
	
	public void setCount(Integer count) {
		this.count = count;
	}
	
}
