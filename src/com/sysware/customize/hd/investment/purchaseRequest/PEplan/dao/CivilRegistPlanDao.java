package com.sysware.customize.hd.investment.purchaseRequest.PEplan.dao;

import java.util.List;

import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.StockInspectVo;

public interface CivilRegistPlanDao {
	
	public int getCivilRegistPlanCount();
	
	public List<CivilRegist> getCivilRegistPlanList(Pager pager);
	
	public String editCivilPurchasePlan(String id,String column,String value);
	
	public void updateApprovalState(String id,String flag);
	
	public List<CivilRegist> getCivilRegistPlanById(String id);
	
	public List<CivilRegist> getCivilRegistPlanList(StockInspectVo vo);
}
