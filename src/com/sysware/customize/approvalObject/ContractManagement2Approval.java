package com.sysware.customize.approvalObject;

import java.util.Date;

import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.common.approval.ApprovalObject;
import com.sysware.common.approval.IApprovalHandler;
import com.sysware.customize.hd.investment.approval.ApprovalInfoService;
import com.sysware.customize.hd.investment.deviceProject.contractManagement.DeviceContractmanagement;
import com.sysware.customize.hd.investment.deviceProject.contractManagement.DeviceContractmanagementDAO;
import com.sysware.customize.hd.investment.engineeringProject.contractManagement.EngineeringProjectServiceImpl;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;


@Name("approval_ContractManagement2_Handler")
public class ContractManagement2Approval implements IApprovalHandler{

	@In(value="approvalInfoServiceImpl" ,create = true)
	ApprovalInfoService approvalInfoServiceImpl;
	
	
	//自己注入一个类来处理流程
	@In(value="engineeringProject_EngineeringProjectServiceImpl",create = true)
	EngineeringProjectServiceImpl engineeringProjectServiceImpl;
	
	
	
	
	
	private int index = 0;
	/**
	 * 活动开始 (模板不需要处理)
	 */
	public boolean onActivityBegin(ApprovalObject approvalObject) {
		if (index == 1)
			return false;
		String[] objIds = approvalObject.getObjectID().split(",");
		for (String id : objIds)
			approvalInfoServiceImpl.save(approvalObject.getApprovalNote(), id, "同意");
		return false;
	}

	
	
	/**
	 * 活动结束 (模板不需要处理)
	 */
	public boolean onActivityEnd(ApprovalObject approvalObject) {
		return false;
	}

	
	
	/**
	 * 流程开始 (部分需要修改)
	 */
	public boolean onFlowBegin(ApprovalObject approvalObject) {
//		index = 1;
//		String[] objIds = approvalObject.getObjectID().split(",");
//		for(String id : objIds){
//			//自己表的处理业务
//			//更新审批状态 状态(1编制中,2审批中,3已审批) 
//			engineeringProjectServiceImpl.updateApprovalState(id,"2");
//			//peDeclareServiceImpl.updateApprovalState(id,"2","CivilRegist");
//		}
//		return false;
		
		
		index=1;
		String[] objectID = approvalObject.getObjectID().split(",");
		//处理审批结果
		DeviceContractmanagementDAO dao=(DeviceContractmanagementDAO) Component.getInstance("deviceContractmanagementDAOImp");
		for(String id : objectID){
			DeviceContractmanagement dc=(DeviceContractmanagement)dao.getHibernateSession().get(DeviceContractmanagement.class, id);
			dc.setStatus("2");//待审批
			dc.setApprovaltime(new Date());
		}
		return false;
		
	}

	
	/**
	 * 流程结束 (部分需要修改)
	 * 归档时调用的方法
	 */
	public boolean onFlowEnd(ApprovalObject approvalObject)throws DataTypeDuplicateNameException {
//		String[] objIds = approvalObject.getObjectID().split(",");
//		String type = "1";
//		
//		//审批意见为同意执行将送审状态改为已审批
//		if (approvalObject.getApprovalStatus() == 1L) {
//			type="3";
//		} else {//审批意见为不同意执行将送审状态改为编制中(待审批)
//			type="1";
//		}
//		
//		for(String id : objIds){
//			//自己表的处理业务
//			//更新审批状态 状态(1编制中,2审批中,3已审批) 
//			engineeringProjectServiceImpl.updateApprovalState(id,type);
//			
//			//模板代码不需要修改
//			approvalInfoServiceImpl.save(approvalObject.getApprovalNote(), id,approvalObject.getApprovalStatus() == 1L?"同意":"驳回");
//		}
//		
//		return false;
		
		
		String[] objectID = approvalObject.getObjectID().split(",");
		String type = "1";
		
		//审批意见为同意执行将送审状态改为已审批
		if (approvalObject.getApprovalStatus() == 1L) {
			type="3";
		} else {//审批意见为不同意执行将送审状态改为编制中(待审批)
			type="-1";
		}
		//处理审批结果
		DeviceContractmanagementDAO dao=(DeviceContractmanagementDAO) Component.getInstance("deviceContractmanagementDAOImp");
		for(String id : objectID){
			DeviceContractmanagement dc=(DeviceContractmanagement)dao.getHibernateSession().get(DeviceContractmanagement.class, id);
			dc.setStatus(type);//已审批
			//记录审批意见
			approvalInfoServiceImpl.save(approvalObject.getApprovalNote(),id,approvalObject.getApprovalStatus() == 1L?"同意":"驳回");
		}
		
		return false;
		
	}

}
