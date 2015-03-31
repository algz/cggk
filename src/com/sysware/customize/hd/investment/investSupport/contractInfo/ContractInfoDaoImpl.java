package com.sysware.customize.hd.investment.investSupport.contractInfo;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.engineeringProject.util.UtilDaoImp;
import com.sysware.customize.hd.investment.investSupport.vo.ContractInfoVo;
import com.sysware.util.StrUtil;

/**
 * @ClassName: ContractInfoDaoImpl
 * @Description: 合同资讯模块 DAO实现类
 * 
 * @author LIT
 * @date Nov 24, 2011 9:58:48 AM
 * 
 */

@Name("contractInfoDaoImpl")
public class ContractInfoDaoImpl implements ContractInfoDao {
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> _connomDao;

	public List<Object> getInfo(ContractInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select t.contract_id,");
		sql.append("    t.contract_code,");
		sql.append("    t.contract_name,");
		sql.append("    t.department_a,");
		sql.append("    t.contract_amount,");
		sql.append("    t.createdate,1");
//		sql.append("    t.createType");
		sql.append("  from v_contract_procurementcontract t where 1=1");

		if(!StrUtil.isNullOrEmpty(vo.getContractCode())){
			sql.append(" and t.contract_code like'%");
			sql.append(vo.getContractCode());
			sql.append("%'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getContractName())){
			sql.append(" and t.contract_name like'%");
			sql.append(vo.getContractName());
			sql.append("%'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getDepartmentA())){
			sql.append(" and t.department_a like'%");
			sql.append(vo.getDepartmentA());
			sql.append("%'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getStartDate())){
			sql.append(" and t.createdate >= to_date('");
			sql.append(vo.getStartDate());
			sql.append("','yyyy-mm-dd')");
		}
		if(!StrUtil.isNullOrEmpty(vo.getEndDate())){
			sql.append(" and t.createdate <=to_date('");
			sql.append(vo.getEndDate());
			sql.append("','yyyy-mm-dd')");
		}
		
		Query q = _connomDao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();

		return list;
	}

	public Long getInfoCount(ContractInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*)");
		sql.append("  from v_contract_procurementcontract t where 1=1 ");
		if(!StrUtil.isNullOrEmpty(vo.getContractCode())){
			sql.append(" and t.contract_code ='");
			sql.append(vo.getContractCode());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getContractName())){
			sql.append(" and t.contract_name ='");
			sql.append(vo.getContractName());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getDepartmentA())){
			sql.append(" and t.department_a ='");
			sql.append(vo.getDepartmentA());
			sql.append("'");
		}
		if(!StrUtil.isNullOrEmpty(vo.getStartDate())){
			sql.append(" and t.createdate >= to_date('");
			sql.append(vo.getStartDate());
			sql.append("','yyyy-mm-dd')");
		}
		if(!StrUtil.isNullOrEmpty(vo.getEndDate())){
			sql.append(" and t.createdate <=to_date('");
			sql.append(vo.getEndDate());
			sql.append("','yyyy-mm-dd')");
		}
		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	public List<Object> getContractExeInfo(ContractInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		
/*		sql.append("select t.materialitemcode,");
		sql.append("   t.materialitemname,");
		sql.append("   t.materialstandard,");
		sql.append("   t.purchase_num,");
		sql.append("   t.lot_no,");
		sql.append("   t.arrival_num,");
		sql.append("   t.purchase_num - t.arrival_num");
		sql.append(" from v_contract_registration t");
		sql.append(" where  t.contract_id ='");
		sql.append(vo.getContractId());
		sql.append("'");*/
		
		sql.append("select v.materialitemcode,v.materialitemname,v.materialstandard,v.batchnum,v.arrival_num,v.sumnum,v.unarrival_num");
		sql.append("from v_contractExeInfo v where v.procurementcontractid='"+vo.getContractId()+"'");
		Query q = _connomDao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();

//		System.out.println("getContractExeInfo" + vo.getContractId());
		return list;
	}

	public Long getContractExeInfoCount(ContractInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*)");
		sql.append("  from v_contract_registration t");
		sql.append("  where  t.contract_id ='");
		sql.append(vo.getContractId());
		sql.append("'");

		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	public List<Object> getDamanInfo(ContractInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select t.materialitemcode,");
		sql.append("    t.materialitemname,");
		sql.append("    t.materialtypename,");
		sql.append("    t.quantity,");
		sql.append("    t.amount,");
		sql.append("    t.departmentname,"); 
		sql.append("    t.fileId ,");
		sql.append("    t.fileName");
		sql.append(" from v_contract_declare t");
		sql.append("  where  t.contract_id ='");
		sql.append(vo.getContractId());
		sql.append("'");
		
		Query q = _connomDao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();
		return list;
	}

	public Long getDamanInfoCount(ContractInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*)");
		sql.append("  from v_contract_declare t");
		sql.append("  where  t.contract_id ='");
		sql.append(vo.getContractId());
		sql.append("'");
		
		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	public List<Object> getTenderInfo(ContractInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select t.Tender_code,");
		sql.append("     t.Tender_name,");
		sql.append("     t.ProcurementPlan_detil_name,");
		sql.append("     t.Tender_department,");
		sql.append("     t.Tender_type,");
		sql.append("     t.selecteddepartment,");
		sql.append("     t.syndic ,");
		sql.append("     t.tenderFileId ,");
		sql.append("     t.tenderFileName ,");
		sql.append("     t.tenderAppraId ,");
		sql.append("     t.tenderAppraName ");
		sql.append(" from v_contract_tender t");
		sql.append("  where  t.contract_id ='");
		sql.append(vo.getContractId());
		sql.append("'");

		Query q = _connomDao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();

//		System.out.println("getTenderInfo" + vo.getContractId());
		return list;
	}

	public Long getTenderInfoCount(ContractInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*)");
		sql.append("  from v_contract_tender t");
		sql.append("  where  t.contract_id ='");
		sql.append(vo.getContractId());
		sql.append("'");

		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	public List<Object> getContractPaymentInfo(ContractInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		/*sql.append("select distinct t.contractcode,");
		sql.append("   t.contractname,");
		sql.append("   t.paymented_amount,");
		sql.append("   t.contractamount - t.paymented_amount,");
		sql.append("   t.contractamount");
		sql.append(" from v_contract_registration t");
		sql.append("  where  t.contract_id ='");
		sql.append(vo.getContractId());
		sql.append("'");*/
		sql.append("from t_moneypayment m inner join  t_registration reg on reg.contract_id=m.procurementcontractid "+
                   "inner join t_procurementcontract pc on pc.procurementcontractid=m.procurementcontractid "+
                   "where pc.procurementcontractid='"+vo.getContractId()+"'");
		BigDecimal count=(BigDecimal)_connomDao.getHibernateSession()
		                                       .createSQLQuery("select count(1)"+sql.toString())
		                                       .uniqueResult();
		vo.setCount(count.intValue());
		return _connomDao.createSqlQuery("select distinct pc.contractcode,pc.contractname,m.amount," +
				                        "m.incurreddate,pc.contractamount "
                                        +sql.toString())
		                 .setMaxResults(vo.getLimit())
		                 .setFirstResult(vo.getStart())
		                 .getResultList();
	}

	public Long getContractPaymentInfoCount(ContractInfoVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(*)");
		sql.append("  from v_contract_registration t");
		sql.append("  where  t.contract_id ='");
		sql.append(vo.getContractId());
		sql.append("'");
		
		Query q = _connomDao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	@SuppressWarnings("unchecked")
	public List<?> getContractList(ContractInfoVo vo) {
		// TODO Auto-generated method stub
		List<JSONObject> objList=new ArrayList();
		if(vo.getProjectid()==null||vo.getProjectid().equals("")){
			return objList;
		}
		String sql="select count(*) from (select DC.CONTRACTID,DC.CONTRACTCODE,DC.CONTRACTNAME,v.VENDORNAME,DC.AMOUNT,DC.STATUS,count(PS.CONTRACTID) PAYMENT_FREQUENCY,sum(nvl(PS.PSAUDITINGBROW,0))/10000 PAYMENT_AMOUNT from TB_DEVICE_CONTRACTMANAGEMENT dc LEFT JOIN T_PAYMENTTASK_STOCK ps ON DC.CONTRACTID=PS.CONTRACTID LEFT JOIN T_VENDOR v ON  v.VENDORID=DC.PARTYB WHERE DC.EQUIPREGIST_ID='"+vo.getProjectid()+"' GROUP BY DC.CONTRACTID,DC.CONTRACTCODE,DC.CONTRACTNAME,DC.PARTYB,DC.AMOUNT,DC.STATUS,v.VENDORNAME)";
		BigDecimal count=(BigDecimal)_connomDao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());
		
		sql="select DC.CONTRACTID,DC.CONTRACTCODE,DC.CONTRACTNAME,v.VENDORNAME,DC.AMOUNT,DC.STATUS,count(PS.CONTRACTID) PAYMENT_FREQUENCY,sum(nvl(PS.PSAUDITINGBROW,0))/10000 PAYMENT_AMOUNT from TB_DEVICE_CONTRACTMANAGEMENT dc LEFT JOIN T_PAYMENTTASK_STOCK ps ON DC.CONTRACTID=PS.CONTRACTID LEFT JOIN T_VENDOR v ON  v.VENDORID=DC.PARTYB WHERE DC.EQUIPREGIST_ID='"+vo.getProjectid()+"' GROUP BY DC.CONTRACTID,DC.CONTRACTCODE,DC.CONTRACTNAME,DC.PARTYB,DC.AMOUNT,DC.STATUS,v.VENDORNAME";
		List<Object[]> list=_connomDao.getHibernateSession().createSQLQuery(sql)
		                              .setFirstResult(vo.getStart())
		                              .setMaxResults(vo.getCount()).list();
		
		for(Object[] objs:list){
			JSONObject jo=new JSONObject();
			jo.put("contractid", objs[0]);
			jo.put("contractcode", objs[1]);
			jo.put("contractname", objs[2]);
			jo.put("partyb", objs[3]);
			jo.put("amount", objs[4]);
			jo.put("status", objs[5]);
			jo.put("paymentfrequency", objs[6]);
			jo.put("paymentamount", objs[7]);
			objList.add(jo);
		}
		return objList;
	}

	@SuppressWarnings("unchecked")
	public List<?> getProjectList(ContractInfoVo vo) {
		// TODO Auto-generated method stub
		
		StringBuffer params=new StringBuffer();
		if(vo.getProjectnum()!=null&&!vo.getProjectnum().equals("")){
			params.append(" and v.projectnum='"+vo.getProjectnum()+"'");
		}
		if(vo.getProjectname()!=null&&!vo.getProjectname().equals("")){
			params.append(" and v.projectname='"+vo.getProjectname()+"'");
		}
		if(vo.getStartDate()!=null&&!vo.getStartDate().equals("")&&!vo.getEndDate().equals("")){
			params.append(" and v.createtime between to_date('"+vo.getStartDate().substring(0,10)+"','yyyy-MM-dd') and to_date('"+vo.getEndDate().substring(0,10)+"','yyyy-MM-dd')");
		}
		
		
		String sql="select count(*) from CONTRACTINFO_PROJECTINFO_V v where 1=1 "+params;
		BigDecimal count=(BigDecimal)_connomDao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());
		
		sql="select * from CONTRACTINFO_PROJECTINFO_V v where 1=1 "+params;
		List<Object[]> list=_connomDao.getHibernateSession().createSQLQuery(sql)
		                              .setFirstResult(vo.getStart())
		                              .setMaxResults(vo.getCount()).list();
		List<JSONObject> objList=new ArrayList();
		for(Object[] objs:list){
			JSONObject jo=new JSONObject();
			jo.put("projectid", objs[0]);
			jo.put("projectnum", objs[1]);
			jo.put("projectname", objs[2]);
			jo.put("contractamount", objs[3]);
			jo.put("contractmoney", objs[4]);
			jo.put("amountunit", objs[5]);
			jo.put("projecttype", objs[6]);
			objList.add(jo);
		}
		return objList;
	}

