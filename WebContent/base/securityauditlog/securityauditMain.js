var securityauditMain = {panel:null};
securityauditMain.init = function() {
	Ext.QuickTips.init();
	securityauditMain.panel = new Ext.TabPanel({
		activeTab : 0,
		plain : false,
		border : true,
		tabPosition : 'top',
		id : 'centerpanel',
		deferredRender : true,
		enableTabScroll : true,
		items : [securityauditGridPanel.init(),saOperationGridPanel.init()]
	});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'fit',
		autoHeight : true,
		items : [securityauditMain.panel]
	});
	viewport.doLayout();
}

Ext.onReady(securityauditMain.init, securityauditMain, true);
