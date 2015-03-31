package com.sysware.customize.hd.investment.procurementExecute.admissionTest;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.Query;

import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.time.DateUtils;
import org.hibernate.SQLQuery;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.base.jdbc.SingleConnection;
import com.luck.itumserv.base.user.UserSerivce;
import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAOImp;
import com.sysware.customize.hd.investment.procurementExecute.registration.Registration;
import com.sysware.customize.hd.investment.util.RoleEnum;
@Name("admissionTestDaoImpl")
public class AdmissionTestDaoImpl  extends GenericDAOImpl<ArrivalCheck> implements AdmissionTestDao {
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<ArrivalCheck> acDao;
	@In(create = true)
	Identity identity;
	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");

	public CheckDetail updateCheckDetail(CheckDetail checkDetail) {
		return this.em.merge(checkDetail);
	}

	public CheckDetail getCheckDetail(AdmissionTestVo vo) {
		String sql = "select obj from CheckDetail obj where obj.arrivalCheckId = '"+vo.getArrivalCheckId()+"' and obj.checkType='"+vo.getCheckType()+"'";
		List<CheckDetail> list =  createQuery(sql).getResultList();
		if(list==null || list.size()==0)
			return null;
		else 
			return (CheckDetail)list.get(0);
	}

	public ApplyIn updateApplyIn(ApplyIn applyIn) {
		return this.em.merge(applyIn);
	}
	public ItemDataBill updateItemDataBill(ItemDataBill itemDataBill) {
		return this.em.merge(itemDataBill);
	} 
	public List<Object[]> getArrivalCheckList(AdmissionTestVo vo) { 
		StringBuilder sql = new StringBuilder(" select tm.materialid,tm.materialitemcode,tm.materialitemname ,pc.contractcode,pc.contractname, ");
		sql.append(" tr.lot_no,ac.id,ai.id as applyid,");
		sql.append("nvl(ai.apply_num,(select reg.arrival_num from t_registration reg where reg.id=ac.registration_id)) apply_num,");
		sql.append("tm.referenceprice,tr.INVOICE_NO,tm.DEMENSION,tr.contractcode as contractcode1 ,tr.contractname as contractname1,tr.MATERIAL_STATE,TM.delivery_status ");
		sql.append("  from t_arrival_check ac  ");
		sql.append(" left join t_registration  tr on ac.registration_id = tr.id ");
		sql.append(" left join t_material tm on tr.item_id = tm.materialid ");
		sql.append(" left join t_procurementcontract pc on tr.contract_id = pc.procurementcontractid ");
		sql.append(" left join t_apply_in ai on ac.id = ai.check_id ");
		sql.append(" where ac.id in ("+vo.getArrivalCheckId()+") ");
		return this.createSqlQuery(sql.toString()).getResultList();
	}

	public List<Object[]> getApplyIn(AdmissionTestVo vo) {
		String sql = "select distinct ai.apply_no,ai.apply_storage,dt.departmentname," + 
				"dt.depcode,ai.planPrice,ai.chkUserNo,ai.startJc,ai.ea,ai.certificateNo,ai.qualityCode,ai.endJc,ai.ITEMBILLID,ai.APPLY_NUM from t_apply_in ai " +
				"left join t_departments dt on " +
				"ai.apply_dept_id = dt.depcode ";
		if(vo.getArrivalCheckId().indexOf("'")==-1)
			   sql+="where  ai.check_id ='"+vo.getArrivalCheckId()+"'";
		else
			   sql+="where  ai.check_id in ("+vo.getArrivalCheckId()+")";
		
		return this.createSqlQuery(sql.toString()).getResultList();
	}

