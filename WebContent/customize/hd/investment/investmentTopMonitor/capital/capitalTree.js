
var capitalTree = {
		treePanel : null,
		parentId : 'root',
		nType : '',					// 结点类型：0为物资种类，1为物资
		mType : '',					// 物资种类第一级名称
		selectedMC : '',			// 被选中的结点ID
		materialIDs:',',
		catalogIDs:',',
		materialArray:null,
		materialCatlogArray:null,
		materialcheckLock:'1'
		
	};

	capitalTree.init = function(){
		tlework.addHtml(tlework.divHtml,'tree');

		capitalTree.treePanel.on("beforeload",capitalTree.beforeCallBack);
		capitalTree.treePanel.on("click",capitalTree.clickCallBack);
		capitalTree.treePanel.on("checkchange",capitalTree.checkchangeCallBack);
		var panel = new Ext.Panel({
			title: '',
			width : 300,
			height: 500,
			split: true,
			autoScoll : true,
			layout : 'fit',
			region : 'west',
			items:[capitalTree.treePanel]
		});

		return panel;
	}

	//物资种类树
	capitalTree.treePanel = new Ext.tree.TreePanel({
		id: 'capitalTreePanel',
		el : 'tree',
		width : 200,
		autoScroll : true,
	    animate : true,
	    enableDD : true,
	    frame : true,
	    split : true,
	    containerScroll : true,
	    cls : 'file',
		loader : new Ext.tree.TreeLoader({
		}),
		root : new Ext.tree.AsyncTreeNode({
			id:'0',
			text:'物资种类树',
			draggable : false,
			expanded: true,
			iconCls : 'icon-project'
		})
		
	});

	capitalTree.beforeCallBack = function(node) {
		
		var loader = capitalTree.treePanel.getLoader();
		loader.dataUrl = '../JsonServlet?parentId='+node.id
			+ '&remoteName=materialCatalogRemote&showMaterial=1';
	}

	capitalTree.clickCallBack = function(node) {
		capitalTree.selectedMC = node;
		var nodeDepth = node.getDepth();
		for(var i = nodeDepth; i > 1; i--){
			node = node.parentNode;
		}
		if(nodeDepth >= 1){
			capitalTree.mType = node.text;
		}else{
			capitalTree.mType = '';
		}
		
		var grid = Ext.getCmp('materialProvideGridPanelId');
		grid.getStore().baseParams = {nodeId:capitalTree.selectedMC.id,
			nodeType:capitalTree.selectedMC.attributes.materialType,
			topTypeName:capitalTree.mType,start:0,limit:20};
		grid.store.load();
		
	}

