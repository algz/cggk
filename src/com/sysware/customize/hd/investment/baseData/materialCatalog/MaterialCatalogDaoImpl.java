/**
 * @author chendongjie
 * @version 1.0
 * @created 2011-05-16 14:05:35
 */
package com.sysware.customize.hd.investment.baseData.materialCatalog;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.persistence.Query;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.hibernate.criterion.Restrictions;
import org.hibernate.Criteria;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.luck.itumserv.entity.Grole;

@Name("materialCatalogDaoImpl")
public class MaterialCatalogDaoImpl extends GenericDAOImpl<MaterialCatalog>
		implements MaterialCatalogDao {
	/**
	 * 根据父id取物料种类集合
	 */
	@SuppressWarnings("unchecked")
	public List<MaterialCatalog> getMaterialCatalogListByParentId(
			String parentId) {
		String sql = " select mc from MaterialCatalog mc where 1=1 and mc.parentid='"
				+ parentId + "'";
		Query query = this.createQuery(sql);
		return query.getResultList();
	}

	/**
	 * 删除单个物料种类
	 */
	public void deleteMaterialCatalog(MaterialCatalog materialCatalog) {
		this.remove(materialCatalog.getMaterialcatalogid());
	}

	/**
	 * 查询所有物料种类，并分页
	 */
	public List<MaterialCatalog> getAllMaterialCatalogs(MaterialCatalogVo mcv,
			Integer begin, Integer max) {
		String startId = mcv.getStartId();
		if (startId == null || "root".equals(startId)) {
			startId = "0";
		}
		String catlogName = mcv.getMaterialtypename();
		StringBuffer strBuffer = new StringBuffer(" parentId=? ");

		String[] params = new String[1];
		params[0] = startId;
		if (catlogName != null && !"".equals(catlogName.trim())) {// 查询物料种类名称条件
			strBuffer.append(" and materialtypename like '" + catlogName.trim()
					+ "%' ");
		}
		if(mcv.getParentid()!=null&&!mcv.getParentid().equals("")){
			strBuffer.append(" and parentid='"+mcv.getParentid()+"' ");
		}
		strBuffer.append(" order by materialcatalogid desc ");
		return this.find(strBuffer.toString(), params, begin, max);
	}

	/**
	 * 得到物料种类总数,有限制条件
	 * 
	 * @param MaterialCatalogVo
	 *            物料种类Vo类
	 * 
	 * @return Integer
	 */
	public Integer getCount(MaterialCatalogVo mcv) {
		String startId = mcv.getStartId();
		if (startId == null || "root".equals(startId)) {// 如果当前节点为根节点
			startId = "0";
		}
		String catlogName = mcv.getMaterialtypename();
		StringBuffer strBuffer = new StringBuffer(" parentId=? ");

		String[] params = new String[1];
		params[0] = startId;
		if (catlogName != null && !"".equals(catlogName.trim())) {// 查询物料种类名称条件
			strBuffer.append(" and materialtypename like '" + catlogName.trim()
					+ "%' ");
		}

		return this.find(strBuffer.toString(), params).size();
	}

	/**
	 * 根据id得到父id
	 * 
	 * @param id
	 *            String
	 * 
	 * @return String
	 */
	public String getParentIdById(String id) {
		String parentId = (String) this.createQuery(
				"select mc.parentid from MaterialCatalog mc where mc.materialcatalogid='"
						+ id + "'").getSingleResult();
		return parentId;
	}

	/**
	 * 根据选定的id获得所有子节点的id
	 * 
	 * @param id
	 * 
	 * @return List id的list集合
	 */
	@SuppressWarnings("unchecked")
	public List<String> getAllMaterialCatalogIdsByParentId(String id) {

		StringBuilder sql = new StringBuilder();
		sql.append("select mc.materialcatalogid from t_materialcatalog mc ");
		sql.append(" start with mc.materialcatalogid=?1 ");
		sql.append(" connect by prior mc.materialcatalogid = mc.parentid");

		Query query = this.createSqlQuery(sql.toString());
		query.setParameter(1, id);
		return query.getResultList();
	}

	/**
	 * 获取角色列表
	 */
	@SuppressWarnings("unchecked")
	public List<Grole> getAllRole(int start, int limit,
			HashMap<String, Integer> countMap) {
		StringBuilder sql = new StringBuilder();
		sql.append("select count(roleID) from t_roles where roleID not in('1','2','3')");
		Query query1 = this.createSqlQuery(sql.toString());
		Object size = query1.getSingleResult();
		if (size == null || size.equals("") || size.equals("０"))
			countMap.put("size", 0);
		else
			countMap.put("size", Integer.parseInt(String.valueOf(size)));
		sql = null;
		sql = new StringBuilder();
		sql.append("select t.roleID,t.rolename from T_ROLES  t where t.roleID not in('1','2','3') ");
		Query query = this.createSqlQuery(sql.toString());
		return query.getResultList();
	}

	/**
	 * 获取物资种类对应的角色
	 */
	@SuppressWarnings("unchecked")
	public List<String> getMaterialCatalogRoleByMaterialCatalogId(
			String MaterialCatalogId) {
		String sql = "select roleID from T_MaterialCatalog_user where materialCatalogID = '"
				+ MaterialCatalogId + "'";
		return createSqlQuery(sql).getResultList();
	}

	/**
	 * 用户获取物资种类
	 */
	public String getMaterialCatalogRoleByUserId(Long userID) {
		return "select materialCatalogID from T_MaterialCatalog_User where userID = '"
				+ userID + "' ";
	}

	/**
	 * 获取所选用户对应的物资种类ID
	 */
	@SuppressWarnings("unchecked")
	public List<String> getMaterialCatalogIdsByUserId(Long userID) {
		String sql = "select materialCatalogID from T_MaterialCatalog_User where userID=?1";
		return this.executeNativeQuery(sql, new Object[] { userID }, 0, 0);
	}

	/**
	 * 保存角色和物资种类的对应关系
	 */
	public void saveMaterialCatalogUser(String[] materialCatalogID,
			String[] userID) {
		if (materialCatalogID != null) {
			String sql = "delete T_MaterialCatalog_User where materialCatalogID = '"
					+ materialCatalogID[0] + "'";
			createSqlQuery(sql).executeUpdate();
			MaterialCatalogUser mr = null;
			for (int i = 0; i < userID.length; i++) {
				mr = new MaterialCatalogUser();
				mr.setMaterialCatalogID(materialCatalogID[0]);
				mr.setUserId(userID[i]);
				this.save(mr);
			}
		}
	}

	/**
	 * 保存指定用户-物资种类的对应关系
	 */
	public void saveMaterialCatalogUser(String[] materialCatalogIDs,
			String userID) {
		for (String materialCatalogID : materialCatalogIDs) {
			MaterialCatalogUser mr = new MaterialCatalogUser();
			mr.setMaterialCatalogID(materialCatalogID);
			mr.setUserId(userID);
			this.save(mr);
		}
	}

	/**
	 * 删除用户和物资种类的对应关系
	 */
	public void delMaterialCatalogUser(String[] materialCatalogIDs,
			String userID) {
		StringBuilder sql = new StringBuilder(
				"delete T_MaterialCatalog_User where materialCatalogID in (");
		for (int i = 0; i < materialCatalogIDs.length; i++) {
			sql.append("?" + (i + 1) + ",");
			if (i == materialCatalogIDs.length - 1) {
				sql.append("?" + (i + 1));
			}
		}
		sql.append(") ");
		if (StringUtils.isNotBlank(userID)) {
			sql.append(" and userId = '").append(userID).append("'");
		}
		Query query = this.createSqlQuery(sql.toString());
		for (int i = 0; i < materialCatalogIDs.length; i++) {
			query.setParameter(i + 1, materialCatalogIDs[i]);
		}
		query.executeUpdate();
	}

	/**
	 * 根据选定的id获得所有根节点的MaterialCatalog对象
	 * 
	 * @param id
	 * 
	 * @return MaterialCatalog
	 */
	public MaterialCatalog getRootMaterialCatalogId(String id) {
		StringBuilder sql = new StringBuilder();
		sql.append("select mc.materialtypename from t_materialcatalog mc ");
		sql.append(" where mc.parentid ='0' start with mc.materialcatalogid=?1 ");
		sql.append(" connect by prior mc.parentid = mc.materialcatalogid");

		Query query = this.createSqlQuery(sql.toString());
		query.setParameter(1, id);

		MaterialCatalog obj = new MaterialCatalog();
		obj.setMaterialtypename((String) query.getResultList().get(0));

		return obj;
	}

	/**
	 * 根据选定的id，查询同一父id下的所有物料信息进货价总和
	 * 
	 * @param id
	 *            String
	 * 
	 * @return List<MaterialCatalog>
	 */
	@SuppressWarnings("unchecked")
	public List<MaterialCatalog> sumMaterialCatalogById(String id) {
		String tmp = "select t.materialcatalogid from t_materialcatalog t start with t.parentid='"
				+ id + "'connect by prior t.materialcatalogid = t.parentid";
		List<String> tmplist = this.createSqlQuery(tmp).getResultList();// 按照父子节点关系递归查询物料种类id

		StringBuilder sql = new StringBuilder();
		sql.append("select sum(tm.referenceprice),tm.parentid  from t_material tm ");// 查询统一父id下的进货价总和
		if (tmplist.size() > 0) {
			sql.append(" where ");
		}
		while (tmplist.size() > 0) {
			sql.append("tm.parentid in (");
			if (tmplist.size() >= 200) {// 如果id的数目大于200 ，就截取前200个id ，进行一个批次查询
				List<String> c = tmplist.subList(0, 200);
				sql.append(listToString(c));
				tmplist.removeAll(c);
			} else {
				sql.append(listToString(tmplist));
				tmplist = new ArrayList<String>();
			}
			sql.append(")");
			if (tmplist.size() > 0) {// or 其余数目的id 的查询
				sql.append(" or ");
			}
		}

		sql.append("group by tm.parentid");

		Query query = this.createSqlQuery(sql.toString());
		List<MaterialCatalog> result = new ArrayList<MaterialCatalog>();
		List<Object[]> mlist = query.getResultList();
		for (Object[] o : mlist) {
			String parentid = o[1].toString();
			String sumValue = o[0].toString();// 封装进价总和
			MaterialCatalog obj = new MaterialCatalog(parentid, sumValue);
			MaterialCatalog m = (MaterialCatalog) this
					.createQuery(
							"from MaterialCatalog m where 1=1 and m.materialcatalogid='"
									+ parentid + "'").getResultList().get(0);
			obj.setMaterialtypename(m.getMaterialtypename());
			result.add(obj);
		}

		return result;
	}

	/**
	 * 用于 sumMaterialCatalogById 方法转换list
	 * */
	private String listToString(List<String> list) {
		String tmp = "";
		for (String s : list) {
			tmp = tmp + "'" + s + "',";
		}
		if (tmp.charAt(tmp.length() - 1) == ',') {
			tmp = tmp.substring(0, tmp.length() - 1);
		}
		return tmp;
	}

	/**
	 * 根据样本example，查询MaterialCatalog信息
	 */
	public MaterialCatalog findMaterialCatalogByExample(MaterialCatalog example) {
		Criteria criteria = this.getHibernateSession().createCriteria(
				MaterialCatalog.class);
		criteria.add(Restrictions.eq("materialtypename",
				example.getMaterialtypename()));
		String parentid = example.getParentid();
		criteria.add(parentid == null ? Restrictions.isNull("parentid")
				: Restrictions.eq("parentid", parentid));
		return (MaterialCatalog) criteria.uniqueResult();
	}

	/**
	 * 根据采购需求ID，获取采购需求计划中所列物料的物料种类对象集合
	 * 
	 * @param 采购需求ID
	 *            procurementId String
	 * 
	 * @return 物料种类对象集合 List<MaterialCatalog>
	 * */
	@SuppressWarnings("unchecked")
	public List<MaterialCatalog> getMaterialCatalogsByProcurement(
			String procurementId,String userId) {
		StringBuilder queryStr = new StringBuilder(
				" select distinct(g.materialcatalogid),g.materialtypename,g.parentid,g.remark,g.materialcatalogCode ");

		queryStr.append(" from t_procurementdetail t,t_material m,t_materialcatalog g ");

		queryStr.append(" where t.cldm = m.MATERIALITEMCODE and g.materialcatalogid=m.parentid");
		queryStr.append(" and t.purchaseid is null");
		queryStr.append(" and t.procurementid=?1 ");
		
		queryStr.append(" and g.materialcatalogid in " );//获得拥有权限的节点
		
		queryStr.append(" (select materialCatalogID from T_MaterialCatalog_user where  userID = '"+ userId +"')");
//		System.out.println("判断颜色："+queryStr.toString());
		List<MaterialCatalog> materialCatalogs = this.executeNativeQuery(
				queryStr.toString(), MaterialCatalog.class,
				new String[] { procurementId }, -1, -1);

		return materialCatalogs;
	}

	@SuppressWarnings("unchecked")
	public List<MaterialCatalog> getParentMaterialCatalogs(List<String> list) {
			StringBuilder queryStr = new StringBuilder();
				if(list.size()>0){
					queryStr.append(" select distinct(mc.materialcatalogid),mc.materialtypename,mc.parentid,mc.remark,mc.materialcatalogCode from t_materialcatalog mc  ");
					queryStr.append(" start with mc.materialcatalogid in ( ");
					queryStr.append(this.listToString(list));//从子节点逐级向上查询父节点。
					queryStr.append(" ) connect by  mc.materialcatalogid = prior mc.parentid ");
					List<MaterialCatalog> materialCatalogs = this.executeNativeQuery(
							queryStr.toString(), MaterialCatalog.class, null, -1, -1);
					return materialCatalogs;
				}
				return null;
	};

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
	@SuppressWarnings("unchecked")
	private List executeNativeQuery(final String nnq, Class resultClass,
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
		List ret = query.getResultList();

		if (ret != null && ret.size() >= 0) {
			return ret;
		} else {
			return new ArrayList();
		}

	}

	public JSONArray getMaterialCatalogComboBox(MaterialCatalogVo vo) {
		String param="";
		if(vo.getParentid()!=null){
			param+=" and m.PARENTID='"+vo.getParentid()+"' ";
		}
		String sql="select m.MATERIALCATALOGID,m.MATERIALTYPENAME,m.PARENTID,m.MATERIALCATALOGCODE from t_materialcatalog m where 1=1 "+param;
		List<Object[]> list=getHibernateSession().createSQLQuery(sql).list();
		JSONArray ja=new JSONArray();
		for(Object[] objs:list){
			JSONObject jo=new JSONObject();
			jo.put("catalogid", objs[0]);
			jo.put("catalogname", objs[1]);
			jo.put("catalogcode", objs[2]);
			ja.add(jo);
		}
		return ja;
	}
}

