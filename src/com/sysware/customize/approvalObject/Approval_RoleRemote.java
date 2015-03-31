package com.sysware.customize.approvalObject;

import java.io.IOException;
import java.io.PrintWriter;

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

import com.luck.itumserv.base.dao.GroleUserDAO;
import com.luck.itumserv.services.security.Identity;
/**
 * 获取登陆人员角色
 * @author zhaodw
 * @since 2011-8-31 下午04:52:56
 */
  
@Scope(ScopeType.APPLICATION)
@Name("approval_RoleRemote")
@BypassInterceptors
public class Approval_RoleRemote extends AbstractResource {
  
	
	Logger log = Logger.getLogger(Approval_RoleRemote.class);
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

		return "/approvalRoleServlet";
	}
    /**
     *  通过用户获取用户角色
     */
	private void doWork(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		JSONObject obj = new JSONObject();
		response.setContentType("text/html");
		// 设置字符编码为UTF-8, 这样支持汉字显示
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		try
		{
			 GroleUserDAO  groleUserDAO = (GroleUserDAO)Component
			.getInstance("com_base_dao_GroleUserDAO");
			 //获取当前登录用户信息
			Identity identity  = (Identity)Component
			.getInstance("org.jboss.seam.security.identity");
			//获取登陆用户的所属角色信息
			String roleName = groleUserDAO.roleNames(identity.getLoginUser().getUserid());
			obj.put("success", true);
	        obj.put("result", roleName);
	        out.println(obj.toString());
			
		}
		catch(Exception e)
		{
			obj.put("success", false);
			out.println(obj.toString());
			out.flush();
			out.close();
		}
		out.flush();
		out.close();

	}
}
