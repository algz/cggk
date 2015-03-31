
var departmentTaskDetailTabPanel = {
	taskId : null,
	taskName : null
};

//任务详细信息的tab页主面板
departmentTaskDetailTabPanel.mainTabPanel = function(taskId, taskName) {
	departmentTaskDetailTabPanel.taskId = taskId;
	departmentTaskDetailTabPanel.taskName = taskName;
	var tPanel = new Ext.TabPanel({
		width : '100%',
		height : '100%',
		items : [departmentTaskDetailTabPanel.taskAttributePanel(),
		         departmentTaskDetailTabPanel.taskDataPanel(),
		         departmentTaskDetailTabPanel.relationPanel(),
		         departmentTaskDetailTabPanel.wbsPanel(),
		         departmentTaskDetailTabPanel.processPanel(),
		         departmentTaskDetailTabPanel.gantePic(),
		         departmentTaskDetailTabPanel.remindPanel(),
		         departmentTaskDetailTabPanel.taskLogPanel(),
		         departmentTaskRelationViewPanel.init(taskId)]
	});
	tPanel.setActiveTab(0);
	return tPanel;
};

//任务属性表单面板
departmentTaskDetailTabPanel.taskAttributePanel = function () {
	var formPanel = new Ext.Panel({
		title : '属性',
		frame : false,
		boder : false,
		layout : 'fit',
		items : [TaskAttributePanel.init()]
	});
	//面板的激活事件
	formPanel.on('activate', function() {
		TaskAttributePanel.taskId = departmentTaskDetailTabPanel.taskId;
		TaskAttributePanel.setBasicForm();
		TaskAttributePanel.setFirstPage();
	});
	return formPanel;
};

//任务数据面板
departmentTaskDetailTabPanel.taskDataPanel = function() {
	var mydataObjectPanel = new dataObjectPanel();
	var panel = new Ext.Panel({
		title : '数据',
		frame : false,
		boder : false,
		layout : 'fit',
		items : [mydataObjectPanel.init()]
	});
	//面板的激活事件
	panel.on('activate', function() {
//		Ext.Ajax.request({
//			url : '../JSON/privilege_DataPrivilegeRemote.getDataManipultations',
//			method : 'POST',
//			success : function(response, options){},
//			disableCaching : true,
//			autoAbort : true,
//			params : {
//				dataId : departmentTaskDetailTabPanel.taskId
//			}
//		})
		mydataObjectPanel.setConfigs('', departmentTaskDetailTabPanel.taskId, null);
	});
	return panel;
};

//任务关系面板
departmentTaskDetailTabPanel.relationPanel = function() {
	var panel = new Ext.Panel({
		title : '关系',
		frame : false,
		boder : false,
		layout : 'fit',
		items : [relationPanel.init()]
	});
	//关系面板的激活事件
	panel.on('activate', function(){
//		Ext.Ajax.request({
//			url : '../JSON/privilege_DataPrivilegeRemote.getDataManipultations',
//			method : 'post',
//			success : function(response, options){},
//			disableCaching : true,
//			autoAbort : true,
//			params : {
//				dataId : departmentTaskDetailTabPanel.taskId
//			}
//		})
		relationPanel.active(departmentTaskDetailTabPanel.taskId, departmentTaskDetailTabPanel.taskId, departmentTaskDetailTabPanel.taskName);
	})
	return panel;
};

//任务wbs面板
departmentTaskDetailTabPanel.wbsPanel = function() {
	var panel = new Ext.Panel({
		title : 'wbs',
		frame : false,
		boder : false,
		layout : 'fit',
		items : [wbsdata.init()]
	});
	//wbs面板的激活事件
	panel.on('activate', function() {
//		Ext.Ajax.request({
//			url : '../JSON/privilege_DataPrivilegeRemote.getDataManipultations',
//			method : 'POST',
//			success : function(response, options){},
//			disableCaching : true,
//			autoAbort : true,
//			params : {
//				dataId : departmentTaskDetailTabPanel.taskId
//			}
//		})
		wbsdata.nodeId = relationPanel.nodeId;
		wbsdata.checkbox = true;
		wbsdata.sourceNodeId = '';
		wbsdata.relationtypes = '1,2';
		wbsdata.refresh();
	});
	return panel;
};

