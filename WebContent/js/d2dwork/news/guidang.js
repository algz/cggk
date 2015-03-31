// 归档操作对象声明
var guidang = {};
// 归档操作对象实例化
guidang.init = function(btn, pressed) {
	myGrid.row = Ext.getCmp('fileGridPanel').selModel.getSelected();
	if (myGrid.row == null || newsGrid.rows.length == 0) {
		Ext.MessageBox.show({
					title : getResource('resourceParam663') + '',
					msg : getResource('resourceParam7124') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}
	var ids = '';
	for (i = 0; i < newsGrid.rows.length; i++) {
		if (newsGrid.rows[i].get('isarchived') == 1) {
			Ext.MessageBox.show({
						title : getResource('resourceParam663') + '',
						msg : getResource('resourceParam7121') + '!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
			return false;
		} else {
			if (i != newsGrid.rows.length - 1) {
				ids += newsGrid.rows[i].get('newsid') + ",";
			} else {
				ids += newsGrid.rows[i].get('newsid');
			}
		}
	}
	// text : 取消发布此条新闻，是否继续
	var isbox = Ext.MessageBox.confirm(getResource('resourceParam1724'),
			getResource('resourceParam7123') + '?', function(btn, text) {
				if (btn == 'yes') {
					var appId = ids;
					callSeam("news_newssvr", "newsGd", [appId],
							guidang.delreturn);
				}
			}).getDialog().setWidth(250);
}

guidang.send = function(btn, pressed) {
	myGrid.row = Ext.getCmp('fileGridPanel').selModel.getSelected();
	if (myGrid.row == null || newsGrid.rows.length == 0) {
		Ext.MessageBox.show({
					title : getResource('resourceParam663') + '',
					msg : getResource('resourceParam1495') + '!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
		return false;
	}

	var ids = '';
	for (i = 0; i < newsGrid.rows.length; i++) {
		if (newsGrid.rows[i].get('isarchived') == 0) {
			Ext.MessageBox.show({
						title : getResource('resourceParam663') + '',
						msg : getResource('resourceParam7122') + '!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
			return false;
		} else {
			if (i != newsGrid.rows.length - 1) {
				ids += newsGrid.rows[i].get('newsid') + ",";
			} else {
				ids += newsGrid.rows[i].get('newsid');
			}
		}
	}
	// text : 发布此条新闻，是否继续
	var isbox = Ext.MessageBox.confirm(getResource('resourceParam1724'),
			getResource('resourceParam9002') + ''
					+ getResource('resourceParam7123') + '?', function(btn,
					text) {
				if (btn == 'yes') {
					var appId = ids;
					callSeam("news_newssvr", "newsSend", [appId],
							guidang.delreturn);
				}
			}).getDialog().setWidth(300);
}

// 归档操作回调函数
guidang.delreturn = function(result) {
	result = "true";
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
	newsMain.baseargs = {};
	Ext.getCmp('fileGridPanel').store.reload();
}
