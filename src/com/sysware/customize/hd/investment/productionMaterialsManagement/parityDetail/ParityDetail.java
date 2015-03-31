package com.sysware.customize.hd.investment.productionMaterialsManagement.parityDetail;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
/**
 * 比价审批明细表
 */
@Entity
@Table(name = "T_ParityDetail")
public class ParityDetail implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 2361466250355674325L;
	private String parityDetailId;// 比价审批明显ID
	private Date demandTime;//需用时间
	private String department;//使用单位
	private BigDecimal lastprice;//上次采购价格
	private String manufacturer1;//比价厂商1
	private String manufacturer2;//比价厂商2
	private String manufacturer3;//比价厂商3
	private String manufacturerOne;//建议厂商1
	private String manufacturerTwo;//建议厂商2
	private String manufacturerOneName;//建议厂商1
	private String manufacturerTwoName;//建议厂商2
	private String planner;//计划员
	private String materialId;//物资信息ID
	private BigDecimal planPrice;//计划价
	private BigDecimal price1;//供应商1价格
	private BigDecimal price2;//供应商2价格
	private BigDecimal price3;//供应商3价格
	private String provider;//供应员
	private String  providerName;//供应员名称
	private String plannerName;//计划员名称
	private String purpose;//用途
	private String remark;//采购通知备注
	private String remarks;//采购申请备注
	private String parityId;//比价审批ID
	private BigDecimal scope;//幅度
	
	@Id
	@Column(unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getParityDetailId() {
		return parityDetailId;
	}
	public void setParityDetailId(String parityDetailId) {
		this.parityDetailId = parityDetailId;
	}
	public Date getDemandTime() {
		return demandTime;
	}
	public void setDemandTime(Date demandTime) {
		this.demandTime = demandTime;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public BigDecimal getLastprice() {
		return lastprice;
	}
	public void setLastprice(BigDecimal lastprice) {
		this.lastprice = lastprice;
	}
	public String getManufacturer1() {
		return manufacturer1;
	}
	public void setManufacturer1(String manufacturer1) {
		this.manufacturer1 = manufacturer1;
	}
	public String getManufacturer2() {
		return manufacturer2;
	}
	public void setManufacturer2(String manufacturer2) {
		this.manufacturer2 = manufacturer2;
	}
	public String getManufacturer3() {
		return manufacturer3;
	}
	public void setManufacturer3(String manufacturer3) {
		this.manufacturer3 = manufacturer3;
	}
	public String getManufacturerOne() {
		return manufacturerOne;
	}
	public void setManufacturerOne(String manufacturerOne) {
		this.manufacturerOne = manufacturerOne;
	}
	public String getManufacturerTwo() {
		return manufacturerTwo;
	}
	public void setManufacturerTwo(String manufacturerTwo) {
		this.manufacturerTwo = manufacturerTwo;
	}
	public String getManufacturerOneName() {
		return manufacturerOneName;
	}
	public void setManufacturerOneName(String manufacturerOneName) {
		this.manufacturerOneName = manufacturerOneName;
	}
	public String getManufacturerTwoName() {
		return manufacturerTwoName;
	}
	public void setManufacturerTwoName(String manufacturerTwoName) {
		this.manufacturerTwoName = manufacturerTwoName;
	}
	public String getPlanner() {
		return planner;
	}
	public void setPlanner(String planner) {
		this.planner = planner;
	}
	
	public String getMaterialId() {
		return materialId;
	}
	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}
	public BigDecimal getPlanPrice() {
		return planPrice;
	}
	public void setPlanPrice(BigDecimal planPrice) {
		this.planPrice = planPrice;
	}
	public BigDecimal getPrice1() {
		return price1;
	}
	public void setPrice1(BigDecimal price1) {
		this.price1 = price1;
	}
	public BigDecimal getPrice2() {
		return price2;
	}
	public void setPrice2(BigDecimal price2) {
		this.price2 = price2;
	}
	public BigDecimal getPrice3() {
		return price3;
	}
	public void setPrice3(BigDecimal price3) {
		this.price3 = price3;
	}
	public String getProvider() {
		return provider;
	}
	public void setProvider(String provider) {
		this.provider = provider;
	}
	public String getProviderName() {
		return providerName;
	}
	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}
	public String getPlannerName() {
		return plannerName;
	}
	public void setPlannerName(String plannerName) {
		this.plannerName = plannerName;
	}
	public String getPurpose() {
		return purpose;
	}
	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getParityId() {
		return parityId;
	}
	public void setParityId(String parityId) {
		this.parityId = parityId;
	}
	public BigDecimal getScope() {
		return scope;
	}
	public void setScope(BigDecimal scope) {
		this.scope = scope;
	}
	
	
}
