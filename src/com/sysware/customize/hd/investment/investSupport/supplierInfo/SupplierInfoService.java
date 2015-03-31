package com.sysware.customize.hd.investment.investSupport.supplierInfo;

import java.util.List;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.deviceProject.contractManagement.DeviceContractmanagementVo;
import com.sysware.customize.hd.investment.investSupport.vo.SupplierInfoVo;

/**
 * @ClassName: SupplierInfoService
 * @Description: 供应商资讯模块 Service 层接口
 * 
 * @author LIT
 * @date Nov 24, 2011 9:59:45 AM
 * 
 */

public interface SupplierInfoService {

	/**
	 * 获得供应商资讯主页面信息
	 * @param vo
	 * @return
	 */
	public List<Object> getInfo(SupplierInfoVo vo);
	/**
	 * 供应商信息 分页
	 */
	public Long getInfoCount(SupplierInfoVo vo);

	/**
	 * 为 采购员信息模块 提供 供应商更新的查询方法
	 * @param vo
	 * @return
	 */
	public List<Object> getInfoForBuyer(SupplierInfoVo vo);
	/**
	 * 供应商更新 分页
	 */
	public Long getInfoForBuyerCount(SupplierInfoVo vo);

	/**
	 * 获得供应商资讯-供货信息
	 * @param vo
	 * @return
	 */
	public List<Object> getSupplyMaterialInfo(SupplierInfoVo vo);
	/**
	 * 供应商资讯-供货信息 分页
	 */
	public Long getSupplyMaterialInfoCount(SupplierInfoVo vo);

	/**
	 * 获得供应商资讯-最近考核记录
	 * @param vo
	 * @return
	 */
	public List<Object> getGradeInfo(SupplierInfoVo vo);
	
	/**
	 * 供应商考核的审核意见
	 * @param vo
	 * @return
	 */
	public List<Object> getGradeMoreInfo(SupplierInfoVo vo);
	
	/**
	 *应商资讯-最近考核记录 分页
	 */
	public Long getGradeInfoCount(SupplierInfoVo vo);
	
	public List<Object> getGradeDeptInfo(SupplierInfoVo vo);
	
	/**
	 * 供应商的合同信息
	 * @param vo
	 * @return
	 */
	List<?> getSupplierOfContractInfo(SupplierInfoVo vo);
	
}
