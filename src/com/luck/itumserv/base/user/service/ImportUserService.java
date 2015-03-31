package com.luck.itumserv.base.user.service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

import org.jboss.seam.Component;
import org.jboss.seam.annotations.Name;

import com.sysware.core.operationLog.OperationLogConstants;
import com.sysware.core.operationLog.OperationLogServiceImpl;
import sun.misc.BASE64Encoder;
 
import com.sysware.core.operationLog.SaveOperationLogVo;
import com.sysware.db.DBAccess;
import com.sysware.db.TransactionDBAccess;
import com.sysware.exception.SWRuntimeException;
import com.sysware.message.MessageCollection;
import com.sysware.util.ChangeZhongWenToPinYin;
import com.sysware.util.I18nManager;
import com.sysware.utils.SyswareUtil;

import flex.messaging.io.ArrayList;

@Name("importUserService")
public class ImportUserService {

	private String sql_addUser = "insert into t_user ( userid, loginname, truename, password, instcode, professional,  pinyinname, accountstate, deleteflag, securitydegree)" +
                                            "  values(:userid,:loginname,:truename,:password,:instcode,:professional,:pinyinname,:accountstate,:deleteflag,:securitydegree)";
	
	
	private String sql_selectUserByLoginName = "select t.userid from t_user t where t.loginname=:loginname";
	
	private String sql_getLevelByname= "select t.itemid as itemid from t_groups t where t.itemcode = 'SecurityDegree' and t.itemname=:securitydegree";
	
	private String SQL_UPDATEUSER ="update t_user t set t.truename=:truename, t.password=:password, t.instcode=:instcode, t.professional=:professional,  t.pinyinname=:pinyinname, t.accountstate=:accountstate, t.deleteflag=:deleteflag, t.securitydegree=:securitydegree where t.loginname=:loginname";
	
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public  String importUser(List<Map> mapDate){
		
		VerifiData vilidate = new VerifiData();
		
		//sql语句条数
		int sql_size = 0;
		
		MessageCollection message = new MessageCollection();
		
		for(int i=0;i<mapDate.size();i++){
			Map map = mapDate.get(i);
			boolean isEmpty = vilidate.isEmptyMap(map);
			if(!isEmpty){
				++sql_size;
			}
		}
		
		List<Map> listValue = new ArrayList();
		
		String[] arySql = new String[sql_size];
		List<String> lstSQL = new ArrayList();
		
		
		MessageCollection msg = new MessageCollection();
		
		//校验excel文件中的账号不要有重复
		vilidate.checkUserInfo(mapDate,message);
		//检查密级
		vilidate.checkSecurityLevel(mapDate,message);
		
		int i = 0;
		for(Map map : mapDate){
			
			if(vilidate.isEmptyMap(map)){
				continue;
			}
			
			Long userId = DBAccess.getSEQKey("Seq_User");
			map.put("userid",userId);
			map.put("accountstate",0L);
			map.put("deleteflag","1");
			map.put("pinyinname",ChangeZhongWenToPinYin.getPinYin((String)map.get("truename")));
			map.put("password",encoderByMD5("123456"));
			//验证机构是否存在
			String instcode = vilidate.checkOrg((String) map.get("instcodeName"), message);
			map.put("instcode",instcode);
			
			//校验真实姓名、登录名是否超过长度
			vilidate.checkNameLength((String)map.get("truename"),(String)map.get("loginname"),message);
			
			//从表中查询密级对应的编码
			List<Map<String, Object>> lstSecuritydegree = DBAccess.doQueryForList(sql_getLevelByname, map);
			if(!SyswareUtil.isEmpty(lstSecuritydegree)){
				Object securitydegree = lstSecuritydegree.get(0).get("ITEMID");
				map.put("securitydegree", securitydegree);
			}
			
			//校验账号不能重复(如果账号重复，且处于删除状态，那么就更新)
			int update_dele_flag = vilidate.checkUser((String) map.get("loginname"), message);
			if(0 == update_dele_flag){
				continue;
			}
			if(1==update_dele_flag){
				//arySql[i] = SQL_UPDATEUSER;
				lstSQL.add(SQL_UPDATEUSER);
				
				List<Map<String, Object>> mapUserId = DBAccess.doQueryForList(sql_selectUserByLoginName, map);
				if(!SyswareUtil.isEmpty(mapUserId)){
					userId = ((BigDecimal)mapUserId.get(0).get("userid")).longValue();
				}
			}
			if(2==update_dele_flag){
				lstSQL.add(sql_addUser);
				//arySql[i] = sql_addUser;
			}
			
			listValue.add(map);
			 
			++i;
		}
		
		
		
//		if(SyswareUtil.isEmpty(listValue)){
//			message.addErrorMessage(""+I18nManager.getResource("20111205_param_270")/* 请填入有效数据 */+"!");
//		}
		String[] arySQL = new String[lstSQL.size()];
		for(int m =0;m<lstSQL.size();m++){
			arySQL[m] = lstSQL.get(m);
		}
		
		if(message.size()==0){
			 try {
				//进行事物控制
				 TransactionDBAccess.doExecute(arySQL, listValue);
				 message.addInfoMessage(""+I18nManager.getResource("20111205_param_271")/* 用户信息导入成功！ */+"");
				 
				 OperationLogServiceImpl operationLogServiceImpl= (OperationLogServiceImpl)Component.getInstance("operationLogServiceImpl");
				 for(Map map:listValue){
					 	String loginname =(String)map.get("truename");
					 	SaveOperationLogVo v = new SaveOperationLogVo();
						v.setObjectName(loginname);
						/*if(!SyswareUtil.isEmpty(map.get("securitydegree"))){
							v.setObjectSecurity(Long.valueOf(map.get("securitydegree").toString()));
						}*/
						v.setObjectType("用户");
						v.setLogLevel(OperationLogConstants.LOG_LEVEL_1);
						v.setModuleType(OperationLogConstants.MODULE_TYPE_SYSTEM);
						v.setOperationType("导入用户");
						v.setOperationResult(OperationLogConstants.OPERATION_RESULT_SUCCESS);
						operationLogServiceImpl.saveOperationLog(v);
				 }
				 
			} catch (SWRuntimeException e) {
				message.addErrorMessage(e.getMessage());
				OperationLogServiceImpl operationLogServiceImpl= (OperationLogServiceImpl)Component.getInstance("operationLogServiceImpl");
				for(Map map:listValue){
				 	String loginname =(String)map.get("truename");
				 	SaveOperationLogVo v = new SaveOperationLogVo();
				 	if(!SyswareUtil.isEmpty(map.get("securitydegree"))){
						v.setObjectSecurity(Long.valueOf(map.get("securitydegree").toString()));
					}
					v.setObjectSecurity((Long)map.get("securitydegree"));
					v.setObjectType("用户");
					v.setLogLevel(OperationLogConstants.LOG_LEVEL_1);
					v.setModuleType(OperationLogConstants.MODULE_TYPE_SYSTEM);
					v.setOperationType("导入用户");
					v.setOperationResult(OperationLogConstants.OPERATION_RESULT_FAILURE);
					operationLogServiceImpl.saveOperationLog(v);
					message.addErrorMessage(e.getMessage());
				 }
			}
		 } 
		String messageInfo = com.json.SyswareJsonUtils.toJsonString(null,message);
		
		return messageInfo;
	}
	
	
	public String encoderByMD5(String str) {
		String newstr = "";
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			BASE64Encoder base = new BASE64Encoder();
			newstr = base.encode(md5.digest(str.getBytes("UTF-8")));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return newstr;
	}
	
}
