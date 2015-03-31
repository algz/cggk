var logAdd = {

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
logAdd.init = function() {
	var title = new Ext.form.TextField({
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
	var formPanel = new Ext.form.FormPanel({
				frame : true,
				fit : true,
				plain : false,
				fileUpload : true,

				bodyStyle : 'padding:5px 5px 0;background:transparent;',
				items : [title, new Ext.form.FileUploadField({

							id : 'logfile',
							anchor : '90%',
							buttonText : '' + getResource('resourceParam473')
									+ '',
							fieldLabel : '' + getResource('resourceParam604')
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
						if (formPanel.getForm().isValid()) {
							formPanel.getForm().submit({
								url : "../FILEUP/RecordRemote.uploadFile",
								method : 'POST',
								failure : function(form, action) {
								},
								success : function(form, action) {
									var record = Seam.Remoting
											.createType("com.sysware.record.RecordVO");
									record.setTitle(title.getValue());
									var content = FCKeditorAPI
											.GetInstance("dictContent");
									record.content = content.GetXHTML(true);
									record.setRecordid(action.result.result);
									callSeam("RecordRemote", "addRecord",
											[record], function(result) {
												myGrid.loadvalue(
														myLog.workLogGrid
																.getStore(),
														taskLogGrid.args,
														taskLogGrid.baseargs);
												myLog.workLogPanel
														.getTopToolbar()
														.enable();

												myLog.win.close();
											})
								}

							})

						}

					}
				}, {
					text : '返回',
					handler : function() {
						myGrid.loadvalue(myLog.workLogGrid.getStore(),
								taskLogGrid.args, taskLogGrid.baseargs);
						myLog.workLogPanel.getTopToolbar().enable();

						myLog.win.close();
					}
				}]
			});

	return formPanel;

}