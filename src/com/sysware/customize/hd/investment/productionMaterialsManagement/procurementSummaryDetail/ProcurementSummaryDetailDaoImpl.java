package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementSummaryDetail;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.Query;
import javax.persistence.Transient;

import org.apache.commons.lang.StringUtils;
import org.hibernate.SQLQuery;
import org.hibernate.StaleObjectStateException;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialServiceImpl;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalogService;
import com.sysware.customize.hd.investment.baseData.materialQuota.MaterialQuota;
import com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlanDetail.BuinessPlanDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.Parity;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.Procurement;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.Purchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.PurchaseTypeEnum;

@Name("procurementSummaryDetailDaoImpl")
public class ProcurementSummaryDetailDaoImpl implements procurementSummaryDetailDao  {
	@In(create = true, value = "materialCatalogServiceImpl")
	MaterialCatalogService materialCatalogService;

	@In(create = true)
	Identity identity;
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	// 处理单个物资需求对象-设置各属性值
	public ProcurementSummaryDetail saveProcurementSummaryDetail(Procurement procurement,
			BuinessPlanDetail businessPlanDetail, List<MaterialQuota> materialQuotas) {
		for(MaterialQuota materialQuota : materialQuotas){
			
		Material m = (Material) dao.getHibernateSession().createQuery("from Material m where m.materialitemcode=:materialitemcode").setParameter("materialitemcode",
				materialQuota.getCLDM()).setMaxResults(1).uniqueResult();
		// 物料组别与定额材料组别相等则进行导入
		String groupType=businessPlanDetail.getGroupType();
		if (!m.getGroupType().equals(groupType.equals("零件")?"1":(groupType.equals("初装")?"2":"3"))) {
			return null;
		}
		
		ProcurementSummaryDetail psd = new ProcurementSummaryDetail();
		psd.setProcurementid(procurement.getProcurementId());//关联采购计划
		psd.setJX(materialQuota.getJX());
		BigDecimal	materialCount=materialQuota.getQJDE()==null?BigDecimal.ZERO:materialQuota.getQJDE();//全机定额(数量)
        psd.setMaterialId(m.getMaterialid());//物料ID
        psd.setBuinessplanId(businessPlanDetail.getBuinessPlan().getBuinessPlanId());//经营计划ID,在汇总明细查询时用到
        psd.setJan(businessPlanDetail.getJanuary()==null?BigDecimal.ZERO:businessPlanDetail.getJanuary().multiply(materialCount));
		psd.setFeb(businessPlanDetail.getFebruary()==null?BigDecimal.ZERO:businessPlanDetail.getFebruary().multiply(materialCount));
		psd.setMar(businessPlanDetail.getMarch()==null?BigDecimal.ZERO:businessPlanDetail.getMarch().multiply(materialCount));
		psd.setApr(businessPlanDetail.getApril()==null?BigDecimal.ZERO:businessPlanDetail.getApril().multiply(materialCount));
		psd.setMay(businessPlanDetail.getMay()==null?BigDecimal.ZERO:businessPlanDetail.getMay().multiply(materialCount));
		psd.setJune(businessPlanDetail.getJune()==null?BigDecimal.ZERO:businessPlanDetail.getJune().multiply(materialCount));
		psd.setJuly(businessPlanDetail.getJuly()==null?BigDecimal.ZERO:businessPlanDetail.getJuly().multiply(materialCount));
		psd.setAug(businessPlanDetail.getAugust()==null?BigDecimal.ZERO:businessPlanDetail.getAugust().multiply(materialCount));
		psd.setSept(businessPlanDetail.getSeptember()==null?BigDecimal.ZERO:businessPlanDetail.getSeptember().multiply(materialCount));
		psd.setOct(businessPlanDetail.getOctober()==null?BigDecimal.ZERO:businessPlanDetail.getOctober().multiply(materialCount));
		psd.setNov(businessPlanDetail.getNovember()==null?BigDecimal.ZERO:businessPlanDetail.getNovember().multiply(materialCount));
		psd.setDect(businessPlanDetail.getDecember()==null?BigDecimal.ZERO:businessPlanDetail.getDecember().multiply(materialCount));

		//lastarrears:预拨计划存放下年交付数量;临批,调整计划存放上年欠交数量
		BigDecimal lastarrears=businessPlanDetail.getLastarrears()==null?BigDecimal.ZERO:businessPlanDetail.getLastarrears();
		BigDecimal deliveryCount=businessPlanDetail.getDeliveryCount()==null?BigDecimal.ZERO:businessPlanDetail.getDeliveryCount();
		//(某个机型的某个物料的)需求总量=(上年欠交+本年交付)*定额
		psd.setMaterialCounts((lastarrears.add(deliveryCount)).multiply(materialCount));
		psd.setCurrentDelivery(deliveryCount.multiply(materialCount));
		psd.setCurrentBatchNo(businessPlanDetail.getCurrentsortie());//本年批架次
		dao.getHibernateSession().save(psd);
		}
		dao.getHibernateSession().flush();
		return null;
	}

