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
var tableGrid = {
	start : 0,
	limit : 10,
	args : {
		start : 0,
		limit : 25
	},
	pkList : null,
	baseargs : null
}
tableGrid.init = function(tableName, tableDisplayName, desc) {
	var conn = synchronize.createXhrObject();
	var url = "../JSON/warehouseobject_WarehouseObjectRemote.getTableHeadInfo?tableName="
			+ tableName;
	conn.open("GET", url, false);
	conn.send(null);
	var respText = conn.responseText;
	tableGrid.headtext = respText;
	tableGrid.initSearch(tableName)
	var grid = tableGrid
			.format(tableGrid.headtext, tableDisplayName, tableName);
	var addform = tableGrid.addForm(tableName);
	var updateform = tableGrid.updateForm(tableName);
	var infoform = tableGrid.rowInfoForm(tableName);
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
				items : [tableGrid.searchPanel, listPanel]
			});
	tableGrid.attributePanel = new Ext.Panel({
				// title : wsname,
				layout : 'card',
				border : false,
				activeItem : 0,
				items : [main, addform, updateform, infoform]
			});

	tableGrid.attributePanel.doLayout();

	return tableGrid.attributePanel;
}
tableGrid.format = function(text, name, tableName) {
	Ext.QuickTips.init();
	var sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					selectionchange : function(sm) {
						if (sm.getCount() == 1) {
							Ext.getCmp('buttonUpdate').enable();
							Ext.getCmp('buttonView').enable();
						} else {
							Ext.getCmp('buttonUpdate').disable();
							Ext.getCmp('buttonView').disable();
						}
					},
					rowselect : function(sm, rowIndex, record) {
						if (sm.getCount() == 1) {
							Ext.getCmp('buttonUpdate').enable();
							Ext.getCmp('buttonView').enable();
						} else {
							Ext.getCmp('buttonUpdate').disable();
							Ext.getCmp('buttonView').disable();
						}
					}
				}

			});
	var base = tableGrid.headtext.split("\?")[0];
	var tempbase = base.substr(1, base.length - 2);
	var headgruop = tableGrid.headtext.split("\?")[1];
	var colsindex = tableGrid.headtext.split("\?")[2];

	var header = Ext.util.JSON.decode(base);
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
	tableGrid.ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader

			});
	myGrid.loadvalue(tableGrid.ds, tableGrid.args, tableGrid.baseargs);
	tableGrid.ds.reload();
	tableGrid.grid = new Ext.grid.GridPanel({
		tbar : [{
					text : '' + getResource('resourceParam477') + '',
					iconCls : 'add1',
					id : 'buttonAdd',
					listeners : {
						'click' : function() {
							tableGrid.attributePanel.getLayout()
									.setActiveItem(1);
						}
					}

				}, {
					text : '编辑',
					iconCls : 'add1',
					id : 'buttonUpdate',
					disabled : true,
					listeners : {
						'click' : function() {
							tableGrid.attributePanel.getLayout()
									.setActiveItem(2);
						}
					}

				}, {
					text : '查看',
					iconCls : 'add1',
					id : 'buttonView',
					disabled : true,
					listeners : {
						'click' : function() {
							tableGrid.attributePanel.getLayout()
									.setActiveItem(3);
						}
					}

				}, {
					text : '' + getResource('resourceParam475') + '',
					iconCls : 'del1',
					id : 'buttonDel',
					listeners : {
						'click' : function() {

							var sm = tableGrid.grid.getSelectionModel();
							var count = sm.getCount();
							var records = sm.getSelections();
							var record;
							Ext.Ajax.request({
								url : '../JSON/warehouseobject_WarehouseObjectRemote.getPrimaryKeyColumn',
								method : 'POST',
								success : function(response, options) {

									var formjson = Ext.util.JSON
											.decode(response.responseText);
									var pkStr = "";
									var pk = new Array(formjson.data.length);
									for (var i = 0; i < formjson.data.length; i++) {
										pk[i] = formjson.data[i].id.columnName;
										pkStr += formjson.data[i].id.columnName
												+ ",";
									}
									var idSequence = '';
									for (var i = 0; i < count; i++) {
										record = records[i];
										var s = "";
										s += " ( ";
										for (var j = 0; j < pk.length; j++) {

											s += " " + pk[j] + "='"
													+ record.get(pk[j])
													+ "' and";
										}
										idSequence += s.substring(0, s.length
														- 3);
										idSequence += " ) or";
									}

									Ext.Msg
											.confirm(
													''
															+ getResource('resourceParam1724')
															+ '',
													""
															+ getResource('resourceParam475')
															+ "的"
															+ getResource('resourceParam474')
															+ "无法恢复，"
															+ getResource('resourceParam512')
															+ ""
															+ getResource('resourceParam510')
															+ "继续?", function(
															btn) {
														if (btn == 'yes') {
															Ext.Ajax.request({
																url : '../JSON/warehouseobject_WarehouseObjectRemote.delTableDataByPK',
																method : 'POST',
																success : function(
																		response,
																		options) {
																	var obj = Ext.util.JSON
																			.decode(response.responseText);
																	if (obj.success == true) {
																	} else {
																		Ext.MessageBox
																				.show(
																						{
																							title : ''
																									+ getResource('resourceParam1724')
																									+ '',
																							msg : ''
																									+ getResource('resourceParam651')
																									+ '',
																							buttons : Ext.MessageBox.OK,
																							icon : Ext.MessageBox.ERROR
																						})

																	}
																	tableGrid.ds
																			.reload();
																},
																disableCaching : true,
																autoAbort : true,
																params : {
																	tableName : tableName,
																	defaultValue : idSequence
																			.substring(
																					0,
																					idSequence.length
																							- 2)
																}

															});
														}
													});

								},
								disableCaching : true,
								autoAbort : true,
								params : {
									tableName : tableName
								}
							});

						}

					}
				}],

		autoScroll : true,

		disableSelection : true,
		store : tableGrid.ds,
		sm : sm,
		colModel : headColMod,

		plugins : [new Ext.ux.plugins.GroupHeaderGrid({
					rows : hh,
					hierarchicalColMenu : false
				})],
		bbar : new Ext.PagingToolbar({
					pageSize : 10,
					store : tableGrid.ds,
					displayInfo : true,
					displayMsg : '' + getResource('resourceParam946')
							+ '{0} - {1} ' + getResource('resourceParam949')
							+ ' {2} 行',
					emptyMsg : "" + getResource('resourceParam945') + ""
				})

	});
	tableGrid.grid.on("rowclick", function(grid, rowindex, e) {

			});
	panel = new Ext.Panel({
				border : false,
				layout : 'fit',
				autoScroll : true,
				items : [tableGrid.grid]
			});
	tableGrid.grid.getSelectionModel().on('selectionchange', function() {
				// alert('fddffd')

			})
	return panel;

}
tableGrid.updateForm = function(tableName) {

	var updateForm = new Ext.form.FormPanel({
		fileUpload : true,
		bodyStyle : 'padding:5px 5px',
		border : false,
		autoScroll : true,
		labelWidth : 300,
		defaults : {
			anchor : '70%',
			msgTarget : 'side',
			labelAlign : 'right',
			style : 'margin-bottom: 5px;'
		},
		items : [],
		buttons : [{
			text : '' + getResource('resourceParam479') + '',
			handler : function() {
				if (updateForm.getForm().isValid()) {
					updateForm.getForm().submit({
						url : '../FILEUP/fileHandleRemote.uploadFile?start=1',
						method : 'post',
						success : function(form, action) {
							var col = Seam.Component.newInstance("DmColumn");
							var arr = new Array();
							var editarr = new Array();

							var table = Seam.Component.newInstance("DmTable");
							table.setTableName(tableName);
							for (var i = 0; i < action.result.result.length; i++) {
								var colId = Seam.Component
										.newInstance("DmColumnId");
								colId
										.setColumnName(action.result.result[i].fieldName);

								var d = Seam.Component.newInstance("DmColumn")
								d.setId(colId);
								d
										.setDefaultValue(action.result.result[i].fileId);
								updateForm.items.each(function(item) {
									if (item.name == action.result.result[i].fieldName) {
										d.setDatatype(item.datatype);
										d.setIsPrimaryKey(item.pk == true
												? 1
												: 0);
										d.setPkGenType(item.pkGenType);
									}
								});
								editarr.push(d);
							}

							updateForm.items.each(function(item) {
										var colId = Seam.Component
												.newInstance("DmColumnId");
										colId.setColumnName(item.name);

										var d = Seam.Component
												.newInstance("DmColumn")
										d.setId(colId);

										if (item.datatype == 'date') {
											d.setDefaultValue(Ext.util.Format
													.date(item.getValue(),
															'Y-m-d'));

										} else {
											d.setDefaultValue(item.getValue());
										}
										d.setDatatype(item.datatype);
										d.setIsPrimaryKey(item.pk == true
												? 1
												: 0);
										d.setPkGenType(item.pkGenType);
										// alert(d.getPkGenType() + " "
										// + d.getIsPrimaryKey());
										if (item.datatype != 'file') {
											if (item.pk) {
												arr.push(d);
											} else {
												editarr.push(d);
											}
										}
									});
							col.setTable(table);
							col.setColumns(arr);
							col.setEditcolumns(editarr);

							Seam.Component
									.getInstance("warehouseobject_WarehouseObjectRemote")
									.updateTableData(col, function(result) {
										if (result.success = true) {
											Ext.example
													.msg(
															''
																	+ getResource('resourceParam596')
																	+ '',
															'保存成功');
											updateForm.getForm().reset();
											tableGrid.attributePanel
													.getLayout()
													.setActiveItem(0);
											tableGrid.ds.reload();
										}
									});

						}
					});
					// --------------------------------
					// var arr = new Array();
					// var editarr = new Array();
					// var col = Seam.Component.newInstance("DmColumn");
					// var table =
					// Seam.Component.newInstance("DmTable");
					// table.setTableName(tableName);
					// col.setTable(table);
					// updateForm.items.each(function(item) {
					//
					// var colId = Seam.Component
					// .newInstance("DmColumnId");
					// colId.setColumnName(item.id);
					// var d = Seam.Component.newInstance("DmColumn")
					// d.setId(colId);
					// if (item.datatype == 'date') {
					// d.setDefaultValue(Ext.util.Format.date(item
					// .getValue(), 'Y-m-d'));
					//
					// } else {
					// d.setDefaultValue(item.getValue());
					// }
					// d.setDatatype(item.datatype);
					// if (item.pk) {
					// arr.push(d);
					// } else {
					// editarr.push(d);
					// }
					// });
					// col.setColumns(arr);
					// col.setEditcolumns(editarr);
					//
					// Seam.Component
					// .getInstance("warehouseobject_WarehouseObjectRemote")
					// .updateTableData(col, function(result) {
					// if (result.success = true) {
					// Ext.example
					// .msg(
					// ''
					// + getResource('resourceParam596')
					// + '', '保存成功');
					// updateForm.getForm().reset();
					// tableGrid.attributePanel.getLayout()
					// .setActiveItem(0);
					// tableGrid.ds.reload();
					// }
					// });
				}
			}

		}, {
			text : '' + getResource('resourceParam606') + '',
			handler : function() {
				updateForm.getForm().reset();
			}

		}]

	});
	updateForm.on("activate", function() {
		var sm = tableGrid.grid.getSelectionModel();
		var records = sm.getSelections();
		updateForm.removeAll();
		updateForm.doLayout();
		Ext.Ajax.request({
			url : '../JSON/warehouseobject_WarehouseObjectRemote.getRecursiveCloumnsLeaf',
			method : 'POST',
			success : function(response, options) {

				var formjson = Ext.util.JSON.decode(response.responseText);
				for (var i = 0; i < formjson.data.length; i++) {

					var type = formjson.data[i]['datatype'];
					var id = formjson.data[i]['columnName'];
					var name = formjson.data[i]['columnDisplayname'];
					var value = formjson.data[i]['defaultValue'];
					var pk = formjson.data[i]['primaryKey'];
					var rank = formjson.data[i]['rank'];
					var realtype = formjson.data[i]['realtype'];
					var isref = 0;

					var fomat = "";
					var precision = 0;

					if (type == "double") {
						precision = 10;
					} else if (type == "date") {
						fomat = "Y-m-d";
					}
					if (rank == 9) {
						var obj1 = libraryUtils
								.getChildDataModelPhysicType(type);
						var f1 = libraryUtils.enumTypeField(id, id, name,
								records[0].get(id), fomat, 0, type, false, '',
								50, obj1.results);
						Ext.apply(f1, {
									pk : pk,
									datatype : realtype
								});
						updateForm.add(f1);
					} else {
						var field = libraryUtils.getFormControl(id, id, name,
								records[0].get(id), fomat, precision, realtype);
						Ext.apply(field, {
									pk : pk,
									datatype : realtype
								});
						if (pk == true) {
							tableGrid.pkList = new Array();
							tableGrid.pkList.push(id);
							field.disable();
						}
						updateForm.add(field);
					}
					updateForm.doLayout();
					// /addForm.getForm().reset();
				}
			},
			disableCaching : true,
			autoAbort : true,
			params : {
				tableName : tableName
			}
		});
	});

	return updateForm;

}
tableGrid.addForm = function(tableName) {
	var addForm = new Ext.form.FormPanel({
		fileUpload : true,
		bodyStyle : 'padding:5px 5px',
		border : false,
		autoScroll : true,
		labelWidth : 300,
		defaults : {
			anchor : '70%',
			msgTarget : 'side',
			labelAlign : 'right',
			style : 'margin-bottom: 5px;'
		},
		items : [],
		buttons : [{
			text : '' + getResource('resourceParam479') + '',
			handler : function() {
				if (addForm.getForm().isValid()) {
					addForm.getForm().submit({
						url : '../FILEUP/fileHandleRemote.uploadFile',
						method : 'post',
						success : function(form, action) {

							var col = Seam.Component.newInstance("DmColumn");
							var arr = new Array();
							var table = Seam.Component.newInstance("DmTable");
							table.setTableName(tableName);
							for (var i = 0; i < action.result.result.length; i++) {
								var colId = Seam.Component
										.newInstance("DmColumnId");
								colId
										.setColumnName(action.result.result[i].fieldName);

								var d = Seam.Component.newInstance("DmColumn")
								d.setId(colId);
								d
										.setDefaultValue(action.result.result[i].fileId);
								addForm.items.each(function(item) {
									if (item.id == action.result.result[i].fieldName) {
										d.setDatatype(item.datatype);
										d.setIsPrimaryKey(item.pk == true
												? 1
												: 0);
										d.setPkGenType(item.pkGenType);
									}
								});
								arr.push(d);
							}

							addForm.items.each(function(item) {
										var colId = Seam.Component
												.newInstance("DmColumnId");
										colId.setColumnName(item.name);

										var d = Seam.Component
												.newInstance("DmColumn")
										d.setId(colId);

										if (item.datatype == 'date') {
											d.setDefaultValue(Ext.util.Format
													.date(item.getValue(),
															'Y-m-d'));

										} else {
											d.setDefaultValue(item.getValue());
										}
										d.setDatatype(item.datatype);
										d.setIsPrimaryKey(item.pk == true
												? 1
												: 0);
										d.setPkGenType(item.pkGenType);
										// alert(d.getPkGenType() + " "
										// + d.getIsPrimaryKey());
										if (item.datatype != 'file') {
											arr.push(d);
										}
									});
							col.setTable(table);
							col.setColumns(arr);
							Seam.Component
									.getInstance("warehouseobject_WarehouseObjectRemote")
									.addTableData(col, function(result) {
										if (result.success = true) {
											Ext.example
													.msg(
															''
																	+ getResource('resourceParam596')
																	+ '',
															'保存成功');
											addForm.getForm().reset();
											addForm.removeAll();
											tableGrid.attributePanel
													.getLayout()
													.setActiveItem(0);
											tableGrid.ds.reload();
										}
									});

						}
					});

				}
			}

		}, {
			text : '' + getResource('resourceParam606') + '',
			handler : function() {
				addForm.getForm().reset();
			}

		}]

	});
	addForm.on("activate", function() {
		addForm.removeAll();
		Ext.Ajax.request({
			url : '../JSON/warehouseobject_WarehouseObjectRemote.getRecursiveCloumnsLeaf',
			method : 'POST',
			success : function(response, options) {

				var formjson = Ext.util.JSON.decode(response.responseText);
				for (var i = 0; i < formjson.data.length; i++) {

					var type = formjson.data[i]['datatype'];
					var id = formjson.data[i]['columnName'];
					var name = formjson.data[i]['columnDisplayname'];
					var value = formjson.data[i]['defaultValue'];
					var rank = formjson.data[i]['rank'];
					var realtype = formjson.data[i]['realtype'];
					var pkGenType = formjson.data[i]['pkGenType'];
					var pk = formjson.data[i]['primaryKey'];
					var nullable = formjson.data[i]['nullable'];
					var isref = 0;
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
						var obj1 = libraryUtils
								.getChildDataModelPhysicType(type);
						var f1 = libraryUtils.enumTypeField(id, id, name, '',
								fomat, 0, type, true, '', 50, obj1.results);
						Ext.apply(f1, {
									datatype : realtype,
									pk : pk,
									pkGenType : pkGenType
								});
						if (pk == true && pkGenType != 1) {
							f2.inputType = "hidden";
						}
						addForm.add(f1);

					} else {
						// libraryUtils.getFormControl = function(id, name,
						// labelname, value, format,
						// precision, type, allowblank, checkstr, length) {
						var f2 = libraryUtils.getFormControl(id, id, name,
								value, fomat, precision, realtype);
						Ext.apply(f2, {
									datatype : realtype,
									pk : pk,
									pkGenType : pkGenType
								});
						if (pk == true && pkGenType != 1) {
							f2.hide();
							f2.inputType = "hidden";
						}
						addForm.add(f2);
						addForm.getForm().reset();
					}

					addForm.doLayout();
				}
			},
			disableCaching : true,
			autoAbort : true,
			params : {
				tableName : tableName
			}
		});
	});

	return addForm;

}

