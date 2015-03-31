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
	var node = window.parent.getCustomCheckNode();
	// var node = window.parent.getCheckNode();
	// alert(node.attributes.revision);
	var newText = node.attributes.realName
			+ node.text.substring(node.text.indexOf("\/"));
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

	cateInstancePanel.mainpanel = new Ext.Panel({
		id : 'cateInstance_mainPanel',
		tbar : [{
			id : 'addobject',
			text : '' + getResource('resourceParam477') + '',
			disabled : false,
			icon : '../base/icons/page_add.png',
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
					cateInstancePanel.treeinit();
				}
			}
		}, '-', {
			id : 'instanceedit',
			text : '' + getResource('resourceParam490') + '',
			icon : "../base/icons/page_edit.png",
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
			icon : '../base/icons/page_delete.png',
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
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								})
						return;
					}

					Ext.Msg.confirm('' + getResource('resourceParam1724') + '',
							"" + getResource('resourceParam1720') + "?",
							function(btn) {
								if (btn == 'yes') {

									Ext.Ajax.request({
										url : '../JSON/datacenter_DataCenterRemote.delDataCateInstance',
										method : 'POST',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
											if (obj.success == true) {

												var parentnode = cateInstanceTree.checkinstancenode.parentNode;
												parentnode
														.removeChild(cateInstanceTree.checkinstancenode);
												var nodeid = window.parent
														.getCustomCheckNode().id;
												window.parent.customReload(
														function() {
															cateInstanceTree.root
																	.reload(
																			function() {
																				var nodetext = window.parent
																						.getNodeById(nodeid).text;
																				cateInstanceTree.root
																						.setText(nodetext);
																				cateInstanceTree.root
																						.expand(true);
																				window.parent.document
																						.getElementById("center_frame").firstChild.firstChild.innerHTML = nodetext;
																			});
														});
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
											idSequence : cateInstanceTree.checkinstancenode.id
										}
									});

								}
							});

				}
			}
		}, {
			hidden : true,
			id : 'cateinsprivilege',
			text : '' + getResource('resourceParam582') + '',
			handler : cateInstancePanel.dataPrivilegeHandler
		}, {

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
		}, {
			id : 'cateinssearch',
			text : '' + getResource('resourceParam652') + '',
			hidden : true,
			listeners : {
				'click' : function() {
					if (!cateInstanceTree.checkinstancenode) {
						Ext.example.msg("" + getResource('resourceParam596')
										+ "", ""
										+ getResource('resourceParam7005')
										+ ""// 请先
										+ getResource('resourceParam503') + ""
										+ getResource('resourceParam7006')
										+ "！");// 一个对象实例
						return;
					}
					var dataPanel = cateInstancePanel.centerPanel.items.get(0);
					if (dataPanel) {
						cateInstancePanel.centerPanel.remove(dataPanel);
						cateInstancePanel.centerPanel.doLayout();
					}
					var queryPanel = queryDataPanel.init();
					cateInstancePanel.centerPanel.add(queryPanel);
					cateInstancePanel.centerPanel.doLayout();

				}
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
									msg : '' + getResource('resourceParam1709')
											+ '',
									buttons : Ext.MessageBox.OK,
									width : 250,
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
			text : '' + getResource('resourceParam1711') + '',
			handler : cateInstancePanel.viewHistoryHandler
		}, '-', {
			id : 'dataCompare-button',
			hidden : true,
			text : '' + getResource('resourceParam1722') + '',
			handler : cateInstancePanel.dataCompareHandler
		}],
		layout : 'border',
		items : [new Ext.Panel({
							id : 'cateInsPanel-catetree',
							region : 'west',
							layout : 'fit',
							border : true,
							width : 300,
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
cateInstancePanel.passApproveHandler = function() {

}
cateInstancePanel.submitApproveHandler = function() {
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
	approvePanel.init(cateInstancePanel.centerPanel,
			cateInstanceTree.checkinstancenode.id, 'DataObjectDataType', null,
			'' + getResource('resourceParam1719') + '', null);
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
	var tba = cateInstancePanel.centerPanel.items.get(0);
	if (tba) {
		cateInstancePanel.centerPanel.remove(tba);
	}
	var newPanel = cateInstanceAttriTab.init(nodeid);
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
									items : [dataCompareMain.zlineInit()]
								}), new Ext.Panel({
									region : 'north',
									height : 200,
									items : [dataCompareMain.gridInit()]
								})]
			});
	cateInstancePanel.centerPanel.add(panel);
	cateInstancePanel.centerPanel.doLayout();
}
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
				if (r.get('categoryInstanceId') == window.parent
						.getCustomCheckNode().id) {
					window.parent
							.getCustomNodeById(r.get('categoryInstanceId'))
							.setText(titleText);
					window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML = titleText;
				}
				cateInstanceTree.checkinstancenode.setText(titleText);
				var oldNode = cateInstanceTree.checkinstancenode;
				var oldRevision = oldNode.attributes.revision;
				window.parent.customHistoryViewModel = true;
				cateInstanceTree.reloadNode(oldNode, r.get('fixedRevision'),
						function() {

							window.parent.setCustomEnable(false);
							cateInstancePanel.mainpanel.getTopToolbar()
									.disable();
							cateInstancePanel.updateFirstAttriTab(oldNode.id);
							window.parent.customHistoryViewModel = true;
							var button = Ext.getCmp('cateinshistoryversion');
							button.setText(''
									+ getResource('resourceParam1705') + '');
							button.setHandler(function() {
								window.parent.customReload(function() {
									oldNode.attributes.revision = oldRevision;
									cateInstanceTree.reloadNode(oldNode, false,
											function() {
												if (r.get('categoryInstanceId') == window.parent
														.getCustomCheckNode().id) {
													window.parent
															.getCustomNodeById(r
																	.get('categoryInstanceId'))
															.setText(oldTitleText);
													window.parent.document
															.getElementById("center_frame").firstChild.firstChild.innerHTML = oldTitleText;
												}
												oldNode.setText(oldTitleText);
												window.parent.customHistoryViewModel = false;
												window.parent
														.setCustomEnable(true);
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
		items : [versionSetTreeGrid.init(nodeid)],
		bbar : ['->', {
			text : '' + getResource('resourceParam479') + '',
			listeners : {
				'click' : function(button) {
					button.disable();
					var store = win.get(0).getStore();
					var tempArr = [];
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
									button.enable();
									return;
								}
							}
							tempArr.push(rec);
						}
					}
					if (tempArr.length == 0) {
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
								.getCustomCheckNode().id) {
							window.parent.document
									.getElementById("center_frame").firstChild.firstChild.innerHTML = titleText;
							// EDMDataCenterTree.getNodeById(rec.get('categoryinstanceid')).text
							// = titleText;
						}
						cateInstanceTree.getNodeById(rec
								.get('categoryinstanceid')).setText(titleText);
						var vo = Seam.Component
								.newInstance("CategoryInstanceVersionVo");
						vo.setCategoryInstanceID(rec.get('categoryinstanceid'));
						vo.setVersion(rec.get('newversiontext'));
						if (rec.get('note') != ''
								+ getResource('resourceParam1723') + '') {
							vo.setNote(rec.get('note'));
						}
						button.enable();
						win.close();
						callSeam("datacenter_DataCenterRemote", "updateCategoryInstanceToNewVersion", [vo], function(result) {
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
										button.enable();
										win.close();
									}
								});
							}
							window.parent.customReload();
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
							});
						});
						button.enable();
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
	cateInstancePanel.objectTree.getRootNode().expand(true, true, function() {
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
				items : [cateInstancePanel.objname]
			});
	cateInstancePanel.description = new Ext.form.TextField({
				fieldLabel : '' + getResource('resourceParam648') + '',
				// allowBlank : false,
				// blankText : '请输入对象名称',
				anchor : '95%',
				maxLength : 250
			});
	cateInstancePanel.addform2 = new Ext.FormPanel({
				items : [cateInstancePanel.description]
			});
	var win = new Ext.Window({
		bbar : [{
			text : '' + getResource('resourceParam479') + '',
			listeners : {
				'click' : function(button) {
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
								})
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
									});
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
													id : obj.cateid,
													text : cateInstancePanel.objname
															.getValue(),
													leaf : false,
													expandable : true,
													icon : cateInstancePanel.checkobjectnode.attributes.icon
												});

										Ext.apply(newinstance.attributes, {
											type : '1',
											categoryid : cateInstancePanel.checkobjectnode.id
													.split(",")[0]
										});
										cateInstanceTree
												.appendChild(newinstance);
										var nodeid = window.parent
												.getCustomCheckNode().id;
										window.parent.customReload(function() {
											cateInstanceTree.root.reload(
													function() {
														var nodetext = window.parent
																.getCustomNodeById(nodeid).text;
														cateInstanceTree.root
																.setText(nodetext);
														cateInstanceTree.root
																.expand();
														window.parent.document
																.getElementById("center_frame").firstChild.firstChild.innerHTML = nodetext;
													});
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
									}
								});
					}

				}
			}
		}, {
			text : '' + getResource('resourceParam7007') + '',//取消
			listeners : {
				'click' : function() {
					win.close();
				}
			}
		}],
		width : 300,
		modal : true,
		items : [cateInstancePanel.addform1, cateInstancePanel.objectTree,
				cateInstancePanel.addform2]

	});
	win.show();
	// cateInstancePanel.objectTree.getRootNode().disable();

}
