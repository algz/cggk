package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.baseData.vendor.VendorService;
import com.sysware.customize.hd.investment.general.exception.ReduplicatedException;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ContractPurchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ContractPurchaseService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContract;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContractService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.Parity;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.ParityService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetailService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ApplicationStatusEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.CodeTypeEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ContractApplicationStatusEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ContractCreateTypeEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.FileCodeGenerator;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.PurchaseTypeEnum;

@Name("purchaseServiceImpl")
public class PurchaseServiceImpl implements PurchaseService {
	@In(create = true)
	Identity identity;

	@In(create = true, value = "purchaseDaoImpl")
	private PurchaseDao purchaseDao;

	@In(create = true, value = "procurementDetail_ProcurementDetailServiceImpl")
	private ProcurementDetailService procurementDetailService;

	@In(create = true, value = "parityServiceImpl")
	private ParityService parityService;

	@In(create = true, value = "contract_ProcurementContractServiceImpl")
	private ProcurementContractService procurementContractService;

	@In(create = true, value = "contractPurchaseServiceImpl")
	private ContractPurchaseService contractPurchaseService;

	@In(create = true, value = "vendor_VendorServiceImpl")
	private VendorService vendorService;


	
	public List<PurchaseVo> getPurchaseListByCondition(
			PurchaseCondition purchaseCondition) {
		return purchaseDao.getPurchaseListByCondition(purchaseCondition);
	}

	public Long getCountByCondition(PurchaseCondition purchaseCondition) {
		return purchaseDao.getCountByCondition(purchaseCondition);
	}

	@Transactional
	public void saveOrUpdatePurchase(Purchase purchase) {
		if (purchase.getPurchaseId() == null) {
			purchaseDao.save(purchase);
		} else {
			purchaseDao.update(purchase);
		}

	}

	@Transactional
	public void deletePurchase(String[] ids) {
		for (String id : ids) {
			// 去掉清单的关联（将外键置空）
			procurementDetailService.removePurchaseRelation(id);
			// 删除清单大纲
			this.purchaseDao.remove(id);
		}
	}

	public Purchase getPurchaseById(String id) {
		return this.purchaseDao.get(id);
	}

	public int getPurchaseMaxCode(String purchaseType) {
		return this.purchaseDao.getPurchaseMaxCode(purchaseType);
	}

	@Transactional
	public void updateProperties(String[] purchaseID, String flag) {
		Purchase purchase = null;
		for (String purchaseId : purchaseID) {
			purchase = purchaseDao.get(purchaseId);
			purchase.setStatus(flag);
			purchaseDao.update(purchase);
		}
	}

	@SuppressWarnings("unchecked")
	@Transactional
	public String createParityContractDataByPurchaseId(String purchaseId) {
		
		
		String sql="SELECT {pd.*} from T_PROCUREMENTDETAIL pd where PD.PURCHASEID=:purchaseId";
		List<ProcurementDetail> pdList=purchaseDao.getHibernateSession().createSQLQuery(sql)
		                         .addEntity("pd",ProcurementDetail.class)
		                         .setParameter("purchaseId", purchaseId)
		                         .list();
		for(ProcurementDetail pd:pdList){
			if(pd.getPurchaseType()==null||pd.getPurchaseType().equals("")){
				return "请确定采购方式已选择!";
			}
		}
		
		// 1、更新指定ID的Purchase对象信息
		Purchase purchase = purchaseDao.get(purchaseId);
		
		purchase.setStatus(ApplicationStatusEnum.YI_SHENG_CHENG.getValue());// 设为已生成
		purchaseDao.update(purchase);

		// 2、处理指定ID的清单明细集合
		// 2.1、处理“比价”类数据
		processProcurementDetailsToParity(purchase, PurchaseTypeEnum.BI_JIA);
		// 2.2、处理“招投标”类数据
		processProcurementDetailsToParity(purchase, PurchaseTypeEnum.ZHAO_BIAO);
		// 2.3、处理“直接采购”类数据
		processProcurementDetailsToContract(purchase,PurchaseTypeEnum.ZHI_JIE_CAI_GOU);
		// 2.4、处理“协议采购”类数据
		processProcurementDetailsToParity(purchase, PurchaseTypeEnum.XIE_YI_CAI_GOU);
		// 2.5、处理“其它采购”类数据
		processProcurementDetailsToParity(purchase,PurchaseTypeEnum.QI_TA_CAI_GOU);
		return "";
	}
	
