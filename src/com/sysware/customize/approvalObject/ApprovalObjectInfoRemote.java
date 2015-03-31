package com.sysware.customize.approvalObject;
/**
 * 获取送审对象列表
 * approvalObjectInfo 审批对象
 * @author zhaodw
 */
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Synchronized;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.baseData.vendor.VendorService;
import com.sysware.customize.hd.investment.deviceProject.contractManagement.DeviceContractmanagement;
import com.sysware.customize.hd.investment.deviceProject.contractManagement.DeviceContractmanagementDAOImp;
import com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTask.AcceptTask;
import com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTask.AcceptTaskService;
import com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.groupPaymentTask.GroupPaymentTask;
import com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.groupPaymentTask.GroupPaymentTaskService;
import com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.stockPaymentTask.StockPaymentTask;
import com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.stockPaymentTask.StockPaymentTaskService;
import com.sysware.customize.hd.investment.procurementExecute.contract.ContractService;
import com.sysware.customize.hd.investment.procurementExecute.contract.entity.Contract;
import com.sysware.customize.hd.investment.procurementExecute.tenderFile.TenderFile;
import com.sysware.customize.hd.investment.procurementExecute.tenderFile.TenderFileService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContract;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContractService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.Parity;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.ParityService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.Procurement;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.ProcurementService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.Purchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.PurchaseService;
import com.sysware.customize.hd.investment.purchaseRequest.declare.DeclareDao;
import com.sysware.customize.hd.investment.purchaseRequest.declarePlan.DeclarePlan;
import com.sysware.customize.hd.investment.purchaseRequest.declarePlan.DeclarePlanService;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.StockplanService;

@Synchronized
@Name("ApprovalObjectInfoRemote")
public class ApprovalObjectInfoRemote {
	@In(value="procurement_ProcurementServiceImpl",create = true)
		ProcurementService procurement_ProcurementServiceImpl;
	@In(value="purchaseServiceImpl",create = true)
		PurchaseService purchaseServiceImpl;
	@In(value="parityServiceImpl", create = true)
		ParityService parityServiceImpl;
	@In(value="contract_ProcurementContractServiceImpl", create = true)
		ProcurementContractService contract_ProcurementContractServiceImpl; 
	@In(value="stockPlan_ServiceImpl",create= true)
	   StockplanService stockplanService;
    @In(value="declarePlan_DeclarePlanServiceImpl",create= true)
	   DeclarePlanService declarePlanService;
    @In(value="tenderFileServiceImpl",create = true)
       TenderFileService tenderFileService;
    @In(create = true, value = "Contract_ServiceImpl")
	ContractService _Service;
    @In(create = true, value = "vendor_VendorServiceImpl")
	VendorService vendorService;
    
    @In(create=true,value="AcceptTaskServiceImpl")
    private AcceptTaskService acceptTaskService;
    
    @In(create=true,value="GroupPaymentTaskServiceImpl")
	private GroupPaymentTaskService groupPaymentTaskService;
	
