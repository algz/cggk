var ControlList = {
	limit : 15,
	start : 0,
	queryParam1 : {
		start : 0,
		limit : 15,
		flag : null,
		startTime : null,
		endTime : null
	},
	queryParam2 : {
		start : 0,
		limit : 15,
		flag : null,
		startTime : null,
		endTime : null
	},
	queryParam3 : {
		start : 0,
		limit : 15,
		flag : null,
		startTime : null,
		endTime : null
	}
}

var getBar = function(flag) {
	var startTime = function() {
		var strartTime1 = new Ext.form.DateField({
					name : 'startTime' + flag,
					id : 'startTime' + flag,
					emptyText : '开始时间',
					width : 100,
					dateFormat : 'Y-m-d'
				});

		strartTime1.on('select', function() {
					var starttime = Ext.getCmp("startTime" + flag).getValue();
					if (1 == flag) {
						ControlList.queryParam1.startTime = starttime
					} else if (2 == flag) {
						ControlList.queryParam2.startTime = starttime;
					} else if (3 == flag) {
						ControlList.queryParam3.startTime = starttime;
					}
				});
		return strartTime1;
	}

	var endTime = function() {
		var strartTime2 = new Ext.form.DateField({
					name : 'endTime' + flag,
					id : 'endTime' + flag,
					emptyText : '结束时间',
					width : 100,
					dateFormat : 'Y-m-d'
				});

		strartTime2.on('select', function() {
					var endtime = Ext.getCmp("endTime" + flag).getValue();
					if (1 == flag) {
						ControlList.queryParam1.endTime = endtime;
					} else if (2 == flag) {
						ControlList.queryParam2.endTime = endtime;
					} else if (3 == flag) {
						ControlList.queryParam3.endTime = endtime;
					}
				});
		return strartTime2;
	}

	var submitButtion = function() {
		var btn = new Ext.Button({
					text : '分析',
					iconCls : 'CreateLog',
					handler : function() {
						if (1 == flag) {
							ControlList.ds1.load();
						} else if (2 == flag) {
							ControlList.ds2.load();
						} else if (3 == flag) {
							ControlList.ds3.load();
						}
					}
				});
		return btn;
	}

	var tbar = new Ext.Toolbar({
				items : ['<span style="padding-left:25px;"></span>开始时间:',
						startTime(), '&nbsp;&nbsp;结束时间:', endTime(),
						'<span style="padding-left:10px;"></span>',
						submitButtion()]
			})

	return tbar;
}

// 采购计划
ControlList.stockPlan1 = function(flag) {
	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
				header : "物质名称",
				dataIndex : 'matterName'
			}, {
				header : "型号规格",
				dataIndex : 'ruleType'
			}, {
				header : "属性类别",
				dataIndex : 'propertiesType'
			}, {
				header : "采购类别",
				dataIndex : 'stockType'
			}, {
				header : "数量",
				dataIndex : 'num'
			}, {
				header : "使用时间",
				dataIndex : 'applyTime'
			}, {
				header : "单价",
				dataIndex : 'oneMoney'
			}, {
				header : "总价",
				dataIndex : 'totalMoney'
			}, {
				header : "单位",
				dataIndex : 'dept'
			}, {
				header : "用途",
				dataIndex : 'purpose'
			}, {
				header : "原因",
				dataIndex : 'cause'
			}, {
				header : "可行性/需求报告",
				dataIndex : 'exeReport',
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return "<a href='../temp/"
							+ record.get("exeReport")
							+ "'><span style=cursor:pointer>"
							+ record.get("exeReport") + "</span></a>";
				}
			}]);

	cm.defaultSortable = true;
	var sm = new Ext.grid.CheckboxSelectionModel();
	var proxy = new Ext.data.HttpProxy({
				url : '../JSON/zongtiControl_Remote.getContractData',
				method : 'POST'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'matterName', 'ruleType', 'propertiesType', 'stockType',
					'num', 'applyTime', 'oneMoney', 'totalMoney', 'dept',
					'purpose', 'cause', 'exeReport', 'checkFile']);

	ControlList.ds1 = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	var gridPanel = new Ext.grid.EditorGridPanel({
				store : ControlList.ds1,
				cm : cm,
				layout : 'fit',
				tbar : getBar(flag),
				bbar : new Ext.PagingToolbar({
							pageSize : ControlList.limit,
							store : ControlList.ds1,
							displayInfo : true
						})
			});
	ControlList.queryParam1.flag = flag;
	ControlList.ds1.on('beforeload', function(ds, options) {
				Ext.apply(ds.baseParams, ControlList.queryParam1);
			});

	ControlList.ds1.load();
	return gridPanel;
}

