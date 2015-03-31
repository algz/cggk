package com.sysware.customize.hd.investment.fixedAssetsAccept.paymentTask.groupPaymentTask;

import java.util.List;

public interface GroupPaymentTaskDao {

	List<GroupPaymentTaskVo> getUserList(GroupPaymentTaskVo vo);
	long getUserListCount(GroupPaymentTaskVo vo);
	
	void insertGroupPaymentTask(GroupPaymentTask vo);
	void updateGroupPaymentTask(GroupPaymentTask vo);
	
	GroupPaymentTask getGroupPaymentTask(GroupPaymentTaskVo vo);
	void deleteGroupPaymentTask(String pgIds);
	
	void updateState(String ids,long state);
}
