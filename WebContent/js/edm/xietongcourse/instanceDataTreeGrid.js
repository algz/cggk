var instanceDataTreeGrid = {}
instanceDataTreeGrid.init = function() {
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
			},{
				name : 'checkStr',
				type : 'string'
			}]);
	this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/dataEntity_DataEntityRemote.queryDataEntities'
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
	var sm = new Ext.grid.CheckboxSelectionModel({});
	var lineNum = new Ext.grid.RowNumberer({})
	// new Ext.grid.GridPanel()
	var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({
		store : store,
		sm : sm,
		bbar : new Ext.ux.maximgb.tg.PagingToolbar({
					store : store,
					displayInfo : true,
					pageSize : 23
				}),
		master_column_id : 'text',
		cm : new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [lineNum, sm, {
					id : 'text',
					header : ''+getResource('resourceParam480')+'',
					width : 300,
					dataIndex : 'text'
				}, {
					header : ''+getResource('resourceParam481')+'',
					width : 150,
					dataIndex : 'dataEntityTypeName'
				}, {
					header : ''+getResource('resourceParam853')+'',
					width : 50,
					dataIndex : 'dimension',

					renderer : function(value, p, record) {
						if (value == undefined) {
							return 1;
						} else {
							return value;
						}
					}
				}, {
					header : ''+getResource('resourceParam511')+'',
					width : 200,
					dataIndex : 'value',
					renderer : function(value, p, record) {
						if (value == undefined) {
							return "";
						}
						if ("file" == record.get("extendsTypeRealName")) {
							if (value == "") {
								if (window.parent.historyViewModel) {
									return "没有"+getResource('resourceParam469')+"";
								}
								return "";
							} else {
								return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;'>"
										+ value + "</a>";
							}
						} else {
							return value;
						}
					}
				}, {
					header : '单位',
					width : 20,
					dataIndex : 'unit',
					renderer : function(value, p, record) {}
				},{
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
					header : ''+getResource('resourceParam474')+'来源位置',
					width : 300,
					dataIndex : 'sourceCategoryInsPath',
					renderer : function(v) {
						if (v == undefined || v == "") {
							return "";
						}
						var path = v;
						var imgCls = '<img src="../base/icons/edm/datacenterIn.png" title="入" width=14 height=14 style="vertical-align:middle;"/>';
						var title = path + "&#13;";
						var value = "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;vertical-align:middle;'>"
								+ imgCls + path + "</a>";
						return "<div title='" + title + "'>" + value + "</div>";
					}
				}]
		}),
		// stripeRows : true,
		autoScroll : true,
		autoExpandeColumn : 'text',
		listeners : {
			cellclick : function(grid, row, col) {

				var dataIndex = grid.getColumnModel().getColumnAt(col).dataIndex;
				var record = store.getAt(row);
				if (dataIndex == 'value') {
					if (record.get("isRef") == 9) {
						grid.getColumnModel().setEditor(col,
								new Ext.form.ComboBox({
									fieldLabel : ''+getResource('resourceParam481')+'',
									store : new Ext.data.JsonStore({
										method : 'GET',
										url : '../JSON/dataModel_dataModelRemote.getChildDataModel',
										root : 'results',
										fields : [{
													name : 'dataTypeId',
													mapping : 'dataTypeId'
												}, {
													name : 'dataType',
													mapping : 'dataType'
												}, {
													name : 'dataEntityName',
													mapping : 'dataEntityName'
												}, {
													name : 'rank',
													mapping : 'rank'
												}, {
													name : 'value',
													mapping : 'value',
													type : 'string'
												}]
									}),
									triggerAction : 'all',
									width : 150,
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
											e.combo.getStore().load();
											return false;
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
						} else if (record.get('extendsTypeRealName') == 'file') {
							if (grid.getView().getCell(row, col).innerText == '没有'+getResource('resourceParam469')+'') {
								return false;
							}
							var config = {
								title : ""+getResource('resourceParam470')+"",
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
									Ext.Msg.alert(""+getResource('resourceParam575')+"", ""+getResource('resourceParam1073')+"");
								}
							}
							var valueObject = {
								name : record.get("value"),
								fileId : record.get("fileID"),
								checkStr : record.get("checkStr")
							}
							fileUploadDialog.initWindow(config, valueObject,
									callback, function(uploadForm, win) {
										if (window.parent.historyViewModel) {
											win.remove(uploadForm);
											win.buttons[0].disable();
											win.buttons[1].disable();
										}
									});
						} else if (record.get('extendsTypeRealName') == 'boolean') {
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
											if(record.get('checkStr') != undefined&&record.get('checkStr') != ""){
												var regstr = record.get('checkStr');
												var reg;
												if(regstr.indexOf("/^") != 0||regstr.substr(regstr.length-1) != "/"){
													reg = new RegExp(regstr);
												}else{
													reg = eval(record.get('checkStr'));
												}
												if(!reg.test(value)){
													this.invalidText = "必须符合"+record.get("dataEntityTypeName")+"的格式";
													return false;
												}
											}
											return true;
										}
									}))
						}
					}
				}
				if (col == 8) {
					// var date = new Date(store.getAt(row).get('value'));
					// alert(date.dateFormat('Y-m-d'))
				}
			},
			beforeedit : function(e) {
				if (e.record.get('disableCheck') === true) {
					if (e.field !== 'value') {
						return false;
					}
				}
				if(e.field == "dataEntityTypeName"&&e.record.get("dataEntityID") != undefined){
					return false;
				}
				if (("file" == e.record.get("extendsTypeRealName")
						|| "dataset" == e.record.get("extendsTypeRealName") || "2" == e.record
						.get("isRef"))
						&& e.field == 'value') {
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
			},
			afteredit : function(e) {
				if (e.record.get('extendsTypeRealName') == 'date'
						&& e.field == 'value') {
					var date = new Date(e.record.get('value'));
					e.record.set('value', date.dateFormat('Y-m-d'));
				}
			}

		}
	});
	function selectChildren(rc, selectFlag) {
		return;
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
		return;
		var parentNode = store.getNodeParent(rc);
		if (parentNode !== undefined && !selectFlag) {
			var rowIndex = store.indexOf(parentNode);
			sm.deselectRow(rowIndex, false);
			selectParent(parentNode, selectFlag);
		}
	}
	grid.on('rowclick', function(grid, rowindex) {
				return;
				selectChildren(store.getAt(rowindex), sm.isSelected(rowindex));
				selectParent(store.getAt(rowindex), sm.isSelected(rowindex));
			})
	store.on('beforeexpandnode', function(store, rc) {
		store.on('beforeload', function(store, options) {
			this.proxy = new Ext.data.HttpProxy({
				method : 'POST',
				url : '../JSON/dataEntity_DataEntityRemote.queryDataChildEntities'
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
						inout : rc.get("inout")
					});
		});
	})
	store.on('expandnode', function(store, rc) {
				selectChildren(rc, sm.isSelected(store.indexOf(rc)));
				grid.getView().refresh();
			})
	return grid;
}