	@SuppressWarnings("unchecked")
	@Transactional
	public String createParityContractData(String[] ddIds, String purchaseId,String type) throws Exception{

		int maxCode = 0;
		for(int i = 0; i < ddIds.length; i++){
			
			ProcurementDetail pd = (ProcurementDetail)purchaseDao.getHibernateSession().get(ProcurementDetail.class, ddIds[i]);
			if(pd.getPurchaseType()==null||pd.getPurchaseType().equals("")){
				throw new Exception("采购方式没有选择!"); 
			}
			pd.setStatus("1");
			purchaseDao.getHibernateSession().update(pd);
			

			maxCode = parityService.getParityMaxCode(pd.getPurchaseType(), type);
			Parity parity = new Parity();
			parity.setApplicationStatus(ApplicationStatusEnum.DAI_SHEN_PI
					.getValue());
			parity.setCreateDate(new Date());
			parity.setMaterialId(pd.getMaterialId());
			parity.setType(pd.getPurchaseType());
			parity.setDeliveryDate(pd.getDeliveryDate());
			parity.setEditors(identity.getLoginUser().getUserid().toString());
			
			String oriCodeStr = FileCodeGenerator.getParityCode(
					ProcurementTypeEnum.getByValue(type),
					CodeTypeEnum.valueOf(PurchaseTypeEnum.getByValue(pd.getPurchaseType()).name()));
			String maxCodeStr = String.valueOf(maxCode++);
			String codeStr = oriCodeStr.substring(0,
					oriCodeStr.length() - maxCodeStr.length()).concat(
					maxCodeStr);
			parity.setParityCode(codeStr);

			parity.setPurchaseId(purchaseId);
			parity.setVendorId(pd.getVendorId());
			parity.setVendorName(pd.getVendorName());
			parity.setProcurementDetailId(pd.getProcurementDetailId());
			purchaseDao.getHibernateSession().save(parity);
			
		}
		return "";
	}

	@Transactional
	public String handlerPurchaseByCount(String purchaseId)throws Exception{
		String sql="SELECT count(1) from T_PROCUREMENTDETAIL pd " +
				"where PD.PURCHASEID='"+purchaseId+"' " +
				"and  (pd.status!='1' or pd.status is null)";
		int count = Integer.parseInt(purchaseDao.getHibernateSession().createSQLQuery(sql).uniqueResult().toString());
		if(count==0){
			Purchase purchase = purchaseDao.get(purchaseId);
			purchase.setStatus(ApplicationStatusEnum.YI_SHENG_CHENG.getValue());// 设为已生成
			purchaseDao.getHibernateSession().update(purchase);
		}
		return "";
	}
	/**
	 * 处理“比价”、“招投标”类数据
	 * 
	 * @param purchase
	 *            指定采购清单对象
	 * @param purchaseType
	 *            采购方式
	 */
	@Transactional
	private void processProcurementDetailsToParity(Purchase purchase,
			PurchaseTypeEnum purchaseType) {
		List<ProcurementDetail> procurementDetails = procurementDetailService
				.getByPurchaseIdAndType(purchase.getPurchaseId(), purchaseType);
		if (procurementDetails == null || procurementDetails.size() <= 0)
			return;
		String type = purchaseType.getValue();
		int maxCode = parityService.getParityMaxCode(type, purchase.getType());
		for (ProcurementDetail procurementDetail : procurementDetails) {
			Parity parity = new Parity();
			parity.setApplicationStatus(ApplicationStatusEnum.DAI_SHEN_PI
					.getValue());
			parity.setCreateDate(new Date());
			parity.setMaterialId(procurementDetail.getMaterialId());
			parity.setType(type);
			parity.setDeliveryDate(procurementDetail.getDeliveryDate());

			String oriCodeStr = FileCodeGenerator.getParityCode(
					ProcurementTypeEnum.getByValue(purchase.getType()),
					CodeTypeEnum.valueOf(purchaseType.name()));
			String maxCodeStr = String.valueOf(maxCode++);
			String codeStr = oriCodeStr.substring(0,
					oriCodeStr.length() - maxCodeStr.length()).concat(
					maxCodeStr);
			parity.setParityCode(codeStr);

			parity.setPurchaseId(purchase.getPurchaseId());
			parity.setVendorId(procurementDetail.getVendorId());
			parity.setVendorName(procurementDetail.getVendorName());
			parityService.saveParity(parity);

		}
	}

