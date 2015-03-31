var fankuiRemove = {}

fankuiRemove.init = function(row) {
	Ext.MessageBox.confirm(''+getResource('resourceParam971')+'', ''+getResource('resourceParam479')+'需要'+getResource('resourceParam475')+'该'+getResource('resourceParam970')+'吗?', function(btn, text) {
			if(btn == 'yes') {
				fankuiAjax.remove(row.get('fankuiId'));
			}
	});	
	
}
