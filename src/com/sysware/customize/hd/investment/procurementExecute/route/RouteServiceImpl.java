package com.sysware.customize.hd.investment.procurementExecute.route;
/*
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-23
 * 
 */
import java.util.List;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.Transactional;

@Name("routeServiceImpl")
public class RouteServiceImpl implements RouteService{

	@In(value="routeDaoImpl",create = true)
	RouteDao routeDao;
	@Transactional
	public void saveRoute(Route route) {
		if(route.getRouteId()==null)
			routeDao.save(route);
		else
			routeDao.update(route);
	}
	public Object[] getRoute(String itemId) {
		return routeDao.getRoute(itemId);
	}

}
