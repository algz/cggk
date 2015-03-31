var dataObjectDel = {

}
dataObjectDel.init = function() {
	var sm = dataObjectList.grid.getSelectionModel();
	var count = sm.getCount();
	var records = sm.getSelections();
	var record;
	var tempstore = new Ext.data.Store();
	var idSequence = '';
	for (var i = 0; i < count; i++) {
		record = records[i];
		idSequence += record.get('categoryId') + ',';
		tempstore.add(record);
	}
	Ext.Msg.confirm('' + getResource('resourceParam1724') + '', ""
					+ getResource('resourceParam1751') + "?", function(btn) {// 警告
				// +删除的数据对象无法恢复，是否继续
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : '../JSON/dataClassification_DataClassificationRemote.delDataClassification',
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
							if(!obj.success){ //@chenw 添加数据对象引用提示！
								Ext.MessageBox.show({
										title : ''+ getResource('resourceParam575')+ '',
										msg : "该数据对象已被引用不能删除！",
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									}).getDialog().setWidth(250);
							}else{
								Ext.example.msg("数据对象","删除成功！");
								// 解决删除时而刷新时而不刷新2011-4-19 gzj
								var g = dataObjectList.grid;
								var arr = g.getSelectionModel().getSelections();
								if (arr) {
									for (var i = 0; i < arr.length; i++) {
										g.getStore().remove(arr[i]);
									}
								}
							}
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
