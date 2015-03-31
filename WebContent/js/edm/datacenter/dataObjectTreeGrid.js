var dataObjectTreeGrid = {}
dataObjectTreeGrid.init = function(id, i, datacenterid, fixedRevision) {
	var self = this;
	var record = Ext.data.Record.create([{
				name : 'text'
			}, {
				name : 'value',
				type : 'string'
			}, {
				name : 'inout',
				type : 'string'
			}, {
				name : 'leaf',
				type : 'bool'
			}, {
				name : 'dataEntityID',
				type : 'string'
			}, {
				name : 'dataEntityTypeName',
				type : 'string'
			}, {
				name : 'dataEntityType',
				type : 'string'
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
			},{
				name : 'isArrayItemChild',
				type : 'bool'
			},{
				name : 'unitAbbreviation',
				type : 'string'
			},{
				name : 'unitLocaleName',
				type : 'string'
			}]);
	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
			});

	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				// autoLoad : true,
				proxy : this.proxy,
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)
			});
	var sm = new Ext.grid.CheckboxSelectionModel({});
	var lineNum = new Ext.grid.RowNumberer({})
	var isArrayColumn = new Ext.ux.grid.CheckColumn({
				header : '' + getResource('resourceParam7019') + '',// 数组化
				width : 60,
				dataIndex : 'isArray',
				renderer : function(v, p, record) {
					p.css += ' x-grid3-check-col-td';
					if (record.get('disableCheck')||"arrayfile"==record.get("dataEntityType")) {
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
						if (record.get('disableCheck')||"arrayfile"==record.get("dataEntityType")) {
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
		master_column_id : 'text',
		loadMask : true,
		plugins : isArrayColumn,
		bbar : new Ext.ux.maximgb.tg.PagingToolbar({
			store : store,
			displayInfo : true,
			pageSize : 25,
			listeners : {
				'beforechange' : function(ptbar, opt) {
					if (grid.getSelectionModel().getSelections().length < 1) {
						store.on('beforeload', function(store, options) {
							this.proxy = new Ext.data.HttpProxy({
								method : 'POST',
								url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
							})
							if (window.parent.historyViewModel == true) {
								options.params = Ext.apply(options.params, {
											dataCenterID : datacenterid,
											parentDataEntityID : id,
											fixedRevision : fixedRevision
										});
							} else {
								options.params = Ext.apply(options.params, {
											dataCenterID : datacenterid,
											parentDataEntityID : id
										});
							}
						});
					} else {
						var rc = sm.getSelected();
						store.on('beforeload', function(store, options) {
							this.proxy = new Ext.data.HttpProxy({
								method : 'POST',
								url : '../JSON/dataEntity_DataEntityRemote.getDataChildEntities'
							})
							options.params = Ext.apply(options.params, {
								dataCenterID : rc.get('dataCenterID'),
								dataEntityID : rc.get('dataEntityID'),
								parentDataEntityID : rc
										.get('parentDataEntityID'),
								dataEntityType : rc.get('dataEntityType'),
								customTypeParentID : rc
										.get('customTypeParentID'),
								customTypeItemID : rc.get('customTypeItemID'),
								isRef : (rc.get("dimension").indexOf("*") > 0 || Number(rc
										.get("dimension")) > 1) ? 2 : rc
										.get('isRef'),
								inout : rc.get("inout"),
								dcategoryinstanceid : rc.get("dcategoryinstanceid"),
								isArrayItemChild : rc.get('isArrayItemChild')
							});
						})
					}
				}
			}
		}),
		cm : new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [lineNum, sm, {
					id : 'text',
					header : '' + getResource('resourceParam480') + '',
					width : 300,
					dataIndex : 'text',
					renderer : function(value, p, record) {
						return "<div ext:qtip='" + value + "'>" + value + "</div>";
					},
					editor : new Ext.form.TextField({
								allowBlank : false,
								maxLength : 50
							})
				}, {
					header : '' + getResource('resourceParam511') + '',
					width : 200,
					dataIndex : 'value',
					renderer : function(value, p, record) {
						if (value == undefined) {
							return "";
						}
						if("arrayfile"==record.get("dataEntityType")){
							return '<a style="color:#0000FF;text-decoration:underline;" href="../dataObjectFileDownload?fileId=' + record.get("fileID") + '&fileName=' + encodeURI(encodeURI(record.get('value')))+'" ext:qtip="'+value+'" >' + value + '</a>';
						}
						if ("file" == record.get("extendsTypeRealName")
								&&"arrayfile"!=record.get("dataEntityType")&& !record.get("isArray")) {
							if (value == "") {
								if (window.parent.historyViewModel) {
									return "没有"
											+ getResource('resourceParam469')
											+ "";
								}
								return "<a href='javascript:void(0)' ext:qtip=\""+value+"\" style='color:#0000FF;text-decoration:underline;'>"
										+ getResource('resourceParam1085')
										+ "</a>";
							} else {
								return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;'>"
										+ value + "</a>";
							}
						} else if (record.get("isArray")) {
							return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;'>"
									+ value + "</a>";
						} else {
							return "<div title=" + value + ">" + value
									+ "</div>";
						}
					}

				}, {
					header : '' + getResource('resourceParam1201') + '',// 单位
					width : 80,
					dataIndex : 'unit',
					editor : new Ext.form.ComboBox({
						store : new Ext.data.JsonStore({
							url : '../JSON/dimensionUnit_DimensionUnitRemote.getUsualUnitList',
							method : 'POST',
							fields : [{
										name : 'name',
										mapping : 'name'
									}, {
										name : 'abbreviation',
										mapping : 'abbreviation'
									}]
						}),
						triggerAction : 'all',
						valueField : 'name', // 'abbreviation',
						displayField : 'name',
						editable : false,
						lazyRender : true,
						onSelect : function(record, index) {
							var editRecord = grid.getSelectNodes()[0];
							if (this.fireEvent('beforeselect', this, record,
									index) !== false) {
								var that = this;
								if(record.get("name")=="more..."){
									grid.stopEditing();
									new UnitSelect().init(function(o){
						            	editRecord.set('unit',o.englishname);
						            	editRecord.set('unitAbbreviation',o.abbreviation);
						            })
									return;
								}
								//TODO 同量纲单位值转换
//								if(editRecord.get('value')!=""&&editRecord.get("value")!=undefined&&record.get("abbreviation")!="more..."){
//									Ext.Msg.confirm('提示','是否要将值映射为新的单位?',function(buttonId){
//										alert(buttonId)
//									})
//								}
								var value = record.data[this.valueField
										|| this.displayField];
								this.setValue(value);
								this.collapse();
								this.fireEvent('select', this, record, index);
							}
							editRecord.set('unit',record.get("englishname"));
						},
						listeners : {
							'beforequery' : function(qu) {
								qu.combo.getStore().load({
											callback : function() {
												var record = new Ext.data.Record(
														{
															name : 'more...'
														})
												qu.combo.getStore().add(record)
											}
										});
								return false;
							}
						}
					})
				}, {
					header : '' + getResource('resourceParam481') + '',
					width : 150,
					dataIndex : 'dataEntityTypeName',
					editor : new Ext.form.ComboBox({
						fieldLabel : '' + getResource('resourceParam481') + '',
						store : new Ext.data.JsonStore({
							url : '../JSON/datacenter_DataCenterRemote.getDateClassLimitType',
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
							if (this.fireEvent('beforeselect', this, record,
									index) !== false) {
								var value = record.data[this.valueField
										|| this.displayField];
								this.setValue(value);
								this.collapse();
								this.fireEvent('select', this, record, index);
							}
							grid.getSelectNodes()[0].set('dataEntityType',
									record.get("datatypeId"));
							grid.getSelectNodes()[0].set('isRef', record
											.get("rank"));
							grid.getSelectNodes()[0].set('realIsRef', record
											.get("rank"));
							grid.getSelectNodes()[0].set('extendsTypeRealName',
									record.get('dataType'));
							grid.getSelectNodes()[0].set('value', "");

						}
					})
				}, {
					header : '' + getResource('resourceParam648') + '',// 描述
					width : 250,
					dataIndex : 'description',
					editor : new Ext.form.TextField({
								maxLength : 50
							})
				}, isArrayColumn, {
					header : '' + getResource('resourceParam853') + '',
					width : 50,
					dataIndex : 'dimension',
					editor : new Ext.form.TextField({
						allowBlank : false,
						enableKeyEvents : true,
						validator : function(value) {
							if (Ext.util.Format.trim(value).length == 0) {
								this.invalidText = ""
										+ getResource('resourceParam1084') + "";
								return false;
							}
							var reg = /^[1-9]?$/;
							if (reg.test(value)) {
								if (value > 9) {
									this.invalidText = "您"
											+ getResource('resourceParam494')
											+ "的"
											+ getResource('resourceParam474')
											+ ""
											+ getResource('resourceParam511')
											+ "超过9!";
									return false;
								} else
									return true;
							} else {
								this.invalidText = getResource('resourceParam7020') + "！";// 维度必须为1-9的整数
								return false;
							}
						}
					}),
					renderer : function(value, p, record) {
						if (!record.get('isArray')) {
							return "";
						} else {
							if (value == undefined) {
								return 1;
							} else {
								return value;
							}
						}
					}
				}, {
					header : '' + getResource('resourceParam462') + '',
					width : 50,
					dataIndex : 'updateCount',

					renderer : function(v, p, r) {
						if (v == undefined) {
							return "";
						}
						var revision = r.get("revision");
						var dataEntityID = r.get("dataEntityID");
						if (!r.get("disableCheck")) {
							return '<a href="javascript:void(0);" ext:qtip="'+getResource("resourceParam3022")+'"  style="color:#0000FF;text-decoration:underline;" onclick="dataObjectTreeGrid.viewHistory(\''
									+ revision
									+ '\', \''
									+ dataEntityID
									+ '\')">' + v + '</a>';
						} else {
							return "";
						}
					}
				}, {
					header : '' + getResource('resourceParam462') + ''
							+ getResource('resourceParam981') + '', // text :
					// 版本创建时间
					width : 100,
					dataIndex : 'modifyTime',
					renderer : function(value, p, record) {
						if (value == undefined||record.get("disableCheck")) {
							return "";
						}
						var dataTime = new Date(value.time.time);
						return dataTime.format('Y-m-d H:i');
					}
				}, {
					header : '' + getResource('resourceParam981') + '', // text
					// :
					// 创建时间
					width : 100,
					dataIndex : 'createTime',
					renderer : function(value, p, record) {
						if (value == undefined) {
							return "";
						}
						var dataTime = new Date(value.time.time);
						return dataTime.format('Y-m-d H:i');
					}
				}, {
					header : '' + getResource('resourceParam474') + '来源位置',
					width : 300,
					dataIndex : 'sourceCategoryInsPath',

					renderer : function(v) {
						if (v == undefined || v == "") {
							return "";
						}
						var path = v;
						var imgCls = '<img src="../base/icons/edm/datacenterIn.png" width=14 height=14 style="vertical-align:middle;"/>';
						var title = path + "&#13;";
						var value = "<a href='javascript:void(0)' ext:qtip='"
								+ title
								+ "' style='cursor:default;color:#fffFF;text-decoration:none;vertical-align:middle;'>"
								+ imgCls + path + "</a>";
						return "<div ext:qtip='" + title + "'>" + value
								+ "</div>";
					}
				}]
		}),
		stripeRows : true,
		autoScroll : true,
		autoExpandeColumn : 'text',
		listeners : {
			celldblclick : function(grid, row, col) {
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
						} else if ("arrayfile"!=record.get("dataEntityType")&&record.get('extendsTypeRealName') == 'file'
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
									+ '',// 维度
							name : 'arrDimension',
							value : record.get("dimension"),
							readOnly : true
						}, new Ext.form.TextField({
							fieldLabel : '' + getResource('resourceParam7021')
									+ '',// 长度
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
						title : '请输入数组长度',
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
				if (e.record.get('disableCheck') === true) {
					if (e.field !== 'value'&&e.field != "dimension"&&e.field!="unit"&&e.field!="description") {
						return false;
					}
				}
				if(e.field == "dataEntityTypeName"&&e.record.get("dataEntityID") != undefined){
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
					if(e.record.get("dataEntityID") != undefined){
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
				if (e.record.get('extendsTypeRealName') == 'date'
						&& e.field == 'value') {
					var date = new Date(e.record.get('value'));
					e.record.set('value', date.dateFormat('Y-m-d'));
				}
				if (dataIndex == "dimension") {
					e.record.set('value', "");
				}
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
				selectChildren(store.getAt(rowindex), sm.isSelected(rowindex));
				selectParent(store.getAt(rowindex), sm.isSelected(rowindex));
			})
	store.on('beforeexpandnode', function(store, rc) {
		store.on('beforeload', function(store, options) {
			this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/dataEntity_DataEntityRemote.getDataChildEntities'
			})
			options.params = Ext.apply(options.params, {
						dataCenterID : rc.get('dataCenterID'),
						dataEntityID : rc.get('dataEntityID'),
						parentDataEntityID : rc.get('parentDataEntityID'),
						dataEntityType : rc.get('dataEntityType'),
						customTypeParentID : rc.get('customTypeParentID'),
						customTypeItemID : rc.get('customTypeItemID'),
						isRef : (rc.get("dimension").indexOf("*") > 0 || Number(rc
								.get("dimension")) > 1) ? 2 : rc.get('isRef'),
						inout : rc.get("inout"),
						dcategoryinstanceid : rc.get("dcategoryinstanceid"),
						isArrayItemChild : rc.get('isArrayItemChild')
					});
		});
	})
	store.on('expandnode', function(store, rc) {
				selectChildren(rc, sm.isSelected(store.indexOf(rc)));
				grid.getView().refresh();
			})
	return grid;
}

dataObjectTreeGrid.viewHistory = function(revision, dataEntityID) {
	var win = new Ext.Window({
		autoScroll : true,
		tbar : [{
			hidden : true,
			text : '' + getResource('resourceParam1722') + '',
			handler : function() {
				cateInstanceEditTab.checkDataVer = revision;
				cateInstanceEditTab.checkDataId = dataEntityID;

				var u = window.location.href.substring(0, window.location.href
								.indexOf("base"));
				var dd = u + "/MM.swf?version=" + revision + "&dataId="
						+ dataEntityID;
				var winChart = new Ext.Window({
					width : 700,
					height : 500,
					layout : 'fit',
					items : [new Ext.Panel({
						html : '<embed src="'
								+ dd
								+ '" quality="high" type="application/x-shockwave-flash" width="100%" height="100%">'
					})]

				});
				winChart.show();

			}
		}],
		title : getResource('resourceParam3022'),
		items : [historyDataObjectView.init(dataEntityID, revision)],
		width : 700,
		layout : 'fit',
		height : 300
	});
	win.show();
}
