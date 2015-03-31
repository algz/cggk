//采购比价审批，查看明细
AgreementPurchaseAuditApprovalObjectPanel = {};
AgreementPurchaseAuditApprovalObjectPanel.init = function(id){ 
	
	
	
	var item21=[{
		layout : 'column',
		border : false,
		items : [ {
			columnWidth : .98,
			layout : 'form',
			border : false,
			items : [ {
				xtype : 'textfield',
				readOnly : true,
				fieldLabel : '供应员签名',
				name : 'providerName',
				anchor : '100%'
			} ]
		} ]
	}];
	var item22=[{
		layout : 'column',
		border : false,
		items : [ {
			columnWidth : 0.49,
			layout : 'form',
			border : false,
			items : [ {
				xtype : 'numberfield',
				allowBlank : false,
				fieldLabel : '前次采购价格',
				allowNegative : false,
				allowDecimals : true,
				decimalPrecision : 2,
				name : 'lastprice',
				readOnly : true,
				anchor : '100%',style:{color:'red'}
			} ]
		}, {
			columnWidth : 0.49,
			layout : 'form',
			border : false,
			padding : '0 0 0 10',
			items : [ {
				xtype : 'numberfield',
				allowBlank : false,
				fieldLabel : '比前次上升幅度',
				allowNegative : false,
				allowDecimals : true,
				decimalPrecision : 2,
				name : 'scope',
				readOnly : true,
				anchor : '100%',style:{color:'red'}
			} ]
		} ]
	}, {
		layout : 'column',
		border : false,
		items : [ {
			columnWidth : .98,
			layout : 'form',
			border : false,
			items : [ {
				xtype : 'textarea',
				fieldLabel : '备注',
				name : 'remarks',
				readOnly : true,
				anchor : '100%',style:{color:'red'}
			} ]
		} ]
	}]
	
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	
	var parityVendorReadOnlyGridStore = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/parity_ParityVendorRemote.getParityVendorList?d=' + new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'parityVendorId',
			totalProperty : 'totalProperty'
		}, [ 'parityVendorId','price','vendorID','parityDetailId','vendorName','property','reposal','phone','productVentor' ])
	});
	var cm = new Ext.grid.ColumnModel([sm,rm, {
		header : '单位名称',
		dataIndex : 'vendorName',
		sortable : true
	},{
		header : '企业性质',
		dataIndex : 'property',
		sortable : true
	},{
		header : '信用度',
		dataIndex : 'reposal',
		sortable : true
	},{
		header : '价  格',
		dataIndex : 'price',
		width : 80,
		sortable : true,
		renderer : function(value, cellmeta, record, rowIndex) {
			if(typeof(value)=='undefined'){return;}
			value = "&nbsp;<font color='red'>" + value+ "</font>";
			return value;
		}
	},{
		header : '联系电话',
		dataIndex : 'phone',
		sortable : true
	},{
		header : '生成单位',
		dataIndex : 'productVentor',
		sortable : true
	}]);
	
	var tbar1 = ['供应商信息'];
		
	var grid = new Ext.grid.EditorGridPanel({
	     store : parityVendorReadOnlyGridStore,
	     tbar : tbar1,
	     cm : cm,
	     sm : sm,
	     id : "parityVendorReadOnlyGrid",
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     },
	     clicksToEdit : 1
	});
	
	sm.on('rowselect', function(sm, rowIndex, record) {
		comparePricePanel.selectRow = record;
	});
	sm.on('selectionchange', function(sm, t) {
		comparePricePanel.selectObj = sm.getSelections();
		if(!sm.getSelections() || sm.getSelections().length<1){
			comparePricePanel.selectRow = null;
		}
	});
	
	var item23=[{
		xtype : 'container',
		layout : 'hbox',
		height : 100,
		layoutConfig:{
			align: 'stretch',
			padding : '0 0 5 0'
		},
		items : [{
			xtype : 'container',
			width : 108			
		},{
			xtype : 'container',
			flex : 0.975,
			layout : 'fit',
			items : [grid]
		},{
			xtype : 'container',
			flex : 0.025			
		}]
	}];
	
	var item2=[{
		xtype : 'fieldset',
		title : '协议采购申请栏',
		items : [item21,item23]
	}];
		
	//表单
	var panel = new Ext.form.FormPanel({
		id : 'parityDetailReadOnlyFormId',
		padding : 5,
		layout : 'column',
		autoScroll : true,
		defaults : {
			columnWidth : 1,
			padding : 5
		},
		items : [item2]
	});

	var contractForm = Ext.getCmp('parityDetailReadOnlyFormId');
	contractForm.form.doAction('load',{
		waitTitle : '加载编辑数据',
		waitMsg : '正在加载编辑数据',
		url : '../JSON/parityDetailRemote.getParityDetailApprovelData?d=' + new Date(),
		method : 'post',
		params : {start : 0,limit : 20 , parityId : id },
		success : function (form,action){
			form.loadRecord(action.result);
			
			comparePriceReadOnlyForm.parityDetailId = action.result.
			
			
			  data.parityDetailId;
			
			if(typeof(comparePriceReadOnlyForm.parityDetailId)!='undefined'){
				
				var parityVendorGrid = Ext.getCmp('parityVendorReadOnlyGrid');
				
				parityVendorGrid.getStore().baseParams={start:0,limit:20,parityDetailId:comparePriceReadOnlyForm.parityDetailId};
				
				parityVendorGrid.getStore().load();
			}
		},
		failure : function(form,action){
			
		}
	});
	return panel;
}