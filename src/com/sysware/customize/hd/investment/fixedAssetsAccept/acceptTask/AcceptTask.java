package com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTask;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 验收任务管理实体
 * @author zhoup
 * 2012-5-10 下午4:33:34
 *
 */
@Entity
@Table(name="t_accepttask")
public class AcceptTask {

	private String acceptId;
	private String acceptNum;
	private String contractId;
	private long acceptType;
	private long acceptState;
	private java.util.Date acceptTime;
	private String acceptNote;
	private String acceptCreatePeopel;//验收任务编制人信息
	private int selectType;//判断类型，是土建还是设备。1设备、2土建
	private String projectcategorys;//项目类别
	
	@Id
	@Column(name="acceptId",unique=true,nullable=false)
//	@GeneratedValue(generator="myUd")
	@GenericGenerator(name="myUd",strategy="assigned")
	public String getAcceptId() {
		return acceptId;
	}
	public void setAcceptId(String acceptId) {
		this.acceptId = acceptId;
	}
	
	@Column(name="acceptNum")
	public String getAcceptNum() {
		return acceptNum;
	}
	public void setAcceptNum(String acceptNum) {
		this.acceptNum = acceptNum;
	}
	
	@Column(name="contractId")
	public String getContractId() {
		return contractId;
	}
	public void setContractId(String contractId) {
		this.contractId = contractId;
	}
	
	@Column(name="acceptType")
	public long getAcceptType() {
		return acceptType;
	}
	public void setAcceptType(long acceptType) {
		this.acceptType = acceptType;
	}
	
	@Column(name="acceptState")
	public long getAcceptState() {
		return acceptState;
	}
	public void setAcceptState(long acceptState) {
		this.acceptState = acceptState;
	}
	
	@Column(name="acceptNote")
	public String getAcceptNote() {
		return acceptNote;
	}
	public void setAcceptNote(String acceptNote) {
		this.acceptNote = acceptNote;
	}
	
	@Column(name="acceptTime")
	public java.util.Date getAcceptTime() {
		return acceptTime;
	}
	public void setAcceptTime(java.util.Date acceptTime) {
		this.acceptTime = acceptTime;
	}
	@Column(name="acceptCreatePeopel")
	public String getAcceptCreatePeopel() {
		return acceptCreatePeopel;
	}
	public void setAcceptCreatePeopel(String acceptCreatePeopel) {
		this.acceptCreatePeopel = acceptCreatePeopel;
	}
	public int getSelectType() {
		return selectType;
	}
	public void setSelectType(int selectType) {
		this.selectType = selectType;
	}
	
	@Column(name="PROJECTCATEGORYS")
	public String getProjectcategorys() {
		return projectcategorys;
	}
	public void setProjectcategorys(String projectcategorys) {
		this.projectcategorys = projectcategorys;
	}
	
	
}
