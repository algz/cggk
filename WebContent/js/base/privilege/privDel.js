var privDel = {};
/**
 * 删除选中的权限
 */
privDel.init = function(btn, pressed) {
	if (myGrid.row == null) {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam663') + '',
					msg : '' + getResource('resourceParam759') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}

	var isbox = Ext.MessageBox.confirm('' + getResource('resourceParam1724')
					+ '', '' + getResource('resourceParam758') + '', function(
					btn, text) {
				if (btn == 'yes') {
					var privilegeId = myGrid.row.get('privilegeid');
					Seam.Component.getInstance("base_privilege_privSerivce")
							.delPriv(privilegeId, privDel.delreturn);
					params : {
						privilegeId : myGrid.row.get('privilegeId')
					}
				}
			})
	/*
	 * if(myGrid.row != null){ alert(myGrid.row.get('loginname')+ ' ' +
	 * myGrid.row.get('cnname')); }
	 */
}
privDel.delreturn = function(result) {

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
	privMain.baseargs = null;
	myGrid.loadvalue(privMain.privgrid.store, privMain.args, privMain.baseargs);
}
