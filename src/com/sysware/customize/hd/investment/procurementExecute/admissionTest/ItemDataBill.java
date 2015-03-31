package com.sysware.customize.hd.investment.procurementExecute.admissionTest;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

@Table(name = "T_ITEM_DATE_BILL")
@Entity 
public class ItemDataBill {
	/**
	 * 定检期限
	 */
	private BigDecimal checkLife;
	/**
	 * 定检到期时间
	 */
	private Date checkLifeDeadLine;
	/**
	 * 保证期限
	 */
	private BigDecimal guarantyLife;
	/**
	 * 保证期限时间
	 */
	private Date guarantyLifeDeadLine;
	/**
	 * 主键
	 */
	private String itemBillId;
	/**
	 * 进场时间
	 */
	private Date inFactoryData;
	/**
	 * 1部检2海军检3空军检
	 */
	private String itemPurpose;
	/**
	 * 备注
	 */
	private String note;
	/**
	 * 油封期限
	 */
	private BigDecimal oilLife;
	/**
	 * 油封期限时间
	 */
	private Date oilLifeDeadLine;
	/**
	 * 合同编号
	 */
	private String orderNo;
	/**
	 * 出场时间
	 */
	private Date outFactoryData;
	/**
	 * 储存期限
	 */
	private BigDecimal potLife; 
	/**
	 * 储存到期时间
	 */
	private Date potLifeDeadLine; 
	/**
	 * 合格证号
	 */
	private String supplyCertifica;
	/**
	 * 炉批号
	 */
	private String supplyRegularNo;
	/**
	 * 使用期限
	 */
	private BigDecimal useLife;
	/**
	 * 使用到期时间
	 */
	private Date useLifeDeadLine;
	/**
	 * 供应商编号
	 */
	private String vendorCode;
	
	/**
	 * 生产日期
	 */
	private Date createDate;
	@Temporal(TemporalType.DATE)
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	/**
	 * 供应商名称
	 */
	private String vendorName;
	@Column(name = "CHECK_LIFE")
	public BigDecimal getCheckLife() {
		return checkLife;
	}
	@Column(name = "CHECK_LIFE_DEADLINE")
	@Temporal(TemporalType.DATE)
	public Date getCheckLifeDeadLine() {
		return checkLifeDeadLine;
	}

	@Column(name = "GUARANTY_LIFE")
	public BigDecimal getGuarantyLife() {
		return guarantyLife;
	}

	@Column(name = "GUARANTY_LIFE_DEADLINE")
	@Temporal(TemporalType.DATE)
	public Date getGuarantyLifeDeadLine() {
		return guarantyLifeDeadLine;
	}

	@Id
	@Column(name = "ID", unique = true, nullable = false) 
	public String getItemBillId() {
		return itemBillId;
	}

	@Column(name = "IN_FACTORY_DATA")
	@Temporal(TemporalType.DATE)
	public Date getInFactoryData() {
		return inFactoryData;
	}

	@Column(name = "ITEM_PURPOSE")
	public String getItemPurpose() {
		return itemPurpose;
	}

	@Column(name = "NOTE")
	public String getNote() {
		return note;
	}

	@Column(name = "OIL_LIFE")
	public BigDecimal getOilLife() {
		return oilLife;
	}

	@Column(name = "OIL_LIFE_DEADLINE")
	@Temporal(TemporalType.DATE)
	public Date getOilLifeDeadLine() {
		return oilLifeDeadLine;
	}
	@Column(name = "ORDER_NO")
	public String getOrderNo() {
		return orderNo;
	}

	@Column(name = "OUT_FACTORY_DATA")
	@Temporal(TemporalType.DATE)
	public Date getOutFactoryData() {
		return outFactoryData;
	}
	@Column(name = "POT_LIFE")
	public BigDecimal getPotLife() {
		return potLife;
	}

	@Column(name = "POT_LIFE_DEADLINE")
	@Temporal(TemporalType.DATE)
	public Date getPotLifeDeadLine() {
		return potLifeDeadLine;
	}
	@Column(name = "SUPPLIER_CERTIFICA")
	public String getSupplyCertifica() {
		return supplyCertifica;
	}

	@Column(name = "SUPPLY_REGULAR_NO") 
	public String getSupplyRegularNo() {
		return supplyRegularNo;
	}
	@Column(name = "USE_LIFE")
	public BigDecimal getUseLife() {
		return useLife;
	}

	@Column(name = "USE_LIFE_DEADLINE")
	@Temporal(TemporalType.DATE)
	public Date getUseLifeDeadLine() {
		return useLifeDeadLine;
	}
	@Column(name = "SRM_VENDOR_ID")
	public String getVendorCode() {
		return vendorCode;
	}

	@Column(name = "VENDOR_NAME")
	public String getVendorName() {
		return vendorName;
	}
	public void setCheckLife(BigDecimal checkLife) {
		this.checkLife = checkLife;
	}
	public void setCheckLifeDeadLine(Date checkLifeDeadLine) {
		this.checkLifeDeadLine = checkLifeDeadLine;
	}

	public void setGuarantyLife(BigDecimal guarantyLife) {
		this.guarantyLife = guarantyLife;
	}
	public void setGuarantyLifeDeadLine(Date guarantyLifeDeadLine) {
		this.guarantyLifeDeadLine = guarantyLifeDeadLine;
	}

	 
	public void setItemBillId(String itemBillId) {
		this.itemBillId = itemBillId;
	}
	public void setInFactoryData(Date inFactoryData) {
		this.inFactoryData = inFactoryData;
	}

	public void setItemPurpose(String itemPurpose) {
		this.itemPurpose = itemPurpose;
	}
	public void setNote(String note) {
		this.note = note;
	}

	public void setOilLife(BigDecimal oilLife) {
		this.oilLife = oilLife;
	}
	public void setOilLifeDeadLine(Date oilLifeDeadLine) {
		this.oilLifeDeadLine = oilLifeDeadLine;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public void setOutFactoryData(Date outFactoryData) {
		this.outFactoryData = outFactoryData;
	}

	public void setPotLife(BigDecimal potLife) {
		this.potLife = potLife;
	}
	
	public void setPotLifeDeadLine(Date potLifeDeadLine) {
		this.potLifeDeadLine = potLifeDeadLine;
	}

	public void setSupplyCertifica(String supplyCertifica) {
		this.supplyCertifica = supplyCertifica;
	}
	public void setSupplyRegularNo(String supplyRegularNo) {
		this.supplyRegularNo = supplyRegularNo;
	}

	public void setUseLife(BigDecimal useLife) {
		this.useLife = useLife;
	}
	public void setUseLifeDeadLine(Date useLifeDeadLine) {
		this.useLifeDeadLine = useLifeDeadLine;
	}

	public void setVendorCode(String vendorCode) {
		this.vendorCode = vendorCode;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
}
