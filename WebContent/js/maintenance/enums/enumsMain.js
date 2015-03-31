
/**
 * 部门类型列表
 */
var enumsMain = {
	enumspanel : null,
	enumsgrid : null,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : {
		type : 1
	}
};

enumsMain.grid = function() {
	var strurl = '../JSON/tasklist_taskService.getSysEnumsVo';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'id'
			}, ['id', 'enumsname', 'dcontext', 'isdelete']);
	var ascid = 'id';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);

	var sm = new Ext.grid.RowSelectionModel({
				singleSelect : true
			});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			header : getResource('resourceParam1998')
					+ getResource('resourceParam461') + "",
			dataIndex : 'id',
			hidden : true,
			width : 60
		}, {
			header : getResource('resourceParam1998')
					+ getResource('resourceParam480') + "",
			dataIndex : 'enumsname',
			width : 60
		}, {
			header : "" + getResource('resourceParam648') + "",
			dataIndex : 'dcontext',
			width : 60,
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				var name = '';
				if (value.length > 45) {
					for (i = 0; i < value.length; i = i + 45) {
						name = name + value.substring(i, i + 45) + ' ';
					}
				} else {
					name = value;
				}
				return '<font ext:qtip="' + name + '">' + value + '</font>';
			}
		}]
	});

	var tb = ['-', {
		text : '' + getResource('resourceParam477')
				+ getResource('resourceParam1998'),
		iconCls : 'priv-add',
		tooltip : {
			title : '' + getResource('resourceParam477')
					+ getResource('resourceParam1998'),
			text : '' + getResource('resourceParam647') + '一个新的'
					+ getResource('resourceParam1998')
		},
		handler : enumsAdd.init

	}, '-', {
		// enableToggle:true,
		text : '' + getResource('resourceParam478')
				+ getResource('resourceParam1998'),

		iconCls : 'priv-edit',
		tooltip : {
			title : '' + getResource('resourceParam478')
					+ getResource('resourceParam1998'),
			text : '' + getResource('resourceParam478') + '选中的'
					+ getResource('resourceParam1998')
		},
		handler : enumsUpdate.init

	}, '-', {
		// enableToggle:true,
		text : '' + getResource('resourceParam475')
				+ getResource('resourceParam1998'),

		iconCls : 'priv-del',
		tooltip : {
			title : '' + getResource('resourceParam475')
					+ getResource('resourceParam1998'),
			text : '' + getResource('resourceParam475') + '选中的'
					+ getResource('resourceParam1998')
		},
		handler : enumsDelete.init

	}, '-'];
	var grid = myGrid.init(ds, cm, tb, sm);
	return grid;
}
enumsMain.init = function() {
	Ext.QuickTips.init();

	enumsMain.enumspanel = new Ext.Panel({
				id : 'enumspanel',
				layout : 'fit',
				border : false,
				region : 'center',
				titlebar : false,
				autoScroll : true,
				margins : '0 5 5 0'

			});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [enumsMain.enumspanel]

	});
	enumsMain.enumsgrid = enumsMain.enumspanel.add(enumsMain.grid());
	enumsMain.enumspanel.doLayout();
	myGrid.loadvalue(enumsMain.enumsgrid.store, enumsMain.args,
			enumsMain.baseargs);
}
Ext.onReady(enumsMain.init, enumsMain, true);
