var declare_query_query_form = {
		
};
declare_query_query_form.materialCatalogCombo = function(){ 
	var combox = new Ext.form.ComboBox({
		id : 'materialCatalogName',
		fieldLabel : '物资类别',
//		displayField : 'text',
//		valueField : 'value',
//		store : new Ext.data.SimpleStore({
//			fields : ['value','text'],
//			data : [ [ '', '全部' ],[ '直接用料', '直接用料' ],
//			         [ '航空成附件修理', '航空成附件修理' ],
//			         [ '物流运输', '物流运输' ],
//			         [ '土建', '土建' ],
//			         [ '机电设备', '机电设备' ], 
//			         [ '车辆', '车辆' ],
//			         ['电脑或电脑附件','电脑或电脑附件'],
//			         ['土建或设备大修','土建或设备大修'],
//			         ['常用礼品','常用礼品'],
//			         ['办公用品、耗材','办公用品、耗材'],
//			         ['节能用品、能源用品','节能用品、能源用品'],
//			         ['劳保用品','劳保用品'],
//			         ['工装工具(货架类)','工装工具(货架类)'],
//			         ['原煤','原煤'],
//			         ['木材','木材'],
//			         ['防暑药品、清凉饮料','防暑药品、清凉饮料'],
//			         ['切削液、润滑液','切削液、润滑液'],
//			         ['数字电视改造','数字电视改造'] ]
//		}),
		emptyText : '请选择...',
		triggerAction : 'all',
//		mode : 'local',
		mode : "remote",
		editable : false,
//		width:50,
		forceSelection : true,
		anchor : '80%',
		store : new Ext.data.JsonStore({ // 填充的数据
			url : "../JSON/materialCatalogRemote.getMaterialCatalogComboBox?parentid=0",
			fields : new Ext.data.Record.create(['catalogid', 'catalogname',"catalogcode"]), // 也可直接为["text","value"]
			root : "materialcatalog"
		}),
		valueField : 'catalogname', // 传送的值
		displayField : 'catalogname', // UI列表显示的文本,
		value : ''
	});
	return combox;
}
declare_query_query_form.declareTypeCombo = function(){
	
	var combox = new Ext.form.ComboBox({
		id : 'declareType',
		fieldLabel : '采购类型',
		displayField : 'text',
		valueField : 'value',
		store : new Ext.data.SimpleStore({
			fields : ['value','text'],
			data : [[ '1', '计划内' ], [ '2', '应急' ], [ '3', '非应急']]
		}),
		triggerAction : 'all',
		mode : 'local',
		editable : false,
//		width:50,
		forceSelection : true,
		anchor : '80%',
//		value : ''
		emptyText : '请选择...'
	})
	return combox;
}
declare_query_query_form.getSearchForm = function(departmentId,use,declareplanID,id){
 	declare_query_query_form.departmentId = departmentId;
	declare_query_query_form.use = use;
	declare_query_query_form.declareplanID = declareplanID;
	var store =  new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : '../JSON/declareDetail_DeclareDetailRemote.getDepartment?d='+new Date(),
					method : 'post'
				}),
		reader : new Ext.data.JsonReader({
				root : 'results',
				id : 'idd',
				totalProperty : 'totalProperty'
		}, ['departmetname','departmetname']) 
	});
	var items = [ {
		id : 'departmentName',
		xtype : 'combo',
		fieldLabel : '部门',
		emptyText : '请选择',
		displayField : 'departmetname',
		valueField : 'departmetname',
//		width : '120',
		mode : "local", 
		triggerAction: 'all',
		typeAhead : true,
		anchor : '80%',
		store : store
	},
	 declare_query_query_form.materialCatalogCombo(),
	 declare_query_query_form.declareTypeCombo()
	, {
		xtype : 'datefield',
		fieldLabel : '使用时间',
		lableWidth : 150,
		id : "useDate",
		format : 'Y-m-d',
		anchor : '80%',
		editable : false
	}] 
	store.load();
	var inform = new Ext.FormPanel( {
		id : 'productFrom', 
		buttonAlign : 'center',
		labelAlign : 'right', 
		autoHeight : true, 
		frame : false,
		items : items,
		width : 350,
		height : 150
	});
	
	var buttons = [ {
		text : ' 确定 ',
		handler : function() { 
	
		var materialCatalogName = Ext.getCmp('materialCatalogName').getValue();
		var useDate = Ext.getCmp('useDate').getValue();
		useDate = Ext.util.Format.date(useDate,'Y-m-d');
		var departmentName = Ext.getCmp('departmentName').getValue();
		var declareType = Ext.getCmp('declareType').getValue();
	
		
		var declarePlan = Ext.getCmp("declarePlanGrid");
		var demartment = Ext.getCmp("declare_demartmentGrid");
		var useRecord  = Ext.getCmp("declare_useGrid");
		

		
		var grid = Ext.getCmp(id);
		if(grid != null){
			grid.getStore().baseParams = {start:0,limit:20,materialCatalogName:materialCatalogName,useDate:useDate
				,declareType:declareType,departmentId : declare_query.departmentId,use:declare_query.use,declareplanID:declare_query.declareplanID,departmentName : departmentName};
			
			grid.store.load();
		}
		
		var form = Ext.getCmp('productFrom');
		if(form != null)
			form.form.reset();
		
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
		id : "declare_query_query_form",
		title : "查询页面",
		width : 350, 
		layout : 'fit',
		autoScroll : true, 
		modal : true,
		items : inform,
		autoDestory : true,
		buttons : buttons,
		closeAction :'close'
	});
	return window;


}