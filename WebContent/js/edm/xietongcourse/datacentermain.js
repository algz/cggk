var datacentermain = {

}
Ext.QuickTips.init();
datacentermain.init = function() {
	var dcl = dataCateList.init();

	var catepanel = new Ext.Panel({
				border : false,
				tbar : [],
				layout:'fit',
				items : [dcl]
			});

	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',

		items : [{
					region : 'center',
					// collapsible : true,
					layout : 'fit',
					split : true,
					items : [catepanel]
				}]

	});
	viewport.doLayout();

}
Ext.onReady(datacentermain.init, datacentermain, true);
