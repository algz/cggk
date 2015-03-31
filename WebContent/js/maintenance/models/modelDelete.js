var modelDelete={}
modelDelete.init=function(){

if (myGrid.row == null) {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam459')+'型号'+getResource('resourceParam508')+'进行操作!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}
    var isbox = Ext.MessageBox.confirm('警告！', ''+getResource('resourceParam475')+'的型号'+getResource('resourceParam508')+'无法恢复，'+getResource('resourceParam512')+''+getResource('resourceParam510')+'继续?', function(
			btn, text) {
		if (btn == 'yes') {
			var appId = myGrid.row.get('modelid');
		    callSeam("maintenance_models_ModelsService","modelsDelete",[appId],modelDelete.delreturn);
		}
	})

}

modelDelete.delreturn = function(result) {
    result="true";
	var sign = result;
	if (sign == "true") {
		myGrid.row = null;
//		Ext.MessageBox.show( {
//			title : '操作成功',
//			msg : '您选择删除的新闻已被成功删除！',
//			buttons : Ext.MessageBox.OK,
//			icon : Ext.MessageBox.INFO
//		})

	} else {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam651')+'',
			msg : sign,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		})
	}
	myGrid.loadvalue(modelsMain.modelsgrid.store,modelsMain.args,{});
}
