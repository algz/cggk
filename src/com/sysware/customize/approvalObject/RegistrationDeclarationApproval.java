package com.sysware.customize.approvalObject;
/**
 * 需求登记审批流程
 * 
 */
import net.sf.json.JSONArray;

import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.common.approval.ApprovalObject;
import com.sysware.common.approval.IApprovalHandler;
import com.sysware.customize.hd.investment.approval.ApprovalInfoService;
import com.sysware.customize.hd.investment.purchaseRequest.declare.Declare;
import com.sysware.customize.hd.investment.purchaseRequest.declare.DeclareDao;
import com.sysware.customize.hd.investment.purchaseRequest.declare.DeclareServiceImpl;
import com.sysware.customize.hd.investment.purchaseRequest.declareDetail.DeclareDetailDao;
import com.sysware.edm.dynamicmodel.DataTypeDuplicateNameException;
@Name("approval_RegistrationDeclaration_Handler")
public class RegistrationDeclarationApproval implements IApprovalHandler {
	
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

	public boolean onFlowBegin(ApprovalObject arg0) {
		index=1;
		//获取组件对象: Component.getInstance("组件名称");
		DeclareServiceImpl service=(DeclareServiceImpl) Component.getInstance("declare_DeclareServiceImpl");
		String[] objectID=arg0.getObjectID().split(",");
		service.batchUpdateDeclares(objectID);
		return false;
	}

	public boolean onFlowEnd(ApprovalObject approvalObject)throws DataTypeDuplicateNameException {
		
		String[] objectID = approvalObject.getObjectID().split(",");

		//处理审批结果
		DeclareDao dao=(DeclareDao) Component.getInstance("declare_DeclareDaoImpl");
		DeclareDetailDao dddao=(DeclareDetailDao) Component.getInstance("declareDetail_DeclareDetailDaoImpl");
		
		for(String id : objectID){
			Declare declare=(Declare)dao.getHibernateSession().get(Declare.class, id);
			//审批意见为同意执行将送审状态改为已审批
			if (approvalObject.getApprovalStatus() == 1L) {
				declare.setStatus("3");//已审批
				//是否成功通过申报，0未提交，1已提交，2未通过，3通过;0->2/3->1
				dddao.batchUpdateByDeclareId(id, "1");
			} else {//审批意见为不同意执行将送审状态改为编制中(待审批)
				declare.setStatus("1");//编制中
				//是否成功通过申报，0未提交，1已提交，2未通过，3通过;0->2/3->1
				dddao.batchUpdateByDeclareId(id, "0");
			}
			
			
			//记录审批意见
			approvalInfoServiceImpl.save(approvalObject.getApprovalNote(),id,approvalObject.getApprovalStatus() == 1L?"同意":"驳回");
		}
		
		return false;

	}

}
