package com.sysware.customize.hd.investment.procurementExecute.tenderFile;

/**
 * 招标项目上传 Service
 * @author zhaodw
 *
 */
public interface TenderFileService {

	/**
	 * 保存 招标项目上传文件列表
	 * @param vo
	 */
	void saveTenderFile(TenderFileVo vo);
	/**
	 * 获取招标文件子项
	 */
	String getTenderFileById(TenderFileVo vo);
	/**
	 * 获取招标文件子项
	 */
	TenderFile getTenderFileByTendFileId(String tenderFileId);
	/**
	 * 修改审批状态
	 */
	void updateStatus(String tenderFileId[],String status,String tenderFileType);
	/**
	 * 获取招标文件子项实体
	 */
	TenderFile getTenderFile(TenderFileVo vo);
	/**
	 * 将实体转化为json
	 * @param tenderFile
	 * @return
	 */
	public String getTenderFileVo(TenderFile tenderFile);
	
	 /**
     * 查询是否有上传招标文档
     * @param vo
     * @return
     */
   int GetTenderForTenderFile(TenderFileVo vo);
}
