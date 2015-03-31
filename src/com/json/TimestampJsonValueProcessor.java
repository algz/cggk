package com.json;


import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;


/**
 * Copyright    :www.sysware.com.cn
 * Company      :sysware Info. Ltd.
 * Created      :2011-5-26下午12:46:59
 * @author      :杨怀
 */
public class TimestampJsonValueProcessor implements JsonValueProcessor {   
	
    public static final String DEFAULT_DATE_PATTERN = "yyyy-MM-dd HH:mm:ss";   
    
    private DateFormat dateFormat;   
    
    
    /**  
     * 构造方法.  
     * @param datePattern 日期时间格式  
     */  
    public TimestampJsonValueProcessor() {   
           dateFormat = new SimpleDateFormat(DEFAULT_DATE_PATTERN);   
    }   
  
    /**  
     * 构造方法.  
     *  
     * @param datePattern 日期时间格式  
     */  
    public TimestampJsonValueProcessor(String datePattern) {   
        try {   
            dateFormat = new SimpleDateFormat(datePattern);   
        } catch (Exception ex) {   
            dateFormat = new SimpleDateFormat(DEFAULT_DATE_PATTERN);   
        }   
    }   
  
    public Object processArrayValue(Object value, JsonConfig jsonConfig) {   
    	if ( value == null )
    		return null;
        return process(value);   
    }   
  
    public Object processObjectValue(String key, Object value,JsonConfig jsonConfig) {   
    	if ( value == null )
    		return null;
        return process(value);   
    }   
  
    private Object process(Object value) {   
        return dateFormat.format((Timestamp) value);   
    }   
}  