	@In(create=true,value="StockPaymentTaskServiceImpl")
	private StockPaymentTaskService stockPaymentTaskService;
	///零星需求审批
	@WebRemote
	public String getprocurementInfo(ApprovalObjectInfo approvalObjectInfo){ 
		Procurement  pt = procurement_ProcurementServiceImpl.findProcurementById(approvalObjectInfo.getObjectID());
		if(pt!=null){ 
			return "{success:true,objectTypeName:'零星需求审批',objectName:'"+pt.getProcurementCode()+"'}";
		}else
			return "[]";
	}
	//采购计划审批
	public String getProductionProcessInfo(ApprovalObjectInfo approvalObjectInfo){ 
		Purchase  p = purchaseServiceImpl.getPurchaseById(approvalObjectInfo.getObjectID());
		if(p!=null){ 
			return "{success:true,objectTypeName:'采购计划审批',objectName:'"+p.getPurchaseCode()+"'}";
		}else
			return "[]";
	}
	//采购比价审批
	public String getParityAuditInfo(ApprovalObjectInfo approvalObjectInfo){
		Parity  pt = parityServiceImpl.getParityById(approvalObjectInfo.getObjectID());
		if(pt!=null){ 
		return "{success:true,objectTypeName:'采购比价审批',objectName:'"+pt.getParityCode()+"'}";
		}else
			return "[]";
	}
	//采购招标审批
	public String getZhaoBiaoInfo(ApprovalObjectInfo approvalObjectInfo){
		Parity  pt = parityServiceImpl.getParityById(approvalObjectInfo.getObjectID());
		if(pt!=null){ 
			return "{success:true,objectTypeName:'采购招投标审批',objectName:'"+pt.getParityCode()+"'}";
		}else
			return "[]";
	}
	/**
	 * 直接采购审批
	 * @param approvalObjectInfo
	 * @return
	 */
	public String getOtherPurchaseAuditInfo(ApprovalObjectInfo approvalObjectInfo){
		Parity  pt = parityServiceImpl.getParityById(approvalObjectInfo.getObjectID());
		if(pt!=null){ 
			return "{success:true,objectTypeName:'直接采购审批',objectName:'"+pt.getParityCode()+"'}";
		}else
			return "[]";
	}
	
	//协议采购审批
	public String getAgreementPurchaseAuditInfo(ApprovalObjectInfo approvalObjectInfo){
		Parity  pt = parityServiceImpl.getParityById(approvalObjectInfo.getObjectID());
		if(pt!=null){ 
		return "{success:true,objectTypeName:'协议采购审批',objectName:'"+pt.getParityCode()+"'}";
		}else
			return "[]";
	}
	//采购合同审批
	public String getContractInfo(ApprovalObjectInfo approvalObjectInfo){
		ProcurementContract  pc = contract_ProcurementContractServiceImpl.getContractById(approvalObjectInfo.getObjectID());
		if(pc!=null){ 
			return "{success:true,objectTypeName:'采购合同审批',objectName:'"+pc.getContractCode()+"'}";
		}else
			return "[]";
	}
	//采购计划审批
	public String getProcurementPlanInfo(ApprovalObjectInfo approvalObjectInfo){
//		String  ProcurementPlanCode = stockplanService.getProcurementPlanInfo(approvalObjectInfo.getObjectID().substring(0,approvalObjectInfo.getObjectID().length()-1));
		String  ProcurementPlanCode = stockplanService.getProcurementPlanInfo(approvalObjectInfo.getObjectID());
		if(ProcurementPlanCode!=null){ 
			return "{success:true,objectTypeName:'采购计划审批',objectName:'"+ProcurementPlanCode+"'}";
		}else
			return "[]";
	}
	//申报计划审批
	public String getDeclarePlanInfo(ApprovalObjectInfo approvalObjectInfo){
		DeclarePlan declarePlan = declarePlanService.getDeclarePlan(approvalObjectInfo.getObjectID());
		if(declarePlan!=null){ 
			return "{success:true,objectTypeName:'申报计划审批',objectName:'"+declarePlan.getDeclareplanCode()+"'}";
		}else
			return "[]";
	}
	//招标审批
	public String getTenderFileInfo(ApprovalObjectInfo approvalObjectInfo){
		TenderFile tenderFile = tenderFileService.getTenderFileByTendFileId(approvalObjectInfo.getObjectID().substring(0,approvalObjectInfo.getObjectID().length()-1));
		String name = "";
		if(tenderFile.getTenderFileType().equals("3"))
			name = "招标文件审批";
		else if(tenderFile.getTenderFileType().equals("8"))
			name = "定向委托审批";
		else if(tenderFile.getTenderFileType().equals("9"))
			name = "委托招标审批";
		else if(tenderFile.getTenderFileType().equals("10"))
			name = "比价审批";
		else if(tenderFile.getTenderFileType().equals("7"))
			name = "谈判记录审批";
		else if(tenderFile.getTenderFileType().equals("5"))
			name = "招标评审";
		else if(tenderFile.getTenderFileType().equals("6"))
			name = "招标通知审批";
		else if(tenderFile.getTenderFileType().equals("1"))
			name = "委托审签";
		else if(tenderFile.getTenderFileType().equals("2"))
			name = "委托文件审批";
		else if(tenderFile.getTenderFileType().equals("4"))
			name = "招标管理审批";
		if(tenderFile!=null){ 
			return "{success:true,objectTypeName:'"+name+"',objectName:'"+tenderFile.getTenderFileCode()+"'}";
		}else
			return "[]";
	}
	//固定资产合同审批
	public String getCivilengineerinContractInfo(ApprovalObjectInfo approvalObjectInfo){
		Contract contract = _Service.getContract(approvalObjectInfo.getObjectID().substring(0,approvalObjectInfo.getObjectID().length()-1));
		String name = ""; 
		if(contract!=null){ 
			return "{success:true,objectTypeName:'合同审批',objectName:'"+contract.getContractCode()+"'}";
		}else
			return "[]";
	}
	//供应商初选登记
	public String getVenderRegisterInfo(ApprovalObjectInfo approvalObjectInfo){
		Vendor vendor = vendorService.getVendorById(approvalObjectInfo.getObjectID().substring(0,approvalObjectInfo.getObjectID().length()-1));
		if(vendor!=null){ 
			return "{success:true,objectTypeName:'供应商初选登记审批',objectName:'"+vendor.getVendorCode()+"'}";
		}else
			return "[]";
	}
	//供应商评价考核
	public String getVenderEvaluationInfo(ApprovalObjectInfo approvalObjectInfo){
		Vendor vendor = vendorService.getVendorById(approvalObjectInfo.getObjectID().substring(0,approvalObjectInfo.getObjectID().length()-1));
		if(vendor!=null){ 
			return "{success:true,objectTypeName:'供应商评价考核审批',objectName:'"+vendor.getVendorCode()+"'}";
		}else
			return "[]";
	}
	
