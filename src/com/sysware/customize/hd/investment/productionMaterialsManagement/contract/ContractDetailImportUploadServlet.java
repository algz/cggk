package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

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
import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;

import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.general.ExcelFileUploadServlet;
import com.sysware.customize.hd.investment.general.ImportExcelVo;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementDetail.ProcurementDetailService;

/**
 * 物资需求大纲导入Servlet
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-01
 * 
 */
public class ContractDetailImportUploadServlet extends ExcelFileUploadServlet {

	private static final long serialVersionUID = 7028881806849127967L;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	protected List processWorkbook(Workbook workbook, Map formField,HttpServletRequest req) throws FileUploadException {
		// 获取seam的上下文对象
		Lifecycle.beginCall();
		ProcurementContractService procurementContractService = (ProcurementContractService) Component
				.getInstance("contract_ProcurementContractServiceImpl",
						true);
		List<String> noExistProducts = new ArrayList<String>();
		List<Material> newMaterials = new ArrayList<Material>();
		try {
			procurementContractService.importContractDetail(workbook, formField, noExistProducts, newMaterials);
//			procurementDetailService.batchAddProcurementDetails(workbook,
//					formField, noExistProducts, newMaterials);
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
			for (Material material : newMaterials) {
				JSONObject jmaterial = JSONObject.fromObject(material);
				jmaterials.element(jmaterial);
			}
			importExcelVo.setNewMaterials(jmaterials.toString());
			obj.put("ImportExcelVo", importExcelVo);
			e.setJsonResultMsg(obj.toString());
			throw e;
		} finally {
			Lifecycle.endCall();
		}
		return null;
	}

	@Override
	protected Map<String, String> processFormField(HttpServletRequest req,
			List<FileItem> items) throws UnsupportedEncodingException {
		Map<String, String> formField = super.processFormField(req, items);
		for (FileItem fileItem : items) {
			if (fileItem.isFormField()) {
				if ("remarks".equals(fileItem.getFieldName())) {
					formField.put("remarks", fileItem.getString("utf-8"));
					break;
				}
			}
		}
		return formField;
	}

}