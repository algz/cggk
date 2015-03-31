package com.sysware.customize.hd.investment.stockInspect.stockBill;

import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("StockBillDaoImpl")
public class StockBillDaoImpl implements StockBillDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	/**
	 * 获取所有的采购清单信息（获取申报记录明细表中的信息“T_DECLARE_DETIL”）
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<StockBillVo> GetStockBill(StockBillVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append("select m.materialitemcode,m.materialitemname,m.materialstandard,"
				+"t.materialcatalog_name,t.declare_type,t.quantity,t.amount,t.usedate"
				+" from t_declare_detil t"
				+" left join t_material m"
				+" on m.materialid=t.material_id"
				+" where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getMaterialitemcode()))
			sql.append(" and m.materialitemcode like'%").append(vo.getMaterialitemcode()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getMaterialitemname()))
			sql.append(" and m.materialitemname like '%%'").append(vo.getMaterialitemname()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getDeclare_type()))
			sql.append(" and t.declare_type='").append(vo.getDeclare_type()).append("'");
		
		if(UtilForHD.IsStrEmpty(vo.getDateStart())&&!(UtilForHD.IsStrEmpty(vo.getDateEnd()))){
			vo.setDateStart(vo.getDateStart().split("T")[0]);
			sql.append(" and t.usedate>=to_date('").append(vo.getDateStart()).append("','YYYY:MM:DD:HH24:MI:SS ')");
		}
		else if(!(UtilForHD.IsStrEmpty(vo.getDateStart()))&&UtilForHD.IsStrEmpty(vo.getDateEnd())){
			vo.setDateEnd(vo.getDateEnd().split("T")[0]);
			sql.append(" and t.usedate<=to_date('").append(vo.getDateEnd()).append("','YYYY:MM:DD:HH24:MI:SS ')");
		}
		else if(UtilForHD.IsStrEmpty(vo.getDateStart())&&UtilForHD.IsStrEmpty(vo.getDateEnd())){
			vo.setDateStart(vo.getDateStart().split("T")[0]);
			vo.setDateEnd(vo.getDateEnd().split("T")[0]);
			sql.append(" and t.usedate>=to_date('").append(vo.getDateStart()).append("','YYYY:MM:DD:HH24:MI:SS ')");
			sql.append(" and t.usedate<=to_date('").append(vo.getDateEnd()).append("','YYYY:MM:DD:HH24:MI:SS ')");
		}
//		System.out.println("计划采购清单SQL："+sql.toString());
		
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		SetStockBill(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(StockBillVo.class));
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}
	
	/**
	 * 获取所有的采购清单信息总数（获取申报记录明细表中的信息“T_DECLARE_DETIL”）
	 * @param vo
	 * @return
	 */
	public long GetStockBillCount(StockBillVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append("select count(1)"
				+" from t_declare_detil t"
				+" left join t_material m"
				+" on m.materialid=t.material_id"
				+" where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getMaterialitemcode()))
			sql.append(" and m.materialitemcode like'%").append(vo.getMaterialitemcode()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getMaterialitemname()))
			sql.append(" and m.materialitemname like '%%'").append(vo.getMaterialitemname()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getDeclare_type()))
			sql.append(" and t.declare_type='").append(vo.getDeclare_type()).append("'");
		
		if(UtilForHD.IsStrEmpty(vo.getDateStart())&&!(UtilForHD.IsStrEmpty(vo.getDateEnd()))){
			vo.setDateStart(vo.getDateStart().split("T")[0]);
			sql.append(" and t.usedate>=to_date('").append(vo.getDateStart()).append("','YYYY:MM:DD:HH24:MI:SS ')");
		}
		else if(!(UtilForHD.IsStrEmpty(vo.getDateStart()))&&UtilForHD.IsStrEmpty(vo.getDateEnd())){
			vo.setDateEnd(vo.getDateEnd().split("T")[0]);
			sql.append(" and t.usedate<=to_date('").append(vo.getDateEnd()).append("','YYYY:MM:DD:HH24:MI:SS ')");
		}
		else if(UtilForHD.IsStrEmpty(vo.getDateStart())&&UtilForHD.IsStrEmpty(vo.getDateEnd())){
			vo.setDateStart(vo.getDateStart().split("T")[0]);
			vo.setDateEnd(vo.getDateEnd().split("T")[0]);
			sql.append(" and t.usedate>=to_date('").append(vo.getDateStart()).append("','YYYY:MM:DD:HH24:MI:SS ')");
			sql.append(" and t.usedate<=to_date('").append(vo.getDateEnd()).append("','YYYY:MM:DD:HH24:MI:SS ')");
		}
//		System.out.println("计划采购清单SQL："+sql.toString());
		
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		Object obj = query.uniqueResult();
		return Long.parseLong(obj.toString());
	}
	
	private void SetStockBill(SQLQuery query){
		query = query.addScalar("materialitemcode", Hibernate.STRING);
		query = query.addScalar("materialitemname", Hibernate.STRING);
		query = query.addScalar("materialstandard", Hibernate.STRING);
		query = query.addScalar("materialcatalog_name", Hibernate.STRING);
		query = query.addScalar("declare_type", Hibernate.STRING);
		query = query.addScalar("quantity", Hibernate.STRING);//Hibernate.LONG
		query = query.addScalar("amount", Hibernate.STRING);//Hibernate.LONG
		query = query.addScalar("usedate", Hibernate.STRING);
	}
}
