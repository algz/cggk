var provideInfo = {};
 
provideInfo.getGridData = function(itemCode,productCode){ 
	var rm = new Ext.grid.RowNumberer();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/procurementDetail_ProcurementDetailRemote.getProvideInfo',
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'provideId',
					totalProperty : 'totalProperty'
				}, [ 'provideId', 'materialCode', 'productCode', 'batchNo',
						'provideNumber', 'provideDate','remark'])
			});
	var cm = new Ext.grid.ColumnModel( [
			rm,
			{
				header : '物资编码',
				dataIndex : 'materialCode',
				width : 100,
				sortable : true
			},			
			{
				header : '机型',
				dataIndex : 'productCode',
				sortable : true,
				width : 100
			},
			{
				header : '批次号',
				dataIndex : 'batchNo',
				width : 100,
				sortable : true
			},
			{
				header : '发放数量 ',
				dataIndex : 'provideNumber',
				width : 100,
				sortable : true
			},
			{
				header : '发放日期 ',
				dataIndex : 'provideDate',
				width : 100,
				sortable : true
			} ,
			{
				header : '备注 ',
				dataIndex : 'remark',
				width : 100,
				sortable : true
			} 
			]);
	var grid = common.gridPanel('provideGridDataId', cm, store, null, true, null,
			'累计发放数量列表页面');
			grid.height = 350;
			grid.width = 600;
	store.baseParams = {start:0,limit:20,materialCode:itemCode,productCode:productCode};
	store.load();
	var buttons = [ {
		text : '关闭',
		handler : function() { 
			window.close();
		}
	} ]

	var window = new Ext.Window( {
		id : "provideInfo_win",
		title : "累计发放数量列表", 
		layout : 'fit',
		height : 400,
		width :600,
		autoScroll : true, 
		modal : true,
		items : grid,
		autoDestory : true,
		buttons : buttons,
		closeAction :'close'
	});
	return window;


}