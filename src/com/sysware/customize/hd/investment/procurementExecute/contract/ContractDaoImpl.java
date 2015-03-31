package com.sysware.customize.hd.investment.procurementExecute.contract;

import java.util.List;

import javax.persistence.Query;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.procurementExecute.contract.entity.Contract;
import com.sysware.customize.hd.investment.procurementExecute.contract.vo.ContractVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.StockplanDao;

/**
 * 合同管理 DAO 实现类
 * 
 * @author LIT
 * @date 2011-10-18
 * 
 */

@Name("Contract_DaoImpl")
public class ContractDaoImpl implements ContractDao {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> _dao;
	@In(create = true, value = "stockPlan_DaoImpl")
	StockplanDao _stockDao;

	private static boolean isStrEmpty(String str) {
		if ("".equals(str) || null == str || "null".equals(str)) {
			return false;
		} else {
			return true;
		}
	}

	public List<Object> getContractList(ContractVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select  ");
		sql.append("  t.contract_id,");
		sql.append("  t.contract_name,");
		sql.append("  t.contract_code,");
		sql.append("  t.department_a,");
		sql.append("  t.department_b,");
		sql.append("  t.contract_amount,");
		sql.append("  t.createdate,");
		sql.append("  t.contract_file,");
		sql.append("  t.remark,");
		sql.append("  t.status,");
		sql.append("  t.fileName,");
		sql.append("  t.fileId,");
		sql.append("  ac.acceptnum");
		sql.append("  from t_contract t");
		sql.append(" left join t_acceptTask_contract ac");
		sql.append(" on ac.contractid=t.contract_id");
		sql.append(" where 1=1 ");
		if (isStrEmpty(vo.getType())) {
			sql.append(" and t.contract_type = '");
			sql.append(vo.getType());
			sql.append("'");
		}

		if (isStrEmpty(vo.getStatus())) {
			sql.append(" and t.status =");
			sql.append(vo.getStatus());
			sql.append("");
		}
		if (isStrEmpty(String.valueOf(vo.getContractAmount()))) {
			sql.append(" and t.contract_amount ='");
			sql.append(vo.getContractAmount());
			sql.append("'");
		}
		if (isStrEmpty(vo.getContractName())) {
			sql.append(" and t.contract_name like '%");
			sql.append(vo.getContractName());
			sql.append("%'");
		}
		if (isStrEmpty(vo.getContractCode())) {
			sql.append(" and t.contract_code like '%");
			sql.append(vo.getContractCode());
			sql.append("%'");
		}
		if (isStrEmpty(vo.getCreateDate())) {
			sql.append(" and t.createdate = to_date('");
			sql.append(vo.getCreateDate());
			sql.append("','YYYY-mm-DD')");
		}
		
		sql.append(" order by t.contract_id desc");

		Query q = _dao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();

		return list;
	}

	public Long getContractListCount(ContractVo vo) {
		StringBuilder sql = new StringBuilder();
		sql
				.append("select count(*) from t_contract t where t.contract_type = '");
		sql.append(vo.getType());
		sql.append("'");

		if (isStrEmpty(vo.getStatus())) {
			sql.append(" and t.status =");
			sql.append(vo.getStatus());
			sql.append("");
		}
		if (isStrEmpty(String.valueOf(vo.getContractAmount()))) {
			sql.append(" and t.contract_amount ='");
			sql.append(vo.getContractAmount());
			sql.append("'");
		}
		if (isStrEmpty(vo.getContractName())) {
			sql.append(" and t.contract_name like '%");
			sql.append(vo.getContractName());
			sql.append("%'");
		}
		if (isStrEmpty(vo.getContractCode())) {
			sql.append(" and t.contract_code like '%");
			sql.append(vo.getContractCode());
			sql.append("%'");
		}

		Query q = _dao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}

	public List<Object> getContractById(ContractVo vo) {
		StringBuilder sql = new StringBuilder();
		sql.append("select ");
		sql.append("  t.contract_id,");
		sql.append("  t.contract_name,");
		sql.append("  t.contract_code,");
		sql.append("  t.department_a,");
		sql.append("  t.department_b,");
		sql.append("  t.contract_amount,");
		sql.append("  t.createdate,");
		sql.append("  t.contract_file,");
		sql.append("  t.remark,");
		sql.append("  t.status,");
		sql.append("  t.fileName,");
		sql.append("  t.fileId,");
		sql.append("  t.vendorId");
		sql.append(" from t_contract t where t.contract_id='");
		sql.append(vo.getContractId());
		sql.append("'");
		Query q = _dao.createSqlQuery(sql.toString());
		return q.getResultList();
	}

