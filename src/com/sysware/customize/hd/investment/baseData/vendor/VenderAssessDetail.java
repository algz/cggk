package com.sysware.customize.hd.investment.baseData.vendor;

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

@Entity
@Table(name="T_VENDERASSESSDETAIL")
public class VenderAssessDetail {
	@Id
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	@Column(unique = true, nullable = false)
	private String id;
	
	@Column(name = "VENDERID")
	private String venderId;//供应商id
	
	@Column(name = "DEPARTID")
	private String departId;//承制商id
	
	@Column(name = "MATINGTYPE")
	private String matingType;//配套机型
	
	@Column(name = "MASSSCORE")
	private BigDecimal massScore;//质量综合分
	
	@Column(name = "PAYSCORE")
	private BigDecimal payScore;//支付综合分
	
	@Column(name = "SERVESCORE")
	private BigDecimal serveScore;//服务综合分
	
	@Column(name = "COMPOSITESCORE")
	private BigDecimal compositeScore;//综合得分
	
	@Column(name = "ASSESSGRADE")
	private String assessGrade;//评定等级
	
	@Column(name = "EDITOR")
	private String editor;//考核单制表人
	
	@Temporal(TemporalType.DATE)
	@Column(name = "EDITDATE")
	private Date editDate;//考核单制表时间 
	
	@Column(name = "ASSESSID")
	private String assessId;//考核单id

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getVenderId() {
		return venderId;
	}

	public void setVenderId(String venderId) {
		this.venderId = venderId;
	}

	public String getDepartId() {
		return departId;
	}

	public void setDepartId(String departId) {
		this.departId = departId;
	}

	public String getMatingType() {
		return matingType;
	}

	public void setMatingType(String matingType) {
		this.matingType = matingType;
	}

	public BigDecimal getMassScore() {
		return massScore;
	}

	public void setMassScore(BigDecimal massScore) {
		this.massScore = massScore;
	}

	public BigDecimal getPayScore() {
		return payScore;
	}

	public void setPayScore(BigDecimal payScore) {
		this.payScore = payScore;
	}

	public BigDecimal getServeScore() {
		return serveScore;
	}

	public void setServeScore(BigDecimal serveScore) {
		this.serveScore = serveScore;
	}

	public BigDecimal getCompositeScore() {
		return compositeScore;
	}

	public void setCompositeScore(BigDecimal compositeScore) {
		this.compositeScore = compositeScore;
	}

	public String getAssessGrade() {
		return assessGrade;
	}

	public void setAssessGrade(String assessGrade) {
		this.assessGrade = assessGrade;
	}

	public String getEditor() {
		return editor;
	}

	public void setEditor(String editor) {
		this.editor = editor;
	}

	public Date getEditDate() {
		return editDate;
	}

	public void setEditDate(Date editDate) {
		this.editDate = editDate;
	}

	public String getAssessId() {
		return assessId;
	}

	public void setAssessId(String assessId) {
		this.assessId = assessId;
	}

	
}
