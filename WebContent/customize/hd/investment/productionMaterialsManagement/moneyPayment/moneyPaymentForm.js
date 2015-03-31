var moneyPaymentForm = {};
moneyPaymentForm.getForm = function(){
	var items = [{
		layout : 'column',
		border : true,
		xtype : 'fieldset',
		title : '发票日期数量及货款',
		width : 500,
		items : [{
				columnWidth : .5,
				layout : 'form',
				border : false,
				items : [  {
					xtype : 'hidden',
					name : 'procurementContractId',
					value : moneyPaymentMain.contractId,
					anchor : '100%'
				}, {
					xtype : 'hidden',
					name : 'createDate', 
					anchor : '100%'
				},{
					xtype : 'hidden',
					name : 'moneyPaymentId',
					anchor : '100%'
				},{
					xtype : 'textfield',
					fieldLabel : '<font color=red>*</font>发票号码',
					id : 'invoiceNo',
					name : 'invoiceNo',
					anchor : '100%',
					blankText : 'this field is required',
					allowBlank : false,
					vtype : 'alphanum'
				}, {
					xtype : 'textfield',
					fieldLabel : '<font color=red>*</font>器材数量',
					id : 'equipmentNumber',
					name : 'equipmentNumber',
					xtype : 'numberfield',
					allowNegative : false,
					allowDecimals : false,
					minValue : 0,
					maxValue : 99999999,
					maskRe : /\d/,
					blankText : 'this field is required',
					allowBlank : false,
					anchor : '100%'
				}, {
					fieldLabel : '<font color=red>*</font>到厂时间',
					invalidText : '到厂时间输入格式为Y-m-d',
					id : "invoiceDate",
					xtype : 'datefield',
					blankText : 'this field is required',
					format : 'Y-m-d',
					allowBlank : false,
					anchor : '95%'
					}  ]
			},{
				columnWidth : .5,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '<font color=red>*</font>含税单价(元)',
					id : 'taxPrice',
					name : 'taxPrice',
					xtype : 'numberfield',
					allowNegative : false,
					allowDecimals : true,
					decimalPrecision : 2,
					minValue : 0,
					maxValue : 99999999.99,
					maskRe : /\d/,
					allowBlank : false,
					anchor : '100%'
				} , {
					fieldLabel : '<font color=red>*</font>金额(元)',
					id : 'amount',
					name : 'amount',
					xtype : 'numberfield',
					allowNegative : false,
					allowDecimals : true,
					decimalPrecision : 2,
					minValue : 0,
					maxValue : 99999999.99,
					maskRe : /\d/,
					allowBlank : false,
					anchor : '100%'
				} ]
			}]
	},{
		layout : 'column',
		border : true,
		xtype : 'fieldset',
		width : 500,
		items : [{
				columnWidth : .5,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '<font color=red>*</font>预付货款',
					id : "prepayment",
					xtype : 'numberfield',
					allowNegative : false,
					allowDecimals : true,
					decimalPrecision : 2,
					minValue : 0,
					maxValue : 99999999.99,
					maskRe : /\d/,
					allowBlank : false,
					anchor : '100%'
				}  ]
			},{
				columnWidth : .5,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '<font color=red>*</font>承付日期',
					invalidText : '承付日期输入格式为Y-m-d',
					id : "incurredDate",
					xtype : 'datefield',
					blankText : 'this field is required',
					format : 'Y-m-d',
					allowBlank : false,
					anchor : '95%'
				}  ]
		},{
			columnWidth : 1,
			layout : 'form',
			border : false,
			items : [ {
				fieldLabel : '备注描述',
				id : "remark",
				xtype : 'textarea',
				height : 50,
				allowBlank : true,
				maxLength : 100,
				maxLengthText : '最多可输入100个字，请重新输入！',
				anchor : '100%'
			}  ]
	}]
	}];

	var buttons = [{
		text : ' 确定 ',
		handler : function(){
			if(inform.form.isValid()) {
				inform.form.doAction('submit',{
					waitMsg:'正在保存数据，请稍候...',
					waitTitle:'提示',
					url : '../JSON/moneyPayment_MoneyPaymentRemote.saveMoneyPayment',
					method : 'post',
					success : function(form, action) {
						if(moneyPaymentMain.isDirectAdd){
							moneyPaymentMain.window.close();
						}else{
							Ext.getCmp('moneyPaymentGridPanelId').getStore().reload();
							moneyPaymentAction.gridView();
						}
						Ext.Msg.alert('提示','保存数据成功！');
						form.reset();
						window.close();					
					},
					failure : function(form, action){
						Ext.Msg.alert('提示','保存数据失败：'+action.result.msg);
					}
				})
			}
		}		
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			if(moneyPaymentMain.isDirectAdd){
				moneyPaymentMain.window.close();
			}else{
				moneyPaymentAction.gridView();
			}
		}
	}]
	
	var inform = new Ext.FormPanel({
		id : 'moneyPaymentForm',
		buttonAlign : 'right',
		frame : true,
		fbar : buttons,
		labelAlign : 'left',
		labelWidth : 100,
		padding : 5,
		autoScroll : true,
		defaultType: 'textfield',
		items : items
	});
	
	return inform;
}