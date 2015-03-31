package com.sysware.customize.hd.investment.procurementExecute.tenderUnits;

import java.math.BigDecimal;

public class TenderUnitsVo {
	public String getConstructionUnderPoint() {
		return constructionUnderPoint;
	}
	public void setConstructionUnderPoint(String constructionUnderPoint) {
		this.constructionUnderPoint = constructionUnderPoint;
	}
	private String tenderUnitsID;// 主键
	private String tenderFileId;// 招标文件子表ID
	private String venderId;// 供应商ID
	private String price;//价格
	private String remark;//备注
	private String venderName;//供应商名称 
	private String venderCode;//供应商编号
	private String constructionUnderPoint;//承建下浮点
	public String getVenderCode() {
		return venderCode;
	}
	public void setVenderCode(String venderCode) {
		this.venderCode = venderCode;
	}
	private String businessScope;//经营范围
	private String address;//地址
	private int start;
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
	private int limit;
	public String getTenderUnitsID() {
		return tenderUnitsID;
	}
	public void setTenderUnitsID(String tenderUnitsID) {
		this.tenderUnitsID = tenderUnitsID;
	}
	public String getTenderFileId() {
		return tenderFileId;
	}
	public void setTenderFileId(String tenderFileId) {
		this.tenderFileId = tenderFileId;
	}
	public String getVenderId() {
		return venderId;
	}
	public void setVenderId(String venderId) {
		this.venderId = venderId;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getVenderName() {
		return venderName;
	}
	public void setVenderName(String venderName) {
		this.venderName = venderName;
	}
	public String getBusinessScope() {
		return businessScope;
	}
	public void setBusinessScope(String businessScope) {
		this.businessScope = businessScope;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
}
