var venderEvaluationQuery = {
		
};

venderEvaluationQuery.getSearchForm = function(){ 
	var buttons = [ {
		text : ' 查询 ',
		handler : function() {
			var vendorCode = Ext.getCmp("vendorCode").getValue();
			var vendorName = Ext.getCmp("vendorName").getValue();
			var type = Ext.getCmp("type").getValue();
			var vendorLevel = Ext.getCmp("vendorLevel").getValue(); 
			var grid = Ext.getCmp('venderEvaluationGridPanelId'); 
				grid.store.baseParams={start:0,limit:20,pageType:'1',vendorCode:vendorCode,vendorName:vendorName,type:type,vendorLevel:vendorLevel};
				grid.store.load();
		 
			venderEvaluationQuerySearchForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
			venderEvaluationQuerySearchForm.getForm().reset();
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
				fieldLabel : '等级',
				xtype : 'textfield',
				id : 'vendorLevel',
				anchor : '90%'
			} ]
	},{
		columnWidth : .49,
		layout : 'form',
		border : false,
		items : [ {xtype : 'textfield',
			fieldLabel : '类别',
			lableWidth : 150, 
			id : 'type',
			anchor : '90%'}
		 ]
	}]
	
	}];

	
	//表单
	var venderEvaluationQuerySearchForm = new Ext.form.FormPanel({
		padding : 5,
		buttonAlign:'center',
		layout : 'column',
		autoScroll : true,
		width : 700,
	    autoHeight:true,
		items : [item]
	});
	
	var window = new Ext.Window( {
		id : "venderEvaluationQuerywind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '查询',
		modal : true,
		items : venderEvaluationQuerySearchForm,
		border : true,
		closeAction :'close'
	});
	return window;



}