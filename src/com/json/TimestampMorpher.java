package com.json;


import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import net.sf.ezmorph.object.AbstractObjectMorpher;

/**
 * TODO
 * Copyright    :www.sysware.com.cn
 * Company      :sysware Info. Ltd.
 * Created      :2011-5-26下午12:47:12
 * @author      :杨怀
 */
public class TimestampMorpher extends AbstractObjectMorpher {

	private static SimpleDateFormat s_sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public TimestampMorpher() {
	}

	@SuppressWarnings("rawtypes")
	public Class morphsTo() {
		return java.sql.Timestamp.class;
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
			return new Timestamp(date.getTime());
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}

	}
}
