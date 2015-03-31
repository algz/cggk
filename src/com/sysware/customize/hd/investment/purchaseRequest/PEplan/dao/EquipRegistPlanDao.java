package com.sysware.customize.hd.investment.purchaseRequest.PEplan.dao;

import java.util.List;

import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.StockInspectVo;

public interface EquipRegistPlanDao {
	
	public int getEquipRegistPlanCount();
	
	public List<EquipRegist> getEquipRegistPlanList(Pager pager);
	
	public String editEquipPurchasePlan(String id,String column,String value);
	
	public void updateApprovalState(String id,String flag);
	
	public List<EquipRegist> getEquipRegistPlanById(String id);
	
	public List<EquipRegist> getEquipRegistPlanList(StockInspectVo vo);
}
