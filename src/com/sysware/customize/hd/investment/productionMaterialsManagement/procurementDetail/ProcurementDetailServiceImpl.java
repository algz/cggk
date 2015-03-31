package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;

import net.sf.json.JSONArray;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalog;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalogService;
import com.sysware.customize.hd.investment.baseData.materialQuota.Inventory;
import com.sysware.customize.hd.investment.baseData.materialQuota.InventoryService;
import com.sysware.customize.hd.investment.baseData.materialQuota.MaterialQuota;
import com.sysware.customize.hd.investment.baseData.materialQuota.MaterialQuotaCondition;
import com.sysware.customize.hd.investment.baseData.materialQuota.MaterialQuotaService;
import com.sysware.customize.hd.investment.baseData.product.Product;
import com.sysware.customize.hd.investment.baseData.product.ProductService;
import com.sysware.customize.hd.investment.general.ExcelUtils;
import com.sysware.customize.hd.investment.general.exception.BusinessDataStateException;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;
import com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail.BuinessPlanDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.Parity;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.Procurement;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.ProcurementService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.Purchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.PurchaseService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ApplicationStatusEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.FileCodeGenerator;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.MaterialQuotaTypeEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.PurchaseTypeEnum;
import com.sysware.p2m.webservice.dto.User;

@Name("procurementDetail_ProcurementDetailServiceImpl")
public class ProcurementDetailServiceImpl implements ProcurementDetailService {
	@In(create = true)
	Identity identity;

	@In(create = true, value = "materialQuota_MaterialQuotaServiceImpl")
	private MaterialQuotaService materialQuotaService;

	@In(create = true, value = "procurement_ProcurementServiceImpl")
	private ProcurementService procurementService;

	@In(create = true, value = "procurementDetail_ProcurementDetailDaoImpl")
	private ProcurementDetailDao procurementDetailDao;

	@In(create = true, value = "purchaseServiceImpl")
	private PurchaseService purchaseService;

	@In(create = true, value = "inventory_InventoryServiceImpl")
	private InventoryService inventoryService;

	@In(create = true, value = "materialCatalogServiceImpl")
	MaterialCatalogService materialCatalogService;

	@In(create = true, value = "material_MaterialServiceImpl")
	public MaterialService materialService;

	@In(create = true, value = "ProductServiceImpl")
	private ProductService productService;

	@Transactional
	public void batchAddProcurementDetails(String buinessPlanName,
			List<BuinessPlanDetail> businessPlanDetails) {

		Procurement procurement = new Procurement();
		procurement.setProcurementCode(buinessPlanName);
		procurement.setProcurementType(ProcurementTypeEnum.NIAN_DU.getValue());
		procurement.setFlag("1");
		procurement.setCreateDate(new Date());

		procurement = procurementService.addProcurement(procurement);

		for (BuinessPlanDetail businessPlanDetail : businessPlanDetails) {
			// 处理与“材料定额”相关联的数据,存入采购计划详情表
			processMaterialQuotasToProcurementDetail(procurement, businessPlanDetail);
			// 处理与“清册”相关联的数据
			//processInventoriesToProcurementDetails(procurement, businessPlanDetail);
		}

	}

	@Transactional
	public void batchDeleteProcurementDetails(String[] businessPlanDetailIds) {

		// 一次批量删除的ProcurementDetail都对应相同的ProcurementId
		// 因此取任意一个ProcurementDetail的ProcurementId即可
		String toDeleteProcurementId = procurementDetailDao
				.getProcurementIdByBusinessPlanDetailId(businessPlanDetailIds[0]);

		// 1.批量删除ProcurementDetails
		procurementDetailDao.batchDeleteByBusinessPlanDetailIds(businessPlanDetailIds);

		// 2.删除Procurement
		procurementService.deleteProcurement(toDeleteProcurementId);

	}

