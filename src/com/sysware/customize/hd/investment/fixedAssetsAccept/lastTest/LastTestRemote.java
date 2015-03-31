package com.sysware.customize.hd.investment.fixedAssetsAccept.lastTest;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTask.AcceptTaskServiceImpl;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("LastTestRemote")
public class LastTestRemote {

	@In(create=true,value="LastTestServiceImpl")
	private LastTestService service;
	
	@In(create=true,value="AcceptTaskServiceImpl")
	private AcceptTaskServiceImpl aService;
	
	/**
	 * 操作最终验收信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String useLastTest(LastTestVo vo){
		JSONObject obj = new JSONObject();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		LastTest lastTest = new LastTest();
		try {
			lastTest.setLastTestTime(sdf.parse(vo.getLastTestTime()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		lastTest.setAcceptId(vo.getAcceptId());
		lastTest.setLastTestNum(vo.getLastTestNum());
		lastTest.setLastTestRemark(vo.getLastTestRemark());
		LastTest test = service.getLastTest(vo);
		if(test==null){
			lastTest.setLastTestId(UtilForHD.GetNowTimeForId());
			service.insertLastTest(lastTest);
			//修改验收任务状态为“资产交接”
			aService.updateAcceptTaskSatate(lastTest.getAcceptId(), 7);
		}else{
			lastTest.setLastTestId(test.getLastTestId());
			service.updateLastTest(lastTest);
		}
		obj.put("success", "success");
		return obj.toString();
	}
	
	/**
	 * 获取最终验收信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getLastTest(LastTestVo vo){
		JSONObject obj = new JSONObject();
		LastTest lastTest = service.getLastTest(vo);
		if(lastTest!=null){
			Class<?> clz = lastTest.getClass();
			Field[] fields = clz.getDeclaredFields();
			for (Field field : fields) {
				try {
					//将首字母做大小写转换组合成一个实体的GET方法获取值
					Method m = (Method)lastTest.getClass().getMethod("get"+field.getName().substring(0, 1).toUpperCase()+field.getName().substring(1));
					if(m.invoke(lastTest)!=null){
						//处理时间类型
						if(field.getGenericType().toString().equals("class java.util.Date")){
							if(UtilForHD.IsStrEmpty(m.invoke(lastTest).toString()))
								obj.put(field.getName(), m.invoke(lastTest).toString().substring(0, 10));
							else
								obj.put(field.getName(), "");
						}else{
							obj.put(field.getName(), m.invoke(lastTest).toString());
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
