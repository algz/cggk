var updateRemind = {

}

updateRemind.init = function(messageid) {
	var vo = Seam.Remoting.createType("com.luck.itumserv.myLog.LogInfoVO");
	vo.setMessageid(messageid);
	Seam.Component.getInstance("myLog_LogInfoRemote").getMessagebyId(vo,
			updateRemind.getMessageCallBack);
}

updateRemind.getMessageCallBack = function(result) {
	var json = Ext.util.JSON.decode(result);
	var logid = new Ext.form.TextField({

				id : 'logid',
				inputType : 'hidden'
			});
	var updateReason = new Ext.form.TextField({
				id : 'updateReason',
				fieldLabel : '' + getResource('resourceParam1941') + '',
				style : 'margin-bottom:5px',
				allowBlank : false,
				// emptyText : ''+getResource('resourceParam1938')+'!',
				maxLength : 95,
				minLengthText : '' + getResource('resourceParam1939') + '!'

			});
	var logAttributeTask = new Ext.form.TextField({
				fieldLabel : '' + getResource('resourceParam624') + '',
				id : 'logAttributeTask',
				style : 'margin-bottom: 5px;',
				readOnly : true,
				width : 300
			});
	var logName = new Ext.form.TextField({
				id : 'logName',
				fieldLabel : '' + getResource('resourceParam786') + '',

				style : 'margin-bottom: 5px;',
				width : 100,
				allowBlank : false,
				emptyText : '' + getResource('resourceParam784') + '',
				maxLength : 50,
				minLengthText : '' + getResource('resourceParam782') + '',
				msgTarget : 'side'
			});
	var logContent = new Ext.form.TextArea({
				id : 'logContent',
				fieldLabel : '' + getResource('resourceParam787') + '',
				style : 'margin-bottom: 5px;',

				width : 200,
				height : 100,
				allowBlank : false,
				emptyText : '' + getResource('resourceParam785') + '',
				maxLength : 500,
				maxLengthText : '' + getResource('resourceParam783') + ''
			});
	var logSubmitButton = new Ext.Button({
				id : 'logSubmitButton',
				text : '' + getResource('resourceParam605') + '',
				handler : logSubmit
			});
	var logSaveButton = new Ext.Button({
				id : 'logSaveButton',
				text : '保存',
				handler : logSave
			});
	var logAddForm = new Ext.FormPanel({
				id : 'logAddForm',
				fileUpload : true,
				// enctype : 'multipart/form-data',
				bodyStyle : 'padding:5px 5px',

				defaults : {
					anchor : '80%',
					msgTarget : 'side'
				},
				items : [logName, logContent, {
							xtype : 'fileuploadfield',
							id : 'logfile1',
							fieldLabel : '' + getResource('resourceParam469')
									+ '',
							buttonText : '' + getResource('resourceParam473')
									+ ''
						}, updateReason],
				html : '',
				buttons : [logSubmitButton, logSaveButton, {
							text : '' + getResource('resourceParam606') + '',
							handler : logReset
						}]
			});

	function logReset() {
		logAddForm.getForm().reset();
	}
	function logSubmit() {
		if (json.publishMode == '4') {
			if (null == updateReason.getValue()
					|| '' == updateReason.getValue()) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam1938') + '!',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
				return;
			}
		}
		var temp = Ext.getCmp('logContent').getValue();
		if (!logAddForm.getForm().isValid()) {
			return;
		}
		logAddForm.getForm().submit({
			url : 'logupdate?logName=' + Ext.getCmp('logName').getValue()
					+ '&logContent=' + Ext.getCmp('logContent').getValue()
					+ '&messageid=' + Ext.getCmp('logid').getValue()
					+ '&updateReason=' + updateReason.getValue()
					+ '&publishMode=4',
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
				updateWin.close();
				window.location.reload();

			},
			failure : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam1127') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
			}

		});

	}
	function logSave() {
		var temp = Ext.getCmp('logContent').getValue();
		if (!logAddForm.getForm().isValid()) {
			return;
		}
		logAddForm.getForm().submit({
			url : 'logupdate?logName=' + Ext.getCmp('logName').getValue()
					+ '&logContent=' + Ext.getCmp('logContent').getValue()
					+ '&messageid=' + Ext.getCmp('logid').getValue()
					+ '&updateReason=' + updateReason.getValue()
					+ '&publishMode=1',
			method : 'post',
			// params:logAddForm,
			success : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam677') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
				updateWin.close();
				window.location.reload();

			},
			failure : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam572') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
			}

		});
	}

	var updateWin = new Ext.Window({
				width : 700,
				height : 350,
				// modal : true,
				layout : 'fit',
				closable : true,
				closeAction : 'close',
				items : [logAddForm]
			});
	updateWin.on('close', function() {
				window.location.reload();
			});

	// updateMessage.updateWin.on('hide', updateMessage.updateWinClose);
	// updateMessage.updateWinClose = function() {
	// updateMessage.updateWin.hide();
	// updateMessage.updateWin = null;
	// }
	var accory = '<div style="padding:5px 5px;font-size:12px;"><span>'
			+ getResource('resourceParam469') + ' ： </span><span>'
			// + obj.value

			+ '</span></div>';

	var html = ""
	for (var i = 0; i < json['accessory'].results; i++) {
		html += '<span id="file'
				+ i
				+ '"><a href=MessageFileDownLoadServlet?fileid='
				+ json['accessory'].rows[i]['fileid']
				+ '>'
				+ json['accessory'].rows[i]['filename']
				+ "</a> <a href=javaScript:deletefileConfirm('"
				+ json['accessory'].rows[i]['fileid']
				+ "',"
				+ i
				+ ")><image width=12 height=12 src='images/shared/icons/fam/cross.gif'></a></span>&nbsp;&nbsp;"
	}
	if (json.publishMode == '4') {
		logSaveButton.hide();
	}
	if (html == "") {
		html = '' + getResource('resourceParam1942') + '';
	}

	logName.setValue(json.messagetitle);
	logContent.setValue(json.messagebody);
	logid.setValue(json.messageid);
	logAddForm.html = '<div style="padding:5px 5px;font-size:12px;"><span>'
			+ getResource('resourceParam469') + ' ： </span>' + html + '</div>';
	updateWin.show();
	function deletefileConfirm(fileid, i) {
		Ext.MessageBox.confirm('' + getResource('resourceParam596') + '', ''
						+ getResource('resourceParam1937') + '', function(btn) {
					deletefile(btn, fileid, i);
				});
	}
	function deletefile(btn, fileid, i) {
		if (btn == 'yes') {
			var vo = Seam.Remoting
					.createType("com.luck.itumserv.myLog.LogInfoVO");
			vo.setFileid(fileid);
			Seam.Component.getInstance("myLog_LogInfoRemote").deleteFile(vo,

					delFileCallBack);
			document.getElementById("file" + i).innerHTML = "";
		}

	}
	function delFileCallBack(result) {
		if ("error" == result) {
			alert("" + getResource('resourceParam1940') + "");
		}
	}

}
