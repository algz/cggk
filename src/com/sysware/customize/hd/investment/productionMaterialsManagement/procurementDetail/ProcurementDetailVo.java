package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail;




public class ProcurementDetailVo {

	private String JX;
	private String QSJH;
    private String ZZJH;
    private String CLDM;
	
	private String procurementDetailId;// 需求明细ID

	private String buinessPlanDetailsId;// 年度计划明细ID

	private String declare_detil_id;//申报明细ID,年度计划明细ID(经营计划)与申报明细ID(零星采购计划)互斥唯一.
	
	private String department;//需求单位
	
	private String materialQuotaId;// 材料定额ID

	private String materialTypeName;// 材料类型名称
	private String materialCatLogId;//物料种类id

	private String vendorId;// 供应商ID

	private double materialCounts;// 材料需用总量
	
	private String purchaseId;// 采购清单ID

	private double jan;// 一月需求数量

	private double feb;// 二月需求数量

	private double mar;// 三月需求数量

	private double apr;// 四月需求数量

	private double may;// 五月需求数量

	private double june;// 六月需求数量

	private double july;// 七月需求数量

	private double aug;// 八月需求数量

	private double sept;// 九月需求数量

	private double oct;// 十月需求数量

	private double nov;// 十一月需求数量

	private double dect;// 十二月需求数量
	
	private double other;//其它月份需求数量
	
	private String materialId;// 物料ID
	private String materialCode;//物资编码

	private String price;// 单价
	
	private String deliveryDate;// 交货日期

	private String materialItemName;// 物料名称

	private String technicCondition;// 技术条件

	private String materialStandard;// 物料规格
	
	private String desingnation;// 物料牌号

	private String demension;// 单位

	private String productCode;// 产品代号

	private String procurementId;// 需求大纲ID

	private double totalRequired;// 需求总量

	private double materialCount;// 物料使用数量

	private String remark;// 材料定额备注
	
	private String backNumber;// 返修品
	
	private String onNumber;// 欠交合同
	
	private String storeNumber;// 库存
	
	private String needNumber;// 需定量
	
	private String actualNumber;//实际采购量
	
	private String noCheck; //无待检
	
	private String noExpend; //无预计消耗
	
	private String operable; //有无合用
	
	private String provideNumber;//累计发放数量
    
	private String provideId;//发放信息表主键
	private String batchNo;//批次号 
	private String note;//备注
	private String subtotal;//小计
	
	
	private String last_year_consume;//上年消耗
	private String half_year_consume;//下半年消耗
	private String year_inventory;//年末库存
	private String  gap_number;//下半年缺口数
	 
	private String contract;//合同
	private String number_applications;//申请数量
	private String amount_applications;//申请金额
	private String subtotal_number;//小计数据
	private String subtotal_amount;//小计金额
	private String super_storage;//超储
	private String redeployment;//外调
	private String reserve;//储备量
	
	private int start;// 分页开始
	private int limit;// 分页条数
	private int count;// 记录总数
	private String nodeId;// 被选定的结点ID
	private String nodeType;// 被选定的结点类型
	private String updateRecords;// 待更新的表格数据
	private String purchaseType;// 采购方式：1.比价；2.招标；3.直接采购 4 协议采购，5其它采购
	private String purchaseTypeName;
	private String vendorName;// 供应商名称
	private String contractId;// 合同ID
	private String pieceType;//采购清单下拉专用。
	private String type;// 采购需求类型：1年度需求, 2 零星需求
	private String requestCode;//需求编号
	private String deliveryCount;//交付数量
	 
    private String materialBuyType;//物资的购买明细
	
    private String planType;//年度计划类型:1预拨计划;2调整计划;3临批计划
    
    private String isAuthorityControl;//是否权限控制:1或空控制;2不控制
	private String materialitemname;//物资名称
	private String materialitemcode;//物资编号
	private String taskno;//任务编号
	
	private String oldquantity;
	private String changer;
	private String changtime;
	private String changreson;
	private String status;//生成状态
	private String usedate;//需用时间
	private String out_num;//已发
	private String planActualnumber;//采购计划实际采购量
	
