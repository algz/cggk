Ext.QuickTips.init();
var ideServerAdd = {
	issueDialog : null,
	form : null
}

ideServerAdd.init = function() {
	if (!ideServerAdd.issueDialog) {
		tlework.addHtml(tlework.divHtml, 'tideServer'); // 动态生成需要绑定的div
		ideServerAdd.issueDialog = new Ext.Window({ // 创建对话框
			el : 'tideServer',
			title : '' + getResource('resourceParam647') + ''
					+ getResource('resourceParam1944') + '',
			modal : true,
			layout : 'fit',
			width : 320,
			height : 180,
			closeAction : 'hide',
			plain : false,
			items : [ideServerAdd.addform()]
				// 将面板绑定到对话框
		});
	}
	ideServerAdd.issueDialog.show();
	ideServerAdd.issueDialog.on("hide", function() {
				ideServerAdd.issueDialog.close();
				ideServerAdd.issueDialog.destroy();
				ideServerAdd.issueDialog = null;

			});
}

ideServerAdd.addform = function() {
	ideServerAdd.form = new Ext.FormPanel({
		labelWidth : 80, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:15px 15px 0;background:transparent;',
		defaultType : 'textfield',
		items : [{
			fieldLabel : '' + getResource('resourceParam1944') + ''
					+ getResource('resourceParam480') + '', // 文本框
			name : 'ideServerName',
			regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
			regexText : '' + getResource('resourceParam1092') + '!',
			width : 200,
			blankText : '' + getResource('resourceParam1095') + '',
			maxLength : 50,
			maxLengthText : '' + getResource('resourceParam1094') + '',
			allowBlank : false,
			anchor : '94%'
		}, {
			xtype : 'textfield',
			fieldLabel : '' + getResource('resourceParam1944') + 'IP',
			name : 'ideServerIp',
			regex : /^((2[0-4]\d|25[0-5]|[1]\d{2}|[1-9]\d|\d)\.){3}(2[0-4]\d|25[0-5]|[1]\d{2}|[1-9]\d|\d)$/,
			regexText : '' + getResource('resourceParam1946') + '!',
			width : 25,
			allowBlank : false,
			anchor : '94%'
		}, {
			xtype : 'textfield',
			fieldLabel : '' + getResource('resourceParam1944') + 'URL',
			name : 'ideServerUrl',
			maxLength : 500,
			maxLengthText : 'URL' + getResource('resourceParam1198') + '',
			// regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
			// regexText : ''+getResource('resourceParam1092')+'!',
			width : 200,
			allowBlank : false,
			anchor : '94%'
		}],
		buttons : [ // 定义面板中的按钮
		{
			text : '' + getResource('resourceParam505') + '',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if (ideServerAdd.form.form.isValid()) {
					var ideServerVo = Seam.Remoting
							.createType("com.sysware.p2m.ideServer.IdeServerVo");
					Ext.apply(ideServerVo, ideServerAdd.form.getForm()
									.getValues());
					callSeam("ideServer_ideServerService", "ideServerAdd",
							[ideServerVo], ideServerAdd.save);
				}

			}
		}, {
			text : '取消',
			handler : function() {
				// batcheUpdate.batcheform.form.reset(); //表单重置
				ideServerAdd.issueDialog.hide();

			}
		}]
	});
	return ideServerAdd.form;
}

/**
 * 根据返回结果进行操作
 */
ideServerAdd.save = function(result) {
	var sign = result;
	if (sign == "true") {
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam631') + "");
	} else {
		ideServerAdd.form.form.reset();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
	myGrid.loadvalue(ideServerMain.ideServerGrid.store, {
				start : 0,
				limit : 25
			}, {});
	ideServerAdd.issueDialog.hide();

}
