package com.luck.itumserv.base.user.service;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.sysware.db.DBAccess;
import com.sysware.message.MessageCollection;
import com.sysware.util.I18nManager;
import com.sysware.utils.SyswareUtil;

public class VerifiData {

	
	
	/**
	 * 0:代表数据库中存在相同的账号，1：代表数据库中存在相同的账号（处于删除状态），2：数据中没有该账号
	 * @param psLoginname 账号
	 * @return
	 */
	public int checkUser(String psLoginname ,MessageCollection message){
		
		String sql_loginName = "select t.loginname ,t.deleteflag from t_user t where t.loginname = '"+psLoginname+"'";
		
		List<Map<String, Object>> lstUser= DBAccess.doQueryForList(sql_loginName);
		
		if(!SyswareUtil.isEmpty(lstUser)){
			 if("1".equals(lstUser.get(0).get("deleteflag"))){
				 //message.addErrorMessage(""+I18nManager.getResource("20111205_param_272",psLoginname)/* 账号{0}在系统中已存在，请更改！ */);
				 return 0;
			 }else{
				 return 1;
			 }
		}
		return 2;
	}
	
	
	public void checkNameLength(String trueName, String loginName, MessageCollection message){
		if(SyswareUtil.isEmpty(trueName)){
			message.addErrorMessage("真实姓名不能为空！");
		}else if(trueName.length()>20){
			message.addErrorMessage("真实姓名不能超过20个字符！");
		}
		if(SyswareUtil.isEmpty(loginName)){
			message.addErrorMessage("登录名不能为空！");
		}else if(loginName.length()>20){
			message.addErrorMessage("登录名不能超过20个字符！");
		}
		
		
	}
	
	
	
	
	public Long checkRole(String psRolename  ,MessageCollection message){
		
		long roleid = 0L; 
		
		String sql_loginName = "select t.roleid from t_roles t where t.rolename = '"+psRolename+"'";
		
		List<Map<String, Object>> lstUser = DBAccess.doQueryForList(sql_loginName);
		
		if(!SyswareUtil.isEmpty(lstUser)){
			Object role = lstUser.get(0).get("roleid");
			roleid = Long.valueOf(role.toString());
		}else{
			message.addErrorMessage(""+I18nManager.getResource("20111205_param_273",psRolename)/* 你填写的角色名称（{0}在系统中不存在）*/);
		}
		return roleid;
	}
	
	public String checkOrg(String psOrgName  ,MessageCollection message){
		
		String depcode = null;
		
		String sql_loginName = "select t.depcode from t_departments t where t.departmentname = '"+psOrgName+"'";
		
		if(SyswareUtil.isEmpty(psOrgName)){
			message.addErrorMessage("文件中不能有机构名称为空的记录！");
		}else{
			List<Map<String, Object>> lstOrg = DBAccess.doQueryForList(sql_loginName);
			if(!SyswareUtil.isEmpty(lstOrg)){
				depcode = (String)lstOrg.get(0).get("depcode");
			}else{
				message.addErrorMessage(""+I18nManager.getResource("20111205_param_274",psOrgName)+""/* 你填写的机构名称（{0}在系统中不存在） */);
			}
		}
		
		return depcode;
	}
	
	
	/**
	 * 描述	   :校验导入的用户与系统的用户是否有重复
	 * @since  : 2013-1-21:下午02:16:18
	 * @author : admin
	 * @param lstMap
	 * @param message
	 */
	public void checkUserInfo(List<Map> lstMap ,MessageCollection message){
		for(int i=0;i<lstMap.size();i++){
			
			String loginname = (String) lstMap.get(i).get("loginname");
			
			for(int j= 0;j<lstMap.size();j++){
				if(i==j){
					continue;
				}else{
					if(!SyswareUtil.isEmpty(loginname)&&loginname.equals(lstMap.get(j).get("loginname"))){
						message.addErrorMessage(""+I18nManager.getResource("20111205_param_275",loginname)/* 导入文件中有重复的账号：{0} */);
						break;
					}
				}
			}
		}
	}
	
   private static final String Secu = ""+I18nManager.getResource("20111205_param_276")+","/* 密级1 密级2 密级3 密级4 密级5 */; // 密级6 密级7 密级8 密级9 密级10
   
   public void checkSecurityLevel(List<Map> lstMap ,MessageCollection message){
	   for(int i=0;i<lstMap.size();i++){
		   String securityL = (String)lstMap.get(i).get("securitydegree");
		   
		   if(SyswareUtil.isEmpty(lstMap.get(i)) || checkMapEmpty(lstMap.get(i))){
			   continue;
		   }
		   
		   if(!Secu.contains(securityL) || !securityL.startsWith(I18nManager.getResource("importuser_degree"))){
			   message.addErrorMessage(""+I18nManager.getResource("20111205_param_277")/* 用户密级应该在密级1~密级5之间，请检查 */+"");
			   break;
		   }
	   }
   }
	
   
   /**判断一个map是否为空 ，true 说明为空*/
   @SuppressWarnings("rawtypes")
  private boolean checkMapEmpty(Map map){
	   
	   boolean temp = true;
	   
	   Iterator iterator = map.entrySet().iterator();  
	   while(iterator.hasNext()){
		   Map.Entry entry = (Map.Entry)iterator.next();
		   String value = (String) entry.getValue();
		   if(null != value && value.trim().length()>0){
			   temp = false;
			   break;
		   }
	   }
	   return temp;
   }
   
   
   
   
   
   
   
	   /** 判断一个Map对象的值是否全为空
	 * @param pMap
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
   public   boolean isEmptyMap(Map pMap){
	   Iterator iteratorMap = pMap.entrySet().iterator();
	   while(iteratorMap.hasNext()){
		   Map.Entry<String,String> entry = (Map.Entry<String, String>)iteratorMap.next();
		   String value = entry.getValue();
		   if(!SyswareUtil.isEmpty(value)){
			   return false;
		   }
	   }
	   return true;
   }
   
	
	
	
   
}
