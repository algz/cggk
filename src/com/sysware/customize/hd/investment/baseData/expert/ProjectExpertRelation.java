package com.sysware.customize.hd.investment.baseData.expert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
@Entity
@Table(name="T_PROJECT_EXPERT_RELATION")
public class ProjectExpertRelation {
	/**
	 * 专家表ID
	 */
	private String exportID;
	/**
	 * 项目金额
	 */
	private String projectAmount;
	/**
	 * 项目编号
	 */
	private String projectCode;
	/**
	 * 主键ID
	 */
    private String  projectExportRelationId;
	/**
	 * 项目名称
	 */
	private String projectName;
	@Column(name = "EXPERT_ID")
	public String getExportID() {
		return exportID;
	}
	@Column(name = "PROJECT_AMOUNT")
	public String getProjectAmount() {
		return projectAmount;
	}
	@Column(name = "PROJECT_CODE")
	public String getProjectCode() {
		return projectCode;
	}
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	public String getProjectExportRelationId() {
		return projectExportRelationId;
	}
	@Column(name = "PROJECT_NAME")
	public String getProjectName() {
		return projectName;
	}
	public void setExportID(String exportID) {
		this.exportID = exportID;
	}
	public void setProjectAmount(String projectAmount) {
		this.projectAmount = projectAmount;
	}
	public void setProjectCode(String projectCode) {
		this.projectCode = projectCode;
	}
	public void setProjectExportRelationId(String projectExportRelationId) {
		this.projectExportRelationId = projectExportRelationId;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
}
