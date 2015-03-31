package com.sysware.customize.hd.investment.baseData.vendor;

import java.math.BigDecimal;
import java.util.Date;

import com.sysware.util.StrUtil;

public class VendorVo {
	
	public static final String NODE_TYPE_MATERIAL_CATALOG = "0";
	public static final String NODE_TYPE_MATERIAL = "1";
	private String vendorByMaterial;//通过物资查询供应商，1已关联的 2 未关联的
	private String materialIds;//通过物资关联供应商可以是多个物资
	public String getMaterialIds() {
		return materialIds;
	}

	public void setMaterialIds(String materialIds) {
		this.materialIds = materialIds;
	}

	public String getVendorByMaterial() {
		return vendorByMaterial;
	}

	public void setVendorByMaterial(String vendorByMaterial) {
		this.vendorByMaterial = vendorByMaterial;
	}

	private long selectStatus;//判断状态确定显示的是哪一个页面  1代表加载供应商目录的表格
	
	private String mark;//是否有资质过期的标志0未过期1过期
	public String getMark() {
		return mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

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
	
	/**
	 * 供应商ID
	 */
	private String vendorID;
	/**
	 * 所选物料种类ID
	 */
	private String materialCatalogID;
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
	private String initialEvaluationDate;
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
	private String reviewDate;
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
	private String setUpDate;
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
	 *评审意见
	 */
	private String trial_comment;
	 
	/**
	 *规模
	 */
	private String scale;
	/**
	 *送审状态：0未送审，1已送审，2评审通过
	 */
	private String trial_status;
	/**
	 *备注
	 */
	private String remark;
	/**
	 *创建人
	 */
	private String creater;

	/**
	 *类别:空字符串，1合格，2试供,
	 */
	private String type;
	
	/**
	 * 许可证日期
	 */
	private String licenseTime;
	
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
	 * 生产厂商
	 * @return
	 */
	private String productVendor;
	
	private Integer count;//记录总数
	
	private String assessId;//考核单id
	
	private String assessNum;//考核单编号
	
	private String assessName;//考核单名称
	
	private String assessType;//考核单产品类型
	
	private String editor;//考核单制表人
	
	private String editdate;//考核单制表时间
	
	private String assessDetailId;//供应商考核详细表id
	
	private String venderId;//供应商id
	
	private String departId;//承制商id
	
	private String matingType;//配套机型
	
	private String massScore;//质量综合分
	
	private String payScore;//支付综合分
	
	private String serveScore;//服务综合分
	
	private String compositeScore;//综合得分
	
	private String assessGrade;//评定等级
	
	private String dpCode;//承制单位编号
	
	private String dpName;//承制单位名称
	
	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getAssessId() {
		return assessId;
	}

	public void setAssessId(String assessId) {
		this.assessId = assessId;
	}

	public String getAssessNum() {
		return assessNum;
	}

	public void setAssessNum(String assessNum) {
		this.assessNum = assessNum;
	}

	public String getAssessName() {
		return assessName;
	}

	public void setAssessName(String assessName) {
		this.assessName = assessName;
	}

	public String getAssessType() {
		return assessType;
	}

	public void setAssessType(String assessType) {
		this.assessType = assessType;
	}

	public String getEditor() {
		return editor;
	}

	public void setEditor(String editor) {
		this.editor = editor;
	}

	public String getEditdate() {
		return editdate;
	}

	public void setEditdate(String editdate) {
		this.editdate = editdate;
	}

	public String getAssessDetailId() {
		return assessDetailId;
	}

	public void setAssessDetailId(String assessDetailId) {
		this.assessDetailId = assessDetailId;
	}

	public String getVenderId() {
		return venderId;
	}

	public void setVenderId(String venderId) {
		this.venderId = venderId;
	}

	public String getDepartId() {
		return departId;
	}

	public void setDepartId(String departId) {
		this.departId = departId;
	}

	public String getMatingType() {
		return matingType;
	}

	public void setMatingType(String matingType) {
		this.matingType = matingType;
	}

	public String getMassScore() {
		return massScore;
	}

	public void setMassScore(String massScore) {
		this.massScore = massScore;
	}

	public String getPayScore() {
		return payScore;
	}

	public void setPayScore(String payScore) {
		this.payScore = payScore;
	}

	public String getServeScore() {
		return serveScore;
	}

	public void setServeScore(String serveScore) {
		this.serveScore = serveScore;
	}

	public String getCompositeScore() {
		return compositeScore;
	}

	public void setCompositeScore(String compositeScore) {
		this.compositeScore = compositeScore;
	}

	public String getAssessGrade() {
		return assessGrade;
	}

	public void setAssessGrade(String assessGrade) {
		this.assessGrade = assessGrade;
	}

	public String getDpCode() {
		return dpCode;
	}

	public void setDpCode(String dpCode) {
		this.dpCode = dpCode;
	}

	public String getDpName() {
		return dpName;
	}

	public void setDpName(String dpName) {
		this.dpName = dpName;
	}

	public String getProductVendor() {
		return productVendor;
	}

	public void setProductVendor(String productVendor) {
		this.productVendor = productVendor;
	}

	public String getLicenseTime() {
		return licenseTime;
	}

	public void setLicenseTime(String licenseTime) {
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
	 * 武器装备生产资格证号
	 */
	private String produceLicense;
	/**
	 * 最近考核日期
	 */
	private String recentEvaluationDate;
	/**
	 * 招标时选择供应商添加的价格
	 */
	private String price;

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getRecentEvaluationDate() {
		return recentEvaluationDate;
	}

	public void setRecentEvaluationDate(String recentEvaluationDate) {
		this.recentEvaluationDate = recentEvaluationDate;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	/**
	 * 代号
	 */
	private String symbol;
	
	/**
	 * 授权
	 */
	private String accredit;
	/**
	 *传真
	 */
	private String fax;
	/**
	 *创建时间
	 */
	private String create_date;
	 
	/**
	 *选评送审状态：0未送审，1已送审，2送审通过
	 */
	private String evaluation_status;
	
	/**
	 *创建人名称
	 */
	private String createrName;
	 
	public String getCreaterName() {
		return createrName;
	}

	public void setCreaterName(String createrName) {
		this.createrName = createrName;
	}

	public String getCreate_date() {
		return create_date;
	}

	public void setCreate_date(String createDate) {
		create_date = createDate;
	}

	public String getEvaluation_status() {
		return evaluation_status;
	}

	public void setEvaluation_status(String evaluationStatus) {
		evaluation_status = evaluationStatus;
	}

	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getCreater() {
		return creater;
	}

	public void setCreater(String creater) {
		this.creater = creater;
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

	public String getTrial_status() {
		return trial_status;
	}

	public void setTrial_status(String trialStatus) {
		trial_status = trialStatus;
	}

	public void setScale(String scale) {
		this.scale = scale;
	}

	/**
	 * 分页开始
	 */
	private int start;
	/**
	 * 分页条数
	 */
	private int limit;
	/**
	 * 所选结点id
	 */
	private String nodeId;
	/**
	 * 所选结点类型
	 */
	private String nodeType;
	/**
	 * 所选节点的顶级父节点名称
	 */
	private String topTypeName;
	/**
	 * 通过树选定的物料集合ID字符串
	 */
	private String materialIDs;
	/**
	 * 通过树选定的物料种类集合ID字符串
	 */
	private String catalogIDs;
	/**
	 * 供应商所提供的物料名称
	 */
	private String materialItemName;
	
	private String materialId;//物料Id
	
	private String oldVendorIDString;//
	
	
	public String getOldVendorIDString() {
		return oldVendorIDString;
	}

	public void setOldVendorIDString(String oldVendorIDString) {
		this.oldVendorIDString = oldVendorIDString;
	}

	public String getVendorID() {
		return vendorID;
	}

	public void setVendorID(String vendorID) {
		if (!StrUtil.isNullOrEmpty(vendorID)) {
			this.vendorID = vendorID;
		}
	}

	public String getMaterialCatalogID() {
		return materialCatalogID;
	}

	public void setMaterialCatalogID(String materialCatalogID) {
		this.materialCatalogID = materialCatalogID;
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

	 
	public String getRegisteredCapital() {
		return registeredCapital;
	}

	public void setRegisteredCapital(String registeredCapital) {
		this.registeredCapital = registeredCapital;
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
 
	public String getTrial_comment() {
		return trial_comment;
	}

	public void setTrial_comment(String trialComment) {
		trial_comment = trialComment;
	}
 

	public String getSetUpDate() {
		return setUpDate;
	}

	public void setSetUpDate(String setUpDate) {
		this.setUpDate = setUpDate;
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

	public String getInitialEvaluationDate() {
		return initialEvaluationDate;
	}

	public void setInitialEvaluationDate(String initialEvaluationDate) {
		this.initialEvaluationDate = initialEvaluationDate;
	}

	public String getReviewDate() {
		return reviewDate;
	}

	public void setReviewDate(String reviewDate) {
		this.reviewDate = reviewDate;
	}

	public String getNodeId() {
		return nodeId;
	}

	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	public String getNodeType() {
		return nodeType;
	}

	public void setNodeType(String nodeType) {
		this.nodeType = nodeType;
	}

	public String getMaterialIDs() {
		return materialIDs;
	}

	public void setMaterialIDs(String materialIDs) {
		this.materialIDs = materialIDs;
	}

	public String getCatalogIDs() {
		return catalogIDs;
	}

	public void setCatalogIDs(String catalogIDs) {
		this.catalogIDs = catalogIDs;
	}

	public String getMaterialItemName() {
		return materialItemName;
	}

	public void setMaterialItemName(String materialItemName) {
		this.materialItemName = materialItemName;
	}

	public String getTopTypeName() {
		return topTypeName;
	}

	public void setTopTypeName(String topTypeName) {
		this.topTypeName = topTypeName;
	}

	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getAccredit() {
		return accredit;
	}

	public void setAccredit(String accredit) {
		this.accredit = accredit;
	}

	public long getSelectStatus() {
		return selectStatus;
	}

	public void setSelectStatus(long selectStatus) {
		this.selectStatus = selectStatus;
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
