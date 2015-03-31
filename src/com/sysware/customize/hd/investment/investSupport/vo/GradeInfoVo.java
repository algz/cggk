package com.sysware.customize.hd.investment.investSupport.vo;

/**
 * @ClassName: GradeInfoVo
 * @Description: 供应商信息 中  最近考核记录 模块的 VO类
 * 
 * @author LIT
 * @date Nov 25, 2011 3:58:54 PM
 * 
 */

public class GradeInfoVo {
	private String id;
	private String vendorCode;
	private String vendorName;
	private String scale;
	private String businessScope;
	private String gradeDept1;
	private String gradeDept2;
	private String gradeDept3;
	private String avgGrade;
	private String theDate;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getVendorCode() {
		return vendorCode;
	}

	public void setVendorCode(String vendorCode) {
		this.vendorCode = vendorCode;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getScale() {
		return scale;
	}

	public void setScale(String scale) {
		this.scale = scale;
	}

	public String getBusinessScope() {
		return businessScope;
	}

	public void setBusinessScope(String businessScope) {
		this.businessScope = businessScope;
	}

	public String getGradeDept1() {
		return gradeDept1;
	}

	public void setGradeDept1(String gradeDept1) {
		this.gradeDept1 = gradeDept1;
	}

	public String getGradeDept2() {
		return gradeDept2;
	}

	public void setGradeDept2(String gradeDept2) {
		this.gradeDept2 = gradeDept2;
	}

	public String getGradeDept3() {
		return gradeDept3;
	}

	public void setGradeDept3(String gradeDept3) {
		this.gradeDept3 = gradeDept3;
	}

	public String getAvgGrade() {
		return avgGrade;
	}

	public void setAvgGrade(String avgGrade) {
		this.avgGrade = avgGrade;
	}

	public String getTheDate() {
		return theDate;
	}

	public void setTheDate(String theDate) {
		this.theDate = theDate;
	}

}
