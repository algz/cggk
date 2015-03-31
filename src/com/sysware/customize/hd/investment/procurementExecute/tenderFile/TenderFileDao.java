package com.sysware.customize.hd.investment.procurementExecute.tenderFile;

import com.luck.common.GenericDAO;

/**
 * 招标管理 Dao  
 * @author fanzhihui
 *
 */
public interface TenderFileDao extends GenericDAO<TenderFile> {
	TenderFile getTenderFile(TenderFileVo vo);
	/**
	 * 获取招标文件子项
	 */
	String getTenderFileById(TenderFileVo vo);
	/**
	 * 
	 * @param tenderFile
	 * @return
	 */
	public String getTenderFileVo(TenderFile tenderFile);
	/**
	 * 修改审批状态
	 * @param tenderFileId
	 * @param status
	 */
	public TenderFile updateStatus(String tenderFileId, String status);
	
	 /**
     * 查询是否有上传招标文档
     * @param vo
     * @return
     */
   int GetTenderForTenderFile(TenderFileVo vo);
}
