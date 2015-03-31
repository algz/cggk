package com.sysware.customize.hd.investment.engineeringProject.contractManagement.servlet;

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

import com.sysware.customize.hd.investment.engineeringProject.contractManagement.EngineeringProjectService;
import com.sysware.customize.hd.investment.exception.AppException;
import com.sysware.customize.hd.investment.exception.BusinessException;



/***
 * 解析上传excel文件内容
 * @author 
 *
 */
@SuppressWarnings({"unused","unchecked","deprecation"})
public class ExcelUploadServlet extends HttpServlet {


	private static final long serialVersionUID = -2183296802981459067L;
	
	
	@In(create = true, value = "engineeringProjectService_EngineeringProjectServiceImpl")
	private EngineeringProjectService engineeringProjectService;
	
	/**
	 * Constructor of the object.
	 */
	public ExcelUploadServlet() {
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
			//2011-10-11 新加点击了的节点  ---------------开始
			String nodeId = "";//获取前台JS页面传递过来的,点击了的nodeId
			if((request.getParameter("parentId")).equals("null") || (request.getParameter("parentId")) == null){
				nodeId = "0";
			}else{
				nodeId = request.getParameter("parentId");
			}
			//2011-10-11 新加点击了的节点  ---------------结束
			
			
			//2011-10-12 获取点击节点的父父父...节点  (根节点的下一子节点)  for 供应商的大类别  ---------------开始
			String nodeIdForGYS = "";//获取前台JS页面传递过来的,点击了的nodeId
			if((request.getParameter("clickNodeForGYS")).equals("null") || (request.getParameter("clickNodeForGYS")) == null){
				nodeIdForGYS = "0";
			}else{
				nodeIdForGYS = request.getParameter("clickNodeForGYS");
			}
			//2011-10-12 获取点击节点的父父父...节点  (根节点的下一子节点)  for 供应商的大类别  ---------------结束
			
			
			
			
			
			
			
			
			// 没有文件上传  
	        if (items == null || items.size() == 0) {  
	               /*out.println("请选择上传文件<p />");  
	               out.println("<a href=\"upload.html\" target=\"_top\">返回</a>");  */
	                
	        	obj.put("failure", true);
	            /*BaseVo baseVo = new BaseVo();
	            baseVo.setReturnMsg("请上传文件");
	            obj.put("baseVo", baseVo);*/
	            out.println(obj.toString());
	        	return;
	        } 
			
			//获取seam的上下文对象
			Lifecycle.beginCall();
			EngineeringProjectService wlzlserv = (EngineeringProjectService)Component.getInstance("engineeringProjectService_EngineeringProjectServiceImpl",true);
				try{
					//wlzlserv.checkImportExcelFile(items);//执行excel文件入库之前的检验方法
					System.out.println("-----------------------------------------");
					//wlzlserv.ImportExcelFile(items,nodeId,nodeIdForGYS);//执行excel文件入库
					//wlzlserv.ImportExcelFileLevel4(items);//执行excel文件入库
					
					obj.put("success", true);
			        /*BaseVo baseVo = new BaseVo();
			        baseVo.setReturnMsg("上传成功");
			        obj.put("baseVo", baseVo);*/
			        out.println(obj.toString());
			        
				}catch(AppException e){
					e.printStackTrace();
					obj.put("failure", true);
	                /*BaseVo baseVo = new BaseVo();
	                baseVo.setReturnMsg("系统应用异常："+e.getMessage());
	                obj.put("baseVo", baseVo);*/
	                out.println(obj.toString());
					return;
				}catch(BusinessException e1){
					e1.printStackTrace();
					obj.put("failure", true);
	                /*BaseVo baseVo = new BaseVo();
	                baseVo.setReturnMsg(e1.getMessage());
	                obj.put("baseVo", baseVo);*/
	                out.println(obj.toString());
					return;
				}
				
			Lifecycle.endCall();
			
		} catch (FileUploadException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			obj.put("failure", true);
            /*BaseVo baseVo = new BaseVo();
            baseVo.setReturnMsg("文件上传出错："+e1.getMessage());
            obj.put("baseVo", baseVo);*/
            out.println(obj.toString());
			return;
		} catch (Exception e2) {
			e2.printStackTrace();
			obj.put("failure", true);
            /*BaseVo baseVo = new BaseVo();
            baseVo.setReturnMsg("系统应用异常："+e2.getMessage());
            obj.put("baseVo", baseVo);*/
            out.println(obj.toString());
			return;
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
