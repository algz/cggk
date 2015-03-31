package com.sysware.customize.hd.investment.baseData.vendor;

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
@Table(name="T_VENDERASSESS")
public class VenderAssess {

	@Id
	@GeneratedValue(generator = "myGuidGenerator")
	@GenericGenerator(name = "myGuidGenerator", strategy = "com.sysware.util.MyHibernateGuidGenerator")
	@Column(unique = true, nullable = false)
	private String id;
	
	@Column(name = "ASSESSNUM")
	private String assessNum;//考核单编号
	
	@Column(name = "ASSESSNAME")
	private String assessName;//考核单名称
	
	@Column(name = "ASSESSTYPE")
	private int assessType;//考核单产品类型
	
	@Column(name = "EDITOR")
	private String editor;//考核单制表人
	
	@Temporal(TemporalType.DATE)
	@Column(name = "EDITDATE")
	private Date editDate;//考核单制表时间 

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAssessNum() {
		return assessNum;
	}

	public void setAssessNum(String assessNum) {
		this.assessNum = assessNum;
	}

	public String getAssessName() {
		return assessName;
	}

	public void setAssessName(String assessName) {
		this.assessName = assessName;
	}

	public int getAssessType() {
		return assessType;
	}

	public void setAssessType(int assessType) {
		this.assessType = assessType;
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

	
}
