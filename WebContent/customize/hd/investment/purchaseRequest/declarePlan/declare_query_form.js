var declare_query_form = {};
declare_query_form.combo = function(id){
	
	var combox = new Ext.form.ComboBox({
		id : 'status',
		fieldLabel : '审批状态',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [['','全部'],['1','编制中'],['2','待审批'],['3','审批中'],['4','已审批'],['5','已生成'],['6','已退回']]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true,
		anchor : '89%',
		value :''
	})
	return combox;
}
declare_query_form.declareTypeCombo = function(id){
	
	var combox = new Ext.form.ComboBox({
		id : 'declareType',
		fieldLabel : '采购类型',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [['1','计划内'],['2','应急'],['3','非应急']]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true,
		anchor : '89%',
		value :''
	})
	return combox;
}
declare_query_form.getSearchForm = function(){
 
	var items = [declare_query_form.declareTypeCombo(),{
		xtype : "textfield",
		fieldLabel : '金额≧',
		lableWidth : 150,
		id : 'minAmount',
		name: 'minAmount',
		anchor : '89%' 
	},{
		xtype : "textfield",
		fieldLabel : '金额≦',
		lableWidth : 150,
		id : 'maxAmount',
		name: 'maxAmount',
		anchor : '89%' 
	},declare_query_form.combo() ,
	{
		xtype : "textfield",
		fieldLabel : '编制人',
		lableWidth : 150,
		id : 'editer',
		name: 'editer',
		anchor : '89%'
},  {
		xtype : "datefield",
		fieldLabel : '编制时间',
		lableWidth : 150,
		id : 'editDate',
		name:'editDate',
		format : 'Y-m-d',
		anchor : '89%'
}]; 

	var inform = new Ext.FormPanel( {
		id : 'productFrom', 
		buttonAlign : 'center',
		labelAlign : 'right', 
		autoHeight : true, 
		frame : false,
		items : items,
		width : 350,
		height : 150
	});
	
	var buttons = [ {
		text : ' 确定 ',
		handler : function() { 
		var grid = Ext.getCmp('declarePlanGrid');
		var editer = Ext.getCmp('editer').getValue();//编制人
		var editDate = Ext.getCmp('editDate').getValue();
		editDate = Ext.util.Format.date(editDate,'Y-m-d');//编制时间
		var status = Ext.getCmp('status').getValue();//审批状态
		var declareType = Ext.getCmp('declareType').getValue();//采购类型
		var minAmount = Ext.getCmp('minAmount').getValue();//金额最小值
		var maxAmount = Ext.getCmp('maxAmount').getValue();//金额最大值
		
		grid.getStore().baseParams = {start:0,limit:20,editer:editer,editDate:editDate
			,status:status,declareplanType : declareType,minAmount:minAmount,maxAmount:maxAmount};
		grid.store.load();
		window.close();

	}
	}, {
		text : '取消',
		handler : function() {
			inform.getForm().reset();
			window.close();
		}
	} ]

	var window = new Ext.Window( {
		id : "declare_query_form_win",
		title : "查询页面",
		width : 350,
		layout : 'fit',
		autoScroll : true, 
		modal : true,
		items : inform,
		autoDestory : true,
		buttons : buttons,
		closeAction :'close'
	});
	return window;


}