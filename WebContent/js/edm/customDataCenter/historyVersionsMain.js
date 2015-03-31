var historyVersionsMain = {};
historyVersionsMain.init = function(nodeid){
	//left
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), sm, {
			header : ''+getResource('resourceParam480')+'',
			dataIndex : 'categoryInstanceName',
			width : 60
		}, {
			header : ''+getResource('resourceParam462')+'',
			dataIndex : 'version',
			width : 30
		}, {
			header : ''+getResource('resourceParam1731')+'',
			dataIndex : 'note',
			width : 80
		}, {
			header : ''+getResource('resourceParam1341')+'',
			dataIndex : 'userName',
			width : 40
		}, {
			header : ''+getResource('resourceParam689')+'',
			dataIndex : 'depName',
			width : 80
		}, {
			header : ''+getResource('resourceParam981')+'',
			dataIndex : 'createTime',
			renderer : Ext.util.Format.dateRenderer('Y-m-d H:i:s'),
			width : 80
		}]
	});
	historyVersionsMain.ds = new Ext.data.JsonStore({
		url : '../JSON/datacenter_DataCenterRemote.getHistoryVersionsByCategoryInstanceId?categoryInstanceID='+nodeid,
		method : 'GET',
		fields : [{
					name : 'categoryInstanceId',
					type : 'string'
				}, {
					name : 'categoryInstanceName',
					type : 'string'
				}, {
					name : 'version',
					type : 'string'
				}, {
					name : 'fixedRevision',
					type : 'string'
				}, {
					name : 'note',
					type : 'string'
				}, {
					name : 'userName',
					type : 'string'
				}, {
					name : 'depName',
					type : 'string'
				}, {
					name : 'createTime',
					type : 'date',
					mapping : 'createTime.time',
					dateFormat : 'time'
				}]
	});
	historyVersionsMain.grid = new Ext.grid.GridPanel({
		store : historyVersionsMain.ds,
		cm : cm,
		autoScroll : true,
		bodyStyle : 'border-top:0px;boder-left:0px;border-bottom:0px;',
		sm : sm,
		clicksToEdit : 2,
		viewConfig : {
			forceFit : true
		}
	})
	sm.on("rowselect", function(s, n, r) {
		if(s.getSelections().length>1){
			s.deselectRow(n);
		}
	})
	var mainPanel = new Ext.Panel({
		layout : 'fit',
		height : 340,
		border : false,
		items : [historyVersionsMain.grid]
	})
	historyVersionsMain.ds.load();
	return mainPanel;
}
