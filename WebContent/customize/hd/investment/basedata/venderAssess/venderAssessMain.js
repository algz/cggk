var venderManagerMain = {
	tabs : null,
	init : function(){
		Ext.QuickTips.init();
		venderManagerMain.tabs = new Ext.TabPanel({
			activeTab : 0,
			region : 'center',
			items : [venderAssessGrid.getPanel()]
		});
		var viewport = new Ext.Viewport({
			id : 'venderAssessViewport',
			lyaout : 'fit',
			items : [venderManagerMain.tabs]
		});
		viewport.doLayout();
	}
};
Ext.onReady(venderManagerMain.init(),venderManagerMain,true);