//材料定额
var materialQuota = {
	materialQuotaId : null
};
//材料定额grid
materialQuota.gridPanel = function() {

	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	if (materialQuotaMain.useType == 0) {
		var store = new Ext.data.Store(
				{
					proxy : new Ext.data.HttpProxy(
							{
								url : '../JSON/materialQuota_MaterialQuotaRemote.getAllMaterialQuotaVos?d='
										+ new Date(),
								method : 'post'
							}),
					reader : new Ext.data.JsonReader( {
						root : 'results',
						id : 'id',
						totalProperty : 'totalProperty'
					}, [ 'QSJH','ZZJH','CLDM','CLMC','CLPH','CLGG','JSTJ','QJDE','QJPSDE','JLDWMC',
							'remarks','qutoId','importtime'/*,
					        'materialQuotaId', 'materialItemName', 'desingnation',
							'materialStandard', 'materialCount', 'demension',
							'technicCondition', 'remarks' */])
				});

		var cm = new Ext.grid.ColumnModel( [ sm, rm, {
			header:'起始架号',
		    dataIndex:'QSJH'
		},{
			header:'终止架号',
		    dataIndex:'ZZJH'
		},{
			header:'材料代码',
		    dataIndex:'CLDM'
		},{
			header:'材料名称',
		    dataIndex:'CLMC'
		},{
			header:'材料牌号',
		    dataIndex:'CLPH'
		},{
			header:'材料规格',
		    dataIndex:'CLGG'
		},{
			header:'技术条件',
		    dataIndex:'JSTJ'
		},{
			header:'全机定额',
		    dataIndex:'QJDE'
		},{
			header:'全机批次定额',
		    dataIndex:'QJPSDE'
		},{
			header:'计量单位名称',
			dataIndex:'JLDWMC'
		}, {
			header : '修改记录',
			dataIndex : 'remarks',
			width : 100,
			sortable : true,
			renderer : function(value, cellmeta, record, rowIndex){
				var remarks = record.get('remarks');
				var qutoId = record.get('qutoId');
				if(remarks==0){
					return 0;
				}else{
					return "<a href='javascript:void(0);' " +
							"onclick=materialQuota.createRecordDetailWindow('"+qutoId+"')>" +
									"<font color='blue'>"+remarks+"</font>" +
							"</a>";
				}
			}
		},{
			header : '导入时间',
			dataIndex : 'importtime',
			width : 100,
			sortable : true
		}/*,{
			header : '材料名称',
			dataIndex : 'materialItemName',
			width : 100,
			sortable : true
		}, {
			header : '牌号',
			dataIndex : 'desingnation',
			width : 100,
			sortable : true
		}, {
			header : '规格',
			dataIndex : 'materialStandard',
			width : 100,
			sortable : true
		}, {
			header : '数量',
			dataIndex : 'materialCount',
			width : 100,
			sortable : true
		}, {
			header : '计量单位',
			dataIndex : 'demension',
			width : 100,
			sortable : true
		}, {
			header : '技术条件',
			dataIndex : 'technicCondition',
			width : 100,
			sortable : true
		} */]);

		var tbar = ['-',{
				xtype : 'button',
				text : '导入',
				handler : function(){
					materialQuota.createImportWindow();
				}
			},'-',{
				xtype : 'button',
				text : '新增',
				handler : function(){
					materialQuota.createAddWindow();
				}
			},'-',{
				xtype : 'button',
				text : '修改',
				handler : function(){
					var grid = Ext.getCmp('materialQuotaPanelId');
			 		var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
			 		if(rows.length == 1){
						materialQuota.createEditWindow(rows[0].data);
					}else{
						Ext.MessageBox.alert('提示', '请选择一条记录!'); 
						return;
					}
				}
			},'-',{
				xtype : 'button',
				text : '删除',
				handler : function(){
					var grid = Ext.getCmp('materialQuotaPanelId');
			 		var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
			 		if(rows.length > 0){
			 			var id = "";
			 			for(i = 0;i < rows.length;i++){   
							id = id + rows[i].get('qutoId') + ",";
							var remarks = rows[i].get('remarks');
							if(remarks != 0){
								Ext.MessageBox.alert('提示', '请选择无修改记录的数据!'); 
								return;
							}
						}
//			 			获取所有选中的材料定额id
						materialQuota.deleteMaterialQuota(id);
					}else{
						Ext.MessageBox.alert('提示', '请选择要删除的记录!'); 
						return;
					}
				}
			},'-',
			'物资编码',{xtype:'textfield',id:'itemcode',width:80},
			'物资名称',{xtype:'textfield',id:'itemName',width:70},
			'物资规格',{xtype:'textfield',id:'standard',width:70},
			'技术条件',{xtype:'textfield',id:'technicCondition',width:70}
			,{
				xtype : 'button',
				text : '查询',
				handler : function(){
					var store=Ext.getCmp('materialQuotaPanelId').getStore()
					store.load({params:{
						materialitemcode:Ext.getCmp('itemcode').getValue(),
						materialItemName:Ext.getCmp('itemName').getValue(),
						materialStandard:Ext.getCmp('standard').getValue(),
						technicCondition:Ext.getCmp('technicCondition').getValue()
					}});
				}
			}
			];
		var grid = common.gridPanel('materialQuotaPanelId', cm, store, tbar,
				true, sm, '材料定额列表'); 
		store.load();

		return grid;
	}

}
//材料定额tab
materialQuota.tabPanel = function() {
	var tab = new Ext.Panel( {
		title : '物料定额',
		id : 'materialQuotaTab',
		layout : 'fit',

		items : [ materialQuota.gridPanel() ],
		listeners : {
			'activate' : function() {
				materialQuotaMain.useType = 0;
			
			}
		}
	});

	return tab;
};
//创建材料定额导入窗口
materialQuota.createImportWindow = function(){
	
	var inform = new Ext.FormPanel( {
		id : 'materialQuotaFileUploadForm',
		buttonAlign : 'center',
		labelAlign : 'left',
		padding : 5,
		fileUpload : true,
		labelWidth : 70,		
		frame : false,
		items : [{
				xtype : "textfield",
				fieldLabel : '上传文件',
				name : 'uploadfile',
				inputType : 'file',
				id: 'uploadfile',
				allowBlank : false
		}]
	});
	var win = new Ext.Window({
		title : '材料定额-导入',
		width : '320',
		items : [inform],
		modal : true,
		border : true,
		bodyStyle:'background:#fff;',
		resizable: false,  
		buttonAlign : 'center',
		buttons : [{
			text:' 保存 ',
			handler: function(){
				materialQuota.fileUploadSubmit(win,inform);
			}
		},{
			text:' 关闭 ',
			handler : function(){win.close()}
		}]
	});
	win.show();
};
//文件上传
materialQuota.fileUploadSubmit = function(win,inform){
	if (!inform.form.isValid()) return;			
	var fileName = inform.form.findField('uploadfile').getValue().toLowerCase().trim();
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
		url : '../MaterialQuotaUploadServlet?d='+new Date(),
		method : 'post',
		success : function(form, action) {//成功提示，刷新计划大纲grid
			var showMessage = action.result.ImportExcelVo.returnMsg+'!';
			Ext.Msg.alert('提示', showMessage);
			form.reset();
			win.close();
			//刷新机型树数据
			var treePanel = Ext.getCmp('tpanel1');
			treePanel.loader.dataUrl = '../ProductJsonServlet?parentId=0&type=2';  
			treePanel.root.reload();  
			var grid = Ext.getCmp('materialQuotaPanelId');
			grid.store.load();

		},
		failure : function(form,action){//上传失败，错误信息反馈
			var showMessage = action.result.ImportExcelVo.returnMsg+'!';
			Ext.Msg.alert('提示', showMessage);
			form.reset();//重置form
			win.close();//关闭原窗口
//			var data1 = action.result.ImportExcelVo.noExistProducts;
//			var store1 = findStore(data1);
//			store1.load();
//			
//			var data2 = action.result.ImportExcelVo.bankExistProducts;
//			var store2 = findStore(data2);
//			store2.load();
//			
//			if(data1.length<1&&data2.length<1){
//				var showMessage = action.result.ImportExcelVo.returnMsg+'!';
//				Ext.Msg.alert('提示', showMessage);
//			}else{
//				var win = errorMessageWin(store1,store2);
//				win.show();
//			}
		}
	
	});
}
//数据修改
materialQuota.createEditWindow = function(data){
	var inform = new Ext.FormPanel( {
		id : 'materialQuotaEditForm',
		buttonAlign : 'center',
		labelAlign : 'left',
		padding : 5,
		fileUpload : true,
		labelWidth : 70,		
		frame : false,
		items : [{
			xtype : 'hidden',
			name : 'mqid',
			id : 'mqid',
			value : data.qutoId
		},{
			xtype : "textfield",
			fieldLabel : '材料代码',
			name : 'CLDM',
			id: 'CLDM',
			allowBlank : false,
			value : data.CLDM,
			disabled : true
			
		},{
			xtype : "textfield",
			fieldLabel : '全机定额',
			name : 'QJDE',
			id: 'QJDE',
			allowBlank : false,
			value : data.QJDE
		},{
			xtype : "textfield",
			fieldLabel : '修改原因',
			name : 'editreason',
			width : 200,
			id: 'editreason',
			allowBlank : false
		}]
	});
	var win = new Ext.Window({
		title : '材料定额-导入',
		width : '320',
		items : [inform],
		modal : true,
		border : true,
		bodyStyle:'background:#fff;',
		resizable: false,  
		buttonAlign : 'center',
		buttons : [{
			text:' 保存 ',
			handler: function(){
				materialQuota.saveMaterialQuotaRecord(win,inform);
			}
		},{
			text:' 关闭 ',
			handler : function(){win.close()}
		}]
	});
	win.show();
}

