
package com.sysware.customize.hd.investment.procurementExecute.registration;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.BigDecimalConverter;
import org.apache.commons.beanutils.converters.DateConverter;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialVo;
import com.sysware.customize.hd.investment.procurementExecute.admissionTest.AdmissionTestService;
import com.sysware.customize.hd.investment.procurementExecute.admissionTest.ArrivalCheck;
import com.sysware.customize.hd.investment.procurementExecute.route.RouteService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContract;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContractCondition;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContractService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetailService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetailVo;

/**
 * 入库登记
 * 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-22
 * 
 */
@Name("registrationRemote")
public class RegistrationRemote {
	static {
		ConvertUtils.register(new BigDecimalConverter(Double.valueOf(0)),
				BigDecimal.class);
		DateConverter dateConverter = new DateConverter();
		dateConverter.setPattern("yyyy-MM-dd");
		ConvertUtils.register(dateConverter, Date.class);
		ConvertUtils.register(dateConverter, String.class);
	}
	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	@In(value = "registrationServiceImpl", create = true)
	RegistrationService registrationService;
	@In(value = "contract_ProcurementContractServiceImpl", create = true)
	ProcurementContractService contractServiceImpl;
	@In(create = true, value = "procurementDetail_ProcurementDetailServiceImpl")
	private ProcurementDetailService procurementDetailService;
	@In(create = true, value = "routeServiceImpl")
	private RouteService routeServiceImpl;
	@In(create = true)
	Identity identity;
	
	@In(value = "admissionTestServiceImpl", create = true)
	AdmissionTestService admissionTestServiceImpl;

	/**
	 * 登记保存
	 * 
	 * @param vo
	 * @return
	 * @throws InvocationTargetException
	 * @throws IllegalAccessException
	 */
	@WebRemote
	public String saveRegistration(RegistrationVo vo) {
//		Registration registration = new Registration();
//		if (vo.getAmount() != null)
//			registration.setAmount(new BigDecimal(vo.getAmount()));
		try {
//			if (vo.getArrivalDate() != null)
//				registration.setArrivalDate(df.parse(vo.getArrivalDate()));
//			if (vo.getTransportDate() != null
//					&& !vo.getTransportDate().equals(""))
//				registration.setTransportDate(df.parse(vo.getTransportDate()));
//
//		if (vo.getActualNumber() != null)
//			registration.setArrivalNum(new BigDecimal(vo.getActualNumber()));
//		if (vo.getArrivalNum() != null)
//			registration.setArrivalNum(new BigDecimal(vo.getArrivalNum()));
//		if (vo.getContractId() != null)
//			registration.setContractId(vo.getContractId());
//		if (vo.getInvoiceNo() != null)
//			registration.setInvoiceNo(vo.getInvoiceNo());
//		if (vo.getItemId() != null)
//			registration.setItemId(vo.getItemId());
//		if (vo.getLotNo() != null)
//			registration.setLotNo(vo.getLotNo());
//		if (vo.getPurchaseNum() != null)
//			registration.setPurchaseNum(new BigDecimal(vo.getPurchaseNum()));
//		if (vo.getQualifyNo() != null)
//			registration.setQualifyNo(vo.getQualifyNo());
//		if (vo.getRegistrationCode() != null)
//			registration.setRegistrationCode(vo.getRegistrationCode());
//		if (vo.getRegistrationId() != null
//				&& !vo.getRegistrationId().equals("")){
//			registration.setRegistrationId(vo.getRegistrationId());
//		}else {
//			registration.setCreateDate(new Date());
//			registration.setCreaterId(String.valueOf(identity.getLoginUser().getUserid()));
//		}
//		if (vo.getTransportNo() != null && !vo.getTransportNo().equals(""))
//			registration.setTransportNo(vo.getTransportNo());
//		if (vo.getTransportNum() != null && !vo.getTransportNum().equals(""))
//			registration.setTransportNum(new BigDecimal(vo.getTransportNum()));
//		if (vo.getPrice() != null && !vo.getPrice().equals("")) {
//			registration.setPrice(new BigDecimal(vo.getPrice()));
//		}
//		if(vo.getFurnaceBatch()!= null && !vo.getFurnaceBatch().equals(""))
//			registration.setFurnaceBatch(vo.getFurnaceBatch());
//		if(vo.getCheck_result()!= null && !vo.getCheck_result().equals(""))
//			registration.setCheck_result(vo.getCheck_result()); 
//		if(vo.getContractCode()!= null && !vo.getCheck_result().equals(""))
//			registration.setContractCode(vo.getContractCode());
//		if(vo.getContractName()!= null && !vo.getContractName().equals(""))
//			registration.setContractName(vo.getContractName());
//		if(vo.getItemCode()!= null && !vo.getItemCode().equals(""))
//			registration.setItemCode(vo.getItemCode());
//		if(vo.getItemName()!= null && !vo.getItemName().equals(""))
//			registration.setItemName(vo.getItemName());
//		if(vo.getMaterialstate()!=null&&!vo.getMaterialstate().equals("")){
//			registration.setMaterialstate(vo.getMaterialstate());//物质状态
//		}
//		if(vo.getVendorName()!=null&&!vo.getVendorName().equals("")){
//			registration.setVendorName(vo.getVendorName());//生产厂商
//		}
//		registration.setMaterialType(vo.getMaterialType());
		registrationService.saveRegistration(vo);
		}catch(Exception e){
			return "{success:false,msg:'"+e.getLocalizedMessage()+"'}";
		}
		return "{success:true}";
	}

