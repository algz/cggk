package com.sysware.customize.hd.investment.baseData.vendorQualification;

import java.util.Date;

public class VendorQualificationVo {
	private String id; // 主键
	private String name;// 名称
	private String license;// 证书编号
	private String deadline;// 期限
	private String issuingauthority;// 发证机关
	private String note;// 备注
	private String content;//内容
	private String vendorId;//供应商Id
	private String startDate;//起始时间
	private String endDate;//结束时间
	
	
	
	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	private int start;
	private int limit;
	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public String getVendorId() {
		return vendorId;
	}

	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLicense() {
		return license;
	}

	public void setLicense(String license) {
		this.license = license;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public String getIssuingauthority() {
		return issuingauthority;
	}

	public void setIssuingauthority(String issuingauthority) {
		this.issuingauthority = issuingauthority;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}
}
