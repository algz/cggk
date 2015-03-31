Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var colligateMain = {
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null
};
colligateMain.init = function() {
	collarbExtendForm.tpye="2";
	ProjectFolderForm.tpye="2";
	var copy = new Ext.KeyMap(document, {
				key : 'c',
				ctrl : true,
				fn : function() {
					var nodeId = leftNavigationTree.nodeId;
					if (nodeId.indexOf("p") == 0) {
						// 项目
						colligateMain.pasteCate = 'project';
						colligateMain.copyProjectId = leftNavigationTree.nodeId;
						colligateMain.copyProjectNode = colligateMain.leftTree
								.getNodeById(leftNavigationTree.nodeId);
						colligateMain.pasteType = 'copy';
						Ext.getCmp('pasteTask').disable();
					} else if (nodeId.indexOf("vp") == 0) {
						// 虚拟项目
						colligateMain.pasteCate = '';
						alert('关联项目不能复制');
					} else {
						// 任务复制
						colligateMain.pasteCate = 'task';
						colligateMain.copyTaskId = leftNavigationTree.nodeId;
						colligateMain.copyTaskNode = colligateMain.leftTree
								.getNodeById(leftNavigationTree.nodeId);
						colligateMain.pasteType = 'copy';
						Ext.getCmp('pasteTask').disable();
					}
				},
				scope : this
			});
	var cut = new Ext.KeyMap(document, {
				key : 'x',
				ctrl : true,
				fn : function() {
					var nodeId = leftNavigationTree.nodeId;
					if (nodeId.indexOf("p") == 0) {
						// 项目
						colligateMain.pasteCate = 'project';
						colligateMain.cutProjectId = leftNavigationTree.nodeId;
						colligateMain.cutProjectNode = colligateMain.leftTree
								.getNodeById(leftNavigationTree.nodeId);
						colligateMain.pasteType = 'cut';
						Ext.getCmp('pasteTask').disable();
						// cut时维护节点pre nex
						var currentNode = colligateMain.leftTree
								.getNodeById(leftNavigationTree.nodeId);
						var previousNode = currentNode.previousSibling;
						var nextNode = currentNode.nextSibling;
						// 维护节点的pre和 nex
						if (previousNode != null) {
							previousNode.attributes.nex = currentNode.attributes.nex;
						}
						if (nextNode != null) {
							nextNode.attributes.pre = currentNode.attributes.pre;
						}

					} else if (nodeId.indexOf("vp") == 0) {
						// 虚拟项目
						colligateMain.pasteCate = '';
						alert('关联项目不能剪切');
					} else {
						// 任务剪切
						colligateMain.pasteCate = 'task';
						colligateMain.cutTaskId = leftNavigationTree.nodeId;
						colligateMain.cutTaskNode = colligateMain.leftTree
								.getNodeById(leftNavigationTree.nodeId);
						colligateMain.pasteType = 'cut';
						Ext.getCmp('pasteTask').disable();
						// cut时维护节点pre nex
						var currentNode = colligateMain.leftTree
								.getNodeById(leftNavigationTree.nodeId);
						var previousNode = currentNode.previousSibling;
						var nextNode = currentNode.nextSibling;
						// 维护节点的pre和 nex
						if (previousNode != null) {
							previousNode.attributes.nex = currentNode.attributes.nex;
						}
						if (nextNode != null) {
							nextNode.attributes.pre = currentNode.attributes.pre;
						}
					}
				},
				scope : this
			});
	var paste = new Ext.KeyMap(document, {
		key : 'v',
		ctrl : true,
		fn : function() {
			if (colligateMain.pasteCate == 'project') {
				// 项目
				Ext.Msg.confirm('' + getResource('resourceParam575') + '',
						"是否粘贴当前项目", function(btn) {
							if (btn == 'yes') {
								colligateMain.pasteMask.show();
								Ext.Ajax.request({
									url : "../JSON/project_ProjectRemote.paste_Project",
									method : 'POST',
									success : function(response, options) {
										colligateMain.pasteMask.hide();
										var obj = Ext.util.JSON
												.decode(response.responseText);
										if (obj.success == true) {
											if (colligateMain.pasteType == 'cut') {
												Ext.getCmp('pasteTask')
														.disable();
												if (leftNavigationTree.nodeId
														.indexOf('c') == 0) {
													leftNavigationTree.nodeId = 0;
													colligateMain.refresh(true);
												} else {
													leftNavigationTree.nodeId = 0;
													colligateMain.refresh(true);
												}

											} else if (colligateMain.pasteType == 'copy') {
												if (leftNavigationTree.nodeId
														.indexOf('c') == 0) {
													leftNavigationTree.nodeId = 0;
													colligateMain.refresh(true);
												} else {
													leftNavigationTree.nodeId = 0;
													colligateMain.refresh(true);

												}

											}

										} else {
											colligateMain.refresh();
											Ext.MessageBox.show({
												title : ''
														+ getResource('resourceParam499')
														+ '',
												msg : obj.message,
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
											});
										}
									},
									disableCaching : true,
									autoAbort : true,
									params : {
										node : leftNavigationTree.nodeId,// 当前选中的节点
										copyProjectId : colligateMain.copyProjectId,// 
										// id
										cutProjectId : colligateMain.cutProjectId,// 
										// id
										pastType : colligateMain.pasteType
										// 复制还是剪切
									}
								});
							}
						});

			} else if (colligateMain.pasteCate == 'task') {
				Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
								+ getResource('resourceParam1544') + "?",
						function(btn) {
							if (btn == 'yes') {
								colligateMain.pasteMask.show();
								Ext.Ajax.request({
									url : "../JSON/task_TaskRemote.paste_Task",
									method : 'POST',
									success : function(response, options) {
										colligateMain.pasteMask.hide();
										var obj = Ext.util.JSON
												.decode(response.responseText);
										if (obj.success == true) {

											var projectId = null;
											var chargedManId = null;
											if (colligateMain.pasteType == 'cut') {
												Ext.getCmp('pasteTask')
														.disable();
												var cutTaskNode = colligateMain.leftTree
														.getNodeById(colligateMain.cutTaskId);
												if (cutTaskNode == null) {
													cutTaskNode = colligateMain.cutTaskNode;
												}

												projectId = cutTaskNode.attributes.projectId;
												chargedManId = cutTaskNode.attributes.chargedManId;
												colligateMain.cutTaskId = null;
												colligateMain.cutTaskNode = null;
												cutTaskNode.remove();
											} else if (colligateMain.pasteType == 'copy') {
												var copyTaskNode = colligateMain.leftTree
														.getNodeById(colligateMain.copyTaskId);
												if (copyTaskNode == null) {
													copyTaskNode = colligateMain.copyTaskNode;
												}
												projectId = copyTaskNode.attributes.projectId;
												chargedManId = copyTaskNode.attributes.chargedManId;
											}
											// 创建子任务
											var currentNode = colligateMain.leftTree
													.getNodeById(leftNavigationTree.nodeId);
											currentNode.attributes.leaf = false;
											var expandable = !obj.leaf;
											currentNode.beginUpdate();
											var newNode = colligateMain.leftTree
													.getLoader().createNode({
														id : obj.nodeId,
														text : obj.text,
														projectId : obj.projectId,
														iconCls : obj.iconCls,
														statusId : obj.statusId,
														allowDrop : obj.allowDrop,
														allowDrag : false,
														chargedManId : obj.chargedManId,
														nt : obj.nt,
														leaf : obj.leaf,
														approval : obj.approval,
														expandable : expandable
													});

											var lastChildNode = currentNode.lastChild;
											if (lastChildNode != null) {
												// 粘贴时，维护新节点于最后一个节点的
												// pre，nex
												newNode.attributes.pre = lastChildNode.attributes.id;
												newNode.attributes.nex = lastChildNode.attributes.nex;

												lastChildNode.attributes.nex = newNode.attributes.id;
											} else {
												newNode.attributes.pre = '';
												newNode.attributes.nex = '';
											}

											currentNode.appendChild(newNode);
											currentNode.endUpdate();
											currentNode.expand();
										} else {
											colligateMain.refresh();
											Ext.MessageBox.show({
												title : ''
														+ getResource('resourceParam499')
														+ '',
												msg : obj.message,
												buttons : Ext.MessageBox.OK,
												icon : Ext.MessageBox.ERROR
											});
										}
									},
									disableCaching : true,
									autoAbort : true,
									params : {
										node : leftNavigationTree.nodeId,// 当前选中的节点
										copyTaskId : colligateMain.copyTaskId,// 要复制的task
										// id
										cutTaskId : colligateMain.cutTaskId,// 要剪切的task
										// id
										pastType : colligateMain.pasteType
										// 复制还是剪切
									}
								});
							}
						});
			} else {
				// 虚拟项目
				alert('关联项目不能粘贴');
			}
		},
		scope : this
	});

	colligateMain.refresh = function(para) {
		if (para) {
			Ext.get('refreshProject').hide();
		}
		Ext.Ajax.request({
					url : "../JSON/project_ProjectRemote.refreshTreeNode",
					method : 'POST',
					success : function(response, options) {
						var obj = Ext.util.JSON.decode(response.responseText);
						var node = colligateMain.leftTree
								.getNodeById(leftNavigationTree.nodeId);
						updateTreeNode(node, obj);
						if (obj.success == true) {
							Ext.get('refreshProject').fadeIn({
										duration : 2
									});
							node.on('expand', function() {
										Ext.get('refreshProject').fadeIn({
													duration : 2
												});
									});
							colligateMain.leftTree.fireEvent('beforeclick', node);// 点击该node
							colligateMain.leftTree.fireEvent('click', node,
									Ext.EventObject.ctrlKey);// 点击该node
							if (para) {
								if (!node.isExpanded()) {
									node.expand();
								} else {
									colligateMain.leftTree.getLoader().load(node);
									node.expand();
								}
							}
							// if (node.id != 0) {
							// var expandable = !obj.leaf;
							// var allowDrag = false;
							// if (node.id.indexOf('p') == 0) {
							// allowDrag = true;
							// }
							// var newNode = new Ext.tree.TreeNode({
							// id : obj.id,
							// text : obj.text,
							// iconCls : obj.iconCls,
							// statusId : obj.statusId,
							// allowDrop : obj.allowDrop,
							// allowDrag : allowDrag,
							// leaf : obj.leaf,
							// chargedManId : obj.chargedManId,
							// projectId : obj.projectId,
							// expandable : expandable
							// });
							// newNode.on('beforeexpand', function(node) {
							// colligateMain.leftTree.getLoader().load(node);
							// });
							// newNode.on('expand', function() {
							// Ext.get('refreshProject').fadeIn({
							// duration : 2
							// });
							// });
							// var parentNode = node.parentNode;
							// var nextNode = node.nextSibling;
							// var previousNode = node.previousSibling;
							// if (nextNode == null && previousNode == null) {
							// // 点击的节点 没有任何兄弟节点
							// var tempNode = new Ext.tree.TreeNode({
							// id : new Date().toString()
							// });
							// parentNode.appendChild(tempNode);
							// node.remove();
							// parentNode.appendChild(newNode);
							// tempNode.remove();
							// // newNode.select();
							// colligateMain.leftTree.fireEvent('beforeclick',
							// newNode);// 点击该node
							// colligateMain.leftTree.fireEvent('click', newNode,
							// Ext.EventObject.ctrlKey);// 点击该node
							// if (para) {
							// newNode.expand();
							// }
							// } else {
							// node.remove();
							// if (nextNode != null) {
							// parentNode.insertBefore(newNode, nextNode);
							// } else {
							// parentNode.appendChild(newNode);
							// }
							// // newNode.select();
							// colligateMain.leftTree.fireEvent('beforeclick',
							// newNode);// 点击该node
							// colligateMain.leftTree.fireEvent('click', newNode,
							// Ext.EventObject.ctrlKey);// 点击该node
							// if (para) {
							// newNode.expand();
							// }
							// }
							// } else if (node.id == 0) {
							// colligateMain.westPanel.remove(colligateMain.leftTree);
							// colligateMain.leftTree =
							// leftNavigationTree.init("coop");
							// leftNavigationTree.treePanel.on('beforeclick',
							// beforeclick);
							// leftNavigationTree.treePanel.on('click', click,
							// Ext.EventObject.ctrlKey);
							// colligateMain.westPanel.items.add(colligateMain.leftTree);
							// colligateMain.westPanel.doLayout();
							// var root = colligateMain.leftTree.getRootNode();
							// colligateMain.leftTree.fireEvent('beforeclick',
							// root);//
							// 点击该node
							// colligateMain.leftTree.fireEvent('click', root,
							// Ext.EventObject.ctrlKey);// 点击该node
							// root.on('expand', function() {
							// Ext.get('refreshProject').fadeIn({
							// duration : 2
							// });
							// });
							// root.expand();
							// }
						} else {
							Ext.get('refreshProject').fadeIn({
										duration : 2
									});
							// if (obj.remove) {
							// var parentNode = node.parentNode;
							// if (parentNode != null) {
							// colligateMain.leftTree.fireEvent('beforeclick',
							// parentNode);// 点击该node
							// colligateMain.leftTree.fireEvent('click',
							// parentNode,
							// Ext.EventObject.ctrlKey);// 点击该node
							// } else {
							// var root = colligateMain.leftTree.getRootNode();
							// colligateMain.leftTree.fireEvent('beforeclick',
							// root);//
							// 点击该node
							// colligateMain.leftTree.fireEvent('click', root,
							// Ext.EventObject.ctrlKey);// 点击该node
							// }
							// node.remove();
							// }
						}
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						node : leftNavigationTree.nodeId
						// 选中的节点
					}
				});
	}

	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'qtip';
	Ext.form.Field.prototype.labelSeparator = '';
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";// 设置默认编码为utf-8
	Ext.Ajax.timeout = 30000;

	colligateMain.leftTree = colligateTree.init("coop");
	// colligateMain.leftTree.selModel = new Ext.tree.MultiSelectionModel();
	colligateMain.leftTree.getRootNode().expand();
	colligateMain.tabPanel = colligateTabPanel.init();
	var config = {
		createByTemplateCallBack : colligateMain.refresh
	};
	colligateMain.createPanel = collarbCreatePanel.init(config);
	colligateMain.privilegeSet = null;// 权限设置面板
	colligateMain.columnTree = null;
	// colligateMain.approveFlowPanel = approveFlowInfo.init();
	// colligateMain.myApproveTask = myApproveTaskPanel.init();
	colligateMain.approvePanel = null// 审批面板
	colligateMain.project = null;// 新建项目面板
	colligateMain.task = null;// 新建任务面板
	colligateMain.updateProject = null;
	colligateMain.updateTask = null;
	var action = new Ext.Action({
				id : 'createProjectByManual',
				text : '' + getResource('resourceParam1549') + '',
				disabled : true,
				handler : function() {
					if (colligateMain.project == null) {
						colligateMain.project = collarbCardFrame.init();
						collarbCreatePanel.createProject
								.add(colligateMain.project);
					} else {
						collarbCreatePanel.createProject
								.remove(colligateMain.project);
						colligateMain.project = collarbCardFrame.init();
						collarbCreatePanel.createProject
								.add(colligateMain.project);
					}
					colligateMain.cardPanel.getLayout().setActiveItem(1);
					collarbCreatePanel.cardPanel.getLayout().setActiveItem(0);
					collarbCreatePanel.cardPanel.doLayout();
					var currentNode = colligateMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					currentNode.expand();

				}
			});
	var action1 = new Ext.Action({
				id : 'createProjectByFlow',
				disabled : true,
				text : '' + getResource('resourceParam1166') + '',
				handler : function() {
				}
			});
	var action5 = new Ext.Action({
				id : 'createByWBSTemplate',
				// disabled : true,
				hidden : true,
				text : '从' + getResource('resourceParam943') + '模板创建',
				handler : function() {
					applyTemplateMain.load();
					// 模板创建的任务的目标Id
					applyTemplateMain.targetId = leftNavigationTree.nodeId;
					colligateMain.cardPanel.getLayout().setActiveItem(1);
					collarbCreatePanel.cardPanel.getLayout().setActiveItem(8);
					collarbCreatePanel.cardPanel.doLayout();
				}
			});
	var action6 = new Ext.Action({
		id : 'createApproveTask',
		hidden : true,
		text : '创建' + getResource('resourceParam1020') + '',
		handler : function() {
			colligateMain.kind = 'sub';
			// 任务的时间限制，任务时间限制在父project计划时间内,或自父任务内
			Ext.Ajax.request({
				url : "../JSON/task_TaskRemote.getTaskTimeScale",
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					var successCallback = function(obj) {
						// 创建子任务
						var currentNode = colligateMain.leftTree
								.getNodeById(leftNavigationTree.nodeId);
						currentNode.attributes.leaf = false;
						currentNode.attributes.expandable = true;
						var newNode = colligateMain.leftTree.getLoader()
								.createNode({
											id : obj.nodeId,
											text : obj.text,
											projectId : obj.projectId,
											iconCls : obj.iconCls,
											nt : obj.nt,// 审批任务
											leaf : true
										});

						var lastChildNode = currentNode.lastChild;
						if (lastChildNode != null) {
							// 粘贴时，维护新节点于最后一个节点的
							// pre，nex
							newNode.attributes.pre = lastChildNode.attributes.id;
							newNode.attributes.nex = lastChildNode.attributes.nex;

							lastChildNode.attributes.nex = newNode.attributes.id;
						} else {
							newNode.attributes.pre = '';
							newNode.attributes.nex = '';
						}
						currentNode.beginUpdate();
						currentNode.appendChild(newNode);
						currentNode.endUpdate();
						currentNode.expand();
						colligateMain.refresh();
					}
					if (obj.success == true) {
						if (colligateMain.updateApproveTask) {
							collarbCreatePanel.updateApproveTask
									.remove(colligateMain.updateApproveTask);
							colligateMain.updateApproveTask = null;
						}
						if (colligateMain.approveTask == null) {
							colligateMain.approveTask = createApproveTask.init(
									null, leftNavigationTree.nodeId,
									"TaskDataType", canelApproveTask, '',
									successCallback);
							collarbCreatePanel.createApproveTask
									.add(colligateMain.approveTask);
						} else {
							collarbCreatePanel.createApproveTask
									.remove(colligateMain.approveTask);
							colligateMain.approveTask = createApproveTask.init(
									null, leftNavigationTree.nodeId,
									"TaskDataType", canelApproveTask, '',
									successCallback);
							collarbCreatePanel.createApproveTask
									.add(colligateMain.approveTask);
						}
						colligateMain.cardPanel.getLayout().setActiveItem(1);
						collarbCreatePanel.cardPanel.getLayout()
								.setActiveItem(9);
						collarbCreatePanel.cardPanel.doLayout();

						var currentNode = colligateMain.leftTree
								.getNodeById(leftNavigationTree.nodeId);
						currentNode.expand();

					} else {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam499')
											+ '',
									msg : obj.message,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
					}
				},
				disableCaching : true,
				autoAbort : true,
				params : {
					node : leftNavigationTree.nodeId,
					method : colligateMain.kind
					// 同级任务，或子任务
				}
			});
		}
	});
	var action4 = new Ext.Action({
				id : 'createProjectFolder',
				disabled : true,
				text : '' + getResource('resourceParam1546') + '',
				handler : function() {
					colligateMain.projectFolder = ProjectFolderForm.init();
					collarbCreatePanel.createProjectFolder
							.add(colligateMain.projectFolder);
					colligateMain.cardPanel.getLayout().setActiveItem(1);
					collarbCreatePanel.cardPanel.getLayout().setActiveItem(5);
					collarbCreatePanel.cardPanel.doLayout();
					var currentNode = colligateMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					currentNode.expand();
				}
			});
	colligateMain.createTaskCallBack = function(mes) {
		var newNode = null;
		if (colligateMain.kind == 'sub') {
			// 创建子任务
			var currentNode = colligateMain.leftTree
					.getNodeById(leftNavigationTree.nodeId);
			currentNode.attributes.leaf = false;
			currentNode.attributes.expandable = true;
			newNode = colligateMain.leftTree.getLoader

			().createNode({
						id : mes.nodeId,
						text : TaskBasicForm.name1,
						projectId : mes.projectId,
						chargedManId : TaskBasicForm.user1,
						iconCls : 'icon-planningTask',
						statusId : mes.statusId,
						nt : mes.nt,
						approval : mes.approval,
						allowDrop : mes.allowDrop,
						allowDrag : false,
						leaf : true
					});

			var lastChildNode = currentNode.lastChild;
			if (lastChildNode != null) {
				// 粘贴时，维护新节点于最后一个节点的
				// pre，nex
				newNode.attributes.pre = lastChildNode.attributes.id;
				newNode.attributes.nex = lastChildNode.attributes.nex;

				lastChildNode.attributes.nex = newNode.attributes.id;
			} else {
				newNode.attributes.pre = '';
				newNode.attributes.nex = '';
			}

			currentNode.beginUpdate();
			currentNode.appendChild(newNode);
			currentNode.endUpdate();
			currentNode.expand();
		} else if (colligateMain.kind == 'same') {
			// 创建同级任务
			var currentNode = colligateMain.leftTree
					.getNodeById(leftNavigationTree.nodeId);
			var parentNode = currentNode.parentNode;
			newNode = colligateMain.leftTree.getLoader

			().createNode({
						id : mes.nodeId,
						text : TaskBasicForm.name1,
						projectId : mes.projectId,
						chargedManId : TaskBasicForm.user1,
						iconCls : 'icon-planningTask',
						statusId : mes.statusId,
						nt : mes.nt,
						approval : mes.approval,
						allowDrop : mes.allowDrop,
						allowDrag : false,
						leaf : true
					});

			newNode.attributes.pre = currentNode.attributes.id;
			newNode.attributes.nex = currentNode.attributes.nex;
			currentNode.attributes.next = newNode.attributes.id;

			var nextNode = currentNode.nextSibling;
			if (nextNode != null) {
				nextNode.attributes.pre = newNode.attributes.id;
				parentNode.insertBefore(newNode, nextNode);
			} else {
				parentNode.appendChild(newNode);
			}
		}
		colligateMain.leftTree.fireEvent('beforeclick', newNode);// 点击该node
		colligateMain.leftTree.fireEvent('click', newNode);// 点击该node
		newNode.select();
	}
	var action2 = new Ext.Action({
		id : 'createSameLevelTask',
		text : '' + getResource('resourceParam1188') + '',
		iconCls : 'icon-createTask',
		disabled : true,
		handler : function() {
			colligateMain.kind = 'same';
			// 任务的时间限制，任务时间限制在父project计划时间内，或父任务时间内
			Ext.Ajax.request({
				url : "../JSON/task_TaskRemote.getTaskTimeScale",
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					if (obj.success == true) {
						if (colligateMain.task == null) {
							colligateMain.task = TaskCardFrame
									.init(colligateMain.createTaskCallBack);
							collarbCreatePanel.createTask.add(colligateMain.task);
						} else {
							collarbCreatePanel.createTask
									.remove(colligateMain.task);
							colligateMain.task = TaskCardFrame
									.init(colligateMain.createTaskCallBack);
							collarbCreatePanel.createTask.add(colligateMain.task);
						}
						TaskBasicForm.projectId = colligateMain.projectId;
						// 扩展页面参数
						TaskExtendForm.kind = colligateMain.kind;
						TaskExtendForm.nodeId = leftNavigationTree.nodeId;
						colligateMain.cardPanel.getLayout().setActiveItem(1);
						collarbCreatePanel.cardPanel.getLayout()
								.setActiveItem(1);
						collarbCreatePanel.cardPanel.doLayout();

						TaskCardFrame.basicForm.setTitle(''
								+ getResource('resourceParam1189') + '');
						TaskCardFrame.card.layout.setActiveItem(0);
						TaskCardFrame.basicForm.getForm().reset();
						if (obj.start != null) {
							try {
								colligateMain.start = Date.parseDate(obj.start,
										"Y-m-d");
								// TaskBasicForm.start
								// .setMinValue(colligateMain.start);
								// TaskBasicForm.end
								// .setMinValue(colligateMain.start);
							} catch (e) {
							}
						}
						if (obj.end != null) {
							try {
								colligateMain.end = Date.parseDate(obj.end,
										"Y-m-d");
								// TaskBasicForm.start
								// .setMaxValue(colligateMain.end);
								// TaskBasicForm.end
								// .setMaxValue(colligateMain.end);
							} catch (e) {
							}
						}
					} else {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam499')
											+ '',
									msg : obj.message,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
					}

				},
				disableCaching : true,
				autoAbort : true,
				params : {
					node : leftNavigationTree.nodeId,
					method : colligateMain.kind
					// 同级任务，或子任务

				}
			});

		}
	});

	var action3 = new Ext.Action({
		id : 'createSubLevelTask',
		text : '' + getResource('resourceParam1191') + '',
		iconCls : 'icon-createSubTask',
		disabled : true,
		handler : function() {
			colligateMain.kind = 'sub';
			// 任务的时间限制，任务时间限制在父project计划时间内,或自父任务内
			Ext.Ajax.request({
				url : "../JSON/task_TaskRemote.getTaskTimeScale",
				method : 'POST',
				success : function(response, options) {
					var obj = Ext.util.JSON.decode(response.responseText);
					if (obj.success == true) {
						if (colligateMain.task == null) {
							colligateMain.task = TaskCardFrame
									.init(colligateMain.createTaskCallBack);
							collarbCreatePanel.createTask.add(colligateMain.task);
						} else {
							collarbCreatePanel.createTask
									.remove(colligateMain.task);
							colligateMain.task = TaskCardFrame
									.init(colligateMain.createTaskCallBack);
							collarbCreatePanel.createTask.add(colligateMain.task);
						}

						TaskBasicForm.projectId = colligateMain.projectId;
						// 扩展页面参数
						TaskExtendForm.kind = colligateMain.kind;
						TaskExtendForm.nodeId = leftNavigationTree.nodeId;
						colligateMain.cardPanel.getLayout().setActiveItem(1);
						collarbCreatePanel.cardPanel.getLayout()
								.setActiveItem(1);
						collarbCreatePanel.cardPanel.doLayout();

						TaskCardFrame.basicForm.setTitle(''
								+ getResource('resourceParam1192') + '');
						TaskCardFrame.card.layout.setActiveItem(0);
						TaskCardFrame.basicForm.getForm().reset();
						var currentNode = colligateMain.leftTree
								.getNodeById(leftNavigationTree.nodeId);
						currentNode.expand();
						if (obj.start != null) {
							try {
								colligateMain.start = Date.parseDate(obj.start,
										"Y-m-d");
								// TaskBasicForm.start
								// .setMinValue(colligateMain.start);
								// TaskBasicForm.end
								// .setMinValue(colligateMain.start);
							} catch (e) {
							}
						}
						if (obj.end != null) {
							try {
								colligateMain.end = Date.parseDate(obj.end,
										"Y-m-d");
								// TaskBasicForm.start
								// .setMaxValue(colligateMain.end);
								// TaskBasicForm.end
								// .setMaxValue(colligateMain.end);
							} catch (e) {
							}
						}
					} else {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam499')
											+ '',
									msg : obj.message,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
					}
				},
				disableCaching : true,
				autoAbort : true,
				params : {
					node : leftNavigationTree.nodeId,
					method : colligateMain.kind
					// 同级任务，或子任务
				}
			});
		}
	});

	var projectApprove = new Ext.Action({
		id : 'projectApprove',
		text : '' + getResource('resourceParam1365') + '',
		disabled : true,
		handler : function() {
			Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
							+ getResource('resourceParam1535') + "", function(
							btn) {
						if (btn == 'yes') {
							colligateMain.approveMask.show();
							Ext.Ajax.request({
								url : "../JSON/project_ProjectRemote.approve",
								method : 'POST',
								success : function(response, options) {
									colligateMain.approveMask.hide();
									var obj = Ext.util.JSON
											.decode(response.responseText);
									if (obj.success == true) {
										colligateMain.refresh(true);
										// var node =
										// colligateMain.leftTree
										// .getNodeById(leftNavigationTree.nodeId);
										// var
										// expandable =
										// !node.attributes.leaf;
										// var newNode =
										// null;
										// if
										// (leftNavigationTree.nodeId.indexOf('p')
										// == 0) {
										// newNode = new
										// Ext.tree.TreeNode({
										// id : node.id,
										// text :
										// node.text,
										// iconCls :
										// obj.iconCls,
										// statusId :
										// obj.statusId,
										// allowDrop :
										// obj.allowDrop,
										// leaf :
										// node.attributes.leaf,
										// chargedManId
										// :
										// node.attributes.chargedManId,
										// expandable :
										// expandable
										// });
										// } else {
										// newNode = new
										// Ext.tree.TreeNode({
										// id : node.id,
										// text :
										// node.text,
										// iconCls :
										// obj.iconCls,
										// statusId :
										// obj.statusId,
										// allowDrop :
										// obj.allowDrop,
										// allowDrag :
										// false,
										// leaf :
										// node.attributes.leaf,
										// chargedManId
										// :
										// node.attributes.chargedManId,
										// projectId :
										// node.attributes.projectId,
										// expandable :
										// expandable
										// });
										// }
										// var
										// parentNode =
										// node.parentNode;
										// var nextNode
										// =
										// node.nextSibling;
										// node.remove();
										// if (nextNode
										// != null) {
										// parentNode.insertBefore(newNode,
										// nextNode);
										// } else {
										// parentNode.appendChild(newNode);
										// }
										// newNode.on('beforeexpand',
										// function(node)
										// {
										// colligateMain.leftTree.getLoader().load(node);
										// });
										// colligateMain.leftTree.fireEvent('beforeclick',
										// newNode);//
										// 刷新当前节点
										// colligateMain.leftTree.fireEvent('click',
										// newNode,
										// Ext.EventObject.ctrlKey);//
										// 刷新当前节点
										// if
										// (!parentNode.isExpanded())
										// {
										// parentNode.expand();
										// }
									} else {
										colligateMain.refresh();
										Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam499')
													+ '',
											msg : obj.message,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
									}

								},
								disableCaching : true,
								autoAbort : true,
								params : {
									node : leftNavigationTree.nodeId
								}
							});
						}
					});
		}
	});
	// var taskApprove = new Ext.Action({
	// id : 'taskApprove',
	// text : '审批通过',
	// disabled : true,
	// handler : function() {
	// Ext.Ajax.request({
	// url : "../JSON/task_TaskRemote.approveTask",
	// method : 'POST',
	// success : function(response, options) {
	// var obj = Ext.util.JSON.decode(response.responseText);
	// if (obj.success == true) {
	// var node = colligateMain.leftTree
	// .getNodeById(leftNavigationTree.nodeId);
	// var expandable = !node.attributes.leaf;
	// var newNode = new Ext.tree.TreeNode({
	// id : node.id,
	// text : node.text,
	// iconCls : obj.iconCls,
	// statusId : obj.statusId,
	// allowDrop : obj.allowDrop,
	// allowDrag : false,
	// leaf : node.leaf,
	// chargedManId : node.attributes.chargedManId,
	// projectId : node.attributes.projectId,
	// expandable : expandable
	// });
	// var parentNode = node.parentNode;
	// var nextNode = node.nextSibling;
	// node.remove();
	// if (nextNode != null) {
	// parentNode.insertBefore(newNode, nextNode);
	//
	// } else {
	// parentNode.appendChild(newNode);
	// }
	// newNode.on('beforeexpand', function(node) {
	// colligateMain.leftTree.getLoader().load(node);
	// });
	// colligateMain.leftTree.fireEvent('beforeclick', newNode);// 刷新当前节点
	// colligateMain.leftTree.fireEvent('click', newNode,
	// Ext.EventObject.ctrlKey);// 刷新当前节点
	// if (!parentNode.isExpanded()) {
	// parentNode.expand();
	// }
	// } else {
	// Ext.MessageBox.show({
	// title : '错误',
	// msg : obj.message,
	// buttons : Ext.MessageBox.OK,
	// icon : Ext.MessageBox.ERROR
	// });
	// }
	//
	// },
	// disableCaching : true,
	// autoAbort : true,
	// params : {
	// node : leftNavigationTree.nodeId
	// }
	// });
	//
	// }
	// });
	var projectVerify = new Ext.Action({
				id : 'projectVerify',
				text : '' + getResource('resourceParam1550') + '...',
				disabled : true,
				handler : function() {
					var contentNode = colligateMain.leftTree.getSelectionModel()
							.getSelectedNode();
					approvePanel.status = contentNode.attributes.statusId;
					if (contentNode == null) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam575')
											+ '',
									msg : '' + getResource('resourceParam1167')
											+ '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.INFO
								});
						// 在点击文件夹节点的时候禁掉“权限菜单”
						return;
					}
					colligateMain.dataid = contentNode.id.indexOf("p") == 0
							? contentNode.id.substring(1)
							: contentNode.id;// 设置项目id
					colligateMain.datatype = contentNode.id.indexOf("p") == 0
							? 'ProjectDataType'
							: 'TaskDataType';// 设置类型，这里需要设置为常量

					colligateMain.cardPanel
							.remove(colligateMain.approvePanel, true);
					approvePanel.status = contentNode.attributes.statusId;
					if (approvePanel.status == '1') {
						colligateMain.approvePanel = approvePanel.init(
								colligateMain.cardPanel, colligateMain.dataid,
								colligateMain.datatype, canelApproval,
								'' + getResource('resourceParam1547') + '',
								colligateMain.refresh);
					} else if (approvePanel.status == '4') {
						colligateMain.approvePanel = approvePanel.init(
								colligateMain.cardPanel, colligateMain.dataid,
								colligateMain.datatype, canelApproval,
								'' + getResource('resourceParam1548') + '',
								colligateMain.refresh);
					}
					colligateMain.cardPanel.getLayout().setActiveItem(2);
					colligateMain.approvePanel.doLayout();
					function canelApproval() {
						colligateMain.cardPanel.getLayout().setActiveItem(0);
					}
				}
			});
	var examApprovalTab = new Ext.Action({
				id : 'examApprovalTab',
				text : '' + getResource('resourceParam1448') + '',
				disabled : true,
				handler : function() {
					var contentNode = colligateMain.leftTree.getSelectionModel()
							.getSelectedNode();
					if (contentNode == null) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam575')
											+ '',
									msg : '' + getResource('resourceParam1167')
											+ '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.INFO
								});
						// 在点击文件夹节点的时候禁掉“权限菜单”
						return;
					}
					colligateMain.dataid = contentNode.id.indexOf("p") == 0
							? contentNode.id.substring(1)
							: contentNode.id;// 设置项目id
					colligateMain.datatype = contentNode.id.indexOf("p") == 0
							? 'ProjectDataType'
							: 'TaskDataType';// 设置类型，这里需要设置为常量
					colligateMain.cardPanel
							.remove(colligateMain.approvePanel, true);
					// colligateMain.approvePanel = examApproval.getGrid(
					// colligateMain.cardPanel, colligateMain.dataid,
					// colligateMain.datatype);
					colligateMain.approvePanel = examApproval.getCommentGrid(
							colligateMain.cardPanel, colligateMain.dataid,
							colligateMain.datatype);
					colligateMain.cardPanel.getLayout().setActiveItem(2);
					colligateMain.approvePanel.doLayout();
					// approveFlowSteps.refreshGrid();
				}
			});
	// 主面板 的 左侧面板
	colligateMain.westPanel = new Ext.Panel({
		region : 'west',
		width : 200,
		height : 800,
		boder : false,
		autoScroll : true,
		collapsible : true,
		split : true,
		layout : 'fit',
		title : ""
				+ getResource('resourceParam724')
				+ "<span id='refreshProject' style='padding-left:5px;'><a  href='javascript:void(0);'  onClick='colligateMain.refresh(true)' ><img ext:qtip=''+getResource('resourceParam1081')+'' src='../images/refresh.gif' style='width:12px;heigth:12px;paddin-left:40px'/></a></span>",
		items : [colligateMain.leftTree]
	});

	colligateMain.cardPanel = new Ext.Panel({
				id : 'colligateMain_cardPanel',
				frame : false,
				boder : false,
				layout : 'card',
				items : [colligateMain.tabPanel, colligateMain.createPanel],
				activeItem : 0
			});

	// 主面板 的 中间面板
	colligateMain.centerPanel = new Ext.Panel({
				region : 'center',
				height : 800,
				frame : false,
				boder : false,
				layout : 'fit',
				items : [colligateMain.cardPanel]

			});

	colligateMain.tbar = new Ext.Toolbar({
		items : [{
			id : 'create',
			text : '' + getResource('resourceParam483') + '',
			disabled : true,
			menu : [action, action1, action2, action3, action4, action5,
					action6]
		}, new Ext.Toolbar.Separator({
					id : 's_create'
				}), {
			id : 'update',
			text : '' + getResource('resourceParam478') + '',
			disabled : true,
			handler : function() {

							if (leftNavigationTree.nodeId.indexOf('c') == 0) {
								updateContent();
							} else if (leftNavigationTree.nodeId.indexOf('p') == 0) {
								// 修改项目
								updateProject();
							} else {
								var node = colligateMain.leftTree
										.getNodeById(leftNavigationTree.nodeId);
								var nt = node.attributes.nt;
								if (nt == 0 || nt == '0') {
									// 更新普通任务
									updateTask();
								} else if (nt == 1 || nt == '1') {
									// 更新审批任务
									updateApproveTask();
								}
							}
			}
		}, new Ext.Toolbar.Separator({
					id : 's_update'
				}), {
			id : 'delete',
			text : '' + getResource('resourceParam475') + '',
			iconCls : 'icon-deleteTask',
			disabled : true,
			handler : function() {
				if (leftNavigationTree.nodeId.indexOf('c') == 0) {
					deleteFolder();
				} else if (leftNavigationTree.nodeId.indexOf('p') == 0) {
					deleteProject();
				} else if (leftNavigationTree.nodeId.indexOf('v') == 0) {
					deleteVirtualRelation();
				} else {
					deleteTask();
				}
			}
		}, new Ext.Toolbar.Separator({
					id : 's_delete'
				}), {
			id : 'terminate',
			text : '' + getResource('resourceParam1170') + '',
			disabled : true,
			handler : function() {
				if (leftNavigationTree.nodeId.indexOf('c') == 0) {

				} else if (leftNavigationTree.nodeId.indexOf('p') == 0) {
					terminateProject();
				} else {
					terminateTask();
				}
			}

		}, new Ext.Toolbar.Separator({
					id : 's_terminate'
				}), {
			id : 'approve',
			text : '' + getResource('resourceParam1062') + '',
			disabled : true,
			menu : [projectApprove, projectVerify, examApprovalTab]
		}, new Ext.Toolbar.Separator({
					id : 's_approve'
				}), {
			id : 'privilege',
			text : '' + getResource('resourceParam582') + '',
			disabled : true,
			handler : function() {
				// 获取树上的选择节点
				var currentNode = colligateMain.leftTree.getSelectionModel()
						.getSelectedNode();
				if (currentNode == null) {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam575')
										+ '',
								msg : "" + getResource('resourceParam1541')
										+ "",
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
					// 在点击文件夹节点的时候禁掉“权限菜单”
					return;
				}

				// 判断选择的是项目还是任务
				if (currentNode.id == '0') {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam575')
										+ '',
								msg : "" + getResource('resourceParam1542')
										+ "",
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
					return;
				} else if (currentNode.id.indexOf('c') == 0) {// 项目夹
					colligateMain.dataId = currentNode.id.substring(1);// 设置项目夹id
					colligateMain.dataType = 'ContentDataType';// 设置项目类型，这里需要设置为常量
				} else if (currentNode.id.indexOf('p') == 0) {// 项目
					colligateMain.dataId = currentNode.id.substring(1);// 设置项目id
					colligateMain.dataType = 'ProjectDataType';// 设置项目类型，这里需要设置为常量
				} else {// 任务
					colligateMain.dataId = currentNode.id;// 设置任务id
					colligateMain.dataType = 'TaskDataType';// 设置任务类型，这里需要设置为常量
				}

				if (colligateMain.privilegeSet == null) {// 初始化界面
					colligateMain.privilegeSet = setDataPrivilege.init({
								'dataId' : base
										.convertNodeId(colligateMain.dataId),
								'dataType' : colligateMain.dataType
							});
					collarbCreatePanel.createDataprivilege
							.add(colligateMain.privilegeSet);
					// collarbCreatePanel.createDataprivilege.doLayout();
				} else {
					colligateMain.privilegeSet.dataId = base
							.convertNodeId(colligateMain.dataId);
					colligateMain.privilegeSet.dataType = colligateMain.dataType;
				}
				colligateMain.privilegeSet.refresh();// 刷新权限页面

				colligateMain.cardPanel.getLayout().setActiveItem(1);
				collarbCreatePanel.cardPanel.getLayout().setActiveItem(2);
				collarbCreatePanel.cardPanel.doLayout();
			}
		}, new Ext.Toolbar.Separator({
					id : 's_privilege'
				}), {
			id : 'copyTask',
			text : '' + getResource('resourceParam485') + '',
			disabled : true,
			handler : function() {
				var nodeId = leftNavigationTree.nodeId;
				if (nodeId.indexOf("p") == 0) {
					// 项目
					colligateMain.pasteCate = 'project';
					colligateMain.copyProjectId = leftNavigationTree.nodeId;
					colligateMain.copyProjectNode = colligateMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					colligateMain.pasteType = 'copy';
					Ext.getCmp('pasteTask').disable();
				} else if (nodeId.indexOf("vp") == 0) {
					// 虚拟项目
					colligateMain.pasteCate = '';
					alert('关联项目不能复制');
				} else {
					// 任务复制
					colligateMain.pasteCate = 'task';
					colligateMain.copyTaskId = leftNavigationTree.nodeId;
					colligateMain.copyTaskNode = colligateMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					colligateMain.pasteType = 'copy';
					Ext.getCmp('pasteTask').disable();
				}
			}
		}, new Ext.Toolbar.Separator({
					id : 's_copyTask'
				}), {
			id : 'cutTask',
			text : '' + getResource('resourceParam486') + '',
			disabled : true,
			handler : function() {
				var nodeId = leftNavigationTree.nodeId;
				if (nodeId.indexOf("p") == 0) {
					// 项目
					colligateMain.pasteCate = 'project';
					colligateMain.cutProjectId = leftNavigationTree.nodeId;
					colligateMain.cutProjectNode = colligateMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					colligateMain.pasteType = 'cut';
					Ext.getCmp('pasteTask').disable();
					// cut时维护节点pre nex
					var currentNode = colligateMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					var previousNode = currentNode.previousSibling;
					var nextNode = currentNode.nextSibling;
					// 维护节点的pre和 nex
					if (previousNode != null) {
						previousNode.attributes.nex = currentNode.attributes.nex;
					}
					if (nextNode != null) {
						nextNode.attributes.pre = currentNode.attributes.pre;
					}

				} else if (nodeId.indexOf("vp") == 0) {
					// 虚拟项目
					colligateMain.pasteCate = '';
					alert('关联项目不能剪切');
				} else {
					// 任务剪切
					colligateMain.pasteCate = 'task';
					colligateMain.cutTaskId = leftNavigationTree.nodeId;
					colligateMain.cutTaskNode = colligateMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					colligateMain.pasteType = 'cut';
					Ext.getCmp('pasteTask').disable();
					// cut时维护节点pre nex
					var currentNode = colligateMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					var previousNode = currentNode.previousSibling;
					var nextNode = currentNode.nextSibling;
					// 维护节点的pre和 nex
					if (previousNode != null) {
						previousNode.attributes.nex = currentNode.attributes.nex;
					}
					if (nextNode != null) {
						nextNode.attributes.pre = currentNode.attributes.pre;
					}
				}
			}
		}, new Ext.Toolbar.Separator({
					id : 's_cutTask'
				}), {
			id : 'pasteTask',
			iconCls : 'icon-pasteTask',
			text : '' + getResource('resourceParam487') + '',
			disabled : true,
			handler : function() {
				if (colligateMain.pasteCate == 'project') {
					// 项目
					Ext.Msg.confirm('' + getResource('resourceParam575') + '',
							"是否粘贴当前项目", function(btn) {
								if (btn == 'yes') {
									colligateMain.pasteMask.show();
									Ext.Ajax.request({
										url : "../JSON/project_ProjectRemote.paste_Project",
										method : 'POST',
										success : function(response, options) {
											colligateMain.pasteMask.hide();
											var obj = Ext.util.JSON
													.decode(response.responseText);
											if (obj.success == true) {
												if (colligateMain.pasteType == 'cut') {
													Ext.getCmp('pasteTask')
															.disable();
													if (leftNavigationTree.nodeId
															.indexOf('c') == 0) {
														leftNavigationTree.nodeId = 0;
														colligateMain
																.refresh(true);
													} else {
														leftNavigationTree.nodeId = 0;
														colligateMain
																.refresh(true);
													}

												} else if (colligateMain.pasteType == 'copy') {
													if (leftNavigationTree.nodeId
															.indexOf('c') == 0) {
														leftNavigationTree.nodeId = 0;
														colligateMain
																.refresh(true);
													} else {
														leftNavigationTree.nodeId = 0;
														colligateMain
																.refresh(true);

													}

												}

											} else {
												colligateMain.refresh();
												Ext.MessageBox.show({
													title : ''
															+ getResource('resourceParam499')
															+ '',
													msg : obj.message,
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.ERROR
												});
											}
										},
										disableCaching : true,
										autoAbort : true,
										params : {
											node : leftNavigationTree.nodeId,// 当前选中的节点
											copyProjectId : colligateMain.copyProjectId,// 
											// id
											cutProjectId : colligateMain.cutProjectId,// 
											// id
											pastType : colligateMain.pasteType
											// 复制还是剪切
										}
									});
								}
							});

				} else if (colligateMain.pasteCate == 'task') {
					Ext.Msg.confirm('' + getResource('resourceParam575') + '',
							"" + getResource('resourceParam1544') + "?",
							function(btn) {
								if (btn == 'yes') {
									colligateMain.pasteMask.show();
									Ext.Ajax.request({
										url : "../JSON/task_TaskRemote.paste_Task",
										method : 'POST',
										success : function(response, options) {
											colligateMain.pasteMask.hide();
											var obj = Ext.util.JSON
													.decode(response.responseText);
											if (obj.success == true) {

												var projectId = null;
												var chargedManId = null;
												if (colligateMain.pasteType == 'cut') {
													Ext.getCmp('pasteTask')
															.disable();
													var cutTaskNode = colligateMain.leftTree
															.getNodeById(colligateMain.cutTaskId);
													if (cutTaskNode == null) {
														cutTaskNode = colligateMain.cutTaskNode;
													}

													projectId = cutTaskNode.attributes.projectId;
													chargedManId = cutTaskNode.attributes.chargedManId;
													colligateMain.cutTaskId = null;
													colligateMain.cutTaskNode = null;
													cutTaskNode.remove();
												} else if (colligateMain.pasteType == 'copy') {
													var copyTaskNode = colligateMain.leftTree
															.getNodeById(colligateMain.copyTaskId);
													if (copyTaskNode == null) {
														copyTaskNode = colligateMain.copyTaskNode;
													}
													projectId = copyTaskNode.attributes.projectId;
													chargedManId = copyTaskNode.attributes.chargedManId;
												}
												// 创建子任务
												var currentNode = colligateMain.leftTree
														.getNodeById(leftNavigationTree.nodeId);
												currentNode.attributes.leaf = false;
												var expandable = !obj.leaf;
												currentNode.beginUpdate();
												var newNode = colligateMain.leftTree
														.getLoader()
														.createNode({
															id : obj.nodeId,
															text : obj.text,
															projectId : obj.projectId,
															iconCls : obj.iconCls,
															statusId : obj.statusId,
															allowDrop : obj.allowDrop,
															allowDrag : false,
															chargedManId : obj.chargedManId,
															nt : obj.nt,
															leaf : obj.leaf,
															approval : obj.approval,
															expandable : expandable
														});

												var lastChildNode = currentNode.lastChild;
												if (lastChildNode != null) {
													// 粘贴时，维护新节点于最后一个节点的
													// pre，nex
													newNode.attributes.pre = lastChildNode.attributes.id;
													newNode.attributes.nex = lastChildNode.attributes.nex;

													lastChildNode.attributes.nex = newNode.attributes.id;
												} else {
													newNode.attributes.pre = '';
													newNode.attributes.nex = '';
												}

												currentNode
														.appendChild(newNode);
												currentNode.endUpdate();
												currentNode.expand();
											} else {
												colligateMain.refresh();
												Ext.MessageBox.show({
													title : ''
															+ getResource('resourceParam499')
															+ '',
													msg : obj.message,
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.ERROR
												});
											}
										},
										disableCaching : true,
										autoAbort : true,
										params : {
											node : leftNavigationTree.nodeId,// 当前选中的节点
											copyTaskId : colligateMain.copyTaskId,// 要复制的task
											// id
											cutTaskId : colligateMain.cutTaskId,// 要剪切的task
											// id
											pastType : colligateMain.pasteType
											// 复制还是剪切
										}
									});
								}
							});
				} else {
					// 虚拟项目
					alert('关联项目不能粘贴');
				}
			}

		}, new Ext.Toolbar.Separator({
					id : 's_pasteTask'
				}), {
			id : 'moveUp',
			iconCls : 'icon-taskUp',
			text : '' + getResource('resourceParam488') + '',
			disabled : true,
			handler : function() {
				var currentNode = colligateMain.leftTree
						.getNodeById(leftNavigationTree.nodeId);
				var pNode = currentNode.previousSibling;
				var parentNode = currentNode.parentNode;
				if (currentNode.attributes.pre == '') {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam575')
										+ '',
								msg : "" + getResource('resourceParam1180')
										+ "",
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
				} else {
					Ext.Msg.confirm('' + getResource('resourceParam575') + '',
							"" + getResource('resourceParam1186') ,
							function(btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url : "../JSON/task_TaskRemote.moveUpTask",
										method : 'POST',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
											if (obj.success == true) {
												var newNode = colligateMain.leftTree
														.getLoader()
														.createNode({
															id : currentNode.id,
															text : currentNode.text,
															iconCls : obj.iconCls,
															leaf : currentNode.attributes.leaf,
															allowDrop : currentNode.attributes.allowDrop,
															allowDrag : false,
															nt : currentNode.attributes.nt,
															statusId : currentNode.attributes.statusId,
															approval : currentNode.attributes.approval,
															chargedManId : currentNode.attributes.chargedManId,
															projectId : currentNode.attributes.projectId,
															expandable : !currentNode.attributes.leaf
														});
												if (pNode != null) {// 处理不是页面首节点的情况
													newNode.attributes.pre = pNode.attributes.pre;
													newNode.attributes.nex = pNode.attributes.id;

													pNode.attributes.pre = currentNode.attributes.id;
													pNode.attributes.nex = currentNode.attributes.nex;

													// newNode
													// .on(
													// 'beforeexpand',
													// function(
													// node)
													// {
													// colligateMain.leftTree
													// .getLoader()
													// .load(
													// node);
													// });
													currentNode.remove();
													parentNode.insertBefore(
															newNode, pNode);
													colligateMain.leftTree
															.fireEvent(
																	'click',
																	newNode,
																	Ext.EventObject.ctrlKey);// 刷新当前节点
													newNode.select();
												} else {
													// 如果是页面首节点
													leftNavigationTree.nodeId = parentNode.attributes.id;
													colligateMain.refresh(true);
												}

											} else {
												colligateMain.refresh();
												Ext.MessageBox.show({
													title : ''
															+ getResource('resourceParam499')
															+ '',
													msg : obj.error,
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.ERROR
												});
											}
										},
										disableCaching : true,
										autoAbort : true,
										params : {
											node : leftNavigationTree.nodeId,
											moveId : currentNode.attributes.pre
										}
									});
								}
							});
				}
			}
		}, new Ext.Toolbar.Separator({
					id : 's_moveUp'
				}), {
			id : 'moveDown',
			iconCls : 'icon-taskDown',
			text : '' + getResource('resourceParam489') + '',
			disabled : true,
			handler : function() {
				var currentNode = colligateMain.leftTree
						.getNodeById(leftNavigationTree.nodeId);
				var nextNode = currentNode.nextSibling;
				var parentNode = currentNode.parentNode;
				if (currentNode.attributes.nex == '') {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam575')
										+ '',
								msg : "" + getResource('resourceParam1179')
										+ "",
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
				} else {
					Ext.Msg.confirm('' + getResource('resourceParam575') + '',
							"" + getResource('resourceParam1185') + "",
							function(btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url : "../JSON/task_TaskRemote.moveDownTask",
										method : 'POST',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
											if (obj.success == true) {
												if (nextNode != null) {// 处理不是页面尾节点的情况
													var nextnextNode = nextNode.nextSibling;
													var newNode = colligateMain.leftTree
															.getLoader()
															.createNode({
																id : currentNode.id,
																text : currentNode.text,
																iconCls : obj.iconCls,
																leaf : currentNode.attributes.leaf,
																allowDrop : currentNode.attributes.allowDrop,
																allowDrag : false,
																nt : currentNode.attributes.nt,
																statusId : currentNode.attributes.statusId,
																approval : currentNode.attributes.approval,
																chargedManId : currentNode.attributes.chargedManId,
																projectId : currentNode.attributes.projectId,
																expandable : !currentNode.attributes.leaf
															});
													newNode.attributes.pre = nextNode.attributes.id;
													newNode.attributes.nex = nextNode.attributes.nex;

													nextNode.attributes.pre = currentNode.attributes.pre;
													nextNode.attributes.nex = currentNode.attributes.id;
													currentNode.remove();
													parentNode.insertBefore(
															newNode,
															nextnextNode);
													// newNode
													// .on(
													// 'beforeexpand',
													// function(
													// node)
													// {
													// colligateMain.leftTree
													// .getLoader()
													// .load(
													// node);
													// });
													colligateMain.leftTree
															.fireEvent(
																	'click',
																	newNode,
																	Ext.EventObject.ctrlKey);// 刷新当前节点
													newNode.select();
												} else {
													// 如果是页面尾节点
													leftNavigationTree.nodeId = parentNode.attributes.id;
													colligateMain.refresh(true);

												}

											} else {
												colligateMain.refresh();
												Ext.MessageBox.show({
													title : ''
															+ getResource('resourceParam499')
															+ '',
													msg : obj.error,
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.ERROR
												});
											}
										},
										disableCaching : true,
										autoAbort : true,
										params : {
											node : leftNavigationTree.nodeId,
											moveId : currentNode.attributes.nex
										}
									});
								}
							});
				}
			}
		}, new Ext.Toolbar.Separator({
					id : 's_virtualRelation'
				}), {
			id : 'virtualRelation',
			// iconCls : 'icon-taskDown',
			text : '' + getResource('resourceParam1949') + '',
			disabled : true,
			handler : function() {
				Ext.getCmp('colligateMain_cardPanel').hide();
				if (!Ext.getCmp('virtualRelationPanel')) {
					colligateMain.virtualRelationTree = new Ext.tree.TreePanel({
						id : 'virtualRelationTree',
						width : 398,
						rootVisible : false,
						root : new Ext.tree.AsyncTreeNode({
									id : '0',
									text : leftNavigationTree.rootName,
									iconCls : leftNavigationTree.rootIconCls
								}),
						loader : new Ext.ux.tree.PagingTreeLoader({
							dataUrl : '../JSON/project_ProjectRemote.getProjectTreeById',
							pageSize : leftNavigationTree.pageSize,
							enableTextPaging : true,
							uiProviders : {
								"col" : Ext.tree.TreeNodeUI
							},
							baseParams : {
								contentId : 0
							},
							pagingModel : 'remote'
						}),
						autoScroll : true
					});
					colligateMain.virtualRelationTree.getLoader().on(
							'beforeload', function(treeLoader, node) {
								treeLoader.dataUrl = '../JSON/project_ProjectRemote.getProjectTreeById';
								treeLoader.baseParams.contentId = 0;
								treeLoader.baseParams.noTask = true;
								treeLoader.baseParams.projectId = leftNavigationTree.nodeId;
							});
					colligateMain.centerPanel.insert(0, new Ext.Panel({
						id : 'virtualRelationPanel',
						layout : 'fit',
						tbar : [new Ext.ux.ComboBoxTree({
							id : 'virtualRelationPanel_combo',
							width : 200,
							tree : colligateMain.virtualRelationTree,
							selectNodeModel : 'leaf',
							autoExpand : true,
							listeners : {
								'select' : function(combo, record, index) {
									wbsdata.nodeId = combo.getValue();
									Ext.getCmp('virtualRelationPanel')
											.add(new Ext.Panel({
												id : 'virtualRelation_gridPanel',
												layout : 'fit',
												items : [wbsdata.init({
															tbar : null
														})]
											}));
									Ext.getCmp('virtualRelationPanel')
											.doLayout();
									wbsdata.sourceNodeId = leftNavigationTree.nodeId;
									wbsdata.relationtypes = '1';
									wbsdata.refresh();
								},
								'expand' : function(combo) {
									colligateMain.virtualRelationTree
											.getRootNode().reload();
								}
							}
						}), {
							text : '' + getResource('resourceParam1950') + '',
							handler : function() {
								if (leftNavigationTree.nodeId == '0') {
									Ext.example
											.msg(
													""
															+ getResource('resourceParam575')
															+ "",
													""
															+ getResource('resourceParam1951')
															+ "！");
									return false;
								}
								if (Ext.getCmp('virtualRelationPanel_combo')
										.getValue() == '') {
									Ext.example
											.msg(
													""
															+ getResource('resourceParam575')
															+ "",
													""
															+ getResource('resourceParam1952')
															+ "！");
									return false;
								}
								var ids;
								if (wbsdata.getSelectIds() == '') {
									ids = wbsdata.nodeId;
								} else {
									ids = wbsdata.getSelectIds();
								}
								Ext.Ajax.request({
									url : '../JSON/project_ProjectRemote.addVirtualRelations',
									method : 'POST',
									success : function(response, options) {
										var obj = Ext.util.JSON
												.decode(response.responseText);
										if (obj.success == 'true') {
											Ext.example
													.msg(
															""
																	+ getResource('resourceParam575')
																	+ "",
															""
																	+ getResource('resourceParam623')
																	+ "！");
										} else if (obj.success == 'false') {
											// Ext.example.msg(""+getResource('resourceParam575')+"",
											// ""+getResource('resourceParam594')+"！");
											Ext.example
													.msg(
															""
																	+ getResource('resourceParam575')
																	+ "",
															""
																	+ getResource('resourceParam594')
																	+ ","
																	+ obj.message
																	+ "！");
										}
									},
									disableCaching : true,
									autoAbort : true,
									params : {
										pid : leftNavigationTree.nodeId,
										cids : ids
									}
								});
							}
						}, new Ext.Toolbar.Separator({
									id : 's_addVirtualRelation'
								}), {
							text : '' + getResource('resourceParam944') + '',
							handler : function() {
								Ext.getCmp('virtualRelationPanel').hide();
								Ext.getCmp('colligateMain_cardPanel').show();
							}
						}]
					}));
				} else {
					Ext.getCmp('virtualRelationPanel').show();
					Ext.getCmp('colligateMain_cardPanel').hide();
				}
				colligateMain.centerPanel.doLayout();
			}
		}
		// , new Ext.Toolbar.Separator({id:'s_moveDown'}),
		// {
		// {
		// text : '导入',
		// iconCls : 'icon-importTasks-2',
		// disabled : true,
		// handler : function() {
		// }
		// }, new Ext.Toolbar.Separator(), {
		// text : '导出',
		// iconCls : 'icon-exportTasks-2',
		// disabled : true,
		// handler : function() {
		// }
		// }, new Ext.Toolbar.Separator(), {
		// text : '查询',
		// disabled : true,
		// handler : function() {
		// }
		// }
		]
	});

	// 主面板
	colligateMain.mainPanel = new Ext.Panel({
				region : 'center',
				layout : 'border', // 布局模式
				boder : false,
				items : [colligateMain.westPanel, colligateMain.centerPanel],
				listeners : {
					beforerender : function() {

					},
					render : function() {
						initButton(button);
					},
					afterlayout : function() {
					}
				},
				tbar : colligateMain.tbar
			});

	var viewport = new Ext.Viewport({ // 页面布局
		layout : 'border', // 布局模式
		items : [colligateMain.mainPanel]
	});

	window.onresize = function() {
		document.getElementById("coopProjectPanel") != undefined
				? document.getElementById("coopProjectPanel").style.height = (document.body.clientHeight - 90)
				: "";
	};
	colligateMain.deleteMask = new Ext.LoadMask(document.body, {
				msg : '' + getResource('resourceParam1538') + ''
			});
	colligateMain.pasteMask = new Ext.LoadMask(document.body, {
				msg : '' + getResource('resourceParam1539') + ''
			});
	colligateMain.terminateMask = new Ext.LoadMask(document.body, {
				msg : '正在终止，请稍候...'
			});
	colligateMain.approveMask = new Ext.LoadMask(document.body, {
				msg : '正在审批通过，请稍候...'
			});
	var beforeclick = function(node, eventObject) {
		if (Ext.getCmp('virtualRelationPanel')) {
			Ext.getCmp('virtualRelationPanel_combo').clearValue();
			wbsdata.clear();
			Ext.getCmp('virtualRelationPanel').hide();
			Ext.getCmp('colligateMain_cardPanel').show();
		}
		if (node.id.indexOf('v') == 0) {
			Ext.getCmp('virtualRelation').disable();
		} else {
			Ext.getCmp('virtualRelation').enable();
		}
		if (node.id == 0) {

			// 属性面板，只project和task时 enable
			Ext.getCmp('relationPanel').disable();
			// 在根节点下，如果可以建content,project则 create enable
			if (button.createProjectByManual || button.createProjectByFlow
					|| button.createProjectFolder) {
				Ext.getCmp('create').enable();
				if (button.createProjectByManual) {
					Ext.getCmp('createProjectByManual').setVisible(true);
					Ext.getCmp('createProjectByManual').enable();
				} else {
					Ext.getCmp('createProjectByManual').setVisible(false);
				}
				if (button.createProjectByFlow) {
					Ext.getCmp('createProjectByFlow').setVisible(true);
					Ext.getCmp('createProjectByFlow').enable();
				} else {
					Ext.getCmp('createProjectByFlow').setVisible(false);
				}
				if (button.createProjectFolder) {
					Ext.getCmp('createProjectFolder').setVisible(true);
					Ext.getCmp('createProjectFolder').enable();
				} else {
					Ext.getCmp('createProjectFolder').setVisible(true);
				}
				Ext.getCmp('createSameLevelTask').setVisible(false);
				Ext.getCmp('createSubLevelTask').setVisible(false);
			} else {
				Ext.getCmp('create').disable();
			}

			Ext.getCmp('update').disable();
			Ext.getCmp('delete').disable();
			Ext.getCmp('terminate').disable();
			Ext.getCmp('approve').disable();

			Ext.getCmp('privilege').disable();
			Ext.getCmp('copyTask').disable();
			Ext.getCmp('cutTask').disable();
			Ext.getCmp('pasteTask').disable();
			Ext.getCmp('moveUp').disable();
			Ext.getCmp('moveDown').disable();
			Ext.getCmp("dataObjectPanel").disable();
			// 扩展属性链接设置为隐藏
			collarbViewTaskForm.link.setVisible(false);
			collarbViewProjectForm.link.setVisible(false);
			Ext.getCmp('createByWBSTemplate').setVisible(false);
			Ext.getCmp('createApproveTask').setVisible(false);
		} else if (node.id.indexOf('c') == 0) {
			Ext.getCmp('relationPanel').disable();

			if (button.createProjectByManual || button.createProjectByFlow
					|| button.createProjectFolder) {
				Ext.getCmp('create').enable();
				if (button.createProjectByManual) {
					Ext.getCmp('createProjectByManual').setVisible(true);
					Ext.getCmp('createProjectByManual').enable();
				} else {
					Ext.getCmp('createProjectByManual').setVisible(false);
				}
				if (button.createProjectByFlow) {
					Ext.getCmp('createProjectByFlow').setVisible(true);
					Ext.getCmp('createProjectByFlow').enable();
				} else {
					Ext.getCmp('createProjectByFlow').setVisible(false);
				}
				if (button.createProjectFolder) {
					Ext.getCmp('createProjectFolder').setVisible(true);
					Ext.getCmp('createProjectFolder').enable();
				} else {
					Ext.getCmp('createProjectFolder').setVisible(true);
				}
				Ext.getCmp('createSameLevelTask').setVisible(false);
				Ext.getCmp('createSubLevelTask').setVisible(false);
			} else {
				Ext.getCmp('create').disable();
			}
			collarbViewTaskForm.link.setVisible(false);
			collarbViewProjectForm.link.setVisible(false);
			Ext.getCmp("dataObjectPanel").disable();
			Ext.getCmp('createByWBSTemplate').setVisible(false);
			Ext.getCmp('createApproveTask').setVisible(false);
			// folder不用审批
			Ext.getCmp('projectApprove').disable();
			Ext.getCmp('projectVerify').disable();
			Ext.getCmp('examApprovalTab').disable();
		} else if (node.id.indexOf('p') == 0 || node.id.indexOf('vp') == 0) {
			Ext.getCmp('relationPanel').enable();

			if (button.createSubLevelTask) {
				Ext.getCmp('create').enable();
				Ext.getCmp('createProjectByManual').setVisible(false);
				Ext.getCmp('createProjectByFlow').setVisible(false);
				Ext.getCmp('createProjectFolder').setVisible(false);
				Ext.getCmp('createSameLevelTask').setVisible(false);
				Ext.getCmp('createSubLevelTask').setVisible(true);
				Ext.getCmp('createSubLevelTask').enable();
				Ext.getCmp('createByWBSTemplate').setVisible(true);
				Ext.getCmp('createApproveTask').setVisible(true);
				if (node.attributes.nt == 1 || node.attributes.nt == '1') {
					// 审批任务，禁止 审批通过 审批
					Ext.getCmp('projectApprove').setVisible(false);
					Ext.getCmp('projectVerify').setVisible(false);
				} else {
					Ext.getCmp('projectApprove').setVisible(true);
					Ext.getCmp('projectVerify').setVisible(true);
				}
			} else {
				Ext.getCmp('create').disable();
			}
			collarbViewTaskForm.link.setVisible(false);
			collarbViewProjectForm.link.setVisible(true);
			Ext.getCmp("dataObjectPanel").enable();
		} else {
			Ext.getCmp('relationPanel').enable();
			Ext.getCmp("dataObjectPanel").enable();
			if (button.createSameLevelTask || button.createSubLevelTask) {
				Ext.getCmp('create').enable();
				Ext.getCmp('createProjectByManual').setVisible(false);
				Ext.getCmp('createProjectByFlow').setVisible(false);
				Ext.getCmp('createProjectFolder').setVisible(false);
				if (button.createSameLevelTask) {
					Ext.getCmp('createSameLevelTask').setVisible(true);
					Ext.getCmp('createSameLevelTask').enable();
				} else {
					Ext.getCmp('createSameLevelTask').setVisible(false);
				}
				if (button.createSubLevelTask) {
					Ext.getCmp('createSubLevelTask').setVisible(true);
					Ext.getCmp('createSubLevelTask').enable();
				} else {
					Ext.getCmp('createSubLevelTask').setVisible(false);
				}

				if (node.attributes.nt == 1 || node.attributes.nt == '1') {
					// 审批任务，禁止 审批通过 审批
					Ext.getCmp('projectApprove').setVisible(false);
					Ext.getCmp('projectVerify').setVisible(false);
					Ext.getCmp('createSubLevelTask').setVisible(false);
					Ext.getCmp('createSameLevelTask').setVisible(false);
					Ext.getCmp('createByWBSTemplate').setVisible(false);
					Ext.getCmp('createApproveTask').setVisible(false);
				} else {
					Ext.getCmp('projectApprove').setVisible(true);
					Ext.getCmp('projectVerify').setVisible(true);
					Ext.getCmp('createSubLevelTask').setVisible(true);
					Ext.getCmp('createSameLevelTask').setVisible(true);
					Ext.getCmp('createByWBSTemplate').setVisible(true);
					Ext.getCmp('createApproveTask').setVisible(true);
				}
			} else {
				Ext.getCmp('create').disable();
			}
			collarbViewTaskForm.link.setVisible(true);
			collarbViewProjectForm.link.setVisible(false);
			// if (node.attributes.nt == "1") {
			// Ext.getCmp("dataObjectPanel").disable();
			// }
		}
	};
	// var logTag = 0;
	var click = function(node, eventObject) {
		// if (eventObject.ctrlKey) {
		// }
		Ext.get('refreshProject').show();

		colligateTabPanel.addloginfo.doLayout();
		leftNavigationTree.node = node;
		leftNavigationTree.nodeId = node.id;
		leftNavigationTree.statusId = node.attributes.statusId;
		leftNavigationTree.approval = node.attributes.approval;
		leftNavigationTree.nodeText = node.text;
		colligateMain.cardPanel.getLayout().setActiveItem(0);
		if (node.id.indexOf('p') == 0 || node.id.indexOf('vp') == 0) {
			colligateTabPanel.feedbackPanel.enable();
			colligateTabPanel.tasklgoPanel.enable();
			colligateMain.projectId = node.id.substring(1);

			colligateTabPanel.tasklogAddForm.setDisabled(true);
			colligateTabPanel.logAddForm.setDisabled(true);
			// colligateTabPanel.taskegridpanel12.setVisible(false);
			colligateTabPanel.egridpanel12.setVisible(false);
			// colligateTabPanel.tasklgoPanel.html = "无相关信息.";
			colligateTabPanel.feedbackPanel.html = ""
					+ getResource('resourceParam1545') + ".";

		} else if (node.id == 0 || node.id.indexOf('c') == 0) {
			colligateMain.projectId = null;
			colligateTabPanel.tasklogAddForm.setDisabled(true);
			colligateTabPanel.feedbackPanel.enable();
			colligateTabPanel.tasklgoPanel.enable();
			colligateTabPanel.logAddForm.setDisabled(true);
			// colligateTabPanel.taskegridpanel12.setVisible(false);
			colligateTabPanel.egridpanel12.setVisible(false);
			// colligateTabPanel.tasklgoPanel.html = "无相关信息.";
			colligateTabPanel.feedbackPanel.html = ""
					+ getResource('resourceParam1545') + ".";
			attributePanel.attributePanel.getLayout().setActiveItem(0);
			// attributePanel.projectPanel.getForm().reset();
			if (node.id != 0 || node.id.indexOf('c') == 0) {
				if (colligateMain.projectFolderDetail == null) {
					colligateMain.projectFolderDetail = projectFolderDetail
							.init();
					collarbCreatePanel.projectFolderDetail
							.add(colligateMain.projectFolderDetail);
				} else {
					colligateMain.projectFolderDetail
							.remove(colligateMain.projectFolderDetail);
					colligateMain.projectFolderDetail = projectFolderDetail
							.init();
					collarbCreatePanel.projectFolderDetail
							.add(colligateMain.projectFolderDetail);
				}
				colligateMain.cardPanel.getLayout().setActiveItem(1);
				collarbCreatePanel.cardPanel.getLayout().setActiveItem(7);
				collarbCreatePanel.cardPanel.doLayout();
			}
			// collarbCreatePanel.cardPanel.doLayout();
		} else if (node.id != 0 && node.id.indexOf('c') != 0) {
			colligateMain.chargedManId = node.attributes.chargedManId;
			colligateTabPanel.feedbackPanel.enable();
			colligateTabPanel.tasklgoPanel.enable();
			colligateMain.projectId = node.attributes.projectId;

			// colligateTabPanel.tasklgoPanel.html = null;
			colligateTabPanel.feedbackPanel.html = null;
			// colligateTabPanel.taskegridpanel12.setVisible(true);
			colligateTabPanel.egridpanel12.setVisible(true);
			colligateTabPanel.logAddForm.setDisabled(false);
			colligateTabPanel.tasklogAddForm.setDisabled(false);
			// colligateTabPanel.tasklgoPanel.html = "无相关信息.";
			colligateTabPanel.feedbackPanel.html = ""
					+ getResource('resourceParam1545') + ".";
			Ext.getCmp("logAttributeTask").setValue(escSpanTag(node.text));
			Ext.getCmp("logAttributeTaskId")
					.setValue(leftNavigationTree.nodeId);
			Ext.getCmp("tasklogAttributeTask").setValue(escSpanTag(node.text));
			Ext.getCmp("tasklogAttributeTaskId")
					.setValue(leftNavigationTree.nodeId);

			// if (logTag != 0) {
			// // document.getElementById("tasklogframe").src =
			// // "../logInfo.seam?temp="
			// // + new Date()
			// // + "&taskid= "
			// // + leftNavigationTree.nodeId
			// // + "&typeStr=1,";
			// // document.getElementById("remaininfoframe").src =
			// // "../logInfo.seam?temp="
			// // + new Date()
			// // + "&taskid= "
			// // + leftNavigationTree.nodeId
			// // + "&typeStr=3,";
			// } else {
			// alert(123);
			// colligateTabPanel.tasklgoPanel.html = "<iframe scrolling=auto
			// id='taskloginfoframe' frameborder=0 width=100% height=100%
			// src='../logInfo.seam?temp="
			// + new Date()
			// + "&taskid= "
			// + leftNavigationTree.nodeId
			// + "&typeStr=1,' ></iframe>";
			// // Ext.getCmp("taskremaininfo").html = "<iframe scrolling=auto
			// // id='remaininfoframe' frameborder=0 width=100% height=100%
			// // src='../logInfo.seam?temp="
			// // + new Date()
			// // + "&taskid= "
			// // + leftNavigationTree.nodeId
			// // + "&typeStr=3,' ></iframe>";
			//
			// }
			// logTag += 1;
		} else {
			colligateTabPanel.feedbackPanel.enable();
			colligateTabPanel.tasklgoPanel.enable();
			colligateTabPanel.tasklogAddForm.setDisabled(true);
			colligateTabPanel.logAddForm.setDisabled(true);
			// colligateTabPanel.taskegridpanel12.setVisible(false);
			colligateTabPanel.egridpanel12.setVisible(false);
			// colligateTabPanel.tasklgoPanel.html = "无相关信息.";
			colligateTabPanel.feedbackPanel.html = ""
					+ getResource('resourceParam1545') + ".";
			attributePanel.attributePanel.getLayout().setActiveItem(0);
			attributePanel.projectPanel.getForm().reset();
		}
		// 属性面板显示为选中的面板
		var activePanel = colligateMain.tabPanel.getActiveTab();
		var activeTabId = activePanel.getId();
		activePanel.fireEvent('activate');
	}
	leftNavigationTree.treePanel.on('beforeclick', beforeclick);
	leftNavigationTree.treePanel.on('click', click);

}
// 按钮id名称 与对应的功能权限的id，id名称不区分大小写，功能权限id可以不写，在后台会根据前台按钮名称，根据权限给与权限id
var message = "{'createProjectByManual':''," + "'createProjectByFlow':'',"
		+ "'createProjectFolder':''," + "'createSameLevelTask':'',"
		+ "'createSubLevelTask':''," + "'updateContent':'',"
		+ "'updateProject':''," + "'updateTask':''," + "'deleteContent':'',"
		+ "'deleteProject':''," + "'deleteTask':''," + "'terminateProject':'',"
		+ "'terminateTask':'',"

		+ "'projectApprove':''," + "'taskApprove':''," + "'projectVerify':'',"
		+ "'examApprovalTab':'',"

		+ "'copyTask':''," + "'cutTask':''," + "'pasteTask':'',"
		+ "'moveUp':''," + "'moveDown':''}";
