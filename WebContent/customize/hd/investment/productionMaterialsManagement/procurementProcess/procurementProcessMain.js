var procurementProcessMain = {};
procurementProcessMain.init = function() {
	Ext.QuickTips.init();
	
	var centerPanel = new Ext.TabPanel( {
		id : 'procurementProcessCenterPanel',
		activeTab : 0,
		region : 'center',
		items : [ procurementProcessView.tabs() ]
	});
	
	var viewport = new Ext.Viewport( { // 页面布局
		id : 'mianViewPanel',
		layout : 'border',
		activeTab : 0,
		//width : '300',
		items :[ centerPanel]
	});

	viewport.doLayout();
};

Ext.onReady(procurementProcessMain.init, procurementProcessMain, true);