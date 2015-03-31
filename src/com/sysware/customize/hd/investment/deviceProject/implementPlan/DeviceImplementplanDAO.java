package com.sysware.customize.hd.investment.deviceProject.implementPlan;


import java.util.List;

import com.luck.itumserv.common.GridData;

public interface DeviceImplementplanDAO {

	/**
	 * 查询实施计划数据
	 * @param vo
	 * @return
	 */
	List<DeviceImplementplan> getGridData(DeviceImplementplanVo vo);
	
	/**
	 * 保存实施计划数据
	 * @param vo
	 * @return
	 */
	String saveImplementPlan(DeviceImplementplanVo vo);
	
	/**
	 * 下发实施计划数据
	 * @param vo
	 * @return
	 */
	String sendImplementPlan(DeviceImplementplanVo vo);
	
	
	/**
	 * 根据设备项目id获取设备实施计划信息
	 * @param id
	 * @return
	 */
	List<DeviceImplementplan> getImplementPlanById(String id);
}