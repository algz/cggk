package com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.stockPaymentTask;

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
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("StockPaymentTaskDaoImpl")
public class StockPaymentTaskDaoImpl implements StockPaymentTaskDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<StockPaymentTask> aDao;
	
	@In(create=true,value="common_GenericDAOImpl")
	private GenericDAOImpl<StockPaymentTask> gDao;
	
	/**
	 * 获取合同编号
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<StockPaymentTaskVo> getContractList(StockPaymentTaskVo vo){
		StringBuffer sql = new StringBuffer();
//		sql.append("select t.contract_id as contractId,t.contract_code as contractCode from T_CONTRACT t")
//			.append(" where t.status>2");
//		if(UtilForHD.IsStrEmpty(vo.getInputValue()))
//			sql.append(" and t.contract_code like'%").append(vo.getInputValue()).append("%'");
//		if(UtilForHD.IsStrEmpty(vo.getInputValueNum()))
//			sql.append(" and t.contract_id='").append(vo.getInputValueNum()).append("'");
		if(vo.getInputSelectType()==1){
			sql.append("select dm.contractid,dm.contractcode from TB_DEVICE_CONTRACTMANAGEMENT dm")
				.append(" where dm.CONTRACT_TYPE='1' and dm.STATUS='3'");
		}else if(vo.getInputSelectType()==2){
			sql.append("SELECT a.contractid,a.contractcode FROM TB_DEVICE_CONTRACTMANAGEMENT a")
				.append(" WHERE a.CONTRACT_TYPE='2' and a.status = '3'");
			
		}else if(vo.getInputSelectType()==3){
			sql.append("SELECT a.contractid,a.contractcode FROM TB_DEVICE_CONTRACTMANAGEMENT a")
			.append(" WHERE a.CONTRACT_TYPE='3' and a.status = '3'");
		}else if(vo.getInputSelectType()==4){
			sql.append("SELECT a.contractid,a.contractcode FROM TB_DEVICE_CONTRACTMANAGEMENT a")
			.append(" WHERE a.CONTRACT_TYPE='4' and a.status = '3'");
		}
		if(UtilForHD.IsStrEmpty(vo.getInputValue()))
			sql.append(" and a.contractcode like'%").append(vo.getInputValue()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getInputValueNum()))
			sql.append(" and a.contractid='").append(vo.getInputValueNum()).append("'");
		System.out.println("sql："+sql.toString());
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		this.setContractList(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(StockPaymentTaskVo.class));
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}
	
	/**
	 * 获得合同编号总数
	 * @param vo
	 * @return
	 */
	public long getContractListCount(StockPaymentTaskVo vo){
		StringBuffer sql = new StringBuffer();
//		sql.append("select count(1) from T_CONTRACT t")
//			.append(" where t.status>2");
//		if(UtilForHD.IsStrEmpty(vo.getInputValue()))
//			sql.append(" and t.contract_code like'%").append(vo.getInputValue()).append("%'");
//		if(UtilForHD.IsStrEmpty(vo.getInputValueNum()))
//			sql.append(" and t.contract_id='").append(vo.getInputValueNum()).append("'");
		if(vo.getInputSelectType()==1){
			sql.append("select count(1) from TB_DEVICE_CONTRACTMANAGEMENT dm")
				.append(" where dm.STATUS='3'");
			if(UtilForHD.IsStrEmpty(vo.getInputValue()))
				sql.append(" and dm.contractcode like'%").append(vo.getInputValue()).append("%'");
			if(UtilForHD.IsStrEmpty(vo.getInputValueNum()))
				sql.append(" and dm.contractid='").append(vo.getInputValueNum()).append("'");
		}else{
			sql.append("SELECT count(1) FROM TB_ENGINEERINGCONTRACT a")
				.append(" WHERE a.status = '3'");
			if(UtilForHD.IsStrEmpty(vo.getInputValue()))
				sql.append(" and a.contractcode like'%").append(vo.getInputValue()).append("%'");
			if(UtilForHD.IsStrEmpty(vo.getInputValueNum()))
				sql.append(" and a.engineeringcontractid='").append(vo.getInputValueNum()).append("'");
		}
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		return Long.parseLong(query.uniqueResult().toString());
	}
	
	/**
	 * 通过供应商编号获取所有开户信息
	 * @param vo
	 * @return
	 */
	public StockPaymentTaskVo getVendorAccountList(StockPaymentTaskVo vo){
		String sql = "select t.bank,t.accountid,t.bank2,t.accountid2,t.bank3,t.accountid3 from T_VENDOR t where t.vendorid=?";
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql);
		this.setVendorAccountList(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(StockPaymentTaskVo.class));
		query.setParameter(0, vo.getVendorId());
		Object obj = query.uniqueResult();
		return (StockPaymentTaskVo)obj;
	}
	
	/**
	 * 新建股份任务
	 * @param vo
	 */
	@Transactional
	public void insertStockPaymentTask(StockPaymentTask vo){
		gDao.save(vo);
	}
	
	/**
	 * 修改股份任务
	 * @param vo
	 */
	@Transactional
	public void updateStockPaymentTask(StockPaymentTask vo){
		gDao.update(vo);
	}
	
	/**
	 * 获取支付任务列表
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<StockPaymentTaskVo> getPaymentTask(StockPaymentTaskVo vo){
		StringBuffer sql = new StringBuffer();
		sql.append("select * from"
				+" (select t.psid,t.psauditingbrow,t.psauditingtime,"
				+"t.psstate,t.pstype,t.pscreatetime,t.selectType"
				+" from T_PAYMENTTASK_STOCK t"
				+" union all"
				+" select g.pgid as psid,g.pgauditingbrow as psauditingbrow,g.pgauditingtime as psauditingtime,"
				+"g.pgstate as psstate,g.pgtype as pstype,g.pgcreatetime as pscreatetime,g.selectType"
				+" from T_PAYMENTTASK_GROUP g) m"
				+" where 1=1");
		sql.append(" and m.selectType=").append(vo.getSelectType());
		if(UtilForHD.IsStrEmpty(vo.getPsId()))
			sql.append(" and m.psid like'%").append(vo.getPsId()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getMoney())){
			if(vo.getTerm()==1)
				sql.append(" and m.Psauditingbrow>").append(vo.getMoney());
			else if(vo.getTerm()==2)
				sql.append(" and m.Psauditingbrow=").append(vo.getMoney());
			else if(vo.getTerm()==3)
				sql.append(" and m.Psauditingbrow<").append(vo.getMoney());
		}
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		this.setPaymentTask(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(StockPaymentTaskVo.class));
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}
	
	/**
	 * 获取支付任务列表总数
	 * @return
	 */
	public long getPaymentTaskCount(StockPaymentTaskVo vo){
		StringBuffer sql = new StringBuffer();
		sql.append("select count(1) from"
				+" (select t.psid,t.psauditingbrow,t.psauditingtime,"
				+"t.psstate,t.pstype,t.pscreatetime"
				+" from T_PAYMENTTASK_STOCK t"
				+" union all"
				+" select g.pgid as psid,g.pgauditingbrow as psauditingbrow,g.pgauditingtime as psauditingtime,"
				+"g.pgstate as psstate,g.pgtype as pstype,g.pgcreatetime as pscreatetime"
				+" from T_PAYMENTTASK_GROUP g) m"
				+" where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getPsId()))
			sql.append(" and m.psid like'%").append(vo.getPsId()).append("%'");
		if(vo.getTerm()>0){
			if(vo.getTerm()==1)
				sql.append(" and m.Psauditingbrow>").append(vo.getPsAuditingBrow());
			else if(vo.getTerm()==2)
				sql.append(" and m.Psauditingbrow=").append(vo.getPsAuditingBrow());
			else if(vo.getTerm()==3)
				sql.append(" and m.Psauditingbrow<").append(vo.getPsAuditingBrow());
		}
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		return Long.parseLong(query.uniqueResult().toString());
	}
	
	/**
	 * 根据编号查询一条任务
	 * @param vo
	 * @return
	 */
	public StockPaymentTask getStockPaymentTask(StockPaymentTaskVo vo){
		return aDao.selectById(StockPaymentTask.class, vo.getPsId());
	}
	
	/**
	 * 根据编删除任务
	 * @param psIds
	 */
	public void deleteStockPaymentTask(String psIds){
		StringBuffer sql = new StringBuffer();
		sql.append("delete from T_PAYMENTTASK_STOCK t where t.psid in(")
			.append(psIds).append(")");
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		query.executeUpdate();
	}
	
	/**
	 * 根据编号修改任务状态
	 * @param ids
	 * @param state
	 */
	public void updateState(String ids,long state){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer sql = new StringBuffer();
		sql.append("update T_PAYMENTTASK_STOCK s set s.psstate=").append(state);
		if(state==3)
			sql.append(",s.psauditingtime=to_date('").append(sdf.format(new Date()).split("T")[0]+"','YYYY:MM:DD:HH24:MI:SS')");
		sql.append(" where s.psid in(").append(ids).append(")");
		System.out.println("SQL:"+sql.toString());
		SQLQuery query = aDao.getHibernateSession().createSQLQuery(sql.toString());
		query.executeUpdate();
	}
	
	private void setContractList(SQLQuery query){
		query = query.addScalar("contractId", Hibernate.STRING);
		query = query.addScalar("contractCode", Hibernate.STRING);
	}
	
	private void setVendorAccountList(SQLQuery query){
		query = query.addScalar("bank", Hibernate.STRING);
		query = query.addScalar("accountid", Hibernate.STRING);
		query = query.addScalar("bank2", Hibernate.STRING);
		query = query.addScalar("accountid2", Hibernate.STRING);
		query = query.addScalar("bank3", Hibernate.STRING);
		query = query.addScalar("accountid3", Hibernate.STRING);
	}
	
	private void setPaymentTask(SQLQuery query){
		query = query.addScalar("psId", Hibernate.STRING);
		query = query.addScalar("psAuditingBrow", Hibernate.STRING);
		query = query.addScalar("psAuditingTime", Hibernate.STRING);
		query = query.addScalar("psState", Hibernate.LONG);
		query = query.addScalar("psType", Hibernate.LONG);
		query = query.addScalar("psCreateTime", Hibernate.STRING);
	}
	
}
