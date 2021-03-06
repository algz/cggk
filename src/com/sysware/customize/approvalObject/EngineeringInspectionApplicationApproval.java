package com.sysware.customize.approvalObject;

import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.common.approval.ApprovalObject;
import com.sysware.common.approval.IApprovalHandler;
import com.sysware.customize.hd.investment.approval.ApprovalInfoService;
import com.sysware.customize.hd.investment.engineeringProject.inspectionApplication.InspectionApplication;
import com.sysware.customize.hd.investment.engineeringProject.inspectionApplication.InspectionApplicationDAO;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;

@Name("approval_EngineeringInspectionApplication_Handler")
public class EngineeringInspectionApplicationApproval implements IApprovalHandler {
	
	@In(value="approvalInfoServiceImpl" ,create = true)
	 ApprovalInfoService approvalInfoServiceImpl;
	private int index = 0;
	public boolean onActivityBegin(ApprovalObject arg0) {
		if(index==1) return false;
		String objects[] = arg0.getObjectID().split(",");
		for(String id : objects){ 
			approvalInfoServiceImpl.save(arg0.getApprovalNote(),id, "同意");
		}
		return false;
	}

	public boolean onActivityEnd(ApprovalObject arg0) {
		return false;
	}

	public boolean onFlowBegin(ApprovalObject approvalObject) {
		index=1;
		String[] objectID = approvalObject.getObjectID().split(",");
		//处理审批结果
		InspectionApplicationDAO dao=(InspectionApplicationDAO) Component.getInstance("engineeringInspectionApplicationDAOImp");
		for(String id : objectID){
			InspectionApplication dc=(InspectionApplication)dao.getHibernateSession().get(InspectionApplication.class, id);
			dc.setStatus("2");//待审批
//			dc.setApprovaltime(new Date());
		}
		return false;
	}

	public boolean onFlowEnd(ApprovalObject approvalObject)throws DataTypeDuplicateNameException {
		
		String[] objectID = approvalObject.getObjectID().split(",");
		String type = "1";
		
		//审批意见为同意执行将送审状态改为已审批
		if (approvalObject.getApprovalStatus() == 1L) {
			type="3";
		} else {//审批意见为不同意执行将送审状态改为编制中(待审批)
			type="-1";//-1已退回
		}
		//处理审批结果
		InspectionApplicationDAO dao=(InspectionApplicationDAO) Component.getInstance("engineeringInspectionApplicationDAOImp");
		for(String id : objectID){
			InspectionApplication dc=(InspectionApplication)dao.getHibernateSession().get(InspectionApplication.class, id);
			dc.setStatus(type);//已审批
			//记录审批意见
			approvalInfoServiceImpl.save(approvalObject.getApprovalNote(),id,approvalObject.getApprovalStatus() == 1L?"同意":"驳回");
		}
		return false;
	}

}
