var materialCatalogAction = {
};

//新增视图
materialCatalogAction.addView = function(){
	//弹出窗口前，先调用方法获取编号
	/*Ext.Ajax.request({
		url:'../JSON/material_MaterialRemote.getTheNumber',
		method:'POST',
		success:function(response,options){
			materialCatalogForm.theMaterialcatalogCode = response.responseText;
			
			var win = materialCatalogForm.getForm();
			win.show();
		},
		failure:function(){
			Ext.Msg.alert('提示','数据获取错误！');
		},
		disableCaching:true,
		autoAbort:true,
		params:{
			//vendors:temps,
			// materials:mTemps
		}
	});*/

	//原逻辑
	
	var win = materialCatalogForm.getForm();
	win.show();
	
	
	
	
}


//修改视图
materialCatalogAction.editeView = function(){
	var records = common.selectObj;
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要编辑的记录！');
		return;
	}
	if (records.length > 1) {
		Ext.Msg.alert('提示', '请选择一条记录进行编辑！');
		return;
	}
	materialCatalogForm.isUpdate=true;
	var win = materialCatalogForm.getForm(records[0]);//展示数据
	win.setTitle('&nbsp;物料种类-编辑');
	win.show();
}

//删除
materialCatalogAction.del = function(){
	var records = common.selectObj;
	if(records == null||records.length==0){
		Ext.Msg.alert('提示','请选择你要删除的数据！');
		return ;
	}
	var arr = new Array();
	for(var i=0;i<records.length;i++){//将要删除的id加入arr数组
		arr.push(records[i].get('id'));
	}
	Ext.MessageBox.confirm('删除物资种类信息', 
			'删除的物资种类信息无法恢复，是否继续？　', function(btn, text){
		if(btn == 'yes'){
			callSeam("materialCatalogRemote", "deleteMCatlog", [arr], materialCatalogAction.callBack);
		}
	});
} 
//用户角色列表
materialCatalogAction.getRoleGrid = function(materialCatalogID){
	  var strurl = '../JSON/materialCatalogRemote.getRoleList?materialcatalogid='+materialCatalogID;
	  var proxy = new Ext.data.HttpProxy({
	            url: strurl
	        });
	  var reader = new Ext.data.JsonReader({
	            root: 'results',
	            totalProperty: 'totalProperty',
	            id: 'roleid'
	        }, [
	            'roleid','rolename',{name:'sign',type:'bool'}
	        ]);
	  var ascid = 'roleid';
	  var ascstr = 'asc';
	  var ds = new data.Store(proxy,reader,ascid,ascstr);  
//	  ds.baseParams={materialcatalogid:materialCatalogID};
	  var checkColumn = new Ext.grid.CheckColumn({
	       header: ""+getResource('resourceParam503')+"",
	       dataIndex: 'sign',
	       singleSelect:true,
	       width: 40
	    });
	  var cm = new Ext.grid.ColumnModel([
	  	checkColumn,	
	  	{
		  	id:'id',
		  	header: ""+getResource('resourceParam809')+"", 
		  	width: 80, 
		  	sortable: true, 
		  	dataIndex: 'roleid'
	  	},
	  	{
			header: ""+getResource('resourceParam797')+"",//角色名称 2011-4-28 gzj
			dataIndex: 'rolename',
			sortable: false,
			width: 200
		}]);
	
	  var tb=null; 
	  materialCatalogAction.rolegrid = myGrid.initNobr(ds,cm,tb,null,checkColumn); 
	 // ds.load();
	  materialCatalogAction.rolegrid.region= 'center';
	};
