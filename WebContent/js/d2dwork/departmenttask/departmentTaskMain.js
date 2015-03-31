var departmentTaskMain = {
	args : {
		start : 0,
		limit : 25
	},
	baseargsfz : {
		role : 'fuze',
		fanwei : 'man',
		taskstatusid : null,
		taskcategoryid : null
	}
}
departmentTaskMain.init = function() {
    

	
	
	departmentTaskMain.card1 = departmentTaskList.panel();
	
	var detailCard= mytaskdetails.panel();
	

	departmentTaskMain.cenpanel = new Ext.Panel({
				region : 'center',
				layout : 'card',
				resizable : false,
				activeItem : 0,
				items : [departmentTaskMain.card1,detailCard]
			});
	var hh = "<div class='x-panel-header x-unselectable x-accordion-hd' align='left'>"
		    + "<div style='float:left; padding-top:3px; text-align:center; height:25px; font-size:12px'>"
			+ "<a href='javascript:void(0);' onclick='updateTask()'>"
			+ getResource('resourceParam478')
			+ "</a>&nbsp;|&nbsp;"
			+ "<a href='javascript:void(0);' onclick='createTask()'>"
			+ getResource('resourceParam1484')
			+ "</a>&nbsp;|&nbsp;"
			
			+ "<a href='javascript:void(0);' onclick='returnTaskList()'>"
			+ getResource('resourceParam1476')
			+ "</a>&nbsp;|&nbsp&nbsp&nbsp&nbsp;</div>"
			
			+ "<div style='float:left; padding-top:3px; text-align:center; height:25px; font-size:12px'>"+getResource('resourceParam1482')+"</div>"
			+ "<div id='taskcate1' style='float:left; padding-top:0px; height:25px;'></div>"
			+ "<div id='taskcate2' style='float:left; padding-top:0px; height:25px;'></div>"
			+ "<div id='taskcate3' style='float:left; padding-top:0px; height:25px;'></div>"
					"</div>"
			
	
	        
			
			
	// 北面面板
	departmentTaskMain.northpanel = new Ext.Panel({
				region : 'north',
				height : 32,
				layout : 'fit',
				html : hh
			});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [departmentTaskMain.northpanel, departmentTaskMain.cenpanel

		]

	});
	departmentTaskMain.grid = departmentTaskList.grid;
	// 实例化下拉框
	departmentTaskMain.getdialog();
}

