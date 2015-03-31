var tenderUnitsQuery = {}; 
tenderUnitsQuery.getSearchForm = function(){
 
	var items = [ {
		xtype : "textfield",
		fieldLabel : '供应商名称名称',
		lableWidth : 150,
		id : 'venderName',
		anchor : '89%'
	},
	{
		xtype : "textfield",
		fieldLabel : '供应商编号',
		lableWidth : 150,
		id : 'venderCode',
		anchor : '89%'
	},  {
		xtype : "numberfield",
		fieldLabel : '价格',
		lableWidth : 150,
		id : 'price',
		anchor : '89%'
	},  {
		xtype : "textfield",
		fieldLabel : '经营范围',
		lableWidth : 150,
		id : 'businessScope',
		anchor : '89%'
	},  {
		xtype : "textfield",
		fieldLabel : '经营地址',
		lableWidth : 150,
		id : 'address',
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
			var venderName = Ext.getCmp("venderName").getValue();
			var venderCode = Ext.getCmp("venderCode").getValue();
			var price = Ext.getCmp("price").getValue();
			var address = Ext.getCmp("address").getValue();
			var businessScope  = Ext.getCmp('businessScope').getValue();
			
			var grid = Ext.getCmp('tenderUnitsGrid'); 
			grid.getStore().baseParams = {start:0,limit:20,venderName:venderName,venderCode:venderCode,price:price,address:address,businessScope:businessScope};
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
		id : "tenderUnitsQuery",
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