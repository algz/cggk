package com.sysware.customize.hd.investment.purchaseRequest.PEplan;

import java.util.ArrayList;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEplan.dao.CivilRegistPlanDao;
import com.sysware.customize.hd.investment.purchaseRequest.PEplan.dao.EquipRegistPlanDao;
import com.sysware.customize.hd.investment.purchaseRequest.PEplan.dao.RepairPlanDao;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.CivilRepairVo;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.EquipRepairVo;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.StockInspectVo;

@Name("pePlanServiceImpl")
public class PEplanServiceImpl implements PEplanService {

	@In(create = true, value = "equipRegistPlanDaoImpl")	
	private EquipRegistPlanDao equipRegistPlanDaoImpl;
	
	@In(create = true, value = "civilRegistPlanDaoImpl")	
	private CivilRegistPlanDao civilRegistPlanDaoImpl;
	
	@In(create = true, value = "repairPlanDaoImpl")
	private RepairPlanDao repairPlanDaoImpl;
	
	public int getEquipRegistPlanCount() {
		return equipRegistPlanDaoImpl.getEquipRegistPlanCount();
	}

	public List<EquipRegist> getEquipRegistPlanList(Pager pager) {
		List<EquipRegist> list = equipRegistPlanDaoImpl.getEquipRegistPlanList(pager);
		for(EquipRegist equip : list){
			if(equip.getApprovalstate().equals("5")){
				equip.setApprovalstate("待审批");
			}else if(equip.getApprovalstate().equals("6")){
				equip.setApprovalstate("审批中");
			}else if(equip.getApprovalstate().equals("-5")){
				equip.setApprovalstate("已退回");
			}else {
				equip.setApprovalstate("已审批");
			}
		}
		return list;
	
	}

	@Transactional
	public String editEquipPurchasePlan(String id, String column, String value) {
		return equipRegistPlanDaoImpl.editEquipPurchasePlan(id,column,value);
	}
	
	public int getCivilRegistPlanCount() {
		return civilRegistPlanDaoImpl.getCivilRegistPlanCount();
	}

	public List<CivilRegist> getCivilRegistPlanList(Pager pager) {
		List<CivilRegist> list = civilRegistPlanDaoImpl.getCivilRegistPlanList(pager);
		for(CivilRegist civil : list){
			if(civil.getApprovalstate().equals("5")){
				civil.setApprovalstate("待审批");
			}else if(civil.getApprovalstate().equals("6")){
				civil.setApprovalstate("审批中");
			}else if(civil.getApprovalstate().equals("-5")){
				civil.setApprovalstate("已退回");
			}else {
				civil.setApprovalstate("已审批");
			}
		}
		return list;
	}

	@Transactional
	public String editCivilPurchasePlan(String id, String column, String value) {
		return civilRegistPlanDaoImpl.editCivilPurchasePlan(id,column,value);
	}

	@Transactional
	public void updateApprovalState(String id, String flag, String table) {
		if(table.equals("CivilPurchasePlan")){
			civilRegistPlanDaoImpl.updateApprovalState(id,flag);
		}else if(table.equals("EquipPurchasePlan")){
			equipRegistPlanDaoImpl.updateApprovalState(id,flag);
		}else if(table.equals("EquipRepairPlan")){
			repairPlanDaoImpl.updateEquipApprovalState(id,flag);
		}else if(table.equals("civilRepairPlan")){
			repairPlanDaoImpl.updateCivilApprovalState(id,flag);
		}
		
	}

	public List<CivilRegist> getCivilRegistPlanById(String id) {
		List<CivilRegist> list = civilRegistPlanDaoImpl.getCivilRegistPlanById(id);
		for(CivilRegist civil : list){
			if(civil.getApprovalstate().equals("5")){
				civil.setApprovalstate("待审批");
			}else if(civil.getApprovalstate().equals("6")){
				civil.setApprovalstate("审批中");
			}else if(civil.getApprovalstate().equals("-5")){
				civil.setApprovalstate("已退回");
			}else {
				civil.setApprovalstate("已审批");
			}
		}
		return list;
	}

	public List<EquipRegist> getEquipRegistPlanById(String id) {
		List<EquipRegist> list = equipRegistPlanDaoImpl.getEquipRegistPlanById(id);
		for(EquipRegist equip : list){
			if(equip.getApprovalstate().equals("5")){
				equip.setApprovalstate("待审批");
			}else if(equip.getApprovalstate().equals("6")){
				equip.setApprovalstate("审批中");
			}else if(equip.getApprovalstate().equals("-5")){
				equip.setApprovalstate("已退回");
			}else {
				equip.setApprovalstate("已审批");
			}
		}
		return list;
	}

