Ext.ns("log")
log.init = function(taskid, taskname) {
	log.logAttributeTaskId = new Ext.form.TextField({

				id : 'logAttributeTaskId',
				inputType : 'hidden'
			});

	log.logAttributeTask = new Ext.form.TextField({
				fieldLabel : '' + getResource('resourceParam624') + '',
				id : 'logAttributeTask',
				style : 'margin-bottom: 5px;',
				readOnly : true,
				width : 300
			});
	log.logName = new Ext.form.TextField({
				name : 'logName',
				fieldLabel : '' + getResource('resourceParam625') + '',
				style : 'margin-bottom: 5px;',
				width : 100,
				allowBlank : false,
				emptyText : '' + getResource('resourceParam621') + '',
				maxLength : 95,
				minLengthText : '' + getResource('resourceParam590') + '',
				msgTarget : 'side'
			});
	log.logContent = new Ext.form.TextArea({
				name : 'logContent',
				fieldLabel : '' + getResource('resourceParam626') + '',
				style : 'margin-bottom: 5px;',
				width : 200,
				height : 100,
				//bug:746 西方不想强制输入内容 gaoyn 2011-5-25 9:25
				
				allowBlank : true,
//				emptyText : '' + getResource('resourceParam622') + '',
				
				validator : function() {
					var str = Ext.util.Format.trim(log.logContent.getValue());
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
						log.logContent.invalidText = ' '
								+ getResource('resourceParam1299') + ''
								+ getResource('resourceParam1386') + '500!';
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', "输入的长度为 " + size / 2 + " !");
						log.logContent.focus();
						return false;
					} else {
						return true;
					}
				}
			});
	log.logfile1 = new Ext.form.FileUploadField({
				style : 'margin-bottom: 5px;',
				id : 'logfile1',
				buttonText : '' + getResource('resourceParam473') + '',
				fieldLabel : '' + getResource('resourceParam604') + ''
			});
	// log.logfile1 = new Ext.form.TextField({
	// inputType : 'file',
	// id : 'logfile1',
	// fieldLabel : '' + getResource('resourceParam469') + ''
	// });
	log.logAddForm = new Ext.form.FormPanel({
				id : 'logAddForm',
				fileUpload : true,
				// enctype : 'multipart/form-data',
				bodyStyle : 'padding:5px 5px',
				// height:800,
				defaults : {
					anchor : '62%',
					// allowBlank : false,
					msgTarget : 'side'

				},
				items : [log.logAttributeTaskId, log.logAttributeTask,
						log.logName, log.logContent, log.logfile1
				
				],
				buttons : [{
							id : 'logSubmit',
							text : '' + getResource('resourceParam605') + '',
							handler : logSubmit
						}, {
							id : 'logSave',
							text : '保存'+'',
							handler : logSave
						}, {
							id : 'logReset',
							text : '' + getResource('resourceParam606') + '',
							handler : logReset
						}]
			});
	log.logTabPanel = new Ext.TabPanel({
		id : 'logTabPanel',
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
			id : 'addloginfo',
			title : ' ' + getResource('resourceParam628') + ' ',
			//
			// autoScroll : true,
			layout : 'fit',
			items : [log.logAddForm],
			listeners : {
				'activate' : function() {
					log.logAddForm.remove(log.logfile1);
					log.logfile1 = new Ext.form.FileUploadField({
								style : 'margin-bottom: 5px;',
								id : 'logfile1',
								buttonText : ''
										+ getResource('resourceParam473') + '',
								fieldLabel : ''
										+ getResource('resourceParam604') + ''
							});
					log.logAddForm.insert(4, log.logfile1);
					log.logAddForm.doLayout();
				},
				'deactivate' : function() {
					// log.logName.reset();
					// log.logContent.reset();
				}
			}

		}, {
			id : 'taskloginfo',
			title : '  ' + getResource('resourceParam627') + '  ',
			layout : 'fit',
			html : "<iframe scrolling=auto  id='loginframe'  frameborder=0 width=100% height=100% src='../logInfo.seam?taskid="
					+ taskid + "&typeStr=1,' ></iframe>",
			listeners : {
				'activate' : function() {
					document.getElementById('loginframe').src = '../logInfo.seam?taskid='
							+ taskid + '&typeStr=1,';
				}
			}
		}]

	});
	log.egridpanel12 = new Ext.Panel({
				layout : 'fit',
				items : [log.logTabPanel]
			});
	log.fullLogPanel = new Ext.Panel({
				id : 'fullLogPanel',
				height : 800,
				title : '' + getResource('resourceParam629') + '',
				activeItem : 0,
				layout : 'card',
				items : [log.logTabPanel]

			});
	function logReset() {
		log.logAddForm.getForm().reset();
	}
	function logSubmit() {
		// var temp = Ext.getCmp('logContent').getValue();
		if (!log.logAddForm.getForm().isValid()) {
			return;
		}
		log.logAddForm.getForm().submit({
			url : '../logupload?logAttributeTaskId='
					+ Ext.getCmp('logAttributeTaskId').getValue()
					+ '&logAttributeTask='
					+ Ext.getCmp('logAttributeTask').getValue() + '&logName='
					+ '' + '&logContent=' + '' + '&messageType=1&publishMode=4',
			method : 'post',
			// params:logAddForm,
			success : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam597') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
				var logAttributeTaskIds = Ext.getCmp('logAttributeTaskId')
						.getValue();
				var logAttributeTasks = Ext.getCmp("logAttributeTask")
						.getValue();
				log.logAddForm.getForm().reset();
				// log.logfile1.setValue("");
				Ext.getCmp("logAttributeTask").setValue(logAttributeTasks);
				Ext.getCmp("logAttributeTaskId").setValue(logAttributeTaskIds);

			},
			failure : function(form, action) {
				log.logAddForm.getForm().reset();
				log.logfile1.setValue("");
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
	function logSave() {
		// var temp = Ext.getCmp('logContent').getValue();
		if (!log.logAddForm.getForm().isValid()) {
			return;
		}
		log.logAddForm.getForm().submit({
			url : '../logupload?logAttributeTaskId='
					+ Ext.getCmp('logAttributeTaskId').getValue()
					+ '&logAttributeTask='
					+ Ext.getCmp('logAttributeTask').getValue() + '&logName='
					+ Ext.getCmp('logName').getValue() + '&logContent=' + ''
					+ '&messageType=1&publishMode=1',
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
				var logAttributeTaskIds = Ext.getCmp('logAttributeTaskId')
						.getValue();
				var logAttributeTasks = Ext.getCmp("logAttributeTask")
						.getValue();
				log.logAddForm.getForm().reset();
				Ext.getCmp("logAttributeTask").setValue(logAttributeTasks);
				Ext.getCmp("logAttributeTaskId").setValue(logAttributeTaskIds);
				log.logAddForm.remove(log.logfile1);
				log.logfile1 = new Ext.form.FileUploadField({
							style : 'margin-bottom: 5px;',
							id : 'logfile1',
							buttonText : '' + getResource('resourceParam473')
									+ '',
							fieldLabel : '' + getResource('resourceParam604')
									+ ''
						});
				log.logAddForm.insert(4, log.logfile1);
				log.logAddForm.doLayout();
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
	log.logAttributeTaskId.setValue(taskid);
	log.logAttributeTask.setValue(taskname);
}
