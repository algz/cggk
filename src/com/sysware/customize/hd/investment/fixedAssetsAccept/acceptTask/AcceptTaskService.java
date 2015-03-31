package com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTask;

import java.util.List;

public interface AcceptTaskService {

	List<AcceptTaskVo> getAcceptTask(AcceptTaskVo vo);
	
	List<AcceptTaskVo> getAcceptTaskById(String id);
	
	long getAcceptTaskCount(AcceptTaskVo vo);
	
	void insertAcceptTask(AcceptTask vo);
	
	AcceptTask getOneAcceptTask(AcceptTaskVo vo);
	
	AcceptTask getOneAcceptTask(String acceptId);
	
	/**
	 * 根据编号组删除所有勾选的任务
	 * @param vo
	 */
	void removeAcceptTask(AcceptTaskVo vo);
	
	void updateAcceptTaskSatate(String id,long state);
	
	String getProjectPlan(AcceptTaskVo vo);
	
	String getContractCode(AcceptTaskVo vo);
}
