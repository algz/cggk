var zyryDel = {

}

zyryDel.init = function(ds, row) {
	if (row == null) {
		Ext.MessageBox.show( {
			title : getResource('resourceParam663') + '',
			msg : getResource('resourceParam1204') + '!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}
	// text : 1724--警告！
	var isbox = Ext.MessageBox.confirm(getResource('resourceParam1724') + '',
										getResource('resourceParam1205') + '',
										function(btn, text) {
											if (btn == 'yes') {
												var appId = myGrid.row.get('id');
												callSeam("attendPeopleSvr", "peopleDel", [ appId ],
														zyryDel.delreturn);
											}
										})
}

zyryDel.delreturn = function(result) {
	result = "true";
	var sign = result;
	if (sign == "true") {
		myGrid.row = null;
		myGrid.postLoad(conferenceMain.grid.store, {
			start : 0,
			limit : 25
		}, conferenceMain.baseargs);
	} else {
		Ext.MessageBox.show( {
			title : getResource('resourceParam651') + '',
			msg : sign,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		})
	}
	myGrid.postLoad(zyryGridUI.ds, zyryMain.baseargs);
}
