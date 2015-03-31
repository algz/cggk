var auditMain = {panel:null};
auditMain.init = function() {
	Ext.QuickTips.init();
	auditMain.panel = new Ext.Panel({
		layout : 'fit',
		region : 'center',
		border : false,
		items : [auditGirdPanel.init()]
	});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border',
		autoHeight : true,
		items : [auditMain.panel]
	});
	viewport.doLayout();
}

Ext.onReady(auditMain.init, auditMain, true);
