var contractExecuteForm = {};
contractExecuteForm.getForm = function(){
	var items = [{
		defaults:{layout:'form',columnWidth:0.5,autoHeight:true,bodyStyle:'padding:4px'},
		items:[{
			items:[{
				xtype:'fieldset',				
				title : '运输情况',
				defaults : {anchor : '-20'},
				defaultType : 'textfield',
				items : [{
			   	   fieldLabel : '<font color=red>*</font>运输方式',
			   	   name : 'transportMode',
			   	   allowBlank : false
				},{
			   	   fieldLabel : '<font color=red>*</font>运单号',
			   	   name : 'transportNo',
			   	   allowBlank : false
				},{
			   	   fieldLabel : '<font color=red>*</font>运输日期',
			   	   xtype : 'datefield',
			   	   format : 'Y-m-d',
			   	   name : 'transportDate',
			   	   allowBlank : false
				}]
			}]
		   },{
			items:[{
				xtype:'fieldset',
			   title : '材料到厂情况',
			   defaults : {anchor : '-20'},
			   defaultType : 'textfield',
			   items : [{
			   	   fieldLabel : '到厂数量',
			   	   xtype : 'numberfield',
			   	   name : 'equipmentNumber'
			   },{
			   	   fieldLabel : '生产批次',
			   	   name : 'batchNo'
			   },{
			   	   fieldLabel : '到厂时间',
			   	   xtype : 'datefield',
			   	   format : 'Y-m-d',
			   	   name : 'arrivalDate'
			   }]
		   }]}]
	},{
		defaults:{layout:'form',columnWidth:0.5,autoHeight:true,bodyStyle:'padding:4px'},
		items:[{
			items:[{
				xtype:'fieldset',
			   title : '请检情况',
			   defaults : {anchor : '-20'},
			   defaultType : 'textfield',
			   items : [{
				   xtype : 'button',
				   text : '提取请检情况',
				   disabled : true,
				   anchor : '40%'
			   },{
			   	   fieldLabel : '请检单号',
			   	   name : 'testNo'
			   },{
			   	   fieldLabel : '技术证明',
			   	   name : 'certificate'
			   },{
			   	   fieldLabel : '申请日期',
			   	   xtype : 'datefield',
			   	   format : 'Y-m-d',
			   	   name : 'testDate'
			   }]
			}]
		   },{
			items:[{
			   xtype:'fieldset',
			   title : '入库情况',
			   defaults : {anchor : '-20'},
			   defaultType : 'textfield',
			   items : [{
				   xtype : 'button',
				   text : '提取入库情况',
				   disabled : true,
				   anchor : '40%'
			   },{
			   	   fieldLabel : '入库单号',
			   	   name : 'storageNo'
			   },{
			   	   fieldLabel : '入库数量',
			   	   xtype : 'numberfield',
			   	   name : 'storageNumber'
			   },{
			   	   fieldLabel : '保管验收',
			   	   hiddenName : 'acceptance',
			   	   typeAhead : true,
			   	   triggerAction : 'all',
			   	   lazyRender : true,
			   	   mode : 'local',
			   	   xtype : 'combo',
			   	   editable : false,
			   	   store : new Ext.data.ArrayStore({
			   		   id:0,fields:['key','value'],data:[['0','未验收'],['1','已验收']]
			   	   }),
			   	   valueField : 'key',
			   	   displayField : 'value'		   	   
			   },{
			   	   fieldLabel : '入库日期',
			   	   xtype : 'datefield',
			   	   format : 'Y-m-d',
			   	   name : 'storageDate'
			   }]
		   }]}]
	},{
		defaults:{xtype:'fieldset',layout:'form',columnWidth:1,autoHeight:true},
		items:[{
			   title : '其他信息',
			   columnWidth : 1,
			   colspan : 2,
			   defaults : {anchor : '-20'},
			   items : [{
			   	   fieldLabel : '备注描述',
			   	   xtype : 'textarea',
			   	   name : 'remark',
				   allowBlank : true,
				   maxLength : 100,
				   maxLengthText : '最多可输入100个字，请重新输入！'
			   },{
				   xtype : 'hidden',
				   name : 'procurementContractId',
				   value : contractExecuteMain.contractId
			   },{
				   xtype : 'hidden',
				   name : 'contractExecuteId'
			   },{
				   xtype : 'hidden',
				   name : 'createDate'
			   }]
		   }]
	}];
		
	var buttons = [{
		text : '保存',
		handler : function(){
			if(inform.form.isValid()) {
				inform.form.doAction('submit',{
					waitMsg:'正在保存数据，请稍候...',
					waitTitle:'提示',
					url : '../JSON/contractExecute_ContractExecuteRemote.saveContractExecute',
					method : 'post',
					success : function(form, action) {
						if(contractExecuteMain.isDirectAdd){
							contractExecuteMain.window.close();
						}else{
							Ext.getCmp('contractExecuteGridId').getStore().reload();
							contractExecuteAction.gridView();
						}
						Ext.Msg.alert('提示','保存数据成功！');
						form.reset();
					},
					failure : function(form, action){
						Ext.Msg.alert('提示','保存数据失败！');
					}
				})
			}
		}		
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			if(contractExecuteMain.isDirectAdd){
				contractExecuteMain.window.close();
			}else{
				contractExecuteAction.gridView();
			}
		}
	}];
	
	var inform = new Ext.FormPanel({
		id : 'contractExecuteFrom',
		buttonAlign : 'right',
		frame : true,
		fbar : buttons,
		labelAlign : 'left',
		labelWidth : 80,
		autoScroll : true,
		defaults : {
			layout : 'column',
			border : false
		},
		items : items
	});
		
	return inform;
}
