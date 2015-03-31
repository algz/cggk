package com.sysware.customize.hd.investment.baseData.vendor;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

/**
 * 供应商信息
 * @author tianlin
 * @version 1.0
 * @created 2011-05-16 14:05:18
 */
@Entity
@Table(name="T_VENDOR")
public class Vendor {

	public String getProductVendor() {
		return productVendor;
	}

	public void setProductVendor(String productVendor) {
		this.productVendor = productVendor;
	}

	/**
	 * 供应商ID
	 */
	private String vendorID;
	/**
	 * 账户
	 */
	private String accountID;
	/**
	 * 经营地址
	 */
	private String address;
	/**
	 * 开户行
	 */
	private String bank;
	/**
	 * 经营范围
	 */
	private String businessScope;
	/**
	 * 初评日期
	 */
	private Date initialEvaluationDate;
	/**
	 * 等级
	 */
	private String vendorLevel;
	/**
	 * 电话
	 */
	private String phone;
	/**
	 * 复评结果
	 */
	private String reviewResult;
	/**
	 * 复评日期
	 */
	private Date reviewDate;
	/**
	 * 税号
	 */
	private String taxID;
	/**
	 * 供应商编号
	 */
	private String vendorCode;
	/**
	 * 供应商名称
	 */
	private String vendorName;
	/**
	 * 信用度
	 */
	private String reposal;
	/**
	 * 企业性质
	 */
	private String property;
	/**
	 * 供应商简称
	 */
	private String simpleName;
	/**
	 * 所属行业
	 */
	private String sector;
	/**
	 * email
	 */
	private String email;
	/**
	 * 邮编
	 */
	private String zipCode;
	/**
	 * 许可证
	 */
	private String license;
	
	/**
	 * 企业法人
	 */
	private String egal;
	
	/**
	 * 成立时间
	 */
	private Date setUpDate;
	/**
	 * 注册资本
	 */
	private String registeredCapital;
	/**
	 * 开户行2
	 */
	private String bank2;
	/**
	 * 开户行3
	 */
	private String bank3;
	/**
	 * 银行账户2
	 */
	private String accountID2;
	/**
	 * 银行账户3
	 */
	private String accountID3;
	/**
	 *发货地址
	 */
	private String deliveryAddress;
	/**
	 *供货资格
	 */
	private String availability;
	/**
	 *送审状态：0未送审，1已送审，2评审通过
	 *暂没使用.
	 */
	private char trial_status;
	/**
	 *评审意见
	 */
	private String trial_comment;
	/**
	 *创建时间
	 */
	private Date create_date;
	/**
	 *创建人
	 */
	private String creater;
	/**
	 *选评送审状态：0未送审，1已送审，2送审通过
	 *送审时,采用此状态
	 */
	private char evaluation_status;
	/**
	 *规模
	 */
	private String scale;
	/**
	 *备注
	 */
	private String remark;
	/**
	 *类别:空字符串值,1合格，2试供,
	 */
	private String type;
	/**
	 *传真
	 */
	private String fax;
	
	/**
	 * 代号
	 */
	private String symbol;
	
	/**
	 * 授权
	 */
	private String accredit;
	/**
	 * 许可证日期
	 */
	private Date licenseTime;
	/**
	 * 生产厂商
	 * @return
	 */
	private String productVendor;
	
	/**
	 * 供应商种类  
	 * 0或空:消耗类供应商;1:固定资产类供应商.
	 */
	private String kind;
	
	/**
	 * 供应商种类  
	 * 0或空:供应商;1:生产商.
	 */
	private String kindClass;
	
	public Date getLicenseTime() {
		return licenseTime;
	}

	public void setLicenseTime(Date licenseTime) {
		this.licenseTime = licenseTime;
	}

	public String getDeadLine() {
		return deadLine;
	}

