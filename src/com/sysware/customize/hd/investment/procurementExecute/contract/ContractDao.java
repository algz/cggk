package com.sysware.customize.hd.investment.procurementExecute.contract;

import java.util.List;

import com.sysware.customize.hd.investment.procurementExecute.contract.vo.ContractVo;


/**
 * 合同管理  DAO实现类
 * 
 * @author LIT
 * @date 2011-10-18
 * 
 */

public interface ContractDao {
	public List<Object> getContractList(ContractVo voo);

	public Long getContractListCount(ContractVo vo);

	public List<Object> getTenderList(ContractVo voo);

	public Long getTenderListCount(ContractVo voo);

	public List<Object> getContractById(ContractVo vo);
	/**
	 * 修改合同状态
	 * @param id
	 * @param status
	 */
	public void updateStatus(String id, String status);
}
