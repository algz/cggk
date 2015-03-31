var leftBomTree = {
	treePanel : null,
	nodeId : '0',
	pageSize : 100,
	rootName : 'Root',
	rootIconCls : 'icon-project',
	rootId : '0'
};

leftBomTree.init = function(transferFlag) {
	var url = '../JSON/XacCommon_CommonRemote.getPbomById';
	if (transferFlag == 'MBOM') {
		url = '../JSON/XacCommon_CommonRemote.getMbomById';
	}
	leftBomTree.treeLoader = new Ext.ux.tree.PagingTreeLoader({
				dataUrl : url,
				pageSize : leftBomTree.pageSize
			});

	leftBomTree.treePanel = new Ext.tree.TreePanel({
				id : 'mbom-tree',
				region : 'west',
				split : true,
				width : 240,
				loader : leftBomTree.treeLoader,
				animate : true,
				lines : true,
				autoScroll : true,

				root : new Ext.tree.AsyncTreeNode({
							id : leftBomTree.rootId,
							text : leftBomTree.rootName,
							iconCls : leftBomTree.rootIconCls,
							expanded : true,
							allowDrag : false
						})
			});

	leftBomTree.treePanel.on('click', function(node) {
				bomPicTotal.removeTab();
				bomTab3.bomType = transferFlag;
				bomTab4.bomType = transferFlag;
				bomTab5.bomType = transferFlag;
				mbomTabPanel.nodeId = node.attributes.nodeId;
				if (mbomTabPanel.tabpanel.getActiveTab().id == 'tab1') {
					if ('tab11' == bomTab1.tabpanel.getActiveTab().id) {
						bomTab1.mark = 0;
					} else if ('tab12' == bomTab1.tabpanel.getActiveTab().id) {
						bomTab1.mark = 1;
					} else if ('tab13' == bomTab1.tabpanel.getActiveTab().id) {
						bomTab1.mark = 2;
					} else if ('tab14' == bomTab1.tabpanel.getActiveTab().id) {
						bomTab1.mark = 3;
					} else if ('tab15' == bomTab1.tabpanel.getActiveTab().id) {
						bomTab1.mark = 4;
					}
					mbomTabPanel.addT1(node.attributes.nodeId);
				} else if (mbomTabPanel.tabpanel.getActiveTab().id == 'tab2') {
					mbomTabPanel.addT2(node.attributes.nodeId);
				} else if (mbomTabPanel.tabpanel.getActiveTab().id == 'tab3') {
					if (node.leaf) {
						bomTab3.mark = 1;
					} else {
						bomTab3.mark = 0;
					}
					mbomTabPanel.addT3(node.attributes.nodeId);
				} else if (mbomTabPanel.tabpanel.getActiveTab().id == 'tab4') {
					/*
					 * if ('tab41' == bomTab4.tabpanel.getActiveTab().id) {
					 * bomTab4.mark = 0; } else if ('tab42' ==
					 * bomTab4.tabpanel.getActiveTab().id) { bomTab4.mark = 1; }
					 */
					if (node.leaf) {
						bomTab4.mark = 1;
					} else {
						bomTab4.mark = 0;
					}
					mbomTabPanel.addT4(node.attributes.nodeId);
				} else if (mbomTabPanel.tabpanel.getActiveTab().id == 'tab5') {
					mbomTabPanel.addT5(node.attributes.nodeId);
				} else if (mbomTabPanel.tabpanel.getActiveTab().id == 'tab6') {
					if ('tab61' == bomTab6.tabpanel.getActiveTab().id) {
						bomTab6.mark = 0;
					} else if ('tab62' == bomTab6.tabpanel.getActiveTab().id) {
						bomTab6.mark = 1;
					} else if ('tab63' == bomTab6.tabpanel.getActiveTab().id) {
						bomTab6.mark = 2;
					} else if ('tab64' == bomTab6.tabpanel.getActiveTab().id) {
						bomTab6.mark = 3;
					} else if ('tab65' == bomTab6.tabpanel.getActiveTab().id) {
						bomTab6.mark = 4;
					}
					mbomTabPanel.addT6(node.attributes.nodeId);
				}
			});
	mbomMain.westPanel.removeAll();
	mbomMain.westPanel.add(leftBomTree.treePanel);
	mbomMain.westPanel.doLayout();

	return leftBomTree.westPanel;
};
