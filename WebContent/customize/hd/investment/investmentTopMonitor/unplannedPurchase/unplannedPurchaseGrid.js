var unplannedPurchaseGrid = {
	userId : null
};

// 数据列表
unplannedPurchaseGrid.gridPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/unplannedPurchase_UnplannedPurchaseRemote.getGridData?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'procurementDetailId',
					totalProperty : 'totalProperty'
				}, [ 'procurementCode','materialItemName','desingnation','materialStandard','technicCondition',
				     'productCode','materialCounts','demension','editors','arriveCircs','signDate',
				     'strCurrentStatus','procurementDetailId'])
			});
	var cm = new Ext.grid.ColumnModel( [
			rm,
			{
				header : '需求编号 ',
				dataIndex : 'procurementCode'
			},{
				header : '材料名称',
				dataIndex : 'materialItemName'
			},{
				header : "牌号",
			    width : 80,
			    dataIndex : "desingnation"
			},{
			    header : "规格/型号",
			    width : 80,
			    dataIndex : "materialStandard"
			},{
				header : '技术条件 ',
				dataIndex : 'technicCondition'
			},{
				header : '机型 ',
				dataIndex : 'productCode'
			},{
				header : '需用量 ',
				dataIndex : 'materialCounts'
			},{
				header : '单位 ',
				dataIndex : 'demension'
			},{
				header : '当前状态',
				dataIndex : 'strCurrentStatus',
				width : 300,
				renderer : function(value, cellmeta, record, rowIndex) { 
					var temp1 = "<font color=green>"+value[0]+"</font>";
					var temp2 = "<font color=red>"+value[1]+"</font>";
					var temp3 = "<font color=gray>"+value[2]+"</font>";
					return temp1+temp2+temp3;
				}
			},{
				header : '负责人',
				dataIndex : 'editors'
			},{
				header : '已付款 ',
				dataIndex : 'arriveCircs'
			},{
				header : '合同签订日 ',
				dataIndex : 'signDate'		
			} ]);

	var grid = common.gridPanel('unplannedPurchaseGridPanelId', cm, store, true, '投资状态表');
	store.baseParams = {start : 0, limit: 20};
	store.load();
	return grid;
}

