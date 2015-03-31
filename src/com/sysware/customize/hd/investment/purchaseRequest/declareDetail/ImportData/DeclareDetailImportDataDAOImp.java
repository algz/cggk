package com.sysware.customize.hd.investment.purchaseRequest.declareDetail.ImportData;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAOImp;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ContractPurchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContract;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContractBook;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.Parity;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.ParityService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.Procurement;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.Purchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ApplicationStatusEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.CodeTypeEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.FileCodeGenerator;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.PurchaseTypeEnum;
import com.sysware.customize.hd.investment.purchaseRequest.declare.Declare;
import com.sysware.customize.hd.investment.purchaseRequest.declareDetail.DeclareDetail;
import com.sysware.customize.hd.investment.purchaseRequest.declarePlan.DeclarePlan;
import com.sysware.customize.hd.investment.purchaseRequest.declarePlan.DeclarePlanDaoImpl;
import com.sysware.customize.hd.investment.purchaseRequest.declarePlan.DeclarePlanDetil;
import com.sysware.customize.hd.investment.purchaseRequest.stockPlan.entity.NoFixedStockplanMoreinfo;
import com.sysware.customize.hd.investment.stockInspect.stockPlan.ProcurementPlan;

@Name("declareDetailImportDataDAOImp")
public class DeclareDetailImportDataDAOImp implements
		DeclareDetailImportDataDAO {

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;

	@In(create = true, value = "parityServiceImpl")
	private ParityService parityService;

	public CommonDAO<Object> getDao() {
		return dao;
	}

	/**
	 * 导入需求登记数据
	 * 
	 * @param declareId
	 * @param cal
	 *            .getTime() 导入时间
	 * @param userid
	 *            导入人
	 * @param departmentid
	 * @param excelVoList
	 * @throws Exception
	 */
	public List<DeclareDetail> DeclareDetailImport(String import_userid, String import_departmentid) throws Exception {
		Calendar cal = Calendar.getInstance();

		Declare declare = new Declare();
		declare.setCreateDate(cal.getTime());// 生成时间
		declare.setDeclareDate(cal.getTime());// 申报月份
		declare.setUpdateDate(new Date());// 最后修改时间
		declare.setDeclareCode(getDeclareCode()); // 编号。9为流水号
		declare.setEditor(import_userid);// 编辑人
		declare.setDepartmentId(import_departmentid);
		declare.setAmount(BigDecimal.ZERO);// 金额:必填项,默认为0;
		declare.setStatus("3");// 申报状态 1待审批2审批中3已审批
		dao.getHibernateSession().save(declare);

		BigDecimal count = new BigDecimal("0");
		List<DeclareDetail> declareDetailList = new ArrayList<DeclareDetail>();
		List<Map<String, Object>> importDataList = dao.getHibernateSession()
				.createSQLQuery("SELECT t.* FROM declaredetailimport_temp t")
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).list();
		for (Map<String, Object> importData : importDataList) {
			DeclareDetail declareDetail = new DeclareDetail();
			declareDetail.setDeclareDetailStatus("3");// 是否成功通过申报，0未提交，1已提交，2未通过，3通过
			declareDetail.setMaterialid((String) importData.get("MATERIALID"));
			// 数量
			declareDetail
					.setQuantity(importData.get("ACTUALNUMBER") != null
							&& !importData.get("ACTUALNUMBER").equals("") ? (BigDecimal) importData
							.get("ACTUALNUMBER")
							: BigDecimal.ZERO); // 数量=合同数量=建议采购量=需求量
			// 需用时间
			declareDetail
					.setUseDate(importData.get("USEDATE").equals("") ? null
							: (Date) importData.get("USEDATE"));
			// 金额=数量*价格=0
			BigDecimal amount = BigDecimal.ZERO;
			declareDetail.setAmount(amount);
			declareDetail.setDeclareType("1");
			// declareDetail.setFileName(fileName[i]);
			// declareDetail.setFileId(fileId[i]);
			declareDetail.setUse("批产用（备注机型）");
			declareDetail.setMaterialCatalogName(UtilDAOImp
					.getMaterialCatalogByMaterialID(dao.getHibernateSession(),
							declareDetail.getMaterialid())
					.getMaterialtypename());
			declareDetail.setDeclareId(declare.getDeclareId());
			declareDetail.setRemark((String) importData.get("REMARK"));// 备注
			dao.getHibernateSession().save(declareDetail);

			String sql="select count(1) from DECLAREDETAILIMPORT_TEMP WHERE PLANCODE=:plancode and materialid=:materialid and actualnumber=:actualnumber and usedate=:usedate";
			BigDecimal v_count=(BigDecimal)dao.getHibernateSession().createSQLQuery(sql)
			                                  .setParameter("plancode",importData.get("PLANCODE").toString())
					                          .setParameter("materialid", declareDetail.getMaterialid())
					                          .setParameter("usedate", declareDetail.getUseDate())
					                          .setParameter("actualnumber", declareDetail.getQuantity())
					                          .uniqueResult();
			sql = "update DECLAREDETAILIMPORT_TEMP set declaredetailid=:declaredetailid where plancode=:plancode and materialid=:materialid and actualnumber=:actualnumber and usedate=:usedate";
			dao.getHibernateSession().createSQLQuery(sql).setParameter("declaredetailid", declareDetail.getDeclareDetailId())
					                 .setParameter("plancode",importData.get("PLANCODE").toString())
					                 .setParameter("materialid", declareDetail.getMaterialid())
			                          .setParameter("usedate", declareDetail.getUseDate())
			                          .setParameter("actualnumber", declareDetail.getQuantity())
					                 .executeUpdate();
			declareDetailList.add(declareDetail);
			count = count.add(declareDetail.getAmount());
		}
		declare.setAmount(declare.getAmount().add(count));// 金额
		return declareDetailList;
	}

	/**
	 * 导入生成申报计划
	 * 
	 * @param declare
	 * @param userid
	 * @return
	 */
	public List<DeclarePlanDetil> DeclarePlanImport(List<DeclareDetail> declareDetailList, String declarePlanName,String userid) {
		Calendar cal = Calendar.getInstance();
		DeclarePlan declarePlan = new DeclarePlan();
		declarePlan.setDeclareplanName(cal.get(Calendar.YEAR)+ String.format("%02d", (cal.get(Calendar.MONTH) + 1))+"历史申报计划");

		String code = "";
		String sql = "select cast(substr(max(d.declareplan_code),length(max(d.declareplan_code))-2) as NUMBER(10)) from t_declareplan d "
				+ " where substr(d.declareplan_code,6,6)='"
				+ cal.get(Calendar.YEAR)
				+ String.format("%02d", (cal.get(Calendar.MONTH) + 1)) + "'";
		BigDecimal maxcode = (BigDecimal) dao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		if (maxcode == null) {
			code = "0001";
		} else {
			code = String.format("%04d", (maxcode.add(BigDecimal.ONE)).intValue());
		}

		declarePlan.setDeclareplanCode("CGSB-" + cal.get(Calendar.YEAR)
				+ String.format("%02d", cal.get(Calendar.MONTH) + 1)
				+ String.format("%02d", cal.get(Calendar.DAY_OF_MONTH)) + code);
		declarePlan.setAmount(BigDecimal.ZERO);
		declarePlan.setQuantity(BigDecimal.ZERO);// 初始化项数为0.
		declarePlan.setStatus("5");
		declarePlan.setEditer(userid);
		declarePlan.setEditDate(cal.getTime());
		declarePlan.setSendDate(cal.getTime());
		declarePlan.setDeclareplanType("1");
		declarePlan.setPropertyType("2");
		dao.getHibernateSession().save(declarePlan);
		// }

		List<DeclarePlanDetil> declarePlanDetilList = new ArrayList<DeclarePlanDetil>();
		BigDecimal count = BigDecimal.ZERO;
		for (DeclareDetail declareDetail : declareDetailList) {
			DeclarePlanDetil declarePlanDetil = new DeclarePlanDetil();
			declarePlanDetil.setDeclarePlanId(declarePlan.getDeclareplanID());
			declarePlanDetil.setDeclareDetilId(declareDetail
					.getDeclareDetailId());
			declarePlanDetil.setStatus("4");
			dao.getHibernateSession().save(declarePlanDetil);
			declarePlanDetilList.add(declarePlanDetil);
			count = count.add(declareDetail.getAmount());
		}
		declarePlan.setAmount(declarePlan.getAmount().add(count));
		declarePlan.setQuantity(declarePlan.getQuantity().add(
				new BigDecimal(declareDetailList.size())));// 项数

		return declarePlanDetilList;
	}

	/**
	 * 导入采购计划
	 */
	public List<ProcurementDetail> ProcurementPlanImport(
			List<DeclarePlanDetil> declarePlanDetailList, String importType,
			Vendor vendor) {
		List<ProcurementDetail> procurementDetailList = new ArrayList<ProcurementDetail>();
		// 查询导入的采购计划
		List<Map<String, Object>> importDataList = (List<Map<String, Object>>) dao
				.getHibernateSession()
				.createSQLQuery(
						"select distinct t.LOGINNAME,t.PLANCODE,t.PLANNAME,t.CREATETIME from declaredetailimport_temp t")
				.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).list();
		for (Map<String, Object> importData : importDataList) {
			// 计划编辑人
			String sql = "select u.userid from t_user u where u.loginname='"
					+ (String) importData.get("LOGINNAME") + "'";
			String userid = (dao.getHibernateSession().createSQLQuery(sql)
					.setMaxResults(1).uniqueResult()).toString();
			sql = "select u.Instcode from  t_user u where u.userid='" + userid
					+ "'";
			String departmentid = (dao.getHibernateSession()
					.createSQLQuery(sql).setMaxResults(1).uniqueResult())
					.toString();

			// --往采购计划主表中插入数据
			ProcurementPlan procurementPlan = new ProcurementPlan();
			procurementPlan.setProcurementplan_name((String) importData.get("PLANNAME"));// 采购计划名称
			// 采购计划编号
			procurementPlan.setProcurementplan_code((String) importData.get("PLANCODE"));
			procurementPlan.setProcurementplan_quantity(0);// 项数
			procurementPlan.setAmount(BigDecimal.ZERO);// 金额
			procurementPlan.setEditer(userid);
			procurementPlan.setEditdate((Date) importData.get("CREATETIME"));// 计划生成时间
			procurementPlan.setPlantype("2");// 计划类型。1固定资产计划2其他计划。
			procurementPlan.setStatus("3");// 状态：1已生成，2审批中，3已审批,6已生成合同
			dao.getHibernateSession().save(procurementPlan);

			Procurement procurement = new Procurement();
			procurement.setProcurementCode((String) importData.get("PLANCODE"));// 采购需求编号
			procurement.setProcurementType("2");// 需求类型：年度采购需求（1）； 零星采购需求（2）
			procurement.setReportedor(userid);// 填报人
			procurement.setCreateDate((Date) importData.get("CREATETIME"));// 生成日期
			procurement.setFlag("1");// 状态：未发布（0）；已发布（1）
			procurement.setApprovalPerson("系统管理员");// 申请人
			procurement.setRequireDemartment("物资供应部");// 需求单位
			procurement.setSourcetype("1");
			dao.getHibernateSession().save(procurement);

			Purchase purchase = new Purchase();
			// 采购编号
			purchase.setPurchaseCode((String) importData.get("PLANCODE"));
			purchase.setCreateDate((Date) importData.get("CREATETIME"));// 生成日期
			purchase.setStatus(importType.equals("1") ? "4" : "3");// 申请状态,导入类型:1未完成合同导入;2未完成的计划导入
			purchase.setMaterialTypeName("历史物资");// 物资种类
			purchase.setType("2");// 采购需求类型：1年度需求, 2 零星需求
			purchase.setEditor(userid);// 编辑人
			purchase.setPurchaseName((String) importData.get("PLANNAME"));// 采购需求名称
			dao.getHibernateSession().save(purchase);

			BigDecimal count = BigDecimal.ZERO;
			BigDecimal amountsum = BigDecimal.ZERO;
			int maxCode = parityService.getParityMaxCode("5", purchase
					.getType());

			sql = "select dd.* from t_declare_detil dd,DECLAREDETAILIMPORT_TEMP t where dd.declare_detil_id=t.declaredetailid and t.plancode=:plancode";
			List<DeclareDetail> declareDetailList = dao.getHibernateSession()
					.createSQLQuery(sql).addEntity("dd", DeclareDetail.class)
					.setParameter("plancode",importData.get("PLANCODE").toString())
					.list();
			for (int i = 0; i < declareDetailList.size(); i++) {
				DeclareDetail declareDetail = declareDetailList.get(i);
				Material material = (Material) dao.getHibernateSession().get(Material.class, declareDetail.getMaterialid());
				ProcurementDetail procurementDetail = new ProcurementDetail();
				procurementDetail.setMaterialTypeName(material.getMaterialCatalog().getMaterialtypename());
				procurementDetail.setProcurementId(procurement.getProcurementId());
				procurementDetail.setPrice(BigDecimal.ZERO);
				procurementDetail.setMaterialId(declareDetail.getMaterialid());
				procurementDetail.setDeliveryDate((Date) importData
						.get("usedate"));
				procurementDetail.setDeclare_detil_id(declareDetail
						.getDeclareDetailId());
				procurementDetail.setPurchaseId(purchase.getPurchaseId());
				procurementDetail
						.setMaterialCounts(declareDetail.getQuantity());// 需求量;页面显示:对于定额平衡为需求量,零星平衡无效
				procurementDetail.setNeedNumber(declareDetail.getQuantity());// 需订量;页面显示:对于零星平衡为需求量,定额平衡无效
				procurementDetail.setActualNumber(declareDetail.getQuantity());// 实际采购数量(建议采购量)
				procurementDetail.setNumber_applications(declareDetail
						.getQuantity());// 申请数量

				procurementDetail.setApprovalperson(userid);// 申请人
				procurementDetail.setRequiredemartment(departmentid);// 需求单位
				procurementDetail.setRemark(declareDetail.getRemark());// 备注
				if (importType.equals("1")) {// 导入类型:1未完成合同导入;2未完成的计划导入
					procurementDetail.setVendorId(vendor.getVendorID());// 供应商ID
					procurementDetail.setPurchaseType("3");
					procurementDetail.setStatus("1");

					String oriCodeStr = FileCodeGenerator.getParityCode(
							ProcurementTypeEnum.getByValue(purchase.getType()),
							CodeTypeEnum.valueOf(PurchaseTypeEnum.getByValue(
									"5").name()));
					String maxCodeStr = String.valueOf(maxCode++);
					String codeStr = oriCodeStr.substring(0,
							oriCodeStr.length() - maxCodeStr.length()).concat(
							maxCodeStr);

					Parity parity = new Parity();
					parity.setCreateDate(new Date());
					parity.setDeliveryDate(procurementDetail.getDeliveryDate());
					parity.setParityCode(codeStr);
					parity.setApplicationStatus("5");// 1编制中,2待审批,3审批中,4已审批,5已生成,6待生成合同
					parity.setEditors(userid);
					parity.setPurchaseId(purchase.getPurchaseId());
					parity.setType("5");// 1比价,2招标,3直接采购,4协议采购,5其他采购(直接采购)
					parity.setMaterialId(declareDetail.getMaterialid());
					parity.setVendorId(vendor.getVendorID());
					parity.setVendorName(vendor.getVendorName());
					parity.setProcurementDetailId(procurementDetail.getProcurementDetailId());
					dao.getHibernateSession().save(parity);
				} else {
//					procurementDetail.setStatus("0");
				}
				procurementDetail.setOptLock(1);
				dao.getHibernateSession().save(procurementDetail);
				procurementDetailList.add(procurementDetail);

				sql = "select t.* from t_declareplan_detil t where t.declare_detil_id='"
						+ declareDetail.getDeclareDetailId() + "'";
				DeclarePlanDetil declarePlanDetil = (DeclarePlanDetil)dao.getHibernateSession().createSQLQuery(sql)
						                                                 .addEntity("t",DeclarePlanDetil.class)
						                                                 .uniqueResult();
				NoFixedStockplanMoreinfo procurementPlan_detil = new NoFixedStockplanMoreinfo();
				procurementPlan_detil.setProcurementPlan_ID(procurementPlan
						.getProcurementplan_id());
				procurementPlan_detil.setDeclarePlan_detil_ID(declarePlanDetil
						.getDeclarePlanDetilId());
				procurementPlan_detil.setStatus("0");
				procurementPlan_detil.setDeclareplan_id(declarePlanDetil.getDeclarePlanId());
				procurementPlan_detil.setNumber_applications(declareDetail
						.getQuantity());// 申请数量
				procurementPlan_detil
						.setNeedNumber(declareDetail.getQuantity());// 需求量:零星计划
				procurementPlan_detil.setActualNumber(declareDetail
						.getQuantity());// 建议采购量
				dao.getHibernateSession().save(procurementPlan_detil);

				count = count.add(declareDetail.getQuantity());
				amountsum = amountsum.add(declareDetail.getAmount());
			}

			procurementPlan.setProcurementplan_quantity(procurementPlan
					.getProcurementplan_quantity()
					+ count.longValue());
			procurementPlan.setAmount(procurementPlan.getAmount()
					.add(amountsum));
		}

		return procurementDetailList;
	}

	/**
	 * 采购合同导入
	 * 
	 * @param plancodeList
	 *            所有采购计划编号
	 * @param vendorid
	 *            供应商ID
	 * @param vendorname
	 *            供应商名称
	 * @param userid
	 *            导入人
	 */
	public ProcurementContract procurementContractImport(List<ProcurementDetail> procurementDetailList, Vendor vendor,String userid) {

		ProcurementContract procurementContract = new ProcurementContract();
		// 获取当前登录用户信息
		Calendar cal = Calendar.getInstance();// 合同生成时间

		String[] code = { "0001", "0001" };
		String sql = "select cast(substr(max(d.auditcode),length(max(d.auditcode))-3) as number(10)),cast(substr(max(d.contractcode),length(max(d.contractcode))-3) as number(10)) from T_ProcurementContract d "
				+ "where substr(d.contractcode,7,6)='"
				+ cal.get(Calendar.YEAR)
				+ String.format("%02d", (cal.get(Calendar.MONTH) + 1)) + "'";
		Object[] maxcode = (Object[]) dao.getHibernateSession().createSQLQuery(
				sql).setMaxResults(1).uniqueResult();
		if (maxcode[0] != null && maxcode[1] != null && maxcode.length != 0) {
			code[0] = String.format("%04d", (((BigDecimal) maxcode[0])
					.add(BigDecimal.ONE).intValue()));
			code[1] = String.format("%04d", (((BigDecimal) maxcode[1])
					.add(BigDecimal.ONE).intValue()));
		}

		procurementContract.setAuditCode("SL" + cal.get(Calendar.YEAR)
				+ String.format("%02d", cal.get(Calendar.MONTH) + 1) + code[0]);// 审签单编号
		procurementContract.setContractCode("CG-HT-" + cal.get(Calendar.YEAR)
				+ String.format("%02d", cal.get(Calendar.MONTH) + 1) + code[1]);// 合同编号
		procurementContract.setContractName(cal.get(Calendar.YEAR) + "年历史合同");// 合同名称
		procurementContract.setApplicationStatus("5");// 状态:1已生成，2审签中，3已审签，4已登记,5已生成
		procurementContract.setCreateDate(cal.getTime());// 创建日期
		procurementContract.setEditors(userid);// 创建人
		procurementContract.setVendor(vendor.getVendorID());// 供应商ID
		procurementContract.setVendName(vendor.getVendorName());// 供应商名称
		procurementContract.setCreateType("5");// 合同类型：5直接生成，2比价，3招投标
		procurementContract.setMaterialType("历史物资");// 物资种类
		dao.getHibernateSession().save(procurementContract);

		ProcurementContractBook procurementContractBook = new ProcurementContractBook();
		procurementContractBook.setProcurementContractId(procurementContract
				.getProcurementContractId());
		procurementContractBook.setSignDate(cal.getTime());
		dao.getHibernateSession().save(procurementContractBook);
		// }
		procurementContract.setContractAmount(BigDecimal.ZERO);// (procurementPlan.getAmount());//合同金额

		for (ProcurementDetail procurementDetail : procurementDetailList) {
			ContractPurchase procurementContract_Purchase = new ContractPurchase();
			procurementContract_Purchase.setPurchaseId(procurementDetail.getPurchaseId());
			procurementContract_Purchase.setMaterialId(procurementDetail.getMaterialId());
			procurementContract_Purchase.setProcurementContractId(procurementContract.getProcurementContractId());
			dao.getHibernateSession().save(procurementContract_Purchase);
		}

		return procurementContract;
	}
	
	private String getDeclareCode(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		Calendar c = Calendar.getInstance();
		String code = "CG" + sdf.format(c.getTime())+"-";
		String sql = "SELECT NVL(LPAD(MAX(SUBSTR(d.declare_code,10,4))+1,4,'0'),'0001') from t_declare d where TO_CHAR(SYSDATE,'yyyyMM')=SBUSTR(d.declare_code,3,6)";
		code = (String)dao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		return code;
	}

}
