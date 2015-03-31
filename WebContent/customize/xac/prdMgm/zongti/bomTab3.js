var bomTab3 = {
	nodeId : 0,
	bomType : "PBOM",
	mark : 0,
	limit : 15,
	start : 0
};

bomTab3.getDetail = function(type, typeName, nodeId) {

	var columnData = [new Ext.grid.RowNumberer(), {
				header : "节点名称",
				width : 150,
				dataIndex : '_column5'
			}, {
				header : "材料牌号/工装名称",
				width : 150,
				dataIndex : '_column4'
			}, {
				header : "计划数量",
				width : 80,
				dataIndex : '_column1'
			}, {
				header : "完成数量",
				width : 80,
				dataIndex : '_column2'
			}, {
				header : "问题",
				width : 300,
				dataIndex : '_column3'
			}];
	bomTab3.cm = new Ext.grid.ColumnModel(columnData);
	bomTab3.cm.defaultSortable = false;
	bomTab3.cm.menuDisabled = true;
	bomTab3.sm = new Ext.grid.CheckboxSelectionModel();
	bomTab3.proxy = new Ext.data.HttpProxy({
				url : '../JSON/ZongTi_ZongTiRemote.getPeitaoDetail',
				method : 'POST'
			});
	bomTab3.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10']);

	bomTab3.ds = new Ext.data.Store({
				proxy : bomTab3.proxy,
				reader : bomTab3.reader
			});

	bomTab3.gridPanel = myGrid.init(bomTab3.ds, bomTab3.cm, null, bomTab3.sm,
			bomTab3.percentColumn);

	myGrid.loadvalue(bomTab3.ds, {
				start : bomTab3.start,
				limit : bomTab3.limit,
				node : bomTab3.nodeId,
				type : type,
				bomType : bomTab3.bomType
			}, null);

	bomTab3.tabpanel.add({
				id : type,
				title : typeName,
				closable : true,
				layout : 'fit',
				items : [bomTab3.gridPanel]
			}).show();
}

bomTab3.getTotal = function() {

	bomTab3.percentColumn = new Ext.ux.grid.ProgressColumn({
				header : "进度",
				dataIndex : '_column4',
				textPst : '%',
				width : 130,
				colored : true
			});

	var columnData = [new Ext.grid.RowNumberer(), {
				header : "配套统计",
				width : 150,
				dataIndex : '_column1'
			}, {
				header : "计划数量",
				width : 80,
				dataIndex : '_column2'
			}, {
				header : "完成数量",
				width : 80,
				dataIndex : '_column3'
			}, bomTab3.percentColumn, {
				header : "详情",
				width : 70,
				dataIndex : '_column5'
			}, {
				header : "问题",
				width : 300,
				dataIndex : '_column6'
			}];

	bomTab3.cm = new Ext.grid.ColumnModel(columnData);
	bomTab3.cm.defaultSortable = false;
	bomTab3.cm.menuDisabled = true;
	bomTab3.sm = new Ext.grid.CheckboxSelectionModel();
	bomTab3.proxy = new Ext.data.HttpProxy({
				url : '../JSON/ZongTi_ZongTiRemote.getPeitaoTotal',
				method : 'POST'
			});
	bomTab3.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10']);
	bomTab3.ds = new Ext.data.Store({
				proxy : bomTab3.proxy,
				reader : bomTab3.reader
			});
	bomTab3.gridPanel = myGrid.init(bomTab3.ds, bomTab3.cm, null, bomTab3.sm,
			bomTab3.percentColumn);

	myGrid.loadvalue(bomTab3.ds, {
				start : bomTab3.start,
				limit : bomTab3.limit,
				node : bomTab3.nodeId,
				bomType : bomTab3.bomType
			}, null);
	bomTab3.T31.add(bomTab3.gridPanel);
	bomTab3.T31.doLayout();
}

bomTab3.getOne = function() {
	bomTab3.percentColumn = new Ext.ux.grid.ProgressColumn({
				header : "进度",
				dataIndex : '_column4',
				textPst : '%',
				width : 130,
				colored : true
			});

	var columnData = [new Ext.grid.RowNumberer(), {
				header : "配套统计",
				width : 150,
				dataIndex : '_column1'
			}, {
				header : "计划数量",
				width : 80,
				dataIndex : '_column2'
			}, {
				header : "完成数量",
				width : 80,
				dataIndex : '_column3'
			}, bomTab3.percentColumn, {
				header : "问题",
				width : 300,
				dataIndex : '_column6'
			}];
	bomTab3.cm = new Ext.grid.ColumnModel(columnData);
	bomTab3.cm.defaultSortable = false;
	bomTab3.cm.menuDisabled = true;
	bomTab3.sm = new Ext.grid.CheckboxSelectionModel();
	bomTab3.proxy = new Ext.data.HttpProxy({
				url : '../JSON/ZongTi_ZongTiRemote.getPeitao',
				method : 'POST'
			});
	bomTab3.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10']);

	bomTab3.ds = new Ext.data.Store({
				proxy : bomTab3.proxy,
				reader : bomTab3.reader
			});

	bomTab3.gridPanel = myGrid.init(bomTab3.ds, bomTab3.cm, null, bomTab3.sm,
			bomTab3.percentColumn);

	myGrid.loadvalue(bomTab3.ds, {
				start : bomTab3.start,
				limit : bomTab3.limit,
				node : bomTab3.nodeId
			}, null);
	bomTab3.T32.add(bomTab3.gridPanel);
	bomTab3.T32.doLayout();
}

bomTab3.init = function(nodeId, taskName) {
	bomTab3.T31 = new Ext.Panel({
				id : 'tab31',
				title : '配套明细汇总',
				closable : false,
				layout : 'fit'
			});
	bomTab3.T31.on('activate', function() {
				bomTab3.T31.removeAll();
				bomTab3.getTotal();
			});
	bomTab3.T32 = new Ext.Panel({
				id : 'tab32',
				title : '节点配套信息',
				closable : false,
				layout : 'fit'
			});
	bomTab3.T32.on('activate', function() {
				bomTab3.T32.removeAll();
				bomTab3.getOne();
			});
	bomTab3.tabpanel = new Ext.TabPanel({
				activeTab : bomTab3.mark,
				id : 'tabpanel3',
				minTabWidth : 300,
				resizeTabs : false,
				boder : false,
				hidden : false,
				enableTabScroll : true,
				items : [bomTab3.T31, bomTab3.T32]
			});
	mbomTabPanel.T3Container.add(bomTab3.tabpanel);
	mbomTabPanel.T3Container.doLayout();

};
