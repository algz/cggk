var admissionTestForm = {
	contractId : null
};
admissionTestForm.combo = function(){ 
	var combox = new Ext.form.ComboBox({
		id : 'qualifyNo',
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
		anchor : '95%'
	})
	return combox;
}
/*
 * 获取合同列表
  */
admissionTestForm.getContract = function(){ 
		var rm = new Ext.grid.RowNumberer();
		var sm = new Ext.grid.CheckboxSelectionModel({
		    singleSelect : true
		});
		var store = new Ext.data.Store(
				{
					proxy : new Ext.data.HttpProxy( {
						url : '../JSON/contract_Remote.getContractList?d='
							+ new Date(),
						method : 'POST'
					}),
					reader : new Ext.data.JsonReader( {
						root : 'results',
						id : 'contractId',
						totalProperty : 'totalProperty'
					},['contractId', 'contractCode', 'contractName', 'tenderId',
					'departmentA', 'departmentB', 'contractAmount', 'status',
					'createDate', 'contractFile', 'reMark','vendorName'])
				}); 
		var cm = new Ext.grid.ColumnModel( [
				sm,
				rm,
				{
				header : "合同编号",
				dataIndex : 'contractCode'
			}, {
				header : "合同名称",
				dataIndex : 'contractName'
			}, {
				header : "合同金额",
				dataIndex : 'contractAmount'
			}, {
				header : "甲方",
				dataIndex : 'departmentA'
			}, {
				header : "乙方",
				dataIndex : 'departmentB'
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
				tbar:toolbar,
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
			});
		store.baseParams={start:0,limit:20,status:'3'}
		store.load();
	
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {  
			var records = Ext.getCmp("ContractGridPanelId").getSelectionModel().getSelections();
			if(records==null || records.length==0){
				Ext.Msg.alert('提示','请选择合同信息！');
				return ;
			} 
			admissionTestForm.contractId = records[0].get("contractId");
			Ext.getCmp("admissionTestForm").getForm().loadRecord(records[0]);
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
admissionTestForm.getMaterial = function(){ 
		var rm = new Ext.grid.RowNumberer();
		var sm = new Ext.grid.CheckboxSelectionModel({
		    singleSelect : true
		});
		var store = new Ext.data.Store(
				{
					proxy : new Ext.data.HttpProxy( {
						url : '../JSON/registrationRemote.getMaterialList?d=' + new Date(),
						method : 'POST'
					}),
					reader : new Ext.data.JsonReader( {
						root : 'results',
						id : 'materialid',
						totalProperty : 'totalProperty'
					},[ 'materialid', 'materialItemName', 'desingnation',
						'materialStandard', 'demension'])
				}); 
		var cm = new Ext.grid.ColumnModel( [
				sm,
				rm,
				{
				header : '物资名称',
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
				header : '量纲',
				dataIndex : 'demension',
				width : 100,
				sortable : true
			}]);
		 
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
				stripeRows : true,
				viewConfig : {
					enableRowBody : true
				},
				tbar:toolbar,
				bbar : new Ext.PagingToolbar({
							pageSize : 20,
							store : store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
							emptyMsg : '没有记录'
							
						})
			});
		store.baseParams={start:0,limit:20,contractId:admissionTestForm.contractId}
		store.load();
	
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {  
			var records = Ext.getCmp("MaterialGridPanelId").getSelectionModel().getSelections();
			if(records==null || records.length==0){
				Ext.Msg.alert('提示','请选择合同信息！');
				return ;
			} 
			Ext.getCmp("admissionTestForm").getForm().loadRecord(records[0]);
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
admissionTestForm.getForm = function(rd) { 
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
	        				items : [{name:'contractId',hidden:true},
	        						{name:'itemId',hidden:true},
	        				     {
		        					fieldLabel : '合同编号',	
		        					xtype :'textfield',
		        					name : 'contractCode', 
		        					anchor : '95%',
		        					listeners : {
										focus : function(field){
											admissionTestForm.getContract().show(); 
										}
									}
		        				},{
		        					fieldLabel : '物资编号',	
		        					xtype :'textfield',
		        					name : 'itemId',  
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '到货批次',	
		        					xtype :'textfield',
		        					name : 'lotNo', 
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '发票号码',	
		        					xtype :'textfield',
		        					name : 'invoiceNo', 
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '运输数量',	
		        					xtype :'numberfield',
		        					name : 'transportNum', 
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '采购数量',	
		        					xtype :'numberfield',
		        					name : 'purchaseNum', 
		        					disabled : true,
		        					anchor : '95%'
		        				},{
		        					fieldLabel : '到货日期',	
		        					xtype : "datefield",
		        					format : 'Y-m-d',
									editable : false,
		        					name : 'arrivalDate', 
		        					disabled : true,
		        					anchor : '95%'
		        				}] 
	               	},{
                    	columnWidth : .5,
        				border : false,
        				layout : 'form',
        				items : [
        				    {
	        					fieldLabel : '合同名称',	
	        					xtype :'textfield', 
	        					name : 'contractName', 
	        					disabled : true,
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '物资名称',	
	        					name : 'itemName', 
	        					xtype :'textfield', 
	        					disabled : true,
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '到货数量',	
	        					xtype :'numberfield',
	        					name : 'arrivalNum', 
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '运单号',	
	        					xtype :'textfield',
	        					name : 'transportNo', 
	        					anchor : '95%'
	        				},{
	        					fieldLabel : '运输日期',	
	        					xtype : "datefield",
	        					format : 'Y-m-d',
								editable : false,
	        					name : 'transportDate', 
	        					anchor : '95%'
	        				} ,admissionTestForm.combo(),{
	        					fieldLabel : '路线卡',	
	        					xtype :'textfield',
	        					name : 'plant', 
	        					disabled : true,
	        					anchor : '95%'
	        				}] 
               	}
	               ]
	              }];

	var inform = new Ext.FormPanel( {
		id : 'admissionTestForm',
		buttonAlign : 'center',
		labelAlign : 'left', 
		lableWidth : 150,
		width : 480,
		height : 200,
		frame : false,
		border : false,
		items : items,
		fileUpload : false,
		padding : 5 
	}); 
	if(rd!=null)
	inform.getForm().loadRecord(rd);
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
							url : '../JSON/registrationRemote.saveRegistration?d=' + new Date(),
							method : 'post',
							success : function(form, action) {//在这处理逻辑。
								   
							},
							failure : function(form, action) {
								Ext.Msg.alert('提示',"保存失败");
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
		id : "admissionTestFormAddWind",
		width : 500,
		layout : 'fit',
		autoScroll : true,
		title : '入厂登记',
		modal : true,
		items : inform,
		border : true,
		buttons : buttons,
		closeAction : 'close'
	});
	return window;

} 
