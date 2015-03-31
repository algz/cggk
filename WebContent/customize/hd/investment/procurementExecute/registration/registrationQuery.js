var registrationQuery = {
		
};

registrationQuery.getSearchForm = function(gridName){ 
	var buttons = [ {
		text : ' 查询 ',
		handler : function() {
			var registrationCode = Ext.getCmp("registrationCode").getValue();
			var contractCode = Ext.getCmp("contractCode").getValue();
			var contractName = Ext.getCmp("contractName").getValue();
			var itemCode = Ext.getCmp("itemCode").getValue(); 
			var itemName = Ext.getCmp("itemName").getValue(); 
			var materialCalotlogName = Ext.getCmp("materialcatalogName_childid").getValue();
			var　parentidName = Ext.getCmp("materialcatalogName_parentid").getValue();
			var desingnation = Ext.getCmp("desingnation").getValue(); 
			var materialStandard = Ext.getCmp("materialStandard").getValue(); 
			var furnaceBatch = Ext.getCmp("furnaceBatch").getValue(); 
			var checkStatus = Ext.getCmp("checkStatus").getValue();
			var createDateStart = Ext.getCmp("createDateStart").getValue();
			var createDateEnd = Ext.getCmp("createDateEnd").getValue();
			var arrivalDateStart = Ext.getCmp("arrivalDateStart").getValue();
			var arrivalDateEnd = Ext.getCmp("arrivalDateEnd").getValue();
			var orderFlag = Ext.getCmp('orderFlag').getValue().inputValue;
			
			var grid = Ext.getCmp(gridName); 
				grid.store.baseParams = {
						start : 0,
						limit : 20,
						registrationCode : registrationCode,
						contractCode : contractCode,
						contractName : contractName,
						itemCode : itemCode,
						itemName : itemName,
						materialtypename : materialCalotlogName,//物质种类小类
						materialtypename_parent:parentidName,//物质种类大类
						desingnation : desingnation,
						materialStandard : materialStandard,
						furnaceBatch : furnaceBatch,
						checkStatus : checkStatus,
						createDateStart :createDateStart,
						createDateEnd : createDateEnd,
						arrivalDateStart : arrivalDateStart,
						arrivalDateEnd : arrivalDateEnd,
						orderFlag : orderFlag
					};
					grid.store.load();
		 
//			registrationQuerySearchForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
//			registrationQuerySearchForm.getForm().reset();
			window.close();
		}
	} ];;

	var item = [
	{
		layout : 'column',
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 55
		},
		items : [{
				columnWidth : .49,
				width : 700,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '登记号',
					xtype : 'textfield',
					id : 'registrationCode',
					anchor : '90%'
				}
				 ]
			},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '合同编号',
					xtype : 'textfield',
					id : 'contractCode',
					anchor : '90%'
				} ]
		}]
	},{

		layout : 'column',
		width : 700,
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 55
		},
		items : [{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [ {
				fieldLabel : '合同名称',
				xtype : 'textfield',
				id : 'contractName',
				anchor : '90%'
			} ]
	},{
		columnWidth : .49,
		layout : 'form',
		border : false,
		items : [ {xtype : 'textfield',
			fieldLabel : '物资编号',
//			lableWidth : 150, 
			id : 'itemCode',
			anchor : '90%'}
		 ]
	}]
	
	},{

		layout : 'column',
		width : 700,
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 55
		},
		items : [{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [ {
				fieldLabel : '物资名称',
				xtype : 'textfield',
				id : 'itemName',
				anchor : '90%'
			} ]
		},{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [{
										columnWidth : .49,
										layout : 'form',
										border : false,
										items : [{
													fieldLabel : '炉批号',
													xtype : 'textfield',
													id : 'furnaceBatch',
													anchor : '90%'
												}]
									}]
		}]
	
	},{

		layout : 'column',
		width : 700,
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 55
		},
		items : [{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [ {
				fieldLabel : '牌号',
				xtype : 'textfield',
				id : 'desingnation',
				anchor : '90%'
			} ]
		},{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [ {xtype : 'textfield',
				fieldLabel : '规格',
//				lableWidth : 150, 
				id : 'materialStandard',
				anchor : '90%'}
			 ]
		}]
	
	},{

		layout : 'column',
		width : 700,
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 55
		},
		items : [{
							columnWidth : .49,
							layout : 'form',
							border : false,
							items : [new Ext.form.ComboBox({
										fieldLabel : '物资大类',
										id : 'materialcatalogName_parentid',
										anchor : '90%',
										// name : 'identity',
										// //与hiddenname最好不要重名,不然form.findField('identity')找不到数据.
										// 远程comboBox提交时,需指定hiddenName参数,否则传输的值不是value,而是text.
										hiddenName : 'identity',// form提交时的参数名称,并id!=hiddenName
										allowBlank : false, // 是否允许为空
										mode : "remote", // 数据模式为远程模式,也可不设置,即默认值也为remote
										triggerAction : 'all', // 显示所有下列数.必须指定为'all'
										typeAhead: true,
										emptyText : '请选择...', // 没有默认值时,显示的字符串
										store : new Ext.data.JsonStore({ // 填充的数据
											url : "../JSON/materialCatalogRemote.getMaterialCatalogComboBox?parentid=0",
											fields : new Ext.data.Record.create(['catalogid', 'catalogname',"catalogcode"]), // 也可直接为["text","value"]
											root : "materialcatalog"
										}),
										valueField : 'catalogid', // 传送的值
										displayField : 'catalogname', // UI列表显示的文本,
										    listeners:{
         'select' : function(combo, record, index) {
												var child = Ext.getCmp('materialcatalogName_childid');
												var store = child.getStore();
												child.clearValue();
												store.load({
															params : {
																parentid : record.get('catalogid')
															}
														});
											}
    }
									})]
						}, {
							columnWidth : .49,
							layout : 'form',
							border : false,
							items : [new Ext.form.ComboBox({
										fieldLabel : '物资小类',
										id : 'materialcatalogName_childid',
										anchor : '90%',
										// name : 'identity',
										// //与hiddenname最好不要重名,不然form.findField('identity')找不到数据.
										// 远程comboBox提交时,需指定hiddenName参数,否则传输的值不是value,而是text.
										//hiddenName : 'identity',// form提交时的参数名称,并id!=hiddenName
										allowBlank : false, // 是否允许为空
										mode : "local", // 数据模式为远程模式,也可不设置,即默认值也为remote
										triggerAction : 'all', // 显示所有下列数.必须指定为'all'
										typeAhead: true,
										emptyText : '请选择...', // 没有默认值时,显示的字符串
										store : new Ext.data.JsonStore({ // 填充的数据
											url : "../JSON/materialCatalogRemote.getMaterialCatalogComboBox?",
											fields : new Ext.data.Record.create(['catalogid', 'catalogname',"catalogcode"]), // 也可直接为["text","value"]
											root : "materialcatalog"
										}),
										valueField : 'catalogid', // 传送的值
										displayField : 'catalogname' // UI列表显示的文本
									})]
						}]
	
	},{

		layout : 'column',
		width : 700,
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 55
		},
		items : [{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [ {
				fieldLabel : '交货状态',
				xtype : 'combo',
				id : '',
				triggerAction : 'all',
				emptyText : '请选择',
				editable : false,
				store : [['0', '未交货'], ['1', '已交货']],
				anchor : '90%'
			} ]
		},{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [ {xtype : 'combo',
				fieldLabel : '当前状态',
				id : 'checkStatus',
				triggerAction : 'all',
				emptyText : '请选择',
				editable : false,
				store : [['0', '登记'], ['1', '理化'],
						['2','检测报告合格'],['3','检测报告不合格'],
						['4','意见书重检'],['5','意见书退货'],
						['6','已退货'],['7','已入库'],
						['8','意见书-降级使用'],
						['10','确认登记:已确认'],['-10','确认登记:退回'],
						['11','开箱检查:合格'],['-11','开箱检查:不合格'],
						['12','请检:完成'],['-12','请检:未完成'],
						['13','表面初检:合格'],['-13','表面初检:不合格'],
						['14','委托试验:完成'],['-14','委托试验:未完成'],
						['+14','委托试验:无需'],['15','取样:完成'],
						['-15','取样:未完成'],['+15','取样:无需'],
						['16','送样:完成'],['-16','送样:未完成'],
						['+16','送样:无需'],['17','试验报告:完成'],
						['-17','试验报告:未完成'],['+17','试验报告:无需'],
						['18','打钢印:完成'],['-18','打钢印:未完成'],
						['+18','打钢印:无需'],['19','分光/磨火花:完成'],
						['-19','分光/磨火花:未完成'],['+19','分光/磨火花:无需'],
						['20','表面检查:完成'],['-20','表面检查:未完成'],
						['+20','表面检查:无需'],['21','喷字:完成'],
						['-21','喷字:未完成'],['+21','喷字:无需'],
						['22','油封:完成'],['-22','油封:未完成'],
						['+22','油封:无需'],['24','不合格处理:退货'],
						['-24','不合格处理:返修']
				],
				anchor : '90%'}
			 ]
		}]
	
	},{

		layout : 'column',
		width : 700,
		xtype : 'container',
		defaults : {
			labelWidth : 55,
			border : false
		},
		items : [{
			columnWidth : .23,
			layout : 'form',
			border : false,
			items : [ {
				fieldLabel : '登记日期',
				xtype : 'datefield',
				format : 'Y-m-d',
				id : 'createDateStart',
				anchor : '95%'
			} ]
		},{
			columnWidth : .26,
			layout : 'form',
			border : false,
			items : [ {
				fieldLabel : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至',
				xtype : 'datefield',
				format : 'Y-m-d',
				id : 'createDateEnd',
				anchor : '84%'
			} ]
		},{
			columnWidth : .23,
			layout : 'form',
			border : false,
			items : [ {xtype : 'datefield',
				fieldLabel : '到货日期',
				format : 'Y-m-d',
				id : 'arrivalDateStart',
				anchor : '95%'}
			 ]
		},{
			columnWidth : .26,
			layout : 'form',
			border : false,
			items : [ {
				fieldLabel : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至',
				xtype : 'datefield',
				format : 'Y-m-d',
				id : 'arrivalDateEnd',
				anchor : '84%'
			} ]
		}]
	
	},{
		layout : 'column',
		width : 700,
		xtype : 'container',
		items : [{
			columnWidth : .55,
			layout : 'form',
			border : false,
			items : [{
				xtype : 'radiogroup',
				fieldLabel : '排序方式',
				items : [{
					boxLabel : '到货时间',
					name : 'psPlanType',
					inputValue : 1,
					checked:true
				},{
					boxLabel : '当前状态',
					name : 'psPlanType',
					inputValue : 2
				},{
					boxLabel : '入库时间',
					name : 'psPlanType',
					inputValue : 3
				}],
				id : 'orderFlag'
			}]
		}]
	}];

	
	//表单
	var registrationQuerySearchForm = new Ext.form.FormPanel({
		padding : 5,
		buttonAlign:'center',
		layout : 'column',
		autoScroll : true,
		width : 700,
	    autoHeight:true,
		items : [item]
	});
	
	var window = new Ext.Window( {
		id : "registrationQuerywind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '查询',
		modal : true,
		items : registrationQuerySearchForm,
		border : true,
		closeAction :'close'
	});
	return window;



}