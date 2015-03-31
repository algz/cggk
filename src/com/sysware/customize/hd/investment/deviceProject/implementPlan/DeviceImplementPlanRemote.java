/**
 * 
 */
package com.sysware.customize.hd.investment.deviceProject.implementPlan;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;
import org.jboss.seam.web.ServletContexts;

import com.luck.itumserv.common.GridData;

/**
 * @author algz
 * 
 */
@Name("deviceImplementPlanRemote")
public class DeviceImplementPlanRemote {

	@In(create = true, value = "deviceImplementPlanServiceImp")
	private DeviceImplementPlanService service;

	
	/**
	 * 查询实施计划GRID所有数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<DeviceImplementplanVo> getGridData(DeviceImplementplanVo vo) {
		GridData<DeviceImplementplanVo> gd = new GridData<DeviceImplementplanVo>();
		List<DeviceImplementplanVo> vos = new ArrayList<DeviceImplementplanVo>();
		try {
			List<DeviceImplementplan> list = service.getGridData(vo);
			for (DeviceImplementplan di : list) {
				DeviceImplementplanVo divo = new DeviceImplementplanVo();
				BeanUtils.copyProperties(divo, di);
//				divo.setProjectmanagerid(di.getProjectmanagerid());
//				divo.setProjectmanagername(di.getProjectmanagername());
				divo.setProjectnum(di.getEquipregistId().getProjectnum());
				divo.setProjectname(di.getEquipregistId().getProjectname());
				divo.setNums(di.getEquipregistId().getNums());//数量
				divo.setNumsunit(di.getEquipregistId().getNumsunit());//数量单位
				divo.setBudgetnum(di.getEquipregistId().getBudgetnum());//总投资预算控制数
				divo.setFundunit(di.getEquipregistId().getFundunit());//资金单位
				
				vos.add(divo);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		gd.setResults(vos);
		gd.setTotalProperty(vo.getCount());
		return gd;
	}

	/**
	 * 保存实施计划数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String saveImplementPlan(DeviceImplementplanVo vo){
		String msg=service.saveImplementPlan(vo);
		return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
	}
	
	/**
	 * 下发实施计划数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String sendImplementPlan(DeviceImplementplanVo vo){
		String msg=service.sendImplementPlan(vo);
		return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
	}
	
	
	/**
	 * 根据设备项目id获取设备实施计划信息
	 * @param id
	 * @return
	 */
	@WebRemote
	public GridData<DeviceImplementplanVo> getImplementPlanById(String id){
		GridData<DeviceImplementplanVo> gd = new GridData<DeviceImplementplanVo>();
		List<DeviceImplementplanVo> vos = new ArrayList<DeviceImplementplanVo>();
		HttpServletRequest request = ServletContexts.getInstance().getRequest();
		String pid = request.getParameter("pid");
		try {
			List<DeviceImplementplan> list = service.getImplementPlanById(pid);
			for (DeviceImplementplan di : list) {
				DeviceImplementplanVo divo = new DeviceImplementplanVo();
				BeanUtils.copyProperties(divo, di);
				divo.setProjectmanagerid(di.getProjectmanagerid());
				divo.setProjectmanagername(di.getProjectmanagername());
				divo.setProjectnum(di.getEquipregistId().getProjectnum());
				divo.setProjectname(di.getEquipregistId().getProjectname());
				divo.setNums(di.getEquipregistId().getNums());//数量
				divo.setNumsunit(di.getEquipregistId().getNumsunit());//数量单位
				divo.setBudgetnum(di.getEquipregistId().getBudgetnum());//总投资预算控制数
				divo.setFundunit(di.getEquipregistId().getFundunit());//资金单位
				vos.add(divo);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		gd.setResults(vos);
		return gd;
	}
	
}
