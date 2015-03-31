var dataCenterLeftTree = {
	treePanel : null
};

dataCenterLeftTree.init = function() {
	var rootNode = new Ext.tree.AsyncTreeNode({
				id : '0',
				text : 'root',
				iconCls : 'root'
			});
	var treeLoader = new Ext.tree.TreeLoader({
				dataUrl : '../JSON/webremote_DataCenterRemote.getDataCenterByIndex',
				listeners : {
					'beforeload' : function(treeLoader, node) {
						treeLoader.baseParams.startIndex = -1;
						treeLoader.baseParams.count = 0;
					}
				},
				uiProviders :{"col":Ext.tree.TreeNodeUI}
			})
	dataCenterLeftTree.treePanel = new Ext.tree.TreePanel({
				id : 'dataCenterLeftTree',
				width : 228,
				rootVisible : false,
				border : false,
				height : 731,
				root : rootNode,
				loader : treeLoader,
				autoScroll : true
			});
	new Ext.tree.TreeEditor(dataCenterLeftTree.treePanel);
	return dataCenterLeftTree.treePanel;
}
