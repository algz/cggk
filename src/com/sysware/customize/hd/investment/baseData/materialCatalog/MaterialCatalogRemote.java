/**
 * @author chendongjie
 * @version 1.0
 * @created 2011-05-16 14:05:35
 */
package com.sysware.customize.hd.investment.baseData.materialCatalog;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.base.user.RoleUserVo;
import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.general.tree.JsonTreeNode;
import com.sysware.customize.hd.investment.general.tree.JsonTreeNodeWithCheckBox;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("materialCatalogRemote")
public class MaterialCatalogRemote {
	@In(create = true, value = "materialCatalogServiceImpl")
	MaterialCatalogService materialCatalogService;

	@In(create = true, value = "material_MaterialServiceImpl")
	public MaterialService m_MaterialService;

	/***
	 * 将MaterialCatalog实体集合转换为MaterialCatalogVo集合
	 * 
	 * @param materialCatalogs List<MaterialCatalog>
	 * 
	 * @return materialCatalogVos  List<MaterialCatalogVo>
	 */
	private List<MaterialCatalogVo> chageDatasToVo(
			List<MaterialCatalog> materialCatalogs) {
		List<MaterialCatalogVo> materialCatalogVos = new ArrayList<MaterialCatalogVo>();
		if (materialCatalogs != null && materialCatalogs.size() > 0) {
			for (MaterialCatalog materialCatalog : materialCatalogs) {
				MaterialCatalogVo materialCatalogVo = new MaterialCatalogVo();
				materialCatalogVo.setId(materialCatalog.getMaterialcatalogid());
				materialCatalogVo.setMaterialcatalogid(materialCatalog
						.getMaterialcatalogid());
				materialCatalogVo.setMaterialtypename(materialCatalog
						.getMaterialtypename());
				materialCatalogVo.setParentid(materialCatalog.getParentid());
				materialCatalogVo.setRemark(materialCatalog.getRemark());
				materialCatalogVo.setMaterialcatalogCode(materialCatalog.getMaterialcatalogCode());
				materialCatalogVos.add(materialCatalogVo);
			}
		}
		return materialCatalogVos;
	}

	/**
	 * 获取角色列表
	 * 
	 * @param vo
	 *            角色vo
	 * @return
	 */
	@WebRemote
	public GridData<RoleUserVo> getRoleList(MaterialCatalogVo vo) {
		GridData<RoleUserVo> gd = new GridData<RoleUserVo>();
		// 分页开始，设置默认值
		Integer start = vo.getStart();
		if (start == null) {
			start = 0;
		}
		// 每页总数，设置默认值
		Integer limit = vo.getLimit();
		if (limit == null) {
			limit = 20;
		}
		HashMap<String, Integer> countMap = new HashMap<String, Integer>();
		List<RoleUserVo> results = materialCatalogService.getAllRole(vo, start,
				limit, countMap);
		gd.setResults(results);
		Integer count = countMap.get("size");
		gd.setTotalProperty(count);
		return gd;
	}

	/**
	 * 通过物料种类管理 设置角色和物资种类的对应关系
	 * 
	 * @return
	 */
	@WebRemote
	public String saveMaterialCatalogRole(String[] materialCatalogID,
			String[] userID) {
		try {
			materialCatalogService.saveMaterialCatalogUser(materialCatalogID,
					userID);
		} catch (Exception e) {
			return "{failure : true}";
		}
		return "{success : true}";
	}

	/**
	 * 通过角色管理 设置角色和物资种类的对应关系
	 * 
	 * @return
	 */
	@WebRemote
	public String setMaterialCatalogUser(String strCatalogIds,
			String uncheckedCatalogIds, String userID) {
		try {
			String[] uncheckedCatalogIDs = {};
			String[] catalogIDs = {};
			String temp = uncheckedCatalogIds;
			if (temp.length() > 1) {
				temp = temp.substring(temp.indexOf(",") + 1,
						temp.lastIndexOf(","));
				uncheckedCatalogIDs = temp.split(",");
			}
			temp = strCatalogIds;
			if (temp.length() > 1) {
				temp = temp.substring(temp.indexOf(",") + 1,
						temp.lastIndexOf(","));
				catalogIDs = temp.split(",");
			}
			materialCatalogService.saveMaterialCatalogUser(catalogIDs,
					uncheckedCatalogIDs, userID);
		} catch (Exception e) {
			return "{failure : true}";
		}
		return "{success : true}";
	}

