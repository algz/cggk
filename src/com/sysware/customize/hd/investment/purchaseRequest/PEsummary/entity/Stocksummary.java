package com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * TbStocksummary generated by MyEclipse Persistence Tools
 */

@Entity
@Table(name = "TB_STOCKSUMMARY")
public class Stocksummary implements java.io.Serializable {

	// Fields
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	private String id;
	
	@Column(name = "PROJECTNAME")
	private String projectname;//项目名称
	
	@Column(name = "RESPONSPERSON")
	private String responsperson;//责任人
	
	@Column(name = "SUPERVISORENGINEER")
	private String supervisorengineer;//主管总师
	
	@Column(name = "DIRECTORLEADER")
	private String directorleader;//主管领导
	
	@Column(name = "INVESTTOTAL")
	private BigDecimal investtotal;//总投资合计
	
	@Column(name = "INVESTCOUNTRY")
	private BigDecimal investcountry;//总投资国拨
	
	@Column(name = "INVESTSELF")
	private BigDecimal investself;//总投资自筹
	
	@Column(name = "ACCUPLANTOTAL")
	private BigDecimal accuplantotal;//截止上年累计下达计划合计
	
	@Column(name = "ACCUPLANCOUNTRY")
	private BigDecimal accuplancountry;//截止上年累计下达计划国拨
	
	@Column(name = "ACCUPLANSELF")
	private BigDecimal accuplanself;//截止上年累计下达计划自筹
	
	@Column(name = "ACCUINVESTTOTAL")
	private BigDecimal accuinvesttotal;//截止上年累计完成投资合计
	
	@Column(name = "ACCUINVESTCOUNTRY")
	private BigDecimal accuinvestcountry;//截止上年累计完成投资国拨
	
	@Column(name = "ACCUINVESTSELF")
	private BigDecimal accuinvestself;//截止上年累计完成投资自筹
	
	@Column(name = "ANNUALINVESTTOTAL")
	private BigDecimal annualinvesttotal;//本年计划投资合计
	
	@Column(name = "ANNUALINVESTCOUNTRY")
	private BigDecimal annualinvestcountry;//本年计划投资国拨
	
	@Column(name = "ANNUALINVESTSELF")
	private BigDecimal annualinvestself;//本年计划投资自筹
	
	@Column(name = "CREATETIME")
	private Date createtime;//创建时间
	
	@Column(name = "APPROVALSTATE")
	private Long approvalstate;//审批状态
	
	@Column(name = "APPROVALTIME")
	private Date approvaltime;//审批时间
	
	@Column(name = "REMARK")
	private String remark;//备注

	// Constructors

	/** default constructor */
	public Stocksummary() {
	}

	/** minimal constructor */
	public Stocksummary(String id) {
		this.id = id;
	}

	/** full constructor */
	public Stocksummary(String id, String projectname, String responsperson,
			String supervisorengineer, String directorleader,
			BigDecimal investtotal, BigDecimal investcountry, BigDecimal investself,
			BigDecimal accuplantotal, BigDecimal accuplancountry, BigDecimal accuplanself,
			BigDecimal accuinvesttotal, BigDecimal accuinvestcountry,
			BigDecimal accuinvestself, BigDecimal annualinvesttotal,
			BigDecimal annualinvestcountry, BigDecimal annualinvestself,
			Date createtime, Long approvalstate, Date approvaltime,
			String remark) {
		this.id = id;
		this.projectname = projectname;
		this.responsperson = responsperson;
		this.supervisorengineer = supervisorengineer;
		this.directorleader = directorleader;
		this.investtotal = investtotal;
		this.investcountry = investcountry;
		this.investself = investself;
		this.accuplantotal = accuplantotal;
		this.accuplancountry = accuplancountry;
		this.accuplanself = accuplanself;
		this.accuinvesttotal = accuinvesttotal;
		this.accuinvestcountry = accuinvestcountry;
		this.accuinvestself = accuinvestself;
		this.annualinvesttotal = annualinvesttotal;
		this.annualinvestcountry = annualinvestcountry;
		this.annualinvestself = annualinvestself;
		this.createtime = createtime;
		this.approvalstate = approvalstate;
		this.approvaltime = approvaltime;
		this.remark = remark;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getProjectname() {
		return this.projectname;
	}

	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}

	public String getResponsperson() {
		return this.responsperson;
	}

	public void setResponsperson(String responsperson) {
		this.responsperson = responsperson;
	}

	public String getSupervisorengineer() {
		return this.supervisorengineer;
	}

	public void setSupervisorengineer(String supervisorengineer) {
		this.supervisorengineer = supervisorengineer;
	}

	public String getDirectorleader() {
		return this.directorleader;
	}

	public void setDirectorleader(String directorleader) {
		this.directorleader = directorleader;
	}

	public BigDecimal getInvesttotal() {
		return this.investtotal;
	}

	public void setInvesttotal(BigDecimal investtotal) {
		this.investtotal = investtotal;
	}

	public BigDecimal getInvestcountry() {
		return this.investcountry;
	}

	public void setInvestcountry(BigDecimal investcountry) {
		this.investcountry = investcountry;
	}

	public BigDecimal getInvestself() {
		return this.investself;
	}

	public void setInvestself(BigDecimal investself) {
		this.investself = investself;
	}

	public BigDecimal getAccuplantotal() {
		return this.accuplantotal;
	}

	public void setAccuplantotal(BigDecimal accuplantotal) {
		this.accuplantotal = accuplantotal;
	}

	public BigDecimal getAccuplancountry() {
		return this.accuplancountry;
	}

	public void setAccuplancountry(BigDecimal accuplancountry) {
		this.accuplancountry = accuplancountry;
	}

	public BigDecimal getAccuplanself() {
		return this.accuplanself;
	}

	public void setAccuplanself(BigDecimal accuplanself) {
		this.accuplanself = accuplanself;
	}

	public BigDecimal getAccuinvesttotal() {
		return this.accuinvesttotal;
	}

	public void setAccuinvesttotal(BigDecimal accuinvesttotal) {
		this.accuinvesttotal = accuinvesttotal;
	}

	public BigDecimal getAccuinvestcountry() {
		return this.accuinvestcountry;
	}

	public void setAccuinvestcountry(BigDecimal accuinvestcountry) {
		this.accuinvestcountry = accuinvestcountry;
	}

	public BigDecimal getAccuinvestself() {
		return this.accuinvestself;
	}

	public void setAccuinvestself(BigDecimal accuinvestself) {
		this.accuinvestself = accuinvestself;
	}

	public BigDecimal getAnnualinvesttotal() {
		return this.annualinvesttotal;
	}

	public void setAnnualinvesttotal(BigDecimal annualinvesttotal) {
		this.annualinvesttotal = annualinvesttotal;
	}

	public BigDecimal getAnnualinvestcountry() {
		return this.annualinvestcountry;
	}

	public void setAnnualinvestcountry(BigDecimal annualinvestcountry) {
		this.annualinvestcountry = annualinvestcountry;
	}

	public BigDecimal getAnnualinvestself() {
		return this.annualinvestself;
	}

	public void setAnnualinvestself(BigDecimal annualinvestself) {
		this.annualinvestself = annualinvestself;
	}

	public Date getCreatetime() {
		return this.createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public Long getApprovalstate() {
		return this.approvalstate;
	}

	public void setApprovalstate(Long approvalstate) {
		this.approvalstate = approvalstate;
	}

	public Date getApprovaltime() {
		return this.approvaltime;
	}

	public void setApprovaltime(Date approvaltime) {
		this.approvaltime = approvaltime;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}