var meetingtypeDel = {};
meetingtypeDel.init = function(btn, pressed) {
	if (myGrid.row == null) {
		Ext.MessageBox.show( {
			title : getResource('resourceParam663') + '',
			msg : getResource('resourceParam1142') + '',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}

	// text 1724--警告！
	var isbox = Ext.MessageBox.confirm(getResource('resourceParam1724') + '',
										getResource('resourceParam1141') + '',
										function(btn, text) {
											if (btn == 'yes') {
												var appId = myGrid.row.get('typeid');
												callSeam("meetingtypesvr", "typeDel", [ appId ],
														meetingtypeDel.delreturn);
											}
										})
}

meetingtypeDel.delreturn = function(result) {
	result = "true";
	var sign = result;
	if (sign == "true") {
		myGrid.row = null;

	} else {
		Ext.MessageBox.show( {
			title : getResource('resourceParam651') + '',
			msg : sign,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		})
	}
	meetingtypeMain.baseargs = {};
	myGrid.loadvalue(meetingtypeMain.grid.store, {
		start : 0,
		limit : 25
	}, {});
}
