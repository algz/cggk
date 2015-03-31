package com.sysware.customize.hd.investment.purchaseRequest.declareDetail.ImportData;


import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import jxl.Sheet;
import jxl.Workbook;

import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.lang.ObjectUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.transform.Transformers;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.base.dao.GroleUserDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalog;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAOImp;
import com.sysware.customize.hd.investment.general.ExcelUtils;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContract;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.Purchase;
import com.sysware.customize.hd.investment.purchaseRequest.declareDetail.DeclareDetail;
import com.sysware.customize.hd.investment.purchaseRequest.declarePlan.DeclarePlan;
import com.sysware.customize.hd.investment.purchaseRequest.declarePlan.DeclarePlanDetil;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.ProcurementPlan;

@Name("declareDetailImportDataServiceImp")
public class DeclareDetailImportDataServiceImp implements DeclareDetailImportDataService {

	
	@In(create = true, value = "declareDetailImportDataDAOImp")
	private DeclareDetailImportDataDAO declareDetailImportDataDAO;
	
	/**
	 * 导入数据
	 * @param importType 生成方式:1生成计划至合同;2生成计划
	 * @throws Exception 
	 */
	@Transactional
	public void ImportData(Workbook workbook, List<String> bankExist,HttpServletRequest request) throws ImportExcelFileException, FileUploadException,Exception {

		String[] mCols = {"loginname","plancode","planname","materialcode","物资名称","牌号","规格","交货状态","技术条件","计量单位","actualnumber","createtime","usedate","remark"};//{ "contractno","materialcode", "", "", "","","","contractnum","arrivalnum","","price","amount"};
		

		 //获取当前登录用户信息
		Cookie cookies[] = request.getCookies();
		String login_userid = null;
		for (int i = 0; i < cookies.length; i++) {
			Cookie cookie = cookies[i];
			if ("userid".equals(cookie.getName()))
				login_userid = cookie.getValue();
		}
		String sql = "select u.Instcode from  t_user u where u.userid='"+login_userid+"'";
		String login_departmentid=(declareDetailImportDataDAO.getDao().getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult()).toString();
		
		
		String importType=request.getParameter("importType");//1未完成的合同;2未完成的计划
//		String import_userid = login_userid;//request.getParameter("userid");//用户ID固定:系统管理员
		
		String declarePlanName=request.getParameter("declarePlanName");//申报计划名称
		
		
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		
		//获取直接采购方式的供应商
		sql="select v.* from  t_vendor v where v.vendorcode='"+request.getParameter("vendorid")+"'";
		Vendor vendor=(Vendor)declareDetailImportDataDAO.getDao().getHibernateSession().createSQLQuery(sql)
			                                                         .addEntity("v",Vendor.class)
			                                                         .setMaxResults(1).uniqueResult();//.get(Vendor.class,vendorid);
		if(vendor==null){
			throw new ImportExcelFileException("供应商ID不正确!");
		}

			boolean flag=true;
			List<String> planCheckList=new ArrayList<String>();
			List<String> actualnumberList=new ArrayList<String>();
			List<String> dateList=new ArrayList<String>();
			List<String> nonUniqueResultList=new ArrayList<String>();
			List<String> materialCountList=new ArrayList<String>();
			List<String> nonUniquePlanList=new ArrayList<String>();
			List<String> nonMaterialCatalogList=new ArrayList<String>();
		for (int i = 0; i < 1/*workbook.getNumberOfSheets()*/; i++) {
			Sheet sheet = workbook.getSheet(i);

			System.out.println("数据校验...");
			for (int m = 1; m < sheet.getRows(); m++) {//m对应Excel行循环
				DeclareDetailImportVo importVo = ExcelUtils.processRow(sheet.getRow(m), mCols,DeclareDetailImportVo.class);
				// 检验物资编码正确性
				String materialid=(String)declareDetailImportDataDAO.getDao().getHibernateSession().createSQLQuery("select M.MATERIALID from t_material m where m.materialitemcode=:materialitemcode")
                                                                    .setParameter("materialitemcode", importVo.getMaterialcode())
                                                                    .setMaxResults(1).uniqueResult();
				if (materialid==null||materialid.equals("")){
					bankExist.add(String.valueOf(m+1));//记录行号
					flag=false;
				}
				
				//检验物料大类不为空
				MaterialCatalog materialCatalog=UtilDAOImp.getMaterialCatalogByMaterialID(declareDetailImportDataDAO.getDao().getHibernateSession(), materialid);
				if(materialCatalog==null||materialCatalog.getMaterialtypename().equals("")){
					nonMaterialCatalogList.add(String.valueOf(m+1));
					flag=false;
				}
				
				//检验一个采购计划中不允许重复的物资存在
				sql="select count(distinct t.plancode) from declaredetailimport_temp t where t.materialcode=:materialcode and t.plancode=:plancode and t.actualnumber=:actualnumber and t.usedate=:usedate";
				BigDecimal count=null;
				try{
					count=(BigDecimal)declareDetailImportDataDAO.getDao().getHibernateSession().createSQLQuery(sql)
					                                            .setParameter("materialcode", importVo.getMaterialcode())
					                                            .setParameter("plancode", importVo.getPlancode())
					                                            .setParameter("actualnumber", importVo.getActualnumber())
					                                            .setParameter("usedate", sdf.parse(importVo.getUsedate()))
					                                            .uniqueResult();
				}catch(ParseException e){
					dateList.add(String.valueOf(m+1));
					flag=false;
					e.printStackTrace();
				}
				if(!count.equals(BigDecimal.ZERO)){
					materialCountList.add(String.valueOf(m+1));
					flag=false;
				}
				
				//检验建议采购量不为空
				if(importVo.getActualnumber()==null){
					actualnumberList.add(String.valueOf(m+1));
					flag=false;
				}
				
				//采购计划重复检验(系统)
				sql="select count(distinct pur.purchasecode) from t_purchase pur where pur.purchasecode=:purchasecode";
				count=(BigDecimal)declareDetailImportDataDAO.getDao().getHibernateSession().createSQLQuery(sql)
				                                                     .setParameter("purchasecode", importVo.getPlancode())
				                                                     .uniqueResult();
				if(!count.equals(BigDecimal.ZERO)){
					nonUniquePlanList.add(String.valueOf(m+1));
					flag=false;
				}
				
				//检验采购计划唯一性
				sql="select distinct t.planname,t.loginname,t.createtime from declaredetailimport_temp t where t.plancode='"+importVo.getPlancode()+"'";
				Object[] objs=null;
				try{
				    objs=(Object[])declareDetailImportDataDAO.getDao().getHibernateSession().createSQLQuery(sql).uniqueResult();
				}catch(org.hibernate.NonUniqueResultException e){
					nonUniqueResultList.add(String.valueOf(m+1));
					flag=false;
					e.printStackTrace();
					
				}
				if(objs!=null&&objs.length!=1&&!objs[0].toString().equals(importVo.getPlanname())&&!objs[1].toString().equals(importVo.getLoginname())){
                	planCheckList.add(String.valueOf(m+1));
                	flag=false;
				}
				
				if(flag){
					//临时数据加入临时表
					sql="insert into declaredetailimport_temp (LOGINNAME,PLANCODE,PLANNAME,MATERIALID,MATERIALCODE,ACTUALNUMBER,CREATETIME,USEDATE,REMARK) values(:loginname,:plancode,:planname,:materialid,:materialcode,:actualnumber,:createtime,:usedate,:remark)";
					try {
						declareDetailImportDataDAO.getDao().getHibernateSession().createSQLQuery(sql)
						                                   .setParameter("loginname", importVo.getLoginname())
						                                   .setParameter("plancode", importVo.getPlancode())
						                                   .setParameter("planname", importVo.getPlanname())
						                                   .setParameter("materialid", materialid)
						                                   .setParameter("materialcode", importVo.getMaterialcode())
						                                   .setParameter("actualnumber", new BigDecimal(importVo.getActualnumber()))
						                                   .setParameter("createtime", sdf.parse(importVo.getCreatetime()))
						                                   .setParameter("usedate", sdf.parse(importVo.getUsedate()))
						                                   .setParameter("remark", importVo.getRemark())
						                                   .executeUpdate();
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
			}
			
			if(!flag){
				StringBuilder errorInfo=new StringBuilder();
				if (bankExist.size() > 0) {
					errorInfo.append("第"+bankExist.toString()+"行物料找不到!\n");
				}
				if (planCheckList.size() > 0) {
					errorInfo.append("第"+planCheckList.toString()+"行计划编号,计划名称,工号,生成时间不唯一!\n");
				}else if(actualnumberList.size()>0){
					errorInfo.append("第"+actualnumberList.toString()+"行建议采购量找不到!\n");
				}else if(dateList.size()>0){
					errorInfo.append("第"+dateList.toString()+"行生成日期,需求日期找不到!\n");
				}else if(nonUniqueResultList.size()>0){
					errorInfo.append("第"+nonUniqueResultList.toString()+"行计划名称,人员,生成日期不唯一!\n");
				}else if(materialCountList.size()>0){
					errorInfo.append("第"+materialCountList.toString()+"行采购计划中物资不唯一!\n");
				}else if(nonUniquePlanList.size()>0){
					errorInfo.append("第"+nonUniquePlanList.toString()+"行(系统中)采购计划不唯一!\n");
				}else if(nonMaterialCatalogList.size()>0){
					errorInfo.append("第"+nonMaterialCatalogList.toString()+"行物资大类为空!\n");
				}
				throw new ImportExcelFileException(errorInfo.toString());
			}
			
			System.out.println("开始未完成的"+(importType.equals("2")?"计划":"合同")+"导入...");

			System.out.println("开始导入申报记录...");
			List<DeclareDetail> declareDetailList=declareDetailImportDataDAO.DeclareDetailImport(login_userid,login_departmentid);
			
			System.out.println("开始导入申报计划...");
			List<DeclarePlanDetil> declarePlanDetailList=declareDetailImportDataDAO.DeclarePlanImport(declareDetailList,declarePlanName,login_userid);
		
			System.out.println("开始导入采购计划...");
			List<ProcurementDetail> procurementDetail= declareDetailImportDataDAO.ProcurementPlanImport(declarePlanDetailList,importType, vendor);
			if(importType.equals("1")){//未完成的合同
				System.out.println("开始导入采购合同...");
				declareDetailImportDataDAO.procurementContractImport(procurementDetail,vendor,login_userid);
			}
	}
		
	}
}
