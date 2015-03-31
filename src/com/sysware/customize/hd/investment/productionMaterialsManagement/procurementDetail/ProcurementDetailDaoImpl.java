package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.persistence.Query;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.StaleObjectStateException;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialServiceImpl;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalog;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalogService;
import com.sysware.customize.hd.investment.deviceProject.util.UtilDAOImp;
import com.sysware.customize.hd.investment.productionMaterialsManagement.parity.Parity;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurement.Procurement;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.Purchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.PurchaseService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ApplicationStatusEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.FileCodeGenerator;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.PurchaseTypeEnum;
import com.sysware.customize.hd.investment.purchaseRequest.declareDetail.DeclareDetail;
import com.sysware.customize.hd.investment.util.RoleEnum;

@Name("procurementDetail_ProcurementDetailDaoImpl")
public class ProcurementDetailDaoImpl extends GenericDAOImpl<ProcurementDetail>
		implements ProcurementDetailDao {
	@In(create = true, value = "materialCatalogServiceImpl")
	MaterialCatalogService materialCatalogService;

	@In(create = true, value = "purchaseServiceImpl")
	private PurchaseService purchaseService;
	
	@In(create = true)
	Identity identity;
	
	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	/**
	 * 创建年度计划小计数据
	 * @return
	 */
	@Transactional
	public List<ProcurementDetail> createAnnualProcurementDetail(String procurementid){
		Identity identity  = (Identity)Component.getInstance("org.jboss.seam.security.identity");
		String loginname=identity.getLoginUser().getLoginname();
		List<ProcurementDetail> procurementDetailList=new ArrayList<ProcurementDetail>();
		String sql="select m.materialid,sum(psd.materialcounts),sum(psd.jan), sum(psd.feb), sum(psd.mar), sum(psd.apr),sum(psd.may),sum(psd.june),sum(psd.july),sum(psd.aug),sum(psd.sept),sum(psd.oct),sum(psd.nov),sum(psd.dect),sum(psd.currentdelivery) from t_material m, T_PROCUREMENTSUMMARYDETAIL psd where m.MATERIALID = PSD.MATERIALID  and PSD.PROCUREMENTID =:procurementid "
		          +" and  m.materialid  in (" + MaterialServiceImpl.getMaterialidAuthorityByLoginName(loginname)+ ") "
		          +"group by m.materialid,m.materialitemcode,m.materialitemname order  by m.materialitemname ";
		List<Object[]> list=this.getHibernateSession().createSQLQuery(sql).setParameter("procurementid", procurementid).list();
		for(Object[] objs:list){
			ProcurementDetail pd=new ProcurementDetail();
			Material m=(Material)this.getHibernateSession().get(Material.class, objs[0].toString());
			pd.setMaterialId(m.getMaterialid());
			pd.setMaterialTypeName(m.getMaterialCatalog().getMaterialtypename());//物资类别名称
			pd.setProcurementId(procurementid);//年度采购计划ID
			pd.setMaterialCounts(new BigDecimal(objs[1].toString()));//此物料在当前计划中的总需求量,不包括本次需求量
			pd.setJan(new BigDecimal(objs[2].toString()));
			pd.setFeb(new BigDecimal(objs[3].toString()));
			pd.setMar(new BigDecimal(objs[4].toString()));
			pd.setApr(new BigDecimal(objs[5].toString()));
			pd.setMay(new BigDecimal(objs[6].toString()));
			pd.setJune(new BigDecimal(objs[7].toString()));
			pd.setJuly(new BigDecimal(objs[8].toString()));
			pd.setAug(new BigDecimal(objs[9].toString()));
			pd.setSept(new BigDecimal(objs[10].toString()));
			pd.setOct(new BigDecimal(objs[11].toString()));
			pd.setNov(new BigDecimal(objs[12].toString()));
			pd.setDect(new BigDecimal(objs[13].toString()));
			pd.setCurrentDelivery(new BigDecimal(objs[14].toString()));//本年计划交付数
//			pd.setStatus("0");//0未生成;1生成
			this.getHibernateSession().save(pd);//保存数据
//			procurementDetail.setRemark((String) obj[3]);
//			procurementDetail.setTotalRequired(obj[4]==null?BigDecimal.ZERO:(BigDecimal) obj[4]);
//			procurementDetail.setDeliverycount(obj[5]+"");
			procurementDetailList.add(pd);
		}
		this.getHibernateSession().flush();
		return procurementDetailList;
	}
	
	/**
	 * 获取年度计划小计汇总表数据,并进行资源平衡.Resource Balancing
	 * @param procurementDetailVo
	 * @param loginName
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ProcurementDetailVo> getAnnualProcumentDetail(ProcurementDetailVo procurementDetailVo ) {
//		if(procurementDetailVo.getProcurementId()==null&&procurementDetailVo.getPurchaseId()!=null){
//			String procurementId=(String)dao.getHibernateSession().createSQLQuery("select distinct t.procurementid from t_procurementdetail t where t.purchaseid=:purchaseid")
//			                         .setParameter("purchaseid", procurementDetailVo.getPurchaseId())
//			                         .setMaxResults(1)
//			                         .uniqueResult();
//			procurementDetailVo.setProcurementId(procurementId);
//		}
		List<ProcurementDetailVo> procurementDetailVos = new ArrayList<ProcurementDetailVo>();
		List<ProcurementDetail> procurementDetails=new ArrayList<ProcurementDetail>();
		String loginname=this.identity.getLoginUser().getLoginname();
		//先判断定额计划汇总小计表是否生成
		String sql="select count(1) from t_procurementdetail pd where pd.procurementid=:procurementid"
			      +" and  pd.materialid  in (" + MaterialServiceImpl.getMaterialidAuthorityByLoginName(loginname)+ ") ";
		BigDecimal count=(BigDecimal)this.getHibernateSession().createSQLQuery(sql).setParameter("procurementid", procurementDetailVo.getProcurementId()).uniqueResult();
		if(count.equals(BigDecimal.ZERO)){
			//进行资源平衡,生成汇总小计表
			createAnnualProcurementDetail(procurementDetailVo.getProcurementId());
		}
		
		// 用户权限控制
		sql="from t_procurementdetail pd where pd.procurementid=:procurementid";
		if(!UtilDAOImp.isLeader(getHibernateSession())){
			sql+=" and  pd.materialid  in (" + MaterialServiceImpl.getMaterialidAuthorityByLoginName(loginname)+ ") ";
		}
		//计算汇总小计表总数
		count=(BigDecimal)this.getHibernateSession().createSQLQuery("select count(1) "+sql).setParameter("procurementid", procurementDetailVo.getProcurementId()).uniqueResult();
		procurementDetailVo.setCount(count.intValue());//存入总数中
		//查询汇总小计表
		procurementDetails=this.getHibernateSession().createSQLQuery("select pd.* "+sql)
		                                             .addEntity("pd",ProcurementDetail.class)
		                                             .setParameter("procurementid",procurementDetailVo.getProcurementId())
		                                             .setFirstResult(procurementDetailVo.getStart())
		                                             .setMaxResults(procurementDetailVo.getLimit()).list();
		for (ProcurementDetail procurementDetail : procurementDetails) {
			ProcurementDetailVo vo = new ProcurementDetailVo();
			try {
				BeanUtils.copyProperties(vo, procurementDetail);
				Material m=(Material)this.getHibernateSession().get(Material.class, procurementDetail.getMaterialId());
				//vo.setMaterialitemcode(m.getMaterialitemcode());
				vo.setMaterialItemName(m.getMaterialItemName());
				vo.setDesingnation(m.getDesingnation());
				vo.setMaterialStandard(m.getMaterialStandard());
				vo.setTechnicCondition(m.getTechnicCondition());
				vo.setDemension(m.getDemension());
				vo.setMaterialTypeName(m.getMaterialCatalog().getMaterialtypename());
				vo.setPrice(m.getReferencePrice()==null?"":m.getReferencePrice().toString());//计划单价
				Procurement procurement=(Procurement)this.getHibernateSession().get(Procurement.class, procurementDetail.getProcurementId());
				vo.setPlanType(procurement.getBuinessPlan()== null ? "" :procurement.getBuinessPlan().getPlanType());
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			vo.setMaterialCode(procurementDetail.getMaterialitemcode());
			String materialTypeName = procurementDetailVo.getMaterialTypeName();
			if (StringUtils.isNotEmpty(materialTypeName)) {
				vo.setMaterialTypeName(materialTypeName);
			}
			// 通过物料信息获取库存相关信息,对所有物料进行综合平衡,然后按条件进行筛选
			List<Object[]>obList = getWmsInfoByMaterial(vo);
			// 对平衡的内容进行赋值
			if (obList != null && obList.size() == 1) {
				//上年消耗
				vo.setLast_year_consume(obList.get(0)[0] == null ? "0" : String.valueOf(Math.abs(Float.parseFloat(obList.get(0)[0].toString()))));
				//资源小计
				vo.setSubtotal(obList.get(0)[1] == null ? "0" : obList.get(0)[1].toString());
				//库存
				vo.setStoreNumber(obList.get(0)[2] == null ? "0" : obList.get(0)[2].toString());
				//待检
				vo.setNoCheck(obList.get(0)[3] == null ? "0" : obList.get(0)[3].toString());
				//合同
				vo.setContract(obList.get(0)[4] == null ? "0" : obList.get(0)[4].toString());
				//欠交合同
				vo.setOnNumber(obList.get(0)[5] == null ? "0" : obList.get(0)[5].toString());
				//不合用
				vo.setOperable(obList.get(0)[6] == null ? "0" : obList.get(0)[6].toString());
				//下半年消耗
				vo.setHalf_year_consume(obList.get(0)[7]==null?"":obList.get(0)[7].toString());
				//已发数量
				vo.setOut_num(obList.get(0)[9]==null?"0":obList.get(0)[9].toString());
				
				//vo.setHalf_year_consume(procurementDetail.getSept().add(procurementDetail.getDect()).toString());
				
				
				//vo.setHalf_year_consume(procurementDetail.getJuly().add(procurementDetail.getAug().add(procurementDetail.getSept().add(procurementDetail.getOct().add(procurementDetail.getNov().add(procurementDetail.getDect()))))).toString());
				/*资源小计-下半年消耗
				  变更:
				  资源小计-不合用-下半年消耗
				  >0年末库存(+不合用)
				  <=0下半年缺口 */
				BigDecimal temp1=null;
				if(vo.getPlanType().equals("1")){
					//预拨计划:资源小计-不合用-下半年消耗        >0年末库存(value+不合用) <=0下半年缺口
					if (!vo.getSubtotal().equals("")) {
						temp1 = new BigDecimal(vo.getSubtotal().equals("") ? "0" : vo.getSubtotal()).subtract(
								new BigDecimal(vo.getOperable()).add(
										new BigDecimal(vo.getHalf_year_consume().equals("") ? "0" : vo.getHalf_year_consume())
										));
						if (temp1.doubleValue() > 0) {
							vo.setYear_inventory(temp1.add(new BigDecimal(vo.getOperable())).toString());//年末库存
							vo.setGap_number("0");
						} else{
							vo.setYear_inventory("0");
							//下半年缺口数
							vo.setGap_number(String.valueOf(Math.abs(Float.parseFloat(temp1.toString()))));
						}
					}
				}else{
					//临批,调整计划       资源小计-下半年缺口  >0年末库存   <=0 下半年缺口
					if (!vo.getSubtotal().equals("")) {
						temp1 = new BigDecimal(vo.getSubtotal().equals("") ? "0" : vo.getSubtotal()).subtract(new BigDecimal(vo.getHalf_year_consume().equals("") ? "0" : vo
								.getHalf_year_consume()));
						if (temp1.doubleValue() > 0) {
							vo.setYear_inventory(temp1.toString());//年末库存
							vo.setGap_number("0");
						} else{
							vo.setYear_inventory("0");
							//下半年缺口数
							vo.setGap_number(String.valueOf(Math.abs(Float.parseFloat(temp1.toString()))));
						}
					}
				}

//				System.out.println(obList.get(0)[8]);
				//当前需求量-现有资源
				BigDecimal temp2 = new BigDecimal(vo.getMaterialCounts()).subtract(new BigDecimal(obList.get(0)[8] == null ? "0" : obList.get(0)[8].toString()));
				if (temp2.doubleValue() > 0) {
					//vo.setNumber_applications(temp2.toString());//申请数量
					vo.setNumber_applications(String .valueOf(Math.abs(Float.parseFloat(temp2.toString()))));//申请数量
					vo.setSubtotal_number("0");//多余(小计)数量
				} else {
					vo.setNumber_applications("0");//申请数量
					//多余(小计)数量
					vo.setSubtotal_number(String.valueOf(Math.abs(Float.parseFloat(temp2.toString()))));
				}
				//仅首次执行一次,因为默认为null.
				if(procurementDetail.getActualNumber()==null){
					procurementDetail.setActualNumber(new BigDecimal(vo.getNumber_applications()));//建议采购量
					vo.setActualNumber(vo.getNumber_applications());
				}
				//计划单价
				procurementDetail.setPrice(vo.getPrice()==""?BigDecimal.ZERO:new BigDecimal(vo.getPrice()));
				//申请数量
				procurementDetail.setNumber_applications(new BigDecimal(vo.getNumber_applications()));
				//多余(小计)数量
				procurementDetail.setSubtotal_number(new BigDecimal(vo.getSubtotal_number()));
				//上年消耗
				procurementDetail.setLast_year_consume(new BigDecimal(vo.getLast_year_consume()));
				//下半年消耗
				procurementDetail.setHalf_year_consume(new BigDecimal(vo.getHalf_year_consume()));
				//年末库存
				procurementDetail.setYear_inventory(new BigDecimal(vo.getYear_inventory()));
				//下半年缺口数
				procurementDetail.setGap_number(new BigDecimal(vo.getGap_number()));
				//资源小计
				procurementDetail.setSubtotal(new BigDecimal(vo.getSubtotal()));
				//库存
				procurementDetail.setStoreNumber(new BigDecimal(vo.getStoreNumber()));
				//待检
				procurementDetail.setNoCheck(new BigDecimal(vo.getNoCheck()));
				//合同
				procurementDetail.setContract(new BigDecimal(vo.getContract()));
				//欠缴计划
				procurementDetail.setOnNumber(new BigDecimal(vo.getOnNumber()));
				//有无合用
				procurementDetail.setOperable(new BigDecimal(vo.getOperable()));
				
			}
			// 累计发放批次数
			vo.setProvideNumber(getProvideNumber(vo));
			//processVendorName(procurementDetail, vo);
			procurementDetailVos.add(vo);
		}
		return procurementDetailVos;
		
		
