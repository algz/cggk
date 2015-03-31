package com.sysware.customize.hd.investment.privilege;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.jboss.seam.Component;
import org.jboss.seam.ScopeType;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Scope;
import org.jboss.seam.annotations.intercept.BypassInterceptors;
import org.jboss.seam.servlet.ContextualHttpServletRequest;
import org.jboss.seam.web.AbstractResource;

import com.luck.itumserv.base.privilege.PrivSerivce;
import com.luck.itumserv.entity.Gprivilege;
import com.luck.itumserv.services.security.Identity;

/**
 * 
 * com.sysware.customize.cac.tc.template.CacTemplateRemote.java
 * 
 * @author zhaodw
 * @date 2011-8-19 下午04:33:07
 * @version 0.1
 */
@Scope(ScopeType.APPLICATION)
@Name("privilegeRemote")
@BypassInterceptors
public class PrivilegeRemote extends AbstractResource {

	Logger log = Logger.getLogger(PrivilegeRemote.class);

	@Override
	public void getResource(final HttpServletRequest request,
			final HttpServletResponse response) throws ServletException,
			IOException {

		new ContextualHttpServletRequest(request) {

			@Override
			public void process() throws Exception {
				doWork(request, response);

			}
		}.run();

	}

	@Override
	public String getResourcePath() {

		return "/privilegeServlet";
	}

	private void doWork(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		JSONObject obj = new JSONObject();
		response.setContentType("text/html");
		// 设置字符编码为UTF-8, 这样支持汉字显示
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		try {
			PrivSerivce privSerivce = (PrivSerivce) Component
					.getInstance("base_privilege_privSerivce");
			Identity identity = (Identity) Component
					.getInstance("org.jboss.seam.security.identity");
			// 通过userID获取权限列表
			List<Gprivilege> priList = privSerivce
					.getPrivilegesByUserId(identity.getLoginUser().getUserid());
			StringBuffer sb = new StringBuffer();
			//循环获取每一个权限ID
			for (int i = 0; i < priList.size(); i++) {
				Gprivilege gprivilege = (Gprivilege) priList.get(i);
				String pid = gprivilege.getPrivilegeid();
				// String pname = gprivilege.getPrivilegename();
				sb.append(pid);
				if (i < priList.size() - 1) {
					sb.append(",");
				}
			}
			obj.put("success", true);
			obj.put("result", sb.toString());
			out.println(obj.toString());

		} catch (Exception e) {
			obj.put("success", false);
			out.println(obj.toString());
			out.flush();
			out.close();
		}
		out.flush();
		out.close();

	}
}
