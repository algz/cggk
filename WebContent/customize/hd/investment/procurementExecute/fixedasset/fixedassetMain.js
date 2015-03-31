var fixedassetMain = {};
fixedassetMain.init = function(){
	Ext.QuickTips.init();
	
	var centerPanel = new Ext.TabPanel({
		id : 'fixedassetMainPanel',
		activeTab : 0,
		region: 'center',
		items :[fixedassetView.tabs()]
	});
	var viewport = new Ext.Viewport({ // 页面布局
		id : 'mianViewPanel',
		layout : 'fit',
		items : centerPanel
	});

	viewport.doLayout();
};

Ext.onReady(fixedassetMain.init, fixedassetMain, true);