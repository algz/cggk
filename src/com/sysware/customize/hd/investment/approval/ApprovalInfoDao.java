package com.sysware.customize.hd.investment.approval;

import java.math.BigDecimal;
import java.util.List;

import com.luck.common.GenericDAO;

public interface ApprovalInfoDao extends GenericDAO<ApprovalInfo>{
	/**
	 * 通过审批对象信息获取列表
	 */
	List<Object[]> getApprovalInfoList(ApprovalInfoVo vo);
	BigDecimal getApprovalInfoListCount(ApprovalInfoVo vo);
	
	Object[] getApprovalFlowsById(Long id);
	
	Object[] getSenderById(Long id);
}
