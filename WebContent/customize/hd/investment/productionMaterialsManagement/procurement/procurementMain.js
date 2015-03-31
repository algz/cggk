var procurementMain = {
	procurementId : null,
	activeTabId : null
};
procurementMain.init = function() {
	Ext.QuickTips.init();

	var centerPanel = new Ext.TabPanel( {
		id : 'procurementCenterPanel',
		activeTab : 0,
		region : 'center',
		items : [ procurementView.tabs() ]
	});
	var viewport = new Ext.Viewport( { // 页面布局
		id : 'mainViewPanel',
		layout : 'card',
		activeItem : 0,
		items : [ centerPanel, procurementView.sporadicCard()]
	});

	viewport.doLayout();
};

Ext.onReady(procurementMain.init, procurementMain, true);