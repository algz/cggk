package com.sysware.customize.hd.investment.procurementExecute.admissionTest;

import java.math.BigDecimal;
import java.util.Date;

public class AdmissionTestVo {
	/**
	 * 定检期限
	 */
	private String checkLife;
	/**
	 * 定检到期时间
	 */
	private String checkLifeDeadLine;
	/**
	 * 保证期限
	 */
	private String guarantyLife;
	/**
	 * 保证期限时间
	 */
	private String guarantyLifeDeadLine;
	/**
	 * 检测报告
	 */
	private String testReport;
	public String getTestReport() {
		return testReport;
	}

	public void setTestReport(String testReport) {
		this.testReport = testReport;
	}

	/**
	 * 主键
	 */
	private String Id;
	/**
	 * 进场时间
	 */
	private String inFactoryData;
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
	private String oilLife;
	/**
	 * 油封期限时间
	 */
	private String oilLifeDeadLine;
	/**
	 * 合同编号
	 */
	private String orderNo;
	/**
	 * 出场时间
	 */
	private String outFactoryData;
	/**
	 * 储存期限
	 */
	private String potLife;
	/**
	 * 储存到期时间
	 */
	private String potLifeDeadLine;
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
	private String useLife;
	/**
	 * 使用到期时间
	 */
	private String useLifeDeadLine;
	/**
	 * 供应商编号
	 */
	private String vendorCode;
	private String restAssuredNumber;// 放行数量
	private String restAssuredDate;// 放行日期
	/**
	 * 开箱检验
	 */
	private String outCheck;
	/**
	 * 请检
	 */
	private String pleaseCheck;
	/**
	 * 表面初检
	 */
	private String oneCheck;
	/**
	 * 磨火花
	 */
	private String ynSpark;
	/**
	 * 喷字
	 */
	private String sprayWord;
	/**
	 * 不合格处理
	 */
	private String failureHandling;
	
	/**
	 * 物资状态:1正常入库;2委托加工;3返修品
	 */
	private String materialstate;
	
	
	/**
	 *申请时间
	 */
	private String applyDate;
	/**
	 *申请部门ID
	 */
	private String applyDeptId;
	/**
	 *申请人
	 */
	private String applyer;
	/**
	 *申请单状态：0未提交，1已提交，2已通过
	 */
	private String applyeStatus;
	/**
	 * 主键
	 */
	private String applyInId;
	/**
	 *申请单编号
	 */
	private String applyNo;
	/**
	 *申请数量
	 */
	private String applyNum;
	/**
	 *目的库房
	 */
	private String applyStorage;
	private String arrivalCheckId;
	private String price;// 入场价格
	private String fileId;// 质量意见书文件Id
	private String fileName;// 质量意见书文件名称
	/**
	 *备注
	 * */
	private String remark;
	/**
	 *取样
	 * */
	private String sampling;
	/**
	 *送样
	 * */
	private String sendSampling;

	/**
	 *委托试验
	 * */
	private String test;
	/**
	 * 探伤
	 */
	private String ynFlawDetection;
	/**
	 * 喷盖
	 */
	private String ynSpray;
	/**
	 *计划价
	 */
	private String planPrice;
	/**
	 *检验员工号
	 */
	private String chkUserNo;
	/**
	 *特殊数量
	 */
	private String ea;
	/**
	 *凭证号
	 */
	private String certificateNo;
	/**
	 *质量编号
	 */
	private String qualityCode;
	/**
	 *起始架次
	 */
	private String startJc;
	/**
	 *终止架次
	 */
	private String endJc;
	
	
	/**
	 * 主键ID
	 */
	private String checkDetailId;

	/**
	 *检验状态：0已登记；1已理化；2已检测；3已质量处理
	 * */
	private String checkStatus;
	/**
	 * 检验类型：0理化委托；1检测报告；2质量意见；3退货
	 */
	private String checkType;

	/**
	 * 合同编号
	 */
	private String contractCode;

	/**
	 * 合同id
	 */
	private String contractId;

	/**
	 * 合同名称
	 */
	private String contractName;

	private String demension;// 单位

	private String departmentCode;

	private String departmentId;

	private String departmentName;

	private String desingnation;// 牌号

	private String endDate;// 结束时间

	private String inDate;// 入库日期

	private String inNo;// 入库数量

	private String inNum;// 入库数量

	private String invoiceNo;// 发票号码

	private String invoiceNum;// 发票数量

	private String itemCode;

