var tableDefineDetailTreeGrid = {}
tableDefineDetailTreeGrid.init = function() {
	var self = this;
	// private String tableName;
	// private String columnName--;
	// private Long version;
	// private String parentid --;
	// private String description--;
	// private String datatype;
	// private String metaDatatype--;
	// private Long length--;
	// private Long nullable;
	// private String defaultValue;
	// private Long isarray;
	// private Long dimension;
	// private Date createtime;
	// private Long createuser;
	// private Long status;
	// private Long isnewest;
	// private Long precision--;
	// private Long scale--;
	// private Long ordernumber--;

	// private String guicontrol;

	// private Long visible--;
	// private Long searchable --;
	// private Long pseudoColumn--;
	// private String checkstr--;
	// private String columnDisplayname --;

	var record = Ext.data.Record.create([{
				name : 'columnDisplayname'
			}, {
				name : 'columnName',
				type : 'string'
			}, {
				name : 'metaDatatype',
				type : 'string'
			}, {
				name : 'length',
				type : 'int'
			}, {
				name : 'description',
				type : 'string'
			}, {
				name : 'nullable',
				type : 'bool'
			}, {
				name : 'parent',
				type : 'auto'
			}, {
				name : 'id',
				type : 'string'
			}, {
				name : 'disableCheck',
				type : 'bool'
			}, {
				name : 'dcLocation',
				type : 'string'
			}, {
				name : 'dimension',
				type : 'string'
			}, {
				name : 'dataCenterID',
				type : 'string'
			}, {
				name : 'updateCount',
				mapping : 'updateCount',
				type : 'string'
			}, {
				name : 'revision',
				mapping : 'revision',
				type : 'string'
			}, {
				name : 'isRef',
				type : 'string'
			}, {
				name : 'parentDataEntityID',
				type : 'string'
			}, {
				name : 'customTypeItemID',
				type : 'string'
			}, {
				name : 'customTypeParentID',
				type : 'string'
			}, {
				name : 'fileID',
				type : 'string'
			}, {
				name : 'destCategoryInsPath',
				type : 'string'
			}, {
				name : 'sourceCategoryInsPath',
				type : 'string'
			}, {
				name : 'dcategoryinstanceid',
				type : 'string'
			}, {
				name : 'extendsTypeRealName',
				type : 'string'
			}, {
				name : 'realIsRef',
				type : 'string'
			}, {
				name : 'fixedRevision',
				type : 'string'
			}, {
				name : 'iconCls',
				type : 'string'
			}, {
				name : 'checkStr',
				type : 'string'
			}, {
				name : 'arrLength',
				type : 'string'
			}, {
				name : 'isArray',
				type : 'bool'
			}, {
				name : 'unit',
				type : 'string'
			}, {
				name : 'description',
				type : 'string'
			}, {
				name : 'createTime',
				mapping : 'createTime'
			}, {
				name : 'modifyTime',
				mapping : 'modifyTime'
			}, {
				name : 'isArrayItemChild',
				type : 'bool'
			}, {
				name : 'unitAbbreviation',
				type : 'string'
			}, {
				name : 'defaultValue',
				type : 'string'
			}, {
				name : 'newCol',
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
				name : 'precision',
				type : 'int'
			}, {
				name : 'scale',
				type : 'int'
			}, {
				name : 'datatype',
				type : 'string'
			}, {
				name : 'parentid',
				type : 'string'
			}, {
				name : 'leaf',
				type : 'bool'
			}, {
				name : 'tableName',
				type : 'string'
			}, {
				name : 'ispraent',
				type : 'long'
			}, {
				name : 'sortColumn',
				type : 'bool'
			}, {
				name : 'primaryKey',
				type : 'bool'
			}, {
				name : 'ordernumber',
				type : 'int'
			}, {
				name : 'change',
				type : 'int'
			}, {
				name : 'datatypename',
				type : "string"
			}, {
				name : 'realtype',
				type : 'string'
			}, {
				name : 'rank',
				type : 'int'
			}, {
				name : 'pkGenType',
				type : 'int'
			}]);

	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/warehouseobject_WarehouseObjectRemote.getTableColumns'
			});

	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				autoLoad : true,
				proxy : this.proxy,
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)
			});
	// store.on("load", function(e) {
	// store.expandAll();
	// });

	var sm = new Ext.grid.CheckboxSelectionModel({});
	var lineNum = new Ext.grid.RowNumberer({})
	var isArrayColumn = new Ext.ux.grid.CheckColumn({
				header : '允许空',// 数组化
				width : 60,
				dataIndex : 'nullable',
				renderer : function(v, p, record) {
					p.css += ' x-grid3-check-col-td';
					if (record.get('disableCheck')
							|| "arrayfile" == record.get("dataEntityType")) {
						p.css += ' x-item-disabled';
					}
					return '<div class="x-grid3-check-col' + (v ? '-on' : '')
							+ ' x-grid3-cc-' + this.id + '">&#160;</div>';
				},
				onMouseDown : function(e, t) {
					if (t.className
							&& t.className.indexOf('x-grid3-cc-' + this.id) != -1) {
						var index = this.grid.getView().findRowIndex(t);
						var record = this.grid.store.getAt(index);
						if (record.get('disableCheck')
								|| "arrayfile" == record.get("dataEntityType")) {
							return;
						}
						record.set('value', "");
						if (record.data[this.dataIndex]) {
							record.set("dimension", '1');
						}
						e.stopEvent();
						record
								.set(this.dataIndex,
										!record.data[this.dataIndex]);
					}
				}
			})
	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : store,
		sm : sm,
		master_column_id : 'columnDisplayname',
		loadMask : true,
		plugins : isArrayColumn,
		// bbar : new Ext.ux.maximgb.tg.PagingToolbar({
		// store : store,
		// displayInfo : true,
		// pageSize : 25,
		// listeners : {
		// 'beforechange' : function(ptbar, opt) {
		// if (grid.getSelectionModel().getSelections().length < 1) {
		// store.on('beforeload', function(store, options) {
		// this.proxy = new Ext.data.HttpProxy({
		// method : 'POST',
		// url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
		// })
		// if (window.parent.historyViewModel == true) {
		// options.params = Ext.apply(options.params, {
		// dataCenterID : datacenterid,
		// parentDataEntityID : id,
		// fixedRevision : fixedRevision
		// });
		// } else {
		// options.params = Ext.apply(options.params, {
		// dataCenterID : datacenterid,
		// parentDataEntityID : id
		// });
		// }
		// });
		// } else {
		// var rc = sm.getSelected();
		// store.on('beforeload', function(store, options) {
		// this.proxy = new Ext.data.HttpProxy({
		// method : 'POST',
		// url : '../JSON/dataEntity_DataEntityRemote.getDataChildEntities'
		// })
		// options.params = Ext.apply(options.params, {
		// dataCenterID : rc.get('dataCenterID'),
		// dataEntityID : rc.get('dataEntityID'),
		// parentDataEntityID : rc
		// .get('parentDataEntityID'),
		// dataEntityType : rc.get('dataEntityType'),
		// customTypeParentID : rc
		// .get('customTypeParentID'),
		// customTypeItemID : rc.get('customTypeItemID'),
		// isRef : (rc.get("dimension").indexOf("*") > 0 || Number(rc
		// .get("dimension")) > 1) ? 2 : rc
		// .get('isRef'),
		// inout : rc.get("inout"),
		// dcategoryinstanceid : rc
		// .get("dcategoryinstanceid"),
		// isArrayItemChild : rc.get('isArrayItemChild')
		// });
		// })
		// }
		// }
		// }
		// }),
		cm : new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [lineNum, sm, {
				id : 'columnDisplayname',
				header : '列显示名',
				width : 150,
				dataIndex : 'columnDisplayname',
				editor : new Ext.form.TextField({
							allowBlank : false,
							maxLength : 50,
							regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
							regexText : '' + getResource('resourceParam1092') + '!',
							allowBlank : false,
							blankText : '不能为空！'
	
						})
			}, {
				header : '列英文名',
				width : 150,
				dataIndex : 'columnName',
	
				editor : new Ext.form.TextField({
							allowBlank : false,
							maxLength : 30,
							regex : /^(?!_)(?!\d)([a-zA-Z]|[_]|[\d])*$/,
							regexText : '只能为英文字符开头可包含数字下划线!',
							allowBlank : false,
							blankText : '不能为空！'
	
						})
	
			}, {
				header : '数据类型',// 单位
				width : 80,
				dataIndex : 'datatypename',
				editor : new Ext.form.ComboBox({
					fieldLabel : '' + getResource('resourceParam481') + '',
					store : new Ext.data.JsonStore({
						url : '../JSON/warehouseobject_WarehouseObjectRemote.getDataType',
						method : 'POST',
						root : 'results',
						fields : [{
									name : 'datatypeId',
									mapping : 'dataTypeId'
								}, {
									name : 'datatypeName',
									mapping : 'dataTypeName'
								}, {
									name : 'rank',
									mapping : 'rank'
								}, {
									name : 'dataType',
									mapping : 'dataType'
								}],
						baseParams : {
							classid : id
						}
					}),
					triggerAction : 'all',
					valueField : 'datatypeName',
					displayField : 'datatypeName',
					editable : false,
					lazyRender : true,
					onSelect : function(record, index) {
						if (this.fireEvent('beforeselect', this, record, index) !== false) {
							var value = record.data[this.valueField
									|| this.displayField];
							this.setValue(value);
							this.collapse();
							this.fireEvent('select', this, record, index);
						}
						grid.getSelectNodes()[0].set('datatype', record
										.get("datatypeId"));
						grid.getSelectNodes()[0].set('realtype', record
										.get("dataType"));
						grid.getSelectNodes()[0].set('rank', record.get("rank"));
	
						// grid.getSelectNodes()[0].set('isRef',
						// record.get("rank"));
						// grid.getSelectNodes()[0].set('realIsRef', record
						// .get("rank"));
						// grid.getSelectNodes()[0].set('extendsTypeRealName',
						// record
						// .get('dataType'));
						// grid.getSelectNodes()[0].set('value', "");
	
					}
				})
			}, {
				header : '长度',
				width : 150,
				dataIndex : 'length',
				editor : new Ext.form.NumberField({
							minValue : 1,
							maxValue : 4000
						}),
				renderer : function(value) {
					if ("" == value || null == value || 0 == value) {
						return '';
	
					} else {
						return value;
					}
				}
			}, {
				header : '有效位数',
				width : 150,
				dataIndex : 'precision',
				editor : new Ext.form.NumberField({
							minValue : 1,
							maxValue : 38
						}),
				renderer : function(value) {
					if ("" == value || null == value || 0 == value) {
						return '';
	
					} else {
						return value;
					}
				}
			}, {
				header : '小数位数',
				width : 150,
				dataIndex : 'scale',
				editor : new Ext.form.NumberField({
							minValue : 0,
							maxValue : 38
						}),
				renderer : function(value) {
					if ("" == value || null == value || 0 == value) {
						return '';
	
					} else {
						return value;
					}
				}
			}, {
				header : '默认值',
				width : 150,
				dataIndex : 'defaultValue',
				editor : new Ext.form.TextField({
							maxLength : 250
						})
			}, isArrayColumn, {
				header : '描述',// 描述
				width : 250,
				dataIndex : 'description',
				editor : new Ext.form.TextField({
							maxLength : 250
						})
			}]
		}),
		// stripeRows : true,
		autoScroll : true,
		autoExpandeColumn : 'columnDisplayname',
		listeners : {
			cellclick : function(grid, row, col) {
				var dataIndex = grid.getColumnModel().getColumnAt(col).dataIndex;
				var record = store.getAt(row);
				if (record.get('disableCheck') && dataIndex == 'isArray') {
					return false;
				}

				if (dataIndex == 'value') {
					if (record.get("realIsRef") == 9) {
						grid.getColumnModel().setEditor(col,
								new Ext.form.ComboBox({
									store : new Ext.data.JsonStore({
										method : 'GET',
										url : '../JSON/dataModel_dataModelRemote.getChildDataModel',
										root : 'results',
										fields : [{
													name : 'dataEntityName',
													mapping : 'dataEntityName'
												}]
									}),
									triggerAction : 'all',
									valueField : 'dataEntityName',
									displayField : 'dataEntityName',
									editable : false,
									lazyRender : true,
									onSelect : function(r, index) {
										if (this.fireEvent('beforeselect',
												this, r, index) !== false) {
											var value = r.data[this.valueField
													|| this.displayField];
											this.setValue(value);
											this.collapse();
											this.fireEvent('select', this, r,
													index);
										}
									},
									listeners : {
										beforequery : function(e) {
											e.combo
													.getStore()
													.setBaseParam(
															"dataCenterID",
															record
																	.get("dataEntityType"))
										}
									}
								}))
					} else {
						if (record.get('extendsTypeRealName') == 'date') {
							grid.getColumnModel().setEditor(col,
									new Ext.form.DateField({
												selectOnFocus : true,
												format : 'Y-m-d'
											}))
						} else if ("arrayfile" != record.get("dataEntityType")
								&& record.get('extendsTypeRealName') == 'file'
								&& !record.get("isArray")) {
							if (grid.getView().getCell(row, col).innerText == '没有'
									+ getResource('resourceParam469') + '') {
								return false;
							}
							var config = {
								title : "" + getResource('resourceParam470')
										+ "",
								width : 300,
								height : 100,
								resizable : false,
								upParams : {
									fileId : record.get('dataEntityID')
								},
								downParams : {
									fileId : record.get('fileID'),
									fileName : record.get('value')
								},
								upUrl : '../FILEUP/',
								downUrl : '../FILEDOWN/?ID='
										+ record.get('fileID')
										+ '&ORIGINALNAME='
										+ encodeURI(encodeURI(record.get('value')))
							}
							function callback(winDia, form, resp, flag) {
								if (flag) {
									winDia.window.close();
									record.set("fileID", resp.result.fileId);
									var strFileName = resp.result.fileName;
									strFileName = strFileName.substring(strFileName.lastIndexOf('\\') + 1);
									record.set("value", strFileName);
									// record.set("value", resp.result.fileName);
								} else {
									Ext.Msg
											.alert(
													""
															+ getResource('resourceParam575')
															+ "",
													""
															+ getResource('resourceParam1073')
															+ "");
								}
							}
							var valueObject = {
								name : record.get("value"),
								fileId : record.get("fileID"),
								checkStr : record.get("checkStr")
							}
							if ("cae" != record.get('dataEntityType')
									&& "cad" != record.get('dataEntityType')) {
								fileUploadDialog.initWindow(config,
										valueObject, callback, function(
												uploadForm, win) {
											if (window.parent.historyViewModel) {
												win.remove(uploadForm);
												win.buttons[0].disable();
												win.buttons[1].disable();
											}
										});
							} else {
								var config1 = {
									title : ""
											+ getResource('resourceParam470')
											+ "",
									width : 300,
									height : 100,
									resizable : false,
									upParams : {
										fileId : record.get('dataEntityID')
									},
									downParams : {
										fileId : record.get('fileID'),
										fileName : record.get('value')
									},
									upUrl : '../JSON/visualFileUpload',
									downUrl : '../dataObjectFileDownload?fileId='
											+ record.get('fileID')
											+ '&fileName='
											+ encodeURI(encodeURI(record
													.get('value')))
								}
								function callback1(winDia, form, resp, flag) {
									if (flag) {
										winDia.window.close();
										record.set("fileID", resp.fileId);
										record.set("value", resp.fileName);
									} else {
										Ext.Msg
												.alert(
														""
																+ getResource('resourceParam575')
																+ "",
														""
																+ getResource('resourceParam1073')
																+ "");
									}
								}
								CADfileUploadDialog.initWindow(config1,
										valueObject, callback1, function(
												uploadForm, win) {
											if (window.parent.historyViewModel) {
												win.remove(uploadForm);
												win.buttons[0].disable();
												win.buttons[1].disable();
											}
										});
							}
						} else if (record.get('extendsTypeRealName') == 'boolean') {
							grid.getColumnModel().setEditor(col,
									new Ext.form.ComboBox({
										store : new Ext.data.SimpleStore({
													data : [["true", "true"],
															["false", "false"]],
													fields : ['value', 'text']
												}),
										triggerAction : 'all',
										editable : false,
										mode : 'local',
										displayField : 'text',
										valueField : 'value',
										onSelect : function(record, index) {
											if (this.fireEvent('beforeselect',
													this, record, index) != false) {
												this
														.setValue(record.data[this.valueField
																|| this.displayField]);
												this.collapse();
												this.fireEvent('select', this,
														record, index);
											}
										}
									}))
						} else {
							grid.getColumnModel().setEditor(col,
									new Ext.form.TextField({
										enableKeyEvents : true,
										validator : function(value) {
											var flag = record
													.get('extendsTypeRealName');
											if ("double" == flag
													|| "float" == flag) {
												var reg = /^-?((\d+\.\d+)|(\d+))$/;
												if (reg.test(value)) {
													return true;
												} else {
													this.invalidText = ""
															+ getResource('resourceParam1083')
															+ "!";
													return false;
												}
											}
											if ("integer" == flag) {
												var reg = /^(\-?[0-9][0-9]*)*$/;
												if (reg.test(value)) {
													return true;
												} else {
													this.invalidText = ""
															+ getResource('resourceParam1083')
															+ "!";
													return false;
												}
											}
											if (record.get('checkStr') != undefined
													&& record.get('checkStr') != "") {
												var regstr = record
														.get('checkStr');
												var reg;
												if (regstr.indexOf("/^") != 0
														|| regstr
																.substr(regstr.length
																		- 1) != "/") {
													reg = new RegExp(regstr);
												} else {
													reg = eval(record
															.get('checkStr'));
												}
												if (!reg.test(value)) {
													this.invalidText = "必须符合"
															+ record
																	.get("dataEntityTypeName")
															+ "的格式";
													return false;
												}
											}
											return true;
										}
									}))
						}
					}
				} else if (dataIndex == 'sourceCategoryInsPath') {
					viewData.init(record.get('dataEntityID'), record
									.get('revision'));
				}
				if (record.get("isArray") && dataIndex == "value") {
					var arrEditForm = new Ext.form.FormPanel({
						border : false,
						items : [{
							xtype : 'textfield',
							fieldLabel : '' + getResource('resourceParam853')
									+ ':',// 维度
							name : 'arrDimension',
							value : record.get("dimension"),
							readOnly : true
						}, new Ext.form.TextField({
							fieldLabel : '' + getResource('resourceParam7021')
									+ ':',// 长度
							value : record.get("value"),
							name : 'arrLength',
							enableKeyEvents : true,
							validator : function(value) {
								var reg = /^[1-9]\d*(\*[1-9]\d*)*$/;
								if (!reg.test(value)) {
									this.invalidText = "您"
											+ getResource('resourceParam494')
											+ "的"
											+ getResource('resourceParam474')
											+ ""
											+ getResource('resourceParam511')
											+ "不符合格式!";
									return false;
								}
								var resultObject = arrEditForm.getForm()
										.getValues();
								if (resultObject.arrLength.split("*").length != resultObject.arrDimension) {
									this.invalidText = getResource('resourceParam7022')
											+ "！";// 长度和维度不符
									return false;
								}
								return true;
							}
						})]
					})
					var win = new Ext.Window({
						defaults : {
							padding : 5
						},
						modal : true,
						resizable : false,
						items : arrEditForm,
						width : 300,
						buttons : [{
							text : '' + getResource('resourceParam479') + '',// 确定
							handler : function() {
								if (arrEditForm.getForm().isValid()) {
									var resultObject = arrEditForm.getForm()
											.getValues();
									record.set("value", resultObject.arrLength);
									win.close();
								}
							}
						}, {
							text : '' + getResource('resourceParam7007') + '',// 取消
							handler : function() {
								win.close();
							}
						}]
					})
					win.show();
				}
			},
			beforeedit : function(e) {

				var dataIndex = e.grid.getColumnModel().getColumnAt(e.column).dataIndex;
				if (dataIndex == 'columnName' || dataIndex == 'datatypename') {
					if (e.record.get("newCol") != true) {
						grid.stopEditing();

						return false;
					}
				}
				if (e.record.get('disableCheck') === true) {
					if (e.field !== 'value' && e.field != "dimension"
							&& e.field != "unit" && e.field != "description") {
						return false;
					}
				}
				if (e.field == "dataEntityTypeName"
						&& e.record.get("dataEntityID") != undefined) {
					return false;
				}
				if (("file" == e.record.get("extendsTypeRealName") || "dataset" == e.record
						.get("extendsTypeRealName"))
						&& e.field == 'value') {
					return false;
				}
				if (e.record.get("isArray") && e.field == 'value') {
					return false;
				}
				if (e.field == 'dimension') {
					if (!e.record.get("isArray")) {
						return false;
					}
					if (e.record.get("dataEntityID") != undefined) {
						return false;
					}
					if (e.record.get("isArray") && e.record.get('disableCheck')) {
						return false;
					}
				}
				if ("integer" != e.record.get("extendsTypeRealName")
						&& "double" != e.record.get("extendsTypeRealName")
						&& dataIndex == "unit") {
					return false;
				}
			},
			afteredit : function(e) {
				var dataIndex = e.grid.getColumnModel().getColumnAt(e.column).dataIndex;
				if (e.record.get("realtype") == 'string') {

					e.record.set("precision", "");
					e.record.set("scale", "");
					if (e.record.get("length") == "") {
						e.record.set("length", 50)
					}
				} else if (e.record.get("realtype") == 'integer') {

					e.record.set("length", "");
					e.record.set("scale", "0");
					if (e.record.get("precision") == "") {
						e.record.set("precision", 8);
					}
				} else if (e.record.get("realtype") == 'double') {
					e.record.set("length", "");
					if (e.record.get("precision") == "") {
						e.record.set("precision", 8);
					}
					if (e.record.get("scale") == "") {
						e.record.set("scale", 2);
					}

				} else if (e.record.get("realtype") == 'date') {
					e.record.set("precision", "");
					e.record.set("scale", "");
					e.record.set("length", "");
					e.record.set("defaultValue", "");
				} else if (e.record.get("realtype") == 'boolean') {
					e.record.set("precision", "");
					e.record.set("scale", "");
					e.record.set("length", "");
				} else if (e.record.get("realtype") == 'file') {
					e.record.set("precision", "");
					e.record.set("scale", "");
					e.record.set("length", "");
				} else if (e.record.get("realtype") == 'arrayfile') {
					e.record.set("precision", "");
					e.record.set("scale", "");
					e.record.set("length", "");
				}
				var index = store.indexOf(e.record);
				if (dataIndex == "columnName") {
					for (var i = 0; i < store.getCount(); i++) {
						if (i != index) {
							var r = store.getAt(i);
							if (r.get("columnName").toLowerCase() == e.record
									.get("columnName").toLowerCase()) {
								e.record.set("columnName", "");
								Ext.example.msg(
										'' + getResource('resourceParam596')
												+ '', '列名重复！');
								break;
							}
						}
					}
				}
				// if (e.record.get('extendsTypeRealName') == 'date'
				// && e.field == 'value') {
				// var date = new Date(e.record.get('value'));
				// e.record.set('value', date.dateFormat('Y-m-d'));
				// }
				// if (dataIndex == "dimension") {
				// e.record.set('value', "");
				// }
			}

		}
	});
	function selectChildren(rc, selectFlag) {
		var childrenNodes = store.getNodeChildren(rc);
		for (var i = 0; i < childrenNodes.length; i++) {
			var rowIndex = store.indexOf(childrenNodes[i]);
			if (selectFlag) {
				sm.selectRow(rowIndex, true);
			} else {
				sm.deselectRow(rowIndex, false);
			}
			selectChildren(childrenNodes[i], selectFlag);
		}
	}

	function selectParent(rc, selectFlag) {
		var parentNode = store.getNodeParent(rc);
		if (parentNode !== undefined && !selectFlag) {
			var rowIndex = store.indexOf(parentNode);
			sm.deselectRow(rowIndex, false);
			selectParent(parentNode, selectFlag);
		}
	}
	grid.on('rowclick', function(grid, rowindex) {
		grid.stopEditing();
			// selectChildren(store.getAt(rowindex), sm.isSelected(rowindex));
			// selectParent(store.getAt(rowindex), sm.isSelected(rowindex));
		})
	store.on('beforeexpandnode', function(store, rc) {
		store.on('beforeload', function(store, options) {
			this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/warehouseobject_WarehouseObjectRemote.getChildColumns'
			})
			options.params = Ext.apply(options.params, {
						tableName : rc.get('tableName'),
						columnName : rc.get('columnName')
					});
		});
	})
	store.on('expandnode', function(store, rc) {
				// selectChildren(rc, sm.isSelected(store.indexOf(rc)));
				grid.getView().refresh();
			})
	return grid;
}
