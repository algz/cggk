var mytaskMain = {
	grid : null,
	args : {
		start : 0,
		limit : 25
	},
	designatetaskname : '',
	taskids : null,
	taskid : null,
	ptids : null,
	leix : null,
	taskdW : null,
	mytaskadjustmentmainpanel : null,
	designatemainpanel : null,
	mytasktijiaomainpanel : null,
	issuedmanname : null,
	/**
	 * bug编号1059 wangyf
	 * bug信息：调整任务时接收人显示为简拼应该显示人名
	 * 2011-06-08 16：41
	 */
	truename : null,
	issuedmanid : null,
	title_record : null,
	showTaskPath : true,// 是否显示任务路径
	baseargsfz : {
		isPath : '0'
	},
	ztai : '2,3,4,',// 默认状态初始值statusds.on('load')时赋值
	attribut : 0
	// 控制任务详细页面的属性面板 (0：首次加载)
}
function returnTaskList() {
	mytaskMain.loadtasklist();
	// mytaskMain.cenpanel.getLayout().setActiveItem(0);
}
mytaskMain.init = function() {
	// 卡片布局
	Ext.Ajax.timeout = 900000;
	mytaskMain.card1 = mytasklist.panel();
	mytaskMain.card2 = mytaskdesignate.panel();
	// mytaskMain.card3 = mytasktijiao.panel();
	mytaskMain.card4 = mytaskadjustment.panel();
	// mytaskMain.card5 = mytaskdetails.panel();
	mytaskMain.card5 = mytaskdetails.mainpanelAll();
	mytaskMain.card6 = null;
	mytaskMain.cenpanel = new Ext.Panel({
		id : 'mytaskMainTap',
		region : 'center',
		layout : 'card',
		resizable : true,
		activeItem : 0,
		items : [mytaskMain.card1, mytaskMain.card2, mytaskMain.card4, mytaskMain.card5]
	});

	var hh = "<div class='x-panel-header x-unselectable x-accordion-hd' align='left'>"
		+ "<div style='float:left; padding-top:3px; text-align:center; height:25px; font-size:12px'>"
		+ "<a href='javascript:void(0);' onclick='operateOnclick(0)'>" + getResource('resourceParam1342') + "</a>&nbsp;|&nbsp;"
		+ "<a href='javascript:void(0);' onclick='operateOnclick(1)'>" + getResource('resourceParam1433') + "</a>&nbsp;|&nbsp;"
		+ "<a href='javascript:void(0);' onclick='commitOnclick()'>" + getResource('resourceParam484') + "</a>&nbsp;|&nbsp;"
		+ "<a href='javascript:void(0);' onclick='taskdesignateOnclick()'>" + getResource('resourceParam501') + "</a>&nbsp;|&nbsp;"
		+ "<a href='javascript:void(0);' onclick='mytaskMain.restart()'>" + getResource('resourceParam9109') + "</a>&nbsp;|&nbsp;"
		// + "<a href='javascript:void(0);' onclick='feedbackOnclick(5)'>" + getResource('resourceParam607') + "</a>&nbsp;|&nbsp;"
		// + "<a href='javascript:void(0);' onclick='feedbackOnclick(4)'>" + getResource('resourceParam629') + "</a>&nbsp;|&nbsp;"
		// + "<a href='javascript:void(0);' onclick='base.getObjects()'>" + "查看性能" + "</a>&nbsp;|&nbsp;"
		// + "<a href='javascript:void(0);' onclick='operateOnclick(6)'>" + getResource('resourceParam1484') + "</a>&nbsp;|&nbsp;"
		// + "<a href='#' onclick='approveTask()'>" + getResource('resourceParam1062') + "</a>&nbsp;|&nbsp;"
		+ "<a href='javascript:void(0);' onclick='startTDE_IDE()'>" + getResource('resourceParam560') + "TDE/IDE</a>&nbsp;|&nbsp;"
		+ "<a href='javascript:void(0);' onclick='startTask()'>启动应用程序</a>&nbsp;|&nbsp;"
		// + "<a href='#' onclick='restartTask()'>" + getResource('resourceParam9109') + "</a>&nbsp;|&nbsp;"
		// + "<a href='#' onclick='stopTask()'>" + getResource('resourceParam1170') + "</a>&nbsp;|&nbsp;"
		+ "<a href='javascript:void(0);' onclick='returnTaskList()'>" + getResource('resourceParam1476') + "</a>&nbsp;|&nbsp;"
		+ "&nbsp;&nbsp;&nbsp;</div>"
		+ "<div style='float:left; padding-top:3px; text-align:center; width:5px;'></div>"
		+ "<div style='float:left; padding-top:3px; height:25px; font-size:12px'>" + getResource('resourceParam1482') + "</div>"
		+ "<div id='taskcate1' style='float:left; padding:0px 0px 0px 5px; height:25px;'></div>"
		+ "<div id='taskcate2' style='float:left; padding:0px 0px 0px 5px; height:25px;'></div>"
		+ "<div id='taskcate3' style='float:left; padding:0px 0px 0px 5px; height:25px;'></div>"
        + "<div  style='float:left; padding:0px 0px 0px 5px; height:25px;'><input type='button' value='高级查询' onclick='mytask.queryTaskList.init.wd();'/></div>"
		+"</div>";

	// 北面面板
	mytaskMain.northpanel = new Ext.Panel({
		region : 'north',
		height : 32,
		layout : 'fit',
		html : hh
	});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [mytaskMain.cenpanel, mytaskMain.northpanel]
	});
	mytaskMain.grid = mytasklist.grid;
	mytaskMain.startP2MMask = new Ext.LoadMask(document.body, {
		msg : '' + getResource('resourceParam1047') + ''
	});
}

