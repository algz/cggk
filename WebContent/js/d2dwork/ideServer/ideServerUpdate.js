Ext.QuickTips.init();
var ideServerUpdate = {
	issueDialog : null,
	form : null
}

ideServerUpdate.init = function() {

	myGrid.row = ideServerMain.ideServerGrid.selModel.getSelected();
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam663') + '',
					msg : '' + getResource('resourceParam1100') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}

	if (!ideServerUpdate.issueDialog) {
		tlework.addHtml(tlework.divHtml, 'ideServerU'); // 动态生成需要绑定的div
		ideServerUpdate.issueDialog = new Ext.Window({ // 创建对话框
			el : 'ideServerU',
			title : '' + getResource('resourceParam478') + ''
					+ getResource('resourceParam1944') + '',
			modal : true,
			layout : 'fit',
			width : 320,
			height : 180,
			closeAction : 'hide',
			plain : false,
			items : [ideServerUpdate.addform()]
				// 将面板绑定到对话框
		});
	}
	ideServerUpdate.issueDialog.show();
	ideServerUpdate.issueDialog.on("hide", function() {
				ideServerUpdate.issueDialog.close();
				ideServerUpdate.issueDialog.destroy();
				ideServerUpdate.issueDialog = null;

			});
}

ideServerUpdate.addform = function() {

	ideServerUpdate.form = new Ext.FormPanel({
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
			value : myGrid.row.get('ideServerName'),
			anchor : '94%'
		}, {
			fieldLabel : '' + getResource('resourceParam1944') + 'IP', // 文本框
			name : 'ideServerIp',
			regex : /^((2[0-4]\d|25[0-5]|[1]\d{2}|[1-9]\d|\d)\.){3}(2[0-4]\d|25[0-5]|[1]\d{2}|[1-9]\d|\d)$/,
			regexText : '' + getResource('resourceParam1946') + '!',
			width : 200,
			allowBlank : false,
			value : myGrid.row.get('ideServerIp'),
			anchor : '94%'
		}, {
			xtype : 'textfield',
			fieldLabel : '' + getResource('resourceParam1944') + 'URL',
			name : 'ideServerUrl',
			maxLength : 500,
			maxLengthText : 'URL' + getResource('resourceParam1198') + '',
			allowBlank : false,
			width : 200,
			anchor : '94%',
			value : myGrid.row.get('ideServerUrl')
		}],
		buttons : [ // 定义面板中的按钮
		{
			text : '' + getResource('resourceParam505') + '',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if (ideServerUpdate.form.form.isValid()) {
					var ideServerVo = Seam.Remoting
							.createType("com.sysware.p2m.ideServer.IdeServerVo");

					ideServerVo.setIdeServerId(myGrid.row.get('ideServerId'));
					Ext.apply(ideServerVo, ideServerUpdate.form.getForm()
									.getValues());
					callSeam("ideServer_ideServerService", "ideServerUpdate",
							[ideServerVo], ideServerUpdate.save);
				}

			}
		}, {
			text : '取消',
			handler : function() {
				// batcheUpdate.batcheform.form.reset(); //表单重置
				ideServerUpdate.issueDialog.hide();

			}
		}]
	});
	return ideServerUpdate.form;
}

/**
 * 根据返回结果进行操作
 */
ideServerUpdate.save = function(result) {
	var sign = result;
	if (sign == "true") {
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam631') + "");
	} else {
		ideServerUpdate.form.form.reset();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam572') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
	myGrid.loadvalue(ideServerMain.ideServerGrid.store, {
				start : 0,
				limit : 25
			}, {});
	ideServerUpdate.issueDialog.hide();

}
