var supplierInfoTabpanel = {};

supplierInfoTabpanel.init = function() {

	supplierInfoTabpanel.T1Container = new Ext.Panel({
				frame : false,
				border : false,
				layout : 'fit'
			})

	supplierInfoTabpanel.T1 = new Ext.Panel({
				id : 'tab1',
				title : '供应商资讯',
				closable : false,
				layout : 'fit',
				items : [supplierInfoTabpanel.T1Container]
			});

	

	supplierInfoTabpanel.T1.on('activate', function() {
				supplierInfoTabpanel.T1Container.removeAll();
				supplierInfoTabpanel.T1Container.add(supplierInfoGrid.initGrid());
				supplierInfoTabpanel.T1Container.doLayout();
			});
	

	supplierInfoTabpanel.tabPanel = new Ext.TabPanel({
				activeTab : 0,
				border : false,
				autoScroll : true,
				items : [supplierInfoTabpanel.T1]
			});
	return supplierInfoTabpanel.tabPanel;
}
