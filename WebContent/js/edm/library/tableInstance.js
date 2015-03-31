var tableInstance = {}
tableInstance.init = function() {
	Ext.QuickTips.init();
	var wsnode = window.parent.getCheckNode();

	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'fit',
		items : []
	});
	Ext.Ajax.request({
				url : '../JSON/warehouseobject_WarehouseObjectRemote.getTableByName',
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					var attriPanel = treeGrid.init(obj.data.tableName,
							obj.data.tableDisplayname, obj.data.tableComment);
					viewport.add(attriPanel);
					viewport.doLayout();
				},
				disableCaching : true,
				autoAbort : true,
				params : {
					tableName : wsnode.attributes.categoryid
				}
			});
	viewport.doLayout();
}

Ext.onReady(tableInstance.init, tableInstance, true);
