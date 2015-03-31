package com.sysware.customize.hd.investment.fixedAssetsAccept.beforehandTest;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTask.AcceptTaskServiceImpl;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("BeforehandTestRemote")
public class BeforehandTestRemote {
	
	@In(create=true,value="BeforehandTestServiceImpl")
	private BeforehandTestServiceImpl service;
	
	@In(create=true,value="AcceptTaskServiceImpl")
	private AcceptTaskServiceImpl aService;

	/**
	 * 添加一条预验收到数据库中
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String insertBeforehandTest(BeforehandTestVo vo){
		JSONObject obj = new JSONObject();
		//时间类型转换
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		BeforehandTest beforehandTest = new BeforehandTest();
		beforehandTest.setBeforehandTestText(vo.getBeforehandTestText());
		beforehandTest.setBeforehandTestPeopel(vo.getBeforehandTestPeopel());
		beforehandTest.setAcceptId(vo.getAcceptId());
		try {
			beforehandTest.setBeforehandTestStartTime(sdf.parse(vo.getBeforehandTestStartTime()));
			beforehandTest.setBeforehandTestLastTime(sdf.parse(vo.getBeforehandTestLastTime()));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		BeforehandTest test = service.getBeforehandTest(vo);
		if(test==null){
			beforehandTest.setBeforehandTestId(UtilForHD.GetNowTimeForId());
			service.insertBeforehandTest(beforehandTest);
			//修改验收任务状态为“安装准备”
			aService.updateAcceptTaskSatate(beforehandTest.getAcceptId(), 2);
		}else{
			beforehandTest.setBeforehandTestId(test.getBeforehandTestId());
			service.updateBeforehandTest(beforehandTest);
		}
		obj.put("success","success");
		return obj.toString();
	}
	
	/**
	 * 判断是否已经存在，如果存在则将数据返回到前台
	 * @return
	 */
	@WebRemote
	public String estimateBeforehandTest(BeforehandTestVo vo){
		int result = service.getBeforehandTestForOneCount(vo);
		JSONObject obj = new JSONObject();
		if(result>0){
			BeforehandTest beforehandTest = service.getBeforehandTest(vo);
			//获取当前实体（反射）
			Class<?> clz = beforehandTest.getClass();
			// 获取实体类的所有属性，返回Field数组  
			Field[] fields = clz.getDeclaredFields();
			for (Field field : fields) {
				try {
					//将首字母做大小写转换组合成一个实体的GET方法获取值
					Method m = (Method)beforehandTest.getClass().getMethod("get"+field.getName().substring(0, 1).toUpperCase()+field.getName().substring(1));
					//处理时间类型
					if(field.getGenericType().toString().equals("class java.util.Date")){
						obj.put(field.getName(), m.invoke(beforehandTest).toString().substring(0, 10));
					}else{
						obj.put(field.getName(), m.invoke(beforehandTest).toString());
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				
			}
			obj.put("success", "true");
		}else{
			obj.put("success","false");
		}
		return obj.toString();
	}
}
