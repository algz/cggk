
var departmentTaskRelationViewPanel = {
	taskId : null//外部传人taskid
}

departmentTaskRelationViewPanel.init = function(taskId) {
	
	departmentTaskRelationViewPanel.taskId = taskId;
	
	//顺序工具栏按钮
	var shunxuBtn = new Ext.Button({
		text : '任务顺序关联视图',
		handler : function(){
			var p = Ext.getCmp('depRelationPanel');
			p.layout.setActiveItem(0);
		}
	});
	//逆序工具栏按钮
	var nixuBtn = new Ext.Button({
		text : '任务逆序关联视图',
		handler : function(){
			var p = Ext.getCmp('depRelationPanel');
			p.layout.setActiveItem(1);
		}
	});
	//显示的任务关联视图主面板
	var panel = new Ext.Panel({
		title : '任务关联视图',
		id : 'depRelationPanel',
		layout : 'card',
		tbar : ['-',shunxuBtn,'-',nixuBtn,'-']
	});
			
	//面板的活动
	panel.on('activate', function(){
		var shunxuPanel;
		var nixuPanel;
		var reg = '^[0-9]*$';
		var taskId = departmentTaskRelationViewPanel.getTaskId();
		if (taskId == 0 || !taskId.match(reg)) {
			shunxuPanel = new Ext.Panel({width:'100%',height:'100%',html:'没有数据'});
			nixuPanel = new Ext.Panel({width:'100%',height:'100%',html:'没有数据'});
		} else {
			shunxuPanel = departmentTaskRelationViewPanel.shunxuRelationViewPanel();
			nixuPanel = departmentTaskRelationViewPanel.nixuRelationViewPanel();
		}
		panel.removeAll();
		panel.add(shunxuPanel);
		panel.add(nixuPanel);
		panel.layout.setActiveItem(0);
		panel.doLayout();
	});
	return panel;
};

//根据条件判断taskid
departmentTaskRelationViewPanel.getTaskId =  function() {
	var taskId = leftNavigationTree.nodeId;
	if (departmentTaskRelationViewPanel.taskId != null) {
		taskId = departmentTaskRelationViewPanel.taskId;
	}
	return ''+taskId;
}

//顺序查看任务的关联关系视图
departmentTaskRelationViewPanel.shunxuRelationViewPanel = function() {
	var taskId = departmentTaskRelationViewPanel.getTaskId();
	var url = '../JSON/departmentTask_DepartmentTaskRemote.getTaskInfoToRelation?taskId='+taskId;
	var columnTreePanel = departmentTaskRelationViewPanel.baseColumnTree(url, '任务顺序关联视图');
	columnTreePanel.on('beforeload', function(node){
		var id = '' + node.id;
		if (id == 'root') {//取协同工程树上点击节点的任务信息
			columnTreePanel.loader.dataUrl = url;
		} else if(id.indexOf('r') >= 0) {//取节点的关联任务
			var id = id.substring(id.indexOf('r') + 1, id.length);
			columnTreePanel.loader.dataUrl = '../JSON/departmentTask_DepartmentTaskRemote.getRelationTask?taskId='+id;
		} else {//取任务的子任务
			columnTreePanel.loader.dataUrl = '../JSON/departmentTask_DepartmentTaskRemote.getSubTaskIsRelated?taskId='+id;
		}
	});
	return columnTreePanel;
};

//逆序查看任务关联关系的视图
departmentTaskRelationViewPanel.nixuRelationViewPanel = function() {
	var taskId = departmentTaskRelationViewPanel.getTaskId();
	var url = '../JSON/departmentTask_DepartmentTaskRemote.getTaskInfoToRelation?taskId='+taskId;
	var columnTreePanel = departmentTaskRelationViewPanel.baseColumnTree(url, '任务逆序关联视图');
	columnTreePanel.on('beforeload', function(node){
		var id = '' + node.id;
		if (id == 'root') {//取协同工程树上点击节点的任务信息
			columnTreePanel.loader.dataUrl = url;
		} else if(id.indexOf('r') >= 0) {//取被改节点关联的任务
			id = id.substring(id.indexOf('r') + 1, id.length);
			columnTreePanel.loader.dataUrl = '../JSON/departmentTask_DepartmentTaskRemote.getIsRelatedTaskAll?taskId='+id;
		} else {//取改节点的父任务
			columnTreePanel.loader.dataUrl = '../JSON/departmentTask_DepartmentTaskRemote.getFatherTask?taskId='+id;
		}
	});
	return columnTreePanel;
};

//构建colum tree的基础方法
departmentTaskRelationViewPanel.baseColumnTree = function(dataUrl,title) {
	var columnTreePanel = new Ext.ux.tree.ColumnTree({
		width : '100%',
		height : '100%',
		rootVisible : true,
		autoScroll : true,
		title : title,
	    columns : [{
	    	header : '任务名称',
	    	width : 200,
	    	dataIndex : 'taskName'
	    },{
	    	header : '状态',
	    	width : 80,
	    	dataIndex : 'statusName'
	    },{
	    	header : '负责人',
	    	width : 90,
	    	dataIndex : 'chargeManName'
	    },{
	    	header : '负责部门',
	    	width : 90,
	    	dataIndex : 'department'
	    },{
	    	header : '所属工程',
	    	width : 90,
	    	dataIndex : 'projectName'
	    },{
	    	header : '计划开始时间',
	    	width : 90,
	    	dataIndex : 'plannedStartTime'
	    },{
	    	header : '计划结束时间',
	    	width : 90,
	    	dataIndex : 'plannedEndTime'
	    },{
	    	header : '实际开始时间',
	    	width : 90,
	    	dataIndex : 'actualStartTime'
	    },{
	    	header : '实际完成时间',
	    	width : 90,
	    	dataIndex : 'actualEndTime'
	    }],	  
	    loader : new Ext.tree.TreeLoader({
	    	dataUrl : dataUrl,
	    	method : 'POST',
	    	uiProviders : {
	            'col' : Ext.ux.tree.ColumnNodeUI
	        }
	    }),	 
	    root : new Ext.tree.AsyncTreeNode({
			text : 'root',
			id : 'root',
			iconCls : 'icon-project',
			expanded : true
		})
	});
	return columnTreePanel;
}
