
var departmentTaskColumnTreePanel = {
	type : null,
	taskId : null,//单击树节点时，获取节点的taskid
	projectId : null//单击树节点时获取节点的productid
}

//返回到主面板的公用函数
departmentTaskColumnTreePanel.backMainPanel = function() {
	var viewport = Ext.getCmp('departmentTaskMain');
	var portal = departmentTaskMain.portal();
	if (Ext.getCmp('departmentTaskPanel')) {
		viewport.remove('departmentTaskPanel');
	}
	viewport.add(portal);
	viewport.getLayout().setActiveItem('departmentTaskPanel');
};

//选择接受按钮
departmentTaskColumnTreePanel.selectionButton = function(outerTaskId, outerProjectId) {
	var button = new Ext.Button({
		text : '选择关联',
		handler : function() {
			if (departmentTaskColumnTreePanel.type == null && departmentTaskColumnTreePanel.taskId == null){
				Ext.Msg.alert('提示','请选择一个任务进行关联！');
				return;
			} else if(departmentTaskColumnTreePanel.type == 'project') {
				Ext.Msg.alert('提示','您选择的是工程，请选择任务');
				return;
			} else {
				Ext.Ajax.request({
					url : '../JSON/departmentTask_DepartmentTaskRemote.relateExistTask',
					method : 'post',
					disableCaching : true,
					autoAbort : true,
					success : function(response, options) {
						var wind = Ext.getCmp('relationWin');
						wind.close();
						departmentTaskColumnTreePanel.backMainPanel();
					},
					params : {
						taskId : outerTaskId+'|'+departmentTaskColumnTreePanel.taskId,
						projectId : outerProjectId+'|'+departmentTaskColumnTreePanel.projectId
					}
				});
			}
		}
	});
	return button;
};

//创建关联按钮
departmentTaskColumnTreePanel.createButton = function(outerTaskId, outerProjectId) {
	var button = new Ext.Button({
		text : '创建关联',
		handler : function() {
		Ext.Ajax.request({
			url : '../JSON/departmentTask_DepartmentTaskRemote.relateUnExistTask',
			method : 'post',
			disableCaching : true,
			autoAbort : true,
			success : function(response, options) {
				var wind = Ext.getCmp('relationWin');
				wind.close();
				departmentTaskColumnTreePanel.backMainPanel();
			},
			params : {
				taskId : outerTaskId,
				projectId : outerProjectId
			}
		});
	   }
	});
	return button;
};

//取消按钮
departmentTaskColumnTreePanel.cancelButton = function() {
	var button = new Ext.Button({
		text : '取消',
		handler : function() {
			var wind = Ext.getCmp('relationWin');
			wind.close();
		}
	});
	return button;
};

//构建column 树
departmentTaskColumnTreePanel.tree = function(outerTaskId, outerProjectId) {
	var tree = new Ext.ux.tree.ColumnTree({
		width : 625,
		heigth : 400,
		rootVisible : false,
	    buttonAlign : 'center',
	    title: '任务列表树',
	    columns : [{
	    	header : '任务名称',
	    	width : 180,
	    	dataIndex : 'taskName'
	    },{
	    	header : '状态',
	    	width : 100,
	    	dataIndex : 'statusName'
	    },{
	    	header : '负责人',
	    	width : 100,
	    	dataIndex : 'chargeManName'
	    },{
	    	header : '计划开始时间',
	    	width : 100,
	    	dataIndex : 'plannedStartTime'
	    },{
	    	header : '计划结束时间',
	    	width : 100,
	    	dataIndex : 'plannedEndTime'
	    }],	    
	    loader : new Ext.tree.TreeLoader({
	    	dataUrl : '../JSON/departmentTask_DepartmentTaskRemote.projectAndTaskColumnTree',
	    	method : 'POST',
	    	uiProviders:{
	            'col' : Ext.ux.tree.ColumnNodeUI
	        }
	    }),	    
	    root : new Ext.tree.AsyncTreeNode({
			text : '',
			id : 'root',
			expanded : true
		}),		
		buttons : [departmentTaskColumnTreePanel.selectionButton(outerTaskId, outerProjectId),
		           departmentTaskColumnTreePanel.createButton(outerTaskId, outerProjectId),
		           departmentTaskColumnTreePanel.cancelButton()]
	});
	return tree;
}


departmentTaskColumnTreePanel.init = function(outerTaskId, outerProjectId) {

	var tree = departmentTaskColumnTreePanel.tree(outerTaskId, outerProjectId);
	tree.on('beforeload', callBack);
	tree.on('click', nodeClick);
	
	function callBack(node) {
		var id = '' + node.id;	
		if (id == 'root') {
			tree.loader.dataUrl = '../JSON/departmentTask_DepartmentTaskRemote.projectAndTaskColumnTree';
		} else {
			tree.loader.dataUrl = '../JSON/departmentTask_DepartmentTaskRemote.getSubTaskList?taskId='+id;
		}
	}
	//点击树节点的事件
	function nodeClick(node){
		var id = '' + node.id;
		if(id.indexOf('p') >= 0){
			departmentTaskColumnTreePanel.type = 'project';
		} else {
			departmentTaskColumnTreePanel.taskId = id;
			departmentTaskColumnTreePanel.projectId = node.attributes.projectId;
			//alert(departmentTaskColumnTreePanel.projectId);
		}
	}	
	return tree;
}






