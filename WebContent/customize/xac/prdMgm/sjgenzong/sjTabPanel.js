var sjTabPanel = {
	nodeId : null
};

sjTabPanel.T1Container = new Ext.Panel({
			frame : false,
			boder : false,
			layout : 'fit'
		});

sjTabPanel.addT1 = function() {
	if (sjTabPanel.t1Panel != null) {
		sjTabPanel.T1Container.remove(sjTabPanel.t1Panel);
	}
	sjTabPanel.t1Panel = sjGrid.baseInfo(sjTabPanel.nodeId);
	sjTabPanel.T1Container.add(sjTabPanel.t1Panel);
	sjTabPanel.T1Container.doLayout();
};

sjTabPanel.T1 = new Ext.Panel({
			id : 'sjtab1',
			title : '基本属性',
			closable : false,
			layout : 'fit',
			items : [sjTabPanel.T1Container]
		});

sjTabPanel.T1.on('activate', function(node) {
			sjTabPanel.addT1();
		});

sjTabPanel.T2Container = new Ext.Panel({
			frame : false,
			boder : false,
			layout : 'fit'
		});

sjTabPanel.addT2 = function() {
	if (sjTabPanel.t2Panel != null) {
		sjTabPanel.T2Container.remove(sjTabPanel.t2Panel);
	}
	sjTabPanel.t2Panel = sjGrid.shejiInfo(sjTabPanel.nodeId);
	sjTabPanel.T2Container.add(sjTabPanel.t2Panel);
	sjTabPanel.T2Container.doLayout();
};

sjTabPanel.T2 = new Ext.Panel({
			id : 'sjtab2',
			title : '设计信息',
			closable : false,
			layout : 'fit',
			items : [sjTabPanel.T2Container]
		});

sjTabPanel.T2.on('activate', function(node) {
			sjTabPanel.addT2();
		});

sjTabPanel.T3Container = new Ext.Panel({
			frame : false,
			boder : false,
			layout : 'fit'
		});

sjTabPanel.addT3 = function() {
	if (sjTabPanel.t3Panel != null) {
		sjTabPanel.T3Container.remove(sjTabPanel.t3Panel);
	}
	sjTabPanel.t3Panel = sjGrid.genggaiInfo(sjTabPanel.nodeId);
	sjTabPanel.T3Container.add(sjTabPanel.t3Panel);
	sjTabPanel.T3Container.doLayout();
};

sjTabPanel.T3 = new Ext.Panel({
			id : 'sjtab3',
			title : '更改信息',
			closable : false,
			layout : 'fit',
			items : [sjTabPanel.T3Container]
		});

sjTabPanel.T3.on('activate', function(node) {
			sjTabPanel.addT3();
		});

sjTabPanel.init = function() {
	sjTabPanel.tabpanel = new Ext.TabPanel({
				activeTab : 0,
				id : 'tabpanel',
				minTabWidth : 300,
				resizeTabs : false,
				boder : false,
				hidden : false,
				items : [sjTabPanel.T1, sjTabPanel.T2, sjTabPanel.T3]
			});
	return sjTabPanel.tabpanel;
};