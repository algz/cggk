package ut.com.sysware.p2m.task;

import java.util.List;

import org.jboss.seam.Component;
import org.testng.annotations.Test;

import com.luck.itumserv.entity.Task;
import com.sysware.p2m.task.TaskService;

import ut.SyswareTestBase;

public class TaskTest extends SyswareTestBase{
	@Test
	public void getMyTaskTest(){
		TaskService taskService=(TaskService)Component.getInstance("task_TaskServiceImpl", true);
		Long count=taskService.countMyTask(3797351L, new Long[]{4L});
		List<Task> taskList=taskService.getMyTask(3797351L, 0, 25, new Long[]{4L});
		for(Task task:taskList){
			/*
			 * 为了给小薛 增加 的属性查询
			 */
			System.out.println(task.getTaskstatusname());
			System.out.println(task.getProjectname());
			System.out.println(task.getTaskcategoryname());
			System.out.println(task.getFeedbackName());
			System.out.println(task.getProjectStatusName());
		}
		System.out.println(taskList.size());
	}
}
