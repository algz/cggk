package com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.dao;

import java.util.List;

import com.luck.common.GenericDAO;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;

public interface EquipRegistDao extends GenericDAO<EquipRegist>{

	
	public int getEquipRegistCount();
	
	public List<EquipRegist> getEquipRegistList(Pager pager);
	
	public String saveEquipRegist(EquipRegist equip);
	
	public void updateApprovalState(String id,String flag);
	
	public List<EquipRegist> getEquipRegistById(String id);
	
	public void delEquipRegist(String id);
}
