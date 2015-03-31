package com.sysware.customize.hd.investment.fixedAssetsAccept.fixCondition;

import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("FixConditionDaoImpl")
public class FixConditionDaoImpl implements FixConditionDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<FixCondition> aDao;
	
	@In(create=true,value="common_GenericDAOImpl")
	private GenericDAOImpl<FixCondition> gDao;
	
	/**
	 * 根据内容查询部门信息
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<FixConditionVo> getDepList(FixConditionVo vo){
		StringBuffer sql = new StringBuffer();
		sql.append("select t.depcode,t.departmentname from T_DEPARTMENTS t")
			.append(" where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getInputValue()))
			sql.append(" and t.departmentname like'%").append(vo.getInputValue()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getInputValueNum()))
			sql.append(" and t.depcode='").append(vo.getInputValueNum()).append("'");
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		this.setDepList(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(FixConditionVo.class));
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}
	
	/**
	 * 获取部门信息总数
	 * @param vo
	 * @return
	 */
	public long getDepListCount(FixConditionVo vo){
		StringBuffer sql = new StringBuffer();
		sql.append("select count(1) from T_DEPARTMENTS t")
			.append(" where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getInputValue()))
			sql.append(" and t.departmentname like'%").append(vo.getInputValue()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getInputValueNum()))
			sql.append(" and t.depcode='").append(vo.getInputValueNum()).append("'");
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		return Long.parseLong(query.uniqueResult().toString());
	}
	
	/**
	 * 根据内容获取供应商信息
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<FixConditionVo> getVendorList(FixConditionVo vo){
		StringBuffer sql = new StringBuffer();
		sql.append("select t.vendorid,t.vendorname from T_VENDOR t where t.type in(1,2)"
				+" and t.evaluation_status='2'");
		if(UtilForHD.IsStrEmpty(vo.getInputValue()))
			sql.append(" and t.vendorname like'%").append(vo.getInputValue()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getInputValueNum()))
			sql.append(" and t.vendorid='").append(vo.getInputValueNum()).append("'");
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		this.setVendorList(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(FixConditionVo.class));
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}
	
	/**
	 * 根据内容获取供应商信息总数
	 * @param vo
	 * @return
	 */
	public long getVendorListCount(FixConditionVo vo){
		StringBuffer sql = new StringBuffer();
		sql.append("select count(1) from T_VENDOR t where t.type in(1,2)"
				+" and t.evaluation_status='2'");
		if(UtilForHD.IsStrEmpty(vo.getInputValue()))
			sql.append(" and t.vendorname like'%").append(vo.getInputValue()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getInputValueNum()))
			sql.append(" and t.vendorid='").append(vo.getInputValueNum()).append("'");
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		return Long.parseLong(query.uniqueResult().toString());
	}
	
	/**
	 * 添加安装条件准备任务
	 * @param vo
	 */
	@Transactional
	public void insertFixCondition(FixCondition vo){
		gDao.save(vo);
	}
	
	/**
	 * 修改安装条件准备
	 * @param vo
	 */
	@Transactional
	public void updateFixCondition(FixCondition vo){
		gDao.update(vo);
	}
	
	/**
	 * 根据验收任务编号获取安装准备任务
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<FixCondition> getFixCondition(FixConditionVo vo){
		String sql = "select t.* from T_FIXCONDITION t where t.acceptid=?";
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql);
		this.setFixCondition(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(FixCondition.class));
		query.setParameter(0, vo.getAcceptId());
		return query.list();
	}
	
	private void setDepList(SQLQuery query){
		query = query.addScalar("depcode", Hibernate.STRING);
		query = query.addScalar("departmentName", Hibernate.STRING);
	}
	
	private void setVendorList(SQLQuery query){
		query = query.addScalar("vendorId", Hibernate.STRING);
		query = query.addScalar("vendorName", Hibernate.STRING);
	}
	
	private void setFixCondition(SQLQuery query){
		query = query.addScalar("fixConditionId", Hibernate.STRING);
		query = query.addScalar("fixConditionFlag", Hibernate.LONG);
		query = query.addScalar("depcode", Hibernate.STRING);
		query = query.addScalar("assignTime", Hibernate.DATE);
		query = query.addScalar("assignAchieveTime", Hibernate.DATE);
		query = query.addScalar("fixConditionText", Hibernate.STRING);
		query = query.addScalar("vendorId", Hibernate.STRING);
		query = query.addScalar("tenderStartTime", Hibernate.DATE);
		query = query.addScalar("tenderEndTime", Hibernate.DATE);
		query = query.addScalar("acceptId", Hibernate.STRING);
	}
}