	public List<Object[]> getMaterialsReportGridData(AdmissionTestVo vo) {
		StringBuilder sql = new StringBuilder(""); 
		if(isNotLeader()){
			sql.append("select distinct t.* from materialsReport_V t,t_item_profile ip where t.materialitemcode = ip.item_code and ip.login_name = '" + identity.getLoginUser().getLoginname() + "' ");
		}else{
			sql.append("select distinct t.* from materialsReport_V t where 1=1 ");
		}
		Query query = createSqlQuery(sql.toString() + getSql(vo));
		if(vo.getStart()>=0){
			query.setFirstResult(vo.getStart());
			query.setMaxResults(vo.getLimit());
		}
		return query.getResultList();
	}
	public BigDecimal getMaterialsReportGridDataCount(AdmissionTestVo vo) {
		StringBuilder sql = new StringBuilder(""); 
		if(isNotLeader()){
			sql.append("select count(1) from materialsReport_V t,t_item_profile ip where t.materialitemcode = ip.item_code and ip.login_name = '" + identity.getLoginUser().getLoginname() + "' ");
		}else{
			sql.append(" select count(1) from materialsReport_V t where 1=1 ");
		}
		Query query = createSqlQuery(sql.toString()+getSql(vo)); 
		return (BigDecimal) query.getSingleResult();
	}
	private String getSql(AdmissionTestVo vo){
		StringBuilder sql = new StringBuilder("");
		if(vo.getItemName()!=null && !vo.getItemName().equals("")){
			sql.append(" and t.materialitemname like '%").append(vo.getItemName()).append("%'");
		} 
		if(vo.getDesingnation()!=null && !vo.getDesingnation().equals("")){
			sql.append(" and t.desingnation like '%").append(vo.getDesingnation()).append("%'");
		}
		if(vo.getStartDate()!=null && !vo.getStartDate().equals("")){
			sql.append(" and  t.arrival_date>=to_date('"+vo.getStartDate()+"','yyyy-mm-dd') ");
		}
		if(vo.getEndDate()!=null && !vo.getEndDate().equals("")){
			sql.append(" and  t.arrival_date<=to_date('"+vo.getEndDate()+"','yyyy-mm-dd') ");
		}
		if(vo.getApplyNum()!=null && !vo.getApplyNum().equals("")){
			sql.append(" and t.apply_num like '%").append(vo.getApplyNum()).append("%'");
		}
		return sql.toString();
	}
	/**
	 * 修改入场检验表的处理状态
	 * @return
	 */
	public int UpdateArrivalCheck(ArrivalCheckVo vo){
//		String sql = "update t_arrival_check c set c.check_status=? where c.registration_id=?";
		StringBuilder sql = new StringBuilder();
		sql.append("update t_arrival_check c set c.check_status=").append(vo.getCheckStatus());
		sql.append(" where c.registration_id in(").append(vo.getRegistrationIds()).append(")");
		SQLQuery query = acDao.getHibernateSession().createSQLQuery(sql.toString());
//		query.setParameter(0, vo.getCheckStatus());
//		query.setParameter(1, vo.getRegistrationId());
		return query.executeUpdate();
	}

