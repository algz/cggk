package com.sysware.customize.hd.investment.baseData.materialQuota;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "T_MATERIALQUOTARECORD")
public class MaterialQuotaRecord implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6271308234090956493L;
	
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@GeneratedValue(generator="myGuidGenerator")
	@GenericGenerator(name="myGuidGenerator",strategy="com.sysware.util.MyHibernateGuidGenerator")
	private String id;
	
	@Column(name = "EDITREASON")
	private String editreason;
	
	@Column(name = "EDITTIME")
	private Date edittime;
	
	@Column(name = "EDITPERSON")
	private String editperson;

	@ManyToOne(targetEntity = MaterialQuota.class)
	@JoinColumn(name = "MID")
	private MaterialQuota materialQuota;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEditreason() {
		return editreason;
	}

	public void setEditreason(String editreason) {
		this.editreason = editreason;
	}

	public Date getEdittime() {
		return edittime;
	}

	public void setEdittime(Date edittime) {
		this.edittime = edittime;
	}

	public String getEditperson() {
		return editperson;
	}

	public void setEditperson(String editperson) {
		this.editperson = editperson;
	}

	public MaterialQuota getMaterialQuota() {
		return materialQuota;
	}

	public void setMaterialQuota(MaterialQuota materialQuota) {
		this.materialQuota = materialQuota;
	}
}
