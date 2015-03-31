package com.sysware.customize.hd.investment.purchaseRequest.PEsummary;

import java.util.List;

import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity.SpecialProject;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity.SpecialProjectDetails;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity.Stocksummary;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.CivilRegistVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.CivilRepairVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.EquipRegistVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.EquipRepairVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.SpecialProjectVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.StocksummaryVo;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.StockInspectVo;

public interface PEsummaryService {

	/**
	 * 获取设备项目计划总数
	 * @return
	 */
	public int getEquipPlanCount();
	
	/**
	 * 获取设备项目计划列表
	 * @param pager
	 * @return
	 */
	public List<EquipRegist> getEquipPlanList(EquipRegistVo vo);
	
	/**
	 * 修改设备项目计划
	 * @param id
	 * @param column
	 * @param value
	 * @return
	 */
	public String editEquipPlan(String id,String column ,String value);
	
	/**
	 * 修改设备项目计划
	 * @param id
	 * @param column
	 * @param value
	 * @return
	 */
	public String editEquipRepair(String id,String column ,String value);
	
	/**
	 * 获取投资计划土建项目明细表总数
	 * @return
	 */
	public int getCivilDetailsCount();
	
	/**
	 * 获取土建项目列表
	 * @param pager
	 * @return
	 */
	public List<CivilRegist> getCivilDetailsList(CivilRegistVo vo);
	
	/**
	 * 修改土建项目明细
	 * @param id
	 * @param column
	 * @param value
	 * @return
	 */
	public String editCivilDetails(String id,String column ,String value);
	
	/**
	 * 修改土建大修项目
	 * @param id
	 * @param column
	 * @param value
	 * @return
	 */
	public String editCivilRepair(String id,String column ,String value);
	
	/**
	 * 获取土建大修列表（股份）
	 * @param pager
	 * @return
	 */
	public List<CivilRepair> getCivilRepairStockList(CivilRepairVo vo);
	
	/**
	 * 获取土建大修总数（股份）
	 * @return
	 */
	public int getCivilRepairStockCount();
	
	/**
	 * 获取设备大修列表（股份、集团）
	 * @param pager
	 * @return
	 */
	public List<EquipRepair> getEquipRepairGroupList(EquipRepairVo vo);
	
	/**
	 * 获取设备大修列表总数（股份、集团）
	 * @return
	 */
	public int getEquipRepairGroupCount();
	
	/**
	 * 修改设备工程申报汇总审批状态
	 * @param id
	 * @param flag
	 */
	public void updateApprovalState(String id,String flag,String table);
	
	/**
	 * 根据id查询设备项目计划信息
	 * @param id
	 * @return
	 */
	public List<EquipRegist> getEquipPlanById(String id);
	
	/**
	 * 根据id查询土建项目明细
	 * @param id
	 * @return
	 */
	public List<CivilRegist> getCivilDetailsById(String id);
	
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
	 * 保存320 专项计划
	 * @param sp
	 * @return
	 */
	public String saveSpecialProject(SpecialProject sp);
	
	/**
	 * 获取320专项计划列表
	 * @param page
	 * @return
	 */
	public List<SpecialProjectVo> getSpecialProjectList(Pager pager);
	
	/**
	 * 获取320专项计划总数
	 * @return
	 */
	public int getSpecialProjectCount();
	
	/**
	 * 获取320专项计划明细总数
	 * @param id
	 * @return
	 */
	public int getSpecialProjectDetailsCount(String id);
	/**
	 * 保存320专项计划明细
	 * @param id 320项目计划id
	 * @param spd
	 * @return
	 */
	public String saveSpecialProjectDetail(String id,SpecialProjectDetails spd);
	
	
	/**
	 * 获取320专项计划明细列表
	 * @param id
	 * @return
	 */
	public List<SpecialProjectDetails> getSpecialProjectDetailsById(String id);
	
	/**
	 * 获取固定资产投资预算汇总列表
	 * @param pager
	 * @return
	 */
	public List<Stocksummary> getStockSummaryList(StocksummaryVo vo);
	
	/**
	 * 获取固定资产预算投资汇总总数
	 * @return
	 */
	public int getStockSummaryCount();
	
	/**
	 * 编辑固定资产投资预算汇总表
	 * @param id
	 * @param column
	 * @param value
	 * @return
	 */
	public String editStockSummary(String id,String column ,String value);
	
	/**
	 * 根据id查询固定资产投资预算审批信息
	 * @param id
	 * @return
	 */
	public List<Stocksummary> getStockSummaryById(String id);
	
	/**
	 * 删除专项计划
	 * @param id
	 */
	public void delSpecialProject(String[] id);
	
	/**
	 * 删除专项计划明细
	 * @param id
	 */
	public void delSpecialProjectDetail(String[] id,String idd);
	
	/**
	 * 顶层监控条件查询采购计划
	 * @param vo
	 * @return
	 */
	public List<StockInspectVo> getSpecialProjectList(StockInspectVo vo);
	
	/**
	 * 土建任务指派
	 * @param id
	 * @param person
	 * @return
	 */
	public String appointPersonToCivilRegist(String id,String person);
	
	

	/**
	 * 设备任务指派
	 * @param id
	 * @param person
	 * @return
	 */
	public String appointPersonToEquipRegist(String id,String person);
	/**
	 * 土建大修任务指派
	 * @param id
	 * @param person
	 * @return
	 */
	public String appointPersonToCivilRepair(String id,String person);
	/**
	 * 设备大修任务指派
	 * @param id
	 * @param person
	 * @return
	 */
	public String appointPersonToEquipRepair(String id,String person);
	
	/**
	 * 添加一条土建项目投资计划记录
	 * @param vo
	 * @return
	 */
	public void saveCivilDetails(CivilRegistVo vo) throws Exception;
	
	/**
	 * 删除土建项目投资计划
	 * @param id
	 * @throws Exception
	 */
	public void delCivilDetails(String[] id) throws Exception;
	
	/**
	 * 添加一条设备项目投资计划记录
	 * @param vo
	 * @throws Exception
	 */
	public void saveEquipPlan(EquipRegistVo vo) throws Exception;
	
	/**
	 * 删除设备项目投资计划
	 * @param id
	 * @throws Exception
	 */
	public void delEquipPlan(String[] id) throws Exception;
}
