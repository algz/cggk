package com.sysware.customize.hd.investment.procurementExecute.contract;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.sysware.util.StrUtil;

/**
 * 类注释
 * 
 * @author qinjie
 * @version 创建时间 2010-4-21 下午06:36:31
 * 
 */
public class FileUpload extends javax.servlet.http.HttpServlet implements
		javax.servlet.Servlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		String output = this.uploadFile(request);
		out.print(output);
		out.close();
	}

	public String uploadFile(HttpServletRequest request) {
		ServletFileUpload.isMultipartContent(request);
		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setHeaderEncoding("UTF-8");
		JSONObject obj = new JSONObject();
		InputStream is = null;
		InputStream fis = null;
		FileOutputStream os = null;
		try {
			is = this.getClass().getClassLoader().getResourceAsStream(
					"system.properties");
			Properties prop = new Properties();
			prop.load(is);
			String relativePath = prop.getProperty("contract_file_path")
					+ File.separatorChar;
			List items = upload.parseRequest(request);
			for (Iterator i = items.iterator(); i.hasNext();) {
				FileItem fi = (FileItem) i.next();
				String path = relativePath + File.separatorChar;
				File f = new File(path);
				if (!f.isDirectory()) {
					f.mkdirs();
				}
				String fileName = fi.getName();
				if (null == fileName) {
				} else {
					if (fileName.lastIndexOf(File.separatorChar) != -1) {
						fileName = fileName.substring(fileName
								.lastIndexOf(File.separatorChar) + 1);
					}
					String fileId = StrUtil.getGuid();
					String newFileName = StrUtil.trimAllBlank(fileName);

					StringBuffer temp = new StringBuffer(newFileName);
					String tempfileType = temp.reverse().toString()
							.split("\\.")[0];
					StringBuilder temp1 = new StringBuilder(tempfileType);
					String fileType = "." + temp1.reverse().toString();

					fis = fi.getInputStream();
					os = new FileOutputStream(path + fileId + fileType);

					byte[] buffer = new byte[1024];
					int len = 0;
					while ((len = fis.read(buffer)) != -1) {
						os.write(buffer, 0, len);
					}
					StringBuilder sb = new StringBuilder();
					sb.append(fileId);
					sb.append(fileType);
					obj.put("fileId", sb.toString());
					obj.put("fileName", newFileName);
					is.close();
					fis.close();
					os.close();
				}
			}

		} catch (FileUploadException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

		}
		obj.put("success", true);
		return obj.toString();
	}
}
