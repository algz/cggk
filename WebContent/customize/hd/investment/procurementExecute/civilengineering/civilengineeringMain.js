var civilengineeringMain = {};
civilengineeringMain.init = function(){
	Ext.QuickTips.init();
	
	var centerPanel = new Ext.TabPanel({
		id : 'civilengineeringMainPanel',
		activeTab : 0,
		region: 'center',
		items :[civilengineeringView.tabs()]
	});
	var viewport = new Ext.Viewport({ // 页面布局
		id : 'mianViewPanel',
		layout : 'fit',
		items : centerPanel
	});

	viewport.doLayout();
};

Ext.onReady(civilengineeringMain.init, civilengineeringMain, true);