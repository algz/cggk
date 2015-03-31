var supplierInfoMain = {};

supplierInfoMain.init = function() {

	// 主面板 的 中间面板
	supplierInfoMain.cardPanel = new Ext.Panel({
				frame : false,
				border : false,
				layout : 'card',
				items : [supplierInfoTabpanel.init()],
				activeItem : 0
			});

	// 主面板
	supplierInfoMain.mainPanel = new Ext.Panel({
				region : 'center',
				height : 800,
				frame : false,
				border : false,
				layout : 'fit',
				items : [supplierInfoMain.cardPanel]
			});

	var viewport = new Ext.Viewport({
				layout : 'border', // 布局模式
				items : [supplierInfoMain.mainPanel]
			});
};
Ext.onReady(supplierInfoMain.init, supplierInfoMain, true);
