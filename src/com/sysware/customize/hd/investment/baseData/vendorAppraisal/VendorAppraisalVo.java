package com.sysware.customize.hd.investment.baseData.vendorAppraisal;

import java.math.BigDecimal;
import java.util.Date;

public class VendorAppraisalVo {
	/**
	 * 主键ID
	 */
	private String vendorAppraisalId;
	/**
	 * 考核表名称
	 */
	private String appraisalName;
	/**
	 * 考核表编号：系统自动生成，规则待定
	 */
	private String appraisalNo;
	/**
	 * 供应商ID
	 */
	private String vendorID;
	/**
	 * 分值
	 */
	private String appraisalScore;
	/**
	 * 考核状态：0未考核，1考核中，2已通过
	 */
	private String appraisalStatus;
	/**
	 * 创建人Id
	 */
	private String creater;
	/**
	 * 创建人名称
	 */
	private String createName;
	/**
	 * 创建时间
	 */
	private String createDate;
	/**
	 * 单位编号
	 */
	private String departmentCode;

	/**
	 * 单位Id
	 */
	private String departmentId;
	/**
	 * 单位名称
	 */
	private String departmentName;
	/**
	 * 上级单位
	 */
	private String parent;
	/**
	 * 电话
	 */
	private String phone;

	/**
	 * 主键ID
	 */
	private String appraisalDetailId;
	/**
	 * 考核主键Id
	 */
	private String score;
	/**
	 * 评分部门ID
	 */
	private String appraisalDeptId;
	/**
	 * 评分人
	 */
	private String appraisaler;

	/**
	 * 评分人名
	 */
	private String appraisaleName;

	/**
	 * 评论人个数 非持久化
	 */
	private String amount;
	

	/**
	 * 考核并提取意见的人,考官.
	 */
	private String examiner;
	
	/**
	 * 修改意见
	 */
	private String appraisalComment;
	

	
	/**
	 * 经营范围
	 */
	private String businessScope;
	/**
	 * 供应商编号
	 */
	private String vendorCode;
	/**
	 * 供应商名称
	 */
	private String vendorName;
	/**
	 * 登陆用户Id
	 */
	private String LoginId;
	
	private String isExaminer;//0:评分;1意见提交
	
	
	
	public String getIsExaminer() {
		return isExaminer;
	}

	public void setIsExaminer(String isExaminer) {
		this.isExaminer = isExaminer;
	}

	public String getLoginId() {
		return LoginId;
	}

	public void setLoginId(String loginId) {
		LoginId = loginId;
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

	public String getBusinessScope() {
		return businessScope;
	}

	public void setBusinessScope(String businessScope) {
		this.businessScope = businessScope;
	}

	public String getScale() {
		return scale;
	}

	public void setScale(String scale) {
		this.scale = scale;
	}

	/**
	 * 规模
	 */
	private String scale;
	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getAppraisaleName() {
		return appraisaleName;
	}

	public void setAppraisaleName(String appraisaleName) {
		this.appraisaleName = appraisaleName;
	}

	/**
	 * 评分时间
	 */
	private String appraisalDate;

	public String getAppraisalDetailId() {
		return appraisalDetailId;
	}

	public void setAppraisalDetailId(String appraisalDetailId) {
		this.appraisalDetailId = appraisalDetailId;
	}

	public String getScore() {
		return score;
	}

	public void setScore(String score) {
		this.score = score;
	}

	public String getAppraisalDeptId() {
		return appraisalDeptId;
	}

	public void setAppraisalDeptId(String appraisalDeptId) {
		this.appraisalDeptId = appraisalDeptId;
	}

	public String getAppraisaler() {
		return appraisaler;
	}

	public void setAppraisaler(String appraisaler) {
		this.appraisaler = appraisaler;
	}

	public String getAppraisalDate() {
		return appraisalDate;
	}

	public void setAppraisalDate(String appraisalDate) {
		this.appraisalDate = appraisalDate;
	}

	private int start;
	private int limit;

	public String getDepartmentCode() {
		return departmentCode;
	}

	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}

	public String getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

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

	public String getCreater() {
		return creater;
	}

	public void setCreater(String creater) {
		this.creater = creater;
	}

	public String getCreateName() {
		return createName;
	}

	public void setCreateName(String createName) {
		this.createName = createName;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getVendorAppraisalId() {
		return vendorAppraisalId;
	}

	public void setVendorAppraisalId(String vendorAppraisalId) {
		this.vendorAppraisalId = vendorAppraisalId;
	}

	public String getAppraisalName() {
		return appraisalName;
	}

	public void setAppraisalName(String appraisalName) {
		this.appraisalName = appraisalName;
	}

	public String getAppraisalNo() {
		return appraisalNo;
	}

	public void setAppraisalNo(String appraisalNo) {
		this.appraisalNo = appraisalNo;
	}

	public String getVendorID() {
		return vendorID;
	}

	public void setVendorID(String vendorID) {
		this.vendorID = vendorID;
	}

	public String getAppraisalScore() {
		return appraisalScore;
	}

	public void setAppraisalScore(String appraisalScore) {
		this.appraisalScore = appraisalScore;
	}

	public String getAppraisalStatus() {
		return appraisalStatus;
	}

	public void setAppraisalStatus(String appraisalStatus) {
		this.appraisalStatus = appraisalStatus;
	}

	public String getAppraisalComment() {
		return appraisalComment;
	}

	public void setAppraisalComment(String appraisalComment) {
		this.appraisalComment = appraisalComment;
	}

	
	
	public String getExaminer() {
		return examiner;
	}

	public void setExaminer(String examiner) {
		this.examiner = examiner;
	}

}
