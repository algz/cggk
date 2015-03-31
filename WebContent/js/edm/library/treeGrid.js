Ext.grid.myCheckboxSelectionModel = Ext.extend(Ext.grid.CheckboxSelectionModel,
		{
			header : '<div class="x-grid3-hd-checker" style="display:none;">&#160;</div>'
		})
Ext.override(Ext.form.Action.Submit, {
			processResponse : function(response) {
				this.response = response;
				var data = response.responseText;
				if (data.indexOf('<pre>') != -1) {
					response.responseText = data.substring(5, data.length - 6);
					this.response = Ext.util.JSON.decode(response.responseText);
				}
				if (!response.responseText) {
					return true;
				}
				this.result = this.handleResponse(response);
				return this.result;
			}
		});
var treeGrid = {
	start : 0,
	limit : 10,
	args : {
		start : 0,
		limit : 25
	},
	pkList : null,
	baseargs : null

}
treeGrid.init = function(tableName, tableDisplayName, desc) {
	treeGrid.pkArray = new Array();
	var conn = synchronize.createXhrObject();
	var url = "../JSON/warehouseobject_WarehouseObjectRemote.getTableHeadInfo?tableName="
			+ tableName;
	conn.open("GET", url, false);
	conn.send(null);
	var respText = conn.responseText;
	treeGrid.headtext = respText;
	// treeGrid.initSearch(tableName)
	var grid = treeGrid.format(treeGrid.headtext, tableDisplayName, tableName);
	// var addform = treeGrid.addForm(tableName);
	// var updateform = treeGrid.updateForm(tableName);
	// var infoform = treeGrid.rowInfoForm(tableName);
	var listPanel = new Ext.Panel({
				border : false,
				region : 'center',
				layout : 'fit',
				autoScroll : true,
				items : [grid]
			});
	var main = new Ext.Panel({
				layout : 'border',
				border : false,
				items : [listPanel]
			});
	treeGrid.attributePanel = new Ext.Panel({
				// title : wsname,
				layout : 'card',
				border : false,
				activeItem : 0,
				items : [main]
			});

	treeGrid.attributePanel.doLayout();

	return treeGrid.attributePanel;
}
treeGrid.format = function(text, name, tableName) {
	Ext.QuickTips.init();
	var sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					selectionchange : function(sm) {
						// if (sm.getCount() == 1) {
						// Ext.getCmp('buttonUpdate').enable();
						// Ext.getCmp('buttonView').enable();
						// } else {
						// Ext.getCmp('buttonUpdate').disable();
						// Ext.getCmp('buttonView').disable();
						// }
					},
					rowselect : function(sm, rowIndex, record) {
						// if (sm.getCount() == 1) {
						// Ext.getCmp('buttonUpdate').enable();
						// Ext.getCmp('buttonView').enable();
						// } else {
						// Ext.getCmp('buttonUpdate').disable();
						// Ext.getCmp('buttonView').disable();
						// }
					}
				}

			});
	var base = treeGrid.headtext.split("\?")[0];
	var headgruop = treeGrid.headtext.split("\?")[1];
	var colsindex = treeGrid.headtext.split("\?")[2];
	var header = Ext.util.JSON.decode(base);

	for (var i = 1; i < header.length; i++) {

		var conn = synchronize.createXhrObject();
		var url = "../JSON/warehouseobject_WarehouseObjectRemote.getColumnById?tableName="
				+ tableName + "&columnName=" + header[i].dataIndex;
		conn.open("GET", url, false);
		conn.send(null);
		var respText = Ext.util.JSON.decode(conn.responseText);
		var type = respText.col['datatype'];
		var id = respText.col['columnName'];
		var name = respText.col['columnDisplayname'];
		var value = respText.col['defaultValue'];
		var rank = respText.col['rank'];
		var realtype = respText.col['realtype'];
		var pkGenType = respText.col['pkGenType'];
		var pk = respText.col['primaryKey'];
		var nullable = respText.col['nullable'];
		var isref = 0;
		if (pk == true) {
			var pkCol = new Object();
			pkCol.columnName = id;
			pkCol.pkGenType = pkGenType;
			treeGrid.pkArray.push(pkCol);
		}
		id = '';
		if (header[i].hidden != true) {
			// var value =
			// formjson.rows[i]['value'];
			// alert(type + id + name + idpath);

			var fomat = "";
			var precision = 8;

			if (realtype == "double") {
				precision = 10;
			} else if (realtype == "date") {
				fomat = "Y-m-d";
			}
			if (rank == 9) {
				var obj1 = libraryUtils.getChildDataModelPhysicType(type);
				var f1 = libraryUtils.enumTypeField(id, id, name, '', fomat, 0,
						type, true, '', 50, obj1.results);
				Ext.apply(f1, {
							datatype : realtype,
							pk : pk,
							pkGenType : pkGenType
						});
				// if (pk == true && pkGenType != 1) {
				// f2.inputType = "hidden";
				// }
				header[i].editor = f1;

			} else {
				// libraryUtils.getFormControl = function(id, name,
				// labelname, value, format,
				// precision, type, allowblank, checkstr, length) {
				var f2 = libraryUtils.getFormControl(id, id, name, value,
						fomat, precision, realtype);
				Ext.apply(f2, {
							datatype : realtype,
							pk : pk,
							pkGenType : pkGenType
						});
				// if (pk == true && pkGenType != 1) {
				// f2.hide();
				// f2.inputType = "hidden";
				// }
				header[i].editor = f2;
				if (realtype == "date") {
					header[i].xtype = 'datecolumn';
					header[i].format = 'Y-m-d';
					// header[i].renderer = function(v, p, record) {
					// if (v != undefined) {
					// var dataTime = new Date(v.time.time);
					// return dataTime.format('Y-m-d');
					// }
					// }
				}
			}

			// header[i].hidden = false;
			header[i].id = header[i].dataIndex;
		}
	}

	var hh = Ext.util.JSON.decode(headgruop);

	var cols = Ext.util.JSON.decode(colsindex);
	var headColMod = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : header
	})
	var strurl = '../JSON/warehouseobject_WarehouseObjectRemote.getTableData?tableName='
			+ tableName;
	var proxy = new Ext.data.HttpProxy({
				url : strurl,
				method : 'post'
			});
	var reader = new Ext.data.JsonReader({
		root : 'results',
		totalProperty : 'totalProperty'
			// ,id : 'categoryId'
		}, cols);
	var ascid = '';
	var ascstr = '';
	// treeGrid.ds = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
	// proxy : proxy,
	// reader : reader
	// });

	// myGrid.loadvalue(treeGrid.ds, treeGrid.args, treeGrid.baseargs);
	// treeGrid.ds.reload();
	// treeGrid.grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
	// tbar : [{
	// text : '' + getResource('resourceParam477') + '',
	// iconCls : 'add1',
	// listeners : {
	// 'click' : function() {
	// var Plant = treeGrid.grid.getStore().recordType;
	// var p = null;
	// p = new Plant({
	// parentid : '0'
	//
	// });
	// treeGrid.grid.stopEditing();
	// p.markDirty()
	// // var n1 = dataObjectTree.getEnableCheckNodes()[0];
	// // dataObjectTree.getStore().addToNode(n1, p);
	// treeGrid.grid.getStore().insert(
	// treeGrid.grid.getStore().getCount(), p);
	//
	// }
	// }
	//
	// }, {
	// text : '' + getResource('resourceParam475') + '',
	// iconCls : 'del1',
	// listeners : {
	// 'click' : function() {
	// }
	//
	// }
	// }, {
	//
	// text : '添加',
	// iconCls : 'add1',
	// menu : [new Ext.Action({
	// text : '列',
	// handler : function() {
	//
	// var Plant = treeGrid.grid.getStore().recordType;
	// var p = null;
	// p = new Plant();
	// treeGrid.grid.stopEditing();
	// p.markDirty()
	// // var n1 = dataObjectTree.getEnableCheckNodes()[0];
	// // dataObjectTree.getStore().addToNode(n1, p);
	// treeGrid.grid.getStore().insert(
	// treeGrid.grid.getStore().getCount(), p);
	//
	// }
	// }), new Ext.Action({
	// text : '子列',
	// handler : function() {
	// if (treeGrid.grid.getSelectionModel().getSelections().length != 1) {
	// return;
	// }
	// var Plant = treeGrid.grid.getStore().recordType;
	// var p = null;
	// p = new Plant({
	// parentid : treeGrid.grid.getSelectionModel()
	// .getSelections()[0].get('A')
	// });
	// treeGrid.grid.getStore()
	// .addToNode(
	// treeGrid.grid.getSelectionModel()
	// .getSelections()[0], p);
	// treeGrid.grid.getStore().expandAll();
	//
	// treeGrid.grid.stopEditing();
	// p.markDirty()
	//
	// }
	// })]
	//
	// }],
	//
	// autoScroll : true,
	// master_column_id : 'A',
	// disableSelection : true,
	// store : treeGrid.ds,
	// sm : sm,
	// colModel : headColMod,
	//
	// plugins : [new Ext.ux.plugins.GroupHeaderGrid({
	// rows : hh,
	// hierarchicalColMenu : false
	// })],
	// bbar : new Ext.PagingToolbar({
	// pageSize : 10,
	// store : treeGrid.ds,
	// displayInfo : true,
	// displayMsg : '' + getResource('resourceParam946')
	// + '{0} - {1} ' + getResource('resourceParam949')
	// + ' {2} 行',
	// emptyMsg : "" + getResource('resourceParam945') + ""
	// })
	//
	// });

	this.proxy = new Ext.data.HttpProxy({
		method : 'POST',
		url : '../JSON/warehouseobject_WarehouseObjectRemote.getTableData?tableName='
				+ tableName
	});

	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				// autoLoad : true,
				proxy : this.proxy,
				reader : new Ext.data.JsonReader({
							id : 'E',
							root : 'results',
							totalProperty : 'totalProperty'
						}, cols)
			});
	var lineNum = new Ext.grid.RowNumberer({})
	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : store,
		sm : sm,

		master_column_id : 'E',
		loadMask : true,
		tbar : [{
					text : '' + getResource('resourceParam475') + '',
					iconCls : 'del1',
					id : 'buttonDel',
					listeners : {
						'click' : function() {
						}

					}
				}, {

					text : '添加',
					iconCls : 'add1',
					menu : [new Ext.Action({
						text : '列',
						handler : function() {

							var Plant = grid.getStore().recordType;
							var p = null;
							p = new Plant();
							grid.stopEditing();
							p.markDirty()
							// var n1 =
							// dataObjectTree.getEnableCheckNodes()[0];
							// dataObjectTree.getStore().addToNode(n1,
							// p);

							for (var i = 0; i < treeGrid.pkArray.length; i++) {
								var conn = synchronize.createXhrObject();
								var url = "../JSON/warehouseobject_WarehouseObjectRemote.getSequence?tableName=abc";
								conn.open("GET", url, false);
								conn.send(null);
								var rep = Ext.util.JSON
										.decode(conn.responseText);
								p.set(treeGrid.pkArray[i].columnName, rep);
							}
							grid.getStore().insert(grid.getStore().getCount(),
									p);

						}
					}), new Ext.Action({
						text : '子列',
						handler : function() {
							if (grid.getSelectionModel().getSelections().length != 1) {
								return;
							}
							var Plant = grid.getStore().recordType;
							var p = null;
							p = new Plant({
										parentid : grid.getSelectionModel()
												.getSelections()[0].get('A')
									});
							for (var i = 0; i < treeGrid.pkArray.length; i++) {
								var conn = synchronize.createXhrObject();
								var url = "../JSON/warehouseobject_WarehouseObjectRemote.getSequence?tableName=abc";
								conn.open("GET", url, false);
								conn.send(null);
								var rep = Ext.util.JSON
										.decode(conn.responseText);
								p.set(treeGrid.pkArray[i].columnName, rep);
								p
										.set(
												"P_"
														+ treeGrid.pkArray[i].columnName,
												grid.getSelectionModel()
														.getSelections()[0]
														.get(	treeGrid.pkArray[i].columnName));
							}
							grid.getStore()
									.addToNode(
											grid.getSelectionModel()
													.getSelections()[0], p);
							alert(p.get("P_E"));
							grid.getStore().expandAll();

							grid.stopEditing();
							p.markDirty()

						}
					})]

				}],
		colModel : headColMod,
		// columns : header,
		// stripeRows : true,
		plugins : [new Ext.ux.plugins.GroupHeaderGrid({
					rows : hh,
					hierarchicalColMenu : false
				})],
		autoScroll : true,
		autoExpandeColumn : 'E'
	});

	// treeGrid.grid.on("rowclick", function(grid, rowindex, e) {
	//
	// });

	panel = new Ext.Panel({
				border : false,
				layout : 'fit',
				autoScroll : true,
				items : [grid]
			});
	// treeGrid.grid.getSelectionModel().on('selectionchange', function() {
	// // alert('fddffd')
	//
	// })
	return panel;

}
