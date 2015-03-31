
var flowTree = {
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

	flowTree.init = function(){
		tlework.addHtml(tlework.divHtml,'tree');

		flowTree.treePanel.on("beforeload",flowTree.beforeCallBack);
		flowTree.treePanel.on("click",flowTree.clickCallBack);
		flowTree.treePanel.on("checkchange",flowTree.checkchangeCallBack);
		var panel = new Ext.Panel({
			title: '',
			width : 300,
			height: 500,
			split: true,
			autoScoll : true,
			layout : 'fit',
			region : 'west',
			items:[flowTree.treePanel]
		});

		return panel;
	}

	//物资种类树
	flowTree.treePanel = new Ext.tree.TreePanel({
		id: 'flowTreePanel',
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

	flowTree.beforeCallBack = function(node) {
		
		var loader = flowTree.treePanel.getLoader();
		loader.dataUrl = '../JsonServlet?parentId='+node.id
			+ '&remoteName=materialCatalogRemote&showMaterial=0';
	}

	flowTree.clickCallBack = function(node) {
		flowTree.selectedMC = node;
		var nodeDepth = node.getDepth();
		for(var i = nodeDepth; i > 1; i--){
			node = node.parentNode;
		}
		if(nodeDepth >= 1){
			flowTree.mType = node.text;
		}else{
			flowTree.mType = '';
		}
		
		var tabpanel = Ext.getCmp('flowTab').getActiveTab();
		var grid=Ext.getCmp(tabpanel.items.items[0].id);
		var st=tabpanel.items.items[0].store;
		
		grid.items.items[0].getStore().baseParams = {nodeId:flowTree.selectedMC.id,
			id:flowTree.selectedMC.id,
			nodeType:flowTree.selectedMC.attributes.materialType,
			topTypeName:flowTree.mType,start:0,limit:20};
		grid.items.items[0].getStore().load();
		
	}

