package com.sysware.customize.hd.investment.fixedAssetsAccept.lastTest;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="t_lastTest")
public class LastTest {

	private String lastTestId;//最终验收编号
	private String lastTestNum;//验收报告（录入编号）
	private Date lastTestTime;//验收时间
	private String lastTestRemark;//验收情况
	private String acceptId;//验收任务管理编号
	
	@Id
	@Column(name="lastTestId",unique=true,nullable=false)
	public String getLastTestId() {
		return lastTestId;
	}
	public void setLastTestId(String lastTestId) {
		this.lastTestId = lastTestId;
	}
	
	@Column(name="lastTestNum")
	public String getLastTestNum() {
		return lastTestNum;
	}
	public void setLastTestNum(String lastTestNum) {
		this.lastTestNum = lastTestNum;
	}
	
	@Column(name="lastTestTime")
	public Date getLastTestTime() {
		return lastTestTime;
	}
	public void setLastTestTime(Date lastTestTime) {
		this.lastTestTime = lastTestTime;
	}
	
	@Column(name="lastTestRemark")
	public String getLastTestRemark() {
		return lastTestRemark;
	}
	public void setLastTestRemark(String lastTestRemark) {
		this.lastTestRemark = lastTestRemark;
	}
	
	@Column(name="acceptId")
	public String getAcceptId() {
		return acceptId;
	}
	public void setAcceptId(String acceptId) {
		this.acceptId = acceptId;
	}
}
