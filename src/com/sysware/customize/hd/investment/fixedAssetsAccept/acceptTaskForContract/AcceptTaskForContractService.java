package com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTaskForContract;

import java.util.List;

public interface AcceptTaskForContractService {

	/**
	 * 获取拥有输入内容的项目编号条目
	 * @param vo
	 * @return
	 */
	List<AcceptTaskForContractVo> getTaskList(AcceptTaskForContractVo vo);
	
	long getTaskListCount(AcceptTaskForContractVo vo);
	
	void insertAcceptTaskForContract(AcceptTaskForContract vo);
	void updateAcceptTaskForContract(AcceptTaskForContract vo);
	AcceptTaskForContract getAcceptTaskForContract(AcceptTaskForContractVo vo);
	long getAcceptNumCount(AcceptTaskForContractVo vo);
}