var button = null;
Ext.Ajax.request({
			url : "../JSON/privilege_PrivilegeRemote.getPagePrivileges",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					// button = obj;
					button = {
						"createProjectByManual" : true,
						"createProjectByFlow" : true,
						"createProjectFolder" : true,
						"createSameLevelTask" : true,
						"createSubLevelTask" : true,

						"updateContent" : true,
						"updateProject" : true,
						"updateTask" : true,

						"deleteContent" : true,
						"deleteProject" : true,
						"deleteTask" : true,

						"terminateProject" : true,
						"terminateTask" : true,

						"projectApprove" : true,
						"projectVerify" : true,
						"examApprovalTab" : true,

						"privilege" : true,

						"copyTask" : true,
						"cutTask" : true,
						"pasteTask" : true,
						"moveUp" : true,
						"moveDown" : true,

						"success" : true
					};
					button.createProjectByManual = obj.createProjectByManual;
					// button.createProjectByFlow = obj.createProjectByFlow;
					button.createProjectByFlow = false;
					button.createProjectFolder = obj.createProjectFolder;
					button.createSameLevelTask = obj.createSameLevelTask;
					button.createSubLevelTask = obj.createSubLevelTask;
					Ext.onReady(colligateMain.init, colligateMain, true);
				} else if (obj.success == false) {
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam499')
										+ '',
								msg : obj.error,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				}
			},
			disableCaching : true,
			autoAbort : true,
			params : {
				privilegename : message
				// 通过provilegename传参数
			}
		});

