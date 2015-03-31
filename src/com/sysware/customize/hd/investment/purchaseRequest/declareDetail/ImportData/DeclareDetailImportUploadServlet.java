package com.sysware.customize.hd.investment.purchaseRequest.declareDetail.ImportData;

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

public class DeclareDetailImportUploadServlet extends ExcelFileUploadServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected <T> List<T> processWorkbook(Workbook workbook, Map<String, String> formField,HttpServletRequest request)
			throws FileUploadException {
		// 获取seam的上下文对象
		Lifecycle.beginCall();
		// 数据空白集合
		List<String> bankExist = new ArrayList<String>();

		
		DeclareDetailImportDataService declareDetailImportDataService = (DeclareDetailImportDataService) Component.getInstance(
				"declareDetailImportDataServiceImp", true);

		try {// 读取EXCEL文件中的数据，并添加入库
			declareDetailImportDataService.ImportData(workbook, bankExist,request);
		} catch (Exception e) {
			
			ImportExcelFileException e1=new ImportExcelFileException();
			JSONObject obj = new JSONObject();
			ImportExcelVo importExcelVo = new ImportExcelVo();
			obj.put("failure", true);
			// 对年度数字重复进行错误处理
			importExcelVo.setReturnMsg(e.getCause()==null?e.getLocalizedMessage():e.getCause().getLocalizedMessage());

			// 对数据缺失有空白进行错误处理
//			if (bankExist.size() > 0) {
//				JSONArray bproducts = new JSONArray();
//				for (String product : bankExist) {
//					bproducts.element(new JSONArray().element(product));
//				}
//				importExcelVo.setBankExistProducts(bproducts.toString());
//			}

			obj.put("ImportExcelVo", importExcelVo);
			e1.setJsonResultMsg(obj.toString());
			e.printStackTrace();
			throw e1;
			
		}
		System.out.println("导入完成!");
		return null;
	}


}
