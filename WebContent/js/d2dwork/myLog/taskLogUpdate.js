var taskLogUpdate = {

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
taskLogUpdate.init = function() {
	taskLogUpdate.recordid = new Ext.form.TextField({
				name : 'recordid',

				maxLength : 100,
				style : 'margin-bottom:5px;',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[-,._])*$/,
				regexText : '' + getResource('resourceParam1092') + '',
				anchor : '90%',
				inputType : 'hidden'
			});
	taskLogUpdate.title = new Ext.form.TextField({
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
	taskLogUpdate.file = new Ext.form.FileUploadField({

				id : 'logfile1',
				anchor : '90%',
				buttonText : '' + getResource('resourceParam473') + '',
				fieldLabel : '' + getResource('resourceParam604') + ''
			})
	taskLogUpdate.reason = new Ext.form.TextField({
				fieldLabel : '修改原因',
				name : 'reason',

				maxLength : 100,
				maxLengthText : '最大100个字符!',
				style : 'margin-top:5px;',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[-,._])*$/,
				regexText : '' + getResource('resourceParam1092') + '',
				anchor : '90%',
				allowBlank : false,
				invalidText : '修改原因不能为空'
			});
	taskLogUpdate.formPanel = new Ext.form.FormPanel({
				frame : true,
				fit : true,
				plain : false,
				fileUpload : true,
				autoScroll:true,
				bodyStyle : 'padding:5px 5px 0;background:transparent;',
				items : [taskLogUpdate.recordid, taskLogUpdate.title,
						taskLogUpdate.file, {
							xtype : 'label',
							fieldLabel : '日志内容'
						}, {
							id : 'richEditor1'
						}, taskLogUpdate.reason],

				buttons : [{
					text : '保存',
					handler : function() {
						if (taskLogUpdate.formPanel.getForm().isValid()) {

							taskLogUpdate.formPanel.getForm().submit({
								url : "../FILEUP/RecordRemote.uploadFile",
								method : 'POST',
								failure : function(form, action) {
								},
								success : function(form, action) {
									var record = Seam.Remoting
											.createType("com.sysware.record.RecordVO");
									record.setTitle(taskLogUpdate.title
											.getValue());
									var content = FCKeditorAPI
											.GetInstance("dictContent");
									record.content = content.GetXHTML(true);
									var obj = Ext.util.JSON
											.decode(action.response.responseText);
									// record.setFileinfo(Ext.util.JSON
									// .encode(obj.result));
									record.setReason(taskLogUpdate.reason
											.getValue());
									record.setRecordid(taskLogUpdate.recordid
											.getValue());
									callSeam("RecordRemote", "updateRecord",
											[record], function(result) {
												taskLogUpdate.formPanel
														.getForm().reset();
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

							// var record = Seam.Remoting
							// .createType("com.sysware.record.RecordVO");
							// record.setTitle(title.getValue());
							// var content = FCKeditorAPI
							// .GetInstance("dictContent");
							// record.setContent(content.GetXHTML(true));
							// callSeam("RecordRemote", "addRecord", [record],
							// function(result) {
							//
							// })
						}

					}
				}, {
					text : '返回',
					handler : function() {
						if (taskLogUpdate.formPanel.getForm().getValues()) {
							mytaskdetails.logpanel.getTopToolbar().enable();
							taskLogUpdate.formPanel.getForm().reset();
							mytaskdetails.logpanel.getLayout().setActiveItem(0);
							myGrid.loadvalue(mytaskdetails.loggrid.getStore(),
									taskLogGrid.args, taskLogGrid.baseargs);
						}

					}
				}]
			});

	return taskLogUpdate.formPanel;

}