//制定能够使用物资种类的角色
materialCatalogAction.showRole = function(){
		var records = common.selectObj;
		var materialCatalogID = new Array();
		if(records == null || records.length==0){
			Ext.Msg.alert('提示','请选择你要授权的物资种类！');
			return ;
		}
		if(records.length>1){
			Ext.Msg.alert('提示','请选择一种物资种类！');
			return ;
		} 
		if(records[0].get('parentid').length<2){
			Ext.Msg.alert('提示','请选择没有子集的物资种类！');
			return ;
		}
		materialCatalogID.push(records[0].get('id')); 
		tlework.addHtml(tlework.divHtml,'updataroledialog');	
		materialCatalogAction.getRoleGrid(materialCatalogID[0]); 
		if (!materialCatalogAction.updataroledialog){		
			materialCatalogAction.updataroledialog = new Ext.Window({ 
				el:'updataroledialog',
				title: ''+getResource('resourceParam909')+'',//用户角色分配
	           	layout:'border',
				modal:true,
	           	width:300,
	           	height:400,
	           	closeAction:'hide',
	           	plain: false,
				buttons: [
				{	text: '保存',
					handler: function(){ 
						var data = materialCatalogAction.rolegrid.store;	
						var roleID = new Array();
						var size = data.getCount(); 
						for(var i = 0; i < size; i++){
							var record = data.getAt(i); 
							if(record.data["sign"])
								roleID.push(record.data["roleid"]);
						}
						if(roleID.length==0){
							Ext.Msg.alert('提示','请选择你要授权的角色！');
							return ;
						}
						//callSeam("materialCatalogRemote", "saveMaterialCatalogRole",materialCatalogID,roleID, materialCatalogAction.updataroledialog.hide());
						var materialCatalogRemote = Seam.Component.getInstance("materialCatalogRemote");
						materialCatalogRemote.saveMaterialCatalogRole(materialCatalogID,roleID, function(result) {
							materialCatalogAction.updataroledialog.hide();
						});
					}
				},
				{   text: '关闭',
					handler: function(){
					materialCatalogAction.updataroledialog.hide();
					}
				}]
			});
			materialCatalogAction.updataroledialog.on('hide',materialCatalogAction.close);
		}
		 
		materialCatalogAction.updataroledialog.add(materialCatalogAction.rolegrid);
		myGrid.loadvalue(materialCatalogAction.rolegrid.store,null,null);
		materialCatalogAction.updataroledialog.show();
	};
	//关闭对话框
materialCatalogAction.close = function(){
		materialCatalogAction.updataroledialog.destroy();					
		materialCatalogAction.updataroledialog = null;	
};
//导入视图
materialCatalogAction.impotView = function(){
	var win = materialCatalogForm.getForm();
	win.show();
}
//树刷新
materialCatalogAction.treeRefresh = function(){
	var tree = Ext.getCmp('materialCatalogTreePanel');
	//节点判空，重新load数据
	//if(	tree.getNodeById(materialCatalogTree.parentId+'').parentNode!=null&&tree.getNodeById(materialCatalogTree.parentId+'').attributes.leaf){
	if(	tree.getNodeById(materialCatalogTree.parentId+'').parentNode!=null)
		tree.getNodeById(materialCatalogTree.parentId+'').parentNode.reload();
//	}else{	
//		tree.getNodeById(materialCatalogTree.parentId+'').reload();
//	}
	//刷新grid
	var grid = Ext.getCmp('materialCatalogGridPanelId');
	grid.getStore().baseParams = {
		start:0,
		limit:20,
		startId:materialCatalogTree.parentId+'',
		materialtypename:''
	};
	grid.store.load();
}
//在树的根节点刷新
materialCatalogAction.treeRootRefresh = function(){
	var tree = Ext.getCmp('materialCatalogTreePanel');
	materialCatalogTree.parentId = 0;
	tree.getNodeById(materialCatalogTree.parentId+'').reload();
	var grid = Ext.getCmp('materialCatalogGridPanelId');
	grid.getStore().baseParams = {startId : 0,start : 0,limit : 20};
	grid.store.load();
}

//回调
materialCatalogAction.callBack = function(r){
	if(r=='true'){//删除成功
		materialCatalogAction.treeRefresh(); 
	} 
	else if(r=='hsRelation'){//有外键不允许删除，给出提示
		alert('请先删除当前物料种类树下的所有物料！');
	}
	else {
		Ext.Msg.alert('提示','服务器忙，请稍候重试！');
	}
}

