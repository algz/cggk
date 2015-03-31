package com.sysware.customize.hd.investment.procurementExecute.contract;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Query;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAO;
import com.luck.itumserv.common.CommonDAO;
import com.sysware.customize.hd.investment.procurementExecute.contract.entity.Contract;
import com.sysware.customize.hd.investment.procurementExecute.contract.entity.ContractTender;
import com.sysware.customize.hd.investment.procurementExecute.contract.vo.ContractVo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.StockplanDao;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity.FixedStockplanMoreinfo;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity.NoFixedStockplanMoreinfo;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.ProcurementPlan;
import com.sysware.util.StrUtil;

/**
 * 合同管理 服务层 实现类
 * 
 * @author LIT
 * @date 2011-10-18
 * 
 */

@Name("Contract_ServiceImpl")
public class ContractServiceImpl implements ContractService {

	@In(create = true, value = "Contract_DaoImpl")
	private ContractDao _dao;

	@In(create = true, value = "stockPlan_DaoImpl")
	StockplanDao _stockDao;

	@In(create = true, value = "common_GenericDAOImpl")
	private GenericDAO<Contract> contractDao;

	@In(create = true, value = "common_GenericDAOImpl")
	private GenericDAO<ContractTender> contracttenderDao;
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> _cDao;

	public List<Object> getContractList(ContractVo voo) {
		return _dao.getContractList(voo);
	}

	public Long getContractListCount(ContractVo vo) {
		return _dao.getContractListCount(vo);
	}

	public List<Object> getTenderList(ContractVo voo) {
		return _dao.getTenderList(voo);
	}

	public Long getTenderListCount(ContractVo vo) {
		return _dao.getTenderListCount(vo);
	}

	public List<Object> getContractById(ContractVo vo) {
		return _dao.getContractById(vo);
	}

