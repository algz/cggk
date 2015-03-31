package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.lang.StringUtils;
import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;

import com.sysware.customize.hd.investment.general.ImportExcelVo;
import com.sysware.customize.hd.investment.productionMaterialsManagement.util.ContractApplicationStatusEnum;
import com.sysware.util.PropertiesHelper;
import com.sysware.util.StrUtil;

/**
 * 上传合同文件
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-06-29
 * 
 */
public class ProcurementContractFileUploadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		JSONObject obj = new JSONObject();
		response.setContentType("text/html");
		// 设置字符编码为UTF-8, 这样支持汉字显示
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setHeaderEncoding("utf-8");// 设置获取头的字符集
		upload.setSizeMax(200000000);
		ImportExcelVo importExcelVo = new ImportExcelVo();
		try {
			List<FileItem> items = upload.parseRequest(request);
			// 获取seam的上下文对象
			Lifecycle.beginCall();
			ProcurementContractService procurementContractService = (ProcurementContractService) Component
					.getInstance("contract_ProcurementContractServiceImpl",
							true);
			ProcurementContract contract = null;
			try {

				String procurementContractId = "";
				for (FileItem item : items) {
					String fieldName = item.getFieldName();
					if ("procurementContractId".equals(fieldName)) {
						procurementContractId = item.getString();
						contract = procurementContractService
								.getContractById(procurementContractId);
					} else if ("contractCode".equals(fieldName)) {
						contract.setContractCode(item.getString("utf-8"));
					} else if ("contractName".equals(fieldName)) {
						contract.setContractName(item.getString("utf-8"));
					}else if ("contractAmount".equals(fieldName)) {
						contract.setContractAmount(new BigDecimal(item
								.getString()));
					} else if ("attachments".equals(fieldName)) {						
						String fileName = item.getName();
						// 重新修改合同审签单信息时，如果不重新上传文件，那么fileName为空
						if (StringUtils.isBlank(fileName)) {
							continue;
						}
						PropertiesHelper proHelper = PropertiesHelper
								.instance("system.properties");
						String path = proHelper
								.getOneProperty("data_entity_file_path");
						path = path + File.separatorChar;
						File f = new File(path);
						if (!f.isDirectory()) {
							f.mkdirs();
						}
						if (fileName.lastIndexOf(File.separatorChar) != -1) {
							fileName = fileName.substring(fileName
									.lastIndexOf(File.separatorChar) + 1);
						}
						String newFileName = StrUtil.trimAllBlank(fileName);
						InputStream fis = item.getInputStream();
						FileOutputStream os = new FileOutputStream(path
								+ newFileName);
						byte[] buffer = new byte[1024];
						int len = 0;
						while ((len = fis.read(buffer)) != -1) {
							os.write(buffer, 0, len);
						}
						fis.close();
						os.close();
						contract.setAttachments(newFileName);

					}
				}
				contract.setApplicationStatus(ContractApplicationStatusEnum.DAI_SHEN_PI
						.getValue());
				procurementContractService.saveContract(contract);
				obj.put("success", true);
				importExcelVo.setReturnMsg("上传成功");
			} catch (Exception e) {
				obj.put("failure", true);
				importExcelVo.setReturnMsg("系统应用异常：" + e.getMessage());
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
			obj.put("failure", true);
			importExcelVo.setReturnMsg("文件上传出错：" + e.getMessage());
		} finally {
			Lifecycle.endCall();
			obj.put("ImportExcelVo", importExcelVo);
			out.println(obj.toString());
		}
	}
}
