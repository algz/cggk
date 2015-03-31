var declareDetailAction={
	win : null
}



//新增
declareDetailAction.add = function(){ 
	declareDetailForm.getForm().show();
	var store = Ext.getCmp("materialGrid").getStore();
	store.baseParams ={start : 0,limit :20};
	store.load();
}
//修改
declareDetailAction.update = function(){
	var records = Ext.getCmp('declareDetailGridPanel').selectObj;
	
	if (records == null || records.length != 1) { 
		Ext.Msg.alert('提示', '请选择一条数据');
		return;
	}  
	win = new hd.investment.purchaseRequest.declareDetail.win.window();
	win.show();
	var form =  Ext.getCmp('declareDetailUpdateForm');
		form.getForm().loadRecord(records[0]);
}
// 修改后保存表单数据
declareDetailAction.save = function(window, closeWin){
	var inform = Ext.getCmp('declareDetailUpdateForm');  
	if(inform.form.isValid()) {
		inform.form.findField('declareId').setValue(declareAction.declareId);
//		inform.form.doAction('submit',{
//			waitMsg:'正在保存数据，请稍候...',
//			waitTitle:'提示',
//		    url : '../FILEUP/',//这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
//			method : 'post',
//			success : function(form, action) {//在这处理逻辑。
						var remote = Seam.Component.getInstance("declareDetail_DeclareDetailRemote"); 
						var materialid = new Array(); 
						var declareDetailId = ""; 
						var quantity = new Array();
					    var use1 = new Array();
					    var useDate  = new Array(); 
					    var amount  = new Array();
					    var declareType  = new Array();
					    var materialCatalogName  = new Array(); 
					    var fileName = new Array();
					    var fileId  = new Array();
					    var reportType = new Array();
					    var taskno=new Array();
					    var remark=new Array();
					    var contactPerson=new Array();
					    var contactTelephone=new Array();
//						var fileId1 = action.result.fileId;
//						if(fileId1==null || fileId1=="")
//							fileId1 = inform.form.findField('fileId').getRawValue();
						fileId.push("");
//						var	fileName1 = action.result.fileName;  
//						if(fileName1 || fileName1=="")
//							fileName1 = inform.form.findField('fileName').getRawValue();
						fileName.push("");
						var	declareId = inform.form.findField('declareId').getRawValue();
						var	declareDetailId = inform.form.findField('declareDetailId').getRawValue();
						materialid.push(inform.form.findField('materialid').getRawValue());
						quantity.push(inform.form.findField('quantity').getRawValue());
						useDate.push(inform.form.findField('useDate').getRawValue());
						use1.push(inform.form.findField('use').getRawValue());
						amount.push(inform.form.findField('amount').getRawValue()); 
						declareType.push(inform.form.findField('declareType').getRawValue()); 
						materialCatalogName.push(inform.form.findField('materialCatalogName').getRawValue());  
//						reportType.push(inform.form.findField('reportType').getRawValue());  
						reportType.push("");  
						taskno.push(inform.form.findField('taskno').getRawValue());
						remark.push(inform.form.findField('remark').getRawValue());
						contactPerson.push(inform.form.findField('contactPerson').getRawValue());
						contactTelephone.push(inform.form.findField('contactTelephone').getRawValue());
						
						remote.saveDeclareDetail(declareId, declareDetailId, materialid, quantity, use1, useDate, amount, declareType, materialCatalogName, fileName, 
						fileId,reportType,remark,taskno,contactPerson,contactTelephone,DeclarationMaterial.param1,DeclarationMaterial.param2, function(result){
									inform.getForm().reset();
									if(closeWin) window.close();
									 
									if(declareAction.declareId==null){
										var purchaseRequestDeclareGridPanel = Ext.getCmp('PurchaseRequestDeclareGridPanel');						
										purchaseRequestDeclareGridPanel.store.load();
									}else{
										var grid = Ext.getCmp('declareDetailGridPanel');				
										grid.store.load();
									}
						}); 				 
//				},
//				failure : function(form, action) {
//						Ext.Msg.alert('提示',"保存失败");
//				}
//		})
	
	}
}
//删除
declareDetailAction.remove = function(){
	var records = Ext.getCmp('declareDetailGridPanel').selectObj;
	
	if (records == null || records.length < 1) {
		Ext.Msg.alert('提示', '请选择你要删除的记录！');
		return;
	}
	Ext.MessageBox.confirm('删除申报明细记录', 
			'删除的申报明细记录无法恢复，是否继续？　', function(btn, text){
		if(btn == 'yes'){
			var arr = new Array();
			for ( var i = 0; i < records.length; i++) {
				arr.push(records[i].get('declareDetailId'));
			}
			callSeam("declareDetail_DeclareDetailRemote", "deleteDeclareDetails", [ arr ],
					declareDetailAction.deleteCallBack);
		}
	});

}

