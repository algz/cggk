var gygzleftTree = {
	treePanel : null,
	nodeId : '0',
	pageSize : 100,
	rootName : 'Root',
	rootIconCls : 'icon-project',
	rootID : '0'
};

gygzleftTree.init = function(transferFlag) {

	var url = '../JSON/XacCommon_CommonRemote.getPbomById';
	if (transferFlag == 'MBOM') {
		url = '../JSON/XacCommon_CommonRemote.getMbomById';
	}
	gygzleftTree.treeLoader = new Ext.ux.tree.PagingTreeLoader({
				dataUrl : url,
				pageSize : gygzleftTree.pageSize
			});

	gygzleftTree.treePanel = new Ext.tree.TreePanel({
				id : 'left-mpbom-tree',
				region : 'west',
				split : true,
				width : 240,
				loader : gygzleftTree.treeLoader,
				animate : true,
				lines : true,
				autoScroll : true,

				root : new Ext.tree.AsyncTreeNode({
							id : gygzleftTree.rootID,
							text : gygzleftTree.rootName,
							iconCls : gygzleftTree.rootIconCls,
							expanded : true,
							allowDrag : false
						})
			});

	gygzleftTree.treePanel.on('click', function(node) {
				gyGrid.nodeId = node.attributes.nodeId;
				if (gyTabPanel.tabpanel.getActiveTab().id == 'gytab1') {
					gyTabPanel.addT1();
				} else if (gyTabPanel.tabpanel.getActiveTab().id == 'gytab2') {
					gyTabPanel.addT2();
				} else if (gyTabPanel.tabpanel.getActiveTab().id == 'gytab3') {
					gyTabPanel.addT3();
				}
			});

	gygzMain.westPanel.removeAll();
	gygzMain.westPanel.add(gygzleftTree.treePanel);
	gygzMain.westPanel.doLayout();

	return gygzleftTree.treePanel;
};
