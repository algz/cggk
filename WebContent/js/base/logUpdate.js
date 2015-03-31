var logUpdate = {

}
logUpdate.init = function(taskid, taskname) {
	log.logAttributeTaskId = new Ext.form.TextField({

				id : 'logAttributeTaskId',
				inputType : 'hidden'
			});

	log.logAttributeTask = new Ext.form.TextField({
				fieldLabel : ''+getResource('resourceParam624')+'',
				id : 'logAttributeTask',
				readOnly : true,
				width : 300
			});
	log.logName = new Ext.form.TextField({
				id : 'logName',
				fieldLabel : ''+getResource('resourceParam625')+'',
				width : 100,
				allowBlank : false,
				emptyText : ''+getResource('resourceParam621')+'',
				maxLength : 95,
				minLengthText : ''+getResource('resourceParam590')+'',
				msgTarget : 'side'
			});
	log.logContent = new Ext.form.TextArea({
				id : 'logContent',
				fieldLabel : ''+getResource('resourceParam626')+'',
				width : 200,
				height : 100,
				allowBlank : false,
				emptyText : ''+getResource('resourceParam622')+'',
				maxLength : 2000,
				maxLengthText : ''+getResource('resourceParam591')+''
			});
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
						log.logName, log.logContent, {
							xtype : 'fileuploadfield',
							id : 'logfile1',
							fieldLabel : ''+getResource('resourceParam469')+'',
							buttonText : ''+getResource('resourceParam473')+''

						}],
				buttons : [{
							text : ''+getResource('resourceParam605')+'',
							handler : logSubmit
						}, {
							text : '保存',
							handler : logSave
						}, {
							text : ''+getResource('resourceParam606')+'',
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
					title : ' '+getResource('resourceParam628')+' ',
					//
					// autoScroll : true,
					layout : 'fit',
					items : [log.logAddForm],
					listeners : {
						'activate' : function() {
						}
					}

				}, {
					id : 'taskloginfo',
					title : '  '+getResource('resourceParam627')+'  ',
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
				id : 'egridpanel12',
				layout : 'fit',
				items : [log.logTabPanel]
			});
	log.fullLogPanel = new Ext.Panel({
				id : 'fullLogPanel',
				height : 800,
				title : ''+getResource('resourceParam629')+'',
				activeItem : 0,
				layout : 'card',
				items : [log.logTabPanel]

			});
	function logReset() {
		log.logAddForm.getForm().reset();
	}
	function logSubmit() {
		var temp = Ext.getCmp('logContent').getValue();
		if (!log.logAddForm.getForm().isValid()) {
			return;
		}
		log.logAddForm.getForm().submit({
			url : '../logupload?logAttributeTaskId='
					+ Ext.getCmp('logAttributeTaskId').getValue()
					+ '&logAttributeTask='
					+ Ext.getCmp('logAttributeTask').getValue() + '&logName='
					+ Ext.getCmp('logName').getValue() + '&logContent='
					+ Ext.getCmp('logContent').getValue()
					+ '&messageType=1&publishMode=4',
			method : 'post',
			// params:logAddForm,
			success : function(form, action) {
				Ext.Msg.show({
							title : ''+getResource('resourceParam596')+'',
							msg : ''+getResource('resourceParam623')+'',
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

			},
			failure : function(form, action) {
				Ext.Msg.show({
							title : ''+getResource('resourceParam596')+'',
							msg : ''+getResource('resourceParam594')+'',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
			}

		});
	}
	function logSave() {
		var temp = Ext.getCmp('logContent').getValue();
		if (!log.logAddForm.getForm().isValid()) {
			return;
		}
		log.logAddForm.getForm().submit({
			url : '../logupload?logAttributeTaskId='
					+ Ext.getCmp('logAttributeTaskId').getValue()
					+ '&logAttributeTask='
					+ Ext.getCmp('logAttributeTask').getValue() + '&logName='
					+ Ext.getCmp('logName').getValue() + '&logContent='
					+ Ext.getCmp('logContent').getValue()
					+ '&messageType=1&publishMode=1',
			method : 'post',
			// params:logAddForm,
			success : function(form, action) {
				Ext.Msg.show({
							title : ''+getResource('resourceParam596')+'',
							msg : ''+getResource('resourceParam623')+'',
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

			},
			failure : function(form, action) {
				Ext.Msg.show({
							title : ''+getResource('resourceParam596')+'',
							msg : ''+getResource('resourceParam594')+'',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
			}

		});
	}
	// log.logAttributeTaskId.setValue(taskid);
	// log.logAttributeTask.setValue(taskname);
	// function userformload() {
	updateForm.getForm().load({
				url : '../JSON/userinfo_UserInfoRemote.getUserById?id=1',
				method : 'GET',
				success : function(form, action) {

				}
			});

	// }
}
