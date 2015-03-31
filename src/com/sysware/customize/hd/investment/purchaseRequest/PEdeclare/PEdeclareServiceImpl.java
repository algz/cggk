package com.sysware.customize.hd.investment.purchaseRequest.PEdeclare;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;
import com.luck.itumserv.entity.Department;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAOImp;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.dao.CivilRegistDao;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.dao.CivilRepairDao;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.dao.DeptypeDao;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.dao.EquipRegistDao;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.dao.EquipRepairDao;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;

@Name("PEdeclareServiceImpl")
public class PEdeclareServiceImpl implements PEdeclareService {

	@In(create = true, value = "deptypeDaoImpl")	
	 private DeptypeDao deptypeDaoImpl;
	
	@In(create = true, value = "civilRegistDaoImpl")	
	 private CivilRegistDao civilRegistDaoImpl;
	
	@In(create = true, value = "civilRepairDaoImpl")	
	 private CivilRepairDao civilRepairDaoImpl;
	
	@In(create = true, value = "equipRepairDaoImpl")	
	 private EquipRepairDao equipRepairDaoImpl;
	
	@In(create = true, value = "equipRegistDaoImpl")	
	 private EquipRegistDao equipRegistDaoImpl;
	
	@In(create = true)
	Identity identity; 
	
	public List<Department> getDeptypeList() {
		try {
			List<Object[]> list = deptypeDaoImpl.getDeptypeList();
			List<Department> retList = new ArrayList<Department>();
			for(Object[] obj : list){
				Department dep = new Department();
				dep.setDepcode(String.valueOf(obj[0]));
				dep.setDepartmetname(String.valueOf(obj[1]));
				retList.add(dep);
			}
			return retList;
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<Department>();
		}
	}