//删除回调
declareDetailAction.deleteCallBack = function(r){
	if (r) {
		var result = Ext.util.JSON.decode(r);
		if(result.success == false){
			Ext.Msg.alert('提示', '删除失败！');
		} else {
			var grid = Ext.getCmp('declareDetailGridPanel');				
			grid.store.load(); 
			Ext.Msg.alert('提示', '删除成功！');
		}		
	} else {
		Ext.Msg.alert('提示', '服务器忙，请稍候重试！');
	}
}
declareDetailAction.showUploadForm = function(rowIndex){
	var items = [
				{
	        	   xtype:'fileuploadfield',
	    		   id:'form-file',
	    		   fieldLabel : '报告文件',
	    		   name : 'fileName',
	    		   anchor : '95%',
	    		   width : '350',
	    		   buttonText:'浏览...',
	    		   allowBlank:false,
	    		   blankText:'报告文件不能为空！' 
	        	},{
	        		xtype :'textfield',
	        		name : 'fileId', 
	        		hidden: true 
	             }];

	var inform = new Ext.FormPanel( {
		id : 'UploadForm',
		buttonAlign : 'center',
		labelAlign : 'left',
		width : 370,
		height : 30,
		frame : false,
		border : false,
		items : items,
		fileUpload : true,
		padding : 5 
	});  
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {
			if (inform.form.isValid()) {  
				inform.form
				.doAction(
						'submit',
						{
							waitMsg : '正在保存数据，请稍候...',
							waitTitle : '提示',
							url : '../FILEUP/',//这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
							method : 'post',
							success : function(form, action) {//在这处理逻辑。 
									var fileId = action.result.fileId;
									if(fileId==null || fileId=="")
										fileId = inform.form.findField('fileId').getRawValue();
									var	fileName = action.result.fileName;  
									if(fileName || fileName=="")
										fileName = inform.form.findField('fileName').getRawValue(); 
									if(fileName.indexOf("\\")!=-1)
									    fileName = fileName.substring(fileName.lastIndexOf("\\")+1);
									var records = Ext.getCmp('materialGrid').getSelectionModel().getSelections();
									records[0].set('fileName',fileName); 
									records[0].set('fileId',fileId); 
									window.close();
							},
							failure : function(form, action) {
								Ext.Msg.alert('提示',"上传失败");
							}
						});
			}

		}
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ]

	var window = new Ext.Window( {
		id : "tenderTaskFormAddWind",
		width : 350,
		layout : 'fit',
		autoScroll : true,
		title : '可行性/需求报告上传',
		modal : true,
		items : inform,
		border : true,
		buttons : buttons,
		closeAction : 'hide'
	});
	return window;

}
/**
 * 物资查询
 */
declareDetailAction.getSearchForm = function(){ 
	var buttons = [ {
		text : ' 查询 ',
		handler : function() {
			var materialItemName = Ext.getCmp("materialItemName").getValue();
			var materialitemcode = Ext.getCmp("materialitemcode").getValue();
			var materialStandard = Ext.getCmp("materialStandard").getValue();
			var demension = Ext.getCmp("demension").getValue();
			var technicCondition = Ext.getCmp("technicCondition").getValue(); 
		 	Ext.getCmp("materialGrid").store.baseParams={start:0,limit:20,materialItemName:materialItemName,materialitemcode:materialitemcode,materialStandard:materialStandard,demension:demension,technicCondition:technicCondition};
			Ext.getCmp("materialGrid").store.load(); 
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
					fieldLabel : '物资编号',
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
	},{

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
			items : [ {
				fieldLabel : '规格',
				xtype : 'textfield',
				id : 'materialStandard',
				anchor : '90%'
			} ]
	},{
		columnWidth : .49,
		layout : 'form',
		border : false,
		items : [ {fieldLabel : '单位',
				xtype : 'textfield',
				id : 'demension',
				anchor : '90%'}
		 ]
	}]
	
	},{
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
				items : [ {
					fieldLabel : '技术条件',
					xtype : 'textfield',
					id : 'technicCondition',
					anchor : '90%'
				} ]
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
