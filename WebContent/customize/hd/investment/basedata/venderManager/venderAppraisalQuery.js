var venderAppraisalQuery = {
		
};
venderAppraisalQuery.combo = function(){
	
	var combox = new Ext.form.ComboBox({
		id : "appraisalStatus",
		fieldLabel : '状态',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [['0','未考核'],['1','合格'],['2','试供']]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
		width:50,
		forceSelection : true, 
		anchor : '89%'
	})
	return combox;
}
venderAppraisalQuery.getSearchForm = function(){ 
	var buttons = [ {
		text : ' 查询 ',
		handler : function() {
			var appraisalNo = Ext.getCmp("appraisalNo").getValue();
			var appraisalName = Ext.getCmp("appraisalName").getValue();
			var appraisalStatus = Ext.getCmp("appraisalStatus").getValue(); 
			Ext.getCmp('venderAppraisalGridPanelId').store.baseParams={start:0,limit:20,appraisalNo:appraisalNo,appraisalName:appraisalName,appraisalStatus:appraisalStatus};
			Ext.getCmp('venderAppraisalGridPanelId').store.load(); 
			venderAppraisalQuerySearchForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
			venderAppraisalQuerySearchForm.getForm().reset();
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
					fieldLabel : '考核编号',
					xtype : 'textfield',
					id : 'appraisalNo',
					anchor : '90%'
				}
				 ]
			},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '考核名称',
					xtype : 'textfield',
					id : 'appraisalName',
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
			items : [venderAppraisalQuery.combo() ]
	} ]  
	}];

	
	//表单
	var venderAppraisalQuerySearchForm = new Ext.form.FormPanel({
		padding : 5,
		buttonAlign:'center',
		layout : 'column',
		autoScroll : true,
		width : 700,
	    autoHeight:true,
		items : [item]
	});
	
	var window = new Ext.Window( {
		id : "venderAppraisalQuerywind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '查询',
		modal : true,
		items : venderAppraisalQuerySearchForm,
		border : true,
		closeAction :'close'
	});
	return window;



}