	/**
	 * 获取列表
	 * 
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<RegistrationVo> getGridData(RegistrationVo vo) {
		GridData<RegistrationVo> result = new GridData<RegistrationVo>();
		try {
			if(null!=vo.getCreateDateStart()&&!"".equals(vo.getCreateDateStart())){
				vo.setCreateDateStart(df.format(df.parse(vo.getCreateDateStart())));
			}
			if(null!=vo.getCreateDateEnd()&&!"".equals(vo.getCreateDateEnd())){
				vo.setCreateDateEnd(df.format(df.parse(vo.getCreateDateEnd())));
			}
			if(null!=vo.getArrivalDateStart()&&!"".equals(vo.getArrivalDateStart())){
				vo.setArrivalDateStart(df.format(df.parse(vo.getArrivalDateStart())));
			}
			if(null!=vo.getArrivalDateEnd()&&!"".equals(vo.getArrivalDateEnd())){
				vo.setArrivalDateEnd(df.format(df.parse(vo.getArrivalDateEnd())));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		List<Object[]> objList = registrationService.getRegistrationList(vo);
		List<RegistrationVo> RegistrationVoList = new ArrayList<RegistrationVo>();
		RegistrationVo registrationVo = null;
		Object[] rob = null;
		ArrivalCheck arrivalCheck = null;
		for (Object[] ob : objList) {
			registrationVo = new RegistrationVo();
			if(ob[7]!=null)
				rob = routeServiceImpl.getRoute(ob[7].toString());
			if(ob[34]!=null && !String.valueOf(ob[34]).equals(""))
				ob[0] = ob[34];
			registrationVo.setContractCode(ob[0]==null?"":ob[0]+"");
			if(ob[36]!=null && !String.valueOf(ob[36]).equals(""))
				ob[1] = ob[36];
			registrationVo.setContractName(ob[1]==null?"":ob[1]+"");
//			if(ob[37]!=null && !String.valueOf(ob[37]).equals(""))
//				ob[2] = ob[37];
			registrationVo.setItemName(ob[2]==null?"":ob[2]+"");
			if(ob[35]!=null && !String.valueOf(ob[35]).equals(""))
				ob[3] = ob[35];
			registrationVo.setItemCode(ob[3]==null?"":ob[3]+"");
			registrationVo.setRegistrationId(ob[4]==null?"":ob[4]+"");
			registrationVo.setContractId(ob[5]==null?"":ob[5]+"");
			registrationVo.setRegistrationCode(ob[6]==null?"":ob[6]+"");
			registrationVo.setItemId(ob[7]==null?"":ob[7]+""); 
			registrationVo.setLotNo(ob[8]==null?"":ob[8]+""); 
			registrationVo.setInvoiceNo(ob[9]==null?"":ob[9]+""); 
			registrationVo.setTransportDate(ob[10]==null?"":ob[10]+""); 
			registrationVo.setTransportNo(ob[11]==null?"":ob[11]+"");
			registrationVo.setTransportNum(ob[12]==null?"":ob[12]+"");
			registrationVo.setPurchaseNum(ob[13]==null?"":ob[13]+"");
			registrationVo.setQualifyNo(ob[14]==null?"":ob[14]+"");
			registrationVo.setCreaterId(ob[15]==null?"":ob[15]+"");
			registrationVo.setCreateDate(ob[16]==null?"":ob[16]+""); 
			registrationVo.setArrivalNum(ob[17]==null?"":ob[17]+""); 
			registrationVo.setAmount(ob[18]==null?"":ob[18]+""); 
			registrationVo.setCreaterName(ob[19]==null?"":ob[19]+""); 
			registrationVo.setArrivalDate(ob[20]==null?"":ob[20]+"");
			registrationVo.setPrice(ob[21]==null?"":ob[21]+"");
			registrationVo.setDemension(ob[22]==null?"":ob[22]+"");
			registrationVo.setTechnicCondition(ob[23]==null?"":ob[23]+"");
			registrationVo.setDesingnation(ob[24]==null?"":ob[24]+"");
			registrationVo.setMaterialStandard(ob[25]==null?"":ob[25]+"");
			registrationVo.setQualifiedNum(ob[26]==null?"":ob[26]+""); 
//			registrationVo.setVendName(ob[27]==null?"":ob[27]+""); 
			registrationVo.setNote(ob[28]==null?"":ob[28]+"");  
			registrationVo.setVendorCode(ob[29]==null?"":ob[29]+""); 
			if(ob[27]!=null && !String.valueOf(ob[27]).equals(""))
				ob[30] = ob[27];
			registrationVo.setVendorName(ob[30]==null?"":ob[30]+"");
			registrationVo.setFurnaceBatch(ob[31]==null?"":ob[31]+"");
			registrationVo.setMaterialType(ob[32]==null?"":ob[32]+"");
			registrationVo.setCheck_result(ob[33]==null?"":ob[33]+"");  
			registrationVo.setMaterialtypename(ob[38]==null?"":ob[38]+"");//物资种类小类
			registrationVo.setMaterialtypename_parent(ob[39]==null?"":ob[39]+"");//物资种类大类
			registrationVo.setMaterialstate(ob[40]==null?"":ob[40]+"");//物资状态
			registrationVo.setCreatorDepartment(ob[41]==null?"":ob[41]+"");//登记人部门
			registrationVo.setDeliveryStatus(ob[42]==null?"":String.valueOf(ob[42]));
			registrationVo.setApplyNo(ob[43]==null?"":String.valueOf(ob[43]));
			if (rob != null) {
				registrationVo.setRouteId(rob[0] == null ? "" : rob[0]
						.toString());
				registrationVo.setRouteNo(rob[1] == null ? "" : rob[1]
						.toString());
				registrationVo.setRouteName(rob[2] == null ? "" : rob[2]
						.toString());
				registrationVo.setMeasurement(rob[3] == null ? "0" : rob[3]
						.toString());
				registrationVo.setHardness(rob[4] == null ? "0" : rob[4]
						.toString());
				registrationVo.setPulling(rob[5] == null ? "0" : rob[5]
						.toString());
			} else {
				registrationVo.setRouteId("");
				registrationVo.setRouteNo("");
				registrationVo.setRouteName("");
				registrationVo.setMeasurement("");
				registrationVo.setHardness("");
				registrationVo.setPulling("");
			}
			arrivalCheck = admissionTestServiceImpl.getArrvalCheckDetailByRegistrationId(ob[4]+"");
//			if(null != vo.getCheckStatus() && !"".equals(vo.getCheckStatus())
//					&& !vo.getCheckStatus().equals(arrivalCheck.getCheckStatus().trim())){
//				continue;
//			}
			registrationVo.setArrivalCheckId(arrivalCheck.getArrivalCheckId());
			registrationVo.setCheckStatus(StringUtils.trim(arrivalCheck.getCheckStatus()));//当前状态
			registrationVo.setOutCheck(arrivalCheck.getOutCheck()==null || arrivalCheck.getOutCheck().equals("0")?"否":"是");
			registrationVo.setPleaseCheck(arrivalCheck.getPleaseCheck()==null || arrivalCheck.getPleaseCheck().equals("0")?"否":"是");
			registrationVo.setOneCheck(arrivalCheck.getOneCheck()==null || arrivalCheck.getOneCheck().equals("0")?"否":"是");
			registrationVo.setSampling(arrivalCheck.getSampling()==null || arrivalCheck.getSampling().equals("0")?"否":"是");
			registrationVo.setTest(arrivalCheck.getTest()==null || arrivalCheck.getTest().equals("0")?"否":"是");
			registrationVo.setSendSampling(arrivalCheck.getSendSampling()==null || arrivalCheck.getSendSampling().equals("0")?"否":"是");
			registrationVo.setTestReport(arrivalCheck.getTestReport()==null || arrivalCheck.getTestReport().equals("0")?"否":"是");
			registrationVo.setYnStamped(arrivalCheck.getYnStamped()==null||StringUtils.trim(arrivalCheck.getYnStamped()).equals("0") || String.valueOf(arrivalCheck.getYnStamped()).equals("null")?"否":"是");
			registrationVo.setYnSpectro(StringUtils.trim(arrivalCheck.getYnSpectro()).equals("0") || String.valueOf(arrivalCheck.getYnSpectro()).equals("null")?"否":"是");
			registrationVo.setYnSpark(String.valueOf(arrivalCheck.getYnSpark()).equals("0") || String.valueOf(arrivalCheck.getYnSpark()).equals("null")?"否":"是");
			registrationVo.setYnCheck(arrivalCheck.getYnCheck()==null||StringUtils.trim(arrivalCheck.getYnCheck()).equals("0")  || String.valueOf(arrivalCheck.getYnCheck()).equals("null")?"否":"是");
			registrationVo.setSprayWord(arrivalCheck.getSprayWord()==null || arrivalCheck.getSprayWord().equals("0")?"否":"是");
			registrationVo.setYnFlawDetection(arrivalCheck.getYnFlawDetection()==null || arrivalCheck.getYnFlawDetection().equals("0")?"否":"是");
			registrationVo.setYnSpray(arrivalCheck.getYnSpray()==null || arrivalCheck.getYnSpray().equals("0")?"否":"是");
			registrationVo.setYnSeal(arrivalCheck.getYnSeal()==null||StringUtils.trim(arrivalCheck.getYnSeal()).equals("0")  || String.valueOf(arrivalCheck.getYnSeal()).equals("null")?"否":"是");
			registrationVo.setFailureHandling(arrivalCheck.getFailureHandling()==null || arrivalCheck.getFailureHandling().equals("0")?"否":"是");
			RegistrationVoList.add(registrationVo);
		}
		result.setSuccess(true);
		result.setResults(RegistrationVoList);
		result.setTotalProperty(registrationService
				.getRegistrationListCount(vo).longValue());
		return result;
	}
/**
 * 通过物资编码获取物资信息
 * 
 */
	@WebRemote
	public String getMaterialInfo(RegistrationVo vo){
		Material material = registrationService.getMaterialInfo(vo);
		String data = "";
		if(material==null)
			data = " itemCode : '' ";
		else
			data = " itemName : '"+material.getMaterialItemName()+"',itemCode : '"+material.getMaterialitemcode()+"',itemId : '"+material.getMaterialid()+"' ";
		return "{success : true,data:{"+data+"} }";
	}
	
