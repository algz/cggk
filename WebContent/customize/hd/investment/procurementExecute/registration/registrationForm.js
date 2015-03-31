var registrationForm = {
	contractId : null,
	record : null
};
registrationForm.combo = function(){ 
	var combox = new Ext.form.ComboBox({
		hiddenName : 'qualifyNo',
		fieldLabel : '合格证',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [ [ '提供', '提供' ],[ '未提供', '未提供' ]]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true,
		anchor : '95%',
		value : '提供'
	})
	return combox;
}
registrationForm.getComboBox = function(){ 
	var combox = new Ext.form.ComboBox({
		name : 'check_result',
		hiddenName : 'check_result',
		fieldLabel : '入厂复验',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [ [ '是', '否' ],[ '否', '是' ]]//由于业务人员把业务搞反了，修改显示名称是最简单的方法
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true,
		anchor : '95%',
		value : '是'
	})
	return combox;
}
/*
 * 获取合同列表
  */
registrationForm.getContract = function(){ 
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel({singleSelect : true});
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy(
						{
							url : '../JSON/registrationRemote.getContractList?d='
									+ new Date(),
							method : 'post'
						}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'contractId',
					totalProperty : 'totalProperty'
				}, [  'contractId','contractCode','createDate','contractName','vendorName'])
			});
	var cm = new Ext.grid.ColumnModel( [ sm, rm, {
		header : '合同编号',
		dataIndex : 'contractCode' 
	},
	{
		header : '合同名称',
		dataIndex : 'contractName'
	},{
		header : '生成日期',
		dataIndex : 'createDate',
		sortable : true
	}]); 
	var grid = new Ext.grid.GridPanel({
				id : 'ContractGridPanelId', 
				cm : cm,
				sm:sm,
				store : store,
				autoScroll : true,
				height : 300,
				autoWidth  : true,
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
		store.baseParams={start:0,limit:20,applicationStatus:'5'}
		store.load();
	
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {  
			var records = Ext.getCmp("ContractGridPanelId").getSelectionModel().getSelections();
			if(records==null || records.length==0){
				Ext.Msg.alert('提示','请选择合同信息！');
				return ;
			} 
			registrationForm.contractId = records[0].get("contractId");
//			Ext.getCmp('vendorName').setValue(records[0].get('vendorName'));
			Ext.getCmp("registrationForm").getForm().loadRecord(records[0]);
			window.close();
		}
	}, {
		text : '取消',
		handler : function() { 
			window.close();
		}
	} ]
	var window = new Ext.Window( {
		id : "ContractAddWind",
		width : 700,
		layout : 'fit',
		autoScroll : true,
		title : '合同列表',
		modal : true,
		items : grid,
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});
	return window;
}

/*
 * 获取物资列表列表
  */