function initButton(obj) {
	// 根据权限，将用户不可操作菜单隐藏
	if (button.createProjectByManual == false
			&& button.createProjectByFlow == false
			&& button.createProjectFolder == false
			&& button.createSameLevelTask == false
			&& button.createSubLevelTask == false) {
		Ext.getCmp('create').setVisible(false);
		Ext.getCmp('s_create').hide();
	}
	if (button.updateContent == false && button.updateProject == false
			&& button.updateTask == false) {
		Ext.getCmp('update').setVisible(false);
		Ext.getCmp('s_update').hide();
	}
	if (button.deleteContent == false && button.deleteProject == false
			&& button.deleteProject == false) {
		Ext.getCmp('delete').setVisible(false);
		Ext.getCmp('s_delete').hide();
	}
	if (button.terminateProject == false && button.terminateTask == false) {
		Ext.getCmp('terminate').setVisible(false);
		Ext.getCmp('s_terminate').hide();
	}
	if (button.projectApprove == false && button.projectVerify == false
			&& button.examApprovalTab == false) {
		Ext.getCmp('approve').setVisible(false);
		Ext.getCmp('s_approve').hide();
	}
	if (button.copyTask == false) {
		Ext.getCmp('copyTask').setVisible(false);
		Ext.getCmp('s_copyTask').hide();
	}
	if (button.cutTask == false) {
		Ext.getCmp('cutTask').setVisible(false);
		Ext.getCmp('s_cutTask').hide();
	}
	if (button.pasteTask == false) {
		Ext.getCmp('pasteTask').setVisible(false);
		Ext.getCmp('s_pasteTask').hide();
	}
	if (button.moveUp == false) {
		Ext.getCmp('moveUp').setVisible(false);
		Ext.getCmp('s_moveUp').hide();
	}
	if (button.moveDown == false) {
		Ext.getCmp('moveDown').setVisible(false);
		Ext.getCmp('s_moveDown').hide();
	}
	// 为选中任何节点，默认为根节点时，按纽的状态
	if (button.createProjectByManual || button.createProjectByFlow
			|| button.createProjectFolder) {
		Ext.getCmp('create').enable();
		Ext.getCmp('createSameLevelTask').setVisible(false);
		Ext.getCmp('createSubLevelTask').setVisible(false);
		if (button.createProjectByManual) {
			Ext.getCmp('createProjectByManual').setVisible(true);
			Ext.getCmp('createProjectByManual').enable();
		} else {
			Ext.getCmp('createProjectByManual').setVisible(false);
		}
		if (button.createProjectByFlow) {
			Ext.getCmp('createProjectByFlow').setVisible(true);
			Ext.getCmp('createProjectByFlow').enable();
		} else {
			Ext.getCmp('createProjectByFlow').setVisible(false);
		}
		if (button.createProjectFolder) {
			Ext.getCmp('createProjectFolder').setVisible(true);
			Ext.getCmp('createProjectFolder').enable();
		} else {
			Ext.getCmp('createProjectFolder').setVisible(true);
		}
	} else {
		Ext.getCmp('create').disable();
	}

}

