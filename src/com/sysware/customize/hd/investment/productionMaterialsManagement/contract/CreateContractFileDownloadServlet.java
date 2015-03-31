package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;
import org.jdom.Document;
import org.jdom.output.XMLOutputter;

import com.sysware.customize.hd.investment.util.WordUtil;

import flex.messaging.util.URLDecoder;

public class CreateContractFileDownloadServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String procurementContractId = request
				.getParameter("procurementContractId");
		String modelType = URLDecoder.decode(request.getParameter("modelType"),
				"UTF-8");
		// 获取seam的上下文对象
		Lifecycle.beginCall();
		ProcurementContractService procurementContractService = (ProcurementContractService) Component
				.getInstance("contract_ProcurementContractServiceImpl", true);

		ArrayList<ArrayList<String>> list = procurementContractService
				.getContractInfo(procurementContractId, modelType);
		Lifecycle.endCall();
		WordUtil util = new WordUtil();
		Document doc = util
				.selWord(
						request.getSession().getServletContext()
								.getRealPath("")
								+ "\\customize\\hd\\investment\\productionMaterialsManagement\\ContractModel\\"
								+ modelType + ".xml", list);
		response.reset();
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/x-msdownload");
		response.setHeader("Content-Disposition", "attachment;filename="
				+ new String(modelType.getBytes("gb2312"), "iso8859-1")
				+ ".doc");
		XMLOutputter outputter = new XMLOutputter();
		OutputStream os = response.getOutputStream();
		outputter.output(doc, os);
		os.close();

	}
}