materialQuota.saveMaterialQuotaRecord = function(win,inform){
	if(!inform.getForm().isValid()){return ;}
	var data = inform.getForm().getValues();
	Ext.Ajax.request({  
		url: '../JSON/materialQuota_MaterialQuotaRemote.saveMaterialQuotaRecord?d='+new Date(),  
		params: {
			QJDE : data.QJDE,
			mqid :data.mqid,
			editreason : data.editreason
		},
		success : function(response, opts) {
			var obj = Ext.decode(response.responseText);
			if (obj.success == true) {
				Ext.MessageBox.hide();
				if(Ext.Msg.alert('提示','保存成功!')){
					win.close();
					var grid = Ext.getCmp('materialQuotaPanelId');
					grid.store.load();
				}
			}else{
				Ext.Msg.alert("提示","数据异常，请与管理员联系。")
			}
		}
	});
}

materialQuota.createRecordDetailWindow = function(mid){
	
	var rm = new Ext.grid.RowNumberer();

	var store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/materialQuota_MaterialQuotaRemote.getAllMaterialQuotaRecordVos',
			method : 'post'
		}),
		baseParams : {
			mqid : mid,
			start : 0,
			limit : 20
		},
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'id',
			totalProperty : 'totalProperty'
		}, ['editreason','edittime','editperson'])
	});

	var cm = new Ext.grid.ColumnModel( [ rm, {
		header:'修改原因',
	    dataIndex:'editreason'
	},{
		header:'修改时间',
	    dataIndex:'edittime'
	},{
		header:'修改负责人',
	    dataIndex:'editperson'
	}]);
	var paging = new Ext.PagingToolbar({
		store : store,
		pageSize : 20,
		displayInfo : true,
		displayMsg : '第 {0} 到 {1} 条，一共  {2} 条',
		emptyMsg : '没有记录'
	}); 
	var grid = new Ext.grid.GridPanel({
			layout : 'fit',
			id : 'materialQuotaRecordGrid',
			autoScroll : true,
			height : 300,
			cm : cm, 
			columnLines : true,
			stripeRows : true,
			bbar : paging,
			region : 'center',
			store : store,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    }
	}); 
	store.load();
	var win = new Ext.Window({
		title : '材料定额修改记录明细',
		width : '400',
		items : [grid],
		modal : true,
		border : true,
		autoScroll:false,
		autoDestroy: true,
		bodyStyle:'background:#fff;',
		resizable: false,  
		buttonAlign : 'center'
	});
	win.show();
}

