package com.sysware.customize.hd.investment.investSupport.vo;

import com.sysware.customize.hd.investment.procurementExecute.contract.entity.Contract;

/**
 * @ClassName: ContractInfoVo
 * @Description: 合同资讯 VO类
 * 
 * @author LIT
 * @date Nov 24, 2011 11:39:23 AM
 * 
 */

public class ContractInfoVo extends Contract {

    private String projectid;	//项目ID
    private String projectnum;  //项目编号
    private String projectname; //项目名称
    
	private String paymentdetailid; //支付详情ID
    
	private Integer start;
	private Integer limit;
	private Integer count;
	
	private String score;
	private String contact;
	private String createTime;
    private String createType;
	
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

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public String getProjectid() {
		return projectid;
	}
	public void setProjectid(String projectid) {
		this.projectid = projectid;
	}
	public String getPaymentdetailid() {
		return paymentdetailid;
	}
	public void setPaymentdetailid(String paymentdetailid) {
		this.paymentdetailid = paymentdetailid;
	}
	public String getProjectnum() {
		return projectnum;
	}
	public void setProjectnum(String projectnum) {
		this.projectnum = projectnum;
	}
	public String getProjectname() {
		return projectname;
	}
	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}
	public String getCreateType() {
		return createType;
	}
	public void setCreateType(String createType) {
		this.createType = createType;
	}

	
	
}
