package com.sysware.customize.hd.investment.engineeringProject.contractManagement.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jboss.seam.contexts.Lifecycle;

import com.sysware.customize.hd.investment.engineeringProject.contractManagement.EngineeringProjectVo;


/***
 * 解析上传excel文件内容
 * @author bzz
 *
 */
@SuppressWarnings({"unused","unchecked","deprecation"})
public class ExportExcelServlet extends HttpServlet {
	

	private static final long serialVersionUID = -2183296802981459067L;
	
	
	
	
	/**
	 * Constructor of the object.
	 */
	public ExportExcelServlet() {
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
		doPost(request,response);
		//System.out.print("aaa");
		
		
		
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
		
		String flag = request.getParameter("flag");//获取前台js传递来的参数
		
			
		// 获取seam的上下文对象
		Lifecycle.beginCall();
		// ServletContext aa = request.getSession().getServletContext();   application
		EngineeringProjectUtil util = new EngineeringProjectUtil();
		String filename = util.filename;
		String[] heads = util.heads;
		List<EngineeringProjectVo> list = new ArrayList<EngineeringProjectVo>();
		if(flag.equals("this")){ // this
			list = (List<EngineeringProjectVo>) request.getSession().getAttribute("resultGridWlzlList");//导出本页
		}else if(flag.equals("all")){
			list = (List<EngineeringProjectVo>) request.getSession().getAttribute("resultGridWlzlListForAll");//导出全部
		}else{
			list = null;
		}
		util.createExcelStream(response, filename, heads, list);
		Lifecycle.endCall();

		
		
		
	}

	/**
	 * Initialization of the servlet. <br>
	 * 
	 * @throws ServletException
	 *             if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}
	
	

}
