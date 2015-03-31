package com.sysware.customize.hd.investment.purchaseRequest.PEsummary.dao;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.hibernate.Query;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.sysware.customize.cac.tc.material.MyTool;
import com.sysware.customize.cac.tc.model.Pager;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.CivilRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRegist;
import com.sysware.customize.hd.investment.purchaseRequest.PEdeclare.entity.EquipRepair;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity.SpecialProject;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.entity.Stocksummary;
import com.sysware.customize.hd.investment.purchaseRequest.PEsummary.vo.StocksummaryVo;

@Name("stockSummaryDaoImpl")
public class StockSummaryDaoImpl  extends GenericDAOImpl<Stocksummary> implements StockSummaryDao{

	public int getStockSummaryCount() {
		String hql = "select count(*) from Stocksummary t ";
		int count = Integer.parseInt(this.getHibernateSession().createQuery(hql).list().get(0).toString());
		return count;
	}

	public List<Stocksummary> getStockSummaryList(StocksummaryVo vo) {
		StringBuilder param=new StringBuilder();
		if(vo.getProjectname()!=null&&!vo.getProjectname().equals("")){
			param.append(" and t.projectname like '%"+vo.getProjectname()+"%' ");
		}
		String hql = "from Stocksummary t where 1=1 " +param.toString()+
				"order by t.createtime desc";
		//计算总数
		Long count=(Long)this.getHibernateSession().createQuery("select count(*) "+hql).setMaxResults(1).uniqueResult();
	    vo.setCount(count.intValue());
		
		Query query = this.getHibernateSession().createQuery(hql);
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}

	public String editStockSummary(String id, String column, String value) {
		try {
			String hql = "update Stocksummary t " +
					"set " + column + " = '" + value + "' " +
					"where t.id = '" + id + "'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
			return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
	}

	public void updateApprovalState(String id, String flag) {
		try {
			String hql = "update Stocksummary t " +
					"set t.approvalstate = '"+flag+"', " +
					"t.approvaltime = sysdate " +
					"where t.id = '"+id+"'";
			this.getHibernateSession().createQuery(hql).executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public List<Stocksummary> getStockSummaryById(String id) {
		String hql = "from Stocksummary t "+
				"where t.id = '"+id+"'";
		Query query = this.getHibernateSession().createQuery(hql);
		return query.list();
	}

	public void saveCivilDetailsSummary(String id) {
		CivilRegist civil = (CivilRegist)this.getHibernateSession().get(CivilRegist.class, id);
		Stocksummary ss = new Stocksummary();
		ss.setProjectname(civil.getProjectname());
		if(civil.getFundsource().equals("专项")){
			ss.setAnnualinvestcountry(new BigDecimal(null==civil.getAnnualinvestmentplan()?"0":civil.getAnnualinvestmentplan()));
		}else{
			ss.setAnnualinvestself(new BigDecimal(null==civil.getAnnualinvestmentplan()?"0":civil.getAnnualinvestmentplan()));
		}
		ss.setApprovalstate(1l);
		ss.setCreatetime(new Date());
		this.getHibernateSession().save(ss);
	}

	public void saveCivilRepairSummary(String id) {
		CivilRepair civil = (CivilRepair)this.getHibernateSession().get(CivilRepair.class, id);
		Stocksummary ss = new Stocksummary();
		ss.setProjectname(civil.getRepairproject());
		ss.setAnnualinvestself(new BigDecimal(null==civil.getAnnualinvestment()?"0":civil.getAnnualinvestment()));
		ss.setApprovalstate(1l);
		ss.setCreatetime(new Date());
		this.getHibernateSession().save(ss);
	}
	
	public void saveEquipRepairSummary(String id) {
		EquipRepair er = (EquipRepair)this.getHibernateSession().get(EquipRepair.class, id);
		Stocksummary ss = new Stocksummary();
		ss.setProjectname(er.getRepairequipname());
		ss.setAnnualinvestself(new BigDecimal("0"));
		ss.setApprovalstate(1l);
		ss.setCreatetime(new Date());
		this.getHibernateSession().save(ss);
	}

	public void saveEquipPlanSummary(String id) {
		EquipRegist equip = (EquipRegist)this.getHibernateSession().get(EquipRegist.class, id);
		Stocksummary ss = new Stocksummary();
		ss.setProjectname(equip.getProjectname());
		if(equip.getFundsource().equals("专项")){
			ss.setAnnualinvestcountry(new BigDecimal(null==equip.getAnnualinvestmentplan()?"0":equip.getAnnualinvestmentplan()));
		}else{
			ss.setAnnualinvestself(new BigDecimal(null==equip.getAnnualinvestmentplan()?"0":equip.getAnnualinvestmentplan()));
		}
		ss.setApprovalstate(1l);
		ss.setCreatetime(new Date());
		this.getHibernateSession().save(ss);
		
	}

	public void saveSpecialProjectSummary(String id) {
		SpecialProject sp = (SpecialProject)this.getHibernateSession().get(SpecialProject.class, id);
		Stocksummary ss = new Stocksummary();
		ss.setProjectname(sp.getProjectname());
		ss.setAnnualinvestcountry(sp.getContractmoney());
		ss.setApprovalstate(1l);
		ss.setCreatetime(new Date());
		this.getHibernateSession().save(ss);
	}

}
