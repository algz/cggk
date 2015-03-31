package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementSummaryDetail;

import java.util.List;

import com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlan.BuinessPlan;
import com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail.BuinessPlanDetail;

public interface ProcurementSummaryDetailService {

	
	public void batchAddProcurementSummaryDetails(BuinessPlan buinessPlan,
			List<BuinessPlanDetail> businessPlanDetails);
	/**
	 * 通过需求Id 获取物资的各个机型的数据明细
	 * @param vo
	 * @return
	 */
	public List<ProcurementSummaryDetailVo> getProcurementSummaryDetailList(ProcurementSummaryDetailVo vo);
}