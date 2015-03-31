package com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.dao;

import java.util.List;

import com.luck.common.GenericDAO;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;

public interface EquipRepairDao extends GenericDAO<EquipRepair>{

	public int getEquipRepairCount();
	
	public List<EquipRepair> getEquipRePairList(Pager pager);
	
	public String saveEquipRepair(EquipRepair equip);
	
	public void updateApprovalState(String id,String flag);
	
	public List<EquipRepair> getEquipRepairById(String id);
	
	public void delEquipRepair(String id);
}
