package com.sysware.customize.hd.investment.procurementExecute.route;
/*
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-23
 * 
 */
import java.util.List;

import org.jboss.seam.annotations.Name;

import com.luck.common.GenericDAOImpl;
@Name("routeDaoImpl")
public class RouteDaoImpl  extends GenericDAOImpl<Route> implements RouteDao{

	public Object[] getRoute(String itemId) {
		String sql = "select  tr.id as routeid ,tr.route_no,tr.route_name,tr.measurement,tr.hardness,tr.pulling from t_route tr where tr.item_id = '"+itemId+"'";
		List list  = createSqlQuery(sql).getResultList();
		if(list==null || list.size()==0)
			return null;
		else
			return (Object[]) list.get(0);
	}

}
