var contractMain={
	contractId : '',
	contractBookId : ''
}
contractMain.init = function(){
	Ext.QuickTips.init();
	
	var centerPanel = new Ext.TabPanel({
		id:'contractCenterPanel',
		activeTab:0,
		region : 'center',
		items : [contractView.tabs()]
	});
	
	var viewport = new Ext.Viewport({
		id:'mainViewPanel',
		layout:'fit',
		items : centerPanel
	});
	
	viewport.doLayout();
}

Ext.onReady(contractMain.init,contractMain,true);