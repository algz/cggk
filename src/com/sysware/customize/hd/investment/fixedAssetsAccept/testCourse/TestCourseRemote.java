package com.sysware.customize.hd.investment.fixedAssetsAccept.testCourse;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;

import net.sf.json.JSONObject;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.annotations.remoting.WebRemote;

import com.sysware.customize.hd.investment.fixedAssetsAccept.acceptTask.AcceptTaskServiceImpl;
import com.sysware.customize.hd.investment.util.UtilForHD;

@Name("TestCourseRemote")
public class TestCourseRemote {

	@In(create=true,value="TestCourseServiceImpl")
	private TestCourseService service;
	
//	@In(create=true,value="AcceptTaskServiceImpl")
//	private AcceptTaskServiceImpl aService;
	/**
	 * 操作验收过程任务
	 * @return
	 */
	@WebRemote
	public String useTestCourse(TestCourseVo vo){
		JSONObject obj = new JSONObject();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		TestCourse testCourse = new TestCourse();
		try {
			testCourse.setTestCourseTime(sdf.parse(vo.getTestCourseTime()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		testCourse.setAcceptId(vo.getAcceptId());
		//必须保存文件的名称和编号
		testCourse.setTestCourseDocument(vo.getTestCourseDocument());
		testCourse.setTestCourseDocumentId(vo.getTestCourseDocumentId());
		TestCourse test = service.getTestCourse(vo);
		if(test ==null){
			testCourse.setTestCourseId(UtilForHD.GetNowTimeForId());
			service.insertTestCourse(testCourse);
			//“验收过程”涉及到审批流程，故在此对任务状态不做修改
		}else{
			testCourse.setTestCourseId(test.getTestCourseId());
			service.updateTestCourse(testCourse);
		}
		obj.put("success", "success");
		return obj.toString();
	}
	
	/**
	 * 根据编号返回一条验收过程信息
	 * @param vo
	 * @return
	 */
	@WebRemote
	public String getTestCourse(TestCourseVo vo){
		JSONObject obj = new JSONObject();
		TestCourse testCourse = service.getTestCourse(vo);
		if(testCourse!=null){			
			Class<?> clz = testCourse.getClass();
			Field[] fields = clz.getDeclaredFields();
			for (Field field : fields) {
				try {
					//将首字母做大小写转换组合成一个实体的GET方法获取值
					Method m = (Method)testCourse.getClass().getMethod("get"+field.getName().substring(0, 1).toUpperCase()+field.getName().substring(1));
					if(m.invoke(testCourse)!=null){
						//处理时间类型
						if(field.getGenericType().toString().equals("class java.util.Date")){
							if(UtilForHD.IsStrEmpty(m.invoke(testCourse).toString()))
								obj.put(field.getName(), m.invoke(testCourse).toString().substring(0, 10));
							else
								obj.put(field.getName(), "");
						}else{
							obj.put(field.getName(), m.invoke(testCourse).toString());
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
