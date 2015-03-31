var guidang = {};

guidang.init = function(btn, pressed) {
	myGrid.row = Ext.getCmp('bulletinGridPanel').selModel.getSelected();
	if (myGrid.row == null || bulletinGrid.rows.length == 0) {
		Ext.MessageBox.show({
					title : getResource('resourceParam663') + '',
					msg : getResource('resourceParam7124') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}

	var ids = '';
	for (i = 0; i < bulletinGrid.rows.length; i++) {
		if (bulletinGrid.rows[i].get('isarchived') == 1) {
			Ext.MessageBox.show({
						title : getResource('resourceParam663') + '',
						msg : getResource('resourceParam7121') + '!',
						width : 350,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
			return false;
		} else {
			if (i != bulletinGrid.rows.length - 1) {
				ids += bulletinGrid.rows[i].get('id') + ",";
			} else {
				ids += bulletinGrid.rows[i].get('id');
			}
		}
	}
	callSeam("noticeDeptsSvr", "getDep", [ids], haveDep);
	function haveDep(result)
	{
		if (result) {
			// text : 1724--警告！ 9022--归档此 9019--继续
			var isbox = Ext.MessageBox.confirm(getResource('resourceParam663')
							+ '', getResource('resourceParam7123') + '?',
					function(btn, text) {
						if (btn == 'yes') {
							var appId = ids;
							callSeam("notices_noticessvr", "NoticeGd", [appId],
									guidang.delreturn);
						}
					}).getDialog().setWidth(250);
		} else {
			Ext.MessageBox.show({
						title : getResource('resourceParam663') + '',
						msg : getResource('resourceParam9793') + '',
						buttons : Ext.MessageBox.OK,
						width : 380,
						icon : Ext.MessageBox.WARNING
					});
		}
	}
}

guidang.send = function(btn, pressed) {
	myGrid.row = Ext.getCmp('bulletinGridPanel').selModel.getSelected();
	if (myGrid.row == null || bulletinGrid.rows.length == 0) {
		Ext.MessageBox.show({
					title : getResource('resourceParam663') + '',
					msg : getResource('resourceParam7124') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}

	var ids = '';
	for (i = 0; i < bulletinGrid.rows.length; i++) {
		if (bulletinGrid.rows[i].get('isarchived') == 0) {
			Ext.MessageBox.show({
						title : getResource('resourceParam663') + '',
						msg : getResource('resourceParam7122') + '!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
			return false;
		} else {
			if (i != bulletinGrid.rows.length - 1) {
				ids += bulletinGrid.rows[i].get('id') + ",";
			} else {
				ids += bulletinGrid.rows[i].get('id');
			}
		}
	}
	// text : 取消发布此条新闻，是否继续
	var isbox = Ext.MessageBox.confirm(getResource('resourceParam1724'),
			getResource('resourceParam3001') + getResource('resourceParam7123')
					+ '?', function(btn, text) {
				if (btn == 'yes') {
					var appId = ids;
					callSeam("notices_noticessvr", "NoticeSend", [appId],
							guidang.delreturn);
				}
			}).getDialog().setWidth(280);
}

guidang.delreturn = function(result) {
	var sign = result;
	if (sign == "true") {

	} else {
		Ext.MessageBox.show({
					title : getResource('resourceParam651') + '',
					msg : sign,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				})
	}
	bulletinMain.baseargs = {};
	myGrid.loadvalue(Ext.getCmp('bulletinGridPanel').store, {
				start : 0,
				limit : 25
			}, {});
}