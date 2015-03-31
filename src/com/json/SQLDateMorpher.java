package com.json;


import java.text.ParseException;
import java.text.SimpleDateFormat;

import net.sf.ezmorph.object.AbstractObjectMorpher;

/**
 * Copyright    :www.sysware.com.cn
 * Company      :sysware Info. Ltd.
 * Created      :2011-5-26上午10:31:42
 * @author      :杨怀
 */
public class SQLDateMorpher extends AbstractObjectMorpher {

	private static SimpleDateFormat s_sdf = new SimpleDateFormat("yyyy-MM-dd");

	/**
	 * @param formats a list of formats this morpher supports.
	 */
	public SQLDateMorpher() {

	}

	@SuppressWarnings("rawtypes")
	public Class morphsTo() {
		return java.sql.Date.class;
	}

	@SuppressWarnings("rawtypes")
	public boolean supports(Class clazz) {
		return String.class.isAssignableFrom(clazz);
	}

	
	public Object morph(Object pObj) {
		if (pObj == null){
			return null;
		}
		java.util.Date date;
		try {
			date = s_sdf.parse((String) pObj);
			return new java.sql.Date(date.getTime());
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
}
