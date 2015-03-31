package com.sysware.customize.hd.investment.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.sysware.utils.json.DateJsonValueProcessor;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

public class JsonUtil {

	/**    
	95.      * 从一个JSON数组得到一个java对象集合    
	96.      * @param object    
	97.      * @param clazz    
	98.      * @return    
	99.      */     
	public static List getDTOList(String jsonString, Class clazz){ 
	      
//		setDataFormat2JAVA();
		JsonConfig config = new JsonConfig();  
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor("yyyy-MM-dd"));  

		JSONArray array = JSONArray.fromObject(jsonString,config); 
		List list = new ArrayList();
		for(Iterator<Object> iter = array.iterator(); iter.hasNext();){
			JSONObject jsonObject = (JSONObject)iter.next();
			list.add(JSONObject.toBean(jsonObject, clazz)); 
		}   
		return list;
	}
	
	public static String mapToJson(Map<String, String> map){
		return JSONObject.fromObject(map).toString();
	}
}