	@Transactional
	public boolean createContract(ContractVo oo, String[] tenderIds) {
		boolean isSuccess = true;
		try {
			Contract info = new Contract();
			info.setContractName(oo.getContractName());
			//不需要去生成合同编号，因为合同编号是需要用户手动输入的
//			Calendar c = Calendar.getInstance();
//			String code = "HTGL"+c.get(Calendar.YEAR); 
//			String sql = "select max(substr(t.CONTRACT_CODE,9)) from t_contract t ";
//			String maxcode =  (String) contractDao.createSqlQuery(sql).getSingleResult();
//			if(maxcode==null)
//				code+="0000001";
//			else
//			{
//				maxcode =new BigDecimal(maxcode).add(new BigDecimal("1")).toString();
//				for (int i = 0; i < 7 - String.valueOf(new BigDecimal(maxcode)).length();i++){
//					code+="0";
//				}
//				code+=maxcode;
//			}
//			info.setContractCode(code);
			info.setContractCode(oo.getContractCode());
			info.setDepartmentA(oo.getDepartmentA());
			info.setDepartmentB(oo.getDepartmentB());
			info.setContractAmount(new BigDecimal(oo.getContractAmount()));
			info.setCreateDate(StrUtil.getDateforString(oo.getCreateDate()));
			info.setContractFile(oo.getContractFile());
			info.setReMark(oo.getReMark());
			info.setVendorId(oo.getVendorId());
			info.setContract_type(oo.getType());
			info.setStatus("1");// 审批状态为编制中
			info.setFileId(oo.getFileId());
			info.setFileName(oo.getFileName());
			if (contractDao.add(info)) {
				for (String id : tenderIds) {
					String contractId = info.getContractId();
					ContractTender ct = new ContractTender();
					ct.setContract_ID(contractId);
					ct.setTender_name(info.getContractName());
					ct.setTender_ID(id);
					contracttenderDao.add(ct);
					updatePlanStatus(contractId);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			isSuccess = false;
		}
		return isSuccess;
	}
	
	@Transactional
	public boolean updatePlanStatus(String contractId){
		
		StringBuilder sql = new StringBuilder();
		sql.append("select tp.procurementplan_id");
		sql.append("  from t_procurementplan             tp,");
		sql.append("       t_procurementplan_fixed_detil tpf,");
		sql.append("       T_tender_procurement_detil    ttpd,");
		sql.append("       T_Tender                      tt,");
		sql.append("       T_contract_tender             tct,");
		sql.append("       T_Contract                    tc");
		sql.append(" where tp.procurementplan_id = tpf.procurementplan_id");
		sql.append(" and  tpf.declareplan_detil_id = ttpd.procurementplan_detil_id");
		sql.append(" and ttpd.tender_id = tt.tender_id");
		sql.append(" and tt.tender_id = tct.tender_id");
		sql.append(" and tct.contract_id = '");
		sql.append(contractId);
		sql.append("'");
		Query q1 = _cDao.createSqlQuery(sql.toString());
		String procurementplan_id = null;
		
		if(q1.getResultList().size()>0){
			procurementplan_id = q1.getResultList().get(0).toString();
			ProcurementPlan old = (ProcurementPlan) _stockDao.get(procurementplan_id,"contractId", new ProcurementPlan());
			old.setStatus("6");
			_cDao.update(old);
		}
		
		StringBuilder sql1 = new StringBuilder();
		sql1.append("select tpf.procurementplan_fixed_detil_id");
		sql1.append("  from t_procurementplan_fixed_detil tpf,");
		sql1.append("       T_tender_procurement_detil    ttpd,");
		sql1.append("       T_Tender                      tt,");
		sql1.append("       T_contract_tender             tct,");
		sql1.append("       T_Contract                    tc");
		sql1.append("	where tpf.declareplan_detil_id = ttpd.procurementplan_detil_id");
		sql1.append("   and ttpd.tender_id = tt.tender_id");
		sql1.append("   and tt.tender_id = tct.tender_id");
		sql1.append("   and tct.contract_id = '");
		sql1.append(contractId);
		sql1.append("'");
		Query q2 = _cDao.createSqlQuery(sql1.toString());
		String procurementplan_fixed_detil_id = null;
		if(q2.getResultList().size()>0){
			procurementplan_fixed_detil_id = q2.getResultList().get(0).toString();
			FixedStockplanMoreinfo old = (FixedStockplanMoreinfo) _stockDao.get(procurementplan_fixed_detil_id,"contractId", new FixedStockplanMoreinfo());
			old.setStatus("6");
			_cDao.update(old);
		}
		
		StringBuilder sql2 = new StringBuilder();
		sql2.append("select tpd.procurementplan_detil_id");
		sql2.append("  from T_ProcurementPlan_detil    tpd,");
		sql2.append("       T_tender_procurement_detil ttpd,");
		sql2.append("       T_Tender                   tt,");
		sql2.append("       T_contract_tender          tct,");
		sql2.append("       T_Contract                 tc");
		sql2.append(" where tpd.declareplan_detil_id = ttpd.procurementplan_detil_id");
		sql2.append("   and ttpd.tender_id = tt.tender_id");
		sql2.append("   and tt.tender_id = tct.tender_id");
		sql2.append("   and tct.contract_id = '");
		sql2.append(contractId);
		sql2.append("'");
		Query q3 = _cDao.createSqlQuery(sql2.toString());
		
		String procurementplan_detil_id = null;
		if(q3.getResultList().size() > 0){
			procurementplan_detil_id = q3.getResultList().get(0).toString();
			NoFixedStockplanMoreinfo old = (NoFixedStockplanMoreinfo) _stockDao.get(procurementplan_detil_id,"contractId", new NoFixedStockplanMoreinfo());
			old.setStatus("6");
			_cDao.update(old);
		}
		   
		return true;
	}

	@Transactional
	public boolean delContractList(ContractVo voo) {
		boolean isSuccess = true;
		try {
			Query q = contractDao.createSqlQuery("delete from t_contract t where t.contract_id='" + voo.getContractId() + "'");
			q.executeUpdate();
			Query q1 = contractDao.createSqlQuery("delete from t_contract_tender t where t.contract_id='" + voo.getContractId() + "'");
			q1.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			isSuccess = false;
		}
		return isSuccess;
	}

	/*@Transactional
	public boolean updaeContract(ContractVo oo) {
		boolean isSuccess = true;
		try {
			Contract old = (Contract) _stockDao.get(oo.getContractId(),
					"contractId", new Contract());

			old.setContractName(oo.getContractName());
			old.setContractCode(oo.getContractCode());
			old.setDepartmentA(oo.getDepartmentA());
			old.setDepartmentB(oo.getDepartmentB());
			old.setContractAmount(new Long(oo.getContractAmount()));
			old.setCreateDate(StrUtil.getDateforString(oo.getCreateDate()));
			old.setContractFile(oo.getContractFile());
			old.setReMark(oo.getReMark());

			contractDao.update(old);
		} catch (Exception e) {
			e.printStackTrace();
			isSuccess = false;
		}

		return isSuccess;
	}*/

	@Transactional
	public boolean updaeContract(ContractVo oo,String[] tenderIds) {
		boolean isSuccess = true;
		try {
			Contract old = (Contract) _stockDao.get(oo.getContractId(),
					"contractId", new Contract());

			old.setContractName(oo.getContractName());
			old.setContractCode(oo.getContractCode());
			old.setDepartmentA(oo.getDepartmentA());
			old.setDepartmentB(oo.getDepartmentB());
			old.setContractAmount(new BigDecimal(oo.getContractAmount()));
			if(oo.getCreateDate()!=null && !oo.getCreateDate().equals(""))
			old.setCreateDate(StrUtil.getDateforString(oo.getCreateDate()));
			
			// bug416的对应
			if(oo.getContractFile()!=null && oo.getContractFile()!=""){
				old.setContractFile(oo.getContractFile());
			}
			old.setFileId(oo.getFileId());
			old.setFileName(oo.getFileName());
			old.setReMark(oo.getReMark());
			old.setVendorId(oo.getVendorId());
			contractDao.update(old);
			
			// 更改合同与标书文件的关联
			String contractId = oo.getContractId();
			String contractName = oo.getContractName();
			
			// 删除旧的合同与标书的关联数据.
			String hql =" delete from ContractTender ct where ct.contract_ID = '" + oo.getContractId() + "'";
			_cDao.createQuery(hql).executeUpdate();
			// 插入新的合同与标书的关联数据
			for (String id : tenderIds) {
				ContractTender ct = new ContractTender();
				ct.setContract_ID(contractId);
				ct.setTender_name(contractName);
				ct.setTender_ID(id);
				contracttenderDao.add(ct);
				//
				updatePlanStatus(contractId);
			}
		} catch (Exception e) {
			e.printStackTrace();
			isSuccess = false;
		}

		return isSuccess;
	}
	@Transactional
	public void updateStatus(String[] id, String status) {
		for (String contratId : id) {
			_dao.updateStatus(contratId.substring(0,contratId.length()-1), status);
		}
	}

	public Contract getContract(String contractId) {
		Contract contract =  (Contract) _stockDao.get(contractId,
				"contractId", new Contract());
		return contract;
	}

}
