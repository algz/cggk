var materialCatalogTree = {
	treePanel : null,
	parentId : 'root',
	nType : '',					// 结点类型：0为物料种类，1为物料
	mType : '',					// 物料种类第一级名称
	selectedMC : '',			// 被选中的结点ID
	materialIDs:',',
	catalogIDs:',',
	uncheckedCatalogIDs:',',
	materialArray:null,
	materialCatlogArray:null,
	materialcheckLock:'1'	
};

materialCatalogTree.init = function(){	
	materialCatalogTree.treePanel = new Ext.tree.TreePanel({
		id: 'materialCatalogTreePanel',
		autoScroll : true,
	    animate : true,
	    frame : true,
	    cls : 'file',
		loader : new Ext.tree.TreeLoader({
		}),
		root : new Ext.tree.AsyncTreeNode({
			id:'0',
			text:'物料种类树',
			draggable : false,
			expanded: true,
			iconCls : 'icon-project',
				checked: false
		})
		
	});
	materialCatalogTree.treePanel.on("beforeload",materialCatalogTree.beforeCallBack);
	materialCatalogTree.treePanel.on("load",materialCatalogTree.loadCallBack);
	materialCatalogTree.treePanel.on("checkchange",materialCatalogTree.checkchangeCallBack);
	return materialCatalogTree.treePanel;
}
 
materialCatalogTree.beforeCallBack = function(node) {	
	var loader = materialCatalogTree.treePanel.getLoader();
	loader.dataUrl = '../JsonServlet?parentId='+node.id
		+ '&remoteName=materialCatalogRemote&withCheckBox=true&userID='+user.useridall()[0];
}

materialCatalogTree.loadCallBack = function(node) {	
	var childNodes = node.childNodes;
	//遍历节点
	Ext.each(childNodes,function(cnode){
		//如果是物料种类
		if(cnode.attributes.materialType=='0'){				
			if(cnode.attributes.leaf==true&&cnode.attributes.checked==true){
				if(materialCatalogTree.catalogIDs.indexOf(cnode.id+',')==-1){
					materialCatalogTree.catalogIDs+=cnode.id+',';
				}					
			}			
		}
	});
}
	
//勾选父节点，会自动选上子节点
materialCatalogTree.checkchangeCallBack = function(node, checked) {  
	if(materialCatalogTree.materialcheckLock=='1'){
		materialCatalogTree.materialcheckLock='0';
		var mycheckedmaterial = [];
		var mycheckedmaterialCatlog = [];
		var nodeid;
		var a = 0; 
		node.attributes.checked = checked;
		
		//选中节点
		if(node.getUI().isChecked() || node.attributes.checked ){
			if(node.attributes.materialType=='0'){	//如果是物料种类				
				if(node.attributes.leaf==true){
					if(materialCatalogTree.catalogIDs.indexOf(node.id+',')==-1){
						materialCatalogTree.catalogIDs+=node.id+',';
					}
					materialCatalogTree.uncheckedCatalogIDs = materialCatalogTree.uncheckedCatalogIDs.replace(node.id+",","");
					materialCatalogTree.materialcheckLock='1';
					return;
				}
			}
		}else if(!node.getUI().isChecked() || !node.attributes.checked){//取消选中节点
			//判断父节点下是否全部子节点都被取消
			var parentNode = node.parentNode;
			//如果父节点不为空
			if(parentNode!=null){		
				parentNode.ui.toggleCheck(checked);
				parentNode.attributes.checked = checked;			
			}
			//如果是物料种类
			if(node.attributes.materialType=='0' && node.attributes.leaf==true){
				materialCatalogTree.catalogIDs = materialCatalogTree.catalogIDs.replace(node.id+",","");
				if(materialCatalogTree.uncheckedCatalogIDs.indexOf(node.id+',')==-1){
					materialCatalogTree.uncheckedCatalogIDs+=node.id+',';
				}
			}
			
		}
			
		var childNodes = node.childNodes;
		//遍历节点
		Ext.each(childNodes,function(node){
			node.ui.toggleCheck(checked);
			node.attributes.checked = checked;
			//如果是物料种类
			if(node.attributes.materialType=='0' && node.attributes.leaf==true){				
				if(checked==true){
					if(materialCatalogTree.catalogIDs.indexOf(node.id+',')==-1){
						materialCatalogTree.catalogIDs+=node.id+',';
					}
					materialCatalogTree.uncheckedCatalogIDs = materialCatalogTree.uncheckedCatalogIDs.replace(node.id+",","");
				}else{//取消选中
					materialCatalogTree.catalogIDs=materialCatalogTree.catalogIDs.replace(node.id+",","");
					if(materialCatalogTree.uncheckedCatalogIDs.indexOf(node.id+',')==-1){
						materialCatalogTree.uncheckedCatalogIDs+=node.id+',';
					}
				}			
			}			
		});
		materialCatalogTree.materialcheckLock='1';
	}
	
	return ;
		
}

