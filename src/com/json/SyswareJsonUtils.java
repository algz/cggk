package com.json;


import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.JSONUtils;

import com.sysware.SyswareConstant;
import com.sysware.utils.SyswareUtil;
import com.sysware.utils.json.DateJsonValueProcessor;
import com.sysware.utils.json.SQLDateMorpher;
import com.sysware.utils.json.TimestampJsonValueProcessor;
import com.sysware.utils.json.TimestampMorpher;

/**
 * Json 格式字符串工具类
 * 实现 Json 格式字符串与Java数据对象之间的相互转换
 * Copyright    :www.sysware.com.cn
 * Company      :sysware Info. Ltd.
 * Created      :2011-5-26下午12:44:59
 * @author      :杨怀
 */
public class SyswareJsonUtils {

	static public class JsonMessage {
		
		private String _sMessage;
		
		public JsonMessage(String psMessage) {
			this._sMessage = psMessage;
		}
		
		public String getContent() {
			return this._sMessage;
		}
	}

	
	
	
	
	/**
	 * 用于封装以 root 为跟节点的 json 字符串对象
	 */
	static public class SyswareJsonData {
		
		/**
		 * 业务数据的集合对象
		 * 统一将所有数据转换为集合对象，对于非集合对象需要做转换
		 */
		@SuppressWarnings("rawtypes")
		private Collection _Datas;
		

		@SuppressWarnings({ "rawtypes", "unchecked" })
		private SyswareJsonData(Object pObject) {
			if (pObject instanceof Collection) {
				_Datas = (Collection) pObject;
			} else {
				_Datas = new ArrayList();
				_Datas.add(pObject);
			}
		}

		/**
		 * 提示信息的集合对象
		 */
		private Map<String, JsonMessage[]> _mapJsonMessages;

		/**
		 * @return 返回业务数据的跟节点
		 */
		@SuppressWarnings("rawtypes")
		public Collection getDatas() {
			return _Datas;
		}

		/**
		 * 提示信息的跟节点
		 * @return 返回不同类型的提示信息的集合
		 */
		public Map<String, JsonMessage[]> getMsg() {
			return _mapJsonMessages;
		}

		/**
		 * 记录总数
		 */
		public Integer getRecordCount() {
			if (SyswareUtil.isEmpty(_Datas)){
				return 0;
			}
			return _Datas.size();
		}
	}

	/**
	 * Json统一数据格式的封装对象
	 */
	private SyswareJsonData _jsonRoot;

	/**
	 * 统一返回json数据格式中的root节点
	 * @return
	 */
	public Object getRoot() {
		return _jsonRoot;
	}
	
	/**
	 * 为 Ext 的form 或Ajax返回的标识
	 * @return
	 * 
	 */
	public boolean getSuccess(){
		return true;
	}
	
	
	/**
	 * 返回总的信息个数 （包括错误信息、警告信息、提示信息），用于计算窗口的高度
	 * @return
	 */
	public int getMsgCount () {
		
		int iMsgCount = 0 ;
		
		if (!SyswareUtil.isEmpty(_jsonRoot._mapJsonMessages)) {

			if (_jsonRoot._mapJsonMessages.containsKey(SyswareConstant.Message.KEY_ERROR))
				iMsgCount += _jsonRoot._mapJsonMessages.get(SyswareConstant.Message.KEY_ERROR).length ;

			if (_jsonRoot._mapJsonMessages.containsKey(SyswareConstant.Message.KEY_WARN))
				iMsgCount += _jsonRoot._mapJsonMessages.get(SyswareConstant.Message.KEY_WARN).length ;

			if (_jsonRoot._mapJsonMessages.containsKey(SyswareConstant.Message.KEY_INFO))
				iMsgCount += _jsonRoot._mapJsonMessages.get(SyswareConstant.Message.KEY_INFO).length ;
		}
		return iMsgCount ;
		
		
		
	}

	/**
	 *  给定当前数据包操作标识状态， Error、Warn、Info。。。。
	 *  按照不同的信息级别做优先级处理
	 *  @return 返回当前操作结果的标识 
	 */
	public String getFlag() {
		if (!SyswareUtil.isEmpty(_jsonRoot._mapJsonMessages)) {
			if (_jsonRoot._mapJsonMessages.containsKey(SyswareConstant.Message.KEY_ERROR))
				return SyswareConstant.Message.KEY_ERROR;
			if (_jsonRoot._mapJsonMessages.containsKey(SyswareConstant.Message.KEY_WARN))
				return SyswareConstant.Message.KEY_WARN;
			if (_jsonRoot._mapJsonMessages.containsKey(SyswareConstant.Message.KEY_INFO))
				return SyswareConstant.Message.KEY_INFO;
		}
		return SyswareConstant.Message.KEY_NULL;
	}

	private SyswareJsonUtils(Object pObject) {
		this._jsonRoot = new SyswareJsonData(pObject);
	}
	
