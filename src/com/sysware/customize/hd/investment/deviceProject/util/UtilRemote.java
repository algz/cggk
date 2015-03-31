/**
 * 
 */
package com.sysware.customize.hd.investment.deviceProject.util;

import java.util.Calendar;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.hibernate.annotations.GenerationTime;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

/**
 * @author algz
 * 
 */
@Name("untilsRemote")
public class UtilRemote {

	@In(create = true, value = "untilsDAOImp")
	private UtilDAO utilDAO;

	/**
	 * 查询实施计划GRID所有数据
	 * 
	 * @param vo
	 * @return
	 */
	@WebRemote
	public JSONObject getProjectData(UtilVo vo) {
		JSONArray ja = new JSONArray();
		List<Object[]> list = utilDAO.getProjectData(vo);
		JSONObject jo = new JSONObject();
		for (Object[] objs : list) {
			jo.put("projectid",objs[0]);
			jo.put("projectnum", objs[1]);
			jo.put("projectname", objs[2]);
			jo.put("projectcategorys", objs[3]);
			if(vo.getProjectDataType().equals("1")){
				//实施计划获取数据
				jo.put("implementplanid", objs[3]);
			}
			ja.add(jo);
			jo.clear();
		}
		jo.put("results", ja);
		jo.put("totalProperty", vo.getCount());
		return jo;
	}
	
	@WebRemote
	public JSONObject getProjectDateData(UtilVo vo) {
		JSONObject jo = new JSONObject();
		if(vo.getProjectDataType()==null||vo.getProjectDataType().equals("")){
			return jo;
		}
		List list = utilDAO.getProjectDateData(vo);
		if(list.size()==0){
			return jo;
		}
		JSONArray ja = new JSONArray();
		jo.put("text", "全部");
		jo.put("value", "");
		ja.add(jo);
		jo.clear();
		for (Object objs : list) {
			jo.put("text",objs);
			jo.put("value", objs);
			ja.add(jo);
			jo.clear();
		}
		jo.put("results", ja);
		jo.put("totalProperty", vo.getCount());
		return jo;
	}

	@WebRemote
	public JSONObject getSupplierData(UtilVo vo) {
		JSONObject jo = new JSONObject();
		List<?> list = utilDAO.getSupplierData(vo);
		if(list.size()==0){
			return jo;
		}
		JSONArray ja = new JSONArray();
		jo.clear();
		for (Object obj : list) {
			Object[] objs=(Object[])obj;
			jo.put("text",objs[1]);
			jo.put("value", objs[0]);
			ja.add(jo);
			jo.clear();
		}
		jo.put("results", ja);
		jo.put("totalProperty", vo.getCount());
		return jo;
	}
	
	public JSONObject getDepartmentList(UtilVo vo){
		JSONObject jo = new JSONObject();
		List<?> list = utilDAO.getDepartmentList(vo);
		if(list.size()==0){
			return jo;
		}
		JSONArray ja = new JSONArray();
		jo.clear();
		for (Object obj : list) {
			Object[] objs=(Object[])obj;
			jo.put("value",objs[0]);
			jo.put("text", objs[1]);
			ja.add(jo);
			jo.clear();
		}
		jo.put("results", ja);
		jo.put("totalProperty", vo.getCount());
		return jo;
	}
	
	@WebRemote
	public JSONObject getDepartmentsByUser(UtilVo vo){
		JSONObject jo = new JSONObject();
		List<?> list = utilDAO.getDepartmentsByUser(vo);
		if(list.size()==0){
			return jo;
		}
		JSONArray ja = new JSONArray();
		for (Object obj : list) {
			String s=obj.toString();
			ja.add(s);
		}
		jo.put("success", true);
		jo.put("data", ja);
		return jo;
	}
	
	@WebRemote
	public JSONObject getRolesByUser(UtilVo vo){
		JSONObject jo = new JSONObject();
		List<?> list = utilDAO.getRolesByUser(vo);
		if(list.size()==0){
			return jo;
		}
		JSONArray ja = new JSONArray();
		for (Object obj : list) {
			String s=obj.toString();
			ja.add(s);
		}
		jo.put("success", true);
		jo.put("data", ja);
		return jo;
	}
	
	@WebRemote
	public JSONObject getRolesByUser2(UtilVo vo){
		JSONObject jo = new JSONObject();
		List<?> list = utilDAO.getRolesByUser2(vo);
		if(list.size()==0){
			return jo;
		}
		JSONArray ja = new JSONArray();
		for (Object obj : list) {
			String s=obj.toString();
			ja.add(s);
		}
		jo.put("success", true);
		jo.put("data", ja);
		return jo;
	}
	
	@WebRemote
	public JSONObject getLoginUser(){
		JSONObject jo = new JSONObject();
		jo.put("success", true);
		jo.put("data", utilDAO.getLoginUser());
		return jo;
	}
	
	public static void main(String[] agrs){
		
		Calendar calendar=Calendar.getInstance();
		GenerationTime DL;
		  int year=calendar.get(Calendar.YEAR);
		  int month=calendar.get(Calendar.MONTH)+1;
		  int day=calendar.get(Calendar.DATE);
		  calendar.set(Calendar.MONDAY, month);
		System.out.print(calendar.getTime().toString());
	}
}
