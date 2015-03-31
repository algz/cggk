package com.sysware.customize.hd.investment.baseData.product;

import java.util.List;

/**
 * 产品Service
 * 
 * @author mengl
 * @version 1.0
 * @created 16-5-2011 14:05:12
 */
public interface ProductService {

	/**
	 * 保存产品
	 * 
	 * @param product
	 *            待保存的产品
	 */
	void save(Product product);

	/**
	 * 根据父id获得树的子节点
	 * 
	 * @param parentid
	 *            父类id
	 */
	public List<Object[]> getTreeRootNode(String parentid);

	/**
	 * 根据id产品对象
	 * 
	 * @param id
	 * @return 已跟材料定额相关联的产品Code集合
	 */
	public List<String> deleteProduct(String id);

	/**
	 * 检查名称是否为重复的
	 */
	public boolean checkProduct(ProductVo productVo);

	/**
	 * 检查是否被使用
	 */
	public boolean checkUser(String productCode);

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
	public List<Object[]> findProductsByExample(ProductVo vo);

	/**
	 * 根据条件获得产品总数
	 * 
	 * @param example
	 *            查询条件对象
	 * @return 符合条件的产品总数
	 */
	public long countProductsByExample(Product example);

	/**
	 * 根据产品名获得产品
	 * 
	 * @param productName
	 * 
	 */
	Product getProductByName(String productName);

	/**
	 * 根据产品型号获得产品
	 * 
	 * @param productCode
	 * 
	 */
	Product getProductByCode(String productCode);

}
