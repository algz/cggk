
var departmentUnResiveTaskPanel = {
	sm : null,
	store : null
};

departmentUnResiveTaskPanel.sm = new Ext.grid.CheckboxSelectionModel();
departmentUnResiveTaskPanel.store = new Ext.data.Store({
	proxy : new Ext.data.HttpProxy({
		url : '../JSON/departmentTask_DepartmentTaskRemote.getOuterUnresiveTask',
		method : 'post'
	}),
	reader : new Ext.data.JsonReader({
		root : 'results',
		id : 'taskId',
		totalProperty : 'totalProperty'
	},['taskId',
	   'taskName',
	   'statusName',
	   'plannedStartTime',
	   'plannedEndTime',
	   'actualStartTime',
	   'actualEndTime',
	   'department',
	   'projectName',
	   'ratio'])
});


//组合框组合面板
departmentUnResiveTaskPanel.northPanel = function(){
	var panel = new Ext.Panel({
		layout : 'table',
		//width : 800,
		height : 30,
		border : false,
		layoutConfig : {
			columns : 6	
		},
		defaults : {
			bodyStyle : 'padding:3px 5px;'
		},
		items : [{
			bodyBorder : false,
			width : 30
		},{
			xtype : 'button',
			text : '接收任务',
			handler : function(){
				departmentUnResiveTaskPanel.resiveTask();
			}
		},{
			bodyBorder : false,
			width : 30
		},{
			xtype : 'button',
			text : '返回上页',
			handler : function(){
				var viewport = Ext.getCmp('departmentTaskMain');
				viewport.getLayout().setActiveItem('departmentTaskPanel');
			}
		}]
	});
	return panel;
}

//任务表格面板
departmentUnResiveTaskPanel.centrPanel = function() {
	
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
		departmentUnResiveTaskPanel.sm,
		new Ext.grid.RowNumberer(),
   		{
   			header : '任务名称',
   			dataIndex : 'taskName',
   			width : 110
   		},{
   			header : '状态',
   			dataIndex : 'statusName',
   			width : 100
   		},{
   			header : '计划开工时间',
   			dataIndex : 'plannedStartTime',
   			width : 100
   		},{
   			header : '计划完工时间',
   			dataIndex : 'plannedEndTime',
   			width : 100
   		},{
   			header : '实际开始时间',
   			dataIndex : 'actualStartTime',
   			width : 100
   		},{
   			header : '实际结束时间',
   			dataIndex : 'actualEndTime',
   			width : 100
   		},{
   			header : '派发单位',
   			dataIndex : 'department',
   			width : 100
   		},{
   			header : '工程名称',
   			dataIndex : 'projectName',
   			width : 100
   		},{
   			header : '进度',
   			dataIndex : 'ratio',
   			width : 110
   		}]
	});
   	var grid = new Ext.grid.GridPanel({
   		width : '100%',
   		height : 200,
   		cm : cm,
   		sm : departmentUnResiveTaskPanel.sm,
   		store : departmentUnResiveTaskPanel.store
   	});
   	departmentUnResiveTaskPanel.store.load();
   	return grid;
};

//接收任务函数
departmentUnResiveTaskPanel.resiveTask = function() {
	var count = departmentUnResiveTaskPanel.sm.getCount();
	if (count <= 0) {Ext.Msg.alert('提示', '至少选择一个任务');return;}
	var records = departmentUnResiveTaskPanel.sm.getSelections();
	var recrod;
	var taskIds = '';
	for (var i = 0; i < records.length; i++) {
		record = records[i];
		taskIds += record.get('taskId');
		if (i != records.length - 1) taskIds += '|';
	}
	Ext.Msg.confirm('提示','确定接收这些任务吗？',function(btn){
		if (btn != 'yes') return;
		Ext.Ajax.request({
			url : '../JSON/departmentTask_DepartmentTaskRemote.resiveTask',
			method : 'post',
			disableCaching : true,
			autoAbort : true,
			success : function(response, options) {
				//任务接收完毕之后，跳转到任务关联面板
				var viewport = Ext.getCmp('departmentTaskMain');
				var unrelationPanel = departmentUnRelationTaskPanel.init();
				//如果存在，则先移除
				if (Ext.getCmp('departmentUnRelationTaskPanel')) {
					viewport.remove('departmentUnRelationTaskPanel');
				}			
				viewport.add(unrelationPanel);
				viewport.getLayout().setActiveItem('departmentUnRelationTaskPanel');
			},
			params : {taskId : taskIds}
		});
	});
};


departmentUnResiveTaskPanel.init = function () {
	var panel = new Ext.Panel({
		id : 'departmentUnResiveTaskPanel',
		layout : 'border',
		height : 800,
		items : [{
			region : 'north',
			height : 30,
			items : [departmentUnResiveTaskPanel.northPanel()]
		},{
			region : 'center',
			layout : 'fit',
			items : [departmentUnResiveTaskPanel.centrPanel()]
		}]
	});
	return panel;
};






