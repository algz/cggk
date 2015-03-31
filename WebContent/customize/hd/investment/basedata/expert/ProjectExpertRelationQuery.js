var ProjectExpertRelationQuery = {
		
};

ProjectExpertRelationQuery.getSearchForm = function(){ 
	var buttons = [ {
		text : ' 查询 ',
		handler : function() {
			var projectCode = Ext.getCmp("projectCode").getValue();
			var projectName = Ext.getCmp("projectName").getValue();
			var exportName = Ext.getCmp("exportName").getValue();
			var projectAmount = Ext.getCmp("projectAmount").getValue(); 
			var grid = Ext.getCmp('ProjectExpertRelationGridPanelId'); 
				grid.store.baseParams={start:0,limit:20,projectAmount:projectAmount,projectCode:projectCode,projectName:projectName,exportName:exportName};
				grid.store.load();
		 
			ProjectExpertRelationQuerySearchForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
			ProjectExpertRelationQuerySearchForm.getForm().reset();
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
					fieldLabel : '项目编号',
					xtype : 'textfield',
					id : 'projectCode',
					anchor : '90%'
				}
				 ]
			},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '项目名称',
					xtype : 'textfield',
					id : 'projectName',
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
				fieldLabel : '金额',
				xtype : 'numberfield',
				id : 'projectAmount',
				anchor : '90%'
			} ]
	},{
		columnWidth : .49,
		layout : 'form',
		border : false,
		items : [ {xtype : 'textfield',
			fieldLabel : '专家',
			lableWidth : 150, 
			id : 'exportName',
			anchor : '90%'}
		 ]
	}]
	
	} ];

	
	//表单
	var ProjectExpertRelationQuerySearchForm = new Ext.form.FormPanel({
		padding : 5,
		buttonAlign:'center',
		layout : 'column',
		autoScroll : true,
		width : 700,
	    autoHeight:true,
		items : [item]
	});
	
	var window = new Ext.Window( {
		id : "ProjectExpertRelationQuerywind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '查询',
		modal : true,
		items : ProjectExpertRelationQuerySearchForm,
		border : true,
		closeAction :'close'
	});
	return window;



}