package com.sysware.customize.hd.investment.productionMaterialsManagement.parityDetail;



public class ParityDetailVo {
	private String applicationStatus;
	private String parityDetailId;// 比价审批明显ID
	private String purchaseId;
	private String demandTime;//需用时间
	private String department;//使用单位
	private String lastprice;//上次采购价格
	private String manufacturer1;//比价厂商1
	private String manufacturer2;//比价厂商2
	private String manufacturer3;//比价厂商3
	
	
	private String  property1;//企业性质
	private String  property2;
	private String  property3;
	
	private String reposal1;//信用程度
	private String reposal2;
	private String reposal3;
	
	/**
	 * 生产厂商
	 */
	private String productVentor1;
	private String productVentor2;
	private String productVentor3;
	
	/**
	 * 电话
	 */
	private String phone1;
	private String phone2;
	private String phone3;
	
	/**
	 * 供应商名称
	 */
	private String vendorName1;
	private String vendorName2;
	private String vendorName3;
	
	private String manufacturerOne;//建议厂商1
	private String manufacturerTwo;//建议厂商2
	private String manufacturerOneName;//建议厂商1
	private String manufacturerTwoName;//建议厂商2
	private String planner;//计划员
	private String materialId;//物资信息ID
	private String planPrice;//计划价
	private String price1;//供应商1价格
	private String price2;//供应商2价格
	private String price3;//供应商3价格
	private String provider;//供应员
	private String  providerName;//供应员名称
	private String plannerName;//计划员名称
	private String purpose;//用途
	private String remark;//采购通知备注
	private String remarks;//采购申请备注
	private String parityId;//比价审批ID
	private String scope;//幅度	
	private Integer start;
	private Integer limit;
	private String desingnation;// 物料牌号
	private String materialItemName;// 物料名称
	private String materialStandard;// 物料规格
	private String mCtgName;//物资类别
	private String parityCode;//比价编码
	private String technicCondition;// 技术条件
	private String demension;// 量纲。
    private String	countNum;//数量
    
    private String vendorIdString;//
    private String priceString;//
    private String vendorNameString;//
    private String oldParityVendorIdString;//
    
    private String showOnly;//只显示，0为假，1为真
    
