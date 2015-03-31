package com.sysware.customize.hd.investment.purchaseRequest.PEdeclare;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.web.ServletContexts;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.entity.Department;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;


@Name("PEdeclareRemote")
public class PEdeclareRemote {

	@In(create = true, value = "PEdeclareServiceImpl")	
	 private PEdeclareService peDeclareServiceImpl;
	
	/**
	 * 加载所有使用单位
	 * @param id
	 * @return
	 */
	public GridData<Department> getDepartment(String id){
		List<Department> list = new ArrayList<Department>();
		GridData<Department> data = new GridData<Department>();
		list = peDeclareServiceImpl.getDeptypeList();
		data.setTotalProperty(list.size());
		data.setResults(list);
		data.setSuccess(true);
		return data;
	}
	
	/**
	 * 土建登记录入
	 * @param id
	 * @return
	 */
	public String saveCivilRegist(String id){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String json = request.getParameter("json");
			
			CivilRegist civil = (CivilRegist)JSONObject.toBean(JSONObject.fromObject(json), CivilRegist.class);
			peDeclareServiceImpl.saveCivilRegist(civil);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
		
	}
	
	/**
	 * 获取土建登记列表
	 * @param id
	 * @return
	 */
	public GridData<CivilRegist> getCivilRegistList(String id){
		List<CivilRegist> list = new ArrayList<CivilRegist>();
		GridData<CivilRegist> data = new GridData<CivilRegist>(); 
		Pager pager = new Pager();
		HttpServletRequest request = ServletContexts.instance().getRequest();
		String idd = request.getParameter("id");
		
		if(null == idd || idd.equals("")){
			int start = Integer.parseInt(request.getParameter("start"));
			int limit = Integer.parseInt(request.getParameter("limit"));
			pager.setPageSize(limit);
			pager.setStart(start);
			list = peDeclareServiceImpl.getCivilRegistList(pager);
			data.setSuccess(true);
			data.setTotalProperty(peDeclareServiceImpl.getCivilRegistCount());
			data.setResults(list);
		}else{
			list = peDeclareServiceImpl.getCivilRegistById(idd);
			data.setSuccess(true);
			data.setTotalProperty(list.size());
			data.setResults(list);
		}
		
		return data;
	}
	
	/**
	 * 获取土建大修列表
	 * @param id
	 * @return
	 */
	public GridData<CivilRepair> getCivilRepairList(String id){
		List<CivilRepair> list = new ArrayList<CivilRepair>();
		GridData<CivilRepair> data = new GridData<CivilRepair>(); 
		Pager pager = new Pager();
		HttpServletRequest request = ServletContexts.instance().getRequest();
		String idd = request.getParameter("id");
		
		if(null == idd || idd.equals("")){
			int start = Integer.parseInt(request.getParameter("start"));
			int limit = Integer.parseInt(request.getParameter("limit"));
			pager.setPageSize(limit);
			pager.setStart(start);
			list = peDeclareServiceImpl.getCivilRepairList(pager);
			data.setSuccess(true);
			data.setTotalProperty(peDeclareServiceImpl.getCivilRepairCount());
			data.setResults(list);
		}else{
			list = peDeclareServiceImpl.getCivilRepairById(idd);
			data.setSuccess(true);
			data.setTotalProperty(list.size());
			data.setResults(list);
		}
		return data;
		
	}
	
	/**
	 * 土建大修录入
	 * @param id
	 * @return
	 */
	public String saveCivilRepair(String id){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String json = request.getParameter("json");
			CivilRepair civil = (CivilRepair)JSONObject.toBean(JSONObject.fromObject(json), CivilRepair.class);
			peDeclareServiceImpl.saveCivilRepair(civil);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	/**
	 * 获取设备大修列表
	 * @param id
	 * @return
	 */
	public GridData<EquipRepair> getEquipRepairList(String id){
		List<EquipRepair> list = new ArrayList<EquipRepair>();
		GridData<EquipRepair> data = new GridData<EquipRepair>(); 
		Pager pager = new Pager();
		HttpServletRequest request = ServletContexts.instance().getRequest();
		String idd = request.getParameter("id");
		
		if(null == idd || idd.equals("")){
			int start = Integer.parseInt(request.getParameter("start"));
			int limit = Integer.parseInt(request.getParameter("limit"));
			pager.setPageSize(limit);
			pager.setStart(start);
			list = peDeclareServiceImpl.getEquipRepairList(pager);
			data.setSuccess(true);
			data.setTotalProperty(peDeclareServiceImpl.getEquipRepairCount());
			data.setResults(list);
		}else{
			list = peDeclareServiceImpl.getEquipRepairById(idd);
			data.setSuccess(true);
			data.setTotalProperty(list.size());
			data.setResults(list);
		}
		return data;
	} 
	
	/**
	 * 设备大修录入
	 * @param id
	 * @return
	 */
	public String saveEquipRepair(String id){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String json = request.getParameter("json");
			EquipRepair equip = (EquipRepair)JSONObject.toBean(JSONObject.fromObject(json), EquipRepair.class);
			peDeclareServiceImpl.saveEquipRepair(equip);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	/**
	 * 获取设备登记列表
	 * @param id
	 * @return
	 */
	public GridData<EquipRegist> getEquipRegistList(String id){
		List<EquipRegist> list = new ArrayList<EquipRegist>();
		GridData<EquipRegist> data = new GridData<EquipRegist>(); 
		Pager pager = new Pager();
		HttpServletRequest request = ServletContexts.instance().getRequest();
		String idd = request.getParameter("id");
		
		if(null == idd || idd.equals("")){
			int start = Integer.parseInt(request.getParameter("start"));
			int limit = Integer.parseInt(request.getParameter("limit"));
			pager.setPageSize(limit);
			pager.setStart(start);
			list = peDeclareServiceImpl.getEquipRegistList(pager);
			data.setSuccess(true);
			data.setTotalProperty(peDeclareServiceImpl.getEquipRegistCount());
			data.setResults(list);
		}else{
			list = peDeclareServiceImpl.getEquipRegistById(idd);
			data.setSuccess(true);
			data.setTotalProperty(list.size());
			data.setResults(list);
		}
		
		return data;
	}
	
	/**
	 * 设备登记录入
	 * @return
	 */
	public String saveEquipRegist(String id){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String json = request.getParameter("json");
			EquipRegist equip = (EquipRegist)JSONObject.toBean(JSONObject.fromObject(json), EquipRegist.class);
			peDeclareServiceImpl.saveEquipRegist(equip);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	
	/**
	 * 删除土建登记
	 * @param str
	 * @return
	 */
	public String delCivilRegist(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String[] id = request.getParameter("id").split(",");
			peDeclareServiceImpl.delCivilRegist(id);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	/**
	 * 删除土建维修
	 * @param str
	 * @return
	 */
	public String delCivilRepair(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String[] id = request.getParameter("id").split(",");
			peDeclareServiceImpl.delCivilRepair(id);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	/**
	 * 删除设备登记
	 * @param str
	 * @return
	 */
	public String delEquipRegist(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String[] id = request.getParameter("id").split(",");
			peDeclareServiceImpl.delEquipRegist(id);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	
	/**
	 * 删除设备维修
	 * @param str
	 * @return
	 */
	public String delEquipRepair(String str){
		try {
			HttpServletRequest request = ServletContexts.instance().getRequest();
			String[] id = request.getParameter("id").split(",");
			peDeclareServiceImpl.delEquipRepair(id);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
}
