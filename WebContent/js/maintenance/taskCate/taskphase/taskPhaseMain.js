var taskPhaseMain = {
	taskcategoryid : null,
	taskcategoryname : null
};

taskPhaseMain.init = function() {
	var mytaskPhasePanel = taskPhasePanel.init();
	//加载任务阶段数据
//	function loadTaskPhase() {
//		myGrid.loadvalue(taskPhasePanel.grid.store, {
//					start : 0,
//					limit : 25
//				}, taskCateMain.baseargs);
//	}
	//任务阶段panel页
	taskPhaseMain.extend = new Ext.Panel({
				title : '' + getResource('resourceParam7073') + '',
				border : false,
				layout : 'fit',
//				listeners : {
//					activate : loadTaskPhase
//				},
				items : [mytaskPhasePanel]
			});
	//任务阶段返回按钮panel页
//	taskPhaseMain.bak = new Ext.Panel({
//				title : '' + getResource('resourceParam944') + '',
//				border : false,
//				layout : 'fit',
//				listeners : {
//					activate : function() {
//						back(taskPhaseMain.taskcategoryid, taskPhaseMain.taskcategoryname)
//					}
//				}
//			});
	//任务阶段主面板
	taskPhaseMain.tabpanels = new Ext.TabPanel({
				minTabWidth : 300,
				resizeTabs : false,
				border : false,
				hidden : false,
				items : [taskPhaseMain.extend]
			});

	return taskPhaseMain.tabpanels;
}
