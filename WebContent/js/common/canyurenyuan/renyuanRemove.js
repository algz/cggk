var renyuanRemove = {
	
}
renyuanRemove.init = function(ds, row) {
	if (row.get('jiaose') == 0 || row.get('jiaose') == 1){
		Ext.MessageBox.show({
	           title: ''+getResource('resourceParam575')+'',
	           msg:''+getResource('resourceParam953')+'',
	           buttons: Ext.MessageBox.OK,
	           icon: Ext.MessageBox.WARNING
	       	});
	}else{
		Ext.MessageBox.confirm(""+getResource('resourceParam955')+"", '你'+getResource('resourceParam479')+''+getResource('resourceParam475')+''+row.get('yonghuxm')+'吗?', function(btn, text) {
			if(btn == 'yes') {
				ds.remove(row)
				Ext.MessageBox.show({
		           title: ''+getResource('resourceParam637')+'',
		           msg:''+getResource('resourceParam954')+'!',
		           buttons: Ext.MessageBox.OK,
		           icon: Ext.MessageBox.INFO
		       	});
			}
		});	
	}
}
