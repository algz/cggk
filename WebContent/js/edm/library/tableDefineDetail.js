var tableDefineDetail = {

}
tableDefineDetail.init = function(tabName) {
	Ext.QuickTips.init();
	var tableDefineDetailGrid = tableDefineDetailTreeGrid.init();

	var panel1 = new Ext.Panel({
		title : '定义列',
		layout : 'fit',
		items : [tableDefineDetailGrid],
		tbar : [{
			text : '添加',
			iconCls : 'add1',
			menu : [new Ext.Action({
						text : '列',
						handler : function() {

							var Plant = tableDefineDetailGrid.getStore().recordType;
							var p = null;
							p = new Plant({
										columnDisplayname : '',
										columnName : '',
										metaDatatype : '',
										datatype : 'string',
										realtype : 'string',
										datatypename : '字符串',
										length : '50',
										description : '',
										nullable : true,
										leaf : true,
										newCol : true,
										precision : '',
										scale : '',
										defaultValue : '',
										parentid : '0',
										ispraent : 0,
										rank : 4
									});
							tableDefineDetailGrid.stopEditing();
							p.markDirty()
							// var n1 = dataObjectTree.getEnableCheckNodes()[0];
							// dataObjectTree.getStore().addToNode(n1, p);
							tableDefineDetailGrid.getStore()
									.insert(
											tableDefineDetailGrid.getStore()
													.getCount(), p);

						}
					}), new Ext.Action({
						text : '子列',
						handler : function() {
							if (tableDefineDetailGrid.getSelectionModel()
									.getSelections().length != 1) {
								return;
							} else if (tableDefineDetailGrid
									.getSelectionModel().getSelections()[0]
									.get('columnName') == '') {
								Ext.example.msg(
										'' + getResource('resourceParam596')
												+ '', '请先指定列名！');
								return;
							}
							var Plant = tableDefineDetailGrid.getStore().recordType;
							var p = null;
							p = new Plant({
										columnDisplayname : '',
										columnName : '',
										metaDatatype : 'string',
										datatype : 'string',
										realtype : 'string',
										datatypename : '字符串',
										length : '50',
										description : '',
										nullable : true,
										leaf : true,
										newCol : true,
										precision : 8,
										scale : 2,
										defaultValue : '',
										parentid : tableDefineDetailGrid
												.getSelectionModel()
												.getSelections()[0]
												.get('columnName'),
										ispraent : 0,
										rank : 4

									});
							tableDefineDetailGrid.stopEditing();
							p.markDirty()
							var n1 = tableDefineDetailGrid.getSelectionModel()
									.getSelections();
							var isp = tableDefineDetailGrid.getStore()
									.hasChildNodes(n1[0]);
							for (k = 0; k < n1.length; k++) {
								// alert(n1[k].get('columnName'));
								n1[k].set('leaf', false);
								n1[k].set('ispraent', 1);
								tableDefineDetailGrid.getStore().addToNode(
										n1[k], p);
								if (!isp) {
									if (tableDefineDetailGrid.getStore()
											.hasChildNodes(n1[k])) {
										n1[k].set("change", 1);
									}
								}
								tableDefineDetailGrid.getStore().expandAll();

							}
							// tableDefineGrid.getSelectionModel().clearSelections();
							// tableDefineGrid.getStore().insert(
							// tableDefineGrid.getStore().getCount(), p);

						}
					})]

		}, {
			text : '删除列',
			iconCls : 'del1',
			handler : function() {
				var delNodes = tableDefineDetailGrid.getEnableCheckNodes();
				var hasDelNodes = false;
				var pk = false;
				for (s = 0; s < delNodes.length; s++) {
					if (delNodes[s].get("primaryKey") != true) {
						var depth = tableDefineDetailGrid.getStore()
								.getNodeDepth(delNodes[s]);

						tableDefineDetailGrid.getStore()
								.removeRecord(delNodes[s]);
						if (depth != 0) {
							var p = tableDefineDetailGrid.getStore()
									.getNodeParent(delNodes[s]);
							if (!tableDefineDetailGrid.getStore()
									.hasChildNodes(p)) {

								p.set("leaf", true);
								p.set("change", 0);
							}
						}
						hasDelNodes = true;
						var childNodes = tableDefineDetailGrid.getStore()
								.getNodeChildren(delNodes[s]);
						for (var i = 0; i < childNodes.length; i++) {
							tableDefineDetailGrid.getStore()
									.remove(childNodes[i]);
						}
					} else {
						pk = true;
					}
				}
				var dels = tableDefineDetailGrid.getSelectionModel()
						.getSelections();
				for (k = 0; k < dels.length; k++) {
					if (dels[k].get("primaryKey") != true) {
						if (dels[k].get("newCol") == true) {
							var p = tableDefineDetailGrid.getStore()
									.getNodeParent(dels[k]);
							tableDefineDetailGrid.getStore().remove(dels[k]);
							hasDelNodes = true;
						}
					} else {
						pk = true;

					}
				}
				if (pk) {
					Ext.example.msg('' + getResource('resourceParam596') + '',
							'主键不能被删除！');
				}
				if (!hasDelNodes) {
					Ext.example.msg('' + getResource('resourceParam596') + '',
							'请选择要删除的列！');

				}

			}
		}, {
			text : '' + getResource('resourceParam7002') + '',// 保存
			iconCls : 'save1',
			handler : function(button) {

				// button.disable();
				tableDefineDetailGrid.stopEditing();
				// var loadmask = new Ext.LoadMask(Ext.getBody(), {
				// msg : getResource('resourceParam4039')
				// });
				// loadmask.show();
				var addlist = new Array();
				var store = tableDefineDetailGrid.getStore();
				store.findBy(function(record, id) {
							if (record.get("newCol") == true) {
								addlist.push(record)
							}
						}, store)
				var table = Seam.Component.newInstance("DmTable");
				table.setTableName(tableName.getValue());
				table.setTableDisplayname(tableDisplayName.getValue());
				table.setTableComment(tableDescription.getValue());
				var column = Seam.Component.newInstance("DmColumn");
				column.setTable(table);
				var columnId = Seam.Component.newInstance("DmColumnId");

				var removedRecords = store.removedRecords;
				var delList = new Array();
				for (var k = 0; k < removedRecords.length; k++) {
					if (removedRecords[k].get('newCol') != true) {
						var colId = Seam.Component.newInstance("DmColumnId");
						colId.setTableName(table.getTableName());
						colId
								.setColumnName(removedRecords[k]
										.get("columnName"));
						var col = Seam.Component.newInstance("DmColumn");
						col.setId(colId);
						delList.push(col);
					}
				}
				column.setDelcolumns(delList);
				var editList = new Array();
				for (var i = 0; i < store.getModifiedRecords().length; i++) {

					var modifiedRecord = store.getModifiedRecords()[i];
					if (modifiedRecord.get("newCol") != true) {
						// alert(modifiedRecord.get("columnName")
						// + store.hasChildNodes(modifiedRecord));
						var colId = Seam.Component.newInstance("DmColumnId");
						colId.setTableName(table.getTableName());
						colId.setColumnName(modifiedRecord.get("columnName"));

						var col = Seam.Component.newInstance("DmColumn");

						col.setId(colId);
						col.setOrdernumber(i);
						col.setLength(modifiedRecord.get("length"));
						col.setColumnDisplayname(modifiedRecord
								.get("columnDisplayname"));
						col.setMetaDatatype(modifiedRecord.get("metaDatatype"));
						col.setPrecision(modifiedRecord.get("precision"));
						col.setDefaultValue(modifiedRecord.get("defaultValue"));
						col.setDescription(modifiedRecord.get("description"));

						col.setScale(modifiedRecord.get("scale"));
						col.setDatatype(modifiedRecord.get("datatype"));
						col.setNullable(modifiedRecord.get("nullable") == true
								? 1
								: 0);
						col.setCheckstr(modifiedRecord.get("checkstr"));
						col.setVisible(modifiedRecord.get("visible") == true
								? 1
								: modifiedRecord.get("visible") == undefined
										? 1
										: 0);
						col
								.setSearchable(modifiedRecord.get("searchable") == true
										? 1
										: 0);
						col
								.setPseudoColumn(modifiedRecord
										.get("pseudoColumn") == true ? 1 : 0);
						col.setParentid(modifiedRecord.get("parentid"));
						col.setIspraent(modifiedRecord.get("ispraent"));
						col.setPkGenType(modifiedRecord.get("pkGenType"));
						col
								.setIsPrimaryKey(modifiedRecord
										.get("primaryKey") == true ? 1 : 0);

						col.setChange(modifiedRecord.get("change") === ''
								? 3
								: modifiedRecord.get("change"));
						editList.push(col);
					}

				}
				column.setEditcolumns(editList);
				var list = new Array();
				for (var j = 0; j < addlist.length; j++) {
					var colId = Seam.Component.newInstance("DmColumnId");
					colId.setTableName(table.getTableName());
					colId.setColumnName(addlist[j].get("columnName"));

					var col = Seam.Component.newInstance("DmColumn");
					col.setId(colId);
					col.setOrdernumber(j);
					col.setLength(addlist[j].get("length"));
					col.setColumnDisplayname(addlist[j]
							.get("columnDisplayname"));
					col.setMetaDatatype(addlist[j].get("metaDatatype"));
					col.setPrecision(addlist[j].get("precision"));
					col.setDefaultValue(addlist[j].get("defaultValue"));
					col.setScale(addlist[j].get("scale"));
					col.setDatatype(addlist[j].get("datatype"));
					col.setNullable(addlist[j].get("nullable") == true ? 1 : 0);
					col.setCheckstr(addlist[j].get("checkstr"));
					col.setDescription(addlist[j].get("description"));
					col.setVisible(addlist[j].get("visible") == true
							? 1
							: addlist[j].get("visible") == undefined ? 1 : 0);
					col.setSearchable(addlist[j].get("searchable") == true
							? 1
							: 0);
					col.setRank(addlist[j].get("rank"));

					col.setRealtype(addlist[j].get("realtype"));

					col.setPseudoColumn(addlist[j].get("pseudoColumn") == true
							? 1
							: 0);
					col.setParentid(addlist[j].get("parentid"));
					col.setIspraent(addlist[j].get("ispraent"));
					col.setIsPrimaryKey(addlist[j].get("primaryKey") == true
							? 1
							: 0);
					// alert(col.getId().getTableName());
					list.push(col);
				}

				var sortlist = new Array();
				for (var s = 0; s < sortstore.getCount(); s++) {
					var r1 = sortstore.getAt(s);
					var sortid = Seam.Component.newInstance("DmTableSortId");
					var sort = Seam.Component.newInstance("DmTableSort");
					sortid.setTableName(table.getTableName());
					sortid.setColumnName(r1.get("columnName"));
					sort.setId(sortid);
					sort.setSortType(r1.get("sortType") == '1' ? 1 : 0);
					sort.setSortPriority(s);
					sortlist.push(sort);

				}
				column.setSorts(sortlist);
				column.setColumns(list);
				Seam.Component
						.getInstance("warehouseobject_WarehouseObjectRemote")
						.updateTable(column, function(result) {
									tableDefineDetailGrid.getStore()
											.commitChanges();

									libraryList.grid.getStore().reload();
									button.enable();
								});
			}

		}]
	});
	panel1.on('activate', function() {

			});

	var columnAttribute = Ext.data.Record.create([{
				name : 'columnName',
				type : 'string'
			}, {
				name : 'sortColumn',
				type : 'bool'
			}, {
				name : 'visible',
				type : 'bool'
			}, {
				name : 'searchable',
				type : 'bool'
			}, {
				name : 'pseudoColumn',
				type : 'bool'
			}, {
				name : 'checkstr',
				type : 'string'
			}, {
				name : 'sorttype',
				type : 'int'
			}, {
				name : 'sorttype',
				type : 'string'
			}, {
				name : 'primaryKey',
				type : 'bool'
			}]);

	var attristore = new Ext.data.GroupingStore({
		reader : new Ext.data.JsonReader({
					fields : columnAttribute
				})
			// ,
			// sortInfo : {
			// field : 'start',
			// direction : 'ASC'
			// }
		});

	attristore.on('update', function(store, rec, op) {
				if (rec.get("sortColumn") == true) {
					var sa = new sortattri({
								columnName : rec.get("columnName")
							}, rec.get("columnName"));
					sortstore.add(sa);
				} else {
					if (sortstore.getById(rec.get("columnName"))) {
						sortstore.remove(sortstore.getById(rec
								.get("columnName")));
					}
				}
				tableDefineDetailGrid.getStore().findBy(function(record, id) {
							if (record.get("columnName") == rec
									.get("columnName")) {
								record.set("visible", rec.get("visible"));
								record.set("searchable", rec.get("searchable"));
								record.set("pseudoColumn", rec
												.get("pseudoColumn"));
								record.set("checkstr", rec.get("checkstr"));

								record.set("sortColumn", rec.get("sortColumn"));
								record.set("primaryKey", rec.get("primaryKey"));
								record.set("pkGenType", rec.get("pkGenType"));

							}
						});

			})

	var editor = new Ext.ux.grid.RowEditor({
				saveText : '确定',
				commitChangesText : '请先提交更改！',
				cancelText : '取消',
				errorText : '警告'

			});

	var grid = new Ext.grid.GridPanel({
				store : attristore,
				width : 600,
				region : 'center',
				margins : '0 5 5 5',
				autoExpandColumn : 'columnName',
				plugins : [editor],
				// view : new Ext.grid.GroupingView({
				// markDirty : false
				// }),
				// tbar : [{
				// iconCls : 'icon-user-add',
				// text : 'Add Employee',
				// hidden : true,
				// handler : function() {
				// var e = new columnAttribute({
				// columnName : 'New Guy',
				// email : 'new@exttest.com',
				// start : (new Date()).clearTime(),
				// salary : 50000,
				// active : true
				// });
				// editor.stopEditing();
				// grid.getStore().insert(0, e);
				// grid.getView().refresh();
				// grid.getSelectionModel().selectRow(0);
				// editor.startEditing(0);
				// }
				// }, {
				// ref : '../removeBtn',
				// hidden : true,
				// iconCls : 'icon-user-delete',
				// text : 'Remove Employee',
				// disabled : true,
				// handler : function() {
				// editor.stopEditing();
				// var s = grid.getSelectionModel()
				// .getSelections();
				// for (var i = 0, r; r = s[i]; i++) {
				// store.remove(r);
				// }
				// }
				// }],

				cm : new Ext.grid.ColumnModel({
					defaults: {
				        sortable: false,
				        menuDisabled: true
				    },
					columns : [new Ext.grid.RowNumberer(), {
							id : 'columnName',
							header : '字段名',

							dataIndex : 'columnName',
							width : 100
						}, {
							header : '排序字段',
							dataIndex : 'sortColumn',
							width : 100,
							xtype : 'booleancolumn',
							trueText : '是',
							falseText : '否',
							editor : {
								xtype : 'checkbox'
							}
						}, {
							header : '是否可见',
							dataIndex : 'visible',
							width : 100,
							// sortable : true,
							xtype : 'booleancolumn',
							trueText : '是',
							falseText : '否',
							editor : {
								xtype : 'checkbox'
							}
						}, {
							header : '查询字段',
							dataIndex : 'searchable',
							width : 100,
							// sortable : true,
							xtype : 'booleancolumn',
							trueText : '是',
							falseText : '否',
							editor : {
								xtype : 'checkbox'
							}
						}, {
							header : '虚字段',
							dataIndex : 'pseudoColumn',
							// format : 'm/d/Y',
							width : 100,
							// sortable : true,
							// groupRenderer : Ext.util.Format.dateRenderer('M
							// y'),
							xtype : 'booleancolumn',
							trueText : '是',
							falseText : '否',
							editor : {
								xtype : 'checkbox'
							}
						}, {
							header : '检验规则',
							dataIndex : 'checkstr',
							// format : '$0,0.00',
							width : 100,
							sortable : true,
							editor : {
								xtype : 'textfield'

							}
						}]
				})
			});

	// var cstore = new Ext.data.JsonStore({
	// fields : ['month', 'employees', 'salary'],
	// data : [],
	// refreshData : function() {
	// var o = {}, data = [];
	// var s = new Date(2007, 0, 1);
	// var now = new Date(), i = -1;
	// while (s.getTime() < now.getTime()) {
	// var m = {
	// month : s.format('M y'),
	// employees : 0,
	// salary : 0,
	// index : ++i
	// }
	// data.push(m);
	// o[m.month] = m;
	// s = s.add(Date.MONTH, 1);
	// }
	// attristore.each(function(r) {
	// var m = o[r.data.start.format('M y')];
	// for (var i = m.index, mo; mo = data[i]; i++) {
	// mo.employees += 10000;
	// mo.salary += r.data.salary;
	// }
	// });
	// this.loadData(data);
	// }
	// });
	// cstore.refreshData();
	// store.on('add', cstore.refreshData, cstore);
	// store.on('remove', cstore.refreshData, cstore);
	// store.on('update', cstore.refreshData, cstore);
	grid.getSelectionModel().on('selectionchange', function(sm) {
				// grid.removeBtn.setDisabled(sm.getCount() < 1);
			});

	var panel2 = new Ext.Panel({
				title : '列属性',
				layout : 'fit',
				autoScroll : true,

				items : [grid]
			});
	panel2.on('activate', function(p) {
		attristore.removeAll();
		for (var i = 0; i < tableDefineDetailGrid.getStore().getCount(); i++) {
			var r = tableDefineDetailGrid.getStore().getAt(i);
			if (r.get('leaf') == true) {
				var attri = new columnAttribute({
					columnName : r.get('columnName'),
					visible : r.get('visible'),
					searchable : r.get('searchable'),
					pseudoColumn : r.get('pseudoColumn'),
					checkstr : r.get('checkstr'),
					sortColumn : r.get('sortColumn'),
					primaryKey : r.get('primaryKey'),
					pkGenType : (r.get('pkGenType') == '' || r.get('pkGenType') == undefined)
							? 1
							: r.get('pkGenType')
				});
				attristore.add(attri);
			}
		}
	});
	var tableDisplayName = new Ext.form.TextField({
				allowBlank : false,
				id : 'tableDisplayname',
				style : 'margin-bottom: 5px;',
				fieldLabel : '表显示名',
				readOnly : true
			});
	var tableName = new Ext.form.TextField({
				id : 'tableName',
				allowBlank : false,
				style : 'margin-bottom: 5px;',
				fieldLabel : '表英文名',
				readOnly : true

			});
	var tableDescription = new Ext.form.TextArea({
				id : 'tableComment',
				allowBlank : true,
				style : 'margin-bottom: 5px;',
				fieldLabel : '描述',
				readOnly : true

			});
	var tableForm = new Ext.form.FormPanel({
				margins : '0 5 5 5',
				bodyStyle : 'padding:5px 5px',
				defaults : {
					anchor : '61.8%',

					msgTarget : 'side',
					labelAlign : 'right'
				},
				items : [tableDisplayName, tableName, tableDescription]

			});
	var panel3 = new Ext.Panel({
				title : '表定义',
				layout : 'fit',

				items : [tableForm]
			});
	var sortattri = Ext.data.Record.create([{
				name : 'columnName',
				type : 'string',
				mapping : 'id.columnName'
			}, {
				name : 'sortType',
				type : 'string'
			}]);

	var sortstore = new Ext.data.Store({
				reader : new Ext.data.JsonReader({
							id : 'id.columnName',
							root : 'results',
							totalProperty : 'totalProperty',
							fields : sortattri
						})

			});
	var sortsm = new Ext.grid.CheckboxSelectionModel();
	var up = new Ext.Button({
				text : '上移',
				// disabled : true,
				handler : function() {
					// var sm = dataObjectList.grid.getSelectionModel();
					// var count = sm.getCount();
					// var records = sm.getSelections();
					var records = sortgrid.getSelectionModel().getSelections();

					var index = sortstore.indexOf(records[0]);
					if (index > 0) {
						sortstore.removeAt(index);
						sortstore.insert(index - 1, records[0]);
						sortgrid.getSelectionModel().selectRow(index - 1);
					}
				}
			});
	var down = new Ext.Button({
				text : '下移',
				// disabled : true,

				handler : function() {
					var records = sortgrid.getSelectionModel().getSelections();

					var index = sortstore.indexOf(records[0]);
					if (index < sortstore.getCount() - 1) {
						sortstore.removeAt(index);
						sortstore.insert(index + 1, records[0]);
						sortgrid.getSelectionModel().selectRow(index + 1);
					}
				}
			});
	var seditor = new Ext.ux.grid.RowEditor({
				saveText : '确定',
				commitChangesText : '请先提交更改！',
				cancelText : '取消',
				errorText : '警告'

			});
	var sortgrid = new Ext.grid.GridPanel({
				store : sortstore,
				region : 'center',
				margins : '0 5 5 5',
				// autoExpandColumn : 'columnName',
				plugins : [seditor],
				tbar : [' ', up, down],
				cm : new Ext.grid.ColumnModel({
					defaults: {
				        sortable: false,
				        menuDisabled: true
				    },
					columns : [sortsm, new Ext.grid.RowNumberer(), {
							header : '字段名',
							dataIndex : 'columnName',
							width : 200
						}, {
							width : 200,
							header : '排序类型',
							dataIndex : 'sortType',
							editor : new Ext.form.ComboBox({
										mode : 'local',
										typeAhead : true,
										store : new Ext.data.ArrayStore({
													fields : ['type', 'name'],
													data : [['1', '升序'],
															['0', '降序']]
												}),
										triggerAction : 'all',
										valueField : 'type',
										displayField : 'name',
										editable : false

									}),
							renderer : function(value) {
								if (value == 1) {
									return "升序";
								} else {
									return "降序";
								}
							}
						}]
				})
			});
	var primaryKeySM = new Ext.grid.CheckboxSelectionModel({});
	var peditor = new Ext.ux.grid.RowEditor({
				saveText : '确定',
				commitChangesText : '请先提交更改！',
				cancelText : '取消',
				errorText : '警告'

			});
	var primaryKeyGrid = new Ext.grid.GridPanel({
				store : attristore,
				region : 'center',
				margins : '0 5 5 5',
				// plugins : [peditor],

				cm : new Ext.grid.ColumnModel({
					defaults: {
				        sortable: false,
				        menuDisabled: true
				    },
					columns : [primaryKeySM, new Ext.grid.RowNumberer(),  {
							id : 'columnName',
							header : '字段名',

							dataIndex : 'columnName'
						}, {
							header : '键',

							dataIndex : 'primaryKey',

							xtype : 'booleancolumn',
							trueText : '是',
							falseText : '否',
							width : 100,
							sortable : true
							// ,
						// editor : {
						// xtype : 'checkbox'
						//
						// }

					}	, {

							header : '生成方式',

							dataIndex : 'pkGenType',

							trueText : '是',
							falseText : '否',
							width : 100,
							sortable : true,
							renderer : function(v) {
								if (v == 1) {
									return '添写';
								} else if (v == 2) {
									return 'UUID';
								} else if (v == 3) {
									return '序列';
								}
							}

						}]
				})
			});
	var panel4 = new Ext.Panel({
				title : '主键设定',
				layout : 'fit',
				items : [primaryKeyGrid]
			});
	var panel5 = new Ext.Panel({
				title : '字段排序',
				layout : 'fit',
				items : [sortgrid]
			});
	var tabPanel = new Ext.TabPanel({
				activeTab : 0,
				items : [panel3, panel1, panel2, panel4, panel5]
			});
	panel3.on('activate', function() {
		tableForm.getForm().load({
			url : '../JSON/warehouseobject_WarehouseObjectRemote.getTableByName?tableName='
					+ tabName,
			method : 'GET',
			success : function(form, action) {
				sortgrid.getStore().on('beforeload', function(store, options) {
					this.proxy = new Ext.data.HttpProxy({
						method : 'POST',
						url : '../JSON/warehouseobject_WarehouseObjectRemote.getTableSort'
					})

					options.params = Ext.apply(options.params, {
								tableName : tableName.getValue()
							});

				});
				sortgrid.getStore().reload();
				tableDefineDetailGrid.getStore().on('beforeload',
						function(store, options) {
							this.proxy = new Ext.data.HttpProxy({
								method : 'POST',
								url : '../JSON/warehouseobject_WarehouseObjectRemote.getTableColumns'
							})

							options.params = Ext.apply(options.params, {
										tableName : tableName.getValue()

									});

						});
				tableDefineDetailGrid.getStore().load();

			}
		});
	});
	panel3.on("deactivate", function(p) {

				tableDefineDetailGrid.stopEditing();
				attristore.removeAll();
				for (var i = 0; i < tableDefineDetailGrid.getStore().getCount(); i++) {
					var r = tableDefineDetailGrid.getStore().getAt(i);
					if (r.get('leaf') == true) {
						var attri = new columnAttribute({
									columnName : r.get('columnName'),
									visible : r.get('visible'),
									searchable : r.get('searchable'),
									pseudoColumn : r.get('pseudoColumn'),
									checkstr : r.get('checkstr'),
									sortColumn : r.get('sortColumn'),
									primaryKey : r.get('primaryKey')
								});
						attristore.add(attri);
					}
				}

			});

	var panel4 = new Ext.Panel({
				title : '主键设定',
				layout : 'fit',
				items : [primaryKeyGrid]
			});
	var panel5 = new Ext.Panel({
				title : '字段排序',
				layout : 'fit',
				items : [sortgrid]
			});
	var tabPanel = new Ext.TabPanel({
				activeTab : 0,
				items : [panel3, panel1, panel2, panel4, panel5]
			});
	return tabPanel;

}