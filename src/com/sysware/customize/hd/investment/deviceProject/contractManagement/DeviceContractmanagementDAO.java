package com.sysware.customize.hd.investment.deviceProject.contractManagement;


import java.util.List;

import org.hibernate.Session;

public interface DeviceContractmanagementDAO {

	public Session getHibernateSession();
	
	/**
	 * 查询合同管理数据
	 * @param vo
	 * @return
	 */
	List<DeviceContractmanagement> getGridData(DeviceContractmanagementVo vo);
	
	/**
	 * 保存合同管理数据
	 * @param vo
	 * @return
	 */
	String saveDeviceContractmanagement(DeviceContractmanagementVo vo);
	
	/**
	 * 删除合同管理数据
	 * @param vo
	 * @return
	 */
	String deleteDeviceContractmanagement(DeviceContractmanagementVo vo);
	
}