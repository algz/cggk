Ext.ns("mytask.queryTaskList")
mytask.queryTaskList.init = {
	queryDialog : null,
	mytaskStauts : null,
	mytaskCategory : null,
	myproject : null,
	form : function() {
		var f = new Ext.form.FormPanel({
			id : 'queryTaskform1',
			frame : true,
			fit : true,
			plain : false,
			autoScroll : true,
			fileupload : true,
			bodyStyle : 'padding:5px 5px 0;background:transparent;',
			items : [{
						layout : 'column',
						border : false,
						// defaults are applied to all child items
						// unless otherwise specified by child item
						defaults : {
							columnWidth : '.5',
							border : false
						},
						items : this.data()
					}],
			buttons : [{
				text : '查询',
				handler : function() {
					var a = f.getForm().findField('mytaskStauts').getValue();
					var b = f.getForm().findField('mytaskCategory').getValue();
					var c = f.getForm().findField('myprojectCombo').getValue();
					if (!Ext.isEmpty(a)) {
						a = a + ',';
					}
					if (!Ext.isEmpty(b)) {
						b = b + ',';
					}
					if (!Ext.isEmpty(c)) {
						c = c + ',';
					}
                    
                    var d1=f.getForm().findField('plannedstartstr').getValue();
                    var d2=f.getForm().findField('plannedendstr').getValue();
                    var d3=f.getForm().findField('actualendstr').getValue();
                    var d4=f.getForm().findField('actualstartstr').getValue();
                    
                     d1=typeof d1 === 'object' ? d1.format('Y-m-d') : '';
                     d2=typeof d2 === 'object' ? d2.format('Y-m-d') : '';
                     d3=typeof d3 === 'object' ? d3.format('Y-m-d') : '';
                     d4=typeof d4 === 'object' ? d4.format('Y-m-d') : '';
                    
					mytaskMain.baseargsfz = {
						role : 'fuze',
						fanwei : 'man',
						taskstatusstr : a,
						taskcategorystr : b,
						projects : c,
						plannedstartstr : d1,
						plannedendstr : d2,
						taskname : f.getForm().findField('taskname').getValue(),
						actualendstr : d3,
						actualstartstr : d4
					};
					myGrid.loadvalue(mytaskMain.grid.store, mytaskMain.args,
							mytaskMain.baseargsfz);
					mytask.queryTaskList.init.queryDialog.hide();
				}
			}, {
				text : '重置',
				handler : function() {
					mytask.queryTaskList.init.mytaskStauts = null;
					mytask.queryTaskList.init.mytaskCategory = null;
					mytask.queryTaskList.init.myproject = null;
					f.getForm().reset();
				}
			}, {
				text : '取消',
				handler : function() {
					mytask.queryTaskList.init.queryDialog.hide();

				}
			}]

		});
		return f;
	},
	wd : function() {
		if (!this.queryDialog) {
			tlework.addHtml(tlework.divHtml, "mytaskQuery");
			this.queryDialog = new Ext.Window({
						el : 'mytaskQuery',
						title : '' + getResource('resourceParam1700') + '',
						modal : true,
						layout : 'fit',
						width : '75%',
						height : 270,
						closeAction : 'hide',
						plain : false,
						items : this.form()
					});
		}
		this.queryDialog.show();

		this.queryDialog.on("hide", function(e) {
					mytask.queryTaskList.init.closewd();
				});
	},
	closewd : function() {
		Ext.get('mytaskQuery').dom = null;
		this.queryDialog.close();
		this.queryDialog.destroy();
		this.queryDialog = null;
	},
	data : function() {
		var individual = [{
			bodyStyle : 'padding-right:5px;',
			items : {
				xtype : 'fieldset',
				// title : '输入参数',
				bodyBorder : false,
				border : false,
				autoHeight : true,
				defaultType : 'textfield', // each item will be
				// a checkbox
				items : [{
							name : 'taskname',
							fieldLabel : '任务名称',
							anchor : '95%'
						}, this.taskStauts(), {
							xtype : 'datefield',
							fieldLabel : '' + getResource('resourceParam991')
									+ '晚于' + '',
							format : 'Y-m-d',
							name : 'plannedstartstr',
							anchor : '95%'
						}, {
							xtype : 'datefield',
							fieldLabel : '' + getResource('resourceParam856')
									+ '晚于',
							format : 'Y-m-d',
							name : 'actualstartstr',
							anchor : '95%'
						}]
			}
		}, {
			bodyStyle : 'padding-left:5px;',
			items : {
				xtype : 'fieldset',
				bodyBorder : false,
				border : false,
				// title : '输出参数',
				autoHeight : true,
				defaultType : 'textfield',
				items : [this.taskType(), this.inProject(), {
					xtype : 'datefield',
					fieldLabel : '' + getResource('resourceParam1032') + '早于'
							+ '',
					format : 'Y-m-d',
					name : 'plannedendstr',
					anchor : '95%'
				}, {
					xtype : 'datefield',
					fieldLabel : '' + getResource('resourceParam1033') + '早于',
					format : 'Y-m-d',
					name : 'actualendstr',
					anchor : '95%'
				}]
			}
		}];

		return individual;
	},

	taskType : function() {
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
					id : 'mytaskCategory',
					fieldLabel : '任务类型',
					anchor : '95%',
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
									if (i != 0) {
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
					taskcategoryname : '' + getResource('resourceParam808')
							+ '',
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
				combo.getStore().getAt(0).set('checked', false);
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

				// var temp = taskCategory.getValue();
				// var str = '';
				// var params = "";
				//			
				// if (temp.length != 0) {
				// params = temp + ",";
				// }
				// mytask.queryTaskList.init.mytaskCategory = params;
				//                    
			});
		return taskCategory;
	},
	taskStauts : function() {
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
		// statusds.on('load', function(store) {
		// // 勾选默认值，未激活、未接受、审批中
		// var record2 = store.getAt(2);
		// var name2 = record2.data.taskstatusname;
		// record2.set('checked', true);
		// var record3 = store.getAt(3);
		// var name3 = record3.data.taskstatusname;
		// record3.set('checked', true);
		// var record4 = store.getAt(4);
		// var name4 = record4.data.taskstatusname;
		// record4.set('checked', true);
		// var aa = [2, 3, 4];
		// taskStauts.setValue(aa);
		// var name = name2 + ',' + name3 + ',' + name4;
		// // taskStauts.setRawValue(name);
		// });
		var taskStauts = new Ext.ux.form.LovCombo({
					id : 'mytaskStauts',
					fieldLabel : '任务状态',
					anchor : '95%',
					hideOnSelect : false,
					maxHeight : 200,
					store : statusds,
					triggerAction : 'all',
					valueField : 'taskstatusid',
					displayField : 'taskstatusname',
					mode : 'local',
					beforeBlur : Ext.emptyFn,
					selectAll : function() {
						var i = 0;
						this.store.each(function(record) {
									if (i !== 0) {
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
				combo.getStore().getAt(0).set('checked', false);
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

				// var temp = taskStauts.getValue();
				// var str = '';
				// var params = "";
				//            
				// if (temp.length != 0) {
				// params = temp + ",";
				// }
				// mytask.queryTaskList.init.mytaskStauts = params;
			});

		return taskStauts;
	},
	inProject : function() {
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
					id : 'myprojectCombo',
					hideOnSelect : false,
					maxHeight : 200,
					store : proStore,
					triggerAction : 'all',
					fieldLabel : '所属项目',
					valueField : 'projectId',
					displayField : 'name',
					mode : 'local',
					anchor : '95%',
					beforeBlur : Ext.emptyFn,
					selectAll : function() {
						var i = 0;
						this.store.each(function(record) {
									if (i != 0) {
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
					if (firstRecord.data.projectId == -1
							|| firstRecord.data.projectId == -2) {
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
				combo.getStore().getAt(0).set('checked', false);
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

				// var temp = projectCombo.getValue();
				// var str = '';
				// var params = "";
				//            
				// if (temp.length != 0) {
				// params = temp + ",";
				// }
				// mytask.queryTaskList.init.myproject = params;
			});

		return projectCombo;
	}

}