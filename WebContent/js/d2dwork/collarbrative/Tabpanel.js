var collarbTabpanel = {};

collarbTabpanel.init = function() {
	collarbTabpanel.taskCardFrame = TaskCardFrame.init();
	// TAB 1
	collarbTabpanel.form = collarbViewForm.init();
	// 创建任务的类型，'same'同级任务 'sub'子任务
	collarbTabpanel.kind = 'same';
	collarbTabpanel.gridpanel1 = new Ext.Panel({
				title : ''+getResource('resourceParam859')+'',
				frame : false,
				autoHeight : true,
				boder : false,
				layout : 'fit',
				items : [collarbTabpanel.form]
			});

	collarbTabpanel.addsame = new Ext.Action({
				text : ''+getResource('resourceParam1188')+'',
				disabled : true,
				handler : function() {
					/*
					 * collarbTabpanel.panel2center中的两个items分别是
					 * collarbTabpanel.taskCardFrame和collarbCenter.etabpanel
					 */
					collarbTabpanel.kind = 'same';
					TaskCardFrame.basicForm.setTitle(''+getResource('resourceParam1189')+'');
					collarbCenter.etabpanel.setVisible(false);
					collarbTabpanel.taskCardFrame.setVisible(true);
					collarbTabpanel.panel2center.doLayout();

					Ext.getCmp('nextstep').setVisible(true);
					Ext.getCmp('submitform').setVisible(false);
					Ext.getCmp('formerstep').setVisible(false);
					TaskCardFrame.card.layout.setActiveItem(0);

					TaskCardFrame.basicForm.getForm().reset();
				}
			});
	collarbTabpanel.addsub = new Ext.Action({
				text : ''+getResource('resourceParam1191')+'',
				disabled : true,
				handler : function() {
					/*
					 * collarbTabpanel.panel2center中的两个items分别是
					 * collarbTabpanel.taskCardFrame和collarbCenter.etabpanel
					 */
					collarbTabpanel.kind = 'sub';
					TaskCardFrame.basicForm.setTitle(''+getResource('resourceParam1192')+'');
					collarbCenter.etabpanel.setVisible(false);
					collarbTabpanel.taskCardFrame.setVisible(true);
					collarbTabpanel.panel2center.doLayout();
					Ext.getCmp('nextstep').setVisible(true);
					Ext.getCmp('submitform').setVisible(false);
					Ext.getCmp('formerstep').setVisible(false);
					TaskCardFrame.card.layout.setActiveItem(0);
					TaskCardFrame.basicForm.getForm().reset();
				}
			});

	// TAB 2, items
	collarbTabpanel.panel2west = new Ext.Panel({
				id : 'wwpanel',
				region : 'west',
				width : 200,
				autoScroll : true,
				collapsible : true,
				split : true,
				title : ''+getResource('resourceParam1193')+'',
				layout : 'fit'
			});
	// TAB 2, items
	collarbTabpanel.panel2center = collarbCenter.init();

	function deleteTask() {
		// 没有选中要删除的任务
		if (collarbMain.leafId == null) {
			Ext.Msg.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam1181')+'')
		} else {
			Ext.Msg.confirm(''+getResource('resourceParam575')+'', ""+getResource('resourceParam1182')+"", function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : "../JSON/task_TaskRemote.getTaskInfo",
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.tstatus == ''+getResource('resourceParam1117')+'') {
								Ext.Msg.alert(""+getResource('resourceParam575')+"", ""+getResource('resourceParam1187')+"!");
							} else if (obj.tstatus == ''+getResource('resourceParam948')+'') {
								Ext.Msg.alert(""+getResource('resourceParam575')+"", ""+getResource('resourceParam1163')+"");
							} else {
								Ext.Ajax.request({
									url : "../JSON/project_ProjectRemote.deleteTask",
									method : 'POST',
									success : function(response, options) {
										var obj = Ext.util.JSON
												.decode(response.responseText);
										if (obj.success == true) {
											var currentNode = collarbTabpanel.tasktree
													.getNodeById(collarbTaskTree.nodeId);
											var parentNode = currentNode.parentNode;
											collarbTabpanel.tasktree.fireEvent(
													'click', parentNode);// 刷新父节点，当父节点为根节点时，click，使其不能建同级任务
											parentNode.select();
											currentNode.remove(currentNode);
										} else {
											Ext.Msg.alert(""+getResource('resourceParam575')+"", obj.error);
										}

									},
									disableCaching : true,
									autoAbort : true,
									params : {
										project : collarbMain.leafId,
										node : collarbTaskTree.nodeId
									}
								});// deleteTask

							}
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							node : collarbTaskTree.nodeId
						}
					});// getProjectInfo
				}
			});
		}
	}
	function terminateTask() {
		// 没有选中要终止的任务
		if (collarbMain.leafId == null) {
			Ext.Msg.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam1183')+'')
		} else {
			Ext.Msg.confirm(''+getResource('resourceParam575')+'', ""+getResource('resourceParam1184')+"", function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : "../JSON/project_ProjectRemote.getTaskInfo",
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);

							Ext.Ajax.request({
								url : "../JSON/project_ProjectRemote.terminateTask",
								method : 'POST',
								success : function(response, options) {
									var obj = Ext.util.JSON
											.decode(response.responseText);
									if (obj.success == true) {

										var node = collarbTabpanel.tasktree
												.getNodeById(collarbTaskTree.nodeId);
										var newNode = null;
										if (node.isLeaf()) {
											newNode = new Ext.tree.TreeNode({
												id : node.id,
												text : node.text,
												attributes : '0',
												iconCls : 'icon-terminatedTask',
												leaf : true
											});
										} else {
											newNode = new Ext.tree.TreeNode({
												id : node.id,
												text : node.text,
												attributes : '0',
												iconCls : 'icon-terminatedTask',
												leaf : false,
												expandable : true
											});

										}
										var parentNode = node.parentNode;
										var nextNode = node.nextSibling;
										node.remove();
										if (nextNode != null) {
											parentNode.insertBefore(newNode,
													nextNode);

										} else {
											parentNode.appendChild(newNode);
										}
										newNode.on('beforeexpand', function(
														node) {
													collarbTaskTree.tag
															.getLoader()
															.load(node);
												});
										collarbTabpanel.tasktree.fireEvent(
												'click', newNode);// 刷新当前节点

									} else {
										Ext.Msg.alert(""+getResource('resourceParam575')+"", obj.error);
									}

								},
								disableCaching : true,
								autoAbort : true,
								params : {
									project : collarbMain.leafId,
									node : collarbTaskTree.nodeId
								}
							});

						},
						disableCaching : true,
						autoAbort : true,
						params : {
							node : collarbTaskTree.nodeId
						}
					});
				}
			});
		}
	}

	function moveUp() {
		var currentNode = collarbTabpanel.tasktree
				.getNodeById(collarbTaskTree.nodeId);
		var pNode = currentNode.previousSibling;
		if (collarbTaskTree.nodeId == 0) {
			// text 9027--不能    9028--一个
			Ext.Msg.alert(""+getResource('resourceParam575')+"", ""+getResource('resourceParam463')+ '' + getResource('resourceParam9027') + '' +getResource('resourceParam1197')+"，"+getResource('resourceParam459')+ '' + getResource('resourceParam9028') + '' +getResource('resourceParam733')+"！");
		} else if (pNode == null) {
			Ext.Msg.alert(""+getResource('resourceParam575')+"", ""+getResource('resourceParam1180')+"")
		} else {
			Ext.Msg.confirm(''+getResource('resourceParam575')+'', ""+getResource('resourceParam1186')+"?", function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
						url : "../JSON/project_ProjectRemote.moveUpTask",
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
								// 上移
								var currentNode = collarbTabpanel.tasktree
										.getNodeById(collarbTaskTree.nodeId);
								var parentNode = currentNode.parentNode;
								var pNode = currentNode.previousSibling;
								if (pNode == null) {
									Ext.Msg.alert(""+getResource('resourceParam575')+"", ""+getResource('resourceParam1180')+"")
								} else {
									currentNode.remove();
									parentNode.insertBefore(currentNode, pNode);
									collarbTabpanel.tasktree.fireEvent('click',
											currentNode);// 刷新当前节点
									currentNode.select();
								}
							} else {
								Ext.Msg.alert(""+getResource('resourceParam575')+"", obj.error);
							}
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							project : collarbMain.leafId,
							node : collarbTaskTree.nodeId,
							moveId : collarbTaskTree.previousNode
						}
					});
				}
			});
		}
	}

	function moveDown() {
		var currentNode = collarbTabpanel.tasktree
				.getNodeById(collarbTaskTree.nodeId);
		var nextNode = currentNode.nextSibling;
		if (collarbTaskTree.nodeId == 0) {
			// text : 9027--不能    9028--一个
			Ext.Msg.alert(""+getResource('resourceParam575')+"", ""+getResource('resourceParam463')+ '' + getResource('resourceParam9027') + '' +getResource('resourceParam1197')+"，"+getResource('resourceParam459')+ '' + getResource('resourceParam9028') + '' +getResource('resourceParam733')+"！");
		} else if (nextNode == null) {
			Ext.Msg.alert(""+getResource('resourceParam575')+"", ""+getResource('resourceParam1179')+"")
		} else {
			Ext.Msg.confirm(''+getResource('resourceParam575')+'', ""+getResource('resourceParam1185')+"", function(btn) {
				if (btn == 'yes') {
					Ext.Ajax.request({
								url : "../JSON/project_ProjectRemote.moveDownTask",
								method : 'POST',
								success : function(response, options) {
									var obj = Ext.util.JSON
											.decode(response.responseText);
									if (obj.success == true) {
										// 下移
										var currentNode = collarbTabpanel.tasktree
												.getNodeById(collarbTaskTree.nodeId);
										var parentNode = currentNode.parentNode;
										var nextNode = currentNode.nextSibling;
										var nextnextNode = null;
										if (nextNode == null) {
											Ext.Msg.alert(""+getResource('resourceParam575')+"", ""+getResource('resourceParam1179')+"")
										} else {
											nextnextNode = nextNode.nextSibling;
											currentNode.remove();
											parentNode.insertBefore(
													currentNode, nextnextNode);
											collarbTabpanel.tasktree.fireEvent(
													'click', currentNode);// 刷新当前节点
											currentNode.select();
										}
									} else {
										Ext.Msg.alert(""+getResource('resourceParam575')+"", obj.error);
									}
								},
								disableCaching : true,
								autoAbort : true,
								params : {
									project : collarbMain.leafId,
									node : collarbTaskTree.nodeId,
									moveId : collarbTaskTree.nextNode
								}
							});
				}
			});
		}
	}

	function copyTask() {
		Ext.getCmp('pasteTask').disable();
		collarbTaskTree.copyTaskId = collarbTaskTree.nodeId;
		collarbTaskTree.pasteType = 'copy';
	}
	function cutTask() {
		Ext.getCmp('pasteTask').disable();
		collarbTaskTree.cutTaskId = collarbTaskTree.nodeId;
		collarbTaskTree.pasteType = 'cut';

	}
	function pasteTask() {

		Ext.Ajax.request({
					url : "../JSON/project_ProjectRemote.pasteTask",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.success == true) {
							// removeTaskTree();
							// addTaskTree();
							if (collarbTaskTree.pasteType == 'cut') {
								var cutTaskNode = collarbTabpanel.tasktree
										.getNodeById(collarbTaskTree.cutTaskId);
								cutTaskNode.remove();
							}
							// 创建子任务
							var currentNode = collarbTabpanel.tasktree
									.getNodeById(collarbTaskTree.nodeId);
							var expandable = !obj.leaf;
							var newNode = new Ext.tree.TreeNode({
										id : obj.nodeId,
										text : obj.text,
										iconCls : obj.iconCls,
										attributes : obj.attributes,
										leaf : obj.leaf,
										expandable : expandable
									});
							currentNode.appendChild(newNode);
							currentNode.expand();

							var newAddNode = collarbTabpanel.tasktree
									.getNodeById(obj.nodeId);
							newAddNode.on('beforeexpand', function(node) {
										collarbTaskTree.tag.getLoader()
												.load(node);
									});
							collarbTabpanel.tasktree.fireEvent('click',
									newAddNode);// 点击该node
							newAddNode.select();
						} else {
							Ext.Msg.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam1178')+'');
						}
						// 显示task tab属性
						collarbCenter.etabpanel.setVisible(true);
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						project : collarbMain.leafId,// 所属的project id,start
						node : collarbTaskTree.nodeId,// 当前选中的节点
						copyTaskId : collarbTaskTree.copyTaskId,// 要复制的task id
						cutTaskId : collarbTaskTree.cutTaskId,// 要剪切的task id
						pastType : collarbTaskTree.pasteType
						// 复制还是剪切
					}
				});
	}

	collarbTabpanel.tab2main = new Ext.Panel({
				border : false,
				layout : 'border', // 布局模式
				items : [collarbTabpanel.panel2center,
						collarbTabpanel.panel2west],
				tbar : [{
							text : ''+getResource('resourceParam483')+'',
							menu : [collarbTabpanel.addsame,
									collarbTabpanel.addsub]
						}, '-', {
							id : 'taskterminate',
							text : ''+getResource('resourceParam1170')+'',
							disabled : false,
							handler : terminateTask
						}, '-', {
							id : 'taskdelete',
							iconCls : 'icon-delete',
							text : ''+getResource('resourceParam475')+'',
							disabled : false,
							listeners : {
								click : deleteTask,
								beforeclick : function() {
									// 先收起，再删除
									var currentNode = collarbTabpanel.tasktree
											.getNodeById(collarbTaskTree.nodeId);
									currentNode.collapse();

								}

							}
						}, '-', {
							id : 'copyTask',
							text : ''+getResource('resourceParam485')+'',
							disabled : true,
							handler : copyTask

						}, '-', {
							id : 'cutTask',

							text : ''+getResource('resourceParam486')+'',
							disabled : true,
							handler : cutTask
						}, '-', {
							id : 'pasteTask',
							iconCls : 'icon-pasteTask',
							text : ''+getResource('resourceParam487')+'',
							disabled : true,
							handler : pasteTask
						}, '-', {
							id : 'moveup',
							iconCls : 'icon-taskUp',
							text : ''+getResource('resourceParam488')+'',
							handler : moveUp
						}, '-', {
							id : 'movedown',
							iconCls : 'icon-taskDown',
							text : ''+getResource('resourceParam489')+'',
							handler : moveDown
						}, '-', {
							text : ''+getResource('resourceParam1195')+'',
							iconCls : 'icon-importTasks-2'
						}, '-', {
							text : ''+getResource('resourceParam1196')+'',
							iconCls : 'icon-exportTasks-2'
						}, '-', {
							text : ''+getResource('resourceParam652')+''
						}]
			});

	// TAB页面2

	collarbTabpanel.gridpanel2 = new Ext.Panel({
				id : 'tabpanel2',
				layout : 'fit',
				border : false,
				split : true,
				height : 780,
				title : ''+getResource('resourceParam1190')+'',
				listeners : {
					activate : addTaskTree,
					deactivate : removeTaskTree
				},
				items : [collarbTabpanel.tab2main]
			});

	function addTaskTree(tab) {
		collarbTabpanel.tasktree = collarbTaskTree.init();
		collarbTabpanel.panel2west.items.add(collarbTabpanel.tasktree);
//		collarbTabpanel.panel2west.items.insert(0, collarbTabpanel.tasktree);
		collarbTabpanel.tasktree.getRootNode().expand();
		collarbTabpanel.panel2west.doLayout();// 显示左侧的task 树
		collarbCenter.egridpanel1.doLayout();// 显示task 属性信息
		collarbCenter.etabpanel.setActiveTab(0);// 设置点击任务流程信息，显示任务属性页面
	}
	function removeTaskTree(tab) {
		Ext.getCmp('progressbar').updateProgress(0, ''+getResource('resourceParam1194')+'');
		collarbTabpanel.panel2west.remove(collarbTabpanel.tasktree);
	}

	// TAB页面3

	collarbTabpanel.gridpanel3 = new Ext.Panel({
		id : 'tabpanel3',
		height : 800,
		title : ''+getResource('resourceParam474')+'',
		html : '<div id="coopProjectPanel" style="height:675px;overflow-y:auto;"></div>'
	});
	collarbTabpanel.gridpanel3.on("activate", function() {

				var node = collarbMain.lefttree.getSelectionModel()
						.getSelectedNode();
				if (null != node && 0 != node.id) {
					taskProcessTab.init(node, "coopProjectPanel");
				}
			})
	// TAB面板
	collarbTabpanel.tabpanels = new Ext.TabPanel({
				id : 'tabe',
				minTabWidth : 300,
				resizeTabs : false,
				hidden : false,
				// disabled:true,
				items : [collarbTabpanel.gridpanel1,
						collarbTabpanel.gridpanel2, collarbTabpanel.gridpanel3],
				activeTab : 0
			});
	return collarbTabpanel.tabpanels;
}
