var dataClassificationDel = {

}
dataClassificationDel.init = function() {
	var sm = dataClassificationList.grid.getSelectionModel();
	var count = sm.getCount();
	var records = sm.getSelections();
	var record;

	var idSequence = '';
	var tempstore = new Ext.data.Store();
	for (var i = 0; i < count; i++) {
		record = records[i];
		idSequence += record.get('categoryId') + ',';
		// dataClassificationList.grid.getStore().remove(record); // annotated by YangJin'gang at 2010-09-08
		tempstore.add(record);
	}
	// dataClassificationList.grid.getSelectionModel().clearSelections(); // annotated by YangJin'gang at 2010-09-08
	Ext.Msg.confirm(''+getResource('resourceParam1724')+'', ""+getResource('resourceParam475')+"的标签无法恢复，"+getResource('resourceParam512')+""+getResource('resourceParam510')+"继续?", function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : '../JSON/dataClassification_DataClassificationRemote.delDataClassification',
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
							if (obj.success == true) {
								for (var i = 0; i < tempstore.getCount(); i++) {
									dataClassificationList.grid.getStore().remove(tempstore.getAt(i));
								}
							} else {
								Ext.MessageBox.show({
											title : ''+getResource('resourceParam1724')+'',
											msg : ''+getResource('resourceParam9798')+'',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										})

							}

							/**
							 * @author Update by YangJin'gang
							 * @date 2011-05-05 14:53 修改bug512
							 * begin
							 */
							// dataClassificationList.grid.store.reload();
							/** end */
							/*
							myGrid.loadvalue(dataClassificationList.grid.store,
									dataClassificationDel.args,
									dataClassificationDel.baseargs);
							*/
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							idSequence : idSequence
						}

					});
				}
			});
}
