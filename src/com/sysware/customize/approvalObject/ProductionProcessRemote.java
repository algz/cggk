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

import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.Purchase;
import com.sysware.customize.hd.investment.productionMaterialsManagement.procurementProcess.PurchaseService;
@Scope(ScopeType.APPLICATION)
@Name("productionProcess_Remote")
@BypassInterceptors
public class ProductionProcessRemote extends AbstractResource {
 
	
	Logger log = Logger.getLogger(ProductionProcessRemote.class);
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

		return "/productionProcessServlet";
	}

	private void doWork(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		JSONObject obj = new JSONObject();
		response.setContentType("text/html");
		// 设置字符编码为UTF-8, 这样支持汉字显示
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		try
		{
			String type = "";
			PurchaseService  purchaseService = (PurchaseService)Component
			.getInstance("purchaseServiceImpl");
			String id =  request.getParameter("id");
			Purchase purchase=	purchaseService.getPurchaseById(id);
			if(purchase!=null){
				type = purchase.getType();
			}
			
			obj.put("success", true);
	        obj.put("result", type);
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
