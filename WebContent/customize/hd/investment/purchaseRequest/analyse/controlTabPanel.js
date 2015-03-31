var controlTabPanel = {};

controlTabPanel.init = function() {

	controlTabPanel.T1Container = new Ext.Panel( {
		frame : false,
		border : false,
		layout : 'fit'
	})
	controlTabPanel.T2Container = new Ext.Panel( {
		frame : false,
		border : false,
		layout : 'fit'
	})
	controlTabPanel.T3Container = new Ext.Panel( {
		frame : false,
		border : false,
		layout : 'fit'
	})
	controlTabPanel.T4Container = new Ext.Panel( {
		frame : false,
		border : false,
		layout : 'fit'
	})

	controlTabPanel.T1 = new Ext.Panel( {
		id : 'tab1',
		title : '综合分析',
		closable : false,
		layout : 'fit',
		items : [ controlTabPanel.T1Container ]
	});

	controlTabPanel.T2 = new Ext.Panel( {
		id : 'tab2',
		title : '计划内采购',
		closable : false,
		layout : 'fit',
		items : [ controlTabPanel.T2Container ]
	});
	controlTabPanel.T3 = new Ext.Panel( {
		id : 'tab3',
		title : '非应急采购',
		closable : false,
		layout : 'fit',
		items : [ controlTabPanel.T3Container ]
	});
	controlTabPanel.T4 = new Ext.Panel( {
		id : 'tab4',
		title : '应急采购',
		closable : false,
		layout : 'fit',
		items : [ controlTabPanel.T4Container ]
	});

	controlTabPanel.T1.on('activate', function() {
		controlTabPanel.T1Container.removeAll();
		controlTabPanel.T1Container.add(ControlPic.click());
		controlTabPanel.T1Container.doLayout();
	});
	controlTabPanel.T2.on('activate', function() {
		controlTabPanel.T2Container.removeAll();
		controlTabPanel.T2Container.add(ControlList.stockPlan1(1));
		controlTabPanel.T2Container.doLayout();
	});
	controlTabPanel.T3.on('activate', function() {
		controlTabPanel.T3Container.removeAll();
		controlTabPanel.T3Container.add(ControlList.stockPlan2(3));
		controlTabPanel.T3Container.doLayout();
	});
	controlTabPanel.T4.on('activate', function() {
		controlTabPanel.T4Container.removeAll();
		controlTabPanel.T4Container.add(ControlList.stockPlan3(2));
		controlTabPanel.T4Container.doLayout();
	});

	controlTabPanel.tabPanel = new Ext.TabPanel( {
		activeTab : 0,
		boder : false,
		autoScroll : true,
		items : [ controlTabPanel.T1, controlTabPanel.T2, controlTabPanel.T3,
				controlTabPanel.T4 ]
	});
	return controlTabPanel.tabPanel;
}