	/**
	 * 获取合同列表
	 * 
	 * @param vo
	 * @return
	 */
	@WebRemote
	public GridData<RegistrationVo> getContractList(RegistrationVo vo) {
		GridData<RegistrationVo> result = new GridData<RegistrationVo>();
		ProcurementContractCondition condition = new ProcurementContractCondition();
		condition.setApplicationStatus("5");
		condition.setStart(vo.getStart());
		condition.setLimit(vo.getLimit());
		List<ProcurementContract> ProcurementContractList = registrationService.findContractByCondition(condition);
		List<RegistrationVo> RegistrationVoList = new ArrayList<RegistrationVo>();
		for (ProcurementContract contract : ProcurementContractList) {
			vo = new RegistrationVo();
			vo.setContractCode(contract.getContractCode());
			vo.setContractName(contract.getContractName());
			vo.setContractId(contract.getProcurementContractId());
			vo.setCreateDate(df.format(contract.getCreateDate()));
			vo.setVendorName(contract.getVendName());
			vo.setVendorCode(contract.getVendor());
			RegistrationVoList.add(vo);
		}
		result.setResults(RegistrationVoList);
		result.setTotalProperty(contractServiceImpl
				.countContractsByCondition(condition));
		result.setSuccess(true);
		return result;
	}

