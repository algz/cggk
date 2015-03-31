package com.sysware.customize.hd.investment.procurementExecute.registration;

import java.math.BigDecimal;
import java.util.List;

import com.luck.common.GenericDAO;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialVo;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContract;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContractCondition;

public interface RegistrationDao  extends GenericDAO<Registration> {
	 
	/**
	 * 获取登记列表
	 * @param vo
	 * @return
	 */
	List<Object[]> getRegistrationList(RegistrationVo vo);
	/**
	 * 获取登记列表数量
	 * @param vo
	 * @return
	 */
	BigDecimal getRegistrationListCount(RegistrationVo vo);
	/**
	 * 获取合同获取已登记的物资
	 * @param contractId 合同Id
	 * @return
	 */
	List<Object[]> getItemList(String contractId,String materialCalotlogName);
	
	/**
	 * 获取登记的最大编号
	 * @return
	 */
	String maxCode();
	/**
	 * 获取物资的到货数量总数
	 * @param itemId
	 * @return
	 */
	public String getArrivalNumList(String itemId);
	/**
	 * 通过物资编码获取物资信息
	 * @param registration
	 * @return
	 */
	Material getMaterialInfo(RegistrationVo vo);
	
	public void delArrivalCheck(String registId)throws Exception;
	
	public List<MaterialVo> getMaterialByContract(RegistrationVo vo);
	
	List<ProcurementContract> findContractByCondition(ProcurementContractCondition condition);
	
}
