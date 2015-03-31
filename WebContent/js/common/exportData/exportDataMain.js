
/**
 * 数据备份列表
 */
var exportDataMain = {
	panel : null,
	grid : null,
	baseargs : null,
	args : {
		start : 0,
		limit : 25
	}
};

exportDataMain.grid = function() {
	// 判断并渲染是否是立即导出

	function renderimmediately_or_not(value) {
		if (value == 1) {
			return "<span'>" + getResource('resourceParam7112')
					+ getResource('resourceParam1196') + "</span>"
		} else if (value == 2) {
			return "<span'>" + getResource('resourceParam7113')
					+ getResource('resourceParam1196') + "</span>"
		}
	}
	// 判断并渲染是否时Excel格式
	function renderform_or_not(value) {
		if (value == 1) {
			return "<span'>" + "Excel" + getResource('resourceParam7110')
					+ "</span>"
		} else if (value == 2) {
			return "<span'>" + "Sql" + getResource('resourceParam7110')
					+ "</span>"
		}

	}

	// 下拉列表原始数据
	var data = [[0, '' + getResource('resourceParam4020') + ''],
			[1, 'Excel' + getResource('resourceParam7110') + ''],
			[2, 'sql' + getResource('resourceParam7110') + '']];

	var exportTypeStore = new Ext.data.SimpleStore({
				fields : ['value', 'text'],
				data : data
			});
	// 导出类型下拉列表
	var comboExportType = new Ext.form.ComboBox({
				id : 'exporttype',
				store : exportTypeStore,
				// emptyText:'审批记录',
				mode : 'local',
				triggerAction : 'all',
				valueField : 'value',
				displayField : 'text',
				editable : false,
				value : 0
			});
	// 当点击首页的下拉列表时
	comboExportType.on('select', function(combo, record, index) {
				if (record.get('value') == 1) {
					exportDataMain.baseargs = {
						sign : 1
					};
				} else if (record.get('value') == 2) {
					exportDataMain.baseargs = {
						sign : 2
					};
				} else {
					exportDataMain.baseargs = {
						sign : null
					};
				}
				myGrid.loadvalue(exportDataMain.mygrid.getStore(),
						exportDataMain.args, exportDataMain.baseargs);
			})
	// 立即导出
	function immediately_form(value) {
		var etv = Seam.Remoting
				.createType("com.sysware.common.export.ExporterVo");
		if (value == 1) {
			etv.setSign(1);
		} else if (value == 2) {
			etv.setSign(2);
		}
		etv.setMark(1);
		new Ext.LoadMask(document.body, {
					msg : '' + getResource('resourceParam1539') + ''
				});
		var waitConfig = {};
		waitConfig.text = "" + getResource('resourceParam7055') + ","
				+ getResource('resourceParam7056') + "";
		Ext.MessageBox.wait("", "" + getResource('resourceParam7056') + "",
				waitConfig);
		Seam.Component.getInstance("export_ExporterRemote").exportData(etv,
				exportDataMain.exportYN);
	}

	// 导入方式，分为清空导入和更新导入
	function import_data(value) {
		dataids = exportDataMain.dataids();
		if (dataids.length != 1) {
			Ext.MessageBox.alert('' + getResource('resourceParam575') + '', ''
							+ getResource('resourceParam662') + '');
		} else {
			var id = myGrid.rows[0].get('id');
			var sign = myGrid.rows[0].get('sign');
			importData.init(id, value, sign);
		}
	}

	// 判断当前选中记录的条数
	exportDataMain.dataids = function() {
		myGrid.rows = exportDataMain.sm.getSelections();
		var result = new Array();
		var count = 0;
		if (myGrid.rows != null) {
			var size = myGrid.rows.length;
			if (size == 0) {
				return "false";
			}
			for (var i = 0; i < size; i++) {
				result[i] = myGrid.rows[i].id;
			}
			return result;
		}
		return "false";
	}

	// 区分Excel格式和Sql格式的菜单
	var back_up = new Ext.menu.Menu({
				items : [{
					text : '' + getResource('resourceParam7112')
							+ getResource('resourceParam7067') + '',
					menu : [{
								text : 'Excel'
										+ getResource('resourceParam7110') + '',
								handler : function() {
									immediately_form(1);
								}
							}, {
								text : 'Sql' + getResource('resourceParam7110')
										+ '',
								handler : function() {
									immediately_form(2);
								}
							}]
				}, {
					text : '' + getResource('resourceParam7113')
							+ getResource('resourceParam7067') + '',
					handler : timeExport.init
				}]
			});

	// 区分导入类型的菜单
	import_type = new Ext.menu.Menu({
				items : [{
					text : '' + getResource('resourceParam557')
							+ getResource('resourceParam1195') + '',
					handler : function() {
						import_data(1);
					}

				}, {
					text : '' + getResource('resourceParam5036')
							+ getResource('resourceParam1195') + '',
					handler : function() {
						import_data(2);
					}
				}]
			});
	// 首页显示的数据，默认显示全部
	var ds = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/export_ExporterRemote.queryFileNames',
							method : 'POST'
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty'
						}, [{
									name : 'id'
								}, {
									name : 'username'
								}, {
									name : 'sign'
								}, {
									name : 'mark'
								}, {
									name : 'export_date'
								}, {
									name : 'export_path'
								}]),
				sortInfo : {
					field : 'export_date',
					direction : 'desc'
				}
			});
	exportDataMain.sm = new Ext.grid.CheckboxSelectionModel();
	// 设置显示的内容
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [exportDataMain.sm, {
			header : '' + getResource('resourceParam1196')
					+ getResource('resourceParam1847') + '',// '导出用户',
			width : 60,
			dataIndex : 'username'
		}, {
			header : '' + getResource('resourceParam1196')
					+ getResource('resourceParam7116') + '',// '导出形式',
			width : 60,
			dataIndex : 'mark',
			renderer : renderimmediately_or_not
		}, {
			header : '' + getResource('resourceParam1196')
					+ getResource('resourceParam7116') + '',// '导出形式',
			width : 60,
			dataIndex : 'sign',
			renderer : renderform_or_not
		}, {
			header : '' + getResource('resourceParam7052') + '',// '导出日期',
			width : 160,
			dataIndex : 'export_date'
		}, {
			header : '' + getResource('resourceParam492') + '',// 下载
			width : 100,
			renderer : function(value, cellmeta, record, rowIndex, columnIndex,
					store) {
				var str = '';
				var sign;
				if (record.data.fileDate != '')// 通过什么来判断文件实体存在?
					str = '<a href=\"../JSON/ExcelDownloadServlet?fileName='
							+ record.data.id
							+ '&sign='
							+ record.data.sign
							+ '\" name=\'user\'><span style="color:blue;font-weight:bold;" >'
							+ getResource('resourceParam492') + '</span></a>';
				return str;
			}// 按钮
		}]
	});

	// 创建工具栏
	var tb = ['-', {
				text : '' + getResource('resourceParam7067') + '',
				iconCls : 'priv-add',
				menu : back_up

			}, '-', {
				text : '' + getResource('resourceParam7114') + '',
				iconCls : 'priv-edit',
				menu : import_type
				// tooltip : {
			// title : '' + getResource('resourceParam1195') + ''
			// + getResource('resourceParam474') + '',
			// text : '' + getResource('resourceParam1195')
			// + getResource('resourceParam7115')
			// + getResource('resourceParam474') + ''
			// }

		}	, '-', {
				text : '' + getResource('resourceParam475') + '',
				iconCls : 'priv-del',
				tooltip : {
					title : '' + getResource('resourceParam1434') + '',
					text : '' + getResource('resourceParam475')
							+ getResource('resourceParam7115')
							+ getResource('resourceParam474') + ''
				},
				handler : function() {
					dataids = exportDataMain.dataids();
					if (dataids == "false") {
						Ext.MessageBox.alert(''
										+ getResource('resourceParam575') + '',
								'' + getResource('resourceParam7094') + '');
						return false;
					} else {
						var arr = new Array();
						for (i = 0; i < myGrid.rows.length; i++) {
							arr[i] = myGrid.rows[i].get('export_path');
						}
						deleteData.init(dataids, arr);
					}
				}

			}, '-', {
				text : '' + getResource('resourceParam1482') + '',
				style : 'margin-left:20px;',
				xtype : 'label'

			}, comboExportType];

	// 创建面板
	var grid = new Ext.grid.GridPanel({
				region : 'center',
				layout : 'fit',
				store : ds,
				sm : exportDataMain.sm,
				cm : cm,
				stripeRows : true,
				viewConfig : {
					forceFit : true
				},
				tbar : tb,
				bbar : new Ext.PagingToolbar({
							pageSize : 25,
							store : ds,
							displayInfo : true,
							displayMsg : '' + getResource('resourceParam7074')
									+ '',
							emptyMsg : "" + getResource('resourceParam7075')
									+ ""
						})
			});
	return grid;
}

