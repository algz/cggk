var otherMain = {
	apppanel : null,
	args : null,
	baseargs : null
};
otherMain.init = function() {

	otherMain.tabPanel = otherTabPanel.init();
	otherMain.tbar = new Ext.Toolbar( {
		items : [ {
			id : 'selpbom',
			text : 'PBOM',
			handler : function() {
				otherTabPanel.bomType = 'PBOM';
				otherTabPanel.removeAllNode();
				otherLeftTree.init("PBOM");
			}
		}, '-', {
			id : 'selmbom',
			text : 'MBOM',
			handler : function() {
				otherTabPanel.bomType = 'MBOM';
				otherTabPanel.removeAllNode();
				otherLeftTree.init("MBOM");
			}

		}, '-', {
			id : 'selebom',
			text : 'EBOM',
			handler : function() {
				otherTabPanel.bomType = 'EBOM';
				otherTabPanel.removeAllNode();
				otherLeftTree.init("EBOM");

			}

		} ]
	});

	otherMain.westPanel = new Ext.Panel( {
		region : 'west',
		width : 200,
		height : 800,
		boder : false,
		autoScroll : true,
		collapsible : true,
		split : true,
		layout : 'fit',
		title : '分包商颜色设置',
		tbar : otherMain.tbar
	});

	otherLeftTree.init("PBOM");

	// 主面板 的 中间面板
	otherMain.cardPanel = new Ext.Panel( {
		frame : false,
		boder : false,
		layout : 'card',
		items : [ otherMain.tabPanel ],
		activeItem : 0
	});

	otherMain.centerPanel = new Ext.Panel( {
		region : 'center',
		height : 800,
		frame : false,
		boder : false,
		layout : 'fit',
		items : [ otherMain.cardPanel ]

	});

	// 主面板
	otherMain.mainPanel = new Ext.Panel( {
		region : 'center',
		layout : 'border',
		boder : false,
		items : [ otherMain.westPanel, otherMain.centerPanel ]
	});

	var viewport = new Ext.Viewport( {
		layout : 'border', // 布局模式
		items : [ otherMain.mainPanel ]
	});
};
Ext.onReady(otherMain.init, otherMain, true);
