package com.sysware.customize.hd.investment.procurementExecute.registration;

/**
 * 入库登记
 * 
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-22
 * 
 */
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialVo;
import com.sysware.customize.hd.investment.procurementExecute.admissionTest.AdmissionTestService;
import com.sysware.customize.hd.investment.procurementExecute.admissionTest.ArrivalCheck;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContract;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContractCondition;

@Name("registrationServiceImpl")
public class RegistrationServiceImpl implements RegistrationService {

	@In(value = "registrationDaoImpl", create = true)
	RegistrationDao registrationDaoImpl;
	@In(value = "admissionTestServiceImpl", create = true)
	AdmissionTestService admissionTestServiceImpl;
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	public List<Object[]> getRegistrationList(RegistrationVo vo) {
		return registrationDaoImpl.getRegistrationList(vo);
	}

	public BigDecimal getRegistrationListCount(RegistrationVo vo) {
		return registrationDaoImpl.getRegistrationListCount(vo);
	}
    private String getMaxCode(){
    	Calendar c = Calendar.getInstance();
		String code = c.get(Calendar.YEAR)+""; 
		String maxcode =  registrationDaoImpl.maxCode();
		if(maxcode==null)
			code+="000000001";
		else
		{
			maxcode =new BigDecimal(maxcode).add(new BigDecimal("1")).toString();
			for (int i = 0; i < 9 - String.valueOf(new BigDecimal(maxcode)).length();i++){
				code+="0";
			}
			code+=maxcode;
		}
		return code;
    }
	@Transactional
	public void saveRegistration(RegistrationVo vo)throws Exception {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat dff = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Registration registration=null ;
		
		if (vo.getRegistrationId() == null|| vo.getRegistrationId().equals("")) {
						 //获取当前登录用户信息
			Identity identity  = (Identity)Component.getInstance("org.jboss.seam.security.identity");
			registration= new Registration();
			registration.setCreateDate(dff.parse(dff.format(new Date())));
			registration.setCreaterId(String.valueOf(identity.getLoginUser().getUserid()));
		
			registration.setRegistrationCode(getMaxCode());
			if(registration.getContractCode()!=null&&!registration.getContractCode().equals("")){
				String sql="SELECT PD.ACTUALNUMBER FROM t_procurementcontract_purchase pcp,t_procurementdetail pd,T_PROCUREMENTCONTRACT pc where PC.PROCUREMENTCONTRACTID=pcp.procurementcontractid and pd.purchaseid = pcp.purchaseid and pc.contractcode='"+registration.getContractCode()+"' and PD.MATERIALID='"+registration.getItemId()+"'";
				//实际采购量
				BigDecimal actualNumber=(BigDecimal)dao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
			    registration.setPurchaseNum(actualNumber);
			}
			dao.getHibernateSession().save(registration);
			
			ArrivalCheck arrivalCheck = new ArrivalCheck();
			arrivalCheck.setCheckStatus("0");
			arrivalCheck.setRegistrationId(registration.getRegistrationId());
			arrivalCheck.setYnClean("0");
			arrivalCheck.setYnSeal("0");
			arrivalCheck.setYnSpectro("0");
			arrivalCheck.setYnCheck("0");
			arrivalCheck.setYnStamped("0");
			arrivalCheck.setSampling("0");
			arrivalCheck.setTest("0");
			arrivalCheck.setSendSampling("0");
			arrivalCheck.setYnFlawDetection("0");
			arrivalCheck.setYnSpray("0");
			arrivalCheck.setPhysicalCommissioned("0");
			arrivalCheck.setTestReport("0");
			arrivalCheck.setOutCheck("0");
			arrivalCheck.setPleaseCheck("0");
			arrivalCheck.setOneCheck("0");
			arrivalCheck.setYnSpark("0"); 
			arrivalCheck.setSprayWord("0");
			arrivalCheck.setFailureHandling("0");
			registrationDaoImpl.save(arrivalCheck);
		}else{
			registration=(Registration)dao.getHibernateSession().get(Registration.class, vo.getRegistrationId());
		}
		if (vo.getAmount() != null)
			registration.setAmount(new BigDecimal(vo.getAmount()));
			if (vo.getArrivalDate() != null)
				registration.setArrivalDate(df.parse(vo.getArrivalDate()));
			if (vo.getTransportDate() != null
					&& !vo.getTransportDate().equals(""))
				registration.setTransportDate(df.parse(vo.getTransportDate()));

		if (vo.getActualNumber() != null)
			registration.setArrivalNum(new BigDecimal(vo.getActualNumber()));
		if (vo.getArrivalNum() != null)
			registration.setArrivalNum(new BigDecimal(vo.getArrivalNum()));
		if (vo.getContractId() != null)
			registration.setContractId(vo.getContractId());
		if (vo.getInvoiceNo() != null)
			registration.setInvoiceNo(vo.getInvoiceNo());
		if (vo.getItemId() != null)
			registration.setItemId(vo.getItemId());
		if (vo.getLotNo() != null)
			registration.setLotNo(vo.getLotNo());
		if (vo.getPurchaseNum() != null)
			registration.setPurchaseNum(new BigDecimal(vo.getPurchaseNum()));
		if (vo.getQualifyNo() != null)
			registration.setQualifyNo(vo.getQualifyNo());
//		if (vo.getRegistrationCode() != null)
//			registration.setRegistrationCode(vo.getRegistrationCode());
		if (vo.getTransportNo() != null && !vo.getTransportNo().equals(""))
			registration.setTransportNo(vo.getTransportNo());
		if (vo.getTransportNum() != null && !vo.getTransportNum().equals(""))
			registration.setTransportNum(new BigDecimal(vo.getTransportNum()));
		if (vo.getPrice() != null && !vo.getPrice().equals("")) {
			registration.setPrice(new BigDecimal(vo.getPrice()));
		}
		if(vo.getFurnaceBatch()!= null && !vo.getFurnaceBatch().equals(""))
			registration.setFurnaceBatch(vo.getFurnaceBatch());
		if(vo.getCheck_result()!= null && !vo.getCheck_result().equals(""))
			registration.setCheck_result(vo.getCheck_result()); 
		if(vo.getContractCode()!= null && !vo.getCheck_result().equals(""))
			registration.setContractCode(vo.getContractCode());
		if(vo.getContractName()!= null && !vo.getContractName().equals(""))
			registration.setContractName(vo.getContractName());
		if(vo.getItemCode()!= null && !vo.getItemCode().equals(""))
			registration.setItemCode(vo.getItemCode());
		if(vo.getItemName()!= null && !vo.getItemName().equals(""))
			registration.setItemName(vo.getItemName());
		if(vo.getMaterialstate()!=null&&!vo.getMaterialstate().equals("")){
			registration.setMaterialstate(vo.getMaterialstate());//物质状态
		}
		if(vo.getVendorName()!=null&&!vo.getVendorName().equals("")){
			registration.setVendorName(vo.getVendorName());//生产厂商
		}
		//registration.setPrice(vo.getPrice()==null||vo.getPrice().equals("")?BigDecimal.ZERO:new BigDecimal(vo.getPrice()));
		registration.setMaterialType(vo.getMaterialType());
			
		String hql="from ArrivalCheck ac where ac.registrationId=:registrationId";
		ArrivalCheck ac=(ArrivalCheck)registrationDaoImpl.getHibernateSession().createQuery(hql)
		                   .setParameter("registrationId", registration.getRegistrationId())
		                   .setMaxResults(1).uniqueResult();
		ac.setCheckStatus("0");//0登记状态
		ac.setYnRegistration("0");//登记确认为0,即空
	}

