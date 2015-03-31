var mbomMain = {
	apppanel : null,
	args : null,
	baseargs : null
};
mbomMain.init = function() {
	mbomMain.tabPanel = mbomTabPanel.init();

	mbomMain.tbar = new Ext.Toolbar({
				items : [{
							id : 'selpbom',
							text : 'PBOM',
							handler : function() {
								leftBomTree.init("PBOM");
							}
						}, '-', {
							id : 'selmbom',
							text : 'MBOM',
							handler : function() {
								leftBomTree.init("MBOM");
							}

						}]
			});

	mbomMain.expendAll = function() {
		leftBomTree.treePanel.expandAll();
	}

	mbomMain.westPanel = new Ext.Panel({
		region : 'west',
		width : 200,
		height : 800,
		boder : false,
		autoScroll : true,
		collapsible : true,
		split : true,
		layout : 'fit',
		title : "BOM树<span style='padding-left:75px;cursor:pointer' onClick='mbomMain.expendAll()'>全部展开</span>",
		tbar : mbomMain.tbar
	});

	leftBomTree.init("PBOM");

	// 主面板 的 中间面板
	mbomMain.cardPanel = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'card',
				items : [mbomMain.tabPanel],
				activeItem : 0
			});

	mbomMain.centerPanel = new Ext.Panel({
				region : 'center',
				height : 800,
				frame : false,
				boder : false,
				layout : 'fit',
				items : [mbomMain.cardPanel]

			});

	// 主面板
	mbomMain.mainPanel = new Ext.Panel({
				region : 'center',
				layout : 'border',
				boder : false,
				items : [mbomMain.westPanel, mbomMain.centerPanel]
			});

	var viewport = new Ext.Viewport({
				layout : 'border', // 布局模式
				items : [mbomMain.mainPanel]
			});
};
Ext.onReady(mbomMain.init, mbomMain, true);
