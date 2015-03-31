package com.sysware.customize.approvalObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.common.approval.ApprovalObject;
import com.sysware.common.approval.IApprovalHandler;
import com.sysware.customize.hd.investment.approval.ApprovalInfoService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.ProcurementService;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;
@Name("approval_procurement_Handler")
public class ProcurementApproval implements IApprovalHandler {
	@In(value="procurement_ProcurementServiceImpl",create = true)
	ProcurementService procurement_ProcurementServiceImpl;
	@In(value="approvalInfoServiceImpl" ,create = true)
	 ApprovalInfoService approvalInfoServiceImpl;
	private int index = 0;
	public boolean onActivityBegin(ApprovalObject arg0) {
		if(index==1)
			return false;
		String[] procurementIds = arg0.getObjectID().split(",");
		for(String id : procurementIds)
		approvalInfoServiceImpl.save(arg0.getApprovalNote(),
				id, "同意");
		return false;
	}

	public boolean onActivityEnd(ApprovalObject arg0) {
		
		return false;
	}

	public boolean onFlowBegin(ApprovalObject arg0) {
		index = 1;
		return false;
	}

	public boolean onFlowEnd(ApprovalObject approvalObject)
			throws DataTypeDuplicateNameException {
		
		String[] procurementIds = approvalObject.getObjectID().split(",");
		procurement_ProcurementServiceImpl.batchUpdateProcurementsFlag(procurementIds);
		for(String id : procurementIds)
			approvalInfoServiceImpl.save(approvalObject.getApprovalNote(), id,approvalObject.getApprovalStatus() == 1L?"同意":"驳回");
		return false;
	}

}