registrationForm.getMaterial = function(contractCode){ 
		var rm = new Ext.grid.RowNumberer();
		var sm = new Ext.grid.CheckboxSelectionModel({
		    singleSelect : true
		});
		var store = new Ext.data.Store(
				{
					proxy : new Ext.data.HttpProxy( {
						url : '../JSON/registrationRemote.getMaterialByContract?d=' + new Date(), //试运行还得使用
//						url : '../JSON/material_MaterialRemote.getAll?d='+new Date(),
//						url : '../JSON/material_MaterialRemote.getAllByRoles?d=' + new Date(),
//						url:'../JSON/procurementDetail_ProcurementDetailRemote.getGridDataByContract',
						method : 'POST'
					}),
					reader : new Ext.data.JsonReader( {
						root : 'results',
						id : 'materialid',
						totalProperty : 'totalProperty'
					},[ //'itemId', 'itemName',
					'desingnation','materialStandard', 'demension','itemCode',
					'purchaseNum','materialItemName','materialitemcode','materialid',
					'referencePrice']),
					autoLoad : true,
//					baseParams:{contractId:contractCode,materialType:""}
					baseParams:{start:0,limit:20,contractId:registrationForm.contractId}
				}); 
		var cm = new Ext.grid.ColumnModel( [
				sm,
				rm,{
				header : '物资编码',
//				dataIndex : 'itemCode',试运行后使用
				dataIndex : 'materialitemcode',
				width : 100,
				sortable : true
			},
				{
				header : '物资名称',
//				dataIndex : 'itemName',试运行后使用
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
				header : '单位',
				dataIndex : 'demension',
				width : 100,
				sortable : true
			}]);
	    var toolbar = [ '-',
					{text:'查询',
					 iconCls : 'search1',
					 handler:function(){
//					 	alert(contractCode);
						registrationAction.getSearchForm("MaterialGridPanelId","1",registrationForm.contractId).show();
					}}
	    ];
	    
	    var grid = new Ext.grid.GridPanel({
				id : 'MaterialGridPanelId', 
				cm : cm,
				sm:sm,
				store : store,
				autoScroll : true,
				height : 300,
				autoWidth  : true,
				columnLines : true, 
				loadMask : {
					msg : '数据加载中...'
				},
				tbar : toolbar,
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
//		store.baseParams={start:0,limit:20,contractId:registrationForm.contractId}//,materialType:'1'
//		store.load();
	
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {  
			var records = Ext.getCmp("MaterialGridPanelId").getSelectionModel().getSelections();
			if(records==null || records.length==0){
				Ext.Msg.alert('提示','请选择合同信息！');
				return ;
			} 
			registrationForm.record = records[0];
//			Ext.getCmp("registrationForm").getForm().loadRecord(records[0]);
			Ext.getCmp("registrationForm").getForm().findField('itemId').setRawValue(records[0].get("materialid"));
			Ext.getCmp("registrationForm").getForm().findField('itemName').setRawValue(records[0].get("materialItemName"));
			Ext.getCmp("registrationForm").getForm().findField('itemCode').setRawValue(records[0].get("materialitemcode"));
			Ext.getCmp("registrationForm").getForm().findField('demension').setRawValue(records[0].get("demension"));
			Ext.getCmp("registrationForm").getForm().findField('price').setRawValue(records[0].get("referencePrice"));
			Ext.getCmp("registrationForm").getForm().findField('purchaseNum').setRawValue(records[0].get("purchaseNum"));
			window.close();
		}
	}, {
		text : '取消',
		handler : function() { 
			window.close();
		}
	} ]
	var window = new Ext.Window( {
		id : "MaterialAddWind",
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

/**
 * 物资到货验收--入厂登记--登记FORM
 * @param {} rd
 * @param {} checkStatus
 * @param {} materialType 已无效
 * @return {}
 */
registrationForm.getForm = function(rd,checkStatus,materialType) { 
	var items = [
	              {
	            	layout : 'column',
	    			border : false,
	    			defaults : {
	    				border : false,
	    				labelWidth : 65,
	    				columnWidth : 1			
	    		    }, 
	               items : [{
	                    	columnWidth : .4,
	        				border : false,
	        				layout : 'form',
	        				items : [{name:'contractId',xtype:'hidden'},
	        				        {name:'purchaseNum',xtype:'hidden'},
	        						{name:'itemId',xtype:'hidden'},
	        						{name:'registrationId',xtype:'hidden'},
	        						{name:'materialType',xtype:'hidden',value:'1'}
	        					 ,{
		        					 
		        					xtype:'hidden',
		        					name : 'registrationCode' 
		        				} ,
	        				     {
	        				     	id:'contractCode',
		        					fieldLabel : '合同编号<font color=red>*</font>',	
		        					xtype :'textfield',
		        					name : 'contractCode', 
		        					anchor : '95%',
		        					allowBlank : false,
		        					listeners : {
										focus : function(field){
											registrationForm.getContract().show(); 
										}
									}
		        				},{
		        					fieldLabel : '物资编号<font color=red>*</font>',	
		        					xtype :'textfield',
		        					name : 'itemCode',  
		        					anchor : '95%',
		        					allowBlank : false,
		        					listeners : {
										focus : function(field){
											//materialType
											var contractCode=Ext.getCmp('contractCode').getValue();
											if(contractCode!=""){
												registrationForm.getMaterial(contractCode).show(); 
											}
										}
									}
//		        					,listeners: {
//		        						"blur":function (field){
//		        							if(field.getRawValue()!="")
//		        								registrationAction.getMaterialInfo(field.getRawValue())
//		        							else
//		        						    	Ext.Msg.alert('提示',"请录入物资编码");
//		        						}
//		        					} 

		        				},{
		        					fieldLabel : '计量单位',	
		        					xtype :'textfield',
		        					name : 'demension', 
		        					readOnly:true,
//		        					allowBlank : false,
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '到货批次<font color=red>*</font>',	
		        					xtype :'textfield',
		        					name : 'lotNo', 
		        					allowBlank : false,
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '发票号码',	
		        					xtype :'textfield',
		        					name : 'invoiceNo',
//		        					allowBlank : false,
		        					anchor : '95%'
		        				},registrationForm.combo(),
//		        					{
//	        					fieldLabel : '路线卡',	
//	        					xtype :'textfield',
//	        					name :'routeNo',
//	        					anchor : '95%', 
//		        				listeners : {
//										focus : function(field){
//											if(inform.form.findField('itemCode').getRawValue()==""){
//												 Ext.Msg.alert('提示',"请选择物资信息");
//												 return;
//											}
//											lineCard.getForm(rd,inform.form.findField('itemCode').getRawValue(),inform.form.findField('itemName').getRawValue(),inform.form.findField('itemId').getRawValue()).show(); 
//										}
//								}
		        				registrationForm.getComboBox(),
		        				{
		        					id:'vendorName',
		        					fieldLabel : '生产厂商',	
		        					xtype :'textfield',
		        					name : 'vendorName', 
//		        					allowBlank : false,
		        					anchor : '95%'/*, 
									listeners : {
								    	focus : function(field){ 
											createRegistrationForm.getVendor('registrationForm','vendorName').show(); 
										}
									}*/
		        			}
	        				] 
	               	},{
                    	columnWidth : .6,
        				border : false,
        				layout : 'form',
        				items : [ 
        				    {
	        					fieldLabel : '合同名称',	
	        					xtype :'textfield', 
	        					name : 'contractName', 
//	        					disabled : true,
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '物资名称',	
	        					name : 'itemName', 
	        					xtype :'textfield', 
	        					readOnly : true,
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '到货数量<font color=red>*</font>',	
	        					xtype :'numberfield',
	        					name : 'arrivalNum', 
	        					anchor : '95%',
    							allowNegative : false, // 允许负数？
	        					allowBlank : false
	        				},{
		        					fieldLabel : '入厂价格<font color=red>*</font>',	  
		        					name : 'price', 
		        					xtype :'numberfield',
		        					decimalPrecision : 6,
		        					allowNegative : false, // 允许负数？
		        					allowBlank : false,
		        					anchor : '95%'
		        			},{
	        					fieldLabel : '运单号<font color=red>*</font>',	
	        					xtype :'textfield',
	        					name : 'transportNo', 
	        					allowBlank : false,
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '炉批号<font color=red>*</font>',	
	        					xtype :'textfield',
	        					name : 'furnaceBatch', 
	        					allowBlank : false,
	        					anchor : '95%'
	        				},{
		        					fieldLabel : '到货日期<font color=red>*</font>',	
		        					xtype : "datefield",
		        					format : 'Y-m-d',
									editable : false,
									allowBlank : false,
		        					name : 'arrivalDate', 
		        					anchor : '95%'
		        				},new Ext.form.ComboBox({
		name : 'materialstate',
		// 作为FORM表单提交时的参数名,并且hiddenName!=id
		hiddenName : 'materialstate',//创建一个新的控件,id=hiddenName
		fieldLabel : '物质状态',
		typeAhead : true,// 必须项
		triggerAction : 'all',// 必须项
		//hideTrigger:true ,//true隐藏下拉箭头
		lazyRender : true,
		resizable : true,// 是否手动扩展大小,默认false
		mode : 'local',
		forceSelection : true,// 限制输入范围在可选择的文本内
		editable : false,// 不允许输入,只能选择文本列表
		anchor : '95%',
		store : new Ext.data.ArrayStore(
			{
				id : 0,
				fields : ['value',	'displayText'],
				data : [[1, '正常入库'],[2, '委托加工'],[3,'返修品' ]]	
			}),
		valueField : 'value',
		value : 1,
		displayField : 'displayText'
})] 
               	}
	               ]
	              }];
//var buttons = [ {
//		text : ' 确定 ',
//		id : 'submit',
//		disabled : registrationAction.flag,
//		handler : function() {
//			if (inform.form.isValid()) {  
//				inform.form
//				.doAction(
//						'submit',
//						{
//							waitMsg : '正在保存数据，请稍候...',
//							waitTitle : '提示',
//							url : '../JSON/registrationRemote.saveRegistration?d=' + new Date(),
//							method : 'post',
//							success : function(form, action) {//在这处理逻辑。
//								   inform.getForm().reset();
//								   Ext.Msg.alert('提示',"保存成功");
//								   	var grid = Ext.getCmp('registrationGridPanelId'); 
//									grid.store.baseParams = {start : 0 ,limit :20};
//									grid.store.load();
//								    Ext.getCmp("registrationFormAddWind").close();
//							},
//							failure : function(form, action) {
//								Ext.Msg.alert('提示',action.result.msg);//保存失败
//							}
//						});
//			}
//
//		}
//	}, {
//		text : '取消',
//		disabled : registrationAction.flag,
//		handler : function() {
//			 Ext.getCmp("centerpanel").close();
//		}
//	} ]
	var inform = new Ext.FormPanel( {
		id : 'registrationForm',
		buttonAlign : 'center',
		labelAlign : 'left', 
		lableWidth : 150,
		width : 480,
//		height : 200,
		autoHeight:true,
		frame : false,
		border : false,
		items : items,
		fileUpload : false,
		padding : 5 //,
//		buttons:buttons
	}); 
	if(rd!=null)
	inform.getForm().loadRecord(rd);
	
//   
//	var window = new Ext.Window( {
//		id : "registrationFormAddWind",
//		width : 500,
//		layout : 'fit',
//		autoScroll : true,
//		title : '入厂登记',
//		modal : true,
//		items : inform,
//		border : true,
//		buttons : buttons,
//		closeAction : 'close'
//	}); 
//	if(checkStatus!="0" && checkStatus!=null){ 
//		Ext.getCmp("submit").disable();
//	}
	return inform;

} 

//registrationForm.tabPanel = function(rd,checkStatus,materialType) {
//	//这里 materialType应该是 1
//	//alert("点击了---"+materialType);
//	if(materialType=='2')
//	{
//		rd = null;
//		checkStatus = null;
//	}
//	var tab = new Ext.Panel( {
////		title : '金属',
//		id : 'registrationFormTab',
//		region:'center',
//		layout : 'fit',
//		items : [ registrationForm.getForm(rd,checkStatus,materialType)]
////		listeners : {
////			'activate' : function() { 
////				Ext.getCmp('registrationNonMetallicFormTab').remove(0);
////				Ext.getCmp('registrationFormTab').add(registrationForm.getForm(rd,checkStatus)).doLayout(true);  
////			}
////		}
//	}); 
//	return tab;
//};
