package com.sysware.customize.hd.investment.investSupport.contractInfo;

import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.sysware.customize.hd.investment.investSupport.vo.ContractInfoVo;

/**
 * @ClassName: ContractInfoServiceImpl
 * @Description: 合同资讯模块 服务层实现类
 * 
 * @author LIT
 * @date Nov 24, 2011 9:58:36 AM
 * 
 */

@Name("contractInfoServiceImpl")
public class ContractInfoServiceImpl implements ContractInfoService{

	@In(create = true, value = "contractInfoDaoImpl")
	private ContractInfoDao _dao;

	public List<Object> getInfo(ContractInfoVo vo) {
		return _dao.getInfo(vo);
	}

	public Long getInfoCount(ContractInfoVo vo) {
		return _dao.getInfoCount(vo);
	}

	public List<Object> getContractExeInfo(ContractInfoVo vo) {
		return _dao.getContractExeInfo(vo);
	}

	public Long getContractExeInfoCount(ContractInfoVo vo) {
		return _dao.getContractExeInfoCount(vo);
	}

	public List<Object> getDamanInfo(ContractInfoVo vo) {
		return _dao.getDamanInfo(vo);
	}

	public Long getDamanInfoCount(ContractInfoVo vo) {
		return _dao.getDamanInfoCount(vo);
	}

	public List<Object> getTenderInfo(ContractInfoVo vo) {
		return _dao.getTenderInfo(vo);
	}

	public Long getTenderInfoCount(ContractInfoVo vo) {
		return _dao.getTenderInfoCount(vo);
	}

	public List<Object> getContractPaymentInfo(ContractInfoVo vo) {
		return _dao.getContractPaymentInfo(vo);
	}

	public Long getContractPaymentInfoCount(ContractInfoVo vo) {
		return _dao.getContractPaymentInfoCount(vo);
	}

	public List<?> getContractList(ContractInfoVo vo) {
		// TODO Auto-generated method stub
		return _dao.getContractList(vo);
	}

	public List<?> getProjectList(ContractInfoVo vo) {
		// TODO Auto-generated method stub
		return _dao.getProjectList(vo);
	}

	public List<?> getPaymentDetails(ContractInfoVo vo) {
		// TODO Auto-generated method stub
		return _dao.getPaymentDetails(vo);
	}

	public List<?> getPaymentList(ContractInfoVo vo) {
		// TODO Auto-generated method stub
		return _dao.getPaymentList(vo);
	}
}
