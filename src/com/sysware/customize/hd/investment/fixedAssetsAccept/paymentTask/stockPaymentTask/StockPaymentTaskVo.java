package com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.stockPaymentTask;


public class StockPaymentTaskVo {
	
	private String psId;//股份公司支付任务编号
	private String depcode;//申请单位
	private String psPhone;//联系电话
	private String psContent;//申请事项
	private String psAccessoriesType;//主要附件种类
	private String psPaymentScale;//分期付款比例
	private String psPlanType;//资金计划种类
	private String psRemark;//其他信息
	private String psApplicationBrow;//业务申请额度
	private String psAuditingBrow;//财务审核额度
	private String psPayee;//收款人全称
	private String psBankName;//银行全称
	private String psBankNum;//银行账号
	private long psState;//当前状态
	private String psCreateTime;//申请时间
	private String psAuditingTime;//审批通过时间
	private long psType;//类别。此表默认为1（股份公司）
	private String psCreatePeopel;//股份支付任务编制人信息
	
	private String vendorId;//供应商编号
	private String vendorName;//供应商名称
	private String contractId;//合同编号
	private String contractCode;//合同名称
	private String inputValue;//输入的查询内容
	private String inputValueNum;//输入的查询内容编号
	private int start;//起始
	private int limit;//结束
	
	private String bank;
	private String bank2;
	private String bank3;
	private String accountid;
	private String accountid2;
	private String accountid3;
	
	private int term;//支付任务列表查询条件
	private String money;
	private String pgId;
	
	private int inputSelectType;//判断是土建还是设备查询合同
	
	private int selectType;//判断类型，是土建还是设备。1设备、2土建
	
	
	public String getPsId() {
		return psId;
	}
	public void setPsId(String psId) {
		this.psId = psId;
	}
	public String getDepcode() {
		return depcode;
	}
	public void setDepcode(String depcode) {
		this.depcode = depcode;
	}
	public String getPsPhone() {
		return psPhone;
	}
	public void setPsPhone(String psPhone) {
		this.psPhone = psPhone;
	}
	public String getPsContent() {
		return psContent;
	}
	public void setPsContent(String psContent) {
		this.psContent = psContent;
	}
	public String getPsAccessoriesType() {
		return psAccessoriesType;
	}
	public void setPsAccessoriesType(String psAccessoriesType) {
		this.psAccessoriesType = psAccessoriesType;
	}
	public String getPsPaymentScale() {
		return psPaymentScale;
	}
	public void setPsPaymentScale(String psPaymentScale) {
		this.psPaymentScale = psPaymentScale;
	}
	public String getPsPlanType() {
		return psPlanType;
	}
	public void setPsPlanType(String psPlanType) {
		this.psPlanType = psPlanType;
	}
	public String getPsRemark() {
		return psRemark;
	}
	public void setPsRemark(String psRemark) {
		this.psRemark = psRemark;
	}
	public String getPsApplicationBrow() {
		return psApplicationBrow;
	}
	public void setPsApplicationBrow(String psApplicationBrow) {
		this.psApplicationBrow = psApplicationBrow;
	}
	public String getPsAuditingBrow() {
		return psAuditingBrow;
	}
	public void setPsAuditingBrow(String psAuditingBrow) {
		this.psAuditingBrow = psAuditingBrow;
	}
	public String getPsPayee() {
		return psPayee;
	}
	public void setPsPayee(String psPayee) {
		this.psPayee = psPayee;
	}
	public String getPsBankName() {
		return psBankName;
	}
	public void setPsBankName(String psBankName) {
		this.psBankName = psBankName;
	}
	public String getPsBankNum() {
		return psBankNum;
	}
	public void setPsBankNum(String psBankNum) {
		this.psBankNum = psBankNum;
	}
	public long getPsState() {
		return psState;
	}
	public void setPsState(long psState) {
		this.psState = psState;
	}
	public String getPsCreateTime() {
		return psCreateTime;
	}
	public void setPsCreateTime(String psCreateTime) {
		this.psCreateTime = psCreateTime;
	}
	public String getPsAuditingTime() {
		return psAuditingTime;
	}
	public void setPsAuditingTime(String psAuditingTime) {
		this.psAuditingTime = psAuditingTime;
	}
	public long getPsType() {
		return psType;
	}
	public void setPsType(long psType) {
		this.psType = psType;
	}
	public String getVendorId() {
		return vendorId;
	}
	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
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
	public String getInputValue() {
		return inputValue;
	}
	public void setInputValue(String inputValue) {
		this.inputValue = inputValue;
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
	public String getContractCode() {
		return contractCode;
	}
	public void setContractCode(String contractCode) {
		this.contractCode = contractCode;
	}
	public String getBank() {
		return bank;
	}
	public void setBank(String bank) {
		this.bank = bank;
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
	public String getAccountid() {
		return accountid;
	}
	public void setAccountid(String accountid) {
		this.accountid = accountid;
	}
	public String getAccountid2() {
		return accountid2;
	}
	public void setAccountid2(String accountid2) {
		this.accountid2 = accountid2;
	}
	public String getAccountid3() {
		return accountid3;
	}
	public void setAccountid3(String accountid3) {
		this.accountid3 = accountid3;
	}
	public int getTerm() {
		return term;
	}
	public void setTerm(int term) {
		this.term = term;
	}
	public String getMoney() {
		return money;
	}
	public void setMoney(String money) {
		this.money = money;
	}
	public String getPgId() {
		return pgId;
	}
	public void setPgId(String pgId) {
		this.pgId = pgId;
	}
	public String getPsCreatePeopel() {
		return psCreatePeopel;
	}
	public void setPsCreatePeopel(String psCreatePeopel) {
		this.psCreatePeopel = psCreatePeopel;
	}
	public String getInputValueNum() {
		return inputValueNum;
	}
	public void setInputValueNum(String inputValueNum) {
		this.inputValueNum = inputValueNum;
	}
	public int getInputSelectType() {
		return inputSelectType;
	}
	public void setInputSelectType(int inputSelectType) {
		this.inputSelectType = inputSelectType;
	}
	public int getSelectType() {
		return selectType;
	}
	public void setSelectType(int selectType) {
		this.selectType = selectType;
	}
}