	public List<StockInspectVo> getCivilRegistList(StockInspectVo vo) {
		List<CivilRegist> list = civilRegistPlanDaoImpl.getCivilRegistPlanList(vo);
		List<StockInspectVo> retList = new ArrayList<StockInspectVo>();
		for(CivilRegist civil : list){
			StockInspectVo svo = new StockInspectVo();
			svo.setProcurementplan_id(civil.getId());
			svo.setProcurementplan_name(civil.getProjectname());
			svo.setProcurementplan_code(civil.getProjectnum());
			svo.setAmount(civil.getInvestmentbudget().doubleValue());
			svo.setPlantype("3");
			svo.setUserName(civil.getCreateperson());
			svo.setEditdate(civil.getCreatetime()+".0");
			svo.setSenddate(civil.getApprovaltime()+".0");
			if(civil.getApprovalstate().equals("5")){
				svo.setStatus("1");
			}else if(civil.getApprovalstate().equals("6")){
				svo.setStatus("2");
			}else{
				svo.setStatus("3");
			}
			
			retList.add(svo);
		}
		return retList;
	}

	public List<StockInspectVo> getEquipRegistList(StockInspectVo vo) {
		List<EquipRegist> list = equipRegistPlanDaoImpl.getEquipRegistPlanList(vo);
		List<StockInspectVo> retList = new ArrayList<StockInspectVo>();
		for(EquipRegist equip : list){
			StockInspectVo svo = new StockInspectVo();
			svo.setProcurementplan_id(equip.getId());
			svo.setProcurementplan_name(equip.getProjectname());
			svo.setProcurementplan_code(equip.getProjectnum());
			svo.setAmount(Double.valueOf(equip.getInvestmentplan()==null?"0":equip.getInvestmentplan()));
			svo.setPlantype("4");
			svo.setUserName(equip.getCreateperson());
			svo.setEditdate(equip.getCreatetime()+".0");
			svo.setSenddate(equip.getApprovaltime()+".0");
			if(equip.getApprovalstate().equals("5")){
				svo.setStatus("1");
			}else if(equip.getApprovalstate().equals("6")){
				svo.setStatus("2");
			}else{
				svo.setStatus("3");
			}
			retList.add(svo);
		}
		return retList;
	}

	public List<CivilRepair> getCivilRepairPlanList(CivilRepairVo vo) {
		List<CivilRepair> list = repairPlanDaoImpl.getCivilRepairPlanList(vo);
		for(CivilRepair civil : list){
			if(civil.getApprovalstate().equals("5")){
				civil.setApprovalstate("待审批");
			}else if(civil.getApprovalstate().equals("6")){
				civil.setApprovalstate("审批中");
			}else if(civil.getApprovalstate().equals("-5")){
				civil.setApprovalstate("已退回");
			}else {
				civil.setApprovalstate("已审批");
			}
		}
		return list;
	}

	public List<EquipRepair> getEquipRepairPlanList(EquipRepairVo vo) {
		List<EquipRepair> list = repairPlanDaoImpl.getEquipRepairPlanList(vo);
		for(EquipRepair er : list){
			if(er.getApprovalstate().equals("5")){
				er.setApprovalstate("待审批");
			}else if(er.getApprovalstate().equals("6")){
				er.setApprovalstate("审批中");
			}else if(er.getApprovalstate().equals("-5")){
				er.setApprovalstate("已退回");
			}else {
				er.setApprovalstate("已审批");
			}
		}
		return list;
	}

	public List<CivilRepair> getCivilRepairById(String id) {
		List<CivilRepair> list = repairPlanDaoImpl.getCivilRepairById(id);
		for(CivilRepair civil : list){
			if(civil.getApprovalstate().equals("5")){
				civil.setApprovalstate("待审批");
			}else if(civil.getApprovalstate().equals("6")){
				civil.setApprovalstate("审批中");
			}else if(civil.getApprovalstate().equals("-5")){
				civil.setApprovalstate("已退回");
			}else {
				civil.setApprovalstate("已审批");
			}
		}
		return list;
	}

	public List<EquipRepair> getEquipRepairById(String id) {
		List<EquipRepair> list = repairPlanDaoImpl.getEquipRepairById(id);
		for(EquipRepair er : list){
			if(er.getApprovalstate().equals("5")){
				er.setApprovalstate("待审批");
			}else if(er.getApprovalstate().equals("6")){
				er.setApprovalstate("审批中");
			}else if(er.getApprovalstate().equals("-5")){
				er.setApprovalstate("已退回");
			}else {
				er.setApprovalstate("已审批");
			}
		}
		return list;
	}

	public String editCivilRepairPlan(String id, String column, String value) {
		return repairPlanDaoImpl.editCivilRepairPlan(id,column,value);
	}

	public String editEquipRepairPlan(String id, String column, String value) {
		return repairPlanDaoImpl.editEquipRepairPlan(id,column,value);
	}
	
	
}
