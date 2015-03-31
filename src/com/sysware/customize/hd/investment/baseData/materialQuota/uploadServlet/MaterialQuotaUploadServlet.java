package com.sysware.customize.hd.investment.baseData.materialQuota.uploadServlet;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import jxl.Workbook;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;

import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.materialQuota.MaterialQuotaService;
import com.sysware.customize.hd.investment.baseData.materialQuota.MaterialQuotaServiceImpl;
import com.sysware.customize.hd.investment.general.ExcelFileUploadServlet;
import com.sysware.customize.hd.investment.general.ImportExcelVo;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;

public class MaterialQuotaUploadServlet extends ExcelFileUploadServlet {
	private static final long serialVersionUID = 1L;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	protected List processWorkbook(Workbook workbook,
			Map formField,HttpServletRequest req) throws FileUploadException {
		// 获取seam的上下文对象
		Lifecycle.beginCall();
		List<String> noExistProducts = new ArrayList<String>();
		List<Material> newMaterials = new ArrayList<Material>();
		MaterialQuotaService materialQuoaService = (MaterialQuotaServiceImpl) Component
				.getInstance("materialQuota_MaterialQuotaServiceImpl", true);
		try {
			materialQuoaService.batchAddMaterialQuotas(workbook, noExistProducts, newMaterials);
		} catch (ImportExcelFileException e) {
			JSONObject obj = new JSONObject();
			obj.put("failure", true);
			ImportExcelVo importExcelVo = new ImportExcelVo();
			importExcelVo.setReturnMsg("物资信息不匹配！");
			// 保存不存在的机型信息
//			JSONArray jproducts = new JSONArray();
//			for (String product : noExistProducts) {
//				jproducts.element(new JSONArray().element(product));
//			}
//			importExcelVo.setNoExistProducts(jproducts.toString());
//			// 保存不存在的物资信息
//			JSONArray jmaterials = new JSONArray();
//			// 保存重复的物资定额信息
//			JSONArray rmaterials = new JSONArray();
//			for (Material material : newMaterials) {
//				JSONObject jmaterial = JSONObject.fromObject(material);
//				if (StringUtils.isEmpty(material.getProductCode())) {
//					jmaterials.element(jmaterial);
//				} else {
//					rmaterials.element(jmaterial);
//				}
//			}
//			importExcelVo.setNewMaterials(jmaterials.toString());
//			importExcelVo.setRedupMaterials(rmaterials.toString());
			obj.put("ImportExcelVo", importExcelVo);
			e.setJsonResultMsg(obj.toString());
			throw e;
		}		
		return null;
	}



}
