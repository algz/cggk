package com.sysware.customize.approvalObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.common.approval.ApprovalObject;
import com.sysware.common.approval.IApprovalHandler;
import com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.groupPaymentTask.GroupPaymentTaskService;
import com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.stockPaymentTask.StockPaymentTaskService;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;

@Name("approval_PaymentTask_Handler")
public class PaymentTaskApproval implements IApprovalHandler {

	@In(create=true,value="GroupPaymentTaskServiceImpl")
	private GroupPaymentTaskService gService;
	
	@In(create=true,value="StockPaymentTaskServiceImpl")
	private StockPaymentTaskService sService;
	
	public boolean onActivityBegin(ApprovalObject arg0) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean onActivityEnd(ApprovalObject arg0) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean onFlowBegin(ApprovalObject arg0) {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean onFlowEnd(ApprovalObject approvalObject)
			throws DataTypeDuplicateNameException {
		//审批意见为同意执行将状态改为已审批
		String[] id = approvalObject.getObjectID().split(",");
		String gIds="";
		String sIds="";
		for (String str : id) {
			if(str.substring(str.length()-1, str.length()).equals("1"))
				sIds = sIds + ",\'" + str.substring(0, str.length()-1)+"\'";
			else if(str.substring(str.length()-1, str.length()).equals("2"))
				gIds = gIds + ",\'" + str.substring(0, str.length()-1)+"\'";
		}
		if (approvalObject.getApprovalStatus() == 1L) {
			if(sIds != ""&&sIds!=null)
				sService.updateState(sIds.substring(1), 3);
			if(gIds != ""&&gIds != null)
				gService.updateState(gIds.substring(1), 3);
		} else {//审批意见为不同意执行将状态改为待审批
			if(sIds != ""&&sIds!=null)
				sService.updateState(sIds.substring(1), 1);
			if(gIds != ""&&gIds != null)
				gService.updateState(gIds.substring(1), 1);
		}
		return false;
	}

}