//任务进度面板
departmentTaskDetailTabPanel.processPanel = function() {
	var panel = new Ext.Panel({
		title : '进度',
		frame : false,
		boder : false,
		layout : 'fit',
		items : [processSharingPanel.init()]
	});
	//任务进度面板激活事件
	panel.on('activate', function() {
		var taskname = departmentTaskDetailTabPanel.taskId;
		var proxy = new Ext.data.HttpProxy({
			url : '../JSON/anotherprocessquery_ProcessquerySvr.getProjectTaskAndId?taskname='+taskname
		});
		processSharingPanel.grid.getStore().proxy = proxy;
		myGrid.loadvalue(processSharingPanel.grid.getStore(), {start : 0, limit : 25}, null);
	})
	return panel;
};

//任务甘特图面板
departmentTaskDetailTabPanel.gantePic = function() {
	var panel = new Ext.Panel({
		title : '甘特图',
		frame : false,
		boder : false,
		layout : 'fit',
		items : [Sch.ganttQuantityMain.init()]
	});
   panel.on("activate", function() {
		var taskname = departmentTaskDetailTabPanel.taskId;
        var proxy = new Ext.data.HttpProxy({
      url : '../JSON/gantt_ganttRemote.getGanttList?nodeid='
            + taskname
});
Sch.ganttQuantityMain.getDay(taskname);
Sch.ganttQuantityMain.ganttGrid.getStore().proxy = proxy;
myGrid.loadvalue(Sch.ganttQuantityMain.ganttGrid.getStore());
var proxy1 = new Ext.data.HttpProxy({
    url : '../JSON/ganttRelation_GanttRelationRemote.getGantLines?nodeid='
            + taskname
});
Sch.ganttQuantityMain.ganttGrid.dependencyStore.proxy = proxy1;
myGrid.loadvalue(Sch.ganttQuantityMain.ganttGrid.dependencyStore);
});
	//甘特图面板的激活事件
//	panel.on('activate', function(){
//		var taskname = departmentTaskDetailTabPanel.taskId;
//		Seam.Component.getInstance("aofoquery_zongheChaxunSvr").getStartDate(taskname, function(reslut) {
//			var proxy = new Ext.data.HttpProxy({
//				url : '../JSON/aofoquery_zongheChaxunSvr.getGanttList?nodeid='+taskname
//			});
//			var today = Date.parseDate(reslut, "Y-m-d");
//            if(today != null || today != undefined){
//				ganttMain.ganttGrid.setView(today, today.add(Date.MONTH, 12), 'monthAndQuarters');
//				ganttMain.ganttGrid.getStore().proxy = proxy;
//				myGrid.loadvalue(ganttMain.ganttGrid.getStore(), {start : 0, limit : 25}, null);
//				myGrid.loadvalue(ganttMain.ganttGrid.dependencyStore, {start : 0, limit : 25}, null);
//            }
//		});
//	})
	return panel;
};

//任务提醒面板
departmentTaskDetailTabPanel.remindPanel = function() {
	var formPanel = departmentTaskDetailTabPanel.remindForm();
	var panel = new Ext.Panel({
		title : '提醒',
		frame : false,
		boder : false,
		layout : 'fit',
		items : [formPanel]
	});
	//任务提醒面板激活事件
	panel.on('activate', function() {
		formPanel.findById('logAttributeTaskId').setValue(departmentTaskDetailTabPanel.taskId);
		formPanel.findById('logAttributeTask').setValue(departmentTaskDetailTabPanel.taskName);
		Ext.Ajax.request({
			url : '../JSON/privilege_DataPrivilegeRemote.getDataManipultations',
			method : 'POST',
			success : function(response, options){},
			disableCaching : true,
			autoAbort : true,
			params : {
				dataId : departmentTaskDetailTabPanel.taskId
			}
		})
	});
	return panel;
};

