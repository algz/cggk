var dataCenterWareHouseMain = {}
dataCenterWareHouseMain.init = function() {
	Ext.QuickTips.init();
	var wsnode = window.parent.getCheckNode();

	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'fit',
		items : []
	});
	Ext.Ajax.request({
		url : '../JSON/warehouseobject_WarehouseObjectRemote.getCategoryDataTypeByMetaId',
		method : 'POST',
		success : function(response, options) {

			var obj = Ext.util.JSON.decode(response.responseText);
			var attriPanel = wareHouseAttribute.init(obj.physicsid,
					wsnode.attributes.realName, wsnode.id,
					wsnode.attributes.description);
			viewport.add(attriPanel);
			viewport.doLayout();
		},
		disableCaching : true,
		autoAbort : true,
		params : {
			categoryId : wsnode.attributes.categoryid
		}
	});
	viewport.doLayout();
}

Ext.onReady(dataCenterWareHouseMain.init, dataCenterWareHouseMain, true);