tableGrid.initSearch = function(tableName) {
	var rightColForm = libraryUtils.getFieldSet(false);
	var leftColForm = libraryUtils.getFieldSet(false);
	Ext.Ajax.request({
		url : '../JSON/warehouseobject_WarehouseObjectRemote.getRecursiveCloumnsLeaf',
		method : 'POST',
		success : function(response, options) {

			var formjson = Ext.util.JSON.decode(response.responseText);
			for (var i = 0; i < formjson.data.length; i++) {

				var type = formjson.data[i]['datatype'];
				var id = formjson.data[i]['columnName'];
				var name = formjson.data[i]['columnDisplayname'];
				var value = formjson.data[i]['defaultValue'];
				var searchable = formjson.data[i]['searchable'];
				var rank = formjson.data[i]['rank'];
				var realtype = formjson.data[i]['realtype'];
				var fomat = "";
				var precision = 0;

				if (type == "double") {
					precision = 10;
				} else if (type == "date") {
					fomat = "Y-m-d";
				}
				if (searchable == 1) {
					if (i % 2 == 0) {
						if (rank == 9) {
							var obj1 = libraryUtils
									.getChildDataModelPhysicType(type);
							var f1 = libraryUtils.enumTypeField(id + "$", id,
									name, '', fomat, 0, type, true, '', 50,
									obj1.results);
							Ext.apply(f1, {
										datatype : realtype
									});
							leftColForm.add(f1);

						} else {
							var f2 = whExtend.FormControls(id + "$", name,
									value, fomat, precision, realtype)
							Ext.apply(f2, {
										datatype : realtype
									});
							leftColForm.add(f2);
						}
					} else {
						if (rank == 9) {
							var obj1 = libraryUtils
									.getChildDataModelPhysicType(type);
							var f1 = libraryUtils.enumTypeField(id + "$", id,
									name, '', fomat, 0, type, true, '', 50,
									obj1.results);
							Ext.apply(f1, {
										datatype : realtype
									});
							rightColForm.add(f1);

						} else {
							var f2 = whExtend.FormControls(id + "$", name,
									value, fomat, precision, realtype)
							Ext.apply(f2, {
										datatype : realtype
									});
							rightColForm.add(f2);
						}
					}
				}
				// if (searchable == 1) {
				// if (i % 2 == 0) {
				// leftColForm.add(libraryUtils.getFormControl('', id,
				// name, '', format, 0, type, true, '', 50));
				// leftColForm.doLayout();
				// } else {
				// rightColForm.add(libraryUtils.getFormControl('', id,
				// name, '', format, 0, type, true, '', 50));
				// rightColForm.doLayout();
				//
				// }
				// }
			}
			leftColForm.doLayout();
			rightColForm.doLayout();
			tableGrid.searchPanel.doLayout();
			tableGrid.attributePanel.doLayout();
		},
		disableCaching : true,
		autoAbort : true,
		params : {
			tableName : tableName
		}
	});
	tableGrid.searchPanel = new Ext.form.FormPanel({
		bodyStyle : 'padding:5px 5px',
		border : false,
		title : '查询条件为空',
		region : 'north',
		layout : 'column',
		split : true,
		collapsible : true,
		collapsed : true,
		autoHeight : true,
		autoScroll : true,
		defaults : {
			anchor : '90%',
			msgTarget : 'side',
			labelAlign : 'right',
			style : 'margin-bottom: 5px;'
		},
		items : [leftColForm, rightColForm],
		fbar : [{
					text : '每页显示条数：',
					xtype : 'label'
				}, {
					id : 'pagesizeField',
					xtype : 'numberfield',
					regex : /\d*/,
					regexText : '只能输入整数',
					value : '10',
					width : 50
				}, {
					text : getResource('resourceParam4014'),
					handler : function() {
						if (tableGrid.searchPanel.getForm().isValid()) {
							var formValues = tableGrid.searchPanel.getForm()
									.getValues();
							var str_title = '';
							var length = 0;
							for (var i in formValues) {
								if (formValues[i] != '') {
									length = length + 1;
									str_title = str_title + i + ' : '
											+ formValues[i] + ' + ';
								}
							}
							if (length == 0) {
								tableGrid.searchPanel.setTitle('查询条件为空');
							} else {
								str_title = str_title.substring(0,
										str_title.length - 3);
								tableGrid.searchPanel.setTitle('查询条件：'
										+ str_title);
							}
							var pagesizeValue = Ext.getCmp('pagesizeField')
									.getValue();
							tableGrid.pageSize = new Number(pagesizeValue == ''
									? '10'
									: pagesizeValue);
							tableGrid.args.limit = tableGrid.pageSize;
							tableGrid.grid.getBottomToolbar().pageSize = tableGrid.pageSize;
							myGrid.loadvalue(tableGrid.ds, tableGrid.args,
									formValues);

						}
					}
				}, {
					text : '重置',
					handler : function() {
						tableGrid.searchPanel.getForm().reset();
					}
				}]
	});
}

