package com.sysware.customize.hd.investment.baseData.material;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.BigDecimalConverter;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.baseData.materialCatalog.MaterialCatalog;
import com.sysware.customize.hd.investment.general.exception.BusinessDataStateException;
import com.sysware.customize.hd.investment.general.exception.ReduplicatedException;
import com.sysware.customize.hd.investment.util.UtilForHD;
import java.net.URLDecoder;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * 物资条目远程对象
 * 
 * @author tengWeiJia
 * @version 1.0
 * @created 16-五月-2011 13:46:03
 */
@Name("material_MaterialRemote")
public class MaterialRemote {

	@In(create = true, value = "material_MaterialServiceImpl")
	private MaterialService materialService;

	@In(create = true)
	Identity identity;
	
	static {
		ConvertUtils.register(new BigDecimalConverter(Double.valueOf(0)),
				BigDecimal.class);
	}

	/**
	 * @return the materialService
	 */
	protected MaterialService getMaterialService() {
		return materialService;
	}

	/**
	 * 物资信息列表 用于 materialGrid.js 中 materialGrid.gridPanel 方法 store
	 * 
	 * @param materialVo
	 *            return gridData
	 */

	@WebRemote
	public GridData<MaterialVo> getAll(MaterialVo materialVo) throws Exception {

		String startId = materialVo.getStartId();
		if (startId == null || "root".equals(startId)) {
			materialVo.setStartId("0");
		}

		MaterialCondition materialCondition = new MaterialCondition();
		BeanUtils.copyProperties(materialCondition, materialVo);

		List<Material> materials = this.getMaterialService()
				.findAllMaterials(materialCondition, materialVo.getStart(),
						materialVo.getLimit());

		List<MaterialVo> materialVos = new ArrayList<MaterialVo>();

		for (Material material : materials) {
			MaterialVo temp = new MaterialVo();
			BeanUtils.copyProperties(temp, material);
//			MaterialCatalog mc=this.getMaterialService().getMaterialCatalogByMaterialCatalogid(material.getMaterialCatalog().getMaterialcatalogid());
			temp.setMaterialCatalogName(material.getMaterialclass());
			temp.setFileId("");
			temp.setFileName("");
			materialVos.add(temp);
		}

		GridData<MaterialVo> gridData = new GridData<MaterialVo>();
		gridData.setTotalProperty(materialCondition.getCount());
//		gridData.setTotalProperty(getMaterialService()
//				.countByCondition(materialCondition));
		gridData.setResults(materialVos);
		return gridData;
	}

	/**
	 * 保存物资信息 用于 materialForm.js 中 materialForm.getForm 的 确定操作
	 * 
	 * @param materialVo
	 *            return String
	 */
	@WebRemote
	public String save(MaterialVo materialVo) throws Exception {
		Material material = new Material();
		if ("root".equals(materialVo.getParentId())) {
			materialVo.setParentId("1");
		}
		
		
		
		//处理下 审批人 字段
		//去掉  XXXX部长[123456] 类型字段,只保留后面的编号
		Pattern p = Pattern.compile("\\[(.*?)\\]");
	    Matcher m = p.matcher(materialVo.getApprover().toString());
	    while (m.find()) {
	    	String str = m.group(1);
	    	materialVo.setApprover(str);
	    }
		
		//调用方法自动增加物资编号
		//materialVo.setMaterialitemcode(UtilForHD.GetNowTimeForId());
		//调用存储过程获取库存系统那边返回的编码值
		String _materialitemcode = materialService.getSelectStringDemensionList(materialVo);
		String[] resultString = _materialitemcode.split(",");
		if(resultString[0].toString().equals("1")){
			String temp = "{success : false,msg : '"+resultString[1].toString()+"'}";
			return temp;
		}else{
			materialVo.setMaterialitemcode(resultString[1].toString());//赋值物料编码;
		}
		
		
		
		
		
		
		
		BeanUtils.copyProperties(material, materialVo);

		// 设置物料信息种类id
		MaterialCatalog catalog = new MaterialCatalog();
		if (StringUtils.isNotEmpty(materialVo.getParentId())) {
			catalog.setMaterialcatalogid(materialVo.getParentId());
			material.setMaterialCatalog(catalog);
		}
		
		
		
		
		try {
			this.getMaterialService().save(material);
		} catch (ReduplicatedException re) {
			return "{success : false}";
		}

		return "{success : true}";
	}

