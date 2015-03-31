package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail;

public class BuinessPlanDetailCondition {
	/**
	 * 经验计划明细ID
	 */
	private String buinessPlanDetailId;
	/**
	 * 储备数量
	 */
	private Double stockCount;
	/**
	 * 总需求数量
	 */
	private Double totalRequired;
	/**
	 * 交付总数量
	 */
	private Double deliveryCount ;
	/**
	 * 一季度
	 */
	private Double quarter;
	/**
	 * 三季度
	 */
	private Double thirdQuarter;
	/**
	 * 二季度
	 */
	private Double secondQuarter ;
	/**
	 * 四季度
	 */
	private Double fourthQuarter;
	/**
	 * 经验计划ID
	 */
	private String  buinessPlanId;
	/**
	 * 对应产品Id
	 */
	private  String productId;
	private String productName;
	private String productCode;
	
	public String getBuinessPlanDetailId() {
		return buinessPlanDetailId;
	}
	public void setBuinessPlanDetailId(String buinessPlanDetailId) {
		this.buinessPlanDetailId = buinessPlanDetailId;
	}
	public Double getStockCount() {
		return stockCount;
	}
	public void setStockCount(Double stockCount) {
		this.stockCount = stockCount;
	}
	public Double getTotalRequired() {
		return totalRequired;
	}
	public void setTotalRequired(Double totalRequired) {
		this.totalRequired = totalRequired;
	}
	public Double getDeliveryCount() {
		return deliveryCount;
	}
	public void setDeliveryCount(Double deliveryCount) {
		this.deliveryCount = deliveryCount;
	}
	public Double getQuarter() {
		return quarter;
	}
	public void setQuarter(Double quarter) {
		this.quarter = quarter;
	}
	public Double getThirdQuarter() {
		return thirdQuarter;
	}
	public void setThirdQuarter(Double thirdQuarter) {
		this.thirdQuarter = thirdQuarter;
	}
	public Double getSecondQuarter() {
		return secondQuarter;
	}
	public void setSecondQuarter(Double secondQuarter) {
		this.secondQuarter = secondQuarter;
	}
	public Double getFourthQuarter() {
		return fourthQuarter;
	}
	public void setFourthQuarter(Double fourthQuarter) {
		this.fourthQuarter = fourthQuarter;
	}
	public String getBuinessPlanId() {
		return buinessPlanId;
	}
	public void setBuinessPlanId(String buinessPlanId) {
		this.buinessPlanId = buinessPlanId;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getProductCode() {
		return productCode;
	}
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	
}