//搜索
materialCatalogAction.search = function(){
	var startId = materialCatalogTree.parentId;
	var catlogName = document.getElementById('catlogName').value;
	var grid = Ext.getCmp('materialCatalogGridPanelId');
	grid.getStore().baseParams = {
		start:0,
		limit:20,
		startId:startId,
		materialtypename:catlogName
	};
	grid.store.load();
}

//物料种类上传
materialCatalogAction.upload = function() {
	var win = materialCatalogAction.fileUploadForm();
	win.show();
}
materialCatalogAction.fileUploadForm = function(rd) {
	var items = [ {
		xtype : "textfield",
		fieldLabel : '上传文件',
		name : 'file',
		inputType : 'file',
		id : 'file1',
		allowBlank : false
	} ];
	var inform = new Ext.FormPanel( {
		id : 'materialCatalogFileUploadForm',
		buttonAlign : 'center',
		labelAlign : 'left',
		padding : 5,
		fileUpload : true,
		labelWidth : 70,		
		frame : false,
		items : items
	});
	var buttons = [ {
		text : '确定',
		handler : function() {
			if (!inform.form.isValid()) return;//			
			var fileName = inform.form.findField('file').getValue().toLowerCase().trim();
			if (fileName.lastIndexOf('.') == -1) {//判断上传文件Excel的文件后缀名是否为‘.xls’，其余的格式文件上传为非法上传		
				Ext.Msg.alert('提示','仅支持扩展名为.xls的Excel文件!');
				return;
			}
			if(fileName.substr(fileName.lastIndexOf('.')) != '.xls'){
				Ext.Msg.alert('提示','仅支持扩展名为.xls的Excel文件!');
				return;
			}
					inform.form.doAction('submit', {
						waitMsg : '正在上传数据，请稍候...',
						waitTitle : '提示',
						url : '../MaterialCatalogUploadServlet',
						method : 'post',
						success : function(form, action) {
							form.reset();
							window.close();
							if(action.result.ImportExcelVo.noExistProducts != ''){
								Ext.Msg.alert('提示', '以下物资种类的父类别不存在，请核实后再重新导入！<br/>'+action.result.ImportExcelVo.noExistProducts);
							}else if(action.result.ImportExcelVo.redupMaterialCatalogVos == ''){
								materialCatalogAction.treeRootRefresh();
								Ext.Msg.alert('提示', '上传数据成功！');
							} else {//重复数据信息的上传结果数据反馈
								var cm = new Ext.grid.ColumnModel([
	       							{header:'物料种类名称',dataIndex:'materialtypename'},{header:'所属父种类',dataIndex:'parentName'},
	       							{header:'备注',dataIndex:'remark'}
	       						]);
	       						var showMessage = action.result.ImportExcelVo.redupMaterialCatalogVos;//重复物料信息
	       						var data = {id : 0,root : showMessage };
	       						var reader = new Ext.data.JsonReader({id:'id',root:'root'},
	       							['materialtypename','parentName','remark']);
	       						var store = new Ext.data.Store({
	       							proxy : new Ext.data.MemoryProxy(data),
	       							reader : reader
	       						});
	       						store.load();						
	       						var win = new Ext.Window({
	       							title : '&nbsp;系统已存在的物资种类信息',
	       							width : 520,
	       							height : 300,
	       							layout : 'fit',
	       							autoScroll : true,
	       							items : new Ext.grid.GridPanel({store:store,cm:cm,loadMask : {msg:'正在加载数据，请稍后...'}})
	       						});
	       						win.show();
							}
							
							common.gridPanel.refush();
						},
						failure : function(form, action){
							window.close();
							form.reset();
							Ext.Msg.alert('提示', '导入文件格式错误！');
						}
					});
		}
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ];

	var window = new Ext.Window( {
		id : "materialCatalogFileUploadWind",
		layout : 'fit',
		width : 300,
		height : 100,
		title : '&nbsp;物资种类信息-上传',
		modal : true,
		items : inform,
		buttons : buttons
	});
	return window;

}

