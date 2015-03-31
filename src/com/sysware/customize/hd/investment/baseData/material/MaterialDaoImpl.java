package com.sysware.customize.hd.investment.baseData.material;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Restrictions;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.services.security.Identity;
import com.luck.itumserv.base.jdbc.SingleConnection;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalog;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalogUser;
import com.sysware.customize.hd.investment.general.exception.BusinessDataStateException;

import flex.messaging.util.StringUtils;

/**
 * 物料信息DAO实现类
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 16-五月-2011 13:46:08
 */
@Name("material_MaterialDaoImpl")
public class MaterialDaoImpl extends GenericDAOImpl<Material> implements
		MaterialDao {
		
	@In(create = true, value = "org.jboss.seam.security.identity")
	private Identity identity;
	
	/**
	 * 根据条件得到物料信息总数
	 * 
	 * @author tengWeiJia
	 * @param materialCondition
	 *            MaterialVo对象
	 * @param params
	 * @return Integer
	 */
	public long countByCondition(MaterialCondition materialCondition) {

		StringBuilder sql = new StringBuilder(
				" select count(*) from t_material m ");
		String[] params = {};

		if ("0".equals(materialCondition.getStartId())) {
			sql.append(" where 1=1 ");
		} else {//如果当前节点不是根节点，从当前节点开始递归 查询
			sql.append(" where m.parentid in (");
			sql.append(" select mc.materialcatalogid from t_materialcatalog mc ");
			sql.append(" start with mc.materialcatalogid=?1 ");
			sql.append(" connect by prior mc.materialcatalogid = mc.parentid) ");
			params = new String[] { materialCondition.getStartId() };
		}
		if (materialCondition.getMaterialType() != null) {
			String para = " not ";
			if(materialCondition.getMaterialType().equals("1"))
				para = "";
			sql.append(" and m.parentid in (");
			sql.append(" select mc.materialcatalogid from t_materialcatalog mc ");
			sql.append(" start with mc.MATERIALTYPENAME "+para+" In ('有色金属','黑色金属') ");
			sql.append(" connect by prior mc.materialcatalogid = mc.parentid) "); 
		}
		String queryMaterialItemName = materialCondition.getMaterialItemName();
		if (!StringUtils.isEmpty(queryMaterialItemName)) {//对物料信息名进行查询
			sql.append(" and m.materialItemName like '%"
					+ queryMaterialItemName + "%'");
		}	if (!StringUtils.isEmpty(queryMaterialItemName)) {
			sql.append(" and m.materialItemName like '%"
					+ queryMaterialItemName + "%' ");
		}
		if (!StringUtils.isEmpty(materialCondition.getMaterialStandard())){
			sql.append(" and m.materialStandard like '%"
					+ materialCondition.getMaterialStandard() + "%' ");
		}
		if (!StringUtils.isEmpty(materialCondition.getDemension())){
			sql.append(" and m.demension like '%"
					+ materialCondition.getDemension() + "%' ");
		}
		if (!StringUtils.isEmpty(materialCondition.getTechnicCondition())){
			sql.append(" and m.technicCondition like '%"
					+ materialCondition.getTechnicCondition() + "%' ");
		}
		if (!StringUtils.isEmpty(materialCondition.getMaterialitemcode())){
			sql.append(" and m.materialitemcode like '%"
					+ materialCondition.getMaterialitemcode() + "%' ");
		}
		if (!StringUtils.isEmpty(materialCondition.getDesingnation())){
			sql.append(" and m.desingnation like '%"
					+ materialCondition.getDesingnation() + "%' ");
		}
        if(!StringUtils.isEmpty(materialCondition.getParentId())){
			sql.append(" and m.parentid in (");
			sql.append(" select mc.materialcatalogid from t_materialcatalog mc ");
			sql.append(" start with mc.MATERIALTYPENAME = '"+materialCondition.getParentId()+"' ");
			sql.append(" connect by prior mc.materialcatalogid = mc.parentid) ");
		}
		return ((BigDecimal) (this.executeNativeQuery(sql.toString(), params,
				0, 0).get(0))).longValue();
	}

	/**
	 * 根据物料种类id列示所有物料信息
	 * 
	 * 
	 * @param materialCondition
	 *            MaterialCondition对象
	 * @return 所有物料信息（实体类）
	 */

	public List<Material> findMaterialsByMaterialCatalog(
			MaterialCondition materialCondition) {

		return this.find(" materialCatalog.materialcatalogid = ? ",
				new String[] { materialCondition.getParentId() });

	}

	/**
	 * 列示所有物料信息
	 * 
	 * @param materialCondition
	 *            MaterialCondition对象
	 * @param start
	 *            起始行
	 * @param limit
	 *            每页行数
	 * @return 所有物料信息
	 */
	public List<Material> findAllMaterials(MaterialCondition materialCondition,
			int start, int limit) {

		StringBuilder sql = new StringBuilder();
		String[] params = {};

		if ("0".equals(materialCondition.getStartId())) {
			sql.append(" where 1=1 \n");
		} else {//如果当前节点不是根节点，从当前节点开始递归 查询
			sql.append(" where m.parentid in ( \n");
			sql.append(" select mc.materialcatalogid from t_materialcatalog mc \n");
			sql.append(" start with mc.materialcatalogid='"+materialCondition.getStartId()+"' \n");
			sql.append(" connect by prior mc.materialcatalogid = mc.parentid) \n");
			params = new String[] { materialCondition.getStartId() };
		}
		if (materialCondition.getMaterialType() != null) {
			/*
			String para = " not ";
			if(materialCondition.getMaterialType().equals("1")){// 1 --- IN (金属)  2--- NOT IN (非金属)
				para = "";
			}
			sql.append(" and m.parentid in ( \n");
			sql.append(" select mc.materialcatalogid from t_materialcatalog mc \n");
			sql.append(" start with mc.MATERIALTYPENAME "+para+" In ('有色金属材料大类','黑色金属材料大类') \n");
			sql.append(" connect by prior mc.materialcatalogid = mc.parentid) \n"); 
			*/
			if(materialCondition.getMaterialType().equals("1")){// 1 --- IN (金属)  2--- NOT IN (非金属)
				sql.append(" AND EXISTS ( \n");
				sql.append(" SELECT 1 FROM t_materialcatalog b \n");
				sql.append(" WHERE m.parentid = b.materialcatalogid \n");
				sql.append(" START WITH b.materialtypename IN ('有色金属材料大类','黑色金属材料大类') \n");
				sql.append(" CONNECT BY PRIOR b.materialcatalogid = b.parentid ) \n");
			}else{
				sql.append(" AND NOT EXISTS ( \n");
				sql.append(" SELECT 1 FROM t_materialcatalog b \n");
				sql.append(" WHERE m.parentid = b.materialcatalogid \n");
				sql.append(" START WITH b.materialtypename IN ('有色金属材料大类','黑色金属材料大类') \n");
				sql.append(" CONNECT BY PRIOR b.materialcatalogid = b.parentid ) \n");
			}
		}
		String queryMaterialItemName = materialCondition.getMaterialItemName();
		if (!StringUtils.isEmpty(queryMaterialItemName)) {
			sql.append(" and m.materialItemName like '%" + queryMaterialItemName + "%' \n");
		}
		if (!StringUtils.isEmpty(materialCondition.getMaterialStandard())){
			sql.append(" and m.materialStandard like '%" + materialCondition.getMaterialStandard() + "%' \n");
		}
		if (!StringUtils.isEmpty(materialCondition.getDemension())){
			sql.append(" and m.demension like '%" + materialCondition.getDemension() + "%' \n");
		}
		if (!StringUtils.isEmpty(materialCondition.getTechnicCondition())){
			sql.append(" and m.technicCondition like '%" + materialCondition.getTechnicCondition() + "%' \n");
		}
		if (!StringUtils.isEmpty(materialCondition.getMaterialitemcode())){
			sql.append(" and m.materialitemcode like '%" + materialCondition.getMaterialitemcode() + "%' \n");
		}
		if (!StringUtils.isEmpty(materialCondition.getDesingnation())){
			sql.append(" and m.desingnation like '%" + materialCondition.getDesingnation() + "%' \n");
		} 
		if(!StringUtils.isEmpty(materialCondition.getParentId())){
			sql.append(" and m.parentid in ( \n");
			sql.append(" select mc.materialcatalogid from t_materialcatalog mc \n");
			sql.append(" start with mc.MATERIALTYPENAME = '"+materialCondition.getParentId()+"' \n");
			sql.append(" connect by prior mc.materialcatalogid = mc.parentid) \n");
		}
		 
		//如果提供小类,则仅直接查询小类;如果提供大类,则查询大类下的所有小类
		if(!StringUtils.isEmpty(materialCondition.getMaterialcatalogName())){
			//查询小类
			sql.append(" AND m.parentid='"+materialCondition.getMaterialcatalogName()+"'");
			//sql += " AND a.materialitemname = '"+materialItemName+"' \n";
//			sql .append( " AND m.parentid IN (SELECT d.materialcatalogid  \n"+
//			       "                    FROM t_materialcatalog d  \n"+
//			       "                    WHERE d.materialtypename LIKE '%"+materialCondition.getParentidName()+"%' ) \n");
		}else if(!StringUtils.isEmpty(materialCondition.getParentidName())){
			//查询大类
			//sql += " AND a.materialitemname = '"+materialItemName+"' \n";
			sql .append( " AND m.parentid IN (SELECT d.materialcatalogid "+
			       "                    FROM t_materialcatalog d where d.parentid='"+materialCondition.getParentidName()+"') ");
		}
		
		//权限管理 去掉权限管理 测试和业务要求用户可以看到的都是一样的
//		String MaterialCatalogSql = MaterialCatalogRole.getMaterialCatalogRoleByUserId(identity.getLoginUser().getUserid());
//		sql.append(" and m.PARENTID in ("+MaterialCatalogSql+") \n");
		
		StringBuilder str=new StringBuilder(sql);
		str.insert(0, "select count(*) from t_material m \n");
		
		SQLQuery  query = this.getHibernateSession().createSQLQuery(str.toString());
//		int parameterIndex = 1;
//		if (params != null && params.length > 0) {
//			for (Object obj : params) {
//				query.setParameter(parameterIndex++, obj);
//			}
//		}
		BigDecimal count=(BigDecimal)query.setMaxResults(1).uniqueResult();
		
		materialCondition.setCount(count.intValue());
		
		sql.insert(0, " select {m.*} from t_material m \n");
		return (List<Material>)this.getHibernateSession().createSQLQuery(sql.toString())
		                                 .addEntity("m",Material.class)
		                                 .setFirstResult(start)
		                                 .setMaxResults(limit)
		                                 .list();
//		return this.executeNativeQuery(sql.toString(), Material.class, params,
//				start, limit); 
	}

	/**
	 * 根据物料信息id和种类id获取物料信息List
	 * 
	 * @param materialIDs
	 *            String[]
	 * @param params
	 *            String[]
	 * @return materials
	 */
	public List<Material> getMaterialsByMaterialAndCatalog(
			String[] materialIDs, String[] catalogIDs) {

		String[] temp = new String[materialIDs.length + catalogIDs.length];

		StringBuffer sql = new StringBuffer();
		sql.append(" select distinct t.* from T_MATERIAL t where 1=1 ");
		if (materialIDs != null && materialIDs.length > 0) {
			sql.append(" and t.MATERIALID in (");
			for (int i = 1; i <= materialIDs.length; i++) {
				if (i < materialIDs.length) {
					sql.append("?").append(i).append(",");
				} else {
					sql.append("?").append(i);
				}
				temp[i - 1] = materialIDs[i - 1];
			}
			sql.append(")");
		}
		if (catalogIDs != null && catalogIDs.length > 0) {
			if (materialIDs != null && materialIDs.length > 0) {
				sql.append(" or ");
			} else {
				sql.append(" and ");
			}
			sql.append(" t.parentid in (select mc.materialcatalogid from t_materialcatalog mc ");
			sql.append(" start with mc.materialcatalogid in ( ");
			for (int i = 1 + materialIDs.length; i <= catalogIDs.length
					+ materialIDs.length; i++) {
				if (i < catalogIDs.length + materialIDs.length) {
					sql.append("?").append(i).append(",");
				} else {
					sql.append("?").append(i);
				}
				temp[i - 1] = catalogIDs[i - 1 - materialIDs.length];
			}
			sql.append(") connect by prior mc.materialcatalogid = mc.parentid) ");
		}
		return this.executeNativeQuery(sql.toString(), Material.class, temp, 0,
				0);
	}
	/**
	 * 根据文件名称获取导入文件的ID
	 * 
	 * @param ename
	 * @return Material
	 */
	public MaterialCatalog findIdByName(String ename) {
		Query query = this.getHibernateSession().createQuery(
				" from MaterialCatalog mc where mc.materialtypename=?");
		query.setParameter(0, ename);
		Object result = query.uniqueResult();
		return result == null ? null : (MaterialCatalog) result;
	}
	/**
	 * 根据采购合同ID查询物料信息
	 * 
	 * @param contractId
	 *            采购合同ID
	 * @return 符合条件的物料信息
	 */
	@SuppressWarnings("unchecked")
	public List<Material> getMaterialsByContract(String contractId) {
		StringBuilder queryStr = new StringBuilder();
		queryStr.append("select m.* from t_material m, t_materialquota mq, ");
		queryStr.append(" t_procurementdetail pd, t_procurementcontract pc ");
		queryStr.append(" where m.materialId=mq.materialId and mq.materialquotaId=pd.materialquotaId ");
		queryStr.append(" and pd.purchaseId=pc.purchaseId and pc.procurementcontractId=?1");
		return this.executeNativeQuery(queryStr.toString(),
				new String[] { contractId }, 0, 0);
	}
	/**
	 * 根据Material样例获取Material对象
	 * 
	 * @param example
	 *            Material样例对象
	 * @return Material
	 */
	public Material findMaterialByExample(Material example) {
		//老的查询方法,按照5个查询条件来判断物料是否唯一
		/*Criteria criteria = this.getHibernateSession().createCriteria(Material.class);
		criteria.add(Restrictions.eq("materialItemName",example.getMaterialItemName()));
		String desingnation = example.getDesingnation();
		criteria.add(desingnation == null ? Restrictions.isNull("desingnation"): Restrictions.eq("desingnation", desingnation));
		String materialStandard = example.getMaterialStandard();
		criteria.add(materialStandard == null ? Restrictions.isNull("materialStandard") : Restrictions.eq("materialStandard", materialStandard));
		String materialitemcode = example.getMaterialitemcode();
		criteria.add(materialitemcode == null ? Restrictions.isNull("materialitemcode") : Restrictions.eq("materialitemcode", materialitemcode));
		String technicCondition = example.getTechnicCondition();
		criteria.add(technicCondition == null ? Restrictions.isNull("technicCondition") : Restrictions.eq("technicCondition", technicCondition));
		return (Material) criteria.uniqueResult();*/
		
		
		//新的查询方法,先判断有没有 物资编号Materialitemcode 如果有就拿这个来判断,如果没有还是走老的判断流程
		Criterion materialItemName = example.getMaterialItemName() == null 
		                             ? Restrictions.isNull("materialItemName")
		                             : Restrictions.eq("materialItemName", example.getMaterialItemName()) ;
		Criterion technicCondition = example.getTechnicCondition() == null
		                             ? Restrictions.isNull("technicCondition")
		                             : Restrictions.eq("technicCondition", example.getTechnicCondition()) ;
		Criterion materialStandard = example.getMaterialStandard() == null
		                             ? Restrictions.isNull("materialStandard")
		                             : Restrictions.eq("materialStandard", example.getMaterialStandard()) ;
		Criterion desingnation = example.getDesingnation() == null
		                         ? Restrictions.isNull("desingnation")
		                         : Restrictions.eq("desingnation", example.getDesingnation()) ;
		Criterion materialitemcode = example.getMaterialitemcode() == null 
		                             ? Restrictions.isNull("materialitemcode")
		                             : Restrictions.eq("materialitemcode", example.getMaterialitemcode()) ;
		Criteria criteria = this.getHibernateSession().createCriteria(Material.class);
		if (example.getMaterialitemcode() == null){
			//原来的 5个条件确定一个物资
			criteria.add(materialItemName);
			criteria.add(technicCondition);
			criteria.add(materialStandard);
			criteria.add(desingnation);
			//criteria.add(materialitemcode);
		}else{
			//就只查询 物资编码
			criteria.add(materialitemcode);
		}
		return (Material) criteria.uniqueResult();
	}
	
	
	
	
	/**
	 * 根据物料种类ID列示所有子集物料信息
	 * 
	 * @param materialCatalogId
	 *            物料种类ID
	 * @return 所有物料信息（实体类）
	 */
	public List<Material> findAllMaterialsByMaterialCatalog(
			String materialCatalogId) {
		return this.findAllMaterialsByMaterialCatalog(materialCatalogId, 0, 0);
	}
	/**
	 * 根据物料种类id列示所有子集物料信息-分页
	 * 
	 * @param materialCatalogId
	 *            物料种类id
	 * @param start
	 *            起始记录
	 * @param limit
	 *            每页记录数
	 * @return 物料信息（实体类）
	 */
	@SuppressWarnings("unchecked")
	public List<Material> findAllMaterialsByMaterialCatalog(
			String materialCatalogId, int begin, int max) {
		StringBuilder sql = new StringBuilder();
		sql.append("select * from t_material m where m.parentid in (");
		sql.append(" select mc.materialcatalogid from t_materialcatalog mc ");
		sql.append(" start with mc.materialcatalogid=?1 ");
		sql.append(" connect by prior mc.materialcatalogid = mc.parentid) ");

		javax.persistence.Query query = this.em.createNativeQuery(
				sql.toString(), Material.class);

		if (begin >= 0 && max > 0) {
			query.setFirstResult(begin);
			query.setMaxResults(max);
		}

		query.setParameter(1, materialCatalogId);
		return query.getResultList();
	}
	/**
	 * 根据物料种类id列示所有已有需求的物料信息-分页
	 * 
	 * @param materialCatalogId
	 *            物料种类id
	 * @param start
	 *            起始记录
	 * @param limit
	 *            每页记录数
	 * @return 物料信息（实体类）
	 */
	@SuppressWarnings("unchecked")
	public List<Material> findProcurementMaterialsByMaterialCatalog(
			String materialCatalogId, int begin, int max) {
		StringBuilder sql = new StringBuilder();
		sql.append("select * from t_material m where m.parentid in (");
		sql.append(" select mc.materialcatalogid from t_materialcatalog mc ");
		sql.append(" start with mc.materialcatalogid=?1 ");
		sql.append(" connect by prior mc.materialcatalogid = mc.parentid) ");
		sql.append(" and exists (select 1 from t_procurementdetail pd where m.materialid = pd.materialid) ");

		javax.persistence.Query query = this.em.createNativeQuery(
				sql.toString(), Material.class);

		if (begin >= 0 && max > 0) {
			query.setFirstResult(begin);
			query.setMaxResults(max);
		}

		query.setParameter(1, materialCatalogId);
		return query.getResultList();
	}
	/**
	 * 获取对应物料种类下已有需求的的物料总数
	 * 
	 * @param materialCatalogId
	 *            物料种类id
	 * @return 对应物料种类下的物料总数
	 */
	public long countProcurementMaterialsByMaterialCatalog(String id) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(m.materialid) from t_material m where m.parentid in (");
		sql.append(" select mc.materialcatalogid from t_materialcatalog mc ");
		sql.append(" start with mc.materialcatalogid=?1 ");
		sql.append(" connect by prior mc.materialcatalogid = mc.parentid) ");
		sql.append(" and exists (select 1 from t_procurementdetail pd where m.materialid = pd.materialid) ");
		
		return ((BigDecimal) this.createSqlQuery(sql.toString())
				.setParameter(1, id).getSingleResult()).longValue();
	}
	/**
	 * 根据sql语句查询得结果集转换为拥有相应目标实体类范型的集合
	 * 
	 * @param  String nnq  目标 sql语句 
	 * @param  Class resultClass  所要转换为的目标实体类 
	 * @param  Object[] params    sql 命名参数
	 * @param  int begin   分页参数
	 * @param  int max   分页参数 
	 * @return  List<Class resultClass>
	 */
	@SuppressWarnings("unchecked")
	private <T> List<T> executeNativeQuery(final String nnq, Class<T> resultClass,
			final Object[] params, final int begin, final int max) {

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
	
	
	
	
	/***
	 * 根据后台数据结构,直接返回字符串拼装成前台查询条件的List<GridData> (无需参数)
	 * @param form
	 * @return
	 */
	public List<Object[]> getSelectStringClassList(){
		String sql = "select * from t_Materialcatalog a \n"+
					 "where a.parentid = '0' "+
					 "order by a.materialtypename ";
		SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
		List<Object[]> list = query.list();
		return list;
	}
	
	
	
	/***
	 * 根据后台数据结构,直接返回字符串拼装成前台查询条件的List<GridData>
	 * @param form
	 * @return
	 */
	public List<Object[]> getSelectStringKindList(String materialKind){
		String sql = "select * from t_materialcatalog a \n"+
				     "where a.parentid = ( \n" +
				     "select b.materialcatalogid \n" +
				     "from t_materialcatalog b \n" +
				     "where b.materialtypename = ? \n" +
				     "and b.parentid = '0' \n"+
				     "and rownum = 1 ) \n"+
		             "order by a.materialtypename";
		SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
		query.setParameter(0, materialKind);
		List<Object[]> list = query.list();
		return list;
	}
	
	
	
	/***
	 * 根据后台数据结构,直接返回字符串拼装成前台查询条件的List<GridData>
	 * @param form
	 * @return
	 */
	public List<Object[]> getSelectStringDemensionList(){
		 String sql = "select * from V_320_DEMENSION ";
		 SQLQuery query = this.getHibernateSession().createSQLQuery(sql);
		 List<Object[]> list = query.list();
		 return list;
	}
	
	
	
	
	/***
	 * 传入vo,获取库存系统的物质编码
	 * @param form
	 * @return
	 */
	public String getSelectStringDemensionList(MaterialVo materialVo){
		String _return = "";
		//TbEquipmenttype returnVo = new TbEquipmenttype();//要返回给
		int flag = 0;
		String _outPara = "";
		Connection conn = null;
		Connection conn3 = null;
		ResultSet rs = null;
		try {
			conn = SingleConnection.getInstance().getConnection();
			// Connection conn2 =
			// SessionFactoryUtils.getDataSource(wlzlDao.getHibernateSession().getSessionFactory()).getConnection();
			conn3 = this.getHibernateSession().connection();
			CallableStatement proc = conn.prepareCall("{ Call pkg_320_io.p_new_item_apply(?,?,?,?,?,?,?,?,?,?,?,?) }"); // 前5个是入参,后3个是出参
			String p1 = materialVo.getMaterialItemName(); //物料名称(必填)
			String p2 = materialVo.getDesingnation(); //牌号
			String p3 = materialVo.getMaterialStandard(); //规格 
			String p4 = materialVo.getTechnicCondition();//技术条件
			String p5 = materialVo.getDeliveryStatus();//交货状态
			String p6 = materialVo.getDemension(); //量纲(计量单位)(必填)
			String p7 = materialVo.getMaterialClass();//物料大类(必填)
			String p8 = materialVo.getMaterialKind();//物料小类(必填)
			String p9 = materialVo.getApprover();//审批人(必填)
			proc.setString(1, p1);
			proc.setString(2, p2);
			proc.setString(3, p3);
			proc.setString(4, p4);
			proc.setString(5, p5);
			proc.setString(6, p6);
			proc.setString(7, p7);
			proc.setString(8, p8);
			proc.setString(9, p9);
			proc.registerOutParameter(10, oracle.jdbc.OracleTypes.CURSOR);// 输出为集合
			proc.registerOutParameter(11, oracle.jdbc.OracleTypes.NUMBER);// 返回参数1
			proc.registerOutParameter(12, java.sql.Types.VARCHAR); // 返回参数2 数据库类型varchar2
			proc.execute();
			rs = (ResultSet) proc.getObject(10);
			
			//flag为0表示有一条数据或多条数据;为1 表示没数据
			flag = ((BigDecimal) proc.getObject(11)).intValue();// 得到返回的flag,后台判断与Java判断一致
			_outPara = (String)proc.getObject(12).toString();
			/*if (flag == 0) {//0--成功 ,1--失败
				_return = _outPara;
			} else if (flag == 1) {//0--成功 ,1--失败
				_return = flag + "," +_outPara;
			}*/
			_return = flag + "," +_outPara;

		} catch (Exception e) {
			e.printStackTrace();
		} finally { //添加finally关闭打开的链接节省资源
			if (rs != null)
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			if (conn != null)
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
		}
		
		return _return;
	}
	
	
	
	@SuppressWarnings("unchecked")
	public List<MaterialVo> getMaterialsByCondition(MaterialVo materialVo) {
		// TODO Auto-generated method stub
		String param="";
		if(materialVo.getMaterialItemName()!=null){
				param+=" and m.MATERIALITEMNAME like '"+materialVo.getMaterialItemName()+"%' ";
		}
		
		String sql="select count(*) from T_MATERIAL m where 1=1 "+param;
		BigDecimal count=(BigDecimal)this.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		materialVo.setCount(count.intValue());
		
		sql="select {m.*} from T_MATERIAL m where 1=1 "+param;
		List<Material> materialList=this.getHibernateSession().createSQLQuery(sql)
		                                .addEntity("m", Material.class)
		                                .setFirstResult(materialVo.getStart())
		                                .setMaxResults(materialVo.getLimit())
		                                .list();
		List<MaterialVo> vos=new ArrayList<MaterialVo>();
		for(Material m:materialList){
			MaterialVo vo=new MaterialVo();
			vo.setMaterialid(m.getMaterialid());
			vo.setMaterialitemcode(m.getMaterialitemcode());
			vo.setMaterialItemName(m.getMaterialItemName());
			vo.setMaterialStandard(m.getMaterialStandard());
			vo.setTechnicCondition(m.getTechnicCondition());
			vo.setDemension(m.getDemension());
			vos.add(vo);
		}
		
		
		return vos;
	}

	public Material findByCode(String code) {
		try {
			return (Material) this.createQuery("select obj from Material obj where obj.materialitemcode='"+code+"'").setMaxResults(1).getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}

	public List<Material> findAllMaterialsByCurrentUser(MaterialVo vo,
			String uid) throws Exception {
		String sql = "SELECT m.* FROM t_material m,t_item_profile t2 " +
				"WHERE m.materialitemcode = t2.item_code " +
				"and t2.login_name = '"+uid+"'";
		
		if (!StringUtils.isEmpty(vo.getMaterialItemName())) {
			sql = sql + " and m.materialItemName like '%" + vo.getMaterialItemName() + "%' \n";
		}
		if (!StringUtils.isEmpty(vo.getMaterialStandard())){
			sql = sql + " and m.materialStandard like '%" + vo.getMaterialStandard() + "%' \n";
		}
		if (!StringUtils.isEmpty(vo.getDemension())){
			sql = sql + " and m.demension like '%" + vo.getDemension() + "%' \n";
		}
		if (!StringUtils.isEmpty(vo.getTechnicCondition())){
			sql = sql + " and m.technicCondition like '%" + vo.getTechnicCondition() + "%' \n";
		}
		if (!StringUtils.isEmpty(vo.getMaterialitemcode())){
			sql = sql + " and m.materialitemcode like '%" + vo.getMaterialitemcode() + "%' \n";
		}
		if (!StringUtils.isEmpty(vo.getDesingnation())){
			sql = sql + " and m.desingnation like '%" + vo.getDesingnation() + "%' \n";
		} 
		 
		//如果提供小类,则仅直接查询小类;如果提供大类,则查询大类下的所有小类
		if(!StringUtils.isEmpty(vo.getMaterialcatalogName())){
			//查询小类
			sql = sql +" AND m.parentid='"+vo.getMaterialcatalogName()+"'";
		}else if(!StringUtils.isEmpty(vo.getParentidName())){
			//查询大类
			sql = sql + " AND m.parentid IN (SELECT d.materialcatalogid "+
			       "FROM t_materialcatalog d where d.parentid='"+vo.getParentidName()+"') ";
		}
		
		SQLQuery  query = this.getHibernateSession().createSQLQuery(sql);
		vo.setCount(query.list().size());
		
		query.setFirstResult(vo.getStart());
		query.setMaxResults(vo.getLimit());
		query.addEntity(Material.class);
		
		return query.list();
	}

	public String synchronousMaterial(MaterialVo vo) {
	    SingleConnection  sc = SingleConnection.getInstance();
	    Connection conn = null;
		conn = SingleConnection.getInstance().getConnection();
		CallableStatement proc;
		String msg="执行成功!";
		try {
			proc = conn.prepareCall("{call pkg_320_io.p_job_list(?,?,?}");
			proc.registerOutParameter(1, oracle.jdbc.OracleTypes.CURSOR);
			proc.registerOutParameter(2, oracle.jdbc.OracleTypes.NUMBER);
			proc.registerOutParameter(3, oracle.jdbc.OracleTypes.VARCHAR);
			proc.execute();
			msg =(String)proc.getObject(2); //0成功;1失败
		}catch(Exception e){
			e.printStackTrace();
			msg=e.getLocalizedMessage();
		} finally{
			if(conn!=null){
			  try{
				  sc.colseConnection(conn);
			  }catch(Exception e){
				  e.printStackTrace();
				  msg=e.getLocalizedMessage();
			  }
			}
		} 
		
		return msg;
	}
	
}