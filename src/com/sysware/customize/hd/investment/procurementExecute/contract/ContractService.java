package com.sysware.customize.hd.investment.procurementExecute.contract;

import java.util.List;

import com.sysware.customize.hd.investment.procurementExecute.contract.entity.Contract;
import com.sysware.customize.hd.investment.procurementExecute.contract.vo.ContractVo;

/**
 * 合同管理 服务层 接口
 * 
 * @author LIT
 * @date 2011-10-18
 * 
 */

public interface ContractService {
	public List<Object> getContractList(ContractVo voo);

	public Long getContractListCount(ContractVo vo);

	public List<Object> getTenderList(ContractVo voo);

	public Long getTenderListCount(ContractVo voo);

	public List<Object> getContractById(ContractVo vo);

	public boolean createContract(ContractVo voo, String[] tenderIds);

	//public boolean updaeContract(ContractVo voo);
	
	public boolean updaeContract(ContractVo voo,String[] tenderIds);

	public boolean delContractList(ContractVo voo);
	/**
	 * 修改合同的审批状态
	 * @param id 合同id
	 * @return
	 */
	public void updateStatus(String[] id,String status);
	/**
	 *获取审批对象
	 * @param contractId
	 * @return
	 */
	public Contract getContract(String contractId);
}
