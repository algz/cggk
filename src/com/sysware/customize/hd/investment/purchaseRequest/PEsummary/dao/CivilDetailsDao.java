package com.sysware.customize.hd.investment.purchaseRequest.PEsummary.dao;

import java.util.List;

import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.CivilRegistVo;

public interface CivilDetailsDao {

	public int getCivilDetailsCount();
	
	public List<CivilRegist> getCivilDetailsList(CivilRegistVo vo);
	
	public String editCivilDetails(String id,String column ,String value);
	
	public String editCivilRepair(String id,String column ,String value);

	public void updateApprovalState(String id,String flag);
	
	public List<CivilRegist> getCivilDetailsById(String id);
	
	public String appointPersonToCivilRegist(String id,String person);
	
	public void saveCivilDetails(CivilRegist cr) throws Exception;
	
	public void delCivilDetails(String id) throws Exception;
}
