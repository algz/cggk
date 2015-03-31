
var departmentUnRelationTaskPanel = {
	sm : null,
	store : null
};

departmentUnRelationTaskPanel.sm = new Ext.grid.CheckboxSelectionModel();
departmentUnRelationTaskPanel.store = new Ext.data.Store({
	proxy : new Ext.data.HttpProxy({
		url : '../JSON/departmentTask_DepartmentTaskRemote.getOuterUnrelationTask',
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
	   'ratio',
	   'projectId'])
});


//组合框组合面板
departmentUnRelationTaskPanel.northPanel = function(){
	var panel = new Ext.Panel({
		layout : 'table',
		//width : 800,
		height : 30,
		border : false,
		layoutConfig : {
			columns : 2	
		},
		defaults : {
			bodyStyle : 'padding:3px 5px;'
		},
		items : [{
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
departmentUnRelationTaskPanel.centrPanel = function() {
	
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
		departmentUnRelationTaskPanel.sm,
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
   			header : '关联',
   			dataIndex : 'taskId',
   			renderer : function(value, cellmeta, record, rowIndex, columnIndex,store){
   				return '<a href="javascript:void(0);" onclick="relationWindow('+value+','+record.get('projectId')+')" style="text-decoration:underline;color:blue;">关联</a>'
   			},
   			width : 110
   		}]
   	});
   	var grid = new Ext.grid.GridPanel({
   		width : '100%',
   		height : 200,
   		cm : cm,
   		sm : departmentUnRelationTaskPanel.sm,
   		store : departmentUnRelationTaskPanel.store
   	});
   	departmentUnRelationTaskPanel.store.load();
   	return grid;
};

//接收任务函数
departmentUnRelationTaskPanel.resiveTask = function() {
	var count = departmentUnRelationTaskPanel.sm.getCount();
	if (count <= 0) {Ext.Msg.alert('提示', '至少选择一个任务');return;}
	var records = departmentUnRelationTaskPanel.sm.getSelections();
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
				//do something here
			},
			params : {taskId : taskIds}
		});
	});
};


departmentUnRelationTaskPanel.init = function () {
	var panel = new Ext.Panel({
		id : 'departmentUnRelationTaskPanel',
		layout : 'border',
		height : 800,
		items : [{
			region : 'north',
			height : 30,
			items : [departmentUnRelationTaskPanel.northPanel()]
		},{
			region : 'center',
			layout : 'fit',
			items : [departmentUnRelationTaskPanel.centrPanel()]
		}]
	});
	return panel;
};

//任务关联时的弹出的模态窗口(传入参数为外部任务id，任务所属项目id)
function relationWindow(outerTaskId, outerProductId){
	//alert(outerProductId);
	var wind = new Ext.Window({
		id : "relationWin",
		width : 635,
		height : 400,
		title : '任务列表窗口',
		modal : true,
		autoScroll : true,
		items : [departmentTaskColumnTreePanel.init(outerTaskId, outerProductId)]
	});
	wind.show();
}






