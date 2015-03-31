package com.sysware.customize.hd.investment.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * 获取通用飞工具类
 * @author zhoup
 * 2012-5-14 下午4:55:32
 *
 */
public class UtilForHD {

	/**
	 * 通过获取当前时间和多位随机数来组织编号
	 * @return
	 */
	public static String GetNowTimeForId(){
		//获取当前时间
		Date date =new Date();
//		SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");//完整的时间
		SimpleDateFormat sdf =new SimpleDateFormat("yyyyMMddHHmmssSSS");//完整的时间
		String time=sdf.format(date); 
		//获取多位随机字符
		//定义要显示多少位随机数
		int length = 23;
		StringBuffer buffer=new StringBuffer("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
		StringBuffer sb=new StringBuffer();
		Random r=new Random();
		int range=buffer.length();
		for(int i=0;i<length;i++){
			sb.append(buffer.charAt(r.nextInt(range)));
		}
		return time+sb.toString();
	}
	
	/**
	 * 获得当前的时间字符串
	 * @return
	 */
	public static String GetNowTime(){
		//获取当前时间
		Date date =new Date();
//		SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");//完整的时间
		SimpleDateFormat sdf =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//完整的时间
		String time=sdf.format(date); 
		return time;
	}
	
	/**
	 * 判断当前传入的值是否为空
	 * @param str
	 * @return
	 */
	public static boolean IsStrEmpty(String str) {
		if ("".equals(str) || null == str) {
			return false;
		} else {
			return true;
		}
	}
}
