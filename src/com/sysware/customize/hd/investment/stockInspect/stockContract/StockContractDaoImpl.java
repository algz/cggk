package com.sysware.customize.hd.investment.stockInspect.stockContract;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("StockContractDaoImpl")
public class StockContractDaoImpl implements StockContractDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	@In(create = true)
	private Identity identity;
	
	/**
	 * 获取合同表的信息
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<StockContractVo> GetStockContract(StockContractVo vo){
		StringBuilder sql = new StringBuilder("select count(1) from t_procurementcontract pc");
		BigDecimal count=(BigDecimal)dao.getHibernateSession().createSQLQuery(sql.toString())
		                                                      .uniqueResult();
		vo.setCount(count.toString());
		
		sql=new StringBuilder("select pc.procurementcontractid,pc.contractcode,pc.contractname,");
		sql.append("pc.contractamount,pc.vendname,pc.applicationstatus,pc.remark ");
		sql.append(" from t_procurementcontract pc");
		List<Object[]> list=dao.getHibernateSession().createSQLQuery(sql.toString())
		                                             .setMaxResults(vo.getLimit())
		                                             .setFirstResult(vo.getStart())
		                                             .list();
		List<StockContractVo> volist=new ArrayList<StockContractVo>();
		for(Object[] objs:list){
			StockContractVo scvo=new StockContractVo();
			scvo.setContract_id(objs[0].toString());
			scvo.setContract_code(objs[1]!=null?objs[1].toString():"");
			scvo.setContract_name(objs[2]!=null?objs[2].toString():"");
			scvo.setContract_amount(objs[3]!=null?objs[3].toString():"");
			scvo.setDepartment_a(objs[4]!=null?objs[4].toString():"");
			scvo.setStatus(objs[5]!=null?objs[5].toString():"");
			scvo.setRemark(objs[6]!=null?objs[6].toString():"");
			volist.add(scvo);
		}
		return volist;
	}
	
	/**
	 * 获取合同表的信息
	 * @param vo
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<StockContractVo> GetContractToAnalysis(StockContractVo vo){
		String username=identity.getLoginUser().getLoginname();
		StringBuilder sql = new StringBuilder();
		sql.append("select t.*,"
				+"case "

				+" when t.status in('1','2') then 9999 " 
				+" WHEN t.status = '3' AND t.contractType ='3' THEN 9999 "
				+" when (select count(1) from t_analysis_detail ad1"
				+" left join  t_efficiency_analysis ea1"
				+" on ad1.efficiency_analysis_id=ea1.id"
				+" where ea1.contract_id=t.contract_id)=0 then 99999 "//--选择专家
				
				+" when " 
				+"'"+username+"' not in(select e.EXPERT_NAME from  t_analysis_detail ad2"
				+" , t_efficiency_analysis ea2 ,T_EXPERT e "
				+" where ad2.efficiency_analysis_id=ea2.id"
		 		+" and ea2.contract_id=t.contract_id"
//				+"    and ad2.ratio_price=0"
				+" and AD2.SCORER=e.ID ) and (select count(*) from  t_analysis_detail ad2 , t_efficiency_analysis ea2 where ad2.efficiency_analysis_id=ea2.id and ea2.contract_id=t.contract_id and ad2.ratio_price=0  )>0"
				+"then 9999 "//--不能评分
				
				
				+" when (select count(1) from  t_analysis_detail ad2"
				+" , t_efficiency_analysis ea2,T_EXPERT e "
				+" where ad2.efficiency_analysis_id=ea2.id"
		 		+" and ea2.contract_id=t.contract_id"
				+"/*    and ad2.ratio_price is null*/"
				+" and ad2.ratio_price=0 and AD2.SCORER=e.ID and e.EXPERT_NAME='"+username+"'"
				+" and t.status in ('3','4','5'))>0 then 999999 "//--专家评分
				
				+" else (select t1.score from t_efficiency_analysis t1 where t1.contract_id=t.contract_id) " //--显示分数
				+" end typeNum"
				+" from v_contract_procurementcontract t" 
				+" where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getContract_code()))
			sql.append(" and t.contract_code like'%").append(vo.getContract_code()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getContract_name()))
			sql.append(" and t.contract_name like'%").append(vo.getContract_name()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getDepartment_b()))
			sql.append(" and t.department_a like'%").append(vo.getDepartment_b()).append("%'");
		
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		SetContractToAnalysis(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(StockContractVo.class));
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		return query.list();
	}
	
	
	/**
	 * 获取合同表的信息总数
	 * @param vo
	 * @return
	 */
	public long GetStockContractCount(StockContractVo vo){
		StringBuilder sql = new StringBuilder();
		sql.append("select count(1) from v_contract_procurementcontract t where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getContract_code()))
			sql.append(" and t.contract_code like'%").append(vo.getContract_code()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getContract_name()))
			sql.append(" and t.contract_name like'%").append(vo.getContract_name()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getDepartment_b()))
			sql.append(" and t.department_a like'%").append(vo.getDepartment_b()).append("%'");
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		Object obj = query.uniqueResult();
		return Long.parseLong(obj.toString());
	}
	
	private void SetStockContract(SQLQuery query){
		query = query.addScalar("contract_id", Hibernate.STRING);
		query = query.addScalar("contract_name", Hibernate.STRING);
		query = query.addScalar("contract_code", Hibernate.STRING);
		query = query.addScalar("department_a", Hibernate.STRING);
//		query = query.addScalar("department_a", Hibernate.STRING);
		query = query.addScalar("contract_amount", Hibernate.STRING);
		query = query.addScalar("createdate", Hibernate.STRING);
//		query = query.addScalar("contract_file", Hibernate.STRING);
//		query = query.addScalar("remark", Hibernate.STRING);
		query = query.addScalar("status", Hibernate.STRING);
		//判断是一期还是二期
		query = query.addScalar("contractType", Hibernate.LONG);
//		query = query.addScalar("enstrust_file", Hibernate.STRING);
	}
	
	private void SetContractToAnalysis(SQLQuery query){
		query = query.addScalar("contract_id", Hibernate.STRING);
		query = query.addScalar("contract_name", Hibernate.STRING);
		query = query.addScalar("contract_code", Hibernate.STRING);
		query = query.addScalar("department_a", Hibernate.STRING);
//		query = query.addScalar("department_a", Hibernate.STRING);
		query = query.addScalar("contract_amount", Hibernate.STRING);
		query = query.addScalar("createdate", Hibernate.STRING);
//		query = query.addScalar("contract_file", Hibernate.STRING);
//		query = query.addScalar("remark", Hibernate.STRING);
		query = query.addScalar("status", Hibernate.STRING);
		query = query.addScalar("contractType", Hibernate.LONG);
//		query = query.addScalar("enstrust_file", Hibernate.STRING);
		query = query.addScalar("typeNum", Hibernate.LONG);
		//判断是一期还是二期
		query = query.addScalar("contractType", Hibernate.LONG);
	}

	public List<StockContractVo> GetFixedStockContract(StockContractVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select t.* from v_stockcontract_fixed t where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getProjectname()))
			sql.append(" and projectname like'%").append(vo.getProjectname()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getProjectnum()))
			sql.append(" and projectnum like'%").append(vo.getProjectnum()).append("%'");
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		SetFixedStockContract(query);
		query = (SQLQuery)query.setResultTransformer(Transformers.aliasToBean(StockContractVo.class));
		query.setMaxResults(vo.getLimit());
		query.setFirstResult(vo.getStart());
		List<StockContractVo> list = new ArrayList<StockContractVo>();
		try {
			list = query.list();
			return list;
		} catch (Exception e) {
			return new ArrayList<StockContractVo>();
		}
	}

	private void SetFixedStockContract(SQLQuery query){
		query = query.addScalar("projectid",Hibernate.STRING);
		query = query.addScalar("projectnum", Hibernate.STRING);
		query = query.addScalar("projectname", Hibernate.STRING);
		query = query.addScalar("payedamount", Hibernate.STRING);
		query = query.addScalar("contract_amount", Hibernate.STRING);
		query = query.addScalar("contractnum", Hibernate.STRING);
		query = query.addScalar("plantype", Hibernate.STRING);
		query = query.addScalar("fundsource",Hibernate.STRING);
	}
	
	public long GetFixedStockContractCount(StockContractVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(1) from v_stockcontract_fixed t where 1=1");
		if(UtilForHD.IsStrEmpty(vo.getProjectname()))
			sql.append(" and projectname like'%").append(vo.getProjectname()).append("%'");
		if(UtilForHD.IsStrEmpty(vo.getProjectnum()))
			sql.append(" and projectnum like'%").append(vo.getProjectnum()).append("%'");
		SQLQuery query = dao.getHibernateSession().createSQLQuery(sql.toString());
		Object obj = query.uniqueResult();
		return Long.parseLong(obj.toString());
	}
	
	
}