// 团队任务过滤界面的下拉列表
departmentTaskMain.getdialog = function() {
	// 所属项目过滤下拉列表
	var proStore = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : "../JSON/departmenttask_DepartmentTaskRemote.getProjects"
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'results'
						}, [{
									name : 'name'
								}, {
									name : 'projectId'
								}])
			});
	proStore.load({
				params : {
					role : 'fuze',
					fanwei : 'man'
				}
			});
	var projectCombo = new Ext.ux.form.LovCombo({
				id : 'projectCombo',
				renderTo : 'taskcate3',
				width : 80,
				listWidth : 150,
				hideOnSelect : false,
				maxHeight : 200,
				store : proStore,
				triggerAction : 'all',
				valueField : 'projectId',
				displayField : 'name',
				mode : 'local',
				beforeBlur : Ext.emptyFn
			});
	var pro_record = Ext.data.Record.create([{
				name : 'name'
			}, {
				name : 'projectId'
			}]);
	var pro_selectAll = new pro_record({
				name : getResource('resourceParam5029'),
				projectId : '-1'
			});
	var pro_deSelectAll = new pro_record({
				name : '' + getResource('resourceParam808') + '',
				projectId : '-2'
			});
	projectCombo.on('expand', function(combo) {
				var store = combo.getStore();
				var firstRecord = store.getAt(0);
				if (firstRecord.get('projectId') == -1
						|| firstRecord.get('projectId') == -2) {
					store.remove(firstRecord);
				}
				var checkSum = null;// 选中的总数
				if (combo.getCheckedValue() == '') {
					checkSum = 0;
				} else {
					checkSum = combo.getCheckedValue().split(',').length;
				}
				if (checkSum == store.getCount()) {
					// 已全部选中
					store.insert(0, pro_deSelectAll);
				} else {
					store.insert(0, pro_selectAll);
				}
			});
	projectCombo.on('select', function(combo, record, index) {
				if (record.get('projectId') == -1) {
					// click selectAll
					record.set('checked', false);
					combo.getStore().remove(record);
					combo.selectAll();
					combo.fireEvent('blur');
				} else if (record.get('projectId') == -2) {
					// click deSelectAll
					combo.deselectAll();
					combo.getStore().remove(record);
					combo.getStore().insert(0, pro_selectAll);
				} else {
					var checkSum = null;// 选中的总数
					if (combo.getCheckedValue() == '') {
						checkSum = 0;
					} else {
						checkSum = combo.getCheckedValue().split(',').length;
					}
					if (checkSum < (combo.getStore().getCount() - 1)) {
						combo.getStore().remove(combo.getStore().getAt(0));
						combo.getStore().insert(0, pro_selectAll);
					}
				}
			});
	projectCombo.on('blur', function() {
				// return;
				var temp = projectCombo.getValue();
				var str = '';
				var params = "";

				if (temp.length != 0) {
					params = temp + ",";
				} else {
					projectCombo.setRawValue(""
							+ getResource('resourceParam2002') + "");
				}
				departmentTaskMain.leixingming = "";
				departmentTaskMain.pros = params;
				departmentTaskMain.baseargsfz = {
					role : 'fuze',
					fanwei : 'man',
					taskstatusstr : departmentTaskMain.ztai,
					taskcategorystr : departmentTaskMain.leix,
					projects : departmentTaskMain.pros,
					plannedstartstr : null,
					plannedendstr : null,
					taskname : null
				};

				myGrid.loadvalue(departmentTaskMain.grid.store, departmentTaskMain.args,
						departmentTaskMain.baseargsfz);

			});
	
	
	var cateds = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : "../JSON/tasklist_taskService.getTaskCate"
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'results'
						}, [{
									name : 'taskcategoryname'
								}, {
									name : 'taskcategoryid'
								}])
			});
	cateds.load();
	var taskCategory = new Ext.ux.form.LovCombo({
				id : 'taskCategory',
				renderTo : 'taskcate1',
				width : 80,
				listWidth : 150,
				hideOnSelect : false,
				maxHeight : 200,
				store : cateds,
				triggerAction : 'all',
				valueField : 'taskcategoryid',
				displayField : 'taskcategoryname',
				mode : 'local',
				beforeBlur : Ext.emptyFn
			});
	var record_1 = Ext.data.Record.create([{
				name : 'taskcategoryname'
			}, {
				name : 'taskcategoryid'
			}]);
	var selectAll_1 = new record_1({
				taskcategoryname : ''+getResource('resourceParam1682')+'',
				taskcategoryid : '-1'
			});

	var deSelectAll_1 = new record_1({
				taskcategoryname : ''+getResource('resourceParam808')+'',
				taskcategoryid : '-2'
			});
	taskCategory.on('expand', function(combo) {
				var store = combo.getStore();
				var firstRecord = store.getAt(0);
				if (firstRecord.get('taskcategoryid') == -1
						|| firstRecord.get('taskcategoryid') == -2) {
					store.remove(firstRecord);
				}
				var checkSum = null;// 选中的总数
				if (combo.getCheckedValue() == '') {
					checkSum = 0;
				} else {
					checkSum = combo.getCheckedValue().split(',').length;
				}
				if (checkSum == store.getCount()) {
					// 已全部选中
					store.insert(0, deSelectAll_1);
				} else {
					store.insert(0, selectAll_1);
				}
			});
	taskCategory.on('select', function(combo, record, index) {
				if (record.get('taskcategoryid') == -1) {
					// click selectAll
					record.set('checked', false);
					combo.getStore().remove(record);
					combo.selectAll();
					combo.fireEvent('blur');
				} else if (record.get('taskcategoryid') == -2) {
					// click deSelectAll
					combo.deselectAll();
					combo.getStore().remove(record);
					combo.getStore().insert(0, selectAll_1);
				} else {
					var checkSum = null;// 选中的总数
					if (combo.getCheckedValue() == '') {
						checkSum = 0;
					} else {
						checkSum = combo.getCheckedValue().split(',').length;
					}
					if (checkSum < (combo.getStore().getCount() - 1)) {
						combo.getStore().remove(combo.getStore().getAt(0));
						combo.getStore().insert(0, selectAll_1);
					}
				}

			});
	var statusds = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : "../JSON/tasklist_taskService.getTaskStatus"
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'results'
						}, [{
									name : 'taskstatusname'
								}, {
									name : 'taskstatusid'
								}])
			});
	statusds.load();
	var taskStauts = new Ext.ux.form.LovCombo({
				id : 'taskStauts',
				renderTo : 'taskcate2',
				width : 80,
				listWidth : 150,
				hideOnSelect : false,
				maxHeight : 200,
				store : statusds,
				triggerAction : 'all',
				valueField : 'taskstatusid',
				displayField : 'taskstatusname',
				mode : 'local',
				beforeBlur : Ext.emptyFn
			});
	var record_2 = Ext.data.Record.create([{
				name : 'taskcategoryname'
			}, {
				name : 'taskcategoryid'
			}]);
	var selectAll_2 = new record_2({
				taskstatusname : ''+getResource('resourceParam1469')+'',
				taskstatusid : '-1'
			});

	var deSelectAll_2 = new record_2({
				taskstatusname : ''+getResource('resourceParam808')+'',
				taskstatusid : '-2'
			});
	taskStauts.on('expand', function(combo) {
				var store = combo.getStore();
				var firstRecord = store.getAt(0);
				if (firstRecord.get('taskstatusid') == -1
						|| firstRecord.get('taskstatusid') == -2) {
					store.remove(firstRecord);
				}
				var checkSum = null;// 选中的总数
				if (combo.getCheckedValue() == '') {
					checkSum = 0;
				} else {
					checkSum = combo.getCheckedValue().split(',').length;
				}
				if (checkSum == store.getCount()) {
					// 已全部选中
					store.insert(0, deSelectAll_2);
				} else {
					store.insert(0, selectAll_2);
				}
			});
	taskStauts.on('select', function(combo, record, index) {
				if (record.get('taskstatusid') == -1) {
					// click selectAll
					record.set('checked', false);
					combo.getStore().remove(record);
					combo.selectAll();
					combo.fireEvent('blur');
				} else if (record.get('taskstatusid') == -2) {
					// click deSelectAll
					combo.deselectAll();
					combo.getStore().remove(record);
					combo.getStore().insert(0, selectAll_2);
				} else {
					var checkSum = null;// 选中的总数
					if (combo.getCheckedValue() == '') {
						checkSum = 0;
					} else {
						checkSum = combo.getCheckedValue().split(',').length;
					}
					if (checkSum < (combo.getStore().getCount() - 1)) {
						combo.getStore().remove(combo.getStore().getAt(0));
						combo.getStore().insert(0, selectAll_2);
					}
				}

			});

	taskCategory.on('blur', function() {
				var temp = taskCategory.getValue();
				var str = '';
				var params = "";

				if (temp.length != 0) {
					params = temp + ",";
				} else {
					taskCategory.setValue(""+getResource('resourceParam1473')+"");
				}
				departmentTaskMain.leixingming = "";
				departmentTaskMain.leix = params;
				departmentTaskMain.baseargsfz = {
					role : 'fuze',
					fanwei : 'man',
					taskstatusstr : departmentTaskMain.ztai,
					taskcategorystr : departmentTaskMain.leix,
					projects : departmentTaskMain.pros,
					plannedstartstr : null,
					plannedendstr : null,
					taskname : null
				};
				myGrid.loadvalue(departmentTaskMain.grid.store, departmentTaskMain.args,
						departmentTaskMain.baseargsfz);

			});

	taskStauts.on('blur', function() {
				var temp = taskStauts.getValue();
				var str = '';
				var params = "";

				if (temp.length != 0) {
					params = temp + ',';
				} else {
					taskStauts.setValue(""+getResource('resourceParam1474')+"");
				}
				departmentTaskMain.ztaiming = str;
				departmentTaskMain.ztai = params;
				departmentTaskMain.baseargsfz = {
					role : 'fuze',
					fanwei : 'man',
					taskstatusstr : departmentTaskMain.ztai,
					taskcategorystr : departmentTaskMain.leix,
					projects : departmentTaskMain.pros,
					plannedstartstr : null,
					plannedendstr : null,
					taskname : null
				};
				myGrid.loadvalue(departmentTaskMain.grid.store, departmentTaskMain.args,
						departmentTaskMain.baseargsfz);
			});
	taskCategory.setRawValue(""+getResource('resourceParam1473')+"");
	taskStauts.setRawValue(""+getResource('resourceParam1474')+"");
	projectCombo.setRawValue("" + getResource('resourceParam2002') + "");
}


    

	var updateTask=function(){
		function  toList(){
		   departmentTaskMain.cenpanel.getLayout().setActiveItem(0);
		   departmentTaskList.grid.store.reload();
		}
		if (myGrid.rows != null) {
			var len = myGrid.rows.length;
			if (len != 1) {
				Ext.example.msg('' + getResource('resourceParam587') + '', ''
								+ getResource('resourceParam1475') + '!');
				return;
			}
			var taskStatusId = myGrid.rows[0].get('taskstatusid');
			if (taskStatusId>4) {
				Ext.example.msg('' + getResource('resourceParam587') + '',
				'编制中、未激活、未接受、进行中的任务才能修改!');
				return;
			}
			var taskId = myGrid.rows[0].get('taskid');
			var projectId = myGrid.rows[0].get('projectid');
			
			updateTaskBasic.nodeId = taskId;
		    updateTaskBasic.projectId = projectId;
			if(departmentTaskMain.updataTask==null){
				departmentTaskMain.updataTask=updateTaskCard.init(toList);
			    departmentTaskMain.cenpanel.add(departmentTaskMain.updataTask);
			}else{
			    departmentTaskMain.cenpanel.remove(departmentTaskMain.updataTask);
			    departmentTaskMain.updataTask=updateTaskCard.init(toList);
			    departmentTaskMain.cenpanel.add(departmentTaskMain.updataTask);
			}
			updateTaskBasic.setBasic();
			departmentTaskMain.cenpanel.getLayout().setActiveItem(2);
		}else{
			Ext.example.msg('' + getResource('resourceParam587') + '', ''
								+ getResource('resourceParam1475') + '!');
				return;
		}
	}
	
	var createTask=function(){
		//细分按钮
		if (myGrid.rows != null) {
			var len = myGrid.rows.length;
			if (len != 1) {
				Ext.example.msg('' + getResource('resourceParam587') + '', ''
								+ getResource('resourceParam1475') + '!');
				return;
			}
			var taskStatusId = myGrid.rows[0].get('taskstatusid');
			if (taskStatusId>4) {
				Ext.example.msg('' + getResource('resourceParam587') + '',
				'编制中、未激活、未接受、进行中的任务才能细分!');
				return;
			}
			var taskId = myGrid.rows[0].get('taskid');
			var projectId = myGrid.rows[0].get('projectid');
			var taskName = myGrid.rows[0].get('taskname');
			detailsOnclick(taskName, taskId, projectId);
			mytaskdetails.tabpanel.layout.setActiveItem(3);
		}else{
			Ext.example.msg('' + getResource('resourceParam587') + '', ''
								+ getResource('resourceParam1475') + '!');
				return;
		}
	}
	var returnTaskList=function(){
	  departmentTaskMain.cenpanel.getLayout().setActiveItem(0);
	  departmentTaskList.grid.store.reload();
	}
	
	
	var loadTag = 0;