materialQuota.createAddWindow = function(){
	var JxStore =  new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : '../JSON/materialQuota_MaterialQuotaRemote.getAllJx?d='+new Date(),
					method : 'post'
				}),
		reader : new Ext.data.JsonReader({
				root : 'results',
				id : 'idd',
				totalProperty : 'totalProperty'
		}, ['JX']) 
	});
	var inform = new Ext.FormPanel( {
		id : 'materialQuotaAddForm',
		buttonAlign : 'center',
		labelAlign : 'left',
		padding : 5,
		fileUpload : true,
		labelWidth : 70,		
		frame : false,
		items : [{
			xtype : 'hidden',
			name : 'materialid',
			id : 'materialid'
		},{
			xtype : "textfield",
			fieldLabel : '物资代码',
			name : 'CLDM',
			id: 'CLDM',
			allowBlank : false,
			listeners : {
				focus : function(field) {
					materialQuota.getMaterialWin()
							.show();
				}
			}
		},{
			xtype : "textfield",
			fieldLabel : '物资名称',
			name : 'CLMC',
			id: 'CLMC',
			allowBlank : false
		},{
			xtype : "textfield",
			fieldLabel : '物资牌号',
			name : 'CLPH',
			id: 'CLPH'
		},{
			xtype : "textfield",
			fieldLabel : '物资规格',
			name : 'CLGG',
			id: 'CLGG'
		},{
			xtype : "textfield",
			fieldLabel : '技术条件',
			name : 'JSTJ',
			id: 'JSTJ'
		},{
			xtype : "textfield",
			fieldLabel : '计量单位',
			name : 'JLDWMC',
			id: 'JLDWMC'
		},{
			xtype : 'combo',
			fieldLabel : '机型',
			width : 125,
			name : 'JX',
			id : 'JX',
			displayField : 'JX',
			valueField : 'JX',
			allowBlank : false,
			typeAhead: true,
			selectOnFocus:true,
			emptyText : '请选择',
			triggerAction : 'all',
			store : JxStore
		},{
			xtype : 'numberfield',
			fieldLabel : '起始架号',
			name : 'QSJH',
			decimalPrecision : 0,
			id : 'QSJH'
		},{
			xtype : 'numberfield',
			fieldLabel : '终止架号',
			name : 'ZZJH',
			decimalPrecision : 0,
			id : 'ZZJH'
		},{
			xtype : "numberfield",
			fieldLabel : '全机定额',
			name : 'QJDE',
			id: 'QJDE',
			decimalPrecision : 5,
			allowBlank : false
		}]
	});
	var win = new Ext.Window({
		title : '材料定额-新增',
		width : '320',
		items : [inform],
		modal : true,
		border : true,
		bodyStyle:'background:#fff;',
		resizable: false,  
		buttonAlign : 'center',
		buttons : [{
			text:' 保存 ',
			handler: function(){
				materialQuota.saveMaterialQuota(win,inform);
			}
		},{
			text:' 关闭 ',
			handler : function(){win.close()}
		}]
	});
	win.show();

}
materialQuota.saveMaterialQuota = function(win,inform){
	if(!inform.getForm().isValid()){return ;}
	var data = inform.getForm().getValues();
	Ext.Ajax.request({  
		url: '../JSON/materialQuota_MaterialQuotaRemote.saveMaterialQuota?d='+new Date(),  
		params: {
			CLDM : data.CLDM,
			CLMC : data.CLMC,
			CLPH : data.CLPH,
			CLGG : data.CLGG,
			JSTJ : data.JSTJ,
			JLDWMC : data.JLDWMC,
			JX : data.JX,
			QSJH : data.QSJH,
			ZZJH : data.ZZJH,
			QJDE : data.QJDE,
			materialid : data.materialid
		},
		success : function(response, opts) {
			var obj = Ext.decode(response.responseText);
			if (obj.success == true) {
				Ext.MessageBox.hide();
				if(Ext.Msg.alert('提示',obj.msg)){
					win.close();
					//刷新机型树数据
					var treePanel = Ext.getCmp('tpanel1');
					treePanel.loader.dataUrl = '../ProductJsonServlet?parentId=0&type=2';  
					treePanel.root.reload();  
					var grid = Ext.getCmp('materialQuotaPanelId');
					grid.store.load();
				}
			}else{
				Ext.Msg.alert("提示","数据异常，请与管理员联系。")
			}
		}
	});
}
materialQuota.deleteMaterialQuota = function(id){
	Ext.Msg.confirm("提示","是否确定删除?",function(btn){
		if(btn == 'yes'){
			Ext.Ajax.request({
				url : "../JSON/materialQuota_MaterialQuotaRemote.deleteMaterialQuota",
				params : {
						qutoId : id
				},
				success : function(response, opt) {
					var obj = Ext.decode(response.responseText);
					var value = response.responseText;
					if (obj.success == true){
						Ext.MessageBox.hide();
	    				if(Ext.Msg.alert('提示','删除成功!')){
	    					var treePanel = Ext.getCmp('tpanel1');
							treePanel.loader.dataUrl = '../ProductJsonServlet?parentId=0&type=2';  
							treePanel.root.reload();  
	    					var grid = Ext.getCmp('materialQuotaPanelId');
							grid.store.load();
	    				}
					}else{
						Ext.Msg.alert("提示","数据异常，请与管理员联系。")
					}
				},
				disableCaching : true,
			    autoAbort : true
			});
		}
		
	});
}

