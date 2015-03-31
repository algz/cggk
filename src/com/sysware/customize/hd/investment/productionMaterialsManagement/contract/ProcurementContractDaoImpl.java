package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalogDao;
import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetail;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetailService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetailVo;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;
import com.sysware.customize.hd.investment.util.RoleEnum;
import com.sysware.customize.hd.investment.util.Trans2RMB;

@Name("contract_ProcurementContractDaoImpl")
public class ProcurementContractDaoImpl extends
		GenericDAOImpl<ProcurementContract> implements ProcurementContractDao {

	@In(create = true, value = "materialCatalogDaoImpl")
	MaterialCatalogDao materialCatalogDao;
	
	@In(create = true)
	Identity identity;
	
	@In(create = true, value = "procurementDetail_ProcurementDetailServiceImpl")
	private ProcurementDetailService procurementDetailService; 
	private SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd"); 
	public List<ProcurementContract> findByCondition(
			ProcurementContractCondition condition) {
		int paramIndex = 1;
		List<String> params = new ArrayList<String>();
		StringBuilder queryStr = new StringBuilder(" 1=1 ");
		if (StringUtils.isNotEmpty(condition.getCreateType())) {
			queryStr.append(" and obj.createType ='"+condition.getCreateType()+"' ");
//			queryStr.append(" and obj.createType = ?" + paramIndex++);
//			params.add(condition.getCreateType());
		}
		if (StringUtils.isNotEmpty(condition.getMaterialType())) {

			queryStr.append(" and obj.materialType like '%"+condition.getMaterialType()+"%' ");
//			queryStr.append(" and obj.materialType like ?" + paramIndex++);
//			params.add("%" + condition.getMaterialType() + "%");
		}

		if(isNotLeader()){
			queryStr.append(" and obj.editors ='"+identity.getLoginUser().getUserid()+"' ");
		}else{
			if (condition.getUserId() != null) {
				queryStr.append(" and obj.editors ='"+condition.getUserId()+"' ");
//				queryStr.append(" and obj.editors = ?" + paramIndex++);
//				params.add(condition.getUserId().toString());
			}
		}
		if (condition.getApplicationStatus() != null) {
			queryStr.append(" and obj.applicationStatus ='"+condition.getApplicationStatus()+"' ");
//			queryStr.append(" and obj.applicationStatus = ?" + paramIndex++);
//			params.add(condition.getApplicationStatus().toString());
		}
		//用户权限控制
//		String materialCatalogSql=`.getMaterialCatalogNameRoleByUserId(identity.getLoginUser().getUserid());
//		queryStr.append(" and obj.materialType in ("+materialCatalogSql+")" );
		
		StringBuilder str=new StringBuilder(queryStr);
		str.insert(0, "select count(*) from T_ProcurementContract obj where ");
		BigDecimal count=(BigDecimal)this.getHibernateSession().createSQLQuery(str.toString()).setMaxResults(1).uniqueResult();
		condition.setCount(count.intValue());
		
		
		queryStr.insert(0, "select {obj.*} from T_ProcurementContract obj where ");
//		queryStr.append("and obj.editors = '"+identity.getLoginUser().getUserid()+"' ");
		queryStr.append(" order by obj.procurementContractId desc");
		return (List<ProcurementContract>)this.getHibernateSession().createSQLQuery(queryStr.toString())
		                                 .addEntity("obj",ProcurementContract.class)
		                                 .setFirstResult(condition.getStart())
		                                 .setMaxResults(condition.getLimit()).list();
//		return this.find(queryStr.toString(), params.toArray(new String[0]),
//				condition.getStart(), condition.getLimit());
	}

	public long countByCondition(ProcurementContractCondition condition) {
		int paramIndex = 1;
		List<String> params = new ArrayList<String>();
		StringBuilder queryStr = new StringBuilder(
				"select count(*) from ProcurementContract pc where 1=1 ");
		if (StringUtils.isNotEmpty(condition.getCreateType())) {
			queryStr.append(" and pc.createType = ?" + paramIndex++);
			params.add(condition.getCreateType());
		}
		if (StringUtils.isNotEmpty(condition.getMaterialType())) {
			queryStr.append(" and pc.materialType like ?" + paramIndex++);
			params.add("%" + condition.getMaterialType() + "%");
		}
		if (condition.getUserId() != null) {
			queryStr.append(" and pc.editors = ?" + paramIndex++);
			params.add(condition.getUserId().toString());
		}
		if (condition.getApplicationStatus() != null) {
			queryStr.append(" and pc.applicationStatus = ?" + paramIndex++);
			params.add(condition.getApplicationStatus().toString());
		}
		Query query = this.em.createQuery(queryStr.toString());
		for (int i = 0; i < params.size(); i++) {
			query.setParameter(i + 1, params.get(i));
		}

		return (Long) query.getSingleResult();
	}

	public int getContractMaxCode(String procurementType) {
		// 锁定该表，以保证并发情况下正确的获得MaxCode
		// 该锁定将在当前事务提交或回滚时释放
		String lockSql = "lock table T_ProcurementContract in exclusive mode";
		this.em.createNativeQuery(lockSql).executeUpdate();

		String sql = "select substr(max(auditCode),7) + 1 from T_ProcurementContract t where 1=1 ";
		sql += " and t.auditCode like 'S"
				+ ProcurementTypeEnum.getByValue(procurementType).getCode()
				+ "%'";

		Object obj = this.em.createNativeQuery(sql).getSingleResult();
		if (obj == null) {
			return 1;
		}
		return ((BigDecimal) obj).intValue();
	}

	public ArrayList<ArrayList<String>> getContractInfo(String contractId,
			String contractModelNo) {
		ArrayList<ArrayList<String>> contentList = new ArrayList<ArrayList<String>>();
		ArrayList<String> materialList = new ArrayList<String>();
		ArrayList<String> amountList = new ArrayList<String>();
		ArrayList<String> sizeList = new ArrayList<String>();
		ArrayList<String> indexList = new ArrayList<String>();
		ProcurementContract contract = get(contractId);
		materialList.add(contract.getContractCode());
		if(contractModelNo.equals("承揽合同-工具"))
			materialList.add(contract.getContractName());
		if(!contractModelNo.equals("成件修理合同(成件处)定稿") && !contractModelNo.equals("塑料件订货合同(成件处)定稿") && 
				 !contractModelNo.equals("武器装备配套产品订货合同(成件处导弹)定稿") && 
				 !contractModelNo.equals("武器装备配套产品订货合同(成件处飞机)定稿") &&
				 !contractModelNo.equals("武器装备配套产品修理合同") &&
				 !contractModelNo.equals("武器装备配套产品订货合同(导弹)") &&
				 !contractModelNo.equals("武器装备配套产品订货合同(飞机)"))
		{ 
			materialList.add(contract.getVendName()); 
		}
		amountList.add(Trans2RMB.getAmout(contract.getContractAmount().toString()));//获得数字的大写
		amountList.add(contract.getContractAmount().toString());
//		添加供应商信息
		Vendor vendor = (Vendor)this.getHibernateSession().get(Vendor.class, contract.getVendor());
		amountList.add(vendor.getVendorName());//生产厂家
		amountList.add("");
		amountList.add("");
		amountList.add(vendor.getEgal());
		amountList.add(vendor.getPhone());
		amountList.add(vendor.getFax());
		amountList.add(vendor.getAddress());
		amountList.add(vendor.getZipCode());
		amountList.add("");
		amountList.add(vendor.getBank());
		amountList.add(vendor.getAccountID());
		
		ProcurementDetailVo provo=new ProcurementDetailVo();
		provo.setStart(0);
		provo.setLimit(0);
		provo.setContractId(contractId);
		List<ProcurementDetail> ProcurementDetailList =procurementDetailService.getProcurementDetailByContract(provo);
		if(ProcurementDetailList!=null && ProcurementDetailList.size()>0){
			int index = 1;
			for(ProcurementDetail detil : ProcurementDetailList){ 
				this.getContent(contractModelNo, materialList, detil, contract.getVendName(), index,indexList);
				index++;
			}
		}
		sizeList.add(String.valueOf(ProcurementDetailList.size()));
		contentList.add(materialList);
		contentList.add(amountList);
		contentList.add(sizeList);
		contentList.add(indexList);
		return contentList;
	}
	
	/**
	 * 把物资记录数据装配到物资表格
	 * 如果要显示10条物资记录,此方法将调用10次.
	 * @param contractModelNo  模板名称 
	 * @param materialList     获取合同对应的物资表格 OUT
	 * @param detil            合同对应的物资数据 IN 
	 * @param vendorName       供应商(生产厂商)名称
	 * @param index            物资记录的当前序号
	 * @param indexList        物质表格配置参数.即首次加载一次.
	 */
	private void getContent(String contractModelNo,ArrayList<String> materialList,ProcurementDetail detil,String vendorName,int index,ArrayList<String> indexList){
		if(contractModelNo.equals("设备买卖合同(招标、比价项目使用)") || contractModelNo.equals("设备买卖合同") || 
				contractModelNo.equals("材料买卖合同") || contractModelNo.equals("防暑药品买卖合同定稿") ||
				contractModelNo.equals("设备买卖合同(国家专项技改项目范本)")){
			materialList.add(detil.getMaterialItemName());//名称
			materialList.add(detil.getDesingnation()==null?"":detil.getDesingnation()); //牌号
			materialList.add(detil.getMaterialStandard()==null?"":detil.getMaterialStandard());//规格
			materialList.add(vendorName);//生产厂家
			materialList.add(detil.getDemension()==null?"":detil.getDemension());//单位
			materialList.add(detil.getActualNumber().toString());//数量
			materialList.add("");//单价
			materialList.add("");//合计
			materialList.add(sd.format(detil.getDeliveryDate()));//交货时间和数量 
			
		}else if(contractModelNo.equals("办公用品采购合同")){
			materialList.add(detil.getMaterialItemName());//名称
			materialList.add(detil.getDesingnation()==null?"":detil.getDesingnation()); //牌号
			materialList.add(detil.getMaterialStandard()==null?"":detil.getMaterialStandard());//规格
			materialList.add(vendorName);//生产厂家
			materialList.add(detil.getDemension()==null?"":detil.getDemension());//单位
			materialList.add("");//单价 
		}else if(contractModelNo.equals("茶叶买卖合同")){
			materialList.add(detil.getMaterialItemName());//名称 
			materialList.add(detil.getActualNumber().toString());//数量
			materialList.add(detil.getDemension()==null?"":detil.getDemension());//单位
			materialList.add("");//单重
			materialList.add("");//单价
			materialList.add("");//合计
		}else if(contractModelNo.equals("成件修理合同(成件处)定稿") || contractModelNo.equals("塑料件订货合同(成件处)定稿") || 
				 contractModelNo.equals("武器装备配套产品订货合同(成件处导弹)定稿") || 
				 contractModelNo.equals("武器装备配套产品订货合同(成件处飞机)定稿") ||
				 contractModelNo.equals("武器装备配套产品订货合同(飞机)") ||
				 contractModelNo.equals("武器装备配套产品订货合同(导弹)") ||
				 contractModelNo.equals("武器装备配套产品修理合同")){
			materialList.add(String.valueOf(index));//序号
			String standard = detil.getMaterialStandard()==null?"":detil.getMaterialStandard();
			materialList.add(detil.getMaterialItemName()+standard);//名称 规格
		 	materialList.add(detil.getDemension()==null?"":detil.getDemension());//单位
			materialList.add("");//单价
			materialList.add(detil.getActualNumber().toString());//数量
			materialList.add("");//金额合计
			materialList.add((detil.getJan()==null?BigDecimal.ZERO:detil.getJan()).
					add(detil.getFeb()==null?BigDecimal.ZERO:detil.getFeb()).
					add(detil.getMar()==null?BigDecimal.ZERO:detil.getMar()).
					add(detil.getApr()==null?BigDecimal.ZERO:detil.getApr()).
					add(detil.getMay()==null?BigDecimal.ZERO:detil.getMay()).
					add(detil.getJune()==null?BigDecimal.ZERO:detil.getJune()).
					add(detil.getJuly()==null?BigDecimal.ZERO:detil.getJuly()).
					add(detil.getAug()==null?BigDecimal.ZERO:detil.getAug()).
					add(detil.getSept()==null?BigDecimal.ZERO:detil.getSept()).
					add(detil.getOct()==null?BigDecimal.ZERO:detil.getOct()).
					add(detil.getDect()==null?BigDecimal.ZERO:detil.getDect()).
					add(detil.getNov()==null?BigDecimal.ZERO:detil.getNov()).
					add(detil.getDect()==null?BigDecimal.ZERO:detil.getDect())+"");//合计
			materialList.add(detil.getJan()==null?"":detil.getJan().toString());//1
			materialList.add(detil.getFeb()==null?"":detil.getFeb().toString());//2
			materialList.add(detil.getMar()==null?"":detil.getMar().toString());//3
			materialList.add(detil.getApr()==null?"":detil.getApr().toString());//4
			materialList.add(detil.getMay()==null?"":detil.getMay().toString());//5
			materialList.add(detil.getJune()==null?"":detil.getJune().toString());//6
			materialList.add(detil.getJuly()==null?"":detil.getJuly().toString());//7
			materialList.add(detil.getAug()==null?"":detil.getAug().toString());//8
			materialList.add(detil.getSept()==null?"":detil.getSept().toString());//9
			materialList.add(detil.getOct()==null?"":detil.getOct().toString());//10
			materialList.add(detil.getNov()==null?"":detil.getNov().toString());//11
			materialList.add(detil.getDect()==null?"":detil.getDect().toString());//12
			
		}else if(contractModelNo.equals("承揽合同-工具")){ 
			materialList.add(detil.getMaterialItemName());//名称 规格
			materialList.add("");//批次
			materialList.add(detil.getProductCode());//机型
			materialList.add(detil.getMaterialStandard()==null?"":detil.getMaterialStandard());//图号
			materialList.add(detil.getActualNumber().toString());//数量 
			materialList.add("");//单价
			materialList.add("");//合计
			materialList.add(sd.format(detil.getDeliveryDate()));//交付时间
			materialList.add("");//交付地点
		}else if(contractModelNo.equals("工具买卖合同范本定稿") || contractModelNo.equals("木材买卖合同范本定稿")){ 
			materialList.add(detil.getMaterialItemName());//名称 
			materialList.add(detil.getMaterialStandard()==null?"":detil.getMaterialStandard());//规格
			if(contractModelNo.equals("工具买卖合同范本定稿")){
			materialList.add(vendorName+detil.getDesingnation()==null?"":detil.getDesingnation());//生产厂家
			materialList.add(detil.getDemension()==null?"":detil.getDemension());//单位
			}
			materialList.add(detil.getActualNumber().toString());//数量
			materialList.add("");//单价
			materialList.add("");//合计
			if(contractModelNo.equals("工具买卖合同范本定稿"))
				materialList.add(sd.format(detil.getDeliveryDate()));//交付时间
		}else if(contractModelNo.equals("工装标准件采购合同")){ 
			materialList.add(detil.getMaterialItemName());//名称 
			materialList.add(detil.getMaterialStandard()==null?"":detil.getMaterialStandard());//规格 
			materialList.add(detil.getDemension()==null?"":detil.getDemension());//单位
			materialList.add(detil.getActualNumber().toString());//数量
			materialList.add("");//单价
			materialList.add("");//合计
			materialList.add(sd.format(detil.getDeliveryDate())
					);//交货时间和数量 
		}else if(contractModelNo.equals("金属处-军品材料采购合同定稿") || contractModelNo.equals("机电产品采购合同范本定稿") ||
				 contractModelNo.equals("金属处-钢材采购合同范本定稿") ||  contractModelNo.equals("非金属处-材料采购合同范本定稿")){ 
			if(contractModelNo.equals("金属处-军品材料采购合同定稿")){
				materialList.add(String.valueOf(index));//序号
			}
			materialList.add(detil.getMaterialItemName());//名称 
			if(contractModelNo.equals("机电产品采购合同范本定稿") || contractModelNo.equals("非金属处-材料采购合同范本定稿"))
				materialList.add("");//名称 
		    materialList.add(detil.getDesingnation()==null?"":detil.getDesingnation()+""+detil.getMaterialStandard()==null?"":detil.getMaterialStandard());//商标
		    materialList.add(detil.getTechnicCondition()==null?"":detil.getTechnicCondition());//技术条件
		    if(contractModelNo.equals("机电产品采购合同范本定稿")  || contractModelNo.equals("非金属处-材料采购合同范本定稿") || contractModelNo.equals("金属处-钢材采购合同范本定稿"))
		    	materialList.add(vendorName);
		    materialList.add(detil.getDemension()==null?"":detil.getDemension());//单位
			materialList.add(detil.getActualNumber().toString());//数量
			materialList.add("");//单价
			materialList.add("");//合计
			materialList.add(sd.format(detil.getDeliveryDate()));//交货时间和数量 
		}else if(contractModelNo.equals("劳保用品采购合同范本评审稿") || contractModelNo.equals("订单采购-电脑范例合同范本定稿")){ 
			materialList.add(detil.getMaterialItemName());//名称 
			materialList.add("");//商标
			materialList.add(detil.getMaterialStandard()==null?"":detil.getMaterialStandard());//规格
			materialList.add("");//颜色 
			materialList.add(detil.getActualNumber().toString());//数量
			materialList.add("");//单价 
			materialList.add("");//总价 
		}else if(contractModelNo.equals("维修合同范本2试用") || contractModelNo.equals("配件维修合同版本1试用")){ 
			materialList.add(String.valueOf(index));//序号
			materialList.add(detil.getMaterialItemName());//名称  
			materialList.add(detil.getMaterialStandard()==null?"":detil.getMaterialStandard()+detil.getDesingnation()==null?"":detil.getDesingnation());//规格/牌号 
			materialList.add(detil.getActualNumber().toString());//数量
			materialList.add("");//维修价格
			materialList.add("");//完成日期 
		}else if(contractModelNo.equals("原煤采购合同范本定稿")){ 
			materialList.add(detil.getMaterialItemName());//名称 
			materialList.add(vendorName);//生产厂家
			materialList.add(detil.getDemension()==null?"":detil.getDemension());//单位
			materialList.add(detil.getActualNumber().toString());//数量
			materialList.add("");//单价 
			materialList.add("");//合计
		}else if(contractModelNo.equals("实物采购合同模板")){
			materialList.add(detil.getMaterialItemName());//名称
			materialList.add(detil.getDesingnation()==null?"":detil.getDesingnation()); //牌号
			materialList.add(detil.getMaterialStandard()==null?"":detil.getMaterialStandard());//规格
//			materialList.add(vendorName);//生产厂家
			materialList.add(detil.getDemension()==null?"":detil.getDemension());//单位
			materialList.add(detil.getActualNumber().toString());//数量
			materialList.add("");//单价 
			materialList.add("");//合计
		}
		/**
		 * indexList 物质表格配置参数,即调用一次.存储二个参数
		 * 第一个参数用来区别物资信息显示位置.0是在文档区域内显示;1以附件的方式在文档结尾显示
		 * 第二个参数是物资信息表格的复制行号.参数为1是数据就从第二行开始复制;参数为0,数据从第一行开始复制.初始值为0.
		 * 
		 */
		if(indexList.size()==0){
			if(contractModelNo.equals("设备买卖合同")|| contractModelNo.equals("设备买卖合同(国家专项技改项目范本)") ||
			   contractModelNo.equals("办公用品采购合同") || contractModelNo.equals("工装标准件采购合同") || 
			   contractModelNo.equals("金属处-军品材料采购合同定稿") || contractModelNo.equals("机电产品采购合同范本定稿") ||
			   contractModelNo.equals("金属处-钢材采购合同范本定稿") || contractModelNo.equals("劳保用品采购合同范本评审稿") || 
			   contractModelNo.equals("非金属处-材料采购合同范本定稿") || contractModelNo.equals("订单采购-电脑范例合同范本定稿") ||
			   contractModelNo.equals("实物采购合同模板")){
				indexList.add("1");
				if(contractModelNo.equals("办公用品采购合同") ||contractModelNo.equals("工装标准件采购合同") || 
						contractModelNo.equals("金属处-军品材料采购合同定稿") || contractModelNo.equals("机电产品采购合同范本定稿") ||
						contractModelNo.equals("金属处-钢材采购合同范本定稿") || contractModelNo.equals("非金属处-材料采购合同范本定稿"))
					indexList.add("0"); 
				else if (contractModelNo.equals("劳保用品采购合同范本评审稿") || contractModelNo.equals("实物采购合同模板") || 
						contractModelNo.equals("订单采购-电脑范例合同范本定稿"))
					indexList.add("2");
				else
					indexList.add("1");
			}else if(contractModelNo.equals("成件修理合同(成件处)定稿") || contractModelNo.equals("塑料件订货合同(成件处)定稿") ||
					 contractModelNo.equals("武器装备配套产品订货合同(成件处导弹)定稿") || contractModelNo.equals("武器装备配套产品订货合同(成件处飞机)定稿")||
					 contractModelNo.equals("武器装备配套产品订货合同(导弹)") || contractModelNo.equals("武器装备配套产品订货合同(飞机)") || 
					 contractModelNo.equals("武器装备配套产品修理合同"))
			{
				indexList.add("0"); 
				indexList.add("1");
			}else{
				indexList.add("0");
				indexList.add("0");
			}
		}
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
