addStandardCalendarTwo = {
	formtwo : null
};
addStandardCalendarTwo.loadData = function(copy_id) {
	addStandardCalendarFour.grid_exception.getStore().baseParams = {
		calendar_id : copy_id
	};
	// 根据基准日历ID查询到基准日历所关联的例外情况
	addStandardCalendarFour.grid_exception.getStore().load({
		params : {
			start : 0,
			limit : 10
		},
		callback : function(records, options, success) {
			for (i = 0; i < records.length; i++) {
				if (records[i].get('work_or_not') == 1) {
					records[i].set('work_or_not',
							getResource('resourceParam512'));
				}
				if (records[i].get('work_or_not') == 0) {
					records[i].set('work_or_not',
							getResource('resourceParam510'));
				}
			}
		}
	});
	// 根据基准日历ID查询基准日历信息
	var strurl = '../JSON/calendar_StandardCalendarRemote.getStandardCalendarById';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'calendar_id'
			}, ['calendar_id', 'calendar_name', 'morning_begin', 'morning_end',
					'afternoon_begin', 'afternoon_end', 'night_begin',
					'night_end', 'monday', 'tuesday', 'wednesday', 'thursday',
					'friday', 'saturday', 'sunday', 'calendar_notes']);
	addStandardCalendarOne.updateStore = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			})
	addStandardCalendarOne.updateStore.load({
		params : {
			calendar_id : copy_id
		},
		// 执行回调函数,为步骤二三赋值
		callback : function() {
			// 设置步骤二上午开始时间
			addStandardCalendarTwo.formtwo.getForm().items.get('morning_begin')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('morning_begin'));
			// 设置步骤二上午结束时间
			addStandardCalendarTwo.formtwo.getForm().items.get('morning_end')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('morning_end'));
			// 设置步骤二上午结束时间的最小时间
			addStandardCalendarTwo.formtwo.getForm().items.get('morning_end')
					.setMinValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('morning_begin'));
			// 设置步骤二下午开始时间
			addStandardCalendarTwo.formtwo.getForm().items
					.get('afternoon_begin')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('afternoon_begin'));
			// 设置步骤二下午开始时间的最小时间
			addStandardCalendarTwo.formtwo.getForm().items
					.get('afternoon_begin')
					.setMinValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('morning_end'));
			// 设置步骤二下午结束时间
			addStandardCalendarTwo.formtwo.getForm().items.get('afternoon_end')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('afternoon_end'));
			// 设置步骤二下午结束时间的最小时间
			addStandardCalendarTwo.formtwo.getForm().items.get('afternoon_end')
					.setMinValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('afternoon_begin'));
			// 设置步骤二晚上开始时间
			addStandardCalendarTwo.formtwo.getForm().items.get('night_begin')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('night_begin'));
			// 设置步骤二晚上开始时间的最小时间
			addStandardCalendarTwo.formtwo.getForm().items.get('night_begin')
					.setMinValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('afternoon_end'));
			// 设置步骤二晚上结束时间
			addStandardCalendarTwo.formtwo.getForm().items.get('night_end')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('night_end'));
			// 设置步骤二晚上结束时间的最小时间
			if (addStandardCalendarOne.updateStore.getAt(0).get('night_begin') == null
					|| addStandardCalendarOne.updateStore.getAt(0)
							.get('night_begin') == '') {
				addStandardCalendarTwo.formtwo.getForm().items.get('night_end')
						.setMinValue(addStandardCalendarOne.updateStore
								.getAt(0).get('afternoon_end'));
			} else {
				addStandardCalendarTwo.formtwo.getForm().items.get('night_end')
						.setMinValue(addStandardCalendarOne.updateStore
								.getAt(0).get('night_begin'));
			}
			// 设置步骤三星期一是否选中
			addStandardCalendarThree.formthree.getForm().items.get('monday')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('monday'));
			// 设置步骤三星期二是否选中
			addStandardCalendarThree.formthree.getForm().items.get('tuesday')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('tuesday'));
			// 设置步骤三星期三是否选中
			addStandardCalendarThree.formthree.getForm().items.get('wednesday')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('wednesday'));
			// 设置步骤三星期四是否选中
			addStandardCalendarThree.formthree.getForm().items.get('thursday')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('thursday'));
			// 设置步骤三星期五是否选中
			addStandardCalendarThree.formthree.getForm().items.get('friday')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('friday'));
			// 设置步骤三星期六是否选中
			addStandardCalendarThree.formthree.getForm().items.get('saturday')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('saturday'));
			// 设置步骤三星期天是否选中
			addStandardCalendarThree.formthree.getForm().items.get('sunday')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('sunday'));
		}
	});
}
addStandardCalendarTwo.init = function() {
	// 取得浏览器宽度
	var widths = Ext.getBody().getWidth();
	// 创建第二步form面板
	addStandardCalendarTwo.formtwo = new Ext.form.FormPanel({
		autoScroll : true,
		width : 420,
		border : false,
		title : '' + getResource('resourceParam9016') + '2/4'
				+ getResource('resourceParam7104') + '',
		bodyStyle : 'padding:10px 0px 10px 10px',
		items : [{
			layout : 'column',
			border : false,
			width : 420,
			// width : widths * 0.39,
			defaults : {
				layout : 'form',
				border : false,
				defaultType : 'timefield'
			},
			items : [{
				text : '' + getResource('resourceParam7098')
						+ getResource('resourceParam7099')
						+ getResource('resourceParam7100') + ':',
				xtype : 'label',
				columnWidth : 1,
				name : 'explain'
			}, {
				text : '' + getResource('resourceParam7101') + '',
				xtype : 'label',
				columnWidth : .15,
				name : 'explain'
			}, {
				columnWidth : .4,
				items : [{
							id : 'morning_begin',
							hideLabel : true,
							fieldLabel : '' + getResource('resourceParam7101')
									+ '',
							labelSeparator : '',
							anchor : '100%',
							increment : 30,
							emptyText : '9:00',
							value : '9:00',
							format : 'G:i',
							editable : false
						}]
			}, {
				text : '--',
				xtype : 'label',
				style : 'margin-left:2px;',
				columnWidth : .05,
				name : 'explain'
			}, {
				columnWidth : .4,
				items : [{
							id : 'morning_end',
							hideLabel : true,
							fieldLabel : '-',
							labelSeparator : '',
							increment : 30,
							emptyText : '12:00',
							anchor : '100%',
							minValue : '12:00',
							value : '12:00',
							format : 'G:i',
							editable : false
						}]
			}, {
				text : '' + getResource('resourceParam7102') + '',
				xtype : 'label',
				columnWidth : .15,
				name : 'explain'
			}, {
				columnWidth : .4,
				items : [{
							id : 'afternoon_begin',
							hideLabel : true,
							fieldLabel : '' + getResource('resourceParam7102')
									+ '',
							labelSeparator : '',
							emptyText : '13:00',
							anchor : '100%',
							increment : 30,
							minValue : '13:00',
							value : '13:00',
							format : 'G:i',
							editable : false
						}]
			}, {
				text : '--',
				xtype : 'label',
				style : 'margin-left:2px;',
				columnWidth : .05,
				name : 'explain'
			}, {
				columnWidth : .4,
				items : [{
							id : 'afternoon_end',
							hideLabel : true,
							fieldLabel : '-',
							labelSeparator : '',
							emptyText : '18:00',
							anchor : '100%',
							increment : 30,
							minValue : '18:00',
							value : '18:00',
							format : 'G:i',
							editable : false
						}]
			}, {
				text : '' + getResource('resourceParam7103') + '',
				xtype : 'label',
				columnWidth : .15,
				name : 'explain'
			}, {
				columnWidth : .4,
				items : [{
							id : 'night_begin',
							hideLabel : true,
							fieldLabel : '' + getResource('resourceParam7103')
									+ '',
							labelSeparator : '',
							anchor : '100%',
							increment : 30,
							minValue : '18:00',
							format : 'G:i',
							editable : false
						}]
			}, {
				text : '--',
				xtype : 'label',
				style : 'margin-left:2px;',
				columnWidth : .05,
				name : 'explain'
			}, {
				columnWidth : .4,
				items : [{
							id : 'night_end',
							hideLabel : true,
							fieldLabel : '-',
							labelSeparator : '',
							anchor : '100%',
							increment : 30,
							minValue : '18:00',
							format : 'G:i',
							editable : false
						}]
			}, {
				html : '&nbsp;',
				style : 'margin-top:10px;',
				xtype : 'label',
				columnWidth : .48,
				name : 'explain'
			}, {
				xtype : 'button',
				// style : 'margin-left:220px;',
				columnWidth : .12,
				text : '' + getResource('resourceParam1152') + '',
				handler : function() {
					Ext.getCmp('morning_end').setMinValue('12:00');
					Ext.getCmp('afternoon_begin').setMinValue('13:00');
					Ext.getCmp('afternoon_end').setMinValue('18:00');
					Ext.getCmp('night_begin').setMinValue('18:00');
					Ext.getCmp('night_end').setMinValue('18:00');
					if (addStandardCalendarOne.updateStore == null) {
						addStandardCalendarTwo.formtwo.getForm().reset();
					}
					StandardCalendar.mainpanel.getLayout().setActiveItem(1);
				}
			}, {
				html : '&nbsp;',
				style : 'margin-top:10px;',
				xtype : 'label',
				columnWidth : .05,
				name : 'explain'
			}, {
				xtype : 'button',
				// style : 'margin-left:20px;',
				columnWidth : .12,
				text : '' + getResource('resourceParam3001') + '',
				handler : function() {
					Ext.MessageBox.confirm('' + getResource('resourceParam596')
									+ '', '' + getResource('resourceParam7109')
									+ '?' + '', function(btn) {
								if (btn == 'yes') {
									addStandardCalendarOne.formone.getForm()
											.reset();
									Ext.getCmp('morning_end')
											.setMinValue('12:00');
									Ext.getCmp('afternoon_begin')
											.setMinValue('13:00');
									Ext.getCmp('afternoon_end')
											.setMinValue('18:00');
									Ext.getCmp('night_begin')
											.setMinValue('18:00');
									Ext.getCmp('night_end')
											.setMinValue('18:00');
									if (addStandardCalendarOne.updateStore != null) {
										addStandardCalendarOne.formone
												.getForm().items
												.get('calendar_mode1').enable();
										addStandardCalendarOne.formone
												.getForm().items
												.get('calendar_mode2').enable();
										addStandardCalendarOne.formone
												.getForm().items
												.get('calendar_copy').enable();
									}
									addStandardCalendarFour.update_id = null;
									addStandardCalendarOne.updateStore = null;
									addStandardCalendarTwo.formtwo.getForm()
											.reset();
									StandardCalendar.mainpanel.getLayout()
											.setActiveItem(0);
								}
							});
				}
			}, {
				html : '&nbsp;',
				style : 'margin-top:10px;',
				xtype : 'label',
				columnWidth : .05,
				name : 'explain'
			}, {
				xtype : 'button',
				// style : 'margin-left:20px;',
				columnWidth : .12,
				text : '' + getResource('resourceParam1151') + '',
				handler : function() {
					StandardCalendar.mainpanel.getLayout().setActiveItem(3);
				}
			}]
		}]
	})
	// 早晨开始时间判断
	Ext.getCmp('morning_begin').on('select', function(combo) {
		var field1 = parseInt(combo.getValue().replace(':', ''));
		var field2 = parseInt(Ext.getCmp('morning_end').getValue().replace(':',
				''));
		if (field1 > field2) {
			Ext.getCmp('morning_end').setValue(combo.getValue());
			Ext.getCmp('afternoon_begin').setValue(combo.getValue());
			Ext.getCmp('afternoon_end').setValue(combo.getValue());
		}
		Ext.getCmp('morning_end').setMinValue(combo.getValue());
		Ext.getCmp('afternoon_begin').setMinValue(Ext.getCmp('morning_end')
				.getValue());
		Ext.getCmp('afternoon_end').setMinValue(Ext.getCmp('afternoon_begin')
				.getValue());
		Ext.getCmp('night_begin').setMinValue(Ext.getCmp('afternoon_end')
				.getValue());
		if (Ext.getCmp('night_begin').getValue() != '') {
			var field3 = parseInt(Ext.getCmp('night_begin').getValue().replace(
					':', ''));
			if (field1 > field3) {
				Ext.getCmp('night_begin').setValue(combo.getValue());
				Ext.getCmp('night_end').setValue(combo.getValue());
			}
			Ext.getCmp('night_end').setMinValue(Ext.getCmp('night_begin')
					.getValue());
		} else {
			Ext.getCmp('night_end')
					.setMinValue(Ext.getCmp('night_begin').minValue);
		}
	})
	// 早晨结束时间判断
	Ext.getCmp('morning_end').on('select', function(combo) {
		var field1 = parseInt(combo.getValue().replace(':', ''));
		var field2 = parseInt(Ext.getCmp('afternoon_begin').getValue().replace(
				':', ''));
		if (field1 > field2) {
			Ext.getCmp('afternoon_begin').setValue(combo.getValue());
			Ext.getCmp('afternoon_end').setValue(combo.getValue());
		}
		Ext.getCmp('afternoon_begin').setMinValue(combo.getValue());
		Ext.getCmp('afternoon_end').setMinValue(Ext.getCmp('afternoon_begin')
				.getValue());
		Ext.getCmp('night_begin').setMinValue(Ext.getCmp('afternoon_end')
				.getValue());
		if (Ext.getCmp('night_begin').getValue() != '') {
			var field3 = parseInt(Ext.getCmp('night_begin').getValue().replace(
					':', ''));
			if (field1 > field3) {
				Ext.getCmp('night_begin').setValue(combo.getValue());
				Ext.getCmp('night_end').setValue(combo.getValue());
			}
			Ext.getCmp('night_end').setMinValue(Ext.getCmp('night_begin')
					.getValue());
		} else {
			Ext.getCmp('night_end')
					.setMinValue(Ext.getCmp('night_begin').minValue);
		}
	})
	// 下午开始时间判断
	Ext.getCmp('afternoon_begin').on('select', function(combo) {
		var field1 = parseInt(combo.getValue().replace(':', ''));
		var field2 = parseInt(Ext.getCmp('afternoon_end').getValue().replace(
				':', ''));
		if (field1 > field2) {
			Ext.getCmp('afternoon_end').setValue(combo.getValue());
		}
		Ext.getCmp('afternoon_end').setMinValue(combo.getValue());
		Ext.getCmp('night_begin').setMinValue(Ext.getCmp('afternoon_end')
				.getValue());
		if (Ext.getCmp('night_begin').getValue() != '') {
			var field3 = parseInt(Ext.getCmp('night_begin').getValue().replace(
					':', ''));
			if (field1 > field3) {
				Ext.getCmp('night_begin').setValue(combo.getValue());
				Ext.getCmp('night_end').setValue(combo.getValue());
			}
			Ext.getCmp('night_end').setMinValue(Ext.getCmp('night_begin')
					.getValue());
		} else {
			Ext.getCmp('night_end')
					.setMinValue(Ext.getCmp('night_begin').minValue);
		}
	})
	// 下午结束时间判断
	Ext.getCmp('afternoon_end').on('select', function(combo) {
		Ext.getCmp('night_begin').setMinValue(combo.getValue());
		if (Ext.getCmp('night_begin').getValue() != '') {
			var field1 = parseInt(combo.getValue().replace(':', ''));
			var field2 = parseInt(Ext.getCmp('night_begin').getValue().replace(
					':', ''));
			if (field1 > field2) {
				Ext.getCmp('night_begin').setValue(combo.getValue());
				Ext.getCmp('night_end').setValue(combo.getValue());
			}
			Ext.getCmp('night_end').setMinValue(Ext.getCmp('night_begin')
					.getValue());
		} else {
			Ext.getCmp('night_end')
					.setMinValue(Ext.getCmp('night_begin').minValue);
		}
	})
	// 晚上开始时间判断
	Ext.getCmp('night_begin').on('select', function(combo) {
		if (Ext.getCmp('night_end').getValue() != '') {
			var field1 = parseInt(combo.getValue().replace(':', ''));
			var field2 = parseInt(Ext.getCmp('night_end').getValue().replace(
					':', ''));
			if (field1 > field2) {
				Ext.getCmp('night_end').setValue(combo.getValue());
			}
		} else {
			Ext.getCmp('night_end').setValue(combo.getValue());
		}
		Ext.getCmp('night_end').setMinValue(combo.getValue());
	})
	// 晚上结束时间判断
	Ext.getCmp('night_end').on('select', function(combo) {
				if (Ext.getCmp('night_begin').getValue() == '') {
					Ext.getCmp('night_begin').setValue(combo.getValue());
				}
			})
	return addStandardCalendarTwo.formtwo;
}