materialQuota.getMaterialWin = function(){
	
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel({
				singleSelect : true
			});
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							// url :
							// '../JSON/registrationRemote.getGridDataByContract?d='
							// + new Date(), 试运行还得使用
//							url : '../JSON/material_MaterialRemote.getAllByRoles?d='
//									+ new Date(),
						url : '../JSON/material_MaterialRemote.getAll?d='+new Date(),
						method : 'POST'
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							id : 'materialid',
							totalProperty : 'totalProperty'
						}, [ // 'itemId', 'itemName',
						'desingnation', 'materialStandard', 'demension',
								'itemCode', 'purchaseNum', 'materialItemName',
								'materialitemcode', 'materialid','technicCondition']),
				autoLoad : true,
				baseParams : {
					start : 0,
					limit : 20
				}
			});
	var cm = new Ext.grid.ColumnModel([sm, rm, {
				header : '物资编码',
				// dataIndex : 'itemCode',试运行后使用
				dataIndex : 'materialitemcode',
				width : 100,
				sortable : true
			}, {
				header : '物资名称',
				// dataIndex : 'itemName',试运行后使用
				dataIndex : 'materialItemName',
				width : 100,
				sortable : true
			}, {
				header : '物资牌号',
				dataIndex : 'desingnation',
				width : 100,
				sortable : true
			}, {
				header : '物资规格',
				dataIndex : 'materialStandard',
				width : 100,
				sortable : true
			}, {
				header : '技术条件',
				dataIndex : 'technicCondition',
				width : 100,
				sortable : true
			},{
				header : '单位',
				dataIndex : 'demension',
				width : 100,
				sortable : true
			}]);
	var toolbar = ['-', {
				text : '查询',
				iconCls : 'search1',
				handler : function() {
					materialQuota.getSearchForm('MaterialGridPanelId1')
							.show();
				}
			}];
	var grid = new Ext.grid.GridPanel({
				id : 'MaterialGridPanelId1',
				cm : cm,
				sm : sm,
				store : store,
				autoScroll : true,
				height : 300,
				tbar : toolbar,
				autoWidth : true,
				columnLines : true,
				loadMask : {
					msg : '数据加载中...'
				},
				stripeRows : true,
				viewConfig : {
					enableRowBody : true
				},
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'

						})
			});
	// store.baseParams={start:0,limit:20,contractId:registrationNonMetallicForm.contractId,materialType:"2"}
	// store.load();

	var buttons = [{
		text : ' 确定 ',
		handler : function() {
			var record = Ext.getCmp("MaterialGridPanelId1").getSelectionModel()
					.getSelected();
			if (record == null) {
				Ext.Msg.alert('提示', '请选择一条记录！');
				return;
			}
			//Ext.getCmp('materialid').setValue(record.get('materialid'));
			Ext.getCmp('CLDM').setValue(record
					.get('materialitemcode'));
			Ext.getCmp('CLMC').setValue(record
					.get('materialItemName'));
			Ext.getCmp('CLPH').setValue(record
					.get('desingnation'));
			Ext.getCmp('CLGG').setValue(record
					.get('materialStandard'));
			Ext.getCmp('JSTJ').setValue(record
					.get('technicCondition'));
			Ext.getCmp('JLDWMC').setValue(record
					.get('demension'));
			Ext.getCmp('materialid').setValue(record
					.get('materialid'));
			window.close();
		}
	}, {
		text : '取消',
		handler : function() {
			window.close();
		}
	}]
	var window = new Ext.Window({
				id : "MaterialAddWind1",
				width : 700,
				layout : 'fit',
				autoScroll : true,
				title : '物资信息列表',
				modal : true,
				items : grid,
				border : true,
				buttons : buttons,
				closeAction : 'close'
			});
	return window;

}

