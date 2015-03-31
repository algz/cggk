package com.sysware.customize.hd.investment.fixedAssetsAccept.rendTest;

public class RendTestVo {

	
	private String rendTestId;//开箱验收编号
	private String rendTestTime;//开箱验收时间
	private String testTime;//验收时间
	private String rendTestRemark;//开箱验收说明
	private long testBill;//验收清单交接
	private String acceptId;//验收任务管理表编号
	
	public String getRendTestId() {
		return rendTestId;
	}
	public void setRendTestId(String rendTestId) {
		this.rendTestId = rendTestId;
	}
	public String getRendTestTime() {
		return rendTestTime;
	}
	public void setRendTestTime(String rendTestTime) {
		this.rendTestTime = rendTestTime;
	}
	public String getTestTime() {
		return testTime;
	}
	public void setTestTime(String testTime) {
		this.testTime = testTime;
	}
	public String getRendTestRemark() {
		return rendTestRemark;
	}
	public void setRendTestRemark(String rendTestRemark) {
		this.rendTestRemark = rendTestRemark;
	}
	public long getTestBill() {
		return testBill;
	}
	public void setTestBill(long testBill) {
		this.testBill = testBill;
	}
	public String getAcceptId() {
		return acceptId;
	}
	public void setAcceptId(String acceptId) {
		this.acceptId = acceptId;
	}
}
