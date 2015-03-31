var issueDelete = {}
issueDelete.init = function(){
   if (myGrid.row == null) {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam663')+'',
			msg : ''+getResource('resourceParam1589')+'!',
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.WARNING
		});
		return false;
	}
    var isbox = Ext.MessageBox.confirm(''+getResource('resourceParam6026'), ''+getResource('resourceParam1588')+'', function( // 6026警告！
			btn, text) {
		if (btn == 'yes') {
			var appId = myGrid.row.get('taskproblemsid');
		    callSeam("tasklist_issue_TaskProblemsService","taskProDelete",[appId],issueDelete.delreturn);
			
		}
	})
}


issueDelete.delreturn = function(result) {
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
	myGrid.loadvalue(issueMain.issuegrid.store,issueMain.args,{});
}
