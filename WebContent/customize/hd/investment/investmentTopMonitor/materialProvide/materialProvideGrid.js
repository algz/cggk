var materialProvideGrid = {
	userId : null
};

// 数据列表
materialProvideGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : '../JSON/material_MaterialMonitorRemote.getSumMaterialValue?d='
					+ new Date(),
			method : 'post'
		}),
		reader : new Ext.data.JsonReader( {
			root : 'results',
			id : 'id',
			totalProperty : 'totalProperty'
		}, [ 'id', 'startId', 'materialtypename', 'remark',
				'materialcatalogid', 'parentid', 'sumValue','requestSumValue','planSumvalue','purchaseSumValue','contractSumValue' ])
	});

	var cm = new Ext.grid.ColumnModel(
			[
					rm,
					{
						header : '物资名称 ',
						dataIndex : 'materialtypename',
						width : 200

					},{
						header : '需求量',
						dataIndex : 'requestSumValue',
						renderer : function(value){
							if(value == 0){
								return '';
							} else {
								return value;
							}
						}
					},{
						header : '计划量',
						dataIndex : 'planSumvalue',
						width : 100 ,
						renderer : function(value){
							if(value == 0){
								return '';
							} else {
								return value;
							}
						}
					},{
						header : '采购比价量',
						dataIndex : 'purchaseSumValue',
						renderer : function(value){
							if(value == 0){
								return '';
							} else {
								return value;
							}
						}	
					},{
						header : '合同签订量 ',
						dataIndex : 'contractSumValue',
						width : 100,
						renderer : function(value){
							if(value == 0){
								return '';
							} else {
								return value;
							}
						}
					}
			]);

	var grid = common.gridPanel('materialProvideGridPanelId', cm, store, true,
			'物资采购进度表');
	store.baseParams = {
		start : 0,
		limit : 20
	};
	store.load();

	return grid;
}
