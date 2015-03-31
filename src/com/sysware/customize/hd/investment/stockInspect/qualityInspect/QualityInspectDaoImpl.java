package com.sysware.customize.hd.investment.stockInspect.qualityInspect;

import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("QualityInspectDaoImpl")
public class QualityInspectDaoImpl implements QualityInspectDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	/**
	 * 获取质量监控表格信息（此处查询是是数据库的视图：v_quality_monitor ）
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<QualityInspectVo> GetQualityInspect(QualityInspectVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append("select t.* from v_quality_monitor t where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getMaterialitemcode()))
			sql.append(" and t.materialItemCode like'%").append(vo.getMaterialitemcode()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getMaterialitemname()))
			sql.append(" and t.materialItemName like'%").append(vo.getMaterialitemname()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getContract_code()))
			sql.append(" and t.Contract_code like'%").append(vo.getContract_code()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getContract_name()))
			sql.append(" and t.Contract_name like'%").append(vo.getContract_name()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getRegistration_code()))
			sql.append(" and t.registration_code like'%").append(vo.getRegistration_code()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getLot_no()))
			sql.append(" and t.lot_no like'%").append(vo.getLot_no()).append("%'");
		
//		System.out.println("质量监控SQL:"+sql.toString());
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		SetQualityInspect(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(QualityInspectVo.class));
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}
	
	/**
	 * 获取质量监控表格信息总条数（此处查询是是数据库的视图：v_quality_monitor ）
	 * @param vo
	 * @return
	 */
	public long GetQualityInspectCount(QualityInspectVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append("select count(1) from v_quality_monitor t where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getMaterialitemcode()))
			sql.append(" and t.materialItemCode like'%").append(vo.getMaterialitemcode()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getMaterialitemname()))
			sql.append(" and t.materialItemName like'%").append(vo.getMaterialitemname()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getContract_code()))
			sql.append(" and t.Contract_code like'%").append(vo.getContract_code()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getContract_name()))
			sql.append(" and t.Contract_name like'%").append(vo.getContract_name()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getRegistration_code()))
			sql.append(" and t.registration_code like'%").append(vo.getRegistration_code()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getLot_no()))
			sql.append(" and t.lot_no like'%").append(vo.getLot_no()).append("%'");
//		System.out.println("质量监控SQL:"+sql.toString());
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		Object obj = query.uniqueResult();
		return Long.parseLong(obj.toString());
	}
	
	private void SetQualityInspect(SQLQuery query){
		query = query.addScalar("id", Hibernate.STRING);
		query = query.addScalar("contract_id", Hibernate.STRING);
		query = query.addScalar("contract_name", Hibernate.STRING);
		query = query.addScalar("contract_code", Hibernate.STRING);
		query = query.addScalar("item_id", Hibernate.STRING);
		query = query.addScalar("materialitemname", Hibernate.STRING);
		query = query.addScalar("materialitemcode", Hibernate.STRING);
		query = query.addScalar("lot_no", Hibernate.STRING);
		query = query.addScalar("arrival_num", Hibernate.LONG);
		query = query.addScalar("creater_id", Hibernate.STRING);
		query = query.addScalar("create_date", Hibernate.STRING);
		query = query.addScalar("object_comment", Hibernate.STRING);
		query = query.addScalar("registration_code", Hibernate.STRING);
		query = query.addScalar("check_status",Hibernate.STRING);
	}
}
