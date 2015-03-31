/**
 * 
 */
package com.sysware.customize.hd.investment.engineeringProject.util;

import java.util.Calendar;
import java.util.List;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.hibernate.annotations.GenerationTime;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;
import com.sysware.customize.cac.tc.model.Pager;

/**
 * @author 
 * 
 */
@Name("engineeringProject_UtilRemote")
public class UtilRemote {

	@In(create = true, value = "engineeringProject_UtilDaoImp")
	private UtilDao utilDao;

	/**
	 * 查询实施计划GRID所有数据
	 * 
	 * @param vo
	 * @return
	 */
	@WebRemote
	public JSONObject getProjectData(UtilVo vo) {
		JSONArray ja = new JSONArray();
		List<Object[]> list = utilDao.getProjectData(vo);
		JSONObject jo = new JSONObject();
		for (Object[] objs : list) {
			jo.put("projectid",objs[0]);
			jo.put("projectnum", objs[1]);
			jo.put("projectname", objs[2]);
			jo.put("projectcategorys", objs[3]);
//			jo.put("headperson", objs[3]==null?"":objs[3]);//项目主管
//			jo.put("useunit", objs[4]==null?"":objs[4]);//使用单位
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
		Pager pager = new Pager();
		if(vo.getProjectDataType()==null||vo.getProjectDataType().equals("")){
			return jo;
		}
		List list = utilDao.getProjectDateData(vo, pager);
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
		jo.put("totalProperty", pager.getRecordCount());
		//jo.put("totalProperty", vo.getCount());
		return jo;
	}

	@WebRemote
	public JSONObject getSupplierData(UtilVo vo) {
		JSONObject jo = new JSONObject();
		List<?> list = utilDao.getSupplierData(vo);
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