	/**
	 * 物料ID
	 */
	private String itemId;

	/**
	 * 物料名称
	 */
	private String itemName;
	private int limit;

	/**
	 * 批次号
	 */
	private String lotNo;

	private String lupiNo;// 炉批号

	private String materialstandard;// 规格

	/**
	 * 评语
	 */
	private String objectComment;
	/**
	 * 对象名称
	 */
	private String objectName;
	/**
	 * 对象编号
	 */
	private String objectNo;
	/**
	 * 结论
	 */
	private String objectResult;
	private String phone;
	private String quyang;// 取样

	/**
	 *登记表ID
	 * */
	private String registrationId;
	/**
	 *登记编号
	 * */
	private String registrationcode;
	
	private int start;
	private String startDate;// 开始时间

	private String techniccondition;// 技术条件

	/**
	 * 运输日期
	 */
	private String transportDate;
	/**
	 * 运单号
	 */
	private String transportNo;
	/**
	 * 运输数量
	 */
	private String transportNum;
	private String vendorName;
	/**
	 *是否已经表面检查
	 * */
	private String ynCheck;
	/**
	 *是否已经清洗喷盖
	 * */
	private String ynClean;
	/**
	 *是否已经油封
	 * */
	private String ynSeal;
	/**
	 *是否已经分光探伤
	 * */
	private String ynSpectro;
	/**
	 *是否已经打钢印
	 * */
	private String ynStamped;
	
	/**
	 * 登记确认:1已登记;2退货;
	 */
	private String ynRegistration;
	private String ynRegistrationDate;
	private String ynRegistrationCreator;
	
	/**
	 * 说明
	 */
	private String explain;
	
	/**
	 * 物资交货状态
	 */
	private String deliveryStatus;
	
	private String checkResult;
	
	public String getCheckResult() {
		return checkResult;
	}

	public void setCheckResult(String checkResult) {
		this.checkResult = checkResult;
	}

	private String outcheckDate;
	private String outcheckCreator;
	private String pleasecheckDate;
	private String pleasecheckCreator;
	private String onecheckDate;
	private String onecheckCreator;
	private String samplingDate;
	private String samplingCreator;
	private String testDate;
	private String testCreator;
	private String sendsamplingDate;
	private String sendsamplingCreator;
	private String testreportDate;
	private String testreportCreator;
	private String ynStampedDate;
	private String ynStampedCreator;
	private String ynSpectroDate;
	private String ynSpectroCreator;
	private String ynsparkDate;
	private String ynsparkCreator;
	private String ynCheckDate;
	private String ynCheckCreator;
	private String spraywordDate;
	private String spraywordCreator;
	private String ynSealDate;
	private String ynSealCreator;
	private String failurehandlingDate;
	private String failurehandlingCreator;
	

	private String createdate;
	private String furnacebatch;
	private String createname;
	
	
	


	public String getCreatename() {
		return createname;
	}

	public void setCreatename(String createname) {
		this.createname = createname;
	}

	public String getFurnacebatch() {
		return furnacebatch;
	}

	public void setFurnacebatch(String furnacebatch) {
		this.furnacebatch = furnacebatch;
	}

