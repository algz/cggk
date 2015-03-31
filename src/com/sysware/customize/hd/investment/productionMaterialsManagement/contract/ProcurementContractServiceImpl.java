package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import jxl.Cell;
import jxl.CellType;
import jxl.NumberCell;
import jxl.Sheet;
import jxl.Workbook;

import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.materialQuota.MaterialQuota;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.general.exception.ReduplicatedException;
import com.sysware.customize.hd.investment.productionMaterialsManagement.contractExecute.ContractExecute;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.ParityDaoImpl;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.Procurement;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.Purchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.PurchaseService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.CodeTypeEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ContractApplicationStatusEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.FileCodeGenerator;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;

import freemarker.template.utility.StringUtil;

@Name("contract_ProcurementContractServiceImpl")
public class ProcurementContractServiceImpl implements
		ProcurementContractService {

	@In(create = true, value = "contract_ProcurementContractDaoImpl")
	private ProcurementContractDao procurementContractDao;

	@In(create = true, value = "contractPurchaseServiceImpl")
	private ContractPurchaseService contractPurchaseService;

	@In(create = true, value = "purchaseServiceImpl")
	private PurchaseService purchaseService;
	
	@In(create =true,value="parityDaoImpl")
	private ParityDaoImpl parityDao;
	
	public List<ProcurementContract> getContractsByCondition(
			ProcurementContractCondition condition) {
		return this.procurementContractDao.findByCondition(condition);
	}

	public long countContractsByCondition(ProcurementContractCondition condition) {
		return this.procurementContractDao.countByCondition(condition);
	}

	public ProcurementContract getContractById(String procurementContractId) {
		return this.procurementContractDao.get(procurementContractId);
	}

	@Transactional
	public void saveContract(ProcurementContract contract)
			throws ReduplicatedException {
		if (StringUtils.isEmpty(contract.getProcurementContractId())) {
			contract.setProcurementContractId(null);
			this.procurementContractDao.save(contract);
		} else {
			this.isContractCodeReduplicated(contract);
			this.procurementContractDao.update(contract);
		}
	}

	@Transactional
	public void batchUpdateContract(String[] contractIds) {
		for (String procurementContractId : contractIds) {
			ProcurementContract contract = this
					.getContractById(procurementContractId);

			if (ContractApplicationStatusEnum.DAI_SHEN_PI.getValue().equals(
					contract.getApplicationStatus())) {

				// 设置申请状态为“审批中”
				contract.setApplicationStatus(ContractApplicationStatusEnum.SHEN_PI_ZHONG
						.getValue());
				try {
					this.saveContract(contract);
				} catch (ReduplicatedException e) {
					e.printStackTrace();
				}
			}
		}
	}

	@Transactional
	public void batchUpdateContract(String[] contractIds,
			boolean isApprovalSuccess) {
		for (String procurementContractId : contractIds) {
			ProcurementContract contract = this
					.getContractById(procurementContractId);

			if (ContractApplicationStatusEnum.SHEN_PI_ZHONG.getValue().equals(
					contract.getApplicationStatus())) {
				// 审批是否通过
				if (isApprovalSuccess) {
					// 设置申请状态为“已审批”
					contract.setApplicationStatus(ContractApplicationStatusEnum.YI_SHEN_PI
							.getValue());
				} else {
					// 设置申请状态为“待审批”
					contract.setApplicationStatus(ContractApplicationStatusEnum.DAI_SHEN_PI
							.getValue());
				}
				try {
					this.saveContract(contract);
				} catch (ReduplicatedException e) {
					e.printStackTrace();
				}
			}
		}
	}

	@Transactional
	public int getContractMaxCode(String procurementType) {
		return procurementContractDao.getContractMaxCode(procurementType);
	}

	@Transactional
	public void saveContractAndRelation(ProcurementContract contract,
			ContractPurchase contractPurchase) {
		try {
			this.saveContract(contract);
		} catch (ReduplicatedException e) {
			e.printStackTrace();
		}
		contractPurchase.setProcurementContractId(contract
				.getProcurementContractId());
		contractPurchaseService.saveContractPurchase(contractPurchase);
	}

	/**
	 * 检查合同编号是否重复
	 * 
	 * @param contract
	 *            待保存合同对象
	 * @throws ReduplicatedException
	 */
	private void isContractCodeReduplicated(ProcurementContract contract)
			throws ReduplicatedException {
		if (StringUtils.isNotBlank(contract.getContractCode())) {
			try {
				this.procurementContractDao.getBy("contractCode",
						contract.getContractCode());
			} catch (Exception e) {
				throw new ReduplicatedException("合同编号重复！");
			}
		}
	}

	@Transactional
	public void importContract(Workbook workbook, Map<String, String> formField,
			List<String> noExistProducts, List<Material> newMaterials) throws FileUploadException {
		Integer maxCode = null;
		int numberOfSheets = workbook.getNumberOfSheets();//获得表单数
		for (int i = 0; i < numberOfSheets; i++) {
			Sheet sheet = workbook.getSheet(i);
			//Excel行查询
			for (int m = 1; m < sheet.getRows(); m++) {
				Cell[] cells=sheet.getRow(m);
				if(cells.length<4)break;
//供货商
				String sql="select {v.*} from T_VENDOR v where v.vendorname=:name";
				Vendor vendor=(Vendor)procurementContractDao.getHibernateSession().createSQLQuery(sql)
				                                            .addEntity("v",Vendor.class)
				                                            .setParameter("name", cells[3].getContents())
				                                            .setMaxResults(1).uniqueResult();
				if(vendor==null){
					throw new FileUploadException("供应商找不到,不能导入!");
				}
				
//				//合同表
//				Contract contract=new Contract();
//				contract.setContractCode(cells[0].getContents());//合同编号
//				contract.setContractName(cells[1].getContents());//合同名称
//				contract.setDepartmentA(cells[2].getContents());
//				contract.setDepartmentB(cells[3].getContents());
//				if(cells[4].getType() == CellType.NUMBER)
//				{
//				 NumberCell numc10 = (NumberCell)cells[4];
//				 contract.setContractAmount(new BigDecimal(numc10.getValue()));
//				}
//				
//				this.procurementContractDao.getHibernateSession().save(contract);


				
//				T_PROCUREMENTCONTRACT pc: 采购合同
				ProcurementContract pc=new ProcurementContract();
				pc.setContractCode(cells[0].getContents());// 合同编号
				pc.setApplicationStatus("5");//申请状态:5 已生成台账
//				private Date arrivalDate;// 到货日期
				if(cells[4].getType() == CellType.NUMBER)
				{
				 NumberCell numc10 = (NumberCell)cells[4];
				 pc.setContractAmount(new BigDecimal(numc10.getValue()));// 合同总金额
				}
				pc.setContractName(cells[1].getContents());// 合同名称
				pc.setCreateDate(new Date());// 生成日期,默认取当前日期
//				private String remark;// 备注
				pc.setVendor(vendor.getVendorID());// 供货商主键
				pc.setVendName(vendor.getVendorName());//供货商名称
//				private String attachments;// 合同附件。如果有多个，请上传压缩包。
				pc.setCreateType("1");// 合同 类型 1 直接生成 2 比价 3 招投标
				// 生成合同审签单编号
				maxCode = (maxCode == null) ? maxCode =getContractMaxCode("1") : maxCode++;			
				String maxCodeStr = String.valueOf(maxCode);
				String oriCodeStr = FileCodeGenerator.getContractCode(ProcurementTypeEnum
						.getByValue("1"),CodeTypeEnum.valueOf("ZHI_JIE_CAI_GOU"));
				String codeStr = oriCodeStr.substring(0, oriCodeStr.length() - maxCodeStr.length())
						.concat(maxCodeStr);
				pc.setAuditCode(codeStr);//合同审签编号	
			    this.procurementContractDao.getHibernateSession().save(pc);
				
				//T_PROCUREMENTCONTRACTBOOK pcb：采购合同台账
				ProcurementContractBook pcb=new ProcurementContractBook();
//				private String deliverNode; // 交付节点
//				private String executetion;// 执行情况
//				private BigDecimal arriveCircs;// 货款支付情况
//				private String remarks;// 备注
//				private String procurementContractId;
				pcb.setProcurementContractId(pc.getProcurementContractId());// 合同ID
//				private String materialId;// 物资ID
				pcb.setSignDate(new Date());// 合同签订日期
				this.procurementContractDao.getHibernateSession().save(pcb);
//				pcb.procurementContractId = pc.procurementContractId 
				
			}
		}

	}

	@Transactional
	public void importContractDetail(Workbook workbook, Map<String, String> formField,
			List<String> noExistProducts, List<Material> newMaterials) throws FileUploadException {

		int numberOfSheets = workbook.getNumberOfSheets();//获得表单数
		for (int i = 0; i < numberOfSheets; i++) {
			Sheet sheet = workbook.getSheet(i);
			
			//Excel行查询
			for (int m = 2; m < sheet.getRows(); m++) {
				Cell[] cells=sheet.getRow(m);
				//没有合同编号,则跳到一个记录
				if(cells[0].getContents()==null||cells[1].getContents().equals("")){
					continue;
				}
				
				//合同执行人
				String sql="SELECT  u.userid from t_user u where u.TRUENAME=:name";
				BigDecimal userid=(BigDecimal)procurementContractDao.getHibernateSession().createSQLQuery(sql).setParameter("name", cells[1].getContents()).setMaxResults(1).uniqueResult();
				if(userid==null){
					throw new FileUploadException("不能导入,用户不存在!");
				}
				
				//物质信息
				sql="SELECT {m.*}  from T_MATERIAL m where m.MATERIALITEMCODE=:materialCode";
				Material material=(Material)procurementContractDao.getHibernateSession().createSQLQuery(sql).addEntity("m",Material.class).setParameter("materialCode", cells[2].getContents()).setMaxResults(1).uniqueResult();
				if(material==null){
//					continue;
					throw new FileUploadException("不能导入,物料编码不存在!");
				}
				
				sql="SELECT {mq.*}  from T_MATERIALQUOTA mq where MQ.MATERIALID=:MATERIALID";
				MaterialQuota mq=(MaterialQuota)this.procurementContractDao.getHibernateSession().createSQLQuery(sql).addEntity("mq",MaterialQuota.class).setParameter("MATERIALID", material.getMaterialid()).setMaxResults(1).uniqueResult();
				
				//采购合同
				sql="select {pc.*} from T_PROCUREMENTCONTRACT pc where PC.CONTRACTCODE=:contractCode";
				ProcurementContract pc=(ProcurementContract)procurementContractDao.getHibernateSession().createSQLQuery(sql)
				                                           .addEntity("pc",ProcurementContract.class)
				                                           .setParameter("contractCode", cells[0].getContents())
				                                           .setMaxResults(1).uniqueResult();
				if(pc==null){
					continue;
				}
				pc.setEditors(userid.toString());// 编辑人,合同查询时用到
				pc.setMaterialType(material.getMaterialCatalog().getMaterialtypename());//物资种类
//				this.procurementContractDao.getHibernateSession().save(pc);
				//更新合同的物资关联
				sql="update T_PROCUREMENTCONTRACTBOOK pcb set PCB.MATERIALID=:materialID where PCB.PROCUREMENTCONTRACTID=:contractID";
				procurementContractDao.getHibernateSession().createSQLQuery(sql)
				                      .setParameter("materialID", material.getMaterialid())
				                      .setParameter("contractID", pc.getProcurementContractId())
				                      .executeUpdate();
				
				
				//t_purchase:采购清单
				Purchase purchase=new Purchase();
				int maxCode = purchaseService.getPurchaseMaxCode("1");
				String maxCodeStr = String.valueOf(maxCode);
				String oriCodeStr = FileCodeGenerator.getPurchaseCode(ProcurementTypeEnum
						.getByValue("1"));

				String codeStr = oriCodeStr.substring(0, oriCodeStr.length() - maxCodeStr.length()).concat(
						maxCodeStr);
				purchase.setPurchaseCode(codeStr);// 采购编号
				purchase.setCreateDate(new Date());// 生成日期
				purchase.setStatus("4");// 申请状态
				purchase.setMaterialTypeName(material.getMaterialCatalog().getMaterialtypename());// 物资种类
			    purchase.setEditor(userid.toString());// 编辑人
				purchase.setType("1");// 采购需求类型：1年度需求, 2 零星需求
//				private String remark;// 备注
				this.procurementContractDao.getHibernateSession().save(purchase);
				
				
//				T_PROCUREMENTCONTRACT_PURCHASE pcp: 采购合同与采购清单关联表
				ContractPurchase cp =new ContractPurchase();
//				String id; // 关联ID
				cp.setPurchaseId(purchase.getPurchaseId());// 采购清单ID
				cp.setProcurementContractId(pc.getProcurementContractId());// 采购合同ID
				cp.setMaterialId(material.getMaterialid());// 物料ID
				this.procurementContractDao.getHibernateSession().save(cp);
//				pd.purchaseid = pcp.purchaseid 
				
				//T_PROCUREMENT:采购需求
				Procurement procurement=new Procurement();
//				private String procurementCode;// 采购需求编号
				procurement.setActualPurchase(new BigDecimal(cells[9].getContents()));// 实际采购数量
//				private Date deliveryDate;// 交货日期
				procurement.setProcurementType("1");// 需求类型：年度采购需求（1）； 零星采购需求（2）
				procurement.setReportedor(userid.toString());// 填报人
				procurement.setCreateDate(new Date());// 生成日期
//				private String remarks;// 备注
				procurement.setFlag("1");// 状态：未发布（0）；已发布（1）
//				private String approvalPerson;// 申请人
//				private String requireDemartment;// 需求单位
				this.procurementContractDao.getHibernateSession().save(procurement);

				
//				T_PROCUREMENTDETAIL pd：采购需求明细表
				ProcurementDetail pd=new ProcurementDetail();
//				private String buinessPlanDetailsId;// 年度计划明细ID
				{
					//2012/06/29 由于材料定额采用洪都提供的视图,且四个字段的联合主键,所以外键关联增加四个字段.
//				pd.setMaterialQuotaId(mq.getMaterialQuotaId());// 材料定额ID
				pd.setJX(mq.getJX());
				pd.setQSJH(mq.getQSJH());
				pd.setZZJH(mq.getZZJH());
				pd.setCLDM(mq.getCLDM());
				}
				pd.setMaterialTypeName(material.getMaterialCatalog().getMaterialtypename());// 物质类型名称
				pd.setVendorId(pc.getVendor());// 供应商ID
//				private BigDecimal materialCounts;// 材料需用总量
				pd.setPurchaseType("3");// 采购方式：1.比价；2.招标；3.直接采购 4 协议采购，5其它采购
				pd.setProcurementId(procurement.getProcurementId());// 采购需求ID
				pd.setActualNumber(new BigDecimal(cells[10].getContents()));// 实际采购数量
				pd.setPurchaseId(purchase.getPurchaseId());// 采购清单ID
				pd.setJan(new BigDecimal(cells[15].getContents()));// 一月需求数量
				pd.setFeb(new BigDecimal(cells[16].getContents()));// 二月需求数量
				pd.setMar(new BigDecimal(cells[17].getContents()));// 三月需求数量
				pd.setApr(new BigDecimal(cells[18].getContents()));// 四月需求数量
				pd.setMay(new BigDecimal(cells[19].getContents()));// 五月需求数量
				pd.setJune(new BigDecimal(cells[20].getContents()));// 六月需求数量
				pd.setJuly(new BigDecimal(cells[21].getContents()));// 七月需求数量
				pd.setAug(new BigDecimal(cells[22].getContents()));// 八月需求数量
				pd.setSept(new BigDecimal(cells[23].getContents()));// 九月需求数量
				pd.setOct(new BigDecimal(cells[24].getContents()));// 十月需求数量
				pd.setNov(new BigDecimal(cells[25].getContents()));// 十一月需求数量
				pd.setDect(new BigDecimal(cells[26].getContents()));// 十二月需求数量
				if(cells.length>27){
					BigDecimal count=BigDecimal.ZERO;
					for(int j=28;j<cells.length;j++){
						count=count.add(new BigDecimal(cells[j].getContents()));
					}
					pd.setOther(count);//其它月份需求数量
				}
				pd.setPrice(new BigDecimal(cells[13].getContents()));//单价
				pd.setMaterialId(material.getMaterialid());// 物料ID
				this.procurementContractDao.getHibernateSession().save(pd);
				
//				private Date deliveryDate;// 交货日期
//				private BigDecimal backNumber;// 返修品
//				private BigDecimal onNumber;// 欠交合同
//				private BigDecimal storeNumber;// 库存
//				private BigDecimal needNumber;// 需定量
//				private String productId;// 产品ID
//				private String productCode;// 产品代号
//				private String materialQuotaType;// 材料定额类型：1-材料定额表(T_MaterialQuota)；2-清册明细表(T_inventory)
//				private BigDecimal noCheck; // 无待检
//				private BigDecimal noExpend; // 无预计消耗
//				private BigDecimal operable; // 有无合用
				
//T_ContractExecute:合同执行
				ContractExecute ce=new ContractExecute();
				ce.setProcurementContractId(pc.getProcurementContractId());// 合同ID
				ce.setStorageNumber(new BigDecimal(cells[9].getContents()));//合格数量
				ce.setEquipmentNumber(new BigDecimal(cells[10].getContents()));//材料到厂数量
				this.procurementContractDao.getHibernateSession().save(ce);
//				private String acceptance;// 保管验收盖章
//				private String batchNo;// 批次号
//				private String certificate;// 技术证明
//				private Date createDate;// 创建日期
//				private String remark;// 备注
//				private Date storageDate;// 入库日期
//				private String storageNo;// 入库单号
//				private Date testDate;// 请验日期
//				private String testNo;// 请验单号
//				private Date transportDate;// 运输日期
//				private String transportMode;// 运输方式
//				private String transportNo;// 运输单号
//				private Date arrivalDate;// 到场时间
				
			}
		}

	}

	public ArrayList<ArrayList<String>> getContractInfo(String contractId,String contract_model_no) {
		return procurementContractDao.getContractInfo(contractId,contract_model_no);
	}

	@Transactional
	public String delProcurementContractById(ProcurementContractVo vo){
		String[] contractIds=StringUtil.split(vo.getProcurementContractId(), ',');
		for(String contractId:contractIds){
			ProcurementContract pc=(ProcurementContract)parityDao.getHibernateSession().get(ProcurementContract.class, contractId);
			if(pc.getApplicationStatus().equals("3")||pc.getApplicationStatus().equals("4")||pc.getApplicationStatus().equals("5")){
				continue;
			}
			
			String sql="select pcp.purchaseid,pcp.materialid,pc.vendor " +
					"from t_procurementcontract_purchase pcp inner join t_procurementcontract pc " +
					"on pcp.procurementcontractid=pc.procurementcontractid "+
                       "where  pcp.procurementcontractid='"+contractId+"'";
			List<Object[]> objList=parityDao.getHibernateSession().createSQLQuery(sql).list();
			for(Object[] objs:objList){
				//更新parity表中数据的状态
				sql="update t_parity par set par.applicationstatus='6' " +
						"where par.purchaseid=:purchaseid and par.materialid=:materialid " +
						"and par.vendorid=:vendorid";
				parityDao.getHibernateSession().createSQLQuery(sql)
				         .setParameter("purchaseid",objs[0])
				         .setParameter("materialid", objs[1])
				         .setParameter("vendorid", objs[2]).executeUpdate();
			}
			
			//删除采购需求与合同关联关系表中的数据
			procurementContractDao.getHibernateSession().createSQLQuery("delete from t_procurementcontract_purchase pcp " +
					"where pcp.procurementcontractid='"+contractId+"'").executeUpdate();
			//删除合同
			procurementContractDao.getHibernateSession().createSQLQuery("delete from t_procurementcontract pc " +
					"where pc.procurementcontractid='"+contractId+"'").executeUpdate();
		}
		return null;
	}
}