function updateContent() {
	if (colligateMain.updateProjectFolder == null) {
		colligateMain.updateProjectFolder = updateProjectFolder.init();
		collarbCreatePanel.updateProjectFolder
				.add(colligateMain.updateProjectFolder);
	} else {
		colligateMain.updateProjectFolder.remove(colligateMain.updateProjectFolder);
		colligateMain.updateProjectFolder = updateProjectFolder.init();
		collarbCreatePanel.updateProjectFolder
				.add(colligateMain.updateProjectFolder);
	}
	colligateMain.cardPanel.getLayout().setActiveItem(1);
	collarbCreatePanel.cardPanel.getLayout().setActiveItem(6);
	collarbCreatePanel.cardPanel.doLayout();
}

function updateProject() {

	if (colligateMain.updateProject == null) {
		colligateMain.updateProject = updateProjectCard.init();
		collarbCreatePanel.updateProject.add(colligateMain.updateProject);
	} else {
		collarbCreatePanel.updateProject.remove(colligateMain.updateProject);
		colligateMain.updateProject = updateProjectCard.init();
		collarbCreatePanel.updateProject.add(colligateMain.updateProject);
	}
	colligateMain.cardPanel.getLayout().setActiveItem(1);
	collarbCreatePanel.cardPanel.getLayout().setActiveItem(3);
	collarbCreatePanel.cardPanel.doLayout();

}
function updateTaskCardRefresh() {
	colligateMain.refresh();
	colligateMain.cardPanel.getLayout().setActiveItem(0);
}

