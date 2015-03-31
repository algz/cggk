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
var wareHouseAttribute = {
	start : 0,
	limit : 10,
	args : {
		start : 0,
		limit : 10
	},
	baseargs : null
}
// typeid 物理类型id ,name 库名称， id 库ID
wareHouseAttribute.init = function(typeid, wsname, wsid, desc) {

	wareHouseAttribute.typeid = typeid;
	wareHouseAttribute.wsid = wsid;
	wareHouseAttribute.item1 = new Ext.Panel({
				region : 'north',
				layout : 'fit',
				height : 365,
				split : true,
				border : false

			});
	wareHouseAttribute.item3 = new Ext.Panel({
				layout : 'fit',
				border : false
			});
	wareHouseAttribute.item2 = new Ext.Panel({
				region : 'center',
				layout : 'fit',
				border : false,
				split : true,
				items : [wareHouseAttribute.item3]
			});

	wareHouseAttribute.attributePanel = new Ext.Panel({
				// title : wsname,
				layout : 'border',
				border : false,

				items : [wareHouseAttribute.item1, wareHouseAttribute.item2]
			});
	var conn = synchronize.createXhrObject();
	var url = "../JSON/warehouseobject_WarehouseObjectRemote.getPhysicsObjectHead?typeId="
			+ typeid + "&d=" + new Date().getTime();
	conn.open("GET", url, false);
	conn.send(null);
	var respText = conn.responseText;
	wareHouseAttribute.headtext = respText;
	var form = wareHouseAttribute.addDataInit(wsname, typeid, desc);
	var head = wareHouseAttribute.format(wareHouseAttribute.headtext, wsname,
			wsid, typeid);
	wareHouseAttribute.item3.insert(0, form);

	wareHouseAttribute.item1.insert(0, head);
	wareHouseAttribute.attributePanel.doLayout();

	return wareHouseAttribute.attributePanel;
}
wareHouseAttribute.format = function(text, name, wsid, typeid) {
	Ext.QuickTips.init();
	var sm = new Ext.grid.CheckboxSelectionModel({
				listeners : {
					selectionchange : function(sm) {
						// if (sm.getCount()) {
						// Ext.getCmp('delete').enable();
						// } else {
						// Ext.getCmp('delete').disable();
						// }
						// if (sm.getCount() == 1) {
						// Ext.getCmp('update').enable();
						// } else {
						// Ext.getCmp('update').disable();
						// }
					},
					rowselect : function(sm, rowIndex, record) {
						// if (sm.getCount() == 1) {
						// var dataType = record.get("dataType");
						// var cneterpanel = Ext.getCmp('centerpanel').items
						// .get(0);
						// Ext.getCmp('centerpanel').remove(cneterpanel);
						// var attributePanel = wareHouseAttribute.init(
						// dataType, record.get("categoryName"),
						// record.get("categoryId"));
						// Ext.getCmp('centerpanel').add(attributePanel);
						// Ext.getCmp('centerpanel').doLayout();
						// } else {
						// }
					}
				}

			});
	var base = wareHouseAttribute.headtext.split("\?")[0];
	var tempbase = base.substr(1, base.length - 2);
	var headgruop = wareHouseAttribute.headtext.split("\?")[1];
	var colsindex = wareHouseAttribute.headtext.split("\?")[2];
	// wareHouseAttribute.dindex = colsindex;
	// alert(colsindex);

	var header = Ext.util.JSON.decode(base);
	var hh = Ext.util.JSON.decode(headgruop);

	var cols = Ext.util.JSON.decode(colsindex);
	var headColMod = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : header
	});
	var strurl = '../JSON/warehouseobject_WarehouseObjectRemote.getWareHouseData?wsid='
			+ wsid + '&pid=' + typeid;
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
	wareHouseAttribute.ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader

			});
	myGrid.loadvalue(wareHouseAttribute.ds, wareHouseAttribute.args,
			wareHouseAttribute.baseargs);
	wareHouseAttribute.ds.reload();
	wareHouseAttribute.grid = new Ext.grid.GridPanel({
		tbar : [{
			text : '' + getResource('resourceParam477') + '',
			iconCls : 'add1',
			id : 'buttonAdd',
			listeners : {
				'click' : function() {
					wareHouseAttribute.grid.getSelectionModel()
							.clearSelections();
					var wareHouseId = new Ext.form.TextField({
								id : 'wareHouseId',
								name : 'wareHouseId',
								allowBlank : false,
								maxLength : 50,
								inputType : 'hidden',
								readOnly : true,
								value : wareHouseAttribute.wsid
							});
					Ext.apply(wareHouseId, {
								type : 'string'
							});
					var whPhysicsId = new Ext.form.TextField({
								id : 'whPhysicsId',
								name : 'whPhysicsId',
								allowBlank : false,
								maxLength : 50,
								inputType : 'hidden',
								readOnly : true,
								value : wareHouseAttribute.typeid
							})
					Ext.apply(whPhysicsId, {
								type : 'string'
							});
					var addForm = new Ext.form.FormPanel({
						fileUpload : true,
						bodyStyle : 'padding:5px 5px',
						border : false,
						autoScroll : true,
						labelWidth : 300,
						defaults : {
							anchor : '70%',
							// allowBlank : false,
							msgTarget : 'side',
							labelAlign : 'right',
							style : 'margin-bottom: 5px;'
						},
						items : [wareHouseId, whPhysicsId],
						buttons : [{
							text : '' + getResource('resourceParam479') + '',
							handler : function() {
								if (addForm.getForm().isValid()) {
									addForm.getForm().submit({
										url : '../FILEUP/fileHandleRemote.uploadFile2?start=1',
										method : 'post',
										success : function(form, action) {
											var dd = Seam.Remoting
													.createType("com.sysware.edm.dataentity.DataEntity");
											var dl = new Array();

											addForm.items.each(function(item) {

												if (item.id != 'wareHouseId'
														&& item.id != 'whPhysicsId') {
													// alert(item.fieldLabel +
													// "x"
													// + item.getValue()
													// + "x");

													var de = Seam.Remoting
															.createType("com.sysware.edm.dataentity.DataEntity");
													de
															.setDcategoryinstanceid(wareHouseId
																	.getValue());
													// de.setDataEntityID(StrUtil.getGuid());
													de
															.setCustomTypeItemID(
																	item.id
																			.substring(item.id
																					.lastIndexOf("_")
																					+ 1),
																	item.id.length);

													de
															.setCustomTypeParentID(item.id
																	.substring(
																			0,
																			item.id
																					.lastIndexOf("_")));
													de.setFileID("");
													if (item.type == 'date') {
														de
																.setValue(Ext.util.Format
																		.date(
																				item
																						.getValue(),
																				'Y-m-d'));

													} else if (item.type == 'file') {
														for (var i = 0; i < action.result.result.length; i++) {
															if (action.result.result[i].fieldName == item.id) {
																de
																		.setValue(action.result.result[i].fileName);
																de
																		.setFileID(action.result.result[i].fileId);
															}
														}
													} else {
														de.setValue(item
																.getValue());

													}

													de.setUpdateStatus(0);
													de.setUpdateCount(0);
													de.setTreePath("");
													de.setRevision(0);
													// de
													// .setParentDataEntityID(parentDataEntityID);
													de.setOrderNumber(0);
													de.setInout(0);

													de.setDimension("1");

													dl.push(de);
												}
											});
											dd.setDelist(dl);
											Seam.Component
													.getInstance("warehouseobject_WarehouseObjectRemote")
													.addData(dd,
															function(result) {
																var obj = Ext.util.JSON
																		.decode(result);
																if (obj.success) {
																	Ext.example
																			.msg(
																					''
																							+ getResource('resourceParam596')
																							+ '',
																					'添加成功！');

																} else {
																	Ext.Msg
																			.alert(
																					''
																							+ getResource('resourceParam596')
																							+ '',
																					"添加失败"
																							+ obj.error);
																}
																wareHouseAttribute.ds
																		.reload();
																addForm
																		.getForm()
																		.reset();
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
					Ext.Ajax.request({
						url : '../JSON/warehouseobject_WarehouseObjectRemote.getPhysicsObjectBaseHead',
						method : 'POST',
						success : function(response, options) {

							var formjson = Ext.util.JSON
									.decode(response.responseText);
							for (var i = 0; i < formjson.length; i++) {

								var type = formjson[i]['dataEntityType'];
								var id = formjson[i]['dataIndex'];
								var name = formjson[i]['header'];
								var idpath = formjson[i]['idpath'];
								var isref = formjson[i]['isref'];
								var ctype = formjson[i]['ctype'];
								var value = formjson[i]['value'];
								// var value =
								// formjson.rows[i]['value'];
								// alert(type + id + name + idpath);

								var fomat = "";
								var precision = 0;

								if (type == "double") {
									precision = 10;
								} else if (type == "date") {
									fomat = "Y-m-d";
								}
								if (isref == 9) {
									var field = new Ext.form.ComboBox({
										store : new Ext.data.JsonStore({
											method : 'GET',
											url : '../JSON/dataModel_dataModelRemote.getChildDataModel?dataCenterID='
													+ ctype,
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
										id : idpath,
										fieldLabel : name,

										onSelect : function(r, index) {
											if (this.fireEvent('beforeselect',
													this, r, index) !== false) {
												var value = r.data[this.valueField
														|| this.displayField];
												this.setValue(value);
												this.collapse();
												this.fireEvent('select', this,
														r, index);
											}
										}
									});
									Ext.apply(field, {
												type : type
											});
									addForm.add(field);

								} else {
									var field = whExtend
											.FormControls(idpath, name, value,
													fomat, precision, type);
									Ext.apply(field, {
												type : type
											});
									addForm.add(field);
								}
								addForm.doLayout();
							}
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							typeId : wareHouseAttribute.typeid
						}
					});
					//
					wareHouseAttribute.item3 = new Ext.Panel({
								layout : 'fit',
								border : false
							});
					wareHouseAttribute.item3.add(addForm);
					wareHouseAttribute.item3.doLayout();
					var temp = wareHouseAttribute.item2.items.get(0);
					if (temp) {
						wareHouseAttribute.item2.remove(temp);
					}
					wareHouseAttribute.item2.add(wareHouseAttribute.item3);
					wareHouseAttribute.item2.doLayout();
				}
			}

		}, {
			text : '' + getResource('resourceParam475') + '',
			iconCls : 'del1',
			id : 'buttonDel',
			listeners : {
				'click' : function() {
					var sm = wareHouseAttribute.grid.getSelectionModel();
					var count = sm.getCount();
					var records = sm.getSelections();
					var record;
					if (count == 0) {
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', '请选择要删除的记录！');
						return;
					}
					var idSequence = '';
					for (var i = 0; i < count; i++) {
						record = records[i];
						idSequence += record.get('colid') + ',';

					}
					Ext.Msg.confirm('' + getResource('resourceParam1724') + '',
							"" + getResource('resourceParam475') + "的"
									+ getResource('resourceParam474') + "无法恢复，"
									+ getResource('resourceParam512') + ""
									+ getResource('resourceParam510') + "继续?",
							function(btn) {
								if (btn == 'yes') {

									Ext.Ajax.request({
										url : '../JSON/warehouseobject_WarehouseObjectRemote.delWareHouseData',
										method : 'POST',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
											if (obj.success == true) {
											} else {
												Ext.MessageBox.show({
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
											wareHouseAttribute.ds.reload();
										},
										disableCaching : true,
										autoAbort : true,
										params : {
											categoryInstanceID : idSequence
										}

									});
								}
							});

				}

			}
		},{text : '返回', //@chenw 增加返回按钮
				  	handler : function(){
					  	window.parent.cenpanel.setUrl("center.jsp?defaultDataCenter");
				 	}
				 }
		 ],
		region : 'center',
		autoScroll : true,
		// width : '100%',

		disableSelection : true,
		store : wareHouseAttribute.ds,
		sm : sm,
		cm : headColMod,
		// viewConfig : {
		// forceFit : true
		// },

		plugins : [new Ext.ux.plugins.GroupHeaderGrid({
					rows : hh,
					hierarchicalColMenu : false
				})],
		bbar : new Ext.PagingToolbar({ // 定义下方工作面板
			pageSize : 10,
			store : wareHouseAttribute.ds,
			displayInfo : true,
			displayMsg : '' + getResource('resourceParam946') + '{0} - {1} '
					+ getResource('resourceParam949') + ' {2} 行',
			emptyMsg : "" + getResource('resourceParam945') + ""
		})

	});
	// 验证权限
	wareHouseAttribute.grid.on('afterlayout', function(p) {
		var mask = new Ext.LoadMask(Ext.getBody(), {
					msg : getResource('resourceParam9122')
				});
		mask.show();
		setTimeout(function() {

			if (window.parent.historyViewModel) {
				mask.hide();
				Ext.getCmp('buttonDel').disable();
				Ext.getCmp('buttonAdd').disable();
			} else {

				Ext.Ajax.request({
					url : '../JSON/privilege_DataPrivilegeRemote.getDataCenterDataManipultations',
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);

						if (obj.del == false) {
							Ext.getCmp('buttonDel').disable();
						} else {
							Ext.getCmp('buttonDel').enable();
						}
						if (obj.modifyobject == false) {
							Ext.getCmp('buttonAdd').disable();
							wareHouseAttribute.modifyobject = false;
						} else {
							Ext.getCmp('buttonAdd').enable();
							wareHouseAttribute.modifyobject = true;
						}
						mask.hide();
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						dataId : wareHouseAttribute.wsid,
						isPermitted : false,
						isRefused : false,
						flag : false,
						compulsory : false
					}
				});
			}
		}, 100);
	});
	wareHouseAttribute.grid.on("rowclick", function(grid, rowindex, e) {

				var record = wareHouseAttribute.grid.store.getAt(rowindex);
				var temp = wareHouseAttribute.item3.items.get(0);
				if (temp) {
					wareHouseAttribute.item3.remove(temp);
				}
				// wareHouseAttribute.attributePanel.insert(1, form);
				var datepanel = wareHouseAttribute.oneDataInit(record
								.get("colid"), wareHouseAttribute.typeid,
						wareHouseAttribute.wsid);
				if (wareHouseAttribute.modifyobject) {
					datepanel.buttons[0].enable();
				} else {
					datepanel.buttons[0].disable();
				}
				wareHouseAttribute.item3.add(datepanel);
				wareHouseAttribute.item3.doLayout();
			});
	selectFormat = new Ext.Panel({
				border : false,
				layout : 'fit',
				autoScroll : true,
				items : [wareHouseAttribute.grid]
			});
	wareHouseAttribute.grid.getSelectionModel().on('selectionchange',
			function() {
				// alert('fddffd')

			})
	return selectFormat;

}
// 查看一条记录
wareHouseAttribute.oneDataInit = function(colid, typeid, wsid) {
	var dataPanel = new Ext.form.FormPanel({
				fileUpload : true,
				bodyStyle : 'padding:5px 5px',

				border : false,
				labelWidth : 300,
				autoScroll : true,
				defaults : {
					anchor : '70%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : true
				},
				// items : [],
				buttons : [{
					text : '' + getResource('resourceParam478') + '',
					listeners : {
						'click' : function() {
							var temp = wareHouseAttribute.item3.items.get(0);
							if (temp) {
								wareHouseAttribute.item3.remove(temp);
							}
							var editform = wareHouseAttribute
									.oneDataUpdateInit(colid, typeid, wsid);
							wareHouseAttribute.item3.add(editform);
							// wareHouseAttribute.attributePanel.add(newp);
							wareHouseAttribute.item3.doLayout();

						}
					}
				}]
			});
	Ext.Ajax.request({
		url : '../JSON/warehouseobject_WarehouseObjectRemote.getOneRowDataByPhysicsType',
		method : 'POST',
		success : function(response, options) {
			var formjson = Ext.util.JSON.decode(response.responseText);
			wareHouseAttribute.oneRowData = response.responseText;
			for (var i = 0; i < formjson.length; i++) {

				var type = formjson[i]['type'];
				// var id = formjson[i]['dataIndex'];
				var name = formjson[i]['dataEntityName'];
				var value = formjson[i]['value'];
				var fileid = formjson[i]['fileid'];
				var idpath = formjson[i]['idpath'];
				// alert(type + ":" + id + ":" + value + ":" + name);
				var fomat = "";
				var precision = 0;
				if (type == "double") {
					precision = 10;
				} else if (type == "date") {
					fomat = "Y-m-d";
				}
				if (type == 'file') {
					dataPanel.add(new Ext.form.DisplayField({
						fieldLabel : name,
						value : '<a   style="color:#0000FF;text-decoration:underline;" href="../dataObjectFileDownload?fileId='
								+ fileid
								+ '&fileName='
								+ encodeURI(encodeURI(value))
								+ '">'
								+ value
								+ '</a>'
					}));
				} else if (type == 'boolean') {

					dataPanel.add(new Ext.form.TextField({
								id : id,
								fieldLabel : name,
								value : value,
								name : id,
								anchor : '61.8%'
							}));
				} else {
					var bb = whExtend.FormControls('', name, value, fomat,
							precision, type);
					dataPanel.add(bb);
				}
				dataPanel.doLayout();
			}
		},
		disableCaching : true,
		autoAbort : true,
		params : {
			wsid : wsid,
			pid : typeid,
			rowId : colid
		}
	});
	// var base = wareHouseAttribute.headtext.split("-")[0];
	// var formjson = Ext.util.JSON.decode(base);

	dataPanel.doLayout();
	return dataPanel;
}
// 更新一条记录的表单
wareHouseAttribute.oneDataUpdateInit = function(colid, typeid, wsid) {
	// alert(colid);
	var currnetRowId = new Ext.form.TextField({
				id : 'currnetRowId',
				value : colid
			});
	var updataPanel = new Ext.form.FormPanel({
		fileUpload : true,
		bodyStyle : 'padding:5px 5px',
		labelWidth : 300,
		border : false,
		autoScroll : true,
		defaults : {
			anchor : '70%',
			// allowBlank : false,
			msgTarget : 'side',
			labelAlign : 'right',
			style : 'margin-bottom: 5px;',
			readOnly : false

		},
		items : [],
		buttons : [{
			text : '' + getResource('resourceParam7002') + '',// 保存
			listeners : {
				'click' : function() {

					if (updataPanel.getForm().isValid()) {

						updataPanel.getForm().submit({
							url : '../FILEUP/fileHandleRemote.uploadFile2?start=1',
							method : 'post',
							success : function(form, action) {
								var dd = Seam.Remoting
										.createType("com.sysware.edm.dataentity.DataEntity");
								var dl = new Array();

								updataPanel.items.each(function(item) {

									if (item.id != 'currnetRowId') {

										var de = Seam.Remoting
												.createType("com.sysware.edm.dataentity.DataEntity");

										de.setCustomTypeItemID(item.id);
										// alert(item.id);
										de.setFileID("");
										if (item.type == 'date') {
											de.setValue(Ext.util.Format.date(
													item.getValue(), 'Y-m-d'));

										} else if (item.type == 'file') {
											for (var i = 0; i < action.result.result.length; i++) {
												if (action.result.result[i].fieldName == item.id) {
													de
															.setValue(action.result.result[i].fileName);
													de
															.setFileID(action.result.result[i].fileId);
												}
											}
										} else {
											de.setValue(item.getValue());

										}

										dl.push(de);
									}
								});
								dd.setDelist(dl);
								Seam.Component
										.getInstance("warehouseobject_WarehouseObjectRemote")
										.updateData(dd, function(result) {
											var obj = Ext.util.JSON
													.decode(result);
											if (obj.success) {
												Ext.example
														.msg(
																''
																		+ getResource('resourceParam596')
																		+ '',
																'修改成功！');

											} else {
												Ext.Msg
														.alert(
																''
																		+ getResource('resourceParam596')
																		+ '',
																"修改成功"
																		+ obj.error);
											}

											var temp = wareHouseAttribute.item3.items
													.get(0);
											if (temp) {
												wareHouseAttribute.item3
														.remove(temp);
											}
											var editform = wareHouseAttribute
													.oneDataInit(colid, typeid,
															wsid);
											wareHouseAttribute.item3
													.add(editform);
											// wareHouseAttribute.attributePanel.add(newp);
											wareHouseAttribute.item3.doLayout();
											wareHouseAttribute.ds.reload();
										});
							}
						});

					}

					// if (updataPanel.getForm().isValid()) {
					//
					// updataPanel.getForm().submit({
					// url : '../JSON/wareHouseUpdateData',
					// method : 'post',
					// success : function(form, action) {
					// Ext.example
					// .msg(
					// ''
					// + getResource('resourceParam596')
					// + '',
					// ''
					// + getResource('resourceParam478')
					// + ' 成功！');
					//

					//
					// }
					// });
					//
					// }
				}
			}
		}]
	});

	var formjson = Ext.util.JSON.decode(wareHouseAttribute.oneRowData);
	for (var i = 0; i < formjson.length; i++) {

		var type = formjson[i]['type'];
		var id = formjson[i]['dataobjectid'] + ","

		+ type + "," + formjson[i]['isRef'] + ","
				+ formjson[i]['dataEntityName'] + ","
				+ formjson[i]['dataEntityID'] + "," + formjson[i]['idpath']
				+ "," + colid + "," + wsid;
		var label = formjson[i]['dataEntityName'];
		var name = formjson[i]['dataobjectid'] + ","

		+ type + "," + formjson[i]['isRef'] + ","
				+ formjson[i]['dataEntityName'] + ","
				+ formjson[i]['dataEntityID'] + "," + formjson[i]['idpath']
				+ "," + colid + "," + wsid;

		var value = formjson[i]['value'];
		var isref = formjson[i]['isRef'];
		var ctype = formjson[i]['dataEntityType'];

		var fomat = "";
		var precision = 0;
		if (type == "double") {
			precision = 10;
		} else if (type == "date") {
			fomat = "Y-m-d";
		}
		if (isref == 9) {
			// alert(isref + ctype);
			var field = new Ext.form.ComboBox({
				store : new Ext.data.JsonStore({
					method : 'GET',
					url : '../JSON/dataModel_dataModelRemote.getChildDataModel?dataCenterID='
							+ ctype,
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
				id : id,
				value : value,
				fieldLabel : label,
				onSelect : function(r, index) {
					if (this.fireEvent('beforeselect', this, r, index) !== false) {
						var value = r.data[this.valueField || this.displayField];
						this.setValue(value);
						this.collapse();
						this.fireEvent('select', this, r, index);
					}
				}
			})
			Ext.apply(field, {
						type : type
					});
			updataPanel.add(field);
		} else if (type == 'file') {
			var field = new Ext.ux.form.FileUploadField({
						fieldLabel : label,
						value : value,
						name : name,
						id : id,
						style : 'margin-bottom: 5px;',
						buttonText : '' + getResource('resourceParam473') + '',
						emptyText : '' + getResource('resourceParam1022') + '',
						listeners : {
							render : function() {
								// this.el.dom.parentNode.parentNode
								// .setAttribute('style',
								// 'padding-left:'
								// + paddingleft
								// + 'px');
								// this.el.dom.parentNode
								// .setAttribute(
								// 'style',
								// 'width:'
								// + item.width
								// + 'px;'
								// + 'margin-bottom: 5px;');
							}
						}
					});
			Ext.apply(field, {
						type : type
					});
			updataPanel.add(field);
		} else if (type == 'boolean') {
			var field = new Ext.form.ComboBox({
				id : id,
				fieldLabel : label,
				value : value,
				name : id,
				anchor : '61.8%',
				typeAhead : true,
				triggerAction : 'all',
				lazyRender : true,
				editable : false,

				mode : 'local',
				store : new Ext.data.ArrayStore({
							id : 0,
							fields : ["id", 'displayText'],
							data : [
									[
											''
													+ getResource('resourceParam512')
													+ '',
											''
													+ getResource('resourceParam512')
													+ ''],
									[
											''
													+ getResource('resourceParam510')
													+ '',
											''
													+ getResource('resourceParam510')
													+ '']]
						}),
				valueField : "id",
				displayField : 'displayText',
				onSelect : function(record, index) {
					if (this.fireEvent('beforeselect', this, record, index) !== false) {
						var value = record.data[this.valueField
								|| this.displayField];
						this.setValue(value);
						this.collapse();
						this.fireEvent('select', this, record, index);
					}

				}
			})
			Ext.apply(field, {
						type : type
					});
			updataPanel.add(field);
		} else {
			var field = whExtend.FormControls(id, label, value, fomat,
					precision, type);
			Ext.apply(field, {
						type : type
					});
			updataPanel.add(field);
		}
		updataPanel.doLayout();
	}

	// var base = wareHouseAttribute.headtext.split("-")[0];
	// var formjson = Ext.util.JSON.decode(base);

	updataPanel.doLayout();
	return updataPanel;
}

wareHouseAttribute.addDataInit = function(name, typeid, desc) {
	var wareHouseName = new Ext.form.TextField({
				fieldLabel : '' + getResource('resourceParam1739') + '',
				name : 'wareHouseName',
				allowBlank : false,
				maxLength : 50,
				readOnly : true,
				value : name
			});
	// var wareHouseName = new Ext.form.TextField({
	// fieldLabel : '名称',
	// name : 'wareHouseName',
	// allowBlank : false,
	// maxLength : 50,
	// readOnly : true,
	// value : name
	// });
	var description = new Ext.form.TextField({
				fieldLabel : '' + getResource('resourceParam648') + '',
				name : 'description',
				maxLength : 200,
				readOnly : true,
				value : desc

			});
	var addDataPanel = new Ext.form.FormPanel({
				fileUpload : true,
				bodyStyle : 'padding:5px 5px',

				border : false,
				autoScroll : true,
				defaults : {
					anchor : '90%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;',
					readOnly : true

				},
				items : [wareHouseName, description],
				buttons : []
			});

	addDataPanel.doLayout();
	return addDataPanel;
}
