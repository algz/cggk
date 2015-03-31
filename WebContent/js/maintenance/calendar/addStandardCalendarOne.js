addStandardCalendarOne = {
	formone : null,
	updateStore : null
};
// 当执行修改时执行的方法
addStandardCalendarOne.loadData = function(update_id) {
	Ext.getCmp('calendar_copy').getStore().load();
	// 记录当前修改基准日历ID
	addStandardCalendarFour.update_id = update_id;
	addStandardCalendarFour.grid_exception.getStore().baseParams = {
		calendar_id : update_id
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
			calendar_id : update_id
		},
		// 执行回调函数,为步骤一二三赋值
		callback : function() {
			// 设置步骤一日历名称
			addStandardCalendarOne.formone.getForm().items.get('calendar_name')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('calendar_name'));
			// 设置步骤一日历说明
			addStandardCalendarOne.formone.getForm().items
					.get('calendar_notes')
					.setValue(addStandardCalendarOne.updateStore.getAt(0)
							.get('calendar_notes'));
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

			// 屏蔽掉单选按钮和下拉列表
			addStandardCalendarOne.formone.getForm().items
					.get('calendar_mode1').disable();
			addStandardCalendarOne.formone.getForm().items
					.get('calendar_mode2').disable();
			addStandardCalendarOne.formone.getForm().items.get('calendar_copy')
					.disable();

		}
	});

}
addStandardCalendarOne.init = function() {
	// 取得浏览器宽度
	var widths = Ext.getBody().getWidth();
	// 为下拉列表取得基准日历，带分页
	var strurl = '../JSON/calendar_StandardCalendarRemote.getStandardCalendarList';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'calendar_id'
			}, [{
						name : 'calendar_id'
					}, {
						name : 'calendar_name'
					}, {
						name : 'deprecated'
					}]);
	var store = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});
	// 设置下拉列表显示的数据，若已废弃，则加上已废弃标记
	store.on('load', function() {
				store.each(function(rec) {
							if (rec.get("deprecated") == 0) {
								rec
										.set(
												'calendar_name',
												rec.get("calendar_name")
														+ "("
														+ getResource('resourceParam9091')
														+ ")");
							}
						})
			})
	// 创建第一步form面板
	addStandardCalendarOne.formone = new Ext.form.FormPanel({
		autoScroll : true,
		width : 420,
		border : false,
		title : '' + getResource('resourceParam9016') + '1/4'
				+ getResource('resourceParam7104') + '',
		bodyStyle : 'padding:10px 0px 10px 10px',
		items : [{
			layout : 'column',
			border : false,
			width : 500,
			// width : widths * 0.39,
			defaults : {
				layout : 'form',
				border : false
			},
			items : [{
						text : '' + getResource('resourceParam7088')// 创建label日历名称
								+ getResource('resourceParam480') + '',
						style : 'margin-top:20px;',
						xtype : 'label',
						columnWidth : .3,
						name : 'explain'
					}, {
						xtype : 'textfield',
						style : 'margin-top:20px;',
						allowBlank : false,
						fieldLabel : '' + getResource('resourceParam7088')// 创建文本框
								+ getResource('resourceParam480') + '',
						columnWidth : .7,
						id : 'calendar_name',
						maxLength : 50,
						maxLengthText : '' + getResource('resourceParam7087')
								+ getResource('resourceParam1054') + ''
					}, {
						text : '' + getResource('resourceParam7105') + '',// 创建label创建方式
						xtype : 'label',
						columnWidth : .3,
						name : 'explain'
					}, {
						checked : true,
						xtype : 'radio',
						columnWidth : .7,
						fieldLabel : '',
						boxLabel : '' + getResource('resourceParam483')// 创建单选按钮，新建基准日历
								+ getResource('resourceParam7087') + '',
						id : 'calendar_mode1',
						name : 'calendar_pattern',
						inputValue : '0'
					}, {
						html : '&nbsp;',// 创建空label
						xtype : 'label',
						columnWidth : .3,
						name : 'explain'
					}, {
						xtype : 'radio',
						boxLabel : '' + getResource('resourceParam7096') + '',// 创建单选按钮，从基准日历创建
						columnWidth : .1,
						id : 'calendar_mode2',
						name : 'calendar_pattern',
						inputValue : '1'
					}, {
						xtype : 'combo',// 创建下拉列表,展示所有基准日历
						name : 'calendar_copy',
						id : 'calendar_copy',
						columnWidth : .45,
						store : store,
						triggerAction : 'all',
						displayField : 'calendar_name',
						valueField : 'calendar_id',
						modal : 'remote',
						emptyText : '' + getResource('resourceParam459') + '',
						width : 250,
						minListWidth:300,
						resizable : true,
						pageSize : 10,
						editable : false
					}, {
						text : '' + getResource('resourceParam7097') + '',// 创建label日历创建
						xtype : 'label',
						columnWidth : .15,
						name : 'explain'
					}, {
						text : '' + getResource('resourceParam467') + '',// 创建label说明
						style : 'margin-top:10px;',
						xtype : 'label',
						columnWidth : .3,
						name : 'explain'
					}, {
						width : 350,// 创建文本域
						xtype : 'textarea',
						autoScroll : true,
						style : 'margin-top:10px;',
						columnWidth : .7,
						fieldLabel : '' + getResource('resourceParam467') + '',
						id : 'calendar_notes',
						name : 'calendar_notes',
						maxLength : 500,
						maxLengthText : '' + getResource('resourceParam7087')
								+ getResource('resourceParam1156') + ''
					}, {
						html : '&nbsp;',
						style : 'margin-top:10px;',
						xtype : 'label',
						columnWidth : .68,
						name : 'explain'
					}, {
						xtype : 'button',// 创建取消按钮
						style : 'margin-top:10px;',
						columnWidth : .12,
						text : '' + getResource('resourceParam3001') + '',
						handler : function() {
							Ext.MessageBox.confirm(''
											+ getResource('resourceParam596')
											+ '', ''
											+ getResource('resourceParam7109')
											+ '?' + '', function(btn) {
										if (btn == 'yes') {
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
											addStandardCalendarOne.formone
													.getForm().reset();
											StandardCalendar.mainpanel
													.getLayout()
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
						xtype : 'button',// 创建下一步按钮
						style : 'margin-top:10px;',
						columnWidth : .12,
						text : '' + getResource('resourceParam1151') + '',
						handler : function() {
							if (Ext.getCmp('calendar_name').getValue() == ''
									|| Ext.getCmp('calendar_name').getValue() == null) {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam587')
													+ '',
											msg : ''
													+ getResource('resourceParam7106')
													+ getResource('resourceParam7088')
													+ getResource('resourceParam480')
													+ '',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
								return;
							} else if (Ext.getCmp('calendar_mode1').getValue() == true) {
								StandardCalendar.mainpanel.getLayout()
										.setActiveItem(2);
							} else if (Ext.getCmp('calendar_mode2').getValue() == true
									&& (Ext.getCmp('calendar_copy').getValue() == '' || Ext
											.getCmp('calendar_copy').getValue() == null)) {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam587')
													+ '',
											msg : ''
													+ getResource('resourceParam7107')
													+ '',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
								return;
							} else {
								addStandardCalendarTwo.loadData(Ext
										.getCmp('calendar_copy').getValue());
								StandardCalendar.mainpanel.getLayout()
										.setActiveItem(2);
							}
						}
					}]
		}]
	});
	return addStandardCalendarOne.formone;
}