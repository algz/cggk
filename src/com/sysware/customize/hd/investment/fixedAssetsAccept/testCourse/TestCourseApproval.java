package com.sysware.customize.hd.investment.fixedAssetsAccept.testCourse;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.common.approval.ApprovalObject;
import com.sysware.common.approval.IApprovalHandler;
import com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTask.AcceptTaskService;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;

/**
 * 验收过程的审批操作
 * @author zhoup
 * 2012-6-5 下午2:43:33
 *
 */
@Name("approval_TestCourse_Handler")
public class TestCourseApproval implements IApprovalHandler {

	@In(create=true,value="AcceptTaskServiceImpl")
	private AcceptTaskService service;
	
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
//		String[] id = approvalObject.getObjectID().split(",");
		if (approvalObject.getApprovalStatus() == 1L) {
			System.out.println("mmm:"+approvalObject.getObjectID()+"||"+approvalObject.getObjectID().substring(approvalObject.getObjectID().length()-1, approvalObject.getObjectID().length()));
			if(approvalObject.getObjectID().substring(approvalObject.getObjectID().length()-1, approvalObject.getObjectID().length())
					.equals("5"))
				service.updateAcceptTaskSatate(approvalObject.getObjectID().substring(0, approvalObject.getObjectID().length()-1), 6);
			else if(approvalObject.getObjectID().substring(approvalObject.getObjectID().length()-1, approvalObject.getObjectID().length())
					.equals("8"))
				service.updateAcceptTaskSatate(approvalObject.getObjectID().substring(0, approvalObject.getObjectID().length()-1), 9);
		} else {//审批意见为不同意执行将状态改为待审批
			if(approvalObject.getObjectID().substring(approvalObject.getObjectID().length()-1, approvalObject.getObjectID().length())
					.equals("5"))
				service.updateAcceptTaskSatate(approvalObject.getObjectID().substring(0, approvalObject.getObjectID().length()-1), 4);
			else if(approvalObject.getObjectID().substring(approvalObject.getObjectID().length()-1, approvalObject.getObjectID().length())
					.equals("8"))
				service.updateAcceptTaskSatate(approvalObject.getObjectID().substring(0, approvalObject.getObjectID().length()-1), 7);
		}
		return false;
	}

}
