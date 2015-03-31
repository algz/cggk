package com.sysware.customize.approvalObject;
/**
 * 合同审批结束后，执行修改合同状态操作
 */
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.common.approval.ApprovalObject;
import com.sysware.common.approval.IApprovalHandler;
import com.sysware.customize.hd.investment.approval.ApprovalInfoService;
import com.sysware.customize.hd.investment.procurementExecute.tenderFile.TenderFileService;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;

@Name("approval_TenderFile_Handler")
public class TenderFileApproval implements IApprovalHandler {

	@In(create = true, value = "tenderFileServiceImpl")
	private TenderFileService tenderFileServiceImpl;
	@In(value="approvalInfoServiceImpl" ,create = true)
	 ApprovalInfoService approvalInfoServiceImpl;
	private int index = 0;
	public boolean onActivityBegin(ApprovalObject arg0) {
		if(index==1)
			return false;
		String objectid[] = arg0.getObjectID().split(",");
		for(String id : objectid)
		approvalInfoServiceImpl.save(arg0.getApprovalNote(),
				 id.substring(0,id.length()-1), "同意");
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
		String objectid[] = approvalObject.getObjectID().split(",");
		//审批意见为同意执行将状态改为已审批
		if (approvalObject.getApprovalStatus() == 1L) {
			tenderFileServiceImpl.updateStatus(objectid, "3","1");
		} else {//审批意见为不同意执行将状态改为待审批
			tenderFileServiceImpl.updateStatus(objectid, "1","1");
		}
		
		for(String id : objectid)
		approvalInfoServiceImpl.save(approvalObject.getApprovalNote(), id.substring(0,id.length()-1),approvalObject.getApprovalStatus() == 1L?"同意":"驳回");
		return false;
	}

}
