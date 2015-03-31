var remind = {
// fullLogPanel : null,
// logAddForm : null,
// logTabPanel : null
}
remind.init = function(taskid, taskname, chargedmanid) {
	remind.chargedmanid = chargedmanid;
	remind.remindAttributeTaskId = new Ext.form.TextField({

				id : 'remindAttributeTaskId',
				inputType : 'hidden'
			});

	remind.remindAttributeTask = new Ext.form.TextField({
				fieldLabel : '' + getResource('resourceParam624') + '',
				id : 'remindAttributeTask',
				readOnly : true,
				style : 'margin-bottom: 5px;',
				width : 300
			});
	remind.remindName = new Ext.form.TextField({
				name : 'logName',
				fieldLabel : '' + getResource('resourceParam786') + '',
				style : 'margin-bottom: 5px;',
				width : 100,
				allowBlank : false,
				emptyText : '' + getResource('resourceParam784') + '',
				maxLength : 50,
				minLengthText : '' + getResource('resourceParam782') + '',
				msgTarget : 'side'
			});
	remind.remindContent = new Ext.form.TextArea({
				name : 'logContent',
				fieldLabel : '' + getResource('resourceParam787') + '',
				style : 'margin-bottom: 5px;',
				width : 200,
				height : 100,
				allowBlank : false,
				emptyText : '' + getResource('resourceParam785') + '',
				validator : function() {
					var str = Ext.util.Format.trim(remind.remindContent
							.getValue());
					var size = 0;
					for (var i = 0; i < str.length; i++) {
						var code = str.charCodeAt(i);
						if (code > 255) {
							size += 2;
						} else {
							size += 1;
						}
					}
					if (size > 1000) {
						remind.remindContent.invalidText = ' '
								+ getResource('resourceParam648') + ''
								+ getResource('resourceParam1386') + '500！';
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', "输入的长度为 " + size / 2 + " !");
						remind.remindContent.focus();
						return false;
					} else {
						return true;
					}
				}
			});
	remind.remindAddForm = new Ext.form.FormPanel({
				id : 'remindAddForm',
				fileUpload : true,
				// enctype : 'multipart/form-data',
				bodyStyle : 'padding:5px 5px',
				// height:800,
				defaults : {
					anchor : '62%',
					// allowBlank : false,
					msgTarget : 'side'
				},
				items : [remind.remindAttributeTaskId,
						remind.remindAttributeTask, remind.remindName,
						remind.remindContent, {
							xtype : 'fileuploadfield',
							id : 'logfiles',
							fieldLabel : '' + getResource('resourceParam469')
									+ '',
							buttonText : '' + getResource('resourceParam473')
									+ ''

						}],
				buttons : [{
							text : '' + getResource('resourceParam605') + '',
							handler : remindSubmit
						}, {
							text : '' + getResource('resourceParam606') + '',
							handler : remindReset
						}]
			});
	remind.remindTabPanel = new Ext.TabPanel({
		id : 'remindTabPanel',
		layoutOnTabChange : true,
		activeTab : 0,
		autoScroll : true,
		animScroll : true,
		resizeTabs : true,
		enableTabScroll : true,
		deferredRender : false,
		tabMargin : 0,
		// html : 'gagag'
		height : 800,
		items : [{
					id : 'addremindinfo',
					title : ' ' + getResource('resourceParam789') + ' ',
					//
					// autoScroll : true,
					layout : 'fit',
					items : [remind.remindAddForm],
					listeners : {
						'activate' : function() {
						}
					}

				}, {
					id : 'taskremindinfo',
					title : '  ' + getResource('resourceParam788') + '  ',
					layout : 'fit',
					html : "<iframe scrolling=auto  id='remindframe'  frameborder=0 width=100% height=100% src='../logInfo.seam?taskid="
							+ taskid + "&typeStr=3,' ></iframe>",
					listeners : {
						'activate' : function() {
							document.getElementById('remindframe').src = '../logInfo.seam?taskid='
									+ taskid + '&typeStr=3,';
						}
					}
				}]

	});
	remind.egridpanel12 = new Ext.Panel({
				id : 'egridpanel12',
				layout : 'fit',
				items : [remind.remindTabPanel]
			});
	remind.fullRemainPanel = new Ext.Panel({
				id : 'fullRemainPanel',
				height : 800,
				title : '' + getResource('resourceParam790') + '',
				activeItem : 0,
				layout : 'card',
				items : [remind.remindTabPanel]

			});
	function remindReset() {
		remind.remindAddForm.getForm().reset();
	}
	function remindSubmit() {
		if (null == remind.chargedmanid || "" == remind.chargedmanid
				|| undefined == remind.chargedmanid) {
			Ext.Msg.show({
						title : '' + getResource('resourceParam596') + '',
						msg : '' + getResource('resourceParam781') + '!',
						width : 170,
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
			return;
		}
		var temp = remind.remindContent.getValue();
		if (!remind.remindAddForm.getForm().isValid()) {
			return;
		}
		remind.remindAddForm.getForm().submit({
			url : '../logupload?logAttributeTaskId='
					+ Ext.getCmp('remindAttributeTaskId').getValue()
					+ '&logAttributeTask='
					+ Ext.getCmp('remindAttributeTask').getValue()
					// + '&logName=' + Ext.getCmp('remindName').getValue()
					// + '&logContent=' + Ext.getCmp('remindContent').getValue()
					+ '&messageType=3&publishMode=4&chargedManId='
					+ remind.chargedmanid,
			method : 'post',
			// params:logAddForm,
			success : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam623') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
				var remindAttributeTaskIds = Ext
						.getCmp('remindAttributeTaskId').getValue();
				var remindAttributeTasks = Ext.getCmp("remindAttributeTask")
						.getValue();
				remind.remindAddForm.getForm().reset();
				Ext.getCmp("remindAttributeTask")
						.setValue(remindAttributeTasks);
				Ext.getCmp("remindAttributeTaskId")
						.setValue(remindAttributeTaskIds);

			},
			failure : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam594') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
			}

		});
	}
	function remindSave() {
		alert(remind.chargedmanid);
		return;
		if (null == remind.chargedmanid || "" == remind.chargedmanid
				|| undefined == remind.chargedmanid) {
			Ext.Msg.show({
						title : '' + getResource('resourceParam596') + '',
						msg : '' + getResource('resourceParam781') + '!',
						width : 170,
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.INFO
					});
			return;
		}
		var temp = Ext.getCmp('remindContent').getValue();
		if (!remind.remindAddForm.getForm().isValid()) {
			return;
		}
		remind.remindAddForm.getForm().submit({
			url : '../logupload?logAttributeTaskId='
					+ Ext.getCmp('remindAttributeTaskId').getValue()
					+ '&logAttributeTask='
					+ Ext.getCmp('remindAttributeTask').getValue()
					// + '&logName=' + Ext.getCmp('remindName').getValue()
					// + '&logContent=' + Ext.getCmp('remindContent').getValue()
					+ '&messageType=3&publishMode=1&chargedManId='
					+ remind.chargedmanid,
			method : 'post',
			// params:logAddForm,
			success : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam623') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
				var remindAttributeTaskIds = Ext
						.getCmp('remindAttributeTaskId').getValue();
				var remindAttributeTasks = Ext.getCmp("remindAttributeTask")
						.getValue();
				remind.remindAddForm.getForm().reset();
				Ext.getCmp("remindAttributeTask")
						.setValue(remindAttributeTasks);
				Ext.getCmp("remindAttributeTaskId")
						.setValue(remindAttributeTaskIds);

			},
			failure : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam594') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
			}

		});
	}
	remind.remindAttributeTaskId.setValue(taskid);
	remind.remindAttributeTask.setValue(taskname);
}
