var taskCateDelete={}

taskCateDelete.init=function()
{

	if (taskCateMain.sm.getSelections().length == 0) {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam1808')+'!',
			width : 270,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}
    var isbox = Ext.MessageBox.confirm(getResource('resourceParam1724'), ''+getResource('resourceParam1807')+'?', function(
			btn, text) {
		if (btn == 'yes') {
			var appId = taskCateMain.sm.getSelected().get('taskcategoryid');
		    callSeam("maintenance_TaskCategory_TaskCategoryService","taskCateDelete",[appId],taskCateDelete.delreturn);
		}
	}).getDialog().setWidth(350);
}


taskCateDelete.delreturn = function(result) {
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
	myGrid.loadvalue(taskCateMain.taskCategrid.store,taskCateMain.args,{});
}
