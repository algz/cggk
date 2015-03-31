package com.sysware.customize.approvalObject;
/**
 * 合同金额判断节点
 * 送审合同的总金额大于100万判断
 */
import java.math.BigDecimal;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.entity.Guser;
import com.sysware.common.approval.IJudgeHandler;
import com.sysware.customize.hd.investment.deviceProject.contractManagement.DeviceContractmanagement;
import com.sysware.customize.hd.investment.deviceProject.contractManagement.DeviceContractmanagementDAO;
@Name("fixedContract100JudgeHandler")
public class FixedContract100JudgeHandler implements IJudgeHandler {
	@In(create = true, value = "deviceContractmanagementDAOImp")
	private DeviceContractmanagementDAO dao;
	public boolean judge(Guser arg1,String... arg0) {
		 
		DeviceContractmanagement contract = null;
		BigDecimal amount = new BigDecimal("0");
		//循环获取每一个合同的金额，并且相加
		for(String id : arg0)
		{
			contract = (DeviceContractmanagement)dao.getHibernateSession().get(DeviceContractmanagement.class, id);
			if(contract!=null && contract.getAmount()!=null && !"".equals(contract.getAmount())){
				amount = amount.add(contract.getAmount());
			}
		}
		//判断金额是否大于100万
		if(amount.doubleValue()>100)
		   return true;
		return false;
	}
 
}
