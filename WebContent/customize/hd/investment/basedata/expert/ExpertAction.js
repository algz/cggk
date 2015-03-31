var ExpertAction ={};
ExpertAction.showExpert = function(projectExportRelationId){
		var rm = new Ext.grid.RowNumberer();
	var sm = new Ext.grid.CheckboxSelectionModel();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/expertRemote.getExportList?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'exportID',
					totalProperty : 'totalProperty'
				}, [ 'exportID', 'exportName', 'exportCode', 'exportSex',
					 'exportPost','exportTitle','exportAge','expertise'])
			});
	var cm = new Ext.grid.ColumnModel( [
			sm,
			rm,
			{
				header : '编号 ',
				dataIndex : 'exportCode',
				width : 100
			},			
			{
				header : '姓名',
				dataIndex : 'exportName',
				sortable : true
			},
			{
				header : '性别 ',
				dataIndex : 'exportSex',
				width : 100,
				sortable : true,
				renderer : function(value, cellmeta, record, rowIndex, columnIndex,
				store) { 
				    if(record.get("exportSex")=="0")
						return '女'; 
					else if(record.get("exportSex")=="1")
						return '男';  
				}
			},
			{
				header : '年龄',
				dataIndex : 'exportAge',
				width : 100,
				sortable : true
			},
			{
				header : '职务',
				dataIndex : 'exportPost',
				sortable : true
			},
			{
				header : '职称 ',
				dataIndex : 'exportTitle',
				width : 100	,
				sortable : true			
			},
			{
				header : '专长 ',
				dataIndex : 'expertise',
				width : 100	,
				sortable : true			
			} ]);
	var tbar = ['-', {
		text : '查询',
		iconCls : 'Send',
		handler : function() {
			ExpertQueryForm.getSearchForm().show();
		}
	}  ]; 
	var grid = new Ext.grid.GridPanel({
	     store : store,
	     cm : cm,
	     sm : sm,
	     height : 300,
	     autoScroll : true , 
	     loadMask : {
	      msg : '正在加载数据,请稍后...'
	     }  
	}); 
	grid.id=""
	grid.store.baseParams = {start : 0,limit :20,projectExportRelationId:projectExportRelationId};
	grid.store.load(); 
	var buttons = [ {
		text : '关闭',
		handler : function() {  
			window.close(); 
		}
	} ];;
	var window = new Ext.Window( {
		id : "ExpertFormwind",
		buttons : buttons,
	    layout : 'fit',
	    width : 700,
	    autoHeight:true,
		autoScroll : true,
		title : '专家信息',
		modal : true,
		items : grid,
		border : true,
		closeAction : 'close'
	}).show(); 
}