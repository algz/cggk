package com.sysware.customize.hd.investment.productionMaterialsManagement.moneyPayment;

import java.io.Serializable;
import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.Date;
/**
 * 货款支付信息
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 5-八月-2011 
 */
@Entity
@Table(name = "T_MoneyPayment")
public class MoneyPayment implements Serializable {
	private static final long serialVersionUID = 1L;

	private String moneyPaymentId;//货款支付情况ID

	private BigDecimal amount;//金额 

	private Date createDate;//时间

	private BigDecimal equipmentNumber;//器材数量

	private Date incurredDate;//承付日期

	private Date invoiceDate;//发票日期

	private String invoiceNo;//发票编号 

	private BigDecimal prepayment;//预付货款

	private String procurementContractId;//相关联合同ID

	private String remark;//备注

	private BigDecimal taxPrice;//含税单价

	@Id
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	@Column(unique = true, nullable = false)	
	public String getMoneyPaymentId() {
		return moneyPaymentId;
	}

	public void setMoneyPaymentId(String moneyPaymentId) {
		this.moneyPaymentId = moneyPaymentId;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	@Temporal(TemporalType.DATE)
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public BigDecimal getEquipmentNumber() {
		return equipmentNumber;
	}

	public void setEquipmentNumber(BigDecimal equipmentNumber) {
		this.equipmentNumber = equipmentNumber;
	}

	@Temporal(TemporalType.DATE)
	public Date getIncurredDate() {
		return incurredDate;
	}

	public void setIncurredDate(Date incurredDate) {
		this.incurredDate = incurredDate;
	}

	@Temporal(TemporalType.DATE)
	public Date getInvoiceDate() {
		return invoiceDate;
	}

	public void setInvoiceDate(Date invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	public String getInvoiceNo() {
		return invoiceNo;
	}

	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	public BigDecimal getPrepayment() {
		return prepayment;
	}

	public void setPrepayment(BigDecimal prepayment) {
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

	public BigDecimal getTaxPrice() {
		return taxPrice;
	}

	public void setTaxPrice(BigDecimal taxPrice) {
		this.taxPrice = taxPrice;
	}

}