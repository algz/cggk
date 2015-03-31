package com.luck.itumserv.base.user;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;
import org.jboss.seam.servlet.ContextualHttpServletRequest;

import com.luck.itumserv.base.user.service.ImportUserService;
import com.sysware.message.MessageCollection;
import com.sysware.msoffice.excel.SyswareReadExcel;
import com.sysware.utils.SyswareUtil;


public class ImportUserServlet extends javax.servlet.http.HttpServlet implements javax.servlet.Servlet {

	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		doPost(request,response);
	}

	@SuppressWarnings("rawtypes")
	protected void doPost(final HttpServletRequest request,final HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		
		ServletFileUpload.isMultipartContent(request);
		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		List items;
		FileItem fii = null;
		try {
			items = upload.parseRequest(request);
			Iterator i = items.iterator();
			while (i.hasNext()) {
				fii = (FileItem) i.next();
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
		}
		final FileItem fi = fii;
		new ContextualHttpServletRequest(request) {
			@Override
			public void process() throws Exception {
				test(request, response , fi);
			}
		}.run();
	}
	void test(HttpServletRequest request,HttpServletResponse response,FileItem fi) throws IOException{	
		
		List<Map> lstMap = null;
		String message = null;
		
		ImportUserService importUserService = (ImportUserService)Component.getInstance("importUserService");
		try {
			lstMap = SyswareReadExcel.readExcle(fi.getInputStream(), "userImport", "userInfo");
		} catch (Exception e) {
			MessageCollection errorMessage = new MessageCollection();
			errorMessage.addErrorMessage("请检查您导入的模板文件是否正确(务必使用系统提供的模板)！");
			message = com.json.SyswareJsonUtils.toJsonString(null,errorMessage);
			e.printStackTrace();
		}
		try {
			message = importUserService.importUser(lstMap);
		} catch (Exception e) {
			MessageCollection errorMessage = new MessageCollection();
			errorMessage.addErrorMessage("用户导入失败！");
			message = com.json.SyswareJsonUtils.toJsonString(null,errorMessage);
			e.printStackTrace();
		}
		
		
		
		response.getWriter().println(message);
	}
}