function updateTask() {
	if (leftNavigationTree.nodeId != 0) {
		// 修改任务
		updateTaskBasic.nodeId = leftNavigationTree.nodeId;
		updateTaskBasic.projectId = colligateMain.projectId;
		if (colligateMain.updateTask == null) {
			colligateMain.updateTask = updateTaskCard.init(updateTaskCardRefresh);
			collarbCreatePanel.updateTask.add(colligateMain.updateTask);
		} else {
			collarbCreatePanel.updateTask.remove(colligateMain.updateTask);
			colligateMain.updateTask = updateTaskCard.init(updateTaskCardRefresh);
			collarbCreatePanel.updateTask.add(colligateMain.updateTask);
		}
		updateTaskBasic.setBasic();
		colligateMain.cardPanel.getLayout().setActiveItem(1);
		collarbCreatePanel.cardPanel.getLayout().setActiveItem(4);
		collarbCreatePanel.cardPanel.doLayout();
	}
}
function canelApproveTask() {
	colligateMain.cardPanel.getLayout().setActiveItem(0);
}
function updateApproveTask() {
	if (leftNavigationTree.nodeId != 0) {
		// 修改审批任务
		if (colligateMain.approveTask) {
			collarbCreatePanel.createApproveTask
					.remove(colligateMain.approveTask);
			colligateMain.approveTask = null;
		}
		var params = {
			title : '' + getResource('resourceParam478') + ''
					+ getResource('resourceParam1020') + '',
			update : true
		}
		if (colligateMain.updateApproveTask == null) {
			colligateMain.updateApproveTask = createApproveTask.init(null,
					leftNavigationTree.nodeId, "TaskDataType",
					canelApproveTask, '', colligateMain.refresh, params);
			collarbCreatePanel.updateApproveTask
					.add(colligateMain.updateApproveTask);
		} else {
			collarbCreatePanel.updateApproveTask
					.remove(colligateMain.updateApproveTask);
			colligateMain.updateApproveTask = createApproveTask.init(null,
					leftNavigationTree.nodeId, "TaskDataType",
					canelApproveTask, '', colligateMain.refresh, params);
			collarbCreatePanel.updateApproveTask
					.add(colligateMain.updateApproveTask);
		}
		colligateMain.cardPanel.getLayout().setActiveItem(1);
		collarbCreatePanel.cardPanel.getLayout().setActiveItem(10);
		collarbCreatePanel.cardPanel.doLayout();
	}
}

