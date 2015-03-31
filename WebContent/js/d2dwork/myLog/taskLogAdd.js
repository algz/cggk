var taskLogAdd = {

}
Ext.override(Ext.form.Action.Submit, {
			processResponse : function(response) {
				this.response = response;
				var data = response.responseText;
				if (data.indexOf('<pre>') != -1) {
					response.responseText = data.substring(5, data.length - 6);
					this.response = Ext.util.JSON.decode(response.responseText);
				}
				if (!response.responseText) {
					return true;
				}
				this.result = this.handleResponse(response);
				return this.result;
			}
		});
taskLogAdd.init = function() {
	taskLogAdd.taskid = new Ext.form.TextField({
				name : 'taskid',
				inputType : 'hidden'

			});
	taskLogAdd.title = new Ext.form.TextField({
				fieldLabel : '日志名称',
				name : 'title',
				maxLength : 100,
				maxLengthText : '最大100个字符!',
				style : 'margin-bottom:5px;',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[-,._])*$/,
				regexText : '' + getResource('resourceParam1092') + '',
				anchor : '90%',
				allowBlank : false,
				invalidText : '名称不能为空'
			});
	taskLogAdd.formPanel = new Ext.form.FormPanel({
				frame : true,
				fit : true,
				plain : false,
				fileUpload : true,

				bodyStyle : 'padding:5px 5px 0;background:transparent;',
				items : [taskLogAdd.taskid, taskLogAdd.title,
						new Ext.form.FileUploadField({

									id : 'logfile',
									anchor : '90%',
									buttonText : ''
											+ getResource('resourceParam473')
											+ '',
									fieldLabel : ''
											+ getResource('resourceParam604')
											+ ''
								}), {
							xtype : 'label',
							fieldLabel : '日志内容'
						}, {
							id : 'richEditor'
						}],

				buttons : [{
					text : '保存',
					handler : function() {
						if (taskLogAdd.formPanel.getForm().isValid()) {
							taskLogAdd.formPanel.getForm().submit({
								url : "../FILEUP/RecordRemote.uploadFile",
								method : 'POST',
								failure : function(form, action) {
								},
								success : function(form, action) {
									var record = Seam.Remoting
											.createType("com.sysware.record.RecordVO");
									record
											.setTitle(taskLogAdd.title
													.getValue());
									var content = FCKeditorAPI
											.GetInstance("dictContent");
									record.content = content.GetXHTML(true);
									record.setTaskid(taskLogAdd.taskid
											.getValue());
									var obj = Ext.util.JSON
											.decode(action.response.responseText);
									record.setRecordid(action.result.result);
									callSeam("RecordRemote", "addTaskRecord",
											[record], function(result) {
												taskLogAdd.formPanel.getForm().reset();
												// taskLogAdd.formPanel.getForm()
												// .reset();
												// mytaskdetails.logpanel.removeAll(true);
												// mytaskdetails.panel =
												// taskLogGrid
												// .init();
												// mytaskdetails.panel.getStore().on(
												// 'beforeload',
												// function(store, options) {
												// this.proxy = new
												// Ext.data.HttpProxy(
												// {
												// method : 'POST',
												// url :
												// '../JSON/RecordRemote.getTaskRecordList'
												// })
												// options.params = Ext.apply(
												// options.params, {
												// taskid : mytaskMain.taskid
												//
												// });
												// });
												//
												// //
												// log.init(mytaskMain.taskid,
												// // mytaskMain.taskname);
												// mytaskdetails.logpanel
												// .add(mytaskdetails.panel);
												// mytaskdetails.logpanel.doLayout();
												// mytaskdetails.logpanel.getTopToolbar()
												// .enable();
												mytaskdetails.logpanel
														.getLayout()
														.setActiveItem(0);
												myGrid.loadvalue(
														mytaskdetails.loggrid
																.getStore(),
														taskLogGrid.args,
														taskLogGrid.baseargs);
												mytaskdetails.logpanel
														.getTopToolbar()
														.enable();
											})
								}

							})

						}

					}
				}, {
					text : '返回',
					handler : function() {
						mytaskdetails.logpanel.getTopToolbar().enable();
						taskLogAdd.formPanel.getForm().reset();
						mytaskdetails.logpanel.getLayout().setActiveItem(0);
						myGrid.loadvalue(mytaskdetails.loggrid.getStore(),
								taskLogGrid.args, taskLogGrid.baseargs);
					}
				}]
			});

	return taskLogAdd.formPanel;

}