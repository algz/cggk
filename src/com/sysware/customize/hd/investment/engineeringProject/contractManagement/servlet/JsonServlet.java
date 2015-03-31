package com.sysware.customize.hd.investment.engineeringProject.contractManagement.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;

import com.sysware.customize.hd.investment.engineeringProject.contractManagement.EngineeringProjectRemote;


public class JsonServlet extends HttpServlet {

	
	private static final long serialVersionUID = 3170069721879281243L;

	/**
	 * Constructor of the object.
	 */
	public JsonServlet() {
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

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out
				.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
		out.println("<HTML>");
		out.println("  <HEAD><TITLE>A Servlet</TITLE></HEAD>");
		out.println("  <BODY>");
		out.print("    This is ");
		out.print(this.getClass());
		out.println(", using the GET method");
		out.println("  </BODY>");
		out.println("</HTML>");
		out.flush();
		out.close();
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


		
		String parentid = null;
		
		if(null != request.getParameter("parentId"))
		{
			parentid = request.getParameter("parentId").toString();
		}
		Cookie cooke[] = request.getCookies();
		String userid = null;
			Long uID = 0L;

		for (int i = 0; i < cooke.length; i++)
		{
			javax.servlet.http.Cookie ck = cooke[i];
			if ("userid".equals(ck.getName()))
				userid = ck.getValue();
		}
		if(userid!=null&&!"".equals(userid))
		{
			uID = Long.parseLong(userid);
		}
		//调用seam方法
		Lifecycle.beginCall();
		
		EngineeringProjectRemote remote = (EngineeringProjectRemote)Component.getInstance("engineeringProject_EngineeringProjectRemote",true);
		String jasonstring = remote.getTreeRootNode(parentid,uID);
		
		Lifecycle.endCall();
		
		//必须要在getWriter()之前对输出流进行字符集设置!!!!
		response.setContentType("text/html; charset=GBK");
		PrintWriter out = response.getWriter();
		//System.out.println(jasonstring);
		out.println(jasonstring);
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
