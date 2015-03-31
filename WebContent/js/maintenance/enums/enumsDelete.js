var enumsDelete={}
enumsDelete.init=function(){

if (myGrid.row == null) {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam459')+getResource('resourceParam1998')+'进行操作!',
			width : 270,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}
    var isbox = Ext.MessageBox.confirm('警告！', ''+getResource('resourceParam475')+'的'+getResource('resourceParam1998')+'无法恢复，会影响'+getResource('resourceParam513')+''+getResource('resourceParam474')+'，'+getResource('resourceParam512')+''+getResource('resourceParam510')+'继续?', function(
			btn, text) {
		if (btn == 'yes') {
            Ext.Ajax.request({
                        url : "../JSON/tasklist_taskService.deleteEnum",
                        method : 'POST',
                        success : function(response, options) {
                            enumsDelete.delreturn(response.responseText);
                            },
                        disableCaching : true,
                        autoAbort : true,
                        params : {
                           id:myGrid.row.get('id')
                        }
                    });
		}
	}).getDialog().setWidth(400);

}

enumsDelete.delreturn = function(result) {
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
	myGrid.loadvalue(enumsMain.enumsgrid.store,enumsMain.args,{});
}
