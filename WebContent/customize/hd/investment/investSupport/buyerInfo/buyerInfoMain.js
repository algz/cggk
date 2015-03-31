var buyerInfoMain = {};

buyerInfoMain.init = function() {

	// 主面板 的 中间面板
	buyerInfoMain.cardPanel = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'card',
				items : [buyerInfoTabpanel.init()],
				activeItem : 0
			});

	// 主面板
	buyerInfoMain.mainPanel = new Ext.Panel({
				region : 'center',
				height : 800,
				frame : false,
				boder : false,
				layout : 'fit',
				items : [buyerInfoMain.cardPanel]
			});

	var viewport = new Ext.Viewport({
				layout : 'border', // 布局模式
				items : [buyerInfoMain.mainPanel]
			});
};
Ext.onReady(buyerInfoMain.init, buyerInfoMain, true);
