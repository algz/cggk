package com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.dao;

import java.util.List;

import com.luck.common.GenericDAO;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;

public interface CivilRegistDao extends GenericDAO<CivilRegist> {

	public String saveCivilRegist(CivilRegist civil);
	
	public List<CivilRegist> getCivilRegistList(Pager pager);
	
	public int getCivilRegistCount();
	
	public void updateApprovalState(String id,String flag);
	
	public List<CivilRegist> getCivilRegistById(String id);
	
	public void delCivilRegist(String id);
}
