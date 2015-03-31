package com.sysware.customize.hd.investment.productionMaterialsManagement.parity;

import java.math.BigDecimal;
import java.util.List;

import com.luck.common.GenericDAO;

public interface ParityDao extends GenericDAO<Parity> {

	/**
	 * 根据条件查询比价、招投信息记录
	 * 
	 * @param parityCondition
	 *            条件
	 * @return 采购大纲
	 */
	public List<Parity> getParityListByCondition(ParityCondition parityCondition);

	/**
	 * 根据条件查询比价、招投信息记录数
	 * 
	 * @param parityCondition
	 *            条件
	 * @return 比价、招投信息记录数
	 */
	public Long getCountByCondition(ParityCondition parityCondition);

	/**
	 * 根据purchaseType，得到比价、招投信息的采购编号的编码部分
	 * 
	 * @param purchaseType
	 *            String
	 * 
	 * @param procurementType
	 *            String
	 * 
	 * @return 比价、招投信息的采购编号的编码部分
	 */
	public int getParityMaxCode(String purchaseType, String procurementType);
	/**
	 * @param paritydetailId
	 *            比价详细Id
	 * @param vendorId
	 *            供应商Id
	 * 
	 */
	public BigDecimal getAmout(String parityId, String vendorId);
	
	/**
	 * 根据合同id查询合同可关联表
	 * @param vo
	 * @return
	 */
	public List<Parity> getParityGridDataById(ParityVo vo);

	/**
	 * 删除合同物资关联关系表
	 * @param pid
	 * @param cid
	 * @param mid
	 */
	public void delcontractPurchase(String pid,String cid,String mid);
	
	/**
	 * 更新parity表中数据状态
	 * @param pid
	 * @param vid
	 * @param mid
	 * @param type
	 */
	public void updateParityBy(String pid,String vid,String mid,String type);
	
}
