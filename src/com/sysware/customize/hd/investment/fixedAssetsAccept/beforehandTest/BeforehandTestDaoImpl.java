package com.sysware.customize.hd.investment.fixedAssetsAccept.beforehandTest;

import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;

@Name("BeforehandTestDaoImpl")
public class BeforehandTestDaoImpl implements BeforehandTestDao{

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<BeforehandTest> aDao;
	
	@In(create=true,value="common_GenericDAOImpl")
	private GenericDAOImpl<BeforehandTest> gDao;
	
	/**
	 * 添加任务
	 * @param vo
	 */
	@Transactional
	public void insertBeforehandTest(BeforehandTest vo){
		gDao.save(vo);
	}
	
	/**
	 * 修改预验收任务
	 */
	@Transactional
	public void updateBeforehandTest(BeforehandTest vo){
		gDao.update(vo);
	}
	
	/**
	 * 根据验收任务编号查询是否已经新建了任务
	 * @param vo
	 * @return
	 */
	public int getBeforehandTestForOneCount(BeforehandTestVo vo){
		String sql = "select count(1) from T_BEFOREHANDTEST t where t.acceptId=?";
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, vo.getAcceptId());
		return Integer.parseInt(query.uniqueResult().toString());
	}
	
	/**
	 * 根据验收任务编号获取一条预验收信息
	 * @param vo
	 * @return
	 */
	public BeforehandTest getBeforehandTest(BeforehandTestVo vo){
		String sql = "select t.* from T_BEFOREHANDTEST t where t.acceptId=?";
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql);
		this.setBeforehandTest(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(BeforehandTest.class));
		query.setParameter(0, vo.getAcceptId());
//		List<BeforehandTest> list = query.list();
		return (BeforehandTest)query.uniqueResult();
	}
	
	public void setBeforehandTest(SQLQuery query){
		query = query.addScalar("beforehandTestId", Hibernate.STRING);
		query = query.addScalar("beforehandTestText", Hibernate.STRING);
		query = query.addScalar("beforehandTestPeopel", Hibernate.STRING);
		query = query.addScalar("beforehandTestStartTime", Hibernate.DATE);
		query = query.addScalar("beforehandTestLastTime", Hibernate.DATE);
		query = query.addScalar("acceptId", Hibernate.STRING);
	}
}
