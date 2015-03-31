package com.sysware.customize.hd.investment.fixedAssetsAccept.fixCondition;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 安装条件准备实体
 * @author zhoup
 * 2012-5-28 上午10:12:35
 *
 */
@Entity
@Table(name="t_fixCondition")
public class FixCondition {

	private String fixConditionId;//安装条件准备编号
	private long fixConditionFlag;//安装准备
	private String depcode;//指派单位(选择单位)
	private Date assignTime;//指派时间
	private Date assignAchieveTime;//完成时间
	private String fixConditionText;//安装条件准备说明
	private String vendorId;//供应商id
	private Date tenderStartTime;//招标开始时间
	private Date tenderEndTime;//招标结束时间
	private String acceptId;//验收任务管理表编号
	
	@Id
	@Column(name="fixConditionId",unique=true,nullable=false)
	public String getFixConditionId() {
		return fixConditionId;
	}
	public void setFixConditionId(String fixConditionId) {
		this.fixConditionId = fixConditionId;
	}
	
	@Column(name="fixConditionFlag")
	public long getFixConditionFlag() {
		return fixConditionFlag;
	}
	public void setFixConditionFlag(long fixConditionFlag) {
		this.fixConditionFlag = fixConditionFlag;
	}
	
	@Column(name="assignTime")
	public Date getAssignTime() {
		return assignTime;
	}
	public void setAssignTime(Date assignTime) {
		this.assignTime = assignTime;
	}
	
	@Column(name="assignAchieveTime")
	public Date getAssignAchieveTime() {
		return assignAchieveTime;
	}
	public void setAssignAchieveTime(Date assignAchieveTime) {
		this.assignAchieveTime = assignAchieveTime;
	}
	
	@Column(name="fixConditionText")
	public String getFixConditionText() {
		return fixConditionText;
	}
	public void setFixConditionText(String fixConditionText) {
		this.fixConditionText = fixConditionText;
	}
	
	@Column(name="vendorId")
	public String getVendorId() {
		return vendorId;
	}
	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}
	
	@Column(name="tenderStartTime")
	public Date getTenderStartTime() {
		return tenderStartTime;
	}
	public void setTenderStartTime(Date tenderStartTime) {
		this.tenderStartTime = tenderStartTime;
	}
	
	@Column(name="tenderEndTime")
	public Date getTenderEndTime() {
		return tenderEndTime;
	}
	public void setTenderEndTime(Date tenderEndTime) {
		this.tenderEndTime = tenderEndTime;
	}
	
	@Column(name="acceptId")
	public String getAcceptId() {
		return acceptId;
	}
	public void setAcceptId(String acceptId) {
		this.acceptId = acceptId;
	}
	
	@Column(name="depcode")
	public String getDepcode() {
		return depcode;
	}
	public void setDepcode(String depcode) {
		this.depcode = depcode;
	}
}