	public String getCreatedate() {
		return createdate;
	}

	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}

	public String getOutCheck() {
		return outCheck;
	}

	public void setOutCheck(String outCheck) {
		this.outCheck = outCheck;
	}

	public String getPleaseCheck() {
		return pleaseCheck;
	}

	public void setPleaseCheck(String pleaseCheck) {
		this.pleaseCheck = pleaseCheck;
	}

	public String getOneCheck() {
		return oneCheck;
	}

	public void setOneCheck(String oneCheck) {
		this.oneCheck = oneCheck;
	}

	public String getYnSpark() {
		return ynSpark;
	}

	public void setYnSpark(String ynSpark) {
		this.ynSpark = ynSpark;
	}

	public String getSprayWord() {
		return sprayWord;
	}

	public void setSprayWord(String sprayWord) {
		this.sprayWord = sprayWord;
	}

	public String getFailureHandling() {
		return failureHandling;
	}

	public void setFailureHandling(String failureHandling) {
		this.failureHandling = failureHandling;
	}

	public String getRestAssuredNumber() {
		return restAssuredNumber;
	}

	public void setRestAssuredNumber(String restAssuredNumber) {
		this.restAssuredNumber = restAssuredNumber;
	}

	public String getRestAssuredDate() {
		return restAssuredDate;
	}

	public void setRestAssuredDate(String restAssuredDate) {
		this.restAssuredDate = restAssuredDate;
	}

	public String getCheckLife() {
		return checkLife;
	}

	public void setCheckLife(String checkLife) {
		this.checkLife = checkLife;
	}

	public String getCheckLifeDeadLine() {
		return checkLifeDeadLine;
	}

	public void setCheckLifeDeadLine(String checkLifeDeadLine) {
		this.checkLifeDeadLine = checkLifeDeadLine;
	}

	public String getGuarantyLife() {
		return guarantyLife;
	}

	public void setGuarantyLife(String guarantyLife) {
		this.guarantyLife = guarantyLife;
	}

	public String getGuarantyLifeDeadLine() {
		return guarantyLifeDeadLine;
	}

	public void setGuarantyLifeDeadLine(String guarantyLifeDeadLine) {
		this.guarantyLifeDeadLine = guarantyLifeDeadLine;
	}

	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
	}

	public String getInFactoryData() {
		return inFactoryData;
	}

	public void setInFactoryData(String inFactoryData) {
		this.inFactoryData = inFactoryData;
	}

	public String getItemPurpose() {
		return itemPurpose;
	}

	public void setItemPurpose(String itemPurpose) {
		this.itemPurpose = itemPurpose;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getOilLife() {
		return oilLife;
	}

	public void setOilLife(String oilLife) {
		this.oilLife = oilLife;
	}

	public String getOilLifeDeadLine() {
		return oilLifeDeadLine;
	}

	public void setOilLifeDeadLine(String oilLifeDeadLine) {
		this.oilLifeDeadLine = oilLifeDeadLine;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getOutFactoryData() {
		return outFactoryData;
	}

	public void setOutFactoryData(String outFactoryData) {
		this.outFactoryData = outFactoryData;
	}

	public String getPotLife() {
		return potLife;
	}

	public void setPotLife(String potLife) {
		this.potLife = potLife;
	}

	public String getPotLifeDeadLine() {
		return potLifeDeadLine;
	}

	public void setPotLifeDeadLine(String potLifeDeadLine) {
		this.potLifeDeadLine = potLifeDeadLine;
	}

	public String getSupplyCertifica() {
		return supplyCertifica;
	}

	public void setSupplyCertifica(String supplyCertifica) {
		this.supplyCertifica = supplyCertifica;
	}

	public String getSupplyRegularNo() {
		return supplyRegularNo;
	}

	public void setSupplyRegularNo(String supplyRegularNo) {
		this.supplyRegularNo = supplyRegularNo;
	}

	public String getUseLife() {
		return useLife;
	}

	public void setUseLife(String useLife) {
		this.useLife = useLife;
	}

	public String getUseLifeDeadLine() {
		return useLifeDeadLine;
	}

	public void setUseLifeDeadLine(String useLifeDeadLine) {
		this.useLifeDeadLine = useLifeDeadLine;
	}

	public String getVendorCode() {
		return vendorCode;
	}

	public void setVendorCode(String vendorCode) {
		this.vendorCode = vendorCode;
	}

	private String itemBillId;

	public String getItemBillId() {
		return itemBillId;
	}

	public void setItemBillId(String itemBillId) {
		this.itemBillId = itemBillId;
	}

	

	public String getChkUserNo() {
		return chkUserNo;
	}

	public void setChkUserNo(String chkUserNo) {
		this.chkUserNo = chkUserNo;
	}

	public String getPlanPrice() {
		return planPrice;
	}

	public void setPlanPrice(String planPrice) {
		this.planPrice = planPrice;
	}

	public String getEa() {
		return ea;
	}

	public void setEa(String ea) {
		this.ea = ea;
	}

	public String getCertificateNo() {
		return certificateNo;
	}

	public void setCertificateNo(String certificateNo) {
		this.certificateNo = certificateNo;
	}

	public String getQualityCode() {
		return qualityCode;
	}

	public void setQualityCode(String qualityCode) {
		this.qualityCode = qualityCode;
	}

	public String getStartJc() {
		return startJc;
	}

	public void setStartJc(String startJc) {
		this.startJc = startJc;
	}

	public String getEndJc() {
		return endJc;
	}

	public void setEndJc(String endJc) {
		this.endJc = endJc;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getSampling() {
		return sampling;
	}

	public void setSampling(String sampling) {
		this.sampling = sampling;
	}

	public String getSendSampling() {
		return sendSampling;
	}

	public void setSendSampling(String sendSampling) {
		this.sendSampling = sendSampling;
	}

	public String getTest() {
		return test;
	}

	public void setTest(String test) {
		this.test = test;
	}

	public String getYnFlawDetection() {
		return ynFlawDetection;
	}

	public void setYnFlawDetection(String ynFlawDetection) {
		this.ynFlawDetection = ynFlawDetection;
	}

	public String getYnSpray() {
		return ynSpray;
	}

	public void setYnSpray(String ynSpray) {
		this.ynSpray = ynSpray;
	}

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	private String arrivalDate;// 到货日期
	private String arrivalNum;// 到货数量

	public String getArrivalNum() {
		return arrivalNum;
	}

	public void setArrivalNum(String arrivalNum) {
		this.arrivalNum = arrivalNum;
	}

	

	public String getApplyDate() {
		return applyDate;
	}

	public String getApplyDeptId() {
		return applyDeptId;
	}

	public String getApplyer() {
		return applyer;
	}

	public String getApplyeStatus() {
		return applyeStatus;
	}

	public String getApplyInId() {
		return applyInId;
	}

	public String getApplyNo() {
		return applyNo;
	}

	public String getApplyNum() {
		return applyNum;
	}

	public String getApplyStorage() {
		return applyStorage;
	}

	public String getArrivalCheckId() {
		return arrivalCheckId;
	}

	public String getArrivalDate() {
		return arrivalDate;
	}

	public String getCheckDetailId() {
		return checkDetailId;
	}

	public String getCheckStatus() {
		return checkStatus;
	}

	public String getCheckType() {
		return checkType;
	}

	public String getContractCode() {
		return contractCode;
	}

	public String getContractId() {
		return contractId;
	}

	public String getContractName() {
		return contractName;
	}

	public String getDemension() {
		return demension;
	}

	public String getDepartmentCode() {
		return departmentCode;
	}

	public String getDepartmentId() {
		return departmentId;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public String getDesingnation() {
		return desingnation;
	}

	public String getEndDate() {
		return endDate;
	}

	public String getInDate() {
		return inDate;
	}

	public String getInNo() {
		return inNo;
	}

	public String getInNum() {
		return inNum;
	}

	public String getInvoiceNo() {
		return invoiceNo;
	}

	public String getInvoiceNum() {
		return invoiceNum;
	}

	public String getItemCode() {
		return itemCode;
	}

	public String getItemId() {
		return itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public int getLimit() {
		return limit;
	}

	public String getLotNo() {
		return lotNo;
	}

	public String getLupiNo() {
		return lupiNo;
	}

	public String getMaterialstandard() {
		return materialstandard;
	}

	public String getObjectComment() {
		return objectComment;
	}

	public String getObjectName() {
		return objectName;
	}

	public String getObjectNo() {
		return objectNo;
	}

	public String getObjectResult() {
		return objectResult;
	}

	public String getPhone() {
		return phone;
	}

	public String getQuyang() {
		return quyang;
	}

	public String getRegistrationId() {
		return registrationId;
	}

	public int getStart() {
		return start;
	}

	public String getStartDate() {
		return startDate;
	}

	public String getTechniccondition() {
		return techniccondition;
	}

	public String getTransportDate() {
		return transportDate;
	}

	public String getTransportNo() {
		return transportNo;
	}

	public String getTransportNum() {
		return transportNum;
	}

	public String getVendorName() {
		return vendorName;
	}

	public String getYnCheck() {
		return ynCheck;
	}

	public String getYnClean() {
		return ynClean;
	}

	public String getYnSeal() {
		return ynSeal;
	}

	public String getYnSpectro() {
		return ynSpectro;
	}

	public String getYnStamped() {
		return ynStamped;
	}

	public void setApplyDate(String applyDate) {
		this.applyDate = applyDate;
	}

	public void setApplyDeptId(String applyDeptId) {
		this.applyDeptId = applyDeptId;
	}

	public void setApplyer(String applyer) {
		this.applyer = applyer;
	}

	public void setApplyeStatus(String applyeStatus) {
		this.applyeStatus = applyeStatus;
	}

	public void setApplyInId(String applyInId) {
		this.applyInId = applyInId;
	}

	public void setApplyNo(String applyNo) {
		this.applyNo = applyNo;
	}

	public void setApplyNum(String applyNum) {
		this.applyNum = applyNum;
	}

	public void setApplyStorage(String applyStorage) {
		this.applyStorage = applyStorage;
	}

	public void setArrivalCheckId(String arrivalCheckId) {
		this.arrivalCheckId = arrivalCheckId;
	}

	public void setArrivalDate(String arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

	public void setCheckDetailId(String checkDetailId) {
		this.checkDetailId = checkDetailId;
	}

	public void setCheckStatus(String checkStatus) {
		this.checkStatus = checkStatus;
	}

	public void setCheckType(String checkType) {
		this.checkType = checkType;
	}

	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}

	public void setContractId(String contractId) {
		this.contractId = contractId;
	}

	public void setContractName(String contractName) {
		this.contractName = contractName;
	}

	public void setDemension(String demension) {
		this.demension = demension;
	}

	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public void setDesingnation(String desingnation) {
		this.desingnation = desingnation;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public void setInDate(String inDate) {
		this.inDate = inDate;
	}

	public void setInNo(String inNo) {
		this.inNo = inNo;
	}

	public void setInNum(String inNum) {
		this.inNum = inNum;
	}

	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	public void setInvoiceNum(String invoiceNum) {
		this.invoiceNum = invoiceNum;
	}

	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}

	public void setLupiNo(String lupiNo) {
		this.lupiNo = lupiNo;
	}

	public void setMaterialstandard(String materialstandard) {
		this.materialstandard = materialstandard;
	}

	public void setObjectComment(String objectComment) {
		this.objectComment = objectComment;
	}

	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}

	public void setObjectNo(String objectNo) {
		this.objectNo = objectNo;
	}

	public void setObjectResult(String objectResult) {
		this.objectResult = objectResult;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public void setQuyang(String quyang) {
		this.quyang = quyang;
	}

	public void setRegistrationId(String registrationId) {
		this.registrationId = registrationId;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public void setTechniccondition(String techniccondition) {
		this.techniccondition = techniccondition;
	}

	public void setTransportDate(String transportDate) {
		this.transportDate = transportDate;
	}

	public void setTransportNo(String transportNo) {
		this.transportNo = transportNo;
	}

	public void setTransportNum(String transportNum) {
		this.transportNum = transportNum;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public void setYnCheck(String ynCheck) {
		this.ynCheck = ynCheck;
	}

	public void setYnClean(String ynClean) {
		this.ynClean = ynClean;
	}

	public void setYnSeal(String ynSeal) {
		this.ynSeal = ynSeal;
	}

	public void setYnSpectro(String ynSpectro) {
		this.ynSpectro = ynSpectro;
	}

	public void setYnStamped(String ynStamped) {
		this.ynStamped = ynStamped;
	}

	public String getMaterialstate() {
		return materialstate;
	}

	public void setMaterialstate(String materialstate) {
		this.materialstate = materialstate;
	}

	public String getOutcheckDate() {
		return outcheckDate;
	}

	public void setOutcheckDate(String outcheckDate) {
		this.outcheckDate = outcheckDate;
	}

	public String getOutcheckCreator() {
		return outcheckCreator;
	}

	public void setOutcheckCreator(String outcheckCreator) {
		this.outcheckCreator = outcheckCreator;
	}

	public String getPleasecheckDate() {
		return pleasecheckDate;
	}

	public void setPleasecheckDate(String pleasecheckDate) {
		this.pleasecheckDate = pleasecheckDate;
	}

	public String getPleasecheckCreator() {
		return pleasecheckCreator;
	}

	public void setPleasecheckCreator(String pleasecheckCreator) {
		this.pleasecheckCreator = pleasecheckCreator;
	}

	public String getOnecheckDate() {
		return onecheckDate;
	}

	public void setOnecheckDate(String onecheckDate) {
		this.onecheckDate = onecheckDate;
	}

	public String getOnecheckCreator() {
		return onecheckCreator;
	}

	public void setOnecheckCreator(String onecheckCreator) {
		this.onecheckCreator = onecheckCreator;
	}

	public String getSamplingDate() {
		return samplingDate;
	}

	public void setSamplingDate(String samplingDate) {
		this.samplingDate = samplingDate;
	}

	public String getSamplingCreator() {
		return samplingCreator;
	}

	public void setSamplingCreator(String samplingCreator) {
		this.samplingCreator = samplingCreator;
	}

	public String getTestDate() {
		return testDate;
	}

	public void setTestDate(String testDate) {
		this.testDate = testDate;
	}

	public String getTestCreator() {
		return testCreator;
	}

	public void setTestCreator(String testCreator) {
		this.testCreator = testCreator;
	}

	public String getSendsamplingDate() {
		return sendsamplingDate;
	}

	public void setSendsamplingDate(String sendsamplingDate) {
		this.sendsamplingDate = sendsamplingDate;
	}

	public String getSendsamplingCreator() {
		return sendsamplingCreator;
	}

	public void setSendsamplingCreator(String sendsamplingCreator) {
		this.sendsamplingCreator = sendsamplingCreator;
	}

	public String getTestreportDate() {
		return testreportDate;
	}

	public void setTestreportDate(String testreportDate) {
		this.testreportDate = testreportDate;
	}

	public String getTestreportCreator() {
		return testreportCreator;
	}

	public void setTestreportCreator(String testreportCreator) {
		this.testreportCreator = testreportCreator;
	}

	public String getYnStampedDate() {
		return ynStampedDate;
	}

	public void setYnStampedDate(String ynStampedDate) {
		this.ynStampedDate = ynStampedDate;
	}

	public String getYnStampedCreator() {
		return ynStampedCreator;
	}

	public void setYnStampedCreator(String ynStampedCreator) {
		this.ynStampedCreator = ynStampedCreator;
	}

	public String getYnSpectroDate() {
		return ynSpectroDate;
	}

	public void setYnSpectroDate(String ynSpectroDate) {
		this.ynSpectroDate = ynSpectroDate;
	}

	public String getYnSpectroCreator() {
		return ynSpectroCreator;
	}

	public void setYnSpectroCreator(String ynSpectroCreator) {
		this.ynSpectroCreator = ynSpectroCreator;
	}

	public String getYnsparkDate() {
		return ynsparkDate;
	}

	public void setYnsparkDate(String ynsparkDate) {
		this.ynsparkDate = ynsparkDate;
	}

	public String getYnsparkCreator() {
		return ynsparkCreator;
	}

	public void setYnsparkCreator(String ynsparkCreator) {
		this.ynsparkCreator = ynsparkCreator;
	}

	public String getYnCheckDate() {
		return ynCheckDate;
	}

	public void setYnCheckDate(String ynCheckDate) {
		this.ynCheckDate = ynCheckDate;
	}

	public String getYnCheckCreator() {
		return ynCheckCreator;
	}

	public void setYnCheckCreator(String ynCheckCreator) {
		this.ynCheckCreator = ynCheckCreator;
	}

	public String getSpraywordDate() {
		return spraywordDate;
	}

	public void setSpraywordDate(String spraywordDate) {
		this.spraywordDate = spraywordDate;
	}

	public String getSpraywordCreator() {
		return spraywordCreator;
	}

	public void setSpraywordCreator(String spraywordCreator) {
		this.spraywordCreator = spraywordCreator;
	}

	public String getYnSealDate() {
		return ynSealDate;
	}

	public void setYnSealDate(String ynSealDate) {
		this.ynSealDate = ynSealDate;
	}

	public String getYnSealCreator() {
		return ynSealCreator;
	}

	public void setYnSealCreator(String ynSealCreator) {
		this.ynSealCreator = ynSealCreator;
	}

	public String getFailurehandlingDate() {
		return failurehandlingDate;
	}

	public void setFailurehandlingDate(String failurehandlingDate) {
		this.failurehandlingDate = failurehandlingDate;
	}

	public String getFailurehandlingCreator() {
		return failurehandlingCreator;
	}

	public void setFailurehandlingCreator(String failurehandlingCreator) {
		this.failurehandlingCreator = failurehandlingCreator;
	}

	public String getYnRegistration() {
		return ynRegistration;
	}

	public void setYnRegistration(String ynRegistration) {
		this.ynRegistration = ynRegistration;
	}

	public String getYnRegistrationDate() {
		return ynRegistrationDate;
	}

	public void setYnRegistrationDate(String ynRegistrationDate) {
		this.ynRegistrationDate = ynRegistrationDate;
	}

	public String getYnRegistrationCreator() {
		return ynRegistrationCreator;
	}

	public void setYnRegistrationCreator(String ynRegistrationCreator) {
		this.ynRegistrationCreator = ynRegistrationCreator;
	}

	public String getExplain() {
		return explain;
	}

	public void setExplain(String explain) {
		this.explain = explain;
	}

	public String getDeliveryStatus() {
		return deliveryStatus;
	}

	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}

	public String getRegistrationcode() {
		return registrationcode;
	}

	public void setRegistrationcode(String registrationcode) {
		this.registrationcode = registrationcode;
	}
	
	
	
	
	
}
