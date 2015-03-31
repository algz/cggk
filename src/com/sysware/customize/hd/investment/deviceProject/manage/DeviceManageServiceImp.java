/**
 * 
 */
package com.sysware.customize.hd.investment.deviceProject.manage;

import java.util.List;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.customize.hd.investment.deviceProject.implementPlan.DeviceImplementplan;
import com.sysware.customize.hd.investment.deviceProject.implementPlan.DeviceImplementplanVo;


/**
 * @author algz
 *
 */
@Name("deviceManageServiceImp")
public class DeviceManageServiceImp implements DeviceManageService {

	@In(create = true, value = "deviceManageDAOImp")
	private DeviceManageDAO dao;

	public List<DeviceImplementplan> getGridData(DeviceManageVo vo){
		return dao.getGridData(vo);
	}

	public List<DeviceImplementplan> getDeviceManageById(String id) {
		return dao.getDeviceManageById(id);
	}

	public String saveManage(DeviceManageVo vo) {
		// TODO Auto-generated method stub
		return dao.saveManage(vo);
	}

/*	public String saveManageDirpurchase(DeviceManageDirpurchaseVo vo) {
		// TODO Auto-generated method stub
		return dao.saveManageDirpurchase(vo);
	}*/

	public String sendManage(DeviceManageVo vo) {
		// TODO Auto-generated method stub
		String s="";
		try{
			s= dao.sendManage(vo);
		}catch(Exception e){
			s=e.getLocalizedMessage();
		}
		return s;
	}

	public String getManage(DeviceManageVo vo) {
		// TODO Auto-generated method stub
		return dao.getManage(vo);
	}
	
	
	
}
