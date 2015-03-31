package com.sysware.customize.hd.investment.fixedAssetsAccept.rendTest;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="t_rendTest")
public class RendTest {

	private String rendTestId;//开箱验收编号
	private Date rendTestTime;//开箱验收时间
	private Date testTime;//验收时间
	private String rendTestRemark;//开箱验收说明
	private long testBill;//验收清单交接
	private String acceptId;//验收任务管理表编号
	
	@Id
	@Column(name="rendTestId",unique=true,nullable=false)
	public String getRendTestId() {
		return rendTestId;
	}
	public void setRendTestId(String rendTestId) {
		this.rendTestId = rendTestId;
	}
	
	@Column(name="rendTestTime")
	public Date getRendTestTime() {
		return rendTestTime;
	}
	public void setRendTestTime(Date rendTestTime) {
		this.rendTestTime = rendTestTime;
	}
	
	@Column(name="testTime")
	public Date getTestTime() {
		return testTime;
	}
	public void setTestTime(Date testTime) {
		this.testTime = testTime;
	}
	
	@Column(name="rendTestRemark")
	public String getRendTestRemark() {
		return rendTestRemark;
	}
	public void setRendTestRemark(String rendTestRemark) {
		this.rendTestRemark = rendTestRemark;
	}
	
	@Column(name="testBill")
	public long getTestBill() {
		return testBill;
	}
	public void setTestBill(long testBill) {
		this.testBill = testBill;
	}
	
	@Column(name="acceptId")
	public String getAcceptId() {
		return acceptId;
	}
	public void setAcceptId(String acceptId) {
		this.acceptId = acceptId;
	}
}
