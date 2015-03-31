
var productTree = {
	treePanel : null,
	parentId : 'root'
};


productTree.init = function() {
	productTree.treePanel.on("beforeload", productTree.breforeCallBack);
	productTree.treePanel.on("click", productTree.clickCallBack);
	var panel = new Ext.Panel({
		title : '成品目录',
		width : 280,
		height : 500,
		split : true,
		autoScoll : true,
		layout : 'fit',
		region : 'west',
		tbar : productTree.tbars(),
		items : [productTree.treePanel]
	});	
	return panel;
}

//成品树
productTree.treePanel =  new Ext.tree.TreePanel({
	id : 'treePanel',
	split : true,
	width : 200,
	animate : true,
	line : true,
	//autoScoll : true,
	rootVisible : true,
	loader : new Ext.tree.TreeLoader({
		dataUrl : '../JSON/endProductRemote.getProductTree'
	}),
	root : new Ext.tree.AsyncTreeNode({
		text : 'root',
		id : 'root',
		expanded : true
	})
});


productTree.breforeCallBack = function(node) {
	var id = '' + node.id;
	var loader = productTree.treePanel.getLoader();
	if (id == 'root') {
		loader.dataUrl = '../JSON/endProductRemote.getProductTree';
	} else if (id.indexOf("f") >= 0){
		loader.dataUrl = '../JSON/endProductRemote.getProductTree?flag=father';
	} else {
		loader.dataUrl = '../JSON/endProductRemote.getSubProductTree?id='+id;
	}
}

productTree.clickCallBack = function(node) {
	var id = '' + node.id;
	//把id赋值给全局变量
	productTree.parentId = id;
	if (id == 'root') {
		return false;
	} 
	var tabPanel = view.tabPanel();
	var centerPanel = Ext.getCmp('productCenterPanel');
	centerPanel.removeAll();
	centerPanel.add(tabPanel);
	centerPanel.doLayout();
	//alert(productTree.parentId);
	//---做其他操作
}

//树面板上的菜单
productTree.tbars = function() {
	
	//新增工具按钮
	var newBar = {
		extype : 'button',
		id : 'newBar',
		text : '新增',
		handler : function(){
			var form;
			//根据节点id判断新增表单类型
			if (productTree.parentId == 'root') {
				form = view.productTypeForm();
			} else {
				form = view.productForm();
			}
			var centerPanel = Ext.getCmp('productCenterPanel');
			centerPanel.removeAll();
			centerPanel.add(form);
			centerPanel.doLayout();
		}
	}
	//编辑工具按钮
	var editBar = {
		extype : 'button',
		id : 'editBar',
		text : '编辑',
		disabled : true,
		handler : function(){
		}	
	}
	var bar = ['-',newBar,'-',editBar,'-'];
	return bar;
};

//动态增加数节点
productTree.addNode = function(oldId, newId, text, flag){
	var node = productTree.treePanel.getNodeById(oldId);
	node.expand();
	var newNode = new Ext.tree.TreeNode({
		id : newId,
		text : text,
		leaf : flag
	})
	node.appendChild(newNode);	
}



