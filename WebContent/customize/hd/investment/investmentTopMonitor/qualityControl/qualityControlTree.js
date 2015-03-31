
var qualityControlTree = {
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

	qualityControlTree.init = function(){
		tlework.addHtml(tlework.divHtml,'tree');

		qualityControlTree.treePanel.on("beforeload",qualityControlTree.beforeCallBack);
		qualityControlTree.treePanel.on("click",qualityControlTree.clickCallBack);
		qualityControlTree.treePanel.on("checkchange",qualityControlTree.checkchangeCallBack);
		var panel = new Ext.Panel({
			title: '',
			width : 300,
			height: 500,
			split: true,
			autoScoll : true,
			layout : 'fit',
			region : 'west',
			items:[qualityControlTree.treePanel]
		});

		return panel;
	}

	//物资种类树
	qualityControlTree.treePanel = new Ext.tree.TreePanel({
		id: 'qualityControlTreePanel',
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

	qualityControlTree.beforeCallBack = function(node) {
		
		var loader = qualityControlTree.treePanel.getLoader();
		loader.dataUrl = '../JsonServlet?parentId='+node.id
			+ '&remoteName=materialCatalogRemote&showMaterial=1';
	}

	qualityControlTree.clickCallBack = function(node) {
		qualityControlTree.selectedMC = node;
		var nodeDepth = node.getDepth();
		for(var i = nodeDepth; i > 1; i--){
			node = node.parentNode;
		}
		if(nodeDepth >= 1){
			qualityControlTree.mType = node.text;
		}else{
			qualityControlTree.mType = '';
		}
		
		var grid = Ext.getCmp('materialProvideGridPanelId');
		grid.getStore().baseParams = {nodeId:qualityControlTree.selectedMC.id,
			nodeType:qualityControlTree.selectedMC.attributes.materialType,
			topTypeName:qualityControlTree.mType,start:0,limit:20};
		grid.store.load();
		
	}

