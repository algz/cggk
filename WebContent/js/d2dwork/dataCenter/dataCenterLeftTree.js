var dataCenterLeftTree = {
	treePanel : null
};

dataCenterLeftTree.init = function() {
	var rootNode = new Ext.tree.AsyncTreeNode({
				id : '0',
				text : 'Root',
				iconCls : 'icon-project',
				property : 'attributes'
			});
	var treeLoader = new Ext.tree.TreeLoader({
		dataUrl : '../JSON/project_ProjectRemote.getProjectTreeById?contentId=0',
		uiProviders : {
			"col" : Ext.tree.TreeNodeUI
		}
	})
	dataCenterLeftTree.treePanel = new Ext.tree.TreePanel({
				id : 'dataCenterLeftTree',
				width : 398,
				rootVisible : true,
				border : false,
				root : rootNode,
				loader : treeLoader,
				autoScroll : true
			});

	return dataCenterLeftTree.treePanel;
}
