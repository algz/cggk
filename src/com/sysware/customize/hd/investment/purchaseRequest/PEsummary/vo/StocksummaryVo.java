package com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo;

import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity.Stocksummary;

public class StocksummaryVo extends Stocksummary {
	private Integer start;
	private Integer limit;
	private Integer count;
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
}
