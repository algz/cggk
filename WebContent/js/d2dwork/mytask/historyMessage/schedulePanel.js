var schedulePanel = {
panel:null
};
//委派历史记录
schedulePanel.init = function() {
	
	var scheduleProxy = new Ext.data.HttpProxy({
				url : '../JSON/histTaskRemote.getHistTask',
				methord : "GET"
			});
	var scheduleReader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id','userId', 'userName','actionDesc', 'completedamount', 'actionTime']);
	var scheduleStore = new Ext.data.GroupingStore({
				reader : scheduleReader,
				proxy : scheduleProxy,
				groupField : 'userId',
				sortInfo : {
					field : 'userId',
					direction : 'asc'
				}
			});
	var schedulecm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header : ''+getResource('resourceParam879')+'',
			hidden : true,
			dataIndex : 'userId',
			name : 'userId'
		},{
			header : ''+getResource('resourceParam9138')+'',
			dataIndex : 'userName',
			name : 'userName'
		}, {
			header : ''+getResource('resourceParam9139')+'',
			width:60,
			dataIndex : 'actionDesc',
			name : 'actionDesc'
		},{
			header : ''+getResource('resourceParam9140')+'',
			width:100,
			dataIndex : 'completedamount',
			name : 'completedamount'
		},{
			header : ''+getResource('resourceParam9141')+'',
			width:100,
			dataIndex : 'actionTime',
			name : 'actionTime'
		}]
	});
			if(!schedulePanel.panel || schedulePanel.panel==null) {
			// 委派历史面板
				schedulePanel.panel = new Ext.grid.GridPanel({
					id : 'schedulePanel1',
					autoHeight : true,
					layout : 'fit',
					store : scheduleStore,
					cm : schedulecm,
					view : new Ext.grid.GroupingView({
								forceFit : true
							})
				});
			}
	return schedulePanel.panel;
}
