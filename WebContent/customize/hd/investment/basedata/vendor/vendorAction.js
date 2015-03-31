var vendorAction = {};

//新增视图
vendorAction.addView = function(){
//	if(vendorTree.materialIDs == ',' && vendorTree.catalogIDs == ','){
//		Ext.Msg.alert('提示','请先选择物料种类或物料！');
//		return ;
//	}
	var win = vendorForm.getForm();
	win.show();
}

//修改视图
vendorAction.editView = function(){
	var records = common.selectObj;
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要编辑的记录！');
		return;
	}
	if (records.length > 1) {
		Ext.Msg.alert('提示', '请选择一条记录进行编辑！');
		return;
	}
	if(records[0].get('evaluation_status')!="0"){//trial_status
				   Ext.Msg.alert('提示','只能编辑状态为编制中的数据！');
				  return ;
	}
	var win = vendorForm.getForm(records[0]);
	win.setTitle('&nbsp;供应商信息-编辑');
	win.show();
}

//删除
vendorAction.del = function(){
	var records = common.selectObj;
	if(records == null || records.length < 1){
		Ext.Msg.alert('提示','请选择你要删除的数据！');
		return ;
	}
	var arr = new Array();
			for(var i=0;i<records.length;i++){
				if(records[i].get('evaluation_status')!="0"){//trial_status
				   Ext.Msg.alert('提示','只能删除编制中的数据！');
				  return ;
				}
				arr.push(records[i].get('vendorID'));
			}
	Ext.MessageBox.confirm('删除供应商信息', 
			'删除的供应商信息无法恢复，是否继续？　', function(btn, text){
		if(btn == 'yes'){ 
			callSeam("vendor_VendorRemote", "deleteVendor", [arr], vendorAction.delCallBack);
		}
	}); 
	
}

//指定供应商
vendorAction.setVendor = function(){
	var selections = Ext.getCmp('materialGridPanelIdLocal').getSelectionModel().getSelections()
	if(selections.length<=0){
		Ext.Msg.alert('提示','必须选择选择物资才能指定供应商！');
		return ;
	}
	var materialIds = "";
	for(var i=0;i<selections.length;i++){
		materialIds = materialIds + "'" + selections[i].get('materialid') + "'";
		if(i<selections.length-1){
			materialIds = materialIds + ',';
		}
	}
	var win = vendorWinGrid.gridWin(materialIds);
	win.show();
	
}
//删除指定供应商信息
vendorAction.showDeleteVendorWin = function(){
	var records = Ext.getCmp('materialGridPanelIdLocal').getSelectionModel().getSelections();
	var materialIds = "";
	if(records.length<=0){
		Ext.Msg.alert('提示','请选择物资');
		return ;
	}
	for(var i=0;i<records.length;i++){ 
			
			if(materialIds.length>0)
				materialIds+=",";
			materialIds += "'"+records[0].get("materialid")+"'";
	}
 	var buttons = [{
		text : ' 确定 ',
		handler : function(){
			var selections = Ext.getCmp('vendorGridPanelId').getSelectionModel().getSelections();
			if(selections<=0){
					Ext.Msg.alert('提示', '请选择供应商！');
					return;
			}
			var vendorIds = "";
			for(var i=0;i<selections.length;i++){
					vendorIds = vendorIds + "'" + selections[i].get('vendorID') + "'";
					if(i<selections.length-1){
						vendorIds = vendorIds + ',';
					}
			} 
				Ext.MessageBox.confirm('删除指定供应商信息', '删除的指定供应商信息无法恢复，是否继续？　',
					function(btn, text) {
						if (btn == 'yes') {
							Ext.Ajax.request({
								url : '../JSON/vendor_VendorRemote.DeleteVendorMaterials',
								method : 'POST',
								success : function(response, options) {
									 Ext.Msg.alert('提示', '删除指定供应商信息成功！');
									 vendorAction.callBack();
									 window.close();
								},
								failure : function() {
									Ext.Msg.alert('提示', '数据获取错误！');
								},
								disableCaching : true,
								autoAbort : true,
								params : {
									vendors : vendorIds,
									materials : materialIds
								}
							})
						}
					}); 
			
		}		
	}, {
		text : '取消',
		handler : function() {
			window.close();
		}
	}]
	var window = new Ext.Window( {
		id : "materialItemwind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '删除指定供应商信息',
		modal : true,
		items : vendorGrid.gridPanel(materialIds),
		border : true,
		closeAction : 'close'
	});
	return window;
}

