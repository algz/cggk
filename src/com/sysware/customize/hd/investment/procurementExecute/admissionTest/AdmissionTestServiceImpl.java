package com.sysware.customize.hd.investment.procurementExecute.admissionTest;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.HibernateException;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.base.jdbc.SingleConnection;

@Name("admissionTestServiceImpl")
public class AdmissionTestServiceImpl implements AdmissionTestService {
	@In(value = "admissionTestDaoImpl", create = true)
	AdmissionTestDao admissionTestDaoImpl;
	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	@Transactional
	public void save(String arrivalCheckId[], String checkStatus[],
			String ynStamped[], String ynSpectro[], String ynClean[],
			String ynSeal[], String ynCheck[], String[] sampling,
			String[] test, String[] sendSampling, String[] ynSpray,
			String[] remark, String[] ynFlawDetection,String[] physicalCommissioned,
			String[] testReport,String submissions[],String outCheck[],String pleaseCheck[],
			String oneCheck[],String ynSpark[],String sprayWord[],String failureHandling[]) {
//		ArrivalCheck checkInfo = null;
//		char status = '0';
//		ArrivalCheckVo vo = null;
//		for (int i = 0; i < arrivalCheckId.length; i++) {
//			checkInfo = admissionTestDaoImpl.get(arrivalCheckId[i]);
//			if (ynStamped != null) {
//				checkInfo.setYnStamped(ynStamped[i].equals("否") ? '0' : '1');
//			}
//			if (ynSpectro != null) {
//				checkInfo.setYnSpectro(ynSpectro[i].equals("否") ? '0' : '1');
//			}
//			if (ynClean != null) {
//				checkInfo.setYnClean(ynClean[i].equals("否") ? '0' : '1');
//			}
//			if (ynSeal != null) {
//				checkInfo.setYnSeal(ynSeal[i].equals("否") ? '0' : '1');
//			}
//			if (ynCheck != null) {
//				checkInfo.setYnCheck(ynCheck[i].equals("否") ? '0' : '1');
//			}
//
//			if (sampling != null) {
//				checkInfo.setSampling(sampling[i].equals("否") ? "0" : "1");
//			}
//			if (test != null) {
//				checkInfo.setTest(test[i].equals("否") ? "0" : "1");
//			}
//			if (sendSampling != null) {
//				checkInfo.setSendSampling(sendSampling[i].equals("否") ? "0"
//						: "1");
//			}
//			if (ynSpray != null) {
//				checkInfo.setYnSpray(ynSpray[i].equals("否") ? "0" : "1");
//			}
//			if (remark != null) {
//				checkInfo.setRemark(remark[i]);
//			}
//			if (ynFlawDetection != null) {
//				checkInfo
//						.setYnFlawDetection(ynFlawDetection[i].equals("否") ? "0"
//								: "1");
//			}
//			if (physicalCommissioned != null) {
//				checkInfo
//						.setPhysicalCommissioned(physicalCommissioned[i].equals("否") ? "0"
//								: "1"); 
//			}
//			if (testReport != null) {
//				checkInfo
//						.setTestReport(testReport[i].equals("否") ? "0"
//								: "1"); 
//			}
//			if (submissions != null) {
//				checkInfo
//						.setSubmissions(submissions[i].equals("否") ? "0"
//								: "1"); 
//			}
//			if (outCheck != null) 
//				checkInfo.setOutCheck(outCheck[i].equals("否") ? "0"
//						: "1");
//			if (pleaseCheck != null) 
//				checkInfo.setPleaseCheck(pleaseCheck[i].equals("否") ? "0"
//						: "1");
//			if (oneCheck != null) 
//				checkInfo.setOneCheck(oneCheck[i].equals("否") ? "0"
//						: "1");
//			if (ynSpark != null) 
//				checkInfo.setYnSpark(ynSpark[i].equals("否") ? "0"
//						: "1"); 
//			if (sprayWord != null) 
//				checkInfo.setSprayWord(sprayWord[i].equals("否") ? "0"
//						: "1");
//			if (failureHandling != null) 
//				checkInfo.setFailureHandling(failureHandling[i].equals("否") ? "0"
//						: "1");
//			admissionTestDaoImpl.update(checkInfo);
//		}
	}

