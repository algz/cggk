var procurementSporadicDetailTree = {
	treePanel : null,
	parentId : 'root',
	nType : '', // 结点类型：0为物料种类，1为物料
	mType : '', // 物料种类第一级名称
	selectedMC : null, // 被选中的结点
	materialArray : null,
	materialCatlogArray : null,
	materialcheckLock : '1'

};

procurementSporadicDetailTree.init = function() {
	
	var treePanel = new procurementSporadicDetailTree.treePanel();
	treePanel.on("beforeload",function(node){
		var loader = treePanel.getLoader();
		loader.dataUrl = '../JsonServlet?parentId=' + node.id
				+ '&remoteName=materialCatalogRemote';
	});
	treePanel.on("click",procurementSporadicDetailTree.clickCallBack);
	
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
procurementSporadicDetailTree.treePanel = function(){ 
	var tree = new Ext.tree.TreePanel( {
		id : 'sporadicTreePanelId',
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
			text : '物资种类树',
			draggable : false,
			expanded : true,
			iconCls : 'icon-project'
		})
	});
	return tree;
}

procurementSporadicDetailTree.clickCallBack = function(node) {
	procurementSporadicDetailTree.selectedMC = node;
	if(procurementMain.activeTabId == 'procurementSporadicTab'){
		var grid = Ext.getCmp('procurementSporadicDataGrid');
		if(procurementSporadicDetailTree.selectedMC.id == '0'){
			grid.getStore().baseParams = {
				procurementId: procurementSporadicData.procurementId,
				type:'2',
				start : 0,
				limit : 20
			};		
		}else{
			grid.getStore().baseParams = {
				procurementId: procurementSporadicData.procurementId,
				nodeId : procurementSporadicDetailTree.selectedMC.id,
				type:'2',
				start : 0,
				limit : 20
			};
		}	
		grid.store.load();
	}	
}

