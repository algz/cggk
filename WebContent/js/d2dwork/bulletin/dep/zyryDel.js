var zyryDel = {

}

zyryDel.init = function(ds, row) {
	if (row == null) {
		Ext.MessageBox.show( {
			title : getResource('resourceParam663') + '',
			msg : getResource('resourceParam1136') + '!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}

	// text : 1724--警告 9018--通知的 9019--继续
	var isbox = Ext.MessageBox.confirm(getResource('resourceParam1724') + '',
					getResource('resourceParam475') + ''
					+ getResource('resourceParam9018') + ''
					+ getResource('resourceParam882') + '，'
					+ getResource('resourceParam512') + ''
					+ getResource('resourceParam510') + ''
					+ getResource('resourceParam9019') + '?',
					function(btn,
							text) {
						if (btn == 'yes') {
							var appId = myGrid.row.get('id');
							callSeam("noticeDeptsSvr", "depDel", [ appId ],
									zyryDel.delreturn);
						}
					})
}

zyryDel.delreturn = function(result) {
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
	myGrid.postLoad(zyryGridUI.ds, zyryMain.baseargs);
}