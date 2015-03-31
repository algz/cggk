package com.sysware.customize.hd.investment.procurementExecute.registration;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialVo;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContract;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContractCondition;

/**
 * 入库登记
 * 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-22
 * 
 */
public interface RegistrationService {
	/**
	 * 通过物资编码获取物资信息
	 * @param registration
	 * @return
	 */
	Material getMaterialInfo(RegistrationVo vo);

	/**
	 * 保存登记
	 * 
	 * @param vo
	 */
	void saveRegistration(RegistrationVo registration)throws Exception;

	/**
	 * 获取登记列表
	 * 
	 * @param vo
	 * @return
	 */
	List<Object[]> getRegistrationList(RegistrationVo vo);

	/**
	 * 获取登记列表数量
	 * 
	 * @param vo
	 * @return
	 */
	BigDecimal getRegistrationListCount(RegistrationVo vo);

	/**
	 * 获取合同获取已登记的物资
	 * 
	 * @param contractId
	 *            合同Id
	 * @return
	 */
	List<Object[]> getItemList(String contractId,String materialCalotlogName);

	/**
	 * 初始化建账数据
	 * 
	 * @param itemId
	 *            物资Id
	 * @param qualifiedNum
	 *            合格数量
	 * @param arrivalDate
	 *            到货日期
	 * @param sampling
	 *            取样
	 * @param test
	 *            委托试验
	 * @param sendSampling
	 *            送样
	 * @param spectro
	 *            分光
	 * @param stamped
	 *            打钢印
	 * @param arrivalNum
	 *            到货数量
	 * @param lotNo
	 *            到货批次
	 * @param flawDetection
	 *            探伤
	 * @param clean
	 *            清洗
	 * @param spray
	 *            喷盖
	 * @param check
	 *            表面检查
	 * @param seal
	 *            油封
	 * @param seal
	 * @param registrationId
	 *            登记Id
	 * @param arrivalCheckId
	 *            检验Id
	 * @param vendorName
	 *            生产厂商名称
	 * @param String
	 *            note 备注
	 * @param qualifyNo 合格证
	 * @return
	 */ 
	public String newRegistration(String itemId, String qualifiedNum,
			Date arrivalDate, String sampling, String test,
			String sendSampling, String spectro, String stamped,
			String arrivalNum, String lotNo, String flawDetection,
			String clean, String spray, String check, String seal,
			String registrationId, String arrivalCheckId, String vendorName,
			String note,String qualifyNo,String materialstate);
	/**
	 * 获取物资的到货数量总数
	 * @param itemId
	 * @return
	 */
	public String getArrivalNumList(String itemId);
	
	/**
	 * 删除已登记记录
	 * @param ids
	 */
	public void delRegistration(String[] ids)throws Exception;
	
	public List<MaterialVo> getMaterialByContract(RegistrationVo vo);
	
	List<ProcurementContract> findContractByCondition(ProcurementContractCondition condition);
	
}
