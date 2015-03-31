package com.sysware.customize.hd.investment.purchaseRequest.PEsummary;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.web.ServletContexts;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity.SpecialProject;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity.SpecialProjectDetails;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity.Stocksummary;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.CivilRegistVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.CivilRepairVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.EquipRegistVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.EquipRepairVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.SpecialProjectVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.StocksummaryVo;

@Name("peSummaryRemote")
public class PEsummaryRemote {

	@In(create = true, value = "peSummaryServiceImpl")	
	 private PEsummaryService peSummaryServiceImpl;
	
	/**
	 * 获取投资设备项目计划表
	 * @param str
	 * @return
	 */
	public GridData<EquipRegist> getEquipPlanList(EquipRegistVo vo){
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
			list = peSummaryServiceImpl.getEquipPlanList(vo);
			data.setSuccess(true);
			data.setTotalProperty(vo.getCount());//peSummaryServiceImpl.getEquipPlanCount());
			data.setResults(list);
			return data;
		}else{
			list = peSummaryServiceImpl.getEquipPlanById(id);
			data.setSuccess(true);
			data.setTotalProperty(list.size());
			data.setResults(list);
			return data;
		}
		
	}
	
	/**
	 * 休改设备项目计划
	 * @param str
	 * @return
	 */
	public String editEquipPlan(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String id = request.getParameter("id");
			String column = request.getParameter("column");
			String value = request.getParameter("value");
			peSummaryServiceImpl.editEquipPlan(id,column,value);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	/**
	 * 休改设备大修计划
	 * @param str
	 * @return
	 */
	public String editEquipRepair(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String id = request.getParameter("id");
			String column = request.getParameter("column");
			String value = request.getParameter("value");
			peSummaryServiceImpl.editEquipRepair(id,column,value);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	/**
	 * 获取固定资产投资计划土建项目明细表
	 * @param str
	 * @return
	 */
	public GridData<CivilRegist> getCivilDetailsList(CivilRegistVo vo){
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
			list = peSummaryServiceImpl.getCivilDetailsList(vo);
			data.setSuccess(true);
			data.setTotalProperty(vo.getCount());//peSummaryServiceImpl.getCivilDetailsCount());
			data.setResults(list);
		}else{
			list = peSummaryServiceImpl.getCivilDetailsById(id);
			data.setSuccess(true);
			data.setTotalProperty(list.size());
			data.setResults(list);
		}
		
		return data;
	}
	
	/**
	 * 修改土建项目明细
	 * @param str
	 * @return
	 */
	public String editCivilDetails(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String id = request.getParameter("id");
			String column = request.getParameter("column");
			String value = request.getParameter("value");
			peSummaryServiceImpl.editCivilDetails(id,column,value);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	/**
	 * 修改土建大修项目
	 * @param str
	 * @return
	 */
	public String editCivilRepair(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String id = request.getParameter("id");
			String column = request.getParameter("column");
			String value = request.getParameter("value");
			peSummaryServiceImpl.editCivilRepair(id,column,value);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	/**
	 * 获取土建大修项目明细(股份、集团)
	 * @param str
	 * @return
	 */
	public GridData<CivilRepair> getCivilRepairStockList(CivilRepairVo vo){
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
			list = peSummaryServiceImpl.getCivilRepairStockList(vo);
			data.setSuccess(true);
			data.setTotalProperty(vo.getCount());//(peSummaryServiceImpl.getCivilRepairStockCount());
			data.setResults(list);
		}else{
			list = peSummaryServiceImpl.getCivilRepairById(id);
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
	public GridData<EquipRepair> getEquipRepairGroupList(EquipRepairVo vo){
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
			list = peSummaryServiceImpl.getEquipRepairGroupList(vo);
			data.setSuccess(true);
			data.setTotalProperty(vo.getCount());//peSummaryServiceImpl.getCivilRepairGroupCount());
			data.setResults(list);
		}else{
			list = peSummaryServiceImpl.getEquipRepairById(id);
			data.setSuccess(true);
			data.setTotalProperty(list.size());
			data.setResults(list);
		}
		
		return data;
	}
	
	/**
	 * 保存320专项计划
	 * @param str
	 * @return
	 */
	public String saveSpecialProject(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String json = request.getParameter("json");
			SpecialProject sp = (SpecialProject)JSONObject.toBean(JSONObject.fromObject(json), SpecialProject.class);
			peSummaryServiceImpl.saveSpecialProject(sp);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	/**
	 * 获取320专项计划列表
	 * @param str
	 * @return
	 */
	public GridData<SpecialProjectVo> getSpecialProjectList(String str){
		List<SpecialProjectVo> list = new ArrayList<SpecialProjectVo>();
		GridData<SpecialProjectVo> data = new GridData<SpecialProjectVo>(); 
		Pager pager = new Pager();
		HttpServletRequest request = ServletContexts.instance().getRequest();

		int start = Integer.parseInt(request.getParameter("start"));
		int limit = Integer.parseInt(request.getParameter("limit"));
		pager.setPageSize(limit);
		pager.setStart(start);
		list = peSummaryServiceImpl.getSpecialProjectList(pager);
		data.setSuccess(true);
		data.setTotalProperty(peSummaryServiceImpl.getSpecialProjectCount());
		data.setResults(list);
		
		return data;
		
	}
	
	/**
	 * 保存320专项计划明细
	 * @param str
	 * @return
	 */
	public String saveSpecialProjectDetail(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String json = request.getParameter("json");
			String id = request.getParameter("id");
			String idd = request.getParameter("idd");
			SpecialProjectDetails spd = (SpecialProjectDetails)JSONObject.toBean(JSONObject.fromObject(json), SpecialProjectDetails.class);
			return peSummaryServiceImpl.saveSpecialProjectDetail(id,spd);

		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	/**
	 * 根据id获取320专项计划明细列表
	 * @param str
	 * @return
	 */
	public GridData<SpecialProjectDetails> getSpecialProjectDetailsById(String str){
		List<SpecialProjectDetails> list = new ArrayList<SpecialProjectDetails>();
		GridData<SpecialProjectDetails> data = new GridData<SpecialProjectDetails>(); 
		Pager pager = new Pager();
		HttpServletRequest request = ServletContexts.instance().getRequest();
		String id = request.getParameter("id");
		int start = Integer.parseInt(request.getParameter("start"));
		int limit = Integer.parseInt(request.getParameter("limit"));
		pager.setPageSize(limit);
		pager.setStart(start);
		list = peSummaryServiceImpl.getSpecialProjectDetailsById(id);
		data.setSuccess(true);
		data.setTotalProperty(peSummaryServiceImpl.getSpecialProjectDetailsCount(id));
		data.setResults(list);
		
		return data;
	}
	
	/**
	 * 获取固定资产投资预算汇总列表
	 * @param str
	 * @return
	 */
	public GridData<Stocksummary> getStockSummaryList(StocksummaryVo vo){
		List<Stocksummary> list = new ArrayList<Stocksummary>();
		GridData<Stocksummary> data = new GridData<Stocksummary>(); 
		Pager pager = new Pager();
		HttpServletRequest request = ServletContexts.instance().getRequest();
	
		int start = Integer.parseInt(request.getParameter("start"));
		int limit = Integer.parseInt(request.getParameter("limit"));
		pager.setPageSize(limit);
		pager.setStart(start);
		list = peSummaryServiceImpl.getStockSummaryList(vo);
		data.setSuccess(true);
		data.setTotalProperty(vo.getCount());//peSummaryServiceImpl.getStockSummaryCount());
		data.setResults(list);
		
		return data;
	}
	
	/**
	 * 投资汇总编辑
	 * @param str
	 * @return
	 */
	public String editStockSummary(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String id = request.getParameter("id");
			String column = request.getParameter("column");
			String value = request.getParameter("value");
			peSummaryServiceImpl.editStockSummary(id,column,value);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	/**
	 * 根据id获取固定资产投资预算汇总审批
	 * @param str
	 * @return
	 */
	public GridData<Stocksummary> getStockSummaryById(String str){
		List<Stocksummary> list = new ArrayList<Stocksummary>();
		GridData<Stocksummary> data = new GridData<Stocksummary>(); 
		HttpServletRequest request = ServletContexts.instance().getRequest();
		String id = request.getParameter("id");
		list = peSummaryServiceImpl.getStockSummaryById(id);
		data.setSuccess(true);
		data.setTotalProperty(list.size());
		data.setResults(list);
		
		return data;
	}
	
	/**
	 * 删除专项计划
	 * @param str
	 * @return
	 */
	public String delSpecialProject(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String[] id = request.getParameter("id").split(",");
			peSummaryServiceImpl.delSpecialProject(id);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
		
	}
	
	/**
	 * 删除专项计划明细
	 * @param str
	 * @return
	 */
	public String delSpecialProjectDetail(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String[] id = request.getParameter("id").split(",");
			String idd = request.getParameter("idd");
			peSummaryServiceImpl.delSpecialProjectDetail(id,idd);
//			peSummaryServiceImpl.updateSpecialProjectContractmoney(idd);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
		
	}
	
	/**
	 * 土建任务指派
	 * @param str
	 * @return
	 */
	public String appointPersonToCivilRegist(String str){
		HttpServletRequest request = ServletContexts.instance().getRequest();
		String id = request.getParameter("id");
		String person = request.getParameter("person");
		return peSummaryServiceImpl.appointPersonToCivilRegist(id,person);
	}
	
	/**
	 * 设备任务指派
	 * @param str
	 * @return
	 */
	public String appointPersonToEquipRegist(String str){
		HttpServletRequest request = ServletContexts.instance().getRequest();
		String id = request.getParameter("id");
		String person = request.getParameter("person");
		return peSummaryServiceImpl.appointPersonToEquipRegist(id,person);
	}
	
	/**
	 * 土建大修任务指派
	 * @param str
	 * @return
	 */
	public String appointPersonToCivilRepair(String str){
		HttpServletRequest request = ServletContexts.instance().getRequest();
		String id = request.getParameter("id");
		String person = request.getParameter("person");
		return peSummaryServiceImpl.appointPersonToCivilRepair(id,person);
	}
	
	/**
	 * 设备大修任务指派
	 * @param str
	 * @return
	 */
	public String appointPersonToEquipRepair(String str){
		HttpServletRequest request = ServletContexts.instance().getRequest();
		String id = request.getParameter("id");
		String person = request.getParameter("person");
		return peSummaryServiceImpl.appointPersonToEquipRepair(id,person);
	}
	
	/**
	 * 添加一条土建项目投资计划记录
	 * @param vo
	 * @return
	 */
	public String saveCivilDetails(CivilRegistVo vo){
		try {
			peSummaryServiceImpl.saveCivilDetails(vo);
			return "{success : true}";
		} catch (Exception e) {
			e.printStackTrace();
			return "{success : false}";
		}
	}
	
	/**
	 * 删除土建项目投资计划
	 * @param str
	 * @return
	 */
	public String delCivilDetails(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String[] id = request.getParameter("id").split(",");
			peSummaryServiceImpl.delCivilDetails(id);
			return "{success : true}";
		} catch (Exception e) {
			e.printStackTrace();
			return "{success : false}";
		}
	}
	
	/**
	 * 添加一条设备项目投资计划记录
	 * @param vo
	 * @return
	 */
	public String saveEquipPlan(EquipRegistVo vo){
		try {
			peSummaryServiceImpl.saveEquipPlan(vo);
			return "{success : true}";
		} catch (Exception e) {
			e.printStackTrace();
			return "{success : false}";
		}
	}
	
	/**
	 * 删除设备项目投资计划
	 * @param str
	 * @return
	 */
	public String delEquipPlan(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String[] id = request.getParameter("id").split(",");
			peSummaryServiceImpl.delEquipPlan(id);
			return "{success : true}";
		} catch (Exception e) {
			e.printStackTrace();
			return "{success : false}";
		}
	}
}
