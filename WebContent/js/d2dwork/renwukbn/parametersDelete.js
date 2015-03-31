var parametersDelete = {};
parametersDelete.init = function(btn, pressed) {
	if (scxzGrid.row == null) {
		Ext.MessageBox.show({
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam1265')+'!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}
		// 删除操作
		var isbox = Ext.MessageBox.confirm(''+getResource('resourceParam6026'), ''+getResource('resourceParam1264')+'', // 6026警告！
				function(btn, text) {
					if (btn == 'yes') {
						var paramid = scxzGrid.row.get('pid');
						callSeam("tasklist_scxzParametersService","deleteParam",[paramid],parametersDelete.delreturn);						
					}
				});
}
parametersDelete.delreturn = function(result) {
	var sign = result;
	if (sign == "true") {
//		Ext.MessageBox.show( {
//			title : '操作成功',
//			msg : '您选择删除的新闻已被成功删除！',
//			buttons : Ext.MessageBox.OK,
//			icon : Ext.MessageBox.INFO
//		})
		scxzGrid.row = null;		
	} else {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam651')+'',
			msg : sign,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		})
	}
	//刷新参数窗口
	scxzGrid.grid.store.load();
}
