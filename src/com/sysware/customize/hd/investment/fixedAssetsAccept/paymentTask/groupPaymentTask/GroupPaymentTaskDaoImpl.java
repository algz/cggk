package com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.groupPaymentTask;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.deviceProject.contractManagement.DeviceContractmanagement;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("GroupPaymentTaskDaoImpl")
public class GroupPaymentTaskDaoImpl implements GroupPaymentTaskDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<GroupPaymentTask> aDao;
	
	@In(create=true,value="common_GenericDAOImpl")
	private GenericDAOImpl<GroupPaymentTask> gDao;
	
	/**
	 * 获取320用户信息
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<GroupPaymentTaskVo> getUserList(GroupPaymentTaskVo vo){
		StringBuffer sql = new StringBuffer();
		sql.append("select t.userid,t.truename,m.departmentname from T_USER t"
				+" left join t_departments m"
				+" on m.depcode=t.instcode"
				+" where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getInputValue()))
			sql.append(" and t.truename like'%").append(vo.getInputValue()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getInputValueNum()))
			sql.append(" and t.userid='").append(vo.getInputValueNum()).append("'");
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		this.setUserList(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(GroupPaymentTaskVo.class));
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}
	
	/**
	 * 获取320用户信息总数
	 * @param vo
	 * @return
	 */
	public long getUserListCount(GroupPaymentTaskVo vo){
		StringBuffer sql = new StringBuffer();
//		sql.append("select count(1) from T_USER t"
//				+" left join t_departments m"
//				+" on m.depcode=t.instcode"
//				+" where t.truename like'%")
//			.append(vo.getInputValue()).append("%'");
		sql.append("select count(1) from T_USER t"
				+" left join t_departments m"
				+" on m.depcode=t.instcode"
				+" where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getInputValue()))
			sql.append(" and t.truename like'%").append(vo.getInputValue()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getInputValueNum()))
			sql.append(" and t.userid='").append(vo.getInputValueNum()).append("'");
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		return Long.parseLong(query.uniqueResult().toString());
	}
	
	/**
	 * 根据编号删除任务
	 * @param pgIds
	 */
	public void deleteGroupPaymentTask(String pgIds){
		StringBuffer sql = new StringBuffer();
		sql.append("delete from T_PAYMENTTASK_GROUP t where t.pgid in(")
			.append(pgIds).append(")");
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		query.executeUpdate();
	}
	
	@Transactional
	public void insertGroupPaymentTask(GroupPaymentTask vo){
		gDao.save(vo);
	}
	
	@Transactional
	public void updateGroupPaymentTask(GroupPaymentTask vo){
		gDao.update(vo);
	}
	
	/**
	 * 根据编号查询一条任务
	 * @param vo
	 * @return
	 */
	public GroupPaymentTask getGroupPaymentTask(GroupPaymentTaskVo vo){
		GroupPaymentTask pt=aDao.selectById(GroupPaymentTask.class, vo.getPgId());
		DeviceContractmanagement dcm=(DeviceContractmanagement)aDao.getHibernateSession().get(DeviceContractmanagement.class, pt.getContractId());
        vo.setContractCode(dcm.getContractcode());
		return aDao.selectById(GroupPaymentTask.class, vo.getPgId());
	}
	
	/**
	 * 根据编号修改任务状态
	 * @param ids
	 * @param state
	 */
	public void updateState(String ids,long state){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer sql = new StringBuffer();
		sql.append("update T_PAYMENTTASK_GROUP g set g.pgstate=").append(state);
		if(state==3)
			sql.append(",g.Pgauditingtime=to_date('").append(sdf.format(new Date()).split("T")[0]+"','YYYY:MM:DD:HH24:MI:SS')");
		sql.append(" where g.Pgid in(").append(ids).append(")");
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		query.executeUpdate();
	}
	
	private void setUserList(SQLQuery query){
		query = query.addScalar("userId", Hibernate.STRING);
		query = query.addScalar("trueName", Hibernate.STRING);
		query = query.addScalar("departmentName", Hibernate.STRING);
	}
}
