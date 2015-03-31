/**
 * 
 */
package com.sysware.customize.hd.investment.deviceProject.implementPlan;

import java.util.List;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;


/**
 * @author algz
 *
 */
@Name("deviceImplementPlanServiceImp")
public class DeviceImplementPlanServiceImp implements DeviceImplementPlanService {

	@In(create = true, value = "deviceImplementplanDAOImp")
	private DeviceImplementplanDAO dao;

	public List<DeviceImplementplan> getGridData(DeviceImplementplanVo vo){
		return dao.getGridData(vo);
	}

	public String saveImplementPlan(DeviceImplementplanVo vo) {
		// TODO Auto-generated method stub
		return dao.saveImplementPlan(vo);
	}

	public String sendImplementPlan(DeviceImplementplanVo vo) {
		// TODO Auto-generated method stub
		return dao.sendImplementPlan(vo);
	}

	public List<DeviceImplementplan> getImplementPlanById(String id) {
		return dao.getImplementPlanById(id);
	}
	
}