function deleteProject() {
	Ext.Msg.show({
		title : '' + getResource('resourceParam575') + '',
		msg : '' + getResource('resourceParam1165') + '',
		width : 300,
		buttons : Ext.MessageBox.YESNO,
		fn : function(btn) {
			if (btn == 'yes') {
				// if (leftNavigationTree.statusId == '4') {
				// Ext.MessageBox.show({
				// title : '提示',
				// msg : '请先终止该工程!',
				// buttons : Ext.MessageBox.OK,
				// icon : Ext.MessageBox.INFO
				// });
				// } else if (leftNavigationTree.statusId == '11') {
				// Ext.MessageBox.show({
				// title : '提示',
				// msg : '正在审批，不能删除!',
				// buttons : Ext.MessageBox.OK,
				// icon : Ext.MessageBox.INFO
				// });
				// } else
				// {
				colligateMain.deleteMask.show();
				Ext.Ajax.request({
					url : "../JSON/project_ProjectRemote.deleteProject",
					method : 'POST',
					success : function(response, options) {
						colligateMain.deleteMask.hide();
						var obj = Ext.util.JSON.decode(response.responseText);
						if (obj.success == true) {
							var currentNode = colligateMain.leftTree
									.getNodeById(leftNavigationTree.nodeId);

							var previousNode = currentNode.previousSibling;
							if (previousNode != null) {
								colligateMain.leftTree.fireEvent('beforeclick',
										previousNode);// 刷新当前节点
								colligateMain.leftTree.fireEvent('click',
										previousNode, Ext.EventObject.ctrlKey);// 刷新当前节点
								previousNode.select();
							} else {
								var parentNode = currentNode.parentNode;
								leftNavigationTree.nodeId = parentNode.id;
								// colligateMain.refresh();
								parentNode.attributes.expandable = false;
								parentNode.attributes.leaf = true;
								colligateMain.leftTree.fireEvent('beforeclick',
										parentNode);// 刷新当前节点
								colligateMain.leftTree.fireEvent('click',
										parentNode, Ext.EventObject.ctrlKey);// 刷新当前节点
								parentNode.select();
							}
							currentNode.remove();
						} else {
							colligateMain.refresh();
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam499')
												+ '',
										msg : obj.error,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
						}
					},
					disableCaching : true,
					autoAbort : true,
					params : {
						node : leftNavigationTree.nodeId
					}
				});// deleteProject
				// }
			}
		},
		icon : Ext.MessageBox.QUESTION
	});
}

