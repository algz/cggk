var bomTab6 = {
	nodeId : 0,
	mark : 0,
	limit : 15,
	start : 0
};

bomTab6.baseInfo = function(nodeId) {
	bomTab6.cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
				header : "物料号",
				width : 150,
				dataIndex : '_column1'
			}, {
				header : "物料名称",
				width : 150,
				dataIndex : '_column2'
			}, {
				header : "物料类型",
				dataIndex : '_column3'
			}, {
				header : "材料（牌号）",
				width : 150,
				dataIndex : '_column4'
			}, {
				header : "数量",
				dataIndex : '_column5'
			}, {
				header : "责任单位",
				dataIndex : '_column6'
			}]);

	bomTab6.cm.defaultSortable = false;
	bomTab6.cm.menuDisabled = true;
	bomTab6.sm = new Ext.grid.CheckboxSelectionModel();
	var strurl = "";
	strurl = '../JSON/XacCommon_CommonRemote.getPart';
	bomTab6.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	bomTab6.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9']);

	bomTab6.ds = new Ext.data.Store({
				proxy : bomTab6.proxy,
				reader : bomTab6.reader
			});

	bomTab6.gridPanel = myGrid.init(bomTab6.ds, bomTab6.cm, null, bomTab6.sm,
			null);

	myGrid.loadvalue(bomTab6.ds, {
				start : bomTab6.start,
				limit : bomTab6.limit,
				node : bomTab6.nodeId
			}, null);

	bomTab6.T61.add(bomTab6.gridPanel);
	bomTab6.T61.doLayout();
};

bomTab6.gzInfo = function(nodeId) {
	bomTab6.cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
				header : "工装号",
				width : 170,
				dataIndex : '_column6'
			}, {
				header : "需求数量",
				width : 60,
				dataIndex : '_column1'
			}, {
				header : "申请时间",
				dataIndex : '_column17'
			}, {
				header : "申请状态",
				width : 65,
				dataIndex : '_column4'
			}, {
				header : "批准时间",
				dataIndex : '_column20'
			}, {
				header : "设计状态",
				width : 65,
				dataIndex : '_column3'
			}, {
				header : "生产状态",
				width : 65,
				dataIndex : '_column5'
			}, {
				header : "完成数量",
				width : 60,
				dataIndex : '_column2'
			}, {
				header : "设计完成时间",
				dataIndex : '_column19'
			}, {
				header : "生产交付时间",
				dataIndex : '_column18'
			}]);

	bomTab6.cm.defaultSortable = false;
	bomTab6.cm.menuDisabled = true;
	bomTab6.sm = new Ext.grid.CheckboxSelectionModel();
	var strurl = "";
	strurl = '../JSON/ZongTi_ZongTiRemote.getNodeDataInfo';
	bomTab6.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	bomTab6.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10', '_column11', '_column12', '_column13',
					'_column14', '_column15', '_column17', '_column18',
					'_column19', '_column20']);

	bomTab6.ds = new Ext.data.Store({
				proxy : bomTab6.proxy,
				reader : bomTab6.reader
			});

	bomTab6.gridPanel = myGrid.init(bomTab6.ds, bomTab6.cm, null, bomTab6.sm,
			null);

	myGrid.loadvalue(bomTab6.ds, {
				start : bomTab6.start,
				limit : bomTab6.limit,
				node : bomTab6.nodeId,
				type : 4
			}, null);

	bomTab6.T62.add(bomTab6.gridPanel);
	bomTab6.T62.doLayout();
};

bomTab6.clInfo = function(nodeId) {
	bomTab6.cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
				header : "材料牌号",
				width : 150,
				dataIndex : '_column8'
			}, {
				header : "派工号",
				dataIndex : '_column10'
			}, {
				header : "机型",
				dataIndex : '_column7'
			}, {
				header : "领料单位",
				dataIndex : '_column11'
			}, {
				header : "设计用量",
				dataIndex : '_column3'
			}, {
				header : "库存数量",
				dataIndex : '_column4'
			}, {
				header : "定额数量",
				dataIndex : '_column1'
			}, {
				header : "出库数量",
				dataIndex : '_column2'
			}, {
				header : "出库时间",
				dataIndex : '_column18'
			}, {
				header : "采购期",
				dataIndex : '_column15'
			}, {
				header : "需求时间",
				dataIndex : '_column17'
			}]);

	bomTab6.cm.defaultSortable = false;
	bomTab6.cm.menuDisabled = true;
	bomTab6.sm = new Ext.grid.CheckboxSelectionModel();
	var strurl = "";
	strurl = '../JSON/ZongTi_ZongTiRemote.getNodeDataInfo';
	bomTab6.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	bomTab6.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10', '_column11', '_column12', '_column13',
					'_column14', '_column15', '_column17', '_column18',
					'_column19', '_column20']);

	bomTab6.ds = new Ext.data.Store({
				proxy : bomTab6.proxy,
				reader : bomTab6.reader
			});

	bomTab6.gridPanel = myGrid.init(bomTab6.ds, bomTab6.cm, null, bomTab6.sm,
			null);

	myGrid.loadvalue(bomTab6.ds, {
				start : bomTab6.start,
				limit : bomTab6.limit,
				node : bomTab6.nodeId,
				type : 1
			}, null);

	bomTab6.T63.add(bomTab6.gridPanel);
	bomTab6.T63.doLayout();
};

