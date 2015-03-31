var ideServerDel = {};
ideServerDel.init = function(btn, pressed) {
	if (myGrid.row == null) {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam663') + '',
					msg : '' + getResource('resourceParam1100') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}

	var isbox = Ext.MessageBox.confirm('' + getResource('resourceParam1724')
					+ '', '' + getResource('resourceParam585') + '', function(
					btn, text) {
				if (btn == 'yes') {
					var ids = new Array();
					var selections = ideServerMain.getSelections();
					for (var i = 0; i < selections.length; i++) {
						ids[i] = selections[i].get('ideServerId');
					}
					// var ideServerId = myGrid.row.get('ideServerId');
					callSeam("ideServer_ideServerService", "ideServerDel",
							[ids], ideServerDel.delreturn);
				}
			})
}
ideServerDel.delreturn = function(result) {
	result = "true";
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
	ideServerMain.baseargs = {};
	myGrid.loadvalue(ideServerMain.ideServerGrid.store, {
				start : 0,
				limit : 25
			}, {});
}
