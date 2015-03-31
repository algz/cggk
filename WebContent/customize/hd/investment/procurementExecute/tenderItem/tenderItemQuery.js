var tenderItemQuery = {};
tenderItemQuery.combo = function(id){
	
	var combox = new Ext.form.ComboBox({
		id : id,
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [['>','>'],['=','='],['<','<'],['>=','>='],['<=','<=']]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true,
		value : '='
	})
	return combox;
}
tenderItemQuery.getSearchForm = function(){
 
	var items = [ {
		xtype : "textfield",
		fieldLabel : '采购项名称',
		lableWidth : 150,
		id : 'materialitemname',
		anchor : '89%'
	},
	{ 
		id : 'amount',
		fieldLabel : '預算金额',
		xtype : 'numberfield', 
		anchor : '89%' 
},  {    
			id:'demartment',
			fieldLabel : '申报单位',
			xtype : 'textfield',  
			anchor : '89%'
},  {
			id:'time',
			xtype : 'datefield', 
			fieldLabel : '审批时间',
			format : 'Y-m-d',
			anchor : '89%'
}]; 

	var inform = new Ext.FormPanel( {
		id : 'tenderItemQueryFrom', 
		buttonAlign : 'center',
		labelAlign : 'right', 
		autoHeight : true, 
		frame : false,
		items : items,
		width : 370,
		height : 150
	});
	
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {  
		    var materialitemname = Ext.getCmp("materialitemname").getValue();
		    var amount = Ext.getCmp("amount").getValue();
		    var demartment =  Ext.getCmp("demartment").getValue();
			var grid = Ext.getCmp('tenderItemGrid');
			grid.getStore().baseParams = {start:0,limit:20,materialItemName:materialitemname,amount:amount
				,departmentName:demartment,materialcatalogName:'土建'};
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
		id : "tenderItemQuery",
		title : "查询页面",
		layout : 'fit',
		width : 370,
		autoScroll : true, 
		modal : true,
		items : inform,
		autoDestory : true,
		closeAction :'close',
		buttons : buttons
	});
	return window;


}