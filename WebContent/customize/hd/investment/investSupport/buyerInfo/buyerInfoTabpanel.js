var buyerInfoTabpanel = {};

buyerInfoTabpanel.init = function() {

	buyerInfoTabpanel.T1Container = new Ext.Panel({
				frame : false,
				border : false,
				layout : 'fit'
			})

	buyerInfoTabpanel.T1 = new Ext.Panel({
				id : 'tab1',
				title : '采购员信息',
				closable : false,
				layout : 'fit',
				items : [buyerInfoTabpanel.T1Container]
			});

	

	buyerInfoTabpanel.T1.on('activate', function() {
				buyerInfoTabpanel.T1Container.removeAll();
				buyerInfoTabpanel.T1Container.add(buyerInfoGrid.initGrid());
				buyerInfoTabpanel.T1Container.doLayout();
			});


	buyerInfoTabpanel.tabPanel = new Ext.TabPanel({
				activeTab : 0,
				border : false,
				autoScroll : true,
				items : [buyerInfoTabpanel.T1]
			});
	return buyerInfoTabpanel.tabPanel;
}
