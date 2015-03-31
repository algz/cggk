var approveManDelete = {taskid:null};
approveManDelete.init = function(btn, pressed) {
	if (approveNotesGrid.row == null) {
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
						approveManDelete.taskid = approveNotesGrid.row.get('taskid');
						var approvemanid = approveNotesGrid.row.get('approvemanid');
						var taVo = Seam.Remoting
							.createType("com.luck.itumserv.tasklist.TaskApproveVo");
						taVo.setTaskid(approveManDelete.taskid);
						taVo.setApprovemanid(approvemanid);
						callSeam("tasklist_taskService","deleteTaskApprove",[taVo],approveManDelete.delreturn);						
					}
				});
}
approveManDelete.delreturn = function(result) {
	var sign = result;
	if (sign == "true") {
//		Ext.MessageBox.show( {
//			title : '操作成功',
//			msg : '您选择删除的新闻已被成功删除！',
//			buttons : Ext.MessageBox.OK,
//			icon : Ext.MessageBox.INFO
//		})
		approveNotesGrid.row = null;		
	} else {
		Ext.MessageBox.show( {
			title : ''+getResource('resourceParam651')+'',
			msg : sign,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		})
	}	
	//刷新gird
	var dsUrl = '../JSON/tasklist_taskService.getTaskApproveNotes?taskid='+ approveManDelete.taskid + '&date=' +new Date();
	var proxy = new Ext.data.HttpProxy( {
			method: 'get',
			url : dsUrl
	});
	approveNotesGrid.grid.store.proxy = proxy;
	approveNotesGrid.grid.store.load();	
}
