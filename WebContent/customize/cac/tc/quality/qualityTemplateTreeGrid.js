var physicTypeTreeGridPanel = {
	orderNumber : 0,
	editable : true
}
physicTypeTreeGridPanel.init = function(dataCenterId) {
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
				name : 'dimension',
				type : 'string'
			}, {
				name : 'orderNumber',
				type : 'auto'
			}, {
				name : 'realIsRef',
				type : 'string'
			}, {
				name : 'isArray',
				type : 'bool'
			}, {
				name : 'version',
				type : 'auto'
			}, {
				name : 'status',
				type : 'auto'
			}]);
	physicTypeTreeGridPanel.store = new Ext.ux.maximgb.tg.sysEditTreeGridStore(
			{
				autoLoad : true,
				proxy : new Ext.data.HttpProxy({
							method : 'POST',
							url : '../JSON/dataModel_dataModelRemote.getChildDataModel'
						}),
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)
			});
	var isArrayColumn = new Ext.ux.grid.CheckColumn({
				header : '' + getResource('resourceParam7019') + '',// 数组化
				width : 80,
				dataIndex : 'isArray'
			})
	var sm = new Ext.grid.CheckboxSelectionModel();
	physicTypeTreeGridPanel.grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : physicTypeTreeGridPanel.store,
		sm : sm,
		master_column_id : 'text',
		cm : new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [sm, {
					id : 'text',
					header : '' + getResource('resourceParam1258') + '',
					width : 300,
					dataIndex : 'text',
					editor : new Ext.form.TextField({
								allowBlank : false
							})
				}, 
//				{
//					header : getResource('resourceParam500'),//状态
//					renderer : function(value, p, r) {
//						switch (value) {
//							case 0 :
//								return getResource('resourceParam947');//编制中
//							case 1 :
//								return getResource('resourceParam948');//审批中
//							case 2 :
//								return getResource('resourceParam1266');//已发布
//							case 3 :
//								return getResource('resourceParam9090');//修改中
//							case 4 :
//								return getResource('resourceParam9091');//已废弃
//						}
//						return '<a href="#" style="color:#0000FF;text-decoration:underline;">'
//								+ value + '</a>'
//					},
//					dataIndex : 'status'
//				}, 
				{
					header : '' + getResource('resourceParam481') + '',
					width : 150,
					dataIndex : 'dataEntityTypeName',
					editor : new Ext.form.ComboBox({
						store : new Ext.data.JsonStore({
							url : '../JSON/dynamicmodel_datatype.getPhysicDataTypeList',
							method : 'GET',
							fields : [{
										name : 'dataTypeId',
										mapping : 'dataTypeId'
									}, {
										name : 'dataType',
										mapping : 'dataType'
									}, {
										name : 'dataTypeName',
										mapping : 'dataTypeName'
									}, {
										name : 'rank',
										mapping : 'rank'
									}]
						}),
						triggerAction : 'all',
						width : 200,
						valueField : 'dataTypeName',
						displayField : 'dataTypeName',
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
							physicTypeTreeGridPanel.grid.getSelectNodes()[0]
									.set('dataEntityType', record
													.get("dataTypeId"));
							physicTypeTreeGridPanel.grid.getSelectNodes()[0]
									.set('isRef', record.get("rank"));
							physicTypeTreeGridPanel.grid.getSelectNodes()[0]
									.set('dataEntityRealType', record
													.get("dataType"));
							physicTypeTreeGridPanel.grid.getSelectNodes()[0]
									.set('value', "");
						},
						listeners : {
							beforequery : function(e) {
								e.combo.getStore().setBaseParam("datatypeId",
										qualityTemplateMainPanel.dataCenterId||dataCenterId)
								e.combo.getStore().load();
								return false;
							}
						}
					})
				}, 
