package com.sysware.customize.hd.investment.procurementExecute.registration;

/**
 * 入库登记
 * 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-21
 * 
 */
public class RegistrationVo {
	private String actualNumber;
	 
	/**
	 * 付款金额
	 */
	private String amount;
	/**
	 * 主键ID
	 */
	private String arrivalCheckId;

	/**
	 * 到货日期
	 */
	private String arrivalDate;

	/**
	 * 到货数量
	 */
	private String arrivalNum;

	/**
	 *检验状态：0已登记；1已理化；2已检测；3已质量处理
	 * */
	private String checkStatus;

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

	/**
	 * 提交日期
	 */
	private String createDate;

	/**
	 * 登记人
	 */
	private String createrId;

	/**
	 * 登记人
	 */
	private String createrName;

	private String demension;// 量纲

	private String desingnation;// 物料牌号

	/**
	 * 硬度：0不需要测硬度，1需要测硬度
	 */
	private String hardness;

	/**
	 * 发票号码
	 */
	private String invoiceNo;

	private String itemCode;
	/**
	 * 物料ID
	 */
	private String itemId;
	/**
	 * 物料编码
	 */
	private String materialitemcode;
	/**
	 * 物料名称
	 */
	private String itemName;
	
	private String materialItemName;//查找物料编码时使用
	
	/**
	 * 物质种类小类
	 */
	private String materialtypename;
	
	/**
	 * 物质种类大类
	 */
	private String materialtypename_parent;
	
	private int start;
	private int limit;
	private Integer count;
	
	/**
	 * 批次号
	 */
	private String lotNo;
	/**
	 * 炉批号
	 */
	private String furnaceBatch;
	/**
	 * 检验类别
	 * @return
	 */
	private String materialType;
	/**
	 * 检测报告
	 */
	private String testReport;
	/**
	 * 理化委托
	 */
	private String physicalCommissioned;
	/**
	 * 意见书
	 */
	private String submissions;
	/**
	 * 
	 * 是否入厂检验
	 */
	private String check_result;
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
	 * 登记人部门
	 */
	private String creatorDepartment;
	
	/**
	 * 登记开始时间
	 */
	private String createDateStart;
	
	/**
	 * 登记结束时间
	 */
	private String createDateEnd;
	
	/**
	 * 到货开始时间
	 */
	private String arrivalDateStart;
	
	/**
	 * 到货结束时间
	 */
	private String arrivalDateEnd;
	
	/**
	 * 物资交货状态
	 */
	private String deliveryStatus;
	
	private String orderFlag;//排序方式
	/**
	 * 入库编号
	 */
	private String applyNo;
	
