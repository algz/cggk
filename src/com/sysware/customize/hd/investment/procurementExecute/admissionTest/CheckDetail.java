package com.sysware.customize.hd.investment.procurementExecute.admissionTest;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

@Table(name = "T_Check_Detail")
@Entity
public class CheckDetail {
	/**
	 * 主键ID
	 */
	private String checkDetailId;
	/**
	 * 入厂检验表ID
	 */
	private String arrivalCheckId;
	/**
	 * 检验类型：0理化委托；1检测报告；2质量意见；3退货
	 */
	private char checkType;
	/**
	 * 对象编号
	 */
	private String objectNo;
	/**
	 * 对象名称
	 */
	private String objectName;
	/**
	 * 评语
	 */
	private String objectComment;
	/**
	 * 结论
	 */
	private String objectResult;

	private String fileId;// 质量意见书文件Id
	private String fileName;// 质量意见书文件名称
    private BigDecimal restAssuredNumber;//放行数量
    private Date restAssuredDate;//放行日期
	public BigDecimal getRestAssuredNumber() {
		return restAssuredNumber;
	}

	public void setRestAssuredNumber(BigDecimal restAssuredNumber) {
		this.restAssuredNumber = restAssuredNumber;
	}
	@Temporal(TemporalType.DATE)
	public Date getRestAssuredDate() {
		return restAssuredDate;
	}

	public void setRestAssuredDate(Date restAssuredDate) {
		this.restAssuredDate = restAssuredDate;
	}

	public String getFileId() {
		return fileId;
	}

	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getCheckDetailId() {
		return checkDetailId;
	}

	public void setCheckDetailId(String checkDetailId) {
		this.checkDetailId = checkDetailId;
	}

	@Column(name = "avvival_check_id")
	public String getArrivalCheckId() {
		return arrivalCheckId;
	}

	public void setArrivalCheckId(String arrivalCheckId) {
		this.arrivalCheckId = arrivalCheckId;
	}

	@Column(name = "check_type")
	public char getCheckType() {
		return checkType;
	}

	public void setCheckType(char checkType) {
		this.checkType = checkType;
	}

	@Column(name = "object_no")
	public String getObjectNo() {
		return objectNo;
	}

	public void setObjectNo(String objectNo) {
		this.objectNo = objectNo;
	}

	@Column(name = "object_name")
	public String getObjectName() {
		return objectName;
	}

	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}

	@Column(name = "object_comment")
	public String getObjectComment() {
		return objectComment;
	}

	public void setObjectComment(String objectComment) {
		this.objectComment = objectComment;
	}

	@Column(name = "object_result")
	public String getObjectResult() {
		return objectResult;
	}

	public void setObjectResult(String objectResult) {
		this.objectResult = objectResult;
	}
}
