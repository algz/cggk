package com.sysware.customize.hd.investment.equipreService.servlet;

import java.io.IOException;
import java.io.PrintWriter;
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
import org.jboss.seam.Component;
import org.jboss.seam.annotations.In;
import org.jboss.seam.contexts.Lifecycle;
import org.apache.commons.lang.StringUtils;

import com.sysware.customize.hd.investment.equipreService.EquipreService_Service;
import com.sysware.customize.hd.investment.exception.AppException;
import com.sysware.customize.hd.investment.exception.BusinessException;

/***
 * 解析上传excel文件内容
 * @author baozhizhi
 *
 */
@SuppressWarnings({"unused","unchecked","deprecation"})
public class ExcelUploadCheckServlet extends HttpServlet {


	private static final long serialVersionUID = -1285093962380321863L;
	@In(create = true, value = "equipreService_EquipreService_ServiceImpl")
	private EquipreService_Service equipreServiceService;
	
	/**
	 * Constructor of the object.
	 */
	public ExcelUploadCheckServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.print("aaa");
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		JSONObject obj = new JSONObject();
		
		
		response.setContentType("text/html");
		// 设置字符编码为UTF-8, 这样支持汉字显示
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		
		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setHeaderEncoding("UTF-8");//设置获取头的字符集
		upload.setSizeMax(-1);//无限制
		
		
		
		try {
			List<FileItem> items = upload.parseRequest(request);
			
			// 没有文件上传  
	        if (items == null || items.size() == 0) {  
	        	obj.put("failure", true);
	           /* BaseVo baseVo = new BaseVo();
	            baseVo.setReturnMsg("请上传文件");
	            obj.put("baseVo", baseVo);*/
	            out.println(obj.toString());
	        	return;
	        } 
			
			//获取seam的上下文对象
			Lifecycle.beginCall();
				EquipreService_Service service = (EquipreService_Service)Component.getInstance("wlzl_WlzlServiceImpl",true);
				try{
					service.checkImportExcelFile(items);//执行excel文件入库
					obj.put("success", true);
					/*
			        BaseVo baseVo = new BaseVo();
			        baseVo.setReturnMsg("检验完成,无异常输入字符");
			        obj.put("baseVo", baseVo);*/
			        out.println(obj.toString());
			        
				}catch(AppException e){
					/*e.printStackTrace();
					obj.put("failure", true);
	                BaseVo baseVo = new BaseVo();
	                baseVo.setReturnMsg("系统应用异常："+e.getMessage());
	                obj.put("baseVo", baseVo);
	                out.println(obj.toString());
					return;*/
				}catch(BusinessException e1){
					/*e1.printStackTrace();
					obj.put("failure", true);
	                BaseVo baseVo = new BaseVo();
	                baseVo.setReturnMsg(e1.getMessage());
	                obj.put("baseVo", baseVo);
	                out.println(obj.toString());
					return;*/
				}
				
			Lifecycle.endCall();
			
		} catch (FileUploadException e1) {
			/*e1.printStackTrace();
			obj.put("failure", true);
            BaseVo baseVo = new BaseVo();
            baseVo.setReturnMsg("文件上传出错："+e1.getMessage());
            obj.put("baseVo", baseVo);
            out.println(obj.toString());
			return;*/
		} catch (Exception e2) {
			/*e2.printStackTrace();
			obj.put("failure", true);
            BaseVo baseVo = new BaseVo();
            baseVo.setReturnMsg("系统应用异常："+e2.getMessage());
            obj.put("baseVo", baseVo);
            out.println(obj.toString());
			return;*/
		}
		
		
		
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
		
	}
	
	
	

}
