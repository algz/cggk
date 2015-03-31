var cateGoryDelete={}
cateGoryDelete.init=function()
{
 if (cateGoryMain.sm.getSelections().length== 0) {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam1793')+'!',
			width : 270,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}
    var isbox = Ext.MessageBox.confirm(getResource('resourceParam1724'), ''+getResource('resourceParam1792')+'?', function(
			btn, text) {
		if (btn == 'yes') {
			var appId = cateGoryMain.sm.getSelected().get('projectcategoryid');
		    callSeam("maintenance_ProjectCateGory_ProjectCateGoryService","cateGoryDelete",[appId],cateGoryDelete.delreturn);
		}
	}).getDialog().setWidth(350);
}

cateGoryDelete.delreturn = function(result) {
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
	myGrid.loadvalue(cateGoryMain.cateGorygrid.store,cateGoryMain.args,{});
}
