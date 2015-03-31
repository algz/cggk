
/**
 * 角色列表
 */
var privMain = {
	privpanel : null,
	privgrid : null,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null
};

privMain.grid = function() {
	var strurl = '../JSON/base_privilege_privSerivce.selectPriv';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'privilegeid'
			}, ['privilegeid', 'privilegename', 'description', 'functionid',
					'menuid', 'groups']);
	var ascid = 'privilegeid';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);
	ds = new data.Store(proxy, reader, ascid, ascstr);
	ds.on('datachanged', function(ds) {
				if (privSelect.sel && ds.getCount() == 0) {

					Ext.MessageBox.alert('' + getResource('resourceParam508')
									+ '', "" + getResource('resourceParam765')
									+ "");
				}
			});

	var sm = new Ext.grid.RowSelectionModel({
				singleSelect : true
			});

	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [{
			id : 'privilegeid',
			header : getResource('resourceParam756'),// "权限编号",
			dataIndex : 'privilegeid',
			width : 80
		}, {
			header : "" + getResource('resourceParam674') + "",
			dataIndex : 'privilegename',
			width : 100
		}, {
			header : "" + getResource('resourceParam675') + "",
			dataIndex : 'description',
			width : 200,
			renderer : function(value, cellmeta, record, rowIndex,
					columnIndex, store) {
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
		}, {
			header : "" + getResource('resourceParam757') + "",
			dataIndex : 'functionid',
			// hidden:true,
			width : 80
		}, {
			header : "" + getResource('resourceParam766') + "",
			dataIndex : 'menuid',
			width : 100
		}, {
			header : getResource('resourceParam1654'),// "分组",
			dataIndex : 'groups',
			width : 100
		}]
	});

	var tb = ['-', {
				text : getResource('resourceParam3011'),// '新增权限',
				iconCls : 'priv-add',
				tooltip : {
					title : getResource('resourceParam3011')/* '新增权限' */,
					text : getResource('resourceParam3012')
/* '添加一个新的权限' */	},
				handler : privAdd.init

			}, '-', {
				// enableToggle:true,
				text : '' + getResource('resourceParam763') + '',
				tooltip : {
					title : '' + getResource('resourceParam763') + '',
					text : '' + getResource('resourceParam761') + ''
				},
				iconCls : 'priv-edit',
				handler : privUpdate.init

			}, '-', {
				// enableToggle:true,
				text : getResource('resourceParam3013'),// '删除权限',
				tooltip : {
					title : getResource('resourceParam3013')/* '删除权限' */,
					text : getResource('resourceParam3014')
/* '删除选中的权限信息' */},
				iconCls : 'priv-del',
				handler : privDel.init
			}, '-', {
				// enableToggle:true,
				text : '' + getResource('resourceParam767') + '',
				tooltip : {
					title : '' + getResource('resourceParam767') + '',
					text : '' + getResource('resourceParam760') + ''
				},
				iconCls : 'priv-select',
				handler : privSelect.init
			}, 
//			'-', {
//				// enableToggle:true,
//				text : getResource('resourceParam3015'),// '为权限指定菜单',
//				tooltip : {
//					title : getResource('resourceParam3015')/* '为权限指定菜单' */,
//					text : getResource('resourceParam3016')
///* '为选择的权限指定菜单' */},
//				iconCls : 'priv-menu',
//				handler : privmenu.init
//			},
			'-', {
				// enableToggle:true,
				text : '' + getResource('resourceParam768') + '',
				tooltip : {
					title : '' + getResource('resourceParam764') + '',
					text : '' + getResource('resourceParam762') + ''
				},
				iconCls : 'priv-select',
				handler : function() {
					privMain.baseargs = {
						privilegeid : null,
						privilegename : null
					}
					myGrid.loadvalue(privMain.privgrid.store, privMain.args,
							privMain.baseargs);
				}
			}, '-'];
	var grid = myGrid.init(ds, cm, tb, sm);
	return grid;
}
privMain.init = function() {
	Ext.QuickTips.init();

	privMain.privpanel = new Ext.Panel({
				id : 'privpanel',
				layout : 'fit',
				border : false,
				region : 'center',
				titlebar : false,
				autoScroll : true,
				margins : '0 5 5 0'

			});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [privMain.privpanel]

	});
	privMain.privgrid = privMain.privpanel.add(privMain.grid());
	privMain.privpanel.doLayout();
	myGrid.loadvalue(privMain.privgrid.store, privMain.args, privMain.baseargs);
}
Ext.onReady(privMain.init, privMain, true);
