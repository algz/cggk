package com.sysware.customize.hd.investment.productionMaterialsManagement.parity;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ContractPurchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContract;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContractService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.Procurement;
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

import freemarker.template.utility.StringUtil;

@Name("parityServiceImpl")
public class ParityServiceImpl implements ParityService {
	@In(create = true)
	Identity identity;

	@In(create = true, value = "parityDaoImpl")
	private ParityDao parityDao;

	@In(create = true, value = "procurementDetail_ProcurementDetailServiceImpl")
	private ProcurementDetailService procurementDetailService;

	@In(create = true, value = "contract_ProcurementContractServiceImpl")
	private ProcurementContractService procurementContractService;

	@In(create = true, value = "purchaseServiceImpl")
	private PurchaseService purchaseService;

	public Parity saveParity(Parity parity) {
		return parityDao.save(parity);
	}

	public List<Parity> getParityListByCondition(ParityCondition parityCondition) {
		return parityDao.getParityListByCondition(parityCondition);
	}

	public Long getCountByCondition(ParityCondition parityCondition) {
		return parityDao.getCountByCondition(parityCondition);
	}

	/**
	 * 比价、招投标指定供应商
	 * 
	 * @param parityId 比价、招投标清单ID
	 * @param vendorId 供应商ID
	 * @param vendorName 供应商名称
	 *  @param price 供应商报价
	 * 
	 */
	@Transactional
	public void assignVendorToParity(String parityId, String vendorId, String vendorName,String price) {
		String userId = identity.getLoginUser().getUserid().toString();// 用户id
		Parity parity = parityDao.get(parityId);
		parity.setVendorId(vendorId);
		parity.setVendorName(vendorName);
		if (parity.getType().equals(PurchaseTypeEnum.QI_TA_CAI_GOU.getValue())) {
//			parity.setApplicationStatus(ParityApplicationStatusEnum.DAI_SHENG_CHENG_HE_TONG.getValue());
			parity.setApplicationStatus(ParityApplicationStatusEnum.DAI_SHEN_PI.getValue());
		}
		if(parity.getType().equals(PurchaseTypeEnum.ZHAO_BIAO.getValue())){
			parity.setApplicationStatus(ParityApplicationStatusEnum.DAI_SHEN_PI.getValue());
		}
		parity.setEditors(userId);
		parity.setPrice(new BigDecimal(price));
		parityDao.update(parity);
		parityDao.getHibernateSession().createSQLQuery("update t_procurementdetail pd set pd.vendorid='"+vendorId+"' " +
				"where pd.procurementdetailid='"+parity.getProcurementDetailId()+"'").executeUpdate();
//		List<ProcurementDetail> procurementDetailList = procurementDetailService
//				.getProcurementDetailByParity(parity);
//		for (ProcurementDetail procurementDetail : procurementDetailList) {
//			procurementDetail.setVendorId(vendorId);
//			procurementDetailService.saveOrUpdateProcurementDetail(procurementDetail);
//		}
	}

	@Transactional
	public void updateParity(Parity parity) {
		parityDao.update(parity);
	}

	@Transactional
	public void updateProperties(String[] parityIDs, String flag) {
		Parity parity = null;
		for (String parityId : parityIDs) {
			parity = parityDao.get(parityId);
			parity.setApplicationStatus(flag);
			parityDao.update(parity);
		}
	}

	@Transactional
	public int getParityMaxCode(String purchaseType, String procurementType) {
		return parityDao.getParityMaxCode(purchaseType, procurementType);
	}