ControlList.stockPlan2 = function(flag) {
	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
				header : "物质名称",
				dataIndex : 'matterName'
			}, {
				header : "型号规格",
				dataIndex : 'ruleType'
			}, {
				header : "属性类别",
				dataIndex : 'propertiesType'
			}, {
				header : "采购类别",
				dataIndex : 'stockType'
			}, {
				header : "数量",
				dataIndex : 'num'
			}, {
				header : "使用时间",
				dataIndex : 'applyTime'
			}, {
				header : "单价",
				dataIndex : 'oneMoney'
			}, {
				header : "总价",
				dataIndex : 'totalMoney'
			}, {
				header : "单位",
				dataIndex : 'dept'
			}, {
				header : "用途",
				dataIndex : 'purpose'
			}, {
				header : "原因",
				dataIndex : 'cause'
			}, {
				header : "可行性/需求报告",
				dataIndex : 'exeReport',
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return "<a href='../temp/"
							+ record.get("exeReport")
							+ "'><span style=cursor:pointer>"
							+ record.get("exeReport") + "</span></a>";
				}
			}]);

	cm.defaultSortable = true;
	var sm = new Ext.grid.CheckboxSelectionModel();
	var proxy = new Ext.data.HttpProxy({
				url : '../JSON/zongtiControl_Remote.getContractData',
				method : 'POST'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'matterName', 'ruleType', 'propertiesType', 'stockType',
					'num', 'applyTime', 'oneMoney', 'totalMoney', 'dept',
					'purpose', 'cause', 'exeReport', 'checkFile']);

	ControlList.ds2 = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	var gridPanel = new Ext.grid.EditorGridPanel({
				store : ControlList.ds2,
				cm : cm,
				layout : 'fit',
				tbar : getBar(flag),
				bbar : new Ext.PagingToolbar({
							pageSize : ControlList.limit,
							store : ControlList.ds2,
							displayInfo : true
						})
			});
	ControlList.queryParam2.flag = flag;
	ControlList.ds2.on('beforeload', function(ds, options) {
				Ext.apply(ds.baseParams, ControlList.queryParam2);
			});

	ControlList.ds2.load();
	return gridPanel;
}

ControlList.stockPlan3 = function(flag) {
	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), {
				header : "物质名称",
				dataIndex : 'matterName'
			}, {
				header : "型号规格",
				dataIndex : 'ruleType'
			}, {
				header : "属性类别",
				dataIndex : 'propertiesType'
			}, {
				header : "采购类别",
				dataIndex : 'stockType'
			}, {
				header : "数量",
				dataIndex : 'num'
			}, {
				header : "使用时间",
				dataIndex : 'applyTime'
			}, {
				header : "单价",
				dataIndex : 'oneMoney'
			}, {
				header : "总价",
				dataIndex : 'totalMoney'
			}, {
				header : "单位",
				dataIndex : 'dept'
			}, {
				header : "用途",
				dataIndex : 'purpose'
			}, {
				header : "原因",
				dataIndex : 'cause'
			}, {
				header : "可行性/需求报告",
				dataIndex : 'exeReport',
				renderer : function(value, cellmeta, record, rowIndex,
						columnIndex, store) {
					return "<a href='../temp/"
							+ record.get("exeReport")
							+ "'><span style=cursor:pointer>"
							+ record.get("exeReport") + "</span></a>";
				}
			}]);

	cm.defaultSortable = true;
	var sm = new Ext.grid.CheckboxSelectionModel();
	var proxy = new Ext.data.HttpProxy({
				url : '../JSON/zongtiControl_Remote.getContractData',
				method : 'POST'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'matterName', 'ruleType', 'propertiesType', 'stockType',
					'num', 'applyTime', 'oneMoney', 'totalMoney', 'dept',
					'purpose', 'cause', 'exeReport', 'checkFile']);

	ControlList.ds3 = new Ext.data.Store({
				proxy : proxy,
				reader : reader
			});

	var gridPanel = new Ext.grid.EditorGridPanel({
				store : ControlList.ds3,
				cm : cm,
				layout : 'fit',
				tbar : getBar(flag),
				bbar : new Ext.PagingToolbar({
							pageSize : ControlList.limit,
							store : ControlList.ds3,
							displayInfo : true
						})
			});
	ControlList.queryParam3.flag = flag;
	ControlList.ds3.on('beforeload', function(ds, options) {
				Ext.apply(ds.baseParams, ControlList.queryParam3);
			});

	ControlList.ds3.load();
	return gridPanel;
}