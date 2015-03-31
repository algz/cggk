package com.sysware.customize.hd.investment.purchaseRequest.PEsummary.dao;

import java.util.List;

import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.CivilRepairVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.EquipRepairVo;

public interface CivilRepairSummaryDao {

	public int getCivilRepairGroupCount();
	
	public int getCivilRepairStockCount();
	
	public List<CivilRepair> getCivilRepairStockList(CivilRepairVo vo);
	
	public List<EquipRepair> getEquipRepairGroupList(EquipRepairVo vo);

	public void updateApprovalState(String id,String flag);
	
	public void updateEquipRepairApprovalState(String id,String flag);
	
	public List<CivilRepair> getCivilRepairById(String id);
	
	public List<EquipRepair> getEquipRepairById(String id);
	
	public String appointPersonToCivilRepair(String id,String person);
	
	public String appointPersonToEquipRepair(String id,String person);
}
