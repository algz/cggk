package com.sysware.customize.approvalObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.common.approval.ApprovalObject;
import com.sysware.common.approval.IApprovalHandler;
import com.sysware.customize.hd.investment.approval.ApprovalInfoService;
import com.sysware.customize.hd.investment.purchaseRequest.PEplan.PEplanService;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;

@Name("approval_CivilRepairPlan_Handler")
public class CivilRepairPlanApproval implements IApprovalHandler{
	@In(value="approvalInfoServiceImpl" ,create = true)
	 ApprovalInfoService approvalInfoServiceImpl;
	
	@In(value = "pePlanServiceImpl" ,create = true)
	PEplanService pePlanServiceImpl;
	
	private int index = 0;
	public boolean onActivityBegin(ApprovalObject arg0) {
		if(index==1)
			return false;
		String[] objIds = arg0.getObjectID().split(",");
		for(String id : objIds)
		approvalInfoServiceImpl.save(arg0.getApprovalNote(),
				id, "同意");
		return false;
	}

	public boolean onActivityEnd(ApprovalObject arg0) {
		
		return false;
	}

	public boolean onFlowBegin(ApprovalObject approvalObject) {
		index = 1;
		String[] objIds = approvalObject.getObjectID().split(",");
		for(String id : objIds){
//			更新审批状态为审批中
			pePlanServiceImpl.updateApprovalState(id,"6","civilRepairPlan");
		}
		return false;
	}

	public boolean onFlowEnd(ApprovalObject approvalObject)
			throws DataTypeDuplicateNameException {
		String[] objIds = approvalObject.getObjectID().split(",");
		String type = "1";
		
		//审批意见为同意执行将送审状态改为已审批
		if (approvalObject.getApprovalStatus() == 1L) {
			type="7";
		} else {//审批意见为不同意执行将送审状态改为编制中(待审批)
			type="-5";
		}
		
		for(String id : objIds){
			pePlanServiceImpl.updateApprovalState(id,type,"civilRepairPlan");
			approvalInfoServiceImpl.save(approvalObject.getApprovalNote(), id,approvalObject.getApprovalStatus() == 1L?"同意":"驳回");
		}
			return false;
	}
}