	/***
	 * 获取当前 树节点 （包含 为根节点时 情况）以及 子节点 信息 
	 * 
	 * @param String parentId  当前父节点 
	 * 
	 * @param String showMaterial 是否显示 物料种类节点下的 物料信息 情况
	 * 
	 * @param boolean withCheckBox 树节点是否带有  checkBox
	 * 
	 * @param Long userID 当前操作人角色 权限 
	 * 
	 * @return String 包含树节点信息的JSONArray字符串 
	 */
	@WebRemote
	public String getTreeRootNode(String parentId, String showMaterial,boolean withCheckBox, Long userID,List<String> nodeIdList) {
		List<Object[]> list = materialCatalogService.getTreeRootNode(parentId,userID);//获得树的节点list
		List<JsonTreeNode> nodeList = new ArrayList<JsonTreeNode>();//树节点集合
		JsonTreeNode treeNode = null;//单个树节点TreeNode对象 
		// 如果只是物料种类树，且不显示物料信息，通过判断withCheckBox来决定是否展示checkBox
		if ((showMaterial == null)|| (showMaterial != null && "0".equals(showMaterial.trim()))) {
			for (Object[] obj : list) {
				treeNode=this.getTreeNodeObj(obj, withCheckBox);
				
				String treeNodeId=treeNode.getId();
				//若树节点下的路径中有物料，则text变红
				if(nodeIdList.size()>0&&nodeIdList.contains(treeNodeId)){
					treeNode.setText("<font color='red'>"+treeNode.getText()+"</font>");
				}
				nodeList.add(treeNode);
			}
		}else {// 如果需要列出物料
			for (Object[] obj : list) {
				treeNode = this.getTreeNodeObjTwo(obj, withCheckBox);
				nodeList.add(treeNode);
			}
			// id为0的是伪根节点，下面没有物料，当parentId不为0时，展示叶节点下的物料信息
			if (!"0".equals(parentId)) {
				// 查询种类下所有物料
				List<Material> materials = m_MaterialService
						.findMaterialsByMaterialCatalogId(parentId);
				for (Material material : materials) {//将每个物料对象封装成treeNode。
					treeNode=this.getTreeNodeThree(withCheckBox, material);
					nodeList.add(treeNode);
				}
			}
		}
		JSONArray jsonarr = JSONArray.fromObject(nodeList);
		return jsonarr.toString();
	}
	/**
	 * getTreeRootNode的辅助方法
	 * */
	private JsonTreeNode getTreeNodeObj(Object[] obj,boolean withCheckBox){
		JsonTreeNode treeNode=null;
		String isSheet = String.valueOf(obj[3]);//判断是否为Sheet
		String isLeaf = String.valueOf(obj[4]);//判断是否为Leaf 
		String standard = String.valueOf(obj[5]).trim().equals("null")? "":String.valueOf(obj[5]).trim();//树节点显示文本
		String desingnation = String.valueOf(obj[2]).trim().equals("null")? "":String.valueOf(obj[2]).trim();//树节点物料类型（或物料种类类型）
		if (isSheet.equals("1") && isLeaf.equals("0")) {// 非叶子节点,是sheet
			treeNode=this.getTreeNodeOne(obj, withCheckBox, standard, desingnation);
		}
		if (isSheet.equals("0") && isLeaf.equals("0")) {// 非叶子节点,非sheet
			treeNode=this.getTreeNodeOne(obj, withCheckBox, standard, desingnation);
		}
		if (isSheet.equals("0") && isLeaf.equals("1")) {
			treeNode=this.getTreeNodeOne(obj, withCheckBox, standard, desingnation);
			treeNode.setExpandable(false);
			treeNode.setLeaf(true);
		}
		return treeNode;
	}
	/**
	 * getTreeRootNode的辅助方法
	 * */
	private JsonTreeNode getTreeNodeObjTwo(Object[] obj,boolean withCheckBox){
		String isSheet = String.valueOf(obj[3]);//判断是否为Sheet
		String isLeaf = String.valueOf(obj[4]);//判断是否为Leaf 
		JsonTreeNode treeNode=null;
		String standard = String.valueOf(obj[5]).trim().equals("null")? "":String.valueOf(obj[5]).trim();
		String desingnation = String.valueOf(obj[2]).trim().equals("null")? "":String.valueOf(obj[2]).trim();
		if (isSheet.equals("1") && isLeaf.equals("0")) {// 非叶子节点,是sheet
			treeNode=this.getTreeNodeOne(obj, withCheckBox, standard, desingnation);
		}
		if (isSheet.equals("0") && isLeaf.equals("0")) {// 非叶子节点,非sheet
			treeNode=this.getTreeNodeOne(obj, withCheckBox, standard, desingnation);
		}
		if (isSheet.equals("0") && isLeaf.equals("1")) {
			treeNode=this.getTreeNodeOne(obj, withCheckBox, standard, desingnation);
			// 如果节点下还有物料
			if (materialCatalogService.checkCatlogHsMetarials(String
					.valueOf(obj[0]))) {
				treeNode.setExpandable(true);
				treeNode.setLeaf(false);
			} else {
				treeNode.setExpandable(false);
				treeNode.setLeaf(true);
			}
		}
		return treeNode;
	}
	/**
	 * getTreeRootNode的辅助方法
	 * */
	private JsonTreeNode getTreeNodeOne(Object[] obj,boolean withCheckBox,String standard,String desingnation){
		JsonTreeNode treeNode = this.getJsonTreeNode(withCheckBox);//返回是否带CheckBox的树 ，封装treeNode。
		treeNode.setId(String.valueOf(obj[0]));
		treeNode.setText(htmlConver(String.valueOf(obj[1]) + " " + standard));//设置 树节点的 TreeNode 对象属性
		treeNode.setExpandable(true);
		treeNode.setIconCls("folder");
		treeNode.setQtip(htmlConver(String.valueOf(obj[1]) + "" + standard + "" + desingnation));
		treeNode.setMaterialType("0");
		if ("checked".equals(obj[6])) {////如果树 节点带有checkBox，判断是否被选中 
			((JsonTreeNodeWithCheckBox) treeNode).setChecked(true);
		}
		return treeNode;
	}
	/**
	 * getTreeRootNode的辅助方法
	 * */
	private JsonTreeNode getTreeNodeThree(boolean withCheckBox,Material material){
		JsonTreeNode treeNode = this.getJsonTreeNode(withCheckBox);//返回是否带CheckBox的树 ，封装treeNode。
		treeNode = this.getJsonTreeNode(withCheckBox);
		treeNode.setId(material.getMaterialid());
		treeNode.setText(material.getMaterialItemName()+ ":"+ (material.getMaterialStandard()==null?"":material.getMaterialStandard())
				+":"+(material.getDesingnation()==null?"":material.getDesingnation())+
						":"+(material.getTechnicCondition()==null?"":material.getTechnicCondition()));
		treeNode.setExpandable(false);
		treeNode.setLeaf(true);
		treeNode.setIconCls("dataset");
		treeNode.setQtip(htmlConver(material.getMaterialItemName()
				+ "（物料）"));
		treeNode.setMaterialType("1");
		return treeNode;
	}
	
