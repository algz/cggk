package com.sysware.customize.hd.investment.productionMaterialsManagement.moneyPayment;

import java.io.Serializable;
/**
 * 货款支付信息Vo
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 5-八月-2011 
 */
public class MoneyPaymentVo implements Serializable {
	private static final long serialVersionUID = 1L;

	private String moneyPaymentId;//货款支付情况ID

	private String amount;//金额 

	private String createDate;//时间

	private String equipmentNumber;//器材数量

	private String incurredDate;//承付日期

	private String invoiceDate;//发票日期

	private String invoiceNo;//发票编号

	private String prepayment;//预付货款

	private String procurementContractId;//相关联合同ID

	private String remark;//备注

	private String taxPrice;//含税单价
	
	private int start;//分页开始
	
	private int limit;//每页条数

	public String getMoneyPaymentId() {
		return moneyPaymentId;
	}

	public void setMoneyPaymentId(String moneyPaymentId) {
		this.moneyPaymentId = moneyPaymentId;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getEquipmentNumber() {
		return equipmentNumber;
	}

	public void setEquipmentNumber(String equipmentNumber) {
		this.equipmentNumber = equipmentNumber;
	}

	public String getIncurredDate() {
		return incurredDate;
	}

	public void setIncurredDate(String incurredDate) {
		this.incurredDate = incurredDate;
	}

	public String getInvoiceDate() {
		return invoiceDate;
	}

	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	public String getInvoiceNo() {
		return invoiceNo;
	}

	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	public String getPrepayment() {
		return prepayment;
	}

	public void setPrepayment(String prepayment) {
		this.prepayment = prepayment;
	}

	public String getProcurementContractId() {
		return procurementContractId;
	}

	public void setProcurementContractId(String procurementContractId) {
		this.procurementContractId = procurementContractId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getTaxPrice() {
		return taxPrice;
	}

	public void setTaxPrice(String taxPrice) {
		this.taxPrice = taxPrice;
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