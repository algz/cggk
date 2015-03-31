var gyTabPanel = {
	nodeId : null,
	rootID : '0'
};

gyTabPanel.T1Container = new Ext.Panel({
			frame : false,
			boder : false,
			layout : 'fit'
		});

gyTabPanel.addT1 = function() {
	if (gyTabPanel.t1Panel != null) {
		gyTabPanel.T1Container.remove(gyTabPanel.t1Panel);
	}
	gyTabPanel.t1Panel = gyGrid.init(1, "A");
	gyTabPanel.T1Container.add(gyTabPanel.t1Panel);
	gyTabPanel.T1Container.doLayout();
};

gyTabPanel.T1 = new Ext.Panel({
			id : 'gytab1',
			title : '工艺信息',
			closable : false,
			layout : 'fit',
			items : [gyTabPanel.T1Container]
		});

gyTabPanel.T1.on('activate', function(node) {
			gyTabPanel.addT1();
		});

gyTabPanel.T2Container = new Ext.Panel({
			frame : false,
			boder : false,
			layout : 'fit'
		});

gyTabPanel.addT2 = function() {
	if (gyTabPanel.t2Panel != null) {
		gyTabPanel.T2Container.remove(gyTabPanel.t2Panel);
	}
	gyTabPanel.t2Panel = gyGrid.genggaiInfo();
	gyTabPanel.T2Container.add(gyTabPanel.t2Panel);
	gyTabPanel.T2Container.doLayout();
};

gyTabPanel.T2 = new Ext.Panel({
			id : 'gytab2',
			title : '更改信息',
			closable : false,
			layout : 'fit',
			items : [gyTabPanel.T2Container]
		});

gyTabPanel.T2.on('activate', function(node) {
			gyTabPanel.addT2();
		});

gyTabPanel.T3Container = new Ext.Panel({
			frame : false,
			boder : false,
			layout : 'fit'
		});

gyTabPanel.addT3 = function() {
	if (gyTabPanel.t3Panel != null) {
		gyTabPanel.T3Container.remove(gyTabPanel.t3Panel);
	}
	gyTabPanel.t3Panel = gyGrid.baseInfo();
	gyTabPanel.T3Container.add(gyTabPanel.t3Panel);
	gyTabPanel.T3Container.doLayout();
};

gyTabPanel.T3 = new Ext.Panel({
			id : 'gytab3',
			title : '基本属性',
			closable : false,
			layout : 'fit',
			items : [gyTabPanel.T3Container]
		});

gyTabPanel.T3.on('activate', function(node) {
			gyTabPanel.addT3();
		});

gyTabPanel.init = function() {
	gyTabPanel.tabpanel = new Ext.TabPanel({
				activeTab : 0,
				id : 'gytabpanel',
				minTabWidth : 300,
				resizeTabs : false,
				boder : false,
				hidden : false,
				items : [gyTabPanel.T3, gyTabPanel.T1, gyTabPanel.T2]
			});
	return gyTabPanel.tabpanel;
};