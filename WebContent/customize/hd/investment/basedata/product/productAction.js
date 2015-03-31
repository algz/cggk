var productAction = {};

//新增视图
productAction.addView = function(){
	if(productTree.parentId=='root'){
		productTree.parentId='0';
	}
	var win = productForm.getForm();
	win.show();
}


//修改视图
productAction.editeView = function(){
	var records = common.selectObj;
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要编辑的记录！');
		return;
	}
	if (records.length>1) {
		Ext.Msg.alert('提示', '请选择一条记录进行编辑！');
		return;
	}
	var win = productForm.getForm(records[0]);
	Ext.getCmp("productcode").disable();
	win.setTitle('产品信息-编辑');
	win.show();
	
}

//删除
productAction.del = function(){ 
	var records = common.selectObj;
	if(records == '' || records.length < 1){
		Ext.Msg.alert('提示','请选择你要删除的数据！');
		return ;
	}else{
		var arr = new Array();
	for(var i=0;i<records.length;i++){
		arr.push(records[i].get('productid'));
	}
	Ext.MessageBox.confirm('删除产品信息', 
			'删除的产品信息无法恢复，是否继续？　', function(btn, text){
		if(btn == 'yes'){
			var arr2= new Array();
			arr2.push(arr); 
			callSeam("product_ProductRemote", "deleteProduct", arr2, productAction.callBack);
		}
	}); 
	}
}

//回调
productAction.callBack = function(r){
	if(r){
		var result = Ext.util.JSON.decode(r);
		if(result.success){
			common.gridPanel.reload();//更新列表
		}else{
			Ext.Msg.alert('提示','以下产品已关联材料定额，不能删除：<br/>'+result.allUsedProductCode);
		}
		
	} else {
		Ext.Msg.alert('提示','服务器忙，请稍候重试！');
	}
}

//搜索
productAction.search = function(){
	var win = productAction.getSearchForm();
	win.show();
}
productAction.getSearchForm = function(rd){

	var items = [ {
		xtype : 'hidden',
		name : 'productid'
	}, {
		xtype : 'hidden',
		name : 'leaf'
	}, {

		xtype : 'hidden',
		name : 'parentid',
		value : productTree.parentId

	}, {
		xtype : "textfield",
		fieldLabel : '产品型号',
		lableWidth : 150,
		id : 'productcode',
		anchor : '90%'
	}, {
		xtype : "textfield",
		fieldLabel : '产品描述',
		lableWidth : 150,
		id : 'productname',
		anchor : '90%'
	}, {
		xtype : "textfield",
		fieldLabel : '产品批次',
		lableWidth : 150,
		id : "batchno",
		anchor : '90%'
	}];

	var inform = new Ext.FormPanel( {
		id : 'productFrom',
		buttonAlign : 'center',
		labelAlign : 'right',
	//	bodyStyle : 'padding:10,0,0,0',
		autoHeight : true,
	//	fileUpload : true,
		frame : false,
		items : items
	});
	if (rd) {
		inform.getForm().loadRecord(rd);
	}
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {

		var startId = productTree.parentId;
		var productname = document.getElementById('productname').value;
		var productcode = document.getElementById('productcode').value;
		var batchno = document.getElementById('batchno').value;
		
//		if(productname == ""&&productcode==""&&batchno==""){
//			Ext.Msg.alert('提示','请输入查询条件！');
//			return;
//		}
		var grid = Ext.getCmp('productProductid');
		grid.getStore().baseParams = {start:0,limit:20,startId:startId,productname:productname
			,productcode:productcode,batchno:batchno};
		
		grid.store.load();
	//	form.reset();
		window.close();
	//	common.gridPanel.refush();

	}
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ]

	var window = new Ext.Window( {
		id : "productAddWind",
		width : 600,
		height : 150,
		autoScroll : true,
		title : '产品信息-搜索',
		modal : true,
		items : inform,
		buttons : buttons
	});
	return window;


}
productAction.treeRefresh = function(){
	var tree = Ext.getCmp('productTreePanel');
	tree.root.reload();
}

