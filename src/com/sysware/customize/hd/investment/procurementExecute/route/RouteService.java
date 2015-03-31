package com.sysware.customize.hd.investment.procurementExecute.route;

import java.util.List;

/*
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-23
 * 
 */
public interface RouteService {
	/**
	 * 保存路线卡
	 * @param route
	 */
	public void saveRoute(Route route);
	/**
	 * 通过物资id获取路线卡
	 * @param route
	 */
	public Object[] getRoute(String itemId);
}