	/**
	 * 处理“直接生成合同”类数据
	 * 
	 * @param purchase
	 *            指定采购清单对象
	 */
	private void processProcurementDetailsToContract(Purchase purchase,PurchaseTypeEnum purchaseType) {
		List<ProcurementDetail> procurementDetails = procurementDetailService
				.getByPurchaseIdAndType(purchase.getPurchaseId(),
						purchaseType);
		if (procurementDetails == null || procurementDetails.size() <= 0)
			return;
		int maxCode = procurementContractService.getContractMaxCode(purchase
				.getType());
		HashMap<String,String> vendorMap = new HashMap<String,String>();
		for (ProcurementDetail procurementDetail : procurementDetails) {
			if(vendorMap.get(procurementDetail.getVendorId())!=null){
				continue;
			}
			vendorMap.put(procurementDetail.getVendorId(), procurementDetail.getVendorId());
			ProcurementContract contract = new ProcurementContract();
			contract.setApplicationStatus(ContractApplicationStatusEnum.BIAN_ZHI_ZHONG
					.getValue());

			String oriCodeStr = FileCodeGenerator
					.getContractCode(ProcurementTypeEnum.getByValue(purchase
							.getType()),CodeTypeEnum.valueOf(purchaseType.name()));
			String maxCodeStr = String.valueOf(maxCode++);
			String codeStr = oriCodeStr.substring(0,
					oriCodeStr.length() - maxCodeStr.length()).concat(
					maxCodeStr);
			contract.setAuditCode(codeStr);// 合同审签编号

			contract.setCreateDate(new Date());
			contract.setCreateType(purchaseType
					.getValue());// 直接生成
			contract.setEditors(identity.getLoginUser().getUserid().toString());
			contract.setMaterialType(purchase.getMaterialTypeName());
			contract.setVendor(procurementDetail.getVendorId());
			contract.setContractAmount(procurementDetailService.getSumContractAmount(purchase.getPurchaseId(),procurementDetail
					.getVendorId(),""));
			Vendor vendor = vendorService.getVendorById(procurementDetail
					.getVendorId());
			if (vendor != null) {
				contract.setVendName(vendor.getVendorName());
			}

			try {
				procurementContractService.saveContract(contract);
			} catch (ReduplicatedException e) {
				e.printStackTrace();
			}

			// 维护中间表
			List<String> materialIds = procurementDetailService
					.getMaterialIdsByPurchaseIdAndVendorId(
							purchase.getPurchaseId(),
							procurementDetail.getVendorId(),purchaseType.getValue());
			for (int k = 0; k < materialIds.size(); k++) {
				ContractPurchase contractPurchase = new ContractPurchase();
				contractPurchase.setProcurementContractId(contract
						.getProcurementContractId());
				contractPurchase.setPurchaseId(purchase.getPurchaseId());
				contractPurchase.setMaterialId(materialIds.get(k));
				contractPurchaseService.saveContractPurchase(contractPurchase);
			}

		}
	}

	public List<PurchaseVo> getPurchaseOfAnnualPlan(PurchaseVo purchaseVo) {
		return this.purchaseDao.getPurchaseOfAnnualPlan(purchaseVo);
	}

}
