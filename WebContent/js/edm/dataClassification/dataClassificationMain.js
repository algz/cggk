var dataClassificationMain = {

}

dataClassificationMain.init = function() {
	Ext.QuickTips.init();

	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',

		items : [{
					region : 'west',
					// title : '数据导航',
					width : 500,
					height : 500,
					collapsible : true,
					layout : 'fit',
					split : true,
					items : [dataClassificationList.grid()]
				}, {
					region : 'center',
					// collapsible : true,
					split : true,
					layout : 'fit',
				
					items : [dataClassificationAttribute.init()]
				}]

	});
	dataClassificationAttribute.attributeForm
			.setWidth(dataClassificationAttribute.tabpanel.getWidth() - 5);
			dataClassificationAttribute.dateTypeTree
			.setHeight(dataClassificationAttribute.tabpanel.getHeight()-60);
	viewport.doLayout();

}
Ext.onReady(dataClassificationMain.init, dataClassificationMain, true);