//		String pieceType="0"; 
//		String type="1";
//		
//		StringBuilder queryStr = new StringBuilder();
//		StringBuilder paramStr=new StringBuilder();
//		StringBuilder countQuery=new StringBuilder();
//		queryStr.append(" select pd.procurementdetailid, pd.buinessplandetailsid, pd.materialquotaid, ");
//		queryStr.append(" pd.vendorid, pd.materialtypename, pd.jan, pd.feb, pd.mar, pd.apr, ");
//		queryStr.append(" pd.may, pd.june, pd.july, pd.aug, pd.sept, pd.oct, pd.nov, pd.dect, ");
//		queryStr.append(" pd.materialcounts, pd.actualnumber, pd.purchaseid, pd.purchasetype, ");
//		queryStr.append(" pd.procurementid, pd.price, pd.deliverydate, pd.backnumber, pd.onnumber,pd.note, ");
//		queryStr.append(" pd.storenumber, pd.neednumber, pd.materialquotatype, pd.productcode, pd.productid, pd.optlock, pd.nocheck,pd.noexpend,pd.operable,PD.DECLARE_DETIL_ID,pd.other,pd.subtotal,pd.contract," +
//						" pd.number_applications,pd.amount_applications,pd.subtotal_number,pd.subtotal_amount,pd.super_storage," +
//						" pd.redeployment,pd.last_year_consume,pd.half_year_consume,pd.year_inventory," +
//						"pd.gap_number,pd.reserve,pd.JX,pd.QSJH,pd.ZZJH,pd.CLDM,");
//		queryStr.append(" m.materialitemname, m.desingnation, m.materialstandard, m.techniccondition, m.demension, ");
//		queryStr.append(" m.warningvalue, m.preserveperiod, m.referenceprice, m.remarks, m.parentid, m.materialid,m.materialitemcode, ");
//		queryStr.append(" decode(pd.materialquotatype, ");
//		queryStr.append("  '1',(select mq.materialcount from t_materialquota mq where mq.materialquotaid=pd.materialquotaid), ");
//		queryStr.append("  '2',(select i.numbers from t_inventory i where i.inventoryid=pd.materialquotaid)) as materialcount, ");
//		queryStr.append(" decode(pd.materialquotatype, ");
//		queryStr.append("  '1',(select mq.remark  from t_materialquota mq where mq.materialquotaid=pd.materialquotaid), ");
//		queryStr.append("  '2',(select i.remark from t_inventory i where i.inventoryid=pd.materialquotaid)) as remark  ");
//		queryStr.append(", bpd.totalRequired as totalRequired,bpd.deliverycount,m.DELIVERY_STATUS,m.GROUPTYPE ");
//		
//		paramStr.append(" from t_material m, t_procurementdetail pd, t_buinessplandetails bpd ");
//		//queryStr.append(" where m.materialid = pd.materialid ");
//		paramStr.append("where m.MATERIALITEMCODE = pd.CLDM ");
//		paramStr.append(" and pd.buinessplandetailsid = bpd.buinessplandetailsid ");
//
//		// 处理过程列表使用的条件
//		if (StringUtils.isNotBlank(pieceType)) {
//
//			paramStr.append(" and pd.purchaseid is null ");
////			// 用户权限控制
////			paramStr.append(" and  m.materialitemcode  in (" + MaterialServiceImpl.getMaterialAuthorityByLoginName(loginName)
////					+ ") ");
//
//		}
//		
//		//计算总数
//		countQuery.append(" select count(distinct t.materialid) from (select m.materialid"+paramStr+" and pd.procurementid = :procurementid order  by pd.materialid) t");
//		count=(BigDecimal)this.getHibernateSession().createSQLQuery(countQuery.toString())
//		                                 .setParameter("procurementid", procurementDetailVo.getProcurementId())
//		                                 .setMaxResults(1).uniqueResult();
//		procurementDetailVo.setCount(count.intValue());
//		
//		paramStr.append(" and pd.procurementid =?1 order  by pd.materialid");
//		queryStr.append(paramStr);
//		Query query = this.em.createNativeQuery(queryStr.toString(),
//				"ProcurementAnnualDetailResults").setParameter(1,procurementDetailVo.getProcurementId()); 
//		if (procurementDetailVo.getStart() >= 0 && procurementDetailVo.getLimit()> 0) {
//			query.setFirstResult(procurementDetailVo.getStart());
//			query.setMaxResults(procurementDetailVo.getLimit());
//		}
//
//		List<Object[]> temp = query.getResultList();
//        HashMap<String ,Integer> valueMap = new HashMap<String ,Integer>();
//		List<ProcurementDetail> procurementDetails = new ArrayList<ProcurementDetail>();
//		int index = 0;
//		for (int i = 0; i < temp.size(); i++) {
//			Object[] obj = (Object[]) temp.get(i);
//			ProcurementDetail procurementDetail = (ProcurementDetail) obj[0];
//			Material material = (Material) obj[1];
//			if(type.equals("1")){
//				if(valueMap.isEmpty() || valueMap.get(material.getMaterialid())==null)
//				{
//					
//					valueMap.put(material.getMaterialid(), index);
//					index++; 
//				}
//				else{
//					procurementDetails.get(valueMap.get(material.getMaterialid())).setProductCode("详细");
//					procurementDetails.get(valueMap.get(material.getMaterialid()))
//					                  .setTotalRequired(
//					                		  procurementDetails.get(valueMap.get(material.getMaterialid()))
//					                		                    .getTotalRequired().add(
//					                		                    		procurementDetail.getTotalRequired()==null?new BigDecimal("0"):procurementDetail.getTotalRequired()));
//					
//					procurementDetails.get(valueMap.get(material.getMaterialid()))
//					.setMaterialCount(procurementDetails.get(valueMap.get(material.getMaterialid())).
//					getMaterialCount().add(procurementDetail.getMaterialCount()==null?new BigDecimal("0"):procurementDetail.getMaterialCount()));
//					
//					procurementDetails.get(valueMap.get(material.getMaterialid())).setMaterialCounts(procurementDetails.get(valueMap.get(material.getMaterialid())).getMaterialCounts().add(procurementDetail.getMaterialCounts()==null?new BigDecimal("0"):procurementDetail.getMaterialCounts()));
//					procurementDetails.get(valueMap.get(material.getMaterialid())).setMar(procurementDetails.get(valueMap.get(material.getMaterialid())).getMar().add(procurementDetail.getMar()==null?new BigDecimal("0"):procurementDetail.getMar()));
//					procurementDetails.get(valueMap.get(material.getMaterialid())).setJune(procurementDetails.get(valueMap.get(material.getMaterialid())).getJune().add(procurementDetail.getJune()==null?new BigDecimal("0"):procurementDetail.getJune()));
//					procurementDetails.get(valueMap.get(material.getMaterialid())).setSept(procurementDetails.get(valueMap.get(material.getMaterialid())).getSept().add(procurementDetail.getSept()==null?new BigDecimal("0"):procurementDetail.getSept()));
//					procurementDetails.get(valueMap.get(material.getMaterialid())).setDect(procurementDetails.get(valueMap.get(material.getMaterialid())).getDect().add(procurementDetail.getDect()==null?new BigDecimal("0"):procurementDetail.getDect()));
//					procurementDetails.get(valueMap.get(material.getMaterialid())).setDeliverycount(String.valueOf(new BigDecimal(procurementDetails.get(valueMap.get(material.getMaterialid())).getDeliveryCount()).add(new BigDecimal(String.valueOf(obj[5]==null?"0":obj[5])))));
//					continue;
//				}
//			}
//			procurementDetail.setMaterialId(material.getMaterialid());
//			procurementDetail.setMaterialItemName(material
//					.getMaterialItemName());
//			procurementDetail.setDesingnation(material.getDesingnation());
//			procurementDetail.setMaterialStandard(material
//					.getMaterialStandard());
//			procurementDetail.setTechnicCondition(material
//					.getTechnicCondition());
//			procurementDetail.setDemension(material.getDemension());
//			procurementDetail.setMaterialitemcode(material.getMaterialitemcode());
//			procurementDetail.setMaterialCount((BigDecimal) obj[2]);
//			procurementDetail.setRemark((String) obj[3]);
//			procurementDetail.setTotalRequired(obj[4]==null?BigDecimal.ZERO:(BigDecimal) obj[4]);
//			procurementDetail.setDeliverycount(obj[5]+"");
//			if (procurementDetail.getMaterialCount()==null) {
//				procurementDetail.setMaterialCount(new BigDecimal("0"));
//			}
//			procurementDetails.add(procurementDetail);
//		}
//		return procurementDetails;
	}
	
	
	@SuppressWarnings("unchecked")
	public List<ProcurementDetail> getAnnualDetailByUserId(ProcurementDetailVo procurementDetailVo,String loginName) {
		String pieceType="0"; 
		String type="1";
		
		StringBuilder queryStr = new StringBuilder();
		StringBuilder paramStr=new StringBuilder();
		StringBuilder countQuery=new StringBuilder();
		queryStr.append(" select pd.procurementdetailid, pd.buinessplandetailsid, pd.materialquotaid, ");
		queryStr.append(" pd.resolve_number,pd.vendorid, pd.materialtypename, pd.jan, pd.feb, pd.mar, pd.apr, ");
		queryStr.append(" pd.may, pd.june, pd.july, pd.aug, pd.sept, pd.oct, pd.nov, pd.dect, ");
		queryStr.append(" pd.materialcounts, pd.actualnumber, pd.purchaseid, pd.purchasetype, ");
		queryStr.append(" pd.procurementid, pd.price, pd.deliverydate, pd.backnumber, pd.onnumber,pd.note, ");
		queryStr.append(" pd.storenumber, pd.neednumber, pd.materialquotatype, pd.productcode, pd.productid, pd.optlock, pd.nocheck,pd.noexpend,pd.operable,PD.DECLARE_DETIL_ID,pd.other,pd.subtotal,pd.contract," +
						" pd.number_applications,pd.amount_applications,pd.subtotal_number,pd.subtotal_amount,pd.super_storage," +
						" pd.redeployment,pd.last_year_consume,pd.half_year_consume,pd.year_inventory," +
						"pd.gap_number,pd.reserve,pd.JX,pd.QSJH,pd.ZZJH,pd.CLDM,");
		queryStr.append(" m.materialitemname, m.desingnation, m.materialstandard, m.techniccondition, m.demension, ");
		queryStr.append(" m.warningvalue, m.preserveperiod, m.referenceprice, m.remarks, m.parentid, m.materialid,m.materialitemcode, ");
		queryStr.append(" decode(pd.materialquotatype, ");
		queryStr.append("  '1',(select mq.materialcount from t_materialquota mq where mq.materialquotaid=pd.materialquotaid), ");
		queryStr.append("  '2',(select i.numbers from t_inventory i where i.inventoryid=pd.materialquotaid)) as materialcount, ");
		queryStr.append(" decode(pd.materialquotatype, ");
		queryStr.append("  '1',(select mq.remark  from t_materialquota mq where mq.materialquotaid=pd.materialquotaid), ");
		queryStr.append("  '2',(select i.remark from t_inventory i where i.inventoryid=pd.materialquotaid)) as remark  ");
		queryStr.append(", bpd.totalRequired as totalRequired,bpd.deliverycount,m.DELIVERY_STATUS,m.GROUPTYPE ");
		
		paramStr.append(" from t_material m, t_procurementdetail pd, t_buinessplandetails bpd ");
		//queryStr.append(" where m.materialid = pd.materialid ");
		paramStr.append("where m.MATERIALITEMCODE = pd.CLDM ");
		paramStr.append(" and pd.buinessplandetailsid = bpd.buinessplandetailsid ");

		// 处理过程列表使用的条件
		if (StringUtils.isNotBlank(pieceType)) {

			paramStr.append(" and pd.purchaseid is null ");
//			// 用户权限控制
//			paramStr.append(" and  m.materialitemcode  in (" + MaterialServiceImpl.getMaterialAuthorityByLoginName(loginName)
//					+ ") ");

		}
		
		//计算总数
		countQuery.append(" select count(distinct t.materialid) from (select m.materialid"+paramStr+" and pd.procurementid = :procurementid order  by pd.materialid) t");
		BigDecimal count=(BigDecimal)this.getHibernateSession().createSQLQuery(countQuery.toString())
		                                 .setParameter("procurementid", procurementDetailVo.getProcurementId())
		                                 .setMaxResults(1).uniqueResult();
		procurementDetailVo.setCount(count.intValue());
		
		paramStr.append(" and pd.procurementid =?1 order  by pd.materialid");
		queryStr.append(paramStr);
		Query query = this.em.createNativeQuery(queryStr.toString(),
				"ProcurementAnnualDetailResults").setParameter(1,procurementDetailVo.getProcurementId()); 
		if (procurementDetailVo.getStart() >= 0 && procurementDetailVo.getLimit()> 0) {
			query.setFirstResult(procurementDetailVo.getStart());
			query.setMaxResults(procurementDetailVo.getLimit());
		}

		List<Object[]> temp = query.getResultList();
        HashMap<String ,Integer> valueMap = new HashMap<String ,Integer>();
		List<ProcurementDetail> procurementDetails = new ArrayList<ProcurementDetail>();
		int index = 0;
		for (int i = 0; i < temp.size(); i++) {
			Object[] obj = (Object[]) temp.get(i);
			ProcurementDetail procurementDetail = (ProcurementDetail) obj[0];
			Material material = (Material) obj[1];
			if(type.equals("1")){
				if(valueMap.isEmpty() || valueMap.get(material.getMaterialid())==null)
				{
					
					valueMap.put(material.getMaterialid(), index);
					index++; 
				}
				else{
					procurementDetails.get(valueMap.get(material.getMaterialid())).setProductCode("详细");
					procurementDetails.get(valueMap.get(material.getMaterialid()))
					                  .setTotalRequired(
					                		  procurementDetails.get(valueMap.get(material.getMaterialid()))
					                		                    .getTotalRequired().add(
					                		                    		procurementDetail.getTotalRequired()==null?new BigDecimal("0"):procurementDetail.getTotalRequired()));
					
					procurementDetails.get(valueMap.get(material.getMaterialid()))
					.setMaterialCount(procurementDetails.get(valueMap.get(material.getMaterialid())).
					getMaterialCount().add(procurementDetail.getMaterialCount()==null?new BigDecimal("0"):procurementDetail.getMaterialCount()));
					
					procurementDetails.get(valueMap.get(material.getMaterialid())).setMaterialCounts(procurementDetails.get(valueMap.get(material.getMaterialid())).getMaterialCounts().add(procurementDetail.getMaterialCounts()==null?new BigDecimal("0"):procurementDetail.getMaterialCounts()));
					procurementDetails.get(valueMap.get(material.getMaterialid())).setMar(procurementDetails.get(valueMap.get(material.getMaterialid())).getMar().add(procurementDetail.getMar()==null?new BigDecimal("0"):procurementDetail.getMar()));
					procurementDetails.get(valueMap.get(material.getMaterialid())).setJune(procurementDetails.get(valueMap.get(material.getMaterialid())).getJune().add(procurementDetail.getJune()==null?new BigDecimal("0"):procurementDetail.getJune()));
					procurementDetails.get(valueMap.get(material.getMaterialid())).setSept(procurementDetails.get(valueMap.get(material.getMaterialid())).getSept().add(procurementDetail.getSept()==null?new BigDecimal("0"):procurementDetail.getSept()));
					procurementDetails.get(valueMap.get(material.getMaterialid())).setDect(procurementDetails.get(valueMap.get(material.getMaterialid())).getDect().add(procurementDetail.getDect()==null?new BigDecimal("0"):procurementDetail.getDect()));
					procurementDetails.get(valueMap.get(material.getMaterialid())).setDeliverycount(String.valueOf(new BigDecimal(procurementDetails.get(valueMap.get(material.getMaterialid())).getDeliveryCount()).add(new BigDecimal(String.valueOf(obj[5]==null?"0":obj[5])))));
					continue;
				}
			}
			procurementDetail.setMaterialId(material.getMaterialid());
			procurementDetail.setMaterialItemName(material
					.getMaterialItemName());
			procurementDetail.setDesingnation(material.getDesingnation());
			procurementDetail.setMaterialStandard(material
					.getMaterialStandard());
			procurementDetail.setTechnicCondition(material
					.getTechnicCondition());
			procurementDetail.setDemension(material.getDemension());
			procurementDetail.setMaterialitemcode(material.getMaterialitemcode());
			procurementDetail.setMaterialCount((BigDecimal) obj[2]);
			procurementDetail.setRemark((String) obj[3]);
			procurementDetail.setTotalRequired(obj[4]==null?BigDecimal.ZERO:(BigDecimal) obj[4]);
			procurementDetail.setDeliverycount(obj[5]+"");
			if (procurementDetail.getMaterialCount()==null) {
				procurementDetail.setMaterialCount(new BigDecimal("0"));
			}
			procurementDetails.add(procurementDetail);
		}
		return procurementDetails;
	}
	public long getAnnualDetailByMaterialIdsCount(String procurementId, String nodeId,  String pieceType, String materialCatLogId,String type) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append(" select count(0) ");
		queryStr.append(" from t_material m, t_procurementdetail pd, t_buinessplandetails bpd ");
		queryStr.append(" where m.materialid = pd.materialid ");
		queryStr.append(" and pd.buinessplandetailsid = bpd.buinessplandetailsid ");

		// 处理过程列表使用的条件
		if (StringUtils.isNotBlank(pieceType)) {
			if (StringUtils.isNotBlank(materialCatLogId)) {
				queryStr.append(" and m.parentid = '" + materialCatLogId.trim()
						+ "'");
			}
			queryStr.append(" and pd.purchaseid is null ");
			// 用户权限控制
			String materialCatalogSql = materialCatalogService
					.getMaterialCatalog();
			queryStr.append(" and  m.parentid  in (" + materialCatalogSql
					+ ") ");

		}
		queryStr.append(" and pd.procurementid = '"+procurementId+"'");

		if(type.equals("2") && nodeId != null && nodeId.length() > 0){
			queryStr.append(" and pd.materialid='"+nodeId+"'");
		}
		else if (nodeId != null && nodeId.length() > 0) {
			queryStr.append(" and pd.materialid in (");
			queryStr.append(" select tm.materialid from t_material tm where tm.parentid in (");
			queryStr.append(" select mc.materialcatalogid from t_materialcatalog mc ");
			queryStr.append(" start with mc.materialcatalogid='"+nodeId+"' ");
			queryStr.append(" connect by prior mc.materialcatalogid = mc.parentid) ");
			queryStr.append(")");
		}
		return ((BigDecimal) this.executeNativeQuery(queryStr.toString(),
				null, 0, 0).get(0)).longValue();
	}
	@SuppressWarnings("unchecked")
	public List<ProcurementDetail> getSporadicDetailByMaterialIds(
			Procurement procurement, String nodeId, int start,
			int limit, String pieceType, String materialCatLogId) {

		StringBuilder queryStr = new StringBuilder();
		queryStr.append(" select pd.procurementdetailid, pd.buinessplandetailsid, pd.materialquotaid, ");
		queryStr.append(" pd.resolve_number,pd.vendorid, pd.materialtypename, pd.jan, pd.feb, pd.mar, pd.apr, ");
		queryStr.append(" pd.may, pd.june, pd.july, pd.aug, pd.sept, pd.oct, pd.nov, pd.dect, pd.nocheck,pd.noexpend,pd.operable,");
		queryStr.append(" pd.materialcounts, pd.actualnumber, pd.purchaseid, pd.purchasetype, ");
		queryStr.append(" pd.procurementid, pd.price, pd.deliverydate, pd.backnumber, pd.onnumber, ");
		queryStr.append(" pd.storenumber, pd.neednumber, pd.materialquotatype, pd.productcode, pd.productid, pd.optlock,pd.other,pd.note, ");
		queryStr.append(" m.desingnation, m.materialstandard, m.techniccondition, m.demension, ");
		queryStr.append(" m.warningvalue, m.preserveperiod, m.referenceprice, m.remarks, ");
		queryStr.append(" m.parentid, m.materialid, m.materialitemname,m.materialitemcode ");
		queryStr.append(" from t_material m, t_procurementdetail pd ");
		queryStr.append(" where m.materialid = pd.materialid ");

		// 处理过程列表使用的条件
		if (StringUtils.isNotBlank(pieceType)) {
			if (StringUtils.isNotBlank(materialCatLogId)) {
				queryStr.append(" and m.parentid = '" + materialCatLogId.trim()
						+ "'");
			}
			queryStr.append(" and pd.purchaseid is null ");
			// 用户权限控制
			String materialCatalogSql = materialCatalogService
					.getMaterialCatalog();
			queryStr.append(" and  m.parentid  in (" + materialCatalogSql
					+ ") ");
		}
		queryStr.append(" and pd.procurementid = ?1");

		if (nodeId != null && nodeId.length() > 0) {
			queryStr.append(" and pd.materialid in (");
			queryStr.append(" select tm.materialid from t_material tm where tm.parentid in (");
			queryStr.append(" select mc.materialcatalogid from t_materialcatalog mc ");
			queryStr.append(" start with mc.materialcatalogid='"+nodeId+"' ");
			queryStr.append(" connect by prior mc.materialcatalogid = mc.parentid) ");
			queryStr.append(")");
		}

		
		Query query = this.em.createNativeQuery(queryStr.toString(),
				"ProcurementSporadicDetailResults").setParameter(1,
				procurement.getProcurementId()); 
		 
		if (start >= 0 && limit > 0) {
			query.setFirstResult(start);
			query.setMaxResults(limit);
		}

		List<Object[]> temp = query.getResultList();

		List<ProcurementDetail> procurementDetails = new ArrayList<ProcurementDetail>();
		for (int i = 0; i < temp.size(); i++) {
			Object[] obj = (Object[]) temp.get(i);
			ProcurementDetail procurementDetail = (ProcurementDetail) obj[0];
			Material material = (Material) obj[1];
			procurementDetail.setMaterialId(material.getMaterialid());
			procurementDetail.setMaterialItemName(material
					.getMaterialItemName());
			procurementDetail.setDesingnation(material.getDesingnation());
			procurementDetail.setMaterialStandard(material
					.getMaterialStandard());
			procurementDetail.setTechnicCondition(material
					.getTechnicCondition());
			procurementDetail.setDemension(material.getDemension());
			procurementDetail.setRemark(material.getRemarks());
			procurementDetail.setRequestCode(procurement.getProcurementCode());
			procurementDetails.add(procurementDetail);
		}
		return procurementDetails;
	}

	public long countProcurementDetailByMaterial(String procurementId,
			String nodeId,String materialCatalogId) {

		String[] params = { procurementId };

		StringBuilder queryStr = new StringBuilder();
		queryStr.append(" select count(*) from t_procurementdetail pd,t_material t,t_materialCatalog mc ");

		 
		queryStr.append(" where t.materialid = pd.materialid and t.parentid = mc.materialCatalogid and pd.procurementid = ?1 ");

		if (nodeId != null && nodeId.length() > 0) {
			queryStr.append(" and pd.materialid in (");
			queryStr.append(" select tm.materialid from t_material tm where tm.parentid in (");
			queryStr.append(" select mc.materialcatalogid from t_materialcatalog mc ");
			queryStr.append(" start with mc.materialcatalogid='"+nodeId+"' ");
			queryStr.append(" connect by prior mc.materialcatalogid = mc.parentid) ");
			queryStr.append(")");
		} 
		
		queryStr.append(" and t.parentid = '");
		queryStr.append(materialCatalogId);
		queryStr.append("'");
		queryStr.append(" and pd.purchaseid is null ");

		return ((BigDecimal) this.executeNativeQuery(queryStr.toString(),
				params, 0, 0).get(0)).longValue();
	}

	public void batchDeleteByBusinessPlanDetailIds(
			String[] businessPlanDetailIds) {
		StringBuilder queryStr = new StringBuilder(
				"delete from ProcurementDetail pd ");
		for (int i = 0; i < businessPlanDetailIds.length; i++) {
			if (i == 0) {
				queryStr.append(" where pd.buinessPlanDetailsId = ?").append(
						i + 1);
			} else {
				queryStr.append(" or pd.buinessPlanDetailsId = ?")
						.append(i + 1);
			}
		}
		this.batchUpdate(queryStr.toString(), businessPlanDetailIds);
	}

	public String getProcurementIdByBusinessPlanDetailId(
			String businessPlanDetailId) {
		String sql = "select distinct procurementId from T_ProcurementDetail "
				+ " where BuinessPlanDetailsID = ?1";
		return (String) this.createSqlQuery(sql)
				.setParameter(1, businessPlanDetailId).getSingleResult();
	}

	public void partUpdate(ProcurementDetail procurementDetail,
			String purchaseId) {
		ProcurementDetail temp = this.get(procurementDetail
				.getProcurementDetailId());

		temp.setActualNumber(procurementDetail.getActualNumber());//实际采购量
		temp.setPurchaseId(purchaseId);
		temp.setRemark(procurementDetail.getRemark());
		temp.setPurchaseType(procurementDetail.getPurchaseType());
		// 如果是直接采购，添加供应商
		if ("3".equals(procurementDetail.getPurchaseType())) {
			temp.setVendorId(procurementDetail.getVendorId());
		}
		temp.setNote(procurementDetail.getNote());//备注
		temp.setBackNumber(procurementDetail.getBackNumber());//返修品
		temp.setOnNumber(procurementDetail.getOnNumber());//欠交合同
		temp.setStoreNumber(procurementDetail.getStoreNumber());//库存
		temp.setNeedNumber(procurementDetail.getNeedNumber());// 需定量
		temp.setOperable(procurementDetail.getOperable());// 有无合用
		temp.setNoCheck(procurementDetail.getNoCheck());// 无待检
		temp.setNoExpend(procurementDetail.getNoExpend());// 无预计消耗
		temp.setPrice(procurementDetail.getPrice());// 单价
		temp.setAmount_applications(procurementDetail.getAmount_applications());// 申请金额
		temp.setContract(procurementDetail.getContract());// 合同
		temp.setGap_number(procurementDetail.getGap_number());// 下半年缺口数
		temp.setHalf_year_consume(procurementDetail.getHalf_year_consume());// 下半年消耗
		temp.setLast_year_consume(procurementDetail.getLast_year_consume());// 上年消耗
		temp.setNumber_applications(procurementDetail.getNumber_applications());// 申请数量
		temp.setRedeployment(procurementDetail.getRedeployment());// 外调
		temp.setReserve(procurementDetail.getReserve());//储备量
		temp.setSubtotal(procurementDetail.getSubtotal());// 小计
		temp.setSubtotal_amount(procurementDetail.getSubtotal_amount());// 小计金额
		temp.setSubtotal_number(procurementDetail.getSubtotal_number());// 小计数据
		temp.setSuper_storage(procurementDetail.getSuper_storage());// 超储
		temp.setYear_inventory(procurementDetail.getYear_inventory());// 年末库存
//		temp.setNote(procurementDetail.getNote());
		// 如果为年度，需要改变月份
		if ("1".equals(procurementDetail.getNewProcessType())) {
			temp.setJan(procurementDetail.getJan());
			temp.setFeb(procurementDetail.getFeb());
			temp.setMar(procurementDetail.getMar());
			temp.setApr(procurementDetail.getApr());
			temp.setMay(procurementDetail.getMay());
			temp.setJune(procurementDetail.getJune());
			temp.setJuly(procurementDetail.getJuly());
			temp.setAug(procurementDetail.getAug());
			temp.setSept(procurementDetail.getSept());
			temp.setOct(procurementDetail.getOct());
			temp.setDect(procurementDetail.getDect());
			temp.setNov(procurementDetail.getNov());

		}

		if (procurementDetail.getOptLock() != temp.getOptLock()) {
			throw new StaleObjectStateException(
					"com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetail",
					purchaseId);
		}

		this.update(temp);
	}

	public void removePurchaseRelation(String purchaseId) {
		String sql = "update ProcurementDetail pd set pd.purchaseId=" + null
				+ " where pd.purchaseId='" + purchaseId + "'";
		this.createQuery(sql).executeUpdate();
	}

	public void deletePurchaseRelation(String purchaseId) {
		String sql = "delete  from ProcurementDetail pd"
				+ " where pd.purchaseId='" + purchaseId + "'";
		this.createQuery(sql).executeUpdate();
	}

	
	public List<ProcurementDetail> getByPurchaseId(String purchaseId,
			int start, int limit,String purchaseType) {

		StringBuilder queryStr = new StringBuilder();
		queryStr.append(" select distinct pd.procurementdetailid, pd.buinessplandetailsid, pd.materialquotaid,pd.declare_detil_id, ");
		queryStr.append(" pd.resolve_number,pd.vendorid, pd.materialtypename, pd.jan, pd.feb, pd.mar, pd.apr, ");
		queryStr.append(" pd.may, pd.june, pd.july, pd.aug, pd.sept, pd.oct, pd.nov, pd.dect, ");
		queryStr.append(" pd.materialcounts, pd.actualnumber, pd.purchaseid, pd.purchasetype, ");
		queryStr.append(" pd.procurementid, pd.price, pd.deliverydate, pd.backnumber, pd.productcode, ");
		queryStr.append(" pd.productid, pd.optlock,pd.nocheck,pd.noexpend,pd.operable,pd.other,pd.note, ");
		queryStr.append(" pd.onnumber, pd.storenumber, pd.neednumber, pd.materialquotatype,pd.subtotal,pd.contract," +
						" pd.number_applications,pd.amount_applications,pd.subtotal_number,pd.subtotal_amount,pd.super_storage," +
						" pd.redeployment,pd.last_year_consume,pd.half_year_consume,pd.year_inventory," +
						"pd.gap_number,pd.reserve,pd.JX,pd.QSJH,pd.ZZJH,pd.CLDM,pd.CURRENTDELIVERY,  ");
		queryStr.append(" m.materialitemname,m.materialitemcode,m.desingnation, m.materialstandard, m.techniccondition, m.demension, ");
		queryStr.append(" m.warningvalue, m.preserveperiod, m.referenceprice, m.remarks,m.materialclass, ");
		queryStr.append(" m.parentid, m.materialid, pu.remark as remark,  pu.purchasecode as requestcode ,m.DELIVERY_STATUS,m.grouptype,pd.approvalperson,pd.requiredemartment, ");
		queryStr.append(" dd.oldquantity,dd.changer,dd.changtime,dd.changreson,pd.status,dd.usedate");//申报记录变更
		queryStr.append(" from t_material m, t_purchase pu, t_procurement p , t_procurementdetail pd ");
		queryStr.append(" left join t_declare_detil dd on dd.declare_detil_id=pd.declare_detil_id ");
        if(purchaseType.equals("2")){//2零星计划
			queryStr.append(" where m.MATERIALID = pd.MATERIALID and p.procurementid = pd.procurementid ");
		}else{//1年度计划
			queryStr.append(" where m.materialid = pd.materialid and p.procurementid = pd.procurementid and m.parentid=mc.materialcatalogid");
		}
		queryStr.append(" and pd.purchaseid = pu.purchaseid and pd.purchaseid = ?1 and p.flag = '1' ");
		return processQuery(purchaseId, start, limit, queryStr.toString());
	}
	
	public List<ProcurementDetail> getByPurchaseId(String purchaseId,
			int start, int limit) {

		StringBuilder queryStr = new StringBuilder();
		queryStr.append(" select pd.procurementdetailid, pd.buinessplandetailsid, pd.materialquotaid,pd.declare_detil_id, ");
		queryStr.append(" pd.resolve_number,pd.vendorid, pd.materialtypename, pd.jan, pd.feb, pd.mar, pd.apr, ");
		queryStr.append(" pd.may, pd.june, pd.july, pd.aug, pd.sept, pd.oct, pd.nov, pd.dect, ");
		queryStr.append(" pd.materialcounts, pd.actualnumber, pd.purchaseid, pd.purchasetype, ");
		queryStr.append(" pd.procurementid, pd.price, pd.deliverydate, pd.backnumber, pd.productcode, ");
		queryStr.append(" pd.productid, pd.optlock,pd.nocheck,pd.noexpend,pd.operable,pd.other,pd.note, ");
		queryStr.append(" pd.onnumber, pd.storenumber, pd.neednumber, pd.materialquotatype,pd.subtotal,pd.contract," +
						" pd.number_applications,pd.amount_applications,pd.subtotal_number,pd.subtotal_amount,pd.super_storage," +
						" pd.redeployment,pd.last_year_consume,pd.half_year_consume,pd.year_inventory," +
						"pd.gap_number,pd.reserve,pd.JX,pd.QSJH,pd.ZZJH,pd.CLDM, m.materialitemname,m.materialitemcode, ");
		queryStr.append(" m.desingnation, m.materialstandard, m.techniccondition, m.demension, ");
		queryStr.append(" m.warningvalue, m.preserveperiod, m.referenceprice, m.remarks, ");
		queryStr.append(" m.parentid, m.materialid, pu.remark as remark, p.procurementcode as requestcode,m.DELIVERY_STATUS ");
		queryStr.append(" from t_material m, t_purchase pu, t_procurementdetail pd, t_procurement p ");
		queryStr.append(" where m.MATERIALITEMCODE = pd.CLDM and p.procurementid = pd.procurementid ");
		queryStr.append(" and pd.purchaseid = pu.purchaseid and pd.purchaseid = ?1 and p.flag = '1' ");
		return processQuery(purchaseId, start, limit, queryStr.toString());
	}

	public long countByPurchaseId(String purchaseId) {
		String queryStr = " select count(*) from ProcurementDetail pd, Procurement p "
				+ " where p.procurementId = pd.procurementId and pd.purchaseId = ?1 and p.flag = '1' ";
		return (Long) this.em.createQuery(queryStr).setParameter(1, purchaseId)
				.getSingleResult();
	}

	public List<ProcurementDetail> getByPurchaseIdAndType(String purchaseId,
			PurchaseTypeEnum purchaseType) {
		StringBuilder queryStr = new StringBuilder(
				" obj.procurementDetailId in ( ");
		queryStr.append(" select pd.procurementDetailId from ProcurementDetail pd ");
		queryStr.append(" where pd.purchaseId = ?1 and pd.purchaseType = ?2 )");
//		if (purchaseType.equals(PurchaseTypeEnum.NI_DING_HE_TONG)) {
//			queryStr.append(" group by pd.vendorId ) ");
//		} else {
//			queryStr.append(" group by pd.materialId ) ");
//		}

		return this.find(queryStr.toString(), new String[] { purchaseId,
				purchaseType.getValue() });
	}

	public List<ProcurementDetail> getByContractId(ProcurementDetailVo vo) {
		List<ProcurementDetail> pdList=new ArrayList<ProcurementDetail>();
        String sql=" FROM t_procurementdetail PD INNER JOIN t_procurementcontract_purchase PCP ON PCP.PURCHASEID=PD.PURCHASEID " +
        		" INNER JOIN T_PURCHASE PUR ON PD.PURCHASEID=PUR.PURCHASEID " +
        		" INNER JOIN t_procurementcontract pc ON PC.PROCUREMENTCONTRACTID=PCP.PROCUREMENTCONTRACTID "+
                "and pc.vendor=pd.vendorid " +
        		" where pcp.materialid=pd.materialid and pc.procurementcontractid=:procurementcontractid";
        BigDecimal count=(BigDecimal)dao.getHibernateSession().createSQLQuery("SELECT count(distinct pd.procurementdetailid) "+sql)
                                        .setParameter("procurementcontractid", vo.getContractId())
                                        .uniqueResult();
        vo.setCount(count.intValue());
        if (vo.getStart() >= 0 && vo.getLimit() > 0) {
        	 pdList=this.dao.getHibernateSession().createSQLQuery("SELECT DISTINCT pd.* "+sql)
	             .addEntity("pd",ProcurementDetail.class)
	             .setParameter("procurementcontractid", vo.getContractId())
	             .setFirstResult(vo.getStart())
	             .setMaxResults(vo.getLimit())
	             .list();
		}else{
			 pdList=this.dao.getHibernateSession().createSQLQuery("SELECT DISTINCT pd.* "+sql)
	             .addEntity("pd",ProcurementDetail.class)
	             .setParameter("procurementcontractid", vo.getContractId())
	             .list();
		}
       
		for (ProcurementDetail procurementDetail: pdList) {
			//procurementDetail.setStatus(procurementDetail.getStatus());
			Material material = (Material) dao.getHibernateSession().get(Material.class, procurementDetail.getMaterialId());
			sql="select par.price from t_parity par inner join t_procurementdetail pd "+
			    " on par.procurementdetailid=pd.procurementdetailid "+
			    " where pd.procurementdetailid=:procurementdetailid";
			BigDecimal vendorPrice=(BigDecimal)dao.getHibernateSession().createSQLQuery(sql)
			                                      .setParameter("procurementdetailid", procurementDetail.getProcurementDetailId())
			                                      .setMaxResults(1).uniqueResult();
			procurementDetail.setPrice(vendorPrice);//供应商单价//setPrice(material.getReferencePrice());//计划单价
			procurementDetail.setMaterialItemName(material
					.getMaterialItemName());
			procurementDetail.setDesingnation(material.getDesingnation());
			procurementDetail.setMaterialStandard(material
					.getMaterialStandard());
			procurementDetail.setTechnicCondition(material
					.getTechnicCondition());
			procurementDetail.setDemension(material.getDemension());
			procurementDetail.setMaterialitemcode(material.getMaterialitemcode());
			procurementDetail.setDeliveryStatus(material.getDeliveryStatus());
			procurementDetail.setMaterialTypeName(material.getMaterialclass());
			DeclareDetail dd=(DeclareDetail)dao.getHibernateSession().get(DeclareDetail.class, procurementDetail.getDeclare_detil_id());
			procurementDetail.setOldquantity(dd.getOldquantity()==null?"":dd.getOldquantity().toString());
			procurementDetail.setChanger(dd.getChanger());
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy/MM/dd");
			procurementDetail.setChangtime(dd.getChangeTime()==null?"":sdf.format(dd.getChangeTime()));
			procurementDetail.setChangreson(dd.getChangeReson());
			//procurementDetail.setRemark(procurementDetail.getRemark());
			Procurement procurement=(Procurement)dao.getHibernateSession().get(Procurement.class, procurementDetail.getProcurementId());
			procurementDetail.setRequestCode(procurement.getProcurementCode());
		}
        return pdList;
                       
        /*StringBuilder queryStr = new StringBuilder();
		queryStr.append(" select pd.procurementdetailid, pd.buinessplandetailsid, pd.materialquotaid, ");
		queryStr.append(" pd.vendorid, pd.materialtypename, pd.jan, pd.feb, pd.mar, pd.apr, ");
		queryStr.append(" pd.may, pd.june, pd.july, pd.aug, pd.sept, pd.oct, pd.nov, pd.dect,pd.other,pd.note, ");
		queryStr.append(" pd.materialcounts, pd.actualnumber, pd.purchaseid, pd.purchasetype, ");
		queryStr.append(" pd.procurementid, pd.price, pd.deliverydate, pd.backnumber, pd.productcode, pd.productid, pd.optlock,pd.nocheck,pd.noexpend,pd.operable, pd.DECLARE_DETIL_ID, ");
		queryStr.append(" pd.onnumber, pd.storenumber, pd.neednumber, pd.materialquotatype,pd.subtotal,pd.contract," +
						" pd.number_applications,pd.amount_applications,pd.subtotal_number,pd.subtotal_amount,pd.super_storage," +
						" pd.redeployment,pd.last_year_consume,pd.half_year_consume,pd.year_inventory," +
						"pd.gap_number,pd.reserve,pd.JX,pd.QSJH,pd.ZZJH,pd.CLDM, m.materialitemname, ");
		queryStr.append(" m.desingnation, m.materialstandard, m.techniccondition, m.demension, ");
		queryStr.append(" m.warningvalue, m.preserveperiod, m.referenceprice, m.remarks, ");
		queryStr.append(" m.parentid, m.materialid,m.materialitemcode,m.delivery_status,m.grouptype, ");
		queryStr.append(" decode(pd.materialquotatype, ");
		queryStr.append("  '1',(select mq.remark from t_materialquota mq where mq.materialquotaid=pd.materialquotaid), ");
		queryStr.append("  '2',(select i.remark from t_inventory i where i.inventoryid=pd.materialquotaid)) as remark, ");
		// 以下语句仅为了凑足一个名为‘requestcode’的字段
		//queryStr.append(" pcp.procurementcontractid as requestcode,pd.approvalperson,pd.requiredemartment, ");
		queryStr.append(" pc.purchasecode as requestcode,pd.approvalperson,pd.requiredemartment, ");
		
		queryStr.append(" dd.oldquantity,dd.changer,dd.changtime,dd.changreson,pd.status");//申报记录变更
		queryStr.append(" from t_material m, t_procurementcontract_purchase pcp,t_purchase pc, t_procurementdetail pd ");
		queryStr.append(" left join t_declare_detil dd on dd.declare_detil_id=pd.declare_detil_id ");
		queryStr.append(" where m.materialid = pd.materialid and pd.materialId = pcp.materialId ");
		queryStr.append(" and pcp.purchaseid=pc.purchaseid ");
		queryStr.append("  and pd.purchaseid = pcp.purchaseid");
		if(contractId!=null && !contractId.equals(""))
			queryStr.append(" and pcp.procurementcontractid = ?1 ");
		if(materialids!=null){
			queryStr.append(" and m.materialid not in ("+materialids+")");
		}
		return processQuery(contractId, start, limit, queryStr.toString());*/
	}

	public long countByContractId(String contractId,String materialids) {
		String queryStr = " select count(*) from ProcurementDetail pd, ContractPurchase cp"
				+ " where pd.materialId=cp.materialId and pd.purchaseId=cp.purchaseId "
				+ " and cp.procurementContractId = ?1 ";
		if(materialids!=null){
			queryStr = queryStr+" and pd.materialId not in ("+materialids+")";
		}
		return (Long) this.em.createQuery(queryStr).setParameter(1, contractId)
				.getSingleResult();
	}

	@SuppressWarnings("unchecked")
	private List<ProcurementDetail> processQuery(String conditionId, int start,
			int limit, String queryStr) {

		Query query = this.em.createNativeQuery(queryStr,
				"ProcurementDetailResults");
		if(conditionId!=null && !conditionId.equals(""))
			query.setParameter(1, conditionId);

		if (start >= 0 && limit > 0) {
			query.setFirstResult(start);
			query.setMaxResults(limit);
		}

		List<Object[]> temp = query.getResultList();

		List<ProcurementDetail> procurementDetails = new ArrayList<ProcurementDetail>();
		for (int i = 0; i < temp.size(); i++) {
			Object[] obj = (Object[]) temp.get(i);
			ProcurementDetail procurementDetail = (ProcurementDetail) obj[0];
			Material material = (Material) obj[1];
			procurementDetail.setMaterialItemName(material
					.getMaterialItemName());
			procurementDetail.setDesingnation(material.getDesingnation());
			procurementDetail.setMaterialStandard(material
					.getMaterialStandard());
			procurementDetail.setTechnicCondition(material
					.getTechnicCondition());
			procurementDetail.setDemension(material.getDemension());
			procurementDetail.setMaterialitemcode(material.getMaterialitemcode());
			procurementDetail.setDeliveryStatus(material.getDeliveryStatus());
			procurementDetail.setRemark((String) obj[2]);
			procurementDetail.setRequestCode((String) obj[3]);
			procurementDetail.setOldquantity(obj[4]==null?"":obj[4].toString());
			procurementDetail.setChanger(obj[5]==null?"":obj[5].toString());
			procurementDetail.setChangtime(obj[6]==null?"":obj[6].toString());
			procurementDetail.setChangreson(obj[7]==null?"":obj[7].toString());
			procurementDetail.setStatus((String)obj[8]);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			procurementDetail.setUsedate(obj[9]==null?null:sdf.format(obj[9]));
			BigDecimal planActualnumber=null;
			if(procurementDetail.getResolve_number()==null){
				String sql="select ppd.actualnumber from t_procurementplan pplan,t_procurementplan_detil ppd,t_declareplan_detil dpd,t_declare_detil dd "+
				"where pplan.procurementplan_id=ppd.procurementplan_id and ppd.declareplan_detil_id=dpd.declareplan_detil_id "+
				"and pplan.procurementplan_code='"+procurementDetail.getRequestCode()+"' and dd.declare_detil_id=dpd.declare_detil_id "+
				"and dd.material_id='"+material.getMaterialid()+"' and dpd.declare_detil_id='"+procurementDetail.getDeclare_detil_id()+"' ";
				planActualnumber=(BigDecimal)dao.getHibernateSession().createSQLQuery(sql).uniqueResult();
			}else{
				planActualnumber=procurementDetail.getResolve_number();
			}
			procurementDetail.setPlanActualnumber(planActualnumber==null?"0":planActualnumber.toString());//建议采购量
			procurementDetails.add(procurementDetail);
		}
		return procurementDetails;
	}

	public void batchDeleteByProcurementIds(String[] procurementIds) {
		StringBuilder queryStr = new StringBuilder(
				"delete from ProcurementDetail pd ");
		for (int i = 0; i < procurementIds.length; i++) {
			if (i == 0) {
				queryStr.append(" where pd.procurementId = ?").append(i + 1);
			} else {
				queryStr.append(" or pd.procurementId = ?").append(i + 1);
			}
		}
		this.batchUpdate(queryStr.toString(), procurementIds);
	}

	@SuppressWarnings("unchecked")
	public List<ProcurementDetail> getByPurchaseAndMaterialId(
			Purchase purchase, String materialId) {
		StringBuffer hqlBuffer = new StringBuffer();
		hqlBuffer
				.append("select  pd from ProcurementDetail pd where pd.purchaseId='"
						+ purchase.getPurchaseId() + "' ");
		hqlBuffer.append(" and pd.materialId='" + materialId + "'");
		return this.createQuery(hqlBuffer.toString()).getResultList();
	}

	public String sumRequestValuebyMaterialid(String materialid) {
		/*
		 * 变量：物料ID 查询方式：通过ProcurementDetail中查询materialCounts的和
		 */
		String str = "0";
		Object o = this
				.createQuery(
						"select sum(p.materialCounts) from ProcurementDetail p "
								+ " where p.materialCounts is not null and p.materialCounts>0 and p.materialId='"
								+ materialid + "'").getSingleResult();
		if (o != null) {
			str = o.toString();
		}

		return str;
	}

	public String sumPlanValueByMaterialid(String id) {
		/*
		 * 变量：物料ID 查询方式：通过ProcurementDetail,Procurement中查询needNumber的和
		 * 附加条件：ProcurementDetail的procurementId与Procurement的主键procurementId相同 2.
		 * Procurement status = 3
		 */
		String str = "0";
		Object o = this
				.createQuery(
						"select sum( pd.actualNumber ) from ProcurementDetail pd, Procurement p, Purchase pu "
								+ " where p.procurementId=pd.procurementId and pd.purchaseId=pu.purchaseId and pu.status='4' "
								+ " and pd.materialId='" + id + "'")
				.getSingleResult();
		if (o != null) {
			str = o.toString();
		}
		return str;
	}

	public String sumProcureValueByMaterialid(String id) {
		/*
		 * 变量：物料ID 查询方式: 通过ProcurementDetail,Parity中查询needNumber的和 附加条件:
		 * 1.ProcurementDetail与Parity的 purchaseId、materialId相同 2.Parity
		 * applicationStatus =4
		 */
		String str = "0";
		Object o = this
				.createQuery(
						"select sum(pd.actualNumber) from ProcurementDetail pd, Parity pa "
								+ " where pd.materialId=pa.materialId and pd.purchaseId=pa.purchaseId "
								+ " and pa.applicationStatus in('4','5') and pd.materialId='"
								+ id + "'").getSingleResult();
		if (o != null) {
			str = o.toString();
		}
		return str;
	}

	public String sumContractValueByMaterialid(String id) {
		/*
		 * 变量：物料ID 查询方式:
		 * 通过ProcurementDetail,ContractPurchase,ProcurementContract中查询needNumber的和
		 * 附加条件: 1.ProcurementDetail与ContractPurchase的 materialId相同
		 * 2.ContractPurchase与ProcurementContract的procurementContractId相同
		 * 3.ProcurementContract applicationStatus =4
		 */
		String str = "0";
		Object o = this
				.createQuery(
						"select sum(pd.actualNumber) from ProcurementDetail pd,ContractPurchase cp,ProcurementContract pc "
								+ " where pd.materialId=cp.materialId and cp.procurementContractId=pc.procurementContractId "
								+ " and pc.applicationStatus in('4','5') and pd.materialId='"
								+ id + "'").getSingleResult();
		if (o != null) {
			str = o.toString();
		}
		return str;
	}

	@SuppressWarnings("unchecked")
	public List<ProcurementDetail> getProcurementDetailByParity(Parity parity) {
		StringBuffer hqlBuffer = new StringBuffer();
		hqlBuffer
				.append(" select pd from ProcurementDetail pd, Purchase p , Parity pt ");
		hqlBuffer
				.append(" where pd.purchaseId = p.purchaseId and p.purchaseId = pt.purchaseId ");
		hqlBuffer.append(" and pd.materialId = pt.materialId ");
		hqlBuffer.append(" and pt.parityId= '" + parity.getParityId() + "'");

		return this.createQuery(hqlBuffer.toString()).getResultList();
	}

	@SuppressWarnings("unchecked")
	public List<String> getMaterialIdsByPurchaseIdAndVendorId(String purchaseId,
			String vendorId,String type) {
		StringBuilder queryStr = new StringBuilder(
				"select distinct pd.materialId from ProcurementDetail pd ");
		queryStr.append(" where pd.purchaseId = ?1 and pd.vendorId = ?2 and purchaseType = ?3");
		Query query = this.createQuery(queryStr.toString());
		query.setParameter(1, purchaseId);
		query.setParameter(2, vendorId);
		query.setParameter(3, type);
		return query.getResultList();
	}
	public List<Object[]> getWmsInfoByMaterial(ProcurementDetailVo vo) {
		StringBuilder queryStr = new StringBuilder(" select distinct t.last_year_Consume,"+
				" (case"+
				" when t.storeNumber is null  then"+
				" 0 else t.storeNumber"+
				" end) + (case"+
				" when t.tobetested is null then"+
				" 0 else t.tobetested"+
				" end) + (case"+
				" when t.contract is null then"+
				" 0 else t.contract"+
				" end) + (case"+
				" when t.outstanding is null then"+
				"  0 else t.outstanding"+
				"  end) + (case"+
				" when t.buheyongnumber is null then"+
				" 0 else t.buheyongnumber"+
				" end) as subtoal,"+
				" t.storeNumber,"+
				" t.tobetested,"+
				" t.contract,"+
				" t.outstanding,"+
				" t.buheyongnumber,"+
				" t.half_year_consume,t.xianyouziyuan,"+
				" t.OUT_NUM"+//已发
				" from t_pingheng t");
		queryStr.append(" where t.materialid = ?1");// and t.productcode = ?2 ");//需要从同一数据平台里面获取相关某机型的某材料的库存相关信息
//		queryStr.append(" group by  t.storeNumber, t.tobetested, t.contract, t.outstanding, t.buheyongnumber,t.xianyouziyuan ");
		Query query = this.createSqlQuery(queryStr.toString());
		query.setParameter(1, vo.getMaterialId());
//		query.setParameter(2, vo.getJX());
		return query.getResultList();
	}
	
	public String getProvideNumber(ProcurementDetailVo vo) {
		StringBuilder queryStr = new StringBuilder(
		"select count(t.provideNumber) from  v_eudm_pur_provid_info t ");
		queryStr.append(" where t.itemcode = ?1 and t.productcode = ?2 ");//需要从同一数据平台里面获取相关某机型的某材料的累计发放数量
		Query query = this.createSqlQuery(queryStr.toString());
		query.setParameter(1, vo.getMaterialCode());
		query.setParameter(2, vo.getProductCode());
		Object number = query.getSingleResult();
		return number==null?"0":number.toString();
	}
	public List<Object[]>getProvideInfo(ProcurementDetailVo vo) {
		StringBuilder queryStr = new StringBuilder(
		"select provideId,itemCode,productCode,batchNo,provideNumber,privodeDate  from  v_eudm_pur_provid_info t ");
		queryStr.append(" where t.itemcode = ?1 and t.productcode = ?2 ");//需要从同一数据平台里面获取相关某机型的某材料的累计发放信息
		
		Query query = this.createSqlQuery(queryStr.toString());
		query.setParameter(1, vo.getMaterialCode());
		query.setParameter(2, vo.getProductCode()); 
		query.setFirstResult(vo.getStart());
		query.setMaxResults(vo.getLimit());
		return (List<Object[]>) query.getResultList();
	}
	public BigDecimal getProvideInfoCount(ProcurementDetailVo vo) {
		StringBuilder queryStr = new StringBuilder(
		"select count(0)  from  v_eudm_pur_provid_info t ");
		queryStr.append(" where t.itemcode = ?1 and t.productcode = ?2 ");//需要从同一数据平台里面获取相关某机型的某材料的累计发放信息总数
		Query query = this.createSqlQuery(queryStr.toString());
		query.setParameter(1, vo.getMaterialCode());
		query.setParameter(2, vo.getProductCode()); 
		return (BigDecimal)query.getSingleResult();
	}
	public BigDecimal getSumContractAmount(String purchaseId,String vendorId,String materialId) {
		StringBuilder queryStr = new StringBuilder(
		"select sum(t.actualnumber*t.price)  from  t_ProcurementDetail t ");
		queryStr.append(" where t.purchaseid = ?1  ");
		if(!vendorId.equals(""))
			queryStr.append(" and t.vendorid = ?2 ");
		else if(!materialId.equals(""))
			queryStr.append(" and t.materialId = ?2 ");
		Query query = this.createSqlQuery(queryStr.toString());
		query.setParameter(1, purchaseId);
		if(!materialId.equals(""))//vendorId为空materialId不为空的时候，将materialId值赋给vendorId
			vendorId = materialId;
		query.setParameter(2,vendorId); 
		return (BigDecimal)query.getSingleResult();
	}
	public String getDepartment(ProcurementDetail pd) {
		// TODO Auto-generated method stub
		String sql="";
		if(pd.getDeclare_detil_id()!=null){
			//零星采购计划
			sql="SELECT DISTINCT d.DEPARTMENTNAME " +
					"from T_DEPARTMENTS d,T_DECLARE_DETIL dd,T_DECLARE de " +
					"where d.DEPCODE=DE.DEMARTMENTID and DD.DECLARE_ID=DE.DECLARE_ID and DD.DECLARE_DETIL_ID='"+pd.getDeclare_detil_id()+"'";
		}else if(pd.getBuinessPlanDetailsId()!=null){
			//年度采购计划
			sql="SELECT DISTINCT d.DEPARTMENTNAME " +
					"from T_DEPARTMENTS d,T_USER U,T_BUINESSPLAN BP,T_BUINESSPLANDETAILS BPD,T_PROCUREMENTDETAIL PD " +
					"WHERE U.INSTCODE=D.DEPCODE AND U.USERID=BP.AUTHOR AND BPD.BUINESSPLANDETAILSID='"+pd.getBuinessPlanDetailsId()+"'";
		}else{
			return null;
		}
		
		String department=(String)this.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		return department;
	}
	
	public List<ProcurementDetail> getAnnualDetailByMaterialIds(
			Procurement procurement, String nodeId, int start,
			int limit, String pieceType, String materialCatLogId,String type) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append(" select pd.procurementdetailid, pd.buinessplandetailsid, pd.materialquotaid, ");
		queryStr.append(" pd.resolve_number,pd.vendorid, pd.materialtypename, pd.jan, pd.feb, pd.mar, pd.apr, ");
		queryStr.append(" pd.may, pd.june, pd.july, pd.aug, pd.sept, pd.oct, pd.nov, pd.dect, ");
		queryStr.append(" pd.materialcounts, pd.actualnumber, pd.purchaseid, pd.purchasetype, ");
		queryStr.append(" pd.procurementid, pd.price, pd.deliverydate, pd.backnumber, pd.onnumber,pd.note, ");
		queryStr.append(" pd.storenumber, pd.neednumber, pd.materialquotatype, pd.productcode, pd.productid, pd.optlock, pd.nocheck,pd.noexpend,pd.operable,PD.DECLARE_DETIL_ID,pd.other,pd.subtotal,pd.contract," +
						" pd.number_applications,pd.amount_applications,pd.subtotal_number,pd.subtotal_amount,pd.super_storage," +
						" pd.redeployment,pd.last_year_consume,pd.half_year_consume,pd.year_inventory," +
						"pd.gap_number,pd.reserve,pd.JX,pd.QSJH,pd.ZZJH,pd.CLDM,");
		queryStr.append(" m.materialitemname, m.desingnation, m.materialstandard, m.techniccondition, m.demension, ");
		queryStr.append(" m.warningvalue, m.preserveperiod, m.referenceprice, m.remarks, m.parentid, m.materialid,m.materialitemcode, ");
		queryStr.append(" decode(pd.materialquotatype, ");
		queryStr.append("  '1',(select mq.materialcount from t_materialquota mq where mq.materialquotaid=pd.materialquotaid), ");
		queryStr.append("  '2',(select i.numbers from t_inventory i where i.inventoryid=pd.materialquotaid)) as materialcount, ");
		queryStr.append(" decode(pd.materialquotatype, ");
		queryStr.append("  '1',(select mq.remark  from t_materialquota mq where mq.materialquotaid=pd.materialquotaid), ");
		queryStr.append("  '2',(select i.remark from t_inventory i where i.inventoryid=pd.materialquotaid)) as remark  ");
		queryStr.append(", bpd.totalRequired as totalRequired,bpd.deliverycount,m.DELIVERY_STATUS ");
		queryStr.append(" from t_material m, t_procurementdetail pd, t_buinessplandetails bpd ");
		//queryStr.append(" where m.materialid = pd.materialid ");
		queryStr.append("where m.MATERIALITEMCODE = pd.CLDM ");
		queryStr.append(" and pd.buinessplandetailsid = bpd.buinessplandetailsid ");

		// 处理过程列表使用的条件
		if (StringUtils.isNotBlank(pieceType)) {
			if (StringUtils.isNotBlank(materialCatLogId)) {
				queryStr.append(" and m.parentid = '" + materialCatLogId.trim()
						+ "'");
			}
			queryStr.append(" and pd.purchaseid is null ");
			// 用户权限控制
			String materialCatalogSql = materialCatalogService
					.getMaterialCatalog();
			queryStr.append(" and  m.parentid  in (" + materialCatalogSql
					+ ") ");

		}
		queryStr.append(" and pd.procurementid = ?1");
		if(type.equals("2") && nodeId != null && nodeId.length() > 0){
			queryStr.append(" and pd.materialid='"+nodeId+"'");
		}
		else if (nodeId != null && nodeId.length() > 0) {
			queryStr.append(" and pd.materialid in (");
			queryStr.append(" select tm.materialid from t_material tm where tm.parentid in (");
			queryStr.append(" select mc.materialcatalogid from t_materialcatalog mc ");
			queryStr.append(" start with mc.materialcatalogid='"+nodeId+"' ");
			queryStr.append(" connect by prior mc.materialcatalogid = mc.parentid) ");
			queryStr.append(")");
		}
		queryStr.append(" order  by pd.materialid ");
		Query query = this.em.createNativeQuery(queryStr.toString(),
				"ProcurementAnnualDetailResults").setParameter(1,
				procurement.getProcurementId()); 
		 
		if (start >= 0 && limit > 0) {
			query.setFirstResult(start);
			query.setMaxResults(limit);
		}

		List<Object[]> temp = query.getResultList();
        HashMap<String ,Integer> valueMap = new HashMap<String ,Integer>();
		List<ProcurementDetail> procurementDetails = new ArrayList<ProcurementDetail>();
		int index = 0;
		for (int i = 0; i < temp.size(); i++) {
			Object[] obj = (Object[]) temp.get(i);
			ProcurementDetail procurementDetail = (ProcurementDetail) obj[0];
			Material material = (Material) obj[1];
			if(type.equals("1")){
				if(valueMap.isEmpty() || valueMap.get(material.getMaterialid())==null)
				{
					
					valueMap.put(material.getMaterialid(), index);
					index++; 
				}
				else{
					procurementDetails.get(valueMap.get(material.getMaterialid())).setProductCode("详细");
					procurementDetails.get(valueMap.get(material.getMaterialid()))
					                  .setTotalRequired(
					                		  procurementDetails.get(valueMap.get(material.getMaterialid()))
					                		                    .getTotalRequired().add(
					                		                    		procurementDetail.getTotalRequired()==null?new BigDecimal("0"):procurementDetail.getTotalRequired()));
					
					procurementDetails.get(valueMap.get(material.getMaterialid()))
					.setMaterialCount(procurementDetails.get(valueMap.get(material.getMaterialid())).
					getMaterialCount().add(procurementDetail.getMaterialCount()==null?new BigDecimal("0"):procurementDetail.getMaterialCount()));
					
					procurementDetails.get(valueMap.get(material.getMaterialid())).setMaterialCounts(procurementDetails.get(valueMap.get(material.getMaterialid())).getMaterialCounts().add(procurementDetail.getMaterialCounts()==null?new BigDecimal("0"):procurementDetail.getMaterialCounts()));
					procurementDetails.get(valueMap.get(material.getMaterialid())).setMar(procurementDetails.get(valueMap.get(material.getMaterialid())).getMar().add(procurementDetail.getMar()==null?new BigDecimal("0"):procurementDetail.getMar()));
					procurementDetails.get(valueMap.get(material.getMaterialid())).setJune(procurementDetails.get(valueMap.get(material.getMaterialid())).getJune().add(procurementDetail.getJune()==null?new BigDecimal("0"):procurementDetail.getJune()));
					procurementDetails.get(valueMap.get(material.getMaterialid())).setSept(procurementDetails.get(valueMap.get(material.getMaterialid())).getSept().add(procurementDetail.getSept()==null?new BigDecimal("0"):procurementDetail.getSept()));
					procurementDetails.get(valueMap.get(material.getMaterialid())).setDect(procurementDetails.get(valueMap.get(material.getMaterialid())).getDect().add(procurementDetail.getDect()==null?new BigDecimal("0"):procurementDetail.getDect()));
					procurementDetails.get(valueMap.get(material.getMaterialid())).setDeliverycount(String.valueOf(new BigDecimal(procurementDetails.get(valueMap.get(material.getMaterialid())).getDeliveryCount()).add(new BigDecimal(String.valueOf(obj[5]==null?"0":obj[5])))));
					continue;
				}
			}
			procurementDetail.setMaterialId(material.getMaterialid());
			procurementDetail.setMaterialItemName(material
					.getMaterialItemName());
			procurementDetail.setDesingnation(material.getDesingnation());
			procurementDetail.setMaterialStandard(material
					.getMaterialStandard());
			procurementDetail.setTechnicCondition(material
					.getTechnicCondition());
			procurementDetail.setDemension(material.getDemension());
			procurementDetail.setMaterialitemcode(material.getMaterialitemcode());
			procurementDetail.setMaterialCount((BigDecimal) obj[2]);
			procurementDetail.setRemark((String) obj[3]);
			procurementDetail.setTotalRequired(obj[4]==null?BigDecimal.ZERO:(BigDecimal) obj[4]);
			procurementDetail.setDeliverycount(obj[5]+"");
			if (procurementDetail.getMaterialCount()==null) {
				procurementDetail.setMaterialCount(new BigDecimal("0"));
			}
			procurementDetails.add(procurementDetail);
		}
		return procurementDetails;
	}

	public String realtimeSaveAnnualPlan(ProcurementDetailVo vo) throws Exception {
		// TODO Auto-generated method stub
		if(vo.getProcurementDetailId().equals("")){
			throw new Exception("资源平衡数据的汇总明细表为空!");
		}else{
			ProcurementDetail pd=(ProcurementDetail)dao.getHibernateSession().get(ProcurementDetail.class, vo.getProcurementDetailId());
			if(vo.getAmount_applications()!=null&&!vo.getAmount_applications().equals("")){
				pd.setAmount_applications(new BigDecimal(vo.getAmount_applications()));//申请金额
			}
			if(vo.getSubtotal_amount()!=null&&!vo.getSubtotal_amount().equals("")){
				pd.setSubtotal_amount(new BigDecimal(vo.getSubtotal_amount()));//多余小计金额
			}
			if(vo.getReserve()!=null&&!vo.getReserve().equals("")){
				pd.setReserve(new BigDecimal(vo.getReserve()));//储备量
			}
			if(vo.getSuper_storage()!=null&&!vo.getSuper_storage().equals("")){
				pd.setSuper_storage(new BigDecimal(vo.getSuper_storage()));//超储
			}
			if(vo.getRedeployment()!=null&&!vo.getRedeployment().equals("")){
				pd.setRedeployment(new BigDecimal(vo.getRedeployment()));//外调
			}
			if(vo.getActualNumber()!=null&&!vo.getActualNumber().equals("")){
				//建议采购量(实际采购量)
				pd.setActualNumber(new BigDecimal(vo.getActualNumber()));
			}
			if(vo.getNote()!=null&&!vo.getNote().equals("")){
				pd.setNote(vo.getNote());//备注
			}
			dao.getHibernateSession().saveOrUpdate(pd);
		}
		return "";
	}

	public String submitAnnualPlan(ProcurementDetailVo vo) throws Exception {
		
		Procurement procurement=(Procurement)dao.getHibernateSession().get(Procurement.class, vo.getProcurementId());

		// 生成需求大纲
		int maxCode = purchaseService.getPurchaseMaxCode("1");
		String maxCodeStr = String.valueOf(maxCode);
		String oriCodeStr = FileCodeGenerator.getPurchaseCode(ProcurementTypeEnum
				.getByValue("1"));
        String codeStr = oriCodeStr.substring(0, oriCodeStr.length() - maxCodeStr.length()).concat(
				maxCodeStr);
        Purchase purchase = new Purchase();
		purchase.setCreateDate(new Date());
		purchase.setEditor(identity.getLoginUser().getUserid().toString());
		purchase.setStatus("1");// 默认状态待审批
		String sql="select distinct mc.materialtypename from t_procurementsummarydetail ps,t_material tm ,t_materialcatalog mc where ps.procurementid=:procurementid and ps.materialid=tm.materialid and tm.parentid=mc.materialcatalogid";
		String materialtypename=(String)dao.getHibernateSession().createSQLQuery(sql)
		                                   .setParameter("procurementid", procurement.getProcurementId())
		                                   .setMaxResults(1).uniqueResult();
		purchase.setMaterialTypeName(materialtypename);
		purchase.setPurchaseCode(codeStr);
		purchase.setType("1");//1年度需求, 2 零星需求
		purchase.setPurchaseName(procurement.getBuinessPlan().getBuinessPlanName());//经营计划名称
		dao.getHibernateSession().save(purchase);
		dao.getHibernateSession().flush();
		
		//需求大纲关联汇总小计表
		sql="update t_procurementdetail pd set pd.PURCHASEID=:PURCHASEID where pd.PROCUREMENTID=:PROCUREMENTID";
		sql+=" and  pd.materialid  in (" + MaterialServiceImpl.getMaterialidAuthorityByLoginName(this.identity.getLoginUser().getLoginname())+ ") ";
		dao.getHibernateSession().createSQLQuery(sql)
		                         .setParameter("PURCHASEID", purchase.getPurchaseId())
		                         .setParameter("PROCUREMENTID", vo.getProcurementId()).executeUpdate();
        
		return "";
	}

	public List<ProcurementDetail> getPurchaseForAnnualPlan(ProcurementDetailVo procurementDetailVo) throws Exception {
		String loginname=this.identity.getLoginUser().getLoginname();
		String sql="from t_procurementdetail pd where pd.purchaseid=:purchaseid ";
		if(procurementDetailVo.getIsAuthorityControl()==null||procurementDetailVo.getIsAuthorityControl().equals("1")){
			   sql+=" and  pd.materialid  in (" + MaterialServiceImpl.getMaterialidAuthorityByLoginName(loginname)+ ") ";
		}
		BigDecimal count=(BigDecimal)dao.getHibernateSession().createSQLQuery("select count(1) "+sql)
		                                                      .setParameter("purchaseid", procurementDetailVo.getPurchaseId())
		                                                      .setMaxResults(1).uniqueResult();
		procurementDetailVo.setCount(count.intValue());
		org.hibernate.Query query= dao.getHibernateSession().createSQLQuery("select {pd.*} "+sql)
		                                  .addEntity("pd",ProcurementDetail.class)
		                                  .setParameter("purchaseid", procurementDetailVo.getPurchaseId());
		if(procurementDetailVo.getLimit()!=0){
			query.setFirstResult(procurementDetailVo.getStart())
                 .setMaxResults(procurementDetailVo.getLimit()).list();
		}
		return query.list();
	}
	
	public void removeAnnualPlan(ProcurementDetailVo procurementDetailVo) throws Exception {
		//删除采购需求计划大纲
		Purchase purchase=(Purchase)dao.getHibernateSession().get(Purchase.class, procurementDetailVo.getPurchaseId());
		String userid=identity.getLoginUser().getUserid().toString();
		if(!purchase.getEditor().equals(userid)){
			throw new Exception("只能删除自已创建的数据!");
		}
		dao.getHibernateSession().delete(purchase);
		//清除年度计划明细
		List<ProcurementDetail> procurementDetails = getPurchaseForAnnualPlan(procurementDetailVo);
		for (ProcurementDetail procurementDetail : procurementDetails) {
			// procurementDetail.setNeedNumber(new BigDecimal(0));
			// procurementDetail.setBackNumber(new BigDecimal(0));// 返修品
			procurementDetail.setActualNumber(null);// 建议采购量
			procurementDetail.setReserve(null);//储备量
			procurementDetail.setSuper_storage(null);//超储
			procurementDetail.setRedeployment(null);//外调
			procurementDetail.setAmount_applications(null);//申请金额
			procurementDetail.setSubtotal_amount(null);//多余小计金额
			procurementDetail.setNote(null);//备注
			// procurementDetail.setOnNumber(new BigDecimal(0));// 欠交合同
			// procurementDetail.setStoreNumber(new BigDecimal(0));
			procurementDetail.setPurchaseType(null);
			procurementDetail.setPurchaseId(null);
		}
	}

	public List getContractInfoDetailList(ProcurementDetailVo vo) {
		String paramSQL="";
		String sql="";
		if(vo.getMaterialitemname()!=null&&!vo.getMaterialitemname().equals("")){
			paramSQL+=" and materialitemname like '%"+vo.getMaterialitemname()+"%'";
		}
		if(vo.getMaterialitemcode()!=null&&!vo.getMaterialitemcode().equals("")){
			paramSQL+=" and materialitemcode='"+vo.getMaterialitemcode()+"'";
		}
		if(vo.getTaskno()!=null&&!vo.getTaskno().equals("")){
			paramSQL+=" and taskno='"+vo.getTaskno()+"'";
		}
				//获取当前登录用户信息
	    Identity identity  = (Identity)Component
			.getInstance("org.jboss.seam.security.identity",true);
	    
		if(isNotLeader()){
			sql="from contractInfoDetailList c inner join t_item_profile ip " +
					" on c.materialitemcode=ip.item_code and ip.login_name ='"+identity.getLoginUser().getLoginname()+"' " +
							" where 1=1 "+paramSQL;
		}else{
			sql=" from contractInfoDetailList c where 1=1 "+paramSQL;
		}
		BigDecimal count=(BigDecimal)dao.getHibernateSession().createSQLQuery("select count(1) "+sql).uniqueResult();
		vo.setCount(count.intValue());
		
		List list=new ArrayList();
		list=this.dao.getHibernateSession().createSQLQuery("select c.* "+sql).setFirstResult(vo.getStart()).setMaxResults(vo.getLimit()).list();
		return list;
	}

	public List getBuinessPlanInfoDetailList(ProcurementDetailVo vo) {
		//获取当前登录用户信息
	    Identity identity  = (Identity)Component.getInstance("org.jboss.seam.security.identity");
	    String loginname=identity.getLoginUser().getLoginname();
		
	    String authSQL="";
	    if(UtilDAOImp.isLeader(dao.getHibernateSession())){
	        //权限控制
		    authSQL="(select * from BuinessPlanInfoDetailList m where m.materialitemcode  in (" + MaterialServiceImpl.getMaterialcodeAuthorityByLoginName(loginname)+ "))";
	    }else{
	    	authSQL="BuinessPlanInfoDetailList";
	    }
	    
		String paramSQL="";
		if(vo.getMaterialitemname()!=null&&!vo.getMaterialitemname().equals("")){
			paramSQL+=" and materialitemname like '%"+vo.getMaterialitemname()+"%'";
		}
		if(vo.getMaterialitemcode()!=null&&!vo.getMaterialitemcode().equals("")){
			paramSQL+=" and materialitemcode='"+vo.getMaterialitemcode()+"'";
		}
		
		BigDecimal count=(BigDecimal)dao.getHibernateSession().createSQLQuery("select count(1) from "+authSQL+" where 1=1 "+paramSQL ).uniqueResult();
		vo.setCount(count.intValue());
		
		List list=this.dao.getHibernateSession().createSQLQuery("select * from "+authSQL+" where 1=1 "+paramSQL)
		                                        .setFirstResult(vo.getStart())
		                                        .setMaxResults(vo.getLimit())
		                                        .list();
		return list;
	}

	//需求变更
	public String changeToConfirm(ProcurementDetailVo vo) {
		JSONArray ja=JSONArray.fromObject(vo.getDeclare_detil_id());
		for (Object obj : ja) {
			String id=obj.toString();
			if (id!= null&& !id.equals("")) {
				String sql = "update T_Declare_detil dd set dd.confirmcontract='1' " +
						"where dd.declare_detil_id='"+ id + "'";
				dao.getHibernateSession().createSQLQuery(sql).executeUpdate();
			}
		}
		return "";
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
