var bulletinUpdate = {
	issueDialog : null,
	form : null,
	temp : null,
	typeid : null
}

bulletinUpdate.init = function() {
	myGrid.row = bulletinMain.grid.selModel.getSelected();
	if (myGrid.row == null|| bulletinGrid.rows.length != 1) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show({
					title : getResource('resourceParam663') + '',
					msg : getResource('resourceParam1133') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}

	if (!bulletinUpdate.issueDialog) {
		tlework.addHtml(tlework.divHtml, 'bulletinUpdate'); // 动态生成需要绑定的div
		bulletinUpdate.issueDialog = new Ext.Window({ // 创建对话框
			el : 'bulletinUpdate',
			title : getResource('resourceParam1134') + '',
			modal : true,
			layout : 'fit',
			width : 700,
			height : 420,
			closeAction : 'hide',
			plain : false,
			items : [bulletinUpdate.addform()]
				// 将面板绑定到对话框
		});
	}
	bulletinUpdate.issueDialog.show();
	bulletinUpdate.issueDialog.on("hide", function() {
				bulletinUpdate.issueDialog.close();
				bulletinUpdate.issueDialog.destroy();
				bulletinUpdate.issueDialog = null;
			});
}

bulletinUpdate.addform = function() {
	bulletinUpdate.textarea = new Ext.form.HtmlEditor({
				anchor : '100%',
				name : "content",
				fieldLabel : getResource('resourceParam1125') + "",
				id : "content",
				value : myGrid.row.get("content"),
				fontFamilies: ['宋体','黑体','隶书','幼圆','Arial','Courier New','Tahoma','Times New Roman','Verdana'],
				defaultFont: '宋体'
			});

	bulletinUpdate.form = new Ext.FormPanel({
		labelWidth : 60, // label settings here cascade unless
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent;',
		defaultType : 'textfield',
		items : [{
			fieldLabel : getResource('resourceParam1126') + '', // 文本框
			name : 'title',
			invalidText : '' + getResource('resourceParam1123') + '',
			maxLength : 50,
			maxLengthText : getResource('resourceParam734') + ''
					+ getResource('resourceParam1122'),
			allowBlank : false,
			value : myGrid.row.get("title"),
			anchor : '100%'
		}, bulletinUpdate.textarea],
		buttons : [{ // 定义面板中的按钮
			text : getResource('resourceParam505') + '',
			handler : function() { // 为当前按钮绑定事件，如果验证通过，则将表单元素提交到指定路径
				if (bulletinUpdate.form.form.isValid()) {
					if (bulletinUpdate.textarea.getValue().length > 5000) {
						Ext.Msg.alert(getResource('resourceParam575') + "",//提示公告
								getResource('resourceParam7119') + "!");//内容不能超过5000字符 gzj20011-4-19
						return false;
					}
					if (bulletinUpdate.textarea.getValue().length <10) {
						Ext.Msg.alert(getResource('resourceParam575') + "",
								getResource('resourceParam9175') + "");
						return false;
					}
					var appVo = Seam.Remoting
							.createType("com.luck.itumserv.bulletin.NoticesVo");
					appVo.setId(myGrid.row.get("id"));
					Ext.apply(appVo, bulletinUpdate.form.getForm().getValues());
					var titleLength = 0;
					var title = appVo.getTitle();
					for (i = 0; i < title.length; i++) {
						if (title.charCodeAt(i) >= 0
								&& title.charCodeAt(i) <= 128) {
							titleLength += 1;
						} else {
							titleLength += 2;
						}
					}
					if (titleLength > 50) {
						Ext.Msg.alert(getResource('resourceParam575') + "",
								getResource('resourceParam734')
										+ getResource('resourceParam7118')
										+ "!");
						return false;
					}
					callSeam("notices_noticessvr", "noticeUpdate", [appVo],
							bulletinUpdate.save);
					myGrid.loadvalue(bulletinMain.grid.store, {
								start : 0,
								limit : 25
							}, {});
				}
			}
		}, {
			text : getResource('resourceParam9002') + '', // text，取消
			handler : function() {
				// batcheUpdate.batcheform.form.reset(); //表单重置
				bulletinUpdate.issueDialog.hide();
			}
		}]
	});
	bulletinUpdate.form.on('bodyresize', function(panel, width, height) {
				Ext.getCmp('content').setHeight(height - 39);
			});

	return bulletinUpdate.form;
}

/**
 * 根据返回结果进行操作
 */
bulletinUpdate.save = function(result) {
	var sign = result;
	if (sign == "true") {
		Ext.example.msg(getResource('resourceParam575') + "",
				getResource('resourceParam631') + "");
	} else {
		bulletinUpdate.form.form.reset();
		Ext.MessageBox.show({
					title : getResource('resourceParam572') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
	myGrid.loadvalue(bulletinMain.grid.store, {
				start : 0,
				limit : 25
			}, {});
	bulletinUpdate.issueDialog.hide();
}
