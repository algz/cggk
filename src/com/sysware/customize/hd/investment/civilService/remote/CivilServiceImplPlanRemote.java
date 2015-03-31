package com.sysware.customize.hd.investment.civilService.remote;

import java.util.ArrayList;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.civilService.service.CivilServiceImplPlanService;
import com.sysware.customize.hd.investment.civilService.vo.CivilServiceImplPlanVo;

@Name("civilServiceImplPlanRemote")
public class CivilServiceImplPlanRemote {
	
	@In(create = true, value = "civilServiceImplPlanServiceImp")
	private CivilServiceImplPlanService service;

	/**
	 * 查询实施计划GRID所有数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<CivilServiceImplPlanVo> getGridData(CivilServiceImplPlanVo vo) {
		GridData<CivilServiceImplPlanVo> gd = new GridData<CivilServiceImplPlanVo>();
		List<CivilServiceImplPlanVo> vos = new ArrayList<CivilServiceImplPlanVo>();
		try {
			vos = service.getGridData(vo);
		} catch (Exception e) {
			e.printStackTrace();
		}
		gd.setResults(vos);
		gd.setTotalProperty(vo.getCount());
		return gd;
	}
	
	/**
	 * 编辑土建大修实施计划
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String editCivilServiceImplPlan(CivilServiceImplPlanVo vo){
		String msg = service.editCivilServiceImplPlan(vo);
		return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
	}
	
	/**
	 * 下发实施计划数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String sendImplementPlan(CivilServiceImplPlanVo vo){
		String msg=service.sendImplementPlan(vo);
		return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
	}
}
