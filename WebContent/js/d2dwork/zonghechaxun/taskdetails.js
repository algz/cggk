var taskdetails = {}
taskdetails.init = function() {
	// 属性
	taskdetails.attributePanel = TaskAttributePanel.init();
	taskdetails.ApproveTaskPanel = viewApproveTask.init();

	taskdetails.t1 = new Ext.Panel({
		id : 'etabpanel11',
		height : 800,
		title : '' + getResource('resourceParam6001') + '', // 属性
		layout : 'card',
		items : [taskdetails.attributePanel, taskdetails.ApproveTaskPanel],
		activeItem : 0,
		listeners : {
			activate : function() {
				Ext.getCmp('etabpanel11').removeClass('x-hide-display');
			}
		}
	});

	// 数据
	var mydataObjectPanel = new dataObjectPanel();
	taskdetails.egridpanel2 = mydataObjectPanel.init();
	taskdetails.egridpanel2.on('activate', function() {
		var enableEdit = false;
		mydataObjectPanel.setConfigs(zongheMain.projectid, zongheMain.taskid, enableEdit);
	});
	// 关系
	taskdetails.t3 = new Ext.Panel({
		id : 'etabpanel13',
		height : 800,
		title : '' + getResource('resourceParam1154') + '',
		layout : 'fit',
		items : [relationPanel.init()],
		listeners : {
			activate : function() {
				relationPanel.active(zongheMain.projectid, zongheMain.taskid, zongheMain.taskname);
			}

		}
	});
	// WBS
	taskdetails.t4 = new Ext.Panel({
		id : 'etabpanel14',
		height : 800,
		title : 'WBS',
		layout : 'fit',
		listeners : {
			activate : function() {
				wbsdata.nodeId = zongheMain.taskid;
				var option={tbar:null};
				var f = wbsdata.init(option);
				this.add(f);
				wbsdata.refresh();
				this.doLayout();
			}
		}
	});
	// 进度
	taskdetails.t8 = processSharingPanel.init();
	taskdetails.t8.on("activate", function() {
		var proxy = new Ext.data.HttpProxy({
			url : '../JSON/anotherprocessquery_ProcessquerySvr.getProjectTaskAndId?taskname=' + zongheMain.taskid
		});
		processSharingPanel.grid.getStore().proxy = proxy;
		myGrid.loadvalue(processSharingPanel.grid.getStore(), {
			start : 0,
			limit : 25
		}, null);
	});
	// 反馈
	taskdetails.t5 = new Ext.Panel({
		id : 'etabpanel15',
		height : 800,
		title : '' + getResource('resourceParam607') + '',
		layout : 'fit'
	});
	// 日志
	taskdetails.t6 = new Ext.Panel({
		id : 'etabpanel16',
		height : 800,
		title : '' + getResource('resourceParam629') + '',
		layout : 'fit'
	});
	// 审批记录
	taskdetails.t7 = new Ext.Panel({
		id : 'etabpanel17',
		height : 800,
		title : '' + getResource('resourceParam1448') + '',
		layout : 'fit',
		listeners : {
			activate : function() {
				var dataid = zongheMain.taskid;
				var datatype = 'TaskDataType';
				examApproval.getCommentGrid(this, dataid, datatype);
			}
		}
	});
	// TAB页面
	taskdetails.tabpanel = new Ext.TabPanel({
		id : 'taskdetailstabpanel',
		region : 'center',
		resizeTabs : true,
		items : [taskdetails.t1, taskdetails.egridpanel2,
				taskdetails.t3, taskdetails.t4, taskdetails.t8,
				taskdetails.t5, taskdetails.t6, taskdetails.t7]
	});
	return taskdetails.tabpanel;
}
