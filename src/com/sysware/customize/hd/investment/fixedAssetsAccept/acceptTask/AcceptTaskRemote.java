package com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTask;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;
import org.jboss.seam.web.ServletContexts;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.common.JsonUtil;
import com.luck.itumserv.services.security.Identity;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("AcceptTaskRemote")
public class AcceptTaskRemote {

	@In(create=true,value="AcceptTaskServiceImpl")
	private AcceptTaskServiceImpl service;
	
	//获得登录的用户信息
	@In(create = true, value = "org.jboss.seam.security.identity")
	private Identity identity;
	
	/**
	 * 获取验收任务信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getAcceptTask(AcceptTaskVo vo){
		GridData<AcceptTaskVo> data = new GridData<AcceptTaskVo>();
		data.setResults(service.getAcceptTask(vo));
		data.setTotalProperty(service.getAcceptTaskCount(vo));
		String dataJson = JsonUtil.toJsonStr(data);
		return dataJson;
	}
	
	/**
	 * 根据项目id获取验收任务信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getAcceptTaskById(AcceptTaskVo vo){
		GridData<AcceptTaskVo> data = new GridData<AcceptTaskVo>();
		HttpServletRequest request = ServletContexts.getInstance().getRequest();
		String pid = request.getParameter("pid");
		data.setResults(service.getAcceptTaskById(pid));
		String dataJson = JsonUtil.toJsonStr(data);
		return dataJson;
	}
	
	/**
	 * 保存任务
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String insertAcceptTask(AcceptTaskVo vo){
		JSONObject obj = new JSONObject();
		//赋值
		AcceptTask task = new AcceptTask();
		
		//判断是否需要给唯一标识编号赋值
		if(vo.getAcceptId()==""||vo.getAcceptId()==null)
			task.setAcceptId(UtilForHD.GetNowTimeForId());
		else
			task.setAcceptId(vo.getAcceptId());
		
		task.setAcceptNum(vo.getContractId());
		task.setContractId(vo.getAcceptNum());
		task.setAcceptType(vo.getAcceptType());
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			task.setAcceptTime(sdf.parse(vo.getAcceptTime()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		//根据不同的项目类型，状态起点不同
		if(vo.getAcceptType()==1)
			task.setAcceptState(1);
		else
			task.setAcceptState(7);
		if(vo.getProjectcategorys().equals("新建")){
			task.setProjectcategorys("1");	
		}else{
			task.setProjectcategorys("2");
		}
		task.setAcceptNote(vo.getAcceptNote());
		task.setAcceptCreatePeopel(identity.getLoginUser().getUserid().toString());
		
		service.insertAcceptTask(task);
		//form提交只能返回json格式的数据
		obj.put("success", "success");
		return obj.toString();
	}
	
	/**
	 * 根据编号查询任务
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getOneAcceptTask(AcceptTaskVo vo){
		JSONObject obj = new JSONObject();
		AcceptTask acceptTask = service.getOneAcceptTask(vo);
		if(acceptTask!=null){
			//获取当前实体（反射）
			Class<?> clz = acceptTask.getClass();
			// 获取实体类的所有属性，返回Field数组  
			Field[] fields = clz.getDeclaredFields();
			for (Field field : fields) {
				try {
					//将首字母做大小写转换组合成一个实体的GET方法获取值
					Method m = (Method)acceptTask.getClass().getMethod("get"+field.getName().substring(0, 1).toUpperCase()+field.getName().substring(1));
//				System.out.println(field.getGenericType()+"|"+m.invoke(acceptTask));
					if(m.invoke(acceptTask)!=null){
						//处理时间类型
						if(field.getGenericType().toString().equals("class java.util.Date")){
							if(UtilForHD.IsStrEmpty(m.invoke(acceptTask).toString()))
								obj.put(field.getName(), m.invoke(acceptTask).toString().substring(0, 10));
							else
								obj.put(field.getName(), "");
						}else{
							obj.put(field.getName(), m.invoke(acceptTask).toString());
						}
					}else
						obj.put(field.getName(), "");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			obj.put("success", "true");
		}else{
			obj.put("success", "false");
		}
		return obj.toString();
	}
	
	/**
	 * 修改状态
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String updateAcceptTaskSatate(AcceptTaskVo vo){
		JSONObject obj = new JSONObject();
		service.updateAcceptTaskSatate(vo.getAcceptIds(), vo.getAcceptState());
		obj.put("success", "success");
		return obj.toString();
	}
	
	/**
	 * 获取项目进度天数信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getProjectPlan(AcceptTaskVo vo){
		return service.getProjectPlan(vo);
	}
	
	/**
	 * 根据合同唯一标识获取合同编号
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getContractCode(AcceptTaskVo vo){
		return service.getContractCode(vo);
	}
}
