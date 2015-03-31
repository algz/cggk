package com.sysware.customize.hd.investment.stockInspect.stockPlan;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.vo.StockPlanParticularVo;

@Name("StockInspectDaoImpl")
public class StockInspectDaoImpl implements StockInspectDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	private static boolean isStrEmpty(String str) {
		if ("".equals(str) || null == str) {
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * 获取所有的采购计划信息
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<StockInspectVo> GetStockInspect(StockInspectVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append("select t.*,u.truename as userName from t_procurementplan t,t_user u where t.editer = to_char(u.userid)");
		if(isStrEmpty(vo.getPlantype()))
			sql.append(" and t.plantype ='"+vo.getPlantype()+"'");	
		if(isStrEmpty(vo.getStatus()))
			sql.append(" and t.status='"+vo.getStatus()+"'");
		if(isStrEmpty(vo.getJudgment())){	
			if(vo.getAmount()<=0)
				vo.setAmount(new Double("0"));
			if(vo.getJudgment().equals("1"))
				sql.append(" and t.amount>"+vo.getAmount());
			else if(vo.getJudgment().equals("2"))
				sql.append(" and t.amount="+vo.getAmount());
			else if(vo.getJudgment().equals("3"))
				sql.append(" and t.amount<"+vo.getAmount());
		}
		if(isStrEmpty(vo.getEditdate()))
			sql.append(" and t.editdate=to_date('"+vo.getEditdate().split("T")[0]+"','YYYY:MM:DD:HH24:MI:SS')");
//		System.out.println("结果;"+sql);
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		SetStockInspect(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(StockInspectVo.class));
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		List<StockInspectVo> list = query.list();
		return list;
	}

	/**
	 * 获取所有的采购计划信息的总数
	 * @param vo
	 * @return
	 */
	public long GetStockInspectCount(StockInspectVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append("select count(1) from t_procurementplan t where 1=1");
			if(isStrEmpty(vo.getPlantype()))
				sql.append(" and t.plantype ='"+vo.getPlantype()+"'");	
			if(isStrEmpty(vo.getStatus()))
				sql.append(" and t.status='"+vo.getStatus()+"'");
			if(isStrEmpty(vo.getJudgment())){	
				if(vo.getAmount()<=0)
					vo.setAmount(new Double("0"));
				if(vo.getJudgment().equals("1"))
					sql.append(" and t.amount>"+vo.getAmount());
				else if(vo.getJudgment().equals("2"))
					sql.append(" and t.amount="+vo.getAmount());
				else if(vo.getJudgment().equals("3"))
					sql.append(" and t.amount<"+vo.getAmount());
			}
			if(isStrEmpty(vo.getEditdate()))
				sql.append(" and t.editdate=to_date('"+vo.getEditdate().split("T")[0]+"','YYYY:MM:DD:HH24:MI:SS')");
//			System.out.println("测试总数："+sql);
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		Object obj = query.uniqueResult();
		return Long.parseLong(obj.toString());
	}
	
	public List<StockInspectVo> GetFixedStockPlan(StockInspectVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select t.* from v_stockplan_fixed t where 1=1");
		if(isStrEmpty(vo.getStatus())){
			if(vo.getStatus().equals("1")){//待审批
				sql.append(" and t.status in ('"+vo.getStatus()+"','5')" );
			}else if(vo.getStatus().equals("2")){//审批中
				sql.append(" and t.status in ('"+vo.getStatus()+"','6')" );
			}else if(vo.getStatus().equals("3")){//已审批
				sql.append(" and t.status in ('"+vo.getStatus()+"','7')" );
			}
		}
		if(isStrEmpty(vo.getJudgment())){	
			if(vo.getAmount()<=0)
				vo.setAmount(new Double("0"));
			if(vo.getJudgment().equals("1"))
				sql.append(" and t.amount>"+vo.getAmount());
			else if(vo.getJudgment().equals("2"))
				sql.append(" and t.amount="+vo.getAmount());
			else if(vo.getJudgment().equals("3"))
				sql.append(" and t.amount<"+vo.getAmount());
		}
		
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		SetFixedStockPlan(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(StockInspectVo.class));
		
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		List<StockInspectVo> list = new ArrayList<StockInspectVo>();
		try {
			list = query.list();
			return list;
		} catch (Exception e) {
			return new ArrayList<StockInspectVo>();
		}
	}

	public long GetFixedStockPlanCount(StockInspectVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(1) from v_stockplan_fixed t where 1=1");
		if(isStrEmpty(vo.getStatus())){
			if(vo.getStatus().equals("1")){//待审批
				sql.append(" and t.status in ('"+vo.getStatus()+"','5')" );
			}else if(vo.getStatus().equals("2")){//审批中
				sql.append(" and t.status in ('"+vo.getStatus()+"','6')" );
			}else if(vo.getStatus().equals("3")){//已审批
				sql.append(" and t.status in ('"+vo.getStatus()+"','7')" );
			}
		}
		if(isStrEmpty(vo.getJudgment())){	
			if(vo.getAmount()<=0)
				vo.setAmount(new Double("0"));
			if(vo.getJudgment().equals("1"))
				sql.append(" and t.amount>"+vo.getAmount());
			else if(vo.getJudgment().equals("2"))
				sql.append(" and t.amount="+vo.getAmount());
			else if(vo.getJudgment().equals("3"))
				sql.append(" and t.amount<"+vo.getAmount());
		}
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		Object obj = query.uniqueResult();
		return Long.parseLong(obj.toString());
	}

	private void SetStockInspect(SQLQuery query){
		query = query.addScalar("procurementplan_id", Hibernate.STRING);
		query = query.addScalar("procurementplan_name", Hibernate.STRING);
		query = query.addScalar("procurementplan_code", Hibernate.STRING);
		query = query.addScalar("procurementplan_quantity", Hibernate.DOUBLE);
		query = query.addScalar("amount", Hibernate.DOUBLE);
		query = query.addScalar("editer", Hibernate.STRING);
		query = query.addScalar("editdate", Hibernate.STRING);
		query = query.addScalar("senddate", Hibernate.STRING);
		query = query.addScalar("plantype", Hibernate.STRING);
		query = query.addScalar("status", Hibernate.STRING);
		query = query.addScalar("userName", Hibernate.STRING);
	}
	private void SetFixedStockPlan(SQLQuery query){
		query = query.addScalar("procurementplan_id", Hibernate.STRING);
		query = query.addScalar("procurementplan_name", Hibernate.STRING);
		query = query.addScalar("procurementplan_code", Hibernate.STRING);
		query = query.addScalar("amount", Hibernate.DOUBLE);
		query = query.addScalar("editdate", Hibernate.STRING);
		query = query.addScalar("senddate", Hibernate.STRING);
		query = query.addScalar("plantype", Hibernate.STRING);
		query = query.addScalar("status", Hibernate.STRING);
		query = query.addScalar("userName", Hibernate.STRING);
		query = query.addScalar("fundsource",Hibernate.STRING);
	}
	/**
	 * 获取一个采购计划的详细信息（查询使用视图：v_profixed_declareplan）
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<StockPlanParticularVo> GetStockPlanParticular(StockPlanParticularVo vo){
		String sql = "select t.* from v_profixed_declareplan t where t.procurementplan_id=?";
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql);
		SetStockPlanParticular(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(StockPlanParticularVo.class));
		query.setParameter(0, vo.getProcurementplan_id());
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}
	
	/**
	 * 获取一个采购计划的详细信息汇总（查询使用视图：v_profixed_declareplan）
	 * @param vo
	 * @return
	 */
	public long GetStockPlanParticularCount(StockPlanParticularVo vo){
		String sql = "select count(1) from v_profixed_declareplan t where t.procurementplan_id=?";
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, vo.getProcurementplan_id());
		Object obj = query.uniqueResult();
		return Long.parseLong(obj.toString());
	}
	
	private void SetStockPlanParticular(SQLQuery query){
		query = query.addScalar("procurementplan_detil", Hibernate.STRING);
		query = query.addScalar("procurementplan_id", Hibernate.STRING);
		query = query.addScalar("declareplan_id", Hibernate.STRING);
		query = query.addScalar("declareplan_code", Hibernate.STRING);
		query = query.addScalar("declareplan_name", Hibernate.STRING);
		query = query.addScalar("amount", Hibernate.DOUBLE);
		query = query.addScalar("quantity", Hibernate.DOUBLE);
		query = query.addScalar("status", Hibernate.STRING);
		query = query.addScalar("editer", Hibernate.STRING);
		query = query.addScalar("editdate", Hibernate.STRING);
		query = query.addScalar("senddate", Hibernate.STRING);
		query = query.addScalar("userName", Hibernate.STRING);
	}
}
