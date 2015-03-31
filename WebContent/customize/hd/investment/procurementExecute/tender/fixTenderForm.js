//招标管理的 form
var fixTenderForm = {
		selectRow : null,
		selectObj : null,
		fixid : null,
		name : null
};

fixTenderForm.getForm = function(rd,procurementPlanDetilId,tenderType,tenderId) { 
	var buttons = [ {
		text : ' 提交 ',
		handler : function() {
			if(fixTenderForm.fixid == null){
				Ext.Msg.alert('提示', '请选择招标项目！');
				return;
			}
			if (fixTenderForm.form.isValid()) { 
				fixTenderForm.form.doAction('submit', {
					waitMsg : '正在保存数据，请稍候...',
					waitTitle : '提示',
//					url : '../JSON/stockPlan_Remote.updateFixInfo?d=' + new Date(),
					url : '../JSON/tenderRemote.saveTender?d=' + new Date(),
					method : 'post', 
					params:{
						procurementPlanDetilId:fixTenderForm.fixid,
						procurementPlanDetilName:fixTenderForm.name
					},
					success : function(form, action) { 
							Ext.Msg.alert('提示', '保存数据成功！');
							form.reset();
							window.close(); 
							Ext.getCmp("fixTenderGrid").store.baseParams={start:0,limit:20,pageType:'2'}; 
							Ext.getCmp("fixTenderGrid").store.load();
					}
				
				})
			} 
		}
	}, {
		text : '返回',
		handler : function() {
			window.close();
		}
	} ];

	var item1 = [

	{
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
					fieldLabel : '招标单位',
					xtype : 'textfield',
					name :　'tenderDepartment',
					anchor : '90%'
				},{
					fieldLabel : '招标方式',
					xtype : 'combo',
					displayField : 'text',
					valueField : 'value',
					allowBlank : false,
					id:'tenderTypeId',
					store : new Ext.data.SimpleStore({
						fields : ['value','text'],
						data : [['3','定向采购'],['4','委托招标'],['5','自行比价']]
					}),
					triggerAction : 'all',
					mode : 'local',
					editable : false,
					name : 'tenderType',
					hiddenName : 'tenderType',
					anchor : '90%',
					listeners:{ 
				         'select': function(){
				         	parityVendorGridStore.baseParams = {start:0,limit:20,materialcatalogName:'机电设备',procurementType:this.value,planId:"1",tenderId:tenderId}; 
							parityVendorGridStore.load();
				         }
				    }
				} ]
			},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '名称',
					xtype : 'textfield',
					name : 'tenderName',
					anchor : '90%',
					allowBlank : false
				}, {
					fieldLabel : '备注',
					xtype : 'textarea',
					name : 'remark',
					anchor : '90%'
				} , {
					xtype : 'textfield',
					name : 'tenderId',
					hidden:true 
				},{ 
					xtype : 'textfield',
					name : 'tenderCode',
					hidden:true
				} ]
		}]
	}];

	
	
	var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect : true
	}); 
	var parityVendorGridStore = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/stockPlan_Remote.getGridDataByType?d='+ new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'rownum',
			totalProperty : 'totalProperty'
		}, [ 'materialitemname','demartment','amount','procurementtype','rownum','fixid'])
	}); 
	var cm = new Ext.grid.ColumnModel([sm,rm, {
		header : '采购项目名称',
		dataIndex : 'materialitemname',
		anchor : '90%',
		sortable : true,
		width : 150
	},{
		header : '预算金额',
		dataIndex : 'amount',
		anchor : '90%',
		sortable : true,
		width : 120
	},{
		header : '申报单位',
		dataIndex : 'demartment',
		anchor : '90%',
		sortable : true,
		width : 160
	},{
		header : '招标方式',
		dataIndex : 'procurementtype',
		sortable : true,
		anchor : '90%',
		width : 80
	},{ 
		dataIndex : 'fixid', 
		hidden : true 
	}]);
	

		
	var grid = new Ext.grid.EditorGridPanel({
	     store : parityVendorGridStore,
	     cm : cm,
	     sm : sm,
	     autoScroll : true,
	     height : 200,
	     id : "parityVendorGrid",
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     },
	     clicksToEdit : 1,
	     bbar : new Ext.PagingToolbar({
				pageSize : 20,
				store : parityVendorGridStore,
				displayInfo : true,
				displayMsg : '显示第{0}条到{1}条记录,一共{2}条',
				emptyMsg : '没有记录'
				
			}) 
	});
	parityVendorGridStore.baseParams = {start:0,limit:20,materialcatalogName:'机电设备',procurementType:tenderType,tenderId:tenderId}; 
	parityVendorGridStore.load();
	parityVendorGridStore.on('load',function(store, records, options){ 
		  for(i =0; i<records.length;i++){
		  		
      			if(records[i].get('fixid')==procurementPlanDetilId){ 
      				 fixTenderForm.fixid = procurementPlanDetilId;
      				sm.selectRow(i,true);
      				break;
      			} 
		  }
	});
	grid.on({   
            render:{   
                fn: function() {   
                   grid.store.load();   
                }   
            },   
            scope:grid  
        });  

	//选择多选框，将records取出
	sm.on('rowselect', function(sm, rowIndex, record) {
		fixTenderForm.selectRow = record;
		fixTenderForm.fixid = record.get("fixid");
		fixTenderForm.name = record.get("materialitemname");
	});
	sm.on('selectionchange', function(sm, t) {
		fixTenderForm.selectObj = sm.getSelections();
		if(!sm.getSelections() || sm.getSelections().length<1){
			fixTenderForm.selectRow = null;
			fixTenderForm.fixid = null;
			fixTenderForm.name = null;
		}
	});
	

	//表单
	var fixTenderForm = new Ext.form.FormPanel({
		id : 'fixTenderFormId',
		padding : 5, 
		layout : 'column',
		autoScroll : true,
		width : 700,
		autoHeight:true,
		items : [item1,grid]
	});
	
	if(rd!=null)
	{
		fixTenderForm.getForm().loadRecord(rd); 
		Ext.getCmp("tenderTypeId").disable();
	}
	var window = new Ext.Window( {
		id : "fixTenderAddWind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '新增',
		modal : true,
		items : fixTenderForm,
		border : true
	});
	return window;

} 