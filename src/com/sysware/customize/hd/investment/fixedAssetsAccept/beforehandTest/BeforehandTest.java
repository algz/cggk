package com.sysware.customize.hd.investment.fixedAssetsAccept.beforehandTest;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 设备预验收实体
 * @author zhoup
 * 2012-5-24 上午10:42:00
 *
 */
@Entity
@Table(name="t_beforehandTest")
public class BeforehandTest {

	private String beforehandTestId;//预验收编号
	private String beforehandTestText;//预验收报告
	private String beforehandTestPeopel;//预验收人员
	private Date beforehandTestStartTime;//预验收开始时间
	private Date beforehandTestLastTime;//预验收结束时间
	private String acceptId;//验收任务管理表编号
	
	@Id
	@Column(name="beforehandTestId",unique=true,nullable=false)
//	@GenericGenerator(name="myUd",strategy="assigned")
	public String getBeforehandTestId() {
		return beforehandTestId;
	}
	public void setBeforehandTestId(String beforehandTestId) {
		this.beforehandTestId = beforehandTestId;
	}
	
	@Column(name="beforehandTestText")
	public String getBeforehandTestText() {
		return beforehandTestText;
	}
	public void setBeforehandTestText(String beforehandTestText) {
		this.beforehandTestText = beforehandTestText;
	}
	
	@Column(name="beforehandTestPeopel")
	public String getBeforehandTestPeopel() {
		return beforehandTestPeopel;
	}
	public void setBeforehandTestPeopel(String beforehandTestPeopel) {
		this.beforehandTestPeopel = beforehandTestPeopel;
	}
	
	@Column(name="beforehandTestStartTime")
	public Date getBeforehandTestStartTime() {
		return beforehandTestStartTime;
	}
	public void setBeforehandTestStartTime(Date beforehandTestStartTime) {
		this.beforehandTestStartTime = beforehandTestStartTime;
	}
	
	@Column(name="beforehandTestLastTime")
	public Date getBeforehandTestLastTime() {
		return beforehandTestLastTime;
	}
	public void setBeforehandTestLastTime(Date beforehandTestLastTime) {
		this.beforehandTestLastTime = beforehandTestLastTime;
	}
	
	@Column(name="acceptId")
	public String getAcceptId() {
		return acceptId;
	}
	public void setAcceptId(String acceptId) {
		this.acceptId = acceptId;
	}
}
