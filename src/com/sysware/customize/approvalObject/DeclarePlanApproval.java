package com.sysware.customize.approvalObject;
/**
 * 比价审批结束后，执行修改比价状态操作
 */
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.common.approval.ApprovalObject;
import com.sysware.common.approval.IApprovalHandler;
import com.sysware.customize.hd.investment.approval.ApprovalInfoService;
import com.sysware.customize.hd.investment.purchaseRequest.declarePlan.DeclarePlanService;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;
@Name("approval_DeclarePlan_Handler")
public class DeclarePlanApproval implements IApprovalHandler {
    @In(value="declarePlan_DeclarePlanServiceImpl",create= true)
    DeclarePlanService declarePlanService;
    @In(value="approvalInfoServiceImpl" ,create = true)
	 ApprovalInfoService approvalInfoServiceImpl;
	private int index = 0;
	public boolean onActivityBegin(ApprovalObject arg0) {
		if(index==1)
			return false;
		String declarePlanDetilID[] = arg0.getObjectID().split(",");
		for(String id : declarePlanDetilID)
		approvalInfoServiceImpl.save(arg0.getApprovalNote(),
				id, "同意");
		return false;
	}

	public boolean onActivityEnd(ApprovalObject arg0) {
		
		return false;
	}

	public boolean onFlowBegin(ApprovalObject arg0) {
		index=1;
		return false;
	}

	public boolean onFlowEnd(ApprovalObject approvalObject)
			throws DataTypeDuplicateNameException {
		
		String declarePlanDetilID[] = approvalObject.getObjectID().split(",");
		//审批意见为同意执行将状态改为已审批
		if(approvalObject.getApprovalStatus().equals(1l))
			declarePlanService.updateProperties(declarePlanDetilID, "4");
		else//审批意见为不同意执行将状态改为待审批
			declarePlanService.updateProperties(declarePlanDetilID, "1");
		for(String id : declarePlanDetilID)
		approvalInfoServiceImpl.save(approvalObject.getApprovalNote(),id,approvalObject.getApprovalStatus() == 1L?"同意":"驳回");
		return false;
	}

}
