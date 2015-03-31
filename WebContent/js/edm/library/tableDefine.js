var tableDefine = {

}
tableDefine.init = function() {
	Ext.QuickTips.init();
	var tableDefineGrid = tableDefineTreeGrid.init();

	var panel1 = new Ext.Panel({
		title : '定义列',

		tbar : [{
			text : '添加',
			iconCls : 'add1',
			menu : [new Ext.Action({
						text : '列',
						handler : function() {

							var Plant = tableDefineGrid.getStore().recordType;
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
							tableDefineGrid.stopEditing();
							p.markDirty()
							// var n1 = dataObjectTree.getEnableCheckNodes()[0];
							// dataObjectTree.getStore().addToNode(n1, p);
							tableDefineGrid.getStore().insert(
									tableDefineGrid.getStore().getCount(), p);

						}
					}), new Ext.Action({
				text : '子列',
				handler : function() {
					if (tableDefineGrid.getSelectionModel().getSelections().length != 1) {
						return;
					} else if (tableDefineGrid.getSelectionModel()
							.getSelections()[0].get('columnName') == '') {
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', '请先指定列名！');
						return;
					}
					var Plant = tableDefineGrid.getStore().recordType;
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
								parentid : tableDefineGrid.getSelectionModel()
										.getSelections()[0].get('columnName'),
								ispraent : 0,
								rank : 4

							});
					tableDefineGrid.stopEditing();
					p.markDirty()
					var n1 = tableDefineGrid.getSelectionModel()
							.getSelections();
					for (k = 0; k < n1.length; k++) {
						// alert(n1[k].get('columnName'));
						n1[k].set('leaf', false);
						n1[k].set('ispraent', 1);
						tableDefineGrid.getStore().addToNode(n1[k], p);
						tableDefineGrid.getStore().expandAll();

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
				var delNodes = tableDefineGrid.getEnableCheckNodes();
				var hasDelNodes = false;

				for (s = 0; s < delNodes.length; s++) {
					tableDefineGrid.getStore().removeRecord(delNodes[s]);
					hasDelNodes = true;
					var childNodes = tableDefineGrid.getStore()
							.getNodeChildren(delNodes[s]);
					for (var i = 0; i < childNodes.length; i++) {
						alert(childNodes[i].id);
						tableDefineGrid.getStore().remove(childNodes[i]);
					}
				}
				var dels = tableDefineGrid.getSelectionModel().getSelections();
				for (k = 0; k < dels.length; k++) {

					if (dels[k].get("newCol") == true) {
						tableDefineGrid.getStore().remove(dels[k]);
						hasDelNodes = true;
					}
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

				if (tableName.getValue() == '') {
					Ext.example.msg('' + getResource('resourceParam596') + '',
							'请指定表名！');
					return;
				}
				if (tableDisplayName.getValue() == '') {
					Ext.example.msg('' + getResource('resourceParam596') + '',
							'请指定表显示名！');
					return;
				}

				if (tableDefineGrid.getStore().getCount() == 0) {
					Ext.example.msg('' + getResource('resourceParam596') + '',
							'请添加列！');
					return;
				}
				var pk = false;
				var s = tableDefineGrid.getStore();
				for (var i = 0; i < keystore.getCount(); i++) {
					if (keystore.getAt(i).get("keytype") == 1) {
						pk = true;
						break;
					}

				}
				for (var i = 0; i < s.getCount(); i++) {
					if (s.getAt(i).get("columnName") == '') {
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', '请指定列名！');
						return;
						break;

					}
					if (s.getAt(i).get("columnDisplayname") == "") {
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', '请指定列显示名！');
						return;
						break;

					}

				}
				if (!pk) {
					Ext.example.msg('' + getResource('resourceParam596') + '',
							'请指定主键列！');
					return;
				}
				var conn = synchronize.createXhrObject();
				var url = "../JSON/warehouseobject_WarehouseObjectRemote.getTableExist?tableName="
						+ tableName.getValue();
				conn.open("GET", url, false);
				conn.send(null);
				var respText = conn.responseText;
				var obj = Ext.util.JSON.decode(respText);
				if (obj.is) {
					Ext.example.msg('' + getResource('resourceParam596') + '',
							'表名称已存在请更换！');
					return;
				}
				// return;
				// button.disable();
				tableDefineGrid.stopEditing();
				// var loadmask = new Ext.LoadMask(Ext.getBody(), {
				// msg : getResource('resourceParam4039')
				// });
				// loadmask.show();
				var addlist = new Array();
				var store = tableDefineGrid.getStore();
				store.findBy(function(record, id) {
							if (record.get("newCol") == true) {
								addlist.push(record)
							}
						}, store)
				var table = Seam.Component.newInstance("DmTable");
				table.setTableName(tableName.getValue());
				table.setTableDisplayname(tableDisplayName.getValue());
				table.setTableComment(tableDescription.getValue());
				table.setTreeTable(treetable.getValue() == true ? 1 : 0);
				table.setVersion(version.getValue() == true ? 1 : 0);
				var column = Seam.Component.newInstance("DmColumn");
				column.setTable(table);
				var columnId = Seam.Component.newInstance("DmColumnId");
				var list = new Array();

				for (var j = 0; j < addlist.length; j++) {
					var colId = Seam.Component.newInstance("DmColumnId");
					colId.setTableName(table.getTableName());
					colId.setColumnName(addlist[j].get("columnName"));

					var col = Seam.Component.newInstance("DmColumn");
					// private Long visible;
					// private Long searchable;
					// private Long pseudoColumn;
					// private String checkstr;
					// private String columnDisplayname --;
					// private Long precision;
					// private Long scale;
					// alert(addlist[j].get("checkstr"));
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
					col.setVisible(addlist[j].get("visible") == true
							? 1
							: addlist[j].get("visible") == undefined ? 1 : 0);
					col.setSearchable(addlist[j].get("searchable") == true
							? 1
							: 0);
					col.setPseudoColumn(addlist[j].get("pseudoColumn") == true
							? 1
							: 0);
					col.setParentid(addlist[j].get("parentid"));
					col.setRealtype(addlist[j].get("realtype"));
					col.setRank(addlist[j].get("rank"));
					col.setIspraent(addlist[j].get("ispraent"));
					col.setDescription(addlist[j].get("description"));
					col.setPkGenType(addlist[j].get("pkGenType"));
					col.setIsPrimaryKey(addlist[j].get("primaryKey") == true
							? 1
							: 0);
					// alert(colId.getColumnName() + col.getCheckstr());
					// alert(col.getId().getTableName());
					list.push(col);
					// alert(col.getLength());
				}
				// return;
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

				var keyList = new Array();

				for (var s = 0; s < keystore.getCount(); s++) {
					var r = keystore.getAt(s);
					var key = Seam.Component.newInstance("KeyVO");
					key.setTableName(table.getTableName());
					key.setRefTableName(r.get('reftable'));
					key.setColumns(r.get('columns'));
					key.setRefColumns(r.get('refcolumns'));
					key.setOnDelete(r.get('ondelete'));
					key.setKeyType(r.get('keytype'));
					key.setKeyName(r.get('keyName'));
					keyList.push(key);

				}
				column.setKeys(keyList);
				Seam.Component
						.getInstance("warehouseobject_WarehouseObjectRemote")
						.crateTable(column, function(result) {
							var obj = Ext.util.JSON.decode(result);
							if (obj.success) {
								Ext.example.msg(
										'' + getResource('resourceParam596')
												+ '', '添加成功！');
								tableDefineGrid.getStore().commitChanges();
								libraryList.grid.getStore().reload();
							} else {
								Ext.Msg.alert(
										'' + getResource('resourceParam596')
												+ '', "添加失败" + obj.error);
							}

							button.enable();
						});
			}

		}],
		layout : 'fit',
		items : [tableDefineGrid]
	});
	panel1.on("deactivate", function() {
		tableDefineGrid.stopEditing();

		attristore.removeAll();
		for (var i = 0; i < tableDefineGrid.getStore().getCount(); i++) {
			var r = tableDefineGrid.getStore().getAt(i);
			if (r.get('leaf') == true) {
				var attri = new columnAttribute({
					columnName : r.get('columnName'),
					visible : r.get('visible'),
					searchable : r.get('searchable'),
					pseudoColumn : r.get('pseudoColumn'),
					checkstr : r.get('checkstr'),
					sortColumn : r.get('sortColumn'),
					primaryKey : r.get('primaryKey') == true ? true : false,
					pkGenType : (r.get('pkGenType') == '' || r.get('pkGenType') == undefined)
							? 1
							: r.get('pkGenType')
				}, r.get('columnName'));
				attristore.add(attri);
			}
		}

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
			}, {
				name : 'pkGenType',
				type : 'int'
			}, {
				name : 'keytype',
				type : 'int'
			}, {
				name : 'columns',
				type : 'string'
			}, {
				name : 'refcolumns',
				type : 'string'
			}, {
				name : 'ondelete',
				type : 'int'
			}, {
				name : 'reftable',
				type : 'string'
			}, {
				name : 'keyName',
				type : 'string'
			}]);

	var attristore = new Ext.data.Store({
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
				// sortstore sortattri
				if (rec.get("sortColumn") == true) {
					var sa = new sortattri({
								columnName : rec.get("columnName")
							}, rec.get("columnName"));
					sortstore.add(sa);
				} else {
					// alert(1);
					if (sortstore.getById(rec.get("columnName"))) {
						sortstore.remove(sortstore.getById(rec
								.get("columnName")));
					}
				}

				tableDefineGrid.getStore().findBy(function(record, id) {
					if (record.get("columnName") == rec.get("columnName")) {

						record.set("visible", rec.get("visible"));
						record.set("searchable", rec.get("searchable"));
						record.set("pseudoColumn", rec.get("pseudoColumn"));
						record.set("checkstr", rec.get("checkstr"));

						record.set("sortColumn", rec.get("sortColumn"));
						record.set("primaryKey", rec.get("primaryKey"));
						record.set("pkGenType", rec.get("pkGenType"));

						if (record.get("realtype") == 'file') {

							if (record.get("primaryKey") != false) {
								Ext.example.msg(
										'' + getResource('resourceParam596')
												+ '', '列数据类型为文件不能设为主键！');
							}
							rec.set("primaryKey", false);
							record.set("primaryKey", false);
							return;
						}

						if (rec.get("primaryKey") == true
								&& rec.get("realtype") != 'file') {
							record.set("nullable", false);
							if (rec.get("pkGenType") == 2) {
								record.set("length", 40);
								record.set("rank", 4);
								record.set("realtype", 'string');
								record.set("datatype", 'string');
								record.set("datatypename", '字符串');
								record.set("precision", "");
								record.set("scale", "");
							} else if (rec.get("pkGenType") == 3) {
								record.set("length", "");
								record.set("rank", 4);
								record.set("realtype", 'integer');
								record.set("datatype", 'integer');
								record.set("datatypename", '整数');
								record.set("precision", 38);
								record.set("scale", "0");
							}
							''
						}
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
			});
	var tableDisplayName = new Ext.form.TextField({
				allowBlank : false,
				style : 'margin-bottom: 5px;',
				fieldLabel : '表显示名',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : '' + getResource('resourceParam1092') + '!',
				allowBlank : false,
				blankText : '不能为空！'

			});
	var tableName = new Ext.form.TextField({
				allowBlank : false,
				style : 'margin-bottom: 5px;',
				fieldLabel : '表英文名',
				allowBlank : false,
				maxLength : 30,
				regex : /^(?!_)(?!\d)(dt_|DT_)([a-zA-Z]|[_]|[\d])+$/,
				regexText : '表名必须以dt_开头并且只能为英文字符开头可包含数字下划线!',
				allowBlank : false,
				blankText : '不能为空！'
			});
	var version = new Ext.form.Checkbox({
				allowBlank : false,
				style : 'margin-bottom: 5px;',
				fieldLabel : '版本',
				allowBlank : false

			})
	version.on("check", function(t, c) {
				return;
				if (c == true) {
					var Plant = tableDefineGrid.getStore().recordType;
					var p = null;
					p = new Plant({
								columnDisplayname : '版本',
								columnName : 'version',
								metaDatatype : '',
								datatype : 'int',
								realtype : 'int',
								datatypename : '整数',
								length : '38',
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
							}, 'version');
					p.markDirty()
					// var n1 = dataObjectTree.getEnableCheckNodes()[0];
					// dataObjectTree.getStore().addToNode(n1, p);
					tableDefineGrid.getStore().insert(
							tableDefineGrid.getStore().getCount(), p);
				} else {
					tableDefineGrid.getStore().remove(tableDefineGrid
							.getStore().getById('version'));
				}
			});

	var treetable = new Ext.form.Checkbox({
				allowBlank : false,
				style : 'margin-bottom: 5px;',
				fieldLabel : '树表',
				allowBlank : false

			})
	var tableDescription = new Ext.form.TextArea({
				allowBlank : true,
				style : 'margin-bottom: 5px;',
				fieldLabel : '描述'
			});
	var tableForm = new Ext.form.FormPanel({
				margins : '0 5 5 5',
				bodyStyle : 'padding:5px 5px',
				defaults : {
					anchor : '61.8%',

					msgTarget : 'side',
					labelAlign : 'right'
				},
				items : [tableDisplayName, tableName, tableDescription,
						version, treetable]

			});
	var panel3 = new Ext.Panel({
				title : '表定义',
				layout : 'fit',

				items : [tableForm]
			});

	var sortattri = Ext.data.Record.create([{
				name : 'columnName',
				type : 'string'
			}, {
				name : 'sortType',
				type : 'string'
			}]);

	var sortstore = new Ext.data.Store({
				reader : new Ext.data.JsonReader({
							fields : sortattri
						})

			});
	sortstore.on('update', function(store, rec, op) {
				// sortgrid.getSelectionModel().clearSelections();

				// sortstore.sort('sorttype', 'ASC');
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
							id : 'columnName',
							header : '字段名',
							dataIndex : 'columnName',
							width : 200
						}, {
							width : 200,
							header : '排序类型',
							dataIndex : 'sorttype',
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
	var primaryKeySM = new Ext.grid.CheckboxSelectionModel();
	var peditor = new Ext.ux.grid.RowEditor({
				saveText : '确定',
				commitChangesText : '请先提交更改！',
				cancelText : '取消',
				errorText : '警告',
				listeners : {
					afteredit : function(re, o, r, n) {
						// alert(r.get('keytype'));
					}
				}

			});
	var keyAttribute = Ext.data.Record.create([{
				name : 'pkGenType',
				type : 'int'
			}, {
				name : 'keytype',
				type : 'int'
			}, {
				name : 'columns',
				type : 'string'
			}, {
				name : 'refcolumns',
				type : 'string'
			}, {
				name : 'ondelete',
				type : 'int'
			}, {
				name : 'reftable',
				type : 'string'
			}, {
				name : 'keyName',
				type : 'string'
			}]);

	var keystore = new Ext.data.Store({
				reader : new Ext.data.JsonReader({
							fields : keyAttribute
						})
			});
	var primaryKeyGrid = new Ext.grid.EditorGridPanel({
		store : keystore,
		region : 'center',
		margins : '0 5 5 5',
		sm : primaryKeySM,
		// plugins : [peditor],
		tbar : [new Ext.Button({
					text : '添加约束',
					handler : function() {

						var Plant = primaryKeyGrid.getStore().recordType;
						var p = null;
						p = new Plant({

						});
						primaryKeyGrid.stopEditing();
						p.markDirty()

						primaryKeyGrid.getStore().insert(
								primaryKeyGrid.getStore().getCount(), p);

					}
				})],
		cm : new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [new Ext.grid.RowNumberer(), primaryKeySM, {
					header : '约束名',

					dataIndex : 'keyName',
					editor : new Ext.form.TextField()
				}, {
					header : '类型',

					dataIndex : 'keytype',
					renderer : function(v) {
						if (v == 1) {
							return '主键';
						} else if (v == 2) {
							return '外键';
						}
					},
					editor : new Ext.form.ComboBox({
								mode : 'local',
								typeAhead : true,
								store : new Ext.data.ArrayStore({
											fields : ['type', 'name'],
											data : [['1', '主键'], ['2', '外键']]
										}),
								triggerAction : 'all',
								valueField : 'type',
								displayField : 'name',
								editable : false,
								onSelect : function(record, index) {
									if (this.fireEvent('beforeselect', this,
											record, index) !== false) {
										var value = record.data[this.valueField
												|| this.displayField];
										this.setValue(value);
										this.collapse();
										this.fireEvent('select', this, record,
												index);
									}
								}

							})
				}, {
					// id : 'columnName',
					header : '字段',

					dataIndex : 'columns'
				}, {
					header : 'referencing table',
					dataIndex : 'reftable',
					editor : new Ext.form.ComboBox({
						fieldLabel : '' + getResource('resourceParam481') + '',
						store : new Ext.data.JsonStore({
							url : '../JSON/warehouseobject_WarehouseObjectRemote.getTableList?start=0&limit=10000',
							method : 'POST',
							root : 'results',
							fields : [{
										name : 'tableName',
										mapping : 'tableName'
									}, {
										name : 'tableDisplayname',
										mapping : 'tableDisplayname'
									}],
							baseParams : {
								classid : id
							}
						}),
						triggerAction : 'all',
						valueField : 'tableName',
						displayField : 'tableName',
						editable : false,
						lazyRender : true,
						onSelect : function(record, index) {
							if (this.fireEvent('beforeselect', this, record,
									index) !== false) {
								var value = record.data[this.valueField
										|| this.displayField];
								this.setValue(value);
								this.collapse();
								this.fireEvent('select', this, record, index);
							}
							var conn = synchronize.createXhrObject();
							var url = '../JSON/warehouseobject_WarehouseObjectRemote.getTablePrimaryKeyCols?tableName='
									+ record.get('tableName');

							conn.open("GET", url, false);
							conn.send(null);
							var respText = conn.responseText;
							var obj = Ext.util.JSON.decode(respText);
							var temp = ''
							for (var i = 0; i < obj.results.length; i++) {
								temp += obj.results[i].id.columnName + ',';

							}
							primaryKeyGrid.getSelectionModel().getSelections()[0]
									.set('refcolumns', temp.substring(0,
													temp.length - 1));

						}
					})
				}, {
					header : 'referencing columns',
					dataIndex : 'refcolumns'
				}, {
					header : 'on delete',
					dataIndex : 'ondelete',
					renderer : function(v) {
						if (v == 1) {
							return 'No Action';
						} else if (v == 2) {
							return 'Set Null';
						} else if (v == 3) {
							return 'Cascade';
						}
					},
					editor : new Ext.form.ComboBox({
						mode : 'local',
						typeAhead : true,
						store : new Ext.data.ArrayStore({
									fields : ['type', 'name'],
									data : [['1', 'No Action'],
											['2', 'Set Null'], ['3', 'Cascade']]
								}),
						triggerAction : 'all',
						valueField : 'type',
						displayField : 'name',
						editable : false

					})
				}, {

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
					},
					editor : new Ext.form.ComboBox({
								mode : 'local',
								typeAhead : true,
								store : new Ext.data.ArrayStore({
											fields : ['type', 'name'],
											data : [['1', '添写'], ['2', 'UUID'],
													['3', '序列']]
										}),
								triggerAction : 'all',
								valueField : 'type',
								displayField : 'name',
								editable : false

							})

				}]
		})

	});
	// primaryKeyGrid.on('afteredit', function(e) {
	// // alert();
	// if (e.record.get('keytype') == 1) {
	// // e.record.set();
	// }
	// });
	primaryKeyGrid.on('cellclick', function(g, ri, ci, e) {
		var fieldName = g.getColumnModel().getDataIndex(ci);
		var record = g.getStore().getAt(ri);
		if (record.get("keytype") == 1) {
			if ('refcolumns' == fieldName || 'ondelete' == fieldName
					|| 'reftable' == fieldName) {
				record.set("refcolumns", "");
				record.set("ondelete", "");
				record.set("reftable", "");
				return;
			}
		}
		if ('columns' == fieldName) {
			var selstore = new Ext.data.Store();
			var avastore = new Ext.data.Store();
			attristore.each(function(record) {
						var rec = record.copy();
						if (record.id != 'version') {
							Ext.data.Record.id(rec);
							avastore.add(rec);
						} else {
							Ext.data.Record.id(rec);
							selstore.add(rec);
						}
					})

			var colsel = new Ext.Window({
				modal : true,
				title : 'Columns',
				width : 338,
				height : 233,
				bbar : ['->', new Ext.Button({
							text : '确定',
							handler : function() {
								var temp = "";
								selstore.each(function(rec) {
											temp += rec.get("columnName") + ","
										});

								primaryKeyGrid.getSelectionModel()
										.getSelections()[0].set('columns', temp
												.substring(0, temp.length - 1));
								colsel.close();
							}
						})],
				layout : 'fit',
				items : [{
							xtype : 'itemselector',
							name : 'itemselector',
							fieldLabel : 'ItemSelector',
							imagePath : '../images/',
							multiselects : [{
										width : 150,
										height : 170,
										store : avastore,
										displayField : 'columnName',
										valueField : 'columnName'
									}, {
										width : 150,
										height : 170,
										store : selstore,
										displayField : 'columnName',
										valueField : 'columnName'
										// ,
									// tbar : [{
									// text : 'clear',
									// handler : function() {
									// // isForm
									// // .getForm()
									// // .findField('itemselector')
									// // .reset();
									// }
									// }]
								}]
						}]

			});
			colsel.show();
		}
			// alert(fieldName);
			// alert();
			// if (e.record.get('keytype') == 1) {
			// e.record.set();
			// }
	});
	var panel4 = new Ext.Panel({
				title : '键',
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
