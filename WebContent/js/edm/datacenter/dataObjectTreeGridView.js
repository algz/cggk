var dataObjectTreeGridView = {
	parameters : {}
}
dataObjectTreeGridView.init = function(fileUploadCallback,setDataRelationCallback,updateDataEntityByRelationCallback) {
	Ext.QuickTips.init()
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
			},{
				name : 'dataEntityCategoryTagName',
				type : 'string'
			},{
				name : 'dataEntityCategoryTagCenterID',
				type : 'string'
			},{
				name : 'dataEntityCategoryTag',
				type : 'string'
			},{
				name : 'isSourceDataUpedRevision',
				type : 'bool'
			},{
				name : 'iconCls',
				type : 'string'
			},{
				name : 'checkStr',
				type : 'string'
			},{
				name : 'arrLength',
				type : 'string'
			},{
				name : 'isArray',
				type : 'bool'
			},{
				name : 'unit',
				type : 'string'
			},{
				name : 'description',
				type : 'string'
			},{
				name : 'createTime'
			},{
				name : 'createrName'
			},{
				name : 'modifyTime'
			},{
				name : 'isArrayItemChild',
				type : 'bool'
			}]);
	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/dataEntity_DataEntityRemote.getDataEntities'
			});

	var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
				proxy : this.proxy,
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, record)
			});
	var sm = new Ext.grid.CheckboxSelectionModel({});
	var lineNum = new Ext.grid.RowNumberer({})
	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : store,
		sm : sm,
		loadMask : true,
		master_column_id : 'text',
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
							options.params = Ext.apply(options.params, {
									dataCenterID : self.parameters["dataCenterPrefixID"],
									parentDataEntityID : self.parameters["dataCategoryPrefixID"]
								});
						});
					}else{
						var rc = sm.getSelected();
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
								isRef : (rc.get("dimension").indexOf("*") > 0 || Number(rc.get("dimension")) > 1) ? 2 : rc.get('isRef'),
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
					header : ''+getResource('resourceParam480')+'',
					width : 250,
					dataIndex : 'text',
					renderer : function(value, p, record) {
						return "<div ext:qtip='" + value + "'>" + value + "</div>";
					},
					editor : new Ext.form.TextField({
								allowBlank : false,
								maxLength : 50
							})
				}, {
					header : ''+getResource('resourceParam511')+'',
					width : 100,
					dataIndex : 'value',
					renderer : function(value, p, record) {
						if (value == undefined) {
							return "";
						}
						if("arrayfile"==record.get("dataEntityType")){
							return '<a style="color:#0000FF;text-decoration:underline;" href="../dataObjectFileDownload?fileId=' + record.get("fileID") + '&fileName=' + encodeURI(encodeURI(record.get('value')))+'" ext:qtip="'+value+'" >' + value + '</a>';
						}
						if ("arrayfile"!=record.get("dataEntityType")&&"file" == record.get('extendsTypeRealName')) {
							if (value == "") {
								return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;'>"+getResource('resourceParam1085')+"</a>";
							} else {
								return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;'>"
										+ value + "</a>";
							}
						} else {
							return "<div title="+value+">"+value+"</div>";
						}
					}
				},{
					header : ''+getResource('resourceParam481')+'',
					width : 100,
					dataIndex : 'dataEntityTypeName',
					renderer : function(value, p, record) {
						if (value == "typeIsDeleted") {
							return "<span style='color:red;'>"
									+ baseResource.typeIsDeleted + "</span>";
						} else {
							return value;
						}
					},
					editor : new Ext.form.ComboBox({
						fieldLabel : ''+getResource('resourceParam481')+'',
						store : new Ext.data.JsonStore({
							url : '../JSON/dynamicmodel_datatype.getAllDataTypeList',
							method : 'POST',
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
									}]
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
					header : ''+getResource('resourceParam853')+'',
					width : 50,
					dataIndex : 'dimension',
					editor : new Ext.form.TextField({
						allowBlank : false,
						enableKeyEvents : true,
						validator : function(value) {
							if (Ext.util.Format.trim(value).length == 0) {
								this.invalidText = ""+getResource('resourceParam1084')+"";
								return false;
							}
							var reg = /^([1-9][0-9]*(\*[1-9][0-9]*)?)*$/;
							if (reg.test(value)) {
								if ((value.indexOf("*") < 0 && value > 100)
										|| (value.indexOf("*") > 0 && (value
												.split("*")[0]
												* value.split("*")[1] > 100))) {
									this.invalidText = "您"+getResource('resourceParam494')+"的"+getResource('resourceParam474')+""+getResource('resourceParam511')+"超过100!";
									return false;
								} else
									return true;
							} else {
								this.invalidText = ""+getResource('resourceParam1082')+"";
								return false;
							}
						}
					}),
					renderer : function(value, p, record) {
						if (value == undefined) {
							return 1;
						} else {
							return value;
						}
					}
				},  {
					header : 'I/O',
					width : 100,
					dataIndex : 'inout',
					renderer : function(value, p, record) {
						if (value == 0)
							return ""+getResource('resourceParam494')+"";
						if (value == 1)
							return ""+getResource('resourceParam1066')+"";
						if (value == 2)
							return ""+getResource('resourceParam1065')+"";
					},
					editor : new Ext.form.ComboBox({
						id : 'itemidCombo',
						store : new Ext.data.JsonStore({
									url : '../JSON/group_groupRemote.getGroupListById',
									fields : [{
												name : 'itemName',
												mapping : 'itemName'
											}, {
												name : 'itemID',
												mapping : 'itemID'
											}],
									baseParams : {
										groupID : 'DataInOut'
									}
								}),
						triggerAction : 'all',
						editable : false,
						displayField : 'itemName',
						valueField : 'itemID',
						fieldLabel : ''+getResource('resourceParam849')+'',
						lazyRender : true,
						onSelect : function(record, index) {
							if (this.fireEvent('beforeselect', this, record,
									index) != false) {
								this.setValue(record.data[this.valueField
										|| this.displayField]);
								this.collapse();
								this.fireEvent('select', this, record, index);
							}
							grid.getSelectNodes()[0].set('inout', record
											.get("itemID"));
						}
					})
				}, {
					header : ''+getResource('resourceParam462')+'',
					width : 50,
					dataIndex : 'updateCount',
					renderer : function(v, p, r) {
						if (!r.get("disableCheck")) {
							return v;
						} else {
							return "";
						}
						if (v == undefined) {
							return "";
						}
					}
				}, {
					header : '' + getResource('resourceParam7023') + '',//标签
					width : 100,
					dataIndex : 'dataEntityCategoryTagName',
					editor : new Ext.form.ComboBox({
						store : new Ext.data.JsonStore({
							url : '../JSON/datacenter_DataCenterRemote.getChildCategoryInsByDataCenterId',
							method : 'GET',
							root : 'results',
							fields : [{
										name : 'text',
										mapping : 'text'
									}, {
										name : 'dataEntityID',
										mapping : 'dataEntityID'
									}, {
										name : 'dataCenterID',
										mapping : 'dataCenterID'
									}]
						}),
						triggerAction : 'all',
						width : 200,
						valueField : 'text',
						displayField : 'text',
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
							grid.getSelectNodes()[0].set('dataEntityCategoryTagName', record
											.get("text"));
							grid.getSelectNodes()[0].set('dataEntityCategoryTag', record
											.get("dataEntityID"));
							grid.getSelectNodes()[0].set('dataEntityCategoryTagCenterID', record
											.get("dataCenterID"));
						},
						listeners : {
							beforequery : function(e) {
								e.combo.getStore().setBaseParam("dataEntityID",
										self.parameters["EdmCategoryInstanceId"])
								e.combo.getStore().load();
								return false;
							}
						}
					})
				}, {
					header : '' + getResource('resourceParam7024') + '',//映射
					width : 300,
					dataIndex : 'sourceCategoryInsPath',
					renderer : getDataRelationView
				}, {
					width : 30,
					header : '&nbsp;',
					renderer : function() {
						return '';
					}
				}]
		}),
		autoScroll : true,
		autoExpandeColumn : 'sourceCategoryInsPath',
		listeners : {
			cellclick : function(grid, row, col) {
				var dataIndex = grid.getColumnModel().getColumnAt(col).dataIndex;
				var record = store.getAt(row);
				if (dataIndex == 'value') {
					if (record.get("realIsRef") == "9") {
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
								}));
					} else {
						if (record.get('extendsTypeRealName') == 'date') {
							grid.getColumnModel().setEditor(col,
									new Ext.form.DateField({
												selectOnFocus : true,
												format : 'Y-m-d'
											}))
						} else if (record.get('extendsTypeRealName') == "file") {
							var fileName = Ext.isIE
									? encodeURI(encodeURI(record.get('value')))
									: record.get('value');
							var config = {
								title : ""+getResource('resourceParam470')+"",
								width : 300,
								height : 110,
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
							var valueObject = {
								name : record.get("value"),
								fileId : record.get("fileID")
							}
							fileUploadDialog.initWindow(config, valueObject,
									fileUploadCallback);
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
										validator : function(value) {
											var flag = record.get('extendsTypeRealName');
											if ("double" == flag
													|| "float" == flag) {
												var reg = /^-?((\d+\.\d+)|(\d+))$/;
												if (reg.test(value)) {
													return true;
												} else {
													this.invalidText = ""+getResource('resourceParam1083')+"!";
													return false;
												}
											}
											if ("integer" == flag) {
												var reg = /^(\-?[0-9][0-9]*)*$/;
												if (reg.test(value)) {
													return true;
												} else {
													this.invalidText = ""+getResource('resourceParam1083')+"!";
													return false;
												}
											}
											return true;
										}
									}))
						}
					}
				}
				if(self.parameters["enableEdit"]&&dataIndex == "sourceCategoryInsPath"&&(record.get("inout") != 1||(record.get("inout") == 1&&record.get("sourceCategoryInsPath")!=""))&&record.get("sourceCategoryInsPath")!=undefined){
					if(record.get("isSourceDataUpedRevision")){
						Ext.MessageBox.show({
									title : ''+getResource('resourceParam575')+'',
									icon : Ext.MessageBox.QUESTION,
									width : 230,
									msg : '您好，'+getResource('resourceParam512')+''+getResource('resourceParam510')+'从'+getResource('resourceParam474')+'源获取新'+getResource('resourceParam462')+''+getResource('resourceParam474')+'？'+getResource('resourceParam505')+'请选“'+getResource('resourceParam512')+'”，'+getResource('resourceParam503')+'“'+getResource('resourceParam510')+'”则重新'+getResource('resourceParam503')+'映射'+getResource('resourceParam474')+'源！',
									buttons : Ext.MessageBox.YESNOCANCEL,
									fn : function(id) {
										if(id == "no"){
											dataCenterData.init(self.parameters["EdmCategoryInstanceId"],self.parameters["dataCategoryPrefixID"],self.parameters["isProject"],setDataRelationCallback);
										}else if(id=="yes"){
											updateDataEntityByRelationCallback(record);
										}else{
											return false;
										}
									}
								})
						return;
					}
					dataCenterData.init(self.parameters["EdmCategoryInstanceId"],self.parameters["dataCategoryPrefixID"],self.parameters["isProject"],
								setDataRelationCallback);
				}
			},
			beforeedit : function(e) {
				var dataIndex = e.grid.getColumnModel().getColumnAt(e.column).dataIndex;
				if(!self.parameters["enableEdit"]){
					return false;
				}
				if (e.record.get('disableCheck')) {
					if (e.field !== 'value'&&e.field != "dimension"&&e.field!="unit"&&e.field!="description") {
						return false;
					}
				}
				if (("file" == e.record.get("extendsTypeRealName")
						|| "dataset" == e.record.get("extendsTypeRealName"))
						&& e.field == 'value') {
					return false;
				}
				if(e.field == "dataEntityTypeName"&&e.record.get("dataEntityID") != undefined){
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
				if(dataIndex!="dataEntityCategoryTagName"&&e.record.get("sourceCategoryInsPath")!=""&&e.record.get("sourceCategoryInsPath")!=undefined){
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
				if(dataIndex == "dimension"){
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
	function beforeEdit(e) {
		if (rowindex == e.row) {
			return false;
		}
	}
	grid.on('rowclick', function(grid, rowindex) {
		grid.stopEditing();
		selectChildren(store.getAt(rowindex), sm.isSelected(rowindex));
		selectParent(store.getAt(rowindex), sm.isSelected(rowindex));
//		Ext.Ajax.request({
//			url : '../JSON/privilege_DataPrivilegeRemote.getDataEntityManipultations',
//			method : 'POST',
//			success : function(response, options) {
//				var obj = Ext.util.JSON.decode(response.responseText);
//				if (obj.modify == false) {
//					Ext.getCmp('dataObjectColumnTreeAdd').disable();
//					Ext.getCmp('dataObjectColumnTreeSave').disable();
//					Ext.getCmp('dataObjectColumnTreeEdit').disable();
//					grid.on('beforeedit', beforeEdit);
//				} else {
//					Ext.getCmp('dataObjectColumnTreeAdd').enable();
//					Ext.getCmp('dataObjectColumnTreeSave').enable();
//					Ext.getCmp('dataObjectColumnTreeEdit').enable();
//					grid.un('beforeedit', beforeEdit);
//				}
//				if (obj.del == false) {
//					Ext.getCmp('dataObjectColumnTreeDel').disable();
//				} else {
//					Ext.getCmp('dataObjectColumnTreeDel').enable();
//				}
//			},
//			disableCaching : true,
//			autoAbort : true,
//			params : {
//				dataId : grid.getStore().getAt(rowindex).get('dataEntityID')
//			}
//		});
	})
	
	function getDataRelationView(v, p, r) {
		if (v == "" || v == undefined) {
			if (r.get("inout") != 1 && v != undefined) {
				return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;vertical-align:middle;'>"+getResource('resourceParam459')+"</a>";
			} else {
				return "";
			}
		} else {
			if (r.get("isSourceDataUpedRevision")) {
				return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;vertical-align:middle;color:red;' title='源'+getResource('resourceParam474')+''+getResource('resourceParam619')+''+getResource('resourceParam478')+''>"
						+ v + "</a>";
			} else {
				return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;vertical-align:middle;'>"
						+ v + "</a>";
			}
		}
	}
	store.on('beforeexpandnode', function(store, rc) {
		store.on('beforeload', function(store, options) {
			this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/dataEntity_DataEntityRemote.getDataChildEntities'
			})
			options.params = Ext.apply(options.params, {
						// disableCheck : true,
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
dataObjectTreeGridView.setParameters = function() {
	for (var i = 0; i < arguments.length; i++) {
		var param = arguments[i];
		for (var key in param) {
			this.parameters[key] = param[key];
		}
	}
}
dataObjectTreeGridView.setParameter = function(key, value) {
	this.parameters[key] = value;
}
