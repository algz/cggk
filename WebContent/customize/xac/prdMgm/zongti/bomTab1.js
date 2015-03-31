var bomTab1 = {
	nodeId : 0,
	start : 0,
	mark : 0
};

bomTab1.init = function(nodeId) {

	bomTab1.T11Container = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'fit'
			});
	bomTab1.T11 = new Ext.Panel({
				id : 'tab11',
				title : '材料',
				closable : false,
				layout : 'fit',
				items : [bomTab1.T11Container]
			});
	bomTab1.T11.on('activate', function() {
				bomTab1.T11Container.removeAll();
				bomTab1.T11Container.add(bomPicTotal.init(nodeId, 'T1', '材料'));
				bomTab1.T11Container.doLayout();
			});

	bomTab1.T12Container = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'fit'
			});
	bomTab1.T12 = new Ext.Panel({
				id : 'tab12',
				title : '成品',
				closable : false,
				layout : 'fit',
				items : [bomTab1.T12Container]
			});
	bomTab1.T12.on('activate', function() {
				bomTab1.T12Container.removeAll();
				bomTab1.T12Container.add(bomPicTotal.init(nodeId, 'T2', '成品'));
				bomTab1.T12Container.doLayout();
			});

	bomTab1.T13Container = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'fit'
			});
	bomTab1.T13 = new Ext.Panel({
				id : 'tab13',
				title : '标准件',
				closable : false,
				layout : 'fit',
				items : [bomTab1.T13Container]
			});
	bomTab1.T13.on('activate', function() {
				bomTab1.T13Container.removeAll();
				bomTab1.T13Container.add(bomPicTotal.init(nodeId, 'T3', '标准件'));
				bomTab1.T13Container.doLayout();
			});

	bomTab1.T14Container = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'fit'
			});
	bomTab1.T14 = new Ext.Panel({
				id : 'tab14',
				title : '工装',
				closable : false,
				layout : 'fit',
				items : [bomTab1.T14Container]
			});
	bomTab1.T14.on('activate', function() {
				bomTab1.T14Container.removeAll();
				bomTab1.T14Container.add(bomPicTotal.init(nodeId, 'T4', '工装'));
				bomTab1.T14Container.doLayout();
			});

	bomTab1.T15Container = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'fit'
			});
	bomTab1.T15 = new Ext.Panel({
				id : 'tab15',
				title : '零件',
				closable : false,
				layout : 'fit',
				items : [bomTab1.T15Container]
			});
	bomTab1.T15.on('activate', function() {
				bomTab1.T15Container.removeAll();
				bomTab1.T15Container.add(bomPicTotal.init(nodeId, 'T5', '零件'));
				bomTab1.T15Container.doLayout();
			});

	bomTab1.T16Container = new Ext.Panel({
				frame : false,
				boder : false,
				layout : 'fit'
			});
	bomTab1.T16 = new Ext.Panel({
				id : 'tab16',
				title : '部组件',
				closable : false,
				layout : 'fit',
				items : [bomTab1.T16Container]
			});
	bomTab1.T16.on('activate', function() {
				bomTab1.T16Container.removeAll();
				bomTab1.T16Container.add(bomPicTotal.init(nodeId, 'T6', '部组件'));
				bomTab1.T16Container.doLayout();
			});

	bomTab1.tabpanel = new Ext.TabPanel({
				activeTab : bomTab1.mark,
				id : 'tabpanel1',
				minTabWidth : 300,
				resizeTabs : false,
				boder : false,
				hidden : false,
				items : [bomTab1.T11, bomTab1.T12, bomTab1.T13, bomTab1.T14,
						bomTab1.T15, bomTab1.T16]
			});
	mbomTabPanel.T1Container.add(bomTab1.tabpanel);
	mbomTabPanel.T1Container.doLayout();
};
