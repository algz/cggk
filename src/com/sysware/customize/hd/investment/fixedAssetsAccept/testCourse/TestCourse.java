package com.sysware.customize.hd.investment.fixedAssetsAccept.testCourse;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="t_testCourse")
public class TestCourse {

	private String testCourseId;//验收过程编号
	private String testCourseDocument;//验收大纲
	private String testCourseDocumentId;//验收大纲编号
	private Date testCourseTime;//验收时间
	private String acceptId;//验收任务管理表编号
	
	@Id
	@Column(name="testCourseId",unique=true,nullable=false)
	public String getTestCourseId() {
		return testCourseId;
	}
	public void setTestCourseId(String testCourseId) {
		this.testCourseId = testCourseId;
	}
	
	@Column(name="testCourseDocument")
	public String getTestCourseDocument() {
		return testCourseDocument;
	}
	public void setTestCourseDocument(String testCourseDocument) {
		this.testCourseDocument = testCourseDocument;
	}
	
	@Column(name="testCourseTime")
	public Date getTestCourseTime() {
		return testCourseTime;
	}
	public void setTestCourseTime(Date testCourseTime) {
		this.testCourseTime = testCourseTime;
	}
	
	@Column(name="acceptId")
	public String getAcceptId() {
		return acceptId;
	}
	public void setAcceptId(String acceptId) {
		this.acceptId = acceptId;
	}
	
	@Column(name="testCourseDocumentId")
	public String getTestCourseDocumentId() {
		return testCourseDocumentId;
	}
	public void setTestCourseDocumentId(String testCourseDocumentId) {
		this.testCourseDocumentId = testCourseDocumentId;
	}
}