	public String getOrderFlag() {
		return orderFlag;
	}
	public void setOrderFlag(String orderFlag) {
		this.orderFlag = orderFlag;
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
	public String getCheck_result() {
		return check_result;
	}
	public void setCheck_result(String checkResult) {
		check_result = checkResult;
	}
	public String getSubmissions() {
		return submissions;
	}
	public void setSubmissions(String submissions) {
		this.submissions = submissions;
	}
	public String getMaterialType() {
		return materialType;
	}
	public String getTestReport() {
		return testReport;
	}
	public void setTestReport(String testReport) {
		this.testReport = testReport;
	}
	public String getPhysicalCommissioned() {
		return physicalCommissioned;
	}
	public void setPhysicalCommissioned(String physicalCommissioned) {
		this.physicalCommissioned = physicalCommissioned;
	}
	public void setMaterialType(String materialType) {
		this.materialType = materialType;
	}
	public String getFurnaceBatch() {
		return furnaceBatch;
	}
	public void setFurnaceBatch(String furnaceBatch) {
		this.furnaceBatch = furnaceBatch;
	}

	private String materialStandard;// 物料规格
	/**
	 * 测量：0未测量，1已测量
	 */
	private String measurement;
	/**
	 * 拉力：0不需要侧拉力，1需要侧拉力
	 */
	private String pulling;

	/**
	 * 采购数量
	 */
	private String purchaseNum;
	/**
	 * 运合格证
	 */
	private String qualifyNo;
	/**
	 * 登记号
	 */
	private String registrationCode;

	/**
	 * 主键id
	 */
	private String registrationId;
	/**
	 * 主键
	 */
	private String routeId;

	/**
	 * 路线卡名称
	 */
	private String routeName;

	/**
	 * 路线卡编号
	 */
	private String routeNo;

	

	private String technicCondition;// 技术条件

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

	private String ynCheck;
	/**
	 *是否已经清洗
	 * */
	private String ynClean;

	/**
	 *是否已经油封
	 * */
	private String ynSeal;

	/**
	 *是否已经分光
	 * */
	private String ynSpectro;

	/**
	 *是否已经打钢印
	 * */
	private String ynStamped;
	/**
	 * 主键ID
	 */
    private String checkDetailId; 
	/**
	 *备注
	 * */
	private String  remark;
	/**
	 *取样
	 * */
	private String sampling;
	/**
	 * 合同数量
	 */
	private String qualifiedNum;
	/**
	 * 供应商名称
	 */
	private String vendorName;
	/**
	 * 备注
	 */
	private String note;
	private String vendorCode;//供应商编号
	private String vendName;//供应商名称
	/**
	 * 物资种类
	 */
	private String materialCalotlogName;
	public String getMaterialCalotlogName() {
		return materialCalotlogName;
	}
	public void setMaterialCalotlogName(String materialCalotlogName) {
		this.materialCalotlogName = materialCalotlogName;
	}
	public String getVendorCode() {
		return vendorCode;
	}
	public void setVendorCode(String vendorCode) {
		this.vendorCode = vendorCode;
	}
	public String getVendName() {
		return vendName;
	}
	public void setVendName(String vendName) {
		this.vendName = vendName;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getQualifiedNum() {
		return qualifiedNum;
	}
	public void setQualifiedNum(String qualifiedNum) {
		this.qualifiedNum = qualifiedNum;
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

	/**
	 *送样
	 * */
	private String  sendSampling;

	/**
	 *委托试验
	 * */
	private String  test;
	/**
	 * 探伤
	 */
	private String  ynFlawDetection; 
	/**
	 * 喷盖
	 */
	private String  ynSpray ;
    public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}

	private String price;
    public String getCheckDetailId() {
		return checkDetailId;
	}
	public void setCheckDetailId(String checkDetailId) {
		this.checkDetailId = checkDetailId;
	}
	public String getCheckType() {
		return checkType;
	}
	public void setCheckType(String checkType) {
		this.checkType = checkType;
	}
	public String getObjectNo() {
		return objectNo;
	}
	public void setObjectNo(String objectNo) {
		this.objectNo = objectNo;
	}
	public String getObjectName() {
		return objectName;
	}
	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}
	public String getObjectComment() {
		return objectComment;
	}
	public void setObjectComment(String objectComment) {
		this.objectComment = objectComment;
	}
	public String getObjectResult() {
		return objectResult;
	}
	public void setObjectResult(String objectResult) {
		this.objectResult = objectResult;
	}

	/**
	 * 检验类型：0理化委托；1检测报告；2质量意见；3退货
	 */
    private String checkType;
    /**
	 * 对象编号
	 */
    private String objectNo;
    /**
	 * 对象名称
	 */
    private String objectName;
    /**
	 * 评语
	 */
    private String objectComment;
    /**
	 * 结论
	 */
    private String objectResult;
	public String getActualNumber() {
		return actualNumber;
	}
	public String getAmount() {
		return amount;
	} 
	public String getArrivalCheckId() {
		return arrivalCheckId;
	}

	public String getArrivalDate() {
		return arrivalDate;
	}

	public String getArrivalNum() {
		return arrivalNum;
	}

	public String getCheckStatus() {
		return checkStatus;
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

	public String getCreateDate() {
		return createDate;
	}

	public String getCreaterId() {
		return createrId;
	}

	public String getCreaterName() {
		return createrName;
	}

	public String getDemension() {
		return demension;
	}

	public String getDesingnation() {
		return desingnation;
	}

	public String getHardness() {
		return hardness;
	}
	public String getInvoiceNo() {
		return invoiceNo;
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

	public String getMaterialStandard() {
		return materialStandard;
	}

	public String getMeasurement() {
		return measurement;
	}

	public String getPulling() {
		return pulling;
	}

	public String getPurchaseNum() {
		return purchaseNum;
	}

	public String getQualifyNo() {
		return qualifyNo;
	}

	public String getRegistrationCode() {
		return registrationCode;
	}

	public String getRegistrationId() {
		return registrationId;
	}

	public String getRouteId() {
		return routeId;
	}

	public String getRouteName() {
		return routeName;
	}
	public String getRouteNo() {
		return routeNo;
	}

	public int getStart() {
		return start;
	}

	public String getTechnicCondition() {
		return technicCondition;
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

	public void setActualNumber(String actualNumber) {
		this.actualNumber = actualNumber;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public void setArrivalCheckId(String arrivalCheckId) {
		this.arrivalCheckId = arrivalCheckId;
	}

	public void setArrivalDate(String arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

	public void setArrivalNum(String arrivalNum) {
		this.arrivalNum = arrivalNum;
	}

	public void setCheckStatus(String checkStatus) {
		this.checkStatus = checkStatus;
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

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public void setCreaterId(String createrId) {
		this.createrId = createrId;
	}

	public void setCreaterName(String createrName) {
		this.createrName = createrName;
	}

	public void setDemension(String demension) {
		this.demension = demension;
	}

	public void setDesingnation(String desingnation) {
		this.desingnation = desingnation;
	}

	public void setHardness(String hardness) {
		this.hardness = hardness;
	}

	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
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

	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}

	public void setMeasurement(String measurement) {
		this.measurement = measurement;
	}

	public void setPulling(String pulling) {
		this.pulling = pulling;
	}

	public void setPurchaseNum(String purchaseNum) {
		this.purchaseNum = purchaseNum;
	}

	public void setQualifyNo(String qualifyNo) {
		this.qualifyNo = qualifyNo;
	}

	public void setRegistrationCode(String registrationCode) {
		this.registrationCode = registrationCode;
	}

	public void setRegistrationId(String registrationId) {
		this.registrationId = registrationId;
	}

	public void setRouteId(String routeId) {
		this.routeId = routeId;
	}

	public void setRouteName(String routeName) {
		this.routeName = routeName;
	}

	public void setRouteNo(String routeNo) {
		this.routeNo = routeNo;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public void setTechnicCondition(String technicCondition) {
		this.technicCondition = technicCondition;
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
	public String getMaterialtypename() {
		return materialtypename;
	}
	public void setMaterialtypename(String materialtypename) {
		this.materialtypename = materialtypename;
	}
	public String getMaterialtypename_parent() {
		return materialtypename_parent;
	}
	public void setMaterialtypename_parent(String materialtypenameParent) {
		materialtypename_parent = materialtypenameParent;
	}
	public String getMaterialstate() {
		return materialstate;
	}
	public void setMaterialstate(String materialstate) {
		this.materialstate = materialstate;
	}
	public String getCreatorDepartment() {
		return creatorDepartment;
	}
	public void setCreatorDepartment(String creatorDepartment) {
		this.creatorDepartment = creatorDepartment;
	}
	public String getCreateDateStart() {
		return createDateStart;
	}
	public void setCreateDateStart(String createDateStart) {
		this.createDateStart = createDateStart;
	}
	public String getCreateDateEnd() {
		return createDateEnd;
	}
	public void setCreateDateEnd(String createDateEnd) {
		this.createDateEnd = createDateEnd;
	}
	public String getArrivalDateStart() {
		return arrivalDateStart;
	}
	public void setArrivalDateStart(String arrivalDateStart) {
		this.arrivalDateStart = arrivalDateStart;
	}
	public String getArrivalDateEnd() {
		return arrivalDateEnd;
	}
	public void setArrivalDateEnd(String arrivalDateEnd) {
		this.arrivalDateEnd = arrivalDateEnd;
	}
	public String getDeliveryStatus() {
		return deliveryStatus;
	}
	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public String getMaterialitemcode() {
		return materialitemcode;
	}
	public void setMaterialitemcode(String materialitemcode) {
		this.materialitemcode = materialitemcode;
	}
	public String getMaterialItemName() {
		return materialItemName;
	}
	public void setMaterialItemName(String materialItemName) {
		this.materialItemName = materialItemName;
	}
	public String getApplyNo() {
		return applyNo;
	}
	public void setApplyNo(String applyNo) {
		this.applyNo = applyNo;
	}
	
	
	
}
