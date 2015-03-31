package ut.com.sysware.p2m.engine;

import org.jboss.seam.Component;
import org.testng.annotations.Test;

import ut.SyswareTestBase;

import com.sysware.p2m.engine.Engine;

/**
 * 定时器激活任务时调用的方法的测试
 *
 * @author suny
 *
 */
public class ActivateTaskTest extends SyswareTestBase{
	/**
	 * 激活流程中的任务
	 * 
	 * @author suny
	 */
	@Test
	public void activateFlowTask(){
		Engine engine=(Engine)Component.getInstance("engine_Engine", true);
		engine.activateTasks();
		
//		TaskDaoImpl taskdao=(TaskDaoImpl)Component.getInstance("task_TaskDaoImpl", true);
//		List<Task> list=taskdao.getFlowTask(0,10);
//		System.out.println(list.size());
	}

}
