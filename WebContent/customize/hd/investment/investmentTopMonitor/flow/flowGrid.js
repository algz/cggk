
var flowGrid = {
		userId : null
	};
flowGrid.gridPurchaseListPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/flow_FlowMonitorRemote.getPurchaseList?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'id',
					totalProperty : 'totalProperty'
				}, [ 'id','materialCode','materialName', 'author','purcherLeader','purcherDirector',
				     'purcherMinister','desingnation','materialStandard','technicCondition'])
			});
	 
	var cm = new Ext.grid.ColumnModel( [
			rm,
			{
				header : '需求编号',
				dataIndex : 'materialCode',
				widht:200
			}, 
			{
				header : '物资名称',
				dataIndex : 'materialName',
				sortable : true,
				widht:150
			},
			{
				header : '牌号',
				dataIndex : 'desingnation',
				sortable : true,
				widht:150
			},
			{
				header : '规格/型号',
				dataIndex : 'materialStandard',
				sortable : true,
				widht:150
			},
			{
				header : '技术条件',
				dataIndex : 'technicCondition',
				sortable : true,
				widht:150
			},
			{
				header : '提交人',
				dataIndex : 'author',
				width : 180
			},
			{
				header : '采购处组长审签 ',
				dataIndex : 'purcherLeader',
				width : 180				
			},
			{
				header : '采购处处长审签',
				dataIndex : 'purcherDirector',
				width : 180				
			},
			{
				header : '供应部部长审签',
				dataIndex : 'purcherMinister',
				width : 180				
			}]);

	var grid = common.gridPanel('gridPurchaseListPanelId', cm, store, true, '审批状态');
	store.baseParams = {start : 0, limit: 20};
	return grid;
}

flowGrid.gridPurchaseRatioPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/flow_FlowMonitorRemote.getPurchaseRatio?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'id',
					totalProperty : 'totalProperty'
				}, ['id','materialCode','materialName', 'author','purcherLeader','purcherDirector',
				    'purcherMinister','parityPersion','desingnation','materialStandard','technicCondition'])
			});
	 
	var cm = new Ext.grid.ColumnModel( [
			rm,
			{
				header : '需求编号',
				dataIndex : 'materialCode',
				width : 200
			}, 
			{
				header : '物资名称',
				dataIndex : 'materialName',
				sortable : true,
				width : 200
			},
			{
				header : '牌号',
				dataIndex : 'desingnation',
				sortable : true,
				widht:150
			},
			{
				header : '规格/型号',
				dataIndex : 'materialStandard',
				sortable : true,
				widht:150
			},
			{
				header : '技术条件',
				dataIndex : 'technicCondition',
				sortable : true,
				widht:150
			},
			{
				header : '提交人',
				dataIndex : 'author',
				width : 200
			},
			{
				header : '采购处组长审签 ',
				dataIndex : 'purcherLeader',
				width : 200			
			},
			{
				header : '采购处处长审签',
				dataIndex : 'purcherDirector',
				width : 200			
			},
			{
				header : '比价小组负责人 ',
				dataIndex : 'parityPersion',
				width : 200			
			},
			{
				header : '供应部部长审签',
				dataIndex : 'purcherMinister',
				width : 200			
			}]);

	var grid = common.gridPanel('gridPurchaseRatioPanelId', cm, store, true, '审批状态');
	store.baseParams = {start : 0, limit: 20};	
	return grid;
}

flowGrid.gridContractPanel = function() {
	var rm = new Ext.grid.RowNumberer();
	var store = new Ext.data.Store(
			{
				proxy : new Ext.data.HttpProxy( {
					url : '../JSON/flow_FlowMonitorRemote.getContract?d='
							+ new Date(),
					method : 'post'
				}),
				reader : new Ext.data.JsonReader( {
					root : 'results',
					id : 'id',
					totalProperty : 'totalProperty'
				}, ['id','materialCode','materialName','author','vicePresident','generalManager',
				    'metalMinister','metalDirector','generalCounsel','metalLeader','desingnation',
				    'materialStandard','technicCondition'])
			});
	 
	var cm = new Ext.grid.ColumnModel( [
			rm,
			{
				header : '需求编号',
				dataIndex : 'materialCode',
				width : 200
			}, 
			{
				header : '物资名称',
				dataIndex : 'materialName',
				sortable : true,
				width : 200
			},
			{
				header : '牌号',
				dataIndex : 'desingnation',
				sortable : true,
				widht:150
			},
			{
				header : '规格/型号',
				dataIndex : 'materialStandard',
				sortable : true,
				widht:150
			},
			{
				header : '技术条件',
				dataIndex : 'technicCondition',
				sortable : true,
				widht:150
			},
			{
				header : '提交人',
				dataIndex : 'author',
				width : 200
			},
			{
				header : '金属组长 ',
				dataIndex : 'metalLeader',
				width : 200			
			},
			{
				header : '金属处长',
				dataIndex : 'metalDirector',
				width : 200			
			},
			{
				header : '金属部长',
				dataIndex : 'metalMinister',
				width : 200			
			},
			{
				header : '总法律顾问',
				dataIndex : 'generalCounsel',
				width : 200			
			},
			{
				header : '副总经理',
				dataIndex : 'vicePresident',
				width : 200			
			},
			{
				header : '总经理',
				dataIndex : 'generalManager',
				width : 200			
			}]);

	var grid = common.gridPanel('gridContractPanelId', cm, store, true, '审批状态');
	store.baseParams = {start : 0, limit: 20};
	return grid;
}


