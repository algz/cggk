var controlMain = {};

controlMain.init = function() {

	// 主面板 的 中间面板
	controlMain.cardPanel = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'card',
				items : [controlTabPanel.init()],
				activeItem : 0
			});

	// 主面板
	controlMain.mainPanel = new Ext.Panel({
				region : 'center',
				height : 800,
				frame : false,
				boder : false,
				layout : 'fit',
				items : [controlMain.cardPanel]
			});

	var viewport = new Ext.Viewport({
				layout : 'border', // 布局模式
				items : [controlMain.mainPanel]
			});
};
Ext.onReady(controlMain.init, controlMain, true);
