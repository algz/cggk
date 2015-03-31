/**
 * 
 */
package com.sysware.customize.hd.investment.deviceProject.contractManagement;

import java.util.List;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;


/**
 * @author algz
 *
 */
@Name("deviceContractmanagementServiceImp")
public class DeviceContractmanagementServiceImp implements DeviceContractmanagementService {

	@In(create = true, value = "deviceContractmanagementDAOImp")
	private DeviceContractmanagementDAO dao;

	public List<DeviceContractmanagement> getGridData(DeviceContractmanagementVo vo){
		return dao.getGridData(vo);
	}
	
	@Transactional
	public String saveDeviceContractmanagement(DeviceContractmanagementVo vo) {
		// TODO Auto-generated method stub
		return dao.saveDeviceContractmanagement(vo);
	}

	public String deleteDeviceContractmanagement(DeviceContractmanagementVo vo) {
		// TODO Auto-generated method stub
		return dao.deleteDeviceContractmanagement(vo);
	}
	
}