function deleteVirtualRelation() {
	Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
					+ getResource('resourceParam1182') + "", function(btn) {
				if (btn == 'yes') {
					colligateMain.deleteMask.show();
					Ext.Ajax.request({
						url : "../JSON/taskNodeRelation_TaskNodeRelationRemote.deleteVirtualRelation",
						method : 'POST',
						success : function(response, options) {
							colligateMain.deleteMask.hide();
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
								var currentNode = colligateMain.leftTree
										.getNodeById(leftNavigationTree.nodeId);
								var previousNode = currentNode.previousSibling;
								var nextNode = currentNode.nextSibling;
								// 维护节点的pre和 nex
								if (previousNode != null) {
									previousNode.attributes.nex = currentNode.attributes.nex;
								}
								if (nextNode != null) {
									nextNode.attributes.pre = currentNode.attributes.pre;
								}
								if (previousNode != null) {
									colligateMain.leftTree.fireEvent(
											'beforeclick', previousNode);// 刷新当前节点
									colligateMain.leftTree.fireEvent('click',
											previousNode,
											Ext.EventObject.ctrlKey);// 刷新当前节点
									previousNode.select();
								} else {
									var parentNode = currentNode.parentNode;
									leftNavigationTree.nodeId = parentNode.id;
									parentNode.attributes.expandable = false;
									parentNode.attributes.leaf = true;
									colligateMain.leftTree.fireEvent(
											'beforeclick', parentNode);// 刷新当前节点
									colligateMain.leftTree
											.fireEvent('click', parentNode,
													Ext.EventObject.ctrlKey);// 刷新当前节点
									parentNode.select();
								}
								var parentNode = currentNode.parentNode;
								currentNode.remove();
							} else {
								colligateMain.refresh();
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam499')
													+ '',
											msg : obj.error,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							}

						},
						disableCaching : true,
						autoAbort : true,
						params : {
							pid : colligateMain.leftTree
									.getNodeById(leftNavigationTree.nodeId).parentNode.id,
							cids : leftNavigationTree.nodeId
						}
					});// deleteTask

					// }
				}
			});
}