	public List<ProcurementDetail> getAnnualDetailByMaterial(String procurementId,
			String nodeId, int start, int limit, String pieceType, String materialCatLogId,String type) {
		Procurement procurement = procurementService.findProcurementById(procurementId);
		return procurementDetailDao.getAnnualDetailByMaterialIds(procurement, nodeId, start,
				limit, pieceType, materialCatLogId,type);
	}
	public List<ProcurementDetail> getAnnualDetail(ProcurementDetailVo procurementDetailVo) {
		//Procurement procurement = procurementService.findProcurementById(procurementId);
		return procurementDetailDao.getAnnualDetailByUserId( procurementDetailVo,identity.getLoginUser().getLoginname());
	}
	
	
	public List<ProcurementDetail> getSporadicDetailByMaterial(String procurementId,
			String nodeId, int start, int limit, String pieceType, String materialCatLogId) {
		Procurement procurement = procurementService.findProcurementById(procurementId);
		return procurementDetailDao.getSporadicDetailByMaterialIds(procurement, nodeId, start,
				limit, pieceType, materialCatLogId);
	}
	public List<Object[]> getWmsInfoByMaterial(ProcurementDetailVo vo){
		return procurementDetailDao.getWmsInfoByMaterial(vo);
	}
	public String getProvideNumber(ProcurementDetailVo vo){
		return procurementDetailDao.getProvideNumber(vo);
	}
	public long countProcurementDetailByMaterial(String procurementId, String nodeId ,String materialCatalogId) {
		return procurementDetailDao.countProcurementDetailByMaterial(procurementId, nodeId,materialCatalogId);
	}
	public long getAnnualDetailByMaterialIdsCount(String procurementId, String nodeId,  String pieceType, String materialCatLogId,String type) {
		return procurementDetailDao.getAnnualDetailByMaterialIdsCount(procurementId,nodeId, pieceType, materialCatLogId,type);
	}
	@Transactional
	public void addProcurementDetail(ProcurementDetail procurementDetail) {
		this.procurementDetailDao.add(procurementDetail);
	}

	@Transactional
	public void batchUpdateProcurementDetails(List<ProcurementDetail> procurementDetails)
			throws BusinessDataStateException {
		for (ProcurementDetail procurementDetail : procurementDetails) {
			if (procurementDetail.getOptLock() != this.procurementDetailDao.get(
					procurementDetail.getBuinessPlanDetailsId()).getOptLock()) {
				throw new BusinessDataStateException("数据已被使用");
			}
			this.procurementDetailDao.update(procurementDetail);
		}
	}

	@Transactional
	public void batchUpdateViewProcurementDetails(List<ProcurementDetail> vos)
			throws BusinessDataStateException {
		for (ProcurementDetail vo : vos) {
			ProcurementDetail pd=(ProcurementDetail)procurementDetailDao.getHibernateSession().get(ProcurementDetail.class, vo.getProcurementDetailId());
			if(pd.getStatus()==null||!pd.getStatus().equals("1")){
				pd.setStatus("0");
			}
			pd.setActualNumber(vo.getActualNumber());
			pd.setNote(vo.getNote());
			pd.setPurchaseType(vo.getPurchaseType());//采购方式
//			vo.setDeclare_detil_id(pd.getDeclare_detil_id());
//			this.procurementDetailDao.update(vo);
		}
	}

	@Transactional
	public void batchAddProPurchaseDetails(List<ProcurementDetail> procurementDetails)
			throws BusinessDataStateException {
		String newProcessType = procurementDetails.get(0).getNewProcessType();
		String materialTypeName = procurementDetails.get(0).getMaterialTypeName();
//		Material m = materialService.findById(procurementDetails.get(0).getMaterialId());
//		if (m != null) {    
//			MaterialCatalog mc = materialCatalogService.getMaterialCatalogById(m
//					.getMaterialCatalog().getMaterialcatalogid());
//			if (mc != null) {
//				materialTypeName = mc.getMaterialtypename();
//			}
//		}

		// 生成大纲
		Purchase purchase = new Purchase();
		purchase.setCreateDate(new Date());
		purchase.setEditor(identity.getLoginUser().getUserid().toString());

		purchase.setStatus(ApplicationStatusEnum.DAI_SHEN_PI.getValue());// 默认待审批
		purchase.setMaterialTypeName(materialTypeName);

		int maxCode = purchaseService.getPurchaseMaxCode(newProcessType);
		String maxCodeStr = String.valueOf(maxCode);
		String oriCodeStr = FileCodeGenerator.getPurchaseCode(ProcurementTypeEnum
				.getByValue(newProcessType));

		String codeStr = oriCodeStr.substring(0, oriCodeStr.length() - maxCodeStr.length()).concat(
				maxCodeStr);
		purchase.setPurchaseCode(codeStr);
		purchase.setType(newProcessType);
        purchaseService.saveOrUpdatePurchase(purchase);
		
		//生成需求明细
		String purchaseId = purchase.getPurchaseId();
		for (ProcurementDetail procurementDetail : procurementDetails) {
			try {
				procurementDetailDao.partUpdate(procurementDetail, purchaseId);
			} catch (Exception e) {
				e.printStackTrace();
				throw new BusinessDataStateException("数据已被使用");
			}
		}

	}

