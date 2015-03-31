var enumTypeTreeGridPanel = {
	orderNumber : 0,
	editable : true
}
enumTypeTreeGridPanel.init = function(dataCenterId) {
	Ext.QuickTips.init();
	var self = this;
	var record = Ext.data.Record.create([{
				name : 'text'
			}, {
				name : 'dataEntityTypeName',
				type : 'string'
			}, {
				name : 'dataEntityRealType',
				type : 'string'
			}, {
				name : 'value',
				type : 'string'
			}, {
				name : 'discription',
				type : 'string'
			}, {
				name : 'leaf',
				type : 'bool'
			}, {
				name : 'dataEntityID',
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
				name : 'isRef',
				type : 'string'
			}, {
				name : 'rowClass',
				type : 'string'
			}, {
				name : 'orderNumber',
				type : 'auto'
			}, {
				name : 'version',
				mapping : 'version',
				type : 'long'
			}, {
				name : 'status',
				mapping : 'status',
				type : 'long'
			}]);
	enumTypeTreeGridPanel.store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				autoLoad : true,
				proxy : new Ext.data.HttpProxy({
							method : 'POST',
							url : '../JSON/dataModel_dataModelRemote.getChildDataModelPhysicType'
						}),
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)
			});
	var sm = new Ext.grid.CheckboxSelectionModel();
	enumTypeTreeGridPanel.grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : enumTypeTreeGridPanel.store,
		sm : sm,
		master_column_id : 'text',
		cm : new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [sm, {
				id : 'text',
				header : '' + getResource('resourceParam1252'),
				width : 300,
				dataIndex : 'text',
				editor : new Ext.form.TextField({
							enableKeyEvents : true,
							allowBlank : false,
							maxLength : 50,
							maxLengthText : '长度不能超过50',
							validator : function(value) {
								if (Ext.util.Format.trim(value).length == 0) {
									this.invalidText = ""
											+ getResource('resourceParam1089') + "";
									return false;
								}
								if (value.length > 50) {
									this.invalidText = ''
											+ getResource('resourceParam1271') + '';
									return false;
								}
								var reg = /^.*[/\\:\*\?\"<>\|]+.*$/;
								if (reg.test(value)) {
									this.invalidText = ""
											+ getResource('resourceParam1087') + "";
									return false;
								} else {
									return true;
								}
							}
						})
			}, {
				header : getResource('resourceParam500'),//状态
				width : 70,
				renderer : function(value, p, r) {
					switch (value) {
						case 0 :
							return getResource('resourceParam947');//编制中
						case 1 :
							return getResource('resourceParam948');//审批中
						case 2 :
							return getResource('resourceParam1266');//已发布
						case 3 :
							return getResource('resourceParam9090');//修改中
						case 4 :
							return getResource('resourceParam9091');//已废弃
					}
					return '<a href="javascript:void(0);" style="color:#0000FF;text-decoration:underline;">'
							+ value + '</a>'
				},
				dataIndex : 'status'
			}, {
				header : '' + getResource('resourceParam511') + '',
				width : 250,
				hidden : true,
				dataIndex : 'value',
				editor : new Ext.form.TextField({})
			}]
		}),
		stripeRows : true,
		autoExpandeColumn : 'text',
		listeners : {
			celldblclick : function(grid, row, col){
				var status = enumTypeTreeGridPanel.store.getAt(row).get('status');
				if(enumTypeMain.modelEdit == false||status==1||status==4||enumTypeMain.hm){
					return false;
				}
				if(enumTypeMain.userid==1&&enumTypeMain.loginuserid!=1){
					return false;
				}
			},
			cellclick : function(grid, row, col) {
				var dataIndex = grid.getColumnModel().getColumnAt(col).dataIndex;
				var record = enumTypeTreeGridPanel.store.getAt(row);
				if (dataIndex == 'text') {
					if (enumTypeMain.dataType == 'date') {
						grid.getColumnModel().setEditor(col,
								new Ext.form.DateField({
											selectOnFocus : true,
											format : 'Y-m-d'
										}))
					} else if (enumTypeMain.dataType == "file") {
					} else if (enumTypeMain.dataType == 'boolean') {
						grid.getColumnModel().setEditor(col,
								new Ext.form.ComboBox({
									id : 'newDataObjectValue',
									name : 'value',
									store : new Ext.data.SimpleStore({
												data : [["true", "true"],
														["false", "false"]],
												fields : ['value', 'text']
											}),
									triggerAction : 'all',
									width : 130,
									listWidth : 130,
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
									maxLength : 50,
									maxLengthText : '长度不能超过50',
									validator : function(value) {
										var flag = enumTypeMain.dataType;
										if ("double" == flag || "float" == flag) {
											var reg = /^-?\d+\.?\d*$/;
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
										return true;
									}
								}))
					}
				}
				if (col == 8) {
				}
			},
			beforeedit : function(e) {
				if (e.record.get('disableCheck') === true) {
					return false;
				}
				if (("file" == enumTypeMain.dataType || "dataset" == enumTypeMain.dataType)
						&& e.field == 'text') {
					return false;
				}
				enumTypeMain.dataEntityType = e.record.get('dataEntityType');
			},
			afteredit : function(e) {
				if (enumTypeMain.dataType == 'date' && e.field == 'text') {
					var date = new Date(e.record.get('text'));
					e.record.set('text', date.dateFormat('Y-m-d'));
				}
				if (hasUnSavedRecords()) {
					Ext.getCmp("enumTypeColumnTreeSave").enable();
				} else {
					Ext.getCmp("enumTypeColumnTreeSave").disable();
				}
			}
		}
	});

	sm.on("selectionchange", function(selection) {
				if(enumTypeMain.userid==1&&enumTypeMain.loginuserid!=1){
					enumsTypeTreeGridPanel.getTopToolbar().disable();
					return false;
				}
				if (selection.getSelections().length > 0) {
					Ext.getCmp("enumTypeColumnTreeDel").enable();
				} else {
					Ext.getCmp("enumTypeColumnTreeDel").disable();
				}
				if (selection.getSelections().length > 0) {
					if (sm.getSelections().length == 1) {
						var selectedRow = selection.getSelected();
						var status = selectedRow.get("status");
						switch (status) {
							case 0 :// 编制中
							case 2 :// 已发布
							case 3 :// 修改中
								break;
							case 1 :// 审批中
							case 4 :// 已废弃
								enumsTypeTreeGridPanel.getTopToolbar().disable();
						}
					}
				}
				if(enumTypeMain.modelEdit==false||enumTypeMain.approvalModel||enumTypeMain.hm){
					enumsTypeTreeGridPanel.getTopToolbar().disable();
				}
			})

	function selectChildren(rc, selectFlag) {
		var childrenNodes = enumTypeTreeGridPanel.store.getNodeChildren(rc);
		for (var i = 0; i < childrenNodes.length; i++) {
			var rowIndex = enumTypeTreeGridPanel.store
					.indexOf(childrenNodes[i]);
			if (selectFlag) {
				sm.selectRow(rowIndex, true);
			} else {
				sm.deselectRow(rowIndex, false);
			}
			selectChildren(childrenNodes[i], selectFlag);
		}
	}

	function selectParent(rc, selectFlag) {
		var parentNode = enumTypeTreeGridPanel.store.getNodeParent(rc);
		if (parentNode !== undefined && !selectFlag) {
			var rowIndex = enumTypeTreeGridPanel.store.indexOf(parentNode);
			sm.deselectRow(rowIndex, false);
			selectParent(parentNode, selectFlag);
		}
	}

	function hasReName(value) {
		var ss = false;
		var num = 0;
		var rows = enumTypeTreeGridPanel.store;
		for (var i = 0; i < rows.getCount(); i++) {
			if (value == rows.getAt(i).get("text")) {
				num++;
				if (num > 1) {
					ss = true;
					break;
				}
			}
		}
		return ss;
	}

	enumTypeTreeGridPanel.grid.on('rowclick', function(grid, rowindex) {
				selectChildren(enumTypeTreeGridPanel.store.getAt(rowindex), sm
								.isSelected(rowindex));
				selectParent(enumTypeTreeGridPanel.store.getAt(rowindex), sm
								.isSelected(rowindex));
			})
	enumTypeTreeGridPanel.store.on('beforeexpandnode', function(store, rc) {
				store.on('beforeload', function(store, options) {
							options.params = Ext.apply(options.params, {
										dataCenterID : rc.get("dataEntityType"),
										parentDataEntityID : rc.get("id"),
										disableCheck : true
									});
						});
			})
	enumTypeTreeGridPanel.store.on('expandnode', function(store, rc) {
				selectChildren(rc, sm.isSelected(store.indexOf(rc)));
			})

	var enumsTypeTreeGridPanel = new Ext.Panel({
		layout : 'fit',
//		region : 'center',
		id : 'enumTypeTreeGridPanel',
		disabled : true,
		tbar : [{
			text : '' + getResource('resourceParam477') + '',
			iconCls : 'add1',
			disabled : true,
			id : 'enumTypeColumnTreeAdd',
			handler : function() {
				var Plant = enumTypeTreeGridPanel.store.recordType;
				var p = new Plant({
							text : '' + getResource('resourceParam483') + getResource('resourceParam9092')
									+ getResource('resourceParam481') + getResource('resourceParam5001'),
							value : '',
							discription : '',
							leaf : true,
							parent : null,
							status : 0,
							version : 1,
							dataEntityType : 'string',
							orderNumber : self.orderNumber,
							isRef : '0'
						});
				enumTypeTreeGridPanel.grid.stopEditing();
				p.markDirty()
				enumTypeTreeGridPanel.store.insert(enumTypeTreeGridPanel.store
								.getCount(), p);
				sm.selectLastRow();
				self.orderNumber++;
				if (hasUnSavedRecords()) {
					Ext.getCmp("enumTypeColumnTreeSave").enable();
				} else {
					Ext.getCmp("enumTypeColumnTreeSave").disable();
				}
			}
		}, {
			text : '' + getResource('resourceParam475') + '',
			iconCls : 'del1',
			disabled : true,
			id : 'enumTypeColumnTreeDel',
			handler : function() {
				Ext.MessageBox.confirm('' + getResource('resourceParam596')
								+ '', '' + getResource('resourceParam1274')
								+ '?', function(btn) {
							if (btn == 'yes') {
								var delNodes = enumTypeTreeGridPanel.grid
										.getEnableCheckNodes();
								var flag;
								var del = enumTypeTreeGridPanel.grid
										.getSelectionModel().getSelections();
								for (var j = 0; j < del.length; j++) {
									if (del[j].get("id") == undefined) {
										enumTypeTreeGridPanel.grid.getStore()
												.remove(del[j]);
										flag = true;
									}
								}
								if (delNodes.length < 1) {
									if (!flag) {
										Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam651')
													+ '',
											msg : ''
													+ getResource('resourceParam1276')
													+ '!',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
									}
								} else {
									var dataModelVos = Seam.Remoting
											.createType("com.sysware.edm.DataModel.DataModelVo");
									var list = new Array();
									for (var i = 0; i < delNodes.length; i++) {
										var dataModelVo = Seam.Remoting
												.createType("com.sysware.edm.DataModel.DataModelVo");
										dataModelVo.setDataEntityID(delNodes[i]
												.get('dataEntityID'));
										list.push(dataModelVo);
									}
									dataModelVos.setDmvlist(list);
									Seam.Component
											.getInstance("dataModel_dataModelRemote")
											.deleteDataObject(dataModelVos,
													function(result) {
														for (s = 0; s < delNodes.length; s++) {
															enumTypeTreeGridPanel.grid
																	.getStore()
																	.removeRecord(delNodes[s]);
															var childNodes = enumTypeTreeGridPanel.grid
																	.getStore()
																	.getNodeChildren(delNodes[s]);
															for (var i = 0; i < childNodes.length; i++) {
																enumTypeTreeGridPanel.grid
																		.getStore()
																		.remove(childNodes[i]);
															}
														}
														if (result == "true") {
															Ext.example
																	.msg(
																			""
																					+ getResource('resourceParam575')
																					+ "",
																			""
																					+ getResource('resourceParam1275')
																					+ "");
															var r = enumTypeMain.grid.getSelectionModel().getSelected();
															var rowName = r.get('datatypeName');
															enumTypeMain.ds.load({
																params: {
															        start: 0,          
															        limit: enumTypeMain.sizePerPage
															    },
																callback : function(s){
																	enumTypeMain.grid.getSelectionModel().selectRow(enumTypeMain.ds.findExact('datatypeName',rowName));
																}
															});
															enumTypeTreeGridPanel.grid.getView()
																	.refresh();
															enumTypeTreeGridPanel.store
																	.commitChanges();
														}
													});
								}
							}
						});
			}

		}, {
			text : '' + getResource('resourceParam7002') + '',// 保存
			iconCls : 'save1',
			id : 'enumTypeColumnTreeSave',
			disabled : true,
			handler : function() {
				function validValue(type, value) {
					var reg;
					if (type == 'boolean') {
						reg = /^(true|false)*$/;
					} else if (type == 'double' || type == 'float') {
						reg = /^-?((\d+\.\d+)|(\d+))$/;
					} else if (type == 'date') {
						reg = /^(\d{4}-\d{2}-\d{2})*$/;
					} else if (type == 'integer') {
						reg = /^(\-?[0-9][0-9]*)*$/;
					}
					if (reg && !reg.test(value)) {
						return false;
					} else {
						return true;
					}
				}
				var addlist = new Array();
				enumTypeTreeGridPanel.store.findBy(function(record, id) {
							if (record.get("dataEntityID") === undefined) {
								addlist.push(record)
							}
						}, enumTypeTreeGridPanel.store)
				var DataModelVos = Seam.Remoting
						.createType("com.sysware.edm.DataModel.DataModelVo");
				var list = new Array();
				var modifiedRecords = enumTypeTreeGridPanel.store
						.getModifiedRecords();
				for (var i = 0; i < modifiedRecords.length; i++) {
					var DataModelVo = Seam.Remoting
							.createType("com.sysware.edm.DataModel.DataModelVo");
					if (modifiedRecords[i].get("dataEntityID") !== undefined) {
						if (hasReName(modifiedRecords[i].get("text"))) {
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam651')
												+ '',
										msg : ''
												+ getResource('resourceParam7035')
												+ '：<span style="color:blue;">'
												+ modifiedRecords[i]
														.get("text")
												+ '       </span>',// 已存在重名对象
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
							return false;
						} else {
							DataModelVo
									.setDataEntityType(enumTypeMain.dataType);
							DataModelVo.setDataEntityName(modifiedRecords[i]
									.get("text"));
							DataModelVo.setDataEntityID(modifiedRecords[i]
									.get("dataEntityID"));
							DataModelVo.setIsRef(0);
							DataModelVo.setOrderNumber(modifiedRecords[i]
									.get("orderNumber"));
							DataModelVo.setValue(modifiedRecords[i]
									.get("value"));
							DataModelVo.setIsArray(false);
							DataModelVo.setStatus(modifiedRecords[i]
									.get("status"));
							DataModelVo.setVersion(modifiedRecords[i]
									.get("version"));
							DataModelVo.setDataCenterID(enumTypeMain.dataCenterId);
							list.push(DataModelVo);
						}
					}
				}
				for (var j = 0; j < addlist.length; j++) {
					if (!validValue(enumTypeMain.dataType, addlist[j]
									.get("text"))) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam651')
											+ '',
									msg : '' + getResource('resourceParam1261')
											+ '不合法，请'
											+ getResource('resourceParam478')
											+ '！',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return false;
					}
					if (hasReName(addlist[j].get("text"))) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam651')
											+ '',
									msg : '' + getResource('resourceParam7035')
											+ '：<span style="color:blue;">'
											+ addlist[j].get("text")
											+ '       </span>',// 已存在重名对象
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return false;
					}
					var DataModelVo = Seam.Remoting
							.createType("com.sysware.edm.DataModel.DataModelVo");
					DataModelVo.setDataEntityType(enumTypeMain.dataType);
					DataModelVo.setDataEntityName(addlist[j].get("text"));
					DataModelVo.setValue(addlist[j].get("value"));
					DataModelVo.setIsRef(0);
					DataModelVo.setOrderNumber(addlist[j].get("orderNumber"));
					DataModelVo.setStatus(addlist[j].get("status"));
					DataModelVo.setVersion(addlist[j].get("version"));
					DataModelVo.setDataCenterID(enumTypeMain.dataCenterId);
					DataModelVo.setIsArray(false);
					list.push(DataModelVo);
				}

				DataModelVos.setDmvlist(list);
				Seam.Component.getInstance("dataModel_dataModelRemote")
						.insertOrUpdateDataObject(DataModelVos,
								function(result) {
									if (result == "true") {
										enumTypeTreeGridPanel.grid
												.getSelectionModel()
												.clearSelections();
										enumTypeTreeGridPanel.store.reload();
										var r = enumTypeMain.grid.getSelectionModel().getSelected();
										var rowName = r.get('datatypeName');
										enumTypeMain.ds.load({
											params: {
										        start: 0,          
										        limit: enumTypeMain.sizePerPage
										    },
											callback : function(s){
												enumTypeMain.grid.getSelectionModel().selectRow(enumTypeMain.ds.findExact('datatypeName',rowName));
											}
										});
										enumTypeTreeGridPanel.grid.getView()
												.refresh();
										enumTypeTreeGridPanel.store
												.commitChanges();
										Ext.getCmp("enumTypeColumnTreeSave")
												.disable();
										Ext.example
												.msg(
														""
																+ getResource('resourceParam575')
																+ "",
														""
																+ getResource('resourceParam1072')
																+ "");
									} else {
										Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam651')
													+ '',
											msg : ''
													+ getResource('resourceParam7035')
													+ '：<span style="color:blue;">'
													+ result.replace("]", "")
															.replace("[", "")
													+ '       </span>',// 已存在重名对象
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
									}
								});
			}
		}],
		items : [enumTypeTreeGridPanel.grid]
	})

	// 是否有未保存的数据
	function hasUnSavedRecords() {
		var flag = enumTypeTreeGridPanel.store.findBy(function(record, id) {
					if (record.get("id") == undefined) {
						return true;
					}
				}, enumTypeTreeGridPanel.store) >= 0
		flag |= enumTypeTreeGridPanel.store.getModifiedRecords().length > 0;
		return flag;
	}
	return enumsTypeTreeGridPanel;
}
