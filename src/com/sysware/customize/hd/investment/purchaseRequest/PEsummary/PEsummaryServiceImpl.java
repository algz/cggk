package com.sysware.customize.hd.investment.purchaseRequest.PEsummary;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;
import com.luck.itumserv.services.security.Identity;
import com.sun.org.apache.commons.beanutils.BeanUtils;
import com.sysware.customize.cac.tc.material.MyTool;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAOImp;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.dao.CivilDetailsDao;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.dao.CivilRepairSummaryDao;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.dao.EquipPlanDao;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.dao.SpecialProjectDao;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.dao.StockSummaryDao;
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

@Name("peSummaryServiceImpl")
public class PEsummaryServiceImpl implements PEsummaryService {

	@In(create = true, value = "equipPlanDaoImpl")	
	private EquipPlanDao equipPlanDaoImpl;
	
	@In(create = true, value = "civilDetailsDaoImpl")
	private CivilDetailsDao civilDetailsDaoImpl;
	
	@In(create = true, value = "civilRepairSummaryDaoImpl")
	private CivilRepairSummaryDao civilRepairSummaryDaoImpl;
	
	@In(create = true, value = "specialProjectDaoImpl")
	private SpecialProjectDao specialProjectDaoImpl;
	
	@In(create = true ,value = "stockSummaryDaoImpl")
	private StockSummaryDao stockSummaryDaoImpl;
	
	@In(create = true)
	Identity identity; 
	
	public int getEquipPlanCount() {
		return equipPlanDaoImpl.getEquipPlanCount();
	}

	public List<EquipRegist> getEquipPlanList(EquipRegistVo vo) {
		List<EquipRegist> list = equipPlanDaoImpl.getEquipPlanList(vo);
		for(EquipRegist equip : list){
			if(equip.getApprovalstate().equals("3")){
				equip.setApprovalstate("待审批");
			}else if(equip.getApprovalstate().equals("4")){
				equip.setApprovalstate("审批中");
			}else if(equip.getApprovalstate().equals("-3")){
				equip.setApprovalstate("已退回");
			}else if(equip.getApprovalstate().equals("0")){
				equip.setApprovalstate("待审批*");
			}else {
				equip.setApprovalstate("已审批");
			}
			equip.setCreatetime(UtilDAOImp.dateToStr(UtilDAOImp.strToDate(equip.getCreatetime(),"yyyy-MM-dd hh:mm:ss"), "yyyy-MM-dd hh:mm:ss"));
			equip.setFundunit("万元");
		}
		return list;
	}

	public String editEquipPlan(String id, String column, String value) {
		return equipPlanDaoImpl.editEquipPlan(id,column,value);
	}
	
	public String editEquipRepair(String id, String column, String value) {
		return equipPlanDaoImpl.editEquipRepair(id,column,value);
	}

	public int getCivilDetailsCount() {
		return civilDetailsDaoImpl.getCivilDetailsCount();
	}

	public List<CivilRegist> getCivilDetailsList(CivilRegistVo vo) {
		List<CivilRegist> list = civilDetailsDaoImpl.getCivilDetailsList(vo);
		for(CivilRegist civil : list){
			if(civil.getApprovalstate().equals("3")){
				civil.setApprovalstate("待审批");
			}else if(civil.getApprovalstate().equals("4")){
				civil.setApprovalstate("审批中");
			}else if(civil.getApprovalstate().equals("-3")){
				civil.setApprovalstate("已退回");
			}else if(civil.getApprovalstate().equals("0")){
				civil.setApprovalstate("待审批*");
			}else {
				civil.setApprovalstate("已审批");
			}
			civil.setFundunit("万元");
		}
		return list;
	}

	@Transactional
	public String editCivilDetails(String id, String column, String value) {
		return civilDetailsDaoImpl.editCivilDetails(id,column,value);
	}
	
	@Transactional
	public String editCivilRepair(String id, String column, String value) {
		return civilDetailsDaoImpl.editCivilRepair(id,column,value);
	}

	public int getEquipRepairGroupCount() {
		return civilRepairSummaryDaoImpl.getCivilRepairGroupCount();
	}

	public List<EquipRepair> getEquipRepairGroupList(EquipRepairVo vo) {
		List<EquipRepair> list = civilRepairSummaryDaoImpl.getEquipRepairGroupList(vo);
		for(EquipRepair er : list){
			if(er.getApprovalstate().equals("3")){
				er.setApprovalstate("待审批");
			}else if(er.getApprovalstate().equals("4")){
				er.setApprovalstate("审批中");
			}else if(er.getApprovalstate().equals("-3")){
				er.setApprovalstate("已退回");
			}else {
				er.setApprovalstate("已审批");
			}
		}
		return list;
	}

