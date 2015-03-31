package com.sysware.customize.hd.investment.baseData.materialQuota;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
import com.sysware.customize.hd.investment.baseData.material.Material;

@Name("inventory_InventoryDaoImpl")
public class InventoryDaoImpl extends GenericDAOImpl<Inventory> implements
		InventoryDao {
	/**
	 * 根据materialQuotaVoCondition获得材料定额信息总数
	 * 
	 * @param condition
	 *            MaterialQuotaVoCondition
	 * @return
	 */
	public long getCountByCondition(MaterialQuotaCondition condition) {
		StringBuilder queryStr = new StringBuilder(
				" select count(*) from Inventory obj where 1=1 ");

		List<Object> params = new ArrayList<Object>();

		int paramIndex = 1;

		if (StringUtils.isNotEmpty(condition.getProductCode())) {
			queryStr.append(" and obj.productCode = ?" + paramIndex++);
			params.add(condition.getProductCode());
		}
		if (StringUtils.isNotEmpty(condition.getType())) {
			queryStr.append(" and obj.type = ?" + paramIndex++);
			params.add(condition.getType());
		}
		return (Long) (this.query(queryStr.toString(), params.toArray(), 0, 0)
				.get(0));
	}
	/**
	 * 根据materialQuotaVoCondition获得材料定额信息list
	 * 
	 * @param condition
	 *            MaterialQuotaVoCondition
	 * @return LIST
	 */
	public List<Inventory> getInventoryListByCondition(
			MaterialQuotaCondition condition) {
		StringBuffer queryStr = new StringBuffer(" 1=1 ");
		int paramIndex = 1;
		List<String> param = new ArrayList<String>();
		if (StringUtils.isNotEmpty(condition.getProductCode())) {
			queryStr.append(" and productcode = ?" + paramIndex++);
			param.add(condition.getProductCode());
		}
		if (StringUtils.isNotEmpty(condition.getType())) {
			queryStr.append(" and type=?" + paramIndex++);
			param.add(condition.getType());
		}
		if (condition.getTypes() != null) {
			String[] types = condition.getTypes();
			queryStr.append(" and type in (");
			for (int i = 0; i < types.length; i++) {
				queryStr.append(" ?" + paramIndex++);
				if (i < types.length - 1) {
					queryStr.append(",");
				}
				param.add(types[i]);
			}
			queryStr.append(" ) ");
			param.add(condition.getType());
		}
		int start = condition.getStart() == null ? 0 : condition.getStart();
		int limit = condition.getLimit() == null ? 0 : condition.getLimit();
		return this.find(queryStr.toString(), param.toArray(new String[0]),
				start, limit);
	}
	/**
	 * 根据Inventory样例获取Inventory对象
	 * 
	 * @param example
	 *            Inventory样例对象
	 * @return Inventory
	 */
	public Inventory findInventoryByExample(Inventory example) {
		Query query = this.getHibernateSession().createQuery(
				" from Inventory i where i.material.materialid=? "
						+ " and i.productCode=? ");//根据物料id与机型查询清单对象
		Material material = example.getMaterial();
		query.setParameter(0, material.getMaterialid());
		query.setParameter(1, example.getProductCode());
		return (Inventory) query.uniqueResult();
	}
}
