package com.sysware.customize.hd.investment.procurementExecute.tender;

import java.util.List;

public interface TenderService {
	/**
	 * 招标管理保存
	 */
	 void saveTender(TenderVo vo);
	 /**
	  * 获取招标管理列表
	  * @param vo
	  * @return
	  */
	 List<Tender> getTenderList(TenderVo vo);
	 /**
	  * 获取招标管理列表数量
	  * @param vo
	  * @return
	  */
	 long getTenderCount(TenderVo vo);
	 /**
	  * 删除招标
	  * @param tenderId 招标id
	  */
	 void deleteTender(String tenderId[]);
	 /**
	  * 修改执行步骤
	  * @param tenderId
	  */
	 void updateTenderFileType(String tenderId,String status);
	 /**
	  * 修改流程是否完成参数
	  * @param tenderId
	  */
	 void updateTenderFileFlag(String tenderId);
}
