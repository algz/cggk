package com.sysware.customize.hd.investment.approval;

import java.math.BigDecimal;
import java.util.List;

public interface ApprovalInfoService {
	/**
	 * 保存审批信息
	 * content 审批意见
	 * objectId 审批对象Id
	 * stauts 审批类型，同意，驳回
	 */
	void save(String content,String objectId,String status);
	/**
	 * 通过审批对象信息获取列表
	 */
	List<Object[]> getApprovalInfoList(ApprovalInfoVo vo);
	BigDecimal getApprovalInfoListCount(ApprovalInfoVo vo);
	
	Object[] getApprovalFlowsById(Long id);
	
	Object[] getSenderById(Long id);
}
