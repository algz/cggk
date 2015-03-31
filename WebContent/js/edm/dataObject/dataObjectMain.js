var dataObjectMain = {

}

dataObjectMain.init = function() {
	Ext.QuickTips.init();

	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',

		items : [{
					region : 'west',
					// title : '数据导航',
					width : 500,
					collapsible : true,
					layout : 'fit',
					split : true,
					items : [dataObjectList.init()]
				}, {
					region : 'center',
					// collapsible : true,
					split : true,
					layout : 'fit',
					items : [dataObjectAttribute.init()]
				}]

	});
	dataObjectAttribute.attributeForm.setWidth(dataObjectAttribute.tabpanel
			.getWidth()
			- 5);
	dataObjectAttribute.attributeTree.setHeight(dataObjectAttribute.tabpanel
			.getHeight()
			- 60);
//	viewport.doLayout();

}
Ext.onReady(dataObjectMain.init, dataObjectMain, true);
