var venderManagerQuery = {
		
};

venderManagerQuery.getSearchForm = function(){ 
	var buttons = [ {
		text : ' 查询 ',
		handler : function() {
			var vendorCode = Ext.getCmp("vendorCode").getValue();
			var vendorName = Ext.getCmp("vendorName").getValue();
			var type = Ext.getCmp("type").getValue();
			var vendorLevel = Ext.getCmp("vendorLevel").getValue(); 
			var scale =  Ext.getCmp("scale").getValue(); 
			venderManagerGrid.vendorCode = vendorCode;
			venderManagerGrid.vendorName = vendorName;
			venderManagerGrid.type = type;
			venderManagerGrid.vendorLevel = vendorLevel;
			venderManagerGrid.scale = scale;
			var grid = Ext.getCmp('venderManagerGridPanelId'); 
				grid.store.baseParams={start:0,limit:20,pageType:'1',vendorCode:vendorCode,vendorName:vendorName,type:type,vendorLevel:vendorLevel,scale:scale};
				grid.store.load();
		 
			venderManagerQuerySearchForm.getForm().reset();
			window.close();
		}
	}, {
		text : '关闭',
		handler : function() {
			venderManagerQuerySearchForm.getForm().reset();
			window.close();
		}
	} ];;

	var typeStore = new Ext.data.SimpleStore( {
		fields : [ 'id', 'flag' ],
		data : [ [ '合格', '合格' ],[ '试供', '试供' ]]
	});
	
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
			items : [ 
				{
					fieldLabel : '等级',
					xtype : 'textfield',
					id : 'vendorLevel',
					anchor : '90%'
				}
			]
	},{
		columnWidth : .49,
		layout : 'form',
		border : false,
		items : [ 
//		   {xtype : 'textfield',
//			fieldLabel : '类别',
//			lableWidth : 150, 
//			id : 'type',
//			anchor : '90%'}
			{
	    	   fieldLabel : '类别',
	    	   xtype : 'combo',
		       //不允许手动输入
	    	   setEditable:false,
	    	   //是否允许为空
//			       allowBlank: false,
//			       blankText :'“类别”选项不能为空！',
		       store : typeStore,
		       triggerAction : 'all',
		       valueField : 'id',
			   displayField : 'flag',
			   mode : 'local',
			   forceSelection : true,
	    	   id:'type',
	    	   name:'type',
	    	   anchor : '90%'
	       }
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
				fieldLabel : '规模',
				xtype : 'textfield',
				id : 'scale',
				anchor : '90%'
			} ]
	} ]
	
	}];

	
	//表单
	var venderManagerQuerySearchForm = new Ext.form.FormPanel({
		padding : 5,
		buttonAlign:'center',
		layout : 'column',
		autoScroll : true,
		width : 700,
	    autoHeight:true,
		items : [item]
	});
	
	var window = new Ext.Window( {
		id : "venderManagerQuerywind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '查询',
		modal : true,
		items : venderManagerQuerySearchForm,
		border : true,
		closeAction :'close'
	});
	return window;



}