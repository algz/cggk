package com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTask;

import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;

@Name("AcceptTaskDaoImpl")
public class AcceptTaskDaoImpl implements AcceptTaskDao {
//	@In(create = true, value = "common_CommonDAO")
//	private CommonDAO<Object> dao;
//	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<AcceptTask> aDao;
	
	@In(create=true,value="common_GenericDAOImpl")
	private GenericDAOImpl<AcceptTask> gDao;
	
	private static boolean isStrEmpty(String str) {
		if ("".equals(str) || null == str) {
			return false;
		} else {
			return true;
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<AcceptTaskVo> getAcceptTask(AcceptTaskVo vo){
		StringBuffer sql = new StringBuffer();
		sql.append("select t.* from T_ACCEPTTASK t where 1=1");
		if(isStrEmpty(vo.getAcceptNum()))
			sql.append(" and t.acceptnum like'%").append(vo.getAcceptNum()).append("%'");
		if(isStrEmpty(vo.getStartTime())&&!isStrEmpty(vo.getEndTime()))
			sql.append(" and t.accepttime>=to_date('"+vo.getStartTime().split("T")[0]+"','YYYY:MM:DD:HH24:MI:SS')");
		if(!isStrEmpty(vo.getStartTime())&&isStrEmpty(vo.getEndTime()))
			sql.append(" and t.accepttime<=to_date('"+vo.getEndTime().split("T")[0]+"','YYYY:MM:DD:HH24:MI:SS')");
		if(isStrEmpty(vo.getStartTime())&&isStrEmpty(vo.getEndTime()))
			sql.append(" and t.accepttime>=to_date('"+vo.getStartTime().split("T")[0]+"','YYYY:MM:DD:HH24:MI:SS')")
			.append(" and t.accepttime<=to_date('"+vo.getEndTime().split("T")[0]+"','YYYY:MM:DD:HH24:MI:SS')");
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		setAcceptTask(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(AcceptTaskVo.class));
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}
	
	@SuppressWarnings("unchecked")
	public List<AcceptTaskVo> getAcceptTaskById(String id){
		StringBuffer sql = new StringBuffer();
		sql.append("select t.* from T_ACCEPTTASK t where 1=1 " +
				"and t.contractid = '"+id+"'");
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		setAcceptTask(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(AcceptTaskVo.class));
		return query.list();
	}
	
	public long getAcceptTaskCount(AcceptTaskVo vo){
		StringBuffer sql = new StringBuffer();
		sql.append("select count(1) from T_ACCEPTTASK t where 1=1");
		if(isStrEmpty(vo.getAcceptNum()))
			sql.append(" and t.acceptnum like'%").append(vo.getAcceptNum()).append("%'");
		if(isStrEmpty(vo.getStartTime())&&!isStrEmpty(vo.getEndTime()))
			sql.append(" and t.accepttime>=to_date('"+vo.getStartTime().split("T")[0]+"','YYYY:MM:DD:HH24:MI:SS')");
		if(!isStrEmpty(vo.getStartTime())&&isStrEmpty(vo.getEndTime()))
			sql.append(" and t.accepttime<=to_date('"+vo.getEndTime().split("T")[0]+"','YYYY:MM:DD:HH24:MI:SS')");
		if(isStrEmpty(vo.getStartTime())&&isStrEmpty(vo.getEndTime()))
			sql.append(" and t.accepttime>=to_date('"+vo.getStartTime().split("T")[0]+"','YYYY:MM:DD:HH24:MI:SS')")
			.append(" and t.accepttime<=to_date('"+vo.getEndTime().split("T")[0]+"','YYYY:MM:DD:HH24:MI:SS')");
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		Object obj = query.uniqueResult();
		return Long.parseLong(obj.toString());
	}
	
	/**
	 * 添加任务
	 * @param vo
	 */
	@Transactional
	public void insertAcceptTask(AcceptTask vo){
		//判断是否已经存在当前项目编号
		AcceptTask acceptTask = aDao.selectById(AcceptTask.class, vo.getAcceptId());
		if(acceptTask==null)
			gDao.save(vo);
		else
			gDao.update(vo);
	}
	
	/**
	 * 根据编号组删除所有勾选的任务
	 * @param vo
	 */
	public void removeAcceptTask(AcceptTaskVo vo){
		StringBuffer sql = new StringBuffer();
		sql.append("delete from T_ACCEPTTASK a where a.acceptid in(").append(vo.getAcceptIds()).append(")");
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		query.executeUpdate();
	}
	
	/**
	 * 根据编号查询一条任务
	 * @param vo
	 * @return
	 */
	public AcceptTask getOneAcceptTask(AcceptTaskVo vo){
		return aDao.selectById(AcceptTask.class, vo.getAcceptId());
	}
	
	/**
	 * 根据编号修改验收任务的状态 
	 * @param id
	 * @param state
	 */
	public void updateAcceptTaskSatate(String id,long state){
		String sql = "update T_ACCEPTTASK a set a.Acceptstate=? where a.acceptid=?";
//		StringBuffer sql = new StringBuffer();
//		sql.append("update T_ACCEPTTASK a set a.Acceptstate=").append(state).append(" where a.acceptid in(")
//			.append(id).append(")");
		System.out.println(id+"|"+state);
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, state);
		query.setParameter(1, id);
		query.executeUpdate();
	}
	
	/**
	 * 计算项目进度各天数信息
	 * @param vo
	 * @return
	 */
	public AcceptTaskVo getProjectPlan(AcceptTaskVo vo){
		String sql = "select nvl(abs(asset.acyijiaoshiyongtime-asset.acjieshoufenguantime),0) as assetConnectDay,"
					+"nvl(abs(tc.testcoursetime-lt.lasttesttime),0) as testDay,"
					+"nvl(abs(rt.rendtesttime-rt.testtime),0) as rendTestDay,"
					+"nvl(abs(bt.beforehandteststarttime-bt.beforehandtestlasttime),0) as beforehandTestDay "
					+" from t_accepttask accept"
					+" left join t_assetconnect asset"
					+" on asset.acceptid=accept.acceptid"
					+" left join t_testcourse tc"
					+" on tc.acceptid=accept.acceptid"
					+" left join t_lasttest lt"
					+" on lt.acceptid=accept.acceptid"
					+" left join t_rendtest rt"
					+" on rt.acceptid=accept.acceptid"
					+" left join t_beforehandtest bt"
					+" on bt.acceptid=accept.acceptid"
					+" where accept.acceptid=?";
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql);
		this.setProjectPlan(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(AcceptTaskVo.class));
		query.setParameter(0, vo.getAcceptId());
		return (AcceptTaskVo)query.uniqueResult();
	}
	
	/**
	 * 根据合同我一标识获取合同号
	 * @param vo
	 * @return
	 */
	public String getContractCode(AcceptTaskVo vo){
		String sql = "select t.contract_code from T_CONTRACT t"
					+" where t.contract_id=?";
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, vo.getContractId());
		Object obj = query.uniqueResult();
		return obj.toString();
	}
	
	private void setAcceptTask(SQLQuery query){
		query = query.addScalar("acceptId", Hibernate.STRING);
		query = query.addScalar("acceptNum", Hibernate.STRING);
		query = query.addScalar("contractId", Hibernate.STRING);
		query = query.addScalar("acceptType", Hibernate.LONG);
		query = query.addScalar("acceptState", Hibernate.LONG);
		query = query.addScalar("acceptTime", Hibernate.STRING);
		query = query.addScalar("acceptNote", Hibernate.STRING);
	}
	
	private void setProjectPlan(SQLQuery query){
		query = query.addScalar("assetConnectDay", Hibernate.LONG);
		query = query.addScalar("testDay", Hibernate.LONG);
		query = query.addScalar("rendTestDay", Hibernate.LONG);
		query = query.addScalar("beforehandTestDay", Hibernate.LONG);
	}
}
