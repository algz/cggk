package com.sysware.customize.hd.investment.productionMaterialsManagement.contract;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;

import com.sysware.util.PropertiesHelper;

public class ProcurementContractFileDownloadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		String procurementContractId = request
				.getParameter("procurementContractId");
		
		boolean checked = Boolean.valueOf(request.getParameter("checked"));

		// 获取seam的上下文对象
		Lifecycle.beginCall();
		ProcurementContractService procurementContractService = (ProcurementContractService) Component
				.getInstance("contract_ProcurementContractServiceImpl", true);

		String fileName = procurementContractService.getContractById(
				procurementContractId).getAttachments();
		
		Lifecycle.endCall();

		PropertiesHelper proHelper = PropertiesHelper
				.instance("system.properties");
		String filePath = proHelper.getOneProperty("data_entity_file_path")
				+ File.separatorChar + fileName;
		response.reset();
		response.setCharacterEncoding("UTF-8");

		File file = new File(filePath);
		if(!checked){
			PrintWriter out = response.getWriter();
			if (!file.exists()) {				
				out.print("{failure:true}");
			}else{
				out.print("{failure:false}");
			}
			return;
		}
		
		response.setContentType("application/x-msdownload");
		response.setHeader("Content-Disposition", "attachment;filename="
				+ new String(fileName.getBytes("gb2312"), "iso8859-1"));
		ServletOutputStream out = response.getOutputStream();
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;

		bis = new BufferedInputStream(new FileInputStream(filePath));
		bos = new BufferedOutputStream(out);

		byte[] buff = new byte[2048];
		int bytesRead;
		while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
			bos.write(buff, 0, bytesRead);
		}
		if (bis != null) {
			bis.close();
		}
		if (bos != null) {
			bos.flush();
			bos.close();
		}

	}
}
