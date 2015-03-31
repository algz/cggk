var customWareHouseTree = {
	checkedNode : null
}
customWareHouseTree.init = function(id, text, icon) {
	var whnode = window.parent.getCustomCheckNode();

	customWareHouseTree.root = new Ext.tree.AsyncTreeNode({
				id : id,
				text : text,
				expandable : true,
				leaf : false,
				icon : whnode.getUI().getIconEl().src

			});
	// Ext.apply(cateInstanceTree.root.attributes, {
	// categoryid : categoryid,
	// dataCenterID : datacenterid
	// });
	customWareHouseTree.treeloader = new Ext.tree.TreeLoader({
		url : '../JSON/warehouseobject_WarehouseObjectRemote.getChildCategoryInstance',
		baseParams : {
	// nodeid : ''
		}
	});

	var addmenu = new Ext.menu.Menu({
		id : 'addmenu',
		items : [{
			id : 'addWhButton',
			disabled : true,
			text : '' + getResource('resourceParam1734') + '',
			listeners : {
				'click' : function() {

					if (customWareHouseTree.checkedNode != null) {
						var whName = new Ext.form.TextField({
									name : 'whName',
									fieldLabel : ''
											+ getResource('resourceParam480')
											+ '',
									regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
									allowBlank : false,
									regexText : ''
											+ getResource('resourceParam1092')
											+ '!',
									maxLength : 50,
									maxLengthText : ''
											+ getResource('resourceParam7010')
											+ ''// 长度不能超过50
								});
						var whDescription = new Ext.form.TextArea({
									name : 'whDescription',
									fieldLabel : ''
											+ getResource('resourceParam648')
											+ ''
								});
						var objectstore = new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
								url : '../JSON/warehouseobject_WarehouseObjectRemote.getWarehouseObjectList?start=0&limit=10000'
							}),
							reader : new Ext.data.JsonReader({
										root : 'results'
									}, [{
												name : 'categoryId',
												type : 'string'
											}, {
												name : 'categoryName',
												type : 'string'
											}, {
												name : 'icon',
												type : 'string'
											}])
						});
						var whType = new Ext.form.ComboBox({
									fieldLabel : ''
											+ getResource('resourceParam618')
											+ '',
									name : 'categoryType',
									style : 'margin-bottom:5px',
									store : objectstore,
									mode : 'local',
									triggerAction : 'all',
									valueField : 'categoryId',
									displayField : 'categoryName',
									id : 'categoryType',
									editable : false,
									allowBlank : false,
									blankText : ''
											+ getResource('resourceParam459')
											+ '',
									onSelect : function(record, index) {

										if (this.fireEvent('beforeselect',
												this, record, index) !== false) {
											var value = record.data[this.valueField
													|| this.displayField];
											this.setValue(value);
											this.collapse();
											this.fireEvent('select', this,
													record, index);
										}
									}

								});
						objectstore.load();
						var addWhForm = new Ext.form.FormPanel({
							defaults : {
								anchor : '93%'

							},
							items : [whName, whType, whDescription],
							buttons : [{
								text : '' + getResource('resourceParam479')
										+ '',
								listeners : {
									'click' : function() {
										if (addWhForm.getForm().isValid()) {

											var vo = Seam.Component
													.newInstance("CategoryInstance");
											vo.setCategoryID(whType.getValue());
											vo.setCategoryType(4);
											vo.setCategoryInstanceName(whName
													.getValue());
											vo.setDescription(whDescription
													.getValue());
											vo
													.setParentInstanceID(customWareHouseTree.checkedNode.id);

											callSeam(
													"warehouseobject_WarehouseObjectRemote",
													"addWareHouseIns", [vo],
													function(result) {
														var obj = Ext.util.JSON
																.decode(result);

														if (true == obj.success) {
															Ext.example
																	.msg(
																			''
																					+ getResource('resourceParam596')
																					+ '',
																			''
																					+ getResource('resourceParam623')
																					+ '！');
															var newWhNode = new Ext.tree.AsyncTreeNode(
																	{
																		id : obj.id,
																		text : whName
																				.getValue(),
																		leaf : true,
																		icon : '../base/icons/edm/repositoryObject.png'
																	});
															Ext
																	.apply(
																			newWhNode.attributes,
																			{
																				description : whDescription
																						.getValue()
																			});
															customWareHouseTree.checkedNode
																	.appendChild(newWhNode);
															addWhWin.close();
														} else {
															Ext.Msg.show({
																title : ''
																		+ getResource('resourceParam596')
																		+ '',
																msg : ''
																		+ getResource('resourceParam594')
																		+ '!',
																width : 170,
																buttons : Ext.Msg.OK,
																icon : Ext.Msg.ERROR
															});
														}
													});

										}

									}
								}

							}, {
								text : '' + getResource('resourceParam606')
										+ '',
								listeners : {
									'click' : function() {
										addWhForm.getForm().reset();
									}
								}
							}]
						});
						var addWhWin = new Ext.Window({
									title : ''
											+ getResource('resourceParam1735')
											+ '',
									height : 200,
									width : 370,
									layout : 'fit',
									items : [addWhForm],
									modal : true
								});
						addWhWin.show();

					}

				}
			}
		}, {
			text : '' + getResource('resourceParam1736') + '',
			id : 'addFolderButton',
			disabled : true,
			listeners : {
				'click' : function() {
					if (customWareHouseTree.checkedNode != null) {
						var folderName = new Ext.form.TextField({
									name : 'folderName',
									fieldLabel : ''
											+ getResource('resourceParam480')
											+ '',
									regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
									allowBlank : false,
									regexText : ''
											+ getResource('resourceParam1092')
											+ '!',
									maxLength : 50,
									maxLengthText : ''
											+ getResource('resourceParam7010')
											+ ''//长度不能超过50

								});

						var folderDescription = new Ext.form.TextArea({
									name : 'folderDescription',
									fieldLabel : ''
											+ getResource('resourceParam648')
											+ ''
								});

						var addFolderForm = new Ext.form.FormPanel({
							defaults : {
								anchor : '93%'

							},
							items : [folderName, folderDescription],
							buttons : [{
								text : '' + getResource('resourceParam479')
										+ '',
								listeners : {
									'click' : function() {

										if (addFolderForm.getForm().isValid()) {

											var vo = Seam.Component
													.newInstance("CategoryInstance");
											vo.setCategoryType(5);
											vo
													.setCategoryInstanceName(folderName
															.getValue());
											vo.setDescription(folderDescription
													.getValue());
											vo
													.setParentInstanceID(customWareHouseTree.checkedNode.id);

											callSeam(
													"warehouseobject_WarehouseObjectRemote",
													"addWareHouseIns", [vo],
													function(result) {
														var obj = Ext.util.JSON
																.decode(result);

														if (true == obj.success) {
															Ext.example
																	.msg(
																			''
																					+ getResource('resourceParam596')
																					+ '',
																			''
																					+ getResource('resourceParam623')
																					+ '！');
															var newFolderNode = new Ext.tree.AsyncTreeNode(
																	{
																		id : obj.id,
																		text : folderName
																				.getValue(),
																		leaf : false
																	});
															Ext
																	.apply(
																			newFolderNode.attributes,
																			{
																				description : folderDescription
																						.getValue()
																			});
															customWareHouseTree.checkedNode
																	.appendChild(newFolderNode);
															addFolderWin
																	.close();
														} else {
															Ext.Msg.show({
																title : ''
																		+ getResource('resourceParam596')
																		+ '',
																msg : ''
																		+ getResource('resourceParam594')
																		+ '!',
																width : 170,
																buttons : Ext.Msg.OK,
																icon : Ext.Msg.ERROR
															});
														}
													});

										}

									}
								}

							}, {
								text : '' + getResource('resourceParam606')
										+ '',
								listeners : {
									'click' : function() {
										addFolderForm.getForm().reset();
									}
								}
							}]
						});
						var addFolderWin = new Ext.Window({
									title : ''
											+ getResource('resourceParam1737')
											+ '',
									height : 170,
									width : 370,
									layout : 'fit',
									items : [addFolderForm],
									modal : true
								});
						addFolderWin.show();

					}
				}
			}
		}]

	});
	var updateInsButton = new Ext.Button({
		text : '' + getResource('resourceParam478') + '',
		icon : "../base/icons/page_edit.png",
		disabled : true,
		listeners : {
			'click' : function() {

				if (customWareHouseTree.checkedNode != null) {
					var insid = new Ext.form.TextField({
								value : customWareHouseTree.checkedNode.id,
								inputType : 'hidden'
							})
					var whName = new Ext.form.TextField({
						name : 'whName',
						fieldLabel : '' + getResource('resourceParam480') + '',
						value : customWareHouseTree.checkedNode.text,
						regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
						allowBlank : false,
						regexText : '' + getResource('resourceParam1092') + '!',
						maxLength : 50,
						maxLengthText : '' + getResource('resourceParam7010') + ''//长度不能超过50
					});
					var whDescription = new Ext.form.TextArea({
						name : 'whDescription',
						fieldLabel : '' + getResource('resourceParam648') + '',
						value : customWareHouseTree.checkedNode.attributes.description
					});

					var addWhForm = new Ext.form.FormPanel({
						defaults : {
							anchor : '93%'

						},
						items : [insid, whName, whDescription],
						buttons : [{
							text : '' + getResource('resourceParam479') + '',
							listeners : {
								'click' : function() {
									if (addWhForm.getForm().isValid()) {

										var vo = Seam.Component
												.newInstance("CategoryInstance");
										vo.setCategoryInstanceID(insid
												.getValue());
										vo.setCategoryInstanceName(whName
												.getValue());
										vo.setDescription(whDescription
												.getValue());
										vo
												.setParentInstanceID(customWareHouseTree.checkedNode.id);

										callSeam(
												"warehouseobject_WarehouseObjectRemote",
												"updateWareHouseIns", [vo],
												function(result) {
													var obj = Ext.util.JSON
															.decode(result);

													if (true == obj.success) {
														customWareHouseTree.checkedNode
																.setText(whName
																		.getValue());
														customWareHouseTree.checkedNode.attributes.description = whDescription
																.getValue();

														Ext.example
																.msg(
																		''
																				+ getResource('resourceParam596')
																				+ '',
																		''
																				+ getResource('resourceParam1738')
																				+ '');
														addWhWin.close();

													} else {
														Ext.Msg.show({
															title : ''
																	+ getResource('resourceParam596')
																	+ '',
															msg : ''
																	+ getResource('resourceParam572')
																	+ '!',
															width : 170,
															buttons : Ext.Msg.OK,
															icon : Ext.Msg.ERROR
														});
													}
												});

									}

								}
							}

						}, {
							text : '' + getResource('resourceParam606') + '',
							listeners : {
								'click' : function() {
									addWhForm.getForm().reset();
								}
							}
						}]
					});
					var addWhWin = new Ext.Window({
								title : '' + getResource('resourceParam1392')
										+ '',
								height : 200,
								width : 370,
								layout : 'fit',
								items : [addWhForm],
								modal : true
							});
					addWhWin.show();

				}

			}
		}

	});
	var delInsButton = new Ext.Button({
		text : '' + getResource('resourceParam475') + '',
		icon : '../base/icons/page_delete.png',
		disabled : true,
		listeners : {
			'click' : function() {

				Ext.Msg.confirm('' + getResource('resourceParam1724') + '', ""
								+ getResource('resourceParam1733') + "?",
						function(btn) {
							if (btn == 'yes') {
								if (customWareHouseTree.checkedNode.attributes.leaf == true) {
									Ext.Ajax.request({
										url : '../JSON/warehouseobject_WarehouseObjectRemote.delWareHouseIns',
										method : 'POST',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
											if (obj.success == true) {
												var pnode = customWareHouseTree.checkedNode.parentNode;
												pnode
														.removeChild(customWareHouseTree.checkedNode);
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
										},
										disableCaching : true,
										autoAbort : true,
										params : {
											categoryInstanceID : customWareHouseTree.checkedNode.id,
											leaf : true
										}

									});
								} else {
									Ext.Ajax.request({
										url : '../JSON/warehouseobject_WarehouseObjectRemote.delWareHouseIns',
										method : 'POST',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
											if (obj.success == true) {
												if (customWareHouseTree.checkedNode
														.hasChildNodes()) {
													var pnode = customWareHouseTree.checkedNode.parentNode;
													// var childNodes =
													// customWareHouseTree.checkedNode.childNodes;
													pnode.reload();
													// for (var i = 0; i <
													// childNodes.length; i++) {
													// var node = childNodes[i];
													// var newNode = new
													// Ext.tree.TreeNode(
													// {
													// id : node.id,
													// text : node.text,
													// leaf :
													// node.attributes.leaf
													// });
													// Ext.apply(newNode.attributes,
													// {
													// description :
													// node.attributes.description
													// });
													// customWareHouseTree.checkedNode
													// .removeChild(node);
													// pnode.appendChild(newNode);
													// }

													// customWareHouseTree.root.reload();
													// customWareHouseTree.root
													// .expand(true);
												} else {
													var pnode = customWareHouseTree.checkedNode.parentNode;
													pnode
															.removeChild(customWareHouseTree.checkedNode);
												}
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
										},
										disableCaching : true,
										autoAbort : true,
										params : {
											categoryInstanceID : customWareHouseTree.checkedNode.id,
											leaf : false
										}

									});
								}
							}
						});
			}
		}

	});
	customWareHouseTree.whTree = new Ext.tree.TreePanel({
				rootVisible : true,
				useArrows : false,
				autoShow : true,
				animate : false,
				enableDD : false,
				containerScroll : false,
				frame : false,
				tbar : [{
							text : '' + getResource('resourceParam483') + '',
							menu : addmenu,
							icon : '../base/icons/page_add.png'
						}, updateInsButton, delInsButton],
				loader : customWareHouseTree.treeloader,
				disabled : false,
				rootVisible : true,
				root : customWareHouseTree.root
			});
	customWareHouseTree.whTree.on("click", function(node) {
		customWareHouseTree.checkedNode = node;
		if (node != customWareHouseTree.root) {
			updateInsButton.enable();
			delInsButton.enable();
		} else {
			updateInsButton.disable();
			delInsButton.disable();
		}
		if (node.attributes.leaf) {
			Ext.getCmp("addWhButton").disable();
			Ext.getCmp("addFolderButton").disable();
			Ext.Ajax.request({
				url : '../JSON/warehouseobject_WarehouseObjectRemote.getWareHouseInstanceOfPhysicsType',
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					if (obj.success == true) {
						var attri = wareHouseAttribute
								.init(obj.physicsid, node.text, node.id,
										node.attributes.description);
						var temp = warehouseObjectMain.centerPanle.items.get(0);
						if (temp) {
							warehouseObjectMain.centerPanle.remove(temp);
						}
						warehouseObjectMain.centerPanle.insert(0, attri);
						warehouseObjectMain.centerPanle.doLayout();

					} else {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam1724')
											+ '',
									msg : '' + getResource('resourceParam651')
											+ '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								})

					}
				},
				disableCaching : true,
				autoAbort : true,
				params : {
					categoryInstanceID : customWareHouseTree.checkedNode.id
				}

			});
		} else {
			Ext.getCmp("addWhButton").enable();
			Ext.getCmp("addFolderButton").enable();

		}
			// var nodeid = node.id;
			//
			// if (window.parent.historyViewModel) {
			// var vo = Seam.Component
			// .newInstance("CategoryInstanceVersionVo");
			// vo.setCategoryInstanceID(nodeid);
			// vo.setFixedRevision(node.attributes.revision);
			// Seam.Component.getInstance("datacenter_DataCenterRemote")
			// .getAllChildCateByFathByRevision(vo,
			// function(result) {
			// cateInstancePanel
			// .updateFirstAttriTab(nodeid);
			// });
			// } else {
			// Seam.Component.getInstance("datacenter_DataCenterRemote")
			// .getAllChildCateByFath(nodeid, function(result) {
			// cateInstancePanel
			// .updateFirstAttriTab(nodeid);
			// });
			// }

	});
	customWareHouseTree.whTree.on("beforeload", function(node) {
		customWareHouseTree.treeloader.url = "../JSON/warehouseobject_WarehouseObjectRemote.getChildCategoryInstance?nodeid="
				+ node.id;
	});

	customWareHouseTree.root.expand(true);
	return customWareHouseTree.whTree;
}
// cateInstanceTree.appendChild = function(node) {
// cateInstanceTree.checkinstancenode.appendChild(node);
// }
// cateInstanceTree.updatenode = function(ids, texts, desc) {
// var node = cateInstanceTree.attributeTree.getNodeById(ids);
//
// node.setText(texts);
// Ext.apply(node.attributes, {
// description : desc
// });
// }
// cateInstanceTree.getNodeById = function(id) {
// return cateInstanceTree.attributeTree.getNodeById(id);
// }
// cateInstanceTree.reload = function(value, callback) {
// if (value) {
// cateInstanceTree.treeloader.on('beforeload', function() {
// this.baseParams.fixedrevision = value;
// this.baseParams.nodeid = cateInstanceTree.checkinstancenode.id;
// });
// } else {
// cateInstanceTree.treeloader.on('beforeload', function() {
// this.baseParams.nodeid = ''
// });
// }
// cateInstanceTree.root.attributes.revision = value;
// cateInstanceTree.root.reload(function() {
// callback();
// cateInstanceTree.root.expand(true);
// });
// }