	@Transactional
	public void generateContractFromParities(List<Parity> parities) {
		// 将同一供应商、同一采购清单和同一采购方式的处理成一个合同
		List<String> tempStringList = new ArrayList<String>();
		// 对相同采购方式的合同进行过滤
		Map<String, Parity> tempMap = new HashMap<String, Parity>();
		Map<String,BigDecimal> amout = new HashMap<String,BigDecimal>();
		for (Parity parity : parities) {
			// 将参与比较的属性拼成tempString
			//清单大纲id@中标供应商@编制人
			String tempString = parity.getPurchaseId() + "@" + parity.getVendorId() + "@"
					+ parity.getEditors();
			if (tempMap.get(tempString) == null) {
				parity.getMaterialIdsList().add(parity.getMaterialId());
				tempMap.put(tempString, parity);
			    amout.put(tempString+"amout", parityDao.getAmout(parity.getParityId(),parity.getVendorId()));
				tempStringList.add(tempString);
			} else {
				// 如果tempMap中的key值已包含‘tempString’
				tempMap.get(tempString).getMaterialIdsList().add(parity.getMaterialId());
				BigDecimal decimal=amout.get(tempString+"amout").add(parityDao.getAmout(parity.getParityId(),parity.getVendorId()));
				amout.put(tempString+"amout", decimal);
			}
			parity.setApplicationStatus(ParityApplicationStatusEnum.YI_SHENG_CHENG.getValue());
			Parity parity_tem=(Parity)parityDao.getHibernateSession().get(Parity.class, parity.getParityId());
			parity.setProcurementDetailId(parity_tem.getProcurementDetailId());
			this.updateParity(parity);

		}
		// 采购招标，比价生成合同，maxCode为采购清单序号的当前最大值
		Integer maxCode = null;
		for (int i = 0; i < tempStringList.size(); i++) {
			Parity parity = tempMap.get(tempStringList.get(i));
			// 获得采购清单
			Purchase purchase = purchaseService.getPurchaseById(parity.getPurchaseId());
			ProcurementContract contract = new ProcurementContract();			
			// 生成合同审签单编号
			maxCode = (maxCode == null) ? maxCode = procurementContractService
					.getContractMaxCode(purchase.getType()) : maxCode++;			
			String maxCodeStr = String.valueOf(maxCode);
			String oriCodeStr = FileCodeGenerator.getContractCode(ProcurementTypeEnum
					.getByValue(purchase.getType()),CodeTypeEnum.valueOf("ZHI_JIE_CAI_GOU"));
			String codeStr = oriCodeStr.substring(0, oriCodeStr.length() - maxCodeStr.length())
					.concat(maxCodeStr);
			contract.setAuditCode(codeStr);
			contract.setCreateDate(new Date());
			contract.setEditors(identity.getLoginUser().getUserid().toString());
			contract.setMaterialType(purchase.getMaterialTypeName());
			contract.setVendor(parity.getVendorId());
			contract.setVendName(parity.getVendorName());
			contract.setApplicationStatus(ContractApplicationStatusEnum.BIAN_ZHI_ZHONG.getValue());
			contract.setContractAmount(amout.get(tempStringList.get(i)+"amout"));
			switch (PurchaseTypeEnum.getByValue(parity.getType())) {
			case BI_JIA:
				contract.setCreateType(ContractCreateTypeEnum.BI_JIA.getValue());
				break;
			case ZHAO_BIAO:
				contract.setCreateType(ContractCreateTypeEnum.ZHAO_BIAO.getValue());
				break;
			case XIE_YI_CAI_GOU:
				contract.setCreateType(ContractCreateTypeEnum.XIE_YI_CAI_GOU.getValue());
				break;
			case QI_TA_CAI_GOU:
				contract.setCreateType(ContractCreateTypeEnum.QI_TA_CAI_GOU.getValue());
				break;
			}
			// 设置“合同-采购清单”关联
			List<String> metarialStrings = parity.getMaterialIdsList();
			for (int k = 0; k < metarialStrings.size(); k++) {
				ContractPurchase contractPurchase = new ContractPurchase();
				contractPurchase.setMaterialId(metarialStrings.get(k));
				contractPurchase.setPurchaseId(parity.getPurchaseId());
				contractPurchase.setParityId(parity.getParityId());//增加采购策略表ID
				procurementContractService.saveContractAndRelation(contract, contractPurchase);
			}
		}
	}

	public Parity getParityById(String parityId) {
		return parityDao.get(parityId);
	}