	public void removePurchaseRelation(String purchaseId) {
		ProcurementDetailVo procurementDetailVo=new ProcurementDetailVo();
		procurementDetailVo.setPurchaseId(purchaseId);
		List<ProcurementDetail> procurementDetails=new ArrayList<ProcurementDetail>();
		try {
			procurementDetails = procurementDetailDao.getPurchaseForAnnualPlan(procurementDetailVo);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for (ProcurementDetail procurementDetail : procurementDetails) {
//			procurementDetail.setNeedNumber(new BigDecimal(0));
//			procurementDetail.setBackNumber(new BigDecimal(0));// 返修品
			procurementDetail.setActualNumber(null);//建议采购量
//			procurementDetail.setOnNumber(new BigDecimal(0));// 欠交合同
//			procurementDetail.setStoreNumber(new BigDecimal(0));
			procurementDetail.setPurchaseType(null);
			procurementDetail.setPurchaseId(null);
			procurementDetailDao.getHibernateSession().update(procurementDetail);
		}
		procurementDetailDao.getHibernateSession().flush();
	}

	public List<ProcurementDetail> getProcurementDetailByPurchase(String purchaseId, int start,
			int limit) {
		return this.procurementDetailDao.getByPurchaseId(purchaseId, start, limit);
	}

	public long countProcurementDetailByPurchase(String purchaseId) {
		return this.procurementDetailDao.countByPurchaseId(purchaseId);
	}

	public List<ProcurementDetail> getProcurementDetailByContract(ProcurementDetailVo vo) {
		return this.procurementDetailDao.getByContractId(vo);
	}

	public long countProcurementDetailByContract(String contractId,String materialids) {
		return this.procurementDetailDao.countByContractId(contractId,materialids);
	}

	public List<ProcurementDetail> getByPurchaseId(String purchaseId, int start, int limit,String purchaseType) {
		return procurementDetailDao.getByPurchaseId(purchaseId, start, limit,purchaseType);
	}

	public long countByPurchaseId(String purchaseId) {
		return procurementDetailDao.countByPurchaseId(purchaseId);
	}

	public List<ProcurementDetail> getByPurchaseIdAndType(String purchaseId,
			PurchaseTypeEnum purchaseType) {
		return procurementDetailDao.getByPurchaseIdAndType(purchaseId, purchaseType);
	}

	public void deletePurchaseRelation(String purchaseId) {
		procurementDetailDao.deletePurchaseRelation(purchaseId);
	}

	public void batchDeleteByProcurementIds(String[] procurementIds) {
		procurementDetailDao.batchDeleteByProcurementIds(procurementIds);
	}

	public List<ProcurementDetail> getByPurchaseAndMaterialId(Purchase purchase, String materialId) {
		return procurementDetailDao.getByPurchaseAndMaterialId(purchase, materialId);
	}

	public String sumRequestValuebyMaterialid(String materialid) {
		return this.procurementDetailDao.sumRequestValuebyMaterialid(materialid);
	}

	public String sumPlanValueByMaterialid(String materialid) {
		return this.procurementDetailDao.sumPlanValueByMaterialid(materialid);
	}

	public String sumProcureValueByMaterialid(String materialid) {
		return this.procurementDetailDao.sumProcureValueByMaterialid(materialid);
	}

	public String sumContractValueByMaterialid(String materialid) {
		return this.procurementDetailDao.sumContractValueByMaterialid(materialid);
	}

	public List<ProcurementDetail> getProcurementDetailByParity(Parity parity) {
		return procurementDetailDao.getProcurementDetailByParity(parity);
	}

	@Transactional
	public void saveOrUpdateProcurementDetail(ProcurementDetail procurementDetail) {
		if (StringUtils.isNotBlank(procurementDetail.getProcurementDetailId())) {
			procurementDetailDao.update(procurementDetail);
		} else {
			procurementDetail.setProcurementDetailId(null);
			procurementDetailDao.save(procurementDetail);
		}
	}

	@Transactional
	public void batchAddProcurementDetails(Workbook workbook, Map<String, String> formField,
			List<String> noExistProducts, List<Material> newMaterials) throws FileUploadException {

		String[] pdCols = { "", "", "", "", "productCode", "materialCounts", "", "deliveryDate","" };
		String[] mCols = { "materialItemName", "desingnation", "materialStandard",
				"technicCondition", "", "", "", "","materialitemcode" };
		int numberOfSheets = workbook.getNumberOfSheets();
		for (int i = 0; i < numberOfSheets; i++) {
			Sheet sheet = workbook.getSheet(i);

			Procurement procurement = new Procurement();
			procurement.setFlag("0");
			procurement.setReportedor(formField.get("userid"));
			procurement.setCreateDate(new Date());// 生成日期
			procurement.setRemarks(formField.get("remarks"));
			procurement.setProcurementType(ProcurementTypeEnum.LING_XING.getValue());
			procurement = this.procurementService.addProcurement(procurement);

			for (int m = 2; m < sheet.getRows(); m++) {
				ProcurementDetail procurementDetail = ExcelUtils.processRow(sheet.getRow(m),
						pdCols, ProcurementDetail.class);
				procurementDetail.setProcurementId(procurement.getProcurementId());
				String productCode = procurementDetail.getProductCode();
				// 如果“机型”已标识为“不存在”，则进入下一条记录
				if (noExistProducts.contains(productCode)) {
					continue;
				}
				// 判断机型是否存在，如果“不存在”则记录，并进入下一条记录
				Product product = productService.getProductByCode(productCode);
				if (product == null) {
					noExistProducts.add(productCode);
					continue;
				}

				Material material = ExcelUtils.processRow(sheet.getRow(m), mCols, Material.class);
				Material temp = materialService.findMaterialByExample(material);
				if (temp == null) { // 该物料在系统中不存在
					newMaterials.add(material);
					continue;
				} else {
					procurementDetail.setMaterialId(temp.getMaterialid());
					procurementDetail.setMaterialTypeName(temp.getMaterialCatalog()
							.getMaterialtypename());
				}
				this.addProcurementDetail(procurementDetail);
			}
		}
		if (noExistProducts.size() > 0 || newMaterials.size() > 0) {
			throw new ImportExcelFileException();
		}

	}

	
	@Transactional
	public void importProcurementPlan(Workbook workbook, Map<String, String> formField,
			List<String> noExistProducts, List<Material> newMaterials) throws FileUploadException {

		int numberOfSheets = workbook.getNumberOfSheets();//获得表单数
		for (int i = 0; i < numberOfSheets; i++) {
			Sheet sheet = workbook.getSheet(i);
			
			//Excel行查询
			for (int m = 2; m < sheet.getRows(); m++) {
				Cell[] cells=sheet.getRow(m);

			    //物资
			    String sql="select {m.*} from T_MATERIAL m where m.MATERIALITEMNAME=:name " +
						" and m.DESINGNATION"+(cells[4].getContents().equals("")?" is null ":("='"+cells[4].getContents()+"'"))+
						" and m.MATERIALSTANDARD"+(cells[5].getContents().equals("")?" is null":("='"+cells[5].getContents()+"'"))+
						" and m.TECHNICCONDITION"+(cells[6].getContents().equals("")?" is null ":("='"+cells[6].getContents()+"'"));
				
				Material material=(Material)procurementDetailDao.getHibernateSession().createSQLQuery(sql)
				                      .addEntity("m",Material.class)
                                      .setParameter("name",cells[3].getContents())//物资名称
//                                      .setParameter("desingnation", cells[4].getContents())//牌号
//                                      .setParameter("standard", cells[5].getContents())//规格
//                                      .setParameter("techniccondition", cells[6].getContents())//技术条件
                                      .setMaxResults(1).uniqueResult();
				if(material==null){
					throw new FileUploadException("物质不存在");
				}
				//采购清单
				sql="select p.* from T_PURCHASE p where p.PURCHASECODE=:PURCHASECODE";
				Purchase purchase=(Purchase)procurementDetailDao.getHibernateSession().createSQLQuery(sql)
				                                                 .addEntity("p",Purchase.class)
				                                                 .setParameter("PURCHASECODE", cells[2].getContents())
				                                                 .uniqueResult();
				//采购计划
				Procurement procurement=null;
				if(purchase==null){
					sql="SELECT u.userid  from T_USER u where u.TRUENAME=:username";
					String userid=((BigDecimal)procurementDetailDao.getHibernateSession().createSQLQuery(sql)
                                                       .setParameter("username", cells[1].getContents())
                                                       .setMaxResults(1).uniqueResult()).toString();
					
					
					purchase=new Purchase();
					purchase.setEditor(userid);//编辑者
					purchase.setPurchaseCode(cells[2].getContents());//编号
					purchase.setCreateDate(new Date());//生成日期
					purchase.setStatus("1");//申请状态:编制中
					purchase.setType("2");//指定为零星需求
					//物质类别
					purchase.setMaterialTypeName(material.getMaterialCatalog().getMaterialtypename());
					procurementDetailDao.save(purchase);
					
					procurement=new Procurement();
					procurement.setProcurementCode(cells[2].getContents());//需求编号
					procurement.setReportedor(userid);// 填报人
//					procurement.setApprovalPerson(userid);//申请人
					procurement.setCreateDate(new Date());// 生成日期
					procurement.setFlag("1");// 状态：未发布（0）；已发布（1）
					procurement.setProcurementType("2");//// 需求类型：年度采购需求（1）； 零星采购需求（2）
                    procurementDetailDao.getHibernateSession().save(procurement);
				}else if(procurement==null){
					sql="SELECT DISTINCT {p.*} from T_PROCUREMENT p,T_PROCUREMENTDETAIL pd where PD.PURCHASEID=p.PURCHASEID and p.PURCHASEID=:PURCHASEID ";
					procurement=(Procurement)procurementDetailDao.getHibernateSession().createSQLQuery(sql)
					                                             .addEntity("P",Procurement.class)
					                                             .setParameter("PURCHASEID", purchase.getPurchaseId())
					                                             .setMaxResults(1).uniqueResult();
				}
				
				//创建采购需求明细
				ProcurementDetail procurementDetail=new ProcurementDetail();
				//物质类别
				procurementDetail.setMaterialTypeName(material.getMaterialCatalog().getMaterialtypename());
				procurementDetail.setMaterialId(material.getMaterialid());//关联物质
				procurementDetail.setPurchaseId(purchase.getPurchaseId());//关联采购清单\
			    procurementDetail.setProcurementId(procurement.getProcurementId());//关联采购计划
				
			    procurementDetail.setNoCheck(new BigDecimal(cells[9].getContents()));// 无预计消耗
				procurementDetail.setMaterialCounts(new BigDecimal(cells[10].getContents().equals("")?"0":cells[10].getContents()));//需求总量
				procurementDetail.setStoreNumber(new BigDecimal(cells[11].getContents().equals("")?"0":cells[11].getContents()));//库存
				procurementDetail.setOperable(new BigDecimal(cells[12].getContents().equals("")?"0":cells[12].getContents()));//有无合用
				procurementDetail.setNoCheck(new BigDecimal(cells[13].getContents().equals("")?"0":cells[13].getContents()));//待检
				procurementDetail.setBackNumber(new BigDecimal(cells[14].getContents().equals("")?"0":cells[14].getContents()));//返修品
				procurementDetail.setOnNumber(new BigDecimal(cells[15].getContents().equals("")?"0":cells[15].getContents()));//欠交合用
				procurementDetail.setActualNumber(new BigDecimal(cells[17].getContents().equals("")?"0":cells[17].getContents()));//(模板上的)需用量=(数据库的)实际采购量
			    procurementDetail.setPurchaseType("1");//默认采用比价方法
				this.procurementDetailDao.getHibernateSession().save(procurementDetail);
			}
		}

	}

	
	
	public List<String> getMaterialIdsByPurchaseIdAndVendorId(String purchaseId, String vendorId,String type) {
		return this.procurementDetailDao
				.getMaterialIdsByPurchaseIdAndVendorId(purchaseId, vendorId,type);
	}

	// 处理与“材料定额”相关联的数据
	private void processMaterialQuotasToProcurementDetail(Procurement procurement,
			BuinessPlanDetail businessPlanDetail) {
		// 根据产品ID获得对应的材料定额集合
		List<MaterialQuota> materialQuotas = materialQuotaService
				.getMaterialQuotaListByProductId(businessPlanDetail.getProductCode(),businessPlanDetail.getGroupType());//.getProduct().getProductid());

		for (MaterialQuota materialQuota : materialQuotas) {
			Material m=(Material)procurementDetailDao.getHibernateSession().createQuery("from Material m where m.materialitemcode=:materialitemcode")
			                                         .setParameter("materialitemcode", materialQuota.getCLDM())
			                                         .setMaxResults(1).uniqueResult();
			//物料组别与定额材料组别相等则进行导入
			if(m.getGroupType().equals(businessPlanDetail.getGroupType())){
				processProcurementDetail(procurement, businessPlanDetail, materialQuota);
			}
		}
	}

	// 处理与“清册”相关联的数据
	private void processInventoriesToProcurementDetails(Procurement procurement,
			BuinessPlanDetail businessPlanDetail) {
		// 根据产品ID获得对应的清册集合
		MaterialQuotaCondition materialQuotaCondition = new MaterialQuotaCondition();
		materialQuotaCondition.setProductCode(businessPlanDetail.getProductCode());
		materialQuotaCondition.setTypes(new String[] { "1", "5" });
		List<Inventory> inventories = inventoryService
				.getInventoryListByCondition(materialQuotaCondition);

		for (Inventory inventory : inventories) {
			processProcurementDetail(procurement, businessPlanDetail, inventory);
		}
	}

	// 处理单个物资需求对象-设置各属性值
	private void processProcurementDetail(Procurement procurement,
			BuinessPlanDetail businessPlanDetail, Object obj) {
		ProcurementDetail procurementDetail = new ProcurementDetail();
		BigDecimal materialCount = null;
		String itemCode = null;
		if (obj instanceof MaterialQuota) {
			//材料定额
			MaterialQuota materialQuota = (MaterialQuota) obj; 
				//2012/06/29 由于采用洪都提供的材料定额视图,且四个字段的联合主键,所以外键修改.
//			procurementDetail.setMaterialQuotaId(materialQuota.getMaterialQuotaId());
			procurementDetail.setJX(materialQuota.getJX());
			procurementDetail.setQSJH(materialQuota.getQSJH());
			procurementDetail.setZZJH(materialQuota.getZZJH());
			procurementDetail.setCLDM(materialQuota.getCLDM());
			procurementDetail.setMaterialQuotaType(MaterialQuotaTypeEnum.Material_Quota.getValue());
//			materialCount = materialQuota.getMaterialCount();
			materialCount=materialQuota.getQJDE();//全机定额(数量)
			itemCode = materialQuota.getCLDM(); //物料编码
		} else if (obj instanceof Inventory) {
			//"清册"相关联的数据
			Inventory inventory = (Inventory) obj;
			procurementDetail.setMaterialQuotaId(inventory.getInventoryID());
			procurementDetail.setMaterialQuotaType(MaterialQuotaTypeEnum.Inventory.getValue()); 
			materialCount = inventory.getNumbers();
			itemCode = inventory.getMaterial().getMaterialitemcode();
			procurementDetail.setCLDM(itemCode);
		}

		procurementDetail.setProcurementId(procurement.getProcurementId());
		procurementDetail.setBuinessPlanDetailsId(businessPlanDetail.getBuinessPlanDetailId());
		procurementDetail.setJan(businessPlanDetail.getJanuary().multiply(materialCount));
		procurementDetail.setFeb(businessPlanDetail.getFebruary().multiply(materialCount));
		procurementDetail.setMar(businessPlanDetail.getMarch().multiply(materialCount));
		procurementDetail.setApr(businessPlanDetail.getApril().multiply(materialCount));
		procurementDetail.setMay(businessPlanDetail.getMay().multiply(materialCount));
		procurementDetail.setJune(businessPlanDetail.getJune().multiply(materialCount));
		procurementDetail.setJuly(businessPlanDetail.getJuly().multiply(materialCount));
		procurementDetail.setAug(businessPlanDetail.getAugust().multiply(materialCount));
		procurementDetail.setSept(businessPlanDetail.getSeptember().multiply(materialCount));
		procurementDetail.setOct(businessPlanDetail.getOctober().multiply(materialCount));
		procurementDetail.setNov(businessPlanDetail.getNovember().multiply(materialCount));
		procurementDetail.setDect(businessPlanDetail.getDecember().multiply(materialCount));
		
//		procurementDetail.setMar(businessPlanDetail.getQuarter().multiply(materialCount));
//		procurementDetail.setJune(businessPlanDetail.getSecondQuarter().multiply(materialCount));
//		procurementDetail.setSept(businessPlanDetail.getThirdQuarter().multiply(materialCount));
//		procurementDetail.setDect(businessPlanDetail.getFourthQuarter().multiply(materialCount));
//		procurementDetail.setMaterialCounts(businessPlanDetail.getTotalRequired().multiply(
//				materialCount));
		//需求总量=(上年欠交+本年交付)*定额
		procurementDetail.setMaterialCounts((businessPlanDetail.getLastarrears().add(businessPlanDetail.getDeliveryCount())).multiply(
				materialCount));
		procurementDetail.setNumber_applications(businessPlanDetail.getDeliveryCount().multiply(
				materialCount));//需用量=申请量=本年交付数*定额=架份*定额

		try {
			Material material = materialService.findByCode(itemCode);
			procurementDetail.setMaterialTypeName(material.getMaterialCatalog()
					.getMaterialtypename());
			procurementDetail.setMaterialId(material.getMaterialid());
//			procurementDetail.setProductId(businessPlanDetail.getProduct().getProductid());
//			procurementDetail.setProductCode(BeanUtils.getProperty(obj, "productCode"));
		    procurementDetail.setProductCode(businessPlanDetail.getProductCode());
		} catch (Exception e) {
			e.printStackTrace();
		}
		procurementDetailDao.save(procurementDetail);
	}

	public List<Object[]> getProvideInfo(ProcurementDetailVo vo) {
		return procurementDetailDao.getProvideInfo(vo);
	}
	public BigDecimal getProvideInfoCount(ProcurementDetailVo vo) {
		return procurementDetailDao.getProvideInfoCount(vo);
	}

	public BigDecimal getSumContractAmount(String purchaseId,String vendorId,String materialId) {
		return procurementDetailDao.getSumContractAmount(purchaseId,vendorId,materialId);
	}

	public String getDepartment(ProcurementDetail pd) {
		// TODO Auto-generated method stub
		return procurementDetailDao.getDepartment(pd);
	}
	
	/**
	 * 获取年度计划小计汇总表数据,并进行资源平衡.
	 * @param procurementDetailVo
	 * @param loginName
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<ProcurementDetailVo> getAnnualProcumentDetail(ProcurementDetailVo procurementDetailVo) {
		return procurementDetailDao.getAnnualProcumentDetail(procurementDetailVo);
	}

	@Transactional
	public String realtimeSaveAnnualPlan(ProcurementDetailVo procurementDetailVo) throws Exception {
		return procurementDetailDao.realtimeSaveAnnualPlan(procurementDetailVo);
	}

	@Transactional
	public String submitAnnualPlan(ProcurementDetailVo procurementDetailVo) throws Exception {
		// TODO Auto-generated method stub
		return procurementDetailDao.submitAnnualPlan(procurementDetailVo);
	}

	public List<ProcurementDetailVo> getPurchaseForAnnualPlan(ProcurementDetailVo procurementDetailVo) throws Exception {
		List<ProcurementDetail> pdList=procurementDetailDao.getPurchaseForAnnualPlan(procurementDetailVo);
		List<ProcurementDetailVo> procurementDetailVos = new ArrayList<ProcurementDetailVo>();
		for (ProcurementDetail pd : pdList) {
			ProcurementDetailVo vo = new ProcurementDetailVo();
			BeanUtils.copyProperties(vo, pd);
			if (pd.getPurchaseType() != null){
				vo.setPurchaseTypeName(PurchaseTypeEnum.getByValue(pd.getPurchaseType()).getName());
			}
			Procurement procurement=(Procurement)procurementDetailDao.getHibernateSession().get(Procurement.class, pd.getProcurementId());
			vo.setPlanType(procurement.getBuinessPlan().getPlanType());//计划类别
			Material m=(Material)this.procurementDetailDao.getHibernateSession().get(Material.class,pd.getMaterialId());
			vo.setMaterialItemName(m.getMaterialItemName());//物资名称
			vo.setDemension(m.getDemension());
			vo.setDesingnation(m.getDesingnation());
			vo.setTechnicCondition(m.getTechnicCondition());
			vo.setMaterialStandard(m.getMaterialStandard());
			vo.setMaterialTypeName(m.getMaterialCatalog().getMaterialtypename());
			procurementDetailVos.add(vo);
		}

		 return procurementDetailVos;
		
	}

	@Transactional
	public void removeAnnualPlan(ProcurementDetailVo procurementDetailVo) throws Exception {
		JSONArray ja=JSONArray.fromObject(procurementDetailVo.getPurchaseId());
		for(Object obj:ja.toArray()){
			ProcurementDetailVo vo=new ProcurementDetailVo();
			vo.setPurchaseId(obj.toString());
			vo.setStart(0);
			vo.setLimit(0);
			procurementDetailDao.removeAnnualPlan(vo);
		}
		
	}

	public List getContractInfoDetailList(ProcurementDetailVo vo) {
		// TODO Auto-generated method stub
		return procurementDetailDao.getContractInfoDetailList(vo);
	}

	public List getBuinessPlanInfoDetailList(ProcurementDetailVo vo) {
		// TODO Auto-generated method stub
		return procurementDetailDao.getBuinessPlanInfoDetailList(vo);
	}

	@Transactional
	public String changeToConfirm(ProcurementDetailVo vo) {
		return procurementDetailDao.changeToConfirm(vo);
	}

	public ProcurementDetailVo getProcurementDetailById(String id) {
		ProcurementDetail pd = (ProcurementDetail)procurementDetailDao.getHibernateSession().get(ProcurementDetail.class, id);
		ProcurementDetailVo vo = new ProcurementDetailVo();
		try {
			BeanUtils.copyProperties(vo, pd);
			return vo;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	

	@Transactional
	public String resolveProcurementDetail(ProcurementDetailVo vo){
		ProcurementDetail pd=(ProcurementDetail)procurementDetailDao.getHibernateSession()
		                      .get(ProcurementDetail.class, vo.getProcurementDetailId());
		ProcurementDetail newPD=new ProcurementDetail();
		try{
			BeanUtils.copyProperties(newPD, pd);
		}catch(Exception e){
			e.printStackTrace();
			return e.getLocalizedMessage();
		}
		newPD.setNote(vo.getNote());
		newPD.setResolve_number(new BigDecimal(vo.getResolve_number()));
		newPD.setProcurementDetailId(null);
		procurementDetailDao.getHibernateSession().save(newPD);
		pd.setResolve_number(new BigDecimal(vo.getPlanActualnumber()).subtract(newPD.getResolve_number()));
		return null;
	}

}
