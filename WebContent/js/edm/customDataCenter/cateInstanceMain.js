var cateInstanceMain = {

}
cateInstanceMain.init = function() {

	Ext.QuickTips.init();
	cateInstanceMain.mainpanel = cateInstancePanel.init("");
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',
		items : [{
					region : 'center',
					// collapsible : true,
					split : true,
					layout:'fit',
					items : [cateInstanceMain.mainpanel]
				}]

	});
	viewport.doLayout();

}

Ext.onReady(cateInstanceMain.init, cateInstanceMain, true);