	//验收任务管理的验收过程
	public String getTestCourseInfo(ApprovalObjectInfo approvalObjectInfo){
		AcceptTask acceptTask = acceptTaskService.getOneAcceptTask(approvalObjectInfo.getObjectID().substring(0,approvalObjectInfo.getObjectID().length()-1));
		if(acceptTask!=null){ 
			return "{success:true,objectTypeName:'“验收任务管理”中“验收过程”审批',objectName:'"+acceptTask.getAcceptId()+"'}";
		}else
			return "[]";
	}
	
	//验收任务管理的验收过程
	public String getPaymentTaskInfo(ApprovalObjectInfo approvalObjectInfo){
		String flag = "";
		String result = approvalObjectInfo.getObjectID().substring(approvalObjectInfo.getObjectID().length()-1,approvalObjectInfo.getObjectID().length());
		if(result.equals("1")){
			StockPaymentTask stockPaymentTask = stockPaymentTaskService.getStockPaymentTask(approvalObjectInfo.getObjectID().substring(0,approvalObjectInfo.getObjectID().length()-1));
			if(stockPaymentTask!=null){ 
				flag = "{success:true,objectTypeName:'股份公司支付列表审批',objectName:'"+stockPaymentTask.getPsId()+"'}";
			}else
				flag = "[]";
		}else if(result.equals("2")){
			GroupPaymentTask groupPaymentTask = groupPaymentTaskService.getGroupPaymentTask(approvalObjectInfo.getObjectID().substring(0,approvalObjectInfo.getObjectID().length()-1));
			if(groupPaymentTask!=null){ 
				flag = "{success:true,objectTypeName:'集团公司支付列表审批',objectName:'"+groupPaymentTask.getPgId()+"'}";
			}else
				flag = "[]";
		}
		return flag;
	}
	
