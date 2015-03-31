
/**
 * 删除权限给角色
 */

var roleDelpriv = {
	addDialog : null,
	roleform : null,
	roles : null
};

/**
 * 删除操作
 */
roleDelpriv.init = function() {
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam663') + '',
					msg : '' + getResource('resourceParam815') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}
	roleDelpriv.rolesDate();
};

/**
 * 生成删除权限给角色表单面板
 */
roleDelpriv.getroleform = function() {
	return new Ext.FormPanel({
				labelWidth : 75, // label settings here cascade unless
				// overridden
				frame : false,
				plain : false,
				height : 80,
				region : 'north',
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
							name : 'rolename',
							width : 175,
							blankText : '' + getResource('resourceParam801')
									+ '',
							value : myGrid.row.get('rolename'),
							disabled : true,
							allowBlank : false
						}]
			});
}

/**
 * 返回查询到的机构列表，创建删除权限给角色对话框
 */
roleDelpriv.rolesDate = function(response, opt) {

	if (!roleDelpriv.addDialog) {
		tlework.addHtml(tlework.divHtml, 'roleupdate'); // 动态生成需要绑定的div
		roleDelpriv.addDialog = new Ext.Window({ // 创建对话框
			el : 'roleupdate',
			title : '' + getResource('resourceParam816') + '',
			layout : 'border',
			modal : true,
			width : 300,
			height : 440,
			closeAction : 'hide',
			plain : false,
			items : [roleDelpriv.addroleform()], // 将面板绑定到对话框
			buttons : [{
				text : '' + getResource('resourceParam505') + '',
				handler : function() {
					// 验证通过
					if (roleDelpriv.roleform.form.isValid()) {

						var roleprivIds = roleDelpriv.functioncodes();
						Seam.Component.getInstance("base_role_rolePrivSerivce")
								.roleDelpriv(roleprivIds, roleDelpriv.save);
					}
				}
			}, {
				text : '' + getResource('resourceParam7007') + '',
				handler : function() {
					roleDelpriv.addDialog.hide();
				}
			}]
		});
	}
	roleDelpriv.addDialog.show(); // 显示对话框
	roleDelpriv.addDialog.on("hide", function() {
				roleDelpriv.addDialog.close();
				roleDelpriv.addDialog.destroy();
				roleDelpriv.addDialog = null;

			});
}

/**
 * 生成删除权限给角色的Form面板
 */
roleDelpriv.addroleform = function() {
	Ext.form.Field.prototype.msgTarget = 'qtip';
	roleDelpriv.panel = new Ext.Panel({ // 定义panel面板中显示的信息
		region : 'center',
		layout : 'border'

	})
	roleDelpriv.roleform = roleDelpriv.getroleform();
	roleDelpriv.panel.add(roleDelpriv.roleform);

	var grid = delprivgrid.init();
	grid.region = 'center', roleDelpriv.panel.add(grid);
	roleDelpriv.panel.doLayout();
	roleMain.baseargs = {
		roleid : myGrid.row.get('roleid')
	}
	myGrid.loadvalue(grid.store, null, roleMain.baseargs);
	return roleDelpriv.panel;
};
/**
 * 根据返回结果进行操作
 */
roleDelpriv.save = function(result) {
	var sign = result;
	if (sign == "true") {

		Ext.MessageBox.show({
					title : '' + getResource('resourceParam6073') + '',
					msg : '' + getResource('resourceParam631') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.INFO
				});
	} else {
		roleDelpriv.roleform.form.reset();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
	roleDelpriv.addDialog.hide();
	roleMain.baseargs = null;
	myGrid.loadvalue(roleMain.rolegrid.store, roleMain.args, roleMain.baseargs);
};

roleDelpriv.functioncodes = function() { // 放回选中行id
	var result = new Array();
	if (myGrid.rows != null) {
		var size = myGrid.rows.length;
		for (var i = 0; i < size; i++) {
			var record = myGrid.rows[i].id;
			result[i] = record;
		}
		myGrid.rows = null;
		return result;
	}
}
