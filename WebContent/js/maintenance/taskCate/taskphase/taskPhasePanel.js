/*
 * ! Ext JS Library 3.0.3 Copyright(c) 2006-2009 Ext JS, LLC licensing@extjs.com
 * http://www.extjs.com/license
 */
// 任务阶段返回按钮代码实现
function back(id, name) {
	taskCateMain.taskCatepanel.getLayout().setActiveItem(0);
	window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML = ''
			+ getResource('resourceParam1635') + '' + name;
}
taskPhasePanel = {
	grid : null,
	removerecords : [],
	count : 1
};
taskPhasePanel.init = function() {
	Ext.QuickTips.init();
	// 后台读取的数据
	var Employee = Ext.data.Record.create([{
				name : 'taskphaseid',
				type : 'int'
			}, {
				name : 'taskcategoryid',
				type : 'int'
			}, {
				name : 'phasename',
				type : 'string'
			}, {
				name : 'phasepercent',
				type : 'int'
			}]);
	// 调用的后台的具体方法
	var url = "../JSON/taskCateGory_taskPhase_TaskPhaseRemote.queryTaskPhase";
	var proxy = new Ext.data.HttpProxy({
				url : url,
				method : 'GET'
			});
	// 接值方式
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'userid'
			}, Employee);
	// 前台数据存储
	var store = new Ext.data.GroupingStore({
				proxy : proxy,
				reader : reader
			});
	// 复选框
	var sm = new Ext.grid.CheckboxSelectionModel();
	// 显示的字段
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), sm, {
			id : 'phasename',
			header : '' + getResource('resourceParam7073')//任务阶段
					+ getResource('resourceParam480') + '',
			dataIndex : 'phasename',
			width : 220,
			editor : {
				maxLength : 15,
				maxLengthText : ''+getResource('resourceParam7073')+getResource('resourceParam9174')+'',//选取的密级大于负责人的密级,请重新选取负责人
				xtype : 'textfield',
				allowBlank : false,
				invalidText : '' + getResource('resourceParam7073')
						+ getResource('resourceParam1715') + ''
			}
		}, {
			id : 'phasepercent',
			header : '' + getResource('resourceParam7073')
					+ getResource('resourceParam4023') + '(%)',
			dataIndex : 'phasepercent',
			width : 300,
			editor : {
				xtype : 'textfield',
				regex : /^([1-9]|[1-9][0-9])?$/,  //修改人：chenw 修改问题：只能输入1-99之间的整数
				regexText : '' + getResource('resourceParam7120') + '',
				allowBlank : false,
				invalidText : '' + getResource('resourceParam7120') + ''
			}
		}]
	});
	// 按钮
	var tb = [{
				iconCls : 'priv-add',
				text : '' + getResource('resourceParam647') + '',//添加
				handler : function() {
				if(taskPhasePanel.count!=10)
					{
					var e = new Employee({
										phasename : ''
												+ getResource('resourceParam1075') + '',//新建数据
										phasepercent : 10 * taskPhasePanel.count
									});
					}else{
						var e = new Employee({
							phasename : ''
									+ getResource('resourceParam1075') + '',
							phasepercent : 99
						});
					}
					if (taskPhasePanel.count != 10) {
						taskPhasePanel.count += 1;
					}
					editor.stopEditing();
					e.markDirty();
					store.insert(0, e);
					taskPhasePanel.grid.getView().refresh();
					taskPhasePanel.grid.getSelectionModel().selectRow(0);
					editor.startEditing(0);
				}
			}, {
				ref : '../removeBtn',
				iconCls : 'priv-del',
				text : '' + getResource('resourceParam475') + '',//删除
				disabled : true,
				handler : function() {
					//bug:186  添加删除时的提醒按钮
					Ext.MessageBox.confirm(''+getResource('resourceParam596')+'', ''+getResource('resourceParam1274')+'?', function(
									btn) {
										if(btn=='yes')
										{
												editor.stopEditing();
											var s = taskPhasePanel.grid.getSelectionModel()
													.getSelections();
											taskPhasePanel.removerecords = s;
											for (var i = 0, r; r = s[i]; i++) {
												store.remove(r);
											}
										}
									})
					
				
				}
			}, {
				ref : '../saveBtn',
				iconCls : 'save1',
				text : '' + getResource('resourceParam5019') + '',//保存
				disabled : false,
				handler : function(button) {
					button.disable();
					editor.stopEditing();
					var loadmask = new Ext.LoadMask(Ext.getBody(), {
								msg : getResource('resourceParam4039')//'正在提交，请稍候。。。
							});
					loadmask.show();
					var addlist = new Array();
					var store = taskPhasePanel.grid.getStore();
					store.findBy(function(record, id) {
								if (record.get("taskphaseid") === undefined) {
									addlist.push(record)
								}
							}, store)
					var tpvos = Seam.Remoting
							.createType("com.luck.itumserv.maintenance.taskCateGory.taskPhase.TaskPhaseVo");
					var list = new Array();
					for (var i = 0; i < store.getModifiedRecords().length; i++) {
						var tpvo = Seam.Remoting
								.createType("com.luck.itumserv.maintenance.taskCateGory.taskPhase.TaskPhaseVo");
						var modifiedRecord = store.getModifiedRecords()[i];
						if (modifiedRecord.get("taskphaseid") != undefined) {
							tpvo.setUpdateStatus(1);
							tpvo.setTaskphaseid(modifiedRecord
									.get('taskphaseid'));
							tpvo
									.setTaskcategoryid(taskCateMain.baseargs.taskcategoryid);
							tpvo.setPhasename(modifiedRecord.get('phasename'));
							tpvo.setPhasepercent(modifiedRecord
									.get('phasepercent'));
							list.push(tpvo);
						}
					}

					for (var j = 0; j < addlist.length; j++) {
						var tpvo = Seam.Remoting
								.createType("com.luck.itumserv.maintenance.taskCateGory.taskPhase.TaskPhaseVo");
						tpvo
								.setTaskcategoryid(taskCateMain.baseargs.taskcategoryid);
						tpvo.setPhasename(addlist[j].get('phasename'));
						tpvo.setPhasepercent(addlist[j].get('phasepercent'));
						tpvo.setUpdateStatus(0);
						list.push(tpvo);
					}
					var removedRecords = taskPhasePanel.removerecords;
					if (removedRecords != null) {
						for (var k = 0; k < removedRecords.length; k++) {
							if (removedRecords[k].get('taskphaseid') != undefined
									&& removedRecords[k].get('taskphaseid') != "") {
								var tpvo = Seam.Remoting
										.createType("com.luck.itumserv.maintenance.taskCateGory.taskPhase.TaskPhaseVo");
								tpvo
										.setTaskcategoryid(taskCateMain.baseargs.taskcategoryid);
								tpvo.setPhasename(removedRecords[k]
										.get('phasename'));
								tpvo.setPhasepercent(removedRecords[k]
										.get('phasepercent'));
								tpvo.setTaskphaseid(removedRecords[k]
										.get('taskphaseid'));
								tpvo.setUpdateStatus(2);
								list.push(tpvo);
							}
						}
					}
					tpvos.setList(list);
					if (list.length == 0) {
						button.enable();
						loadmask.hide();
						return;
					}
					var mark = 0;
					for (i = 0; i < store.getCount() - 1; i++) {
						for (j = i + 1; j < store.getCount(); j++) {
							if (store.getAt(i).get('phasepercent') == store
									.getAt(j).get('phasepercent')
									|| store.getAt(i).get('phasename') == store
											.getAt(j).get('phasename')) {
								mark = 1;
							}
						}
					}
					if (mark == 0) {
						Seam.Component
								.getInstance("taskCateGory_taskPhase_TaskPhaseRemote")
								.addupdatedelTaskPhase(
										tpvos,
										taskPhasePanel.refresh = function(
												result) {
											taskPhasePanel.grid
													.getSelectionModel()
													.clearSelections();
											taskPhasePanel.grid.getStore()
													.reload({
														params : {
															start : 0,
															limit : 25,
															taskcategoryid : taskCateMain.baseargs.taskcategoryid
														}
													});
											taskPhasePanel.grid.getView()
													.refresh();
											taskPhasePanel.grid.getStore()
													.commitChanges();
											taskPhasePanel.removedRecords = [];
											loadmask.hide();
											button.enable();
											if (result != "false") {
												Ext.example
														.msg(
																""
																		+ getResource('resourceParam575')
																		+ "",
																""
																		+ getResource('resourceParam1072')
																		+ "");
											}
										});
					} else {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam634')
											+ '',
									msg : '' + getResource('resourceParam7076')+"!"
											+ '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						// taskPhasePanel.grid.getStore().reload({
						// params : {
						// start : 0,
						// limit : 25,
						// taskcategoryid : taskCateMain.baseargs.taskcategoryid
						// }
						// });
						// taskPhasePanel.grid.getView().refresh();
						button.enable();
						loadmask.hide();
						return;
					}
				}
			}, {
				iconCls : 'priv-del',
				text : '' + getResource('resourceParam944') + '',
				handler : function() {
					back(taskPhaseMain.taskcategoryid,
							taskPhaseMain.taskcategoryname)
				}
			}];
	Ext.ux.grid.msgRowEditor = Ext.extend(Ext.ux.grid.RowEditor, {
				showTooltip : function(msg) {
				}
			});
	var editor = new Ext.ux.grid.msgRowEditor({
				clicksToEdit : 2,
				saveText : '' + getResource('resourceParam479') + '',//确定
				cancelText : '' + getResource('resourceParam3001') + ''//取消
			});
	// 任务阶段面板
	// taskPhasePanel.grid = myGrid.initBox(store, cm, tb,sm,editor);
	taskPhasePanel.grid = new Ext.grid.GridPanel({
				store : store,
				width : 600,
				sm : sm,
				region : 'center',
				margins : '0 5 5 5',
				autoExpandColumn : 'phasename',
				plugins : [editor],
				view : new Ext.grid.GroupingView({
							markDirty : true
						}),
				tbar : tb,
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : store,
							displayInfo : true,
							displayMsg : '' + getResource('resourceParam7074')//显示第{0}条到{1}条记录，一共{2}条
									+ '',
							emptyMsg : "" + getResource('resourceParam7075')//没有记录
									+ ""
						}),
				cm : cm
			});
	// var layout = new Ext.Panel({
	// layout : 'fit',
	// border : false,
	// layoutConfig : {
	// columns : 1
	// },
	// width : 600,
	// height : 600,
	// items : [taskPhasePanel.grid]
	// });
	// layout.render(Ext.getBody());

	taskPhasePanel.grid.getSelectionModel().on('selectionchange', function(sm) {
				taskPhasePanel.grid.removeBtn.setDisabled(sm.getCount() < 1);
			});
	return taskPhasePanel.grid;
};
