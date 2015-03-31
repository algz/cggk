package com.sysware.customize.hd.investment.investSupport.vo;

import com.sysware.customize.hd.investment.investSupport.entity.Buyer;

/**
 * @ClassName: BuyerVo 
 * @Description: 采购员信息 VO 类
 * 
 * @author LIT
 * @date Nov 24, 2011 11:39:04 AM
 * 
 */

public class BuyerVo extends Buyer{
	
	private Integer start;
	private Integer limit;
	private Integer totalcount;
	
	private String startDate;
	private String endDate;
	private String creater;

	
	
	public Integer getTotalcount() {
		return totalcount;
	}

	public void setTotalcount(Integer totalcount) {
		this.totalcount = totalcount;
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

	public String getCreater() {
		return creater;
	}

	public void setCreater(String creater) {
		this.creater = creater;
	}
	
	
}
