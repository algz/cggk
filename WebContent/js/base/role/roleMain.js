
/**
 * 角色列表
 */
var roleMain = {
	rolepanel : null,
	rolegrid : null,
	args : null,
	baseargs : null
};

roleMain.grid = function() {
	var strurl = '../JSON/base_role_roleSerivce.selectRole';
	var proxy = new Ext.data.HttpProxy({
				url : strurl
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'roleid'
			}, ['roleid', 'rolename', 'descr', 'roleType']);
	var ascid = 'roleid';
	var ascstr = 'asc';
	var ds = new data.Store(proxy, reader, ascid, ascstr);

	ds = new data.Store(proxy, reader, ascid, ascstr);
	ds.on('datachanged', function(ds) {
				if (roleSelect.sel && ds.getCount() == 0) {
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
		columns : [
			// {
			// id: 'roleid',
			// header: "角色编号",
			// dataIndex: 'roleid',
			// width: 80
			// },
			{
			header : "" + getResource('resourceParam797') + "",
			dataIndex : 'rolename',
			width : 120
		}, {
			header : "" + getResource('resourceParam796') + "",
			dataIndex : 'descr',
			width : 200,
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
	var tb = [
			// {
			// text : '修复角色的拼音字段',
			// handler : function(){
			// Ext.Ajax.request({
			// url : "../JSON/base_role_roleSerivce.fixRolePinyinName",
			// method : 'POST',
			// success : function(response, options) {
			// var obj = Ext.util.JSON.decode(response.responseText);
			// Ext.MessageBox.show({
			// title : '提示',// 导出失败
			// msg : obj.success,
			// buttons : Ext.MessageBox.OK,
			// icon : Ext.MessageBox.OK
			// });
			// },
			// disableCaching : true,
			// autoAbort : true,
			// params : {
			// roleid : ''
			// }
			// });
			// }
			// },
			'-', {
				text : '' + getResource('resourceParam830') + '',
				iconCls : 'role-add',
				tooltip : {
					title : '' + getResource('resourceParam830') + '',
					text : '' + getResource('resourceParam824') + ''
				},
				handler : roleAdd.init

			}, '-', {
				// enableToggle:true,
				text : '' + getResource('resourceParam831') + '',
				tooltip : {
					title : '' + getResource('resourceParam831') + '',
					text : '' + getResource('resourceParam822') + ''
				},
				iconCls : 'role-edit',
				handler : roleUpdate.init

			}, '-', {
				// enableToggle:true,
				text : '' + getResource('resourceParam832') + '',
				tooltip : {
					title : '' + getResource('resourceParam832') + '',
					text : '' + getResource('resourceParam823') + ''
				},
				iconCls : 'role-del',
				handler : roleDel.init
			}, '-', {
				// enableToggle:true,
				text : '' + getResource('resourceParam833') + '',
				tooltip : {
					title : '' + getResource('resourceParam833') + '',
					text : '' + getResource('resourceParam819') + ''
				},
				iconCls : 'role-addpriv',
				handler : roleShow.init
			}, '-', {
				// enableToggle:true,
				text : '' + getResource('resourceParam834') + '',
				tooltip : {
					title : '' + getResource('resourceParam834') + '',
					text : '' + getResource('resourceParam820') + ''
				},
				iconCls : 'role-select',
				handler : roleSelect.init
			}, '-', {
				// enableToggle:true,
				text : '' + getResource('resourceParam811') + '',
				tooltip : {
					title : '' + getResource('resourceParam811') + '',
					text : '' + getResource('resourceParam826') + ''
				},
				iconCls : 'role-copypriv',
				handler : function() {
					myGrid.row = roleMain.rolegrid.selModel.getSelected();
					if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
						Ext.MessageBox.alert(''
										+ getResource('resourceParam508') + '',
								'' + getResource('resourceParam825') + '');
						return false;
					}
					if (myGrid.row.get('roleid') == 1) {
						Ext.MessageBox.alert(''
										+ getResource('resourceParam663') + '',
								'' + getResource('resourceParam818') + '！');
						return false;
					}
					roleCopypriv.getdialog(myGrid.row.get('roleid'));
				}
			}, '-', {
				// enableToggle:true,
				text : '上传',  
				handler : function(){
					roleSelect.fileUploadForm().show();
				}
			}, '-', {
				// enableToggle:true,
				text : '' + getResource('resourceParam836') + '',
				tooltip : {
					title : '' + getResource('resourceParam829') + '',
					text : '' + getResource('resourceParam827') + ''
				},
				iconCls : 'role-addpriv',
				handler : function() {
					roleMain.baseargs = {
						roleid : null,
						rolename : null,
						roleType : null,
						pinyinName : null,
						jianPinyinName : null
					};
					myGrid.loadvalue(roleMain.rolegrid.store, roleMain.args,
							roleMain.baseargs);

				}
			}
	// , '-'
	];
	var grid = myGrid.init(ds, cm, tb, sm);
	return grid;
}
roleMain.init = function() {
	Ext.QuickTips.init();
	// 左边角色面板
	roleMain.rolepanel = new Ext.Panel({
				id : 'rolepanel',
				region : 'center',
				layout : 'fit',
				split : true
			});
	// 右边权限面板
	roleMain.rightPanel = new Ext.Panel({
		region : 'east',
		minSize : 300,
		maxSize : 800,
		disabled : true,
		tbar : [{
			text : '' + getResource('resourceParam7002') + '',// 保存
			iconCls : 'save1',
			id : 'extendTypeGridSave',
			disabled : false,
			handler : function() {
				if (myGrid.row == null) { // 如未选中任何一行，则不执行操作
					Ext.MessageBox.alert('' + getResource('resourceParam508')
									+ '', '' + getResource('resourceParam825')
									+ '');
					return false;
				}
				if (myGrid.row.get('roleid') == 1) {
					Ext.MessageBox.alert('' + getResource('resourceParam663')
									+ '', '' + getResource('resourceParam817')
									+ '！');
					return false;
				}
				var privileges = '';
				var amount = 0;
				roleAddprivtree.grid.store.each(function(rec) {
							if (rec.get("leaf")) {
								if (rec.get("refused")) {
									amount++;
									privileges += rec.get("id") + "-" + 0 + ',';
								}
								if (rec.get("permitted")) {
									amount++;
									privileges += rec.get("id") + "-" + 1 + ',';
								}
							}
						});
				privileges = privileges.substring(0, privileges.length - 1);
				var rptv = Seam.Remoting
						.createType("com.luck.itumserv.base.role.RolePrivTreeVo2");
				rptv.setRoleid(myGrid.row.get('roleid'));
				rptv.setPrivileges(privileges);
				Seam.Component.getInstance("base_role_rolePrivSerivce")
						.saverolePrivileges(rptv, roleMain.saveSuccess);
			}
		}],
		width : 600,
		collapsible : false,
		split : true,
		layout : 'fit'
	});
	roleMain.saveSuccess = function(value) {
		var sign = value;
		if (sign == true) {
			Ext.example.msg("" + getResource('resourceParam575') + "", ""
							+ getResource('resourceParam1072') + "");
		} else {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam634') + '',
						msg : '' + getResource('resourceParam804') + '',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
		}
	}
	// 主面板
	roleMain.centerPanel = new Ext.Panel({
				layout : 'border',
				region : 'center',
				border : false,
				items : [roleMain.rolepanel, roleMain.rightPanel]
			});
	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [roleMain.centerPanel]

	});
	roleAddprivtree.getdialog();
	roleMain.rolegrid = roleMain.rolepanel.add(roleMain.grid());
	roleMain.rolegrid.on('rowclick', function(grid, rowIndex, e) {
				roleMain.rightPanel.setDisabled(false);
				myGrid.row = roleMain.rolegrid.selModel.getSelected();
				roleAddprivtree.getdialog(myGrid.row.get('roleid'));

			});
	roleMain.rolegrid.on('rowdblclick', function(grid, rowIndex, e) {
				roleShow.init();
			});
	roleMain.args = {
		start : 0,
		limit : 25
	};
	roleMain.rolepanel.doLayout();
	myGrid.loadvalue(roleMain.rolegrid.store, roleMain.args, roleMain.baseargs);
}
Ext.onReady(roleMain.init, roleMain, true);
