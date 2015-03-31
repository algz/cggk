package com.sysware.customize.hd.investment.procurementExecute.admissionTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.sf.json.JSONObject;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;
import com.luck.itumserv.common.GridData;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.vendorAppraisal.VendorAppraisalService;
import com.sysware.customize.hd.investment.baseData.vendorAppraisal.VendorAppraisalVo;

@Name("admissionTestRemote")
public class AdmissionTestRemote {
	@In(value = "admissionTestServiceImpl", create = true)
	AdmissionTestService admissionTestServiceImpl;
	@In(value = "vendorAppraisalServiceImpl", create = true)
	VendorAppraisalService vendorAppraisalService;
	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");

	@In(create = true)
	Identity identity;

	/**
	 * 保存入库检查
	 * 
	 * @param arrivalCheckId
	 *            主键
	 * @param checkStatus
	 *            状态
	 * @param ynStamped
	 *            是否已经打钢印
	 * @param ynSpectro
	 *            是否已经分光
	 * @param ynClean
	 *            是否已经清洗
	 * @param ynSeal
	 *            是否已经油封
	 * @param ynCheck
	 *            是否已经表面检
	 *  @param sampling 取样
	 *  @param test 委托试验
	 *  @param sendSampling 送样
	 * @param ynSpray 喷盖
	 * @param remark 备注
	 * @param ynFlawDetection 探伤
	 * @return
	 */
	@WebRemote
	public String save(String arrivalCheckId[], String checkStatus[],
			String ynStamped[], String ynSpectro[], String ynClean[],
			String ynSeal[], String ynCheck[], String[] sampling,
			String[] test, String[] sendSampling, String[] ynSpray,
			String[] remark, String[] ynFlawDetection,String[] physicalCommissioned,
			String[] testReport,String submissions[],String outCheck[],String pleaseCheck[],
			String oneCheck[],String ynSpark[],String sprayWord[],String failureHandling[]) {
		admissionTestServiceImpl.save(arrivalCheckId, checkStatus, ynStamped,
				ynSpectro, ynClean, ynSeal, ynCheck,sampling,test,sendSampling,
				ynSpray,remark,ynFlawDetection,physicalCommissioned,testReport,submissions,
				outCheck,pleaseCheck,oneCheck,ynSpark,sprayWord,failureHandling);
		return "{success : true}";
	}


	@WebRemote
	public String saveArrivalCheckDetil(AdmissionTestVo vo){
		return admissionTestServiceImpl.saveArrivalCheckDetil(vo);
	}
	
	
	/**
	 * 保存检查信息
	 * 
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String saveCheckDetail(AdmissionTestVo vo) {
		admissionTestServiceImpl.saveCheckDetail(vo);
		return "{success : true}";
	}
	
	/**
	 * 修改入场检验表的处理状态
	 * @return
	 */
	@WebRemote
	public String UpdateArrivalCheck(String registrationIds,String checkStatus){
		ArrivalCheckVo vo = new ArrivalCheckVo();
		vo.setCheckStatus(checkStatus.charAt(0));
		String result = "";
		String[] registrationId = registrationIds.split(",");
		if(registrationId.length == 1){
			result = "'"+registrationId[0]+"'";
		}else{
			for(int i=0;i<registrationId.length;i++){
				result = result + "'" + registrationId[i] + "'";
				if(i<registrationId.length-1)
					result = result + ",";
			}		
		}
		vo.setRegistrationIds(result);	
		admissionTestServiceImpl.UpdateArrivalCheck(vo);
		return "{success : true}";
	}