	public void setDeadLine(String deadLine) {
		this.deadLine = deadLine;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getSecrecyLicense() {
		return secrecyLicense;
	}

	public void setSecrecyLicense(String secrecyLicense) {
		this.secrecyLicense = secrecyLicense;
	}

	public String getProduceLicense() {
		return produceLicense;
	}

	public void setProduceLicense(String produceLicense) {
		this.produceLicense = produceLicense;
	}

	/**
	 * 期限
	 */
	private String deadLine;
	/**
	 * 内容
	 */
	private String content;
	/**
	 * 保密资格证号
	 */
	private String secrecyLicense;
	/**
	 * 武器装备生产资格证号
	 */
	private String produceLicense;
	/**
	 * 最近考核日期
	 */
	private Date recentEvaluationDate;
	
	@Temporal( TemporalType.DATE)
	public Date getRecentEvaluationDate() {
		return recentEvaluationDate;
	}

	public void setRecentEvaluationDate(Date recentEvaluationDate) {
		this.recentEvaluationDate = recentEvaluationDate;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getScale() {
		return scale;
	}

	public void setScale(String scale) {
		this.scale = scale;
	}

	public String getSimpleName() {
		return simpleName;
	}

	public void setSimpleName(String simpleName) {
		this.simpleName = simpleName;
	}

	public String getSector() {
		return sector;
	}

	public void setSector(String sector) {
		this.sector = sector;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	public String getLicense() {
		return license;
	}

	public void setLicense(String license) {
		this.license = license;
	}

	public String getEgal() {
		return egal;
	}

	public void setEgal(String egal) {
		this.egal = egal;
	}
	@Temporal( TemporalType.DATE)
	public Date getSetUpDate() {
		return setUpDate;
	}

	public void setSetUpDate(Date setUpDate) {
		this.setUpDate = setUpDate;
	}

	public String getBank2() {
		return bank2;
	}

	public void setBank2(String bank2) {
		this.bank2 = bank2;
	}

	public String getBank3() {
		return bank3;
	}

	public void setBank3(String bank3) {
		this.bank3 = bank3;
	}

	public String getAccountID2() {
		return accountID2;
	}

	public void setAccountID2(String accountID2) {
		this.accountID2 = accountID2;
	}

	public String getAccountID3() {
		return accountID3;
	}

	public void setAccountID3(String accountID3) {
		this.accountID3 = accountID3;
	}

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public String getAvailability() {
		return availability;
	}

	public void setAvailability(String availability) {
		this.availability = availability;
	}

	public char getTrial_status() {
		return trial_status;
	}

	public void setTrial_status(char trialStatus) {
		trial_status = trialStatus;
	}

	public String getTrial_comment() {
		return trial_comment;
	}

	public void setTrial_comment(String trialComment) {
		trial_comment = trialComment;
	}
	@Temporal( TemporalType.DATE)
	public Date getCreate_date() {
		return create_date;
	}

	public void setCreate_date(Date createDate) {
		create_date = createDate;
	}

	public String getCreater() {
		return creater;
	}

	public void setCreater(String creater) {
		this.creater = creater;
	}

	public char getEvaluation_status() {
		return evaluation_status;
	}

	public void setEvaluation_status(char evaluationStatus) {
		evaluation_status = evaluationStatus;
	}

	public String getEvaluation_comment() {
		return evaluation_comment;
	}

	public void setEvaluation_comment(String evaluationComment) {
		evaluation_comment = evaluationComment;
	}

	/**
	 *选评送审意见
	 */
	private String evaluation_comment;
	/**
	 * 供应商所提供的物料名称
	 * 非持久化字段
	 */
	private String materialItemName;
	public Vendor(){

	}

	@Id
	@Column(unique=true, nullable=false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	public String getVendorID() {
		return vendorID;
	}

	public void setVendorID(String vendorID) {
		this.vendorID = vendorID;
	}
	
	public String getAccountID() {
		return accountID;
	}

	public void setAccountID(String accountID) {
		this.accountID = accountID;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBank() {
		return bank;
	}

	public void setBank(String bank) {
		this.bank = bank;
	}

	public String getBusinessScope() {
		return businessScope;
	}

	public void setBusinessScope(String businessScope) {
		this.businessScope = businessScope;
	}

	@Temporal( TemporalType.DATE)
	public Date getInitialEvaluationDate() {
		return initialEvaluationDate;
	}

	public void setInitialEvaluationDate(Date initialEvaluationDate) {
		this.initialEvaluationDate = initialEvaluationDate;
	}

	public String getVendorLevel() {
		return vendorLevel;
	}

	public void setVendorLevel(String vendorLevel) {
		this.vendorLevel = vendorLevel;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getReviewResult() {
		return reviewResult;
	}

	public void setReviewResult(String reviewResult) {
		this.reviewResult = reviewResult;
	}
	
	@Temporal( TemporalType.DATE)
	public Date getReviewDate() {
		return reviewDate;
	}

	public void setReviewDate(Date reviewDate) {
		this.reviewDate = reviewDate;
	}

	public String getTaxID() {
		return taxID;
	}

	public void setTaxID(String taxID) {
		this.taxID = taxID;
	}

	public String getVendorCode() {
		return vendorCode;
	}

	public void setVendorCode(String vendorCode) {
		this.vendorCode = vendorCode;
	}
	
	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	
	public String getReposal() {
		return reposal;
	}

	public void setReposal(String reposal) {
		this.reposal = reposal;
	}

	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	} 

	@Transient
	public String getMaterialItemName() {
		return materialItemName;
	}

	public void setMaterialItemName(String materialItemName) {
		this.materialItemName = materialItemName;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getRegisteredCapital() {
		return registeredCapital;
	}

	public void setRegisteredCapital(String registeredCapital) {
		this.registeredCapital = registeredCapital;
	}

	public String getAccredit() {
		return accredit;
	}

	public void setAccredit(String accredit) {
		this.accredit = accredit;
	}

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
	}

	public String getKindClass() {
		return kindClass;
	}

	public void setKindClass(String kindClass) {
		this.kindClass = kindClass;
	}

	
	
}