package com.sysware.customize.hd.investment.extport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface ExportExcelService {
	 /**
	  * request 获取参数的对象
	  * @return
	  */
     public String ExportExcel(HttpServletRequest request);
}
