
/**
 * 修改角色
 */

var roleUpdate = {
	addDialog : null,
	roleform : null,
	roles : null,
	rolename : null 
};

/**
 * 修改操作
 */
roleUpdate.init = function() {
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam663') + '',
					msg : '' + getResource('resourceParam815') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}
	if (myGrid.row.get('roleid') == 1) {
		Ext.MessageBox.alert('' + getResource('resourceParam663') + '', '不可以'
						+ getResource('resourceParam478') + ''
						+ getResource('resourceParam839') + '员'
						+ getResource('resourceParam803') + '！');
		return false;
	}
	roleUpdate.rolesDate();
};

/**
 * 生成修改角色表单面板
 */
roleUpdate.getroleform = function() {
	return new Ext.FormPanel({
				labelWidth : 75, // label settings here cascade unless
				// overridden
				frame : false,
				plain : false,
				bodyStyle : 'padding:5px 5px 0;background:transparent',
				defaultType : 'textfield',
				items : [ // 定义面板中的表单元素
				{
							inputType : 'hidden',
							name : 'roleid',
							width : 175,
							value : myGrid.row.get('roleid')
						}, {
							fieldLabel : '' + getResource('resourceParam809')
									+ '', // 文本框
							name : 'roleid',
							width : 175,
							blankText : '' + getResource('resourceParam805')
									+ '',
							value : myGrid.row.get('roleid'),
							disabled : true,
							allowBlank : false
						}, {
							fieldLabel : '' + getResource('resourceParam797')
									+ '', // 文本框
							id : 'roleNameID',
							name : 'rolename',
							width : 175,
							blankText : '' + getResource('resourceParam801')
									+ '',
							value : myGrid.row.get('rolename'),
							maxLength : 150,
							maxLengthText : ''
									+ getResource('resourceParam803')
									+ getResource('resourceParam1054') + '',
							minLength : 1,
							minLengthText : ''
									+ getResource('resourceParam800') + '',
							allowBlank : false,
							enableKeyEvents : true,
							listeners : {'keyup' : function(cur, evt) {
									var roleVal = myGrid.row.get('rolename');
									if(roleVal == cur.getValue()) {
										return;
									}
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
//												Ext.MessageBox.show({
//														title : '' + getResource('resourceParam634') + '',
//														msg : "此角色名称已被使用，请更换！",
//														buttons : Ext.MessageBox.OK,
//														icon : Ext.MessageBox.ERROR
//													});
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
									fieldLabel : ''
											+ getResource('resourceParam796')
											+ '',
									name : 'descr',
									width : 175,
									height : 60,
									value : myGrid.row.get('descr'),
									maxLength : 200,
									maxLengthText : ''
											+ getResource('resourceParam799')
											+ ''

								})],
				buttons : [ // 定义面板中的按钮
				{
					text : '' + getResource('resourceParam505') + '',
					handler : function(button) // 为当前按钮绑定事件
					{ // 如果验证通过，则将表单元素提交到指定路径
						var rN = Ext.getCmp('roleNameID').getValue();
						var fN = myGrid.row.get('rolename');
						if(rN == fN) {
							roleAdd.rolename = null;
						}
						if(roleAdd.rolename != null && roleAdd.rolename == "2") {
							Ext.MessageBox.show({
									title : '' + getResource('resourceParam634') + '',
									msg : "此角色名称已被使用，请更换！",
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
							return ;
						}
					
					
						button.disable();
						if (roleUpdate.roleform.form.isValid()) {
							var roleVo = Seam.Remoting
									.createType("com.luck.itumserv.base.role.RoleVo");
							Ext.apply(roleVo, roleUpdate.roleform.getForm()
											.getValues());
							Seam.Component.getInstance("base_role_roleSerivce")
									.updateRole(roleVo, function(result) {
												roleUpdate.save(result);
												button.enable();
											});
						}

					}
				}, {
					text : ''+getResource('resourceParam7007')+'',
					handler : function() {
						// roleUpdate.roleform.form.reset(); //表单重置
						roleUpdate.addDialog.hide();

					}
				}]
			});
}

/**
 * 返回查询到的机构列表，创建修改角色对话框
 */
roleUpdate.rolesDate = function(response, opt) {

	if (!roleUpdate.addDialog) {
		tlework.addHtml(tlework.divHtml, 'roleupdate'); // 动态生成需要绑定的div
		roleUpdate.addDialog = new Ext.Window({ // 创建对话框
			el : 'roleupdate',
			title : '' + getResource('resourceParam831') + '',
			layout : 'fit',
			modal : true,
			width : 300,
			height : 240,
			closeAction : 'hide',
			plain : false,
			items : [roleUpdate.addroleform()]
				// 将面板绑定到对话框
		});
	}
	roleUpdate.addDialog.show(); // 显示对话框
	roleUpdate.addDialog.on("hide", function() {
				roleUpdate.addDialog.close();
				roleUpdate.addDialog.destroy();
				roleUpdate.addDialog = null;

			});
}

/**
 * 生成修改角色的Form面板
 */
roleUpdate.addroleform = function() {
	Ext.form.Field.prototype.msgTarget = 'qtip';

	roleUpdate.roleform = roleUpdate.getroleform();
	return roleUpdate.roleform;
};
/**
 * 根据返回结果进行操作
 */
roleUpdate.save = function(result) {
	var sign = result;
	if (sign == "true") {
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam631') + "");
	} else {
		roleUpdate.roleform.form.reset();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
	roleUpdate.addDialog.hide();
	roleMain.baseargs = null;
	roleMain.rolegrid.store.reload();
	// myGrid.loadvalue(roleMain.rolegrid.store,roleMain.args,roleMain.baseargs);
};
