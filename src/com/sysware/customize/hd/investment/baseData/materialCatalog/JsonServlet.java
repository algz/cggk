package com.sysware.customize.hd.investment.baseData.materialCatalog;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;

public class JsonServlet extends HttpServlet {

	private static final long serialVersionUID = 457138686835329481L;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		this.doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String parentid = request.getParameter("parentId");
		String remoteName = request.getParameter("remoteName");
		// 标示是否显示物料
		String showMaterial = request.getParameter("showMaterial");
		// 标示是否显示结点前的复选框
		String withCheckBoxStr = request.getParameter("withCheckBox");
		// 在新建采购计划时，获取采购计划Id
		String procurementId = request.getParameter("procurementId");
		boolean withCheckbox = false;
		if (StringUtils.isNotEmpty(withCheckBoxStr)) {
			withCheckbox = Boolean.parseBoolean(withCheckBoxStr);
		}
		// 获得用户ID
		String userIDstr = request.getParameter("userID");
		Long userID = StringUtils.isNotBlank(userIDstr) ? Long
				.parseLong(userIDstr) : null;
		// 调用seam方法
		Lifecycle.beginCall();

		MaterialCatalogRemote remote = (MaterialCatalogRemote) Component
				.getInstance(remoteName, true);
		//获取节点下路径含有物料的节点集合
		List<String> list = new ArrayList<String>();
		if(StringUtils.isNotEmpty(procurementId)&&!procurementId.equalsIgnoreCase("null")){
			 List<String> alist = remote.getMaterialCatalogsByProcurement(procurementId,getLoginUserId(request));
			 if(alist.size()>0){
				 list=remote.getParentMaterialCatalogs(alist);
			 }
		}
		String jasonstring = remote.getTreeRootNode(parentid, showMaterial,
				withCheckbox, userID,list);

		Lifecycle.endCall();

		// 必须要在getWriter()之前对输出流进行字符集设置!!!!
		response.setContentType("text/html; charset=GBK");
		PrintWriter out = response.getWriter();
		out.println(jasonstring);
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
