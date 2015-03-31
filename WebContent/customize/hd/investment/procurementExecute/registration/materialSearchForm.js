var materialSearchForm = {};
materialSearchForm.getSearchForm = function(){ 
	var buttons = [ {
		text : ' 查询 ',
		handler : function() {
			var materialItemName = Ext.getCmp("materialItemName").getValue();
			var materialitemcode = Ext.getCmp("materialitemcode").getValue();
			var materialStandard = Ext.getCmp("materialStandard").getValue();
			var desingnation  = Ext.getCmp("desingnation").getValue();
			var demension = Ext.getCmp("demension").getValue();
			var technicCondition = Ext.getCmp("technicCondition").getValue(); 
		 	Ext.getCmp("MaterialGridPanelId").store.baseParams={start:0,limit:20,materialItemName:materialItemName,
		 	materialitemcode:materialitemcode,materialStandard:materialStandard,
		 	demension:demension,technicCondition:technicCondition,desingnation:desingnation};
			Ext.getCmp("MaterialGridPanelId").store.load(); 
			materialItemForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
			materialItemForm.getForm().reset();
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
					fieldLabel : '物资编号',
					xtype : 'textfield',
					id : 'materialitemcode',
					anchor : '90%'
				}
				 ]
			},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '物资名称',
					xtype : 'textfield',
					id : 'materialItemName',
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
				fieldLabel : '规格',
				xtype : 'textfield',
				id : 'materialStandard',
				anchor : '90%'
			} ]
	},{
		columnWidth : .49,
		layout : 'form',
		border : false,
		items : [ {fieldLabel : '单位',
				xtype : 'textfield',
				id : 'demension',
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
					fieldLabel : '技术条件',
					xtype : 'textfield',
					id : 'technicCondition',
					anchor : '90%'
				} ]
		},{
		columnWidth : .49,
		layout : 'form',
		border : false,
		items : [ {fieldLabel : '牌号',
				xtype : 'textfield',
				id : 'desingnation',
				anchor : '90%'}
		 ]
	}]
	}];

	
	//表单
	var materialItemForm = new Ext.form.FormPanel({
		padding : 5,
		buttonAlign:'center',
		layout : 'column',
		autoScroll : true,
		width : 700,
	    autoHeight:true,
		items : [item]
	});
	
	var window = new Ext.Window( {
		id : "materialItemwind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '查询',
		modal : true,
		items : materialItemForm,
		border : true,
		closeAction : 'close'
	});
	return window;



}