var dataObjectAttribute = {
	toolbar : null,
	currentId : '',
	rootid : '',
	rootNode : null,
	attributeTree : null,
	checkedNode : null,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null
}
// .getNodeById

dataObjectAttribute.appendCategory = function(nodeid, node) {
	// var fnode = dataObjectAttribute.attributeTree
	// .getNodeById(dataObjectAttribute.currentId);
	// fnode.appendChild(node);
	// fnode.expand();
	dataObjectAttribute.attributeTree.getRootNode().reload();
	dataObjectAttribute.attributeTree.getRootNode().expand(true, true);
}
dataObjectAttribute.init = function() {

	dataObjectAttribute.rootNode = new Ext.tree.TreeNode({
				id : 'root',
				text : '' + getResource('resourceParam615') + ''
			});
	dataObjectAttribute.treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/dataobject_DataObjectRemote.getObjectTree',
				baseParams : {
					nodeid : ''
				}
			})
	function getparent(node, nodeid) {
		if (node.id.split(",")[0] == nodeid) {
			var a = new Date();
			var b = new Date();

			dataObjectAttribute.treeloader.baseParams.nodeid = a.toString()
					+ "," + b.toString();
		} else if (node == dataObjectAttribute.attributeTree.getRootNode()) {
			return node;
		} else {
			return getparent(node.parentNode, nodeid);
		}

	}
	dataObjectAttribute.treeloader.on("beforeload", function(treeloader, node) {

				dataObjectAttribute.treeloader.baseParams.nodeid = "";
				if (node.attributes.type == 1) {
					var realnode = node.id.split(",")[0];
					var depth = node.getDepth();
					getparent(node.parentNode, realnode);
					// var pnode = null;
					// for (var i = 0; i < depth; i++) {
					// pnode = checknode(node, nodeid);
					//
					// }
				}
			})

	dataObjectAttribute.attributeTree = new Ext.tree.TreePanel({
		tbar : [' ', {
			id : 'addCate',
			text : '' + getResource('resourceParam466') + ''
					+ getResource('resourceParam474') + '标签',
			iconCls : 'priv-add',
			tooltip : {
				title : '' + getResource('resourceParam477') + '标签',
				text : '' + getResource('resourceParam647') + '一个新的标签'
			},
			disabled : true,
			listeners : {
				'click' : function() {
					if ("" == dataObjectAttribute.currentId) {
						Ext.Msg.show({
									title : ''
											+ getResource('resourceParam596')
											+ '',
									msg : '' + getResource('resourceParam1747')
											+ '',
									width : 170,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
						return;

					}
					categoryWin.init();

				}
			}
		}, '-', {
			id : 'addObj',
			text : '' + getResource('resourceParam1748') + '',
			iconCls : 'priv-add',
			disabled : true,
			listeners : {
				'click' : function() {
					if ("" == dataObjectAttribute.currentId) {
						Ext.Msg.show({
									title : ''
											+ getResource('resourceParam596')
											+ '',
									msg : '' + getResource('resourceParam1747')
											+ '',
									width : 170,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
						return;

					}
					objectWin.init();

				}
			}
		}, '-', {
			id : 'addForm',
			text : '' + getResource('resourceParam1749') + '',
			disabled : true,
			iconCls : 'priv-add',
			listeners : {
				'click' : function() {
					if ("" == dataObjectAttribute.currentId) {
						Ext.Msg.show({
									title : ''
											+ getResource('resourceParam596')
											+ '',
									msg : '' + getResource('resourceParam1747')
											+ '',
									width : 170,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
						return;

					}
					formWin.init();

				}
			}
		}, '-', {
			id : 'deletebut',
			text : '' + getResource('resourceParam475') + '',
			disabled : true,
			iconCls : 'priv-add',
			listeners : {
				'click' : function() {

					Ext.Msg.confirm('' + getResource('resourceParam575') + '',
							"" + getResource('resourceParam1750') + "?",
							function(btn) {

								if (btn == 'yes') {
									// alert(dataObjectAttribute.rootid);
									// return;
									var node = dataObjectAttribute.attributeTree
											.getNodeById(dataObjectAttribute.currentId);
									var parent = node.parentNode;
									parent.removeChild(node);
									Ext.Ajax.request({
										url : '../JSON/dataobject_DataObjectRemote.delDateCategoryMetaStruct',
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
											dataObjectList.grid.store.load({
												params:{
													start:0,
													limit:25
												}
											});
//											myGrid.loadvalue(
//													dataObjectList.grid.store,
//													dataObjectDel.args,
//													dataObjectDel.baseargs);
										},
										disableCaching : true,
										autoAbort : true,
										params : {
											parentcategoryid : node.attributes.structId

										}
									});
								}
							});
				}
			}
		}, '-', {
			text : '' + getResource('resourceParam488') + '',// 上移
			id : 'up',
			listeners : {
				'click' : function() {

					var cnode = dataObjectAttribute.checkedNode;
					var rootid = cnode.parentNode.id;
					if (cnode.isFirst()) {
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', ''
										+ getResource('resourceParam7030')
										+ '！');// 提示信息,已经是顶端结点
						return;
					} else {
						var pNode = cnode.previousSibling;
						var parentNode = cnode.parentNode;
						var newNode = dataObjectAttribute.attributeTree
								.getLoader().createNode({
									id : cnode.id,
									text : cnode.text,
									icon : cnode.getUI().getIconEl().src,
									leaf : cnode.id.substr(0, cnode.id
													.indexOf(',')) == rootid
											? true
											: cnode.attributes.leaf,
									expandable : cnode.id.substr(0, cnode.id
													.indexOf(',')) == rootid
											? false
											: !cnode.attributes.leaf,
									structId : cnode.attributes.structId
								});
						Ext.Ajax.request({
							url : '../JSON/dataobject_DataObjectRemote.dataObjectUpDown',
							method : 'POST',
							success : function(response, options) {
								var obj = Ext.util.JSON
										.decode(response.responseText);
								if (obj.success == true) {
									cnode.remove();
									parentNode.insertBefore(newNode, pNode);

									dataObjectAttribute.attributeTree
											.fireEvent('click', newNode);
								}

							},
							disableCaching : true,
							// autoAbort : true,
							params : {
								sourceid : cnode.attributes.structId,
								targetid : pNode.attributes.structId
							}
						});

					}

				}
			}
		}, '-', {
			id : 'down',
			text : '' + getResource('resourceParam489') + '',// 下移
			listeners : {
				'click' : function() {

					var currentNode = dataObjectAttribute.checkedNode;
					if (currentNode.isLast()) {
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', ''
										+ getResource('resourceParam7031')
										+ '！');// 提示信息,已经是末端结点
						return;
					}
					var nextNode = currentNode.nextSibling;
					var parentNode = currentNode.parentNode;
					// 处理不是页面尾节点的情况
					var nextnextNode = nextNode.nextSibling;
					var newNode = dataObjectAttribute.attributeTree.getLoader()
							.createNode({
								id : currentNode.id,
								text : currentNode.text,
								leaf : currentNode.id.substr(0, currentNode.id
												.indexOf(',')) == parentNode.id
										? true
										: currentNode.attributes.leaf,
								icon : currentNode.getUI().getIconEl().src,
								expandable : currentNode.id.substr(0,
										currentNode.id.indexOf(',')) == parentNode.id
										? false
										: !currentNode.attributes.leaf,
								structId : currentNode.attributes.structId
							});
					Ext.Ajax.request({
						url : '../JSON/dataobject_DataObjectRemote.dataObjectUpDown',
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
								currentNode.remove();
								parentNode.insertBefore(newNode, nextnextNode);
								dataObjectAttribute.attributeTree.fireEvent(
										'click', newNode);
							}

						},
						disableCaching : true,
						// autoAbort : true,
						params : {
							sourceid : currentNode.attributes.structId,
							targetid : nextNode.attributes.structId
						}
					});

					// collarbMain.leftTree.fireEvent('click', newNode,
					// Ext.EventObject.ctrlKey);// 刷新当前节点

				}
			}
		}],
		id : 'attributeTree',
		border : false,
		rootVisible : true,
		useArrows : true,
		autoShow : true,
		animate : false,
		enableDD : false,
		autoScroll : true,
		frame : false,
		loader : dataObjectAttribute.treeloader,
		disabled : true,
		root : {
			id : 'root',
			text : '' + getResource('resourceParam615') + ''
		},
		loader : dataObjectAttribute.treeloader,

		listeners : {
	// 'checkchange' : function(node, checked) {
		// if (checked) {
		// node.getUI().addClass('complete');
		// } else {
		// node.getUI().removeClass('complete');
		// }
		// }
		},
		buttons : []

	});
	dataObjectAttribute.attributeTree.on("click", function(node) {
				if (node == dataObjectAttribute.attributeTree.getRootNode()) {
					Ext.getCmp("deletebut").disable();
					Ext.getCmp("addCate").enable();
					Ext.getCmp("addObj").enable();
					Ext.getCmp("addForm").enable();
					Ext.getCmp("up").disable();
					Ext.getCmp("down").disable();

				} else {
					Ext.getCmp("up").enable();
					Ext.getCmp("down").enable();
					Ext.getCmp("addCate").disable();
					Ext.getCmp("addObj").disable();
					Ext.getCmp("addForm").disable();
				}
				if (node.getDepth() == 1) {
					Ext.getCmp("deletebut").enable();
				} else {
					Ext.getCmp("deletebut").disable();
				}

				dataObjectAttribute.currentId = node.id;
				dataObjectAttribute.rootid = dataObjectAttribute.attributeTree
						.getRootNode().id;
				dataObjectAttribute.checkedNode = node;
			});

	function checknode(node, nodeid) {
		return node.parentNode;
	}
	dataObjectAttribute.attributeTree.on("beforeexpandnode", function(node) {
				dataObjectAttribute.treeloader.baseParams.nodeid = "";
				if (node.attributes.type == 1) {
					var realnode = node.id.split(",")[0];
					var depth = node.getDepth();
					var pnode = null;
				}
			})

	dataObjectAttribute.categoryName = new Ext.form.TextField({
				id : 'categoryNameA',
				fieldLabel : '' + getResource('resourceParam1746') + '',
				style : 'margin-bottom: 5px;',
				readOnly : true
			});
	dataObjectAttribute.categoryId = new Ext.form.TextField({
				name : 'categoryId',
				inputType : 'hidden',
				style : 'margin-bottom: 5px;',
				readOnly : true
			});
	dataObjectAttribute.attributeForm = new Ext.FormPanel({
				bodyStyle : 'padding:5px 5px',
				border : false,
				frame : true,

				width : '100%',
				defaults : {
					anchor : '62%',
					// allowBlank : false,
					msgTarget : 'side',
					labelAlign : 'right',
					style : 'margin-bottom: 5px;'

				},
				items : [dataObjectAttribute.categoryName,
						dataObjectAttribute.categoryId]
			});

	dataObjectAttribute.viewPanel1 = new Ext.Panel({
				layout : 'card'
			});

	dataObjectAttribute.viewPanel = new Ext.Panel({
		id : 'viewPanel',
		title : '' + getResource('resourceParam4066') + '',// 属性
		items : [dataObjectAttribute.viewPanel1],
		// dataObjectAttribute.viewGrid, dataObjectAttribute.checkTree,
		// dataObjectAttribute.viewTree, dataObjectAttribute.updateTree
		// activeItem : 0,
		layout : 'fit',
		border : false,
		listeners : {
			'activate' : function() {
				dataObjectAttribute.viewPanel1.removeAll();
				var strurl = '../JSON/dataobject_DataObjectRemote.queryViewList';
				var proxy = new Ext.data.HttpProxy({
							url : strurl
						});

				var cols = ['viewId', 'viewName', 'description', 'categroyId',
						'topCategoryId', 'topCategoryIdPath', 'createTime',
						'userId'];
				var reader = new Ext.data.JsonReader({
							root : 'results',
							totalProperty : 'totalProperty',
							id : 'viewId'
						}, cols);
				var ascid = 'viewId';
				var ascstr = 'createTime';
				var ds = new data.Store(proxy, reader, ascid, ascstr);

				var sm = new Ext.grid.CheckboxSelectionModel({
							listeners : {
								selectionchange : function(sm) {
									if (dataObjectList.modelEdit) {
										if (sm.getCount()) {
											Ext.getCmp('deleteview').enable();
										} else {
											Ext.getCmp('deleteview').disable();
										}
										if (sm.getCount() == 1) {
											Ext.getCmp('updateview').enable();
											Ext.getCmp('view').enable();
										} else {
											Ext.getCmp('view').disable();
											Ext.getCmp('updateview').disable();
											// Ext.getCmp('update').disable();
										}
									}
								},
								rowselect : function(sm, rowIndex, record) {
									if (sm.getCount() == 1) {
										// var icons = record.get("icon");
										//
										// dataObjectAttribute.categoryName.setValue(record
										// .get("categoryName"));
										// dataObjectAttribute.categoryId.setValue(record
										// .get("categoryId"));
										// if (dataObjectList.modelEdit) {
										// dataObjectAttribute.attributeTree.enable();
										// }
										// //
										// dataClassificationAttribute.treeloader.baseParams
										// // = {
										// // id :
										// dataClassificationAttribute.categoryId
										// // .getValue()
										// // }
										//
										// dataObjectAttribute.attributeTree.getRootNode()
										// .setText(record.get("categoryName"));
										// dataObjectAttribute.attributeTree.getRootNode()
										// .setId(record.get("categoryId"));
										// if ("" != icons) {
										//
										// dataObjectAttribute.attributeTree.getRootNode().getUI()
										// .getIconEl().src =
										// '../base/icons/edm/' + icons;
										// } else {
										// dataObjectAttribute.attributeTree.getRootNode().getUI()
										// .getIconEl().src =
										// '../base/icons/edm/dataObject.png';
										//
										// }
										//
										// dataObjectAttribute.attributeTree.getRootNode().reload();
										// dataObjectAttribute.attributeTree.getRootNode().expand(
										// true, true);
										// dataObjectAttribute.attributeTree.fireEvent('click',
										// dataObjectAttribute.attributeTree.getRootNode());
									} else {
									}
								}
							}

						});
				var tb = ['-', {
					text : '' + getResource('resourceParam483') + '',
					id : 'addNew',
					iconCls : 'priv-add',

					listeners : {
						'click' : function() {

							dataObjectAttribute.viewPanel1.layout
									.setActiveItem(1);
						}
					}

				}, '-', {
					text : '' + '编辑' + '',
					id : 'updateview',
					iconCls : 'priv-edit',
					disabled : true,

					listeners : {
						'click' : function() {
							dataObjectAttribute.viewPanel1.layout
									.setActiveItem(3);
							var conn = synchronize.createXhrObject();
							var url = "../JSON/dataobject_DataObjectRemote.getRootIsCheck?nodeid="
									+ dataObjectAttribute.attributeTree
											.getRootNode().id
									+ "&viewid="
									+ myGrid.row.get("viewId");
							conn.open("GET", url, false);
							conn.send(null);
							var respText = conn.responseText;
							var obj = Ext.util.JSON.decode(respText);
							if (obj.success == true) {
								dataObjectAttribute.updateTree.getRootNode()
										.getUI().checkbox.checked = true;
								dataObjectAttribute.updateTree.getRootNode().attributes.checked = true;
							} else {
								dataObjectAttribute.updateTree.getRootNode()
										.getUI().checkbox.checked = false;
								dataObjectAttribute.updateTree.getRootNode().attributes.checked = false;
							}
							dataObjectAttribute.editviewn.setValue(myGrid.row
									.get("viewName"));
							dataObjectAttribute.editviewd.setValue(myGrid.row
									.get("description"));
							dataObjectAttribute.editviewid.setValue(myGrid.row
									.get("viewId"));
							// dataObjectAttribute.viewTree.getBottomToolbar().hide();
							dataObjectAttribute.viewTree.getRootNode()
									.setText(dataObjectAttribute.attributeTree
											.getRootNode().text);
							dataObjectAttribute.viewTree.getRootNode()
									.setId(dataObjectAttribute.attributeTree
											.getRootNode().id);
							dataObjectAttribute.viewTree.getRootNode().getUI()
									.getIconEl().src = dataObjectAttribute.attributeTree
									.getRootNode().getUI().getIconEl().src;
							Ext.apply(dataObjectAttribute.viewTree
											.getRootNode().attributes, {
										treePath : dataObjectAttribute.attributeTree
												.getRootNode().id
									});

							dataObjectAttribute.viewTree.getRootNode().reload();
							dataObjectAttribute.viewTree.getRootNode().expand(
									true, true);
						}
					}
				}, '-', {
					text : '' + getResource('resourceParam475') + '',
					id : 'deleteview',
					iconCls : 'priv-del',
					disabled : true,

					listeners : {
						'click' : function() {
							dataObjectViewDel.init();
						}
					}
				}, '-', {
					text : '' + getResource('resourceParam576') + '',
					id : 'view',
					iconCls : 'priv-edit',
					disabled : true,
					listeners : {
						'click' : function() {

							var conn = synchronize.createXhrObject();
							var url = "../JSON/dataobject_DataObjectRemote.getRootIsCheck?nodeid="
									+ dataObjectAttribute.attributeTree
											.getRootNode().id
									+ "&viewid="
									+ myGrid.row.get("viewId");
							conn.open("GET", url, false);
							conn.send(null);
							var respText = conn.responseText;
							var obj = Ext.util.JSON.decode(respText);
							if (obj.success == true) {
								dataObjectAttribute.viewTree.getRootNode()
										.getUI().checkbox.checked = true;
								dataObjectAttribute.viewTree.getRootNode().attributes.checked = true;
							} else {
								dataObjectAttribute.viewTree.getRootNode()
										.getUI().checkbox.checked = false;
								dataObjectAttribute.viewTree.getRootNode().attributes.checked = false;
							}
							viewView.viewid = myGrid.row.get("viewId");
							// dataObjectAttribute.viewTree.getBottomToolbar().hide();
							dataObjectAttribute.viewTree.getRootNode()
									.setText(dataObjectAttribute.attributeTree
											.getRootNode().text);
							dataObjectAttribute.viewTree.getRootNode()
									.setId(dataObjectAttribute.attributeTree
											.getRootNode().id);
							dataObjectAttribute.viewTree.getRootNode().getUI()
									.getIconEl().src = dataObjectAttribute.attributeTree
									.getRootNode().getUI().getIconEl().src;
							Ext.apply(dataObjectAttribute.viewTree
											.getRootNode().attributes, {
										treePath : dataObjectAttribute.attributeTree
												.getRootNode().id
									});

							dataObjectAttribute.viewTree.getRootNode().reload();
							dataObjectAttribute.viewTree.getRootNode().expand(
									true, true);
							dataObjectAttribute.viewPanel1.layout
									.setActiveItem(2);
						}
					}
				}];
				var cm = new Ext.grid.ColumnModel({
					defaults: {
				        sortable: false,
				        menuDisabled: true
				    },
					columns : [sm,
						new Ext.grid.RowNumberer(), {
							header : "" + getResource('resourceParam4064') + "",
							dataIndex : 'viewName',
							width : 100
						}, {
							header : "" + getResource('resourceParam981') + "",
							dataIndex : 'createTime',

							renderer : function(value, p, record) {
								var dataTime = new Date(value.time.time);
								return dataTime.format('Y-m-d');
							}
						}, {
							header : "" + getResource('resourceParam648') + "",
							dataIndex : 'description',
							width : 200
						}
					]
				});
				dataObjectAttribute.viewGrid = myGrid.init(ds, cm, tb, sm);
				dataObjectAttribute.checkTree = dataObjectAttribute
						.checkTreeInit();
				dataObjectAttribute.updateTree = dataObjectAttribute
						.updateTreeInit();
				dataObjectAttribute.viewTree = viewView.init();
				dataObjectAttribute.viewPanel1.insert(0,
						dataObjectAttribute.viewGrid);
				dataObjectAttribute.viewPanel1.insert(1,
						dataObjectAttribute.checkTree);
				dataObjectAttribute.viewPanel1.insert(2,
						dataObjectAttribute.viewTree);		
				dataObjectAttribute.viewPanel1.insert(3,
						dataObjectAttribute.updateTree);
				
				dataObjectAttribute.viewPanel1.doLayout();
				dataObjectAttribute.viewPanel.doLayout();
				dataObjectAttribute.viewPanel1.layout.setActiveItem(0);
				ds.on('beforeload', function(store, options) {
					this.proxy = new Ext.data.HttpProxy({
						method : 'POST',
						url : '../JSON/dataobject_DataObjectRemote.queryViewList'
					})
					options.params = Ext.apply(options.params, {
								categoryId : dataObjectAttribute.categoryId
										.getValue()
							});

				});

				myGrid.loadvalue(ds, {
							start : 0,
							limit : 25
						}, dataObjectAttribute.baseargs);

				dataObjectAttribute.viewPanel.doLayout();
			}
			// ,
			// 'deactivate' : function() {
			// dataObjectAttribute.viewPanel.removeAll();
			//
			// // this.layout.setActiveItem(0);
			// // dataObjectAttribute.checkTree.layout.fireEvent('activate');
			//
			// }
		}
	});
	dataObjectAttribute.attributePanel = new Ext.Panel({
				id : 'attributePanel',
				title : '' + getResource('resourceParam7029') + '',// 属性

				layout : 'border',
				border : false,

				items : [{
							height : 55,
							layout : 'fit',
							region : 'north',
							items : [dataObjectAttribute.attributeForm]
						}, {
							layout : 'fit',
							region : 'center',
							autoScroll : true,
							items : [dataObjectAttribute.attributeTree]
						}],
				listeners : {
					'activate' : function() {

					}
				}

			});
	dataObjectAttribute.tabpanel = new Ext.TabPanel({
				activeItem : 0,
				items : [dataObjectAttribute.attributePanel,
						dataObjectAttribute.viewPanel],
				listeners : {
					"bodyresize" : function() {
						dataObjectAttribute.attributeForm
								.setWidth(dataObjectAttribute.tabpanel
										.getWidth()
										- 5);
						dataObjectAttribute.attributeTree
								.setHeight(dataObjectAttribute.tabpanel
										.getHeight()
										- 60);
					}
				}
			});
	return dataObjectAttribute.tabpanel;
}
dataObjectAttribute.checkTreeInit = function() {
	var rootNode = new Ext.tree.TreeNode({
				id : 'root',
				checked : false,
				text : '' + getResource('resourceParam615') + ''
			});
	var treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/dataobject_DataObjectRemote.getObjectCheckTree',
				baseParams : {
					nodeid : ''
				}
			})
	function getparent(node, nodeid) {
		if (node.id.split(",")[0] == nodeid) {
			var a = new Date();
			var b = new Date();

			treeloader.baseParams.nodeid = a.toString() + "," + b.toString();
		} else if (node == checkTree.getRootNode()) {
			return node;
		} else {
			return getparent(node.parentNode, nodeid);
		}

	}
	// new Ext.tree.TreeNode()
	treeloader.on("beforeload", function(treeloader, node) {

				treeloader.baseParams.nodeid = "";
				treeloader.baseParams.path = node.attributes.treePath;
				if (node.attributes.type == 1) {
					var realnode = node.id.split(",")[0];
					var depth = node.getDepth();
					getparent(node.parentNode, realnode);
					// var pnode = null;
					// for (var i = 0; i < depth; i++) {
					// pnode = checknode(node, nodeid);
					//
					// }
				}
			})
	function getCheck(node) {
		if (node == checkTree.getRootNode()) {
			return node.attributes.checked;
		} else if (node.attributes.checked == true) {
			return true;
		} else {

			return getCheck(node.parentNode);
		}

	}
	function getChildCheck(node) {
		var result = false;
		if (node.attributes.checked == true) {
			result = true;
		} else if (node.hasChildNodes()) {
			node.eachChild(function(n) {
						if (getChildCheck(n)) {
							result = true;
							return;
						}
					})
		} else {
			result = false;
		}
		return result;
	}
	var viewn = new Ext.form.TextField({});
	var viewd = new Ext.form.TextField({});
	var checkTree = new Ext.tree.TreePanel({
		border : false,
		rootVisible : true,
		useArrows : true,
		autoShow : true,
		animate : false,
		enableDD : false,
		autoScroll : true,
		frame : false,
		loader : treeloader,
		disabled : false,
		root : {
			id : 'root',
			checked : false,
			text : '' + getResource('resourceParam615') + ''
		},

		listeners : {
			'activate' : function(panel) {
				checkTree.getRootNode()
						.setText(dataObjectAttribute.attributeTree
								.getRootNode().text);
				checkTree.getRootNode().setId(dataObjectAttribute.attributeTree
						.getRootNode().id);
				checkTree.getRootNode().getUI().getIconEl().src = dataObjectAttribute.attributeTree
						.getRootNode().getUI().getIconEl().src;
				Ext.apply(checkTree.getRootNode().attributes, {
					treePath : dataObjectAttribute.attributeTree.getRootNode().id
				});

				checkTree.getRootNode().reload();
				checkTree.getRootNode().expand(true, true);
			},
			'checkchange' : function(node, checked) {
				if (checked == false) {

					if (node != checkTree.getRootNode()) {
						node.eachChild(function(n) {
							if (node.id.substring(0, node.id.indexOf(',')) == n.id
									.substring(0, n.id.indexOf(','))) {
								n.getUI().checkbox.checked = false;
								n.attributes.checked = false;
								return;
							}
						});
						if (node.parentNode != checkTree.getRootNode()) {
							if (node.id.substring(0, node.id.indexOf(',')) == node.parentNode.id
									.substring(0, node.parentNode.id
													.indexOf(','))) {
								var temp = false;
								node.parentNode.getUI().checkbox.checked = false;
								node.parentNode.attributes.checked = false;
								node.parentNode.eachChild(function(n) {
									if (n.attributes.checked == false) {
										if (n.hasChildNodes()) {
											n.eachChild(function(nn) {
														var f = getChildCheck(nn);
														if (f) {
															temp = true;
															return;
														}
													});
										}
									}
								});

								if (getCheck(node.parentNode)) {
									temp = true;
								}
								if (temp == true) {

									node.getUI().checkbox.checked = true;
									node.attributes.checked = true;
									node.parentNode.getUI().checkbox.checked = true;
									node.parentNode.attributes.checked = true;
									Ext.example
											.msg(
													''
															+ getResource('resourceParam596')
															+ '',
													''
															+ getResource('resourceParam4061')
															+ '9');
									return;
								}
							}
						} else {
							if (node.id.substring(0, node.id.indexOf(',')) == node.parentNode.id) {
								var temp = false;
								node.parentNode.getUI().checkbox.checked = false;
								node.parentNode.attributes.checked = false;
								node.parentNode.eachChild(function(n) {
									if (n.attributes.checked == false) {
										if (n.hasChildNodes()) {
											n.eachChild(function(nn) {
														var f = getChildCheck(nn);
														if (f) {
															temp = true;
															return;
														}
													});
										}
									}
								});
								if (temp == true) {
									node.parentNode.getUI().checkbox.checked = true;
									node.parentNode.attributes.checked = true;
									node.getUI().checkbox.checked = true;
									node.attributes.checked = true;
									Ext.example
											.msg(
													''
															+ getResource('resourceParam596')
															+ '',
													''
															+ getResource('resourceParam4061')
															+ '8');
									return;
								}
							}
						}
					} else {
						node.eachChild(function(n) {
							if (node.id == n.id.substring(0, n.id.indexOf(','))) {
								n.getUI().checkbox.checked = false;
								n.attributes.checked = false;
								return;
							}
						});
					}

					var down = false;

					node.eachChild(function(n) {
								if (n.attributes.checked == true) {
									down = true;
									return;
								}
							});
					if (node != checkTree.getRootNode()
							&& node.parentNode.attributes.checked && down) {
						node.getUI().checkbox.checked = true;
						node.attributes.checked = true;
						node.eachChild(function(n) {
							if (node.id.substring(0, node.id.indexOf(',')) == n.id
									.substring(0, n.id.indexOf(','))) {
								n.getUI().checkbox.checked = true;
								n.attributes.checked = true;
								return;
							}
						});
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', ''
										+ getResource('resourceParam4061')
										+ '1');
						return;
					}
				} else {

					if (node != checkTree.getRootNode()) {
						node.eachChild(function(n) {
							if (node.id.substring(0, node.id.indexOf(',')) == n.id
									.substring(0, n.id.indexOf(','))) {
								n.getUI().checkbox.checked = true;
								n.attributes.checked = true;
								return;
							}
						});
						if (node.parentNode != checkTree.getRootNode()) {
							if (node.id.substring(0, node.id.indexOf(',')) == node.parentNode.id
									.substring(0, node.parentNode.id
													.indexOf(','))) {
								var temp = false;
								node.parentNode.getUI().checkbox.checked = true;
								node.parentNode.attributes.checked = true;
								node.parentNode.eachChild(function(n) {
									if (n.attributes.checked == false) {
										if (n.hasChildNodes()) {
											n.eachChild(function(nn) {
														var f = getChildCheck(nn);
														if (f) {
															temp = true;
															return;
														}
													});
										}
									}
								});

								if (getCheck(node.parentNode)) {
									temp = true;
								}
								if (temp == true) {

									node.getUI().checkbox.checked = false;
									node.attributes.checked = false;
									node.parentNode.getUI().checkbox.checked = false;
									node.parentNode.attributes.checked = false;
									Ext.example
											.msg(
													''
															+ getResource('resourceParam596')
															+ '',
													''
															+ getResource('resourceParam4061')
															+ '5');
									return;
								}
							}
						} else {
							if (node.id.substring(0, node.id.indexOf(',')) == node.parentNode.id) {
								var temp = false;
								node.parentNode.getUI().checkbox.checked = true;
								node.parentNode.attributes.checked = true;
								node.parentNode.eachChild(function(n) {
									if (n.attributes.checked == false) {
										if (n.hasChildNodes()) {
											n.eachChild(function(nn) {
														var f = getChildCheck(nn);
														if (f) {
															temp = true;
															return;
														}
													});
										}
									}
								});
								if (temp == true) {
									node.parentNode.getUI().checkbox.checked = false;
									node.parentNode.attributes.checked = false;
									node.getUI().checkbox.checked = false;
									node.attributes.checked = false;
									Ext.example
											.msg(
													''
															+ getResource('resourceParam596')
															+ '',
													''
															+ getResource('resourceParam4061')
															+ '7');
									return;
								}
							}
						}
					} else {
						node.eachChild(function(n) {
							if (node.id == n.id.substring(0, n.id.indexOf(','))) {
								n.getUI().checkbox.checked = true;
								n.attributes.checked = true;
								return;
							}
						});
					}

					var flag2 = true;
					var check = false;
					// if (node.hasChildNodes() == false) {
					// return;
					// }
					node.eachChild(function(n) {
								if (n.attributes.checked == false) {
									if (node.hasChildNodes()) {
										n.eachChild(function(nn) {
													var f = getChildCheck(nn);
													if (f) {
														check = true;
														flag2 = false;
														return;
													}
												});
									}
								}
							});
					if (check) {
						node.getUI().checkbox.checked = false;
						node.attributes.checked = false;
						if (node != checkTree.getRootNode()) {
							node.eachChild(function(n) {
								if (node.id.substring(0, node.id.indexOf(',')) == n.id
										.substring(0, n.id.indexOf(','))) {
									n.getUI().checkbox.checked = false;
									n.attributes.checked = false;
									return;
								}
							});
						} else {
							node.eachChild(function(n) {
										if (node.id == n.id.substring(0, n.id
														.indexOf(','))) {
											n.getUI().checkbox.checked = false;
											n.attributes.checked = false;
											return;
										}
									});
						}
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', ''
										+ getResource('resourceParam4061')
										+ '2');
						return;
					}
					// node.eachChild(function(n) {
					// if (n.attributes.checked == true) {
					// flag2 = false;
					// return;
					// }
					// });

					// if (flag2 == false) {
					// return;
					// } else {
					// node.eachChild(function(n) {
					// var f = getChildCheck(n);
					// if (f) {
					// check = true;
					// }
					// });
					// }

					if (check) {
						node.getUI().checkbox.checked = false;
						node.attributes.checked = false;
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', ''
										+ getResource('resourceParam4061')
										+ '3');
						return;
					}
					// 向上
					// alert("up");
					var pnode = null;
					var flag1 = false;
					if (node == checkTree.getRootNode()
							|| node.parentNode == checkTree.getRootNode()
							|| node.parentNode.attributes.checked == true) {
						return;
					} else {
						pnode = node.parentNode.parentNode;
					}
					var flag1 = getCheck(pnode);
					if (flag1 == true) {
						node.getUI().checkbox.checked = false;
						node.attributes.checked = false;
						node.eachChild(function(n) {
							if (node.id.substring(0, node.id.indexOf(',')) == n.id
									.substring(0, n.id.indexOf(','))) {
								n.getUI().checkbox.checked = false;
								n.attributes.checked = false;
								return;
							}
						});
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', ''
										+ getResource('resourceParam4061')
										+ '4');

						return;
					}
				}
			}
		},
		tbar : [
				'&nbsp;&nbsp;' + getResource('resourceParam6096')
						+ ':&nbsp;&nbsp;',
				viewn,
				'&nbsp;&nbsp;' + getResource('resourceParam6099')
						+ ':&nbsp;&nbsp;', viewd],
		bbar : ['->', {
			text : '' + getResource('resourceParam7002') + '',
			listeners : {
				'click' : function() {
					var cn = checkTree.getChecked();
					// Ext.each(cn, function(node) {
					// if (node == checkTree.getRootNode()) {
					// alert('11')
					// }
					// });
					// return;
					if (cn.length == 0) {
						Ext.example
								.msg('' + getResource('resourceParam596') + '',
										'' + getResource('resourceParam4062')
												+ '');
						return;
					}
					if (viewn.getValue() == "") {
						Ext.example
								.msg('' + getResource('resourceParam596') + '',
										'' + getResource('resourceParam4063')
												+ '');// 提示信息,已经是顶端结点
						return;
					}
					var topid = cn[0].attributes.structId;
					var toppath = cn[0].attributes.treePath;
					var level = 0;
					var dataObjectView = Seam.Remoting
							.createType("com.sysware.edm.DataObject.DataObjectView");
					dataObjectView.setViewName(viewn.getValue());
					dataObjectView.setDescription(viewd.getValue());
					dataObjectView.setCategroyId(checkTree.getRootNode().id);
					var arr = new Array();
					Ext.each(cn, function(node) {
						var dovs = Seam.Remoting
								.createType("com.sysware.edm.DataObject.DataObjectViewStruc");
						dovs.setCategoryPath(node.attributes.treePath);
						dovs.setCategoryStrucId(node.attributes.structId);
						if (node == checkTree.getRootNode()
								|| node.parentNode.attributes.checked == false) {
							dovs.setIsTop(0);
						}

						arr.push(dovs);
					});
					dataObjectView.setDovs(arr);
					Seam.Component.getInstance("dataobject_DataObjectRemote")
							.createView(dataObjectView, function(result) {
								Ext.example.msg(
										'' + getResource('resourceParam596')
												+ '',
										'' + getResource('resourceParam623')
												+ '！');// 提示信息,已经是顶端结点
								dataObjectAttribute.viewPanel1.layout
										.setActiveItem(0);

								dataObjectAttribute.viewGrid.getStore().on(
										'beforeload', function(store, options) {
											this.proxy = new Ext.data.HttpProxy(
													{
														method : 'POST',
														url : '../JSON/dataobject_DataObjectRemote.queryViewList'
													})
											options.params = Ext.apply(
													options.params, {
														categoryId : dataObjectAttribute.categoryId
																.getValue()
													});

										});

								myGrid.loadvalue(dataObjectAttribute.viewGrid
												.getStore(), {
											start : 0,
											limit : 25
										}, dataObjectAttribute.baseargs);
							})

				}

			}
		}, {
			text : '' + getResource('resourceParam944') + '',
			listeners : {
				'click' : function() {
					dataObjectAttribute.viewPanel1.layout.setActiveItem(0);
					dataObjectAttribute.viewGrid.getStore().on('beforeload',
							function(store, options) {
								this.proxy = new Ext.data.HttpProxy({
									method : 'POST',
									url : '../JSON/dataobject_DataObjectRemote.queryViewList'
								})
								options.params = Ext.apply(options.params, {
											categoryId : dataObjectAttribute.categoryId
													.getValue()
										});

							});

					myGrid.loadvalue(dataObjectAttribute.viewGrid.getStore(), {
								start : 0,
								limit : 25
							}, dataObjectAttribute.baseargs);

				}
			}
		}, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;']

	});
	checkTree.on("click", function(node) {
			});
	function checknode(node, nodeid) {
		return node.parentNode;
	}
	checkTree.on("beforeexpandnode", function(node) {
				treeloader.baseParams.nodeid = "";
				if (node.attributes.type == 1) {
					var realnode = node.id.split(",")[0];
					var depth = node.getDepth();
					var pnode = null;
				}
			})

	return checkTree;

}
dataObjectAttribute.updateTreeInit = function(viewid) {
	var rootNode = new Ext.tree.TreeNode({
				checked : false,
				text : '' + getResource('resourceParam615') + ''
			});
	var treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/dataobject_DataObjectRemote.viewView',
				baseParams : {
					nodeid : ''
				}
			})
	function getparent(node, nodeid) {
		if (node.id.split(",")[0] == nodeid) {
			var a = new Date();
			var b = new Date();

			treeloader.baseParams.nodeid = a.toString() + "," + b.toString();
		} else if (node == checkTree.getRootNode()) {
			return node;
		} else {
			return getparent(node.parentNode, nodeid);
		}

	}

	treeloader.on("beforeload", function(treeloader, node) {

				treeloader.baseParams.nodeid = "";
				treeloader.baseParams.path = node.attributes.treePath;
				treeloader.baseParams.viewid = myGrid.row.get("viewId");;
				if (node.attributes.type == 1) {
					var realnode = node.id.split(",")[0];
					var depth = node.getDepth();
					getparent(node.parentNode, realnode);
					// var pnode = null;
					// for (var i = 0; i < depth; i++) {
					// pnode = checknode(node, nodeid);
					//
					// }
				}
			})
	function getCheck(node) {
		if (node == checkTree.getRootNode()) {
			return node.attributes.checked;
		} else if (node.attributes.checked == true) {
			return true;
		} else {

			return getCheck(node.parentNode);
		}

	}
	function getChildCheck(node) {
		var result = false;
		if (node.attributes.checked == true) {
			result = true;
		} else if (node.hasChildNodes()) {
			node.eachChild(function(n) {
						if (getChildCheck(n)) {
							result = true;
							return;
						}
					})
		} else {
			result = false;
		}
		return result;
	}
	dataObjectAttribute.editviewn = new Ext.form.TextField({});
	dataObjectAttribute.editviewd = new Ext.form.TextField({});
	dataObjectAttribute.editviewid = new Ext.form.TextField({
				hidden : true
			});
	var checkTree = new Ext.tree.TreePanel({
		border : false,
		rootVisible : true,
		useArrows : true,
		autoShow : true,
		animate : false,
		enableDD : false,
		autoScroll : true,
		frame : false,
		loader : treeloader,
		disabled : false,
		root : {
			checked : false,
			text : '' + getResource('resourceParam615') + ''
		},

		listeners : {
			'activate' : function(panel) {
				checkTree.getRootNode()
						.setText(dataObjectAttribute.attributeTree
								.getRootNode().text);
				checkTree.getRootNode().setId(dataObjectAttribute.attributeTree
						.getRootNode().id);
				checkTree.getRootNode().getUI().getIconEl().src = dataObjectAttribute.attributeTree
						.getRootNode().getUI().getIconEl().src;
				Ext.apply(checkTree.getRootNode().attributes, {
					treePath : dataObjectAttribute.attributeTree.getRootNode().id
				});

				checkTree.getRootNode().reload();
				checkTree.getRootNode().expand(true, true);
			},
			'checkchange' : function(node, checked) {
				if (checked == false) {

					if (node != checkTree.getRootNode()) {
						node.eachChild(function(n) {
							if (node.id.substring(0, node.id.indexOf(',')) == n.id
									.substring(0, n.id.indexOf(','))) {
								n.getUI().checkbox.checked = false;
								n.attributes.checked = false;
								return;
							}
						});
						if (node.parentNode != checkTree.getRootNode()) {
							if (node.id.substring(0, node.id.indexOf(',')) == node.parentNode.id
									.substring(0, node.parentNode.id
													.indexOf(','))) {
								var temp = false;
								node.parentNode.getUI().checkbox.checked = false;
								node.parentNode.attributes.checked = false;
								node.parentNode.eachChild(function(n) {
									if (n.attributes.checked == false) {
										if (n.hasChildNodes()) {
											n.eachChild(function(nn) {
														var f = getChildCheck(nn);
														if (f) {
															temp = true;
															return;
														}
													});
										}
									}
								});

								if (getCheck(node.parentNode)) {
									temp = true;
								}
								if (temp == true) {

									node.getUI().checkbox.checked = true;
									node.attributes.checked = true;
									node.parentNode.getUI().checkbox.checked = true;
									node.parentNode.attributes.checked = true;
									Ext.example
											.msg(
													''
															+ getResource('resourceParam596')
															+ '',
													''
															+ getResource('resourceParam4061')
															+ '9');
									return;
								}
							}
						} else {
							if (node.id.substring(0, node.id.indexOf(',')) == node.parentNode.id) {
								var temp = false;
								node.parentNode.getUI().checkbox.checked = false;
								node.parentNode.attributes.checked = false;
								node.parentNode.eachChild(function(n) {
									if (n.attributes.checked == false) {
										if (n.hasChildNodes()) {
											n.eachChild(function(nn) {
														var f = getChildCheck(nn);
														if (f) {
															temp = true;
															return;
														}
													});
										}
									}
								});
								if (temp == true) {
									node.parentNode.getUI().checkbox.checked = true;
									node.parentNode.attributes.checked = true;
									node.getUI().checkbox.checked = true;
									node.attributes.checked = true;
									Ext.example
											.msg(
													''
															+ getResource('resourceParam596')
															+ '',
													''
															+ getResource('resourceParam4061')
															+ '8');
									return;
								}
							}
						}
					} else {
						node.eachChild(function(n) {
							if (node.id == n.id.substring(0, n.id.indexOf(','))) {
								n.getUI().checkbox.checked = false;
								n.attributes.checked = false;
								return;
							}
						});
					}

					var down = false;

					node.eachChild(function(n) {
								if (n.attributes.checked == true) {
									down = true;
									return;
								}
							});
					if (node != checkTree.getRootNode()
							&& node.parentNode.attributes.checked && down) {
						node.getUI().checkbox.checked = true;
						node.attributes.checked = true;
						node.eachChild(function(n) {
							if (node.id.substring(0, node.id.indexOf(',')) == n.id
									.substring(0, n.id.indexOf(','))) {
								n.getUI().checkbox.checked = true;
								n.attributes.checked = true;
								return;
							}
						});
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', ''
										+ getResource('resourceParam4061')
										+ '1');
						return;
					}
				} else {

					if (node != checkTree.getRootNode()) {
						node.eachChild(function(n) {
							if (node.id.substring(0, node.id.indexOf(',')) == n.id
									.substring(0, n.id.indexOf(','))) {
								n.getUI().checkbox.checked = true;
								n.attributes.checked = true;
								return;
							}
						});
						if (node.parentNode != checkTree.getRootNode()) {
							if (node.id.substring(0, node.id.indexOf(',')) == node.parentNode.id
									.substring(0, node.parentNode.id
													.indexOf(','))) {
								var temp = false;
								node.parentNode.getUI().checkbox.checked = true;
								node.parentNode.attributes.checked = true;
								node.parentNode.eachChild(function(n) {
									if (n.attributes.checked == false) {
										if (n.hasChildNodes()) {
											n.eachChild(function(nn) {
														var f = getChildCheck(nn);
														if (f) {
															temp = true;
															return;
														}
													});
										}
									}
								});

								if (getCheck(node.parentNode)) {
									temp = true;
								}
								if (temp == true) {

									node.getUI().checkbox.checked = false;
									node.attributes.checked = false;
									node.parentNode.getUI().checkbox.checked = false;
									node.parentNode.attributes.checked = false;
									Ext.example
											.msg(
													''
															+ getResource('resourceParam596')
															+ '',
													''
															+ getResource('resourceParam4061')
															+ '5');
									return;
								}
							}
						} else {
							if (node.id.substring(0, node.id.indexOf(',')) == node.parentNode.id) {
								var temp = false;
								node.parentNode.getUI().checkbox.checked = true;
								node.parentNode.attributes.checked = true;
								node.parentNode.eachChild(function(n) {
									if (n.attributes.checked == false) {
										if (n.hasChildNodes()) {
											n.eachChild(function(nn) {
														var f = getChildCheck(nn);
														if (f) {
															temp = true;
															return;
														}
													});
										}
									}
								});
								if (temp == true) {
									node.parentNode.getUI().checkbox.checked = false;
									node.parentNode.attributes.checked = false;
									node.getUI().checkbox.checked = false;
									node.attributes.checked = false;
									Ext.example
											.msg(
													''
															+ getResource('resourceParam596')
															+ '',
													''
															+ getResource('resourceParam4061')
															+ '7');
									return;
								}
							}
						}
					} else {
						node.eachChild(function(n) {
							if (node.id == n.id.substring(0, n.id.indexOf(','))) {
								n.getUI().checkbox.checked = true;
								n.attributes.checked = true;
								return;
							}
						});
					}

					var flag2 = true;
					var check = false;
					// if (node.hasChildNodes() == false) {
					// return;
					// }
					node.eachChild(function(n) {
								if (n.attributes.checked == false) {
									if (node.hasChildNodes()) {
										n.eachChild(function(nn) {
													var f = getChildCheck(nn);
													if (f) {
														check = true;
														flag2 = false;
														return;
													}
												});
									}
								}
							});
					if (check) {
						node.getUI().checkbox.checked = false;
						node.attributes.checked = false;
						if (node != checkTree.getRootNode()) {
							node.eachChild(function(n) {
								if (node.id.substring(0, node.id.indexOf(',')) == n.id
										.substring(0, n.id.indexOf(','))) {
									n.getUI().checkbox.checked = false;
									n.attributes.checked = false;
									return;
								}
							});
						} else {
							node.eachChild(function(n) {
										if (node.id == n.id.substring(0, n.id
														.indexOf(','))) {
											n.getUI().checkbox.checked = false;
											n.attributes.checked = false;
											return;
										}
									});
						}
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', ''
										+ getResource('resourceParam4061')
										+ '2');
						return;
					}
					// node.eachChild(function(n) {
					// if (n.attributes.checked == true) {
					// flag2 = false;
					// return;
					// }
					// });

					// if (flag2 == false) {
					// return;
					// } else {
					// node.eachChild(function(n) {
					// var f = getChildCheck(n);
					// if (f) {
					// check = true;
					// }
					// });
					// }

					if (check) {
						node.getUI().checkbox.checked = false;
						node.attributes.checked = false;
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', ''
										+ getResource('resourceParam4061')
										+ '3');
						return;
					}
					// 向上
					// alert("up");
					var pnode = null;
					var flag1 = false;
					if (node == checkTree.getRootNode()
							|| node.parentNode == checkTree.getRootNode()
							|| node.parentNode.attributes.checked == true) {
						return;
					} else {
						pnode = node.parentNode.parentNode;
					}
					var flag1 = getCheck(pnode);
					if (flag1 == true) {
						node.getUI().checkbox.checked = false;
						node.attributes.checked = false;
						node.eachChild(function(n) {
							if (node.id.substring(0, node.id.indexOf(',')) == n.id
									.substring(0, n.id.indexOf(','))) {
								n.getUI().checkbox.checked = false;
								n.attributes.checked = false;
								return;
							}
						});
						Ext.example.msg('' + getResource('resourceParam596')
										+ '', ''
										+ getResource('resourceParam4061')
										+ '4');

						return;
					}
				}
			}
		},
		tbar : [
				'&nbsp;&nbsp;' + getResource('resourceParam6096')
						+ ':&nbsp;&nbsp;',
				dataObjectAttribute.editviewn,
				'&nbsp;&nbsp;' + getResource('resourceParam6099')
						+ ':&nbsp;&nbsp;', dataObjectAttribute.editviewd],
		bbar : ['->', {
			text : '' + getResource('resourceParam7002') + '',
			listeners : {
				'click' : function() {
					var cn = checkTree.getChecked();
					// Ext.each(cn, function(node) {
					// if (node == checkTree.getRootNode()) {
					// alert('11')
					// }
					// });
					// return;
					if (cn.length == 0) {
						Ext.example
								.msg('' + getResource('resourceParam596') + '',
										'' + getResource('resourceParam4062')
												+ '');
						return;
					}
					if (dataObjectAttribute.editviewn.getValue() == "") {
						Ext.example
								.msg('' + getResource('resourceParam596') + '',
										'' + getResource('resourceParam4063')
												+ '');// 提示信息,已经是顶端结点
						return;
					}
					var topid = cn[0].attributes.structId;
					var toppath = cn[0].attributes.treePath;
					var level = 0;
					var dataObjectView = Seam.Remoting
							.createType("com.sysware.edm.DataObject.DataObjectView");
					dataObjectView.setViewName(dataObjectAttribute.editviewn
							.getValue());
					dataObjectView.setDescription(dataObjectAttribute.editviewd
							.getValue());
					dataObjectView.setViewId(dataObjectAttribute.editviewid
							.getValue());

					dataObjectView.setCategroyId(checkTree.getRootNode().id);
					var arr = new Array();
					Ext.each(cn, function(node) {
						var dovs = Seam.Remoting
								.createType("com.sysware.edm.DataObject.DataObjectViewStruc");
						dovs.setCategoryPath(node.attributes.treePath);
						dovs.setCategoryStrucId(node.attributes.structId);
						if (node == checkTree.getRootNode()
								|| node.parentNode.attributes.checked == false) {
							dovs.setIsTop(0);
						}

						arr.push(dovs);
					});
					dataObjectView.setDovs(arr);
					Seam.Component.getInstance("dataobject_DataObjectRemote")
							.updateDataObjectView(dataObjectView,
									function(result) {
										Ext.example
												.msg(
														''
																+ getResource('resourceParam596')
																+ '',
														''
																+ getResource('resourceParam677')
																+ '！');
										dataObjectAttribute.viewPanel1.layout
												.setActiveItem(0);

										dataObjectAttribute.viewGrid
												.getStore()
												.on(
														'beforeload',
														function(store, options) {
															this.proxy = new Ext.data.HttpProxy(
																	{
																		method : 'POST',
																		url : '../JSON/dataobject_DataObjectRemote.queryViewList'
																	})
															options.params = Ext
																	.apply(
																			options.params,
																			{
																				categoryId : dataObjectAttribute.categoryId
																						.getValue()
																			});

														});

										myGrid
												.loadvalue(
														dataObjectAttribute.viewGrid
																.getStore(),
														{
															start : 0,
															limit : 25
														},
														dataObjectAttribute.baseargs);
									})

				}

			}
		}, {
			text : '' + getResource('resourceParam944') + '',
			listeners : {
				'click' : function() {
					dataObjectAttribute.viewPanel1.layout.setActiveItem(0);
					dataObjectAttribute.viewGrid.getStore().on('beforeload',
							function(store, options) {
								this.proxy = new Ext.data.HttpProxy({
									method : 'POST',
									url : '../JSON/dataobject_DataObjectRemote.queryViewList'
								})
								options.params = Ext.apply(options.params, {
											categoryId : dataObjectAttribute.categoryId
													.getValue()
										});

							});

					myGrid.loadvalue(dataObjectAttribute.viewGrid.getStore(), {
								start : 0,
								limit : 25
							}, dataObjectAttribute.baseargs);

				}
			}
		}, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;']

	});
	checkTree.on("click", function(node) {
			});
	function checknode(node, nodeid) {
		return node.parentNode;
	}
	checkTree.on("beforeexpandnode", function(node) {
				treeloader.baseParams.nodeid = "";
				if (node.attributes.type == 1) {
					var realnode = node.id.split(",")[0];
					var depth = node.getDepth();
					var pnode = null;
				}
			})

	return checkTree;

}