var declare_query_form = {};
declare_query_form.getSearchForm = function(){
	var statusStore = new Ext.data.SimpleStore( {
		fields : [ 'id', 'flag' ],
		data : [ 
		         [ '', '全部' ],[ '1', '编制中' ],[ '2', '审批中' ],[ '3', '已审批（生成申报计划）' ]
		       ]
	});

	var inform = new Ext.FormPanel( {
		id : 'productFrom',
		buttonAlign : 'center',
		labelAlign : 'right', 
		autoHeight : true, 
		border:false,
		frame : false, 
		items : [{layout:'form',border:false,items:[
	{
		xtype : "textfield",
		fieldLabel : '登记编号',
		lableWidth : 150,
		id : 'declareCode',
		anchor : '90%'
	},{
		xtype : "textfield",
		fieldLabel : '需求单位',
		lableWidth : 150,
		id : 'departmentname',
		anchor : '90%'
	},{
		xtype : 'textfield',
		fieldLabel : '申报人',
		lableWidth : 150,
		id : "editor", 
		anchor : '90%'
	} ,{
		fieldLabel : '状态',
    	xtype : 'combo',
    	allowBlank: true,
    	store : statusStore,
    	triggerAction : 'all',
    	valueField : 'id',
		displayField : 'flag',
		mode : 'local',
		id : 'status', 
		hiddenname : 'status' ,
		forceSelection : true,
		editable : false,
		anchor : '90%'
		
	}]
		},{layout:'form',border:false,
      defaults: {width: 175},
      defaultType: 'datefield',items:[/*{
		xtype : 'datefield',
		fieldLabel : '申报月份',
		lableWidth : 150,
		id : "declareDate",
		format : 'Y年m月',
		anchor : '90%',
		editable : false
	},*/{
        fieldLabel : '开始时期',
		lableWidth : 150,
		format : 'Y/m/d',
        name: 'startdt',
        id: 'startdt',
        vtype: 'daterange',
        endDateField: 'enddt' // id of the end date field
      },{
        fieldLabel: '结束日期',
        name: 'enddt',
        id: 'enddt',
        format : 'Y/m/d',
        vtype: 'daterange',
        startDateField: 'startdt' // id of the start date field
      }]}],
		width : 450
	});
	
	var buttons = [ {
		text : ' 确定 ',
		handler : function() {
 
		var departmentname =  Ext.getCmp('departmentname').getValue();  
		var declareDate = Ext.getCmp('startdt').getRawValue()+','+Ext.getCmp('enddt').getRawValue();  
		var editor =  Ext.getCmp('editor').getValue();  
		var status = Ext.getCmp('status').getValue(); 
		var grid;
		var declaretype = '1';
		if(declareGrid.status==null)
		{ 
		    grid = Ext.getCmp('PurchaseRequestDeclareGridPanel');	
		}else{
			declaretype = '2';
			grid = Ext.getCmp('PurchaseRequestDeclareNotThroughGridPanel');	
		}
		grid.store.baseParams ={
			start:0, 
			limit:20,
			declare_type:declaretype,
			departmentId:departmentname,
			editor:editor,
			status:status,
			declareDate:declareDate,
			declareCode:Ext.getCmp('declareCode').getValue()
		};
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
		id : "declare_query_form_win",
		layout : 'fit',
		width : 450, 
		title : "采购申报查询页面",
		modal : true,
		items : inform,
		buttons : buttons,
		closeAction :'close'
	});
	return window;

	
	
	

}

Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
    }
});