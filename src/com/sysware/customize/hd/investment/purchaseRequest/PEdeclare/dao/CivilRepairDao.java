package com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.dao;

import java.util.List;

import com.luck.common.GenericDAO;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;

public interface CivilRepairDao extends GenericDAO<CivilRepair> {

	public int getCivilRepairCount();
	
	public List<CivilRepair> getCivilRePairList(Pager pager);
	
	public String saveCivilRepair(CivilRepair civil);
	
	public void updateApprovalState(String id,String flag);
	
	public List<CivilRepair> getCivilRepairById(String id);
	
	public void delCivilRepair(String id);
}
