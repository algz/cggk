
/**
 * 查看角色
 */

var roleShow = {
	addDialog : null,
	roleform : null,
	roles : null
};

/**
 * 查看操作
 */
roleShow.init = function() {
	if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
		Ext.MessageBox.show({
					title : ''+getResource('resourceParam663')+'',
					msg : ''+getResource('resourceParam815')+'',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}
	roleShow.rolesDate();
};

/**
 * 生成查看角色表单面板
 */
roleShow.getroleform = function() {
	return new Ext.FormPanel({
				labelWidth : 75, // label settings here cascade unless
				// overridden
				frame : false,
				plain : false,
				height : 125,
				region : 'north',
				bodyStyle : 'padding:5px 5px 0;background:transparent',
				defaultType : 'textfield',
				items : [ // 定义面板中的表单元素

				{
							fieldLabel : ''+getResource('resourceParam809')+'', // 文本框
							name : 'roleid',
							width : 175,
							blankText : ''+getResource('resourceParam805')+'',
							value : myGrid.row.get('roleid'),
							disabled : true,
							allowBlank : false
						}, {
							fieldLabel : ''+getResource('resourceParam797')+'', // 文本框
							name : 'rolename',
							width : 175,
							blankText : ''+getResource('resourceParam801')+'',
							value : myGrid.row.get('rolename'),
							disabled : true,
							allowBlank : false
						}, new Ext.form.TextArea({
									fieldLabel : ''+getResource('resourceParam796')+'',
									name : 'descr',
									width : 175,
									height : 60,
									blankText : ''+getResource('resourceParam838')+'',
									value : myGrid.row.get('descr'),
									disabled : true,
									allowBlank : false

								})]
			});
}

/**
 * 返回查询到的机构列表，创建查看角色对话框
 */
roleShow.rolesDate = function(response, opt) {

	if (!roleShow.addDialog) {
		tlework.addHtml(tlework.divHtml, 'roleupdate'); // 动态生成需要绑定的div
		roleShow.addDialog = new Ext.Window({ // 创建对话框
			el : 'roleupdate',
			title : ''+getResource('resourceParam833')+'',
			layout : 'border',
			modal : true,
			width : 300,
			height : 440,
			closeAction : 'hide',
			plain : false,
			items : [roleShow.addroleform()], // 将面板绑定到对话框
			buttons : [

			{
						text : ''+getResource('resourceParam506')+'',
						handler : function() {
							roleShow.addDialog.hide();
						}
					}]
		});
	}
	roleShow.addDialog.show(); // 显示对话框
	roleShow.addDialog.on("hide", function() {
				roleShow.addDialog.close();
				roleShow.addDialog.destroy();
				roleShow.addDialog = null;

			});
}

/**
 * 生成查看角色的Form面板
 */
roleShow.addroleform = function() {

	roleShow.panel = new Ext.Panel({ // 定义panel面板中显示的信息
		region : 'center',
		layout : 'border'

	})
	roleShow.roleform = roleShow.getroleform();
	roleShow.panel.add(roleShow.roleform);
	roleShow.roleid = myGrid.row.get('roleid');
	var grid = showprivgrid.init();
	grid.region = 'center', roleShow.panel.add(grid);
	roleShow.panel.doLayout();
	roleShow.baseargs = {
		roleid : myGrid.row.get('roleid')
	}
	myGrid.loadvalue(grid.store, null, roleShow.baseargs);
	return roleShow.panel;
};
