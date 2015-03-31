var warehouseObjectMain = {

}

warehouseObjectMain.init = function() {
	Ext.QuickTips.init();
	warehouseObjectMain.centerPanle = new Ext.Panel({
				region : 'center',
				// collapsible : true,
				id : 'centerpanel',
				split : true,
				layout : 'fit',
				items : []
			});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',

		items : [{
					region : 'west',
					// title : '数据导航',
					width : 400,
					height : 500,
					collapsible : true,
					split : true,
					layout : 'fit',
					items : [warehouseObjectList.grid()]
				}, warehouseObjectMain.centerPanle]

	});
	viewport.doLayout();

}
Ext.onReady(warehouseObjectMain.init, warehouseObjectMain, true);
