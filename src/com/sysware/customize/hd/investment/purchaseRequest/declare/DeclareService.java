package com.sysware.customize.hd.investment.purchaseRequest.declare;

import java.util.List;

import jxl.Workbook;

import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileUploadException;

import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;

/**
 * 采购申报Service
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-09-28
 * 
 */
public interface DeclareService {

	/**
	 * 保存采购申报记录
	 * 
	 * @param declare
	 *            待保存的申报记录对象
	 * @return 保存后的申报记录对象
	 */
	Declare saveDeclare(Declare declare);

	/**
	 * 通过ID获取采购申报记录对象
	 * 
	 * @param declareId
	 *            采购申报记录ID
	 * @return 采购申报记录对象
	 */
	Declare getDeclareById(String declareId);

	/**
	 * 获取符合条件的采购申报记录对象集合
	 * 
	 * @param example
	 *            查询样例
	 * @param start
	 *            起始记录
	 * @param limit
	 *            每页记录数
	 *  @param type
	 *            页签类型
	 * @return 采购申报记录对象集合
	 */
	List<Declare> getDeclaresByExample(DeclareVo declareVo);

	/**
	 * 获取符合条件的采购申报记录对象总数
	 * 
	 * @param example
	 *            查询样例
	 * @return 采购申报记录对象总数
	 */
	long countDeclaresByExample(Declare example,String type);

	/**
	 * 批量删除采购申报记录
	 * 
	 * @param ids
	 *            待删除采购申报记录对象IDs
	 * @return 操作结果
	 */
	boolean batchDeleteDeclares(String[] ids);
	/**
	 * 批量修改采购申报记录的状态
	 * 
	 * @param ids
	 *            待删除采购申报记录对象IDs
	 * @return 操作结果
	 */
	boolean batchUpdateDeclares(String[] ids);
	/**
	 * 直接通过公用笺的采购申报记录的状态
	 * 
	 * @param ids
	 *            待删除采购申报记录对象IDs
	 * @return 操作结果
	 */
	boolean batchUpdateDeclare(String id);
	/**
	 * 获取采购申报的总金额
	 * @param id
	 * @return
	 */
	String getSumByAmount(String id);
	/**
	 *获取未通过申报的申报金额
	 */
	Double getAmoutByType(String id);
	
	public JSONObject getComboBoxDataForDeclare(DeclareVo declareVo);
	
	List<Object[]> exportDeclareReportGridData(DeclareVo vo);
	
	}
