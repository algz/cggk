var dataTypeHistoryGrid = {};
dataTypeHistoryGrid.init = function(datatypeId){
	//left
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), sm, {
			header : getResource('resourceParam480'),//名称
			dataIndex : 'datatypeName',
			width : 30
		}, {
			header : getResource('resourceParam648'),//描述
			dataIndex : 'datatypeDiscription',
			width : 80
		}, {
			header : getResource('resourceParam462'),//版本
			dataIndex : 'version',
			width : 40
		}, {
			header : getResource('resourceParam1341'),//创建者
			dataIndex : 'userTrueName',
			width : 80
		}, {
			header : getResource('resourceParam981'),//创建时间
			dataIndex : 'createTime',
			renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
			width : 80
		}]
	});
	dataTypeHistoryGrid.ds = new Ext.data.JsonStore({
		url : '../JSON/dynamicmodel_datatype.getDataTypeHistoryVersions?datatypeId='+datatypeId,
		method : 'GET',
		fields : [{
					name : 'datatypeId',
					type : 'string'
				}, {
					name : 'datatypeName',
					type : 'string'
				}, {
					name : 'datatypeDiscription',
					type : 'string'
				}, {
					name : 'version',
					type : 'string'
				}, {
					name : 'userId',
					type : 'string'
				}, {
					name : 'userTrueName',
					type : 'string'
				}, {
					name : 'createTime',
					type : 'date',
					mapping : 'createTime.time',
					dateFormat : 'time'
				}]
	});
	dataTypeHistoryGrid.grid = new Ext.grid.GridPanel({
		store : dataTypeHistoryGrid.ds,
		cm : cm,
		autoScroll : true,
		bodyStyle : 'border-top:0px;boder-left:0px;border-bottom:0px;',
		sm : sm,
		viewConfig : {
			forceFit : true
		}
	})
	sm.on("rowselect", function(s, n, r) {
		if(s.getSelections().length>1){
			s.deselectRow(n);
		}
	})
	dataTypeHistoryGrid.ds.load();
	return dataTypeHistoryGrid.grid;
}
