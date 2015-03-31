var gyGrid = {
	nodeId : 0
};

gyGrid.baseInfo = function(nodeId) {

	gyGrid.cm = new Ext.grid.ColumnModel({
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

	gyGrid.sm = new Ext.grid.CheckboxSelectionModel();
	var strurl = "";
	strurl = '../JSON/XacCommon_CommonRemote.getPart';
	gyGrid.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	gyGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10']);

	gyGrid.ds = new Ext.data.Store({
				proxy : gyGrid.proxy,
				reader : gyGrid.reader
			});

	gyGrid.gridPanel = myGrid.init(gyGrid.ds, gyGrid.cm, null, gyGrid.sm, null);

	myGrid.loadvalue(gyGrid.ds, {
				start : 0,
				limit : 25,
				node : gyGrid.nodeId
			}, null);

	gyGrid.mainPanel = new Ext.Panel({
				boder : false,
				layout : 'fit',
				items : [gyGrid.gridPanel]
			});

	return gyGrid.mainPanel;
};

gyGrid.init = function(nodeId, taskName) {

	gyGrid.cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), {
				header : "AO/FO号",
				dataIndex : '_column1'
			}, {
				header : "编制人/部门",
				dataIndex : '_column2'
			}, {
				header : "创建时间",
				dataIndex : '_column3'
			}, {
				header : "状态",
				dataIndex : '_column4'
			}, {
				header : "批准人/部门",
				dataIndex : '_column5'
			}, {
				header : "批准时间",
				dataIndex : '_column6'
			}, {
				header : "文档版本号",
				dataIndex : '_column7'
			}, {
				header : "类型(ao/fo)",
				dataIndex : '_column8'
			}]
	});

	gyGrid.sm = new Ext.grid.CheckboxSelectionModel();
	var strurl = "";
	strurl = '../JSON/GenZong_GenZongRemote.getAofoNodeInfo';
	gyGrid.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	gyGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10']);

	gyGrid.ds = new Ext.data.Store({
				proxy : gyGrid.proxy,
				reader : gyGrid.reader
			});

	gyGrid.gridPanel = myGrid.init(gyGrid.ds, gyGrid.cm, null, gyGrid.sm, null);

	myGrid.loadvalue(gyGrid.ds, {
				start : 0,
				limit : 25,
				node : gyGrid.nodeId
			}, null);

	gyGrid.mainPanel = new Ext.Panel({
				boder : false,
				layout : 'fit',
				items : [gyGrid.gridPanel]
			});

	return gyGrid.mainPanel;
};

gyGrid.genggaiInfo = function(nodeId) {

	gyGrid.cm = new Ext.grid.ColumnModel({
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

	gyGrid.sm = new Ext.grid.CheckboxSelectionModel();
	var strurl = "";
	strurl = '../JSON/GenZong_GenZongRemote.getChangeNodeInfo';
	gyGrid.proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'POST'
			});
	gyGrid.reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', '_column1', '_column2', '_column3', '_column4',
					'_column5', '_column6', '_column7', '_column8', '_column9',
					'_column10']);

	gyGrid.ds = new Ext.data.Store({
				proxy : gyGrid.proxy,
				reader : gyGrid.reader
			});

	gyGrid.gridPanel = myGrid.init(gyGrid.ds, gyGrid.cm, null, gyGrid.sm, null);

	myGrid.loadvalue(gyGrid.ds, {
				start : 0,
				limit : 25,
				node : gyGrid.nodeId,
				text : 2
			}, null);

	gyGrid.mainPanel = new Ext.Panel({
				boder : false,
				layout : 'fit',
				items : [gyGrid.gridPanel]
			});

	return gyGrid.mainPanel;
};