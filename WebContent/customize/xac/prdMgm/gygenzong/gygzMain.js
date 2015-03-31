var gygzMain = {
	apppanel : null,
	args : null,
	baseargs : null
};

gygzMain.expendAll = function() {
	gygzleftTree.treePanel.expandAll();
}

gygzMain.init = function() {

	gygzMain.tabPanel = gyTabPanel.init();
	gygzMain.tbar = new Ext.Toolbar( {
		items : [ {
			id : 'selpbom',
			text : 'PBOM',
			handler : function() {
				gygzleftTree.init("PBOM");
			}
		}, '-', {
			id : 'selmbom',
			text : 'MBOM',
			handler : function() {
				gygzleftTree.init("MBOM");
			}
		} ]
	});

	gygzMain.westPanel = new Ext.Panel( {
		id : 'left_bomtree',
		region : 'west',
		width : 200,
		height : 800,
		boder : false,
		autoScroll : true,
		collapsible : true,
		split : true,
		layout : 'fit',
		title : "BOM树<span style='padding-left:75px;cursor:pointer' onClick='gygzMain.expendAll()'>全部展开</span>",
		tbar : gygzMain.tbar
	});

	gygzleftTree.init("PBOM");

	// 主面板 的 中间面板
	gygzMain.cardPanel = new Ext.Panel( {
		frame : false,
		boder : false,
		layout : 'card',
		items : [ gygzMain.tabPanel ],
		activeItem : 0
	});

	gygzMain.centerPanel = new Ext.Panel( {
		region : 'center',
		height : 800,
		frame : false,
		boder : false,
		layout : 'fit',
		items : [ gygzMain.cardPanel ]

	});

	// 主面板
	gygzMain.mainPanel = new Ext.Panel( {
		region : 'center',
		layout : 'border',
		boder : false,
		items : [ gygzMain.westPanel, gygzMain.centerPanel ]
	});

	var viewport = new Ext.Viewport( {
		layout : 'border', // 布局模式
		items : [ gygzMain.mainPanel ]
	});
};
Ext.onReady(gygzMain.init, gygzMain, true);
