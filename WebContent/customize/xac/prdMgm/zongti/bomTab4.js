var bomTab4 = {
	nodeId : 0,
	bomType : "PBOM",
	mark : 0,
	limit : 15,
	start : 0
};

bomTab4.isDoit = function(val) {
	if (val == "0") {
		return '<span style="color:red;">未执行</span>';
	} else {
		return '执行';
	}
};

bomTab4.getTotal = function(taskName) {

	var columnData = [new Ext.grid.RowNumberer(), {
				header : "更改单号",
				dataIndex : '_column1'
			}, {
				header : "图号",
				dataIndex : '_column2'
			}, {
				header : "更改类型",
				dataIndex : '_column3'
			}, {
				header : "申请人/部门",
				dataIndex : '_column4'
			}, {
				header : "创建时间",
				dataIndex : '_column5'
			}, {
				header : "状态",
				dataIndex : '_column6'
			}, {
				header : "批准人/部门",
				dataIndex : '_column7'
			}, {
				header : "批准时间",
				dataIndex : '_column8'
			}, {
				header : "是否执行",
				dataIndex : '_column9',
				renderer : bomTab4.isDoit
			}];

	bomTab4.cm = new Ext.grid.ColumnModel(columnData);
	bomTab4.cm.defaultSortable = false;
	bomTab4.cm.menuDisabled = true;
	bomTab4.sm = new Ext.grid.CheckboxSelectionModel();
	bomTab4.proxy = new Ext.data.HttpProxy({
				url : '../JSON/ZongTi_ZongTiRemote.getGenggaiTotal',
				method : 'POST'
			});
	bomTab4.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10']);

	bomTab4.ds = new Ext.data.Store({
				proxy : bomTab4.proxy,
				reader : bomTab4.reader
			});

	bomTab4.gridPanel = myGrid.init(bomTab4.ds, bomTab4.cm, null, bomTab4.sm,
			null);
	myGrid.loadvalue(bomTab4.ds, {
				start : bomTab4.start,
				limit : bomTab4.limit,
				node : bomTab4.nodeId,
				bomType : bomTab4.bomType
			}, null);

	bomTab4.mainPanel = new Ext.Panel({
				region : 'center',
				boder : false,
				layout : 'fit',
				items : [bomTab4.gridPanel]
			});

	return bomTab4.mainPanel;
}

bomTab4.getOne = function(taskName) {

	var columnData = [new Ext.grid.RowNumberer(), {
				header : "更改单号",
				dataIndex : '_column1'
			}, {
				header : "图号",
				dataIndex : '_column2'
			}, {
				header : "更改类型",
				dataIndex : '_column3'
			}, {
				header : "申请人/部门",
				dataIndex : '_column4'
			}, {
				header : "创建时间",
				dataIndex : '_column5'
			}, {
				header : "状态",
				dataIndex : '_column6'
			}, {
				header : "批准人/部门",
				dataIndex : '_column7'
			}, {
				header : "批准时间",
				dataIndex : '_column8'
			}, {
				header : "是否执行",
				dataIndex : '_column9',
				renderer : bomTab4.isDoit
			}];
	bomTab4.cm = new Ext.grid.ColumnModel(columnData);
	bomTab4.cm.defaultSortable = false;
	bomTab4.cm.menuDisabled = true;
	bomTab4.sm = new Ext.grid.CheckboxSelectionModel();
	bomTab4.proxy = new Ext.data.HttpProxy({
				url : '../JSON/ZongTi_ZongTiRemote.getGenggai',
				method : 'POST'
			});
	bomTab4.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10']);

	bomTab4.ds = new Ext.data.Store({
				proxy : bomTab4.proxy,
				reader : bomTab4.reader
			});

	bomTab4.gridPanel = myGrid.init(bomTab4.ds, bomTab4.cm, null, bomTab4.sm,
			null);

	myGrid.loadvalue(bomTab4.ds, {
				start : bomTab4.start,
				limit : bomTab4.limit,
				node : bomTab4.nodeId
			}, null);

	bomTab4.mainPanel = new Ext.Panel({
				region : 'center',
				boder : false,
				layout : 'fit',
				items : [bomTab4.gridPanel]
			});

	return bomTab4.mainPanel;
}

bomTab4.init = function(nodeId, taskName) {
	bomTab4.mainPanel1 = bomTab4.getTotal(taskName);
	bomTab4.mainPanel2 = bomTab4.getOne(taskName)
	bomTab4.T41 = new Ext.Panel({
				id : 'tab41',
				title : '更改明细汇总',
				closable : false,
				layout : 'fit',
				items : [bomTab4.mainPanel1]
			});

	bomTab4.T42 = new Ext.Panel({
				id : 'tab42',
				title : '节点更改信息',
				closable : false,
				layout : 'fit',
				items : [bomTab4.mainPanel2]
			});

	bomTab4.tabpanel = new Ext.TabPanel({
				activeTab : bomTab4.mark,
				id : 'tabpanel4',
				minTabWidth : 300,
				resizeTabs : false,
				boder : false,
				hidden : false,
				items : [bomTab4.T41, bomTab4.T42]
			});
	mbomTabPanel.T4Container.add(bomTab4.tabpanel);
	mbomTabPanel.T4Container.doLayout();

};
