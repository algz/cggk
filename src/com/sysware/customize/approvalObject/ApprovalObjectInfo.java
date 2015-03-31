package com.sysware.customize.approvalObject;
/**
 * 送审的对象信息
 * @author zhaodw
 * @since 2011-8-31 下午05:04:08
 */
public class ApprovalObjectInfo {
	private String objectID;//送审的对象ID
	private String objectTypeName;//送审的对象类型
	private String objectName;//送审的对象名称
	public String getObjectTypeName() {
		return objectTypeName;
	} 
	public void setObjectTypeName(String objectTypeName) {
		this.objectTypeName = objectTypeName;
	}
	public String getObjectName() {
		return objectName;
	}
	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}
	public String getObjectID() {
		return objectID;
	}
	public void setObjectID(String objectID) {
		this.objectID = objectID;
	}
}
