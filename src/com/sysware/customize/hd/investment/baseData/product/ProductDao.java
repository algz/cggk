package com.sysware.customize.hd.investment.baseData.product;

import java.util.List;

import com.luck.common.GenericDAO;

/**
 * @author mengl
 * @version 1.0
 * @created 16-5-2011 14:05:12
 */
public interface ProductDao extends GenericDAO<Product> {

	/**
	 * 获得子产品集合
	 * 
	 * @param parentId
	 *            父id
	 */
	public List<Product> getProductListByParentId(String parentId);

	/**
	 * 删除产品
	 * 
	 * @param product
	 *            待删除的产品
	 */
	void deleteProduct(Product product);

	/**
	 * 根据条件获得产品集合
	 * 
	 * @param example
	 *            查询条件对象
	 * @param start
	 *            起始行
	 * @param limit
	 *            每页行数
	 * @return 符合条件的产品集合
	 */
	List<Product> findByExample(Product example, Integer start, Integer limit);

	/**
	 * 根据条件获得产品总数
	 * 
	 * @param example
	 *            查询条件对象
	 * @return 符合条件的产品总数
	 */
	public long countByExample(Product example);

	/**
	 * 根据产品名获得产品
	 * 
	 * @param productName
	 * 
	 */
	Product getProductByName(String productName);

	/**
	 * 根据产品名获得产品
	 * 
	 * @param productName
	 * 
	 */
	Product getProductByCode(String productCode);
}