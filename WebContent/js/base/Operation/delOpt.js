var delOpt={}

delOpt.init = function(title, row){
	if(row == null) {
		Ext.MessageBox.show({
           title: ''+getResource('resourceParam663')+'',
           msg:''+getResource('resourceParam662')+'!',
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       	});
	} else {
		Ext.MessageBox.confirm(title, '你需要'+getResource('resourceParam475')+''+row.get('name')+'项吗?', function(btn, text) {
			if(btn == 'yes') {
				Seam.Component.getInstance("base_operation_OperationService").delOperation(row.get('id'), function(result){
					if(result == true) {
						Ext.MessageBox.show({
				           title: ''+getResource('resourceParam637')+'',
				           msg: ''+getResource('resourceParam475')+'业务'+getResource('resourceParam508')+'成功!',
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.INFO
				       	});
						myGrid.loadvalue(operation.ds,operation.args,operation.baseargs);
					} else {
						Ext.MessageBox.show({
				           title: ''+getResource('resourceParam638')+'',
				           msg:''+getResource('resourceParam475')+'业务'+getResource('resourceParam508')+'失败!',
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.ERROR
				       	});
					}
				});
			}
			
		});
	}	
}	
