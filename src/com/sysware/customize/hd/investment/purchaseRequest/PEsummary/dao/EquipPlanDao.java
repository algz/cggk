package com.sysware.customize.hd.investment.purchaseRequest.PEsummary.dao;

import java.util.List;

import com.luck.common.GenericDAO;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.EquipRegistVo;

public interface EquipPlanDao extends GenericDAO<EquipRegist>{

	
	public int getEquipPlanCount();
	
	public List<EquipRegist> getEquipPlanList(EquipRegistVo vo);
	
	public String editEquipPlan(String id,String column ,String value);
	
	public String editEquipRepair(String id,String column ,String value);

	public void updateApprovalState(String id,String flag);
	
	public List<EquipRegist> getEquipPlanById(String id);
	
	public String appointPersonToEquipRegist(String id,String person);
	
	public void saveEquipPlan(EquipRegist er) throws Exception;
	
	public void delEquipPlan(String id) throws Exception;
}
