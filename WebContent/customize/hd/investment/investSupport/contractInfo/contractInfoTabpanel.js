var contractInfoTabpanel = {};

contractInfoTabpanel.init = function() {

	contractInfoTabpanel.T1Container = new Ext.Panel({
				frame : false,
				border : false,
				layout : 'fit'
			})

	contractInfoTabpanel.T1 = new Ext.Panel({
				id : 'tab1',
				title : '消耗类物资采购合同资讯',
				closable : false,
				layout : 'fit',
				items : [contractInfoTabpanel.T1Container]
			});

	contractInfoTabpanel.T1.on('activate', function() {
				contractInfoTabpanel.T1Container.removeAll();
				contractInfoTabpanel.T1Container.add(contractInfoGrid.initGrid());
				contractInfoTabpanel.T1Container.doLayout();
			});

	contractInfoTabpanel.tabPanel = new Ext.TabPanel({
				activeTab : 0,
				border : false,
				autoScroll : true,
				items : [contractInfoTabpanel.T1, new Ext.Panel({
									title : '固定资产投资合同',
									layout : 'border',
									listeners : {
										activate : function(grid) {
											Ext.getCmp('projectList').store.load();
										}
									},
									items : [new fixedAssetsContractInfo.projectList({id:'projectList'}), new fixedAssetsContractInfo.contractList()]
								})]
			});
	return contractInfoTabpanel.tabPanel;
}