	public boolean saveApplyIn(String[] arrivalCheckId, String[] applyNum,
			String[] applyInId, String appraisalNo,
			String applyDeptId, String applyer, String[] itemId,String userCode,
			String[] itemCode,String inPrice[],String[] contractNo,String[] invoiceNo,
			String[] unit,String[] batch,String[] productCode,String[] note , String startJc, String ea,
			String endJc,String itemBillId,String[] materialstate)throws Exception { 
		/*
		 * 包名 : pkg_eudm_usedby_pur 包体 item_In_p
		 * apply_user_No 人工号  apply_date 申请时间  appyly_item_code 入库物料代码  apply_qty 申请数量
		 * ea 特殊入库数量  张、个数  plan_price 计划单价  in_price 实际单价 contract_no 合同编号 invoice_no发票号 certificate_no凭证编号
		 *  chk_user_no 检验员工号 mds_unit 单位 quality_code 质量编号 machine 机型
		 *  batch 批次 start_jc 起始架次 end_jc 结束架次 note 备注
		 */  
	    Connection conn = null;
		SingleConnection  sc = SingleConnection.getInstance();
//		ApplyIn applyIn	 = null; 
		Integer result_Int = 0;
		boolean results = true;
		String result_Str="";
		for(int i=0;i<arrivalCheckId.length;i++){ 
			
			conn = null;
			conn = SingleConnection.getInstance().getConnection();
			String call = "{call pkg_eudm_usedby_pur.item_In_p(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
			CallableStatement proc;
//			ResultSet rs = null;
			try {
				proc = conn.prepareCall(call);
				proc.setString(1, userCode);//入库申请人工作证号:   003865
				proc.setDate(2,  new java.sql.Date(new Date().getTime()));//申请时间(DATE):  2012-9-15 
				proc.setString(3, itemCode[i]);//入库物料编码: cj040586
				//申请数据:    1
				proc.setBigDecimal(4,new BigDecimal(applyNum[i].equals("")?"0":applyNum[i]));
				//特殊入库数量,张,个数:   (可选)
				proc.setBigDecimal(5, ea==null || ea.equals("") ? null : new BigDecimal(ea));
				proc.setBigDecimal(6,null);//计划价 (可选)
				//实际价: (可选)
				proc.setBigDecimal(7,inPrice[i]==null || inPrice[i].equals("") ?null:new BigDecimal(inPrice[i]));
				proc.setString(8,contractNo[i]);//合同号:  (可选)
				proc.setString(9,invoiceNo[i]);//发票号: (可选)
				proc.setString(10,null);//凭证编号: (可选)
				proc.setString(11,null);//检 验员工作证号: (可选)
				proc.setString(12,unit[i]);//计量单位:  千克
				proc.setString(13,null);//质量编号:  (可选)  
				proc.setString(14,productCode[i]);//机型:  (可选)
				proc.setString(15,batch[i]);//批次:   无/一批...
				proc.setString(16,startJc);//起始架次:  (可选)
				proc.setString(17,endJc);//终止架次:  (可选)
				proc.setString(18,note[i]);//备注:  (可选)
				proc.setString(19,itemBillId); //质量信息ID
				proc.setString(20,System.nanoTime()+""); //ID
				proc.setString(21,identity.getLoginUser().getIp());//IP 
				proc.setString(22,materialstate[i]);//入库类型 
				proc.setString(23,appraisalNo);//申请编号
				proc.registerOutParameter(24, oracle.jdbc.OracleTypes.INTEGER);
				proc.registerOutParameter(25, oracle.jdbc.OracleTypes.VARCHAR);
				proc.registerOutParameter(26, oracle.jdbc.OracleTypes.INTEGER);
				proc.execute();
				result_Int =  (Integer) proc.getObject(24); //0成功;1失败
				result_Str=(String)proc.getObject(25);
				if(result_Int==1){
//					results = false;
					throw new Exception(result_Str); //"库存系统没有此物资!"
				}
			} finally{
				sc.colseConnection(conn);
			} 
//			if(results){
			//入库表
			ApplyIn	applyIn = new ApplyIn();
			applyIn.setApplyDeptId(applyDeptId);//申请部门
			applyIn.setApplyeStatus('0');//申请单状态：0未提交，1已提交，2已通过
			applyIn.setApplyNo(appraisalNo);//申请编号
			applyIn.setApplyNum(new BigDecimal(applyNum[i].equals("")?"0":applyNum[i])); //申请数量
			applyIn.setCheckId(arrivalCheckId[i]);//关联检验表(T_ARRIVAL_CHECK)ID
			applyIn.setItemId(itemId[i]); //物料编码
			applyIn.setStartJc(startJc);
			applyIn.setEa(new BigDecimal(ea.equals("")?"0":ea)); //特殊入库数量
			applyIn.setEndJc(endJc);
			applyIn.setItemBillId(itemBillId);
			
			if(applyInId[i]!=null && !applyInId[i].equals("")){
				applyIn.setApplyInId(applyInId[i]);
				updateApplyIn(applyIn);
			}else{
				applyIn.setApplyDate(new Date());
				applyIn.setApplyer(applyer);
				save(applyIn);
			}
			String sql="update t_apply_in_no ain " +
					"set ain.flag='1' " +
					"where ain.apply_no='"+appraisalNo+"'";
			this.acDao.getHibernateSession().createSQLQuery(sql).executeUpdate();
			//检验表
			ArrivalCheck arrivalCheck=(ArrivalCheck)acDao.getHibernateSession().get(ArrivalCheck.class, arrivalCheckId[i]);
			arrivalCheck.setCheckStatus("7");
//			}
		} 
		return results;
	}