	private SyswareJsonUtils(Object pObject, Map<String, List<String>> pmapMessages ) {
		this._jsonRoot = new SyswareJsonData(pObject);
		addMessage(SyswareConstant.Message.KEY_ERROR, pmapMessages.get(SyswareConstant.Message.KEY_ERROR));
		addMessage(SyswareConstant.Message.KEY_WARN, pmapMessages.get(SyswareConstant.Message.KEY_WARN));
		addMessage(SyswareConstant.Message.KEY_INFO, pmapMessages.get(SyswareConstant.Message.KEY_INFO));
	}

	private SyswareJsonUtils(Object pObject, String[] paryErrors,String[] paryWarns, String[] paryMessages) {
		this._jsonRoot = new SyswareJsonData(pObject);
		addMessage(SyswareConstant.Message.KEY_ERROR, paryErrors);
		addMessage(SyswareConstant.Message.KEY_WARN, paryWarns);
		addMessage(SyswareConstant.Message.KEY_INFO, paryMessages);
	}

	private void addMessage(String psMessageType, String[] paryMessages) {
		if (SyswareUtil.isEmpty(paryMessages))
			return;
		if (this._jsonRoot._mapJsonMessages == null) {
			this._jsonRoot._mapJsonMessages = new HashMap<String, JsonMessage[]>();
		}
		JsonMessage[] aryJsonMessages = new JsonMessage[paryMessages.length];
		int index = 0;
		for (String sMessage : paryMessages) {
			aryJsonMessages[index] = new JsonMessage(sMessage);
			index++;
		}
		this._jsonRoot._mapJsonMessages.put(psMessageType, aryJsonMessages);
	}

	private void addMessage(String psMessageType, List<String> plstMessages) {
		if (SyswareUtil.isEmpty(plstMessages))
			return;
		if (this._jsonRoot._mapJsonMessages == null) {
			this._jsonRoot._mapJsonMessages = new HashMap<String, JsonMessage[]>();
		}
		JsonMessage[] aryJsonMessages = new JsonMessage[plstMessages.size()];
		int index = 0;
		for (String sMessage : plstMessages) {
			aryJsonMessages[index] = new JsonMessage(sMessage);
			index++;
		}
		this._jsonRoot._mapJsonMessages.put(psMessageType, aryJsonMessages);
	}

	
	/**
	 * 用于json 字符串转换为 java 对象的公共配置信息 
	 */
	private static JsonConfig s_JsonConfig = new JsonConfig();

	// 初始化基础配置信息
	static {
		s_JsonConfig.registerJsonValueProcessor(java.util.Date.class,new DateJsonValueProcessor());
		s_JsonConfig.registerJsonValueProcessor(java.sql.Date.class,new DateJsonValueProcessor());
		s_JsonConfig.registerJsonValueProcessor(java.sql.Timestamp.class,new TimestampJsonValueProcessor());
		s_JsonConfig.setArrayMode(JsonConfig.MODE_OBJECT_ARRAY);
		JSONUtils.getMorpherRegistry().registerMorpher(new SQLDateMorpher());
		JSONUtils.getMorpherRegistry().registerMorpher(new TimestampMorpher());
	}

	/**
	 * 将Object对象转换成Json字符串
	 * 如：{"root":{"recordCount":1,"datas":[{"sex":0,"age":0,"dateBirthday":null,"address":null,"name":"AAA"}]}}
	 * 有一个root的跟节点
	 * 有一个获取记录总数的 recordCount 属性，用于记录记录总数
	 * 有一个datas节点，保存所有的记录数据，如果为非集合对象，默认会先将数据转换为 List对象，然后转换；
	 * @param pObject --将要转换的对象
	 * @return 返回Json 数据格式俄字符串
	 * 
	 */
	public static String toJsonString(Object pObject) {

		SyswareJsonUtils json = new SyswareJsonUtils(pObject);

		JSONObject jObject = JSONObject.fromObject(json, s_JsonConfig.copy());

		return jObject.toString();
	}
	
	
	public static String toJsonErrorMessage(String... paryErrorMsg ) {
		return toJsonString(null, paryErrorMsg, null, null ) ;
	}
	
	public static String toJsonInfoMessage(String... paryInfoMsg ) {
		return toJsonString(null, null, null, paryInfoMsg ) ;
	}
	
	/**
	 * 将给定的 Java 对象转换给 Json 格式的字符串，同时包括一个提示信息集合
	 * @param pObject  需要转换为 json 字符串的java 对象
	 * @param pmapMessages 需要转换为 json 字符串的提示信息集合对象
	 * @return 转换后的json格式字符串对象
	 */
	public static String toJsonString(Object pObject, Map<String, List<String>> pmapMessages) {
		SyswareJsonUtils json = new SyswareJsonUtils(pObject, pmapMessages);
		JSONObject jObject = JSONObject.fromObject(json, s_JsonConfig.copy());
		return jObject.toString();
	}
	
