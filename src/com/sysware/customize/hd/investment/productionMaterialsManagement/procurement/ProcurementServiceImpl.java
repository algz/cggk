package com.sysware.customize.hd.investment.productionMaterialsManagement.procurement;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetailService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.FileCodeGenerator;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;

/**
 * 物资需求大纲Service实现类
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-01
 * 
 */
@Name("procurement_ProcurementServiceImpl")
public class ProcurementServiceImpl implements ProcurementService {

	@In(create = true, value = "procurement_ProcurementDaoImpl")
	private ProcurementDao procurementDao;

	@In(create = true, value = "procurementDetail_ProcurementDetailServiceImpl")
	private ProcurementDetailService procurementDetailService;

	@Transactional
	public Procurement addProcurement(Procurement procurement) {
		// 零星需求需要生成需求编号
		if (ProcurementTypeEnum.LING_XING.getValue().equals(
				procurement.getProcurementType())) {
			// 获取当前最大编号序数值
			int maxCode = procurementDao.getProcurementMaxCode();
			String maxCodeStr = String.valueOf(maxCode);
			String oriCodeStr = FileCodeGenerator.getProcurementCode();
			// 拼接需求编号
			String codeStr = oriCodeStr.substring(0,
					oriCodeStr.length() - maxCodeStr.length()).concat(
					maxCodeStr);
			procurement.setProcurementCode(codeStr);
		}
		return procurementDao.save(procurement);
	}

	@Transactional
	public void deleteProcurement(String procurementId) {
		procurementDao.remove(procurementId);
	}

	public List<Procurement> findProcurements(ProcurementCondition condition) {
		return procurementDao.findProcurements(condition);
	}
	
	public List<Procurement> findAnnualProcurementList(ProcurementCondition condition){
		return procurementDao.findAnnualProcurementList(condition);
	}

	public long countProcurements(ProcurementCondition condition) {
		return procurementDao.countProcurements(condition);
	}

	public Procurement findProcurementById(String procurementId) {
		return procurementDao.get(procurementId);
	}

	@Transactional
	public void batchUpdateProcurementsFlag(String[] procurementIds) {
		procurementDao.batchUpdateProcurementsFlag(procurementIds);
	}

	@Transactional
	public void batchDeleteProcurements(String[] procurementIds) {
		procurementDetailService.batchDeleteByProcurementIds(procurementIds);
		procurementDao.batchDeleteProcurements(procurementIds);
	}

	@Transactional
	public void batchUpdateProcurements(List<Procurement> procurements) {
		for (Procurement temp : procurements) {
			Procurement procurement = this.procurementDao.get(temp
					.getProcurementId());
			procurement.setApprovalPerson(temp.getApprovalPerson());
			procurement.setRequireDemartment(temp.getRequireDemartment());
			this.procurementDao.update(procurement);
		}

	}

	public List<ProcurementVo> getComboBoxDataForAnnualPlan(ProcurementVo procurementVo) throws Exception {
		return procurementDao.getComboBoxDataForAnnualPlan(procurementVo);
	}
}