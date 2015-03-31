package com.sysware.customize.hd.investment.purchaseRequest.PEplan;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;
import org.jboss.seam.web.ServletContexts;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.CivilRepairVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.EquipRepairVo;

@Name("pePlanRemote")
public class PEplanRemote {

	
	@In(create = true, value = "pePlanServiceImpl")	
	 private PEplanService pePlanServiceImpl;
	
	/**
	 * 获取设备采购计划
	 * @param str
	 * @return
	 */
	@WebRemote
	public GridData<EquipRegist> getEquipRegistPlanList(String str){
		
		List<EquipRegist> list = new ArrayList<EquipRegist>();
		GridData<EquipRegist> data = new GridData<EquipRegist>(); 
		Pager pager = new Pager();
		HttpServletRequest request = ServletContexts.instance().getRequest();
		String id = request.getParameter("id");
		if(null == id || id.equals("")){
			int start = Integer.parseInt(request.getParameter("start"));
			int limit = Integer.parseInt(request.getParameter("limit"));
			pager.setPageSize(limit);
			pager.setStart(start);
			list = pePlanServiceImpl.getEquipRegistPlanList(pager);
			data.setSuccess(true);
			data.setTotalProperty(pePlanServiceImpl.getEquipRegistPlanCount());
			data.setResults(list);
		}else{
			list = pePlanServiceImpl.getEquipRegistPlanById(id);
			data.setSuccess(true);
			data.setTotalProperty(list.size());
			data.setResults(list);
		}
		
		return data;
	}
	
	/**
	 * 编辑设备采购计划
	 * @param str
	 * @return
	 */
	public String editEquipPurchasePlan(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String id = request.getParameter("id");
			String column = request.getParameter("column");
			String value = request.getParameter("value");
			pePlanServiceImpl.editEquipPurchasePlan(id,column,value);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	/**
	 * 获取土建采购计划
	 * @param str
	 * @return
	 */
	public GridData<CivilRegist> getCivilRegistPlanList(String str){
		
		List<CivilRegist> list = new ArrayList<CivilRegist>();
		GridData<CivilRegist> data = new GridData<CivilRegist>(); 
		Pager pager = new Pager();
		HttpServletRequest request = ServletContexts.instance().getRequest();
		String id = request.getParameter("id");
		if(null == id || id.equals("")){
			int start = Integer.parseInt(request.getParameter("start"));
			int limit = Integer.parseInt(request.getParameter("limit"));
			pager.setPageSize(limit);
			pager.setStart(start);
			list = pePlanServiceImpl.getCivilRegistPlanList(pager);
			data.setSuccess(true);
			data.setTotalProperty(pePlanServiceImpl.getCivilRegistPlanCount());
			data.setResults(list);
		}else{
			list = pePlanServiceImpl.getCivilRegistPlanById(id);
			data.setSuccess(true);
			data.setTotalProperty(list.size());
			data.setResults(list);
		}
		
		return data;
	}
	
	/**
	 * 编辑土建采购计划
	 * @param str
	 * @return
	 */
	public String editCivilPurchasePlan(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String id = request.getParameter("id");
			String column = request.getParameter("column");
			String value = request.getParameter("value");
			pePlanServiceImpl.editCivilPurchasePlan(id,column,value);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	/**
	 * 获取土建大修项目计划(股份、集团)
	 * @param str
	 * @return
	 */
	public GridData<CivilRepair> getCivilRepairPlanList(CivilRepairVo vo){
		List<CivilRepair> list = new ArrayList<CivilRepair>();
		GridData<CivilRepair> data = new GridData<CivilRepair>(); 
		Pager pager = new Pager();
		HttpServletRequest request = ServletContexts.instance().getRequest();
		String id = request.getParameter("id");
		if(null == id || id.equals("")){
			int start = Integer.parseInt(request.getParameter("start"));
			int limit = Integer.parseInt(request.getParameter("limit"));
			pager.setPageSize(limit);
			pager.setStart(start);
			list = pePlanServiceImpl.getCivilRepairPlanList(vo);
			data.setSuccess(true);
			data.setTotalProperty(vo.getCount());//(peSummaryServiceImpl.getCivilRepairStockCount());
			data.setResults(list);
		}else{
			list = pePlanServiceImpl.getCivilRepairById(id);
			data.setSuccess(true);
			data.setTotalProperty(list.size());
			data.setResults(list);
		}
		
		return data;
	}
	
	/**
	 * 获取设备大修项目明细(股份、集团)
	 * @param str
	 * @return
	 */
	public GridData<EquipRepair> getEquipRepairPlanList(EquipRepairVo vo){
		List<EquipRepair> list = new ArrayList<EquipRepair>();
		GridData<EquipRepair> data = new GridData<EquipRepair>(); 
		Pager pager = new Pager();
		HttpServletRequest request = ServletContexts.instance().getRequest();
		String id = request.getParameter("id");
		if(null == id || id.equals("")){
			int start = Integer.parseInt(request.getParameter("start"));
			int limit = Integer.parseInt(request.getParameter("limit"));
			pager.setPageSize(limit);
			pager.setStart(start);
			list = pePlanServiceImpl.getEquipRepairPlanList(vo);
			data.setSuccess(true);
			data.setTotalProperty(vo.getCount());//peSummaryServiceImpl.getCivilRepairGroupCount());
			data.setResults(list);
		}else{
			list = pePlanServiceImpl.getEquipRepairById(id);
			data.setSuccess(true);
			data.setTotalProperty(list.size());
			data.setResults(list);
		}
		
		return data;
	}
	
	/**
	 * 编辑土建大修计划
	 * @param str
	 * @return
	 */
	public String editCivilRepairPlan(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String id = request.getParameter("id");
			String column = request.getParameter("column");
			String value = request.getParameter("value");
			pePlanServiceImpl.editCivilRepairPlan(id,column,value);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	/**
	 * 编辑设备大修计划
	 * @param str
	 * @return
	 */
	public String editEquipRepairPlan(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String id = request.getParameter("id");
			String column = request.getParameter("column");
			String value = request.getParameter("value");
			pePlanServiceImpl.editEquipRepairPlan(id,column,value);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
}
