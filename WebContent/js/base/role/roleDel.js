var roleDel = {};
/**
 * 删除选中的角色
 */
roleDel.init = function(btn, pressed) {
	if (myGrid.row == null) {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam663') + '',
					msg : '' + getResource('resourceParam813') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}
	if (myGrid.row.get('roleid') == 1) {
		Ext.MessageBox.alert('' + getResource('resourceParam663') + '', ''
						+ getResource('resourceParam814') + '');
		return false;
	}

	var isbox = Ext.MessageBox.confirm('' + getResource('resourceParam1724')
					+ '', '' + getResource('resourceParam812') + '', function(
					btn, text) {
				if (btn == 'yes') {
					var roleId = myGrid.row.get('roleid');
					Seam.Component.getInstance("base_role_roleSerivce")
							.delRole(roleId, roleDel.delreturn);

				}
			})
	/*
	 * if(myGrid.row != null){ alert(myGrid.row.get('loginname')+ ' ' +
	 * myGrid.row.get('cnname')); }
	 */
}
roleDel.delreturn = function(result) {

	var sign = result;
	if (sign == "true") {
		myGrid.row = null;
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam649') + "");

	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam651') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				})
	}
	roleMain.baseargs = null;
	roleMain.rolegrid.store.reload();
	// myGrid.loadvalue(roleMain.rolegrid.store,roleMain.args,roleMain.baseargs);
}
