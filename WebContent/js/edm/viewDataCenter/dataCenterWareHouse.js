var dataCenterWareHouse = {}
dataCenterWareHouse.init = function() {
	Ext.QuickTips.init();

	dataCenterWareHouse.mainPanel = new Ext.Panel({
				border : false,
				layout : 'fit',
				items : [new Ext.Panel()]
			})
	return dataCenterWareHouse.mainPanel;
}
dataCenterWareHouse.view = function(wsid, wsname, categoryid, desc) {
	var t = dataCenterWareHouse.mainPanel.items.get(0);
	if (t) {
		dataCenterWareHouse.mainPanel.remove(t);
	}
	Ext.Ajax.request({
		url : '../JSON/warehouseobject_WarehouseObjectRemote.getCategoryDataTypeByMetaId',
		method : 'POST',
		success : function(response, options) {

			var obj = Ext.util.JSON.decode(response.responseText);
			var attriPanel = wareHouseAttribute.init(obj.physicsid, wsname,
					wsid, desc);
			dataCenterWareHouse.mainPanel.add(attriPanel);
			dataCenterWareHouse.mainPanel.doLayout();
		},
		disableCaching : true,
		autoAbort : true,
		params : {
			categoryId : categoryid
		}
	});
}