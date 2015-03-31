/**
 * 显示分配权限列表
 */

var showprivgrid = {};

showprivgrid.init = function() {
	var strurl = '../JSON/base_role_rolePrivSerivce.roleDelprivgrid';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'roleprivid'
			}, ['roleprivid', 'privilegeid', 'privilegename']);
	var ascid = 'privilegeid';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);
	ds.baseParams = {
		roleid : roleShow.roleid
	}
	ds.load();
	var sm = new Ext.grid.RowSelectionModel({
				singleSelect : true
			});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [new Ext.grid.RowNumberer(), {
			id : 'privilegeid',
			header : ""+getResource('resourceParam756')+"",
			dataIndex : 'privilegeid',
			width : 80
		}, {
			header : ""+getResource('resourceParam674')+"",
			dataIndex : 'privilegename',
			width : 120
		}]
	});

	var grid = myGrid.initNobr(ds, cm, null, sm);
	return grid;
}