//任务日志面板
departmentTaskDetailTabPanel.taskLogPanel = function() {
	var panel = new Ext.Panel({
		title : '' + getResource('resourceParam629') + '',
		frame : false,
		boder : false,
		layout : 'fit',
		html : "<iframe scrolling=auto  id='taskloginfoframe'  frameborder=0 width=100% height=100% src='../logInfo.seam' ></iframe>",
		listeners : {'activate' : function() {
			var taskid = departmentTaskDetailTabPanel.taskId;
			document.getElementById('taskloginfoframe').src = "../logInfo.seam?temp="
			+ new Date()
			+ "&taskid="
			+ taskid
			+ "&publics=1&publishMode=4&typeStr=1,3,4,";
		}
		}
	});
	return panel;
};

//提醒日志的表单面板
departmentTaskDetailTabPanel.remindForm = function() {
	var form = new Ext.form.FormPanel({
		id : 'logAddForm',
		fileUpload : true,
		enctype : 'multipart/form-data',
		bodyStyle : 'padding:5px 5px 0',
		labelWidth : 80,
		defaults : {
			anchor : '62%',
			msgTarget : 'side'
		},
		items : [{
			xtype : 'textfield',
			id : 'logAttributeTaskId',
			inputType : 'hidden'
		},{
			xtype : 'textfield',
			fieldLabel : '' + getResource('resourceParam624') + '',
			id : 'logAttributeTask',
			readOnly : true,
			style : 'margin-bottom: 5px;',
			width : 300	
		},{
			xtype : 'textfield',
			id : 'logName',
			fieldLabel : '' + getResource('resourceParam786') + '',
			style : 'margin-bottom: 5px;',
			width : 100,
			allowBlank : false,
			emptyText : '' + getResource('resourceParam1553') + '',
			maxLength : 50,
			minLengthText : '' + getResource('resourceParam786')+ '不能大于50!',
			msgTarget : 'side'
		},{
			xtype : 'textarea',
			id : 'logContent',
			fieldLabel : '' + getResource('resourceParam626') + '',
			style : 'margin-bottom: 5px;',
			width : 200,
			height : 100,
			allowBlank : false,
			emptyText : '' + getResource('resourceParam622') + '',
			maxLength : 2000,
			maxLengthText : '' + getResource('resourceParam591') + ''
		},{
			xtype : 'fileuploadfield',
			id : 'logfile1',
			fieldLabel : '' + getResource('resourceParam469') + '',
			buttonText : '' + getResource('resourceParam473') + ''
		}],
		buttons : [{
			text : '' + getResource('resourceParam605') + '',
			handler : submit
		  },{
			text : '' + getResource('resourceParam606') + '',
			handler : function() {
				form.getForm().reset();
			}
		}]
	});
	//form表单提交函数
	function submit() {
		if (!form.getForm().isValid()) {
			return;
		}
		var logAttributeTaskId = form.findById('logAttributeTaskId').getValue();
		var logAttributeTask = form.findById('logAttributeTask').getValue();
		var logName = form.findById('logName').getValue();
		var logContent = form.findById('logContent').getValue();
		var url = '../logupload?logAttributeTaskId='+logAttributeTaskId+'&logAttributeTask='+logAttributeTask
				 +'&logName='+logName+'&logContent='+logContent+'&messageType=1';
		form.getForm().submit({
			url : url,
			method : 'post',
			success : function(form, action) {
				Ext.Msg.alert('提示', '发布成功');
				form.getForm().reset();
			}
		});
	}
	return form;
}




