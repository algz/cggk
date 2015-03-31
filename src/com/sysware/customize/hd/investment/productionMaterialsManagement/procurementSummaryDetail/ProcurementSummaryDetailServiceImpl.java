package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementSummaryDetail;

import java.util.Date;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalogService;
import com.sysware.customize.hd.investment.baseData.materialQuota.MaterialQuota;
import com.sysware.customize.hd.investment.baseData.materialQuota.MaterialQuotaService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlan.BuinessPlan;
import com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail.BuinessPlanDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.Procurement;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.ProcurementService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;

@Name("procurementSummaryDetailServiceImpl")
public class ProcurementSummaryDetailServiceImpl implements  ProcurementSummaryDetailService {
	@In(create = true)
	Identity identity;

	@In(create = true, value = "procurementSummaryDetailDaoImpl")
	private procurementSummaryDetailDao procurementSummaryDetailDao;
	
	@In(create = true, value = "materialQuota_MaterialQuotaServiceImpl")
	private MaterialQuotaService materialQuotaService;

	@In(create = true, value = "procurement_ProcurementServiceImpl")
	private ProcurementService procurementService;

	@In(create = true, value = "materialCatalogServiceImpl")
	MaterialCatalogService materialCatalogService;

	@In(create = true, value = "material_MaterialServiceImpl")
	public MaterialService materialService;


	/* (non-Javadoc)
	 * @see com.sysware.customize.hd.investment.productionMaterialsManagement.procurementSummaryDetail.ProcurementSummaryDetailService#batchAddProcurementDetails(java.lang.String, java.util.List)
	 */
	@Transactional
	public void batchAddProcurementSummaryDetails(BuinessPlan buinessPlan,
			List<BuinessPlanDetail> businessPlanDetails) {
		
		Procurement procurement = new Procurement();
		procurement.setProcurementCode(buinessPlan.getBuinessPlanName());//采购需求编号,应该在t_purchase生成时赋值
		procurement.setBuinessPlan(buinessPlan);
		procurement.setProcurementType(ProcurementTypeEnum.NIAN_DU.getValue());
		procurement.setFlag("1");
		procurement.setCreateDate(new Date());

		procurement = procurementService.addProcurement(procurement);

		for (BuinessPlanDetail businessPlanDetail : businessPlanDetails) {
			// 处理与“材料定额”相关联的数据,存入采购计划详情表
			processMaterialQuotasToProcurementSummaryDetail(procurement, businessPlanDetail);
			// 处理与“清册”相关联的数据
			//processInventoriesToProcurementDetails(procurement, businessPlanDetail);
		}
	}

	// 处理与“材料定额”相关联的数据
	private void processMaterialQuotasToProcurementSummaryDetail(Procurement procurement,
			BuinessPlanDetail businessPlanDetail) {
		// 根据产品ID获得对应的材料定额集合
		List<MaterialQuota> materialQuotas = materialQuotaService
				.getMaterialQuotaListByProductId(businessPlanDetail.getProductCode(),businessPlanDetail.getGroupType());//.getProduct().getProductid());
		procurementSummaryDetailDao.saveProcurementSummaryDetail(procurement, businessPlanDetail, materialQuotas);
		
//		for (MaterialQuota materialQuota : materialQuotas) {
//			//物料组别与定额材料组别相等则进行导入
//			procurementSummaryDetailDao.saveProcurementSummaryDetail(procurement, businessPlanDetail, materialQuota);
//		}
	}

	public List<ProcurementSummaryDetailVo> getProcurementSummaryDetailList(
			ProcurementSummaryDetailVo vo) {
		 
		return procurementSummaryDetailDao.getProcurementSummaryDetailList(vo);
	}
	
	
	
}
