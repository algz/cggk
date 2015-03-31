package com.sysware.customize.hd.investment.fixedAssetsAccept.rendTest;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTask.AcceptTaskServiceImpl;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("RendTestRemote")
public class RendTestRemote {

	@In(create=true,value="RendTestServiceImpl")
	private RendTestService service;
	
	@In(create=true,value="AcceptTaskServiceImpl")
	private AcceptTaskServiceImpl aService;
	
	/**
	 * 操作开箱验收任务
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String useRendTest(RendTestVo vo){
		JSONObject obj = new JSONObject();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		RendTest rendTest = new RendTest();
		try {
			rendTest.setRendTestTime(sdf.parse(vo.getRendTestTime()));
			rendTest.setTestTime(sdf.parse(vo.getTestTime()));
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		rendTest.setRendTestRemark(vo.getRendTestRemark());
		rendTest.setTestBill(vo.getTestBill());
		rendTest.setAcceptId(vo.getAcceptId());
		RendTest test = service.getRendTest(vo);
		if(test!=null){
			rendTest.setRendTestId(test.getRendTestId());
			service.updateRendTest(rendTest);
		}else{
			rendTest.setRendTestId(UtilForHD.GetNowTimeForId());
			service.insertRendTest(rendTest);
			//修改验收任务状态为“验收过程”
			aService.updateAcceptTaskSatate(rendTest.getAcceptId(), 4);
		}
		obj.put("success", "success");
		return obj.toString();
	}
	
	/**
	 * 根据编号返回一条开箱验收json数据
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getRendTest(RendTestVo vo){
		JSONObject obj = new JSONObject();
		RendTest rendTest = service.getRendTest(vo);
		if(rendTest!=null){			
			Class<?> clz = rendTest.getClass();
			Field[] fields = clz.getDeclaredFields();
			for (Field field : fields) {
				try {
					//将首字母做大小写转换组合成一个实体的GET方法获取值
					Method m = (Method)rendTest.getClass().getMethod("get"+field.getName().substring(0, 1).toUpperCase()+field.getName().substring(1));
					if(m.invoke(rendTest)!=null){
						//处理时间类型
						if(field.getGenericType().toString().equals("class java.util.Date")){
							if(UtilForHD.IsStrEmpty(m.invoke(rendTest).toString()))
								obj.put(field.getName(), m.invoke(rendTest).toString().substring(0, 10));
							else
								obj.put(field.getName(), "");
						}else{
							obj.put(field.getName(), m.invoke(rendTest).toString());
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
