package com.sysware.customize.hd.investment.purchaseRequest.PEdeclare;

import java.util.List;

import com.luck.itumserv.entity.Department;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;

public interface PEdeclareService {

	/**
	 * 获取所有部门
	 * @return
	 */
	public List<Department> getDeptypeList();
	
	/**
	 * 土建登记录入
	 * @param civil
	 * @return
	 */
	public String saveCivilRegist(CivilRegist civil);
	
	/**
	 * 获取土建登记列表
	 * @param pager
	 * @return
	 */
	public List<CivilRegist> getCivilRegistList(Pager pager);
	
	/**
	 * 获取土建总数
	 * @return
	 */
	public int getCivilRegistCount();
	
	/**
	 * 获取土建大修列表
	 * @return
	 */
	public List<CivilRepair> getCivilRepairList(Pager pager);
	
	/**
	 * 获取土建大修总数
	 * @return
	 */
	public int getCivilRepairCount();
	
	/**
	 * 土建大修录入
	 * @param civil
	 * @return
	 */
	public String saveCivilRepair(CivilRepair civil);
	
	/**
	 * 获取设备大修列表
	 * @param pager
	 * @return
	 */
	public List<EquipRepair> getEquipRepairList(Pager pager);
	
	/**
	 * 获取设备大修总数
	 * @return
	 */
	public int getEquipRepairCount();
	
	/**
	 * 设备大修录入
	 * @param equip
	 * @return
	 */
	public String saveEquipRepair(EquipRepair equip);
	
	/**
	 * 获取设备登记列表
	 * @param pager
	 * @return
	 */
	public List<EquipRegist> getEquipRegistList(Pager pager);
	
	/**
	 * 获取设备登记总数
	 * @return
	 */
	public int getEquipRegistCount();
	
	/**
	 * 设备登记录入
	 * @param equip
	 * @return
	 */
	public String saveEquipRegist(EquipRegist equip);
	
	/**
	 * 修改设备工程申报审批状态
	 * @param id
	 * @param flag
	 */
	public void updateApprovalState(String id,String flag,String table);
	
	
	/**
	 * 根据id查询土建登记信息
	 * @param id
	 * @return
	 */
	public List<CivilRegist> getCivilRegistById(String id);
	
	/**
	 * 根据id查询土建大修信息
	 * @param id
	 * @return
	 */
	public List<CivilRepair> getCivilRepairById(String id);
	/**
	 * 根据id查询设备登记信息
	 * @param id
	 * @return
	 */
	public List<EquipRegist> getEquipRegistById(String id);
	/**
	 * 根据id查询设备大修信息
	 * @param id
	 * @return
	 */
	public List<EquipRepair> getEquipRepairById(String id);
	
	/**
	 * 删除土建登记信息
	 * @param id
	 */
	public void delCivilRegist(String id[]);
	
	/**
	 * 删除土建大修信息
	 * @param id
	 */
	public void delCivilRepair(String id[]);
	
	/**
	 * 删除设备登记信息
	 * @param id
	 */
	public void delEquipRegist(String id[]);
	
	/**
	 * 删除设备大修信息
	 * @param id
	 */
	public void delEquipRepair(String id[]);
}
