package com.sysware.customize.hd.investment.stockInspect.efficiencyAnalysis;

import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("EfficiencyAnalysisDaoImpl")
public class EfficiencyAnalysisDaoImpl implements EfficiencyAnalysisDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	/**
	 * 获取效能分析表格信息（此处查询是是数据库的视图：v_Efficiency_Analysis）
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<EfficiencyAnalysisVo> GetEfficiencyAnalysis(EfficiencyAnalysisVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append("select t.* from v_efficiency_analysis t where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getContract_code()))
			sql.append(" and t.Contract_code like'%").append(vo.getContract_code()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getContract_name()))
			sql.append(" and t.Contract_name like'%").append(vo.getContract_name()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getDepartment_b()))
			sql.append(" and t.department_B like'%").append(vo.getDepartment_b()).append("%'");
//		System.out.println("效能分析SQL:"+sql.toString());
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		SetEfficiencyAnalysis(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(EfficiencyAnalysisVo.class));
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}
	
	/**
	 * 获取效能分析表格信息总条数（此处查询是是数据库的视图：v_Efficiency_Analysis）
	 * @param vo
	 * @return
	 */
	public long GetEfficiencyAnalysisCount(EfficiencyAnalysisVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append("select count(1) from v_efficiency_analysis t where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getContract_code()))
			sql.append(" and t.Contract_code like'%").append(vo.getContract_code()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getContract_name()))
			sql.append(" and t.Contract_name like'%").append(vo.getContract_name()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getDepartment_b()))
			sql.append(" and t.department_B like'%").append(vo.getDepartment_b()).append("%'");
//		System.out.println("效能分析SQL:"+sql.toString());
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		Object obj = query.uniqueResult();
		return Long.parseLong(obj.toString());
	}
	
	private void SetEfficiencyAnalysis(SQLQuery query){
		query = query.addScalar("contract_id", Hibernate.STRING);
		query = query.addScalar("contract_code", Hibernate.STRING);
		query = query.addScalar("contract_name", Hibernate.STRING);
		query = query.addScalar("department_b", Hibernate.STRING);
		query = query.addScalar("contract_amount", Hibernate.LONG);
		query = query.addScalar("commit_date", Hibernate.STRING);
		query = query.addScalar("unqualified_rate", Hibernate.STRING);
		query = query.addScalar("score", Hibernate.STRING);
	}
}
