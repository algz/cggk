package com.sysware.customize.hd.investment.equipreService.remote;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.deviceProject.util.UtilVo;
import com.sysware.customize.hd.investment.equipreService.service.EquipServiceManageService;
import com.sysware.customize.hd.investment.equipreService.vo.EquipServiceManageVo;

@Name("equipServiceManageRemote")
public class EquipServiceManageRemote {

	
	@In(create = true, value = "equipServiceManageServiceImp")
	private EquipServiceManageService service;
	/**
	 * 查询执行计划GRID所有数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<EquipServiceManageVo> getGridData(EquipServiceManageVo vo) {
		GridData<EquipServiceManageVo> gd = new GridData<EquipServiceManageVo>();
		List<EquipServiceManageVo> vos = new ArrayList<EquipServiceManageVo>();
		vos = service.getGridData(vo);
		gd.setResults(vos);
		gd.setTotalProperty(vo.getCount());
		return gd;
	}
	
	/**
	 * 获取合同管理页面项目编号数据
	 * 
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getProjectNums(UtilVo vo) {
		JSONArray ja = new JSONArray();
		List<Object[]> list = service.getProjectNums(vo);
		JSONObject jo = new JSONObject();
		for (Object[] objs : list) {
			jo.put("projectid",objs[0]);
			jo.put("projectnum", objs[1]);
			jo.put("projectname", objs[2]);
			ja.add(jo);
			jo.clear();
		}
		jo.put("results", ja);
		jo.put("totalProperty", vo.getCount());
		return jo.toString();
	}
}