vendorAction.callBack = function(){
	Ext.getCmp("materialGridPanelIdLocal").store.reload(); 
}


//点击数量弹出的指定供应商信息
vendorAction.showVendorInfoWin = function(inputMaterialid){
    inputMaterialid = "'"+inputMaterialid+"'";//变换下格式,两边加单引号
	
 	var buttons = [
 		/*{
			text : ' 确定 ',
			handler : function(){}		
		}, */{
			text : '取消',
			handler : function() {
				window.close();
			}
		}
	];
	
	
	
	var window = new Ext.Window( {
		id : "materialItemWindow",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '指定供应商信息',
		modal : true,
		items : vendorGrid.gridPanel(inputMaterialid),
		border : true,
		closeAction : 'close'
	});
	window.show();
	//return window;
}



















//回调
vendorAction.delCallBack = function(r){
	if(r){
		var grid = Ext.getCmp('venderRegisterGridPanelId'); 
				grid.store.baseParams = {start :0 ,limit : 20};
				grid.store.load();
	} else {
		Ext.Msg.alert('提示','服务器忙，请稍候重试！');
	}
} 

//上传
vendorAction.upload = function() {
	var win = vendorAction.fileUploadForm();
	win.show();
}
vendorAction.fileUploadForm = function(rd) {
	var items = [ {
		xtype : "textfield",
		fieldLabel : '上传文件',
		name : 'file',
		inputType : 'file',
		allowBlank : false
	} ];
	var inform = new Ext.FormPanel( {
		id : 'vendorFileUploadForm',
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
			if (!inform.form.isValid()) return;			
			var fileName = inform.form.findField('file').getValue().toLowerCase().trim();
			if (fileName.lastIndexOf('.') == -1) {
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
				url : '../VendorUploadServlet',
				method : 'POST',
				success : function(form, action) {
					form.reset();
					window.close();
					if(action.result.ImportExcelVo.redupObjs == ''){
						Ext.Msg.alert('提示', '上传数据成功！');
					} else {
						var cm = new Ext.grid.ColumnModel([
   							{header:'供应商名称',dataIndex:'vendorName'}
   						]);
   						var showMessage = action.result.ImportExcelVo.redupObjs;
   						var data = {id : 0,root : showMessage };
   						var reader = new Ext.data.JsonReader({id:'id',root:'root'},
   							['vendorName']);
   						var store = new Ext.data.Store({
   							proxy : new Ext.data.MemoryProxy(data),
   							reader : reader
   						});
   						store.load();						
   						var win = new Ext.Window({
   							title : '&nbsp;系统已存在的供应商信息',
   							width : 320,
   							height : 300,
   							layout : 'fit',
   							autoScroll : true,
   							items : new Ext.grid.GridPanel({store:store,cm:cm,loadMask : {msg:'正在加载数据，请稍后...'}})
   						});
   						win.show();
					}
					var grid = Ext.getCmp('venderRegisterGridPanelId'); 
					grid.store.baseParams = {start :0 ,limit : 20};
					grid.store.load();
				},
				failure : function(form, action){
					window.close();
					form.reset();
					Ext.Msg.alert('提示', action.result.ImportExcelVo.returnMsg);
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
		id : "vendorFileUploadWind",
		layout : 'fit',
		width : 300,
		height : 100,
		title : '&nbsp;供应商信息-上传',
		modal : true,
		items : inform,
		buttons : buttons
	});
	return window;

}

/**
 * 下载供应商信息模板
 * 此地需要替换supplierMessage.properties配置文件的地址
 */
vendorAction.download = function(){
	Ext.Ajax.request({
		url:'../JSON/vendor_VendorRemote.DownloadSupplierMessage',
		method:'POST',
		success:function(response,options){
			 window.location.href = response.responseText;
		},
		disableCaching:true,
		autoAbort:true
	});
	
}
/**
 * 物资查询
 */
vendorAction.getSearchForm = function(){ 
	var buttons = [ {
		text : ' 查询 ',
		handler : function() {
			var materialItemName = Ext.getCmp("materialItemName").getValue();//物资名称
			var materialitemcode = Ext.getCmp("materialitemcode").getValue();//物资编码
			var desingnation = Ext.getCmp("desingnation").getValue();//物资牌号
			var materialStandard = Ext.getCmp("materialStandard").getValue();//物资规格
			var demension = Ext.getCmp("demension").getValue();//量纲(单位)
			var technicCondition = Ext.getCmp("technicCondition").getValue(); //技术条件
			var parentidName = Ext.getCmp("parentidName").getValue();//物资大类
			var materialcatalogName = Ext.getCmp("materialcatalogName").getValue();//物资大类
			var selectType = "select"; //有条件的查询
		 	Ext.getCmp("materialGridPanelIdLocal").store.baseParams={
		 	                                                         start:0,limit:20,
		 	                                                         materialItemName:materialItemName,
		 	                                                         materialitemcode:materialitemcode,
		 	                                                         desingnation:desingnation,
		 	                                                         materialStandard:materialStandard,
		 		                                                     demension:demension,
		 		                                                     technicCondition:technicCondition,
		 		                                                     parentidName:parentidName,
		 		                                                     materialcatalogName:materialcatalogName,
		 		                                                     selectType:selectType
		 		                                                     };
			Ext.getCmp("materialGridPanelIdLocal").store.load(); 
			materialItemForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
			materialItemForm.getForm().reset();
			window.close();
		}
	} ];;

	var item = [
	{
		layout : 'column',
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 85
		},
		items : [{
				columnWidth : .49,
				width : 700,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '物资编码',
					xtype : 'textfield',
					id : 'materialitemcode',
					anchor : '90%'
				}
				 ]
			},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '物资名称',
					xtype : 'textfield',
					id : 'materialItemName',
					anchor : '90%'
				} ]
		}]
	},
		
			
	{
		layout : 'column',
		width : 700,
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 85
		},
		items : [{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [{
				fieldLabel : '物资牌号',
				xtype : 'textfield',
				id : 'desingnation',
				anchor : '90%'
			}]
		},{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [{
					fieldLabel : '物资规格',
					xtype : 'textfield',
					id : 'materialStandard',
					anchor : '90%'
			}]
		}]
	},
	
	
	
	{

		layout : 'column',
		width : 700,
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 85
		},
		items : [{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [{
			    fieldLabel : '量纲(单位)',
				xtype : 'textfield',
				id : 'demension',
				anchor : '90%'
			}]
		},{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [{
						fieldLabel : '技术条件',
						xtype : 'textfield',
						id : 'technicCondition',
						anchor : '90%'
			}]
		}]
	},
	
	
	
	
	
	{
		layout : 'column',
		width : 700,
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 85
		},
		items : [{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [{
					fieldLabel : '物资大类',
					xtype : 'textfield',
					id : 'materialcatalogName',
					anchor : '90%'
				}]
		 },{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [{
					fieldLabel : '物资小类',
					xtype : 'textfield',
					id : 'parentidName',
					anchor : '90%'
				}]
		 }]
	}];

	
	//表单
	var materialItemForm = new Ext.form.FormPanel({
		padding : 5,
		buttonAlign:'center',
		layout : 'column',
		autoScroll : true,
		width : 700,
	    autoHeight:true,
		items : [item]
	});
	
	var window = new Ext.Window( {
		id : "materialItemwind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '查询',
		modal : true,
		items : materialItemForm,
		border : true,
		closeAction : 'close'
	});
	return window;



}
