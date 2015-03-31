package com.sysware.customize.hd.investment.extport;

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

import com.sysware.customize.hd.investment.productionMaterialsManagement.contract.ProcurementContractService;
import com.sysware.util.PropertiesHelper;

public class ExportExcelServlet extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6136616731788433169L;

	public void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException,IOException{
	    this.doPost(request, response);
	}
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException,IOException{ 
		    String name = request.getParameter("fileName");
			// 获取seam的上下文对象
			Lifecycle.beginCall();
			ExportExcelService exportExcelService = (ExportExcelService) Component.getInstance("exportExcelServiceImpl", true);
	       
			String filePath = exportExcelService.ExportExcel(request); 
			Lifecycle.endCall(); 
			response.reset();
			response.setCharacterEncoding("UTF-8"); 
			response.setContentType("application/x-msdownload"); 
			name = new String(name.getBytes("iso8859-1"),"UTF-8")+filePath.substring(filePath.lastIndexOf("."));
			response.setHeader("Content-disposition","attachment; filename="+ new String(name.getBytes("gb2312"),"iso8859-1"));

			ServletOutputStream out1 = response.getOutputStream();
			BufferedInputStream bis = null;
			BufferedOutputStream bos = null;

			bis = new BufferedInputStream(new FileInputStream(filePath));
			bos = new BufferedOutputStream(out1);

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
