package ut.com.sysware.p2m;
import org.jboss.seam.Component;
import org.testng.annotations.Test;

import ut.SyswareTestBase;

import com.luck.itumserv.base.flow.FlowActivityRelationDao;
import com.sysware.p2m.ganttRelation.GanttRelationService;
/**
 * 
 *@author suny
 *@version time:2010-7-30上午09:30:07
 *
 */

public class GenerateGanttRelationTest extends SyswareTestBase{
	@Test
	public void relationTest(){
//		GanttRelationService gr=(GanttRelationService)Component.getInstance("ganttRelation_GanttRelationServiceImpl", true);
//		gr.generateGanttRelation(3797351L, 3901500L, 0L);
	
//		GanttRelationService gr=(GanttRelationService)Component.getInstance("ganttRelation_GanttRelationServiceImpl", true);
//		gr.generateGanttRelation(3797351L, 3901501L, 3901604L);
		
		
		GanttRelationService gr=(GanttRelationService)Component.getInstance("ganttRelation_GanttRelationServiceImpl", true);
		gr.generateGanttRelation(3797351L, 3902400L, 0L);
//		select t.taskid,t.taskname,t.plannedstarttime,t.plannedendtime,t.duration,t.rowid from t_task t where projectid=3902400
//		update t_task t set t.plannedstarttime=to_date('2010-8-1','yyyy-mm-dd') ,t.plannedendtime=to_date('2010-8-1','yyyy-mm-dd')  where projectid=3902400
		 
		FlowActivityRelationDao frd=(FlowActivityRelationDao)Component.getInstance("flow_FlowActivityRelationDaoImpl", true);
		GanttRelationService grs=(GanttRelationService)Component.getInstance("ganttRelation_GanttRelationServiceImpl", true);
		frd.isAtoB(3903150L, 3903151L, 0L);
		frd.isAtoB(3903150L, 3903154L, 0L);
		frd.isAtoB(3903151L,3903150L,  0L);
		frd.isAtoB(3903154L,3903150L,  0L);
		grs.isAtoB(3902400L, 3903150L, 3902400L, 3903151L);
		grs.isAtoB(3902400L, 3903150L, 3902400L, 3903152L);
		grs.isAtoB(3902400L, 3903150L, 3902400L, 3903154L);
		grs.isAtoB(3902400L,3903154L, 3902400L,  3903150L);
	}

}
