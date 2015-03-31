package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementSummaryDetail;

import java.util.List;

import com.sysware.customize.hd.investment.baseData.materialQuota.MaterialQuota;
import com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail.BuinessPlanDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.Procurement;

public interface procurementSummaryDetailDao {
	
	public ProcurementSummaryDetail saveProcurementSummaryDetail(Procurement procurement,
			BuinessPlanDetail businessPlanDetail, List<MaterialQuota> materialQuotas);
	
	/**
	 * 通过需求Id 获取物资的各个机型的数据明细
	 * @param vo
	 * @return
	 */
	public List<ProcurementSummaryDetailVo> getProcurementSummaryDetailList(ProcurementSummaryDetailVo vo);
}