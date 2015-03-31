/**
 * 修改日志
 */

var gongzrizUpdate = {
	addDialog : null,
	gongzrizform : null,
	gongzrizs : null
};

/**
 * 修改操作
 */
gongzrizUpdate.init = function() {
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam1306')+'!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}
	gongzrizUpdate.rizhiId = gongzrizMain.gongzrizgrid.selModel.getSelected().get('rizhiId');
	gongzrizUpdate.gongzrizDate();
};

/**
 * 生成修改日志表单面板
 */
gongzrizUpdate.getgongzrizform = function() {
	return new Ext.FormPanel( {
		region : 'north',
		labelWidth : 60,
		frame : true,
		plain : false,
		bodyStyle : 'padding:5px 5px 0',
		defaultType : 'textfield',
		items : [ // 定义面板中的表单元素
		{
			fieldLabel : ''+getResource('resourceParam1323')+'', // 文本框
				name : 'rizhisj',
				id : 'rizhisj',
				value : myGrid.row.get('rizhisj'),
				cls : "readonly",
				readOnly : true,
				width : 300
			}, new Ext.form.TextArea( {
				fieldLabel : ''+getResource('resourceParam626')+'',
				name : 'rizhinr',
				id : 'rizhinr',
				width : 300,
				height : 140,
				value : myGrid.row.get('rizhinr'),
				allowBlank : false
			})],
		buttons : [ // 定义面板中的按钮
		{
			text : ''+getResource('resourceParam505')+'',
			handler : function() // 为当前按钮绑定事件
				{ // 如果验证通过，则将表单元素提交到指定路径
					if (gongzrizUpdate.gongzrizform.form.isValid()) {
						var gongzrizVo = createType("com.luck.itumserv.d2dwork.gongzriz.GongzrizUpdateVo");
						Ext.apply(gongzrizVo, gongzrizUpdate.gongzrizform
								.getForm().getValues());
						gongzrizVo.rizhiId = gongzrizUpdate.rizhiId;
						callSeam("d2dwork_gongzriz_GongzrizSvr",
								"update", [gongzrizVo],
								gongzrizUpdate.save);
					}

				}
			}, {
				text : '取消',
				handler : function() {
					gongzrizUpdate.addDialog.hide();

				}
			}]
	});
}

/**
 * 返回查询到的日志列表，创建修改日志对话框
 */
gongzrizUpdate.gongzrizDate = function(response, opt) {

	if (!gongzrizUpdate.addDialog) {
		tlework.addHtml(tlework.divHtml, 'gongzrizupdate'); // 动态生成需要绑定的div
		gongzrizUpdate.addDialog = new Ext.Window( { // 创建对话框
			el : 'gongzrizupdate',
			title : ''+getResource('resourceParam1314')+'',
			layout : 'fit',
			modal : true,
			width : 420,
			height : 300,
			closeAction : 'hide',
			plain : false,
			items : [gongzrizUpdate.addgongzrizform()]
		// 将面板绑定到对话框
		});
	}
	gongzrizUpdate.addDialog.show(); // 显示对话框
	gongzrizUpdate.addDialog.on("hide", function() {
		gongzrizUpdate.addDialog.close();
		gongzrizUpdate.addDialog.destroy();
		gongzrizUpdate.addDialog = null;

	});
}

/**
 * 生成修改角色的Form面板
 */
gongzrizUpdate.addgongzrizform = function() {
	Ext.form.Field.prototype.msgTarget = 'qtip';

	gongzrizUpdate.gongzrizform = gongzrizUpdate.getgongzrizform();
	return gongzrizUpdate.gongzrizform;
};
/**
 * 根据返回结果进行操作
 */
gongzrizUpdate.save = function(result) {
	if (result) {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam677')+'',
			msg : ''+getResource('resourceParam1109')+'!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.INFO
		});
	} else {
		gongzrizUpdate.gongzrizform.form.reset();
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam572')+'',
			msg : ''+getResource('resourceParam1322')+'',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	}
	gongzrizUpdate.addDialog.hide();
	gongzrizMain.baseargs = null;
	myGrid.loadvalue(gongzrizMain.gongzrizgrid.store, gongzrizMain.args,
			gongzrizMain.baseargs);
};
