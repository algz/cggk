var procurementAnnualDetailTree = {
	treePanel : null,
	parentId : 'root',
	nType : '', // 结点类型：0为物料种类，1为物料
	mType : '', // 物料种类第一级名称
	selectedMC : null, // 被选中的结点
	materialArray : null,
	materialCatlogArray : null,
	materialcheckLock : '1'

};

procurementAnnualDetailTree.init = function() {
	
	var treePanel = new procurementAnnualDetailTree.treePanel();
	treePanel.on("beforeload",function(node){
		var loader = treePanel.getLoader();
		loader.dataUrl = '../JsonServlet?parentId=' + node.id
				+ '&remoteName=materialCatalogRemote';
	});
	treePanel.on("click",procurementAnnualDetailTree.clickCallBack);
	
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


// 物资种类树
procurementAnnualDetailTree.treePanel = function(){ 
	var tree = new Ext.tree.TreePanel( {
		id : 'annualTreePanelId',
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

procurementAnnualDetailTree.clickCallBack = function(node) {
	procurementAnnualDetailTree.selectedMC = node;
	if(procurementMain.activeTabId == 'procurementAnnualTab'){		
		if(procurementAnnualData.procurementId == null){
			Ext.Msg.alert('提示','请选择你要查看的需求大纲！');
			return ;
		}		
		var grid = Ext.getCmp('procurementAnnualDataGrid');	
		if(procurementAnnualDetailTree.selectedMC.id == '0'){
			grid.getStore().baseParams = {
				procurementId: procurementAnnualData.procurementId,
				type:'1',
				start : 0,
				limit : 20
			};		
		}else{
			grid.getStore().baseParams = {
				procurementId: procurementAnnualData.procurementId,
				nodeId : procurementAnnualDetailTree.selectedMC.id,
				type:'1',
				start : 0,
				limit : 20
			};
		}	
		grid.store.load();
	}	
}

