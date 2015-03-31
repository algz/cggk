package com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.axis2.databinding.utils.BeanUtil;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.common.CommonDAO;
import com.luck.itumserv.entity.Guser;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalogService;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ApplicationStatusEnum;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ProcurementTypeEnum;
import com.sysware.customize.hd.investment.util.RoleEnum;
import com.sysware.p2m.department.DepartmentService;
import com.sysware.p2m.guser.GuserService;

@Name("purchaseDaoImpl")
public class PurchaseDaoImpl extends GenericDAOImpl<Purchase> implements
		PurchaseDao {
	@In(create = true, value = "materialCatalogServiceImpl")
	MaterialCatalogService materialCatalogService;
	
	@In(create = true, value = "guser_GuserServiceImpl")
	GuserService _guserService;

	@In(create = true, value = "department_DepartmentServiceImpl")
	private DepartmentService _departmentService;

	@In(create = true, value = "common_CommonDAO")
	private CommonDAO<Object> dao;
	
	private static final DateFormat shortDateFormat = new SimpleDateFormat(
			"yyyy-MM-dd");
	@In(create = true)
	Identity identity; 
	/**
	 * 根据条件查询采购大纲记录
	 * 
	 * @param purchaseCondition
	 *            条件
	 * @return 采购大纲
	 */
	public List<PurchaseVo> getPurchaseListByCondition(PurchaseCondition purchaseCondition) {
//        StringBuilder str=new StringBuilder("select count(*) from t_purchase p where 1=1 ");
		StringBuilder str = new StringBuilder("select count(1) from (");
		str.append("SELECT p.PURCHASEID,p.purchasecode,p.createdate,p.status,p.materialtypename,p.editor,p.TYPE,p.remark,p.purchasename ");
		str.append("FROM v_purchaseDetail p ");
		if(isNotLeader()){
			str.append("INNER JOIN t_item_profile ip ON p.materialitemcode=ip.item_code ");
		}
		str.append("where 1=1 ");
		if(isNotLeader()){
			str.append("and ip.login_name='"+identity.getLoginUser().getLoginname()+"' ");
		}
        buildQueryString(purchaseCondition, str);
        str.append("GROUP BY p.PURCHASEID, p.purchasecode,p.createdate,p.status,p.materialtypename,p.editor,p.TYPE,p.remark,p.purchasename)");
        BigDecimal count=(BigDecimal)this.getHibernateSession().createSQLQuery(str.toString()).setMaxResults(1).uniqueResult();
		purchaseCondition.setCount(count.intValue());
        
//		StringBuilder queryStr = new StringBuilder("select * from t_purchase p where 1=1 ");
		StringBuilder queryStr = new StringBuilder("SELECT DISTINCT p.PURCHASEID,p.purchasecode,p.createdate,p.status,p.materialtypename,p.editor,p.TYPE,p.remark,p.purchasename,p.procurementid");
		queryStr.append(" FROM v_purchaseDetail p ");
		if(isNotLeader()){
			queryStr.append("INNER JOIN t_item_profile ip ON p.materialitemcode=ip.item_code ");
		}
		queryStr.append(" where 1=1 ");
		if(isNotLeader()){
			queryStr.append("and ip.login_name='"+identity.getLoginUser().getLoginname()+"' ");
		}
		buildQueryString(purchaseCondition, queryStr);
		//queryStr.append("GROUP BY p.PURCHASEID, p.purchasecode,p.createdate,p.status,p.materialtypename,p.editor,p.TYPE,p.remark,p.purchasename");
		queryStr.append(" order by p.createDate desc");
		List<Object[]> list=dao.getHibernateSession().createSQLQuery(queryStr.toString())
		                                   .setFirstResult(purchaseCondition.getStart())
		                                   .setMaxResults(purchaseCondition.getLimit()).list();
//		List<Purchase> pcList=this.executeNativeQuery(queryStr.toString(), Purchase.class,
//				null, purchaseCondition.getStart(),
//				purchaseCondition.getLimit());
		
		List<PurchaseVo> voList=new ArrayList<PurchaseVo>();
		for(Object[] obj:list){
			PurchaseVo purchaseVo = new PurchaseVo();
//			try {
//				BeanUtils.copyProperties(purchaseVo, purchase);
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
			//PU."CREATEDATE",PU."STATUS",PU."MATERIALTYPENAME",PU."EDITOR",PU."TYPE",PU."REMARK",PU."PURCHASENAME",
			purchaseVo.setPurchaseId(obj[0].toString());
			purchaseVo.setPurchaseCode(obj[1].toString());
			// 创建日期
			purchaseVo.setCreateDate(obj[2] == null ? ""
					: shortDateFormat.format(obj[2]));
			// 申请状态
			String status = (String)obj[3];
			purchaseVo.setStatus(status);
			purchaseVo.setStateName(ApplicationStatusEnum.getByValue(status)
					.getName());
			// 编辑人信息
			String editor = obj[5].toString();
			purchaseVo.setEditor(editor);
			Guser guser = _guserService.getGuserById(Long.parseLong(editor));
			purchaseVo.setEditorName(guser.getTruename());
			String deptCode = guser.getGinstitute().getInstcode();
			String deptName = _departmentService.getDepartmentByCode(deptCode)
					.getDepartmetname();
			purchaseVo.setEditorDeptName(deptName);
			// 需求类型
			String procurementType = (String)obj[6];
			purchaseVo.setType(procurementType);
			purchaseVo.setPurchaseTypeName(ProcurementTypeEnum.getByValue(
					procurementType).getName()
					+ "需求");
			purchaseVo.setPurchaseName(obj[8].toString());
			purchaseVo.setProcurementId(obj[9]==null||obj[9].toString().equals("")?"":obj[9].toString());

			voList.add(purchaseVo);
		}
		return voList;
	}

	/**
	 * 根据条件查询采购大纲总记录数
	 * 
	 * @param purchaseCondition
	 *            条件
	 * @return 采购大纲总记录数
	 */
	public Long getCountByCondition(PurchaseCondition purchaseCondition) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append(" select count(p.PurchaseID) from t_purchase p where 1=1  ");
		buildQueryString(purchaseCondition, queryStr);
		return ((BigDecimal) this.executeNativeQuery(queryStr.toString(), null,
				0, 0).get(0)).longValue();
	}

	/**
	 * 根据需求来源类型获得purchaseCode采购编号
	 * 
	 * @param String
	 *            type 需求来源类型
	 * 
	 * @return purchaseCode采购编号的purchaseMaxCode部分
	 */
	public int getPurchaseMaxCode(String type) {
		String sql = "select substr(max(purchasecode),7) + 1 from t_purchase t "
				+ " where t.type= '" + type + "'";
		Object obj = this.em.createNativeQuery(sql).getSingleResult();
		if (obj == null) {
			return 1;
		}
		return ((BigDecimal) obj).intValue();
	}

	/**
	 * 根据条件构建查询语句
	 * 
	 * @param purchaseCondition
	 *            条件对象
	 * @param queryStr
	 *            查询语句对象
	 */
	private void buildQueryString(PurchaseCondition purchaseCondition,StringBuilder queryStr) {
		
		if(StringUtils.isNotBlank(purchaseCondition.getPurchaseCode())){
			queryStr.append(" and p.purchaseCode='"+purchaseCondition.getPurchaseCode().toUpperCase()+"'");
		}
		//限定查看权限
		if(StringUtils.isNotBlank(purchaseCondition.getEditor())){
			queryStr.append(" and p.editor='" + purchaseCondition.getEditor()+ "' ");			
		}
		// 添加物料种类信息名称查询条件
		if (StringUtils.isNotBlank(purchaseCondition.getSearchCatlogName())) {
			queryStr.append(" and p.MaterialTypeName like '"
					+ purchaseCondition.getSearchCatlogName().trim() + "%'");
		}
		// 添加物料信息名称查询条件
		if (StringUtils.isNotBlank(purchaseCondition.getSearchMaterialName())) {
			queryStr.append(" and p.PurchaseID in (select pd.PurchaseID from T_ProcurementDetail pd "
					+ " where pd.MaterialID in (select tm.MATERIALID from T_Material tm where tm.materialItemName like '"
					+ purchaseCondition.getSearchMaterialName().trim()
					+ "%') )");
		}
		if (StringUtils.isNotBlank(purchaseCondition.getPurchaseType())) {
			queryStr.append(" and p.type = '"
					+ purchaseCondition.getPurchaseType() + "'");
		}
		if (StringUtils.isNotBlank(purchaseCondition.getStatus())) {
			queryStr.append(" and p.status in ('3','4')");
		} 
//		// 用户权限控制
//		String materialCatalogSql = materialCatalogService.getMaterialCatalog();
//		
//		if(purchaseCondition.getPurchaseType()==null||purchaseCondition.getPurchaseType().equals("")){
//			//零星计划
//			queryStr.append(" and p.PurchaseID in (select pd.PurchaseID from T_ProcurementDetail pd "
//					+ " where PD.MATERIALID in (select tm.MATERIALID from T_Material tm where tm.parentid in ("
//					+ materialCatalogSql + ")) )");
//		}else{
//			//材料定额的年度计划
//			queryStr.append(" and p.PurchaseID in (select pd.PurchaseID from T_ProcurementDetail pd "
//					+ " where PD.CLDM in (select tm.MATERIALITEMCODE from T_Material tm where tm.parentid in ("
//					+ materialCatalogSql + ")) )");
//		}

	}

	/**
	 * 根据sql语句查询得结果集转换为拥有相应目标实体类范型的集合
	 * 
	 * @param String
	 *            nnq 目标 sql语句
	 * @param Class
	 *            resultClass 所要转换为的目标实体类
	 * @param Object
	 *            [] params sql 命名参数
	 * @param int begin 分页参数
	 * @param int max 分页参数
	 * @return List<Class resultClass>
	 */
	@SuppressWarnings({ "unchecked" })
	private <T> List<T> executeNativeQuery(final String nnq,
			Class<T> resultClass, final Object[] params, final int begin,
			final int max) {

		javax.persistence.Query query = this.em.createNativeQuery(nnq,
				resultClass);
		int parameterIndex = 1;
		if (params != null && params.length > 0) {
			for (Object obj : params) {
				query.setParameter(parameterIndex++, obj);
			}
		}
		if (begin >= 0 && max > 0) {
			query.setFirstResult(begin);
			query.setMaxResults(max);
		}
		List<T> ret = query.getResultList();

		if (ret != null && ret.size() >= 0) {
			return ret;
		} else {
			return new ArrayList<T>(0);
		}

	}

	@SuppressWarnings("unchecked")
	public List<PurchaseVo> getPurchaseOfAnnualPlan(PurchaseVo vo) {
					 //获取当前登录用户信息
		Identity identity  = (Identity)Component.getInstance("org.jboss.seam.security.identity");
		StringBuilder param=new StringBuilder(" from t_purchase pur where pur.type='1' and pur.editor='"+identity.getLoginUser().getUserid()+"' ");
		if(vo.getPurchaseCode()!=null&&!vo.getPurchaseCode().equals("")){
			param.append(" and pur.purchaseCode like '"+vo.getPurchaseCode()+"%' ");
		}
        BigDecimal count=(BigDecimal)this.getHibernateSession().createSQLQuery("select count(1) "+param.toString()).setMaxResults(1).uniqueResult();
        vo.setCount(count.intValue());
        
		List<Purchase> pcList=dao.getHibernateSession().createSQLQuery("select pur.* "+param.toString()+" order by pur.createDate desc ")
		                         .addEntity("pur",Purchase.class)
		                         .setFirstResult(vo.getStart())
		                         .setMaxResults(vo.getLimit()).list();
		
		List<PurchaseVo> voList=new ArrayList<PurchaseVo>();
		for(Purchase purchase:pcList){
			PurchaseVo purchaseVo = new PurchaseVo();
			try {
				BeanUtils.copyProperties(purchaseVo, purchase);
			} catch (Exception e) {
				e.printStackTrace();
			} 
			// 创建日期
			purchaseVo.setCreateDate(purchase.getCreateDate() == null ? ""
					: shortDateFormat.format(purchase.getCreateDate()));
//			// 申请状态
//			String status = purchase.getStatus();
//			purchaseVo.setStatus(status);
//			purchaseVo.setStateName(ApplicationStatusEnum.getByValue(status)
//					.getName());
//			// 需求类型
//			String procurementType = purchase.getType();
//			purchaseVo.setType(procurementType);
//			purchaseVo.setPurchaseTypeName(ProcurementTypeEnum.getByValue(
//					procurementType).getName()
//					+ "需求");
			// 编辑人信息
			String editor = purchase.getEditor();
			purchaseVo.setEditor(editor);
			Guser guser = _guserService.getGuserById(Long.parseLong(editor));
			purchaseVo.setEditorName(guser.getTruename());
			String deptCode = guser.getGinstitute().getInstcode();
			String deptName = _departmentService.getDepartmentByCode(deptCode)
					.getDepartmetname();
			purchaseVo.setEditorDeptName(deptName);

			voList.add(purchaseVo);
		}
		return voList;
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
