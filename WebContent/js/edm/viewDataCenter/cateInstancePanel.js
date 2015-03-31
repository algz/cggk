var cateInstancePanel = {

	checkobjectnode : null
}
Ext.apply(Ext.QuickTips.getQuickTip(), {
			autoHeight : true,
			dismissDelay : 0,
			autoWidth : true
		});
Ext.QuickTips.init();
cateInstancePanel.init = function() {

	cateInstancePanel.catetree = cateInstanceTree.init('124', '124', '124',
			'124', '', 100, 'ababa');
	// var catetree = cateInstanceTree.init(node.id, newText,
	// node.attributes.categoryid, node.attributes.datacenterid, node
	// .getUI().getIconEl().src, node.attributes.revision,
	// node.attributes.realName);
	cateInstancePanel.attributepanel = cateInstanceAttriTab.init();
	cateInstancePanel.centerPanel = new Ext.Panel({
				layout : 'fit',
				region : 'center',
				border : false,
				items : [cateInstancePanel.attributepanel]
			});

	cateInstancePanel.mainpanel = new Ext.Panel({
				id : 'cateInstance_mainPanel',
				frame : true,
				border : false,
				layout : 'border',
				items : [new Ext.Panel({
									id : 'cateInsPanel-catetree',
									region : 'west',
									layout : 'fit',
									border : true,
									// minSize : 200,
									width : 200,
									split : true,

									collapsible : true,
									// collapsed : true,
									items : [cateInstancePanel.catetree]

								}), cateInstancePanel.centerPanel],
				listeners : {
					"bodyresize" : function() {
						// alert(panel.getWidth());
						// attributepanel.setWidth(panel.getWidth() - 15);
						// dataClassificationAttribute.dateTypeTree
						// .setHeight(dataClassificationAttribute.tabpanel
						// .getHeight()
						// - 88);
					}
				}

			});
	return cateInstancePanel.mainpanel;
}
// 视图
cateInstancePanel.viewView = function() {
}
cateInstancePanel.passApproveHandler = function() {
}
cateInstancePanel.submitApproveHandler = function() {
}
cateInstancePanel.viewApproveHistoryHandler = function() {
}
cateInstancePanel.dataPrivilegeWin = null;
cateInstancePanel.dataPrivilegeHandler = function() {
}
cateInstancePanel.updateFirstAttriTab = function(nodeid) {
	if (!nodeid) {
		nodeid = (cateInstanceTree.checkinstancenode == null
				? cateInstanceTree.root
				: cateInstanceTree.checkinstancenode).id;
	}
	var tba = cateInstancePanel.centerPanel.items.get(0);
	if (tba) {
		cateInstancePanel.centerPanel.remove(tba);
	}
	var newPanel = cateInstanceAttriTab.init(nodeid);
	cateInstancePanel.centerPanel.add(newPanel);
	cateInstancePanel.centerPanel.doLayout();
}
cateInstancePanel.viewHistoryHandler = function() {
}
cateInstancePanel.dataCompareHandler = function() {
}
cateInstancePanel.initHistoryVersionsWin = function(nodeid) {
}
cateInstancePanel.initVersionSetWin = function(nodeid) {
}
cateInstancePanel.treeinit = function() {
}
