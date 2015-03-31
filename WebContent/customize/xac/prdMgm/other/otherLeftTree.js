var otherLeftTree = {
	treePanel : null,
	nodeId : '0',
	pageSize : 100,
	rootName : 'Root',
	rootIconCls : 'icon-project',
	rootID : '0'
};

otherLeftTree.init = function(transferFlag) {

	var url = '../JSON/XacCommon_CommonRemote.getPbomForother';
	if (transferFlag == 'MBOM') {
		url = '../JSON/XacCommon_CommonRemote.getMbomForother';
	} else if (transferFlag == 'EBOM') {
		url = '../JSON/XacCommon_CommonRemote.getEbomForother';
	}
	otherLeftTree.treeLoader = new Ext.ux.tree.PagingTreeLoader( {
		dataUrl : url,
		pageSize : otherLeftTree.pageSize
	});

	otherLeftTree.treePanel = new Ext.tree.TreePanel( {
		id : 'bom-tree',
		region : 'west',
		split : true,
		width : 240,
		loader : otherLeftTree.treeLoader,
		animate : true,
		lines : true,
		autoScroll : true,

		root : new Ext.tree.AsyncTreeNode( {
			id : otherLeftTree.rootID,
			text : otherLeftTree.rootName,
			iconCls : otherLeftTree.rootIconCls,
			expanded : true,
			allowDrag : false
		})
	});

	otherLeftTree.treePanel.on('checkchange', function(node, checked) {
		if (checked) {
			otherTabPanel.addNode(node.text,node.attributes.nodeId);
		} else {
			otherTabPanel.removeNode(node.attributes.nodeId);
		}
		otherTabPanel.colorFieldForm.doLayout();
	});

	otherMain.westPanel.removeAll();
	otherMain.westPanel.add(otherLeftTree.treePanel);
	otherMain.westPanel.doLayout();

	return otherLeftTree.treePanel;
};
