package com.sysware.customize.hd.investment.fixedAssetsAccept.rendTest;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;

@Name("RendTestDaoImpl")
public class RendTestDaoImpl implements RendTestDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<RendTest> aDao;
	
	@In(create=true,value="common_GenericDAOImpl")
	private GenericDAOImpl<RendTest> gDao;
	
	/**
	 * 添加开箱验收任务
	 * @param vo
	 */
	@Transactional
	public void insertRendTest(RendTest vo){
		gDao.save(vo);
	}
	
	/**
	 * 修改开箱验收任务
	 * @param vo
	 */
	@Transactional
	public void updateRendTest(RendTest vo){
		gDao.update(vo);
	}
	
	/**
	 * 根据编号获取一条开箱验收任务
	 * @param vo
	 * @return
	 */
	public RendTest getRendTest(RendTestVo vo){
		String sql = "select t.* from t_rendTest t where t.acceptid=?";
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql);
		this.setRendTest(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(RendTest.class));
		query.setParameter(0, vo.getAcceptId());
		Object obj = query.uniqueResult();
		return (RendTest)obj;
	}
	
	private void setRendTest(SQLQuery query){
		query = query.addScalar("rendTestId", Hibernate.STRING);
		query = query.addScalar("rendTestTime", Hibernate.DATE);
		query = query.addScalar("testTime", Hibernate.DATE);
		query = query.addScalar("rendTestRemark", Hibernate.STRING);
		query = query.addScalar("testBill", Hibernate.LONG);
		query = query.addScalar("acceptId", Hibernate.STRING);
	}
}
