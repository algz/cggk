package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.sysware.customize.hd.investment.baseData.product.Product;
import com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlan.BuinessPlan;
@Entity
@Table(name="T_BUINESSPLANDETAILS")
public class BuinessPlanDetail implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 经验计划明细ID
	 */
	private String buinessPlanDetailId;//BUINESSPLANDETAILSID
	/**
	 * 储备数量
	 */
	private BigDecimal stockCount;//STOCKCOUNT
	/**
	 * 总需求数量
	 */
	private BigDecimal totalRequired;//TOTALREQUIRED
	/**
	 * 交付总数量
	 */
	private BigDecimal deliveryCount ;//DELIVERYCOUNT
	/**
	 * 一季度
	 */
	private BigDecimal quarter;//QUARTER
	/**
	 * 三季度
	 */
	private BigDecimal thirdQuarter;//THIRDQUARTER
	/**
	 * 二季度
	 */
	private BigDecimal secondQuarter ;//SECONDQUARTER
	/**
	 * 四季度
	 */
	private BigDecimal fourthQuarter;// FOURTHQUARTER
	/**
	 * 经营计划ID
	 */
	private BuinessPlan buinessPlan;//
	/**
	 * 备注
	 */
	private String remark ;//REMARK
	/**
	 * 对应产品
	 */
	private Product product;
	private String productCode;
	
	
	private BigDecimal january;
	private BigDecimal february;
	private BigDecimal march;
	private BigDecimal april;
	private BigDecimal may;
	private BigDecimal june;
	private BigDecimal july;
	private BigDecimal august;
	private BigDecimal september;
	private BigDecimal october;
	private BigDecimal november;
	private BigDecimal december;
	private String groupType;
	private String unit;
	private BigDecimal lastarrears;
	private String lastsortie;
	private String currentsortie;
	
	private BigDecimal oldDeliverycount;
	private String changer;
	private Date changeTime;
	private String changeReson;
	
	@Id
	@Column(name = "BUINESSPLANDETAILSID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getBuinessPlanDetailId() {
		return buinessPlanDetailId;
	}
	public void setBuinessPlanDetailId(String buinessPlanDetailId) {
		this.buinessPlanDetailId = buinessPlanDetailId;
	}
	public BigDecimal getStockCount() {
		return stockCount;
	}
	public void setStockCount(BigDecimal stockCount) {
		this.stockCount = stockCount;
	}
	public BigDecimal getTotalRequired() {
		return totalRequired;
	}
	public void setTotalRequired(BigDecimal totalRequired) {
		this.totalRequired = totalRequired;
	}
	public BigDecimal getDeliveryCount() {
		return deliveryCount;
	}
	public void setDeliveryCount(BigDecimal deliveryCount) {
		this.deliveryCount = deliveryCount;
	}
	public BigDecimal getQuarter() {
		return quarter;
	}
	public void setQuarter(BigDecimal quarter) {
		this.quarter = quarter;
	}
	public BigDecimal getThirdQuarter() {
		return thirdQuarter;
	}
	public void setThirdQuarter(BigDecimal thirdQuarter) {
		this.thirdQuarter = thirdQuarter;
	}
	public BigDecimal getSecondQuarter() {
		return secondQuarter;
	}
	public void setSecondQuarter(BigDecimal secondQuarter) {
		this.secondQuarter = secondQuarter;
	}
	public BigDecimal getFourthQuarter() {
		return fourthQuarter;
	}
	public void setFourthQuarter(BigDecimal fourthQuarter) {
		this.fourthQuarter = fourthQuarter;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	@ManyToOne
	@JoinColumn(name = "BUINESSPLANID")
	public BuinessPlan getBuinessPlan() {
		return buinessPlan;
	}
	public void setBuinessPlan(BuinessPlan buinessPlan) {
		this.buinessPlan = buinessPlan;
	}
	@ManyToOne
	@JoinColumn(name = "PRODUCTID")
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public String getProductCode() {
		return productCode;
	}
	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}
	
	@Column(name = "JANUARY", precision = 20, scale = 0)
	public BigDecimal getJanuary() {
		return this.january;
	}

	public void setJanuary(BigDecimal january) {
		this.january = january;
	}

	@Column(name = "FEBRUARY", precision = 20, scale = 0)
	public BigDecimal getFebruary() {
		return this.february;
	}

	public void setFebruary(BigDecimal february) {
		this.february = february;
	}

	@Column(name = "MARCH", precision = 20, scale = 0)
	public BigDecimal getMarch() {
		return this.march;
	}

	public void setMarch(BigDecimal march) {
		this.march = march;
	}

	@Column(name = "APRIL", precision = 20, scale = 0)
	public BigDecimal getApril() {
		return this.april;
	}

	public void setApril(BigDecimal april) {
		this.april = april;
	}

	@Column(name = "MAY", precision = 20, scale = 0)
	public BigDecimal getMay() {
		return this.may;
	}

	public void setMay(BigDecimal may) {
		this.may = may;
	}

	@Column(name = "JUNE", precision = 20, scale = 0)
	public BigDecimal getJune() {
		return this.june;
	}

	public void setJune(BigDecimal june) {
		this.june = june;
	}

	@Column(name = "JULY", precision = 20, scale = 0)
	public BigDecimal getJuly() {
		return this.july;
	}

	public void setJuly(BigDecimal july) {
		this.july = july;
	}

	@Column(name = "AUGUST", precision = 20, scale = 0)
	public BigDecimal getAugust() {
		return this.august;
	}

	public void setAugust(BigDecimal august) {
		this.august = august;
	}

	@Column(name = "SEPTEMBER", precision = 20, scale = 0)
	public BigDecimal getSeptember() {
		return this.september;
	}

	public void setSeptember(BigDecimal september) {
		this.september = september;
	}

	@Column(name = "OCTOBER", precision = 20, scale = 0)
	public BigDecimal getOctober() {
		return this.october;
	}

	public void setOctober(BigDecimal october) {
		this.october = october;
	}

	@Column(name = "NOVEMBER", precision = 20, scale = 0)
	public BigDecimal getNovember() {
		return this.november;
	}

	public void setNovember(BigDecimal november) {
		this.november = november;
	}

	@Column(name = "DECEMBER", precision = 20, scale = 0)
	public BigDecimal getDecember() {
		return this.december;
	}

	public void setDecember(BigDecimal december) {
		this.december = december;
	}


	@Column(name = "GROUPTYPE", length = 50)
	public String getGroupType() {
		return groupType;
	}
	public void setGroupType(String groupType) {
		this.groupType = groupType;
	}

	@Column(name = "UNIT", length = 50)
	public String getUnit() {
		return this.unit;
	}

	
	public void setUnit(String unit) {
		this.unit = unit;
	}

	@Column(name = "LASTARREARS", precision = 20, scale = 0)
	public BigDecimal getLastarrears() {
		return this.lastarrears;
	}

	public void setLastarrears(BigDecimal lastarrears) {
		this.lastarrears = lastarrears;
	}

	@Column(name = "LASTSORTIE", length = 50)
	public String getLastsortie() {
		return this.lastsortie;
	}

	public void setLastsortie(String lastsortie) {
		this.lastsortie = lastsortie;
	}

	@Column(name = "CURRENTSORTIE", length = 50)
	public String getCurrentsortie() {
		return this.currentsortie;
	}

	public void setCurrentsortie(String currentsortie) {
		this.currentsortie = currentsortie;
	}
	@Column(name="OLDDELIVERYCOUNT")
	public BigDecimal getOldDeliverycount() {
		return oldDeliverycount;
	}
	public void setOldDeliverycount(BigDecimal oldDeliverycount) {
		this.oldDeliverycount = oldDeliverycount;
	}
	@Column(name="CHANGER")
	public String getChanger() {
		return changer;
	}
	public void setChanger(String changer) {
		this.changer = changer;
	}
	@Column(name="CHANGETIME")
	public Date getChangeTime() {
		return changeTime;
	}
	public void setChangeTime(Date changeTime) {
		this.changeTime = changeTime;
	}
	@Column(name="CHANGERESON")
	public String getChangeReson() {
		return changeReson;
	}
	public void setChangeReson(String changeReson) {
		this.changeReson = changeReson;
	}

	
	
}