	/**
	 * 
	 * 将给定的 java 对象转换为json格式的字符串，同时包括不同类型的提示信息集合对象
	 * @param pObject 需要转换为 json 格式字符串的 java 对象 
	 * @param paryErrors  需要转换为 json 格式的错误提示信息集合
	 * @param paryWarns 需要转换为 json 格式的警告提示信息集合
	 * @param paryMessages 需要转换为 json 格式的提示信息集合
	 * @return 转换后的 json 格式的字符串对象
	 */
	public static String toJsonString(Object pObject, String[] paryErrors,String[] paryWarns, String[] paryMessages) {
		SyswareJsonUtils json = new SyswareJsonUtils(pObject, paryErrors, paryWarns,paryMessages);
		JSONObject jObject = JSONObject.fromObject(json, s_JsonConfig.copy());
		return jObject.toString();
	}

	/**
	 * 将Object对象转换成Json字符串
	 * 如：{"root":{"recordCount":1,"datas":[{"sex":0,"age":0,"dateBirthday":null,"address":null,"name":"AAA"}]}}
	 * 有一个root的跟节点
	 * 有一个获取记录总数的 recordCount 属性，用于记录记录总数
	 * 有一个datas节点，保存所有的记录数据，如果为非集合对象，默认会先将数据转换为 List对象，然后转换；
	 * @param pObject --  将要转换为 json 字符串的 java 对象
	 * @param pIsUseRootNote 如果为true 表示使用统一标识的root节点，反之只转换数据对象
	 * @return 返回Json 数据格式俄字符串
	 */
	public static String toJsonString(Object pObject, boolean pIsUseRootNote) {
		if (pIsUseRootNote)
			return toJsonString(pObject);
		if (pObject instanceof Object[]) {
			return JSONArray.fromObject(pObject, s_JsonConfig).toString();
		} else {
			return JSONObject.fromObject(pObject, s_JsonConfig).toString();
		}
	}

	/**
	 * 将 json 字符串转换指定的java对象
	 * @param <T> json 字符串转换为 java 对象的目标类型
	 * @param jsonString 需要转换为 java 对象的json 字符串 
	 * @param pJavaBeanClass 转换为java对象的目标类 
	 * @return 返回转换后的java 数据对象
	 */
	@SuppressWarnings("unchecked")
	public static <T> T toJavaObject(String jsonString, Class<T> pJavaBeanClass) {
		JSONObject jsonObj = JSONObject.fromObject(jsonString);
		JsonConfig jsonConfig = s_JsonConfig.copy();
		jsonConfig.setRootClass(pJavaBeanClass);
		T retObject = (T) JSONObject.toBean(jsonObj, jsonConfig );
		return retObject;
	}

	/**
	 * 将 json 字符串对象转换指定的java对象的数组
	 * @param <T> json 字符串转换为java 对象的目标类型
	 * @param jsonArrayString 需要转换为 java 数组类型的 json 字符串 （数组类型的字符串）
	 * @param pJavaBeanClass 转换目标类
	 * @return 返回转换后的目标类数组实例
	 */
	public static <T> T[] toJavaArray(String jsonArrayString,Class<T> pJavaBeanClass) {
		return toJavaArray(jsonArrayString, pJavaBeanClass, null);
	}

	/**
	 * 
	 * 将 json 字符串对象转换指定的java对象的数组
	 * @param <T> json 字符串转换为java 对象的目标类型
	 * @param jsonArrayString  json 字符串对象
	 * @param pJavaBeanClass 转换目标java类
	 * @return   返回转换后的目标类数组实例
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static <T> T[] toJavaArray(String jsonArrayString,Class<T> pJavaBeanClass, Map pClassMapping) {
		JSONArray jsonArray = JSONArray.fromObject(jsonArrayString,s_JsonConfig.copy());
		JsonConfig jsonConfig = s_JsonConfig.copy();
		jsonConfig.setRootClass(pJavaBeanClass);
		jsonConfig.setClassMap(pClassMapping);
		T[] aryReturn = (T[]) JSONArray.toArray(jsonArray, jsonConfig);
		return aryReturn;
	}

	
	
	/**
	 * 将 json 字符串对象转换指定的java对象
	 * @param <T> 转换后的目标类型
	 * @param jsonString 需要转换的json 字符串对象 
	 * @param pJavaBeanClass 转换的目标类
	 * @return 转换后的目标类数据对象
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static <T> T toJavaObject(String jsonString,Class<T> pJavaBeanClass, Map<String, Class> pClassMap) {
		JSONObject jsonObj = JSONObject.fromObject(jsonString);
		JsonConfig jsonConfig = s_JsonConfig.copy();
		jsonConfig.setRootClass(pJavaBeanClass);
		jsonConfig.setClassMap(pClassMap);
		T retObject = (T) JSONObject.toBean(jsonObj, jsonConfig);
		return retObject;
	}

	
	
	
	public static void main(String[] args) {
		Map map = new HashMap();
		map.put("a", "dd");
		
		System.out.println(SyswareJsonUtils.toJsonString(map));;
	}
	
}
