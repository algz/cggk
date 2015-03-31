package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail;




public class BuinessPlanDetailVo {
	/**
	 * 经验计划明细ID
	 */
	private String buinessPlanDetailId;
	/**
	 * 储备数量
	 */
	private String stockCount;
	/**
	 * 总需求数量
	 */
	private String totalRequired;
	/**
	 * 交付总数量
	 */
	private String deliveryCount ;
	/**
	 * 一季度
	 */
	private String quarter;
	/**
	 * 三季度
	 */
	private String thirdQuarter;
	/**
	 * 二季度
	 */
	private String secondQuarter ;
	/**
	 * 四季度
	 */
	private String fourthQuarter;
	/**
	 * 经验计划ID
	 */
	private String  buinessPlanId;
	/**
	 * 对应产品Id
	 */
	private  String productId;
	private  String productName;
	private String productCode;
	
	private String january;
	private String february;
	private String march;
	private String april;
	private String may;
	private String june;
	private String july;
	private String august;
	private String september;
	private String october;
	private String november;
	private String december;
	private String groupType;
	private String unit;
	private String lastarrears;
	private String lastsortie;
	private String currentsortie;
	
	private String oldDeliverycount;
	private String changer;
	private String changeTime;
	private String changeReson;
	
	/**
	 * 备注
	 */
	private String remark ;//REMARK
	private Integer start;// 分页开始
	private Integer limit;// 分页条数

	
	public String getBuinessPlanDetailId() {
		return buinessPlanDetailId;
	}
	public void setBuinessPlanDetailId(String buinessPlanDetailId) {
		this.buinessPlanDetailId = buinessPlanDetailId;
	}
	
	public String getStockCount() {
		return stockCount;
	}
	public void setStockCount(String stockCount) {
		this.stockCount = stockCount;
	}
	public String getTotalRequired() {
		return totalRequired;
	}
	public void setTotalRequired(String totalRequired) {
		this.totalRequired = totalRequired;
	}
	public String getDeliveryCount() {
		return deliveryCount;
	}
	public void setDeliveryCount(String deliveryCount) {
		this.deliveryCount = deliveryCount;
	}
	public String getQuarter() {
		return quarter;
	}
	public void setQuarter(String quarter) {
		this.quarter = quarter;
	}
	public String getThirdQuarter() {
		return thirdQuarter;
	}
	public void setThirdQuarter(String thirdQuarter) {
		this.thirdQuarter = thirdQuarter;
	}
	public String getSecondQuarter() {
		return secondQuarter;
	}
	public void setSecondQuarter(String secondQuarter) {
		this.secondQuarter = secondQuarter;
	}
	public String getFourthQuarter() {
		return fourthQuarter;
	}
	public void setFourthQuarter(String fourthQuarter) {
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
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
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
	public String getJanuary() {
		return january;
	}
	public void setJanuary(String january) {
		this.january = january;
	}
	public String getFebruary() {
		return february;
	}
	public void setFebruary(String february) {
		this.february = february;
	}
	public String getMarch() {
		return march;
	}
	public void setMarch(String march) {
		this.march = march;
	}
	public String getApril() {
		return april;
	}
	public void setApril(String april) {
		this.april = april;
	}
	public String getMay() {
		return may;
	}
	public void setMay(String may) {
		this.may = may;
	}
	public String getJune() {
		return june;
	}
	public void setJune(String june) {
		this.june = june;
	}
	public String getJuly() {
		return july;
	}
	public void setJuly(String july) {
		this.july = july;
	}
	public String getAugust() {
		return august;
	}
	public void setAugust(String august) {
		this.august = august;
	}
	public String getSeptember() {
		return september;
	}
	public void setSeptember(String september) {
		this.september = september;
	}
	public String getOctober() {
		return october;
	}
	public void setOctober(String october) {
		this.october = october;
	}
	public String getNovember() {
		return november;
	}
	public void setNovember(String november) {
		this.november = november;
	}
	public String getDecember() {
		return december;
	}
	public void setDecember(String december) {
		this.december = december;
	}

	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getLastarrears() {
		return lastarrears;
	}
	public void setLastarrears(String lastarrears) {
		this.lastarrears = lastarrears;
	}
	public String getLastsortie() {
		return lastsortie;
	}
	public void setLastsortie(String lastsortie) {
		this.lastsortie = lastsortie;
	}
	public String getCurrentsortie() {
		return currentsortie;
	}
	public void setCurrentsortie(String currentsortie) {
		this.currentsortie = currentsortie;
	}
	public String getGroupType() {
		return groupType;
	}
	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}
	public String getOldDeliverycount() {
		return oldDeliverycount;
	}
	public void setOldDeliverycount(String oldDeliverycount) {
		this.oldDeliverycount = oldDeliverycount;
	}
	public String getChanger() {
		return changer;
	}
	public void setChanger(String changer) {
		this.changer = changer;
	}
	public String getChangeTime() {
		return changeTime;
	}
	public void setChangeTime(String changeTime) {
		this.changeTime = changeTime;
	}
	public String getChangeReson() {
		return changeReson;
	}
	public void setChangeReson(String changeReson) {
		this.changeReson = changeReson;
	}
	
	

}
