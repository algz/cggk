package com.sysware.customize.hd.investment.extport;

import javax.servlet.http.HttpServletRequest;

public interface ExportExcelDao {
	 /**
	  * response 获取参数的对象
	  * @return
	  */
    public String ExportExcel(HttpServletRequest request);
}
