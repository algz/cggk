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
			},{
				name : 'fileID',
				mapping : 'fileid',
				type : 'string'
			},{
				name : 'checkStr',
				type : 'string'
			},{
				name : 'dirtyField',
				type : 'string'
			}]);
	physicTypeTreeGridPanel.store = new Ext.ux.maximgb.tg.sysEditTreeGridStore(
			{
				autoLoad : true,
				listeners : {
					load:function(s){
						for(var i=0;i<s.getCount();i++){
							var record = s.getAt(i);
							if(record.get('dataEntityType')=='boolean'){
								if(record.get('value')=='true'){
									record.set('value','是');
									record.commit();
								}else if(record.get('value')=='false'){
									record.set('value','否');
									record.commit();
								}
							}
						}
					}
				},
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
	var isArrayColumn = new Ext.ux.grid.CheckColumn({
				header : '' + getResource('resourceParam7019') + '',// 数组化
				width : 80,
				dataIndex : 'isArray',
				renderer : function(v, p, record){
				        p.css += ' x-grid3-check-col-td'; 
				        if(record.get('disableCheck')){
				        	p.css += ' x-item-disabled';
				        }
				        return '<div class="x-grid3-check-col'+(v?'-on':'')+' x-grid3-cc-'+this.id+'">&#160;</div>';
			    },
			    onMouseDown : function(e, t){
			    	// Update By YangJin'gang At 20101011 10:28 begin
			    	if (physicsTypeMain.approvalModel) {
			    		e.stopEvent();
			    		return;
			        }
			    	// Update By YangJin'gang At 20101011 10:28 end
	        		if(t.className && t.className.indexOf('x-grid3-cc-'+this.id) != -1){
				    	var index = this.grid.getView().findRowIndex(t);
				        var record = this.grid.store.getAt(index);
				        if(record.get('disableCheck')){
				        	return;
				        }
				        record.set('value',"");
				        if(record.data[this.dataIndex]){
				        	record.set("dimension",'1');
				        }
			            e.stopEvent();
			            record.set(this.dataIndex, !record.data[this.dataIndex]);
			        }
			    }
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
								allowBlank : false,
								maxLength : 50,
								maxLengthText : '长度不能超过50'
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
					header : '' + getResource('resourceParam481') + '',
					width : 150,
					dataIndex : 'dataEntityTypeName',
					editor : new Ext.form.ComboBox({
						store : new Ext.data.Store({
					        proxy : new Ext.data.HttpProxy({
					                    method : 'POST',
					                    url : "../JSON/dynamicmodel_datatype.getPhysicTypeDataTypeList"
					                }),
					        reader : new Ext.data.JsonReader({
					                    totalProperty : 'totalProperty',
					                    root : 'results'
					                }, [{ name : 'dataTypeId'
			                        }, {
			                            name : 'dataType'
			                        }, {
			                            name : 'dataTypeName'
			                        }, {
			                            name : 'rank'
			                        }])
					    }),
						triggerAction : 'all',
						listWidth : 250,
						valueField : 'dataTypeName',
						displayField : 'dataTypeName',
						forceSelection : true,
						editable : true,
						lazyRender : true,
						queryParam : 'datatypeName',
						mode : 'remote',
						enableKeyEvents : true,
        				disableKeyFilter : true,
						minChars : 0,
        				pageSize : 5,
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
								if(physicTypeTreeGridPanel.keyPressed){
									e.combo.getStore().baseParams = {
										start : 0,
										limit : 5,
										datatypeId : physicsTypeMain.dataCenterId||dataCenterId,
										datatypeName : e.combo.getRawValue()
									};
								}else{
									e.combo.getStore().baseParams = {
										start : 0,
										limit : 5,
										datatypeId : physicsTypeMain.dataCenterId||dataCenterId
									};
								}
								physicTypeTreeGridPanel.keyPressed = false;
								delete e.combo.lastQuery;
							}
						}
					})
				}, isArrayColumn, {
					header : '' + getResource('resourceParam853') + '',
					width : 50,
					dataIndex : 'dimension',
					editor : new Ext.form.TextField({
						allowBlank : false,
						validator : function(value) {
							if (Ext.util.Format.trim(value).length == 0) {
								this.invalidText = ""
										+ getResource('resourceParam1084') + "";
								return false;
							}
							var reg = /^[1-9]+\d*$/;
							if (reg.test(value)) {
								if (value > 10) {
									this.invalidText = "'+getResource('resourceParam7039')+'！";// 维度不能大于10
									return false;
								} else
									return true;
							} else {
								this.invalidText = "您"
										+ getResource('resourceParam494') + "的"
										+ getResource('resourceParam474')
										+ "必须为大于0的整数！";
								return false;
							}
						}
					}),
					renderer : function(value, p, record) {
						if (!record.get("isArray")) {
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
					header : '' + getResource('resourceParam1282') + '',
					width : 150,
					dataIndex : 'value',
					renderer : function(value, p, record) {
						if (value == undefined) {
							return "";
						}
						if ("file" == record.get('dataEntityRealType')&&!record.get("isArray")) {
							return "";
//							if (value == "") {
//								return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;'>"+getResource('resourceParam1085')+"</a>";
//							} else {
//								return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;'>"
//										+ value + "</a>";
//							}
						}else if(record.get("isArray")){
							return "<a href='javascript:void(0)' style='color:#0000FF;text-decoration:underline;'>"	+ value + "</a>";
						} else {
							return "<div title="+value+">"+value+"</div>";
						}
					}
				}]
		}),
		stripeRows : true,
		plugins : [isArrayColumn],
		autoExpandeColumn : 'text',
		listeners : {
			validateedit : function(obj){
				if(obj.originalValue!=obj.value){
					var dataIndex = obj.grid.getColumnModel().getColumnAt(obj.column).dataIndex;
					var record = physicTypeTreeGridPanel.store.getAt(obj.row);
					var dirtyField = record.get('dirtyField');
					if(dirtyField!=undefined){
						var dirtyFieldNewItem = '';
						if(dataIndex=='text'){
							dirtyFieldNewItem = 'dataEntityName';
						}else if(dataIndex=='dataEntityTypeName'){
							dirtyFieldNewItem = 'dataEntityTypeName';
						}else if(dataIndex=='isArray'){
							dirtyFieldNewItem = 'isArray';
						}else if(dataIndex=='dimension'){
							dirtyFieldNewItem = 'dimension';
						}else if(dataIndex=='value'){
							dirtyFieldNewItem = 'value';
						}
						if(dirtyFieldNewItem!=''){
							var darr = dirtyField.split(',');
							var flag = true;
							for (var i = 0; i < darr.length; i++) {
								if(darr[i]==dirtyFieldNewItem){
									flag = false;
									break;
								}
							}
							if(flag==true){
								darr.push(dirtyFieldNewItem);
								record.set('dirtyField',darr.join(','));
							}
						}
					}
				}
			},
			celldblclick : function(grid, row, col){
				var status = physicTypeTreeGridPanel.store.getAt(row).get('status');
				if(physicsTypeMain.modelEdit == false||status==1||status==4||physicsTypeMain.hm){
					return false;
				}
			},
			cellclick : function(grid, row, col) {
				var dataIndex = grid.getColumnModel().getColumnAt(col).dataIndex;
				var record = physicTypeTreeGridPanel.store.getAt(row);
				if (dataIndex == 'value') {
					var typeName = record.get('dataEntityTypeName');
					if (record.get('dataEntityRealType') == 'date') {
						grid.getColumnModel().setEditor(col,
								new Ext.form.DateField({
											selectOnFocus : true,
											format : 'Y-m-d'
										}))
					} else if (record.get('dataEntityRealType') == "file"&&!record.get("isArray")) {
						/** update by CaoRT at 2011-5-25 文件类型不允许添加默认值
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
								fileId : record.get("fileID"),
								checkStr : record.get("checkStr")
							}
							function fileUploadCallback(winDia, form, resp, flag) {
								if (flag) {
									winDia.window.close();
									record.set("fileID", resp.result.fileId);
									var strFileName = resp.result.fileName;
									strFileName = strFileName.substring(strFileName.lastIndexOf('\\') + 1);
									record.set("value", strFileName);
									
									// record.set("value", resp.result.fileName);
									return;
								} else {
									Ext.Msg.alert("" + getResource('resourceParam575') + "", ""
													+ getResource('resourceParam1073') + "");
								}
							}
							
							fileUploadDialog.initWindow(config, valueObject,
									fileUploadCallback);
						*/
						return true;
					} else if (record.get('dataEntityRealType') == 'boolean') {
						grid.getColumnModel().setEditor(col,
								new Ext.form.ComboBox({
									id : 'newDataObjectValue',
									name : 'value',
									store : new Ext.data.SimpleStore({
												data : [["是", "是"],
														["否", "否"]],
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
					} else if(record.get('isRef')==9) {
						grid.getColumnModel().setEditor(col,
							new Ext.form.ComboBox({
							store : new Ext.data.JsonStore({
								url : '../JSON/dataModel_dataModelRemote.getChildDataModelEnumType',
								method : 'GET',
								fields : [{
											name : 'dataEntityName',
											mapping : 'dataEntityName'
										}]
							}),
							triggerAction : 'all',
							width : 150,
							valueField : 'dataEntityName',
							displayField : 'dataEntityName',
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
										.set('value', record
														.get("dataEntityName"));
							},
							listeners : {
								beforequery : function(e) {
									e.combo.getStore().setBaseParam("dataCenterID",record.get('dataEntityType'))
									e.combo.getStore().load();
									return false;
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
				
				if(e.record.get("isArray")&&e.field == 'value'){
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
				physicsTypeMain.dataEntityType = e.record.get('dataEntityType');
			},
			afteredit : function(e) {
				if (e.record.get('dataEntityRealType') == 'date'
						&& e.field == 'value') {
					if(e.record.get('value')!=''){//解决日期删除后格式化错误的问题
						var date = new Date(e.record.get('value'));
						e.record.set('value', date.dateFormat('Y-m-d'));
					}
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
				if(physicsTypeMain.userid==1&&physicsTypeMain.loginuserid!=1){
					physicsTypeTreeGridPanel.getTopToolbar().disable();
					return false;
				}
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
				if(physicsTypeMain.modelEdit == false||physicsTypeMain.approvalModel||physicsTypeMain.hm){
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
				if(physicsTypeMain.userid==1&&physicsTypeMain.loginuserid!=1){
					return false;
				}
			})
	function physicsTypeTreeGridBeforeLoad(store, options) {
							options.params = Ext.apply(options.params, {
										dataCenterID : physicTypeTreeGridPanel.rc.get("dataEntityType"),
										parentDataEntityID : physicTypeTreeGridPanel.rc.get("id"),
										disableCheck : true
									});
						}
	physicTypeTreeGridPanel.store.on('beforeexpandnode', function(store, rc) {
				physicTypeTreeGridPanel.rc = rc;
				store.on('beforeload', physicsTypeTreeGridBeforeLoad);
			})
	physicTypeTreeGridPanel.store.on('expandnode', function(store, rc) {
				selectChildren(rc, sm.isSelected(store.indexOf(rc)));
				store.un('beforeload', physicsTypeTreeGridBeforeLoad);
				delete physicTypeTreeGridPanel.rc;
			})

	var physicsTypeTreeGridPanel = new Ext.Panel({
		layout : 'fit',
//		region : 'center',
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
															var r = physicsTypeMain.grid.getSelectionModel().getSelected();
															var rowName = r.get('datatypeName');
															physicsTypeMain.ds.load({
																params: {
															        start: 0,          
															        limit: physicsTypeMain.sizePerPage
															    },
																callback : function(s){
																	physicsTypeMain.grid
																			.getSelectionModel()
																			.selectRow(physicsTypeMain.ds.findExact('datatypeName',rowName));
																}
															});
															/**
															 * 删除成功后，不再进行重加载 at 2011-05-24 by liuxj
															 */
															//physicTypeTreeGridPanel.grid
															//			.getStore().load();
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
								if(record.get('dataEntityType')=='boolean'){
									if(record.get('value')=='是'){
										record.set("value",'true');
									}else if(record.get('value')=='否'){
										record.set("value",'false');
									}
								}
								addlist.push(record)
							}
						}, physicTypeTreeGridPanel.store)
				var DataModelVos = Seam.Remoting
						.createType("com.sysware.edm.DataModel.DataModelVo");
				var list = new Array();
				var modifiedRecords = physicTypeTreeGridPanel.store
						.getModifiedRecords();
				for (var i = 0; i < modifiedRecords.length; i++) {
					if(modifiedRecords[i].get('dataEntityType')=='boolean'){
						if(modifiedRecords[i].get('value')=='是'){
							modifiedRecords[i].set("value",'true');
						}else if(modifiedRecords[i].get('value')=='否'){
							modifiedRecords[i].set("value",'false');
						}
					}
					if (hasReName(modifiedRecords[i].get("text"))) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam651')
											+ '',
									msg : '' + getResource('resourceParam7035')
											+ '：<span style="color:blue;">'
											+ modifiedRecords[i].get("text")
											+ '       </span>',// 已存在重名对象
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
								.setDataCenterID(physicsTypeMain.dataCenterId||dataCenterId);
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
						DataModelVo.setFileid(modifiedRecords[i].get("fileID"));
						DataModelVo.setDirtyField(modifiedRecords[i].get("dirtyField"));
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
											+ '       </span>',// 已存在重名对象
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
					DataModelVo.setDataCenterID(physicsTypeMain.dataCenterId||dataCenterId);
					DataModelVo.setDimension(addlist[j].get("dimension"));
					DataModelVo.setOrderNumber(addlist[j].get("orderNumber"));
					DataModelVo.setIsArray(addlist[j].get("isArray"));
					DataModelVo.setVersion(addlist[j].get("version"));
					DataModelVo.setStatus(addlist[j].get("status"));
					DataModelVo.setDirtyField('all');
					DataModelVo.setFileid(addlist[j].get("fileID"));
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
										var r = physicsTypeMain.grid.getSelectionModel().getSelected();
										var rowName = r.get('datatypeName');
										physicsTypeMain.ds.load({
											params: {
										        start: 0,          
										        limit: physicsTypeMain.sizePerPage
										    },
											callback : function(s){
												physicsTypeMain.grid
														.getSelectionModel()
														.selectRow(physicsTypeMain.ds.findExact('datatypeName',rowName));
											}
										});
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
							url : '../JSON/dataModel_dataModelRemote.getChildDataModelPhysicType'
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
								var r = physicsTypeMain.grid
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
							""+getResource('resourceParam7040')+"！");// 不能排序
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
							""+getResource('resourceParam7041')+"！");// 已经是最顶端了
					return false;
				}
				var preRecord = preInfo.rc;
				var preOrderNumber = preRecord.get("orderNumber");
				physicTypeTreeGridPanel.store.remove(theRecord);
				physicTypeTreeGridPanel.store.insert(preInfo.index - 1,
						theRecord);
				theRecord.set("orderNumber", preOrderNumber);
				preRecord.set("orderNumber", theOrderNumber);
				theRecord.set("dirtyField","orderNumber");
				preRecord.set("dirtyField","orderNumber");
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
							""+getResource('resourceParam7040')+"！");// 不能排序
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
				theRecord.set("dirtyField","orderNumber");
				nexRecord.set("dirtyField","orderNumber");
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