bomTab6.bzjInfo = function(nodeId) {
	bomTab6.cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
				header : "图号",
				width : 150,
				dataIndex : 'text'
			}, {
				header : "派工号",
				dataIndex : '_column10'
			}, {
				header : "机型",
				dataIndex : '_column7'
			}, {
				header : "领料单位",
				dataIndex : '_column11'
			}, {
				header : "装配数量",
				dataIndex : '_column9'
			}, {
				header : "库存数量",
				dataIndex : '_column4'
			}, {
				header : "计划用量",
				dataIndex : '_column3'
			}, {
				header : "缺件数量",
				dataIndex : '_column5'
			}, {
				header : "出库数量",
				dataIndex : '_column2'
			}, {
				header : "出库时间",
				dataIndex : '_column18'
			}, {
				header : "采购期",
				dataIndex : '_column15'
			}, {
				header : "需求时间",
				dataIndex : '_column17'
			}]);

	bomTab6.cm.defaultSortable = false;
	bomTab6.cm.menuDisabled = true;
	bomTab6.sm = new Ext.grid.CheckboxSelectionModel();
	var strurl = "";
	strurl = '../JSON/ZongTi_ZongTiRemote.getNodeDataInfo';
	bomTab6.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	bomTab6.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'text', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10', '_column11', '_column12', '_column13',
					'_column14', '_column15', '_column17', '_column18',
					'_column19', '_column20']);

	bomTab6.ds = new Ext.data.Store({
				proxy : bomTab6.proxy,
				reader : bomTab6.reader
			});

	bomTab6.gridPanel = myGrid.init(bomTab6.ds, bomTab6.cm, null, bomTab6.sm,
			null);

	myGrid.loadvalue(bomTab6.ds, {
				start : bomTab6.start,
				limit : bomTab6.limit,
				node : bomTab6.nodeId,
				type : 3
			}, null);

	bomTab6.T64.add(bomTab6.gridPanel);
	bomTab6.T64.doLayout();
};

bomTab6.cpInfo = function(nodeId) {
	bomTab6.cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
				header : "材料牌号",
				width : 150,
				dataIndex : '_column8'
			}, {
				header : "派工号",
				dataIndex : '_column10'
			}, {
				header : "机型",
				dataIndex : '_column7'
			}, {
				header : "领料单位",
				dataIndex : '_column11'
			}, {
				header : "设计用量",
				dataIndex : '_column3'
			}, {
				header : "库存数量",
				dataIndex : '_column4'
			}, {
				header : "定额数量",
				dataIndex : '_column1'
			}, {
				header : "出库数量",
				dataIndex : '_column2'
			}, {
				header : "出库时间",
				dataIndex : '_column18'
			}, {
				header : "采购提前期",
				dataIndex : '_column15'
			}, {
				header : "需求时间",
				dataIndex : '_column17'
			}]);

	bomTab6.cm.defaultSortable = false;
	bomTab6.cm.menuDisabled = true;
	bomTab6.sm = new Ext.grid.CheckboxSelectionModel();
	var strurl = "";
	strurl = '../JSON/ZongTi_ZongTiRemote.getNodeDataInfo';
	bomTab6.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	bomTab6.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10', '_column11', '_column12', '_column13',
					'_column14', '_column15', '_column17', '_column18',
					'_column19', '_column20']);

	bomTab6.ds = new Ext.data.Store({
				proxy : bomTab6.proxy,
				reader : bomTab6.reader
			});

	bomTab6.gridPanel = myGrid.init(bomTab6.ds, bomTab6.cm, null, bomTab6.sm,
			null);

	myGrid.loadvalue(bomTab6.ds, {
				start : bomTab6.start,
				limit : bomTab6.limit,
				node : bomTab6.nodeId,
				type : 2
			}, null);

	bomTab6.T65.add(bomTab6.gridPanel);
	bomTab6.T65.doLayout();
};

bomTab6.init = function(nodeId) {
	bomTab6.T61 = new Ext.Panel({
				id : 'tab61',
				title : '节点属性',
				closable : false,
				layout : 'fit'
			});
	bomTab6.T61.on('activate', function() {
				bomTab6.T61.removeAll();
				bomTab6.baseInfo(nodeId);
			});

	bomTab6.T62 = new Ext.Panel({
				id : 'tab62',
				title : '工装',
				closable : false,
				layout : 'fit'
			});
	bomTab6.T62.on('activate', function() {
				bomTab6.T62.removeAll();
				bomTab6.gzInfo(nodeId);
			});

	bomTab6.T63 = new Ext.Panel({
				id : 'tab63',
				title : '材料',
				closable : false,
				layout : 'fit'
			});
	bomTab6.T63.on('activate', function() {
				bomTab6.T63.removeAll();
				bomTab6.clInfo(nodeId);
			});

	bomTab6.T64 = new Ext.Panel({
				id : 'tab64',
				title : '标准件',
				closable : false,
				layout : 'fit'
			});
	bomTab6.T64.on('activate', function() {
				bomTab6.T64.removeAll();
				bomTab6.bzjInfo(nodeId);
			});

	bomTab6.T65 = new Ext.Panel({
				id : 'tab65',
				title : '成品',
				closable : false,
				layout : 'fit'
			});
	bomTab6.T65.on('activate', function() {
				bomTab6.T65.removeAll();
				bomTab6.cpInfo(nodeId);
			});

	bomTab6.tabpanel = new Ext.TabPanel({
				activeTab : bomTab6.mark,
				id : 'tabpanel6',
				minTabWidth : 300,
				resizeTabs : false,
				boder : false,
				hidden : false,
				items : [bomTab6.T61, bomTab6.T62, bomTab6.T63, bomTab6.T64,
						bomTab6.T65]
			});
	mbomTabPanel.T6Container.add(bomTab6.tabpanel);
	mbomTabPanel.T6Container.doLayout();
};