// 导出后执行的方法
exportDataMain.exportYN = function(sign) {
	if (sign == true) {
		Ext.MessageBox.hide();
		myGrid.loadvalue(exportDataMain.mygrid.getStore(), exportDataMain.args,
				exportDataMain.baseargs);
		Ext.example.msg("" + getResource('resourceParam575') + "", ""// 提示
						+ getResource('resourceParam7043') + "");// 导出成功
	} else {
		Ext.MessageBox.hide();
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam7044') + '',// 导出失败
					msg : '' + getResource('resourceParam7045') + '',// 您的信息导出失败，请重新导出！
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}
exportDataMain.init = function() {
	Ext.QuickTips.init();
	exportDataMain.panel = new Ext.Panel({
				id : 'exportdatapanel',
				layout : 'fit',
				border : false,
				region : 'center',
				titlebar : false,
				autoScroll : true,
				margins : '0 5 5 0'
			});

	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [exportDataMain.panel]

	});
	exportDataMain.mygrid = exportDataMain.grid();
	exportDataMain.grid = exportDataMain.panel.add(exportDataMain.mygrid);
	exportDataMain.panel.doLayout();
	if (Ext.getCmp('exporttype').getValue() == 1) {
		exportDataMain.baseargs = {
			sign : 1
		};
	} else if (Ext.getCmp('exporttype').getValue() == 2) {
		exportDataMain.baseargs = {
			sign : 2
		};
	} else {
		exportDataMain.baseargs = {
			sign : null
		};
	}
	myGrid.loadvalue(exportDataMain.mygrid.getStore(), exportDataMain.args,
			exportDataMain.baseargs);
}
Ext.onReady(exportDataMain.init, exportDataMain, true);
