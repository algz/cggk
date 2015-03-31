package com.sysware.customize.hd.investment.equipreService.servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.contexts.Lifecycle;

import com.luck.itumserv.common.GridData;
import com.sysware.customize.hd.investment.equipreService.EquipreServiceVo;

/***
 * 解析上传excel文件内容
 * @author bzz
 *
 */
@SuppressWarnings({"unused","unchecked","deprecation"})
public class ExportExcelServlet extends HttpServlet {
	

	private static final long serialVersionUID = -2183296802981459067L;
	
	
	/*@In(create = true, value = "wlzl_WlzlServiceImpl")
	private WlzlService wlzlservice;
	
	
	@In(create = true, value = "wlzl_WlzlRemote")
	private WlzlRemote wlzlRemote;*/
	
	
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
		EquipreServiceUtil util = new EquipreServiceUtil();
		String filename = util.filename;
		String[] heads = util.heads;
		List<EquipreServiceVo> list = new ArrayList<EquipreServiceVo>();
		if(flag.equals("this")){ // this
			list = (List<EquipreServiceVo>) request.getSession().getAttribute("resultGridWlzlList");//导出本页
		}else if(flag.equals("all")){
			list = (List<EquipreServiceVo>) request.getSession().getAttribute("resultGridWlzlListForAll");//导出全部
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
