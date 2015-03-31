package com.sysware.customize.hd.investment.fixedAssetsAccept.testCourse;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;

@Name("TestCourseDaoImpl")
public class TestCourseDaoImpl implements TestCourseDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<TestCourse> aDao;
	
	@In(create=true,value="common_GenericDAOImpl")
	private GenericDAOImpl<TestCourse> gDao;
	
	/**
	 * 增加验收过程信息
	 */
	@Transactional
	public void insertTestCourse(TestCourse vo){
		gDao.save(vo);
	}
	
	/**
	 * 修改验收过程信息
	 */
	@Transactional
	public void updateTestCourse(TestCourse vo){
		gDao.update(vo);
	}
	
	public TestCourse getTestCourse(TestCourseVo vo){
		String sql = "select t.* from t_testCourse t where t.acceptid=?";
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql);
		this.setTestCourse(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(TestCourse.class));
		query.setParameter(0, vo.getAcceptId());
		Object obj = query.uniqueResult();
		return (TestCourse)obj;
	}
	
	private void setTestCourse(SQLQuery query){
		query = query.addScalar("testCourseId", Hibernate.STRING);
		query = query.addScalar("testCourseDocument", Hibernate.STRING);
		query = query.addScalar("testCourseDocumentId", Hibernate.STRING);
		query = query.addScalar("testCourseTime", Hibernate.DATE);
		query = query.addScalar("acceptId", Hibernate.STRING);
	}
}
