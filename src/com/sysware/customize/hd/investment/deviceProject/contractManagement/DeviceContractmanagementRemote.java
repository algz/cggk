/**
 * 
 */
package com.sysware.customize.hd.investment.deviceProject.contractManagement;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;

/**
 * @author algz
 * 
 */
@Name("deviceContractmanagementRemote")
public class DeviceContractmanagementRemote {

	@In(create = true, value = "deviceContractmanagementServiceImp")
	private DeviceContractmanagementService service;

	/**
	 * 查询合同管理GRID所有数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<DeviceContractmanagementVo> getGridData(DeviceContractmanagementVo vo) {
		GridData<DeviceContractmanagementVo> gd = new GridData<DeviceContractmanagementVo>();
		List<DeviceContractmanagementVo> vos = new ArrayList<DeviceContractmanagementVo>();
		try {
			List<DeviceContractmanagement> list = service.getGridData(vo);
			for (DeviceContractmanagement dc : list) {
				DeviceContractmanagementVo dcvo = new DeviceContractmanagementVo();
				BeanUtils.copyProperties(dcvo, dc);
				if(dc.getEquipregistId()!=null){
					if(dc.getContracttype().equals("1")){//设备
						dcvo.setProjectname(dc.getEquipregist().getProjectname());
						dcvo.setProjectnum(dc.getEquipregist().getProjectnum());
					}else if(dc.getContracttype().equals("2")){//土建
						dcvo.setProjectname(dc.getCivilregist().getProjectname());
						dcvo.setProjectnum(dc.getCivilregist().getProjectnum());
					}else if(dc.getContracttype().equals("3")){//设备大修
						dcvo.setProjectname(dc.getEquiprepair().getRepairequipname());
						dcvo.setProjectnum(dc.getEquiprepair().getProjectnum());
					}else if(dc.getContracttype().equals("4")){//土建大修
						dcvo.setProjectname(dc.getCivilrepair().getRepairproject());
						dcvo.setProjectnum(dc.getCivilrepair().getProjectnum());
					}
//					dcvo.setEquipregistId(dc.getEquipregistId());
					dcvo.setPartyb(dc.getPartyb().getVendorID());//供应商ID
					dcvo.setPartybname(dc.getPartyb().getVendorName());//供应商名称

				}
				vos.add(dcvo);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		gd.setResults(vos);
		gd.setTotalProperty(vo.getCount());
		return gd;
	}

	/**
	 * 保存合同管理数据
	 * @param vo
	 * @return
	 */
	@WebRemote    
	public String saveDeviceContractmanagement(DeviceContractmanagementVo vo){
		String msg=service.saveDeviceContractmanagement(vo);
		return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
	}
	
	
	public String deleteDeviceContractmanagement(DeviceContractmanagementVo vo){
		String msg=service.deleteDeviceContractmanagement(vo);
		return "{success:"+(msg.equals("")?true:false)+",msg:'"+msg+"'}";
	}
}
