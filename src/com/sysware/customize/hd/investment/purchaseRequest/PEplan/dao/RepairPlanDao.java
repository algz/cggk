package com.sysware.customize.hd.investment.purchaseRequest.PEplan.dao;

import java.util.List;

import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.CivilRepairVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.EquipRepairVo;

public interface RepairPlanDao {
	public List<CivilRepair> getCivilRepairPlanList(CivilRepairVo vo);
	
	public List<EquipRepair> getEquipRepairPlanList(EquipRepairVo vo);
	
	public List<CivilRepair> getCivilRepairById(String id);
	
	public List<EquipRepair> getEquipRepairById(String id);
	
	public String editCivilRepairPlan(String id,String column,String value);
	
	public String editEquipRepairPlan(String id,String column,String value);
	
	public void updateEquipApprovalState(String id,String flag);
	
	public void updateCivilApprovalState(String id,String flag);

}
