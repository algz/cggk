var dataCenterMainContent = {};

dataCenterMainContent.init = function() {

	var store = new Ext.data.JsonStore({
				root : 'root',
				totalProperty : 'sum',
				url : '',
				remoteSort : true,
				fields : [{}]
			});
	var grid = new Ext.grid.GridPanel({
				id : 'dataCenterGridPanel',
				trackMouseOver : true,
				disableSelection : true,
				store : store,
				enableHdMenu : false,
				enableColumnResize : false,
				border : false,
				cm : new Ext.grid.ColumnModel({
					defaults: {
				        sortable: false,
				        menuDisabled: true
				    },
					columns : [{
							header : ""+getResource('resourceParam480')+"",
							dataIndex : '',
							width : 200
						}, {
							header : ""+getResource('resourceParam481')+"",
							dataIndex : '',
							width : 180
						}, {
							header : ""+getResource('resourceParam853')+"",
							dataIndex : '',
							width : 100
						}, {
							header : ""+getResource('resourceParam511')+"",
							dataIndex : '',
							width : 100
						}, {
							header : ""+getResource('resourceParam857')+"",
							dataIndex : '',
							sortable : true,
							width : 220
						}]
				})
			});
	dataCenterMainContent.panel = new Ext.Panel({
				region : 'center',
				html : '<div id="dataCenterColumnTreePanel" style="height:731px;overflow-y:auto;overflow-x:hidden;"></div>',
				items : [grid]
			})
	return dataCenterMainContent.panel;
}
