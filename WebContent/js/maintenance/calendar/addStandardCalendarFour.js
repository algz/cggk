addStandardCalendarFour = {
	removerecords : [],
	update_id : null
}
renderEception = function(value) {
	if (value == 1) {
		return getResource('resourceParam512');
	} else if (value == 0) {
		return getResource('resourceParam510');
	} else {
		return value;
	}
}
// 创建第四步面板
addStandardCalendarFour.init = function() {
	var bwidth = Ext.getBody().getWidth();
	// 创建实例
	var calendar_exception = Ext.data.Record.create([{
				name : 'exception_id'
			}, {
				name : 'exception_begin',
				type : 'date',
				dateFormat : 'Y-n-j'
			}, {
				name : 'exception_end',
				type : 'date',
				dateFormat : 'Y-n-j'
			}, {
				name : 'work_or_not'
			}, {
				name : 'exception_notes'
			}]);
	// 调用的后台的具体方法
	var url = '../JSON/calendar_StandardCalendarRemote.getStandardCalendarExceptionsListByCalendarId';
	var proxy = new Ext.data.HttpProxy({
				url : url,
				method : 'GET'
			});
	// 接值方式
	var reader = new Ext.data.JsonReader({
		root : 'results',
		totalProperty : 'totalProperty'
			// id : 'calendar_id'
		}, calendar_exception);
	// 前台数据存储
	var store = new Ext.data.GroupingStore({
				proxy : proxy,
				reader : reader,
				sortInfo : {
					field : 'exception_begin',
					direction : 'ASC'
				}
			});
	// 是否是工作日数据
	var data = [['' + getResource('resourceParam510') + ''],
			['' + getResource('resourceParam512') + '']];
	var pdstore = new Ext.data.SimpleStore({
				fields : ['text'],
				data : data
			});
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), sm, {
			id : 'work_or_not',
			header : '' + getResource('resourceParam7093') + '',
			dataIndex : 'work_or_not',
			width : 50,
			editor : {
				xtype : 'combo',
				store : pdstore,
				triggerAction : 'all',
				editable : false,
				valueField : 'text',
				displayField : 'text',
				mode : 'local',
				allowBlank : false
			},
			renderer : renderEception
		}, {
			id : 'exception_begin',
			xtype : 'datecolumn',
			header : '' + getResource('resourceParam1269') + '',
			dataIndex : 'exception_begin',
			width : 50,
			format : 'Y-m-d',
			editor : {
				xtype : 'datefield',
				format : 'Y-m-d',
				// minValue : Ext.util.Format.date(new Date(), 'Y-m-d'),
				editable : false,
				allowBlank : false
			}
		}, {
			id : 'exception_end',
			xtype : 'datecolumn',
			header : '' + getResource('resourceParam1270') + '',
			dataIndex : 'exception_end',
			width : 50,
			format : 'Y-m-d',
			editor : {
				xtype : 'datefield',
				format : 'Y-m-d',
				// minValue : Ext.util.Format.date(new Date(), 'Y-m-d'),
				editable : false,
				allowBlank : false
			}
		}, {
			id : 'exception_notes',
			header : '' + getResource('resourceParam467') + '',
			dataIndex : 'exception_notes',
			editor : {
				xtype : 'textfield',
				allowBlank : false
			}
		}]
	});
	Ext.ux.grid.msgRowEditor = Ext.extend(Ext.ux.grid.RowEditor, {
				showTooltip : function(msg) {
				}
			});
	var editor = new Ext.ux.grid.msgRowEditor({
				clicksToEdit : 2,
				saveText : '' + getResource('resourceParam478') + '',
				cancelText : '' + getResource('resourceParam3001') + ''
			});
	var tb = ['-', {
		id : 'add_app',
		text : '' + getResource('resourceParam477') + '',
		iconCls : 'user-add',
		handler : function() {
			var e = new calendar_exception({
						work_or_not : '' + getResource('resourceParam512') + '',
						exception_begin : Ext.util.Format.date(new Date(),
								'Y-m-d'),
						exception_end : Ext.util.Format.date(new Date(),
								'Y-m-d'),
						exception_notes : '' + getResource('resourceParam647')
								+ getResource('resourceParam7087')
								+ getResource('resourceParam7091') + ''
					});
			editor.stopEditing();
			e.markDirty();
			store.insert(0, e);
			addStandardCalendarFour.grid_exception.getView().refresh();
			addStandardCalendarFour.grid_exception.getSelectionModel()
					.selectRow(0);
			editor.startEditing(0);
		}
	}, '-', {
		id : 'delete_app',
		text : '' + getResource('resourceParam475') + '',
		iconCls : 'user-del',
		handler : function() {
			editor.stopEditing();
			var s = addStandardCalendarFour.grid_exception.getSelectionModel()
					.getSelections();
			addStandardCalendarFour.removerecords = s;
			for (var i = 0, r; r = s[i]; i++) {
				store.remove(r);
			}
		}
	}, '-'];
	addStandardCalendarFour.grid_exception = new Ext.grid.GridPanel({
				// anchor : '50% 40%',
				width : 500,
				height : 280,
				style : 'margin-left:20px;margin-top:20px;',
				store : store,
				sm : sm,
				tbar : tb,
				cm : cm,
				border : true,
				stripeRows : true,
				autoExpandColumn : 'exception_notes',
				margins : '0 5 5 5',
				plugins : [editor],
				viewConfig : {
					forceFit : true
				},
				bbar : new Ext.PagingToolbar({
							pageSize : 10,
							store : store,
							displayInfo : true,
							displayMsg : '' + getResource('resourceParam7074')
									+ '',
							emptyMsg : "" + getResource('resourceParam7075')
									+ ""
						})
			});
	var form_exception = new Ext.form.FormPanel({
		// anchor : '50% 10%',
		width : 500,
		height : 80,
		border : false,
		style : 'margin-left:20px;margin-top:20px;',
		items : [{
			layout : 'column',
			border : false,
			// width : 600,
			defaults : {
				layout : 'form',
				border : false
			},
			items : [{
						xtype : 'button',
						// columnWidth : .1,
						style : 'margin-left:300px;',
						text : '' + getResource('resourceParam1152') + '',
						handler : function() {
							if (addStandardCalendarOne.updateStore == null) {
								store.removeAll();
							}
							StandardCalendar.mainpanel.getLayout()
									.setActiveItem(3);
						}
					}, {
						xtype : 'button',
						// columnWidth : .1,
						style : 'margin-left:20px;',
						text : '' + getResource('resourceParam3001') + '',
						handler : function() {
							Ext.MessageBox.confirm(''
											+ getResource('resourceParam596')
											+ '', ''
											+ getResource('resourceParam7109')
											+ '?' + '', function(btn) {
										if (btn == 'yes') {
											addStandardCalendarOne.formone
													.getForm().reset();
											addStandardCalendarTwo.formtwo
													.getForm().reset();
											addStandardCalendarThree.formthree
													.getForm().reset();
											store.removeAll();
											addStandardCalendarTwo.formtwo
													.getForm().items
													.get('morning_end')
													.setMinValue('12:00');
											addStandardCalendarTwo.formtwo
													.getForm().items
													.get('afternoon_begin')
													.setMinValue('13:00');
											addStandardCalendarTwo.formtwo
													.getForm().items
													.get('afternoon_end')
													.setMinValue('18:00');
											addStandardCalendarTwo.formtwo
													.getForm().items
													.get('night_begin')
													.setMinValue('18:00');
											addStandardCalendarTwo.formtwo
													.getForm().items
													.get('night_end')
													.setMinValue('18:00');
											if (addStandardCalendarOne.updateStore != null) {
												addStandardCalendarOne.formone
														.getForm().items
														.get('calendar_mode1')
														.enable();
												addStandardCalendarOne.formone
														.getForm().items
														.get('calendar_mode2')
														.enable();
												addStandardCalendarOne.formone
														.getForm().items
														.get('calendar_copy')
														.enable();
											}
											addStandardCalendarFour.update_id = null;
											addStandardCalendarOne.updateStore = null;
											StandardCalendar.mainpanel
													.getLayout()
													.setActiveItem(0);
										}
									});
						}
					}, {
						xtype : 'button',
						// columnWidth : .1,
						style : 'margin-left:20px;',
						text : '' + getResource('resourceParam5046') + '',
						handler : function(button) {
							var calendarvo = Seam.Remoting
									.createType("com.sysware.p2m.calendar.StandardCalendarVo");
							button.disable();
							editor.stopEditing();
							var loadmask = new Ext.LoadMask(Ext.getBody(), {
										msg : getResource('resourceParam4039')
									});
							loadmask.show();
							// 判断是否存在例外开始时间大于例外结束时间的情况
							var count = store.getCount();
							for (l = 0; l < count; l++) {
								if (Ext.util.Format.date(store.getAt(l)
												.get('exception_begin'),
										'Y-m-d') > Ext.util.Format.date(store
												.getAt(l).get('exception_end'),
										'Y-m-d')) {
									Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam634')
												+ '',
										msg : ''
												+ getResource('resourceParam7108')
												+ '',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
									button.enable();
									loadmask.hide();
									return;
								}
							}
							var list = new Array();
							// 接收例外情况
							for (var j = 0; j < count; j++) {
								var exception_vo = Seam.Remoting
										.createType("com.sysware.p2m.calendar.StandardCalendarExceptionsVo");
								exception_vo
										.setException_begin(Ext.util.Format
												.date(
														store
																.getAt(j)
																.get('exception_begin'),
														'Y-m-d'));
								exception_vo.setException_end(Ext.util.Format
										.date(	store.getAt(j)
														.get('exception_end'),
												'Y-m-d'));
								if (store.getAt(j).get('work_or_not') == getResource('resourceParam512')) {
									exception_vo.setWork_or_not(1);
								} else if (store.getAt(j).get('work_or_not') == getResource('resourceParam510')) {
									exception_vo.setWork_or_not(0);
								} else {
									exception_vo.setWork_or_not(store.getAt(j)
											.get('work_or_not'));
								}
								exception_vo.setException_notes(store.getAt(j)
										.get('exception_notes'));
								list.push(exception_vo);
							}
							// 设置基准日历的各种属性
							calendarvo.setList_exception(list);
							calendarvo
									.setCalendar_name(addStandardCalendarOne.formone
											.getForm().getValues().calendar_name);
							calendarvo
									.setCalendar_notes(addStandardCalendarOne.formone
											.getForm().getValues().calendar_notes);
							calendarvo
									.setMorning_begin(addStandardCalendarTwo.formtwo
											.getForm().getValues().morning_begin);
							calendarvo
									.setMorning_end(addStandardCalendarTwo.formtwo
											.getForm().getValues().morning_end);
							calendarvo
									.setAfternoon_begin(addStandardCalendarTwo.formtwo
											.getForm().getValues().afternoon_begin);
							calendarvo
									.setAfternoon_end(addStandardCalendarTwo.formtwo
											.getForm().getValues().afternoon_end);
							calendarvo
									.setNight_begin(addStandardCalendarTwo.formtwo
											.getForm().getValues().night_begin);
							calendarvo
									.setNight_end(addStandardCalendarTwo.formtwo
											.getForm().getValues().night_end);
							// 判断是否选中周一
							if (addStandardCalendarThree.formthree.getForm()
									.getValues().monday == undefined) {
								calendarvo.setMonday(0);
							} else {
								calendarvo.setMonday(1);
							}
							// 判断是否选中周二
							if (addStandardCalendarThree.formthree.getForm()
									.getValues().tuesday == undefined) {
								calendarvo.setTuesday(0);
							} else {
								calendarvo.setTuesday(1);
							}
							// 判断是否选中周三
							if (addStandardCalendarThree.formthree.getForm()
									.getValues().wednesday == undefined) {
								calendarvo.setWednesday(0);
							} else {
								calendarvo.setWednesday(1);
							}
							// 判断是否选中周四
							if (addStandardCalendarThree.formthree.getForm()
									.getValues().thursday == undefined) {
								calendarvo.setThursday(0);
							} else {
								calendarvo.setThursday(1);
							}
							// 判断是否选中周五
							if (addStandardCalendarThree.formthree.getForm()
									.getValues().friday == undefined) {
								calendarvo.setFriday(0);
							} else {
								calendarvo.setFriday(1);
							}
							// 判断是否选中周六
							if (addStandardCalendarThree.formthree.getForm()
									.getValues().saturday == undefined) {
								calendarvo.setSaturday(0);
							} else {
								calendarvo.setSaturday(1);
							}
							// 判断是否选中周天
							if (addStandardCalendarThree.formthree.getForm()
									.getValues().sunday == undefined) {
								calendarvo.setSunday(0);
							} else {
								calendarvo.setSunday(1);
							}
							// 判断是新增还是修改
							if (addStandardCalendarFour.update_id != null) {
								calendarvo
										.setCalendar_id(addStandardCalendarFour.update_id);
								calendarvo.setSign(1);// 标志为修改基准日历
							}
							Seam.Component
									.getInstance("calendar_StandardCalendarRemote")
									.addupdateCalendar(
											calendarvo,
											addStandardCalendarFour.refresh = function(
													result) {
												addStandardCalendarFour.grid_exception
														.getSelectionModel()
														.clearSelections();
												addStandardCalendarOne.formone
														.getForm().reset();
												addStandardCalendarTwo.formtwo
														.getForm().reset();
												addStandardCalendarThree.formthree
														.getForm().reset();
												store.removeAll();
												addStandardCalendarTwo.formtwo
														.getForm().items
														.get('morning_end')
														.setMinValue('12:00');
												addStandardCalendarTwo.formtwo
														.getForm().items
														.get('afternoon_begin')
														.setMinValue('13:00');
												addStandardCalendarTwo.formtwo
														.getForm().items
														.get('afternoon_end')
														.setMinValue('18:00');
												addStandardCalendarTwo.formtwo
														.getForm().items
														.get('night_begin')
														.setMinValue('18:00');
												addStandardCalendarTwo.formtwo
														.getForm().items
														.get('night_end')
														.setMinValue('18:00');
												if (addStandardCalendarOne.updateStore != null) {
													addStandardCalendarOne.formone
															.getForm().items
															.get('calendar_mode1')
															.enable();
													addStandardCalendarOne.formone
															.getForm().items
															.get('calendar_mode2')
															.enable();
													addStandardCalendarOne.formone
															.getForm().items
															.get('calendar_copy')
															.enable();
												}
												addStandardCalendarFour.update_id = null;
												addStandardCalendarOne.updateStore = null;
												addStandardCalendarFour.grid_exception
														.getView().refresh();
												addStandardCalendarFour.grid_exception
														.getStore()
														.commitChanges();
												addStandardCalendarFour.removedRecords = [];
												myGrid.loadvalue(
														StandardCalendar.panel
																.getStore(),
														StandardCalendar.args,
														null);
												StandardCalendar.mainpanel
														.getLayout()
														.setActiveItem(0);
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
											})
						}
					}]
		}]
	});

	addStandardCalendarFour.grid = new Ext.Panel({
				title : '' + getResource('resourceParam9016') + '4/4'
						+ getResource('resourceParam7104') + '',
				layout : 'anchor',
				anchorSize : {
					width : 1280,
					height : 1024
				},
				items : [addStandardCalendarFour.grid_exception, form_exception]

			})

	return addStandardCalendarFour.grid;
}