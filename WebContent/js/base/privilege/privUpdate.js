
/**
 * 修改权限
 */

var privUpdate = {
	addDialog : null,
	privform : null,
	privs : null
};

/**
 * 修改操作
 */
privUpdate.init = function() {
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam663') + '',
					msg : '' + getResource('resourceParam759') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}
	privUpdate.privsDate();
};

/**
 * 生成修改权限表单面板
 */
privUpdate.getprivform = function() {
	return new Ext.FormPanel({
		labelWidth : 75, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent',
		defaultType : 'textfield',
		items : [ // 定义面板中的表单元素
		{
					inputType : 'hidden',
					name : 'privilegeid',
					width : 175,
					value : myGrid.row.get('privilegeid')
				}, {
					fieldLabel : '' + getResource('resourceParam756') + '', // 文本框
					name : 'privilegeid',
					width : 175,
					blankText : '' + getResource('resourceParam753') + '',
					value : myGrid.row.get('privilegeid'),
					disabled : true,
					allowBlank : false
				}, {
					fieldLabel : '' + getResource('resourceParam674') + '', // 文本框
					name : 'privilegename',
					width : 175,
					blankText : '' + getResource('resourceParam754') + '',
					maxLength : 20,
					maxLengthText : '' + getResource('resourceParam750') + '',
					minLength : 1,
					minLengthText : '' + getResource('resourceParam752') + '',
					value : myGrid.row.get('privilegename'),
					allowBlank : false
				}, new Ext.form.TextArea({
							fieldLabel : '' + getResource('resourceParam675')
									+ '',
							name : 'description',
							width : 175,
							height : 60,
							maxLength : 200,
							maxLengthText : ''
									+ getResource('resourceParam747') + '',
							value : myGrid.row.get('description')

						}), {
					fieldLabel : '' + getResource('resourceParam757') + '', // 文本框
					name : 'functionid',
					// maxLength : 20,
					// maxLengthText :'功能ID长度过长，不能超过10',
					width : 175,
					disabled : true,
					value : myGrid.row.get('functionid')
				}, {
					fieldLabel : '' + getResource('resourceParam674') + '', // 文本框
					xtype : 'hidden',
					name : 'menuid',
					id : 'menuid',
					value : myGrid.row.get('menuid'),
					allowBlank : false
				}],
		buttons : [ // 定义面板中的按钮
		{
			text : '' + getResource('resourceParam505') + '',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if (privUpdate.privform.form.isValid()) {
					var privVo = Seam.Remoting
							.createType("com.luck.itumserv.base.privilege.PrivVo");
					Ext
							.apply(privVo, privUpdate.privform.getForm()
											.getValues());
					Seam.Component.getInstance("base_privilege_privSerivce")
							.updatePriv(privVo, privUpdate.save);
				}

			}
		}, {
			text : '' + getResource('resourceParam7007') + '',
			handler : function() {
				// privUpdate.privform.form.reset(); //表单重置
				privUpdate.addDialog.hide();

			}
		}]
	});
}

/**
 * 返回查询到的机构列表，创建修改权限对话框
 */
privUpdate.privsDate = function(response, opt) {

	if (!privUpdate.addDialog) {
		tlework.addHtml(tlework.divHtml, 'privupdate'); // 动态生成需要绑定的div
		privUpdate.addDialog = new Ext.Window({ // 创建对话框
			el : 'privupdate',
			title : '' + getResource('resourceParam772') + '',
			modal : true,
			layout : 'fit',
			width : 300,
			height : 240,
			closeAction : 'hide',
			plain : false,
			items : [privUpdate.addprivform()]
				// 将面板绑定到对话框
		});
	}
	privUpdate.addDialog.show(); // 显示对话框
	privUpdate.addDialog.on("hide", function() {
				privUpdate.addDialog.close();
				privUpdate.addDialog.destroy();
				privUpdate.addDialog = null;

			});
}

/**
 * 生成修改权限的Form面板
 */
privUpdate.addprivform = function() {
	Ext.form.Field.prototype.msgTarget = 'qtip';

	privUpdate.privform = privUpdate.getprivform();
	return privUpdate.privform;
};
/**
 * 根据返回结果进行操作
 */
privUpdate.save = function(result) {
	var sign = result;
	if (sign == "true") {

		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam631') + "");
	} else {
		privUpdate.privform.form.reset();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
	privUpdate.addDialog.hide();
	privMain.baseargs = null;
	myGrid.loadvalue(privMain.privgrid.store, privMain.args, privMain.baseargs);
};