	public int getCivilRepairStockCount() {
		return civilRepairSummaryDaoImpl.getCivilRepairStockCount();
	}

	public List<CivilRepair> getCivilRepairStockList(CivilRepairVo vo) {
		List<CivilRepair> list = civilRepairSummaryDaoImpl.getCivilRepairStockList(vo);
		for(CivilRepair civil : list){
			if(civil.getApprovalstate().equals("3")){
				civil.setApprovalstate("待审批");
			}else if(civil.getApprovalstate().equals("4")){
				civil.setApprovalstate("审批中");
			}else if(civil.getApprovalstate().equals("-3")){
				civil.setApprovalstate("已退回");
			}else {
				civil.setApprovalstate("已审批");
			}
		}
		return list;
	}

	@Transactional
	public void updateApprovalState(String id, String flag, String table) {
//		flag为3的要存入汇总表
		if(table.equals("CivilDetails")){
			civilDetailsDaoImpl.updateApprovalState(id,flag);
			if(flag.equals("5")){
				stockSummaryDaoImpl.saveCivilDetailsSummary(id);
			}
		}else if(table.equals("EquipPlan")){
			equipPlanDaoImpl.updateApprovalState(id,flag);
			if(flag.equals("5")){
				stockSummaryDaoImpl.saveEquipPlanSummary(id);
			}
		}else if(table.equals("CivilRepairSummary")){
			civilRepairSummaryDaoImpl.updateApprovalState(id,flag);
			if(flag.equals("5")){
				stockSummaryDaoImpl.saveCivilRepairSummary(id);
			}
		}else if(table.equals("EquipRepairSummary")){
			civilRepairSummaryDaoImpl.updateEquipRepairApprovalState(id,flag);
//			if(flag.equals("5")){
//				stockSummaryDaoImpl.saveEquipRepairSummary(id);
//			}
		}else if(table.equals("SpecialProject")){
			specialProjectDaoImpl.updateApprovalState(id,flag);
			if(flag.equals("3")){
				stockSummaryDaoImpl.saveSpecialProjectSummary(id);
			}
		}else if(table.equals("StockSummary")){
			stockSummaryDaoImpl.updateApprovalState(id,flag);
		}
		
	}

	public List<EquipRegist> getEquipPlanById(String id) {
		List<EquipRegist> list = equipPlanDaoImpl.getEquipPlanById(id);
		for(EquipRegist equip : list){
			if(equip.getApprovalstate().equals("3")){
				equip.setApprovalstate("待审批");
			}else if(equip.getApprovalstate().equals("4")){
				equip.setApprovalstate("审批中");
			}else if(equip.getApprovalstate().equals("-3")){
				equip.setApprovalstate("已退回");
			}else if(equip.getApprovalstate().equals("0")){
				equip.setApprovalstate("待审批*");
			}else {
				equip.setApprovalstate("已审批");
			}
		}
		return list;
	}

	public List<CivilRegist> getCivilDetailsById(String id) {
		List<CivilRegist> list = civilDetailsDaoImpl.getCivilDetailsById(id);
		for(CivilRegist civil : list){
			if(civil.getApprovalstate().equals("3")){
				civil.setApprovalstate("待审批");
			}else if(civil.getApprovalstate().equals("4")){
				civil.setApprovalstate("审批中");
			}else if(civil.getApprovalstate().equals("-3")){
				civil.setApprovalstate("已退回");
			}else if(civil.getApprovalstate().equals("0")){
				civil.setApprovalstate("待审批*");
			}else {
				civil.setApprovalstate("已审批");
			}
		}
		return list;
	}

	public List<CivilRepair> getCivilRepairById(String id) {
		List<CivilRepair> list = civilRepairSummaryDaoImpl.getCivilRepairById(id);
		for(CivilRepair civil : list){
			if(civil.getApprovalstate().equals("3")){
				civil.setApprovalstate("待审批");
			}else if(civil.getApprovalstate().equals("4")){
				civil.setApprovalstate("审批中");
			}else if(civil.getApprovalstate().equals("-3")){
				civil.setApprovalstate("已退回");
			}else {
				civil.setApprovalstate("已审批");
			}
		}
		return list;
	}
	
