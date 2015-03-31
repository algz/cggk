addStandardCalendarThree = {
	formthree : null
};
addStandardCalendarThree.init = function() {
	// 取得浏览器宽度
	var widths = Ext.getBody().getWidth();
	//创建第三步form面板
	addStandardCalendarThree.formthree = new Ext.form.FormPanel({
		autoScroll : true,
		border : false,
		title : '' + getResource('resourceParam9016') + '3/4'
				+ getResource('resourceParam7104') + '',
		bodyStyle : 'padding:10px 0px 10px 10px',
		items : [{
			layout : 'column',
			border : false,
			width : widths * 0.39,
			defaults : {
				layout : 'form',
				border : false,
				columnWidth : 1
			},
			items : [{
				text : '' + getResource('resourceParam7098')
						+ getResource('resourceParam7090')
						+ getResource('resourceParam7100') + '：',
				xtype : 'label',
				name : 'explain'
			}, {
				id : 'monday',
				boxLabel : '' + getResource('resourceParam1850')
						+ getResource('resourceParam6046') + '',
				xtype : 'checkbox',
				inputValue : '1'
			}, {
				id : 'tuesday',
				boxLabel : '' + getResource('resourceParam1850')
						+ getResource('resourceParam6047') + '',
				xtype : 'checkbox',
				inputValue : '1'
			}, {
				id : 'wednesday',
				boxLabel : '' + getResource('resourceParam1850')
						+ getResource('resourceParam6048') + '',
				xtype : 'checkbox',
				inputValue : '1'
			}, {
				id : 'thursday',
				boxLabel : '' + getResource('resourceParam1850')
						+ getResource('resourceParam6049') + '',
				xtype : 'checkbox',
				inputValue : '1'
			}, {
				id : 'friday',
				boxLabel : '' + getResource('resourceParam1850')
						+ getResource('resourceParam6050') + '',
				xtype : 'checkbox',
				inputValue : '1'
			}, {
				id : 'saturday',
				boxLabel : '' + getResource('resourceParam1850')
						+ getResource('resourceParam6051') + '',
				xtype : 'checkbox',
				inputValue : '1'
			}, {
				id : 'sunday',
				boxLabel : '' + getResource('resourceParam1850')
						+ getResource('resourceParam6052') + '',
				xtype : 'checkbox',
				inputValue : '1'
			}, {
				xtype : 'button',
				columnWidth : .1,
				text : '' + getResource('resourceParam1152') + '',
				handler : function() {
					if (addStandardCalendarOne.updateStore == null) {
						addStandardCalendarThree.formthree.getForm().reset();
					}
					StandardCalendar.mainpanel.getLayout().setActiveItem(2);
				}
			}, {
				xtype : 'button',
				style : 'margin-left:20px;',
				columnWidth : .1,
				text : '' + getResource('resourceParam3001') + '',
				handler : function() {
					Ext.MessageBox.confirm('' + getResource('resourceParam596')
									+ '', '' + getResource('resourceParam7109')
									+ '?' + '', function(btn) {
								if (btn == 'yes') {
									addStandardCalendarOne.formone.getForm()
											.reset();
									addStandardCalendarTwo.formtwo.getForm()
											.reset();
									addStandardCalendarThree.formthree
											.getForm().reset();
									addStandardCalendarTwo.formtwo.getForm().items
											.get('morning_end')
											.setMinValue('12:00');
									addStandardCalendarTwo.formtwo.getForm().items
											.get('afternoon_begin')
											.setMinValue('13:00');
									addStandardCalendarTwo.formtwo.getForm().items
											.get('afternoon_end')
											.setMinValue('18:00');
									addStandardCalendarTwo.formtwo.getForm().items
											.get('night_begin')
											.setMinValue('18:00');
									addStandardCalendarTwo.formtwo.getForm().items
											.get('night_end')
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
									StandardCalendar.mainpanel.getLayout()
											.setActiveItem(0);
								}
							});
				}
			}, {
				xtype : 'button',
				style : 'margin-left:20px;',
				columnWidth : .1,
				text : '' + getResource('resourceParam1151') + '',
				handler : function() {
					StandardCalendar.mainpanel.getLayout().setActiveItem(4);
				}
			}]
		}]
	})
	return addStandardCalendarThree.formthree;
}