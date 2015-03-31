package com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTaskForContract;

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

@Name("AcceptTaskForContractDaoImpl")
public class AcceptTaskForContractDaoImpl {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<AcceptTaskForContract> dao;
	
	@In(create=true,value="common_GenericDAOImpl")
	private GenericDAOImpl<AcceptTaskForContract> gDao;
	
	/**
	 * 获取拥有输入内容的项目编号条目
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<AcceptTaskForContractVo> getTaskList(AcceptTaskForContractVo vo){
		StringBuffer sql = new StringBuffer();
//		sql.append("select t.* from T_ACCEPTTASK_CONTRACT t where t.acceptnum like'%")
//			.append(vo.getInputValue()).append("%'");
//		sql.append("select t.*,c.contract_code as contractCode from T_ACCEPTTASK_CONTRACT t ")
//			.append(" left join t_contract c")
//			.append(" on c.contract_id=t.contractid")
//			.append(" where c.status>2")
//			.append(" and (select count(1) from t_accepttask a where a.acceptnum=t.acceptnum)<=0");
//		if(UtilForHD.IsStrEmpty(vo.getInputValue()))
//			sql.append(" and t.acceptnum like'%")
//			.append(vo.getInputValue()).append("%'");
//		sql.append("select DISTINCT er.projectnum,er.projectname,er.id as contractId")
//			.append(" from TB_DEVICE_CONTRACTMANAGEMENT dm,TB_EQUIPREGIST er")
//			.append(" where dm.EQUIPREGIST_ID=ER.ID and dm.STATUS='3'")
//			.append(" and (select count(1) from t_accepttask a where a.acceptnum=er.projectnum)=0");
		sql.append("select vi.projectnum,vi.projectname,vi.contractId,vi.projectcategorys ")
			.append("from V_PLANACCEPT_FIXED vi ")
			.append("where vi.status='3' ")
			.append("and vi.contract_type='1' ")
			.append("and (select count(1) from t_accepttask a where a.acceptnum=vi.projectnum)=0");
		if(UtilForHD.IsStrEmpty(vo.getInputValue()))
			sql.append("and vi.projectnum like '%")
				.append(vo.getInputValue()).append("%'");
		System.out.println("SQL:"+sql.toString());
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		setTaskListAndCode(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(AcceptTaskForContractVo.class));
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}
	
	public long getTaskListCount(AcceptTaskForContractVo vo){
		StringBuffer sql = new StringBuffer();
//		sql.append("select count(1) from T_ACCEPTTASK_CONTRACT t where t.acceptnum like'%")
//			.append(vo.getInputValue()).append("%'");
//		sql.append("select count(1) from T_ACCEPTTASK_CONTRACT t ")
//		.append(" left join t_contract c")
//		.append(" on c.contract_id=t.contractid")
//		.append(" where c.status>2")
//		.append(" and (select count(1) from t_accepttask a where a.acceptnum=t.acceptnum)<=0");
//		if(UtilForHD.IsStrEmpty(vo.getInputValue()))
//			sql.append(" and t.acceptnum like'%")
//			.append(vo.getInputValue()).append("%'");
		sql.append("select count(1)")
		.append(" from V_PLANACCEPT_FIXED vi ")
		.append(" where vi.STATUS='3'")
		.append(" and vi.contract_type='1'")
		.append(" and (select count(1) from t_accepttask a where a.acceptnum=vi.projectnum)=0");
		if(UtilForHD.IsStrEmpty(vo.getInputValue()))
			sql.append("and vi.projectnum like '%")
			.append(vo.getInputValue()).append("%'");
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		return Long.parseLong(query.uniqueResult().toString());
	}
	
	/**
	 * 给合同编号添加关联项目编号
	 * @param vo
	 */
	@Transactional
	public void insertAcceptTaskForContract(AcceptTaskForContract vo){
		gDao.save(vo);
	}
	
	/**
	 * 修改合同编号关联的项目编号
	 * @param vo
	 */
	@Transactional
	public void updateAcceptTaskForContract(AcceptTaskForContract vo){
		gDao.update(vo);
	}
	
	/**
	 * 判断是否已经存在项目编号
	 * @param vo
	 * @return
	 */
	public long getAcceptNumCount(AcceptTaskForContractVo vo){
		String sql = "select count(1)"
					+" from T_ACCEPTTASK_CONTRACT t"  
					+" where t.acceptnum=?";
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, vo.getAcceptNum());
		return Long.parseLong(query.uniqueResult().toString());
	}
	
	/**
	 * 判断合同编号是否存在项目编号
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public AcceptTaskForContract getAcceptTaskForContract(AcceptTaskForContractVo vo){
		String sql = "select t.* from T_ACCEPTTASK_CONTRACT t where t.contractid=?";
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql);
		this.setTaskList(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(AcceptTaskForContract.class));
		query.setParameter(0, vo.getContractId());
		List<AcceptTaskForContract> list = query.list();
		if(list.size()>0)
			return list.get(0);
		else
			return null;
	}
	
	private void setTaskList(SQLQuery query){
		query = query.addScalar("acId", Hibernate.STRING);
		query = query.addScalar("acceptNum", Hibernate.STRING);
		query = query.addScalar("contractId", Hibernate.STRING);
	}
	
//	private void setTaskListAndCode(SQLQuery query){
//		query = query.addScalar("acId", Hibernate.STRING);
//		query = query.addScalar("acceptNum", Hibernate.STRING);
//		query = query.addScalar("contractId", Hibernate.STRING);
//		query = query.addScalar("contractCode", Hibernate.STRING);
//	}
	
	private void setTaskListAndCode(SQLQuery query){
		query = query.addScalar("projectnum", Hibernate.STRING);
		query = query.addScalar("projectname", Hibernate.STRING);
		query = query.addScalar("contractId", Hibernate.STRING);
		query = query.addScalar("projectcategorys",Hibernate.STRING);
	}
}
