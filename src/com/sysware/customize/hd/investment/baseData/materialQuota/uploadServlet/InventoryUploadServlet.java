package com.sysware.customize.hd.investment.baseData.materialQuota.uploadServlet;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import jxl.Workbook;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;

import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.materialQuota.InventoryService;
import com.sysware.customize.hd.investment.baseData.materialQuota.InventoryServiceImpl;
import com.sysware.customize.hd.investment.general.ExcelFileUploadServlet;
import com.sysware.customize.hd.investment.general.ImportExcelVo;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;

public class InventoryUploadServlet extends ExcelFileUploadServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected <T> List<T> processWorkbook(Workbook workbook,
			Map<String, String> formField,HttpServletRequest req) throws FileUploadException {
		// 获取seam的上下文对象
		Lifecycle.beginCall();
		List<String> noExistProducts = new ArrayList<String>();
		List<Material> newMaterials = new ArrayList<Material>();
		InventoryService inventoryService = (InventoryServiceImpl) Component
				.getInstance("inventory_InventoryServiceImpl", true);
		String type = formField.get("exlType");
		try {
			if ("1".equals(type) || "5".equals(type)) {
				inventoryService.batchAddInventoryType2(workbook, type,
						noExistProducts, newMaterials);// 执行excel文件入库
			} else {
				inventoryService.batchAddInventoryType1(workbook, type,
						noExistProducts, newMaterials);// 执行excel文件入库
			}
		} catch (ImportExcelFileException e) {
			JSONObject obj = new JSONObject();
			obj.put("failure", true);
			ImportExcelVo importExcelVo = new ImportExcelVo();
			importExcelVo.setReturnMsg("物资信息不匹配！");
			// 保存不存在的机型信息
			JSONArray jproducts = new JSONArray();
			for (String product : noExistProducts) {
				jproducts.element(new JSONArray().element(product));
			}
			importExcelVo.setNoExistProducts(jproducts.toString());
			// 保存不存在的物资信息
			JSONArray jmaterials = new JSONArray();
			// 保存重复的物资定额信息
			JSONArray rmaterials = new JSONArray();
			for (Material material : newMaterials) {
				JSONObject jmaterial = JSONObject.fromObject(material);
				if (StringUtils.isEmpty(material.getProductCode())) {
					jmaterials.element(jmaterial);
				} else {
					rmaterials.element(jmaterial);
				}
			}
			importExcelVo.setNewMaterials(jmaterials.toString());
			importExcelVo.setRedupMaterials(rmaterials.toString());
			obj.put("ImportExcelVo", importExcelVo);
			e.setJsonResultMsg(obj.toString());
			throw e;
		}
		return null;
	}

	@Override
	protected Map<String, String> processFormField(HttpServletRequest req,
			List<FileItem> items) throws UnsupportedEncodingException {
		Map<String, String> formField = super.processFormField(req, items);
		formField.put("exlType", req.getParameter("exlType"));
		return formField;
	}
}
