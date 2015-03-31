package com.sysware.customize.hd.investment.roles;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import jxl.Workbook;
import net.sf.json.JSONObject;

import org.apache.commons.fileupload.FileUploadException;
import org.jboss.seam.Component;
import org.jboss.seam.contexts.Lifecycle;

import com.luck.itumserv.base.role.RoleSerivce;
import com.sysware.customize.hd.investment.baseData.material.Material;
import com.sysware.customize.hd.investment.baseData.material.MaterialService;
import com.sysware.customize.hd.investment.general.ExcelFileUploadServlet;
import com.sysware.customize.hd.investment.general.ImportExcelVo;
import com.sysware.customize.hd.investment.general.exception.ImportExcelFileException;

public class RoleUploadServlet extends ExcelFileUploadServlet {
	private static final long serialVersionUID = 1L;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	protected List processWorkbook(Workbook workbook, Map formField,HttpServletRequest req)
			throws FileUploadException {
		// 获取seam的上下文对象
		Lifecycle.beginCall();
		RoleUploadService roleUploadService = (RoleUploadService) Component
				.getInstance("roleUploadService", true);// 获取MaterialService实例
		roleUploadService.batchAddRoles(workbook);
		Lifecycle.endCall();
		return null;
	}

}
