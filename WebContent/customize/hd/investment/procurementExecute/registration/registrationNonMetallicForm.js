var registrationNonMetallicForm = {
	contractId : null,
	record : null
};
registrationNonMetallicForm.combo = function(){ 
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
/*
 * 获取合同列表
  */
registrationNonMetallicForm.getContract = function(){ 
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
				}, [  'contractId','contractCode','createDate','contractName'])
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
				id : 'ContractGridPanelId1', 
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
			var records = Ext.getCmp("ContractGridPanelId1").getSelectionModel().getSelections();
			if(records==null || records.length==0){
				Ext.Msg.alert('提示','请选择合同信息！');
				return ;
			} 
			registrationNonMetallicForm.contractId = records[0].get("contractId");
			Ext.getCmp("registrationNonMetallicForm").getForm().loadRecord(records[0]);
			window.close();
		}
	}, {
		text : '取消',
		handler : function() { 
			window.close();
		}
	} ]
	var window = new Ext.Window( {
		id : "ContractAddWind1",
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
registrationNonMetallicForm.getMaterial = function(){ 
		var rm = new Ext.grid.RowNumberer();
		var sm = new Ext.grid.CheckboxSelectionModel({
		    singleSelect : true
		});
	    var store = new Ext.data.Store(
				{
					proxy : new Ext.data.HttpProxy( {
//						url : '../JSON/registrationRemote.getGridDataByContract?d=' + new Date(), 试运行还得使用
						url : '../JSON/material_MaterialRemote.getAll?d='+new Date(),
						method : 'POST'
					}),
					reader : new Ext.data.JsonReader( {
						root : 'results',
						id : 'materialid',
						totalProperty : 'totalProperty'
					},[ //'itemId', 'itemName', 
					'desingnation',
						'materialStandard', 'demension','itemCode','purchaseNum','materialItemName','materialitemcode','materialid'])
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
					 	//alert("非金属");
						registrationAction.getSearchForm("MaterialGridPanelId1","2","").show();
					}}
	 ];
	var grid = new Ext.grid.GridPanel({
				id : 'MaterialGridPanelId1', 
				cm : cm,
				sm:sm,
				store : store,
				autoScroll : true,
				height : 300,
				tbar : toolbar,
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
		store.baseParams={start:0,limit:20,contractId:registrationNonMetallicForm.contractId,materialType:"2"}
		store.load();
	
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {  
			var records = Ext.getCmp("MaterialGridPanelId1").getSelectionModel().getSelections();
			if(records==null || records.length==0){
				Ext.Msg.alert('提示','请选择合同信息！');
				return ;
			} 
			registrationNonMetallicForm.record = records[0];
		//	Ext.getCmp("registrationForm").getForm().loadRecord(records[0]);
			Ext.getCmp("registrationNonMetallicForm").getForm().findField('itemId').setRawValue(records[0].get("materialid"));
			Ext.getCmp("registrationNonMetallicForm").getForm().findField('itemName').setRawValue(records[0].get("materialItemName"));
			Ext.getCmp("registrationNonMetallicForm").getForm().findField('itemCode').setRawValue(records[0].get("materialitemcode"));
			Ext.getCmp("registrationNonMetallicForm").getForm().findField('demension').setRawValue(records[0].get("demension"));
			window.close();
		}
	}, {
		text : '取消',
		handler : function() { 
			window.close();
		}
	} ]
	var window = new Ext.Window( {
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
registrationNonMetallicForm.getForm = function(rd,checkStatus,materialType) { 
var items = [
	              {
	            	layout : 'column',
	    			border : false,
	    			defaults : {
	    				border : false,
	    				labelWidth : 110,
	    				columnWidth : 1			
	    		    }, 
	               items : [{
	                    	columnWidth : .5,
	        				border : false,
	        				layout : 'form',
	        				items : [{name:'contractId',xtype:'hidden'},
	        						{name:'itemId',xtype:'hidden'},
	        						{name:'registrationId',xtype:'hidden'},
	        						{name:'materialType',xtype:'hidden',value:'2'}
	        					 ,{
		        					 
		        					xtype:'hidden',
		        					name : 'registrationCode' 
		        				} ,
	        				     {
		        					fieldLabel : '合同编号',	
		        					xtype :'textfield',
		        					name : 'contractCode', 
		        					anchor : '95%'
//		        					,
//		        					listeners : {
//										focus : function(field){
//											registrationNonMetallicForm.getContract().show(); 
//										}
//									}
		        				},{
		        					fieldLabel : '物资编号',	
		        					xtype :'textfield',
		        					name : 'itemCode',  
		        					anchor : '95%',
		        					allowBlank : false
		        					,
		        					listeners : {
										focus : function(field){
											//materialType
											registrationNonMetallicForm.getMaterial().show(); 
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
		        					fieldLabel : '到货批次',	
		        					xtype :'textfield',
		        					name : 'lotNo', 
		        					allowBlank : false,
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '计量单位',	
		        					xtype :'textfield',
		        					name : 'demension', 
//		        					allowBlank : false,
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '发票号码',	
		        					xtype :'textfield',
		        					name : 'invoiceNo', 
		        					anchor : '95%'
		        				},registrationNonMetallicForm.combo(),registrationForm.getComboBox(),new Ext.form.ComboBox({
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
	               	},{
                    	columnWidth : .5,
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
	        					fieldLabel : '到货数量',	
	        					xtype :'numberfield',
	        					name : 'arrivalNum', 
	        					anchor : '95%',
	        					allowBlank : false
	        				},{
		        					fieldLabel : '入厂价格',	  
		        					name : 'price', 
		        					xtype :'numberfield',
		        					allowBlank : false,
		        					anchor : '95%'
		        			},{
	        					fieldLabel : '运单号',	
	        					xtype :'textfield',
	        					name : 'transportNo', 
	        					allowBlank : false,
	        					anchor : '95%'
	        				} ,{
		        					fieldLabel : '到货日期',	
		        					xtype : "datefield",
		        					format : 'Y-m-d',
									editable : false,
									allowBlank : false,
		        					name : 'arrivalDate', 
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '生产厂商',	
		        					xtype :'textfield',
		        					name : 'vendorName', 
//		        					allowBlank : false,
		        					anchor : '95%', 
									listeners : {
								    	focus : function(field){ 
											createRegistrationForm.getVendor('registrationNonMetallicForm','vendorName').show(); 
										}
									}
		        			} ] 
               	}
	               ]
	              }];
var buttons = [ {
		text : ' 确定 ',
		id : 'submit1',
		disabled : registrationAction.flag,
		handler : function() {
			if (inform.form.isValid()) {  
				inform.form
				.doAction(
						'submit',
						{
							waitMsg : '正在保存数据，请稍候...',
							waitTitle : '提示',
							url : '../JSON/registrationRemote.saveRegistration?d=' + new Date(),
							method : 'post',
							success : function(form, action) {//在这处理逻辑。
								   inform.getForm().reset();
								   Ext.Msg.alert('提示',"保存成功");
								   	var grid = Ext.getCmp('registrationGridPanelId'); 
									grid.store.baseParams = {start : 0 ,limit :20};
									grid.store.load();
								     Ext.getCmp("registrationFormAddWind").close();
							},
							failure : function(form, action) {
								Ext.Msg.alert('提示',"保存失败");
							}
						});
			}

		}
	}, {
		text : '取消',
		disabled : registrationAction.flag,
		handler : function() {
			 Ext.getCmp("centerpanel").close();
		}
	} ]
	var inform = new Ext.FormPanel( {
		id : 'registrationNonMetallicForm',
		buttonAlign : 'center',
		labelAlign : 'left', 
		lableWidth : 150,
		width : 480,
		height : 200,
		frame : false,
		border : false,
		items : items,
		fileUpload : false,
		padding : 5 ,
		buttons:buttons
	}); 
	if(rd!=null)
	inform.getForm().loadRecord(rd);
	
//   
//	var window = new Ext.Window( {
//		id : "registrationNonMetallicFormAddWind",
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
	if(checkStatus!="0" && checkStatus!=null){
		Ext.getCmp("submit1").disable();
	}
	return inform;

} 

registrationNonMetallicForm.tabPanel = function(rd,checkStatus,materialType) {
	//这里应该是2
	//alert("点击了---"+materialType);
	if(materialType=='1')
	{
		rd = null;
		checkStatus = null;
	}
	var tab = new Ext.Panel( {
		title : '非金属/成品/机电',
		id : 'registrationNonMetallicFormTab',
		layout : 'fit',
		 region:'center',
		items : [ registrationNonMetallicForm.getForm(rd,checkStatus,materialType)]  
	});

	return tab;
};
