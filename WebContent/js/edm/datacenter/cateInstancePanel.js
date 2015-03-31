var cateInstancePanel = {

	checkobjectnode : null
}
Ext.apply(Ext.QuickTips.getQuickTip(), {
			autoHeight : true,
			dismissDelay : 0,
			autoWidth : true
		});
Ext.QuickTips.init();
cateInstancePanel.init = function() {
	var node = window.parent.getCheckNode();
	// alert(node.attributes.revision);
	var newText = node.attributes.realName
			+ node.text.substring(node.text.indexOf("<"));
	// + node.text.substring(node.text.indexOf("\/")); // Update by YangJin'gang
	// at 2010-09-07 10:05
	var catetree = cateInstanceTree.init(node.id, newText,
			node.attributes.categoryid, node.attributes.datacenterid, node
					.getUI().getIconEl().src, node.attributes.revision,
			node.attributes.realName);
	cateInstancePanel.attributepanel = cateInstanceAttriTab.init();
	cateInstancePanel.centerPanel = new Ext.Panel({
				layout : 'fit',
				region : 'center',
				border : false,
				items : [cateInstancePanel.attributepanel]
			});

	var defaultsConfigs = {
		projectFormItem : {
			"value" : "",
			"name" : "projectName",
			"fieldLabel" : '' + getResource('resourceParam1746') + ':',// 对象名称
			"disabled" : true
		},
		taskFormItem : {
			"value" : "",
			"name" : "taskName",
			"fieldLabel" : '' + getResource('resourceParam7013') + ':',// 标签名称
			"disabled" : true,
			"isShow" : false
		},
		dataNameFormItem : {
			"value" : "",
			"name" : "dataEntityName"
		},
		dataTypeFormItem : {
			"value" : "",
			"name" : "dataEntityTypeName"
		},
		dataTypeFormItemHidden : {
			"value" : "",
			"name" : "dataEntityType"
		},
		valueFormItem : {
			"value" : "",
			"name" : "value"
		},
		startDateFormItem : {
			"value" : "",
			"name" : "startDate"
		},
		endDateFormItem : {
			"value" : "",
			"name" : "endDate"
		},
		versionFormItem : {
			"value" : "",
			"name" : "revisionName"
		},
		versionFormItemHidden : {
			"value" : "",
			"name" : "revision"
		}
	}
	function searchCallback(paramsObj) {
		var queryResultTreeGrid = searchResultTreeGrid.init();
		if (!cateInstanceTree.checkinstancenode) {
			Ext.example.msg("" + getResource('resourceParam596') + "", "请先"
							+ getResource('resourceParam503') + "一个对象实例！");
			return false;
		} else {
			var dataPanel = cateInstancePanel.centerPanel.items.get(0);
			if (dataPanel) {
				cateInstancePanel.centerPanel.remove(dataPanel);
				cateInstancePanel.centerPanel.doLayout();
			}
			cateInstancePanel.centerPanel.add(queryResultTreeGrid);
			searchPanel.setParameter("projectFormItemName",
					cateInstanceTree.checkinstancenode.attributes.categoryName);
			searchPanel.projectFormItem
					.setValue(cateInstanceTree.checkinstancenode.attributes.categoryName);
			searchPanel.setParameter("dcategoryInsid",
					cateInstanceTree.checkinstancenode.attributes.id);
			// cateInstancePanel.centerPanel.setActiveTab(queryResultTreeGrid);
			cateInstancePanel.centerPanel.doLayout();
			queryResultTreeGrid.getSelectionModel().clearSelections()
			queryResultTreeGrid.getStore().on('beforeload',
					function(store, options) {
						this.proxy = new Ext.data.HttpProxy({
							method : 'POST',
							url : '../JSON/dataEntity_DataEntityRemote.queryInstanceIsWithData'
						})
						options.params = Ext.apply(options.params, {
							dcategoryinstanceid : cateInstanceTree.checkinstancenode.attributes.id,
							parent : '0'
						});
						options.params = Ext.apply(options.params,
								searchPanel.mainpanel.getForm().getValues());
					});
			queryResultTreeGrid.getStore().load();
		}
	}
	var queryPanel = searchPanel.init(defaultsConfigs, searchCallback);
	cateInstancePanel.infoLabel = new Ext.form.Label({
				text : ''
			});
	// 右侧菜单项
	cateInstancePanel.mainpanel = new Ext.Panel({
		id : 'cateInstance_mainPanel',
		frame : true,
		border : false,
		tbar : [{
			id : 'addobject',
			text : '' + getResource('resourceParam483') + '',
			menu : [new Ext.Action({
						id : 'addinstance',
						text : '' + getResource('resourceParam483') + '对象',
						handler : function() {
							if (cateInstanceTree.checkinstancenode == null) {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam596')
													+ '!',
											msg : ''
													+ getResource('resourceParam1709')
													+ '',
											buttons : Ext.MessageBox.OK,
											width : 250,
											icon : Ext.MessageBox.ERROR
										})
								return;
							}
							cateInstancePanel.treeinit();

						}
					}), new Ext.Action({
				id : 'addref',
				text : '' + getResource('resourceParam9160') + '',
				handler : function() {
					if (!cateInstanceTree.checkinstancenode) {
						Ext.example.msg("" + getResource('resourceParam596')
										+ "", "请先"
										+ getResource('resourceParam503')
										+ "一个对象实例！");
						return;
					}
					cateInstanceTree.refchecknode = null;
					var cateInsTree = cateInstanceTree.ref(node.id, newText,
							node.attributes.categoryid,
							node.attributes.datacenterid, node.getUI()
									.getIconEl().src, node.attributes.revision,
							node.attributes.realName);
					var refWin = new Ext.Window({
						width : 250,
						title : '' + getResource('resourceParam9160') + '',
						height : 300,
						layout : 'fit',
						modal : true,
						items : [cateInsTree],
						bbar : ['->', {
							text : '确定',
							handler : function() {
								if (null != cateInstanceTree.refchecknode) {
									Ext.Ajax.request({
										url : '../JSON/datacenter_DataCenterRemote.addCategoryInstanceRef',
										method : 'POST',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
											if (obj.success == true) {
												// cateInstanceTree.treeloader.on(
												// 'beforeload', function(
												// o, n) {
												// this.baseParams.tempNode =
												// "";
												// this.baseParams.isref = 0;
												//
												// });
												cateInstanceTree.treeloader.baseParams.tempNode = "";
												cateInstanceTree.treeloader.baseParams.isref = 0;
												cateInstanceTree.attributeTree
														.getRootNode()
														.setId(window.parent
																.getCheckNode().id);
												cateInstanceTree.attributeTree
														.getRootNode().reload();

												cateInstanceTree.attributeTree
														.getRootNode().expand();
												// cateInstanceTree.treeloader
												// .load(
												// cateInstanceTree.checkinstancenode,
												// function() {
												// cateInstanceTree.checkinstancenode
												// .expand(1);
												// });
												refWin.close();
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
											categoryInstanceID : cateInstanceTree.refchecknode.id,
											parentInstanceID : cateInstanceTree.checkinstancenode.id
										}
									});
								} else {
									return;
								}

							}
						}, {
							text : '取消',
							handler : function() {
								cateInstanceTree.refchecknode = null;
								refWin.close();
							}
						}]
					});
					refWin.show();
				}
			})]
		}, '-', {
			id : 'instanceedit',
			text : '' + getResource('resourceParam490') + '',
			listeners : {
				'click' : function() {
					if (cateInstanceTree.checkinstancenode == null) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam596')
											+ '!',
									msg : '' + getResource('resourceParam1709')
											+ '',
									buttons : Ext.MessageBox.OK,
									width : 250,
									icon : Ext.MessageBox.ERROR
								})
						return;
					}
					var ntext = cateInstanceTree.checkinstancenode.attributes.categoryName;
					var index = ntext.indexOf('<font');
					if (index != -1) {
						ntext = ntext.substring(0, index);
					}
					dataInstanceUpdate
							.init(
									cateInstanceTree.checkinstancenode.id,
									ntext,
									cateInstanceTree.checkinstancenode.attributes.description,
									2);

				}
			}

		}, '-', {
			id : 'cateinsdel',
			text : '' + getResource('resourceParam475') + '',
			listeners : {
				'click' : function() {
					if (cateInstanceTree.attributeTree.getRootNode() == cateInstanceTree.checkinstancenode) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam596')
											+ '!',
									msg : '' + getResource('resourceParam1710')
											+ '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								})
						return;
					}
					if (cateInstanceTree.checkinstancenode == null) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam596')
											+ '!',
									msg : '' + getResource('resourceParam1708')
											+ '',
									width : 250,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								})
						return;
					}
					if (cateInstanceTree.checkinstancenode.attributes.isref == 1
							&& cateInstanceTree.checkinstancenode.parentNode.attributes.isref == 1) {
						Ext.example.msg("" + getResource('resourceParam596')
										+ "", "无法册除此引用实例");
						return;
					}
					Ext.Msg.confirm('' + getResource('resourceParam1724') + '',
							"" + getResource('resourceParam1720') + "?",
							function(btn) {

								if (btn == 'yes') {
									var checknode = cateInstanceTree.checkinstancenode;
									var count = 0;
									var length = checknode.childNodes.length;
									// checknode.eachChild(function(n) {

									// callSeam(
									// "privilege_DataPrivilegeRemote",
									// "getDataCenterDataManipultations",
									// [opertationVo],
									var conn = synchronize.createXhrObject();
									var url = "../JSON/privilege_DataPrivilegeRemote.getDataCenterDataManipultations?dataId="
											+ checknode.id;
									conn.open("GET", url, false);
									conn.send(null);
									var respText = conn.responseText;
									var obj = Ext.util.JSON.decode(respText);
									if (obj.del == false) {
										Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam1724')
													+ '',
											msg : '不能'
													+ getResource('resourceParam475')
													+ '对象，没有子对象的'
													+ getResource('resourceParam475')
													+ ''
													+ getResource('resourceParam582')
													+ '!',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
										return false;
									} else {
										Ext.Ajax.request({
											url : '../JSON/datacenter_DataCenterRemote.delDataCateInstance',
											method : 'POST',
											success : function(response,
													options) {
												var obj = Ext.util.JSON
														.decode(response.responseText);
												if (obj.success == true) {
													// 代替 @删除 部分
													// Update by YangJin'gang at
													// 2010-09-07 10:50
													cateInstanceTree
															.updateversionsymble(cateInstanceTree.checkinstancenode);
													var parentnode = cateInstanceTree.checkinstancenode.parentNode;
													parentnode
															.removeChild(cateInstanceTree.checkinstancenode);

													/**
													 * @删除 版次更新reload
													 * 
													 * var nodeid =
													 * window.parent
													 * .getCheckNode().id;
													 * window.parent.reload(
													 * function() {
													 * cateInstanceTree.root
													 * .reload( function() { var
													 * nodetext = window.parent
													 * .getNodeById(nodeid).text;
													 * cateInstanceTree.root
													 * .setText(nodetext);
													 * cateInstanceTree.root
													 * .expand();
													 * window.parent.document
													 * .getElementById("center_frame").firstChild.firstChild.innerHTML =
													 * nodetext; }); });
													 */
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
												idSequence : cateInstanceTree.checkinstancenode.id,
												isref : cateInstanceTree.checkinstancenode.attributes.isref,
												uniqueid : cateInstanceTree.checkinstancenode.attributes.uniqueid
											}
										});
									}
								}
							});

				}
			}
		},  {
			id : 'cateinsprivilege',
			text : '' + getResource('resourceParam582') + '',
			hidden : true,
			handler : cateInstancePanel.dataPrivilegeHandler
		},
				// bug:714
				// gaoyn 2011-5-23
				// 屏蔽掉数据中心的审批的按钮
				{
					id : 'cateinsapprove',
					hidden : true,
					text : '' + getResource('resourceParam1062') + '',
					menu : [new Ext.Action({
								id : 'cateinspassApprove',
								text : '' + getResource('resourceParam1365')
										+ '',
								handler : cateInstancePanel.passApproveHandler
							}), new Ext.Action({
								id : 'cateinssubmitApprove',
								text : '' + getResource('resourceParam1550')
										+ '...',
								handler : cateInstancePanel.submitApproveHandler
							}), new Ext.Action({
								id : 'cateinsviewApproveHistory',
								text : '' + getResource('resourceParam1448')
										+ '',
								handler : cateInstancePanel.viewApproveHistoryHandler
							})]
				}, '-', {
					id : 'cateinssearch',
					text : '' + getResource('resourceParam652') + '',
					menu : queryPanel,
					handler : function() {
						if (!cateInstanceTree.checkinstancenode) {
							return false;
						}
						searchPanel
								.setParameter(
										"projectFormItemName",
										cateInstanceTree.checkinstancenode.attributes.categoryName);
						searchPanel.projectFormItem
								.setValue(cateInstanceTree.checkinstancenode.attributes.categoryName);
						searchPanel
								.setParameter(
										"dcategoryInsid",
										cateInstanceTree.checkinstancenode.attributes.id);
					}
				}, '-', {
					id : 'cateinssetversion',
					text : '' + getResource('resourceParam1721') + '',
					listeners : {
						'click' : function() {
							if (cateInstanceTree.checkinstancenode == null) {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam596')
													+ '!',
											msg : ''
													+ getResource('resourceParam1709')
													+ '',
											width : 250,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										})
								return;
							}
							cateInstancePanel
									.initVersionSetWin(cateInstanceTree.checkinstancenode.id);
						}
					}
				}, '-', {
					id : 'cateinshistoryversion',
					text : '' + getResource('resourceParam1711') + '', // 查看对象的历史版本
					handler : cateInstancePanel.viewHistoryHandler
					// }, '-', {
				// id : 'dataCompare-button',
				// text : '' + getResource('resourceParam1722') + '',
				// handler : cateInstancePanel.dataCompareHandler
			}	, '-', {
					id : 'viewViewList',
					text : '' + getResource('resourceParam4066') + '',
					handler : cateInstancePanel.viewView
				},'-',
				 {text : '返回', //@chenw 增加返回按钮
				  	handler : function(){
					  	window.parent.cenpanel.setUrl("center.jsp?defaultDataCenter");
				 	}
				 }
				,'->', cateInstancePanel.infoLabel],
		layout : 'border',
		items : [new Ext.Panel({
							id : 'cateInsPanel-catetree',
							region : 'west',
							layout : 'fit',
							border : true,
							// minSize : 200,
							width : 200,
							split : true,

							collapsible : true,
							// collapsed : true,
							items : [catetree]

						}), cateInstancePanel.centerPanel],
		listeners : {
			"bodyresize" : function() {
				// alert(panel.getWidth());
				// attributepanel.setWidth(panel.getWidth() - 15);
				// dataClassificationAttribute.dateTypeTree
				// .setHeight(dataClassificationAttribute.tabpanel
				// .getHeight()
				// - 88);
			}
		}

	});
	return cateInstancePanel.mainpanel;
}
// 视图
cateInstancePanel.viewView = function() {
	// cateInstanceTree.attributeTree.getRootNode().disable();
	cateInstancePanel.mainpanel.getTopToolbar().disable();
	cateInstanceTree.originalRootName = cateInstanceTree.attributeTree
			.getRootNode().text;
	var button = Ext.getCmp('viewViewList');
	button.setText('' + '返回' + '');
	button.enable();
	button.setHandler(function() {
				cateInstancePanel.mainpanel.getTopToolbar().enable();
				button.setText('' + '视图' + '');
				button.setHandler(cateInstancePanel.viewView);
				cateInstanceTree.viewViewBack();
			});
	button.enable();
	// if (cateInstanceTree.checkinstancenode == null) {
	// Ext.example.msg('' + getResource('resourceParam596') + '!',
	// getResource('resourceParam1709'))
	// return;
	// }
	var tba = cateInstancePanel.centerPanel.items.get(0);
	if (tba) {
		cateInstancePanel.centerPanel.remove(tba);
	}
	var view = viewPanel.init();
	cateInstancePanel.centerPanel.add(view);
	viewPanel.viewGrid.getStore().on('beforeload', function(store, options) {
		this.proxy = new Ext.data.HttpProxy({
					method : 'POST',
					url : '../JSON/dataobject_DataObjectRemote.queryViewList'
				})
		options.params = Ext.apply(options.params, {
			categoryId : cateInstanceTree.attributeTree.getRootNode().attributes.categoryid
		});

	});

	myGrid.loadvalue(viewPanel.viewGrid.getStore(), {
				start : 0,
				limit : 25
			}, viewPanel.baseargs);
	cateInstancePanel.centerPanel.doLayout();
}
cateInstancePanel.passApproveHandler = function() {

}
cateInstancePanel.submitApproveHandler = function() {
	if (cateInstanceTree.checkinstancenode == null) {
		Ext.example.msg('' + getResource('resourceParam596') + '!',
				getResource('resourceParam1709'))
		return;
	}
	cateInstancePanel.centerPanel.removeAll();
	approvePanel.init(cateInstancePanel.centerPanel,
			cateInstanceTree.checkinstancenode.id, 'DataObjectDataType',
			cateInstancePanel.updateFirstAttriTab, ''
					+ getResource('resourceParam1719') + '', function() {
				cateInstanceTree.clickNode(cateInstanceTree.checkinstancenode);
			});
	cateInstancePanel.centerPanel.doLayout();
}
cateInstancePanel.viewApproveHistoryHandler = function() {
	if (cateInstanceTree.checkinstancenode == null) {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam596') + '!',
					msg : '' + getResource('resourceParam1709') + '',
					buttons : Ext.MessageBox.OK,
					width : 250,
					icon : Ext.MessageBox.ERROR
				})
		return;
	}
	cateInstancePanel.centerPanel.removeAll();
	examApproval.getCommentGrid(cateInstancePanel.centerPanel,
			cateInstanceTree.checkinstancenode.id, 'DataObjectDataType');
	cateInstancePanel.centerPanel.doLayout();
}
cateInstancePanel.dataPrivilegeWin = null;
cateInstancePanel.dataPrivilegeHandler = function() {
	if (cateInstanceTree.checkinstancenode.id != cateInstanceTree.attributeTree
			.getRootNode().id) {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam596') + '!',
					msg : '只能对根结点设置权限！',
					buttons : Ext.MessageBox.OK,
					width : 250,
					icon : Ext.MessageBox.ERROR
				})
		return;
	}
	if (cateInstanceTree.checkinstancenode == null) {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam596') + '!',
					msg : '' + getResource('resourceParam1709') + '',
					buttons : Ext.MessageBox.OK,
					width : 250,
					icon : Ext.MessageBox.ERROR
				})
		return;
	}
	var node = cateInstanceTree.checkinstancenode;
	var icon = node.getUI().getIconEl().src;
	var tba = cateInstancePanel.centerPanel.items.get(0);
	if (tba) {
		cateInstancePanel.centerPanel.remove(tba);
	}
	cateInstancePanel.privilegePanel = privilegePanel.init({
				'dataId' : node.id,
				'dataType' : 'DataObjectDataType'
			}, {
				'text' : node.text,
				'categoryid' : node.attributes.categoryid,
				'icon' : icon
			});
	cateInstancePanel.centerPanel.add(cateInstancePanel.privilegePanel);
	cateInstancePanel.centerPanel.doLayout();
}
cateInstancePanel.updateFirstAttriTab = function(nodeid) {
	if (!nodeid) {
		nodeid = (cateInstanceTree.checkinstancenode == null
				? cateInstanceTree.root
				: cateInstanceTree.checkinstancenode).id;
	}
	var tba = cateInstancePanel.centerPanel.items.get(0);
	if (tba) {
		cateInstancePanel.centerPanel.remove(tba);
	}
	/**
	 * bug编号633 wangyf bug信息：在数据中心，把付于张明用户的h1信息的编辑，删除，审批，置通过与权限，功能取消后，此两个按钮应置灰。
	 * 同时不应再支持进行编辑操作。二级页面也存在此问题，同时二级页面的删除按钮也应置灰。 2011-05-17
	 */
	// if (cateInstanceTree.checkinstancenode.attributes.isref == 1) {
	// nodeid = cateInstanceTree.checkinstancenode.id.substring(0,
	// cateInstanceTree.checkinstancenode.id.indexOf("#"));
	// cateInstancePanel.mainpanel.getTopToolbar().disable();
	// Ext.getCmp("cateinsdel").enable();
	// cateInstancePanel.infoLabel.enable();
	// } else {
	// cateInstancePanel.mainpanel.getTopToolbar().enable();
	// }
	var newPanel = cateInstanceAttriTab.init(nodeid,
			cateInstanceTree.checkinstancenode.attributes.isref);
	cateInstancePanel.centerPanel.add(newPanel);
	cateInstancePanel.centerPanel.doLayout();
}
cateInstancePanel.viewHistoryHandler = function() {
	if (cateInstanceTree.checkinstancenode == null) {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam596') + '!',
					msg : '' + getResource('resourceParam1709') + '',
					buttons : Ext.MessageBox.OK,
					width : 250,
					icon : Ext.MessageBox.ERROR
				})
		return;
	}
	cateInstancePanel
			.initHistoryVersionsWin(cateInstanceTree.checkinstancenode.id);
}
cateInstancePanel.dataCompareHandler = function() {
	var node = cateInstanceTree.checkinstancenode;
	if (node == null) {
		node = cateInstanceTree.root;
	}
	var icon = node.getUI().getIconEl().src;
	cateInstancePanel.mainpanel.getTopToolbar().disable();
	cateInstancePanel.mainpanel.getTopToolbar().addButton({
		id : 'datacompare-return',
		text : '' + getResource('resourceParam944') + '',
		handler : function() {
			cateInstancePanel.mainpanel.getTopToolbar()
					.remove('datacompare-return');
			cateInstancePanel.mainpanel.getTopToolbar().enable();
			Ext.getCmp('cateInsPanel-catetree').removeAll();
			var rootNode = window.parent.getCheckNode();
			var catetree = cateInstanceTree.init(rootNode.id, rootNode.text,
					rootNode.attributes.categoryid,
					rootNode.attributes.datacenterid, rootNode.getUI()
							.getIconEl().src, rootNode.attributes.revision);
			Ext.getCmp('cateInsPanel-catetree').add(catetree);
			Ext.getCmp('cateInsPanel-catetree').doLayout();
			cateInstancePanel.centerPanel.removeAll();
			var newPanel = cateInstanceAttriTab.init(rootNode.id);
			cateInstancePanel.centerPanel.add(newPanel);
			cateInstancePanel.centerPanel.doLayout();
			catetree.fireEvent('click', cateInstanceTree.root);
		}
	});
	Ext.getCmp('datacompare-return').enable();
	Ext.getCmp('cateInsPanel-catetree').removeAll();
	Ext.getCmp('cateInsPanel-catetree').add(dataCompareMain.treeInit(node.id,
			node.text, node.attributes.categoryid, icon));
	Ext.getCmp('cateInsPanel-catetree').doLayout();

	cateInstancePanel.mainpanel.getTopToolbar().doLayout();
	cateInstancePanel.centerPanel.removeAll();
	var panel = new Ext.Panel({
				layout : 'border',
				items : [new Ext.Panel({
									region : 'center',
									items : []
								}), new Ext.Panel({
									region : 'north',
									height : 200,
									items : [dataCompareMain.gridInit()]
								})]
			});
	cateInstancePanel.centerPanel.add(panel);
	cateInstancePanel.centerPanel.doLayout();
}
// 查看历史版本的window框
cateInstancePanel.initHistoryVersionsWin = function(nodeid) {
	var win = new Ext.Window({
		width : 650,
		height : 400,
		title : '' + getResource('resourceParam1704') + '',
		modal : true,
		autoScroll : true,
		items : [historyVersionsMain.init(nodeid)],
		bbar : ['->', {
			text : '' + getResource('resourceParam479') + '',
			handler : function() {

				if (win.items.get(0).get(0).getSelectionModel().getSelections().length == 0) {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam596')
										+ '!',
								msg : '' + getResource('resourceParam1703')
										+ '',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							})
					return;
				}
				var r = win.items.get(0).get(0).getSelectionModel()
						.getSelected();
				var oldTitleText = cateInstanceTree.checkinstancenode.text;
				var titleText = r.get('categoryInstanceName')
						+ '<font color=gray>/' + r.get('version') + '</font>';
				if (r.get('categoryInstanceId') == window.parent.getCheckNode().id) {
					window.parent.getNodeById(r.get('categoryInstanceId'))
							.setText(titleText);
					window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML = titleText;
				}
				cateInstanceTree.checkinstancenode.setText(titleText);
				var oldNode = cateInstanceTree.checkinstancenode;
				var oldRevision = oldNode.attributes.revision;
				window.parent.historyViewModel = true;
				cateInstanceTree.reloadNode(oldNode, r.get('fixedRevision'),
						function() {
							window.parent.setEnable(false);

							cateInstancePanel.updateFirstAttriTab(oldNode.id);
							cateInstancePanel.mainpanel.getTopToolbar()
									.disable();
							window.parent.historyViewModel = true;
							var button = Ext.getCmp('cateinshistoryversion');
							button.setText(''
									+ getResource('resourceParam1705') + '');
							button.setHandler(function() {
								window.parent.reload(function() {
									oldNode.attributes.revision = oldRevision;
									cateInstanceTree.reloadNode(oldNode, false,
											function() {
												if (r.get('categoryInstanceId') == window.parent
														.getCheckNode().id) {
													window.parent
															.getNodeById(r
																	.get('categoryInstanceId'))
															.setText(oldTitleText);
													window.parent.document
															.getElementById("center_frame").firstChild.firstChild.innerHTML = oldTitleText;
												}
												oldNode.setText(oldTitleText);
												window.parent.historyViewModel = false;
												window.parent.setEnable(true);
												cateInstancePanel.mainpanel
														.getTopToolbar()
														.enable();
												cateInstancePanel
														.updateFirstAttriTab(oldNode.id);
												button
														.setText(''
																+ getResource('resourceParam1711')
																+ '');
												button
														.setHandler(cateInstancePanel.viewHistoryHandler);
											});
								});
							});
							button.enable();
							win.close();
						});
			}
		}, {
			text : '' + getResource('resourceParam506') + '',
			handler : function() {
				win.close();
			}
		}]
	});
	win.show();
}
cateInstancePanel.initVersionSetWin = function(nodeid) {
	var win = new Ext.Window({
		width : 500,
		height : 300,
		title : '' + getResource('resourceParam1721') + '',
		modal : true,
		autoScroll : true,
		layout : 'fit',
		items : [versionSetTreeGrid.init(nodeid)],
		bbar : ['->', {
			text : '' + getResource('resourceParam479') + '',
			listeners : {
				'click' : function(button) {

					button.disable();
					var store = win.get(0).getStore();
					var tempArr = [];
					var arrVo = [];
					for (var i = 0; i < store.getCount(); i++) {
						var rec = store.getAt(i);
						if (rec.get('newversiontext') != ''
								+ getResource('resourceParam1716') + ''
								&& rec.get('newversiontext') != ''
										+ getResource('resourceParam1712') + '') {
							var child = [];
							for (var j = 0; j < store.getCount(); j++) {
								trec = store.getAt(j);
								if (trec.get('parent') == rec.id) {
									child.push(trec);
								}
							}
							for (var k = 0; k < child.length; k++) {
								if (child[k].get('newversiontext') == ''
										+ getResource('resourceParam1716') + '') {
									Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam596')
												+ '!',
										msg : ''
												+ getResource('resourceParam1947')
												+ ''
												+ rec
														.get('categoryinstancename')
												+ ''
												+ getResource('resourceParam1948')
												+ '！',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
									return;
								}
							}
							tempArr.push(rec);
						}
					}

					if (tempArr.length == 0) {
						button.enable();
						win.close();
					}
					for (var i = 0; i < tempArr.length; i++) {
						var rec = tempArr[i];
						var reg = /[^<>]*<(font)\s*(color=)([^<>]*)>.*<\/\1\s*>/;
						var str = rec.get('text');
						if (reg.exec(str)) {
							str = str.replace(reg, "$3");
						}
						var titleText = rec.get('categoryinstancename')
								+ '<font color=' + str + '>/'
								+ rec.get('newversiontext') + '</font>';
						if (rec.get('categoryinstanceid') == window.parent
								.getCheckNode().id) {
							window.parent.document
									.getElementById("center_frame").firstChild.firstChild.innerHTML = titleText;
							// EDMDataCenterTree.getNodeById(rec.get('categoryinstanceid')).text
							// = titleText;
						}
						var tempnode = cateInstanceTree.getNodeById(rec
								.get('categoryinstanceid'));
						if (tempnode) {
							tempnode.setText(titleText);
						}
						var vo = Seam.Component
								.newInstance("CategoryInstanceVersionVo");
						vo.setCategoryInstanceID(rec.get('categoryinstanceid'));
						vo.setVersion(rec.get('newversiontext'));
						if (rec.get('note') != ''
								+ getResource('resourceParam1723') + '') {
							vo.setNote(rec.get('note'));
						}
						arrVo.push(vo);
					}
					win.close();
					/**
					 * 修改设定多个节点版本时的一次性提交
					 */
					callSeam("datacenter_DataCenterRemote",
							"updateCategoryInstanceToNewVersions", [arrVo],
							function(result) {
								var obj = Ext.util.JSON.decode(result);
								if (obj.success == false) {
									Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam596')
												+ '!',
										msg : ''
												+ getResource('resourceParam1713')
												+ '',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR,
										fn : function() {
											win.close();
										}
									});
								} else {

									// 设定版本后刷新左侧菜单树
									window.parent.reload(function() {
											});
									Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam596')
												+ '!',
										msg : ''
												+ getResource('resourceParam1717')
												+ '',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.INFO,
										fn : function() {
										}
									})
								};
							});
					button.enable();
				}
			}
		}, {
			text : '' + getResource('resourceParam7007') + '',// 取消
			listeners : {
				'click' : function() {
					win.close();
				}
			}
		}]
	});
	win.show();
}
cateInstancePanel.treeinit = function() {
	var conn = synchronize.createXhrObject();
	var url = "../JSON/datacenter_DataCenterRemote.getDataCategoryMetaById?categoryid="
			+ cateInstanceTree.checkinstancenode.attributes.categoryid;
	conn.open("GET", url, false);
	conn.send(null);
	var respText = conn.responseText;

	var obj = Ext.util.JSON.decode(respText);
	var categoryName = obj.categoryName;
	cateInstancePanel.treeloader = new Ext.tree.TreeLoader({
				url : '../JSON/datacenter_DataCenterRemote.getObjectTree',
				baseParams : {
					nodeid : '',
					insid : cateInstanceTree.checkinstancenode.id
				}
			})

	cateInstancePanel.objectTree = new Ext.tree.TreePanel({
				tbar : [],
				id : 'objectTree',
				border : false,
				rootVisible : true,
				useArrows : false,
				autoShow : true,
				autoScroll : true,
				animate : false,
				enableDD : false,
				height : 270,
				frame : false,
				disabled : false,
				root : {
					id : cateInstanceTree.checkinstancenode.attributes.categoryid
							+ ',root',
					text : obj.categoryName,
					disabled : true,
					icon : cateInstanceTree.checkinstancenode.getUI()
							.getIconEl().src
				},
				loader : cateInstancePanel.treeloader,

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

	function getparent(node, nodeid) {
		if (node.id.split(",")[0] == nodeid) {
			var a = new Date();
			var b = new Date();

			cateInstancePanel.treeloader.baseParams.nodeid = a.toString() + ","
					+ b.toString();
		} else if (node == cateInstancePanel.objectTree.getRootNode()) {
			return node;
		} else {
			return getparent(node.parentNode, nodeid);
		}
	}
	cateInstancePanel.objectTree.on("click", function(node) {
				cateInstancePanel.checkobjectnode = node;

				if (node.attributes.type == '2') {
					cateInstancePanel.objname.setValue(node.text);
					cateInstancePanel.objname.disable();
				} else {
					if (cateInstancePanel.type == '2') {
						cateInstancePanel.objname.setValue('');
					}
					cateInstancePanel.objname.enable();
				}
				cateInstancePanel.type = node.attributes.type;
			});

	cateInstancePanel.treeloader.on("beforeload", function(treeloader, node) {
				cateInstancePanel.treeloader.baseParams.nodeid = "";
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
	cateInstancePanel.objectTree.getRootNode().expand(false, true,
			function(node) {
				var childs = cateInstancePanel.objectTree.getRootNode().childNodes;
				for (var i = 0; i < childs.length; i++) {
					if (childs[i].attributes.type == 1) {
						childs[i].enable();
					}
				}
			});

	cateInstancePanel.objname = new Ext.form.TextField({
				fieldLabel : '' + getResource('resourceParam1718') + '',
				allowBlank : false,
				blankText : '' + getResource('resourceParam1714') + '',
				anchor : '95%',
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
				regexText : '' + getResource('resourceParam1092') + '!',
				style : 'margin:2px 0px 0px 0px;',
				labelStyle : 'text-align:center;',
				validator : function() {
					var str = Ext.util.Format.trim(cateInstancePanel.objname
							.getValue());
					var size = 0;
					for (var i = 0; i < str.length; i++) {
						var code = str.charCodeAt(i);
						if (code > 255) {
							size += 2;
						} else {
							size += 1;
						}
					}
					if (size > 30) {
						cateInstancePanel.objname.invalidText = ' '
								+ getResource('resourceParam1378') + '30！';
						cateInstancePanel.objname.focus();
						return false;
					} else {
						return true;
					}
				}
			});
	cateInstancePanel.addform1 = new Ext.FormPanel({
				// region : 'center',
				items : [cateInstancePanel.objname]
			});
	cateInstancePanel.description = new Ext.form.TextField({
		fieldLabel : '' + getResource('resourceParam648') + '',
		// allowBlank : false,
		// blankText : '请输入对象名称',
		anchor : '90%',
		maxLength : 250,
		style : 'margin:2px 0px 0px 0px;',
		labelStyle : 'margin:0px 0px 0px 6px;'
			// labelStyle : 'text-align:center;'
		});
	cateInstancePanel.addform2 = new Ext.FormPanel({
				items : [cateInstancePanel.description]
			});
	var win = new Ext.Window({
		bbar : ['->', {
			text : '' + getResource('resourceParam479') + '',
			// style: 'margin: 0px 0px 0px 205px',
			listeners : {
				'click' : function(button) {

					if (!cateInstancePanel.objname.isValid()) {
						return;
					}
					button.disable();
					if (null == cateInstancePanel.checkobjectnode) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam596')
											+ '!',
									msg : '' + getResource('resourceParam1709')
											+ '',
									buttons : Ext.MessageBox.OK,
									width : 250,
									icon : Ext.MessageBox.ERROR
								});
						button.enable();
						return;
					}
					if (cateInstancePanel.checkobjectnode.attributes.type == '2') {
						var vo = Seam.Component.newInstance("CategoryInstance");
						vo.setCategoryID(cateInstancePanel.checkobjectnode.id
								.split(",")[0]);
						vo.setCategoryType(2);
						vo.setCategoryInstanceName(cateInstancePanel.objname
								.getValue());
						vo
								.setParentInstanceID(cateInstanceTree.checkinstancenode.id);
						vo
								.setDataCenterID(cateInstanceTree.checkinstancenode.attributes.dataCenterID);

						callSeam("datacenter_DataCenterRemote",
								"addCategoryInstanceNode", [vo], function(
										result) {
									var obj = Ext.util.JSON.decode(result);
									if (true == obj.success) {
										Ext.getCmp("cateInsPanel-catetree").items
												.get(0)
												.fireEvent(
														'click',
														cateInstanceTree.checkinstancenode);
										Ext.Msg.show({
											title : ''
													+ getResource('resourceParam596')
													+ '',
											msg : ''
													+ getResource('resourceParam623')
													+ '',
											width : 170,
											buttons : Ext.Msg.OK,
											icon : Ext.Msg.INFO
										});
										button.enable();
										win.close();
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
										button.enable();
										win.close();
									}
								});

					} else {

						var objname = cateInstancePanel.objname.getValue();
						if (objname == null || objname == '') {
							cateInstancePanel.objname.markInvalid(''
									+ getResource('resourceParam1715') + '');
							button.enable();
							return;
						}

						var limit = cateInstancePanel.checkobjectnode.attributes.multiplicity;
						var tempcount = 0;
						for (var i = 0; i < cateInstanceTree.checkinstancenode.childNodes.length; i++) {
							if (cateInstancePanel.checkobjectnode.id.split(",")[0] == cateInstanceTree.checkinstancenode.childNodes[i].attributes.categoryid) {
								tempcount++;
							}
						}
						if (tempcount >= limit.split("-")[1]
								&& limit.split("-")[1] != 'N') {
							Ext.Msg.show({
										title : ''
												+ getResource('resourceParam596')
												+ '',
										msg : ''
												+ getResource('resourceParam1707')
												+ '',
										width : 170,
										buttons : Ext.Msg.OK,
										icon : Ext.Msg.ERROR
									}).getDialog().setWidth(250);
							button.enable();
							return;
						}

						var vo = Seam.Component.newInstance("CategoryInstance");
						vo.setCategoryID(cateInstancePanel.checkobjectnode.id
								.split(",")[0]);
						vo.setCategoryType(1);
						vo.setCategoryInstanceName(cateInstancePanel.objname
								.getValue());
						vo
								.setParentInstanceID(cateInstanceTree.checkinstancenode.id);
						vo
								.setDataCenterID(cateInstanceTree.checkinstancenode.attributes.dataCenterID);
						var node = new Ext.tree.TreeNode({
									text : cateInstancePanel.objname.getValue(),
									leaf : true
								});
						// var treeObject =
						// parent.parent.contentWindow.window.EDMDataCenterTree;
						// alert(treeObject);
						callSeam("datacenter_DataCenterRemote",
								"addCategoryInstanceNode", [vo], function(
										result) {
									var obj = Ext.util.JSON.decode(result);
									if (true == obj.success) {
										Ext.Msg.show({
											title : ''
													+ getResource('resourceParam596')
													+ '',
											msg : ''
													+ getResource('resourceParam623')
													+ '',
											width : 170,
											buttons : Ext.Msg.OK,
											icon : Ext.Msg.INFO
										});
										var newinstance = new Ext.tree.AsyncTreeNode(
												{
													id : obj.instance.categoryInstanceID,
													text : cateInstancePanel.objname
															.getValue(),
													leaf : false,
													expandable : true,
													icon : cateInstancePanel.checkobjectnode.attributes.icon
												});

										Ext.apply(newinstance.attributes, {
											type : '1',
											categoryid : cateInstancePanel.checkobjectnode.id
													.split(",")[0],
											dataCenterID : obj.instance.dataCenterID,
											fixedRevision : obj.instance.fixedRevision,
											revision : obj.instance.revision

										});
										cateInstanceTree
												.appendChild(newinstance);

										// 代替 @新增 部分
										// Update by YangJin'gang at 2010-09-07
										// 10:50
										newinstance
												.setText(newinstance.text
														+ '<font color="blue">/A.0</font><font color=red>*</font>');
										cateInstanceTree
												.updateversionsymble(newinstance);

										/**
										 * @新增 版次更新reload
										 * 
										 * var nodeid = window.parent
										 * .getCheckNode().id;
										 * window.parent.reload(function() {
										 * cateInstanceTree.root.reload(
										 * function() { var node = window.parent
										 * .getNodeById(nodeid);
										 * 
										 * cateInstanceTree.root
										 * .setText(node.attributes.realName +
										 * node.text .substring(node.text
										 * .indexOf("\/")));
										 * cateInstanceTree.root .expand();
										 * window.parent.document
										 * .getElementById("center_frame").firstChild.firstChild.innerHTML =
										 * nodetext; }); });
										 */
										cateInstanceTree.reload();
										button.enable();
										win.close();
									} else {
										button.enable();
										Ext.Msg.show({
											title : ''
													+ getResource('resourceParam596')
													+ '',
											msg : obj.message,
											// msg : ''
											// + getResource('resourceParam594')
											// + '!',
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
			text : '' + getResource('resourceParam7007') + '',// 取消
			listeners : {
				'click' : function() {
					win.close();
				}
			}
		}],
		title : '新建对象',
		width : 300,
		// buttonAlign : 'left',
		modal : true,
		items : [cateInstancePanel.addform1, cateInstancePanel.objectTree,
				cateInstancePanel.addform2]

	});
	win.show();
	// cateInstancePanel.objectTree.getRootNode().disable();

}
