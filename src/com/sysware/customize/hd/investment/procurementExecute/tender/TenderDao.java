package com.sysware.customize.hd.investment.procurementExecute.tender;

import java.util.List;

import com.luck.common.GenericDAO;

public interface TenderDao extends GenericDAO<Tender> {
	/**
	 * 招标管理保存
	 */
	void saveTender(TenderVo vo);
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
	void deleteTender(String id);
	 /**
	  * 获取招标管理列表
	  * @param vo
	  * @return
	  */
	List<Tender> getTenderList(TenderVo vo);
}
