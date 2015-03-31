var teamTaskMain = {
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
teamTaskMain.init = function() {

	teamTaskMain.card1 = teamTaskList.panel();

	teamTaskMain.cenpanel = new Ext.Panel({
				region : 'center',
				layout : 'card',
				resizable : false,
				activeItem : 0,
				items : [teamTaskMain.card1]
			});
	var hh = "<div class='x-panel-header x-unselectable x-accordion-hd' align='left'>"
			+ "<div style='float:left; padding-top:0px; height:25px;'>"+getResource('resourceParam1482')+"</div>"  //过滤
			+ "<div id='taskcate1' style='float:left; padding-top:0px; height:25px;'></div>"
			+ "<div id='taskcate2' style='float:left; padding-top:0px; height:25px;'></div>"
			+ "<div id='guolv1' style='float:left; padding-top:0px; height:25px;'></div>"
			+ "<div id='guolv2' style='float:left; padding-top:0px; height:25px;'></div></div>";
	// 北面面板
	teamTaskMain.northpanel = new Ext.Panel({
				region : 'north',
				height : 30,
				layout : 'fit',
				html : hh
			});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [teamTaskMain.northpanel, teamTaskMain.cenpanel

		]

	});
	teamTaskMain.grid = teamTaskList.grid;
	// 实例化下拉框
	teamTaskMain.getdialog();
}

// 团队任务过滤界面的下拉列表
teamTaskMain.getdialog = function() {
	var chargeddepid = "";
	var chargedmanid = "";
	Ext.QuickTips.init();
    departmentUser.users("","");
    departmentUser.userComb3.width=300;
    departmentUser.userComb3.render('guolv2');
    departmentUser.userComb3.on('select',function(e){
    	chargedmanid = e.getValue();
        teamTaskList.baseargs = {
        role:'fuze',
        fanwei:'man',
        chargedmanid : chargedmanid
        }
        myGrid.loadvalue(teamTaskList.grid.store,{start:0,limit:25},teamTaskList.baseargs);
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
				width : 200,
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
				taskcategoryname : ''+getResource('resourceParam1682')+'',//选取所有任务类型
				taskcategoryid : '-1'
			});

	var deSelectAll_1 = new record_1({
				taskcategoryname : ''+getResource('resourceParam808')+'',//全部取消
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
					record.set('checked', false);
					combo.getStore().remove(record);
					//bug 440 by chenzh
					combo.getStore().insert(0, deSelectAll_1);
					combo.selectAll();
					combo.getStore().getAt(0).set('checked',false);
					/**
					 * bug编号613 wangyf
					 * bug信息：在团队任务界面，任务过滤条件勾选所有后，下拉列表框自动变小
					 * bug已修改
					 * 2011-05-13 14：27
					 */
					Ext.getCmp("taskCategory").setValue(Ext.getCmp("taskCategory").getValue().replace("-2", ""));
				} else if (record.data.taskcategoryid == -2) {
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
					//bug 440 by chenzh
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
	var taskStauts = new Ext.ux.form.LovCombo({
				id : 'taskStauts',
				renderTo : 'taskcate2',
				width : 200,
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
					combo.selectAll();
					combo.getStore().insert(0, deSelectAll_2);
					//combo.fireEvent('blur');
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
					}
					if (checkSum < (combo.getStore().getCount() - 1)) {
						combo.getStore().remove(combo.getStore().getAt(0));
						combo.getStore().insert(0, selectAll_2);
					}
					if (checkSum == (combo.getStore().getCount() - 1)) {
							combo.getStore().remove(combo.getStore().getAt(0));
							combo.getStore().insert(0, deSelectAll_2);
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
					taskCategory.setRawValue(""+getResource('resourceParam1473')+"");
				}
				teamTaskMain.leixingming = "";
				teamTaskMain.leix = params;
				teamTaskMain.baseargsfz = {
					role : 'fuze',
					fanwei : 'man',
					taskstatusstr : teamTaskMain.ztai,
					taskcategorystr : teamTaskMain.leix,
					plannedstartstr : null,
					plannedendstr : null,
					taskname : null,
					chargedmanid : departmentUser.userComb3.getValue()
				};
				myGrid.loadvalue(teamTaskMain.grid.store, teamTaskMain.args,
						teamTaskMain.baseargsfz);

			});

	taskStauts.on('blur', function() {
				var temp = taskStauts.getValue();
				var str = '';
				var params = "";

				if (temp.length != 0) {
					params = temp + ',';
				} else {
					taskStauts.setRawValue(""+getResource('resourceParam1474')+"");
				}
				teamTaskMain.ztaiming = str;
				teamTaskMain.ztai = params;
				teamTaskMain.baseargsfz = {
					role : 'fuze',
					fanwei : 'man',
					taskstatusstr : teamTaskMain.ztai,
					taskcategorystr : teamTaskMain.leix,
					plannedstartstr : null,
					plannedendstr : null,
					taskname : null,
					chargedmanid : departmentUser.userComb3.getValue()
				};
				myGrid.loadvalue(teamTaskMain.grid.store, teamTaskMain.args,
						teamTaskMain.baseargsfz);
			});
	taskCategory.setRawValue(""+getResource('resourceParam1473')+"");
	taskStauts.setRawValue(""+getResource('resourceParam1474')+"");
}

Ext.onReady(teamTaskMain.init, teamTaskMain, true)