	/**
	 * HTML 符号转义
	 */
	private String htmlConver(String str) {
		return str.replaceAll("<", "&lt;");
	}

	/**
	 * 得到物料种类信息列表展示数据
	 * 
	 * @param mcv MaterialCatalogVo
	 * 
	 * @return GridData<MaterialCatalogVo>
	 */
	@WebRemote
	public GridData<MaterialCatalogVo> getGridData(MaterialCatalogVo mcv) {
		GridData<MaterialCatalogVo> gd = new GridData<MaterialCatalogVo>();
		// 分页开始，设置默认值
		Integer start = mcv.getStart();
		if (start == null) {
			start = 0;
		}
		// 每页总数，设置默认值
		Integer limit = mcv.getLimit();
		if (limit == null) {
			limit = 20;
		}

		List<MaterialCatalog> resultTemps = materialCatalogService
				.getAllMaterialCatalogs(mcv, start, limit);
		List<MaterialCatalogVo> results = this.chageDatasToVo(resultTemps);
		gd.setResults(results);
		Integer count = materialCatalogService.getCount(mcv);
		gd.setTotalProperty(count);
		return gd;
	}

	/**
	 * 保存物料种类信息
	 * 
	 * @param mcv MaterialCatalogVo
	 * 
	 * @return String
	 */
	@WebRemote
	public String save(MaterialCatalogVo materialCatalogVo) {
		MaterialCatalog materialCatalog = new MaterialCatalog();
		try {
			BeanUtils.copyProperties(materialCatalog, materialCatalogVo);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		if (StringUtils.isEmpty(materialCatalogVo.getId())) {
			materialCatalog.setMaterialcatalogid(null);
		} else {
			materialCatalog.setMaterialcatalogid(materialCatalogVo.getId());
		}
		if(materialCatalogVo.getIsUpdate().equalsIgnoreCase("false")){
			if (StringUtils.isEmpty(materialCatalogVo.getMaterialcatalogid())) {
					materialCatalog.setMaterialcatalogid(null);
					if(materialCatalogService.checkMaterialCatalog(materialCatalogVo)) {
						return "{success : true,info:'name'}";
					}
			}
		}
		//调用方法自动增加物资编号
		materialCatalog.setMaterialcatalogCode(UtilForHD.GetNowTimeForId());
		
		
		
		materialCatalogService.saveOrUpdateMaterialCatalog(materialCatalog);
		return "{success : true,info:'none'}";
	}
	
	/**
	 * 根据所选IDs删除设备类型对象
	 * 
	 * @param ids  String[]
	 * 
	 * @return String
	 */
	@WebRemote
	public String deleteMCatlog(String ids[]) {
		boolean hsMaterials = false;
		for (int i = 0; i < ids.length; i++) {
			if (materialCatalogService.checkMetarialExistInCatlogTree(ids[i])) {
				hsMaterials = true;
				break;
			}
		}

		// 验证是否有外键关联
		if (hsMaterials) {
			return "hsRelation";
		}
		materialCatalogService.deleteMaterialCatalogs(ids);
		return "true";
	}
	/**
	 * 为树的节点加上checkBox
	 * 
	 * @param withCheckBox  boolean
	 * 
	 * @return JsonTreeNode
	 */
	private JsonTreeNode getJsonTreeNode(boolean withCheckBox) {
		if (withCheckBox) {
			return new JsonTreeNodeWithCheckBox();
		} else {
			return new JsonTreeNode();
		}
	}
	@WebRemote
	public List<String> getMaterialCatalogsByProcurement(String procurementId,String userId){
		List<MaterialCatalog> materialCatalogs = materialCatalogService.getMaterialCatalogsByProcurement(procurementId,userId);
		List<String> list = new ArrayList<String>();
		for(MaterialCatalog m : materialCatalogs){
			list.add(m.getMaterialcatalogid());
		}
		return list;
	}
	@WebRemote
	public List<String> getParentMaterialCatalogs(List<String> list){
		List<MaterialCatalog> materialCatalogs = this.materialCatalogService.getParentMaterialCatalogs(list);
		List<String> mlist = new ArrayList<String>();
		for(MaterialCatalog m : materialCatalogs){
			mlist.add(m.getMaterialcatalogid());
		}
		return mlist;
	}
	
	@WebRemote
	public JSONObject getMaterialCatalogComboBox(MaterialCatalogVo vo){
		JSONObject jo=new JSONObject();
		jo.put("materialcatalog", materialCatalogService.getMaterialCatalogComboBox(vo));
		jo.put("susccess", true);
		return jo ;
	}
	
}
