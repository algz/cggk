package com.sysware.customize.approvalObject;
/**
 * 比价审批结束后，执行修改比价状态操作
 */
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.sysware.common.approval.ApprovalObject;
import com.sysware.common.approval.IApprovalHandler; 
import com.sysware.customize.hd.investment.approval.ApprovalInfoService;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.StockplanService;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;
@Name("approval_ProcurementPlan_Handler")
public class ProcurementPlanApproval implements IApprovalHandler {
    @In(value="stockPlan_ServiceImpl",create= true)
    StockplanService stockplanService;
    @In(value="approvalInfoServiceImpl" ,create = true)
	 ApprovalInfoService approvalInfoServiceImpl;
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> _dao;
    
    private int index = 0;
	public boolean onActivityBegin(ApprovalObject arg0) {
		if(index==1)
			return false;
		String parityID[] = arg0.getObjectID().split(",");
		for(String id : parityID)
		approvalInfoServiceImpl.save(arg0.getApprovalNote(),id, "同意");
		return false;
	}

	public boolean onActivityEnd(ApprovalObject arg0) {
		
		return false;
	}

	public boolean onFlowBegin(ApprovalObject arg0) {
		index = 1;
		String parityID[] = arg0.getObjectID().split(",");
		for(String id : parityID){
			String sql="update t_procurementplan t set t.senddate=sysdate "+
			           "where t.procurementplan_id='"+id+"'";
			_dao.getHibernateSession().createSQLQuery(sql).executeUpdate();
		}
		return false;
	}

	public boolean onFlowEnd(ApprovalObject approvalObject)
			throws DataTypeDuplicateNameException {
		
		String parityID[] = approvalObject.getObjectID().split(",");
		//审批意见为同意执行将状态改为已审批
		if(approvalObject.getApprovalStatus().equals(1l))
			stockplanService.updateProperties(parityID, "3");
		else//审批意见为不同意执行将状态改为待审批
			stockplanService.updateProperties(parityID, "1");
		for(String id : parityID)
		approvalInfoServiceImpl.save(approvalObject.getApprovalNote(), id,approvalObject.getApprovalStatus() == 1L?"同意":"驳回");
		return false;
	}

}
