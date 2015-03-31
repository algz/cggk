package com.sysware.customize.hd.investment.purchaseRequest.PEsummary.dao;

import java.util.List;

import com.luck.common.GenericDAO;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity.Stocksummary;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.StocksummaryVo;

public interface StockSummaryDao extends GenericDAO<Stocksummary>{
	
	public int getStockSummaryCount();
	
	public List<Stocksummary> getStockSummaryList(StocksummaryVo vo);

	public String editStockSummary(String id,String column ,String value);
	
	public void updateApprovalState(String id,String flag);
	
	public List<Stocksummary> getStockSummaryById(String id);
	
	public void saveCivilDetailsSummary(String id);
	
	public void saveEquipPlanSummary(String id);
	
	public void saveCivilRepairSummary(String id);
	
	public void saveEquipRepairSummary(String id);
	
	public void saveSpecialProjectSummary(String id);
}
