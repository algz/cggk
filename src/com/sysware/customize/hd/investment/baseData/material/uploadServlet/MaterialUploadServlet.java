package com.sysware.customize.hd.investment.baseData.material.uploadServlet;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import jxl.Workbook;
import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileUploadException;
import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;

import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.general.ExcelFileUploadServlet;
import com.sysware.customize.hd.investment.general.ImportExcelVo;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;

public class MaterialUploadServlet extends ExcelFileUploadServlet {
	private static final long serialVersionUID = 1L;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	protected List processWorkbook(Workbook workbook, Map formField,HttpServletRequest req)
			throws FileUploadException {
		// 获取seam的上下文对象
		Lifecycle.beginCall();
		MaterialService materialService = (MaterialService) Component
				.getInstance("material_MaterialServiceImpl", true);// 获取MaterialService实例
		List<Material> materials = null;
		try {
			materials = materialService.batchAddMaterials(workbook);// 执行导入数据库操作
		} catch (ImportExcelFileException e) {// 对导入异常信息进行反馈
			JSONObject obj = new JSONObject();
			obj.put("failure", true);
			ImportExcelVo importExcelVo = new ImportExcelVo();
			importExcelVo.setReturnMsg(e.getMessage());
			obj.put("ImportExcelVo", importExcelVo);
			e.setJsonResultMsg(obj.toString());// 将JSONObject封装到ImportExcelFileException中抛到前台
			throw e;
		} finally {
			Lifecycle.endCall();
		}
		return materials;
	}

}
