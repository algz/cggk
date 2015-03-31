
/**
 * 添加权限
 */

var privAdd = {
	addDialog : null,
	privform : null,
	privs : null
};

/**
 * 生成添加权限表单面板
 */
privAdd.getprivform = function() {
	return new Ext.FormPanel({
		labelWidth : 75, // label settings here cascade unless overridden
		frame : false,
		plain : false,
		bodyStyle : 'padding:5px 5px 0;background:transparent',
		defaultType : 'textfield',
		items : [ // 定义面板中的表单元素
		{
					fieldLabel : '' + getResource('resourceParam756') + '', // 文本框
					name : 'privilegeid',
					maxLength : 10,
					maxLengthText : '' + getResource('resourceParam748') + '',
					minLength : 1,
					minLengthText : '' + getResource('resourceParam751') + '',
					width : 175,
					blankText : '' + getResource('resourceParam753') + '',
					allowBlank : false
				}, {
					fieldLabel : '' + getResource('resourceParam674') + '', // 文本框
					name : 'privilegename',
					maxLength : 20,
					maxLengthText : '' + getResource('resourceParam750') + '',
					minLength : 1,
					minLengthText : '' + getResource('resourceParam752') + '',
					width : 175,
					blankText : '' + getResource('resourceParam754') + '',
					allowBlank : false
				},

				new Ext.form.TextArea({
							fieldLabel : '' + getResource('resourceParam675')
									+ '',
							name : 'description',
							maxLength : 200,
							maxLengthText : ''
									+ getResource('resourceParam747') + '',
							width : 175,
							height : 60

						}), {
					fieldLabel : '' + getResource('resourceParam757') + '', // 文本框
					name : 'functionid',
					maxLength : 10,
					maxLengthText : '' + getResource('resourceParam749') + '',
					width : 175
				}, {
					fieldLabel : '' + getResource('resourceParam1654') + '', // 文本框
					name : 'groups',
					maxLength : 10,
					maxLengthText : '' + getResource('resourceParam749') + '',
					width : 175
				}],
		buttons : [ // 定义面板中的按钮
		{
			text : '' + getResource('resourceParam505') + '',
			handler : function() // 为当前按钮绑定事件
			{ // 如果验证通过，则将表单元素提交到指定路径
				if (privAdd.privform.form.isValid()) {
					var privVo = Seam.Remoting
							.createType("com.luck.itumserv.base.privilege.PrivVo");
					Ext.apply(privVo, privAdd.privform.getForm().getValues());
					Seam.Component.getInstance("base_privilege_privSerivce")
							.addPriv(privVo, privAdd.save);
				}

			}
		}, {
			text : '' + getResource('resourceParam7007') + '',
			handler : function() {
				// privAdd.privform.form.reset(); //表单重置
				privAdd.addDialog.hide();
			}
		}]
	});
}

/**
 * 返回查询到的机构列表，创建添加权限对话框
 */
privAdd.init = function(response, opt) {

	if (!privAdd.addDialog) {
		tlework.addHtml(tlework.divHtml, 'privadd'); // 动态生成需要绑定的div
		privAdd.addDialog = new Ext.Window({ // 创建对话框
			el : 'privadd',
			title : '' + getResource('resourceParam755') + '',
			modal : true,
			layout : 'fit',
			width : 300,
			height : 270,
			closeAction : 'hide',
			plain : false,
			items : [privAdd.addprivform()]
				// 将面板绑定到对话框
		});
	}
	privAdd.addDialog.show(); // 显示对话框
	privAdd.addDialog.on("hide", function() {
				privAdd.addDialog.close();
				privAdd.addDialog.destroy();
				privAdd.addDialog = null;

			});
}

/**
 * 生成添加权限的Form面板
 */
privAdd.addprivform = function() {
	/**
	 * 定义错误提示显示位置 qtip 当鼠标移动到控件上面时显示提示 under 在控件的底下显示错误提示 side
	 * 在控件右边显示一个错误图标，鼠标指向图标时显示错误提示 [element id] 错误提示显示在指定id的HTML元件中
	 */
	Ext.form.Field.prototype.msgTarget = 'qtip';

	privAdd.privform = privAdd.getprivform();
	return privAdd.privform;
};
/**
 * 根据返回结果进行操作
 */
privAdd.save = function(result) {
	var sign = result;
	if (sign == "true") {
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam631') + "");
	} else {
		privAdd.privform.form.reset();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
	privAdd.addDialog.hide();
	privMain.baseargs = null;
	myGrid.loadvalue(privMain.privgrid.store, privMain.args, privMain.baseargs);
};
