package com.sysware.customize.approvalObject;
/**
 * 采购计划审批结束后，执行修改采购计划状态操作
 */
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.sysware.common.approval.ApprovalObject;
import com.sysware.common.approval.IApprovalHandler;
import com.sysware.customize.hd.investment.approval.ApprovalInfoService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.Purchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.PurchaseService;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;
@Name("approval_ProductionProcess_Handler")
public class ProductionProcessApproval implements IApprovalHandler {

	@In(value="purchaseServiceImpl",create = true)
	PurchaseService purchaseServiceImpl;
	@In(value="approvalInfoServiceImpl" ,create = true)
	 ApprovalInfoService approvalInfoServiceImpl;
	private int index = 0;
	public boolean onActivityBegin(ApprovalObject arg0) {
		if(index==1)
			return false;
		String purchaseID[] = arg0.getObjectID().split(",");
		for(String id : purchaseID)
		approvalInfoServiceImpl.save(arg0.getApprovalNote(),
				id, "同意");
		return false;
	}

	public boolean onActivityEnd(ApprovalObject arg0) {
		
		return false;
	}

	
	public boolean onFlowBegin(ApprovalObject arg0) {
		index = 1;
		 //获取当前登录用户信息
		CommonDAO<Object> dao  = (CommonDAO)Component.getInstance("common_CommonDAO",true);
		String sql="update t_purchase set status='2' where purchaseid='"+arg0.getObjectID()+"'";
		dao.getHibernateSession().createSQLQuery(sql).executeUpdate();
		return false;
	}

	public boolean onFlowEnd(ApprovalObject approvalObject)
			throws DataTypeDuplicateNameException {
		
 
		String purchaseID[] = approvalObject.getObjectID().split(",");
		//审批意见为不同意执行将状态改为待审批
		if(approvalObject.getApprovalStatus().equals(1l))
			purchaseServiceImpl.updateProperties(purchaseID, "3");
		else	//审批意见为不同意执行将状态改为待审批
			purchaseServiceImpl.updateProperties(purchaseID, "1");
		for(String id : purchaseID)
		approvalInfoServiceImpl.save(approvalObject.getApprovalNote(), id,approvalObject.getApprovalStatus() == 1L?"同意":"驳回");
		return false;
	}

}
