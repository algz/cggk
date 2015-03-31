package com.sysware.customize.hd.investment.pactEfficiencyGrade.selectGradePersonnel.entity;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="T_EFFICIENCY_ANALYSIS")
public class EfficiencyAnalysis {

	//主键ID
	private String id;
	//合同表ID
	private String contract_id;
	//创建人
	private String creater;
	//创建时间
	private Date create_date;
	//分值
	private long score;
	
	@Id
	@Column(name="ID",unique=true,nullable=false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	@Column(name="CONTRACT_ID")
	public String getContract_id() {
		return contract_id;
	}
	public void setContract_id(String contractId) {
		contract_id = contractId;
	}
	
	@Column(name="CREATER")
	public String getCreater() {
		return creater;
	}
	public void setCreater(String creater) {
		this.creater = creater;
	}
	
	@Column(name="CREATE_DATE")
	public Date getCreate_date() {
		return create_date;
	}
	public void setCreate_date(Date createDate) {
		create_date = createDate;
	}
	
	@Column(name="SCORE")
	public long getScore() {
		return score;
	}
	public void setScore(long score) {
		this.score = score;
	}
	
	
}