	/**
	 * 获取入库检验信息
	 * @return
	 */
	@WebRemote
	public String getArrivalCheckDetil(AdmissionTestVo vo ){ 
		return admissionTestServiceImpl.getArrvalCheckDetail(vo);
//		ArrivalCheck ac = admissionTestServiceImpl.getArrvalCheckDetail(vo);
//		if (ac != null) {
//			try {
//				BeanUtils.copyProperties(vo, ac);
//			} catch (IllegalAccessException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			} catch (InvocationTargetException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			vo.setYnRegistration(ac.getYnRegistration());//登记确认
//			vo.setYnRegistrationDate(UtilDAOImp.dateToStr(ac.getYnRegistrationDate()==null?new Date():ac.getYnRegistrationDate(), "yyyy-MM-dd"));
//			vo.setYnRegistrationCreator(ac.getYnRegistrationCreator()==null?identity.getLoginUser().getTruename():ac.getYnRegistrationCreator());
//			vo.setOutCheck(ac.getOutCheck());//开箱检验
//			vo.setOutcheckDate(UtilDAOImp.dateToStr(ac.getOutcheckDate(), "yyyy-MM-dd"));
//			vo.setOutcheckCreator(ac.getOutcheckCreator());
//			vo.setPleaseCheck(ac.getPleaseCheck());//请检
//			vo.setPleasecheckDate(UtilDAOImp.dateToStr(ac.getPleasecheckDate(), "yyyy-MM-dd"));
//			vo.setPleasecheckCreator(ac.getPleasecheckCreator());
//			vo.setOneCheck(ac.getOneCheck() );//表面初检
//			vo.setOnecheckDate(UtilDAOImp.dateToStr(ac.getOnecheckDate(), "yyyy-MM-dd"));
//			vo.setOnecheckCreator(ac.getOnecheckCreator());
//			vo.setSampling(ac.getSampling() );//取样
//			vo.setSamplingDate(UtilDAOImp.dateToStr(ac.getSamplingDate(), "yyyy-MM-dd"));
//			vo.setSamplingCreator(ac.getSamplingCreator());
//			vo.setTest(ac.getTest() );//委托试验
//			vo.setTestDate(UtilDAOImp.dateToStr(ac.getTestDate(), "yyyy-MM-dd"));
//			vo.setTestCreator(ac.getTestCreator());
//			vo.setSendSampling(ac.getSendSampling());//送样
//			vo.setSendsamplingDate(UtilDAOImp.dateToStr(ac.getSendsamplingDate(), "yyyy-MM-dd"));
//			vo.setSendsamplingCreator(ac.getSendsamplingCreator());
//			vo.setTestReport(ac.getTestReport());//试验报告
//			vo.setTestreportDate(UtilDAOImp.dateToStr(ac.getTestreportDate(), "yyyy-MM-dd"));
//			vo.setTestreportCreator(ac.getTestreportCreator());
//			vo.setYnStamped(String.valueOf(ac.getYnStamped()));//打钢印
//			//vo.setYnSpectro(String.valueOf(ac.getYnSpectro()));//分光 (已与磨火花合并,不在使用)
//			vo.setYnSpark(String.valueOf(ac.getYnSpark()));//分光/磨火花
//			vo.setYnCheck(String.valueOf(ac.getYnCheck()));//表面检查
//			vo.setSprayWord(ac.getSprayWord());//喷字
//			vo.setYnSeal(String.valueOf(ac.getYnSeal()));//油封
//			vo.setYnSealDate(UtilDAOImp.dateToStr(ac.getYnSealDate(), "yyyy-MM-dd"));
//			vo.setYnSealCreator(ac.getYnSealCreator());
//			vo.setFailureHandling(ac.getFailureHandling());//不合格处理
//			vo.setFailurehandlingDate(UtilDAOImp.dateToStr(ac.getFailurehandlingDate(), "yyyy-MM-dd"));
//			vo.setFailurehandlingCreator(ac.getFailurehandlingCreator());
//		}
//		JSONObject obj = new JSONObject();
//		obj.element("success", true).element("data", JSONObject.fromObject(vo));
//		return obj.toString();
	}
	/**
	 * 获取检查信息
	 * 
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getCheckDetail(AdmissionTestVo vo) {
		
		CheckDetail checkDetail = admissionTestServiceImpl.getCheckDetail(vo);
		if (checkDetail != null) {
			vo.setCheckDetailId(checkDetail.getCheckDetailId() == null ? ""
					: checkDetail.getCheckDetailId());
			vo.setObjectComment(checkDetail.getObjectComment() == null ? ""
					: checkDetail.getObjectComment());
			vo.setObjectName(checkDetail.getObjectName() == null ? ""
					: checkDetail.getObjectName());
			vo.setObjectNo(checkDetail.getObjectNo() == null ? "" : checkDetail
					.getObjectNo());
			vo.setObjectResult(checkDetail.getObjectResult() == null ? ""
					: checkDetail.getObjectResult());
			vo.setRestAssuredNumber(checkDetail.getRestAssuredNumber() == null ? ""
					: checkDetail.getRestAssuredNumber().toString());
			vo.setRestAssuredDate(checkDetail.getRestAssuredDate() == null ? ""
					: df.format(checkDetail.getRestAssuredDate()));
		}
		JSONObject obj = new JSONObject();
		obj.element("success", true).element("data", JSONObject.fromObject(vo));
		return obj.toString();
	}
	
	/**
	 * 获取入库信息
	 * 
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getApplyIn(AdmissionTestVo vo) {
		List<Object[]> objList = admissionTestServiceImpl.getApplyIn(vo);
		vo.setApplyNo(admissionTestServiceImpl.getApplyNo());
		if (objList != null && objList.size()>0) {
			Object ob[] = objList.get(0);
			vo.setApplyNo(ob[0] == null ? "" : ob[0].toString());
			vo.setApplyStorage(ob[1] == null ? "" : ob[1].toString());
			vo.setDepartmentName(ob[2] == null ? "" : ob[2].toString()); 
			vo.setDepartmentId(ob[3] == null ? "" : ob[3].toString()); 
			vo.setPlanPrice(ob[4] == null ? "" : ob[4].toString());
			vo.setChkUserNo(ob[5] == null ? "" : ob[5].toString());
			vo.setStartJc(ob[6] == null ? "" : ob[6].toString()); 
			vo.setEa(ob[7] == null ? "" : ob[7].toString()); 
			vo.setCertificateNo(ob[8] == null ? "" : ob[8].toString());
			vo.setQualityCode(ob[9] == null ? "" : ob[9].toString()); 
			vo.setEndJc(ob[10] == null ? "" : ob[10].toString()); 
			vo.setItemBillId(ob[11] == null ? "" : ob[11].toString());//质量信息Id
		}
		JSONObject obj = new JSONObject();
		obj.element("success", true).element("data", JSONObject.fromObject(vo));
		return obj.toString();
	}
	/**
	 * 获取入库质量信息
	 * 
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getItemDataBillForm(AdmissionTestVo vo) { 
		ItemDataBill itemBill = null;
		if(vo.getItemBillId()!=null && !vo.getItemBillId().equals(""))
			itemBill = admissionTestServiceImpl.getItemDataBill(vo.getItemBillId()); 
		if(itemBill!=null){
			vo.setCheckLife(itemBill.getCheckLife().toString());
			vo.setCheckLifeDeadLine(df.format(itemBill.getCheckLifeDeadLine()));
			vo.setGuarantyLife(itemBill.getGuarantyLife().toString());
			vo.setGuarantyLifeDeadLine(df.format(itemBill.getGuarantyLifeDeadLine()));
			vo.setOutFactoryData(df.format(itemBill.getOutFactoryData()));
			vo.setInFactoryData(df.format(itemBill.getInFactoryData()));
			vo.setPotLife(itemBill.getPotLife().toString());
			vo.setPotLifeDeadLine(df.format(itemBill.getPotLifeDeadLine()));
			vo.setOilLife(itemBill.getOilLife().toString());
			vo.setOilLifeDeadLine(df.format(itemBill.getOilLifeDeadLine()));
			vo.setUseLife(itemBill.getUseLife().toString());
			vo.setUseLifeDeadLine(df.format(itemBill.getUseLifeDeadLine()));
			vo.setSupplyCertifica(itemBill.getSupplyCertifica()); 
			vo.setNote(itemBill.getNote()); 
			vo.setId(itemBill.getItemBillId());
			if(itemBill.getItemPurpose().equals("1"))
				vo.setItemPurpose("部检");
			else if(itemBill.getItemPurpose().equals("2"))
				vo.setItemPurpose("海军检");
			else if(itemBill.getItemPurpose().equals("3"))
				vo.setItemPurpose("空军检");
		}else
			vo.setItemPurpose("部检");
		JSONObject obj = new JSONObject();
		obj.element("success", true).element("data", JSONObject.fromObject(vo));
		return obj.toString();
	}
	/**
	 * 获取单位列表
	 * 
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<AdmissionTestVo> getDepartmentGridData(AdmissionTestVo vo) {
		GridData<AdmissionTestVo> result = new GridData<AdmissionTestVo>();
		List<AdmissionTestVo> AdmissionTestVoList = new ArrayList<AdmissionTestVo>();
		VendorAppraisalVo vendorAppraisalVo = new VendorAppraisalVo();
		vendorAppraisalVo.setStart(vo.getStart());
		vendorAppraisalVo.setLimit(vo.getLimit());
		List<Object[]> objList = vendorAppraisalService
				.getDepartmentList(vendorAppraisalVo);
		for (Object ob[] : objList) {
			vo = new AdmissionTestVo();
			vo.setDepartmentCode(ob[0] == null ? "" : ob[0].toString());
			vo.setDepartmentId(ob[1] == null ? "" : ob[1].toString());
			vo.setPhone(ob[3] == null ? "" : ob[3].toString());
			vo.setDepartmentName(ob[2] == null ? "" : ob[2].toString());
			AdmissionTestVoList.add(vo);
		}
		result.setResults(AdmissionTestVoList);
		result.setTotalProperty(vendorAppraisalService.getDepartmentListCount(
				vendorAppraisalVo).longValue());
		return result;
	}

	@WebRemote
	public GridData<AdmissionTestVo> getGridData(AdmissionTestVo vo) {
		GridData<AdmissionTestVo> result = new GridData<AdmissionTestVo>();
		List<AdmissionTestVo> AdmissionTestVoList = new ArrayList<AdmissionTestVo>();
		List<Object[]> objList = admissionTestServiceImpl.getArrivalCheckList(vo);
		for (Object ob[] : objList) {
			vo = new AdmissionTestVo();
			vo.setItemId(ob[0] == null ? "" : ob[0].toString());
			vo.setItemCode(ob[1] == null ? "" : ob[1].toString());
			vo.setItemName(ob[2] == null ? "" : ob[2].toString());
			if(ob[12] != null){
				vo.setContractCode(ob[12].toString());
			}else
				vo.setContractCode(ob[3] == null ? "" : ob[3].toString());
			if(ob[12] != null){
				vo.setContractName(ob[13] == null ? "" : ob[13].toString());
			}else
				vo.setContractName(ob[4] == null ? "" : ob[4].toString());
			vo.setArrivalCheckId(ob[6] == null ? "" : ob[6].toString());
			vo.setLotNo(ob[5] == null ? "" : ob[5].toString());
			vo.setApplyInId(ob[7] == null ? "" : ob[7].toString());
			vo.setApplyNum(ob[8] == null ? "" : ob[8].toString());
			vo.setPrice(ob[9] == null ? "" : ob[9].toString());
			vo.setInvoiceNo(ob[10] == null ? "" : ob[10].toString());
			vo.setDemension(ob[11] == null ? "" : ob[11].toString());
			vo.setMaterialstate(ob[14]==null?"":ob[14].toString());//物资状态
			vo.setDeliveryStatus(ob[15]==null?"":String.valueOf(ob[15]));
			AdmissionTestVoList.add(vo);
		}
		result.setResults(AdmissionTestVoList);
		result.setTotalProperty(objList.size());
		return result;
	}

	/**
	 * 保存入库信息
	 * 
	 * @param arrivalCheckId
	 * @param applyNum
	 * @param applyInId
	 * @param appraisalNo
	 * @param applyStorage
	 */
	@WebRemote
	public String saveApplyIn(String arrivalCheckId[], String applyNum[],
			String applyInId[], String appraisalNo,String[] itemId,String[] itemCode,String[] inPrice,
			String[] contractNo,String invoiceNo[],String[] unit,String[] batch,
			String[] productCode,String[] note,String startJc,String ea,
			String endJc,String id,String createDate,String potLife,String checkLife,String oilLife,String useLife,String guarantyLife,
			String supplyRegularNo,String orderNo,String vendorCode,String vendorName,String note1,String itemPurpose,String 
			supplyCertifica,String[] materialstate) {
		long userid = identity.getLoginUser().getUserid();
		String itemBillId = this.saveItemDataBill(id, createDate, potLife,
				checkLife, oilLife, useLife,guarantyLife, supplyRegularNo, orderNo, vendorCode, vendorName, note1,itemPurpose, supplyCertifica);
		String applyDeptId = identity.getLoginUser().getInstcode();
		String userCode = identity.getLoginUser().getLoginname();
		try{
		admissionTestServiceImpl.saveApplyIn(arrivalCheckId, applyNum,
				applyInId, appraisalNo, applyDeptId, String
						.valueOf(userid),itemId,userCode,itemCode,inPrice,contractNo,invoiceNo,unit,batch,
						productCode,note,startJc,ea,endJc,itemBillId,materialstate);
		}catch(Exception e){
			e.printStackTrace();
			return "{success : false,msg:'"+e.getLocalizedMessage()+"'}";
		}
//		if(!results)
//			return "failure";
		return "{success : true,msg:''}";
	}
	//导出excel
	@WebRemote
	public List<Object[]> exportMaterialsReportGridData(Object obj){
		AdmissionTestVo vo = new AdmissionTestVo();
		HttpServletRequest request = (HttpServletRequest) obj;
		vo.setApplyNum(request.getParameter("applyNum"));
		vo.setItemName(request.getParameter("itemName"));
		vo.setDesingnation(request.getParameter("desingnation"));
		vo.setEndDate(request.getParameter("endDate"));
		vo.setStartDate(request.getParameter("startDate"));
		vo.setStart(-1); 
		List<Object[]> objList = admissionTestServiceImpl
		.getMaterialsReportGridData(vo);
		List<Object[]> valueList = new ArrayList<Object[]>();
		Object value[] = null;
		for (Object ob[] : objList) {
			 value = new Object[22];
			 value[0] = ob[0] == null ? "" : ob[0].toString();
			 value[1] = ob[1] == null ? "" : ob[1].toString();
			 value[2] = ob[2] == null ? "" : ob[2].toString();//物料编码
			 value[3] = ob[3] == null ? "" : ob[3].toString();
			 value[4] = ob[4] == null ? "" : ob[4].toString();
			 value[5] = ob[5] == null ? "" : ob[5].toString();
			 value[6] = ob[6] == null ? "" : ob[6].toString();
			 value[7] = ob[7] == null ? "" : ob[7].toString();
			 value[8] = ob[8] == null ? "" : ob[8].toString();
			 value[9] = ob[9] == null ? "" : ob[9].toString();
			 value[10] = ob[10] == null ? "" : ob[10].toString();
			 value[11] = ob[11] == null ? "" : ob[11].toString();
			 value[12] = ob[12] == null ? "" : ob[12].toString();
			 value[13] = ob[13] == null ? "" : ob[13].toString();
			 value[14] =ob[14] == null || ob[14].equals("0")?"否":"是";
			 value[15] =ob[16] == null || ob[16].equals('0')?"否":"是";
			 value[16] = ob[21] == null || ob[21].equals("0")?"否":"是";
			 value[17] = ob[17] == null ? "" : ob[17].toString();
			 value[18] = ob[20] == null ? "" : ob[20].toString();
			 value[19] = ob[18] == null ? "" : ob[18].toString();
			 if(ob[12] == null)
				 value[20] = "";
			 else  if(ob[18] == null)
				 value[20] = ob[12].toString();
			 else
				 value[20] = Float.parseFloat(ob[12].toString())- Float.parseFloat(ob[18].toString());
			 value[21] = ob[19] == null ? "" : ob[19].toString(); 
			 valueList.add(value);
		}
		return valueList;
	}
	/**
	 * 物资报表列表
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<AdmissionTestVo> getMaterialsReportGridData(AdmissionTestVo vo) {
		GridData<AdmissionTestVo> result = new GridData<AdmissionTestVo>();
		List<AdmissionTestVo> AdmissionTestVoList = new ArrayList<AdmissionTestVo>();
		List<Object[]> objList = admissionTestServiceImpl
				.getMaterialsReportGridData(vo);
		Long longValue = admissionTestServiceImpl.getMaterialsReportGridDataCount(vo).longValue();
		List<Object[]> objList1 = null;
		for (Object ob[] : objList) {
			vo = new AdmissionTestVo();
			vo.setRegistrationcode(ob[0]==null?"":ob[0].toString());
		    vo.setVendorName(ob[1] == null ? "" : ob[1].toString());
		    vo.setItemCode(ob[2] == null ? "" : ob[2].toString());
			vo.setItemName(ob[3] == null ? "" : ob[3].toString());
			vo.setDesingnation(ob[4] == null ? "" : ob[4].toString());
			vo.setMaterialstandard(ob[5] == null ? "" : ob[5].toString());
			vo.setTechniccondition(ob[6] == null ? "" : ob[6].toString());
			vo.setDemension(ob[7] == null ? "" : ob[7].toString());
			vo.setInvoiceNo(ob[8] == null ? "" : ob[8].toString());
			vo.setInvoiceNum(ob[9] == null ? "" : ob[9].toString());
			vo.setTransportDate(ob[10] == null ? "" : ob[10].toString());
			vo.setTransportNo(ob[11] == null ? "" : ob[11].toString());
			vo.setArrivalNum(ob[12] == null ? "" : ob[12].toString());
			vo.setLupiNo(ob[13] == null ? "" : ob[13].toString());
			vo.setQuyang(ob[14] == null || ob[14].equals("0")?"否":"是");
			vo.setArrivalCheckId(ob[15] == null ? "" : ob[15].toString()); 
			vo.setYnStamped(ob[16] == null||ob[16].equals('0')?"否":"是");
			vo.setInDate(ob[17] == null ? "" : ob[17].toString());
			vo.setInNum(ob[18] == null ? "" : ob[18].toString());
			vo.setArrivalDate(ob[19] == null ? "" : ob[19].toString());
			vo.setInNo(ob[20] == null ? "" : ob[20].toString()); 
			vo.setTestReport(ob[21] == null || ob[21].equals("0")?"否":"是");
			vo.setContractCode(ob[22] == null ? "" : ob[22].toString());
			vo.setContractName(ob[23] == null ? "" : ob[23].toString());
			vo.setDeliveryStatus(ob[24] == null ? "" : ob[24].toString());
			vo.setLotNo(ob[25] == null ? "" : ob[25].toString());
			vo.setPrice(ob[26] == null ? "" : ob[26].toString());
			vo.setSupplyCertifica(ob[27] == null ? "" : ob[27].toString());
			vo.setCreatedate(ob[28] == null ? "" : ob[28].toString());
			vo.setMaterialstate(ob[29] == null ? "" : ob[29].toString());
			vo.setCheckStatus(ob[30] == null ? "" : ob[30].toString());
			vo.setNote(ob[31] == null ? "" : ob[31].toString());
			vo.setCreatename(ob[32] == null ? "" : ob[32].toString());
			vo.setDepartmentName(ob[33] == null ? "" : ob[33].toString());
			vo.setCheckResult(ob[34] == null ? "" : ob[34].toString());
			
			objList1 = admissionTestServiceImpl.getApplyIn(vo);
			if (objList1 != null && objList1.size()>0) 
				vo.setApplyNum(objList.get(0)[12]+"");
			AdmissionTestVoList.add(vo);
		}
		result.setResults(AdmissionTestVoList);
		result.setTotalProperty(longValue);
		return result;
	}
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
	@WebRemote
	public String saveItemDataBill(String id, String createDate,
			String potLife, String checkLife, String oilLife,
			String useLife, String guarantyLife, String supplyRegularNo,
			String orderNo, String vendorCode, String vendorName,String note,String itemPurpose,String supplyCertifica) {
		if(itemPurpose.equals("部检"))
			itemPurpose = "1";
		else if(itemPurpose.equals("海军检"))
			itemPurpose = "2";
		else
			itemPurpose = "3";
		return admissionTestServiceImpl.saveItemDataBill(id, createDate, potLife,
				checkLife, oilLife, useLife,guarantyLife, supplyRegularNo, orderNo, vendorCode, vendorName, note,itemPurpose, supplyCertifica);
	}
	
	/**
	 * 删除入库申请单编号
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String delApplyIn(AdmissionTestVo vo){
		this.admissionTestServiceImpl.delApplyIn(vo);
		return "{success:true}";
	}
	
}