	@Transactional
	public String saveCivilRegist(CivilRegist civil) {
		try {
			civil.setDeliverytime(civil.getDeliverytime().substring(0,10));//UtilDAOImp.strToDate(civil.getDeliverytime().substring(0,10),"yyyy-MM-dd"), "yyyy-MM-dd HH:mm:ss"));
			civil.setCreatetime(UtilDAOImp.dateToStr(new Date(),"yyyy-MM-dd HH:mm:ss"));
			civil.setApprovalstate("1");
			civil.setCreateperson(identity.getLoginUser().getTruename());
			civilRegistDaoImpl.saveCivilRegist(civil);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}

	public List<CivilRegist> getCivilRegistList(Pager pager) {
		List<CivilRegist> list = civilRegistDaoImpl.getCivilRegistList(pager);
		for(CivilRegist civil : list){
			if(civil.getApprovalstate().equals("1")){
				civil.setApprovalstate("待审批");
			}else if(civil.getApprovalstate().equals("2")){
				civil.setApprovalstate("审批中");
			}else if(civil.getApprovalstate().equals("-1")){
				civil.setApprovalstate("已退回");
			}else{
				civil.setApprovalstate("已审批");
			}
			//Date date = UtilDAOImp.strToDate(civil.getDeliverytime(),"yyyy-MM-dd HH:mm:ss");
			civil.setDeliverytime(civil.getDeliverytime());//UtilDAOImp.dateToStr(date, "yyyy-MM-dd HH:mm:ss"));
		}
		return list;
	}

	public int getCivilRegistCount() {
		
		return civilRegistDaoImpl.getCivilRegistCount();
	}

	public int getCivilRepairCount() {
		
		return civilRepairDaoImpl.getCivilRepairCount();
	}

	public List<CivilRepair> getCivilRepairList(Pager pager) {
		List<CivilRepair> list = civilRepairDaoImpl.getCivilRePairList(pager);
		for(CivilRepair civil : list){
			if(civil.getApprovalstate().equals("1")){
				civil.setApprovalstate("待审批");
			}else if(civil.getApprovalstate().equals("2")){
				civil.setApprovalstate("审批中");
			}else if(civil.getApprovalstate().equals("-1")){
				civil.setApprovalstate("已退回");
			}else{
				civil.setApprovalstate("已审批");
			}
		}
		return list;
	}

	@Transactional
	public String saveCivilRepair(CivilRepair civil) {
		try {
			civil.setApprovalstate("1");
			civil.setCreatetime(UtilDAOImp.dateToStr(new Date(), "yyyy-MM-dd HH:mm:ss"));
			civil.setCreateperson(identity.getLoginUser().getTruename());
			civilRepairDaoImpl.saveCivilRepair(civil);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}

	public int getEquipRepairCount() {
		return equipRepairDaoImpl.getEquipRepairCount();
	}

	public List<EquipRepair> getEquipRepairList(Pager pager) {
		List<EquipRepair> list = equipRepairDaoImpl.getEquipRePairList(pager);
		
		for(EquipRepair equip : list){
			if(equip.getApprovalstate().equals("1")){
				equip.setApprovalstate("待审批");
			}else if(equip.getApprovalstate().equals("2")){
				equip.setApprovalstate("审批中");
			}else if(equip.getApprovalstate().equals("-1")){
				equip.setApprovalstate("已退回");
			}else{
				equip.setApprovalstate("已审批");
			}
			equip.setCreatetime(UtilDAOImp.dateToStr(UtilDAOImp.strToDate(equip.getCreatetime(),"yyyy-MM-dd hh:mm:ss"), "yyyy-MM-dd hh:mm:ss"));
			//equip.setEquipdeliverytime(UtilDAOImp.dateToStr(UtilDAOImp.strToDate(equip.getEquipdeliverytime(),"yyyy-MM-dd hh:mm:ss"), "yyyy-MM-dd hh:mm:ss"));
			//equip.setLastrepairtime(UtilDAOImp.dateToStr(UtilDAOImp.strToDate(equip.getLastrepairtime(),"yyyy-MM-dd hh:mm:ss"), "yyyy-MM-dd hh:mm:ss"));
			}
		return list;
	}

	@Transactional
	public String saveEquipRepair(EquipRepair equip) {
		try {
			equip.setApprovalstate("1");
			equip.setCreatetime(UtilDAOImp.dateToStr(new Date(), "yyyy-MM-dd HH:mm:ss"));
			equip.setLastrepairtime(equip.getLastrepairtime().substring(0,10));
			equip.setEquipdeliverytime(equip.getEquipdeliverytime().substring(0,10));
			equip.setCreateperson(identity.getLoginUser().getTruename());
			equipRepairDaoImpl.saveEquipRepair(equip);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}

	public int getEquipRegistCount() {
		return equipRegistDaoImpl.getEquipRegistCount();
	}

	public List<EquipRegist> getEquipRegistList(Pager pager) {
		List<EquipRegist> list = equipRegistDaoImpl.getEquipRegistList(pager);
		for(EquipRegist equip : list){
			if(equip.getApprovalstate().equals("1")){
				equip.setApprovalstate("待审批");
			}else if(equip.getApprovalstate().equals("2")){
				equip.setApprovalstate("审批中");
			}else if(equip.getApprovalstate().equals("-1")){
				equip.setApprovalstate("已退回");
			}else{
				equip.setApprovalstate("已审批");
			}
			Date date = UtilDAOImp.strToDate(equip.getCreatetime(),"yyyy-MM-dd");
			equip.setCreatetime(UtilDAOImp.dateToStr(date, "yyyy-MM-dd"));
		}
		return list;
	}

	@Transactional
	public String saveEquipRegist(EquipRegist equip) {
		try {
			equip.setApprovalstate("1");
			equip.setCreatetime(UtilDAOImp.dateToStr(new Date(), "yyyy-MM-dd HH:mm:ss"));
			equip.setCreateperson(identity.getLoginUser().getTruename());
			equipRegistDaoImpl.saveEquipRegist(equip);
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}
	

	@Transactional
	public void updateApprovalState(String id, String flag, String table) {
		if(table.equals("CivilRegist")){
			civilRegistDaoImpl.updateApprovalState(id,flag);
		}else if(table.equals("CivilRepair")){
			civilRepairDaoImpl.updateApprovalState(id,flag);
		}else if(table.equals("EquipRegist")){
			equipRegistDaoImpl.updateApprovalState(id,flag);
		}else if(table.equals("EquipRepair")){
			equipRepairDaoImpl.updateApprovalState(id,flag);
		}
	}

	public List<CivilRegist> getCivilRegistById(String id) {
		return civilRegistDaoImpl.getCivilRegistById(id);
	}

	public List<CivilRepair> getCivilRepairById(String id) {
		return civilRepairDaoImpl.getCivilRepairById(id);
	}
	
	public List<EquipRegist> getEquipRegistById(String id) {
		return equipRegistDaoImpl.getEquipRegistById(id);
	}

	public List<EquipRepair> getEquipRepairById(String id) {
		return equipRepairDaoImpl.getEquipRepairById(id);
	}

	@Transactional
	public void delCivilRegist(String[] id) {
		for(int i = 0; i < id.length; i ++){
			civilRegistDaoImpl.delCivilRegist(id[i]);
		}
	}
	
	@Transactional
	public void delCivilRepair(String[] id) {
		for(int i = 0; i < id.length; i ++){
			civilRepairDaoImpl.delCivilRepair(id[i]);
		}
	}
	
	@Transactional
	public void delEquipRegist(String[] id) {
		for(int i = 0; i < id.length; i ++){
			equipRegistDaoImpl.delEquipRegist(id[i]);
		}
	}
	
	@Transactional
	public void delEquipRepair(String[] id) {
		for(int i = 0; i < id.length; i ++){
			equipRepairDaoImpl.delEquipRepair(id[i]);
		}
	}
	
	
}
