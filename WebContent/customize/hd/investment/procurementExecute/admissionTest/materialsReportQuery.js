var materialsReportQuery = {
		
};

materialsReportQuery.getSearchForm = function(){ 
	var buttons = [ {
		text : ' 查询 ',
		handler : function() {
			var startDate = Ext.getCmp("startDate").getValue();
			if(startDate!="")
				startDate = startDate.dateFormat('Y-m-d');
			var endDate = Ext.getCmp("endDate").getValue(); 
			if(endDate!="")
				endDate = endDate.dateFormat('Y-m-d');
			var desingnation = Ext.getCmp("desingnation").getValue(); 
			var itemName = Ext.getCmp("itemName").getValue(); 
			var applyNum = Ext.getCmp("applyNum").getValue(); 
			materialsReport.startDate = startDate;
			materialsReport.endDate = endDate;
			materialsReport.desingnation = desingnation;
			materialsReport.itemName = itemName;
			materialsReport.applyNum = applyNum;
			var grid = Ext.getCmp("materialsReportoryOnePanelId"); 
				grid.store.baseParams={start:0,limit:20,startDate:startDate,endDate:endDate,desingnation:desingnation,itemName:itemName,applyNum:applyNum};
				grid.store.load();
		 
			materialsReportQuerySearchForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
			materialsReportQuerySearchForm.getForm().reset();
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
					fieldLabel : '开始时间',
					xtype : "datefield",
		        	format : 'Y-m-d',
					anchor : '90%',
					id: 'startDate'
				}
				 ]
			},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '结束时间',
					xtype : "datefield",
		        	format : 'Y-m-d',
					anchor : '90%',
					id: 'endDate'
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
		items : [ {
		columnWidth : .49,
		layout : 'form',
		border : false,
		items : [ {xtype : 'textfield',
			fieldLabel : '物资名称',
			lableWidth : 150, 
			id : 'itemName',
			anchor : '90%'}
		 ]
	},{
			columnWidth : .49,
			layout : 'form',
			border : false,
			items : [ {
				fieldLabel : '牌号',
				xtype : 'textfield',
				id : 'desingnation',
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
				fieldLabel : '待入库数量',
				xtype : 'numberfield',
				id : 'applyNum',
				anchor : '90%'
			} ]
	}]
	
	}];

	
	//表单
	var materialsReportQuerySearchForm = new Ext.form.FormPanel({
		padding : 5,
		buttonAlign:'center',
		layout : 'column',
		autoScroll : true,
		width : 700,
	    autoHeight:true,
		items : [item]
	});
	
	var window = new Ext.Window( {
		id : "materialsReportQuerywind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '查询',
		modal : true,
		items : materialsReportQuerySearchForm,
		border : true,
		closeAction :'close'
	});
	return window;



}