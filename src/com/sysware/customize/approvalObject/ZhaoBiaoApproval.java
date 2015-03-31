package com.sysware.customize.approvalObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.common.approval.ApprovalObject;
import com.sysware.common.approval.IApprovalHandler;
import com.sysware.customize.hd.investment.approval.ApprovalInfoService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.ParityService;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;
@Name("approval_ZhaoBiao_Handler")
public class ZhaoBiaoApproval implements IApprovalHandler {
	@In(value="parityServiceImpl",create= true)
    ParityService parityService;
    @In(value="approvalInfoServiceImpl" ,create = true)
	 ApprovalInfoService approvalInfoServiceImpl;
    private int index = 0;
	
	public boolean onActivityBegin(ApprovalObject arg0) {
		if(index==1)
			return false;
		String parityID[] = arg0.getObjectID().split(",");
		for(String id : parityID)
		approvalInfoServiceImpl.save(arg0.getApprovalNote(),
				id, "同意");
		return false;

	}

	public boolean onActivityEnd(ApprovalObject arg0) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean onFlowBegin(ApprovalObject arg0) {
		index=1;
		return false;
	}

	public boolean onFlowEnd(ApprovalObject approvalObject)
			throws DataTypeDuplicateNameException {

		String parityID[] = approvalObject.getObjectID().split(",");
		//审批意见为同意执行将状态改为已审批
		if(approvalObject.getApprovalStatus().equals(1l))
			parityService.updateProperties(parityID, "4");
		else//审批意见为不同意执行将状态改为待审批
			parityService.updateProperties(parityID, "2");
		for(String id : parityID)
		approvalInfoServiceImpl.save(approvalObject.getApprovalNote(), id,approvalObject.getApprovalStatus() == 1L?"同意":"驳回");
		return false;

	}

}
