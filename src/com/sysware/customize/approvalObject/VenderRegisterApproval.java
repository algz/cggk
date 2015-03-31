package com.sysware.customize.approvalObject;
/**
 * 合同审批结束后，执行修改合同状态操作
 */
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.common.approval.ApprovalObject;
import com.sysware.common.approval.IApprovalHandler;
import com.sysware.customize.hd.investment.approval.ApprovalInfoService;
import com.sysware.customize.hd.investment.baseData.vendor.VendorRemote;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;

@Name("approval_VenderRegister_Handler")
public class VenderRegisterApproval implements IApprovalHandler {

	 @In(create = true, value = "vendor_VendorRemote")
		VendorRemote vendorService;
	 @In(value="approvalInfoServiceImpl" ,create = true)
	 ApprovalInfoService approvalInfoServiceImpl;
	 private int index = 0;
	 
		public boolean onActivityBegin(ApprovalObject arg0) {
			if(index==1)
				return false;
		String objectID[] = arg0.getObjectID().split(",");
		for(String id : objectID)
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
		String type = "1";
		if(approvalObject.getObjectID().split(",")!=null){
			type = approvalObject.getObjectID().split(",")[0].substring(approvalObject.getObjectID().split(",")[0].length()-1);
		}
		//审批意见为同意执行将送审状态改为已审批
		if (approvalObject.getApprovalStatus() == 1L) {
			vendorService.updateVendorStatus(approvalObject.getObjectID().split(","),type,'2');
		} else {//审批意见为不同意执行将送审状态改为编制中(待审批)
			vendorService.updateVendorStatus(approvalObject.getObjectID().split(","), type,'0');
		}
		String objectID[] = approvalObject.getObjectID().split(",");
		for(String id : objectID)
		approvalInfoServiceImpl.save(approvalObject.getApprovalNote(),id.substring(0,id.length()-1),approvalObject.getApprovalStatus() == 1L?"同意":"驳回");
		return false;
	}

}
