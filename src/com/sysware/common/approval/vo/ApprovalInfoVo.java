package com.sysware.common.approval.vo;

import com.sysware.common.approval.ApprovalComment;

/**
 * 审批信息相关类
 * 
 * @author master
 * 
 */
public class ApprovalInfoVo extends ApprovalComment {
	private static final long serialVersionUID = 8977489942497211312L;

	private String flowInstanceName;// 流程实例名称
	private String activityInstanceName;// 审批活动名称
	private String examinerTypeName;// 审批人类型名称（1负责人，2参与人）
	private String approvalStatusName;// 审批状态名称。
										// -1表示未进入审批状态。0表示审批未通过，1表示审批通过。默认值为-1。
	private String approvalTimeString;// 审批时间
	private String examinerName;// 审批人名称
	private String departmentName;// 部门名称
	private String stepAndApprovalName;// 分组排序使用——适用于审批记录
	private String acceptTime; // 接收时间

	public String getFlowInstanceName() {
		return flowInstanceName;
	}

	public void setFlowInstanceName(String flowInstanceName) {
		this.flowInstanceName = flowInstanceName;
	}

	public String getActivityInstanceName() {
		return activityInstanceName;
	}

	public void setActivityInstanceName(String activityInstanceName) {
		this.activityInstanceName = activityInstanceName;
	}

	public String getExaminerTypeName() {
		return examinerTypeName;
	}

	public void setExaminerTypeName(String examinerTypeName) {
		this.examinerTypeName = examinerTypeName;
	}

	public String getApprovalStatusName() {
		return approvalStatusName;
	}

	public void setApprovalStatusName(String approvalStatusName) {
		this.approvalStatusName = approvalStatusName;
	}

	public String getApprovalTimeString() {
		return approvalTimeString;
	}

	public void setApprovalTimeString(String approvalTimeString) {
		this.approvalTimeString = approvalTimeString;
	}

	public String getExaminerName() {
		return examinerName;
	}

	public void setExaminerName(String examinerName) {
		this.examinerName = examinerName;
	}

	public String getStepAndApprovalName() {
		return stepAndApprovalName;
	}

	public void setStepAndApprovalName(String stepAndApprovalName) {
		this.stepAndApprovalName = stepAndApprovalName;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getAcceptTime() {
		return acceptTime;
	}

	public void setAcceptTime(String acceptTime) {
		this.acceptTime = acceptTime;
	}
}
