package com.sysware.customize.hd.investment.procurementExecute.route;
/*
 * @author zhaodw
 * @version 1.0
 * @create 2011-11-23
 * 
 */
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.Date;

import net.sf.json.JSONObject;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.BigDecimalConverter;
import org.apache.commons.beanutils.converters.DateConverter;
import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.sun.org.apache.commons.beanutils.BeanUtils;

@Name("routeRemote")
public class RouteRemote {
	static {
		ConvertUtils.register(new BigDecimalConverter(Double.valueOf(0)), BigDecimal.class);
		DateConverter dateConverter = new DateConverter();
		dateConverter.setPattern("yyyy-MM-dd");
		ConvertUtils.register(dateConverter, Date.class);
		ConvertUtils.register(dateConverter, String.class);
	}
	@In(value="routeServiceImpl",create=true)
	private RouteService routeServiceImpl;
	@WebRemote
	public String saveRoute(RouteVo vo) throws IllegalAccessException, InvocationTargetException{
		Route route = new Route();
		BeanUtils.copyProperties(route, vo);
		routeServiceImpl.saveRoute(route);
		return "{success:true}";
	} 
	@WebRemote
	public String getRoute(RouteVo vo){
		Object[] ob = routeServiceImpl.getRoute(vo.getItemId());
		if(ob!=null){
			vo.setRouteId(ob[0]==null?"":ob[0].toString());
			vo.setRouteNo(ob[1]==null?"":ob[1].toString());
			vo.setRouteName(ob[2]==null?"":ob[2].toString());
			vo.setMeasurement(ob[3]==null?'0':ob[3].toString().charAt(0));
			vo.setHardness(ob[4]==null?'0':ob[4].toString().charAt(0));
			vo.setPulling(ob[5]==null?'0':ob[5].toString().toString().charAt(0));
		}else{
			vo.setMeasurement('0');
			vo.setHardness('0');
			vo.setPulling('0');
		}
		JSONObject obj = new JSONObject();
		obj.element("success", true).element("data",
				JSONObject.fromObject(vo));
		return obj.toString();
	}
}
