var mbomTabPanel = {
	nodeId : null
};

mbomTabPanel.T1Container = new Ext.Panel({
			frame : false,
			boder : false,
			layout : 'fit'
		});

mbomTabPanel.addT1 = function(node) {
	bomTab1.nodeId = node;
	mbomTabPanel.T1Container.removeAll();
	bomTab1.init(node);
};

mbomTabPanel.T1 = new Ext.Panel({
			id : 'tab1',
			title : '总体监控',
			closable : false,
			layout : 'fit',
			items : [mbomTabPanel.T1Container]
		});

mbomTabPanel.T1.on('activate', function() {
			mbomTabPanel.addT1(mbomTabPanel.nodeId);
		});

mbomTabPanel.T2Container = new Ext.Panel({
			frame : false,
			boder : false,
			layout : 'fit'
		});

mbomTabPanel.addT2 = function(node) {
	bomTab2.nodeId = node;
	mbomTabPanel.T2Container.removeAll();
	bomTab2.init(node, "A");
};

mbomTabPanel.T2 = new Ext.Panel({
			id : 'tab2',
			title : '按工艺流程监控',
			closable : false,
			layout : 'fit',
			items : [mbomTabPanel.T2Container]
		});

mbomTabPanel.T2.on('activate', function() {
			mbomTabPanel.addT2(mbomTabPanel.nodeId);
		});

mbomTabPanel.T3Container = new Ext.Panel({
			frame : false,
			boder : false,
			layout : 'fit'
		});

mbomTabPanel.addT3 = function(node) {
	bomTab3.nodeId = node;
	mbomTabPanel.T3Container.removeAll();
	bomTab3.init(node, "P");
};

mbomTabPanel.T3 = new Ext.Panel({
			id : 'tab3',
			title : '配套监控',
			closable : false,
			layout : 'fit',
			items : [mbomTabPanel.T3Container]
		});

mbomTabPanel.T3.on('activate', function() {
			mbomTabPanel.addT3(mbomTabPanel.nodeId);
		});

mbomTabPanel.T4Container = new Ext.Panel({
			frame : false,
			boder : false,
			layout : 'fit'
		});

mbomTabPanel.addT4 = function(node) {
	bomTab4.nodeId = node;
	mbomTabPanel.T4Container.removeAll();
	bomTab4.init(1, "G");

};

mbomTabPanel.T4 = new Ext.Panel({
			id : 'tab4',
			title : '更改贯彻监控',
			closable : false,
			layout : 'fit',
			items : [mbomTabPanel.T4Container]
		});

mbomTabPanel.T4.on('activate', function() {
			mbomTabPanel.addT4(mbomTabPanel.nodeId);
		});

mbomTabPanel.T5Container = new Ext.Panel({
			frame : false,
			boder : false,
			layout : 'fit'
		});

mbomTabPanel.addT5 = function(node) {
	bomTab5.nodeId = node;
	bomTab5.taskName = 'C';
	mbomTabPanel.T5Container.removeAll();
	bomTab5.init(node, "C");

};

mbomTabPanel.T5 = new Ext.Panel({
			id : 'tab5',
			title : '工时监控',
			closable : false,
			layout : 'fit',
			items : [mbomTabPanel.T5Container]
		});

mbomTabPanel.T5.on('activate', function() {
			mbomTabPanel.addT5(mbomTabPanel.nodeId);
		});

mbomTabPanel.T6Container = new Ext.Panel({
			frame : false,
			boder : false,
			layout : 'fit'
		});

mbomTabPanel.addT6 = function(node) {
	bomTab6.nodeId = node;
	mbomTabPanel.T6Container.removeAll();
	bomTab6.init(node);
};

mbomTabPanel.T6 = new Ext.Panel({
			id : 'tab6',
			title : '基本属性',
			closable : false,
			layout : 'fit',
			items : [mbomTabPanel.T6Container]
		});

mbomTabPanel.T6.on('activate', function() {
			mbomTabPanel.addT6(mbomTabPanel.nodeId);
		});

mbomTabPanel.init = function() {
	mbomTabPanel.tabpanel = new Ext.TabPanel({
				activeTab : 0,
				id : 'tabpanel',
				minTabWidth : 300,
				resizeTabs : false,
				boder : false,
				hidden : false,
				enableTabScroll : true,
				items : [mbomTabPanel.T6, mbomTabPanel.T1, mbomTabPanel.T2,
						mbomTabPanel.T3, mbomTabPanel.T4, mbomTabPanel.T5]
			});

	return mbomTabPanel.tabpanel;
};