	/**
	 * 根据所选IDs删除物料信息对象 用于materialAction.js 中 materialAction.del方法
	 * 
	 * @param idsStr
	 *            return String
	 */
	@WebRemote
	public String deleteMaterials(String[] ids) {
		try {
			this.getMaterialService().batchDeleteMaterials(ids);
		} catch (Exception e) {
			return "{success : false}";
		}
		return "{success : true}";
	}

	/**
	 * 根据所选ID获得物料信息对象 暂未使用
	 * 
	 * @param id
	 *            return material
	 */
	@WebRemote
	public Material getById(String id) {
		return getMaterialService().findById(id);
	}

	/**
	 * 根据合同编号获得物料信息集合
	 * 
	 * @param materialVo
	 */
	@WebRemote
	public GridData<MaterialVo> getMaterialsByContract(MaterialVo materialVo)
			throws Exception {
		GridData<MaterialVo> gridData = new GridData<MaterialVo>();
		List<MaterialVo> results = new ArrayList<MaterialVo>();
		List<Material> materials = getMaterialService()
				.getMaterialsByContract(materialVo.getContractId());
		for (Material material : materials) {
			MaterialVo vo = new MaterialVo();
			BeanUtils.copyProperties(vo, material);
			results.add(vo);
		}
		gridData.setResults(results);
		return gridData;
	}
	
	
	
	
	
	/***
	 * 根据后台数据结构,直接返回字符串拼装成前台查询条件的List<GridData> (无需参数)
	 * @param form
	 * @return
	 */
	@WebRemote
	public GridData<MaterialVo> getSelectStringClassList(){
		//获取request变量
		//HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		
		GridData<MaterialVo> gridData = new GridData<MaterialVo>();
		List<MaterialVo> list = materialService.getSelectStringClassList();
		gridData.setSuccess(true);
		gridData.setResults(list);
		return gridData;
	}
	
	
	
	
	/***
	 * 根据后台数据结构,直接返回字符串拼装成前台查询条件的List<GridData> (无需参数)
	 * @param form
	 * @return
	 * 级联的下拉列表第二列使用
	 */
	@WebRemote
	public GridData<MaterialVo> getSelectStringKindList(String a){
		//获取request变量
		HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		
		String materialKind = "";
		if(request.getParameter("materialKind") != null){
			try {
				materialKind = URLDecoder.decode(request.getParameter("materialKind"),"utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}//解码
		}

		GridData<MaterialVo> gridData = new GridData<MaterialVo>();
		List<MaterialVo> list = materialService.getSelectStringKindList(materialKind);
		gridData.setSuccess(true);
		gridData.setResults(list);
		return gridData;
	}
	
	
	
	
	
	/***
	 * 根据后台数据结构,直接返回字符串拼装成前台查询条件的List<GridData> (无需参数)
	 * @param form
	 * @return
	 */
	@WebRemote
	public GridData<MaterialVo> getSelectStringDemensionList(){
		//获取request变量
		//HttpServletRequest request = org.jboss.seam.web.ServletContexts.instance().getRequest();
		
		GridData<MaterialVo> gridData = new GridData<MaterialVo>();
		List<MaterialVo> list = materialService.getSelectStringDemensionList();
		gridData.setSuccess(true);
		gridData.setResults(list);
		return gridData;
	}
	
	/**
	 * 需求登记--申报记录--新增记录    根据物料名称查询物料信息
	 * @param materialVo
	 * @return
	 */
	@WebRemote
	public GridData<MaterialVo> getMaterialsByCondition(MaterialVo materialVo) {
		GridData<MaterialVo> gridData = new GridData<MaterialVo>();
		List<MaterialVo> results = getMaterialService().getMaterialsByCondition(materialVo);
        gridData.setResults(results);
		gridData.setTotalProperty(materialVo.getCount());
		return gridData;
	}
	
	
	/**
	 * 根据登录用户物资权限查询物资
	 * @param vo
	 * @return
	 */
	public GridData<MaterialVo> getAllByRoles(MaterialVo vo){

		GridData<MaterialVo> gridData = new GridData<MaterialVo>();
		try {
			String uid = String.valueOf(identity.getLoginUser().getLoginname());
			List<MaterialVo> list = materialService.findAllMaterialsByCurrentUser(vo,uid);
			gridData.setTotalProperty(vo.getCount());
			gridData.setResults(list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return gridData;
	}
	
	@WebRemote
	public String synchronousMaterial(MaterialVo vo){
		String msg=materialService.synchronousMaterial(vo);
		return "{success:true,msg:'"+msg+"'}";
	}
	
}