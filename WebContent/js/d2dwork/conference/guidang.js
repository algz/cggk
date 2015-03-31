var guidang = {};
guidang.init = function(btn, pressed) {
	if (Ext.getCmp('conferenceGridPanel').selModel.getSelected() == null
			|| conferenceGrid.rows.length == 0) {
		Ext.MessageBox.show({
					title : getResource('resourceParam663') + '',
					msg : getResource('resourceParam7124') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}

	var ids = '';
	for (i = 0; i < conferenceGrid.rows.length; i++) {
		if (conferenceGrid.rows[i].get('isarchived') == 1) {
			Ext.MessageBox.show({
						title : getResource('resourceParam663') + '',
						msg : getResource('resourceParam7121') + '!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
			return false;
		} else {
			if (i != conferenceGrid.rows.length - 1) {
				ids += conferenceGrid.rows[i].get('id') + ",";
			} else {
				ids += conferenceGrid.rows[i].get('id');
			}
		}
	}
	callSeam("attendPeopleSvr", "getPaticipate", [ids], havaPaticipate);
	function havaPaticipate(result)
	{
		if (result) {
			// text : 1724--警告
			var isbox = Ext.MessageBox.confirm(getResource('resourceParam1724')
							+ '', getResource('resourceParam7123') + '?',
					function(btn, text) {
						if (btn == 'yes') {
							var appId = ids;
							callSeam("meetings_meetingssvr", "meetingGd",
									[appId], guidang.delreturn);
						}
					}).getDialog().setWidth(300);
		} else {
			Ext.MessageBox.show({
						title : getResource('resourceParam663') + '',
						msg : getResource('resourceParam9792') + '',
						width : 400,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
		}
	}
}

guidang.send = function(btn, pressed) {
	if (Ext.getCmp('conferenceGridPanel').selModel.getSelected() == null
			|| conferenceGrid.rows.length == 0) {
		Ext.MessageBox.show({
					title : getResource('resourceParam663') + '',
					msg : getResource('resourceParam7124') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}

	var ids = '';
	for (i = 0; i < conferenceGrid.rows.length; i++) {
		if (conferenceGrid.rows[i].get('isarchived') == 0) {
			Ext.MessageBox.show({
						title : getResource('resourceParam663') + '',
						msg : getResource('resourceParam7122') + '!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
			return false;
		} else {
			if (i != conferenceGrid.rows.length - 1) {
				ids += conferenceGrid.rows[i].get('id') + ",";
			} else {
				ids += conferenceGrid.rows[i].get('id');
			}
		}
	}
	// text : 取消发布此条新闻，是否继续
	var isbox = Ext.MessageBox.confirm(getResource('resourceParam1724'),
			getResource('resourceParam3001') + getResource('resourceParam7123')
					+ '?', function(btn, text) {
				if (btn == 'yes') {
					var appId = ids;
					callSeam("meetings_meetingssvr", "meetingSend", [appId],
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
	conferenceMain.baseargs = {};
	myGrid.loadvalue(Ext.getCmp('conferenceGridPanel').store, {
				start : 0,
				limit : 25
			}, {});
}