function deleteTask() {
	Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
					+ getResource('resourceParam1182') + "", function(btn) {
				if (btn == 'yes') {
					// if (leftNavigationTree.statusId == '4') {
					// Ext.MessageBox.show({
					// title : '提示',
					// msg : '请先终止该任务!',
					// buttons : Ext.MessageBox.OK,
					// icon : Ext.MessageBox.INFO
					// });
					// } else if (leftNavigationTree.statusId == '11') {
					// Ext.MessageBox.show({
					// title : '提示',
					// msg : '正在审批，不能删除!',
					// buttons : Ext.MessageBox.OK,
					// icon : Ext.MessageBox.INFO
					// });
					// } else {
					colligateMain.deleteMask.show();
					Ext.Ajax.request({
						url : "../JSON/task_TaskRemote.deleteTask",
						method : 'POST',
						success : function(response, options) {
							colligateMain.deleteMask.hide();
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
								var currentNode = colligateMain.leftTree
										.getNodeById(leftNavigationTree.nodeId);
								var previousNode = currentNode.previousSibling;
								var nextNode = currentNode.nextSibling;
								// 维护节点的pre和 nex
								if (previousNode != null) {
									previousNode.attributes.nex = currentNode.attributes.nex;
								}
								if (nextNode != null) {
									nextNode.attributes.pre = currentNode.attributes.pre;
								}
								if (previousNode != null) {
									colligateMain.leftTree.fireEvent(
											'beforeclick', previousNode);// 刷新当前节点
									colligateMain.leftTree.fireEvent('click',
											previousNode,
											Ext.EventObject.ctrlKey);// 刷新当前节点
									previousNode.select();
								} else {
									var parentNode = currentNode.parentNode;
									leftNavigationTree.nodeId = parentNode.id;
									parentNode.attributes.expandable = false;
									parentNode.attributes.leaf = true;
									colligateMain.leftTree.fireEvent(
											'beforeclick', parentNode);// 刷新当前节点
									colligateMain.leftTree
											.fireEvent('click', parentNode,
													Ext.EventObject.ctrlKey);// 刷新当前节点
									parentNode.select();
								}
								var parentNode = currentNode.parentNode;
								currentNode.remove();
							} else {
								colligateMain.refresh();
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam499')
													+ '',
											msg : obj.error,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							}

						},
						disableCaching : true,
						autoAbort : true,
						params : {
							node : leftNavigationTree.nodeId
						}
					});// deleteTask

					// }
				}
			});
}

function deleteFolder() {
	Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
					+ getResource('resourceParam1540') + "?", function(btn) {
				if (btn == 'yes') {
					var currentNode = colligateMain.leftTree
							.getNodeById(leftNavigationTree.nodeId);
					var parentnode1 = currentNode.parentNode;

					if (currentNode.hasChildNodes()) {
						Ext.Msg.confirm('' + getResource('resourceParam575')
										+ '', ""
										+ getResource('resourceParam1543')
										+ "?", function(btn) {
									if (btn == "yes") {
										colligateMain.deleteMask.show();
										Ext.Ajax.request({
											url : '../JSON/project_ProjectRemote.deleteProjectFolderHasChild?a='
													+ new Date().getTime(),
											method : 'POST',
											success : function(response,
													options) {
												colligateMain.deleteMask.hide();
												var obj = Ext.util.JSON
														.decode(response.responseText);
												if (obj.success == true) {
													leftNavigationTree.nodeId = 0;
													colligateMain.refresh(true);
												} else {
													leftNavigationTree.nodeId = 0;
													colligateMain.refresh(true);
													Ext.MessageBox.show({
														title : ''
																+ getResource('resourceParam499')
																+ '',
														msg : obj.error,
														buttons : Ext.MessageBox.OK,
														icon : Ext.MessageBox.ERROR
													});
												}
											},
											disableCaching : true,
											autoAbort : true,
											params : {
												contentsid : leftNavigationTree.nodeId
														.replace("c", "")
											}
										});

									}
								});

					} else {
						colligateMain.deleteMask.show();
						Ext.Ajax.request({
							url : '../JSON/project_ProjectRemote.deleteProjectFolder?a='
									+ new Date().getTime(),
							method : 'POST',
							success : function(response, options) {
								colligateMain.deleteMask.hide();
								var obj = Ext.util.JSON
										.decode(response.responseText);
								if (obj.success == true) {

									var previousNode = currentNode.previousSibling;
									var nextNode = currentNode.nextSibling;

									if (previousNode != null) {
										colligateMain.leftTree.fireEvent(
												'beforeclick', previousNode);// 刷新当前节点
										colligateMain.leftTree.fireEvent('click',
												previousNode,
												Ext.EventObject.ctrlKey);// 刷新当前节点
										previousNode.select();
									} else {
										parentnode1.attributes.expandable = false;
										parentnode1.attributes.leaf = true;
										colligateMain.leftTree.fireEvent(
												'beforeclick', parentnode1);// 刷新当前节点
										colligateMain.leftTree.fireEvent('click',
												parentnode1,
												Ext.EventObject.ctrlKey);// 刷新当前节点
										parentnode1.select();
									}
									currentNode.remove();

									// parentnode1
									// .removeChild(currentNode);
									// if (!parentnode1
									// .hasChildNodes()) {
									// parentnode1.attributes.leaf
									// = true;
									// parentnode1.attributes.expandable
									// = false;
									// }

								} else {
									colligateMain.refresh();
									Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam499')
												+ '',
										msg : obj.error,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
								}
							},
							disableCaching : true,
							autoAbort : true,
							params : {
								contentsid : leftNavigationTree.nodeId.replace(
										"c", "")
							}
						});
					}

				}
			});
}

function terminateProject() {
	Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
					+ getResource('resourceParam1536') + "?", function(btn) {
				if (btn == 'yes') {
					colligateMain.terminateMask.show();
					Ext.Ajax.request({
						url : '../JSON/project_ProjectRemote.terminateProject?a='
								+ new Date().getTime(),
						method : 'POST',
						success : function(response, options) {
							colligateMain.terminateMask.hide();
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
								var node = colligateMain.leftTree
										.getNodeById(leftNavigationTree.nodeId);
								var expandable = !node.attributes.leaf;
								var newNode = colligateMain.leftTree.getLoader()
										.createNode({
											id : node.id,
											text : node.text,
											iconCls : 'icon-terminatedProject',
											leaf : node.attributes.leaf,
											statusId : obj.statusId,
											allowDrop : obj.allowDrop,
											chargedManId : node.attributes.chargedManId,
											expandable : expandable
										});
								var parentNode = node.parentNode;
								var nextNode = node.nextSibling;
								var previousNode = node.previousSibling;
								if (nextNode != null) {
									node.remove();
									parentNode.insertBefore(newNode, nextNode);
								} else {
									if (previousNode == null) {
										var tempNode = new Ext.tree.TreeNode({
													id : new Date().toString()
												});
										parentNode.appendChild(tempNode);
										node.remove();
										parentNode.appendChild(newNode);
										tempNode.remove();

									} else {
										node.remove();
										parentNode.appendChild(newNode);
									}
								}
								// newNode
								// .on(
								// 'beforeexpand',
								// function(node) {
								// colligateMain.leftTree
								// .getLoader()
								// .load(
								// node);
								// });
								colligateMain.leftTree.fireEvent('beforeclick',
										newNode);// 刷新当前节点
								colligateMain.leftTree.fireEvent('click',
										newNode, Ext.EventObject.ctrlKey);// 刷新当前节点
								if (!parentNode.isExpanded()) {
									parentNode.expand();
								}
							} else {
								colligateMain.refresh();
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam499')
													+ '',
											msg : obj.error,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							}
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							node : leftNavigationTree.nodeId
						}
					});
				}
			});
}

function terminateTask() {
	Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
					+ getResource('resourceParam1537') + "?", function(btn) {
				if (btn == 'yes') {
					colligateMain.terminateMask.show();
					Ext.Ajax.request({
						url : "../JSON/task_TaskRemote.terminateTask",
						method : 'POST',
						success : function(response, options) {
							colligateMain.terminateMask.hide();
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {

								var node = colligateMain.leftTree
										.getNodeById(leftNavigationTree.nodeId);
								var expandable = !node.attributes.leaf;
								var newNode = colligateMain.leftTree.getLoader()
										.createNode({
											id : node.id,
											text : node.text,
											iconCls : 'icon-terminatedTask',
											statusId : obj.statusId,
											allowDrop : obj.allowDrop,
											allowDrag : false,
											nt : node.attributes.nt,
											approval : node.attributes.approval,
											chargedManId : node.attributes.chargedManId,
											projectId : node.attributes.projectId,
											leaf : node.attributes.leaf,
											expandable : expandable
										});
								var parentNode = node.parentNode;
								var nextNode = node.nextSibling;
								var previousNode = node.previousSibling;
								if (nextNode != null) {
									node.remove();
									parentNode.insertBefore(newNode, nextNode);
								} else {
									if (previousNode == null) {
										var tempNode = new Ext.tree.TreeNode({
													id : new Date().toString()
												});
										parentNode.appendChild(tempNode);
										node.remove();
										parentNode.appendChild(newNode);
										tempNode.remove();

									} else {
										node.remove();
										parentNode.appendChild(newNode);
									}
								}
								// newNode
								// .on(
								// 'beforeexpand',
								// function(node) {
								// colligateMain.leftTree
								// .getLoader()
								// .load(
								// node);
								// });

								colligateMain.leftTree.fireEvent('beforeclick',
										newNode);// 刷新当前节点
								colligateMain.leftTree.fireEvent('click',
										newNode, Ext.EventObject.ctrlKey);// 刷新当前节点
								if (!parentNode.isExpanded()) {
									parentNode.expand();
								}

							} else {
								colligateMain.refresh();
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam499')
													+ '',
											msg : obj.error,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							}

						},
						disableCaching : true,
						autoAbort : true,
						params : {
							node : leftNavigationTree.nodeId
						}
					});
				}
			});
}

function updateTreeNode(node, obj) {
	node.beginUpdate();
	var el = node.getUI().getIconEl();
	Ext.Element.fly(el).removeClass(node.attributes.iconCls);
	if (node.attributes.id == 0) {
		node.setText(leftNavigationTree.rootName);
		Ext.Element.fly(el).addClass(leftNavigationTree.rootIconCls);
	} else {
		node.setText(obj.text);
		Ext.Element.fly(el).addClass(obj.iconCls);
	}
	// node.getUI().getTextEl().innerHTML = obj.text;
	Ext.apply(node.attributes, obj);
	node.endUpdate();
}
function escSpanTag(text) {
	var reg = /<(span)\s*[^<>]*>([^<>]*)<\/\1\s*>/;
	while (reg.exec(text)) {
		text = text.replace(reg, "$2");
	}
	return text;
}