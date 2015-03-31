package com.sysware.util;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.Properties;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

public class I18nManager {

	private static Map<String, Properties> map = new HashMap<String, Properties>();
	private static Properties javaProp = new Properties();
	private static Properties dbProp = new Properties();
	public static final String defaultLanguage = PropertiesUtil.loadProperties(
			"system.properties").getProperty("default_language");
	private static String currentLang = defaultLanguage;

	static {
		map.put("java_ja",
				PropertiesUtil.loadProperties("i18nResource_java_ja.properties"));
		map.put("java_zh",
				PropertiesUtil.loadProperties("i18nResource_java_zh.properties"));
		map.put("jsp_ja",
				PropertiesUtil.loadProperties("i18nResource_jsp_ja.properties"));
		map.put("jsp_zh",
				PropertiesUtil.loadProperties("i18nResource_jsp_zh.properties"));
		map.put("db_ja",
				PropertiesUtil.loadProperties("i18nResource_db_ja.properties"));
		map.put("db_re_ja",
				PropertiesUtil.loadProperties("i18nResource_db_re_ja.properties"));
		// map.put("js_ja", I18nManager
		// .loadProperties("i18nResource_js_ja.properties"));
		// map.put("js_zh", I18nManager
		// .loadProperties("i18nResource_js_zh.properties"));
	}

	public static void setLanguage(String lang, HttpServletRequest httpRequest) {
		if ("zh".equals(lang)&&httpRequest!=null) {
			httpRequest.getSession(true).setAttribute("extLang",
					"ext-lang-zh_CN_gb");
			httpRequest.getSession(true).setAttribute("gonggao-blue.gif",
					"gonggao-blue_zh.gif");
			httpRequest.getSession(true).setAttribute("huiyi-blue.gif",
					"huiyi-blue_zh.gif");
			httpRequest.getSession(true).setAttribute("login.jpg",
					"login_zh.jpg");
			httpRequest.getSession(true).setAttribute("P2M_title.jpg",
					"P2M_title_zh.jpg");
			httpRequest.getSession(true).setAttribute("title_p2m.jpg",
					"title_p2m_zh.jpg");
			httpRequest.getSession(true).setAttribute("xinwen-blue.gif",
					"xinwen-blue_zh.gif");
		} else if ("ja".equals(lang)&&httpRequest!=null) {
			httpRequest.getSession(true).setAttribute("extLang", "ext-lang-ja");
			httpRequest.getSession(true).setAttribute("gonggao-blue.gif",
					"gonggao-blue_ja.gif");
			httpRequest.getSession(true).setAttribute("huiyi-blue.gif",
					"huiyi-blue_ja.gif");
			httpRequest.getSession(true).setAttribute("login.jpg",
					"login_ja.jpg");
			httpRequest.getSession(true).setAttribute("P2M_title.jpg",
					"P2M_title_ja.jpg");
			httpRequest.getSession(true).setAttribute("title_p2m.jpg",
					"title_p2m_ja.jpg");
			httpRequest.getSession(true).setAttribute("xinwen-blue.gif",
					"xinwen-blue_ja.gif");
		}
		javaProp = map.get("java_" + lang);
		String jspLang = "jsp_" + defaultLanguage;
		if (javaProp == null) {
			javaProp = map.get("java_" + defaultLanguage);
			lang = defaultLanguage;
		} else {
			jspLang = "jsp_" + lang;
		}
		currentLang = lang;
		dbProp = map.get("db_" + lang);
		if(httpRequest!=null){
			for (Iterator iterator = map.get(jspLang).entrySet().iterator(); iterator
			.hasNext();) {
				Entry<String, String> entry = (Entry<String, String>) iterator
				.next();
				httpRequest.getSession(true).setAttribute(entry.getKey(),
						entry.getValue());
			}
		}
	}

	public static Properties getProp() {
		return javaProp;
	}

	public static String translateDbResource(String chineseResource) {
		return chineseResource;
		
//		if(chineseResource==null){
//			return null;
//		}
//		if (currentLang.equals("zh")) {
//			return chineseResource;
//		}
//		String prop = dbProp.getProperty(chineseResource);
//		return prop == null ? chineseResource : prop;
	}

	public static String translateToDbResource(String name) {
//		if (!currentLang.equals("zh")) {
//			String result = map.get("db_re_"+currentLang).getProperty(name);
//			return result==null?name:result;
//		}
		return name;
	}
	
	/** -------------------------------国际化测试----------------------------- */
	public static String byteToHex(byte b) {
		char hexDigit[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
				'a', 'b', 'c', 'd', 'e', 'f' };
		char[] array = { hexDigit[(b >> 4) & 0x0f], hexDigit[b & 0x0f] };
		return new String(array);
	}

