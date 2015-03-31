var sjgzMain = {
	apppanel : null,
	args : null,
	baseargs : null
};

sjgzMain.expendAll = function() {
	sjgzleftTree.tree.expandAll();
}

sjgzMain.init = function() {

	sjgzMain.tabPanel = sjTabPanel.init();
	sjgzMain.leftTree = sjgzleftTree.init();
	sjgzMain.westPanel = new Ext.Panel(
			{
				region : 'west',
				width : 200,
				height : 800,
				boder : false,
				autoScroll : true,
				collapsible : true,
				split : true,
				layout : 'fit',
				title : "EBOM<span style='padding-left:80px;cursor:pointer' onClick='sjgzMain.expendAll()'>全部展开</span>",
				items : [ sjgzMain.leftTree ]
			});

	// 主面板 的 中间面板
	sjgzMain.cardPanel = new Ext.Panel( {
		frame : false,
		boder : false,
		layout : 'card',
		items : [ sjgzMain.tabPanel],
		activeItem : 0
	});

	sjgzMain.centerPanel = new Ext.Panel( {
		region : 'center',
		height : 800,
		frame : false,
		boder : false,
		layout : 'fit',
		items : [ sjgzMain.cardPanel ]

	});

	// 主面板
	sjgzMain.mainPanel = new Ext.Panel( {
		region : 'center',
		layout : 'border', 
		boder : false,
		items : [ sjgzMain.westPanel, sjgzMain.centerPanel ]
	});

	var viewport = new Ext.Viewport( { 
		layout : 'border', // 布局模式
		items : [ sjgzMain.mainPanel ]
	});
};
Ext.onReady(sjgzMain.init, sjgzMain, true);
