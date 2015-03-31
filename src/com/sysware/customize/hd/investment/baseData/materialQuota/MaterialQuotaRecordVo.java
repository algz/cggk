package com.sysware.customize.hd.investment.baseData.materialQuota;

import java.util.Date;

public class MaterialQuotaRecordVo {

	private String editreason;

	private String mqid;

	private String QJDE;
	
	private String edittime;
	
	private String editperson;
	
	private Integer start;
	
	private Integer limit;
	
	private Integer count;


	public String getEdittime() {
		return edittime;
	}

	public void setEdittime(String edittime) {
		this.edittime = edittime;
	}

	public String getEditperson() {
		return editperson;
	}

	public void setEditperson(String editperson) {
		this.editperson = editperson;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getEditreason() {
		return editreason;
	}

	public void setEditreason(String editreason) {
		this.editreason = editreason;
	}

	public String getMqid() {
		return mqid;
	}

	public void setMqid(String mqid) {
		this.mqid = mqid;
	}

	public String getQJDE() {
		return QJDE;
	}

	public void setQJDE(String qJDE) {
		QJDE = qJDE;
	}

}
