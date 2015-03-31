package com.sysware.customize.hd.investment.baseData.materialCatalog;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import jxl.Workbook;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileUploadException;
import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;

import com.sysware.customize.hd.investment.general.ExcelFileUploadServlet;
import com.sysware.customize.hd.investment.general.ImportExcelVo;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;

public class MaterialCatalogUploadServlet extends ExcelFileUploadServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected <T> List<T> processWorkbook(Workbook workbook,
			Map<String, String> formField,HttpServletRequest req) throws FileUploadException {
		// 获取seam的上下文对象
		Lifecycle.beginCall();
		MaterialCatalogService materialCatalogService = (MaterialCatalogServiceImpl) Component
				.getInstance("materialCatalogServiceImpl", true);
		// 导入文件中已存在的物料种类集合
		List<MaterialCatalog> reMaterialCatalogs = new ArrayList<MaterialCatalog>();
		// 不存在的物料种类集合
		List<String> notExsitCatalog = new ArrayList<String>();
		try {
			reMaterialCatalogs = materialCatalogService
					.batchAddMaterialCatalogVos(workbook, reMaterialCatalogs,
							notExsitCatalog);
		} catch (ImportExcelFileException e) {
			JSONObject obj = new JSONObject();

			if (reMaterialCatalogs.size() > 0 || notExsitCatalog.size() > 0) {
				obj.put("success", true);
				ImportExcelVo importExcelVo = new ImportExcelVo();
				importExcelVo.setReturnMsg("物资种类信息已重复！");
				// 保存重复的物资定额信息
				JSONArray rmaterials = new JSONArray();
				for (MaterialCatalog materialCatalog : reMaterialCatalogs) {
					JSONObject rmaterial = JSONObject
							.fromObject(materialCatalog);// 将materialCatalog对象转化为JSONObject对象
					rmaterials.element(rmaterial);// 添加到JSONArray中
				}
				importExcelVo.setRedupMaterialCatalogVos(rmaterials.toString());// 封装到VO类中

				JSONArray noexsits = new JSONArray();

				for (String cat : notExsitCatalog) {
					noexsits.element(cat);
				}
				importExcelVo.setNoExistProducts(noexsits.toString());

				obj.put("ImportExcelVo", importExcelVo);// 封装到obj中
			} else {
				obj.put("failure", true);
				ImportExcelVo importExcelVo = new ImportExcelVo();
				importExcelVo.setReturnMsg(e.getMessage());
				obj.put("ImportExcelVo", importExcelVo);
			}
			e.setJsonResultMsg(obj.toString());// 将obj传到前台
			throw e;
		}
		Lifecycle.endCall();
		return null;
	}

}