	public List<ParityVo> getParityGridDataById(ParityVo vo) throws Exception{
		ProcurementContract contract = (ProcurementContract)parityDao.getHibernateSession().get(ProcurementContract.class, vo.getContractId());
		vo.setType(contract.getCreateType());
		vo.setVendorId(contract.getVendor());
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		List<ParityVo> retList = new ArrayList<ParityVo>();
		List<Parity> list = parityDao.getParityGridDataById(vo);
		for(Parity p : list){
			ParityVo pv = new ParityVo();
			Material m = (Material)parityDao.getHibernateSession().get(Material.class, p.getMaterialId());
			pv.setParityId(p.getParityId());
			pv.setParityCode(p.getParityCode());
			pv.setMaterialItemName(m.getMaterialItemName());
			pv.setDesingnation(m.getDesingnation());
			pv.setMaterialStandard(m.getMaterialStandard());
			pv.setTechnicCondition(m.getTechnicCondition());
			pv.setCreateDate(df.format(p.getCreateDate()));
			pv.setDeliveryDate(p.getDeliveryDate()==null?"":df.format(p.getDeliveryDate()));
			pv.setVendorName(p.getVendorName());
			ProcurementDetail pd = (ProcurementDetail)parityDao.getHibernateSession().get(ProcurementDetail.class, p.getProcurementDetailId());
			pv.setActualNumber(pd.getActualNumber()==null?"0":pd.getActualNumber().toString());
			pv.setAmount_applications(pd.getNumber_applications()==null?"0":pd.getNumber_applications().toString());
			Procurement pro = (Procurement)parityDao.getHibernateSession().get(Procurement.class, pd.getProcurementId());
			pv.setProcurementCode(pro.getProcurementCode()==null?"":pro.getProcurementCode());
			retList.add(pv);
		}
		return retList;
	}

	@Transactional
	public void submitMaterial(String[] ids, String id) throws Exception {
		for(int i=0; i<ids.length; i++){
			Parity p = (Parity)parityDao.getHibernateSession().get(Parity.class, ids[i]);
			ContractPurchase cp = new ContractPurchase();
			cp.setMaterialId(p.getMaterialId());
			cp.setProcurementContractId(id);
			cp.setPurchaseId(p.getPurchaseId());
			p.setApplicationStatus("5");
			parityDao.getHibernateSession().update(p);
			parityDao.getHibernateSession().save(cp);
		}
	}

	@Transactional
	public void delMaterialFromContract(ParityVo vo) throws Exception {
		String vendorId = vo.getVendorId();
		String contractId = vo.getContractId();
		String[] materials = vo.getMaterialId().split(",");
		String[] puchaseIds = vo.getPurchaseId().split(",");
		String type = vo.getType();
		for(int i = 0; i < puchaseIds.length; i++){
//			删除关联关系表中的数据
			parityDao.delcontractPurchase(puchaseIds[i],contractId,materials[i]);
//			更新parity表中数据的状态
			parityDao.updateParityBy(puchaseIds[i],vendorId,materials[i],type);
		}
		
	}

	@Transactional
	public String delMaterialFromParity(ParityVo vo) {
		String[] parityId = StringUtil.split(vo.getParityId(), ',');
		for(int i = 0; i < parityId.length; i++){
			Parity parity=(Parity)parityDao.getHibernateSession().get(Parity.class,parityId[i]);
			if(parity.getProcurementDetailId()==null){
				continue;
			}
			parityDao.getHibernateSession().delete(parity);
			parityDao.getHibernateSession().createSQLQuery("update t_ProcurementDetail pd set status=null,PURCHASETYPE=null " +
					"where pd.procurementDetailId='"+parity.getProcurementDetailId()+"'").executeUpdate();
			parityDao.getHibernateSession().createSQLQuery("update t_purchase pur set pur.status='3' " +
					"where pur.purchaseid='"+parity.getPurchaseId()+"'").executeUpdate();
			
		}
		return null;
	}

}
