package com.sysware.customize.hd.investment.purchaseRequest.PEplan;

import java.util.List;

import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.CivilRepairVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.EquipRepairVo;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.StockInspectVo;

public interface PEplanService {

	/**
	 * 获取设备采购计划列表
	 * @param pager
	 * @return
	 */
	public List<EquipRegist> getEquipRegistPlanList(Pager pager);
	
	/**
	 * 获取设备采购计划总数
	 * @return
	 */
	public int getEquipRegistPlanCount();
	
	/**
	 * 编辑设备采购计划
	 * @param id
	 * @param column
	 * @param value
	 * @return
	 */
	public String editEquipPurchasePlan(String id,String column,String value);
	

	/**
	 * 获取土建采购计划列表
	 * @param pager
	 * @return
	 */
	public List<CivilRegist> getCivilRegistPlanList(Pager pager);
	
	/**
	 * 获取设备采购计划总数
	 * @return
	 */
	public int getCivilRegistPlanCount();
	
	
	/**
	 * 编辑设备采购计划
	 * @param id
	 * @param column
	 * @param value
	 * @return
	 */
	public String editCivilPurchasePlan(String id,String column,String value);
	
	/**
	 * 修改设备工程投资计划审批状态
	 * @param id
	 * @param flag
	 */
	public void updateApprovalState(String id,String flag,String table);
	
	/**
	 * 根据id查询设备采购计划审批详细
	 * @param id
	 * @return
	 */
	public List<EquipRegist> getEquipRegistPlanById(String id);
	
	/**
	 * 根据id查询土建采购计划审批详细
	 * @param id
	 * @return
	 */
	public List<CivilRegist> getCivilRegistPlanById(String id);
	
	/**
	 * 顶层监控条件查询土建采购计划
	 * @param vo
	 * @return
	 */
	public List<StockInspectVo> getCivilRegistList(StockInspectVo vo);
	
	/**
	 * 顶层监控条件查询设备采购计划
	 * @param vo
	 * @return
	 */
	public List<StockInspectVo> getEquipRegistList(StockInspectVo vo);
	/**
	 * 获取土建大修列表（股份）
	 * @param pager
	 * @return
	 */
	public List<CivilRepair> getCivilRepairPlanList(CivilRepairVo vo);
	/**
	 * 获取设备大修列表（股份、集团）
	 * @param pager
	 * @return
	 */
	public List<EquipRepair> getEquipRepairPlanList(EquipRepairVo vo);
	/**
	 * 根据id查询土建大修项目明细(股份、集团)
	 * @param id
	 * @return
	 */
	public List<CivilRepair> getCivilRepairById(String id);
	
	/**
	 * 根据id查询设备大修项目明细(股份、集团)
	 * @param id
	 * @return
	 */
	public List<EquipRepair> getEquipRepairById(String id);
	
	/**
	 * 编辑土建大修计划
	 * @param id
	 * @param column
	 * @param value
	 * @return
	 */
	public String editCivilRepairPlan(String id,String column,String value);
	
	/**
	 * 编辑设备大修计划
	 * @param id
	 * @param column
	 * @param value
	 * @return
	 */
	public String editEquipRepairPlan(String id,String column,String value);
}
