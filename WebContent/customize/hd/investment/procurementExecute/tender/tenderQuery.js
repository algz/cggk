var tenderQuery = {
		
};

tenderQuery.getSearchForm = function(pageType){
    var tenderQueryStore;
    if(pageType=="1"){
    	tenderQueryStore = new Ext.data.SimpleStore({
	    	fields : ['value','text'],
	    	data : [['','全部'],['1','委托招标'],['2','自行招标']]
    	})
    }else
    {
    	tenderQueryStore = new Ext.data.SimpleStore({
	    	fields : ['value','text'],
	    	data : [['','全部'],['3','定向采购'],['4','委托招标'],['5','自行比价']]
    	})
    }
	var buttons = [ {
		text : ' 查询 ',
		handler : function() {
			var tenderName = Ext.getCmp("tenderName").getValue();
			var tenderCode = Ext.getCmp("tenderCode").getValue();
			var createDate = Ext.getCmp("createDate").getValue();
			var tenderType = Ext.getCmp("tenderType").getValue();
			var tenderDepartment = Ext.getCmp("tenderDepartment").getValue();
			if(createDate!="")
			createDate = createDate.dateFormat('Y-m-d')
			if(pageType=="1"){
				Ext.getCmp("tenderPlanGrid").store.baseParams={start:0,limit:20,pageType:'1',tenderName:tenderName,tenderCode:tenderCode,createDate:createDate,tenderType:tenderType,tenderDepartment:tenderDepartment};
				Ext.getCmp("tenderPlanGrid").store.load();
			}else{
				Ext.getCmp("fixTenderGrid").store.baseParams={start:0,limit:20,pageType:'2',tenderName:tenderName,tenderCode:tenderCode,createDate:createDate,tenderType:tenderType,tenderDepartment:tenderDepartment};
				Ext.getCmp("fixTenderGrid").store.load();
			}
			tenderSearchForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
			tenderSearchForm.getForm().reset();
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
					id : 'tenderCode',
					anchor : '90%'
				}
				 ]
			},{
				columnWidth : .49,
				layout : 'form',
				border : false,
				items : [ {
					fieldLabel : '名称',
					xtype : 'textfield',
					id : 'tenderName',
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
				fieldLabel : '单位',
				xtype : 'textfield',
				id : 'tenderDepartment',
				anchor : '90%'
			} ]
	},{
		columnWidth : .49,
		layout : 'form',
		border : false,
		items : [ {xtype : "datefield",
			fieldLabel : '时间',
			lableWidth : 150,
			format : 'Y-m-d',
			editable : false,
			id : 'createDate',
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
					fieldLabel : '招标方式',
					xtype : 'combo',
					displayField : 'text',
					valueField : 'value',
					store : tenderQueryStore,
					triggerAction : 'all',
					mode : 'local',
					editable : false,
					id : 'tenderType',
					anchor : '90%',
					value : ''
				} ]
		}]
	}];

	
	//表单
	var tenderSearchForm = new Ext.form.FormPanel({
		padding : 5,
		buttonAlign:'center',
		layout : 'column',
		autoScroll : true,
		width : 700,
	    autoHeight:true,
		items : [item]
	});
	
	var window = new Ext.Window( {
		id : "tenderQuerywind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '查询',
		modal : true,
		items : tenderSearchForm,
		border : true
	});
	return window;



}