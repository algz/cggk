var vendorTree = {
	treePanel : null,
	parentId : 'root',
	nType : '',					// 结点类型：0为物资种类，1为物资
	mType : '',					// 物资种类第一级名称
	selectedMC : '',			// 被选中的结点ID
	materialIDs:',',
	catalogIDs:',',
	materialArray:null,
	materialCatlogArray:null,
	materialcheckLock:'1',
	clickMC:''					//获取被点击的节点ID
};

vendorTree.init = function(){
	tlework.addHtml(tlework.divHtml,'tree');

	vendorTree.treePanel.on("beforeload",vendorTree.beforeCallBack);
	vendorTree.treePanel.on("click",vendorTree.clickCallBack);
	vendorTree.treePanel.on("checkchange",vendorTree.checkchangeCallBack);
	var panel = new Ext.Panel({
		title: '',
		width : 300,
		height: 500,
		split: true,
		autoScoll : true,
		layout : 'fit',
		region : 'west',
		items:[vendorTree.treePanel]
	});

	return panel;
}

//物资种类树
vendorTree.treePanel = new Ext.tree.TreePanel({
	id: 'vendorTreePanel',
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
		text:'物资种类及物资树',
		draggable : false,
		expanded: true,
		iconCls : 'icon-project'
	})
	
});

vendorTree.beforeCallBack = function(node) {
	
	var loader = vendorTree.treePanel.getLoader();
	loader.dataUrl = '../JsonServlet?parentId='+node.id
		+ '&remoteName=materialCatalogRemote&showMaterial=1&withCheckBox=true';
}

vendorTree.clickCallBack = function(node,checked) {
	vendorTree.selectedMC = node;
	vendorTree.clickMC = node;
	var nodeDepth = node.getDepth();
	for(var i = nodeDepth; i > 1; i--){
		node = node.parentNode;
	}
	if(nodeDepth >= 1){
		vendorTree.mType = node.text;
	}else{
		vendorTree.mType = '';
	}

	//判断“删除指定供应商”按钮是否可用
	if(vendorTree.selectedMC.attributes.materialType == '0'){
		Ext.getCmp('deleteVendorMaterials').setDisabled(true);
	}else if(vendorTree.selectedMC.attributes.materialType == '1'){
		Ext.getCmp('deleteVendorMaterials').setDisabled(false);
//		vendorTree.selectedMC.ui.checkbox.checked = checked;
	}
	
	var grid = Ext.getCmp('vendorGridPanelId');
	grid.getStore().baseParams = {materialId:vendorTree.selectedMC.id,
		nodeType:vendorTree.selectedMC.attributes.materialType,
		topTypeName:vendorTree.mType,start:0,limit:20};
	grid.store.load();
	
}
	
//勾选父节点，会自动选上子节点
vendorTree.checkchangeCallBack =function(node, checked) {  
	if(node.attributes.materialType=='0' && (node.getUI().isChecked() || node.attributes.checked)){
			Ext.Msg.alert("提示","只能勾选物资信息");
			node.ui.toggleCheck(false);
			return;
	}
	if(vendorTree.materialcheckLock=='1'){
		vendorTree.materialcheckLock='0';
	var mycheckedmaterial = [];
	var mycheckedmaterialCatlog = [];
	var nodeid;
	var a = 0; 
	node.attributes.checked = checked;
	
	//选中节点
	if(node.getUI().isChecked() || node.attributes.checked ){
		vendorTree.selectedMC = node;
		if(node.attributes.materialType=='0'){	//如果是物资种类 
			if(vendorTree.catalogIDs.indexOf(node.id+',')==-1)
				vendorTree.catalogIDs+=node.id+',';
			if(node.attributes.leaf==true){
				vendorTree.materialcheckLock='1';
				return;
			}
		}else if(node.attributes.materialType=='1'){	//如果是物资 
			if(vendorTree.materialIDs.indexOf(node.id+',')==-1)
			vendorTree.materialIDs+=node.id+',';
			vendorTree.materialcheckLock='1';
			return ;
		}
	}else if(!node.getUI().isChecked() || !node.attributes.checked){//取消选中节点
		//判断父节点下是否全部子节点都被取消
		var parentNode = node.parentNode;
		//如果父节点不为空
		if(parentNode!=null){		
			parentNode.ui.toggleCheck(checked);
			parentNode.attributes.checked = checked;
			vendorTree.catalogIDs = vendorTree.catalogIDs.replace(parentNode.id+",","");		
		}
		//如果是物资种类
		if(node.attributes.materialType=='0'){
			vendorTree.catalogIDs = vendorTree.catalogIDs.replace(node.id+",","");
		}else if(node.attributes.materialType=='1'){	//如果是物资
			vendorTree.materialIDs = vendorTree.materialIDs.replace(node.id+",","");
			vendorTree.materialcheckLock='1';
			return ;
		}		
	}
			
	var childNodes = node.childNodes;
	//遍历节点
	Ext.each(childNodes,function(node){
		node.ui.toggleCheck(checked);
		node.attributes.checked = checked;
		//如果是物资种类
		if(node.attributes.materialType=='0'){				
			if(checked==true){
				if(vendorTree.catalogIDs.indexOf(node.id+',')==-1)
					vendorTree.catalogIDs+=node.id+',';
			}else{//取消选中
					vendorTree.catalogIDs=vendorTree.catalogIDs.replace(node.id+",","");
			}				
		}else{//如果是物资
			
			if(checked==true){
				if(vendorTree.materialIDs.indexOf(node.id+',')==-1)
					vendorTree.materialIDs+=node.id+',';
			}else{//取消选中
				vendorTree.materialIDs=vendorTree.materialIDs.replace(node.id+",","");
			}				
		}			
	});
	vendorTree.materialcheckLock='1';
	}	
	return ;		
}