	public String getShowOnly() {
		return showOnly;
	}
	public void setShowOnly(String showOnly) {
		this.showOnly = showOnly;
	}
	public String getOldParityVendorIdString() {
		return oldParityVendorIdString;
	}
	public void setOldParityVendorIdString(String oldParityVendorIdString) {
		this.oldParityVendorIdString = oldParityVendorIdString;
	}
	public String getVendorNameString() {
		return vendorNameString;
	}
	public void setVendorNameString(String vendorNameString) {
		this.vendorNameString = vendorNameString;
	}
	public String getVendorIdString() {
		return vendorIdString;
	}
	public void setVendorIdString(String vendorIdString) {
		this.vendorIdString = vendorIdString;
	}
	public String getPriceString() {
		return priceString;
	}
	public void setPriceString(String priceString) {
		this.priceString = priceString;
	}
	public String getCountNum() {
		return countNum;
	}
	public void setCountNum(String countNum) {
		this.countNum = countNum;
	}
	public String getDemension() {
		return demension;
	}
	public void setDemension(String demension) {
		this.demension = demension;
	}
	public String getPurchaseId() {
		return purchaseId;
	}
	public void setPurchaseId(String purchaseId) {
		this.purchaseId = purchaseId;
	}
	public String getParityDetailId() {
		return parityDetailId;
	}
	public void setParityDetailId(String parityDetailId) {
		this.parityDetailId = parityDetailId;
	}
	public String getDemandTime() {
		return demandTime;
	}
	public void setDemandTime(String demandTime) {
		this.demandTime = demandTime;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getLastprice() {
		return lastprice;
	}
	public void setLastprice(String lastprice) {
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
	public String getPlanPrice() {
		return planPrice;
	}
	public void setPlanPrice(String planPrice) {
		this.planPrice = planPrice;
	}
	public String getPrice1() {
		return price1;
	}
	public void setPrice1(String price1) {
		this.price1 = price1;
	}
	public String getPrice2() {
		return price2;
	}
	public void setPrice2(String price2) {
		this.price2 = price2;
	}
	public String getPrice3() {
		return price3;
	}
	public void setPrice3(String price3) {
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
	public String getApplicationStatus() {
		return applicationStatus;
	}
	public void setApplicationStatus(String applicationStatus) {
		this.applicationStatus = applicationStatus;
	}
	public String getParityId() {
		return parityId;
	}
	public void setParityId(String parityId) {
		this.parityId = parityId;
	}
	public String getScope() {
		return scope;
	}
	public void setScope(String scope) {
		this.scope = scope;
	}
	public Integer getStart() {
		return start;
	}
	public void setStart(Integer start) {
		this.start = start;
	}
	public Integer getLimit() {
		return limit;
	}
	public void setLimit(Integer limit) {
		this.limit = limit;
	}
	public String getDesingnation() {
		return desingnation;
	}
	public void setDesingnation(String desingnation) {
		this.desingnation = desingnation;
	}
	public String getMaterialItemName() {
		return materialItemName;
	}
	public void setMaterialItemName(String materialItemName) {
		this.materialItemName = materialItemName;
	}
	public String getMaterialStandard() {
		return materialStandard;
	}
	public void setMaterialStandard(String materialStandard) {
		this.materialStandard = materialStandard;
	}
	public String getmCtgName() {
		return mCtgName;
	}
	public void setmCtgName(String mCtgName) {
		this.mCtgName = mCtgName;
	}
	public String getParityCode() {
		return parityCode;
	}
	public void setParityCode(String parityCode) {
		this.parityCode = parityCode;
	}
	public String getTechnicCondition() {
		return technicCondition;
	}
	public void setTechnicCondition(String technicCondition) {
		this.technicCondition = technicCondition;
	}
	public String getProperty1() {
		return property1;
	}
	public void setProperty1(String property1) {
		this.property1 = property1;
	}
	public String getProperty2() {
		return property2;
	}
	public void setProperty2(String property2) {
		this.property2 = property2;
	}
	public String getProperty3() {
		return property3;
	}
	public void setProperty3(String property3) {
		this.property3 = property3;
	}
	public String getReposal1() {
		return reposal1;
	}
	public void setReposal1(String reposal1) {
		this.reposal1 = reposal1;
	}
	public String getReposal2() {
		return reposal2;
	}
	public void setReposal2(String reposal2) {
		this.reposal2 = reposal2;
	}
	public String getReposal3() {
		return reposal3;
	}
	public void setReposal3(String reposal3) {
		this.reposal3 = reposal3;
	}
	public String getProductVentor1() {
		return productVentor1;
	}
	public void setProductVentor1(String productVentor1) {
		this.productVentor1 = productVentor1;
	}
	public String getProductVentor2() {
		return productVentor2;
	}
	public void setProductVentor2(String productVentor2) {
		this.productVentor2 = productVentor2;
	}
	public String getProductVentor3() {
		return productVentor3;
	}
	public void setProductVentor3(String productVentor3) {
		this.productVentor3 = productVentor3;
	}
	public String getPhone1() {
		return phone1;
	}
	public void setPhone1(String phone1) {
		this.phone1 = phone1;
	}
	public String getPhone2() {
		return phone2;
	}
	public void setPhone2(String phone2) {
		this.phone2 = phone2;
	}
	public String getPhone3() {
		return phone3;
	}
	public void setPhone3(String phone3) {
		this.phone3 = phone3;
	}
	public String getVendorName1() {
		return vendorName1;
	}
	public void setVendorName1(String vendorName1) {
		this.vendorName1 = vendorName1;
	}
	public String getVendorName2() {
		return vendorName2;
	}
	public void setVendorName2(String vendorName2) {
		this.vendorName2 = vendorName2;
	}
	public String getVendorName3() {
		return vendorName3;
	}
	public void setVendorName3(String vendorName3) {
		this.vendorName3 = vendorName3;
	}
	
	public String changeToJsonString (){
		StringBuffer jsString = new StringBuffer();
		jsString.append("{");
		
		if(parityDetailId!=null){
		jsString.append("parityDetailId : '");
		jsString.append(parityDetailId);
		jsString.append("',");
		}
		
		if(purchaseId!=null){
		jsString.append("purchaseId : '");
		jsString.append(purchaseId);
		jsString.append("',");
		}
		
		if(demandTime!=null){
			
		jsString.append("demandTime : '");
		jsString.append(demandTime);
		jsString.append("',");
		}

		if(department!=null){
		jsString.append("department : '");
		jsString.append(department);
		jsString.append("',");
		}
		if(lastprice!=null){
		jsString.append("lastprice : '");
		jsString.append(lastprice);
		jsString.append("',");
		}
		if(manufacturer1!=null){
		jsString.append("manufacturer1 : '");
		jsString.append(manufacturer1);
		jsString.append("',");
		}
		
		if(manufacturer2!=null){
		jsString.append("manufacturer2 : '");
		jsString.append(manufacturer2);
		jsString.append("',");
		}
		if(manufacturer3!=null){
		jsString.append("manufacturer3 : '");
		jsString.append(manufacturer3);
		jsString.append("',");
		}
		if(property1!=null){
		jsString.append("property1 : '");
		jsString.append(property1);
		jsString.append("',");
		}
		if(property2!=null){
		jsString.append("property2 : '");
		jsString.append(property2);
		jsString.append("',");
		}
		if(property3!=null){
		jsString.append("property3 : '");
		jsString.append(property3);
		jsString.append("',");
		}
		if(reposal1!=null){
		jsString.append("reposal1 : '");
		jsString.append(reposal1);
		jsString.append("',");
		}
		if(reposal2!=null){
		jsString.append("reposal2 : '");
		jsString.append(reposal2);
		jsString.append("',");
		}
		if(reposal3!=null){
		jsString.append("reposal3 : '");
		jsString.append(reposal3);
		jsString.append("',");
		}
		if(productVentor1!=null){
		jsString.append("productVentor1 : '");
		jsString.append(productVentor1);
		jsString.append("',");
		}
		if(productVentor2!=null){
		jsString.append("productVentor2 : '");
		jsString.append(productVentor2);
		jsString.append("',");
		}
		if(productVentor3!=null){
		jsString.append("productVentor3 : '");
		jsString.append(productVentor3);
		jsString.append("',");
		}
		if(phone1!=null){
		jsString.append("phone1 : '");
		jsString.append(phone1);
		jsString.append("',");
		}
		if(phone2!=null){
		jsString.append("phone2 : '");
		jsString.append(phone2);
		jsString.append("',");
		}
		
		if(phone3!=null){
		jsString.append("phone3 : '");
		jsString.append(phone3);
		jsString.append("',");
		}
		if(vendorName1!=null){
		jsString.append("vendorName1 : '");
		jsString.append(vendorName1);
		jsString.append("',");
		}
		if(vendorName2!=null){
		jsString.append("vendorName2 : '");
		jsString.append(vendorName2);
		jsString.append("',");
		}
		if(vendorName3!=null){
		jsString.append("vendorName3 : '");
		jsString.append(vendorName3);
		jsString.append("',");
		}
		if(manufacturerOne!=null){
		jsString.append("manufacturerOne : '");
		jsString.append(manufacturerOne);
		jsString.append("',");
		}
		if(manufacturerTwo!=null){
		jsString.append("manufacturerTwo : '");
		jsString.append(manufacturerTwo);
		jsString.append("',");
		}
		if(manufacturerOneName!=null){
		jsString.append("manufacturerOneName : '");
		jsString.append(manufacturerOneName);
		jsString.append("',");
		}
		
		if(manufacturerTwoName!=null){
		jsString.append("manufacturerTwoName : '");
		jsString.append(manufacturerTwoName);
		jsString.append("',");
		}
		if(planner!=null){
		jsString.append("planner : '");
		jsString.append(planner);
		jsString.append("',");
		}
		if(materialId!=null){
		jsString.append("materialId : '");
		jsString.append(materialId);
		jsString.append("',");
		}
		if(planPrice!=null){
		jsString.append("planPrice : '");
		jsString.append(planPrice);
		jsString.append("',");
		}
		if(price1!=null){
		jsString.append("price1 : '");
		jsString.append(price1);
		jsString.append("',");
		}
		if(price2!=null){
		jsString.append("price2 : '");
		jsString.append(price2);
		jsString.append("',");
		}
		if(price3!=null){
		jsString.append("price3 : '");
		jsString.append(price3);
		jsString.append("',");
		}
		if(provider!=null){
		jsString.append("provider : '");
		jsString.append(provider);
		jsString.append("',");
		}
		if(providerName!=null){
		jsString.append("providerName : '");
		jsString.append(providerName);
		jsString.append("',");
		}
		if(plannerName!=null){
		jsString.append("plannerName : '");
		jsString.append(plannerName);
		jsString.append("',");
		}
		if(purpose!=null){
		jsString.append("purpose : '");
		jsString.append(purpose);
		jsString.append("',");
		}
		if(remark!=null){
		jsString.append("remark : '");
		jsString.append(remark);
		jsString.append("',");
		}
		if(remarks!=null){
		jsString.append("remarks : '");
		jsString.append(remarks);
		jsString.append("',");
		}
		if(parityId!=null){
		jsString.append("parityId : '");
		jsString.append(parityId);
		jsString.append("',");
		}
		if(scope!=null){
		jsString.append("scope : '");
		jsString.append(scope);
		jsString.append("',");
		}
		if(desingnation!=null){
		jsString.append("desingnation : '");
		jsString.append(desingnation);
		jsString.append("',");
		}
		if(materialItemName!=null){
		jsString.append("materialItemName : '");
		jsString.append(materialItemName);
		jsString.append("',");
		}
		if(materialStandard!=null){
		jsString.append("materialStandard : '");
		jsString.append(materialStandard);
		jsString.append("',");
		}
		if(mCtgName!=null){
		jsString.append("mCtgName : '");
		jsString.append(mCtgName);
		jsString.append("',");
		}
		if(parityCode!=null){
		jsString.append("parityCode : '");
		jsString.append(parityCode);
		jsString.append("',");
		}
		if(countNum!=null){
			jsString.append("countNum : '");
			jsString.append(countNum);
			jsString.append("',");
			}
		if(demension!=null){
			jsString.append("demension : '");
			jsString.append(demension);
			jsString.append("',");
			}
		if(technicCondition!=null){
		jsString.append("technicCondition : '");
		jsString.append(technicCondition);
		}else{
			jsString.append("technicCondition : '");
		}
		jsString.append("'}");
		return jsString.toString();
	}
}
