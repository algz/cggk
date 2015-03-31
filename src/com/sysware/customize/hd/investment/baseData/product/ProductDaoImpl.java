package com.sysware.customize.hd.investment.baseData.product;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;

/**
 * @author mengl
 * @version 1.0
 * @created 16-5-2011 14:05:12
 */
@Name("ProductDaoImpl")
public class ProductDaoImpl extends GenericDAOImpl<Product> implements ProductDao {
	/**
	 * 通过父ID获取子集信息
	 */
	@SuppressWarnings("unchecked")
	public List<Product> getProductListByParentId(String parentId) {
//		String hql = " select p from Product p where p.parentid='" + parentId
//				+ "' order by substring(p.productid,1,20) desc";
//		Query query = this.createQuery(hql);
//		return query.getResultList();
		String sql="SELECT DISTINCT v.JX from V_EUDM_CPMIS_PRODMTL_RATION v";
		List list=this.getHibernateSession().createSQLQuery(sql).list();
		List<Product> productList=new ArrayList<Product>();
		for(int i=0;i<list.size();i++){
			Product product=new Product();
			product.setProductname(list.get(i).toString());
			product.setProductid(list.get(i).toString());
			product.setProductcode(list.get(i).toString());
			product.setLeaf("true");
			productList.add(product);
		}
		return productList;
		
	}

	/**
	 * 删除产品信息 product 产品信息
	 */
	public void deleteProduct(Product product) {
		this.remove(product.getProductid());
	}

	/**
	 * 按照条件获取产品列表 product 产品信息 start 开始条数 limit每页显示多少条
	 */
	public List<Product> findByExample(Product example, Integer start, Integer limit) {
		String startId = example.getStartId();
		if (startId == null || "root".equals(startId)) {
			startId = "0";
		}
		String productname = example.getProductname();
		String productcode = example.getProductcode();
		String batchno = example.getBatchno();

		StringBuffer strBuffer = new StringBuffer(" parentId=?1 ");
		// 判断产品名称是否存在
		if (StringUtils.isNotBlank(productname)) {
			strBuffer.append(" and productname like '%" + productname.trim() + "%' ");
		}
		// 判断产品型号是否存在
		if (StringUtils.isNotBlank(productcode)) {
			strBuffer.append(" and productcode like '%" + productcode.trim() + "%' ");
		}
		if (StringUtils.isNotBlank(batchno)) {
			strBuffer.append(" and batchno like '%" + batchno.trim() + "%' ");
		}
		strBuffer.append(" order by substring(productid,1,20) desc");
		return this.find(strBuffer.toString(), new String[] { startId }, start, limit);
	}

	/**
	 * 按照条件获取产品数量 product 产品信息
	 */
	public long countByExample(Product example) {
		String startId = example.getStartId();
		if (startId == null || "root".equals(startId)) {
			startId = "0";
		}
		String productname = example.getProductname();
		String productcode = example.getProductcode();
		String batchno = example.getBatchno();

		StringBuffer strBuffer = new StringBuffer(
				" select count(*) from t_product where parentId=?1 ");

		if (StringUtils.isNotBlank(productname)) {
			strBuffer.append(" and productname like '%" + productname.trim() + "%' ");
		}
		if (StringUtils.isNotBlank(productcode)) {
			strBuffer.append(" and productcode like '%" + productcode.trim() + "%' ");
		}
		if (StringUtils.isNotBlank(batchno)) {
			strBuffer.append(" and batchno like '%" + batchno.trim() + "%' ");
		}
		Query query = this.createSqlQuery(strBuffer.toString());
		query.setParameter("1", startId);
		return (Long) query.getSingleResult();
	}

	/**
	 * 通过产品名称获取产品信息
	 */
	public Product getProductByName(String productName) {
		return this.getBy("productname", productName);
	}

	/**
	 * 通过产品编号获取产品信息
	 */
	public Product getProductByCode(String productCode) {
		String sql="select distinct t.jx from v_eudm_cpmis_prodmtl_ration t where upper(t.jx)=upper('"+productCode+"')";
		String str=(String)this.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		if(str==null){
			return null;
		}
		Product product=new Product();
		product.setProductcode(str);
		product.setProductname(str);
		return product;//this.getBy("productcode", productCode);
	}

}