	public List<?> getPaymentDetails(ContractInfoVo vo) {
		// TODO Auto-generated method stub
		String sql="select count(*) from CONTRACTINFO_PROJECTINFO_V";
		BigDecimal count=(BigDecimal)_connomDao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());
		
		sql="select * from CONTRACTINFO_PROJECTINFO_V";
		List<Object[]> list=_connomDao.getHibernateSession().createSQLQuery(sql)
		                              .setFirstResult(vo.getStart())
		                              .setMaxResults(vo.getCount()).list();
		List<JSONObject> objList=new ArrayList();
		for(Object[] objs:list){
			JSONObject jo=new JSONObject();
			jo.put("projectid", objs[0]);
			jo.put("projectnum", objs[1]);
			jo.put("projectname", objs[2]);
			jo.put("contractamount", objs[3]);
			jo.put("contractmoney", objs[4]);
			jo.put("amountunit", objs[5]);
			jo.put("projecttype", objs[6]);
			objList.add(jo);
		}
		return objList;
	}

	public List<?> getPaymentList(ContractInfoVo vo) {
		// TODO Auto-generated method stub
		List<JSONObject> objList=new ArrayList();
		if(vo.getContractId()==null||vo.getContractId().equals("")){
			return objList;
		}
		String sql="SELECT count(*) FROM T_PAYMENTTASK_STOCK ps where PS.CONTRACTID='"+vo.getContractId()+"'";
		BigDecimal count=(BigDecimal)_connomDao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());
		
		sql="SELECT ps.psid, PS.PSAUDITINGBROW,PS.PSSTATE,PS.PSTYPE,PS.PSCREATETIME,PS.SELECTTYPE FROM T_PAYMENTTASK_STOCK ps where PS.CONTRACTID='"+vo.getContractId()+"'";
		List<Object[]> list=_connomDao.getHibernateSession().createSQLQuery(sql)
		                              .setFirstResult(vo.getStart())
		                              .setMaxResults(vo.getCount()).list();
		
		for(Object[] objs:list){
			JSONObject jo=new JSONObject();
			jo.put("taskid", objs[0]);
			jo.put("amount", objs[1]);
			jo.put("status", objs[2]);
			jo.put("type", objs[3]);
			jo.put("createtime",UtilDaoImp.dateToStr((Date)objs[4], "yyyy-mm-dd") );
			jo.put("selecttype", objs[5]);
			objList.add(jo);
		}
		return objList;
	}
	
	

}
