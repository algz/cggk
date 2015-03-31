var cateInstancePanel = {

	checkobjectnode : null,
	activeFlag : 1,
	createTime : ""
}
Ext.apply(Ext.QuickTips.getQuickTip(), {
			autoHeight : true,
			dismissDelay : 0,
			autoWidth : true
		});
Ext.QuickTips.init();
cateInstancePanel.init = function(projectid, projectname) {
	// alert(projectid);
	window.parent.historyViewModel = false;
	var node = new Ext.tree.TreeNode({
				id : null == projectid || undefined == projectid
						|| "" == projectid ? 'course' : projectid,
				text : null == projectname || undefined == projectname
						|| "" == projectname
						? getResource('resourceParam724')
						: projectname,
				icon : '../base/icons/edm/dataObject.png'

			});

	Ext.apply(node.attributes, {
				categoryid : "",
				dataCenterID : "",
				revision : ""
			});
	// alert(node.id);
	var catetree = cateInstanceTree.init(node.id, node.text,
			node.attributes.categoryid, node.attributes.dataCenterID, "",
			node.attributes.revision, true);
	cateInstancePanel.attributepanel = cateInstanceAttriTab.init();
	cateInstancePanel.centerPanel = new Ext.Panel({
				id : 'centerpanel',
				layout : 'fit',
				region : 'center',
				border : false,
				items : [cateInstancePanel.attributepanel]
			});

	cateInstancePanel.mainpanel = new Ext.Panel({
				id : 'cateInstance_mainPanel',
				tbar : [{
					id : 'cateinshistoryversion',
					text : '' + getResource('resourceParam576') + ''
							+ getResource('resourceParam1943') + '',
					handler : cateInstancePanel.viewHistoryHandler
				}, '-', {}],
				layout : 'border',
				frame : true,

				items : [new Ext.Panel({
									id : 'cateInsPanel-catetree',
									region : 'west',
									layout : 'fit',
									border : false,
									width : 300,
									items : [catetree],
									split : true

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
		tba.purgeListeners();
		cateInstancePanel.centerPanel.items.get(0).items.get(0).removeAll();
		Ext.getCmp('centerpanel').removeAll();
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
		node = cateInstanceTree.attributeTree.getRootNode();
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
			catetree.fireEvent('click', cateInstanceTree.attributeTree
							.getRootNode());
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
				cateInstancePanel.createTime = r.get('createTime');
				// if (r.get('categoryInstanceId') ==
				// window.parent.getCheckNode().id) {
				// window.parent.getNodeById(r.get('categoryInstanceId'))
				// .setText(titleText);
				// window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML
				// = titleText;
				// }
				cateInstanceTree.checkinstancenode.setText(titleText);
				var oldNode = cateInstanceTree.checkinstancenode;
				var oldRevision = oldNode.attributes.revision;
				window.parent.historyViewModel = true;
				// alert(oldRevision);
				cateInstanceTree.reloadNode(oldNode, r.get('fixedRevision'),
						function() {
							// window.parent.setEnable(false);
							cateInstancePanel.mainpanel.getTopToolbar()
									.disable();
							cateInstancePanel.updateFirstAttriTab(oldNode.id);
							window.parent.historyViewModel = true;
							var button = Ext.getCmp('cateinshistoryversion');
							button.setText(''
									+ getResource('resourceParam1705') + '');
							button.setHandler(function() {
								// window.parent.reload(function() {
								oldNode.attributes.revision = oldRevision;
								cateInstanceTree.reloadNode(oldNode, false,
										function() {
											cateInstancePanel.createTime = "";
											oldNode.setText(oldTitleText);
											window.parent.historyViewModel = false;
											// window.parent.setEnable(true);
											cateInstancePanel.mainpanel
													.getTopToolbar().enable();
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
							// });
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
				'click' : function() {
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
								.getCheckNode().id) {
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
						win.close();
						callSeam("datacenter_DataCenterRemote",
								"updateCategoryInstanceToNewVersion", [vo],
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
									}
									window.parent.reload();
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
}
