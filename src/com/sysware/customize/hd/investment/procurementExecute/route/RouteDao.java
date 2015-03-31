package com.sysware.customize.hd.investment.procurementExecute.route;
/*
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-23
 * 
 */
import java.util.List;

import com.luck.common.GenericDAO;

public interface RouteDao extends GenericDAO<Route> {
	/**
	 * 通过物资id获取路线卡
	 * @param route
	 */
	public Object[] getRoute(String itemId);
}