	//申报需求登记审批流程
	public String getRegistrationDeclarationInfo (ApprovalObjectInfo approvalObjectInfo){
        if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'需求登记项目费用审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//申报需求登记审批流程
	public String getRegistrationDeclaration2Info (ApprovalObjectInfo approvalObjectInfo){
        if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'需求登记自有费用审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//设备项目合同审批(股份)
	public String getDeviceContractmanagementInfo (ApprovalObjectInfo approvalObjectInfo){
		DeviceContractmanagementDAOImp dao=(DeviceContractmanagementDAOImp)Component.getInstance("deviceContractmanagementDAOImp");
		String objectName=((DeviceContractmanagement)dao.getHibernateSession().get(DeviceContractmanagement.class, approvalObjectInfo.getObjectID())).getContractcode();
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'设备项目合同审批(股份)',objectName:'"+objectName+"'}";
        }else
			return "[]";
	}
	
	//设备项目合同审批(集团)
	public String getDeviceContractmanagementGroupInfo (ApprovalObjectInfo approvalObjectInfo){
		DeviceContractmanagementDAOImp dao=(DeviceContractmanagementDAOImp)Component.getInstance("deviceContractmanagementDAOImp");
		String objectName=((DeviceContractmanagement)dao.getHibernateSession().get(DeviceContractmanagement.class, approvalObjectInfo.getObjectID())).getContractcode();
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'设备项目合同审批(集团)',objectName:'"+objectName+"'}";
        }else
			return "[]";
	}
	
	//土建登记申报审批
	public String getCivilRegistInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'土建登记申报审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//土建大修申报审批
	public String getCivilRepairInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'土建大修申报审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	//设备登记申报审批
	public String getEquipRegistInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'设备登记申报审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//设备大修申报审批
	public String getEquipRepairInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'设备大修申报审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//土建项目明细审批
	public String getCivilDetailsInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'土建项目明细审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//设备项目计划审批
	public String getEquipPlanInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'设备项目计划审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//土建大修项目明细(股份、集团)审批
	public String getCivilRepairSummaryInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'土建大修项目明细审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	//设备大修项目明细(股份、集团)审批
	public String getEquipRepairSummaryInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'设备大修项目明细审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	//土建采购计划审批
	public String getCivilPurchasePlanInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'土建采购计划审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	//设备采购计划审批
	public String getEquipPurchasePlanInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'设备采购计划审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//工程项目执行管理-采购合同管理审批(股份)
	public String getContractManagement2Info (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'工程项目合同管理审批(股份)',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//工程项目执行管理-采购合同管理审批(集团)
	public String getContractManagementGroup2Info (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'工程项目合同管理审批(集团)',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//工程项目执行管理-采购合同管理审批(集团)
	public String getEngineeringInspectionApplicationInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'工程项目合同管理审批(集团)',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//320专项计划审批
	public String getSpecialProjectInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'320专项计划审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//工程项目执行管理审批
	public String getExecutiveManagement2Info (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'工程项目执行管理审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	//投资预算汇总审批
	public String getStockSummaryInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'投资预算汇总审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//土建大修计划审批
	public String getCivilRepairPlanInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'土建大修计划审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	//设备大修计划审批
	public String getEquipRepairPlanInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'设备大修计划审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//设备大修执行计划审批
	public String getEquipServiceExecutePlanInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'设备大修执行计划审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
	
	//土建大修执行计划审批
	public String getCivilServiceExecutePlanInfo (ApprovalObjectInfo approvalObjectInfo){
		if(approvalObjectInfo.getObjectID()!=null){ 
        	return "{success:true,objectTypeName:'土建大修执行计划审批',objectName:'"+approvalObjectInfo.getObjectID()+"'}";
        }else
			return "[]";
	}
}