tableGrid.rowInfoForm = function(tableName) {

	var infoForm = new Ext.form.FormPanel({
				// fileUpload : true,
				bodyStyle : 'padding:5px 5px',
				border : false,
				autoScroll : true,
				labelWidth : 300,
				defaults : {
					anchor : '70%',
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : true
				},
				items : [],
				buttons : [{
							text : '返回',
							handler : function() {
								infoForm.removeAll();
								tableGrid.attributePanel.getLayout()
										.setActiveItem(0);
								tableGrid.ds.reload();
							}

						}]

			});
	infoForm.on("activate", function() {
		var sm = tableGrid.grid.getSelectionModel();
		var records = sm.getSelections();
		infoForm.removeAll();
		infoForm.doLayout();

		Ext.Ajax.request({
			url : '../JSON/warehouseobject_WarehouseObjectRemote.getRecursiveCloumnsLeaf',
			method : 'POST',
			success : function(response, options) {
				var arr = new Array();
				var editarr = new Array();
				var col = Seam.Component.newInstance("DmColumn");
				var table = Seam.Component.newInstance("DmTable");
				table.setTableName(tableName);
				col.setTable(table);
				var formjson = Ext.util.JSON.decode(response.responseText);
				for (var i = 0; i < formjson.data.length; i++) {

					var type = formjson.data[i]['datatype'];
					var id = formjson.data[i]['columnName'];
					var name = formjson.data[i]['columnDisplayname'];
					var value = formjson.data[i]['defaultValue'];
					var pk = formjson.data[i]['primaryKey'];
					var rank = formjson.data[i]['rank'];
					var realtype = formjson.data[i]['realtype'];

					var colId = Seam.Component.newInstance("DmColumnId");
					colId.setColumnName(id);
					var d = Seam.Component.newInstance("DmColumn")
					d.setId(colId);
					if (type == 'date') {
						d.setDefaultValue(Ext.util.Format.date(records[0]
										.get(id), 'Y-m-d'));

					} else {
						d.setDefaultValue(records[0].get(id));
					}
					d.setDatatype(realtype);
					if (pk) {
						arr.push(d);
					} else {
						// editarr.push(d);
					}

				}
				col.setColumns(arr);
				col.setEditcolumns(editarr);
				Seam.Component
						.getInstance("warehouseobject_WarehouseObjectRemote")
						.getRowInfo(col, function(result) {
							if (result.success = true) {
								var formjson = Ext.util.JSON.decode(result);
								for (var i = 0; i < formjson.results.length; i++) {
									var name = formjson.results[i].columnDisplayname;
									var value = formjson.results[i].value;
									var type = formjson.results[i].realtype;
									var fileName = formjson.results[i].fileName;
									var isref = 0;

									var fomat = "";
									var precision = 0;

									if (type == "double") {
										precision = 10;
									} else if (type == "date") {
										fomat = "Y-m-d";
									}

									if (type != 'file') {
										var field = whExtend.FormControls('',
												name, value, fomat, precision,
												'string');
										infoForm.add(field);
									} else {
										infoForm.add(new Ext.form.DisplayField(
												{
													fieldLabel : name,
													value : '<a   style="color:#0000FF;text-decoration:underline;" href="../FILEDOWN/?ID='
															+ value
															+ '&ORIGINALNAME='
															+ encodeURI(encodeURI(fileName))
															+ '">'
															+ fileName
															+ '</a>'
												}));
									}

								}
								infoForm.doLayout();
							}

						});
			},
			disableCaching : true,
			autoAbort : true,
			params : {
				tableName : tableName
			}
		});
	});

	return infoForm;

}