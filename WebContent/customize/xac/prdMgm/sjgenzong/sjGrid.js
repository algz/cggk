var sjGrid = {
	nodeId : 0
};

sjGrid.baseInfo = function(nodeId) {

	sjGrid.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), {
				header : "物料号",
				dataIndex : '_column1'
			}, {
				header : "物料名称",
				dataIndex : '_column2'
			}, {
				header : "物料类型",
				dataIndex : '_column3'
			}, {
				header : "材料（牌号）",
				dataIndex : '_column4'
			}, {
				header : "数量",
				dataIndex : '_column5'
			}, {
				header : "责任单位",
				dataIndex : '_column6'
			}]
	});

	sjGrid.sm = new Ext.grid.CheckboxSelectionModel();
	var strurl = "";
	strurl = '../JSON/XacCommon_CommonRemote.getPart';
	sjGrid.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	sjGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10']);

	sjGrid.ds = new Ext.data.Store({
				proxy : sjGrid.proxy,
				reader : sjGrid.reader
			});

	sjGrid.gridPanel = myGrid.init(sjGrid.ds, sjGrid.cm, null, sjGrid.sm, null);

	myGrid.loadvalue(sjGrid.ds, {
				start : 0,
				limit : 25,
				node : sjGrid.nodeId
			}, null);

	sjGrid.mainPanel = new Ext.Panel({
				boder : false,
				layout : 'fit',
				items : [sjGrid.gridPanel]
			});

	return sjGrid.mainPanel;
};

sjGrid.shejiInfo = function(nodeId) {

	sjGrid.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), {
				header : "图号",
				dataIndex : '_column1'
			}, {
				header : "图名",
				dataIndex : '_column2'
			}, {
				header : "状态",
				dataIndex : '_column3'
			}, {
				header : "设计人",
				dataIndex : '_column4'
			}, {
				header : "创建时间",
				dataIndex : '_column5'
			}, {
				header : "批准人",
				dataIndex : '_column6'
			}, {
				header : "批准时间",
				dataIndex : '_column7'
			}]
	});

	sjGrid.sm = new Ext.grid.CheckboxSelectionModel();
	var strurl = "";
	strurl = '../JSON/GenZong_GenZongRemote.getDesignNodeInfo';
	sjGrid.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	sjGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10']);

	sjGrid.ds = new Ext.data.Store({
				proxy : sjGrid.proxy,
				reader : sjGrid.reader
			});

	sjGrid.gridPanel = myGrid.init(sjGrid.ds, sjGrid.cm, null, sjGrid.sm, null);

	myGrid.loadvalue(sjGrid.ds, {
				start : 0,
				limit : 25,
				node : sjGrid.nodeId
			}, null);

	sjGrid.mainPanel = new Ext.Panel({
				boder : false,
				layout : 'fit',
				items : [sjGrid.gridPanel]
			});

	return sjGrid.mainPanel;
};

sjGrid.genggaiInfo = function(nodeId) {

	sjGrid.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), {
				header : "更改单号",
				dataIndex : '_column1'
			}, {
				header : "更改类型",
				dataIndex : '_column2'
			}, {
				header : "申请人/部门",
				dataIndex : '_column3'
			}, {
				header : "创建时间",
				dataIndex : '_column4'
			}, {
				header : "状态",
				dataIndex : '_column5'
			}, {
				header : "批准人/部门",
				dataIndex : '_column6'
			}, {
				header : "批准时间",
				dataIndex : '_column7'
			}, {
				header : "贯彻状态",
				dataIndex : '_column8'
			}]
	});

	sjGrid.sm = new Ext.grid.CheckboxSelectionModel();
	var strurl = "";
	strurl = '../JSON/GenZong_GenZongRemote.getChangeNodeInfo';
	sjGrid.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	sjGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10']);

	sjGrid.ds = new Ext.data.Store({
				proxy : sjGrid.proxy,
				reader : sjGrid.reader
			});

	sjGrid.gridPanel = myGrid.init(sjGrid.ds, sjGrid.cm, null, sjGrid.sm, null);

	myGrid.loadvalue(sjGrid.ds, {
				start : 0,
				limit : 25,
				node : sjGrid.nodeId,
				text : 1
			}, null);

	sjGrid.mainPanel = new Ext.Panel({
				boder : false,
				layout : 'fit',
				items : [sjGrid.gridPanel]
			});

	return sjGrid.mainPanel;
};