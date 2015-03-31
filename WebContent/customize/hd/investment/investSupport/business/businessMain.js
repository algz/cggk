var businessMain = {};

businessMain.init = function() {

	// 主面板 的 中间面板
	businessMain.cardPanel = new Ext.Panel({
				frame : false,
				border : false,
				layout : 'card',
				items : [businessTabpanel.init()],
				activeItem : 0
			});

	// 主面板
	businessMain.mainPanel = new Ext.Panel({
				region : 'center',
				height : 800,
				frame : false,
				border : false,
				layout : 'fit',
				items : [businessMain.cardPanel]
			});

	var viewport = new Ext.Viewport({
				layout : 'border', // 布局模式
				items : [businessMain.mainPanel]
			});
};
Ext.onReady(businessMain.init, businessMain, true);
