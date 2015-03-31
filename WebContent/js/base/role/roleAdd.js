
/**
 * 添加角色
 */

var roleAdd = {
	addDialog : null,
	roleform : null,
	roles : null,
	rolename : null
};

/**
 * 生成添加角色表单面板
 */
roleAdd.getroleform = function() {
	return new Ext.FormPanel({
				id : 'roleAddform',
				labelWidth : 75, // label settings here cascade unless
									// overridden
				frame : false,
				plain : false,
				bodyStyle : 'padding:5px 5px 0;background:transparent',
				defaultType : 'textfield',
				items : [ // 定义面板中的表单元素

				{
					fieldLabel : '' + getResource('resourceParam797') + '', // 文本框
					name : 'rolename',
					width : 175,
					blankText : '' + getResource('resourceParam801') + '',
					maxLength : 50,
					maxLengthText : '' + getResource('resourceParam803')
							+getResource('resourceParam1054')+ '',
					minLength : 1,
					minLengthText : '' + getResource('resourceParam800') + '',
					allowBlank : false,
					enableKeyEvents : true,
					listeners : {'keyup' : function(cur, evt) {
							var url = '../JSON/base_role_roleSerivce.getRoleName';
							Ext.Ajax.request({
								url : url,
								method : 'POST',
								params : {
									roleName : cur.getValue()
								},
								success : function(response, options) {
									var obj = Ext.util.JSON.decode(response.responseText);
									roleAdd.rolename = obj;
									if(obj == null || obj == "") {
										Ext.MessageBox.show({
											title : '' + getResource('resourceParam634')
													+ '',
											msg : '' + "数据加载有误！" + '',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
									}
									if(obj == '2') {
//										Ext.MessageBox.show({
//												title : '' + getResource('resourceParam634') + '',
//												msg : "此角色名称已被使用，请更换！",
//												buttons : Ext.MessageBox.OK,
//												icon : Ext.MessageBox.ERROR
//											});
									}
								},
								failure : function(response, options) {
									Ext.MessageBox.show({
										title : '' + getResource('resourceParam634')
												+ '',
										msg : '' + "数据加载有误！" + '',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
								}
							});
						}
					}
				}, new Ext.form.TextArea({
							fieldLabel : '' + getResource('resourceParam796')
									+ '',
							name : 'descr',
							width : 175,
							height : 60,
							maxLength : 200,
							maxLengthText : ''
									+ getResource('resourceParam799') + ''

						})],
				buttons : [ // 定义面板中的按钮
				{
					text : '' + getResource('resourceParam505') + '',
					handler : function(button) // 为当前按钮绑定事件
					{ // 如果验证通过，则将表单元素提交到指定路径
						if(roleAdd.rolename == "2") {
							Ext.MessageBox.show({
									title : '' + getResource('resourceParam634') + '',
									msg : "此角色名称已被使用，请更换！",
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
							return ;
						}
						button.disable();
						if (roleAdd.roleform.form.isValid()) {
							var roleVo = Seam.Remoting
									.createType("com.luck.itumserv.base.role.RoleVo");
							Ext.apply(roleVo, roleAdd.roleform.getForm()
											.getValues());
							Seam.Component.getInstance("base_role_roleSerivce")
									.addRole(roleVo, function(result) {
												roleAdd.save(result);
												button.enable();
											});
						}

					}
				}, {
					text : ''+getResource('resourceParam7007')+'',
					handler : function() {
						// roleAdd.roleform.form.reset(); //表单重置
						roleAdd.addDialog.hide();
					}
				}]
			});
}

/**
 * 返回查询到的机构列表，创建添加角色对话框
 */
roleAdd.init = function(response, opt) {

	if (!roleAdd.addDialog) {
		tlework.addHtml(tlework.divHtml, 'roleadd'); // 动态生成需要绑定的div
		roleAdd.addDialog = new Ext.Window({ // 创建对话框
			el : 'roleadd',
			title : '' + getResource('resourceParam802') + '',
			modal : true,
			layout : 'fit',
			width : 300,
			height : 200,
			closeAction : 'hide',
			plain : false,
			items : [roleAdd.addroleform()]
				// 将面板绑定到对话框
		});
	}
	roleAdd.addDialog.show(); // 显示对话框
	roleAdd.addDialog.on("hide", function() {
				roleAdd.addDialog.close();
				roleAdd.addDialog.destroy();
				roleAdd.addDialog = null;

			});

}

/**
 * 生成添加角色的Form面板
 */
roleAdd.addroleform = function() {
	/**
	 * 定义错误提示显示位置 qtip 当鼠标移动到控件上面时显示提示 under 在控件的底下显示错误提示 side
	 * 在控件右边显示一个错误图标，鼠标指向图标时显示错误提示 [element id] 错误提示显示在指定id的HTML元件中
	 */
	Ext.form.Field.prototype.msgTarget = 'qtip';

	roleAdd.roleform = roleAdd.getroleform();
	return roleAdd.roleform;
};
/**
 * 根据返回结果进行操作
 */
roleAdd.save = function(result) {
	var sign = result;
	if (sign == "true") {
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam631') + "");
	} else {
		roleAdd.roleform.form.reset();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
	roleAdd.addDialog.hide();
	roleMain.baseargs = null;
	roleMain.rolegrid.store.reload();
	// myGrid.loadvalue(roleMain.rolegrid.store,roleMain.args,roleMain.baseargs);
};
