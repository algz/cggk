var stockPlanMain = {};

stockPlanMain.init = function() {
Ext.QuickTips.init();

	privilegeValidate.privilegeValidate(null,null,null,null,null,
			null,null,null,null,null,
			null,null,null,"30000005",null,
			null,null,null,null,null,
			null,null,null,null,null,
			null,null,null,null,"40000011",
			"40000012","40000013");
	privilegeValidate.check();
	// 主面板 的 中间面板
	stockPlanMain.cardPanel = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'card',
				items : [stockPlanTabpanel.init()],
				activeItem : 0
			});

	// 主面板
	stockPlanMain.mainPanel = new Ext.Panel({
				region : 'center',
				height : 800,
				frame : false,
				boder : false,
				layout : 'fit',
				items : [stockPlanMain.cardPanel]
			});

	var viewport = new Ext.Viewport({
				layout : 'border', // 布局模式
				items : [stockPlanMain.mainPanel]
			});
};
Ext.Ajax.timeout=900000;
Ext.onReady(stockPlanMain.init, stockPlanMain, true);