	public Long getTenderListCount(ContractVo vo) {
		StringBuilder sql = new StringBuilder();
		if (1 == vo.getFlag()) { // create
			sql.append("select count(0) "); 
			sql.append(" from t_tender t");
			sql.append(" where not exists (select ct.tender_id");
			sql.append("         from T_contract_tender ct");
			sql.append("         where ct.tender_id = t.tender_id)");
			 
			if(vo.getTenderType().equals("1"))
				sql.append("         and t.tender_type in('1','2')  ");
			else
				sql.append("         and t.tender_type in('3','4','5') ");
			sql.append(" and t.flag ='1' ");
		} else { // editor
			sql.append("select count(0) "); 
			sql.append(" from t_tender t");
			sql.append(" where ( exists (select ct.tender_id");
			sql.append("         from T_contract_tender ct where");
			sql.append("	ct.contract_id='");
			sql.append(vo.getContractId().trim());
			sql.append("' and ct.tender_id = t.tender_id)");  
		 
			sql.append(" or not exists (select ct.tender_id");
			sql.append("         from T_contract_tender ct");
			sql.append("         where ct.tender_id = t.tender_id) )");
			 
			if(vo.getTenderType().equals("1"))
				sql.append("         and t.tender_type in('1','2')  ");
			else
				sql.append("         and t.tender_type in('3','4','5') ");
			sql.append(" and t.flag ='1'");
		}
		
		Query q = _dao.createSqlQuery(sql.toString());
		return new Long(q.getSingleResult().toString());
	}
	
	@SuppressWarnings("unchecked")
	public List<Object> getTenderList(ContractVo vo) {
		StringBuilder sql = new StringBuilder();
		if (1 == vo.getFlag()) { // create
			sql.append("select t.tender_id,t.tender_code,t.tender_name,t.tender_department,t.tender_type,t.createdate,'0' as flag");

			sql.append(" from t_tender t");
			sql.append(" where not exists (select ct.tender_id");
			sql.append("         from T_contract_tender ct");
			sql.append("         where ct.tender_id = t.tender_id)");
			 
			if(vo.getTenderType().equals("1"))
				sql.append("         and t.tender_type in('1','2')  ");
			else
				sql.append("         and t.tender_type in('3','4','5') ");
			sql.append(" and t.flag ='1' order by t.tender_id desc");
		} else { // editor
			sql
					.append("select t.tender_id,t.tender_code,t.tender_name,t.tender_department,t.tender_type,t.createdate,'1' as flag");

			sql.append(" from t_tender t");
			sql.append(" where exists (select ct.tender_id");
			sql.append("         from T_contract_tender ct where");
			sql.append("	ct.contract_id='");
			sql.append(vo.getContractId().trim());
			sql.append("' and ct.tender_id = t.tender_id)");

			sql.append(" union all ");
			sql
					.append("select t.tender_id,t.tender_code,t.tender_name,t.tender_department,t.tender_type,t.createdate,'0' as flag");

			sql.append(" from t_tender t");
			sql.append(" where not exists (select ct.tender_id");
			sql.append("         from T_contract_tender ct");
			sql.append("         where ct.tender_id = t.tender_id)");
			 
			if(vo.getTenderType().equals("1"))
				sql.append("         and t.tender_type in('1','2')  ");
			else
				sql.append("         and t.tender_type in('3','4','5') ");
			sql.append(" and t.flag ='1'");
			sql.append(" order by flag desc,tender_id desc");
		}
		
		Query q = _dao.createSqlQuery(sql.toString());
		q.setMaxResults(vo.getLimit());
		q.setFirstResult(vo.getStart());
		List<Object> list = q.getResultList();

		return list;
	}

	public void updateStatus(String id, String status) {
		Contract contract =  (Contract) _stockDao.get(id,
				"contractId", new Contract());
		contract.setStatus(status);
		_dao.update(contract);
	}
}
