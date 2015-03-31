package com.sysware.customize.approvalObject;
/**
 * 合同金额判断节点
 * 送审合同的总金额大于100万判断
 * @author zhaodw
 */
import java.math.BigDecimal;


import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.entity.Guser;
import com.sysware.common.approval.IJudgeHandler;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContract;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContractService;
@Name("procurement100JudgeHandler")
public class Procurement100JudgeHandler implements IJudgeHandler {

	@In(create = true, value = "contract_ProcurementContractServiceImpl")
	private ProcurementContractService contractService;
	public boolean judge(Guser arg1,String... arg0) {  
		ProcurementContract contract = null;
		BigDecimal amount = new BigDecimal("0");
		//循环获取每一个合同的金额，并且相加
		for(String id : arg0)
		{
			contract = contractService.getContractById(id);
			if(contract!=null && contract.getContractAmount()!=null && !"".equals(contract.getContractAmount())){
				amount = amount.add(contract.getContractAmount());
			}
		}
		//判断金额是否大于100万
		if(amount.doubleValue()>=1000000)
		   return true;
		return false;
	}

}