	public String saveItemDataBill(String id, String createDate,
			String potLife, String checkLife, String oilLife,
			String useLife, String guarantyLife, String supplyRegularNo,
			String orderNo, String vendorCode, String vendorName,String note,String itemPurpose,String supplyCertifica) {
		ItemDataBill itemDataBill = new ItemDataBill();
		int type = 1;//新建
		try {
			itemDataBill.setCreateDate(createDate==null || createDate.equals("")?null:df.parse(createDate));
			itemDataBill.setPotLife(potLife==null || potLife.equals("")?null:new BigDecimal(potLife));
			itemDataBill.setCheckLife(checkLife==null || checkLife.equals("")?null:new BigDecimal(checkLife));
			itemDataBill.setOilLife(oilLife==null || oilLife.equals("")?null:new BigDecimal(oilLife));
			itemDataBill.setUseLife(useLife==null || useLife.equals("")?null:new BigDecimal(useLife));
			itemDataBill.setGuarantyLife(guarantyLife==null || guarantyLife.equals("")?null:new BigDecimal(guarantyLife));
			itemDataBill.setSupplyRegularNo(supplyRegularNo);
			itemDataBill.setOrderNo(orderNo); 
			itemDataBill.setPotLifeDeadLine(potLife==null || createDate==null || createDate.equals("") ?null:DateUtils.addMonths(itemDataBill.getCreateDate(),Integer.parseInt(potLife))); 
			itemDataBill.setCheckLifeDeadLine(checkLife==null||checkLife.equals("") || createDate==null || createDate.equals("")?null:DateUtils.addMonths(itemDataBill.getCreateDate(),Integer.parseInt(checkLife)));
			itemDataBill.setOilLifeDeadLine(oilLife==null ||oilLife.equals("")|| createDate==null || createDate.equals("")?null:DateUtils.addMonths(itemDataBill.getCreateDate(),Integer.parseInt(oilLife)));
			itemDataBill.setUseLifeDeadLine(useLife==null ||useLife.equals("") || createDate==null || createDate.equals("")?null:DateUtils.addMonths(itemDataBill.getCreateDate(),Integer.parseInt(useLife)));
			itemDataBill.setGuarantyLifeDeadLine(guarantyLife==null || createDate==null || createDate.equals("")?null:DateUtils.addMonths(itemDataBill.getCreateDate(),Integer.parseInt(guarantyLife)));
			itemDataBill.setVendorCode(vendorCode);
			itemDataBill.setVendorName(vendorName);
			itemDataBill.setNote(note);
			itemDataBill.setItemPurpose(itemPurpose);
			itemDataBill.setSupplyCertifica(supplyCertifica);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		if(!id.equals("")){
			itemDataBill.setItemBillId(id);
			updateItemDataBill(itemDataBill);
			type = 2;//修改
		}else
		{
			id = System.nanoTime()+"";
			itemDataBill.setItemBillId(id);
			save(itemDataBill);
		}
		Connection conn = null;
		SingleConnection  sc = SingleConnection.getInstance();
		conn = null;
		conn = SingleConnection.getInstance().getConnection();
		String call = "{call pkg_eudm_usedby_pur.ITEM_DATE_BILL_In_p(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
		CallableStatement proc;
		ResultSet rs = null;
		String result = null;
		try {
			proc = conn.prepareCall(call);
			proc.setString(1, id);
			proc.setDate(2, null);
			proc.setDate(3,  null);
			proc.setBigDecimal(4,potLife==null || potLife.equals("")?null:new BigDecimal(potLife));
			proc.setDate(5,  potLife==null || createDate==null || createDate.equals("") ?null: new java.sql.Date(DateUtils.addMonths(itemDataBill.getCreateDate(),Integer.parseInt(potLife)).getTime()));
			proc.setBigDecimal(6,checkLife==null || checkLife.equals("")?null:new BigDecimal(checkLife));
			proc.setDate(7, checkLife==null ||  createDate==null || createDate.equals("")?null:new java.sql.Date(DateUtils.addMonths(itemDataBill.getCreateDate(),Integer.parseInt(checkLife)).getTime()));
			proc.setBigDecimal(8,oilLife==null || oilLife.equals("")?null:new BigDecimal(oilLife));
			proc.setDate(9, oilLife==null ||  createDate==null || createDate.equals("")?null: new java.sql.Date(DateUtils.addMonths(itemDataBill.getCreateDate(),Integer.parseInt(oilLife)).getTime()));
			proc.setBigDecimal(10,useLife==null || useLife.equals("")?null:new BigDecimal(useLife));
			proc.setDate(11, useLife==null ||  createDate==null || createDate.equals("")?null:new java.sql.Date(DateUtils.addMonths(itemDataBill.getCreateDate(),Integer.parseInt(useLife)).getTime()));
			proc.setBigDecimal(12,guarantyLife==null || guarantyLife.equals("")?null:new BigDecimal(guarantyLife));
			proc.setDate(13,guarantyLife==null ||  createDate==null || createDate.equals("")?null:new java.sql.Date(DateUtils.addMonths(itemDataBill.getCreateDate(),Integer.parseInt(guarantyLife)).getTime()));
			proc.setString(14,supplyRegularNo);
			proc.setString(15,supplyCertifica);
			proc.setString(16,vendorCode);
			proc.setString(17,orderNo);
			proc.setString(18,vendorName);  
			proc.setString(19,itemPurpose);  
			proc.setString(20,note);  
			proc.setInt(21,type); 
			proc.registerOutParameter(22, oracle.jdbc.OracleTypes.INTEGER);
			proc.registerOutParameter(23, oracle.jdbc.OracleTypes.VARCHAR);
			proc.execute();
			result = (String) proc.getObject(23); 
			if(result.equals("1")){
				throw new Exception("执行失败"); 
			}
		}catch(Exception e){
			
		}
		return id;
	}

	public ItemDataBill getItemDataBill(String id) {
		String sql  = " select obj from ItemDataBill obj where obj.itemBillId = '"+id+"' ";
		return (ItemDataBill) this.createQuery(sql).getSingleResult();
	}

	public String getArrvalCheckDetail(AdmissionTestVo vo) {
		String sql  = " select obj from ArrivalCheck obj where obj.arrivalCheckId = '"+vo.getArrivalCheckId()+"' ";
		ArrivalCheck ac=(ArrivalCheck) this.createQuery(sql).getSingleResult();
		if (ac != null) {
			try {
				BeanUtils.copyProperties(vo, ac);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			sql="select t.create_date,t.vendorname,t.arrival_date,t.furnacebatch,"
                +" m.materialitemcode,m.materialitemname,m.desingnation,m.materialstandard,m.techniccondition,m.delivery_status,m.demension, "
                +" u.truename"
                +" from T_REGISTRATION t inner join t_material m on (m.materialid=t.item_id or m.materialitemcode=t.itemcode) and t.id=:registrationid left join t_user u on t.creater_id=u.userid" ;
			
			Object[] objs=(Object[])this.acDao.getHibernateSession().createSQLQuery(sql)
			                                                 .setParameter("registrationid", vo.getRegistrationId())
			                                                 .setMaxResults(1).uniqueResult();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy/MM/dd");
			vo.setCreatedate(objs[0]==null?"":sdf.format(objs[0]));
			vo.setVendorName(objs[1]==null?"":objs[1].toString());
			vo.setArrivalDate(objs[2]==null?"":sdf.format(objs[2]));
			vo.setFurnacebatch(objs[3]==null?"":objs[3].toString());
	        vo.setItemCode(objs[4]==null?"":objs[4].toString());
			vo.setItemName(objs[5]==null?"":objs[5].toString());
			vo.setDesingnation(objs[6]==null?"":objs[6].toString());
			vo.setMaterialstandard(objs[7]==null?"":objs[7].toString());
			vo.setTechniccondition(objs[8]==null?"":objs[8].toString());
			vo.setDeliveryStatus(objs[9]==null?"":objs[9].toString());
			vo.setDemension(objs[10]==null?"":objs[10].toString());
			vo.setCreatename(objs[11]==null?"":objs[11].toString());
			
			
			vo.setYnRegistration(ac.getYnRegistration());//登记确认
			vo.setYnRegistrationDate(UtilDAOImp.dateToStr(ac.getYnRegistrationDate()==null?new Date():ac.getYnRegistrationDate(), "yyyy-MM-dd"));
			vo.setYnRegistrationCreator(ac.getYnRegistrationCreator()==null?identity.getLoginUser().getTruename():ac.getYnRegistrationCreator());
			vo.setOutCheck(ac.getOutCheck());//开箱检验
			vo.setOutcheckDate(UtilDAOImp.dateToStr(ac.getOutcheckDate(), "yyyy-MM-dd"));
			vo.setOutcheckCreator(ac.getOutcheckCreator());
			vo.setPleaseCheck(ac.getPleaseCheck());//请检
			vo.setPleasecheckDate(UtilDAOImp.dateToStr(ac.getPleasecheckDate(), "yyyy-MM-dd"));
			vo.setPleasecheckCreator(ac.getPleasecheckCreator());
			vo.setOneCheck(ac.getOneCheck() );//表面初检
			vo.setOnecheckDate(UtilDAOImp.dateToStr(ac.getOnecheckDate(), "yyyy-MM-dd"));
			vo.setOnecheckCreator(ac.getOnecheckCreator());
			vo.setSampling(ac.getSampling() );//取样
			vo.setSamplingDate(UtilDAOImp.dateToStr(ac.getSamplingDate(), "yyyy-MM-dd"));
			vo.setSamplingCreator(ac.getSamplingCreator());
			vo.setTest(ac.getTest() );//委托试验
			vo.setTestDate(UtilDAOImp.dateToStr(ac.getTestDate(), "yyyy-MM-dd"));
			vo.setTestCreator(ac.getTestCreator());
			vo.setSendSampling(ac.getSendSampling());//送样
			vo.setSendsamplingDate(UtilDAOImp.dateToStr(ac.getSendsamplingDate(), "yyyy-MM-dd"));
			vo.setSendsamplingCreator(ac.getSendsamplingCreator());
			vo.setTestReport(ac.getTestReport());//试验报告
			vo.setTestreportDate(UtilDAOImp.dateToStr(ac.getTestreportDate(), "yyyy-MM-dd"));
			vo.setTestreportCreator(ac.getTestreportCreator());
			vo.setYnStamped(String.valueOf(ac.getYnStamped()));//打钢印
			//vo.setYnSpectro(String.valueOf(ac.getYnSpectro()));//分光 (已与磨火花合并,不在使用)
			vo.setYnSpark(String.valueOf(ac.getYnSpark()));//分光/磨火花
			vo.setYnCheck(String.valueOf(ac.getYnCheck()));//表面检查
			vo.setSprayWord(ac.getSprayWord());//喷字
			vo.setYnSeal(String.valueOf(ac.getYnSeal()));//油封
			vo.setYnSealDate(UtilDAOImp.dateToStr(ac.getYnSealDate(), "yyyy-MM-dd"));
			vo.setYnSealCreator(ac.getYnSealCreator());
			vo.setFailureHandling(ac.getFailureHandling());//不合格处理
			vo.setFailurehandlingDate(UtilDAOImp.dateToStr(ac.getFailurehandlingDate(), "yyyy-MM-dd"));
			vo.setFailurehandlingCreator(ac.getFailurehandlingCreator());
		}
		JSONObject obj = new JSONObject();
		obj.element("success", true).element("data", JSONObject.fromObject(vo));
		return obj.toString();
	}
	public ArrivalCheck getArrvalCheckDetailByRegistrationId(String id) {
		String sql  = " select obj from ArrivalCheck obj where obj.registrationId = '"+id+"' ";
		return (ArrivalCheck) this.createQuery(sql).getSingleResult();
	}


	public String saveArrivalCheckDetil(AdmissionTestVo vo) {
		// TODO Auto-generated method stub
		ArrivalCheck ac=(ArrivalCheck) this.getHibernateSession().get(ArrivalCheck.class, vo.getArrivalCheckId());
		ac.setYnRegistration(vo.getYnRegistration());//登记确认
		ac.setYnRegistrationDate(UtilDAOImp.strToNoneDate(vo.getYnRegistrationDate(), "yyyy-MM-dd"));
		ac.setYnRegistrationCreator(vo.getYnRegistrationCreator());
		ac.setOutCheck(vo.getOutCheck());//开箱检验
		ac.setOutcheckDate(UtilDAOImp.strToNoneDate(vo.getOutcheckDate(), "yyyy-MM-dd"));
		ac.setOutcheckCreator(vo.getOutcheckCreator());
		ac.setPleaseCheck(vo.getPleaseCheck());//请检
		ac.setPleasecheckDate(UtilDAOImp.strToNoneDate(vo.getPleasecheckDate(), "yyyy-MM-dd"));
		ac.setPleasecheckCreator(vo.getPleasecheckCreator());
		ac.setOneCheck(vo.getOneCheck());//表面初检
		ac.setOnecheckDate(UtilDAOImp.strToNoneDate(vo.getOnecheckDate(), "yyyy-MM-dd"));
		ac.setOnecheckCreator(vo.getOnecheckCreator());
		ac.setTest(vo.getTest());//委托试验
		ac.setTestDate(UtilDAOImp.strToNoneDate(vo.getTestDate(), "yyyy-MM-dd"));
		ac.setTestCreator(vo.getTestCreator());
		ac.setSampling(vo.getSampling());//取样
		ac.setSamplingDate(UtilDAOImp.strToNoneDate(vo.getSamplingDate(), "yyyy-MM-dd"));
		ac.setSamplingCreator(vo.getSamplingCreator());
		ac.setSendSampling(vo.getSendSampling());//送样
		ac.setSendsamplingDate(UtilDAOImp.strToNoneDate(vo.getSendsamplingDate(), "yyyy-MM-dd"));
		ac.setSendsamplingCreator(vo.getSendsamplingCreator());
		ac.setTestReport(vo.getTestReport());//试验报告
		ac.setTestreportDate(UtilDAOImp.strToNoneDate(vo.getTestreportDate(), "yyyy-MM-dd"));
		ac.setTestreportCreator(vo.getTestreportCreator());
		ac.setYnStamped(vo.getYnStamped());//打钢印
		ac.setYnStampedDate(UtilDAOImp.strToNoneDate(vo.getYnStampedDate(), "yyyy-MM-dd"));
		ac.setYnStampedCreator(vo.getYnStampedCreator());
		ac.setYnSpark(vo.getYnSpark());//分光/磨火花
		ac.setYnsparkDate(UtilDAOImp.strToNoneDate(vo.getYnsparkDate(), "yyyy-MM-dd"));
		ac.setYnsparkCreator(vo.getYnsparkCreator());
		ac.setYnCheck(vo.getYnCheck());//表面检查
		ac.setYnCheckDate(UtilDAOImp.strToNoneDate(vo.getYnCheckDate(), "yyyy-MM-dd"));
		ac.setYnCheckCreator(vo.getYnCheckCreator());
		ac.setSprayWord(vo.getSprayWord());//喷字
		ac.setSpraywordDate(UtilDAOImp.strToNoneDate(vo.getSpraywordDate(), "yyyy-MM-dd"));
		ac.setSpraywordCreator(vo.getSpraywordCreator());
		ac.setYnSeal(vo.getYnSeal());//油封 
		ac.setYnSealDate(UtilDAOImp.strToNoneDate(vo.getYnSealDate(), "yyyy-MM-dd"));
		ac.setYnSealCreator(vo.getYnSealCreator());
		ac.setFailureHandling(vo.getFailureHandling());//不合格处理
		ac.setFailurehandlingDate(UtilDAOImp.strToNoneDate(vo.getFailurehandlingDate(), "yyyy-MM-dd"));
		ac.setFailurehandlingCreator(vo.getFailurehandlingCreator());
		
		getArrivalCheck_CheckStatus(ac);//设备当前状态
		ac.setExplain(vo.getExplain());//说明
		return "{success:true,msg:'保存成功!'}";
	}

	/**
	 * 判断当前状态并赋值
	 * @param ac
	 * @return
	 */
	private ArrivalCheck getArrivalCheck_CheckStatus(ArrivalCheck ac){
		
		if(ac.getFailureHandling()!=null&&ac.getFailureHandling().equals("1")){//不合格处理
			ac.setCheckStatus("24");
		}else if(ac.getFailureHandling()!=null&&ac.getFailureHandling().equals("2")) {
			ac.setCheckStatus("-24");
		}else if(ac.getYnSeal()!=null&&ac.getYnSeal().equals("1")) {//油封 
			ac.setCheckStatus("22");
		}else if(ac.getYnSeal()!=null&&ac.getYnSeal().equals("2")){
			ac.setCheckStatus("-22");
		}else if(ac.getYnSeal()!=null&&ac.getYnSeal().equals("3")){
			ac.setCheckStatus("+22");
		}else if(ac.getSprayWord()!=null&&ac.getSprayWord().equals("1")){//喷字
			ac.setCheckStatus("21");
		}else if(ac.getSprayWord()!=null&&ac.getSprayWord().equals("2")){
			ac.setCheckStatus("-21");
		}else if(ac.getSprayWord()!=null&&ac.getSprayWord().equals("3")){
			ac.setCheckStatus("+21");
		}else if(ac.getYnCheck()!=null&&ac.getYnCheck().equals("1")){//表面检查
			ac.setCheckStatus("20");
		}else if(ac.getYnCheck()!=null&&ac.getYnCheck().equals("2")){
			ac.setCheckStatus("-20");
		}else if(ac.getYnCheck()!=null&&ac.getYnCheck().equals("3")){
			ac.setCheckStatus("+20");
		}else if(ac.getYnSpark()!=null&&ac.getYnSpark().equals("1")){//分光/磨火花
			ac.setCheckStatus("19");
		}else if(ac.getYnSpark()!=null&&ac.getYnSpark().equals("2")){
			ac.setCheckStatus("-19");
		}else if(ac.getYnSpark()!=null&&ac.getYnSpark().equals("3")){
			ac.setCheckStatus("+19");
		}else if(ac.getYnStamped()!=null&&ac.getYnStamped().equals("1")){//打钢印
			ac.setCheckStatus("18");
		}else if(ac.getYnStamped()!=null&&ac.getYnStamped().equals("2")){
			ac.setCheckStatus("-18");
		}else if(ac.getYnStamped()!=null&&ac.getYnStamped().equals("3")){
			ac.setCheckStatus("+18");
		}else if(ac.getTestReport()!=null&&ac.getTestReport().equals("1")){//试验报告
			ac.setCheckStatus("17");
		}else if(ac.getTestReport()!=null&&ac.getTestReport().equals("2")){
			ac.setCheckStatus("-17");
		}else if(ac.getTestReport()!=null&&ac.getTestReport().equals("3")){
			ac.setCheckStatus("+17");
		}else if(ac.getSendSampling()!=null&&ac.getSendSampling().equals("1")){//送样
			ac.setCheckStatus("16");
		}else if(ac.getSendSampling()!=null&&ac.getSendSampling().equals("2")){
			ac.setCheckStatus("-16");
		}else if(ac.getSendSampling()!=null&&ac.getSendSampling().equals("3")){
			ac.setCheckStatus("+16");
		}else if(ac.getSampling()!=null&&ac.getSampling().equals("1")){//取样
			ac.setCheckStatus("15");
		}else if(ac.getSampling()!=null&&ac.getSampling().equals("2")){
			ac.setCheckStatus("-15");
		}else if(ac.getSampling()!=null&&ac.getSampling().equals("3")){
			ac.setCheckStatus("+15");
		}else if(ac.getTest()!=null&&ac.getTest().equals("1")){//委托试验
			ac.setCheckStatus("14");
		}else if(ac.getTest()!=null&&ac.getTest().equals("2")){
			ac.setCheckStatus("-14");
		}else if(ac.getTest()!=null&&ac.getTest().equals("3")){
			ac.setCheckStatus("+14");
		}else if(ac.getOneCheck()!=null&&ac.getOneCheck().equals("1")){//表面初检
			ac.setCheckStatus("13");
		}else if(ac.getOneCheck()!=null&&ac.getOneCheck().equals("2")){
			ac.setCheckStatus("-13");
		}else if(ac.getPleaseCheck()!=null&&ac.getPleaseCheck().equals("1")){//请检
			ac.setCheckStatus("12");
		}else if(ac.getPleaseCheck()!=null&&ac.getPleaseCheck().equals("2")){
			ac.setCheckStatus("-12");
		}else if(ac.getOutCheck()!=null&&ac.getOutCheck().equals("1")){//开箱检验
			ac.setCheckStatus("11");
		}else if(ac.getOutCheck()!=null&&ac.getOutCheck().equals("2")){
			ac.setCheckStatus("-11");
		}else if(ac.getYnRegistration()!=null&&ac.getYnRegistration().equals("1")){//登记确认
			ac.setCheckStatus("10");
		}else  if(ac.getYnRegistration()!=null&&ac.getYnRegistration().equals("2")){
			ac.setCheckStatus("-10");
		}

		return ac;
	}

	public String delApplyIn(AdmissionTestVo vo) {
		String sql="update t_apply_in_no set flag='0' where Apply_No='"+vo.getApplyNo()+"'";
		this.acDao.getHibernateSession().createSQLQuery(sql).executeUpdate();
		return null;
	}
	/**
	 * 判断当前用户是否领导
	 * @return
	 */
	public boolean isNotLeader(){
		String roleId = RoleEnum.LEADER.getValue();
		String sql = "select DISTINCT t.ROLEID " +
				"from T_ROLE_USER t " +
				"where t.USERID='"+identity.getLoginUser().getUserid()+"' " +
				"and t.ROLEID = '"+roleId+"'";
		List list = this.getHibernateSession().createSQLQuery(sql).list();
		if(list.size()==0){
			return true;
		}else{
			return false;
		}
	}
}
