var contractInfoMain = {};

contractInfoMain.init = function() {

	// 主面板 的 中间面板
	contractInfoMain.cardPanel = new Ext.Panel({
				frame : false,
				border : false,
				layout : 'card',
				items : [contractInfoTabpanel.init()],
				activeItem : 0
			});

	// 主面板
	contractInfoMain.mainPanel = new Ext.Panel({
				region : 'center',
				height : 800,
				frame : false,
				border : false,
				layout : 'fit',
				items : [contractInfoMain.cardPanel]
			});

	var viewport = new Ext.Viewport({
				layout : 'border', // 布局模式
				items : [contractInfoMain.mainPanel]
			});
};
Ext.onReady(contractInfoMain.init, contractInfoMain, true);
