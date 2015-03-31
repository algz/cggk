package com.sysware.customize.hd.investment.fixedAssetsAccept.fixCondition;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.List;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.luck.itumserv.common.GridData;
import com.luck.itumserv.common.JsonUtil;
import com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTask.AcceptTaskServiceImpl;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("FixConditionRemote")
public class FixConditionRemote {

	@In(create=true,value="FixConditionServiceImpl")
	private FixConditionService service;
	
	@In(create=true,value="AcceptTaskServiceImpl")
	private AcceptTaskServiceImpl aService;
	
	/**
	 * 根据输入内容获取部门信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getDepList(FixConditionVo vo){
		GridData<FixConditionVo> data = new GridData<FixConditionVo>();
		data.setResults(service.getDepList(vo));
		data.setTotalProperty(service.getDepListCount(vo));
		return JsonUtil.toJsonStr(data);
	}
	
	/**
	 * 根据输入内容获取供应商信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getVendorList(FixConditionVo vo){
		GridData<FixConditionVo> data = new GridData<FixConditionVo>();
		data.setResults(service.getVendorList(vo));
		data.setTotalProperty(service.getVendorListCount(vo));
		return JsonUtil.toJsonStr(data);
	}
	
	/**
	 * 添加一条安装条件准备任务到数据库
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String insertFixCondition(FixConditionVo vo){
		JSONObject obj = new JSONObject();
		FixCondition fixCondition = new FixCondition();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		fixCondition.setAcceptId(vo.getAcceptId());
		fixCondition.setFixConditionFlag(vo.getFixConditionFlag());
		if(vo.getFixConditionFlag()==1){
			fixCondition.setDepcode(vo.getDepcode());
			fixCondition.setFixConditionText(vo.getFixConditionText());
			fixCondition.setVendorId(vo.getVendorId());
			try {
				fixCondition.setAssignTime(sdf.parse(vo.getAssignTime()));
				fixCondition.setAssignAchieveTime(sdf.parse(vo.getAssignAchieveTime()));
				fixCondition.setTenderStartTime(sdf.parse(vo.getTenderStartTime()));
				fixCondition.setTenderEndTime(sdf.parse(vo.getTenderEndTime()));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		List<FixCondition> list = service.getFixCondition(vo);
		if(list.size()==0){
			fixCondition.setFixConditionId(UtilForHD.GetNowTimeForId());
			service.insertFixCondition(fixCondition);
			//修改验收任务状态为“开箱验收”
			aService.updateAcceptTaskSatate(fixCondition.getAcceptId(), 3);
		}else{
			fixCondition.setFixConditionId(list.get(0).getFixConditionId());
			service.updateFixCondition(fixCondition);
		}
		obj.put("success", "true");
		return obj.toString();
	}
	
	/**
	 * 判断是否已经存在此任务，存在返回前台
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getFixCondition(FixConditionVo vo){
		JSONObject obj = new JSONObject();
		List<FixCondition> list = service.getFixCondition(vo);
		//判断是否存在记录
		if(list.size()>0){
			FixCondition fixCondition = list.get(0);
			//通过反射获取当前实体
			Class<?> clz = fixCondition.getClass();
			//获取实体类型中的所有属性返回Field数组
			Field[] fields = clz.getDeclaredFields();
			for (Field field : fields) {
				try {
					//将首字母做大小写转换组合成一个实体的GET方法获取值
					Method m = (Method)fixCondition.getClass().getMethod("get"+field.getName().substring(0, 1).toUpperCase()+field.getName().substring(1));
					if(m.invoke(fixCondition)!=null){
						//处理时间类型
						if(field.getGenericType().toString().equals("class java.util.Date")){
							if(UtilForHD.IsStrEmpty(m.invoke(fixCondition).toString()))
								obj.put(field.getName(), m.invoke(fixCondition).toString().substring(0, 10));
							else
								obj.put(field.getName(), "");
						}else{
							obj.put(field.getName(), m.invoke(fixCondition).toString());
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
}
