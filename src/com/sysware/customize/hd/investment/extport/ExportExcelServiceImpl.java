package com.sysware.customize.hd.investment.extport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("exportExcelServiceImpl")
public class ExportExcelServiceImpl implements ExportExcelService {

	@In(value="exportExcelDaoImpl",create = true)
	ExportExcelDao exportExcelDaoImpl;
	public String ExportExcel(HttpServletRequest request) {
		return exportExcelDaoImpl.ExportExcel(request);
	}

}
