var customWareHouseMain = {

}
var warehouseObjectMain = {

}

customWareHouseMain.init = function() {
	Ext.QuickTips.init();
	var node = window.parent.getCustomCheckNode();
	var whtree = customWareHouseTree.init(node.id, node.text, node.getUI()
					.getIconEl().src);
	warehouseObjectMain.centerPanle = new Ext.Panel({
				region : 'center',
				split : true,
				layout : 'fit'
			});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',

		items : [{
					region : 'west',
					width : 300,
					collapsible : true,
					split : true,
					layout : 'fit',
					items : [whtree]
				}, warehouseObjectMain.centerPanle]

	});
	viewport.doLayout();

}
Ext.onReady(customWareHouseMain.init, customWareHouseMain, true);