	public List<ProcurementSummaryDetailVo> getProcurementSummaryDetailList(
			ProcurementSummaryDetailVo vo) {
		 
		String finalSql = "select p.procurementsummarydetailid, p.procurementdetailid, p.materialid, p.jx, "
						 +"p.jan, p.feb, p.mar, p.apr, p.may, p.june, p.july, p.aug, p.sept, p.oct, p.nov, p.dect,"
						 +"p.materialcounts, p.remark, p.buinessplanid, p.procurementid, "
						 +"t.materialitemname, t.materialstandard, t.techniccondition,"
						 +"t.desingnation, t.demension, tm.materialtypename, tb.plantype, t.referenceprice "
						 +"from t_procurementsummarydetail p "
						 +"join t_buinessplan tb on tb.buinessplanid =  p.buinessplanid "
						 +"join t_material t on t.materialid = p.materialid "
						 +"join t_materialcatalog tm on tm.materialcatalogid=t.parentid "
						 +"where p.materialid =:materialid and p.procurementid=:procurementId";
		SQLQuery query = dao.getHibernateSession().createSQLQuery(finalSql);
		query.setParameter("materialid", vo.getMaterialId());
		query.setParameter("procurementId", vo.getProcurementId());
//		query.setParameter("procurementdetailid", vo.getProcurementDetailId());  
		List<Object[]> list = query.list();
		List<ProcurementSummaryDetailVo> procurementSummaryDetailList = new ArrayList<ProcurementSummaryDetailVo>();
		for (Object[] obj : list) { 
			procurementSummaryDetailList.add(this.getProcurementSummaryDetail(obj));
		}
		return procurementSummaryDetailList;
	}
	
	private ProcurementSummaryDetailVo getProcurementSummaryDetail(Object[] obj) {
		ProcurementSummaryDetailVo procurementSummaryDetail = new ProcurementSummaryDetailVo();
		procurementSummaryDetail.setProcurementSummaryDetailId(obj[0] == null ? "" :obj[0].toString());
		procurementSummaryDetail.setProcurementDetailId(obj[1] == null ? "" :obj[1].toString());
		procurementSummaryDetail.setMaterialId(obj[2] == null ? "" :obj[2].toString());
		procurementSummaryDetail.setJX(obj[3] == null ? "" :obj[3].toString());
		procurementSummaryDetail.setJan(obj[4] == null ? new BigDecimal("0") : new BigDecimal(obj[4].toString()));
		procurementSummaryDetail.setFeb(obj[5] == null ? new BigDecimal("0") : new BigDecimal(obj[5].toString()));
		procurementSummaryDetail.setMar(obj[6] == null ? new BigDecimal("0") : new BigDecimal(obj[6].toString()));
		procurementSummaryDetail.setApr(obj[7] == null ? new BigDecimal("0") : new BigDecimal(obj[7].toString()));
		procurementSummaryDetail.setMay(obj[8] == null ? new BigDecimal("0") : new BigDecimal(obj[8].toString()));
		procurementSummaryDetail.setJune(obj[9] == null ? new BigDecimal("0") : new BigDecimal(obj[9].toString()));
		procurementSummaryDetail.setJuly(obj[10] == null ? new BigDecimal("0") : new BigDecimal(obj[10].toString()));
		procurementSummaryDetail.setAug(obj[11] == null ? new BigDecimal("0") : new BigDecimal(obj[11].toString()));
		procurementSummaryDetail.setSept(obj[12] == null ? new BigDecimal("0") : new BigDecimal(obj[12].toString()));
		procurementSummaryDetail.setOct(obj[13] == null ? new BigDecimal("0") : new BigDecimal(obj[13].toString()));
		procurementSummaryDetail.setNov(obj[14] == null ? new BigDecimal("0") : new BigDecimal(obj[14].toString()));
		procurementSummaryDetail.setDect(obj[15] == null ? new BigDecimal("0") : new BigDecimal(obj[15].toString()));
		procurementSummaryDetail.setMaterialCounts(obj[16] == null ? new BigDecimal("0") :  new BigDecimal(obj[16].toString()));
		procurementSummaryDetail.setRemark(obj[17] == null ? "" :obj[17].toString()); 
		procurementSummaryDetail.setMaterialItemName(obj[20] == null ? "" :obj[20].toString());
		procurementSummaryDetail.setMaterialStandard(obj[21] == null ? "" :obj[21].toString());
		procurementSummaryDetail.setTechnicCondition(obj[22] == null ? "" :obj[22].toString());
		procurementSummaryDetail.setDesingnation(obj[23] == null ? "" :obj[23].toString());
		procurementSummaryDetail.setDemension(obj[24] == null ? "" :obj[24].toString());
		procurementSummaryDetail.setMaterialtypename(obj[25] == null ? "" :obj[25].toString());
		procurementSummaryDetail.setPlanType(obj[26] == null ? "" :obj[26].toString());
		procurementSummaryDetail.setReferenceprice(obj[27] == null ? "" :obj[27].toString());
		return procurementSummaryDetail;
	}
}
