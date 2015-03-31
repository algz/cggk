package com.sysware.customize.hd.investment.stockInspect.planTypeInspect;

import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("PlanTypeInspectDaoImpl")
public class PlanTypeInspectDaoImpl implements PlanTypeInspectDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	/**
	 * 判断是否需要加载时间判断
	 * @param vo
	 * @return
	 */
	private String IsEmptyDate(PlanTypeInspectVo vo){
		String sql = "";
		if(UtilForHD.IsStrEmpty(vo.getDateStart())&&!(UtilForHD.IsStrEmpty(vo.getDateEnd()))){
			vo.setDateStart(vo.getDateStart().split("T")[0]);
			sql = " and d.usedate>=to_date('"+vo.getDateStart()+"','YYYY:MM:DD:HH24:MI:SS ')";
			}
		else if(!(UtilForHD.IsStrEmpty(vo.getDateStart()))&&UtilForHD.IsStrEmpty(vo.getDateEnd())){
			vo.setDateEnd(vo.getDateEnd().split("T")[0]);
			sql = " and d.usedate<=to_date('"+vo.getDateEnd()+"','YYYY:MM:DD:HH24:MI:SS ')";
		}
		else if(UtilForHD.IsStrEmpty(vo.getDateStart())&&UtilForHD.IsStrEmpty(vo.getDateEnd())){
			vo.setDateStart(vo.getDateStart().split("T")[0]);
			vo.setDateEnd(vo.getDateEnd().split("T")[0]);
			sql = " and d.usedate>=to_date('"+vo.getDateStart()+"','YYYY:MM:DD:HH24:MI:SS ') and d.usedate<=to_date('"+vo.getDateEnd()+"','YYYY:MM:DD:HH24:MI:SS ')";
		}
		return sql;
	}
	
	/**
	 * 获取项数和金额总数和分别按采购类型统计出来的总数
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<PlanTypeInspectVo> GetAllAmoteAndQuantity(PlanTypeInspectVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append("select case when sum(d.amount) is null then 0 else sum(d.amount) end ramount,case when sum(d.quantity) is null then 0 else sum(d.quantity) end rquantity, '0' as type"
				+" from t_declare_detil d"
				+" where 1=1");
		sql.append(this.IsEmptyDate(vo));
		sql.append(" union all"
			+" select case when sum(d.amount) is null then 0 else sum(d.amount) end ramount,case when sum(d.quantity) is null then 0 else sum(d.quantity) end rquantity, '1' as type"
			+" from t_declare_detil d"
			+" where d.declare_type in(1)");
		sql.append(this.IsEmptyDate(vo));
		sql.append(" union all"
				+" select case when sum(d.amount) is null then 0 else sum(d.amount) end ramount,case when sum(d.quantity) is null then 0 else sum(d.quantity) end rquantity, '2' as type"
				+" from t_declare_detil d"
				+" where d.declare_type in(2)");
		sql.append(this.IsEmptyDate(vo));
		sql.append(" union all"
			+" select case when sum(d.amount) is null then 0 else sum(d.amount) end ramount,case when sum(d.quantity) is null then 0 else sum(d.quantity) end rquantity, '3' as type"
			+" from t_declare_detil d"
			+" where d.declare_type in(3)");
		sql.append(this.IsEmptyDate(vo));
//		System.out.println("测试："+sql);
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		SetAllAmoteAndQuantity(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(PlanTypeInspectVo.class));
		return query.list();
	}
	
	/**
	 * 获取项数和金额总数和分别按采购类型统计出来的总数
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<PlanTypeInspectVo> GetAmoteAndQuantity(PlanTypeInspectVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append("select case when sum(d.amount) is null then 0 else sum(d.amount) end ramount,case when sum(d.quantity) is null then 0 else sum(d.quantity) end rquantity, '计划内' as typeName"
			+" from t_declare_detil d"
			+" where d.declare_type in(1)");
		sql.append(this.IsEmptyDate(vo));
		sql.append(" union all"
				+" select case when sum(d.amount) is null then 0 else sum(d.amount) end ramount,case when sum(d.quantity) is null then 0 else sum(d.quantity) end rquantity, '应急' as typeName"
				+" from t_declare_detil d"
				+" where d.declare_type in(2)");
		sql.append(this.IsEmptyDate(vo));
		sql.append(" union all"
			+" select case when sum(d.amount) is null then 0 else sum(d.amount) end ramount,case when sum(d.quantity) is null then 0 else sum(d.quantity) end rquantity, '非应急' as typeName"
			+" from t_declare_detil d"
			+" where d.declare_type in(3)");
		sql.append(this.IsEmptyDate(vo));
//		System.out.println("输出分析数据："+sql.toString());
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		SetAmoteAndQuantity(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(PlanTypeInspectVo.class));
		return query.list();
	}
	
	private void SetAllAmoteAndQuantity(SQLQuery query){
		query = query.addScalar("ramount", Hibernate.LONG);
		query = query.addScalar("rquantity", Hibernate.LONG);
		query = query.addScalar("type", Hibernate.LONG);
	}
	
	private void SetAmoteAndQuantity(SQLQuery query){
		query = query.addScalar("ramount", Hibernate.LONG);
		query = query.addScalar("rquantity", Hibernate.LONG);
		query = query.addScalar("typeName", Hibernate.STRING);
	}
}
