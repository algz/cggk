package com.sysware.customize.hd.investment.general;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.WorkbookSettings;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;

/**
 * 上传Excel文件Servlet父类
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-07-26
 * 
 */
public abstract class ExcelFileUploadServlet extends HttpServlet {

	private static final long serialVersionUID = 2036319493852234896L;

	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		this.doPost(req, resp);
	}

	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		ServletFileUpload upload = new ServletFileUpload(
				new DiskFileItemFactory());
		upload.setHeaderEncoding("utf-8");// 设置获取头的字符集
		upload.setSizeMax(200000000);

		resp.setContentType("text/html");
		resp.setCharacterEncoding("UTF-8");// 设置字符编码为UTF-8, 这样支持汉字显示
		PrintWriter out = resp.getWriter();

		try {
			List<FileItem> items = upload.parseRequest(req);
			// 没有文件上传
			if (items == null || items.size() == 0) {
				processFailure("请上传文件", out, null);
			}
			try {
				process(req, items, out);
			} catch (ImportExcelFileException e) {
				out.println(e.getJsonResultMsg());
			}

		} catch (FileUploadException e) {
			processFailure("文件上传出错：", out, e);
		} catch (Exception e) {
			processFailure("系统应用异常：", out, e);
		} finally {
			out.flush();
		}
	}

	/**
	 * 处理Excel Workbook
	 * 
	 * @param workbook
	 *            Workbook对象
	 * @param formField
	 *            上传文件时附带的表单信息
	 * @return 处理后的对象集合
	 * @throws FileUploadException
	 *             文件格式异常
	 */
	protected abstract <T> List<T> processWorkbook(Workbook workbook,
			Map<String, String> formField,HttpServletRequest req) throws FileUploadException;

	/**
	 * 处理上传的所有信息
	 * 
	 * @param req
	 *            HttpServletRequest对象
	 * @param items
	 *            上传信息对象
	 * @param out
	 *            PrintWriter对象
	 * @throws Exception
	 */
	private <T> void process(HttpServletRequest req, List<FileItem> items,
			PrintWriter out) throws Exception {
		Map<String, String> formField = processFormField(req, items);
		List<T> results = processExcelFile(req, items, formField);
		JSONObject jsonObj = new JSONObject();
		jsonObj.put("success", true);
		ImportExcelVo importExcelVo = new ImportExcelVo();
		if (results.size() == 0) {
			importExcelVo.setReturnMsg("上传成功");
		} else {
			importExcelVo.setReturnMsg("信息已重复！");
			JSONArray jsonArray = new JSONArray();
			for (T result : results) {
				JSONObject jmaterial = JSONObject.fromObject(result);
				jsonArray.element(jmaterial);
			}
			importExcelVo.setRedupObjs(jsonArray.toString());
		}
		jsonObj.put("ImportExcelVo", importExcelVo);
		out.println(jsonObj.toString());
	}

	/**
	 * 处理上传文件时附带的表单信息
	 * 
	 * @param req
	 *            HttpServletRequest对象
	 * @param items
	 *            上传信息对象
	 * @return 封装后的表单信息
	 * @throws UnsupportedEncodingException
	 */
	protected Map<String, String> processFormField(HttpServletRequest req,
			List<FileItem> items) throws UnsupportedEncodingException {
		Map<String, String> formField = new HashMap<String, String>(2);
		// 将当前登录用户的ID保存到map中，以便后续使用
		formField.put("userid", getLoginUserId(req));
		return formField;
	}

	/**
	 * 处理上传的Excel文件
	 * 
	 * @param req
	 *            HttpServletRequest对象
	 * @param items
	 *            上传信息对象
	 * @param formField
	 *            封装后的表单信息
	 * @return 处理后的对象集合
	 * @throws Exception
	 */
	private <T> List<T> processExcelFile(HttpServletRequest req,
			List<FileItem> items, Map<String, String> formField)
			throws Exception {
		List<T> objs = new ArrayList<T>(0);
		Workbook workbook = null;
		for (FileItem fileItem : items) {
			if (fileItem.isFormField()) {
				continue;
			}
			try {
				WorkbookSettings ws = new WorkbookSettings();
				ws.setEncoding("ISO-8859-1");
				workbook = Workbook.getWorkbook(fileItem.getInputStream(), ws);
				List<T> tmps = processWorkbook(workbook, formField,req);
				if (tmps != null) {
					objs = tmps;
				}
				break;
			} finally {
				if (null != workbook) {
					workbook.close();
				}
			}
		}
		return objs;
	}

	/**
	 * 处理错误信息
	 * 
	 * @param errMsg
	 *            错误信息
	 * @param out
	 *            PrintWriter对象
	 * @param e
	 *            异常对象
	 */
	private void processFailure(String errMsg, PrintWriter out, Exception e) {
		if (e != null) {
			e.printStackTrace();
			errMsg += e.getMessage();
		}
		JSONObject jsonObj = new JSONObject();
		jsonObj.put("failure", true);
		ImportExcelVo importExcelVo = new ImportExcelVo();
		importExcelVo.setShort(true);
		importExcelVo.setReturnMsg(errMsg);
		jsonObj.put("ImportExcelVo", importExcelVo);
		out.println(jsonObj.toString());
		return;
	}

	/**
	 * 从cookie中获得当前登录用户的id
	 * 
	 * @param req
	 *            HttpServletRequest对象
	 * @return 当前登录用户的id
	 */
	private String getLoginUserId(HttpServletRequest req) {
		Cookie cookies[] = req.getCookies();
		String userid = null;
		for (int i = 0; i < cookies.length; i++) {
			Cookie cookie = cookies[i];
			if ("userid".equals(cookie.getName()))
				userid = cookie.getValue();
		}
		return userid;
	}

}