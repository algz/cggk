var businessTabpanel = {};

businessTabpanel.init = function() {

	businessTabpanel.T1Container = new Ext.Panel({
				frame : false,
				border : false,
				layout : 'fit'
			})
	businessTabpanel.T2Container = new Ext.Panel({
				frame : false,
				border : false,
				layout : 'fit'
			})
	businessTabpanel.T1 = new Ext.Panel({
				id : 'tab1',
				title : '报价分析',
				closable : false,
				layout : 'fit',
				items : [businessTabpanel.T1Container]
			});

	businessTabpanel.T2 = new Ext.Panel({
				id : 'tab2',
				title : '商情调查',
				closable : false,
				layout : 'fit',
				items : [businessTabpanel.T2Container]
			});

	businessTabpanel.T1.on('activate', function() {
				businessTabpanel.T1Container.removeAll();
				businessTabpanel.T1Container.add(businessGrid.quoteAnalyseInitGrid());
				businessTabpanel.T1Container.doLayout();
			});
	businessTabpanel.T2.on('activate', function() {
				businessTabpanel.T2Container.removeAll();
				businessTabpanel.T2Container.add(businessGrid.busIndagateinitGrid());
				businessTabpanel.T2Container.doLayout();
			});

	businessTabpanel.tabPanel = new Ext.TabPanel({
				activeTab : 0,
				border : false,
				autoScroll : true,
				items : [businessTabpanel.T1, businessTabpanel.T2,new projectInfoGrid()]
			});
	return businessTabpanel.tabPanel;
}
