package com.sysware.customize.hd.investment.baseData.expert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "T_EXPERT")
public class Expert {
	/**
	 * 专长
	 */
	private String expertise;
	/**
	 * 专家年龄
	 */
	private String exportAge;
	/**
	 * 专家编号
	 */
	private String exportCode;
	/**
	 * 主键专家表ID
	 */
	private String exportID;
	/**
	 * 专家姓名
	 */
	private String exportName;
	/**
	 * 专家职务
	 */
	private String exportPost;
	/**
	 * 专家性别
	 */
	private String exportSex;
	/**
	 * 专家职称
	 */
	private String exportTitle;
	@Column(name = "EXPERTISE")
	public String getExpertise() {
		return expertise;
	}
	@Column(name = "EXPERT_AGE")
	public String getExportAge() {
		return exportAge;
	}
	@Column(name = "EXPERT_CODE")
	public String getExportCode() {
		return exportCode;
	}
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getExportID() {
		return exportID;
	}
	@Column(name = "EXPERT_NAME")
	public String getExportName() {
		return exportName;
	}
	@Column(name = "EXPERT_POST")
	public String getExportPost() {
		return exportPost;
	}
	@Column(name = "EXPERT_SEX")
	public String getExportSex() {
		return exportSex;
	}
	@Column(name = "EXPERT_TITLE")
	public String getExportTitle() {
		return exportTitle;
	}
	public void setExpertise(String expertise) {
		this.expertise = expertise;
	}
	public void setExportAge(String exportAge) {
		this.exportAge = exportAge;
	}
	public void setExportCode(String exportCode) {
		this.exportCode = exportCode;
	}
	public void setExportID(String exportID) {
		this.exportID = exportID;
	}
	public void setExportName(String exportName) {
		this.exportName = exportName;
	}
	public void setExportPost(String exportPost) {
		this.exportPost = exportPost;
	}
	public void setExportSex(String exportSex) {
		this.exportSex = exportSex;
	}
	public void setExportTitle(String exportTitle) {
		this.exportTitle = exportTitle;
	}
	 
}
