package com.sysware.customize.hd.investment.baseData.product;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;

/**
 * 显示产品树
 * 
 * @author mengl
 * @version 1.0
 * @created 16-5-2011 14:05:12
 */
public class ProductJsonServlet extends HttpServlet {

	private static final long serialVersionUID = 1919878023866657965L;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String parentid = null;

		if (null != request.getParameter("parentId")) {
			parentid = request.getParameter("parentId");
		}

		// 调用seam方法
		Lifecycle.beginCall();

		ProductRemote remote = (ProductRemote) Component.getInstance(
				"product_ProductRemote", true);
		String jasonstring = remote.getTreeRootNode(parentid);

		Lifecycle.endCall();

		// 必须要在getWriter()之前对输出流进行字符集设置!!!!
		response.setContentType("text/html; charset=GBK");
		PrintWriter out = response.getWriter();

		out.println(jasonstring);
	}

}
