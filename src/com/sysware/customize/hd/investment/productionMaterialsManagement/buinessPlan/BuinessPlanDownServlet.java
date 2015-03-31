package com.sysware.customize.hd.investment.productionMaterialsManagement.buinessPlan;

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

public class BuinessPlanDownServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
        String filename="";
		if(request.getParameter("plantype").equals("1")){//[1, '预拨计划'],[2, '调整计划'],[3,'临批计划'
        	filename="年度预拨计划导入模板.xls";
        }else{
        	filename="年度调整／临批计划导入模板.xls";
        }
		String filePath = request.getSession().getServletContext().getRealPath("")+ File.separator+ "template.files"+ File.separator+ "buinessPlanImport" + File.separator + filename;
		response.reset();
		response.setCharacterEncoding("UTF-8");

		File file = new File(filePath);
		if (!file.exists()) {
			PrintWriter out = response.getWriter();
			out.print("{failure:true}");
			return;
		}

		response.setContentType("application/x-msdownload");
		response.setHeader("Content-Disposition", "attachment;filename="+ new String(file.getName().getBytes("gb2312"), "iso8859-1"));
		ServletOutputStream out = response.getOutputStream();
		BufferedInputStream bis = new BufferedInputStream(new FileInputStream(filePath));
		BufferedOutputStream bos = new BufferedOutputStream(out);

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
