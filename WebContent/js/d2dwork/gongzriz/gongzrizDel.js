var gongzrizDel = {};
/**
 * 删除选中的日志
 */
gongzrizDel.init = function(btn, pressed) {
	if (myGrid.row == null) {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam1306')+'!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}

	var isbox = Ext.MessageBox.confirm('警告！', ''+getResource('resourceParam1305')+'?', function(
			btn, text) {
		if (btn == 'yes') {
			var rizhidId = myGrid.row.get('rizhiId');
		    callSeam("d2dwork_gongzriz_GongzrizSvr","remove",[rizhidId],gongzrizDel.delreturn);			

		}
	})
}
gongzrizDel.delreturn = function(result) {
	if (result) {
		myGrid.row = null;
		Ext.MessageBox.show( {
			title : '操作成功',
			msg : ''+getResource('resourceParam649')+'',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.INFO
		})

	} else {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam651')+'',
			msg : ''+getResource('resourceParam1307')+'',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		})
	}
	gongzrizMain.baseargs = null;
	myGrid.loadvalue(gongzrizMain.gongzrizgrid.store, gongzrizMain.args,
			gongzrizMain.baseargs);
}
