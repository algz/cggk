package com.sysware.customize.hd.investment.investSupport.vo;

/**
 * @ClassName: ContractExecuteInfoVo  
 * @Description: 合同执行情况VO类
 * 
 * @author LIT
 * @date Nov 25, 2011 3:25:49 PM
 * 
 */

public class ContractExecuteInfoVo {
	private String arrearageAmount;
	private String arrivalCount;
	private String arrivalLoton;
	private String contractCode;

	private String contractName;

	private String conttractAmount;

	private String materialitemCode;

	private String materialitemName;

	private String materialStandard;

	private String notAarrivalCount;
	private String orderCount;
	private String payMentAmount;
	private String purchaseNum;
	private String incurredDate;//承付日期
	
	public String getPurchaseNum() {
		return purchaseNum;
	}

	public void setPurchaseNum(String purchaseNum) {
		this.purchaseNum = purchaseNum;
	}

	public String getArrearageAmount() {
		return arrearageAmount;
	}
	
	public String getArrivalCount() {
		return arrivalCount;
	}
	public String getArrivalLoton() {
		return arrivalLoton;
	}
	public String getContractCode() {
		return contractCode;
	}
    public String getContractName() {
		return contractName;
	}
    public String getConttractAmount() {
		return conttractAmount;
	}
	public String getMaterialitemCode() {
		return materialitemCode;
	}

	public String getMaterialitemName() {
		return materialitemName;
	}

	public String getMaterialStandard() {
		return materialStandard;
	}

	public String getNotAarrivalCount() {
		return notAarrivalCount;
	} 
	public String getOrderCount() {
		return orderCount;
	}

	public String getPayMentAmount() {
		return payMentAmount;
	}

	public void setArrearageAmount(String arrearageAmount) {
		this.arrearageAmount = arrearageAmount;
	}

	public void setArrivalCount(String arrivalCount) {
		this.arrivalCount = arrivalCount;
	}

	public void setArrivalLoton(String arrivalLoton) {
		this.arrivalLoton = arrivalLoton;
	}

	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}

	public void setContractName(String contractName) {
		this.contractName = contractName;
	}

	public void setConttractAmount(String conttractAmount) {
		this.conttractAmount = conttractAmount;
	}

	public void setMaterialitemCode(String materialitemCode) {
		this.materialitemCode = materialitemCode;
	}

	public void setMaterialitemName(String materialitemName) {
		this.materialitemName = materialitemName;
	}

	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}

	public void setNotAarrivalCount(String notAarrivalCount) {
		this.notAarrivalCount = notAarrivalCount;
	}

	public void setOrderCount(String orderCount) {
		this.orderCount = orderCount;
	}

	public void setPayMentAmount(String payMentAmount) {
		this.payMentAmount = payMentAmount;
	}

	public String getIncurredDate() {
		return incurredDate;
	}

	public void setIncurredDate(String incurredDate) {
		this.incurredDate = incurredDate;
	}
	
	
	

}
