package com.sysware.customize.hd.investment.investSupport.contractInfo;

import java.util.List;

import com.sysware.customize.hd.investment.investSupport.vo.BusinessVo;
import com.sysware.customize.hd.investment.investSupport.vo.ContractInfoVo;

/**
 * @ClassName: ContractInfoDao
 * @Description: 合同资讯模块 DAO 接口
 * 
 * @author LIT
 * @date Nov 24, 2011 9:58:09 AM
 * 
 */

public interface ContractInfoDao {

	/**
	 * 获得合同资讯主页面信息列表
	 * @param vo
	 * @return
	 */
	public List<Object> getInfo(ContractInfoVo vo);
	/**
	 * 合同资讯分页
	 */
	public Long getInfoCount(ContractInfoVo vo);

	/**
	 * 获得合同资讯中的 需求信息 详细列表
	 * @param vo
	 * @return
	 */
	public List<Object> getDamanInfo(ContractInfoVo vo);
	/**
	 * 合同资讯-需求信息 分页
	 */
	public Long getDamanInfoCount(ContractInfoVo vo);

	/**
	 * 获得合同资讯中的 执行信息-到货信息 详细列表
	 * @param vo
	 * @return
	 */
	public List<Object> getContractExeInfo(ContractInfoVo vo);

	/**
	 * 合同资讯-执行信息-到货信息 分页
	 */
	public Long getContractExeInfoCount(ContractInfoVo vo);

	/**
	 * 获得合同资讯中 招标信息详细列表
	 * @param vo
	 * @return
	 */
	public List<Object> getTenderInfo(ContractInfoVo vo);

	/**
	 * 合同资讯-招标信息 分页
	 */
	public Long getTenderInfoCount(ContractInfoVo vo);
	
	/**
	 * 获得合同资讯中的 执行信息-付款信息 详细列表
	 * @param vo
	 * @return
	 */
	public List<Object> getContractPaymentInfo(ContractInfoVo vo);
	
	/**
	 * 合同资讯-执行信息-付款信息 分页
	 */
	public Long getContractPaymentInfoCount(ContractInfoVo vo);
	
	
	/**
	 * 项目列表
	 * @param vo
	 * @return
	 */
	public List<?> getProjectList(ContractInfoVo vo);
	
	/**
	 * 合同列表
	 * @param vo
	 * @return
	 */
	public List<?> getContractList(ContractInfoVo vo);
	
	/**
	 * 支付列表
	 * @param vo
	 * @return
	 */
	public List<?> getPaymentList(ContractInfoVo vo);
	
	/**
	 * 支付详情
	 * @param vo
	 * @return
	 */
	public List<?> getPaymentDetails(ContractInfoVo vo);
	
}
