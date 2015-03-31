var dataObjectViewDel = {

}
dataObjectViewDel.init = function() {
	var sm = dataObjectAttribute.viewGrid.getSelectionModel();
	var count = sm.getCount();
	var records = sm.getSelections();
	var record;
	var tempstore = new Ext.data.Store();
	var idSequence = '';
	for (var i = 0; i < count; i++) {
		record = records[i];
		idSequence += record.get('viewId') + ',';
		tempstore.add(record);
	}
	Ext.Msg.confirm('' + getResource('resourceParam1724') + '', ""
					+ '删除的视图无法恢复,是否删除'+ "?", function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : '../JSON/dataobject_DataObjectRemote.delDataObjectView',
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
								// for (var i = 0; i < tempstore.getCount();
								// i++) {
								// dataObjectList.grid.getStore()
								// .remove(tempstore.getAt(i));
								// }
							} else {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam1724')
													+ '',
											msg : ''
													+ getResource('resourceParam651')
													+ '',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										})

							}
							dataObjectAttribute.viewGrid.getSelectionModel()
									.clearSelections();
							/**
							 * Update by YangJin'gang begin
							 */
							dataObjectAttribute.viewGrid.getStore().reload();
							/** end */
							/*
							 * myGrid.loadvalue(dataObjectList.grid.store,
							 * dataObjectDel.args, dataObjectDel.baseargs);
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
