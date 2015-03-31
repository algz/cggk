package com.sysware.customize.hd.investment.fixedAssetsAccept.testCourse;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Name;

@Name("TestCourseServiceImpl")
public class TestCourseServiceImpl implements TestCourseService {

	@In(create=true,value="TestCourseDaoImpl")
	private TestCourseDao dao;
	
	public void insertTestCourse(TestCourse vo){
		dao.insertTestCourse(vo);
	}
	
	public void updateTestCourse(TestCourse vo){
		dao.updateTestCourse(vo);
	}
	
	public TestCourse getTestCourse(TestCourseVo vo){
		return dao.getTestCourse(vo);
	}
}
