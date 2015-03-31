package com.sysware.customize.hd.investment.baseData.product;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

import com.sysware.customize.hd.investment.baseData.materialQuota.MaterialQuotaCondition;
import com.sysware.customize.hd.investment.baseData.materialQuota.MaterialQuotaService;

/**
 * @author mengl
 * @version 1.0
 * @created 16-5-2011 14:05:12
 */
@Name("ProductServiceImpl")
public class ProductServiceImpl implements ProductService {

	@In(create = true, value = "ProductDaoImpl")
	private ProductDao productDao;

	@In(create = true, value = "materialQuota_MaterialQuotaServiceImpl")
	private MaterialQuotaService materialQuotaService;

	// 增加修改
	@Transactional
	public void save(Product product) {
		if (StringUtils.isEmpty(product.getProductid())) {
			productDao.save(product);
		} else {
			productDao.update(product);
		}

	}

	// 删除
	@Transactional
	public List<String> deleteProduct(String id) {

		List<Product> products = this.getAllRegProducts(id);
		List<String> usedProductCode = new ArrayList<String>();
		// 倒序删除
		for (int i = products.size() - 1; i >= 0; i--) {
			Product product = products.get(i);
			MaterialQuotaCondition materialQuotaVoCondition = new MaterialQuotaCondition();
			materialQuotaVoCondition.setProductCode(product.getProductcode());
			long mqCount = materialQuotaService
					.getCountByMaterialQuotaCondition(materialQuotaVoCondition);
			if (mqCount == 0) {
				productDao.deleteProduct(product);
			} else {
				usedProductCode.add(product.getProductcode());
			}

		}
		return usedProductCode;
	}

	// 根据删除id得到所有需要删除的Product
	@Transactional
	public List<Product> getAllRegProducts(String startId) {
		List<Product> products = new ArrayList<Product>();
		Product rootP = productDao.get(startId);
		products.add(rootP);
		List<Product> childproducts = this.getProductListById(startId);
		products.addAll(this.getRegProducts(childproducts));
		return products;
	}

	// 根据产品集合递归获得所有需要删除的子Product
	@Transactional
	public List<Product> getRegProducts(List<Product> childCatalogs) {
		List<Product> childProducts = new ArrayList<Product>();
		if (childCatalogs != null && childCatalogs.size() > 0) {
			for (Product product : childCatalogs) {
				List<Product> child = this.getProductListById(product.getProductid());
				if (child != null && child.size() > 0) {
					childProducts.addAll(this.getRegProducts(child));
				}
			}
		}
		return childProducts;
	}

	// 根据parentid获得对应的Product
	@Transactional
	public List<Product> getProductListById(String id) {
		return productDao.getProductListByParentId(id);
	}

	// 根据parentid得到树的节点
	@Transactional
	public List<Object[]> getTreeRootNode(String parentid) {
		List<Object[]> objects = new ArrayList<Object[]>();
		String sql="SELECT DISTINCT v.JX as productid,v.jx as productcode,'','0','1','' from V_EUDM_CPMIS_PRODMTL_RATION v";
		return productDao.getHibernateSession().createSQLQuery(sql).list();
		/*List<Product> products = productDao.getProductListByParentId(parentid);
		for (Product product : products) {
			Object[] productObj = new Object[6];
			productObj[0] = product.getProductid();
			productObj[1] = product.getProductcode();
			productObj[2] = "";

			String params[] = new String[1];
			params[0] = product.getProductid();

//			if (productDao.getProductListByParentId(product.getProductid()).size() > 0) {
//          //非叶子结点
//				productObj[3] = 1;
//				productObj[4] = 0;
//			} else {
			//叶子结点
				productObj[3] = 0;
				productObj[4] = 1;
//			}

			productObj[5] = "";
			objects.add(productObj);
		}
		return objects;*/
	}

	// 根据条件获得所有产品
	public List<Object[]> findProductsByExample(ProductVo vo) {
		String sql="select count(distinct v.jx) from V_EUDM_CPMIS_PRODMTL_RATION v";
		BigDecimal count=(BigDecimal)productDao.getHibernateSession().createSQLQuery(sql).setMaxResults(1).uniqueResult();
		vo.setCount(count.intValue());
		
		sql="select distinct v.jx as productcode,v.jx from V_EUDM_CPMIS_PRODMTL_RATION v";
		return productDao.getHibernateSession().createSQLQuery(sql)
		                                       .setFirstResult(vo.getStart())
		                                       .setMaxResults(vo.getLimit())
		                                       .list();
		//return productDao.findByExample(example, start, limit);
	}

	public long countProductsByExample(Product example) {
		return 0;
	}

	/**
	 * 通过产品名称获取产品信息
	 */
	public Product getProductByName(String productName) {
		return productDao.getProductByName(productName);
	}

	/**
	 * 通过产品编号获取产品信息
	 */
	public Product getProductByCode(String productCode) {
		return productDao.getProductByCode(productCode);
	}

	/**
	 * 判断产品是否存在
	 */
	public boolean checkProduct(ProductVo productVo) {
		String sql = "select count(PRODUCTID) from  t_product where  PRODUCTCODE = '"
				+ productVo.getProductcode() + "'";
		Object number = productDao.createSqlQuery(sql).getSingleResult();
		if (number == null || String.valueOf(number).equals("0"))
			return false;
		else
			return true;
	}

	/**
	 * 判断产品是否被使用
	 */
	@SuppressWarnings("rawtypes")
	public boolean checkUser(String productCode) {
		String sql = "select MATERIALQUOTAID from  t_materialquota where PRODUCTCODE = '"
				+ productCode
				+ "' union select INVENTORYID from  t_inventory where PRODUCTCODE = '"
				+ productCode + "'";
		List list = productDao.createSqlQuery(sql).getResultList();
		if (list == null || list.size() == 0)
			return false;
		else
			return true;
	}

}
