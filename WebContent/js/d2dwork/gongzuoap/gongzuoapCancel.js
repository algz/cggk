var gongzuoapCancel = {
	
}
gongzuoapCancel.init = function(row) {
	Ext.MessageBox.confirm('取消工作安排', ''+getResource('resourceParam479')+'需要取消该工作安排吗?', function(btn, text) {
			if(btn == 'yes') {
				gongzuoapAjax.remove(row.get('gzuoapid'));
			}
	});	
}
