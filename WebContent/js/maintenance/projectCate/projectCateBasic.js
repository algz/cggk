var cateGoryBasic = {};

cateGoryBasic.init = function() {
	var strurl = '../JSON/maintenance_ProjectCateGory_ProjectCateGoryRemote.getAttributeList';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty'
			}, ['name', 'category',
					// 'length',
					'compulsory']);
	var ds = new data.Store(proxy, reader, null, null);

	var sm = new Ext.grid.RowSelectionModel({
				singleSelect : true
			});
	// var checkColumn = new Ext.grid.CheckColumn({
	// header : "是否必填项",
	// dataIndex : 'compulsory',
	// disabled : true,
	// width : 55
	// });
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header : ''+getResource('resourceParam1784')+'',
			dataIndex : 'name',
			width : 80
		}, {
			header : ""+getResource('resourceParam481')+"",
			dataIndex : 'category',
			width : 100
		}, {
			header : ""+getResource('resourceParam512')+""+getResource('resourceParam510')+""+getResource('resourceParam7070')+"",
			dataIndex : 'compulsory',
			width : 55,
			renderer : function(value, p, record) {
				if (value == true) {
					return ''+getResource('resourceParam512')+'';
				} else {
					return ''+getResource('resourceParam510')+'';
				}
			}
		}]
	});
	cateGoryBasic.grid = myGrid.init(ds, cm, null, sm);
	return cateGoryBasic.grid;

}
