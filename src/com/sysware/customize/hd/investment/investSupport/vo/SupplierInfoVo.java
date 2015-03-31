package com.sysware.customize.hd.investment.investSupport.vo;

import com.sysware.customize.hd.investment.baseData.vendor.Vendor;

/**
 * @ClassName: SupplierInfoVo
 * @Description: 供应商 VO类
 * 
 * @author LIT
 * @date Nov 24, 2011 11:39:38 AM
 * 
 */

public class SupplierInfoVo extends Vendor {

	private String vendorAppraisalId;//考核表主键
	
	private String score; // 来自供应商考核模块 取平均值
	private String contact; // 来自供应商联系人模块
	private Integer start;
	private Integer limit;
	private Integer count;

	private String status;
	
	private String startDate;
	private String endDate;
	
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

	public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getVendorAppraisalId() {
		return vendorAppraisalId;
	}

	public void setVendorAppraisalId(String vendorAppraisalId) {
		this.vendorAppraisalId = vendorAppraisalId;
	}
	
	

}
