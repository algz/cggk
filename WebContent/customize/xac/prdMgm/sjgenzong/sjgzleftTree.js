var sjgzleftTree = {
	nodeId : 0,
	rootIconCls : 'icon-project',
	rootName : 'ROOT',
	rootID : '0'
};

sjgzleftTree.init = function() {
	sjgzleftTree.tree = new Ext.tree.TreePanel({
				id : 'ebom-tree',
				region : 'west',
				split : true,
				width : 240,
				loader : new Ext.tree.TreeLoader({
							baseAtts : new Ext.tree.AsyncTreeNode(null),
							dataUrl : '../JSON/XacCommon_CommonRemote.getEbomById'
						}),

				animate : true,
				lines : true,
				autoScroll : true,

				root : new Ext.tree.AsyncTreeNode({
							id : sjgzleftTree.rootID,
							text : sjgzleftTree.rootName,
							iconCls : sjgzleftTree.rootIconCls,
							expanded : true,
							draggable : false
						})
			});

	sjgzleftTree.tree.on('click', function(node) {
				sjGrid.nodeId = node.attributes.nodeId;
				if (sjTabPanel.tabpanel.getActiveTab().id == 'sjtab1') {
					sjTabPanel.addT1();
				} else if (sjTabPanel.tabpanel.getActiveTab().id == 'sjtab2') {
					sjTabPanel.addT2();
				} else if (sjTabPanel.tabpanel.getActiveTab().id == 'sjtab3') {
					sjTabPanel.addT3();
				}
			});

	return sjgzleftTree.tree;
};