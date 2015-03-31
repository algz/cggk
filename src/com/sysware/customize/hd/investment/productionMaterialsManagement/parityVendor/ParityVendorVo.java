package com.sysware.customize.hd.investment.productionMaterialsManagement.parityVendor;


public class ParityVendorVo {
	
	private String parityVendorId;//比价供应商关系ID
	
	private String parityId;//比价ID
private String type;//是否为落选供应商1为否2是
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	public String getParityId() {
		return parityId;
	}

	public void setParityId(String parityId) {
		this.parityId = parityId;
	}

	private String price;//单价
	
	private String vendorID;//供应商对象ID
	
	private String parityDetailId;//比价详细情况记录ID
	
	private String vendorName;//供应商名称
	
	private String property;//企业性质
	
	private String reposal;//信用度
	
	private String phone;//联系电话
	
	private String productVentor; //生产厂商
	
	private int start;
	
	private int limit;

	public String getParityVendorId() {
		return parityVendorId;
	}

	public void setParityVendorId(String parityVendorId) {
		this.parityVendorId = parityVendorId;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getVendorID() {
		return vendorID;
	}

	public void setVendorID(String vendorID) {
		this.vendorID = vendorID;
	}

	public String getParityDetailId() {
		return parityDetailId;
	}

	public void setParityDetailId(String parityDetailId) {
		this.parityDetailId = parityDetailId;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public String getReposal() {
		return reposal;
	}

	public void setReposal(String reposal) {
		this.reposal = reposal;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getProductVentor() {
		return productVentor;
	}

	public void setProductVentor(String productVentor) {
		this.productVentor = productVentor;
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
	
	
}
