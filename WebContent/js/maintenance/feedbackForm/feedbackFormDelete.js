var cateGoryDelete = {}
cateGoryDelete.init = function() {
	var sm = cateGoryMain.cateGorygrid.getSelectionModel();
	var count = sm.getCount();
	var records = sm.getSelections();
	var record;

	var idSequence = '';
	for (var i = 0; i < count; i++) {
		record = records[i];
		idSequence += record.get('formid') + '#';
	}
	Ext.Msg.confirm(''+getResource('resourceParam1724')+'', ""+getResource('resourceParam475')+"的"+getResource('resourceParam598')+"无法恢复，"+getResource('resourceParam512')+""+getResource('resourceParam510')+"继续?", function(btn) {
		if (btn == 'yes') {
			Ext.Ajax.request({
				url : '../JSON/maintenance_feedbackForm_FeedbackFormRemote.deleteForm',
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					if (obj.success == true) {		
					} else {
						Ext.MessageBox.show({
									title : ''+getResource('resourceParam1724')+'',
									msg : ''+getResource('resourceParam9798')+'',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								})
								
					}
					cateGoryMain.cateGorygrid.store.reload();
				},
				disableCaching : true,
				autoAbort : true,
				params : {
					formid : idSequence
				}
			});
		}
	});
}
