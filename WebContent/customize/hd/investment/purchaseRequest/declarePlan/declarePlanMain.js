var declarePlanMain = {};
declarePlanMain.init = function(){
	Ext.QuickTips.init();
		
	privilegeValidate.privilegeValidate(null,null,null,null,null,
			null,null,null,null,null,
			null,null,null,null,null,
			null,null,null,null,null,
			null,null,null,null,"40000006",
			"40000007","40000008","40000009","40000010",null,
			null,null,null,null,null,
			"40000017");
	privilegeValidate.check();
	
	var centerPanel = new Ext.TabPanel({
		id : 'declarePlanPanel',
		activeTab : 0,
		region: 'center',
		items :[declarePlanView.tabs()]
	});
	var viewport = new Ext.Viewport({ // 页面布局
		id : 'mianViewPanel',
		layout : 'fit',
		items : centerPanel
	});

	viewport.doLayout();
};

Ext.onReady(declarePlanMain.init, declarePlanMain, true);