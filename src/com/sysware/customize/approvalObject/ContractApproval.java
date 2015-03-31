package com.sysware.customize.approvalObject;

/**
 * 合同审批结束后，执行修改合同状态操作
 */
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.common.approval.ApprovalObject;
import com.sysware.common.approval.IApprovalHandler;
import com.sysware.customize.hd.investment.approval.ApprovalInfoService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContractService;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;

@Name("approval_Contract_Handler")
public class ContractApproval implements IApprovalHandler {

	@In(create = true, value = "contract_ProcurementContractServiceImpl")
	private ProcurementContractService contractService;
	@In(value = "approvalInfoServiceImpl", create = true)
	ApprovalInfoService approvalInfoServiceImpl;
	private int index = 0;
	public boolean onActivityBegin(ApprovalObject arg0) {
		if(index==1)
			return false;
		String[] contractIds = arg0.getObjectID().split(",");
		for(String contractId : contractIds)
		approvalInfoServiceImpl.save(arg0.getApprovalNote(),
				contractId, "同意");
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
		String[] contractIds = approvalObject.getObjectID().split(",");
		// 审批意见为同意执行将状态改为已审批
		if (approvalObject.getApprovalStatus() == 1L) {
			contractService.batchUpdateContract(contractIds, true);
		} else {// 审批意见为不同意执行将状态改为待审批
			contractService.batchUpdateContract(contractIds, false);
		}
		for(String contractId : contractIds)
		approvalInfoServiceImpl.save(approvalObject.getApprovalNote(),
				contractId, approvalObject
						.getApprovalStatus() == 1L ? "同意" : "驳回");
		return false;
	}

}
