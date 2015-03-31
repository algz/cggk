var wareHouseObjectDel = {

}
wareHouseObjectDel.init = function() {
	var sm = warehouseObjectList.grid.getSelectionModel();
	var count = sm.getCount();
	var records = sm.getSelections();
	var record;

	var idSequence = '';
	for (var i = 0; i < count; i++) {
		record = records[i];
		var basename = record.get('categoryName');
		if (record.get('status') == 1) {
			Ext.example
					.msg('' + getResource('resourceParam596') + '', ''
									+ basename
									+ getResource('resourceParam4068') + '！');
			continue;
		}
		idSequence += record.get('categoryId') + ',';
	}
	if (idSequence == '') {
		return;
	}
	Ext.Msg.confirm('' + getResource('resourceParam1724') + '', ""
					+ getResource('resourceParam1775') + "?", function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : '../JSON/dataClassification_DataClassificationRemote.delDataClassification',
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
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

							/**
							 * Update by YangJin'gang begin
							 */
							warehouseObjectList.grid.store.reload();
							/** end */
							/*
							 * myGrid.loadvalue(warehouseObjectList.grid.store,
							 * warehouseObjectList.args,
							 * warehouseObjectList.baseargs);
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
