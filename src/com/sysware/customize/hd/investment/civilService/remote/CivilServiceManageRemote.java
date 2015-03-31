package com.sysware.customize.hd.investment.civilService.remote;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.civilService.service.CivilServiceManageService;
import com.sysware.customize.hd.investment.civilService.vo.CivilServiceImplPlanVo;
import com.sysware.customize.hd.investment.deviceProject.util.UtilVo;

@Name("civilServiceManageRemote")
public class CivilServiceManageRemote {

	@In(create = true, value = "civilServiceManageServiceImp")
	private CivilServiceManageService service;
	/**
	 * 查询执行计划GRID所有数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<CivilServiceImplPlanVo> getGridData(CivilServiceImplPlanVo vo) {
		GridData<CivilServiceImplPlanVo> gd = new GridData<CivilServiceImplPlanVo>();
		List<CivilServiceImplPlanVo> vos = new ArrayList<CivilServiceImplPlanVo>();
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
