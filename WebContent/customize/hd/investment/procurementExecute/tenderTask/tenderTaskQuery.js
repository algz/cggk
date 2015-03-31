var tenderTaskQuery = {};
tenderTaskQuery.combo = function(){
	
	var combox = new Ext.form.ComboBox({
		id : "procurementType",
		fieldLabel : '采购类型',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [['','全部'],['3','定向采购'],['4','委托招标'],['5','自行比价']]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true, 
		anchor : '89%',
		value : ''
	})
	return combox;
}
tenderTaskQuery.getSearchForm = function(){
 
	var items = [ {
		xtype : "textfield",
		fieldLabel : '任务名称',
		lableWidth : 150,
		id : 'materialitemname',
		anchor : '89%'
	},
	{
		xtype : "textfield",
		fieldLabel : '规格牌号',
		lableWidth : 150,
		id : 'materialstandard',
		anchor : '89%'
	},  {
		xtype : "numberfield",
		fieldLabel : '采购数量',
		lableWidth : 150,
		id : 'amount',
		anchor : '89%'
	},  {
		xtype : "textfield",
		fieldLabel : '提出单位',
		lableWidth : 150,
		id : 'demartment',
		anchor : '89%'
	},  {
		xtype : "textfield",
		fieldLabel : '任务编号',
		lableWidth : 150,
		id : 'taskCode',
		anchor : '89%'
	},  {
		xtype : "textfield",
		fieldLabel : '生产厂商',
		lableWidth : 150,
		id : 'plant',
		anchor : '89%'
	}, tenderTaskQuery.combo()]; 

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
			var materialitemname = Ext.getCmp("materialitemname").getValue();
			var materialstandard = Ext.getCmp("materialstandard").getValue();
			var amount = Ext.getCmp("amount").getValue();
			var demartment = Ext.getCmp("demartment").getValue();
			var plant = Ext.getCmp("plant").getValue();
			var taskCode = Ext.getCmp("taskCode").getValue();
			var grid = Ext.getCmp('tenderTaskGrid');
			var procurementType  = Ext.getCmp('procurementType').getValue();
			grid.getStore().baseParams = {start:0,limit:20,materialItemName:materialitemname,materialStandard:materialstandard,amount:amount,departmentName:demartment,taskCode:taskCode,procurementType:procurementType,plant:plant,materialcatalogName:'机电设备'};
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
		id : "tenderTaskQuery",
		title : "查询页面",
		width : 450, 
		layout : 'fit',
		autoScroll : true, 
		modal : true,
		items : inform,
		autoDestory : true,
		closeAction :'hide',
		buttons : buttons
	});
	return window;


}