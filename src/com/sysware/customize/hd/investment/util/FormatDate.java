package com.sysware.customize.hd.investment.util;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class FormatDate {
	/**
	 * 判断时间格式是否为空,返回格式化sql date
	 * @param date
	 * @return yyyy-MM-dd hh:mm:ss
	 */
	public static String getSqlDate(Date date){
		//时间格式
		SimpleDateFormat theDate = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		if(date == null||date.toString() == ""||date.toString().equals("null")){
			return null;
		}else{
			return theDate.format(date).toString();
		}
	}
	
	/**
	 * 判断时间格式是否为空,返回格式化sql date 到日
	 * @param date
	 * @return yyyy-MM-dd hh:mm:ss
	 */
	public static String getSqlDateForDay(Date date){
		//时间格式
		SimpleDateFormat theDate = new SimpleDateFormat("yyyy-MM-dd");
		if(date == null||date.toString() == ""||date.toString().equals("null")){
			return null;
		}else{
			return theDate.format(date).toString();
		}
	}
	
	
	
	/**
	 * 按照输入的时间format来格式化时间
	 * @param s
	 * @param s1
	 * @return
	 */
	public static Date strToDate(String s, String s1) {
		SimpleDateFormat simpledateformat = new SimpleDateFormat(s1);
		Date date = new Date();
		if (s != null && !"".equals(s) && !"null".equals(s))
			try {
				date = simpledateformat.parse(s);
			} catch (ParseException parseexception) {
				parseexception.printStackTrace();
			}
		return date;
	}
	
	
	
	
	/**
	 * 获取当前年月日
	 */
	public static String getNowYMD(){
		Calendar now = Calendar.getInstance();
		/*
        System.out.println("年: " + now.get(Calendar.YEAR));  
        System.out.println("月: " + (now.get(Calendar.MONTH) + 1) + "");  
        System.out.println("日: " + now.get(Calendar.DAY_OF_MONTH));  
        System.out.println("时: " + now.get(Calendar.HOUR_OF_DAY));  
        System.out.println("分: " + now.get(Calendar.MINUTE));  
        System.out.println("秒: " + now.get(Calendar.SECOND));  
        System.out.println("当前时间毫秒数：" + now.getTimeInMillis());
        System.out.println(now.getTime());
        */
		String year = now.get(Calendar.YEAR)+"";
        String month = now.get(Calendar.MONTH) + 1 + "" ;
        if(Integer.valueOf(month) < 10){
        	month = "0".concat(month);
        }
        String day = String.valueOf(now.get(Calendar.DAY_OF_MONTH));
        if(Integer.valueOf(day) < 10){
        	day = "0".concat(day);
        }
        return year+"-"+month+"-"+day;
	}
}