	@Transactional
	public void saveCheckDetail(AdmissionTestVo vo) {
		CheckDetail checkDetail = new CheckDetail();
		checkDetail.setArrivalCheckId(vo.getArrivalCheckId());
		checkDetail.setCheckType(vo.getCheckType().charAt(0));
		checkDetail.setObjectComment(vo.getObjectComment());
		checkDetail.setObjectName(vo.getObjectName());
		checkDetail.setObjectNo(vo.getObjectNo());
		checkDetail.setObjectResult(vo.getObjectResult());
		checkDetail.setFileId(vo.getFileId());
		checkDetail.setFileName(vo.getFileName());
		if(vo.getRestAssuredNumber()!=null)
		checkDetail.setRestAssuredNumber(new BigDecimal(vo.getRestAssuredNumber()));
		if(vo.getRestAssuredDate()!=null)
			try {
				checkDetail.setRestAssuredDate(df.parse(vo.getRestAssuredDate()));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		if (vo.getCheckDetailId() != null && !vo.getCheckDetailId().equals("")) {
			checkDetail.setCheckDetailId(vo.getCheckDetailId());
			admissionTestDaoImpl.updateCheckDetail(checkDetail);
		} else {
			admissionTestDaoImpl.save(checkDetail);
		}
	}

	public CheckDetail getCheckDetail(AdmissionTestVo vo) {
		return admissionTestDaoImpl.getCheckDetail(vo);
	}

	@Transactional
	public boolean saveApplyIn(String[] arrivalCheckId, String[] applyNum,
			String applyInId[], String appraisalNo,
			String applyDeptId, String applyer, String[] itemId,
			String userCode, String[] itemCode, String inPrice[],
			String[] contractNo, String[] invoiceNo, String[] unit,
			String[] batch, String[] productCode, String[] note,
			String startJc, String ea, String endJc,
			String itemBillId,String[] materialstate)throws Exception {
		boolean isRename=false;
		//申请号重名判断
		String sql="SELECT count(*) from T_APPLY_IN t where t.APPLY_NO='1CGRK201211-0001'";
		BigDecimal count=(BigDecimal)admissionTestDaoImpl.getHibernateSession().createSQLQuery(sql).uniqueResult();
		if(count.compareTo(BigDecimal.ZERO)!=0){//重名则赋予新的编号
			appraisalNo=getApplyNo();
			isRename=true;
		}
		admissionTestDaoImpl.saveApplyIn(arrivalCheckId, applyNum, applyInId,
				appraisalNo, applyDeptId, applyer, itemId,
				userCode, itemCode, inPrice, contractNo, invoiceNo, unit,
				batch, productCode, note, startJc, ea, endJc, itemBillId,materialstate);
		if(isRename){
			throw new HibernateException("数据保存成功,但申请编号重名,已自动更换为:"+appraisalNo);
		}
		return !isRename;
	}

	public List<Object[]> getArrivalCheckList(AdmissionTestVo vo) {
		return admissionTestDaoImpl.getArrivalCheckList(vo);
	}

	public List<Object[]> getApplyIn(AdmissionTestVo vo) {
		return admissionTestDaoImpl.getApplyIn(vo);
	}

	public List<Object[]> getMaterialsReportGridData(AdmissionTestVo vo) {
		return admissionTestDaoImpl.getMaterialsReportGridData(vo);
	}
	public BigDecimal getMaterialsReportGridDataCount(AdmissionTestVo vo){
		return admissionTestDaoImpl.getMaterialsReportGridDataCount(vo);
	}
	public ArrivalCheck getArrivalCheck(String arrivalCheckId) {
		return admissionTestDaoImpl.get(arrivalCheckId);
	}
    
	/**
	 * 修改入场检验表的处理状态
	 * 
	 * @return
	 */
	public int UpdateArrivalCheck(ArrivalCheckVo vo) {
		return admissionTestDaoImpl.UpdateArrivalCheck(vo);
	}

	public void update(ArrivalCheck checkInfo) {
		admissionTestDaoImpl.update(checkInfo);
	}

	@Transactional
	public String saveItemDataBill(String id, String createDate,
			String potLife, String checkLife, String oilLife,
			String useLife, String guarantyLife, String supplyRegularNo,
			String orderNo, String vendorCode, String vendorName,String note,String itemPurpose,String supplyCertifica) {
		return admissionTestDaoImpl.saveItemDataBill(id, createDate, potLife,
				checkLife, oilLife, useLife,guarantyLife, supplyRegularNo, orderNo, vendorCode, vendorName, note,itemPurpose, supplyCertifica);
	}

	public ItemDataBill getItemDataBill(String id) {
		return admissionTestDaoImpl.getItemDataBill(id);
	}

	public String getArrvalCheckDetail(AdmissionTestVo vo) { 
		return admissionTestDaoImpl.getArrvalCheckDetail(vo);
	}
	public ArrivalCheck getArrvalCheckDetailByRegistrationId(String id) {
		return admissionTestDaoImpl.getArrvalCheckDetailByRegistrationId(id);
	}
	
	
	@Transactional
	public String saveArrivalCheckDetil(AdmissionTestVo vo) {
		// TODO Auto-generated method stub
		return admissionTestDaoImpl.saveArrivalCheckDetil(vo);
	}
	
	public  String getApplyNo(){
//		RK+年+月+—+四位流水，其中年4位月两位。例如：CGRK201205-0001。
//		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMM-");
//		StringBuffer applyno=new StringBuffer("CGRK");
//	    applyno.append(sdf.format(new Date()));
	    
	    SingleConnection  sc = SingleConnection.getInstance();
	    Connection conn = null;
		conn = SingleConnection.getInstance().getConnection();
		String call = "{call Auto_Code_p.Get_Apply_In_No(?)}";
		CallableStatement proc;
		//BigDecimal applyNo_MAX=null;
		String applyNo=null;
		try {
			proc = conn.prepareCall(call);
			
			proc.registerOutParameter(1, oracle.jdbc.OracleTypes.VARCHAR);
			proc.execute();
			applyNo =  (String)proc.getObject(1); //0成功;1失败
		}catch(Exception e){
			e.printStackTrace();
		} finally{
			sc.colseConnection(conn);
		} 
	    return applyNo;
//	    String sql="SELECT cast(SUBSTR(MAX(a.APPLY_NO),12,4) as NUMBER(4)) from T_APPLY_IN a where SUBSTR(a.APPLY_NO,0,4)='CGRK' and TO_CHAR(SYSDATE,'yyyyMM')=SUBSTR(a.APPLY_NO, 5, 6)";
//	    BigDecimal applyNo_MAX=(BigDecimal)admissionTestDaoImpl.getHibernateSession().createSQLQuery(sql).uniqueResult();
		
//	    sdf.applyPattern("dd");
//		if(applyNo_MAX==null){//sdf.format(new Date()).equals("01")
//	    	applyNo_MAX=BigDecimal.ONE;
//	    }else{
//	    	//兼容代码   start
////	    	sdf.applyPattern("yyyyMM");
////			if(sdf.format(new Date()).equals("201210")&&applyNo_MAX==null){
////				applyNo_MAX=new BigDecimal("0030");
////			}
//			//end
//	    	//applyNo_MAX=applyNo_MAX.add(BigDecimal.ONE);
//	    }
	    // 0 代表前面补充0  
	    // 4 代表长度为4  
	    // d 代表参数为正数型  
//	    applyno.append(String.format("%04d", applyNo_MAX.intValue()));
//	    return applyno.toString();
	}
	
	public static void main(String[] argv){
//		RK+年+月+—+四位流水，其中年4位月两位。例如：RK201205-0001。
		SimpleDateFormat sdf=new SimpleDateFormat("yyyyMM-");
		StringBuffer applyno=new StringBuffer("RK");
	    applyno.append(sdf.format(new Date()));
	    String sql="SELECT cast(SUBSTR(MAX(a.APPLY_NO),10,12) as NUMBER(4)) from T_APPLY_IN a where SUBSTR(a.APPLY_NO,0,2)='RK'";
	    BigDecimal applyNo_MAX=BigDecimal.ZERO;//(BigDecimal)admissionTestDaoImpl.getHibernateSession().createSQLQuery(sql).uniqueResult();
		sdf.applyPattern("dd");
	    if(sdf.format(new Date()).equals("01")){
	    	applyNo_MAX=BigDecimal.ONE;
	    }else{
	    	applyNo_MAX.precision();//.add(BigDecimal.ONE);
	    }
	    // 0 代表前面补充0  
	    // 4 代表长度为4  
	    // d 代表参数为正数型  
	    applyno.append(String.format("%04d", applyNo_MAX.intValue()));
		System.out.println(applyno.toString());
	}

	@Transactional
	public String delApplyIn(AdmissionTestVo vo) {
		// TODO Auto-generated method stub
		return this.admissionTestDaoImpl.delApplyIn(vo);
	}

	
}
