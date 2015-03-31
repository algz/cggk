package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlan;

import java.util.List;

import org.apache.commons.fileupload.FileUploadException;

import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;

import jxl.Workbook;

public interface BuinessPlanService {
	/**
	 * 根据条件得到计划信息总数
	 * 
	 * @author chendongjie
	 * @param buinessPlanCondition
	 *            BuinessPlanCondition
	 * @return Long 2011-5-17
	 */
	long countByCondition(BuinessPlanCondition buinessPlanCondition);

	/**
	 * 根据条件查询所有计划
	 * 
	 * @param buinessPlanCondition
	 *            BuinessPlanCondition对象
	 * @return 所有计划信息（实体类）
	 */
	public List<BuinessPlan> findBuinessPlansByCondition(
			BuinessPlanCondition buinessPlanCondition);

	/**
	 * 根据计划名得到实体
	 * 
	 * @param name
	 * @return 所计划信息实体
	 */
	public BuinessPlan getBuinessPlanByName(String name);

	/**
	 * 新增计划
	 * 
	 * @param buinessPlan
	 *            BuinessPlan对象
	 * @return 所计划信息实体
	 */
	public void saveBuinessPlan(BuinessPlan buinessPlan);

	/**
	 * 删除计划
	 * 
	 * @param buinessPlan
	 *            BuinessPlan对象
	 * @return
	 */
	public void deleteBuinessPlan(BuinessPlan buinessPlan);

	/**
	 * 导入Excel数据
	 * 
	 * @param workbook
	 * @param userId
	 *            登陆人id
	 * @param noExistProducts
	 *            不存在机型
	 * @param bankExistProducts
	 *            数据缺失机型
	 * @throws FileUploadException
	 *             文件格式异常
	 * @throws ImportExcelFileException
	 *             文件内容异常
	 */
	public void batchAddBuinessPlans(Workbook workbook, String userId,
			List<String> noExistProducts, List<String> bankExistProducts,String planType)
			throws ImportExcelFileException, FileUploadException;
}
