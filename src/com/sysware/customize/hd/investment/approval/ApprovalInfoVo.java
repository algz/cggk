package com.sysware.customize.hd.investment.approval;
 
public class ApprovalInfoVo {
	private String approvalInfoId;//主键
	private String userId;//审批人
	private String userName;//审批人
	private String status;
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	private String content;//审批意见
	private String objectId;//审批信息Id
	private String approvalDate;//审批时间
	private int start;
	private int limit;
	public String getApprovalInfoId() {
		return approvalInfoId;
	}
	public void setApprovalInfoId(String approvalInfoId) {
		this.approvalInfoId = approvalInfoId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getObjectId() {
		return objectId;
	}
	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}
	public String getApprovalDate() {
		return approvalDate;
	}
	public void setApprovalDate(String approvalDate) {
		this.approvalDate = approvalDate;
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
}
