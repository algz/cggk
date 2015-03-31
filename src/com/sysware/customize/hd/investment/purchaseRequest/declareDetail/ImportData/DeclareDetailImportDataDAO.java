package com.sysware.customize.hd.investment.purchaseRequest.declareDetail.ImportData;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContract;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.Purchase;
import com.sysware.customize.hd.investment.purchaseRequest.declareDetail.DeclareDetail;
import com.sysware.customize.hd.investment.purchaseRequest.declarePlan.DeclarePlan;
import com.sysware.customize.hd.investment.purchaseRequest.declarePlan.DeclarePlanDetil;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.ProcurementPlan;

public interface DeclareDetailImportDataDAO {

	public CommonDAO<Object> getDao();
	/**
	 * 导入需求登记
	 * @param declareId
	 * @param createtime
	 * @param userid
	 * @param departmentid
	 * @param importData
	 * @return
	 * @throws Exception
	 */
	List<DeclareDetail> DeclareDetailImport(String userid,String departmentid)throws Exception;

	/**
	 * 导入申报计划
	 * @param declarePlanid
	 * @param declareDetailList
	 * @param declarePlanDetilList
	 * @param userid
	 * @param createtime
	 * @return
	 */
	List<DeclarePlanDetil> DeclarePlanImport(List<DeclareDetail> declareDetailList,String declarePlanName,String userid);
	
	/**
	 * 导入采购计划
	 * @param procurementPlanid
	 * @param procurementid
	 * @param declareDetailList
	 * @param declarePlanDetilList
	 * @param purchase
	 * @param importType
	 * @param vendorid
	 * @param userid
	 * @param departmentid
	 * @param cal
	 * @return
	 */
	List<ProcurementDetail> ProcurementPlanImport(List<DeclarePlanDetil> declarePlanDetilList,String importType, Vendor vendor);
	
	/**
	 * 采购合同导入
	 * @param plancodeList 所有采购计划编号
	 * @param vendorid 供应商ID
	 * @param vendorname 供应商名称
	 * @param userid 导入人
	 */
	ProcurementContract procurementContractImport (List<ProcurementDetail> procurementDetailList,Vendor vendor,String userid);

}
