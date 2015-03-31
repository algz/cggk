package com.sysware.customize.hd.investment.productionMaterialsManagement.tenderSuppliers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ContractPurchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContract;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContractService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetailService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.Purchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.PurchaseService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.CodeTypeEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ContractApplicationStatusEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ContractCreateTypeEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.FileCodeGenerator;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ParityApplicationStatusEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.PurchaseTypeEnum;

@Name("tenderSuppliersServiceImpl")
public class TenderSuppliersServiceImpl implements TenderSuppliersService {
	@In(create = true)
	Identity identity;

	@In(create = true, value = "tenderSuppliersDaoImpl")
	private TenderSuppliersDao dao;

	public List<TenderSuppliers> getTenderSuppliersGridData(
			TenderSuppliersVo vo) {
		// TODO Auto-generated method stub
		return dao.getTenderSuppliersGridData(vo);
	}

	public String saveTenderSuppliers(TenderSuppliersVo vo) {
		// TODO Auto-generated method stub
		return dao.saveTenderSuppliers(vo);
	}

	public String deleteTenderSuppliers(TenderSuppliersVo vo) {
		// TODO Auto-generated method stub
		return dao.deleteTenderSuppliers(vo);
	}

	public List<Vendor> filterAllVendor(TenderSuppliersVo vo) {
		// TODO Auto-generated method stub
		return dao.filterAllVendor(vo);
	}

//	public Parity saveParity(Parity parity) {
//		return parityDao.save(parity);
//	}
//
//	public List<Parity> getParityListByCondition(ParityCondition parityCondition) {
//		return parityDao.getParityListByCondition(parityCondition);
//	}
//
//	public Long getCountByCondition(ParityCondition parityCondition) {
//		return parityDao.getCountByCondition(parityCondition);
//	}
//
//	/**
//	 * 比价、招投标指定供应商
//	 * 
//	 * @param parityId 比价、招投标清单ID
//	 * @param vendorId 供应商ID
//	 * @param vendorName 供应商名称
//	 *  @param price 供应商报价
//	 * 
//	 */
//	@Transactional
//	public void assignVendorToParity(String parityId, String vendorId, String vendorName,String price) {
//		String userId = identity.getLoginUser().getUserid().toString();// 用户id
//		Parity parity = parityDao.get(parityId);
//		parity.setVendorId(vendorId);
//		parity.setVendorName(vendorName);
//		if (parity.getType().equals(PurchaseTypeEnum.ZHAO_BIAO.getValue())) {
//			parity.setApplicationStatus(ParityApplicationStatusEnum.DAI_SHENG_CHENG_HE_TONG
//					.getValue());
//		}
//		parity.setEditors(userId);
//		parity.setPrice(new BigDecimal(price));
//		parityDao.update(parity);
//		List<ProcurementDetail> procurementDetailList = procurementDetailService
//				.getProcurementDetailByParity(parity);
//		for (ProcurementDetail procurementDetail : procurementDetailList) {
//			procurementDetail.setVendorId(vendorId);
//			procurementDetailService.saveOrUpdateProcurementDetail(procurementDetail);
//		}
//	}
//
//	@Transactional
//	public void updateParity(Parity parity) {
//		parityDao.update(parity);
//	}
//
//	@Transactional
//	public void updateProperties(String[] parityIDs, String flag) {
//		Parity parity = null;
//		for (String parityId : parityIDs) {
//			parity = parityDao.get(parityId);
//			parity.setApplicationStatus(flag);
//			parityDao.update(parity);
//		}
//	}
//
//	@Transactional
//	public int getParityMaxCode(String purchaseType, String procurementType) {
//		return parityDao.getParityMaxCode(purchaseType, procurementType);
//	}
//
//	@Transactional
//	public void generateContractFromParities(List<Parity> parities) {
//		// 将同一供应商、同一采购清单和同一采购方式的处理成一个合同
//		List<String> tempStringList = new ArrayList<String>();
//		// 对相同采购方式的合同进行过滤
//		Map<String, Parity> tempMap = new HashMap<String, Parity>();
//		Map<String,BigDecimal> amout = new HashMap<String,BigDecimal>();
//		for (Parity parity : parities) {
//			// 将参与比较的属性拼成tempString
//			//清单大纲id@中标供应商@编制人
//			String tempString = parity.getPurchaseId() + "@" + parity.getVendorId() + "@"
//					+ parity.getEditors();
//			if (tempMap.get(tempString) == null) {
//				parity.getMaterialIdsList().add(parity.getMaterialId());
//				tempMap.put(tempString, parity);
//			    amout.put(tempString+"amout", parityDao.getAmout(parity.getParityId(),parity.getVendorId()));
//				tempStringList.add(tempString);
//			} else {
//				// 如果tempMap中的key值已包含‘tempString’
//				tempMap.get(tempString).getMaterialIdsList().add(parity.getMaterialId());
//				BigDecimal decimal=amout.get(tempString+"amout").add(parityDao.getAmout(parity.getParityId(),parity.getVendorId()));
//				amout.put(tempString+"amout", decimal);
//			}
//			parity.setApplicationStatus(ParityApplicationStatusEnum.YI_SHENG_CHENG.getValue());
//			this.updateParity(parity);
//
//		}
//		// 采购招标，比价生成合同，maxCode为采购清单序号的当前最大值
//		Integer maxCode = null;
//		for (int i = 0; i < tempStringList.size(); i++) {
//			Parity parity = tempMap.get(tempStringList.get(i));
//			// 获得采购清单
//			Purchase purchase = purchaseService.getPurchaseById(parity.getPurchaseId());
//			ProcurementContract contract = new ProcurementContract();			
//			// 生成合同审签单编号
//			maxCode = (maxCode == null) ? maxCode = procurementContractService
//					.getContractMaxCode(purchase.getType()) : maxCode++;			
//			String maxCodeStr = String.valueOf(maxCode);
//			String oriCodeStr = FileCodeGenerator.getContractCode(ProcurementTypeEnum
//					.getByValue(purchase.getType()),CodeTypeEnum.valueOf("ZHI_JIE_CAI_GOU"));
//			String codeStr = oriCodeStr.substring(0, oriCodeStr.length() - maxCodeStr.length())
//					.concat(maxCodeStr);
//			contract.setAuditCode(codeStr);
//			contract.setCreateDate(new Date());
//			contract.setEditors(identity.getLoginUser().getUserid().toString());
//			contract.setMaterialType(purchase.getMaterialTypeName());
//			contract.setVendor(parity.getVendorId());
//			contract.setVendName(parity.getVendorName());
//			contract.setApplicationStatus(ContractApplicationStatusEnum.BIAN_ZHI_ZHONG.getValue());
//			contract.setContractAmount(amout.get(tempStringList.get(i)+"amout"));
//			switch (PurchaseTypeEnum.getByValue(parity.getType())) {
//			case BI_JIA:
//				contract.setCreateType(ContractCreateTypeEnum.BI_JIA.getValue());
//				break;
//			case ZHAO_BIAO:
//				contract.setCreateType(ContractCreateTypeEnum.ZHAO_TOU_BIAO.getValue());
//				break;
//			}
//			// 设置“合同-采购清单”关联
//			List<String> metarialStrings = parity.getMaterialIdsList();
//			for (int k = 0; k < metarialStrings.size(); k++) {
//				ContractPurchase contractPurchase = new ContractPurchase();
//				contractPurchase.setMaterialId(metarialStrings.get(k));
//				contractPurchase.setPurchaseId(parity.getPurchaseId());
//				procurementContractService.saveContractAndRelation(contract, contractPurchase);
//			}
//		}
//	}
//
//	public Parity getParityById(String parityId) {
//		return parityDao.get(parityId);
//	}

}
