package com.sysware.customize.hd.investment.purchaseRequest.PEsummary.dao;

import java.util.List;

import com.luck.common.GenericDAO;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity.SpecialProject;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity.SpecialProjectDetails;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.StockInspectVo;

public interface SpecialProjectDao extends GenericDAO<SpecialProject>{
	
	public String saveSpecialProject(SpecialProject sp);
	
	public int getSpecialProjectCount();
	
	public int getSpecialProjectDetailsCount(String id);

	public List<SpecialProject> getSpecialProjectList(Pager pager);
	
	public List<SpecialProject> getSpecialProjectById(String id);
	
	public String saveSpecialProjectDetail(SpecialProjectDetails spd);
	
	public String getSumContractmoney(String id);
	
	public void updateSpecialProjectContractmoney(String id,String money);
	
	public List<SpecialProjectDetails> getSpecialProjectDetailsById(String id);
	
	public void updateApprovalState(String id,String flag);
	
	public void delSpecialProject(SpecialProject sp);
	
	public void delSpecialProjectDetail(String id);
	
	public List<SpecialProject> getSpecialProjectList(StockInspectVo vo);
}