	/**
	 * 通过合同获得采购计划清单
	 * 
	 */
	@WebRemote
	public GridData<RegistrationVo> getGridDataByContract(RegistrationVo vo) {
		String contractId = vo.getContractId();
		String items = null;
		if(vo.getMaterialType()!=null&&vo.getMaterialType().equals("2")){
			vo.setMaterialCalotlogName("not");
		}
		List<Object[]> objList = registrationService.getItemList(contractId,vo.getMaterialCalotlogName());
		if (objList != null)
			for (Object[] obj : objList) {
				if (items == null)
					items = "";
				else if (items.length() > 0)
					items += ",";
				if (obj[2] != null) {
					items += "'" + obj[2] + "'";
				}
			}
		ProcurementDetailVo provo=new ProcurementDetailVo();
		provo.setStart(vo.getStart());
		provo.setLimit(vo.getLimit());
		provo.setContractId(contractId);
		List<ProcurementDetail> procurementDetails = procurementDetailService
				.getProcurementDetailByContract(provo);
		List<RegistrationVo> procurementDetailVos = new ArrayList<RegistrationVo>();
		for (ProcurementDetail procurementDetail : procurementDetails) {
			vo = new RegistrationVo();
			vo.setItemId(procurementDetail.getMaterialId());
			vo.setItemName(procurementDetail.getMaterialItemName());
			vo.setDemension(procurementDetail.getDemension());
			vo.setDesingnation(procurementDetail.getDesingnation());
			vo.setMaterialStandard(procurementDetail.getMaterialStandard());
			vo.setItemCode(procurementDetail.getMaterialitemcode());
			vo.setPurchaseNum(procurementDetail.getActualNumber().toString());
			procurementDetailVos.add(vo);
		}
		GridData<RegistrationVo> gridData = new GridData<RegistrationVo>();
		gridData.setResults(procurementDetailVos);
		gridData.setTotalProperty(procurementDetailService
				.countProcurementDetailByContract(contractId, items));
		return gridData;
	}

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
	 *  registrationId 登记Id 
	 *  arrivalCheckId 检验Id
	 * @return
	 * @throws ParseException
	 */
	@WebRemote
	public String newRegistration(String itemId, String qualifiedNum,
			String arrivalDate, String sampling, String test,
			String sendSampling, String spectro, String stamped,
			String arrivalNum, String lotNo, String flawDetection,
			String clean, String spray, String check, String seal,
			String registrationId, String arrivalCheckId,String vendorName,String note,String qualifyNo,String materialstate) throws ParseException {
		return registrationService.newRegistration(itemId, qualifiedNum, df
				.parse(arrivalDate), sampling, test, sendSampling, spectro,
				stamped, arrivalNum, lotNo, flawDetection, clean, spray, check,
				seal, registrationId, arrivalCheckId,vendorName,note,qualifyNo,materialstate);
	} 
	
	/**
	 * 删除已登记记录
	 * @param str
	 * @return
	 */
	@WebRemote
	public String delRegistration(String id){
		String[] ids = id.split(",");
		try {
			registrationService.delRegistration(ids);
			return "{success:true}";
		} catch (Exception e) {
			e.printStackTrace();
			return "success:false";
		}
	}
	
	@WebRemote
	public GridData<MaterialVo> getMaterialByContract(RegistrationVo vo){
		GridData<MaterialVo> gridData = new GridData<MaterialVo>();
		gridData.setResults(registrationService.getMaterialByContract(vo));
		gridData.setTotalProperty(vo.getCount());
		return gridData;
	}
	
}
