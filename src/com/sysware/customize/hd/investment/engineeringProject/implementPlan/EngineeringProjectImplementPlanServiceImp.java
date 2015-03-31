/**
 * 
 */
package com.sysware.customize.hd.investment.engineeringProject.implementPlan;

import java.text.ParseException;
import java.util.List;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.sysware.customize.cac.tc.model.Pager;


/**
 * @author algz
 *
 */
@Name("engineeringProject_EngineeringProjectImplementPlanServiceImp")
public class EngineeringProjectImplementPlanServiceImp implements EngineeringProjectImplementPlanService {

	@In(create = true, value = "engineeringProject_EngineeringProjectImplementplanDaoImp")
	private EngineeringProjectImplementplanDao dao;

	public List<EngineeringProjectPlanVo> getGridData(EngineeringProjectPlanVo vo,Pager pager){
		return dao.getGridData(vo,pager);
	}

	public List<EngineeringProjectPlanVo> getImplementPlanById(String id) {
		return dao.getImplementPlanById(id);
	}

	public String saveImplementPlan(EngineeringProjectPlanVo vo) {
		return dao.saveImplementPlan(vo);
	}

	public String sendImplementPlan(EngineeringProjectPlanVo vo) {
		return dao.sendImplementPlan(vo);
	}
	
	
	
	/**
	 * 编辑前新增一条数据
	 * @param vo
	 * @return
	 */
	public String beforeEditAdd(EngineeringProjectPlanVo vo){
		return dao.beforeEditAdd(vo);
	}
	
}