	private String deliveryStatus;//物资交货状态
	private String resolve_number;
	
	public String getResolve_number() {
		return resolve_number;
	}

	public void setResolve_number(String resolveNumber) {
		resolve_number = resolveNumber;
	}

	public String getUsedate() {
		return usedate;
	}

	public void setUsedate(String usedate) {
		this.usedate = usedate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMaterialCode() {
		return materialCode;
	}

	public void setMaterialCode(String materialCode) {
		this.materialCode = materialCode;
	}

    
	public String getJX() {
		return JX;
	}

	public void setJX(String jX) {
		JX = jX;
	}

	public String getQSJH() {
		return QSJH;
	}

	public void setQSJH(String qSJH) {
		QSJH = qSJH;
	}

	public String getZZJH() {
		return ZZJH;
	}

	public void setZZJH(String zZJH) {
		ZZJH = zZJH;
	}

	public String getCLDM() {
		return CLDM;
	}

	public void setCLDM(String cLDM) {
		CLDM = cLDM;
	}

	public String getDeclare_detil_id() {
		return declare_detil_id;
	}

	public void setDeclare_detil_id(String declareDetilId) {
		declare_detil_id = declareDetilId;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getLast_year_consume() {
		return last_year_consume;
	}

	public void setLast_year_consume(String lastYearConsume) {
		last_year_consume = lastYearConsume;
	}

	public String getHalf_year_consume() {
		return half_year_consume;
	}

	public void setHalf_year_consume(String halfYearConsume) {
		half_year_consume = halfYearConsume;
	}

	public String getYear_inventory() {
		return year_inventory;
	}

	public void setYear_inventory(String yearInventory) {
		year_inventory = yearInventory;
	}

	public String getGap_number() {
		return gap_number;
	}

	public void setGap_number(String gapNumber) {
		gap_number = gapNumber;
	}


	
	public String getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(String subtotal) {
		this.subtotal = subtotal;
	}

	public String getContract() {
		return contract;
	}

	public void setContract(String contract) {
		this.contract = contract;
	}

	public String getNumber_applications() {
		return number_applications;
	}

	public void setNumber_applications(String numberApplications) {
		number_applications = numberApplications;
	}

	public String getAmount_applications() {
		return amount_applications;
	}

	public void setAmount_applications(String amountApplications) {
		amount_applications = amountApplications;
	}

	public String getSubtotal_number() {
		return subtotal_number;
	}

	public void setSubtotal_number(String subtotalNumber) {
		subtotal_number = subtotalNumber;
	}

	public String getSubtotal_amount() {
		return subtotal_amount;
	}

	public void setSubtotal_amount(String subtotalAmount) {
		subtotal_amount = subtotalAmount;
	}

	public String getSuper_storage() {
		return super_storage;
	}

	public void setSuper_storage(String superStorage) {
		super_storage = superStorage;
	}

	public String getRedeployment() {
		return redeployment;
	}

	public void setRedeployment(String redeployment) {
		this.redeployment = redeployment;
	}


	
	public String getReserve() {
		return reserve;
	}

	public void setReserve(String reserve) {
		this.reserve = reserve;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getProvideId() {
		return provideId;
	}

	public void setProvideId(String provideId) {
		this.provideId = provideId;
	}

	public String getBatchNo() {
		return batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	public String getProvideDate() {
		return provideDate;
	}

	public void setProvideDate(String provideDate) {
		this.provideDate = provideDate;
	}

	private String provideDate;//发放日期
	public String getProvideNumber() {
		return provideNumber;
	}

	public void setProvideNumber(String provideNumber) {
		this.provideNumber = provideNumber;
	}


	public String getMaterialBuyType() {
		return materialBuyType;
	}

	public void setMaterialBuyType(String materialBuyType) {
		this.materialBuyType = materialBuyType;
	}

	public String getDeliveryCount() {
		return deliveryCount;
	}

	public void setDeliveryCount(String deliveryCount) {
		this.deliveryCount = deliveryCount;
	}

	private int optLock;// 乐观锁
	

	 
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getProcurementDetailId() {
		return procurementDetailId;
	}

	public void setProcurementDetailId(String procurementDetailId) {
		this.procurementDetailId = procurementDetailId;
	}

	public String getBuinessPlanDetailsId() {
		return buinessPlanDetailsId;
	}

	public void setBuinessPlanDetailsId(String buinessPlanDetailsId) {
		this.buinessPlanDetailsId = buinessPlanDetailsId;
	}

	public String getMaterialQuotaId() {
		return materialQuotaId;
	}

	public void setMaterialQuotaId(String materialQuotaId) {
		this.materialQuotaId = materialQuotaId;
	}

	public String getMaterialTypeName() {
		return materialTypeName;
	}

	public void setMaterialTypeName(String materialTypeName) {
		this.materialTypeName = materialTypeName;
	}

	public String getVendorId() {
		return vendorId;
	}

	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}

	public double getMaterialCounts() {
		return materialCounts;
	}

	public void setMaterialCounts(double materialCounts) {
		this.materialCounts = materialCounts;
	}

	public double getJan() {
		return jan;
	}

	public void setJan(double jan) {
		this.jan = jan;
	}

	public double getFeb() {
		return feb;
	}

	public void setFeb(double feb) {
		this.feb = feb;
	}

	public double getMar() {
		return mar;
	}

	public void setMar(double mar) {
		this.mar = mar;
	}

	public double getApr() {
		return apr;
	}

	public void setApr(double apr) {
		this.apr = apr;
	}

	public double getMay() {
		return may;
	}

	public void setMay(double may) {
		this.may = may;
	}

	public double getJune() {
		return june;
	}

	public void setJune(double june) {
		this.june = june;
	}

	public double getJuly() {
		return july;
	}

	public void setJuly(double july) {
		this.july = july;
	}

	public double getAug() {
		return aug;
	}

	public void setAug(double aug) {
		this.aug = aug;
	}

	public double getSept() {
		return sept;
	}

	public void setSept(double sept) {
		this.sept = sept;
	}

	public double getOct() {
		return oct;
	}

	public void setOct(double oct) {
		this.oct = oct;
	}

	public double getNov() {
		return nov;
	}

	public void setNov(double nov) {
		this.nov = nov;
	}

	public double getDect() {
		return dect;
	}

	public void setDect(double dect) {
		this.dect = dect;
	}

	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public String getMaterialItemName() {
		return materialItemName;
	}

	public void setMaterialItemName(String materialItemName) {
		this.materialItemName = materialItemName;
	}

	public String getTechnicCondition() {
		return technicCondition;
	}

	public void setTechnicCondition(String technicCondition) {
		this.technicCondition = technicCondition;
	}

	public String getMaterialStandard() {
		return materialStandard;
	}

	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}

	public String getDemension() {
		return demension;
	}

	public void setDemension(String demension) {
		this.demension = demension;
	}

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public double getTotalRequired() {
		return totalRequired;
	}

	public void setTotalRequired(double totalRequired) {
		this.totalRequired = totalRequired;
	}

	public double getMaterialCount() {
		return materialCount;
	}

	public void setMaterialCount(double materialCount) {
		this.materialCount = materialCount;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public String getProcurementId() {
		return procurementId;
	}

	public void setProcurementId(String procurementId) {
		this.procurementId = procurementId;
	}

	public String getUpdateRecords() {
		return updateRecords;
	}

	public void setUpdateRecords(String updateRecords) {
		this.updateRecords = updateRecords;
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

	public String getPurchaseType() {
		return purchaseType;
	}

	public void setPurchaseType(String purchaseType) {
		this.purchaseType = purchaseType;
	}

	public String getPurchaseTypeName() {
		return purchaseTypeName;
	}

	public void setPurchaseTypeName(String purchaseTypeName) {
		this.purchaseTypeName = purchaseTypeName;
	}

	public String getPurchaseId() {
		return purchaseId;
	}

	public void setPurchaseId(String purchaseId) {
		this.purchaseId = purchaseId;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getContractId() {
		return contractId;
	}

	public void setContractId(String contractId) {
		this.contractId = contractId;
	}

	public String getPieceType() {
		return pieceType;
	}

	public void setPieceType(String pieceType) {
		this.pieceType = pieceType;
	}

	 

	public String getBackNumber() {
		return backNumber;
	}

	public void setBackNumber(String backNumber) {
		this.backNumber = backNumber;
	}

	public String getOnNumber() {
		return onNumber;
	}

	public void setOnNumber(String onNumber) {
		this.onNumber = onNumber;
	}

	public String getStoreNumber() {
		return storeNumber;
	}

	public void setStoreNumber(String storeNumber) {
		this.storeNumber = storeNumber;
	}

	public String getNeedNumber() {
		return needNumber;
	}

	public void setNeedNumber(String needNumber) {
		this.needNumber = needNumber;
	}

	public String getActualNumber() {
		return actualNumber;
	}

	public void setActualNumber(String actualNumber) {
		this.actualNumber = actualNumber;
	}

	public String getNoCheck() {
		return noCheck;
	}

	public void setNoCheck(String noCheck) {
		this.noCheck = noCheck;
	}

	public String getNoExpend() {
		return noExpend;
	}

	public void setNoExpend(String noExpend) {
		this.noExpend = noExpend;
	}

	public String getOperable() {
		return operable;
	}

	public void setOperable(String operable) {
		this.operable = operable;
	}

	public String getRequestCode() {
		return requestCode;
	}

	public void setRequestCode(String requestCode) {
		this.requestCode = requestCode;
	}

	public String getMaterialCatLogId() {
		return materialCatLogId;
	}

	public void setMaterialCatLogId(String materialCatLogId) {
		this.materialCatLogId = materialCatLogId;
	}

	public String getDesingnation() {
		return desingnation;
	}

	public void setDesingnation(String desingnation) {
		this.desingnation = desingnation;
	}

	public int getOptLock() {
		return optLock;
	}

	public void setOptLock(int optLock) {
		this.optLock = optLock;
	}

	public double getOther() {
		return other;
	}

	public void setOther(double other) {
		this.other = other;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getPlanType() {
		return planType;
	}

	public void setPlanType(String planType) {
		this.planType = planType;
	}

	public String getIsAuthorityControl() {
		return isAuthorityControl;
	}

	public void setIsAuthorityControl(String isAuthorityControl) {
		this.isAuthorityControl = isAuthorityControl;
	}

	public String getMaterialitemname() {
		return materialitemname;
	}

	public void setMaterialitemname(String materialitemname) {
		this.materialitemname = materialitemname;
	}

	public String getMaterialitemcode() {
		return materialitemcode;
	}

	public void setMaterialitemcode(String materialitemcode) {
		this.materialitemcode = materialitemcode;
	}

	public String getTaskno() {
		return taskno;
	}

	public void setTaskno(String taskno) {
		this.taskno = taskno;
	}

	public String getOldquantity() {
		return oldquantity;
	}

	public void setOldquantity(String oldquantity) {
		this.oldquantity = oldquantity;
	}

	public String getChanger() {
		return changer;
	}

	public void setChanger(String changer) {
		this.changer = changer;
	}

	public String getChangtime() {
		return changtime;
	}

	public void setChangtime(String changtime) {
		this.changtime = changtime;
	}

	public String getChangreson() {
		return changreson;
	}

	public void setChangreson(String changreson) {
		this.changreson = changreson;
	}

	public String getOut_num() {
		return out_num;
	}

	public void setOut_num(String outNum) {
		out_num = outNum;
	}

	public String getPlanActualnumber() {
		return planActualnumber;
	}

	public void setPlanActualnumber(String planActualnumber) {
		this.planActualnumber = planActualnumber;
	}

	public String getDeliveryStatus() {
		return deliveryStatus;
	}

	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}

	
	
}
