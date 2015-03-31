//比价的只读 form，用于展示用。
var comparePriceReadOnlyForm = {
		parityDetailId : null,
		oldParityVendorIdString : ''
};

procurementProcessData.parityDetailReadOnlyPanel = function() {
	var tbar = [ '-', {
		text : '返回',
		iconCls : 'Cancel',
		handler : function() {
		//切换回比价列表
			var tab = Ext.getCmp('rightGrid2');
			var parityVendorStore = Ext.getCmp('parityVendorGrid').getStore();
			parityVendorStore.removeAll();
			var contractForm = Ext.getCmp('parityDetailFormId');
			contractForm.form.reset();
			tab.getLayout().setActiveItem(0);
		}
	}, '-'];
	
	
	var item1=[{
		xtype : 'fieldset',
		title : '一：比价采购通知栏',
		items : [ {
			layout : 'column',
			border : false,
			items : [ {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'hidden',
					fieldLabel : '',
					name : 'materialId',
					readOnly : true,
					anchor : '100%'
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'hidden',
					fieldLabel : '',
					name : 'manufacturerOne',
					readOnly : true,
					anchor : '100%'
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'hidden',
					fieldLabel : '',
					name : 'manufacturerTwo',
					readOnly : true,
					anchor : '100%'
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'hidden',
					fieldLabel : '',
					name : 'parityId',
					readOnly : true,
					anchor : '100%'
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'hidden',
					fieldLabel : '',
					name : 'planner',
					readOnly : true,
					anchor : '100%'
				} ]
			}, {
				columnWidth : 1,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'hidden',
					fieldLabel : '',
					name : 'parityDetailId',
					readOnly : true,
					anchor : '100%'
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
					xtype : 'textfield',
					fieldLabel : '计划员签名',
					name : 'plannerName',
					readOnly : true,
					anchor : '100%'
				} ]
			} ]
		}, {
			layout : 'column',
			border : false,
			items : [ {
				columnWidth : .32,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '物资名称',
					name : 'materialItemName',
					readOnly : true,
					anchor : '100%'
				} ]
			}, {
				columnWidth : .33,
				layout : 'form',
				border : false,
				padding : '0 0 0 10',
				items : [ {
					xtype : 'textfield',
					fieldLabel : '牌号',
					name : 'desingnation',
					readOnly : true,
					anchor : '100%'
				} ]
			}, {
				columnWidth : .33,
				layout : 'form',
				border : false,
				padding : '0 0 0 10',
				items : [ {
					xtype : 'textfield',
					fieldLabel : '规格',
					name : 'materialStandard',
					readOnly : true,
					anchor : '100%'
				} ]
			} ]
		}, {
			layout : 'column',
			border : false,
			items : [ {
				columnWidth : .32,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'numberfield',
					readOnly : true,
					fieldLabel : '实际采购数量',
					name : 'countNum',
					readOnly : true,
					anchor : '100%'
				} ]
			}, {
				columnWidth : .33,
				layout : 'form',
				border : false,
				padding : '0 0 0 10',
				items : [ {
					xtype : 'textfield',
					fieldLabel : '单位',
					name : 'demension',
					readOnly : true,
					anchor : '100%'
				} ]
			}, {
				columnWidth : .33,
				layout : 'form',
				border : false,
				padding : '0 0 0 10',
				items : [ {
					xtype : 'textfield',
					fieldLabel : '用途',
					name : 'purpose',
					readOnly : true,
					anchor : '100%'
				} ]
			} ]
		}, {
			layout : 'column',
			border : false,
			items : [ {
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '使用单位',
					name : 'department',
					readOnly : true,
					anchor : '100%'
				} ]
			}, {
				columnWidth : .49,
				layout : 'form',
				border : false,
				padding : '0 0 0 10',
				items : [ {
					xtype : 'textfield',
					fieldLabel : '技术要求',
					name : 'technicCondition',
					readOnly : true,
					anchor : '100%'
				} ]
			} ]
		}, {
			layout : 'column',
			border : false,
			items : [ {
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					allowBlank : false,
					fieldLabel : '建议厂商1',
					name : 'manufacturerOneName',
					readOnly : true,
					anchor : '100%',style:{color:'red'}
				} ]
			}, {
				columnWidth : .49,
				layout : 'form',
				border : false,
				padding : '0 0 0 10',
				items : [ {
					xtype : 'numberfield',
					allowBlank : false,
					fieldLabel : '计划价',
					name : 'planPrice',
					readOnly : true,
					anchor : '100%',style:{color:'red'}
				} ]
			} ]
		}, {
			layout : 'column',
			border : false,
			items : [ {
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					xtype : 'textfield',
					allowBlank : false,
					fieldLabel : '建议厂商2',
					name : 'manufacturerTwoName',
					readOnly : true,
					anchor : '100%',style:{color:'red'}
				} ]
			}, {
				columnWidth : .49,
				layout : 'form',
				border : false,
				padding : '0 0 0 10',
				items : [ {
					xtype : 'datefield',
					allowBlank : false,
					fieldLabel : '需用时间',
					format : 'Y-m-d',
					name : 'demandTime',
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
					name : 'remark',
					readOnly : true,
					anchor : '100%',style:{color:'red'}
				} ]
			} ]
		} ]
	}];
	
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
		title : '二：比价采购申请栏',
		items : [item21,item23,item22]
	}];
		
	//表单
	var contractReadOnlyForm = new Ext.form.FormPanel({
		id : 'parityDetailReadOnlyFormId',
		padding : 5,
		tbar : tbar,
		layout : 'column',
		autoScroll : true,
		defaults : {
			columnWidth : 1,
			padding : 5
		},
		items : [item1,item2]
	});

	return contractReadOnlyForm;
}
