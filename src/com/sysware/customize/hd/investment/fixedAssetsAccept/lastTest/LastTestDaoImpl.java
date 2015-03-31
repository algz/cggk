package com.sysware.customize.hd.investment.fixedAssetsAccept.lastTest;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;

@Name("LastTestDaoImpl")
public class LastTestDaoImpl implements LastTestDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<LastTest> aDao;
	
	@In(create=true,value="common_GenericDAOImpl")
	private GenericDAOImpl<LastTest> gDao;
	
	/**
	 * 新建最终验收任务
	 * @param vo
	 */
	@Transactional
	public void insertLastTest(LastTest vo){
		gDao.save(vo);
	}
	
	/**
	 * 修改最终验收任务
	 * @param vo
	 */
	@Transactional
	public void updateLastTest(LastTest vo){
		gDao.update(vo);
	}
	
	public LastTest getLastTest(LastTestVo vo){
		String sql = "select t.* from t_lastTest t where t.acceptid=?";
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql);
		this.setLastTest(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(LastTest.class));
		query.setParameter(0, vo.getAcceptId());
		Object obj = query.uniqueResult();
		return (LastTest)obj;
	}
	
	private void setLastTest(SQLQuery query){
		query = query.addScalar("lastTestId", Hibernate.STRING);
		query = query.addScalar("lastTestNum", Hibernate.STRING);
		query = query.addScalar("lastTestTime", Hibernate.DATE);
		query = query.addScalar("lastTestRemark", Hibernate.STRING);
		query = query.addScalar("acceptId", Hibernate.STRING);
	}
}
