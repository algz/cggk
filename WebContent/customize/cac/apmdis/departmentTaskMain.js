
var departmentTaskMain = {
	portal : null
};

departmentTaskMain.init = function() {
	var view = new Ext.Viewport({
		id : 'departmentTaskMain',
		layout : 'card'
	});	
	view.add(departmentTaskMain.portal());
	view.getLayout().setActiveItem('departmentTaskPanel');
}

//"更多"工具按钮
departmentTaskMain.getMoreButton = function(flag) {
	var tb = new Ext.Button({
		id : flag,//借助id传值
		text : '更多......',
		handler : function(bt) {
			var viewport = Ext.getCmp('departmentTaskMain');
			var morePanel = departmentTaskMorePanel.init(bt.id);
			if (Ext.getCmp('departmentTaskMorePanel')) {
				viewport.remove('departmentTaskMorePanel');
			}
			viewport.add(morePanel);
			viewport.getLayout().setActiveItem('departmentTaskMorePanel');
		}
	});
	return tb;
};

//未接受任务按钮
departmentTaskMain.unResiveTaskButton = function() {
	var tb = new Ext.Button({
		id : 'tb-unresive',
		text : '未接收任务',
		handler : function() {
			var viewport = Ext.getCmp('departmentTaskMain');
			var unresivePanel = departmentUnResiveTaskPanel.init();
			//如果存在，则先移除
			if (Ext.getCmp('departmentUnResiveTaskPanel')) {
				viewport.remove('departmentUnResiveTaskPanel');
			}			
			viewport.add(unresivePanel);
			viewport.getLayout().setActiveItem('departmentUnResiveTaskPanel');
		}
	});
	return tb;
};

//未关联任务按钮
departmentTaskMain.unRelationTaskButton = function() {
	var tb = new Ext.Button({
		id : 'tb-unrelation',
		text : '未关联任务',
		handler : function() {		
			var viewport = Ext.getCmp('departmentTaskMain');
			var unrelationPanel = departmentUnRelationTaskPanel.init();
			//如果存在，则先移除
			if (Ext.getCmp('departmentUnRelationTaskPanel')) {
				viewport.remove('departmentUnRelationTaskPanel');
			}			
			viewport.add(unrelationPanel);
			viewport.getLayout().setActiveItem('departmentUnRelationTaskPanel');
		}
	});
	return tb;
};

//portal模式的三个任务面板
departmentTaskMain.portal = function() {
	
	//本部门所关联任务
	var ownTask = departmentTaskTypeGrid.ownTask();
	ownTask.getStore().proxy.conn.url = '../JSON/departmentTask_DepartmentTaskRemote.getOnwTaskList?limitFlag=6',
	ownTask.getStore().load();
	
	//外部门派发任务
	var outerAssignTask = departmentTaskTypeGrid.outerAssignTask();
	outerAssignTask.getStore().proxy.conn.url = '../JSON/departmentTask_DepartmentTaskRemote.getOuterAssignedTaskList?limitFlag=6',
	outerAssignTask.getStore().load();
	
	//本部门向外部门派发任务
	var inerAssignTask = departmentTaskTypeGrid.inerAssignTask();
	inerAssignTask.getStore().proxy.conn.url = '../JSON/departmentTask_DepartmentTaskRemote.getInerAssignedTaskList?limitFlag=6',
	inerAssignTask.getStore().load();
	
	var panel = new Ext.Panel({
		id : 'departmentTaskPanel',
		//autoScroll : true,
		items : [{
			xtype : 'portal',
			margings : '35 5 5 5',
			//autoScroll : true,
			items : [{
				columnWidth : .99,
				style : 'padding : 5px 0 5px 5px',
				items : [{					
					title : '本单位关联任务',
					tbar : ['->','-',departmentTaskMain.getMoreButton('ownTask'),'-'],
					height : 215,
					frame : false,
					items : [ownTask]
				},{					
					title : '接收外单位派发任务',
					tbar : ['->','-',departmentTaskMain.unResiveTaskButton(),'-',departmentTaskMain.unRelationTaskButton(),'-',departmentTaskMain.getMoreButton('outerAssignedTask'),'-'],
					height : 215,
					frame : false,
					items : [outerAssignTask]
				},{					
					title : '向外单位派发任务',
					tbar : ['->','-',departmentTaskMain.getMoreButton('inerAssignedTask'),'-'],
					height : 215,
					frame : false,
					items : [inerAssignTask]
				}]
			}]
		}]
	});
	return panel;
};

Ext.onReady(departmentTaskMain.init, departmentTaskMain, true);


