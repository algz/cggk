package com.sysware.customize.hd.investment.baseData.product;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.general.tree.JsonTreeNode;

/**
 * 产品Remote
 * 
 * @author mengl
 * @version 1.0
 * @created 16-5-2011 14:05:12
 */
@Name("product_ProductRemote")
public class ProductRemote {

	@In(create = true, value = "ProductServiceImpl")
	private ProductService productService;

	// 得到产品信息列表
	@WebRemote
	public GridData<ProductVo> getAll(ProductVo productVo) throws Exception {
		GridData<ProductVo> gd = new GridData<ProductVo>();
		// 分页开始，设置默认值
		Integer start = productVo.getStart();
		if (start == null) {
			start = 0;
		}
		// 每页总数，设置默认值
		Integer limit = productVo.getLimit();
		if (limit == null) {
			limit = 20;
		}
		Product example = new Product();
		// 复制vo的属性到实体里面
		BeanUtils.copyProperties(example, productVo);
		// 查询产品信息列表
		List<Object[]> resultTemps = productService.findProductsByExample(productVo);

		List<ProductVo> productVos = new ArrayList<ProductVo>();

		for (Object[] resultTempsP : resultTemps) {
			ProductVo resultsproductVo = new ProductVo();
			resultsproductVo.setProductcode((String)resultTempsP[0]);
//			BeanUtils.copyProperties(resultsproductVo, resultTempsP);
			
			productVos.add(resultsproductVo);
		}
		gd.setResults(productVos);
		gd.setTotalProperty(productVo.getCount());
		return gd;
	}

	// 保存，修改产品信息
	@WebRemote
	public String save(ProductVo productVo) {
		Product product = new Product();
		try {
			BeanUtils.copyProperties(product, productVo);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		if (StringUtils.isEmpty(productVo.getProductid())) {
			product.setProductid(null);
			if (productService.checkProduct(productVo))
				return "{success : true,info:'name'}";
		}

		productService.save(product);
		return "{success : true,info:'none'}";
	}

	// 根据所选IDs删除产品象
	@WebRemote
	public String deleteProduct(String ids[]) {
		List<String> allUsedProductCode = new ArrayList<String>();
		for (String id : ids) {
			List<String> usedProductCode = productService.deleteProduct(id);
			if (usedProductCode.size() > 0) {
				allUsedProductCode.addAll(usedProductCode);
			}
		}
		if(allUsedProductCode.size() > 0){
			JSONObject obj = new JSONObject();
			obj.put("success", false);
			obj.put("allUsedProductCode", allUsedProductCode);
			return obj.toString();
		}else{
			return "{success : true}";
		}
		
	}

	// 获得产品树
	@WebRemote
	public String getTreeRootNode(String parentid) {
		List<Object[]> list = productService.getTreeRootNode(parentid);

		List<JsonTreeNode> nodeList = new ArrayList<JsonTreeNode>();

		JsonTreeNode treeNode = null;

		for (Object[] obj : list) {
			String issheet = String.valueOf(obj[3]);
			String isleaf = String.valueOf(obj[4]);
			String standard = String.valueOf(obj[5]);
			String standard1 = "";
			if (!standard.trim().equals("null")) {
				standard1 = standard;
			}

			String desingnation = String.valueOf(obj[2]);
			String desingnation1 = "";
			if (!desingnation.trim().equals("null")) {
				desingnation1 = desingnation;
			}

			if (issheet.equals("1") && isleaf.equals("0")) {// 非叶子节点,是sheet
				treeNode = new JsonTreeNode();
				treeNode.setId(String.valueOf(obj[0]));
				treeNode.setText(String.valueOf(obj[1]) + "" + standard1 + "" + desingnation1);
				treeNode.setExpandable(true);
				treeNode.setIconCls("folder");
				treeNode.setQtip(String.valueOf(obj[1]) + "" + standard1 + "" + desingnation1);
				nodeList.add(treeNode);

			}
			if (issheet.equals("0") && isleaf.equals("0")) {// 非叶子节点,非sheet
				treeNode = new JsonTreeNode();
				treeNode.setId(String.valueOf(obj[0]));
				treeNode.setText(String.valueOf(obj[1]) + "" + standard1 + "" + desingnation1);
				treeNode.setExpandable(true);
				treeNode.setIconCls("folder");
				treeNode.setQtip(String.valueOf(obj[1]) + "" + standard1 + "" + desingnation1);
				nodeList.add(treeNode);
			}
			if (issheet.equals("0") && isleaf.equals("1")) {// 是叶子节点，非sheet
				treeNode = new JsonTreeNode();
				treeNode.setId(String.valueOf(obj[0]));
				treeNode.setText(String.valueOf(obj[1]) + "" + standard1 + "" + desingnation1);
				treeNode.setExpandable(false);
				treeNode.setLeaf(true);
				treeNode.setIconCls("folder");
				treeNode.setQtip(String.valueOf(obj[1]) + "" + standard1 + "" + desingnation1);
				nodeList.add(treeNode);

			}

		}

		JSONArray jsonarr = JSONArray.fromObject(nodeList);

		return jsonarr.toString();
	}
}
