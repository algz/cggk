package com.sysware.customize.hd.investment.productionMaterialsManagement.procurement;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.MaterialServiceImpl;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;

@Name("procurement_ProcurementDaoImpl")
public class ProcurementDaoImpl extends GenericDAOImpl<Procurement> implements
		ProcurementDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	@SuppressWarnings("unchecked")
	public List<Procurement> findProcurements(ProcurementCondition condition) {
		List<Object> params = new ArrayList<Object>();
		StringBuilder jpql = new StringBuilder();
		jpql.append("select p from Procurement p where 1=1 ");
		processSqlAndParams(condition, params, jpql);
		jpql.append(" order by p.createDate desc ");
		return this.query(jpql.toString(), params.toArray(),
				condition.getStart(), condition.getLimit());
	}

	public List<Procurement> findAnnualProcurementList(ProcurementCondition condition) {
//		List<Object> params = new ArrayList<Object>();
//		StringBuilder jpql = new StringBuilder();
//		jpql.append("select p from Procurement p where 1=1 ");
//		processSqlAndParams(condition, params, jpql);
//		jpql.append(" order by p.createDate desc ");
//		String hql="from Procurement p where p.flag='1' and p.procurementType='1'";
		String sql="select  distinct p.* from t_procurement p left join t_procurementdetail pd  on p.procurementid=pd.procurementid where  pd.purchaseid is null and p.procurementtype='1'";
		return getHibernateSession().createSQLQuery(sql).addEntity("p",Procurement.class).list();
//		return this.getHibernateSession().createQuery(hql).list();
//		return this.query(jpql.toString(), params.toArray(),
//				condition.getStart(), condition.getLimit());
	}
	
	public long countProcurements(ProcurementCondition condition) {
		List<Object> params = new ArrayList<Object>();
		StringBuilder jpql = new StringBuilder();
		jpql.append("select count(*) from Procurement p where 1=1 ");
		processSqlAndParams(condition, params, jpql);
		return (Long) this.query(jpql.toString(), params.toArray(), -1, -1)
				.get(0);
	}

	public int getProcurementMaxCode() {
		// 锁定该表，以保证并发情况下正确的获得MaxCode
		// 该锁定将在当前事务提交或回滚时释放
		String lockSql = "lock table t_procurement in exclusive mode";
		this.em.createNativeQuery(lockSql).executeUpdate();
		String sql = "select substr(max(procurementcode),7) + 1 from t_procurement t "
				+ " where t.procurementtype='"
				+ ProcurementTypeEnum.LING_XING.getValue() + "'";
		Object result = this.em.createNativeQuery(sql).getSingleResult();
		return result == null ? 1 : ((BigDecimal) result).intValue();
	}

	public void batchUpdateProcurementsFlag(String[] procurementIds) {
		// 发布状态：未发布（0）；已发布（1）
		String sql = "update t_procurement set flag='1' where procurementid in ("
				+ processSqlCondition(procurementIds) + ")";
		this.executeNativeSQL(sql);
	}

	public void batchDeleteProcurements(String[] procurementIds) {
		String sql = "delete from t_procurement where procurementid in ("
				+ processSqlCondition(procurementIds) + ")";
		this.executeNativeSQL(sql);
	}

	// 拼装in条件
	private String processSqlCondition(String[] procurementIds) {
		StringBuilder sqlStr = new StringBuilder();
		for (int i = 0; i < procurementIds.length; i++) {
			sqlStr.append("'").append(procurementIds[i]).append("'");
			if (i < procurementIds.length - 1) {
				sqlStr.append(",");
			}
		}
		return sqlStr.toString();
	}
	
	// 拼装where条件同时处理Sql参数集合
	private void processSqlAndParams(ProcurementCondition condition,
			List<Object> params, StringBuilder jpql) {
		if (StringUtils.isNotEmpty(condition.getProcurementType())) {
			jpql.append(" and p.procurementType = ?1 ");
			params.add(condition.getProcurementType());
		}
		if (StringUtils.isNotEmpty(condition.getIsPurchaseDataSelect())
				&& "1".equals(condition.getIsPurchaseDataSelect())) {
			// 如果是计划生成时的下拉列表
			jpql.append(" and p.procurementId in (select distinct pd.procurementId ");
			jpql.append(" from ProcurementDetail pd where pd.purchaseId is null) ");
			//暂时修改，具体使用上面
//			jpql.append(" from ProcurementDetail pd where 1=1) "); 
		}
		jpql.append(" and p.flag='1' ");
	}

	@SuppressWarnings("unchecked")
	public List<ProcurementVo> getComboBoxDataForAnnualPlan(ProcurementVo procurementVo) throws Exception {
		List<ProcurementVo> voList=new ArrayList<ProcurementVo>();
		//获取当前登录用户信息
	    Identity identity  = (Identity)Component
			.getInstance("org.jboss.seam.security.identity");
	    String loginname=identity.getLoginUser().getLoginname();
	    
	    //List<Object[]> objList=new ArrayList<Object[]>();
		String sql="select distinct p.procurementid,p.procurementcode,bp.plantype from t_procurementsummarydetail psd,t_procurement p,t_buinessplan bp " +
				"where p.procurementtype='1' and  psd.procurementid=p.procurementid and p.buinessplanid=bp.buinessplanid "
			      +" and  psd.materialid  in (" + MaterialServiceImpl.getMaterialidAuthorityByLoginName(loginname)+ ") ";
		List<Object[]> list=dao.getHibernateSession().createSQLQuery(sql).list();
		for(Object[] obj:list){
			sql="select count(1) from t_procurementdetail pd where pd.procurementid=:procurementid"
			   +" and  pd.materialid  in (" + MaterialServiceImpl.getMaterialidAuthorityByLoginName(loginname)+ ") ";
			
			BigDecimal c=(BigDecimal)dao.getHibernateSession().createSQLQuery(sql)
			                            .setParameter("procurementid", obj[0].toString()).uniqueResult();
			if(c.equals(BigDecimal.ZERO)){
				ProcurementVo vo=new ProcurementVo();
				vo.setProcurementId(obj[0].toString());
				vo.setProcurementCode(obj[1].toString());
				vo.setProcurementType(obj[2].toString());//1预拨计划;2调整计划;3临批计划
				voList.add(vo);
			}else{
				//查询定额计划汇总小计表是否新建并提交(生成采购需求表)
				sql="select count(1) from t_procurementdetail pd where pd.purchaseid is null and pd.procurementid=:procurementid "
				   +" and pd.materialid  in (" + MaterialServiceImpl.getMaterialidAuthorityByLoginName(loginname)+ ") ";
				
				c=(BigDecimal)dao.getHibernateSession().createSQLQuery(sql)
                .setParameter("procurementid", obj[0].toString()).uniqueResult();
				if(c.equals(BigDecimal.ZERO)){//已新建并提交
					;//不显示
				}else{//已新建未提交
					ProcurementVo vo=new ProcurementVo();
					vo.setProcurementId(obj[0].toString());
					vo.setProcurementCode(obj[1].toString());
					vo.setProcurementType(obj[2].toString());//1预拨计划;2调整计划;3临批计划
					voList.add(vo);
				}

			}
		}
			
			
//		BigDecimal count=(BigDecimal)dao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
//		if(count.equals(BigDecimal.ZERO)){			
//		}
//		List<Object[]> list=dao.getHibernateSession().createSQLQuery(sql).list();
//		for(Object[] objs:list){
//			ProcurementVo vo=new ProcurementVo();
//			vo.setProcurementId(objs[0]==null?"":objs[0].toString());
//			vo.setProcurementCode(objs[1]==null?"":objs[1].toString());
//			voList.add(vo);
//		}
		procurementVo.setCount(String.valueOf(voList.size()));
		return voList;
	}


}
