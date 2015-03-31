// 删除操作对象
var newstypeDel = {};

// 删除操作对象实例化
newstypeDel.init = function(btn, pressed) {
	if (myGrid.row == null) {
		Ext.MessageBox.show( {
			title : getResource('resourceParam663') + '',
			msg : getResource('resourceParam1142') + '',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}

	var isbox = Ext.MessageBox.confirm(getResource('resourceParam1724') + '',
									   getResource('resourceParam1141') + '',
										function(btn, text) {
											if (btn == 'yes') {
												var appId = myGrid.row.get('typeid');
												callSeam("newstypesvr", "typeDel", [ appId ],
														newstypeDel.delreturn);
											}
										})
}

// 删除操作回调函数
newstypeDel.delreturn = function(result) {
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
	newstypeMain.baseargs = {};
	myGrid.loadvalue(newstypeMain.grid.store, {
		start : 0,
		limit : 25
	}, {});
}
