package com.sysware.customize.hd.investment.stockInspect.stockExecute;

import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;

@Name("StockExecuteDaoImpl")
public class StockExecuteDaoImpl implements StockExecuteDao {
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	/**
	 * 获得入场登记表中根基合同编号查询到的数据
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<StockExecuteVo> GetStockExecute(StockExecuteVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append("select t.*,u.truename,m.materialitemcode,m.materialitemname,m.materialstandard from t_registration t"
				+" left join t_user u"
				+" on u.userid=t.creater_id" 
				+" left join t_material m"
				+" on m.materialid=t.item_id"
				+" where t.contract_id=?");
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		SetStockExecute(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(StockExecuteVo.class));
		query.setParameter(0, vo.getContract_id());
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}
	
	/**
	 * 获得入场登记表中根基合同编号查询到的数据
	 * @param vo
	 * @return
	 */
	public long GetStockExecuteCount(StockExecuteVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append("select count(1) from t_registration t"
				+" where t.contract_id=?");
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		query.setParameter(0, vo.getContract_id());
		Object obj = query.uniqueResult();
		return Long.parseLong(obj.toString());
	}
	
	private void SetStockExecute(SQLQuery query){
		query = query.addScalar("contract_id", Hibernate.STRING);
		query = query.addScalar("id", Hibernate.STRING);
		query = query.addScalar("registration_code", Hibernate.STRING);
		query = query.addScalar("item_id", Hibernate.STRING);
		query = query.addScalar("lot_no", Hibernate.STRING);
		query = query.addScalar("invoice_no", Hibernate.STRING);
		query = query.addScalar("transport_date", Hibernate.STRING);
		query = query.addScalar("transport_no", Hibernate.STRING);
//		query = query.addScalar("transport_num", Hibernate.LONG);
//		query = query.addScalar("purchase_num", Hibernate.LONG);
		query = query.addScalar("qualify_no", Hibernate.STRING);
		query = query.addScalar("creater_id", Hibernate.STRING);
		query = query.addScalar("create_date", Hibernate.STRING);
		query = query.addScalar("arrival_num", Hibernate.LONG);
		query = query.addScalar("arrival_date", Hibernate.STRING);
		query = query.addScalar("truename", Hibernate.STRING);
		query = query.addScalar("materialitemcode", Hibernate.STRING);
		query = query.addScalar("materialitemname", Hibernate.STRING);
		query = query.addScalar("materialstandard", Hibernate.STRING);
	}
}