// 任务详细
var detailsOnclick = function(taskname, taskid, projectid) {
	// 北部面板赋值
	feedback.taskid = taskid;
	feedback.init(taskid, taskname);
	mytaskdetails.egridpanel13.add(feedback.feedBackTabPanel);
	mytaskdetails.egridpanel13.doLayout();
	departmentTaskMain.projectid = projectid;
	departmentTaskMain.taskid = taskid;
	departmentTaskMain.taskname = taskname;
	var hh = "<div class='x-panel-header x-unselectable "
			+ "x-accordion-hd' align='left'>&nbsp;&nbsp;" + ""
			+ getResource('resourceParam733') + ":<font color='red'>"
			+ taskname + "</font></div>";
	Ext.getCmp('panel13').getEl().dom.innerHTML = hh;
	departmentTaskMain.cenpanel.layout.setActiveItem(1);//detail页面
	mytaskdetails.tabpanel.layout.setActiveItem(0);//detail的属性页面
	mytaskdetails.tabpanel.doLayout();
	Ext.getCmp("logAttributeTask").value = taskname;
	Ext.getCmp("logAttributeTaskId").value = taskid;
	Ext.getCmp("addFeedBackinfo").html = "<iframe scrolling=auto id='feedbackframe' frameborder=0 width=100% height=100% src='../feedBackAdd.seam?temp="
			+ new Date() + "&taskid= " + taskid + "' ></iframe>";
	Ext.getCmp("feedBackInfo").html = "<iframe scrolling=auto id='feedbackinfoframe' frameborder=0 width=100% height=100% src='../logInfo.seam?temp="
			+ new Date() + "&taskid= " + taskid + "&typeStr=2,' ></iframe>";
	Ext.getCmp("taskloginfo").html = "<iframe scrolling=auto id='loginframe' frameborder=0 width=100% height=100% src='../logInfo.seam?temp="
			+ new Date() + "&taskid= " + taskid + "&typeStr=1,' ></iframe>";
	loadTag += 1;
	TaskAttributePanel.taskId = taskid;
	TaskAttributePanel.setBasicForm();
	TaskAttributePanel.cardPanel.getLayout().setActiveItem(0);
}


Ext.onReady(departmentTaskMain.init, departmentTaskMain, true)
