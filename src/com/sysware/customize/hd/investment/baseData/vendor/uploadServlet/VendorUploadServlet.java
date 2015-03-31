package com.sysware.customize.hd.investment.baseData.vendor.uploadServlet;

import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import jxl.Workbook;

import org.apache.commons.fileupload.FileUploadException;
import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;

import com.sysware.customize.hd.investment.baseData.vendor.Vendor;
import com.sysware.customize.hd.investment.baseData.vendor.VendorService;
import com.sysware.customize.hd.investment.general.ExcelFileUploadServlet;

/**
 * 通过Excel导入供应商信息
 * 
 * @author tianlin
 * @version 1.0
 * @create 2011-07-25
 * 
 */
public class VendorUploadServlet extends ExcelFileUploadServlet {

	private static final long serialVersionUID = -3410011661118439100L;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	protected List<Vendor> processWorkbook(Workbook workbook, Map formField,HttpServletRequest req) throws FileUploadException {
		// 获取seam的上下文对象
		Lifecycle.beginCall();
		VendorService vendorService = (VendorService) Component.getInstance(
				"vendor_VendorServiceImpl", true);
		List<Vendor> redupVendors = vendorService.batchAddVendor(workbook,getLoginUserId(req));
		Lifecycle.endCall();
		return redupVendors;
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