	public List<Object[]> getItemList(String contractId,String materialCalotlogName) {
		return registrationDaoImpl.getItemList(contractId,materialCalotlogName);
	}
    @Transactional
	public String newRegistration(String itemId, String qualifiedNum,
			Date arrivalDate, String sampling, String test,
			String sendSampling, String spectro, String stamped,
			String arrivalNum, String lotNo, String flawDetection,
			String clean, String spray, String check, String seal,
			String registrationId,String arrivalCheckId,String vendorName,String note,String qualifyNo,String materialstate) {
		Registration registration = null;
		if(registrationId!=null && !registrationId.equals("")){
			registration = registrationDaoImpl.get(registrationId);
		}else{
			registration = new Registration();
			registration.setRegistrationCode(getMaxCode());
		}
		registration.setItemId(itemId);
		registration.setQualifiedNum(new BigDecimal(qualifiedNum));
		registration.setArrivalDate(arrivalDate);
		registration.setArrivalNum((new BigDecimal(arrivalNum)));
		registration.setLotNo(lotNo);
		registration.setVendorName(vendorName);
		registration.setQualifyNo(qualifyNo);
		registration.setNote(note);
		registration.setMaterialstate(materialstate);
		if(registrationId!=null && !registrationId.equals("")){
			registrationDaoImpl.update(registration);
		}else
			registrationDaoImpl.save(registration);
		ArrivalCheck arrivalCheck = null;
		if(arrivalCheckId!=null && !arrivalCheckId.equals("")){
			arrivalCheck = admissionTestServiceImpl.getArrivalCheck(arrivalCheckId);
		}else
			arrivalCheck = new ArrivalCheck();
		arrivalCheck.setCheckStatus("2");
		arrivalCheck.setRegistrationId(registration.getRegistrationId());
		arrivalCheck.setYnClean(clean.equals("否")?"0":"1");
		arrivalCheck.setYnSeal(seal.equals("否")?"0":"1");
		arrivalCheck.setYnSpectro(spectro.equals("否")?"0":"1");
		arrivalCheck.setYnCheck(check.equals("否")?"0":"1");
		arrivalCheck.setYnStamped(stamped.equals("否")?"0":"1");
		arrivalCheck.setSampling(sampling.equals("否")?"0":"1");
		arrivalCheck.setTest(test.equals("否")?"0":"1");
		arrivalCheck.setSendSampling(sendSampling.equals("否")?"0":"1");
		arrivalCheck.setYnFlawDetection(flawDetection.equals("否")?"0":"1");
		arrivalCheck.setYnSpray(spray.equals("否")?"0":"1");
		arrivalCheck.setPhysicalCommissioned("0");
		arrivalCheck.setTestReport("0");
		if(arrivalCheckId!=null && !arrivalCheckId.equals("")){
			admissionTestServiceImpl.update(arrivalCheck);
		}else
			registrationDaoImpl.save(arrivalCheck);
		return "{success:true}";
	}

	public String getArrivalNumList(String itemId) {
		registrationDaoImpl.getArrivalNumList(itemId);
		return null;
	}

	public Material getMaterialInfo(RegistrationVo vo) {
		return registrationDaoImpl.getMaterialInfo(vo);
	}
	
	@Transactional
	public void delRegistration(String[] ids)throws Exception{
		for(int i = 0; i < ids.length; i ++){
			Registration regist = (Registration)registrationDaoImpl.getHibernateSession().get(Registration.class, ids[i]);
			registrationDaoImpl.delArrivalCheck(regist.getRegistrationId());
			registrationDaoImpl.getHibernateSession().delete(regist);
		}
	}

	public List<MaterialVo> getMaterialByContract(RegistrationVo vo) {
		return registrationDaoImpl.getMaterialByContract(vo);
	}

	public List<ProcurementContract> findContractByCondition(
			ProcurementContractCondition condition) {
		// TODO Auto-generated method stub
		return registrationDaoImpl.findContractByCondition(condition);
	} 
}
