
var departmentTaskTypeGrid = {
	ownTask : null,
	outerAssignTask : null,
	inerAssignTask : null
};

//查看任务详细信息的导航函数
departmentTaskTypeGrid.taskDetail = function(taskId, taskName) {
//	departmentTaskDetailMainPanel
	var viewport = Ext.getCmp('departmentTaskMain');
	var detailPanel = departmentTaskDetailMainPanel.init(taskId, taskName);
	if (Ext.getCmp('departmentTaskDetailMainPanel')) {
		viewport.remove('departmentTaskDetailMainPanel');
	}
	viewport.add(detailPanel);
	viewport.getLayout().setActiveItem('departmentTaskDetailMainPanel');
}

//分页工具栏
departmentTaskTypeGrid.paging = function(store) {
	var paging = new Ext.PagingToolbar({
		store : store,
		pageSize : 20,
		displayInfo : true,
		displayMsg : '第 {0} 到 {1} 条，一共  {2} 条',
		emptyMsg : '没有记录'
	});
	return paging;
}

//部门内部关联任务列表
departmentTaskTypeGrid.ownTask = function() {
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/departmentTask_DepartmentTaskRemote.getOnwTaskList?limitFlag=0',
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
		   'chargeManName',
		   'projectName',
		   'ratio'])
	});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header : '任务名称',
			dataIndex : 'taskName',
			width : 110,
			renderer : function(value, cellmeta, record, rowIndex,columnIndex, store) {
				var taskId = record.get('taskId');
				return "<a href='javascript:void(0);' onclick='departmentTaskTypeGrid.taskDetail("+taskId+",\""+value+"\")'><font color='blue'>" + value + "</font></a>";
			}
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
			header : '负责人',
			dataIndex : 'chargeManName',
			width : 100
		},{
			header : '工程名称',
			dataIndex : 'projectName',
			width : 100
		},
		new Ext.ux.grid.ProgressColumn({
   			header : '任务进度',
   			dataIndex : 'ratio',
   			width : 110,
   			textPst : '%',
   			colored : true
   		})]
   	});
	var grid = new Ext.grid.GridPanel({
		height : 210,
		width : '100%',
		cm : cm,
		store : store
	});
	//store.load();
	return grid; 
};

//外部门指派任务列表
departmentTaskTypeGrid.outerAssignTask = function () {
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/departmentTask_DepartmentTaskRemote.getOuterAssignedTaskList?limitFlag=0',
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
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
   			header : '任务名称',
   			dataIndex : 'taskName',
   			width : 110,
   			renderer : function(value, cellmeta, record, rowIndex,columnIndex, store) {
				var taskId = record.get('taskId');
				return "<a href='javascript:void(0);' onclick='departmentTaskTypeGrid.taskDetail("+taskId+",\""+value+"\")'><font color='blue'>" + value + "</font></a>";
			}
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
   			header : '负责人',
   			dataIndex : 'chargeManName',
   			width : 100
   		},{
   			header : '派发单位',
   			dataIndex : 'department',
   			width : 100
   		},{
   			header : '工程名称',
   			dataIndex : 'projectName',
   			width : 100
   		},
//   		{
//   			header : '任务进度',
//   			dataIndex : 'ratio',
//   			width : 110
//   		}
   		new Ext.ux.grid.ProgressColumn({
   			header : '任务进度',
   			dataIndex : 'ratio',
   			width : 110,
   			textPst : '%',
   			colored : true
   		})]
	});
   	var grid = new Ext.grid.GridPanel({
   		width : '100%',
   		height : 210,
   		cm : cm,
   		store : store
   	});
   	//store.load();
   	return grid;
};

//本部门向外部门指定任务列表
departmentTaskTypeGrid.inerAssignTask = function() {
	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/departmentTask_DepartmentTaskRemote.getInerAssignedTaskList?limitFlag=0',
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
		   'ratio'])
	});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
   			header : '任务名称',
   			dataIndex : 'taskName',
   			width : 110,
   			renderer : function(value, cellmeta, record, rowIndex,columnIndex, store) {
				var taskId = record.get('taskId');
				return "<a href='javascript:void(0);' onclick='departmentTaskTypeGrid.taskDetail("+taskId+",\""+value+"\")'><font color='blue'>" + value + "</font></a>";
			}
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
   			header : '负责单位',
   			dataIndex : 'department',
   			width : 100
   		},
//   		{
//   			header : '任务进度',
//   			dataIndex : 'ratio',
//   			width : 110
//   		}
   		new Ext.ux.grid.ProgressColumn({
   			header : '任务进度',
   			dataIndex : 'ratio',
   			width : 110,
   			textPst : '%',
   			colored : true
   		})]
	});
   	var grid = new Ext.grid.GridPanel({
   		width : '100%',
   		height : 210,
   		cm : cm,
   		store : store
   	});
   	//store.load();
   	return grid;
};
