var contractTree = {
	treePanel : null,
	parentId : 'root',
	nType : '', // 结点类型：0为物料种类，1为物料
	mType : '', // 物料种类第一级名称
	selectedMC : null, // 被选中的结点
	materialIDs : ',',
	catalogIDs : ',',
	materialArray : null,
	materialCatlogArray : null,
	materialcheckLock : '1'

};

contractTree.init = function() {
	
	var treePanel = new contractTree.treePanel();
	treePanel.on("beforeload",function(node){
		var loader = treePanel.getLoader();
		loader.dataUrl = '../JsonServlet?parentId=' + node.id
				+ '&remoteName=materialCatalogRemote&showMaterial=1';
	});
	treePanel.on("click",contractTree.clickCallBack);
	
	var panel = new Ext.Panel( {
		title : '',
		width : 300,
		height : 300,
		split : true,
		autoScoll : true,
		layout : 'fit',
		region : 'west',
		items : [ treePanel ]
	});

	return panel;
}


// 物料种类树
contractTree.treePanel = function(){ 
	var tree = new Ext.tree.TreePanel( {
		id : 'treePanelId',
		width : 200,
		autoScroll : true,
		animate : true,
		enableDD : true,
		frame : true,
		split : true,
		containerScroll : true,
		cls : 'file',
		loader : new Ext.tree.TreeLoader({}),
		root : new Ext.tree.AsyncTreeNode( {
			id : '0',
			text : '物料种类及物料树',
			draggable : false,
			expanded : true,
			iconCls : 'icon-project'
		})
	});
	return tree;
}

contractTree.clickCallBack = function(node) {

}