// 我的任务过滤界面的下拉列表
mytaskMain.getdialog = function() {
	Ext.QuickTips.init();
	// 所属项目过滤下拉列表
	var proStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			method : 'GET',
			url : "../JSON/mytask_MyTaskRemote.getProjects"
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
		beforeBlur : Ext.emptyFn,
        selectAll : function() {
            var i=0;
            this.store.each(function(record) {
                if(i != 0) {
                   record.set(this.checkField, true);
                }
                i++;
            }, this);
            this.doQuery(this.allQuery);
            this.setValue(this.getCheckedValue());
         }
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
	proStore.load({
		params : {
			role : 'fuze',
			fanwei : 'man'
		}
	});
	projectCombo.on('expand', function(combo) {
		var store = proStore;
		var firstRecord = store.getAt(0);
		if (firstRecord.data.projectId == -1 || firstRecord.data.projectId == -2) {
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
		if (record.data.projectId == -1) {
			record.set('checked', false);
			combo.getStore().remove(record);
			combo.getStore().insert(0, pro_deSelectAll);
			combo.selectAll();
            combo.getStore().getAt(0).set('checked',false);
		} else if (record.data.projectId == -2) {
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
			if (checkSum == (combo.getStore().getCount() - 1)) {
				combo.getStore().remove(combo.getStore().getAt(0));
				combo.getStore().insert(0, pro_deSelectAll);
			}
		}
	});
	projectCombo.on('blur', function() {
		var temp = projectCombo.getValue();
		var str = '';
		var params = "";

		if (temp.length != 0) {
			params = temp + ",";
		} else {
			projectCombo.setRawValue("" + getResource('resourceParam2002') + "");
		}
		mytaskMain.leixingming = "";
		mytaskMain.pros = params;
		mytaskMain.baseargsfz = {
			role : 'fuze',
			fanwei : 'man',
			taskstatusstr : mytaskMain.ztai,
			taskcategorystr : mytaskMain.leix,
			projects : mytaskMain.pros,
			plannedstartstr : null,
			plannedendstr : null,
			taskname : null,
            actualendstr : null,
            actualstartstr : null
		};

		myGrid.loadvalue(mytaskMain.grid.store, mytaskMain.args, mytaskMain.baseargsfz);
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
		beforeBlur : Ext.emptyFn,
        selectAll : function() {
            var i = 0;
            this.store.each(function(record) {
                if(i != 0) {
                   record.set(this.checkField, true);
                }
                i++;
            }, this);
            this.doQuery(this.allQuery);
            this.setValue(this.getCheckedValue());
		}
	});
	var record_1 = Ext.data.Record.create([{
		name : 'taskcategoryname'
	}, {
		name : 'taskcategoryid'
	}]);
	var selectAll_1 = new record_1({
		taskcategoryname : getResource('resourceParam5029'),
		taskcategoryid : '-1'
	});

	var deSelectAll_1 = new record_1({
		taskcategoryname : '' + getResource('resourceParam808') + '',
		taskcategoryid : '-2'
	});
	taskCategory.on('expand', function(combo) {
		var store = combo.getStore();
		var firstRecord = store.getAt(0);
		if (firstRecord.data.taskcategoryid == -1
				|| firstRecord.data.taskcategoryid == -2) {
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
		if (record.data.taskcategoryid == -1) {
			// click selectAll
			record.set('checked', false);
			combo.getStore().remove(record);
			combo.getStore().insert(0, deSelectAll_1);
            combo.selectAll();
            combo.getStore().getAt(0).set('checked',false);
			// combo.fireEvent('blur');
		} else if (record.data.taskcategoryid == -2) {
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
			if (checkSum == (combo.getStore().getCount() - 1)) {
				combo.getStore().remove(combo.getStore().getAt(0));
				combo.getStore().insert(0, deSelectAll_1);
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
	statusds.on('load', function(store) {
		// 勾选默认值，未激活、未接受、审批中
		var record2 = store.getAt(2);
		var name2 = record2.data.taskstatusname;
		record2.set('checked', true);
		var record3 = store.getAt(3);
		var name3 = record3.data.taskstatusname;
		record3.set('checked', true);
		var record4 = store.getAt(4);
		var name4 = record4.data.taskstatusname;
		record4.set('checked', true);
		var aa = [2, 3, 4];
		taskStauts.setValue(aa);
		var name = name2 + ',' + name3 + ',' + name4;
		// taskStauts.setRawValue(name);
	});
	var taskStauts = new Ext.ux.form.LovCombo({
		id : 'taskStauts',
		renderTo : 'taskcate2',
		width : 80,
		listWidth : 150,
		// listWidth : 140,
		hideOnSelect : false,
		maxHeight : 200,
		store : statusds,
		triggerAction : 'all',
		valueField : 'taskstatusid',
		displayField : 'taskstatusname',
		mode : 'local',
		beforeBlur : Ext.emptyFn,
        selectAll : function() {
            var i=0;
            this.store.each(function(record) {
                if(i !== 0) {
                   record.set(this.checkField, true);
                }
                i++;
            }, this);
            this.doQuery(this.allQuery);
            this.setValue(this.getCheckedValue());
		}
	});
	var record_2 = Ext.data.Record.create([{
		name : 'taskcategoryname'
	}, {
		name : 'taskcategoryid'
	}]);
	var selectAll_2 = new record_2({
		taskstatusname : getResource('resourceParam5029'),
		taskstatusid : '-1'
	});

	var deSelectAll_2 = new record_2({
		taskstatusname : '' + getResource('resourceParam808') + '',
		taskstatusid : '-2'
	});

	taskStauts.on('expand', function(combo) {
		var store = combo.getStore();
		var firstRecord = store.getAt(0);
		if (firstRecord.data.taskstatusid == -1
				|| firstRecord.data.taskstatusid == -2) {
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
		if (record.data.taskstatusid == -1) {
			// click selectAll
			record.set('checked', false);
			combo.getStore().remove(record);
			combo.getStore().insert(0, deSelectAll_2);
            combo.selectAll();
            combo.getStore().getAt(0).set('checked',false);
			// combo.fireEvent('blur');
		} else if (record.data.taskstatusid == -2) {
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
				if (checkSum < (combo.getStore().getCount() - 1)) {
					combo.getStore().remove(combo.getStore().getAt(0));
					combo.getStore().insert(0, selectAll_2);
				}
				if (checkSum == (combo.getStore().getCount() - 1)) {
					combo.getStore().remove(combo.getStore().getAt(0));
					combo.getStore().insert(0, deSelectAll_2);
				}
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
			taskCategory.setRawValue("" + getResource('resourceParam1473') + "");
		}
		mytaskMain.leixingming = "";
		mytaskMain.leix = params;
		mytaskMain.baseargsfz = {
			role : 'fuze',
			fanwei : 'man',
			taskstatusstr : mytaskMain.ztai,
			taskcategorystr : mytaskMain.leix,
			projects : mytaskMain.pros,
			plannedstartstr : null,
			plannedendstr : null,
			taskname : null,
            actualendstr : null,
            actualstartstr : null
		};
		myGrid.loadvalue(mytaskMain.grid.store, mytaskMain.args, mytaskMain.baseargsfz);
	});

	taskStauts.on('blur', function() {
		var temp = taskStauts.getValue();
		var str = '';
		var params = "";

		if (temp.length != 0) {
			params = temp + ',';
		} else {
			taskStauts.setRawValue("" + getResource('resourceParam1474') + "");
		}
		mytaskMain.ztaiming = str;
		mytaskMain.ztai = params;
		mytaskMain.baseargsfz = {
			role : 'fuze',
			fanwei : 'man',
			taskstatusstr : mytaskMain.ztai,
			taskcategorystr : mytaskMain.leix,
			projects : mytaskMain.pros,
			plannedstartstr : null,
			plannedendstr : null,
			taskname : null,
            actualendstr : null,
            actualstartstr : null
		};
		myGrid.loadvalue(mytaskMain.grid.store, mytaskMain.args, mytaskMain.baseargsfz);
	});
	mytaskMain.combo1 = new Ext.form.ComboBox({
		store : new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : "../JSON/tasklist_taskService.getRenwukbnCombo"
			}),
			reader : new Ext.data.JsonReader({
				totalProperty : 'totalProperty',
				root : 'results'
			}, [{
				name : 'taskstatusname'
			}, {
				name : 'taskstatusid'
			}])
		}),
		valueField : "taskstatusid",
		displayField : "taskstatusname",
		mode : 'remote',
		forceSelection : true,
		hiddenName : 'taskstatusid',
		editable : false,
		triggerAction : 'all',
		fieldLabel : '' + getResource('resourceParam1043') + '',
		name : 'taskstatusid',
		anchor : '95%'
	});

	mytaskMain.combo1.on('select', function(combo, record, num) {
		mytaskMain.ztaiming = record.data.taskstatusname;
		mytaskMain.ztai = record.data.taskstatusid;
		mytaskMain.baseargsfz = {
			role : 'fuze',
			fanwei : 'man',
			taskstatusid : mytaskMain.ztai,
			taskcategoryid : mytaskMain.leix,
			projects : mytaskMain.pros,
			plannedstartstr : null,
			plannedendstr : null,
			taskname : null
		};
		myGrid.loadvalue(mytaskMain.grid.store, mytaskMain.args, mytaskMain.baseargsfz);
	});

	mytaskMain.combo2 = new Ext.form.ComboBox({
		store : new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : "../JSON/tasklist_taskService.getSelectCombo"
			}),
			reader : new Ext.data.JsonReader({
				totalProperty : 'totalProperty',
				root : 'results'
			}, [{
				name : 'taskcategoryname'
			}, {
				name : 'taskcategoryid'
			}])
		}),
		valueField : "taskcategoryid",
		displayField : "taskcategoryname",
		mode : 'remote',
		forceSelection : true,
		hiddenName : 'taskcategoryid',
		editable : false,
		triggerAction : 'all',
		fieldLabel : '' + getResource('resourceParam1043') + '',
		name : 'taskcategoryid',
		anchor : '95%'
	});
	mytaskMain.combo2.on('select', function(combo, record, num) {
		mytaskMain.leixingming = record.data.taskcategoryname;
		mytaskMain.leix = record.data.taskcategoryid;
		mytaskMain.baseargsfz = {
			role : 'fuze',
			fanwei : 'man',
			taskstatusid : mytaskMain.ztai,
			taskcategoryid : mytaskMain.leix,
			projects : mytaskMain.pros,
			plannedstartstr : null,
			plannedendstr : null,
			taskname : null
		};
		myGrid.loadvalue(mytaskMain.grid.store, mytaskMain.args, mytaskMain.baseargsfz);
	});

	taskCategory.setRawValue("" + getResource('resourceParam1473') + "");
	taskStauts.setRawValue("" + getResource('resourceParam1474') + "");
	projectCombo.setRawValue("" + getResource('resourceParam2002') + "");
}
function approveTask() {
	if (wbsdata) {
		if (wbsdata.getPlanningIds) {
			wbsdata.getPlanningIds();
			if (wbsdata.selections) {
				if (wbsdata.selections.split(',').length > 0) {
					mytaskdetails.wbsPanel.getLayout().setActiveItem(1);
					approvePanel.dataid = wbsdata.selections;
				} else {
					Ext.MessageBox.show({
						title : '' + getResource('resourceParam587'),
						msg : '' + getResource('resourceParam459') + '' + getResource('resourceParam947') + '的'
							+ getResource('resourceParam1481') + '!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
				}
			} else {
				Ext.MessageBox.show({
					title : '' + getResource('resourceParam587') + '',
					msg : '' + getResource('resourceParam459') + '' + getResource('resourceParam947') + '的'
						+ getResource('resourceParam1481') + '!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
			}
		} else {
			Ext.MessageBox.show({
				title : '' + getResource('resourceParam587') + '',
				msg : '请在' + getResource('resourceParam733') + 'wbs页面' + getResource('resourceParam503') + '要'
					+ getResource('resourceParam1062') + '的' + getResource('resourceParam733') + '!',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		}
	} else {
		Ext.MessageBox.show({
			title : '' + getResource('resourceParam587') + '',
			msg : '请在' + getResource('resourceParam733') + 'wbs页面' + getResource('resourceParam503') + '要'
				+ getResource('resourceParam1062') + '的' + getResource('resourceParam733') + '!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	}
}
function startTDE_IDE() {
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		if (size == 0) {
			Ext.MessageBox.show({
				title : '' + getResource('resourceParam587') + '',
				msg : '' + getResource('resourceParam1470') + '',
				width : 200,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			return 'false';
		}
		if (size != 1) {
			Ext.MessageBox.show({
				title : '' + getResource('resourceParam587') + '',
				msg : '' + getResource('resourceParam1468') + '',
				width : 230,
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			return 'false';
		}
	} else {
		Ext.MessageBox.show({
			title : '' + getResource('resourceParam587') + '',
			msg : '' + getResource('resourceParam1470') + '',
			width : 200,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		return 'false';
	}
	
	/**
	if(!mytaskGrid.sm.getSelected().get('isLeaf')){
		Ext.MessageBox.alert('信息', '该任务不是叶子任务，不能用IDE打开');
		return;
	}
	*/
	
	var taskid = myGrid.rows[0].data.taskid;
	var taskname = myGrid.rows[0].data.taskname;
	var projectid = myGrid.rows[0].data.projectid;
	var taskstatusid = myGrid.rows[0].data.taskstatusid;
	// if (taskstatusid != 3 && taskstatusid != 4) {// 处于未接受或进行中状态的任务才能启动IDE客户端
	if (taskstatusid != 4) {// 注释于2010-11-17 by
		// suny,如果3状态调用下面的updateTaskType方法，就只更新的任务状态。没有保存历程的其他信息
		Ext.MessageBox.alert('' + getResource('resourceParam508') + '', '' + getResource('resourceParam733') + '不'
			+ getResource('resourceParam1485') + '[' + getResource('resourceParam1117') + ']'
			+ getResource('resourceParam500') + '，不能' + getResource('resourceParam560') + '客户端完成'
			+ getResource('resourceParam733') + '！');
		return;
	}
	if (taskstatusid == 3) {// 如果是未接受的任务，则自动接受
		var taskVo = Seam.Remoting.createType("com.luck.itumserv.tasklist.TaskVo");
		taskVo.setForcesubmit("false");
		taskVo.setTaskid(taskid);
		taskVo.setTaskstatusid(4);// 任务状态修改为进行中
		callSeam("tasklist_taskService", "updateTaskType", [taskVo], function() {
			myGrid.loadvalue(mytaskMain.grid.store, mytaskMain.args, mytaskMain.baseargsfz);
		});
	}

	startup("IDE", projectid, taskid, taskname);
}

mytaskMain.restart = function() {
	var msg = '' + getResource('resourceParam9159') + '';
	if (myGrid.rows != null && myGrid.rows != '') {
		var count = myGrid.rows.length;
		var ids = '';
		for (var i = 0; i < count; i++) {
			var status = myGrid.rows[i].data.taskstatusid;
			var taskdesignatestatus = myGrid.rows[i].data.taskdesignatestatus;
			var taskdesignate = myGrid.rows[i].data.taskdesignate;
			/*
			 * by suny
			 * 根据bug218中对于重启约束的定义
			 * 只有已完成、已终止的任务可以重启（并且父任务为进行中）
			 */
			if (status != '6' && status != '7') {
				Ext.Msg.alert('' + getResource('resourceParam587') + '', msg);
				return;
			}
			if (taskdesignatestatus && taskdesignatestatus != null && taskdesignatestatus != '') { // 委派任务
				Ext.example.msg('' + getResource('resourceParam587') + '', '' + getResource('resourceParam9169') + '');
				return;
			}
			if (taskdesignate && taskdesignate != null && taskdesignate != '') { // 被委派任务
				Ext.example.msg('' + getResource('resourceParam587') + '', '' + getResource('resourceParam9169') + '');
				return;
			}
			ids += myGrid.rows[i].data.taskid + ',';
		}
		var restartMask = new Ext.LoadMask(document.body, {
			msg : getResource('resourceParam9157')
		});
		Ext.Msg.confirm('' + getResource('resourceParam575') + '', "" + getResource('resourceParam9158') + "?", function(btn) {
			if (btn == 'yes') {
				restartMask.show();
				Ext.Ajax.request({
					url : "../JSON/task_TaskRemote.restartTask",
					method : 'GET',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.success == true) {
							Ext.example.msg('' + getResource('resourceParam587') + '', '' + getResource('resourceParam5014') + '');
							mytaskMain.grid.getStore().reload();
						} else {
							Ext.MessageBox.show({
								title : '' + getResource('resourceParam499') + '提示',
								msg : obj.error,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							}).getDialog().setWidth(250); //@chenw设置提示框的宽度
						}
						restartMask.hide();
					},
					failure : function(options, response) {
						restartMask.hide();
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						node : ids
					}
				});
			}
		}).getDialog().setWidth(330);
	} else {
		Ext.MessageBox.show({
			title : '' + getResource('resourceParam587') + '',
			msg : '' + getResource('resourceParam1477') + '',
			buttons : Ext.MessageBox.OK,
			width : 180,
			icon : Ext.MessageBox.ERROR
		});
	}
}

// 反馈和日志
function feedbackOnclick(count) {

	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		if (size == 0) {
			return 'false';
		}
		if (size == 1) {
			var falg = mytaskMain.isdesignate(myGrid.rows[0].data.taskdesignate, '' + getResource('resourceParam1460') + '', "");
			if (falg == "1") {
				Ext.MessageBox.show({
					title : '' + getResource('resourceParam587') + '',
					msg : '' + getResource('resourceParam1460') + '!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
			} else if (falg == "3") {
				return;
			} else if (falg == "") {
				return;
			} else {
				var taskid = myGrid.rows[0].data.taskid;
				var taskname = myGrid.rows[0].data.taskname;
				var pid = myGrid.rows[0].data.projectid;
				mytaskMain.detailsOnclick(taskname, taskid, pid, myGrid.rows[0].data.taskstatusid);
				mytaskdetails.tabpanel.layout.setActiveItem(count);
				mytaskdetails.tabpanel.doLayout();
			}
		} else {
			Ext.MessageBox.show({
				title : '' + getResource('resourceParam587') + '',
				msg : '' + getResource('resourceParam1468') + '！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		}
	} else {
		Ext.MessageBox.show({
			title : '' + getResource('resourceParam587') + '',
			msg : '' + getResource('resourceParam1470') + '',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	}

}

// 接受和委派面板操作
function operateOnclick(operate) {
	if (operate == 0) { // 接受
		mytaskMain.accept();
		mytaskMain.cenpanel.layout.setActiveItem(0);
	} else if (operate == 1) { // 委派
		if (myGrid.rows != null) {
			var count = myGrid.rows.length;
			for (var i = 0; i < count; i++) {
				if (myGrid.rows[i].data.taskdesignate == '3' || myGrid.rows[i].data.taskdesignate == '4') {
					Ext.example.msg('' + getResource('resourceParam587') + '', '' + getResource('resourceParam9104') + '');
					return;
				}
			}
		}
		mytaskMain.taskids = null;
		var flag = mytaskMain.functioncodes();
		if (flag == "false") {
			Ext.MessageBox.show({
				title : '' + getResource('resourceParam587') + '',
				msg : '' + getResource('resourceParam1456') + '',
				buttons : Ext.MessageBox.OK,
				width : 330,
				icon : Ext.MessageBox.ERROR
			});
		} else if (flag != "false" && flag != "1" && flag != "3") {
			mytaskMain.taskids = flag;
			mytaskMain.hh = "<div class='x-panel-header x-unselectable " + "x-accordion-hd' align='left'>" + "&nbsp;&nbsp;"
				+ getResource('resourceParam1479') + ":" + mytaskMain.designatetaskname + "</div>";
			mytaskMain.cenpanel.layout.setActiveItem(1);
		}
	} else if (operate == 6) {
		if (myGrid.rows != null) {
			var a = myGrid.rows.length;
			if (a != 1) {
				Ext.MessageBox.show({
					title : '' + getResource('resourceParam587') + '',
					msg : '' + getResource('resourceParam1475') + '!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
				return;
			}
			var b = myGrid.rows[0].data.taskdesignate;
			if (b == "3") {
				mytaskMain.isdesignate(myGrid.rows[0].data.taskdesignate, '' + getResource('resourceParam1466') + '', '');
				return;
			}
			var status = myGrid.rows[0].data.taskstatusid;
			if (status != 4) {
				Ext.example.msg('' + getResource('resourceParam587') + '', '' + getResource('resourceParam9102') + '!');
				/**
				 * Ext.MessageBox.show({ title : '' +
				 * getResource('resourceParam587') + '', msg : '' +
				 * getResource('resourceParam9102') + '!', buttons :
				 * Ext.MessageBox.OK, icon : Ext.MessageBox.ERROR });
				 */
				return;
			}
			var taskid = myGrid.rows[0].data.taskid;
			var pid = myGrid.rows[0].data.projectid;
			var taskname = myGrid.rows[0].data.taskname;
			mytaskMain.detailsOnclick(taskname, taskid, pid, myGrid.rows[0].data.taskstatusid);
			mytaskdetails.tabpanel.layout.setActiveItem(3);
		} else {
			Ext.example.msg('' + getResource('resourceParam587') + '', '' + getResource('resourceParam1475') + '!');
			return;
		}

		/**
		 * if (myGrid.rows != null) { mytaskMain.startP2MMask.show();
		 * startP2M("P2M", pid, taskid);
		 * setInterval("mytaskMain.startP2MMask.hide()", 3000); } else {
		 * Ext.MessageBox.show({ title : '' + getResource('resourceParam587') +
		 * '', msg : '' + getResource('resourceParam1475') + '!', buttons :
		 * Ext.MessageBox.OK, icon : Ext.MessageBox.ERROR }); }
		 */
	}
}
// 提交任务
function commitOnclick() {
	mytaskMain.taskids = null;
	var flag = mytaskMain.functioncommitcodes();
	if (flag == "false") {
		Ext.MessageBox.show({
			title : '' + getResource('resourceParam587') + '',
			msg : '' + getResource('resourceParam1455') + '',
			buttons : Ext.MessageBox.OK,
			width : 330,
			icon : Ext.MessageBox.ERROR
		});
	} else if (flag != "false" && flag != "1" && flag != "3") {

		mytaskMain.taskids = flag;

		var len = mytaskMain.taskids.length;
		if (len != 1) {
			Ext.MessageBox.show({
				title : '' + getResource('resourceParam587') + '',
				msg : '不能选择多个任务提交！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.INFO
			});
			return;
		}

		// 验证提交的任务是否可以同时进行处理
		var directSum = 0;
		var randomSum = 0;
		var superSum = 0;
		for (var i = 0; i < mytaskMain.taskids.length; i++) {
			if (mytaskMain.approvallist[i] == 0) {
				directSum++;
			} else if (mytaskMain.approvallist[i] == 1) {
				randomSum++;
			} else if (mytaskMain.approvallist[i] == 2) {
				superSum++;
			}
		}

		if (directSum > 0 && randomSum == 0 && superSum == 0) { // 所有任务都不需要审批
		} else if (directSum == 0 && randomSum > 0 && superSum == 0) {
		} else if (directSum == 0 && randomSum == 0 && superSum > 0) {
			if (superSum == 1) {
			} else {
				Ext.MessageBox.show({
					title : '' + getResource('resourceParam587') + '',
					msg : '' + getResource('resourceParam9120') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
				return;
			}
		} else {
			Ext.MessageBox.show({
				title : '' + getResource('resourceParam587') + '',
				msg : '' + getResource('resourceParam9121') + '',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			return;
		}
		taskCommit();
		// mytaskMain.cenpanel.layout.setActiveItem(2);
		// mytaskMain.commitObject = new Object();
		// mytaskMain.commitObject.commitTaskNames = mytaskMain.commitTaskNames;
		// mytaskMain.commitObject.commitProIds = mytaskMain.ptids;
		// mytaskMain.commitObject.commitTaskIds = mytaskMain.taskids;
	}

}
// 调整任务
function taskdesignateOnclick() {
	mytaskMain.taskids = null;
	var flag = mytaskMain.adjustmentcodes();
	if (flag == "false") {
		Ext.MessageBox.show({
			title : '' + getResource('resourceParam587') + '',
			msg : '' + getResource('resourceParam1477') + '',
			buttons : Ext.MessageBox.OK,
			width : 180,
			icon : Ext.MessageBox.ERROR
		});
	} else if (flag == "1") {
		Ext.MessageBox.show({
			title : '' + getResource('resourceParam587') + '',
			msg : '' + getResource('resourceParam1464') + '',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	} else if (flag == "3") {
		return;

	} else if (flag == "") {
		return;

	} else if (flag == "zhuangtai") {
		Ext.MessageBox.show({
			title : '' + getResource('resourceParam587') + '',
			msg : '' + getResource('resourceParam9107') + '',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	} else {
		if (flag.length == 1) {
			mytaskMain.taskids = flag;
			mytaskMain.hh = "<div class='x-panel-header x-unselectable " + "x-accordion-hd' align='left'>" + "&nbsp;&nbsp;"
				+ getResource('resourceParam1478') + ":" + mytaskMain.designatetaskname + "</div>";
			mytaskMain.cenpanel.layout.setActiveItem(2);
		} else {
			Ext.MessageBox.show({
				title : '' + getResource('resourceParam587') + '',
				msg : '' + getResource('resourceParam9170') + '',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		}
	}
}
var loadTag = 0;
// 任务详细

mytaskMain.detailsOnclick = function(taskname, taskid, myObj, status, taskd) {
	
	mytaskMain.taskdW = taskd
	mytaskMain.taskname = taskname;
	mytaskMain.taskid = taskid;
	mytaskMain.taskids = taskid;
	mytaskMain.projectid = myObj;

	var hh = "<div class='x-panel-header x-unselectable " + "x-accordion-hd' align='left'>&nbsp;&nbsp;"
		+ getResource('resourceParam733') + ":<font color='red'>" + mytaskMain.taskname + "</font></div>";
	mytaskMain.cenpanel.getLayout().setActiveItem(3);
	+mytaskMain.taskname + "</font></div>";
	mytaskMain.cenpanel.getLayout().setActiveItem(3);
	Ext.getCmp('panel13').getEl().dom.innerHTML = hh;
	// Ext.getCmp("taskdetailstabpanel").setActiveTab(0);
	if (mytaskMain.attribut == 1) {
		Ext.getCmp("taskdetailstabpanel").getActiveTab().fireEvent('activate');
	}
	mytaskMain.attribut = 1;
    
    var activePanel = Ext.getCmp("taskdetailstabpanel").getActiveTab();
                        if(activePanel==null){
                            activePanel=0;
                        }
    Ext.getCmp("taskdetailstabpanel").setActiveTab(activePanel);
    
	// Ext.getCmp("taskdetailstabpanel").doLayout();
	// // 北部面板赋值
	// feedback.taskid = taskid;
	// // feedback.taskname=taskname;
	// feedback.init(taskid, taskname);
	//
	// if(status != 4)
	// {
	// Ext.getCmp('etabpanel33').disable();
	// }else
	// {
	// Ext.getCmp('etabpanel33').enable();
	// }
	// mytaskdetails.egridpanel13.add(feedback.feedBackTabPanel);
	// mytaskdetails.egridpanel13.doLayout();
	// mytaskMain.taskids = null;
	// var flag = mytaskMain.detailscodes();
	// mytaskMain.taskids = flag;
	// mytaskMain.projectid = myObj;
	// mytaskMain.taskid = taskid;
	// mytaskMain.taskname = taskname;
	// var hh = "<div class='x-panel-header x-unselectable "
	// + "x-accordion-hd' align='left'>&nbsp;&nbsp;"
	// + getResource('resourceParam733') + ":<font color='red'>"
	// + taskname + "</font></div>";
	// Ext.getCmp('panel13').getEl().dom.innerHTML = hh;
	// mytaskMain.cenpanel.layout.setActiveItem(4);
	//	
	// // myTaskColumnTree.init(0);
	// // myTaskColumnTree.loader.dataUrl =
	// // '../JSON/webremote_DataObjectRemote.getAllDataObject?id='
	// // + myObj + "." + taskid;
	// // myTaskColumnTree.dataCenterId = myObj + "." + taskid;
	// // if (loadTag != 0) {
	// // myTaskColumnTree.columnTree.getLoader()
	// // .load(myTaskColumnTree.columnTree.getRootNode());
	// // }
	// mytaskdetails.tabpanel.doLayout();
	// mytaskdetails.tabpanel.layout.setActiveItem(0);
	// // mytaskdetails.tabpanel.add(feedback.allFeedBackPanel);
	//
	// Ext.getCmp("logAttributeTask").value = taskname;
	// Ext.getCmp("logAttributeTaskId").value = taskid;
	// Ext.getCmp("addFeedBackinfo").html = "<iframe scrolling=auto
	// id='feedbackframe' frameborder=0 width=100% height=100%
	// src='../feedBackAdd.seam?temp="
	// + new Date() + "&taskid= " + taskid + "' ></iframe>";
	// Ext.getCmp("feedBackInfo").html = "<iframe scrolling=auto
	// id='feedbackinfoframe' frameborder=0 width=100% height=100%
	// src='../logInfo.seam?temp="
	// + new Date() + "&taskid= " + taskid + "&typeStr=2,' ></iframe>";
	// Ext.getCmp("taskloginfo").html = "<iframe scrolling=auto id='loginframe'
	// frameborder=0 width=100% height=100% src='../logInfo.seam?temp="
	// + new Date() + "&taskid= " + taskid + "&typeStr=1,' ></iframe>";
	// loadTag += 1;
	// TaskAttributePanel.taskId = taskid;
	// TaskAttributePanel.setBasicForm();
	// TaskAttributePanel.cardPanel.getLayout().setActiveItem(0);
}

// 接受任务
mytaskMain.accept = function() {
	mytaskMain.args.start = mytaskMain.grid.store.baseParams.start;
	mytaskMain.taskids = null;
	var acceptFlag = mytaskMain.getAcceptSelections();
	if (acceptFlag == 'false') {
		Ext.MessageBox.show({
			title : '' + getResource('resourceParam587') + '',
			msg : '' + getResource('resourceParam1457') + '',
			buttons : Ext.MessageBox.OK,
			width : 330,  //@chenw 调整提示框的宽度
			icon : Ext.MessageBox.ERROR
		});
	} else {
		if (acceptFlag.length > 1 && isApplicationid()) {
			Ext.Msg.alert(getResource('resourceParam587'), getResource('resourceParam9154'));
			return;
		}

		function yesaccept(btn) {
			if (btn == "yes") {
				var taskid = acceptFlag;
				var projectid = myGrid.rows[0].data.projectid;
				var acceptMask = new Ext.LoadMask(document.body, {
					msg : "正在接受任务,请稍候..."
				});
				acceptMask.show();
				mytaskMain.taskids = acceptFlag;
                Ext.Ajax.request({
                    url : "../JSON/mytask_MyTaskRemote.acceptTasksA",
                    method : 'POST',
                    success : function(rep){
				        acceptMask.hide();
                        var obj = Ext.util.JSON.decode(rep.responseText);
				        var result = obj.msg;
				        if (result == 'INVALIDTASK') {
							Ext.MessageBox.show({
			             		title : ''+ getResource('resourceParam587') + '', msg : ''+ getResource('resourceParam1457')+ '',
                                buttons : Ext.MessageBox.OK,
                                // minWidth : 250,
                                icon : Ext.MessageBox.ERROR
                            });
                        } else if (result == 'ERROR') {
                            Ext.MessageBox.show({ title : '' + getResource('resourceParam587')+ '',
                                minWidth : 250,
                                msg : ''+ getResource('resourceParam1177')+ '',
                                buttons : Ext.MessageBox.OK,
                                icon : Ext.MessageBox.ERROR
                            });
                        } else {
                            mytaskMain.loadtasklists();
                            mytaskMain.activejieActivities(obj.taskidsStr);
                            var name = obj.name;
                            var link = getResource('resourceParam9125') + '<a ext:qtip="' + getResource('resourceParam9124')
                                + '"style="text-decoration:underline;color:blue;padding-bottom:0px;padding-top:2px;"href="../JSON/FileDownloadServlet?type=1&path='
                                + name + '">' + name + '</a>' + getResource('resourceParam9126');
                            if (obj.path) {
                                if (obj.path.success) {
                                    try {
                                        var wsh = new ActiveXObject("WScript.Shell");
                                        var type = obj.path.type;
                                        var path = obj.path.name;
                                        var nameWF = obj.nameW
                                        if (type == 0) {
                                        	/**
                        					 * bug编号881 wangyf
                        					 * bug信息：任务关联word,txt等应用程序，第一次启动时会弹出找不到文件的提示。
                        					 * 2011-05-30 17：06
                        					 * 注：下面的"\""必须要加，去空格。
                        					 * 注：去掉参数
                        					 */
//                                            wsh.exec("\"" + path + " -taskID " + taskid + " -projectID " + projectid);
                                            wsh.run("\"" + nameWF);
                                            return;
                                        } else if (type == 1) {
                                            var ie = wsh.ExpandEnvironmentStrings("%ProgramFiles%") + '\\Internet Explorer\\IEXPLORE.EXE';
//                                            path = ie + " " + path;
                                            nameWF = ie + " " + nameWF;
                                            /**
                        					 * bug编号881 wangyf
                        					 * bug信息：任务关联word,txt等应用程序，第一次启动时会弹出找不到文件的提示。
                        					 * 2011-05-30 17：06
                        					 * 注：下面的"\""必须要加，去空格。
                        					 */
                                            wsh.run("\"" + nameWF);
                                        }
                                    } catch (ex) {
                                        if (Ext.isIE) {
                                            if ((ex.number & 0xFFFF) == 2) {
                                                Ext.MessageBox.show({
                                                    title : '' + getResource('resourceParam587') + '',
                                                    minWidth : 250,
                                                    msg : getResource('resourceParam5031') + ',' + link,
                                                    buttons : Ext.MessageBox.OK,
                                                    icon : Ext.MessageBox.ERROR
                                                });
                                            } else {
                                                Ext.MessageBox.show({
                                                    title : '' + getResource('resourceParam587') + '',
                                                    minWidth : 250,
                                                    msg : getResource('resourceParam5030') + ',' + link,
                                                    buttons : Ext.MessageBox.OK,
                                                    icon : Ext.MessageBox.ERROR
                                                });
                                            }
                                        } else {
                                            Ext.MessageBox.show({
                                                title : '' + getResource('resourceParam587') + '',
                                                minWidth : 250,
                                                msg : getResource('resourceParam5032'),
                                                buttons : Ext.MessageBox.OK,
                                                icon : Ext.MessageBox.ERROR
                                            });
                                        }
                                    }
                                }
                            } else {
                                // Ext.MessageBox.show({
                                // title : '信息提示',
                                // minWidth : 250,
                                // msg : '没有配置应用程序！',
                                // buttons : Ext.MessageBox.OK,
                                // icon : Ext.MessageBox.ERROR
                                // });
                            }
                        }
                    },
                    params : {
                        taskidsStr : mytaskMain.taskids.join(',')
                    }
				});
			}
		}
		Ext.MessageBox.show({
			title : '' + getResource('resourceParam587') + '',
			msg : '' + getResource('resourceParam7136') + '?',
			minWidth : 250,
			buttons : Ext.MessageBox.YESNO,
			icon : Ext.MessageBox.INFO,
			fn : yesaccept
		});
	}
}

// 接受任务操作选中的值
mytaskMain.getAcceptSelections = function() {
	var result = new Array();
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		if (size == 0) {
			return 'false';
		}
		for (var i = 0; i < size; i++) {
			var record = myGrid.rows[i].data.taskid;
			if (myGrid.rows[i].data.taskstatusid == contants.task.unaccepted_status) {
				result[i] = record;
			} else {
				return 'false';
			}
		}
		return result;
	}
	return 'false';
}

// 委派复选框选中的值
mytaskMain.functioncodes = function() { // 放回选中行id
	var result = new Array();
	mytaskMain.designatetaskname = '';
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		if (size == 0) {
			return 'false';
		}
		for (var i = 0; i < size; i++) {
			var record = myGrid.rows[i].data.taskid;
			var falg = mytaskMain.isdesignate(myGrid.rows[i].data.taskdesignate, 
				'' + getResource('resourceParam1461') + '', '' + getResource('resourceParam1462') + '');
			if (falg != "true") {
				return falg;
			}
			if (myGrid.rows[i].data.taskstatusid == contants.task.workning_status) {
				result[i] = record;
				mytaskMain.designatetaskname += "<a href='javascript:void(0);'" + " onclick='mytaskMain.detailsOnclick(&quot;"
					+ myGrid.rows[i].data.taskname + "&quot;," + myGrid.rows[i].data.taskid + ","
					+ myGrid.rows[i].data.projectid + "," + myGrid.rows[i].data.taskstatusid
					+ ",this);'><font color='red'>&quot;" + myGrid.rows[i].data.taskname + "&quot;、</font></a>";
			} else {
				return "false";
			}
		}
		mytaskMain.designatetaskname = util.lastsubstring(mytaskMain.designatetaskname, "、");
		return result;
	}
	return "false";
}

// 提交复选框选中的值
mytaskMain.functioncommitcodes = function() { // 放回选中行id
	var result = new Array();
	var isApproval = new Array();
	var resulttype = new Array();
	var prid = new Array();
	mytaskMain.designatetaskname = '';
	mytaskMain.approvallist = null;
	mytaskMain.commitTaskNames = new Array();
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		if (size == 0) {
			return 'false';
		}
		for (var i = 0; i < size; i++) {
			var record = myGrid.rows[i].data.taskid;
			var falg = mytaskMain.isdesignate(myGrid.rows[i].data.taskdesignate, '' + getResource('resourceParam1458'), getResource('resourceParam5033'));
			if (falg != "true") {
				return falg;
			}
			if (myGrid.rows[i].data.taskstatusid == contants.task.workning_status) {
				result[i] = record;
				isApproval[i] = myGrid.rows[i].data.isApproval;
				resulttype[i] = myGrid.rows[i].data.taskcategoryid;
				prid[i] = myGrid.rows[i].data.projectid;
				mytaskMain.designatetaskname += "<a href='javascript:void(0);' onclick='mytasktijiaoDetails(" + result[i]
					+ "," + prid[i] + ",&quot;" + myGrid.rows[i].data.taskname + "&quot;)'><font color='red'>&quot;"
					+ myGrid.rows[i].data.taskname + "&quot;、</font></a>";
				mytaskMain.commitTaskNames.push(myGrid.rows[i].data.taskname);
			} else {
				return "false";
			}
		}
		mytaskMain.tasktype = resulttype;
		mytaskMain.ptids = prid;
		mytaskMain.approvallist = isApproval;
		mytaskMain.designatetaskname = util.lastsubstring(mytaskMain.designatetaskname, "、");
		return result;
	}
	return "false";
}

// 调整复选框
mytaskMain.adjustmentcodes = function() {
	var result = new Array();
	var resultmanid = new Array();

	mytaskMain.designatetaskname = '';
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		if (size == 0) {
			return 'false';
		}
		var falg = 'true';
		for (var i = 0; i < size; i++) {
			var taskstatus = myGrid.rows[i].data.taskstatusid;
			if (typeof taskstatus == "number") {
				if (taskstatus == 1 || taskstatus == 5 || taskstatus == 6 || taskstatus == 7 || taskstatus == 11) {
					return "zhuangtai";
				}
			}
			falg = mytaskMain.isdesignate(myGrid.rows[i].data.taskdesignate, '' + getResource('resourceParam1463') + '', '');
			if (falg != "true") {
				break;
			}
			var record = myGrid.rows[i].data.taskid;
			result[i] = record;
			resultmanid[i] = myGrid.rows[i].data.issuedmanid;
			mytaskMain.designatetaskname += "<a href='javascript:void(0);'"
				+ " onclick='mytaskMain.detailsOnclick(&quot;"
				+ myGrid.rows[i].data.taskname + "&quot;,"
				+ myGrid.rows[i].data.taskid + ","
				+ myGrid.rows[i].data.projectid + ","
				+ myGrid.rows[i].data.taskstatusid
				+ ",this);'><font color='red'>&quot;"
				+ myGrid.rows[i].data.taskname + "&quot;、</font></a>";

		}
		if (falg != '1') {
			mytaskMain.chargeddepid = myGrid.rows[0].data.chargeddepid;
			mytaskMain.issuedmanname = myGrid.rows[0].data.issuedmanname;
			/**
			 * bug编号1059 wangyf
			 * bug信息：调整任务时接收人显示为简拼应该显示人名
			 * 2011-06-08 16：41
			 */
			mytaskMain.truename = myGrid.rows[0].data.truename;
			mytaskMain.instname = myGrid.rows[0].data.instname;
			mytaskMain.issuedmanid = resultmanid;
			mytaskMain.designatetaskname = util.lastsubstring(mytaskMain.designatetaskname, "、");
			return result;
		} else {
			return falg;
		}
	} else {
		return "false";
	}
}

// 任务详细复选框
mytaskMain.detailscodes = function() {
	var result = new Array();

	mytaskMain.designatetaskname = '';
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		if (size == 0) {
			return 'false';
		}
		for (var i = 0; i < size; i++) {
			var record = myGrid.rows[i].data.taskid;
			result[i] = record;
			mytaskMain.designatetaskname += "<a href='javascript:void(0);' onclick='operateOnclick(0)'><font color='red'>&quot;"
				+ myGrid.rows[i].data.taskname + "&quot;、</font></a>";
		}
		mytaskMain.designatetaskname = util.lastsubstring(mytaskMain.designatetaskname, "、");
		return result;
	}
	return "false";
}
// 重新加载tasklist记住选中的任务ID
mytaskMain.loadtasklist = function() {
	var activeItem = mytaskMain.cenpanel.layout.activeItem.id;
	if (activeItem == "mytasklistpanel") {
		Ext.example.msg('' + getResource('resourceParam587') + '', '' + getResource('resourceParam9103') + '');
		return;
	}
	mytaskMain.cenpanel.layout.setActiveItem(0);
	mytaskMain.grid.getStore().reload();
	// jumpAll.mytask('mytask');
}
// 重新加载tasklist
mytaskMain.loadtasklists = function() {
	// var activeItem = mytaskMain.cenpanel.layout.activeItem.id;
	// if (activeItem == "mytasklistpanel") {
	// Ext.example.msg('' + getResource('resourceParam587') + '', ''
	// + getResource('resourceParam9103') + '');
	// return;
	// }
	mytaskMain.grid.getSelectionModel().clearSelections();
	myGrid.rows = null;
	myGrid.row = null;
	mytaskMain.designatetaskname = null;
	mytaskMain.taskid = null;
	mytaskMain.taskids = null;
	mytaskMain.ptids = null;
	mytaskMain.cenpanel.layout.setActiveItem(0);
	mytaskMain.grid.getStore().reload();
	// jumpAll.mytask('mytask');
}

// 任务是否委派，是否为接受委派任务
mytaskMain.isdesignate = function(designatestatus, str, strs) {
	if (designatestatus == "1") {
		Ext.MessageBox.show({
			title : '' + getResource('resourceParam587') + '',
			msg : '' + getResource('resourceParam1459') + '',
			buttons : Ext.MessageBox.OK,
			minWidth : 250,
			icon : Ext.MessageBox.ERROR
		});
		return "1";
	} else if (designatestatus == "3") {
		Ext.MessageBox.show({
			title : '' + getResource('resourceParam587') + '',
			msg : '' + getResource('resourceParam1466') + '',
			minWidth : 250,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
		return "3";
	}
	// else if(designatestatus == "4")
	// {
	// Ext.MessageBox.show({
	// title : '信息提示',
	// msg : '没有权限操作',
	// minWidth : 250,
	// buttons : Ext.MessageBox.OK,
	// icon : Ext.MessageBox.ERROR
	// });
	// return "4";
	// }
	return "true";
}
// 接收委派
mytaskMain.jieshoudesignate = function(taskid) {
	Ext.MessageBox.confirm('' + getResource('resourceParam1422') + '', '' + getResource('resourceParam1471') + '', function(btn, text) {
		if (btn == 'yes') {
			Seam.Component.getInstance("TaskUser_TaskUserRemote").update(taskid, function(reslut) {
				if (reslut == "true") {
					mytaskMain.loadtasklist();
					mytaskMain.cenpanel.layout.setActiveItem(0);
					mytaskMain.grid.getStore().reload();
				} else {
					Ext.MessageBox.show({
						title : '' + getResource('resourceParam587') + '',
						msg : '' + getResource('resourceParam1480') + '',
						minWidth : 250,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
				}
			});
		}
	});
}
// 拒绝委派
mytaskMain.jujuedesignate = function(taskid) {
	refusedtoappoint.init(taskid);
}
// 委派收回
mytaskMain.recoverydesignate = function(taskid) {
	Ext.MessageBox.confirm('' + getResource('resourceParam1422') + '', '' + getResource('resourceParam1472') + '', function(btn, text) {
		if (btn == 'yes') {
			Seam.Component.getInstance("TaskUser_TaskUserRemote").recoverydesignate(taskid, function(reslut) {
				if (reslut != "true") {
					Ext.MessageBox.show({
						title : '' + getResource('resourceParam587') + '',
						msg : '' + getResource('resourceParam1465') + '',
						minWidth : 250,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
				} else {
					mytaskMain.grid.getSelectionModel().clearSelections();
					myGrid.rows = null;
					myGrid.row = null;
					mytaskMain.designatetaskname = null;
					mytaskMain.taskid = null;
					mytaskMain.taskids = null;
					mytaskMain.ptids = null;
					mytaskMain.cenpanel.layout.setActiveItem(0);
					mytaskMain.grid.getStore().reload();
				}
			});
		}
	});
}
// 扩展属性
mytaskMain.forcardform = function(taskid) {
	taskproperty.forcardform(taskid);
}

mytaskMain.createTaskDataTree = function(taskid, projectid) {
	mytaskMain.taskid = taskid;
	mytaskMain.projectid = projectid;
	mytasktijiao.mydataObjectPanel.setConfigs(mytaskMain.projectid, mytaskMain.taskid, true);
	mytaskdetails.egridpanel2.doLayout();
}

// 任务详细页面
function mytasktijiaoDetails(taskid, projectid, taskName) {
	var result = new Array();
	result[0] = taskid;
	taskproperty.panel(1, result);
	mytaskMain.createTaskDataTree(taskid, projectid);
}
function startTask() {
	// 使用工具启动任务
	if (myGrid.rows != null) {
		var len = myGrid.rows.length;
		if (len != 1) {
			// 选中一个任务
			Ext.example.msg('' + getResource('resourceParam587') + '', '' + getResource('resourceParam1475') + '!');
			return;
		}
		var b = myGrid.rows[0].data.taskdesignate;
		if (b == "3") {
			// 接受委派后才可操作
			mytaskMain.isdesignate(myGrid.rows[0].data.taskdesignate, '' + getResource('resourceParam1466') + '', '');
			return;
		}
		var status = myGrid.rows[0].data.taskstatusid;
		if (status != 4) {
			Ext.example.msg('' + getResource('resourceParam587') + '', '' + getResource('resourceParam9127') + '!');
			return;
		}
		var taskid = myGrid.rows[0].data.taskid;
		startupApplication(taskid);
	} else {
		// 选中一个任务
		Ext.MessageBox.show({
			title : '' + getResource('resourceParam587') + '',
			msg : '' + getResource('resourceParam1477') + '',
			buttons : Ext.MessageBox.OK,
			width : 180,
			icon : Ext.MessageBox.ERROR
		});
		return;
	}

}

// 重启任务
function restartTask() {
	var result = new Array();
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		if (size == 0) {
			communionMessage(getResource('resourceParam587'), getResource('resourceParam9112'));
			return;
		}
		for (var i = 0; i < size; i++) {
			var taskstatus = myGrid.rows[i].data.taskstatusid;
			if (typeof taskstatus == "number") {
				if (taskstatus != 6 && taskstatus != 7) {
					communionMessage(getResource('resourceParam587'), getResource('resourceParam9113'));
					return;
				}
			}
			var record = myGrid.rows[i].data.taskid;
			result[i] = record;
			delete taskstatus;
		}
		delete size;
		delete result;
	}
}
// 终止任务
function stopTask() {
	var result = new Array();
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		if (size == 0) {
			communionMessage(getResource('resourceParam587'), getResource('resourceParam9110'));
			return;
		}
		for (var i = 0; i < size; i++) {
			var taskstatus = myGrid.rows[i].data.taskstatusid;
			if (typeof taskstatus == "number") {
				if (taskstatus != 4) {
					communionMessage(getResource('resourceParam587'), getResource('resourceParam9111'));
					return;
				}
			}
			var record = myGrid.rows[i].data.taskid;
			result[i] = record;
			delete taskstatus;
		}
		delete size;
		delete result;
	}
}
// 公共信息提示
function communionMessage(title, context) {
	Ext.MessageBox.show({
		title : title,
		msg : context,
		buttons : Ext.MessageBox.OK,
		icon : Ext.MessageBox.INFO
	});
}
function isApplicationid() {
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		for (var i = 0; i < size; i++) {
			var s = myGrid.rows[i].data.applicationid;
			if (s != null && s != 0 && s != undefined) {
				return true;
			}
		}
	}
	return false;
}

// zjg 任务提交
function taskCommit() {
	// 为当前按钮绑定事件
	var directApprove = new Array(); // 不需要审批的任务id集合
	var directSum = 0;
	var directIds = '';
	var randomApprove = new Array(); // 自由选择审批人审批的任务id集合
	var randomSum = 0;
	var randomIds = '';
	var superApprove = new Array(); // 上级任务负责人审批的任务id集合
	var superSum = 0;
	var superIds = ''
	for (var i = 0; i < mytaskMain.taskids.length; i++) {
		if (mytaskMain.approvallist[i] == 0) {
			directApprove[directSum] = mytaskMain.taskids[i];
			directSum++;
		} else if (mytaskMain.approvallist[i] == 1) {
			randomApprove[randomSum] = mytaskMain.taskids[i];
			randomIds += mytaskMain.taskids[i] + ',';
			randomSum++;
		} else if (mytaskMain.approvallist[i] == 2) {
			superApprove[superSum] = mytaskMain.taskids[i];
			superIds += mytaskMain.taskids[i] + ',';
			superSum++;
		}
	}
	if (directSum > 0 && randomSum == 0 && superSum == 0) { // 所有任务都不需要审批
		var info = "是否进行提交操作（有子任务将会全部终止）？";
		Ext.Msg.confirm('' + getResource('resourceParam575') + '', info, function(btn) {
			if (btn == 'yes') {
				var mask = new Ext.LoadMask(document.body, {
					msg : '正在提交,请稍候...'
				});
				mask.show();
				var appVo = Seam.Remoting.createType("com.luck.itumserv.mytask.MyTaskVo");
				appVo.setValid(false);
				appVo.setTaskids(directApprove);
				callSeam("mytask_MyTaskRemote", "isApproval", [appVo], function(result) {
					if (result == "true") {
						mytaskMain.loadtasklists();
                        mask.hide();
                        mytaskMain.activeAfterActivities(directApprove);
					} else if (result == "false") {
						Ext.MessageBox.show({
							title : getResource('resourceParam5034'),
							msg : getResource('resourceParam5035'),
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.ERROR
						});
                        mask.hide();
					} else {
						Ext.Msg.confirm(''+ getResource('resourceParam575')+ '', 
							"有子任务没有完成，继续操作会将所有未完成的子任务终止，是否继续？", function(btn) {
							if (btn == 'yes') {
								var mask1 = new Ext.LoadMask(
										document.body,
										{
											msg : '正在提交,请稍候...'
										});
								mask1.show();
								var appVo = Seam.Remoting.createType("com.luck.itumserv.mytask.MyTaskVo");
								appVo.setValid(true);
								appVo.setTaskids(directApprove);
								callSeam("mytask_MyTaskRemote","isApproval",[appVo],function(result) {
									if (result == "true") {
										mytaskMain.loadtasklist();
                                        mask1.hide();
                                   		mytaskMain.activeAfterActivities(directApprove);
									} else if (result == "false") {
										Ext.MessageBox.show({title : getResource('resourceParam5034'),
											msg : getResource('resourceParam5035'),
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
                                         mask.hide();
									}
								});
							}
						});
					}
				});
			}
		});

	} else if (directSum == 0 && randomSum > 0 && superSum == 0) {
		mytaskMain.cenpanel.remove(mytaskMain.card6, true);
		mytaskMain.card6 = approvePanel.init(mytaskMain.cenpanel, randomIds, 'TaskDataType', (function canelApproval() {
			mytaskMain.cenpanel.layout.setActiveItem(0);
		}), '' + getResource('resourceParam1486') + '');
		mytaskMain.cenpanel.layout.setActiveItem(4);
		mytaskMain.card6.doLayout();
	} else if (directSum == 0 && randomSum == 0 && superSum > 0) {
		if (superSum == 1) {
			mytaskMain.cenpanel.remove(mytaskMain.card6, true);
			mytaskMain.card6 = approvePanel.init(mytaskMain.cenpanel, superIds, 'TaskDataType', (function canelApproval() {
				mytaskMain.cenpanel.layout.setActiveItem(0);
			}), '' + getResource('resourceParam1486') + '');
			mytaskMain.cenpanel.layout.setActiveItem(4);
			mytaskMain.card6.doLayout();
			Ext.Ajax.request({
				url : "../JSON/mytask_MyTaskRemote.getSuperLeader",
				method : 'POST',
				params : {
					taskid : superApprove[0]
				},
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					approvePanel.participantsGrid.getTopToolbar().disable();
					var approvalUserRecord = Ext.data.Record.create([{
						name : 'userid'
					}, {
						name : 'truename'
					}, {
						name : 'ginstitutename'
					}, {
						name : 'usertype'
					}]);
					var record = new approvalUserRecord({
						userid : obj.result.userid,
						truename : obj.result.truename,
						ginstitutename : obj.result.ginstitutename,
						usertype : '' + getResource('resourceParam731') + ''
					});
					var toDataStore = approvePanel.participantsGrid.getStore();
					toDataStore.add(record);
				}
			});
		} else {
			Ext.MessageBox.show({
				title : '' + getResource('resourceParam587') + '',
				msg : '' + getResource('resourceParam9120') + '',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		}
	} else {
		Ext.MessageBox.show({
			title : '' + getResource('resourceParam587') + '',
			msg : '' + getResource('resourceParam9121') + '',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	}

}
//提交后，异步激活后续任务
mytaskMain.activeAfterActivities = function(taskids){
    Ext.Ajax.request({
        url : "../JSON/mytask_MyTaskRemote.submitNotIsApprovalMyTasksSyn",
        method : 'GET',
        params : {
            taskidsStr : taskids.join(',')
        }
    });
}
//接收后，异步操作后续任务
mytaskMain.activejieActivities = function(taskids){
    Ext.Ajax.request({
        url : "../JSON/mytask_MyTaskRemote.acceptTasksAsynchronous",
        method : 'GET',
        params : {
            taskidsStr : taskids
        }
    });
}

mytaskMain.addGridStroeORfindStroe = function()
{

}

/*
 * by suny 2011-5-23
 * 增加本地空白图片
 * 增加cookieProvider
 */
Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
Ext.onReady(mytaskMain.init, mytaskMain, true);
Ext.onReady(function() {
	if (Ext.isReady) {
		mytaskMain.getdialog();// 寤惰繜鍔犺浇 杩囨护
		var record = window.parent.getMenu.title_record;
		var type = window.parent.getMenu.jump_type;
		if (record != null && record != undefined) {
			var as = new Array();
			as[0] = record;
			myGrid.rows = as;
			if (type == "mytaskdetail") {
				mytaskMain.detailsOnclick(record.data.taskname, record.data.taskid, record.data.projectid, record.data.taskstatusid,record.data.taskdesignate);
			} else {
				record.Quit();
				type.Quit();
			}
		}
		type = null;
		window.parent.getMenu.title_record = null;
	}
});

/** tab页形式的代码
Ext.onReady(function() {
	if (Ext.isReady) {
		mytaskMain.getdialog();// 延迟加载 过滤
		window.parent.onMyTaskDetails();
	}
});
window.parent.onMyTaskDetails = function() {
	var record = window.parent.getMenu.title_record;
	var type = window.parent.getMenu.jump_type;
	if (record != null && record != undefined) {
		var as = new Array();
		as[0] = record;
		myGrid.rows = as;
		if (type == "mytaskdetail") {
			mytaskMain.detailsOnclick(record.data.taskname, record.data.taskid, record.data.projectid, record.data.taskstatusid);
		} else {
			record.Quit();
			type.Quit();
		}
	} else {
		mytaskMain.cenpanel.layout.setActiveItem(0);
		mytaskMain.grid.getStore().reload();
	}
	type = null;
	window.parent.getMenu.title_record = null;
}
*/