materialQuota.getSearchForm = function(name) {
	var buttons = [{
		text : ' 查询 ',
		handler : function() {
			var materialItemName = Ext.getCmp("materialItemName_search")
					.getValue();
			var materialitemcode = Ext.getCmp("materialitemcode_search")
					.getValue();
			var materialStandard = Ext.getCmp("materialStandard_search")
					.getValue();
			var demension = Ext.getCmp("demension_search").getValue();
			var technicCondition = Ext.getCmp("technicCondition_search")
					.getValue();
			Ext.getCmp(name).store.baseParams = {
				start : 0,
				limit : 20,
				materialItemName : materialItemName,
				materialitemcode : materialitemcode,
				materialStandard : materialStandard,
				demension : demension,
				technicCondition : technicCondition
			};
			Ext.getCmp(name).store.load();
			// materialItemForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
//			materialItemForm.getForm().reset();
			window.close();
		}
	}];;

	var item = [{
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
							items : [{
										fieldLabel : '物资编号',
										xtype : 'textfield',
										id : 'materialitemcode_search',
										anchor : '90%'
									}]
						}, {
							columnWidth : .49,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '物资名称',
										xtype : 'textfield',
										id : 'materialItemName_search',
										anchor : '90%'
									}]
						}]
			}, {

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
										fieldLabel : '规格',
										xtype : 'textfield',
										id : 'materialStandard_search',
										anchor : '90%'
									}]
						}, {
							columnWidth : .49,
							layout : 'form',
							border : false,
							items : [{
										fieldLabel : '单位',
										xtype : 'textfield',
										id : 'demension_search',
										anchor : '90%'
									}]
						}]

			}, {
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
										fieldLabel : '技术条件',
										xtype : 'textfield',
										id : 'technicCondition_search',
										anchor : '90%'
									}]
						}]
			}];

	var window = new Ext.Window({
				id : "materialItemwind",
				buttons : buttons,
				layout : 'fit',
				width : 700,
				autoHeight : true,
				autoScroll : true,
				title : '查询',
				modal : true,
				items : new Ext.form.FormPanel({
							padding : 5,
							buttonAlign : 'center',
							layout : 'column',
							autoScroll : true,
							width : 700,
							autoHeight : true,
							items : [item]
						}),
				border : true,
				closeAction : 'close'
			});
	return window;
}