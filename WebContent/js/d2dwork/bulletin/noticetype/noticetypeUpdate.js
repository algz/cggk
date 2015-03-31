var noticetypeUpdate = {
	issueDialog : null,
	form : null,
	temp : null
}

noticetypeUpdate.init = function() {
	myGrid.row = noticetypeMain.grid.selModel.getSelected();
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show( {
			title : getResource('resourceParam663') + '',
			msg : getResource('resourceParam1142') + '',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}

	if (!noticetypeUpdate.issueDialog) {
		tlework.addHtml(tlework.divHtml, 'typeupdate');
		noticetypeUpdate.issueDialog = new Ext.Window( { // 创建对话框
			el : 'typeupdate',
			title : getResource('resourceParam478') + '' + getResource('resourceParam1132'),
			modal : true,
			layout : 'fit',
			width : 350,
			height : 180,
			closeAction : 'hide',
			plain : false,
			items : [ noticetypeUpdate.Updateform() ] // 将面板绑定到对话框
		});
	}
	noticetypeUpdate.issueDialog.show();
	noticetypeUpdate.issueDialog.on("hide", function() {
		noticetypeUpdate.issueDialog.close();
		noticetypeUpdate.issueDialog.destroy();
		noticetypeUpdate.issueDialog = null;

	});
}

noticetypeUpdate.Updateform = function() {
	noticetypeUpdate.form = new Ext.FormPanel( {
			labelWidth : 60, // label settings here cascade unless
			frame : false,
			plain : false,
			bodyStyle : 'pUpdateing:5px 5px 0;background:transparent;',
			defaultType : 'textfield',
			items : [ {
				fieldLabel : getResource('resourceParam1139') + '', // 文本框
				name : 'name',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : getResource('resourceParam1092') + '!',
				blankText : getResource('resourceParam1095') + '',
				maxLength : 50,
				maxLengthText : getResource('resourceParam1094') + '',
				allowBlank : false,
				value : myGrid.row.get("name"),
				anchor : '95%'
			}, {
				fieldLabel : getResource('resourceParam1140') + '', // 文本框
				name : 'description',
				xtype : "textarea",
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : getResource('resourceParam1092') + '!',
				value : myGrid.row.get("description"),
				blankText : getResource('resourceParam1095') + '',
				height : 60,
				maxLength : 50,
				maxLengthText : getResource('resourceParam1094') + '',
				allowBlank : true,
				anchor : '95%'
			} ],
			buttons : [ { // 定义面板中的按钮
					text : getResource('resourceParam505') + '',
					handler : function() { // 为当前按钮绑定事件，如果验证通过，则将表单元素提交到指定路径
						if (noticetypeUpdate.form.form.isValid()) {
							var typeVo = Seam.Remoting.createType("com.luck.itumserv.bulletin.noticetype.NoticeTypeVo");
							Ext.apply(typeVo, noticetypeUpdate.form.getForm().getValues());
							typeVo.setTypeid(myGrid.row.get("typeid"));
							callSeam("noticetypesvr", "typeUpdate", [ typeVo ], noticetypeUpdate.save);
							myGrid.loadvalue(noticetypeMain.grid.store, {
										start : 0,
										limit : 25
									}, {});
						}
					}
				}, {
					text : getResource('resourceParam9002') + '', // text，取消
					handler : function() {
						// batcheUpdate.batcheform.form.reset(); //表单重置
						noticetypeUpdate.issueDialog.hide();
					}
				} ]
		});

	return noticetypeUpdate.form;
}

/**
 * 根据返回结果进行操作
 */
noticetypeUpdate.save = function(result) {
	var sign = result;
	if (sign == "true") {

	} else {
		noticetypeUpdate.form.form.reset();
		Ext.MessageBox.show( {
			title : getResource('resourceParam572') + '',
			msg : sign,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	}
	myGrid.loadvalue(noticetypeMain.grid.store, {
		start : 0,
		limit : 25
	}, {});
	noticetypeUpdate.issueDialog.hide();
}