	public static String charToHex(char c) {
		byte hi = (byte) (c >>> 8);
		byte lo = (byte) (c & 0xff);
		return "\\u" + byteToHex(hi) + byteToHex(lo);
	}

	public static String stringToHex(String src) {
		StringBuilder s = new StringBuilder();
		for (int i = 0; i < src.length(); i++) {
			char c = src.charAt(i);
			s.append(charToHex(c));
		}
		return s.toString();
	}

	public static void main(String[] args) throws UnsupportedEncodingException {
		Properties p = map.get("db_ja");
		Set<Object> keySet = p.keySet();
		for (Iterator iterator = keySet.iterator(); iterator.hasNext();) {
			String ss = (String) iterator.next();
			System.out.println(I18nManager.stringToHex(new String(ss
					.getBytes("ISO-8859-1"), "utf-8"))
					+ "="
					+ I18nManager.stringToHex(new String(p.getProperty(ss)
							.getBytes("ISO-8859-1"), "utf-8")));
		}
	}

	public static void main1(String[] args) {
		Properties resZh = map.get("js_zh");
		Properties resJa = map.get("js_ja");
		Map newMapZh = new HashMap();
		Map oldMapZh = new HashMap();
		for (Iterator iterator = resZh.keySet().iterator(); iterator.hasNext();) {
			String key = (String) iterator.next();
			String value = resZh.getProperty(key);
			if (key.startsWith("resourceParam_")) {
				newMapZh.put(key, value);
			} else {
				oldMapZh.put(key, value);
			}
		}
		Map newMapJa = new HashMap();
		Map oldMapJa = new HashMap();
		for (Iterator iterator = resJa.keySet().iterator(); iterator.hasNext();) {
			String key = (String) iterator.next();
			String value = resJa.getProperty(key);
			if (key.startsWith("resourceParam_")) {
				newMapJa.put(key, value);
			} else {
				oldMapJa.put(key, value);
			}
		}
		Map f = new HashMap();
		for (Iterator iterator = oldMapZh.keySet().iterator(); iterator
				.hasNext();) {
			String oldKey = (String) iterator.next();
			if (newMapZh.containsValue(oldMapZh.get(oldKey))) {
				for (Iterator iterator2 = newMapZh.entrySet().iterator(); iterator2
						.hasNext();) {
					Entry entry = (Entry) iterator2.next();
					if (entry.getValue().equals(oldMapZh.get(oldKey))) {
						f.put(oldKey, entry.getKey());
						// System.out.println(oldKey+" 替换为 "+entry.getKey());
					}
				}
			}
		}
		for (Iterator iterator = f.keySet().iterator(); iterator.hasNext();) {
			String s = (String) iterator.next();
			oldMapJa.put(s, newMapJa.get(f.get(s)));
		}
		for (Iterator iterator = resZh.entrySet().iterator(); iterator
				.hasNext();) {
			Entry entry = (Entry) iterator.next();
			// java jsp
			// System.out.println(entry.getKey()+"="+stringToHex(resJa.getProperty((String)
			// entry.getKey())));
			// js
			System.out.println("JsResource_ja['" + entry.getKey() + "'] = '"
					+ stringToHex(resJa.getProperty((String) entry.getKey()))
					+ "';");
		}
	}
	/** -------------------------------国际化测试----------------------------- */
	
	
	
	
	
	public static final int configNum = Integer
			.parseInt(PropertiesUtil.loadProperties("system.properties")
					.getProperty("i18n_config_num"));
	
	/**
	 * 获得国际化资源，并替换变量
	 * 
	 * @param code
	 * @param args
	 * @return
	 */
	public static String getResource(String code, Object... args) {
		if ("lang".equals(code)) {
			return defaultLanguage;
		}
		StringBuilder sb = new StringBuilder();
		String str = getValueInConfigs(code);
		if (args.length == 0) {
			return str;
		}
		Pattern p = Pattern.compile("\\{(\\d+)\\}");
		Matcher m = p.matcher(str);
		int beforeStart = 0;

		while (m.find()) {
			sb.append(str.substring(beforeStart, m.start()));
			sb.append(args[Integer.valueOf(m.group(1))].toString());
			beforeStart = m.end();
		}
		if (beforeStart < str.length()) {
			sb.append(str.substring(beforeStart, str.length()));
		}
		return sb.toString();
	}
	
	/**
	 * 循环配置文件从序号最大的开始，查找变量对应的词条。 如果找到则返回，如果都没找到则返回不带序号的默认配置文件中的词条
	 * 
	 * @param code
	 * @return
	 */
	public static String getValueInConfigs(String code) {
		try {
			for (int i = configNum; i > 0; i--) {
				Properties prop = map.get(defaultLanguage + "_" + i);
				String result = null;
				if (prop != null && (result = prop.getProperty(code)) != null) {
					return result;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map.get("jsp_zh").getProperty(code);
	}


}
