package com.sysware.customize.hd.investment.procurementExecute.admissionTest;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.List;

import com.luck.common.GenericDAO;

public interface AdmissionTestDao extends GenericDAO<ArrivalCheck>{
	/**
	 * 修改检验明细
	 * @param checkDetail
	 */
	CheckDetail updateCheckDetail(CheckDetail checkDetail);
	/**
	 * 获取检验明细
	 * @param checkDetail
	 */
	CheckDetail getCheckDetail(AdmissionTestVo vo); 
	/**
	 * 获取检明细详细
	 * 
	 * @param vo
	 */
     String getArrvalCheckDetail(AdmissionTestVo vo);
	
	ArrivalCheck getArrvalCheckDetailByRegistrationId(String id);
	/**
	 * 保存入库信息
	 * @param arrivalCheckId
	 * @param applyNum 入库数量
	 * @param applyInId 入库Id
	 * @param appraisalNo 入库编号
	 * @param applyStorage 目标库房
	 * @param applyDeptId 申请部门
	 * @param applyer 申请人ID
	 * @param itemId 物资Id
	 * @param userCode 用户工号
	 * @param itemCode 物资编码
	 * @param inPrice 入库价格
	 * @param contractNo 合同编号
	 * @param invoiceNo 发票编号
	 * @param unit 单位
	 * @param batch 批次
	 * @param productCode 机型
	 * @param note 备注
	 * @param planPrice 计划价格
	 * @param chkUserNo 检验员工号
	 * @param startJc 起始架次
	 * @param ea 特殊入库数量
	 * @param certificateNo 凭证编号
	 * @param qualityCode 质量编号
	 * @param endJc 终止架次
	 * @param itemBillId 质量Id
	 * @param materialstate 物资状态
	 */
	boolean saveApplyIn(String arrivalCheckId[], String applyNum[],
			String applyInId[], String appraisalNo,
			String applyDeptId, String applyer, String[] itemId,
			String userCode, String[] itemCode, String inPrice[],
			String[] contractNo, String[] invoiceNo, String[] unit,
			String[] batch, String[] productCode, String[] note,
			 String startJc, String ea, String endJc,String itemBillId,String[] materialstate)throws Exception ;
	/**
	 * 修改入库
	 * @param checkDetail
	 */
	ApplyIn updateApplyIn(ApplyIn applyIn);
	 /**
	  * 获取检验列表
	  * @param vo
	  */
	List<Object[]>getArrivalCheckList(AdmissionTestVo vo); 
	 /**
	  * 获取入库详细
	  * @param vo
	  */
	List<Object[]>  getApplyIn(AdmissionTestVo vo);
	 /**
	  * 获取物资报表列表
	  * @param vo
	  */
	List<Object[]> getMaterialsReportGridData(AdmissionTestVo vo);
	
	BigDecimal getMaterialsReportGridDataCount(AdmissionTestVo vo);
	
	/**
	 * 修改入场检验表的处理状态
	 * @return
	 */
	int UpdateArrivalCheck(ArrivalCheckVo vo);
	/**
	 * 修改质量信息
	 * @return
	 */
	public ItemDataBill updateItemDataBill(ItemDataBill itemDataBill);
	/**
	 * 
	 * @param id 主键
	 * @param inFactoryData  进场时间
	 * @param potLife 储存期限
	 * @param checkLife 定检期限
	 * @param oilLife 油封期限
	 * @param useLife 使用期限
	 * @param guarantyLife 保证期限
	 * @param supplyRegularNo 炉批号
	 * @param orderNo 合同编号
	 * @param outFactoryData 出场时间
	 * @param potLifeDeadLine 储存到期时间
	 * @param checkLifeDeadLine 定检到期时间
	 * @param oilLifeDeadLine 油封到期时间
	 * @param useLifeDeadLine 使用到期时间
	 * @param guarantyLifeDeadLine 保证到期时间
	 * @param vendorCode  供应商编号
	 * @param vendorName 供应商名称
	 * @param note 备注
	 * @param itemPurpose 1部检2海军检3空军检
	 * @param supplyCertifica 合格证号
	 * @return
	 * @throws ParseException
	 */ 
	public String saveItemDataBill(String id, String createDate,
			String potLife, String checkLife, String oilLife,
			String useLife, String guarantyLife, String supplyRegularNo,
			String orderNo, String vendorCode, String vendorName,String note,String itemPurpose,String supplyCertifica); 
	/**
	 * 获取入库质量信息
	 * @param id
	 * @return
	 */
	public ItemDataBill getItemDataBill(String id);
	
	public String saveArrivalCheckDetil(AdmissionTestVo vo);
	
	/**
	 * 删除入库申请单编号
	 * @param vo
	 * @return
	 */
	public String delApplyIn(AdmissionTestVo vo);
}
