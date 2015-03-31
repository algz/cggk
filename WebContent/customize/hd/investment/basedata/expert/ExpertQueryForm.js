var ExpertQueryForm = {
		
};

ExpertQueryForm.getSearchForm = function(){ 
	var buttons = [ {
		text : ' 查询 ',
		handler : function() {
			var exportCode = Ext.getCmp("exportCode").getValue();
			var exportName = Ext.getCmp("exportName").getValue();
			var exportTitle = Ext.getCmp("exportTitle").getValue();
			var exportAge = Ext.getCmp("exportAge").getValue();
			var exportPost = Ext.getCmp("exportPost").getValue(); 
			var grid = Ext.getCmp('ExpertGridPanelId'); 
				grid.store.baseParams={start:0,limit:20,exportAge:exportAge,exportCode:exportCode,exportName:exportName,exportTitle:exportTitle,exportPost:exportPost};
				grid.store.load();
		 
			ExpertQueryFormSearchForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
			ExpertQueryFormSearchForm.getForm().reset();
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
					fieldLabel : '编号',
					xtype : 'textfield',
					id : 'exportCode',
					anchor : '90%'
				}
				 ]
			},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '姓名',
					xtype : 'textfield',
					id : 'exportName',
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
				fieldLabel : '年龄',
				xtype : 'numberfield',
				id : 'exportAge',
				anchor : '90%'
			} ]
	},{
		columnWidth : .49,
		layout : 'form',
		border : false,
		items : [ {xtype : 'textfield',
			fieldLabel : '职务',
			lableWidth : 150, 
			id : 'exportPost',
			anchor : '90%'}
		 ]
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
				fieldLabel : '职称',
				xtype : 'textfield',
				id : 'exportTitle',
				anchor : '90%'
			} ]
	} ]
	
	}];

	
	//表单
	var ExpertQueryFormSearchForm = new Ext.form.FormPanel({
		padding : 5,
		buttonAlign:'center',
		layout : 'column',
		autoScroll : true,
		width : 700,
	    autoHeight:true,
		items : [item]
	});
	
	var window = new Ext.Window( {
		id : "ExpertQueryFormwind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '查询',
		modal : true,
		items : ExpertQueryFormSearchForm,
		border : true,
		closeAction :'close'
	});
	return window;



}