//				isArrayColumn, 
//				{
//					header : '' + getResource('resourceParam853') + '',
//					width : 100,
//					dataIndex : 'dimension',
//					editor : new Ext.form.TextField({
//						allowBlank : false,
//						validator : function(value) {
//							if (Ext.util.Format.trim(value).length == 0) {
//								this.invalidText = ""
//										+ getResource('resourceParam1084') + "";
//								return false;
//							}
//							var reg = /^[1-9]+\d*$/;
//							if (reg.test(value)) {
//								if (value > 10) {
//									this.invalidText = "'+getResource('resourceParam7039')+'！";// 维度不能大于10
//									return false;
//								} else
//									return true;
//							} else {
//								this.invalidText = "您"
//										+ getResource('resourceParam494') + "的"
//										+ getResource('resourceParam474')
//										+ "必须为大于0的整数！";
//								return false;
//							}
//						}
//					}),
//					renderer : function(value, p, record) {
//						if (!record.get("isArray")) {
//							return "";
//						} else {
//							if (value == undefined) {
//								return 1;
//							} else {
//								return value;
//							}
//						}
//					}
//				}, 
				{
					header : '' + getResource('resourceParam1282') + '',
					width : 150,
					dataIndex : 'value',
					editor : new Ext.form.TextField({})
				}]
				}),
		stripeRows : true,
		plugins : [isArrayColumn],
		autoExpandeColumn : 'text',
		listeners : {
			celldblclick : function(grid, row, col){
				var status = physicTypeTreeGridPanel.store.getAt(row).get('status');
				if(status==1||status==4||qualityTemplateMainPanel.hm){
					return false;
				}
			},
			cellclick : function(grid, row, col) {
				var dataIndex = grid.getColumnModel().getColumnAt(col).dataIndex;
				var record = physicTypeTreeGridPanel.store.getAt(row);
				if (dataIndex == 'value') {
					if (record.get('dataEntityRealType') == 'date') {
						grid.getColumnModel().setEditor(col,
								new Ext.form.DateField({
											selectOnFocus : true,
											format : 'Y-m-d'
										}))
					} else if (record.get('dataEntityRealType') == "file") {
					} else if (record.get('dataEntityRealType') == 'boolean') {
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
												.get('dataEntityRealType');
										if ("double" == flag || "float" == flag) {
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
										return true;
									}
								}))
					}
				}
			},
			beforeedit : function(e) {
				if (e.record.get('disableCheck') === true) {
					return false;
				}
				if (("file" == e.record.get("dataEntityRealType") || "dataset" == e.record
						.get("dataEntityRealType"))
						&& e.field == 'value') {
					return false;
				}
				if (e.field == "dimension") {
					if (!e.record.get("isArray")) {
						return false;
					}
				}
				qualityTemplateMainPanel.dataEntityType = e.record.get('dataEntityType');
			},
			afteredit : function(e) {
				if (e.record.get('dataEntityRealType') == 'date'
						&& e.field == 'value') {
					var date = new Date(e.record.get('value'));
					e.record.set('value', date.dateFormat('Y-m-d'));
				}
				// if (hasUnSavedRecords()) {
				// Ext.getCmp("physicsTypeColumnTreeSave").enable();
				// } else {
				// Ext.getCmp("physicsTypeColumnTreeSave").disable();
				// }
			}
		}
	});

	function hasReName(value) {
		var ss = false;
		var num = 0;
		var rows = physicTypeTreeGridPanel.store;
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
	sm.on("selectionchange", function(selection) {
				physicTypeTreeGridPanel.grid.stopEditing();
				if (selection.getSelections().length > 0) {
					if (selection.getSelections().length == 1
							&& !selection.getSelections()[0]
									.get("disableCheck")) {
						Ext.getCmp("physicsTypeColumnTreeMoveUp").enable();
						Ext.getCmp("physicsTypeColumnTreeMoveDown").enable();
					} else {
						Ext.getCmp("physicsTypeColumnTreeMoveUp").disable();
						Ext.getCmp("physicsTypeColumnTreeMoveDown").disable();
					}
					Ext.getCmp("physicsTypeColumnTreeDel").enable();
				} else {
					Ext.getCmp("physicsTypeColumnTreeDel").disable();
					Ext.getCmp("physicsTypeColumnTreeMoveUp").disable();
					Ext.getCmp("physicsTypeColumnTreeMoveDown").disable();
				}
				if(physicTypeTreeGridPanel.editable==false){
					Ext.getCmp("physicsTypeColumnTreeDel").disable();
					Ext.getCmp("physicsTypeColumnTreeMoveUp").disable();
					Ext.getCmp("physicsTypeColumnTreeMoveDown").disable();
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
								physicsTypeTreeGridPanel.getTopToolbar().disable();
						}
					}
				}
				if(qualityTemplateMainPanel.approvalModel||qualityTemplateMainPanel.hm){
					physicsTypeTreeGridPanel.getTopToolbar().disable();
				}
			})

	function selectChildren(rc, selectFlag) {
		var childrenNodes = physicTypeTreeGridPanel.store.getNodeChildren(rc);
		for (var i = 0; i < childrenNodes.length; i++) {
			var rowIndex = physicTypeTreeGridPanel.store
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
		var parentNode = physicTypeTreeGridPanel.store.getNodeParent(rc);
		if (parentNode !== undefined && !selectFlag) {
			var rowIndex = physicTypeTreeGridPanel.store.indexOf(parentNode);
			sm.deselectRow(rowIndex, false);
			selectParent(parentNode, selectFlag);
		}
	}
	physicTypeTreeGridPanel.grid.on('rowclick', function(grid, rowindex) {
				selectChildren(physicTypeTreeGridPanel.store.getAt(rowindex),
						sm.isSelected(rowindex));
				selectParent(physicTypeTreeGridPanel.store.getAt(rowindex), sm
								.isSelected(rowindex));
			})
	physicTypeTreeGridPanel.grid.on('celldblclick', function() {
				if(physicTypeTreeGridPanel.editable==false){
					return false;
				}
			})
	physicTypeTreeGridPanel.store.on('beforeexpandnode', function(store, rc) {
				store.on('beforeload', function(store, options) {
							options.params = Ext.apply(options.params, {
										dataCenterID : rc.get("dataEntityType"),
										parentDataEntityID : rc.get("id"),
										disableCheck : true
									});
						});
			})
	physicTypeTreeGridPanel.store.on('expandnode', function(store, rc) {
				selectChildren(rc, sm.isSelected(store.indexOf(rc)));
			})

	var physicsTypeTreeGridPanel = new Ext.Panel({
		layout : 'fit',
		region : 'center',
		id : 'physicTypeTreeGridPanel',
		disabled : true,
		tbar : [{
			text : '' + getResource('resourceParam477') + '',
			iconCls : 'add1',
			disabled : true,
			id : 'physicsTypeColumnTreeAdd',
			handler : function() {
				var Plant = physicTypeTreeGridPanel.store.recordType;
				var p = new Plant({
							text : '' + getResource('resourceParam1279') + '',
							dataEntityTypeName : ''
									+ getResource('resourceParam1079') + '',
							value : '',
							discription : '',
							status : 0,
							version : 1,
							leaf : true,
							parent : null,
							dataEntityType : 'string',
							orderNumber : self.orderNumber,
							isRef : '0',
							isArray : false
						});
				physicTypeTreeGridPanel.grid.stopEditing();
				p.markDirty()
				physicTypeTreeGridPanel.store.insert(
						physicTypeTreeGridPanel.store.getCount(), p);
				sm.selectLastRow();
				self.orderNumber++;
				// if (hasUnSavedRecords()) {
				// Ext.getCmp("physicsTypeColumnTreeSave").enable();
				// } else {
				// Ext.getCmp("physicsTypeColumnTreeSave").disable();
				// }
			}
		}, {
			text : '' + getResource('resourceParam475') + '',
			iconCls : 'del1',
			disabled : true,
			id : 'physicsTypeColumnTreeDel',
			handler : function() {
				Ext.MessageBox.confirm('' + getResource('resourceParam596')
								+ '', '' + getResource('resourceParam1274')
								+ '?', function(btn) {
							if (btn == 'yes') {
								var delNodes = physicTypeTreeGridPanel.grid
										.getEnableCheckNodes();
								var flag;
								var del = physicTypeTreeGridPanel.grid
										.getSelectionModel().getSelections();
								for (var j = 0; j < del.length; j++) {
									if (del[j].get("id") == undefined) {
										physicTypeTreeGridPanel.grid.getStore()
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
									var disDelectlist = new Array();
									for (var i = 0; i < delNodes.length; i++) {
										if (!delNodes[i].get('disableCheck')) {
											var dataModelVo = Seam.Remoting
													.createType("com.sysware.edm.DataModel.DataModelVo");
											dataModelVo
													.setDataEntityID(delNodes[i]
															.get('dataEntityID'));
											list.push(dataModelVo);
										} else {
											disDelectlist.push(delNodes[i]
													.get('text'))
										}
									}
									if (list.length < 1) {
										Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam651')
													+ '',
											msg : ''
													+ getResource('resourceParam1281')
													+ ' <span style="color:blue;">"'
													+ disDelectlist.join(',')
													+ '"</span> '
													+ getResource('resourceParam1280')
													+ '',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
										return false;
									}
									dataModelVos.setDmvlist(list);
									Seam.Component
											.getInstance("dataModel_dataModelRemote")
											.deleteDataObject(dataModelVos,
													function(result) {
														for (s = 0; s < delNodes.length; s++) {
															physicTypeTreeGridPanel.grid
																	.getStore()
																	.removeRecord(delNodes[s]);
															var childNodes = physicTypeTreeGridPanel.grid
																	.getStore()
																	.getNodeChildren(delNodes[s]);
															for (var i = 0; i < childNodes.length; i++) {
																physicTypeTreeGridPanel.grid
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
															qualityTemplateMainPanel.ds.load();
															physicTypeTreeGridPanel.grid
																		.getStore().load();
														}
													});
								}
							}
						});
			}

		}, {
			text : '' + getResource('resourceParam7002') + '',// 保存
			iconCls : 'save1',
			id : 'physicsTypeColumnTreeSave',
			disabled : true,
			handler : function() {
				physicTypeTreeGridPanel.grid.stopEditing();
				var addlist = new Array();
				physicTypeTreeGridPanel.store.findBy(function(record, id) {
							if (record.get("dataEntityID") === undefined) {
								addlist.push(record)
							}
						}, physicTypeTreeGridPanel.store)
				var DataModelVos = Seam.Remoting
						.createType("com.sysware.edm.DataModel.DataModelVo");
				var list = new Array();
				var modifiedRecords = physicTypeTreeGridPanel.store
						.getModifiedRecords();
				for (var i = 0; i < modifiedRecords.length; i++) {
					if (hasReName(modifiedRecords[i].get("text"))) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam651')
											+ '',
									msg : '' + getResource('resourceParam7035')
											+ '：<span style="color:blue;">'
											+ modifiedRecords[i].get("text")
											+ '</span>',// 已存在重名对象
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return false;
					}
					var DataModelVo = Seam.Remoting
							.createType("com.sysware.edm.DataModel.DataModelVo");
					if (modifiedRecords[i].get("dataEntityID") !== undefined) {
						DataModelVo.setDataEntityType(modifiedRecords[i]
								.get("dataEntityType"));
						DataModelVo.setDataEntityName(modifiedRecords[i]
								.get("text"));
						DataModelVo.setDataEntityID(modifiedRecords[i]
								.get("dataEntityID"));
						DataModelVo
								.setDataCenterID(qualityTemplateMainPanel.dataCenterId||dataCenterId);
						DataModelVo.setIsRef(modifiedRecords[i].get("isRef"));
						DataModelVo.setValue(modifiedRecords[i].get("value"));
						DataModelVo.setDimension(modifiedRecords[i]
								.get("dimension"));
						DataModelVo.setOrderNumber(modifiedRecords[i]
								.get("orderNumber"));
						DataModelVo.setIsArray(modifiedRecords[i]
								.get("isArray"));
						DataModelVo.setVersion(modifiedRecords[i]
								.get("version"));
						DataModelVo.setStatus(modifiedRecords[i].get("status"));
						list.push(DataModelVo);
					}
				}
				for (var j = 0; j < addlist.length; j++) {
					if (hasReName(addlist[j].get("text"))) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam651')
											+ '',
									msg : '' + getResource('resourceParam7035')
											+ '：<span style="color:blue;">'
											+ addlist[j].get("text")
											+ '</span>',// 已存在重名对象
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return false;
					}
					var DataModelVo = Seam.Remoting
							.createType("com.sysware.edm.DataModel.DataModelVo");
					DataModelVo.setDataEntityType(addlist[j]
							.get("dataEntityType"));
					DataModelVo.setDataEntityName(addlist[j].get("text"));
					DataModelVo.setValue(addlist[j].get("value"));
					DataModelVo.setIsRef(addlist[j].get("isRef"));
					DataModelVo.setDataCenterID(qualityTemplateMainPanel.dataCenterId||dataCenterId);
					DataModelVo.setDimension(addlist[j].get("dimension"));
					DataModelVo.setOrderNumber(addlist[j].get("orderNumber"));
					DataModelVo.setIsArray(addlist[j].get("isArray"));
					DataModelVo.setVersion(addlist[j].get("version"));
					DataModelVo.setStatus(addlist[j].get("status"));
					list.push(DataModelVo);
				}
				if (list.length < 1) {
					return false;
				}
				DataModelVos.setDmvlist(list);
				Seam.Component.getInstance("dataModel_dataModelRemote")
						.insertOrUpdateDataObject(DataModelVos,
								function(result) {
									if (result == "true") {
										physicTypeTreeGridPanel.grid
												.getSelectionModel()
												.clearSelections();
										physicTypeTreeGridPanel.store.reload();
										physicTypeTreeGridPanel.grid.getView()
												.refresh();
										physicTypeTreeGridPanel.store
												.commitChanges();
										// Ext.getCmp("physicsTypeColumnTreeSave")
										// .disable();
										Ext.example
												.msg(
														""
																+ getResource('resourceParam575')
																+ "",
														""
																+ getResource('resourceParam1072')
																+ "");
										qualityTemplateMainPanel.ds.load();
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
													+ '</span>',// 已存在重名对象
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
									}
								});
			}
		}, '-', {
			text : '' + getResource('resourceParam1081') + '',
			iconCls : 'refresh1',
			disabled : true,
			id : 'physicsTypeColumnTreeRefresh',
			handler : function() {
				var rc = physicTypeTreeGridPanel.grid.getSelectionModel()
						.getSelected();
				physicTypeTreeGridPanel.store.proxy = new Ext.data.HttpProxy({
							method : 'POST',
							url : '../JSON/dataModel_dataModelRemote.getChildDataModel'
						})
				physicTypeTreeGridPanel.store.on('beforeload', function(store,
								options) {
							if (rc != undefined) {
								options.params = Ext.apply(options.params, {
											dataCenterID : rc
													.get("dataEntityType"),
											parentDataEntityID : rc.get("id"),
											disableCheck : true
										});
							} else {
								var r = qualityTemplateMainPanel.grid
										.getSelectionModel().getSelected();
								options.params = Ext.apply(options.params, {
											dataCenterID : r.get("datatypeId"),
											parentDataEntityID : "0",
											disableCheck : false
										});
							}
						});
				var loadObject = {};
				if (rc != undefined) {
					loadObject = {
						add : true,
						callback : function() {
							physicTypeTreeGridPanel.store.expandNode(rc);
							physicTypeTreeGridPanel.grid.getSelectionModel()
									.clearSelections();
						}
					}
				} else {
					loadObject = {
						callback : function() {
							physicTypeTreeGridPanel.grid.getSelectionModel()
									.clearSelections();
						}
					}
				}

				physicTypeTreeGridPanel.store.load(loadObject)
				physicTypeTreeGridPanel.store.commitChanges();
				physicTypeTreeGridPanel.store.removedRecords = [];
			}
		}, '-', {
			text : '' + getResource('resourceParam488') + '',// 上移
			iconCls : 'icon-back',
			disabled : true,
			id : 'physicsTypeColumnTreeMoveUp',
			handler : function() {
				var theRecord = physicTypeTreeGridPanel.grid
						.getSelectionModel().getSelected();
				var theOrderNumber = theRecord.get("orderNumber");
				if (theRecord.get("disableCheck")) {
					Ext.Msg.alert("" + getResource('resourceParam575') + "",
							"'+getResource('resourceParam7040')+'！");// 不能排序
					return false;
				}
				var preInfo = {};
				function getPreRecord(record, index) {
					var tempRecord = physicTypeTreeGridPanel.store.getAt(index
							- 1);
					if (tempRecord == undefined || index == 0) {
						preInfo.index = -1;
						return;
					}
					preInfo.index = index;
					preInfo.rc = tempRecord;
					if (record.get("parent") != tempRecord.get("parent")) {
						getPreRecord(record, index - 1);
					}
				}
				var theIndex = physicTypeTreeGridPanel.store.indexOf(theRecord);
				getPreRecord(theRecord, theIndex);
				if (theIndex == 0 || preInfo.index == -1) {
					Ext.Msg.alert("" + getResource('resourceParam575') + "",
							""+getResource('resourceParam7041')+"");// 已经是最顶端了
					return false;
				}
				var preRecord = preInfo.rc;
				var preOrderNumber = preRecord.get("orderNumber");
				physicTypeTreeGridPanel.store.remove(theRecord);
				physicTypeTreeGridPanel.store.insert(preInfo.index - 1,
						theRecord);
				theRecord.set("orderNumber", preOrderNumber);
				preRecord.set("orderNumber", theOrderNumber);
				physicTypeTreeGridPanel.grid.getSelectionModel()
						.selectRow(preInfo.index - 1);
				theRecord.markDirty();
				physicTypeTreeGridPanel.grid.getView().refresh();
			}
		}, {
			text : '' + getResource('resourceParam489') + '',// 下移
			iconCls : 'icon-forward',
			id : 'physicsTypeColumnTreeMoveDown',
			disabled : true,
			handler : function() {
				var theRecord = physicTypeTreeGridPanel.grid
						.getSelectionModel().getSelected();
				var theOrderNumber = theRecord.get("orderNumber");
				var theIndex = physicTypeTreeGridPanel.store.indexOf(theRecord);
				var maxIndex = physicTypeTreeGridPanel.store.getCount() - 1;
				if (theRecord.get("disableCheck")) {
					Ext.Msg.alert("" + getResource('resourceParam575') + "",
							"'+getResource('resourceParam7040')+'！");// 不能排序
					return false;
				}
				var nexInfo = {};
				function getNexRecord(record, index) {
					var tempRecord = physicTypeTreeGridPanel.store.getAt(index
							+ 1);
					var nextRecord = physicTypeTreeGridPanel.store.getAt(index
							+ 2);
					if (tempRecord == undefined || index == maxIndex) {
						nexInfo.index = -1;
						return;
					}
					if (tempRecord != undefined
							&& record.get("parent") == tempRecord.get("parent")) {
						nexInfo.replaceRecord = tempRecord;
					}
					if (nextRecord == undefined) {
						nexInfo.index = index;
						return;
					}
					nexInfo.index = index;
					nexInfo.rc = nextRecord;
					if (!(nextRecord != undefined && record.get("parent") == nextRecord
							.get("parent"))) {
						getNexRecord(record, index + 1);
					}
				}
				getNexRecord(theRecord, theIndex);
				if (theIndex == maxIndex || nexInfo.index == -1) {
					Ext.Msg.alert("" + getResource('resourceParam575') + "", ""
									+ getResource('resourceParam7042') + "！");// 已经是最底端了
					return false;
				}
				var nexRecord = nexInfo.replaceRecord;
				var nexOrderNumber = nexRecord.get("orderNumber");
				physicTypeTreeGridPanel.store.remove(theRecord);
				physicTypeTreeGridPanel.store.insert(nexInfo.index + 1,
						theRecord);
				theRecord.set("orderNumber", nexOrderNumber);
				nexRecord.set("orderNumber", theOrderNumber);
				physicTypeTreeGridPanel.grid.getSelectionModel()
						.selectRow(nexInfo.index + 1);
				theRecord.markDirty();
				physicTypeTreeGridPanel.grid.getView().refresh();
			}
		}],
		items : [physicTypeTreeGridPanel.grid]
	})
	// 是否有未保存的数据
	function hasUnSavedRecords() {
		var flag = physicTypeTreeGridPanel.store.findBy(function(record, id) {
					if (record.get("id") == undefined) {
						return true;
					}
				}, physicTypeTreeGridPanel.store) >= 0
		flag |= physicTypeTreeGridPanel.store.getModifiedRecords().length > 0;
		return flag;
	}
	return physicsTypeTreeGridPanel;
}
