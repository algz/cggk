var productMain = {};


productMain.init = function (){
	
	Ext.QuickTips.init();
	
	var centerPnael = new Ext.Panel({
		id : 'productCenterPanel',
		region : 'center',
		items : []
	});
	
	var viewport = new Ext.Viewport({ // 页面布局
		id : 'mianViewPanel',
		layout : 'border',
		items : [productTree.init(),centerPnael]
	});

	viewport.doLayout();
	
	
}

Ext.onReady(productMain.init, productMain, true);