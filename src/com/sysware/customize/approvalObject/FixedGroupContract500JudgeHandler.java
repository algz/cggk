package com.sysware.customize.approvalObject;
/**
 * 合同金额判断节点
 * 送审土建集团支付合同的总金额大于500万判断
 */
import java.math.BigDecimal;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.entity.Guser;
import com.sysware.common.approval.IJudgeHandler;
import com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.groupPaymentTask.GroupPaymentTask;
@Name("fixedGroupContract500JudgeHandler")
public class FixedGroupContract500JudgeHandler implements IJudgeHandler {
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<GroupPaymentTask> dao;
	public boolean judge(Guser arg1,String... arg0) {
		 
		GroupPaymentTask pt = null;
		BigDecimal amount = new BigDecimal("0");
		//循环获取每一个支付任务的审批的金额，并且相加
		for(String id : arg0)
		{
			pt = (GroupPaymentTask)dao.getHibernateSession().get(GroupPaymentTask.class, id);
			if(pt!=null && pt.getPgAuditingBrow()!=null && !"".equals(pt.getPgAuditingBrow())){
				amount = amount.add(new BigDecimal(pt.getPgAuditingBrow()));
			}
		}
		//判断金额是否大于500万
		if(amount.doubleValue()>5000000)
		   return true;
		return false;
	}
 
}
