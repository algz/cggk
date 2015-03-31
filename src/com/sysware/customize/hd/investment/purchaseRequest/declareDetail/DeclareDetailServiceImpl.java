package com.sysware.customize.hd.investment.purchaseRequest.declareDetail;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Session;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.entity.Department;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.purchaseRequest.declare.Declare;
import com.sysware.customize.hd.investment.purchaseRequest.declare.DeclareService;
import com.sysware.customize.hd.investment.purchaseRequest.declarePlan.DeclarePlan;
import com.sysware.customize.hd.investment.purchaseRequest.declarePlan.DeclarePlanDao;
import com.sysware.customize.hd.investment.purchaseRequest.declarePlan.DeclarePlanDetil;

@Name("declareDetail_DeclareDetailServiceImpl")
public class DeclareDetailServiceImpl implements DeclareDetailService {
    
	@In(value="declare_DeclareServiceImpl",create = true)
	DeclareService declareServiceImpl;
	@In(create = true)
	Identity identity; 
	@In(value="declarePlan_DeclarePlanDaoImpl",create = true)
	DeclarePlanDao declarePlanDaoImpl;
	
	
	@Transactional
	public void saveDeclareDetail(String declareId,
			String declareDetailId, String materialid[], String quantity[]/*数量*/,
			String use[], String useDate[], String amount[], String declareType[],
			String materialCatalogName[], String fileName[], String fileId[],String  userId,
			String departmentId,String[] reportType,String[] remark,String[] taskno,String[] contactPerson,String[] contactTelephone,
			String amountSource,String costNum) {
		Declare declare = null; 
		DeclareDetail declareDetail = null; 
		BigDecimal count = new BigDecimal("0");
		Date now = new Date();
		for(int i=0;i<amount.length;i++){
			count = count.add(new BigDecimal((amount[i].equals(""))?"0":amount[i]));
		}
		if (StringUtils.isNotBlank(declareId)) {
			declare = declareServiceImpl.getDeclareById(declareId); 
			declare.setUpdateDate(now);
//			declare.setAmount(declare.getAmount().add(count));
		}else {
			declare = new Declare();
			declare.setCreateDate(now);
			declare.setDeclareDate(now);
			declare.setUpdateDate(now);
//			declare.setDeclareCode("9"); 
			declare.setDeclareCode(getCode());
			declare.setEditor(userId);
			declare.setDepartmentId(departmentId); 
//			declare.setAmount(count);
			declare.setStatus("1");// 待审批状态  
		} 
		declare.setAmountSource(amountSource);
		declare.setCostNum(costNum);
		declare.setAmount(count);
		BigDecimal declareQuntity=declare.getQuantity()==null?BigDecimal.ZERO:declare.getQuantity();
		declare.setQuantity(declareQuntity.add(new BigDecimal(materialid.length)));//申报记录项数
		declare = getDeclareService().saveDeclare(declare);
		for(int i=0;i<materialid.length;i++){
			if (StringUtils.isNotBlank(declareDetailId)) {
				declareDetail = getDeclareDetails(declareDetailId);
			}else  { 
				declareDetail = new DeclareDetail(); 
				declareDetail.setDeclareDetailStatus("0");// 未提交状态
			}
			declareDetail.setMaterialid(materialid[i]);
			declareDetail.setQuantity(new BigDecimal(quantity[i])); 
			if(useDate!=null)
			try {
				declareDetail.setUseDate(new SimpleDateFormat("yyyy-MM-dd")
						.parse(useDate[i]));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			declareDetail.setAmount(new BigDecimal(amount[i]==""?"0":amount[i]));
			if(declareType[i].equals("计划内"))
				declareDetail.setDeclareType("1");
			else if(declareType[i].equals("应急"))
				declareDetail.setDeclareType("2");
			else if(declareType[i].equals("非应急"))
				declareDetail.setDeclareType("3"); 
			if(reportType[i].equals("可行性报告")){
				declareDetail.setReportType("1");
			}else if(reportType[i].equals("需求报告")){
				declareDetail.setReportType("2");
			}else if(reportType[i].equals("申报依据")){
				declareDetail.setReportType("3");
			}
			declareDetail.setFileName(fileName[i]);
			declareDetail.setFileId(fileId[i]);
			declareDetail.setUse(use[i]);
			declareDetail.setMaterialCatalogName(materialCatalogName[i]); 
			declareDetail.setDeclareId(declare.getDeclareId());
			declareDetail.setTaskno(taskno[i]);
			declareDetail.setRemark(remark[i]);
			declareDetail.setContactPerson(contactPerson[i]);
			declareDetail.setContactTelephone(contactTelephone[i]);
			if (StringUtils.isNotBlank(declareDetailId)) {
				getDeclareDetailDao().update(declareDetail);
			}else
			    getDeclareDetailDao().save(declareDetail);
		}   
	}

	public List<DeclareDetail> getDeclareDetailsByDeclareId(String declareId,
			int start, int limit,String declareDetailStatus) {
		return this.getDeclareDetailDao().getByDeclareId(declareId, start,
				limit,declareDetailStatus);
	}

	public long countDeclareDetailsByDeclareId(String declareId,String declareDetailStatus) {
		return this.getDeclareDetailDao().countByDeclareId(declareId,declareDetailStatus);
	}

	@Transactional
	public void batchDeleteDeclareDetailsByIds(String[] declareDetailIds) {
		this.getDeclareDetailDao().batchDeleteByIds(declareDetailIds);
	}

	@Transactional
	public void batchDeleteDeclareDetailsByDeclareId(String declareId) {
		this.getDeclareDetailDao().batchDeleteByDeclareId(declareId);
	}

	private DeclareDetailDao getDeclareDetailDao() {
		return (DeclareDetailDao) Component
				.getInstance("declareDetail_DeclareDetailDaoImpl");
	}

	private DeclareService getDeclareService() {
		return (DeclareService) Component.getInstance(
				"declare_DeclareServiceImpl", true);
	}

	public DeclareDetail getDeclareDetails(String declareDetailId) {
		return this.getDeclareDetailDao().get(declareDetailId);
	}

	public List getByCondition(DeclareDetailCondition condition) {
		return this.getDeclareDetailDao().getByCondition(condition);
	}

	public long countByCondition(DeclareDetailCondition condition) {
		return this.getDeclareDetailDao().countByByCondition(condition);
	}

	public List<Object[]> getGridDataByType(DeclareDetailVo declareDetailVo) {
		return this.getDeclareDetailDao().getGridDataByType(declareDetailVo);
	}
	public BigDecimal getGridDataByTypeCount(DeclareDetailVo declareDetailVo){
		return this.getDeclareDetailDao().getGridDataByTypeCount(declareDetailVo);
	}

	@Transactional
	public String updateDeclareDetail(DeclareDetailVo vo) {
		// TODO Auto-generated method stub
		return this.getDeclareDetailDao().updateDeclareDetail(vo);
	}

	@Transactional
	public void saveMaterialToDeclarePlan(DeclareDetailVo vo)throws Exception{
//		1.查询关联关系表t_declareplan_detil.declareplan_id申报计划id是否存在数据
//		如果存在，则直接添加关联关系表数据，以及更新记录表和计划表里的数据
//		如果不存在，则需要new记录表--》new记录明细表--》new关联关系表

		Session session = this.getDeclareDetailDao().getHibernateSession();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Long  count = this.getDeclareDetailDao().findDeclarePlanDetailById(vo.getDeclareplanID());
		if(count==0){//不存在关联关系数据
//				1.保存t_declare申报记录表
			Declare d = new Declare();
			d.setCreateDate(df.parse(df.format(new Date())));
			d.setDeclareDate(df.parse(df.format(new Date())));
			d.setUpdateDate(df.parse(df.format(new Date())));
			d.setStatus("3");
			d.setQuantity((d.getQuantity()==null?BigDecimal.ZERO:d.getQuantity()).add(BigDecimal.ONE));
			d.setAmount(vo.getAmount().equals("")?new BigDecimal("0"):new BigDecimal(vo.getAmount()));
			d.setDepartmentId(this.getDeclareDetailDao().getDepartmentIdByUserId(identity.getLoginUser().getUserid().toString()));
			d.setEditor(identity.getLoginUser().getUserid().toString());
			d.setDeclareCode(getCode());
			d.setGenerator("1");
			session.save(d);
			
//				2.保存t_declare_detil申报记录明细表
			DeclareDetail dd = new DeclareDetail();
			dd.setMaterialid(vo.getMaterialid());
			dd.setMaterialCatalogName(vo.getMaterialCatalogName());
			dd.setQuantity(vo.getQuantity().equals("")?new BigDecimal(""):new BigDecimal(vo.getQuantity()));
			dd.setAmount(vo.getAmount().equals("")?new BigDecimal("0"):new BigDecimal(vo.getAmount()));
			dd.setUse(vo.getUse());
			dd.setUseDate(df.parse(vo.getUseDate()));
//			dd.setDeclareId(((Declare)session.get(Declare.class, d.getDeclareId())).getDeclareId());
			dd.setDeclareId(d.getDeclareId());
			dd.setDeclareDetailStatus("3");//与别的数据保持一致，表示成功通过申报
			dd.setDeclareType(vo.getDeclareType());
			dd.setRemark(vo.getRemark());
			dd.setTaskno(vo.getTaskno());
			dd.setContactPerson(vo.getContactPerson());
			dd.setContactTelephone(vo.getContactTelephone());
			session.save(dd);
			
//				3.保存T_DECLAREPLAN_DETIL申报计划明细表
			DeclarePlanDetil dpd = new DeclarePlanDetil();
//			dpd.setDeclareDetilId(((DeclareDetail)session.get(DeclareDetail.class, dd.getDeclareDetailId())).getDeclareDetailId());
			dpd.setDeclareDetilId(dd.getDeclareDetailId());
			dpd.setDeclarePlanId(vo.getDeclareplanID());
			dpd.setStatus("1");
			session.save(dpd);
			
//				4.更新t_declareplan申报计划表
			DeclarePlan dp = new DeclarePlan();
			dp = (DeclarePlan)session.get(DeclarePlan.class, vo.getDeclareplanID());
			dp.setQuantity(BigDecimal.ONE);
			dp.setAmount(vo.getAmount().equals("")?new BigDecimal("0"):new BigDecimal(vo.getAmount()));
			dp.setStatus("1");
			session.update(dp);
			
		}else{//存在关联关系数据
			String declareId = this.getDeclareDetailDao().getDeclareIdByPlanId(vo.getDeclareplanID());
			BigDecimal amount = vo.getAmount().equals("")?new BigDecimal("0"):new BigDecimal(vo.getAmount());
				
//			1.保存t_declare_detil申报记录明细表
			DeclareDetail dd = new DeclareDetail();
			dd.setMaterialid(vo.getMaterialid());
			dd.setMaterialCatalogName(vo.getMaterialCatalogName());
			dd.setQuantity(vo.getQuantity().equals("")?new BigDecimal(""):new BigDecimal(vo.getQuantity()));
			dd.setAmount(amount);
			dd.setUse(vo.getUse());
			dd.setUseDate(df.parse(vo.getUseDate()));
//			dd.setDeclareId(((Declare)session.get(Declare.class, d.getDeclareId())).getDeclareId());
			dd.setDeclareId(declareId);
			dd.setDeclareDetailStatus("3");//与别的数据保持一致，表示成功通过申报
			dd.setDeclareType(vo.getDeclareType());
			dd.setRemark(vo.getRemark());
			dd.setTaskno(vo.getTaskno());
			dd.setContactPerson(vo.getContactPerson());
			dd.setContactTelephone(vo.getContactTelephone());
			session.save(dd);
			
//				2.保存T_DECLAREPLAN_DETIL申报计划明细表
			DeclarePlanDetil dpd = new DeclarePlanDetil();
//			dpd.setDeclareDetilId(((DeclareDetail)session.get(DeclareDetail.class, dd.getDeclareDetailId())).getDeclareDetailId());
			dpd.setDeclareDetilId(dd.getDeclareDetailId());
			dpd.setDeclarePlanId(vo.getDeclareplanID());
			dpd.setStatus("1");
			session.save(dpd);
			
//				3.更新t_declareplan申报计划表
			DeclarePlan dp = new DeclarePlan();
			dp = (DeclarePlan)session.get(DeclarePlan.class, vo.getDeclareplanID());
			dp.setQuantity(dp.getQuantity().add(BigDecimal.ONE));
			dp.setAmount(dp.getAmount().add(amount));
			dp.setStatus("1");
			session.update(dp);
			
//			4.更新t_declare申报记录表
			Declare d = new Declare();
			d = (Declare)session.get(Declare.class, declareId);
			d.setQuantity((d.getQuantity()==null?BigDecimal.ZERO:d.getQuantity()).add(BigDecimal.ONE));
			d.setAmount(d.getAmount().add(amount));
			session.update(d);
		}
		
		
	}
	
	public List<Department> getDeptypeList() {
		try {
			List<Object[]> list = declarePlanDaoImpl.getDeptypeList();
			List<Department> retList = new ArrayList<Department>();
			for(Object[] obj : list){
				Department dep = new Department();
				dep.setDepcode(String.valueOf(obj[0]));
				dep.setDepartmetname(String.valueOf(obj[1]));
				retList.add(dep);
			}
			return retList;
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<Department>();
		}
	}

	private String getCode(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		Calendar c = Calendar.getInstance();
		String code = "CG" + sdf.format(c.getTime())+"-";
		String sql = "SELECT NVL(LPAD(MAX(SUBSTR(d.declare_code,10,4))+1,4,'0'),'0001') "+
                     "from t_declare d where TO_CHAR(SYSDATE,'yyyyMM')=SUBSTR(d.declare_code,3,6)";
		code += (String)declarePlanDaoImpl.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		return code;
	}

	public List getOut_Num(DeclareDetailVo vo) {
		String sql=" From MDS_PLAN_OUT_RECORD T WHERE T.DECLARE_DATIL_ID='"+vo.getDeclareDetailId()+"'";
		BigDecimal count=(BigDecimal)declarePlanDaoImpl.getHibernateSession().createSQLQuery("select count(1) "+sql).uniqueResult();
		vo.setCount(count.toString());
		return declarePlanDaoImpl.getHibernateSession().createSQLQuery("select t.OUT_QTY,T.CREATION_DATE "+sql)
		                         .setFirstResult(vo.getStart())
		                         .setMaxResults(vo.getLimit())
		                         .list();
	}
}
