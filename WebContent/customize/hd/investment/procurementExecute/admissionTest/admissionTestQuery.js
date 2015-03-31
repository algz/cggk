var admissionTestQuery = {
		
};

admissionTestQuery.getSearchForm = function(){ 
	var buttons = [ {
		text : ' 查询 ',
		handler : function() {
			var vendorCode = Ext.getCmp("vendorCode").getValue();
			var vendorName = Ext.getCmp("vendorName").getValue();
			var scale = Ext.getCmp("scale").getValue();
			var businessScope = Ext.getCmp("businessScope").getValue(); 
			var grid = Ext.getCmp('admissionTestGridPanelId'); 
				grid.store.baseParams={start:0,limit:20,pageType:'1',vendorCode:vendorCode,vendorName:vendorName,scale:scale,businessScope:businessScope};
				grid.store.load();
		 
			admissionTestQuerySearchForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
			admissionTestQuerySearchForm.getForm().reset();
			window.close();
		}
	} ];;

	var item = [
	{
		layout : 'column',
		xtype : 'container',
		defaults : {
			border : false,
			labelWidth : 85
		},
		items : [{
				columnWidth : .49,
				width : 700,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '供应商编号',
					xtype : 'textfield',
					id : 'vendorCode',
					anchor : '90%'
				}
				 ]
			},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '供应商名称',
					xtype : 'textfield',
					id : 'vendorName',
					anchor : '90%'
				} ]
		}]
	},{

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
				fieldLabel : '规模',
				xtype : 'textfield',
				id : 'scale',
				anchor : '90%'
			} ]
	},{
		columnWidth : .49,
		layout : 'form',
		border : false,
		items : [ {xtype : 'textfield',
			fieldLabel : '经营范围',
			lableWidth : 150, 
			id : 'businessScope',
			anchor : '90%'}
		 ]
	}]
	
	}];

	
	//表单
	var admissionTestQuerySearchForm = new Ext.form.FormPanel({
		padding : 5,
		buttonAlign:'center',
		layout : 'column',
		autoScroll : true,
		width : 700,
	    autoHeight:true,
		items : [item]
	});
	
	var window = new Ext.Window( {
		id : "admissionTestQuerywind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '查询',
		modal : true,
		items : admissionTestQuerySearchForm,
		border : true,
		closeAction :'close'
	});
	return window;



}