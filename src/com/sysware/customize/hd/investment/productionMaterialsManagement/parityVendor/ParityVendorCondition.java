package com.sysware.customize.hd.investment.productionMaterialsManagement.parityVendor;

public class ParityVendorCondition {
	
	private String parityVendorId;//比价供应商关系ID
	private String parityId;//比价ID
	
	public String getParityId() {
		return parityId;
	}

	public void setParityId(String parityId) {
		this.parityId = parityId;
	}

	private String price;//单价
	
	private String vendorId;//供应商对象ID
	
	private String parityDetailId;//比价详细情况记录ID
	
	private String vendorName;//供应商名称
	
	private String property;//企业性质
	
	private String reposal;//信用度
	
	private String phone;//联系电话
	
	private String productVentor; //生产厂商

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

	public String getVendorId() {
		return vendorId;
	}

	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
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
	
	
}
