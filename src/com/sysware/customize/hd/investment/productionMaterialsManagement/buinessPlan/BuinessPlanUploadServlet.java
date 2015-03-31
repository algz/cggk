package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlan;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileUploadException;
import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;

import jxl.Workbook;

import com.sysware.customize.hd.investment.general.ExcelFileUploadServlet;
import com.sysware.customize.hd.investment.general.ImportExcelVo;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;

public class BuinessPlanUploadServlet extends ExcelFileUploadServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected <T> List<T> processWorkbook(Workbook workbook, Map<String, String> formField,HttpServletRequest req)
			throws FileUploadException {
		// 获取seam的上下文对象
		Lifecycle.beginCall();
		// 不存在机型集合
		List<String> noExistProducts = new ArrayList<String>();
		// 数据空白集合
		List<String> bankExistProducts = new ArrayList<String>();

		BuinessPlanService buinessPlanService = (BuinessPlanService) Component.getInstance(
				"buinessPlanServiceImpl", true);

		String userId = formField.get("userid");
		try {// 读取EXCEL文件中的数据，并添加入库
			buinessPlanService.batchAddBuinessPlans(workbook, userId, noExistProducts,
					bankExistProducts,req.getParameter("planType"));
		} catch (ImportExcelFileException e) {
			JSONObject obj = new JSONObject();
			ImportExcelVo importExcelVo = new ImportExcelVo();
			obj.put("failure", true);
			// 对年度数字重复进行错误处理
			importExcelVo.setReturnMsg(e.getLocalizedMessage());

			// 对不存在机型进行错误处理
			if (noExistProducts.size() > 0) {
				JSONArray jproducts = new JSONArray();
				for (String product : noExistProducts) {
					jproducts.element(new JSONArray().element(product));
				}
				importExcelVo.setNoExistProducts(jproducts.toString());
			}
			// 对数据缺失有空白进行错误处理
			if (bankExistProducts.size() > 0) {
				JSONArray bproducts = new JSONArray();
				for (String product : bankExistProducts) {
					bproducts.element(new JSONArray().element(product));
				}
				importExcelVo.setBankExistProducts(bproducts.toString());
			}

			obj.put("ImportExcelVo", importExcelVo);
			e.setJsonResultMsg(obj.toString());
			throw e;
		}

		return null;
	}

}