	public List<EquipRepair> getEquipRepairById(String id) {
		List<EquipRepair> list = civilRepairSummaryDaoImpl.getEquipRepairById(id);
		for(EquipRepair er : list){
			if(er.getApprovalstate().equals("3")){
				er.setApprovalstate("待审批");
			}else if(er.getApprovalstate().equals("4")){
				er.setApprovalstate("审批中");
			}else if(er.getApprovalstate().equals("-3")){
				er.setApprovalstate("已退回");
			}else {
				er.setApprovalstate("已审批");
			}
		}
		return list;
	}

	@Transactional
	public String saveSpecialProject(SpecialProject sp) {
		try {
			sp.setCreateperson(identity.getLoginUser().getTruename());
			sp.setCreatetime(new Date());
			sp.setApprovalstate(1l);
			sp.setContractmoney(new BigDecimal("0"));
			specialProjectDaoImpl.saveSpecialProject(sp);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}

	public int getSpecialProjectCount() {
		return specialProjectDaoImpl.getSpecialProjectCount();
	}
	
	public int getSpecialProjectDetailsCount(String id) {
		return specialProjectDaoImpl.getSpecialProjectDetailsCount(id);
	}

	public List<SpecialProjectVo> getSpecialProjectList(Pager pager) {
		List<SpecialProjectVo> retList = new ArrayList<SpecialProjectVo>();
		List<SpecialProject> list = specialProjectDaoImpl.getSpecialProjectList(pager);
		for(SpecialProject sp : list){
			SpecialProjectVo vo = new SpecialProjectVo();
			vo.setCostunit("万元");
			vo.setCreateperson(sp.getCreateperson());
			vo.setCreatetime(MyTool.dateToStr(sp.getCreatetime(),"yyyy-MM-dd hh:mm:ss"));
			vo.setId(sp.getId());
			vo.setProjectname(sp.getProjectname());
			vo.setProjectnum(sp.getProjectnum());
			vo.setRemark(sp.getRemark());
			vo.setContractmoney(new String().valueOf(sp.getContractmoney()));
			if(sp.getApprovalstate()==1l){
				vo.setApprovalstate("待审批");
			}else if(sp.getApprovalstate()==2l){
				vo.setApprovalstate("审批中");
			}else if(sp.getApprovalstate()==-1l){
				vo.setApprovalstate("已退回");
			}else {
				vo.setApprovalstate("已审批");
			}
			retList.add(vo);
		}
		return retList;
	}
	

	@Transactional
	public String saveSpecialProjectDetail(String id, SpecialProjectDetails spd) {
		try {
//			1.保存320专项计划明细
			SpecialProject sp = specialProjectDaoImpl.getSpecialProjectById(id).get(0);
			spd.setSpecialproject(sp);
			spd.setCreatetime(new Date());
			specialProjectDaoImpl.saveSpecialProjectDetail(spd);
//			2.查询320专项计划明细合同金额总额
			String money = specialProjectDaoImpl.getSumContractmoney(id);
//			3.更新320专项计划合同金额
			specialProjectDaoImpl.updateSpecialProjectContractmoney(id, money);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}

	public List<SpecialProjectDetails> getSpecialProjectDetailsById(String id) {
		return specialProjectDaoImpl.getSpecialProjectDetailsById(id);
	}

	public int getStockSummaryCount() {
		return stockSummaryDaoImpl.getStockSummaryCount();
	}

	public List<Stocksummary> getStockSummaryList(StocksummaryVo vo) {
		List<Stocksummary> list = stockSummaryDaoImpl.getStockSummaryList(vo);
		for(Stocksummary ss : list){
			BigDecimal self = ss.getAnnualinvestself()==null?new BigDecimal("0"):ss.getAnnualinvestself();
			BigDecimal country = ss.getAnnualinvestcountry()==null?new BigDecimal("0"):ss.getAnnualinvestcountry();
			ss.setAnnualinvesttotal(self.add(country));
		}
		return list;
	}

	@Transactional
	public String editStockSummary(String id, String column, String value) {
		return stockSummaryDaoImpl.editStockSummary(id,column,value);
	}

	public List<Stocksummary> getStockSummaryById(String id) {
		return stockSummaryDaoImpl.getStockSummaryById(id);
	}

	@Transactional
	public void delSpecialProject(String[] id) {
		for(int i = 0; i < id.length; i ++){
			SpecialProject sp = (SpecialProject)specialProjectDaoImpl.getSpecialProjectById(id[i]).get(0);
			specialProjectDaoImpl.delSpecialProject(sp);
		}
	}

	@Transactional
	public void delSpecialProjectDetail(String[] id,String idd) {
		for(int i = 0; i < id.length; i ++){
			specialProjectDaoImpl.delSpecialProjectDetail(id[i]);
		}
//		2.查询320专项计划明细合同金额总额
		String money = specialProjectDaoImpl.getSumContractmoney(idd);
		
//		3.更新320专项计划合同金额
		specialProjectDaoImpl.updateSpecialProjectContractmoney(idd, money);
	}

	public List<StockInspectVo> getSpecialProjectList(StockInspectVo vo) {
		List<SpecialProject> list = specialProjectDaoImpl.getSpecialProjectList(vo);
		List<StockInspectVo> retList = new ArrayList<StockInspectVo>();
		for(SpecialProject sp : list){
			StockInspectVo svo = new StockInspectVo();
			svo.setProcurementplan_id(sp.getId());
			svo.setProcurementplan_name(sp.getProjectname());
			svo.setProcurementplan_code(sp.getProjectnum());
			svo.setAmount(sp.getContractmoney() == null?0l:sp.getContractmoney().doubleValue());
			svo.setPlantype("1");
			svo.setUserName(sp.getCreateperson());
			svo.setEditdate(sp.getCreatetime().toString());
			svo.setSenddate(sp.getApprovaltime().toString());
			svo.setStatus(sp.getApprovalstate().toString());
			
			retList.add(svo);
		}
		return retList;
	}
	
	@Transactional
	public String appointPersonToCivilRegist(String id, String person) {
		
		return civilDetailsDaoImpl.appointPersonToCivilRegist(id,person);
	}
	@Transactional
	public String appointPersonToEquipRegist(String id, String person) {
		return equipPlanDaoImpl.appointPersonToEquipRegist(id,person);		
	}
	@Transactional
	public String appointPersonToCivilRepair(String id, String person) {
		return civilRepairSummaryDaoImpl.appointPersonToCivilRepair(id,person);
	}

	
	@Transactional
	public String appointPersonToEquipRepair(String id, String person) {
		return civilRepairSummaryDaoImpl.appointPersonToEquipRepair(id,person);
	}
	
	@Transactional
	public void saveCivilDetails(CivilRegistVo vo) throws Exception {
		CivilRegist cr = new CivilRegist();
		cr.setProjectname(vo.getProjectname());
		cr.setConstructiontype(vo.getConstructiontype());
		cr.setNums(vo.getNums());
		cr.setNumsunit(vo.getNumsunit());
		cr.setFundsource(vo.getFundsource());
		cr.setConstructionsite(vo.getConstructionsite());
		cr.setRemarke(vo.getRemarke());
		cr.setCreatetime(MyTool.dateToStr(new Date(),"yyyy-MM-dd hh:mm:ss"));
		cr.setCreateperson(identity.getLoginUser().getTruename());
		cr.setHeadperson(identity.getLoginUser().getTruename());
		cr.setApprovalstate("0");
		civilDetailsDaoImpl.saveCivilDetails(cr);
	}

	@Transactional
	public void delCivilDetails(String[] id) throws Exception {
		for(int i = 0; i < id.length; i ++){
			civilDetailsDaoImpl.delCivilDetails(id[i]);
		}
	}
	@Transactional
	public void saveEquipPlan(EquipRegistVo vo) throws Exception {
		EquipRegist er = new EquipRegist();
		er.setProjectname(vo.getProjectname());
		er.setReferencemodel(vo.getReferencemodel());
		er.setMainparam(vo.getMainparam());
		er.setNums(vo.getNums());
		er.setNumsunit(vo.getNumsunit());
		er.setInstallsite(vo.getInstallsite());
		er.setRemarke(vo.getRemarke());
		er.setCreatetime(MyTool.dateToStr(new Date(),"yyyy-MM-dd hh:mm:ss"));
		er.setCreateperson(identity.getLoginUser().getTruename());
		er.setHeadperson(identity.getLoginUser().getTruename());
		er.setApprovalstate("0");
		equipPlanDaoImpl.saveEquipPlan(er);
	}
	@Transactional
	public void delEquipPlan(String[] id) throws Exception {
		for(int i = 0; i < id.length; i ++){
			equipPlanDaoImpl.delEquipPlan(id[i]);
		}
	}
	
}
