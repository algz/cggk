var mytaskdetails = {
	wbsPanel : null
}
var data = {
	modify : true
}
mytaskdetails.panel = function() {
	function resetSM() {
		wbsdata.sm.on('selectionchange', function(sm) {
					if (sm.getCount() == 0) {
						setDataPrivilege.mutiFirst = false;
						// 不选时，默认操作根节点
						mytaskdetails.targetId = departmentTaskMain.taskid;
						Ext.getCmp('create').enable();
						Ext.getCmp('createSameLevelTask').setVisible(false);
						Ext.getCmp('createApproveTask').setVisible(true);
						Ext.getCmp('createSubLevelTask').setVisible(true);
						Ext.getCmp('createByWBSTemplate').setVisible(true);

						Ext.getCmp('update').disable();
						Ext.getCmp('delete').disable();
						Ext.getCmp('terminate').disable();
						Ext.getCmp('approve').disable();
						Ext.getCmp('privilege').disable();
						Ext.getCmp('copyTask').disable();
						Ext.getCmp('cutTask').disable();
						if (mytaskdetails.pasteType == 'cut') {
							if (wbsdata.isPastable(mytaskdetails.cutTaskId,
									mytaskdetails.targetId)) {
								if (mytaskdetails.taskType == 1) {
									Ext.getCmp('pasteTask').disable();
								} else {
									Ext.getCmp('pasteTask').enable();
								}
							} else {
								Ext.getCmp('pasteTask').disable();
							}
						} else if (mytaskdetails.pasteType == 'copy') {
							if (wbsdata.isPastable(mytaskdetails.copyTaskId,
									mytaskdetails.targetId)) {
								if (mytaskdetails.taskType == 1) {
									Ext.getCmp('pasteTask').disable();
								} else {
									Ext.getCmp('pasteTask').enable();
								}
							} else {
								Ext.getCmp('pasteTask').disable();
							}
						}
						Ext.getCmp('moveUp').disable();
						Ext.getCmp('moveDown').disable();
					} else if (sm.getCount() == 1) {
						setDataPrivilege.mutiFirst = false;
						var r = sm.getSelected();
						mytaskdetails.taskType = r.data.taskType;
						mytaskdetails.targetId = r.data.id;
						mytaskdetails.preId = r.data.pre;
						mytaskdetails.nextId = r.data.next;
						// alert(mytaskdetails.preId + " -- "
						// + mytaskdetails.targetId + " -- "
						// + mytaskdetails.nextId);
						if (mytaskdetails.taskType == 1) {
							Ext.getCmp('create').disable();
						} else {
							Ext.getCmp('create').enable();
							Ext.getCmp('createSameLevelTask').setVisible(true);
							Ext.getCmp('createApproveTask').setVisible(true);
							Ext.getCmp('createSubLevelTask').setVisible(true);
							Ext.getCmp('createByWBSTemplate').setVisible(true);
						}

						Ext.getCmp('update').enable();
						Ext.getCmp('delete').enable();
						Ext.getCmp('terminate').enable();
						Ext.getCmp('approve').enable();
						Ext.getCmp('privilege').enable();
						Ext.getCmp('copyTask').enable();
						Ext.getCmp('cutTask').enable();
						Ext.getCmp('moveUp').enable();
						Ext.getCmp('moveDown').enable();

						if (mytaskdetails.pasteType == 'cut') {
							if (wbsdata.isPastable(mytaskdetails.cutTaskId,
									mytaskdetails.targetId)) {
								if (mytaskdetails.taskType == 1) {
									Ext.getCmp('pasteTask').disable();
								} else {
									Ext.getCmp('pasteTask').enable();
								}
							} else {
								Ext.getCmp('pasteTask').disable();
							}
						} else if (mytaskdetails.pasteType == 'copy') {
							if (wbsdata.isPastable(mytaskdetails.copyTaskId,
									mytaskdetails.targetId)) {
								if (mytaskdetails.taskType == 1) {
									Ext.getCmp('pasteTask').disable();
								} else {
									Ext.getCmp('pasteTask').enable();
								}
							} else {
								Ext.getCmp('pasteTask').disable();
							}
						}

					} else {
						setDataPrivilege.mutiFirst = true;
						wbsdata.getSelectIds();

						Ext.getCmp('create').disable();
						Ext.getCmp('update').disable();
						Ext.getCmp('delete').enable();
						Ext.getCmp('terminate').enable();
						Ext.getCmp('approve').enable();
						Ext.getCmp('privilege').enable();
						Ext.getCmp('copyTask').enable();
						Ext.getCmp('cutTask').enable();
						Ext.getCmp('pasteTask').disable();
						Ext.getCmp('moveUp').enable();
						Ext.getCmp('moveDown').enable();
						if (wbsdata.selections.split(',').length == 1) {
						} else {
						}
					}
				});
	}
	function backToMain() {
		if (mytaskdetails.flowTemplate) {
			mytaskdetails.wbsPanel.remove(mytaskdetails.flowTemplate);
			delete mytaskdetails.flowTemplate;
		}
		if (mytaskdetails.wbs) {
			mytaskdetails.wbsPanel.remove(mytaskdetails.wbs);
			wbsdata.checkSubNodes = false;
			mytaskdetails.wbs = wbsdata.init({
						tbar : null
					});
			resetSM();
			mytaskdetails.wbsPanel.insert(0, mytaskdetails.wbs);
		}
		if (TaskCardFrame.panel1.items.length > 0) {
			TaskCardFrame.panel1.removeAll();
		}
		if (updateTaskCard.panel1.items.length > 0) {
			updateTaskCard.panel1.removeAll();
		}

		mytaskdetails.wbsPanel.getLayout().setActiveItem(0);
		// 回复进入面板的初始值
		wbsdata.nodeId = departmentTaskMain.taskid;
		wbsdata.refresh();
		wbsdata.sm.clearSelections(true);
		Ext.getCmp('create').enable();
		Ext.getCmp('createSameLevelTask').setVisible(false);
		Ext.getCmp('createApproveTask').setVisible(true);
		Ext.getCmp('createSubLevelTask').setVisible(true);
		Ext.getCmp('createByWBSTemplate').setVisible(true);

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
	}
	var param = {
		title : '' + getResource('resourceParam478') + ''
				+ getResource('resourceParam1020') + '',
		update : false
	}
	var approveTask = createApproveTask.init(null, null, "TaskDataType",
			backToMain, '', backToMain, param);
	mytaskdetails.attributePanel = TaskAttributePanel.init();
	mytaskdetails.egridpanel1 = new Ext.Panel({
				id : 'etabpanel1',
				height : 800,
				title : getResource('resourceParam5001'),
				layout : 'fit',
				listeners : {
					activate : showTaskAttribute,
					deactivate : setTaskAttribute
				},
				items : [mytaskdetails.attributePanel]
			});

	mytaskdetails.approvalHistoryPanel = new Ext.Panel({
				id : 'approvalHistoryPanel',
				height : 800,
				title : '' + getResource('resourceParam1448') + '',
				layout : 'fit',
				listeners : {
					activate : function() {
						var dataid = departmentTaskMain.taskid;
						var datatype = 'TaskDataType';
						examApproval.getCommentGrid(this, dataid, datatype);
					}
				}
			});

	function setTaskAttribute() {
		TaskAttributePanel.setFirstPage();
	}
	function showTaskAttribute() {
		Ext.getCmp('etabpanel1').removeClass('x-hide-display');
		mytaskdetails.tabpanel.doLayout();
		TaskAttributePanel.setFirstPage();
	}
	var mydataObjectPanel = new dataObjectPanel();
	mytaskdetails.egridpanel2 = mydataObjectPanel.init();
	mytaskdetails.egridpanel2.on('activate', function() {
		var conn = synchronize.createXhrObject();
		var myurl = "../JSON/task_TaskRemote.isAllowEditDataEnityByTaskId?taskid="
				+ departmentTaskMain.taskid + "&d=" + new Date();
		conn.open("GET", myurl, false);
		conn.send(null);
		var enableEdit = conn.responseText == "true" ? true : false;

		mydataObjectPanel.setConfigs(departmentTaskMain.projectid, departmentTaskMain.taskid,
				enableEdit);

	})

	mytaskdetails.egridpanel3 = new Ext.Panel({
		id : 'etabpanel3',
		height : 800,
		title : '' + getResource('resourceParam1154') + '',
		layout : 'fit',
		items : [relationPanel.init()],
		listeners : {
			activate : function() {
				relationPanel.active(departmentTaskMain.projectid, departmentTaskMain.taskid, departmentTaskMain.taskname);
			}

		}
	});

	mytaskdetails.egridpanel33 = new Ext.Panel({
		id : 'etabpanel33',
		height : 800,
		title : 'WBS',
		layout : 'fit',
		listeners : {
			activate : function() {
				// wbs展开时的任务id
				Ext.getCmp('etabpanel33').removeClass('x-hide-display');
				wbsdata.nodeId = departmentTaskMain.taskid;
				// 新建任务的目标id
				mytaskdetails.targetId = departmentTaskMain.taskid;
				var projectApprove = new Ext.Action({
					id : 'projectApprove',
					text : '' + getResource('resourceParam100') + '',
					handler : function() {
						var info = "" + getResource('resourceParam1535') + "";
						var planningIds = wbsdata.getPlanningIds();
						if (planningIds.length < 1) {
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam587')
												+ '',
										msg : ''
												+ getResource('resourceParam459')
												+ ''
												+ getResource('resourceParam947')
												+ '的'
												+ getResource('resourceParam1481')
												+ '!',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
							return;
						}
						Ext.Msg.confirm('' + getResource('resourceParam575')
										+ '', info, function(btn) {
									if (btn == 'yes') {
										Ext.Ajax.request({
											url : "../JSON/project_ProjectRemote.approve",
											method : 'POST',
											success : function(response,
													options) {
												var obj = Ext.util.JSON
														.decode(response.responseText);
												if (obj.success) {
												} else {
													Ext.example
															.msg(
																	''
																			+ getResource('resourceParam575')
																			+ '',
																	obj.message);
												}
												backToMain();
											},
											disableCaching : true,
											autoAbort : true,
											params : {
												node : planningIds
											}
										});
									}
								});
					}
				});
				var projectVerify = new Ext.Action({
					id : 'projectVerify',
					text : '' + getResource('resourceParam1550') + '...',
					handler : function() {
						wbsdata.getPlanningIds();
						if (wbsdata.selections) {
							if (wbsdata.selections.split(',').length > 0) {
								mytaskdetails.wbsPanel.getLayout()
										.setActiveItem(1);
								approvePanel.dataid = wbsdata.selections;
								approvePanel.reset(null);
							} else {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam587')
													+ '',
											msg : ''
													+ getResource('resourceParam459')
													+ ''
													+ getResource('resourceParam947')
													+ '的'
													+ getResource('resourceParam1481')
													+ '!',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							}
						} else {
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam587')
												+ '',
										msg : ''
												+ getResource('resourceParam459')
												+ ''
												+ getResource('resourceParam947')
												+ '的'
												+ getResource('resourceParam1481')
												+ '!',
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
						}
					}
				});
				function resetSM() {
					wbsdata.sm.on('selectionchange', function(sm) {
						if (sm.getCount() == 0) {
							setDataPrivilege.mutiFirst = false;
							// 不选时，默认操作根节点
							mytaskdetails.targetId = departmentTaskMain.taskid;
							Ext.getCmp('create').enable();
							Ext.getCmp('createSameLevelTask').setVisible(false);
							Ext.getCmp('createApproveTask').setVisible(true);
							Ext.getCmp('createSubLevelTask').setVisible(true);
							Ext.getCmp('createByWBSTemplate').setVisible(true);

							Ext.getCmp('update').disable();
							Ext.getCmp('delete').disable();
							Ext.getCmp('terminate').disable();
							Ext.getCmp('approve').disable();
							Ext.getCmp('privilege').disable();
							Ext.getCmp('copyTask').disable();
							Ext.getCmp('cutTask').disable();
							if (mytaskdetails.pasteType == 'cut') {
								if (wbsdata.isPastable(mytaskdetails.cutTaskId,
										mytaskdetails.targetId)) {
									if (mytaskdetails.taskType == 1) {
										Ext.getCmp('pasteTask').disable();
									} else {
										Ext.getCmp('pasteTask').enable();
									}
								} else {
									Ext.getCmp('pasteTask').disable();
								}
							} else if (mytaskdetails.pasteType == 'copy') {
								if (wbsdata.isPastable(
										mytaskdetails.copyTaskId,
										mytaskdetails.targetId)) {
									if (mytaskdetails.taskType == 1) {
										Ext.getCmp('pasteTask').disable();
									} else {
										Ext.getCmp('pasteTask').enable();
									}
								} else {
									Ext.getCmp('pasteTask').disable();
								}
							}
							Ext.getCmp('moveUp').disable();
							Ext.getCmp('moveDown').disable();
						} else if (sm.getCount() == 1) {
							setDataPrivilege.mutiFirst = false;
							var r = sm.getSelected();
							mytaskdetails.taskType = r.data.taskType;
							mytaskdetails.targetId = r.data.id;
							mytaskdetails.preId = r.data.pre;
							mytaskdetails.nextId = r.data.next;
							// alert(mytaskdetails.preId + " -- "
							// + mytaskdetails.targetId + " -- "
							// + mytaskdetails.nextId);
							if (mytaskdetails.taskType == 1) {
								Ext.getCmp('create').disable();
							} else {
								Ext.getCmp('create').enable();
								Ext.getCmp('createSameLevelTask')
										.setVisible(true);
								Ext.getCmp('createApproveTask')
										.setVisible(true);
								Ext.getCmp('createSubLevelTask')
										.setVisible(true);
								Ext.getCmp('createByWBSTemplate')
										.setVisible(true);
							}

							Ext.getCmp('update').enable();
							Ext.getCmp('delete').enable();
							Ext.getCmp('terminate').enable();
							Ext.getCmp('approve').enable();
							Ext.getCmp('privilege').enable();
							Ext.getCmp('copyTask').enable();
							Ext.getCmp('cutTask').enable();
							Ext.getCmp('moveUp').enable();
							Ext.getCmp('moveDown').enable();
							if (mytaskdetails.pasteType == 'cut') {
								if (wbsdata.isPastable(mytaskdetails.cutTaskId,
										mytaskdetails.targetId)) {
									if (mytaskdetails.taskType == 1) {
										Ext.getCmp('pasteTask').disable();
									} else {
										Ext.getCmp('pasteTask').enable();
									}
								} else {
									Ext.getCmp('pasteTask').disable();
								}
							} else if (mytaskdetails.pasteType == 'copy') {
								if (wbsdata.isPastable(
										mytaskdetails.copyTaskId,
										mytaskdetails.targetId)) {
									if (mytaskdetails.taskType == 1) {
										Ext.getCmp('pasteTask').disable();
									} else {
										Ext.getCmp('pasteTask').enable();
									}
								} else {
									Ext.getCmp('pasteTask').disable();
								}
							}

						} else {
							setDataPrivilege.mutiFirst = true;
							wbsdata.getSelectIds();

							Ext.getCmp('create').disable();
							Ext.getCmp('update').disable();
							Ext.getCmp('delete').enable();
							Ext.getCmp('terminate').enable();
							Ext.getCmp('approve').enable();
							Ext.getCmp('privilege').enable();
							Ext.getCmp('copyTask').enable();
							Ext.getCmp('cutTask').enable();
							Ext.getCmp('pasteTask').disable();
							Ext.getCmp('moveUp').enable();
							Ext.getCmp('moveDown').enable();
							if (wbsdata.selections.split(',').length == 1) {
							} else {
							}
						}
					});
				}

				if (!mytaskdetails.wbsPanel) {
					wbsdata.checkSubNodes = false;
					mytaskdetails.wbs = wbsdata.init({
								tbar : null
							});
					resetSM();
					mytaskdetails.approval = approvePanel.init(null, null,
							"TaskDataType", backToMain, ""
									+ getResource('resourceParam1450') + "",
							backToMain);

					var createSameLevelTask = new Ext.Action({
						id : 'createSameLevelTask',
						text : '' + getResource('resourceParam1188') + '',
						iconCls : 'icon-createTask',
						hidden : true,
						handler : function() {
							Ext.Ajax.request({
								url : "../JSON/task_TaskRemote.getTaskTimeScale",
								method : 'POST',
								success : function(response, options) {
									TaskExtendForm.kind = 'same';
									var obj = Ext.util.JSON
											.decode(response.responseText);
									if (obj.success == true) {

										if (TaskCardFrame.panel1.items.length > 0) {
											TaskCardFrame.panel1.removeAll();
										}

										TaskCardFrame.basicForm = TaskBasicForm
												.init(backToMain);
										TaskCardFrame.panel1
												.add(TaskCardFrame.basicForm);

										TaskBasicForm.projectId = departmentTaskMain.projectid;
										TaskExtendForm.nodeId = mytaskdetails.targetId;
										mytaskdetails.wbsPanel.getLayout()
												.setActiveItem(2);
										TaskCardFrame.basicForm
												.setTitle(getResource('resourceParam5023'));
										TaskCardFrame.card.layout
												.setActiveItem(0);
										TaskCardFrame.basicForm.getForm()
												.reset();
										TaskBasicForm.constrain(obj);
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
									node : mytaskdetails.targetId,
									method : 'same'
								}
							});

						}
					});

					var createSubLevelTask = new Ext.Action({
						id : 'createSubLevelTask',
						text : '' + getResource('resourceParam1191') + '',
						iconCls : 'icon-createSubTask',
						handler : function() {
							// 任务的时间限制，任务时间限制在父project计划时间内,或自父任务内
							Ext.Ajax.request({
								url : "../JSON/task_TaskRemote.getTaskTimeScale",
								method : 'POST',
								success : function(response, options) {
									var obj = Ext.util.JSON
											.decode(response.responseText);
									TaskExtendForm.kind = 'sub';
									if (obj.success == true) {

										if (TaskCardFrame.panel1.items.length > 0) {
											TaskCardFrame.panel1.removeAll();
										}

										TaskCardFrame.basicForm = TaskBasicForm
												.init(backToMain);
										TaskCardFrame.panel1
												.add(TaskCardFrame.basicForm);

										TaskBasicForm.projectId = departmentTaskMain.projectid;
										TaskExtendForm.nodeId = mytaskdetails.targetId;
										mytaskdetails.wbsPanel.getLayout()
												.setActiveItem(2);
										TaskCardFrame.basicForm
												.setTitle(getResource('resourceParam5024'));
										TaskCardFrame.card.layout
												.setActiveItem(0);
										TaskCardFrame.basicForm.getForm()
												.reset();
										TaskBasicForm.constrain(obj);
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
									node : mytaskdetails.targetId,
									method : 'sub'
								}
							});
						}
					});

					var cApproveTask = new Ext.Action({
						id : 'createApproveTask',
						disabled : false,
						text : '创建' + getResource('resourceParam1020') + '',
						handler : function() {
							createApproveTask.reset();
							// 任务的时间限制，任务时间限制在父project计划时间内,或自父任务内
							Ext.Ajax.request({
								url : "../JSON/task_TaskRemote.getTaskTimeScale",
								method : 'POST',
								success : function(response, options) {
									var obj = Ext.util.JSON
											.decode(response.responseText);
									if (obj.success == true) {
										createApproveTask.dataid = mytaskdetails.targetId;
										mytaskdetails.wbsPanel.getLayout()
												.setActiveItem(5);

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
									node : mytaskdetails.targetId,
									method : 'sub'
								}
							});
						}
					});

					if (mytaskdetails.flowTemplate) {
						mytaskdetails.wbsPanel
								.remove(mytaskdetails.flowTemplate);
						delete mytaskdetails.flowTemplate;
					}
					var createByWBSTemplate = new Ext.Action({
						id : 'createByWBSTemplate',
						text : '从' + getResource('resourceParam943') + '模板创建',
						handler : function() {
							// 模板创建时，和本身wbs分解会有冲突，动态加入
							if (mytaskdetails.flowTemplate) {
								mytaskdetails.wbsPanel
										.remove(mytaskdetails.flowTemplate);
							}
							mytaskdetails.flowTemplate = applyTemplateMain
									.init(backToMain);
							mytaskdetails.wbsPanel
									.add(mytaskdetails.flowTemplate);
							mytaskdetails.wbsPanel.getLayout().setActiveItem(6);
							applyTemplateMain.targetId = mytaskdetails.targetId;
							applyTemplateMain.load();
						}
					});

					mytaskdetails.wbsPanel = new Ext.Panel({
						layout : 'card',
						border : false,
						region : 'center',
						titlebar : false,
						autoScroll : true,
						activeItem : 0,
						margins : '0 5 5 0',
						tbar : new Ext.Toolbar({
							items : [{
								text : getResource('resourceParam483'),
								id : 'create',
								menu : [createSameLevelTask,
										createSubLevelTask,
										createByWBSTemplate, cApproveTask]
							}, '-', {
								text : getResource('resourceParam478'),
								id : 'update',
								disabled : true,
								handler : function() {
									if (mytaskdetails.taskType == 1) {
										createApproveTask.params = {
											title : getResource('resourceParam5025'),
											update : true
										}
										createApproveTask.dataid = mytaskdetails.targetId;
										createApproveTask.setBasic();
										mytaskdetails.wbsPanel.getLayout()
												.setActiveItem(5);
									} else {
										if (updateTaskCard.panel1.items.length > 0) {
											updateTaskCard.panel1.removeAll();
										}
										updateTaskCard.basicForm = updateTaskBasic
												.init(backToMain);
										updateTaskCard.panel1
												.add(updateTaskCard.basicForm);

										updateTaskBasic.projectId = departmentTaskMain.projectid;
										updateTaskBasic.nodeId = mytaskdetails.targetId;
										updateTaskBasic.setFirstPage();
										updateTaskBasic.setBasic();
										mytaskdetails.wbsPanel.getLayout()
												.setActiveItem(3);
									}
								}
							}, '-', {
								text : getResource('resourceParam475'),
								id : 'delete',
								handler : function() {
									wbsdata.getSelectIds();
									if (wbsdata.selections.split(',').length > 0) {
										Ext.Msg
												.confirm(
														''
																+ getResource('resourceParam575')
																+ '',
														""
																+ getResource('resourceParam1182')
																+ "", function(
																btn) {
															if (btn == 'yes') {
																Ext.Ajax
																		.request(
																				{
																					url : "../JSON/task_TaskRemote.deleteTask",
																					method : 'POST',
																					success : function(
																							response,
																							options) {
																						var obj = Ext.util.JSON
																								.decode(response.responseText);
																						backToMain();
																						if (obj.success == true) {
																							mytaskdetails.targetId = departmentTaskMain.taskid;
																						} else {
																							Ext.MessageBox
																									.show(
																											{
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
																						node : wbsdata.selections
																					}
																				});// deleteTask
															}
														});
									} else {
										Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam587')
													+ '',
											msg : ''
													+ getResource('resourceParam459')
													+ ''
													+ getResource('resourceParam947')
													+ '的'
													+ getResource('resourceParam1481')
													+ '!',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
									}

								}

							}, '-', {
								id : 'terminate',
								text : '' + getResource('resourceParam1170')
										+ '',
								disabled : true,
								handler : function() {
									Ext.Msg
											.confirm(
													''
															+ getResource('resourceParam575')
															+ '',
													""
															+ getResource('resourceParam1537')
															+ "?",
													function(btn) {
														if (btn == 'yes') {
															var mask = new Ext.LoadMask(
																	document.body,
																	{
																		msg : getResource('resourceParam5041')
																	});
															mask.show();
															Ext.Ajax.request({
																url : "../JSON/task_TaskRemote.terminateTask",
																method : 'POST',
																success : function(
																		response,
																		options) {
																	mask.hide();
																	var obj = Ext.util.JSON
																			.decode(response.responseText);
																	backToMain();
																	if (obj.success == true) {
																	} else {
																		Ext.MessageBox
																				.show(
																						{
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
																	node : wbsdata
																			.getSelectIds()
																}
															});
														}
													});
								}

							}, '-', {
								id : 'approve',
								text : '' + getResource('resourceParam1045')
										+ '',
								menu : [projectApprove, projectVerify]
							}, '-', {
								text : getResource('resourceParam582'),
								id : 'privilege',
								handler : function() {
									// setDataPrivilege.mainpanel.dataId =
									// mytaskdetails.targetId;
									// 所有头结点
									setDataPrivilege.mainpanel.dataId = wbsdata
											.getSelectIds();
									mytaskdetails.wbsPanel.getLayout()
											.setActiveItem(4);
									setDataPrivilege.refresh();
								}
							}, '-', {
								id : 'copyTask',
								text : '' + getResource('resourceParam485')
										+ '',
								disabled : true,
								handler : function() {
									mytaskdetails.copyTaskId = mytaskdetails.targetId;
									mytaskdetails.pasteType = 'copy';
									Ext.getCmp('pasteTask').disable();
								}
							}, '-', {
								id : 'cutTask',
								text : '' + getResource('resourceParam486')
										+ '',
								disabled : true,
								handler : function() {
									mytaskdetails.cutTaskId = mytaskdetails.targetId;
									mytaskdetails.pasteType = 'cut';
									Ext.getCmp('pasteTask').disable();
								}
							}, '-', {
								id : 'pasteTask',
								iconCls : 'icon-pasteTask',
								text : '' + getResource('resourceParam487')
										+ '',
								disabled : true,
								handler : function() {
									Ext.Msg
											.confirm(
													''
															+ getResource('resourceParam575')
															+ '',
													""
															+ getResource('resourceParam1544')
															+ "?",
													function(btn) {
														if (btn == 'yes') {
															Ext.Ajax.request({
																url : "../JSON/task_TaskRemote.paste_Task",
																method : 'POST',
																success : function(
																		response,
																		options) {
																	var obj = Ext.util.JSON
																			.decode(response.responseText);
																	backToMain();
																	if (obj.success == true) {
																		var projectId = null;
																		var chargedManId = null;
																		if (mytaskdetails.pasteType == 'cut') {
																			projectId = departmentTaskMain.projectid;
																			mytaskdetails.cutTaskId = null;
																			mytaskdetails.cutTaskNode = null;
																		} else if (mytaskdetails.pasteType == 'copy') {
																			projectId = departmentTaskMain.projectid;
																		}
																	} else {
																		Ext.MessageBox
																				.show(
																						{
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
																	node : mytaskdetails.targetId,// 当前选中的节点
																	copyTaskId : mytaskdetails.copyTaskId,// 要复制的task
																	cutTaskId : mytaskdetails.cutTaskId,// 要剪切的task
																	pastType : mytaskdetails.pasteType
																}
															});
														}
													});
								}

							}, '-', {
								id : 'moveUp',
								iconCls : 'icon-taskUp',
								text : '' + getResource('resourceParam488')
										+ '',
								disabled : true,
								handler : function() {
									Ext.Msg
											.confirm(
													''
															+ getResource('resourceParam575')
															+ '',
													""
															+ getResource('resourceParam1186')
															,
													function(btn) {
														if (btn == 'yes') {
															Ext.Ajax.request({
																url : "../JSON/task_TaskRemote.moveUpTask",
																method : 'POST',
																success : function(
																		response,
																		options) {
																	var obj = Ext.util.JSON
																			.decode(response.responseText);
																	backToMain();
																	if (obj.success == true) {

																	} else {
																		Ext.MessageBox
																				.show(
																						{
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
																	node : mytaskdetails.targetId,
																	moveId : mytaskdetails.preId
																}
															});
														}
													});
								}
							}, '-', {
								id : 'moveDown',
								iconCls : 'icon-taskDown',
								text : '' + getResource('resourceParam489')
										+ '',
								disabled : true,
								handler : function() {
									Ext.Msg
											.confirm(
													''
															+ getResource('resourceParam575')
															+ '',
													""
															+ getResource('resourceParam1185')
															+ "",
													function(btn) {
														if (btn == 'yes') {
															Ext.Ajax.request({
																url : "../JSON/task_TaskRemote.moveDownTask",
																method : 'POST',
																success : function(
																		response,
																		options) {
																	var obj = Ext.util.JSON
																			.decode(response.responseText);
																	backToMain();
																	if (obj.success == true) {

																	} else {
																		Ext.MessageBox
																				.show(
																						{
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
																	node : mytaskdetails.targetId,
																	moveId : mytaskdetails.nextId
																}
															});
														}
													});
								}
							}, '-', {
								text : getResource('resourceParam944'),
								handler : function() {
									backToMain();
								}
							}]
						}),
						items : [mytaskdetails.wbs, mytaskdetails.approval,
								TaskCardFrame.init(backToMain),
								updateTaskCard.init(backToMain),
								setDataPrivilege.init({
											'dataId' : null,
											'dataType' : 'TaskDataType'
										}), approveTask]
					});
					this.add(mytaskdetails.wbsPanel);
					this.doLayout();
				}
				wbsdata.refresh();
				wbsdata.sm.clearSelections(true);
				mytaskdetails.wbsPanel.getLayout().setActiveItem(0);
			},
			deactivate : function() {
				if (templateDatail.conflict) {
					templateDatail.conflict = false;
					mytaskdetails.egridpanel3.remove(0);
					mytaskdetails.egridpanel3.add(relationPanel.init());

					mytaskdetails.tabpanel.remove(1);
					var mydataObjectPanel = new dataObjectPanel();
					mytaskdetails.egridpanel2 = mydataObjectPanel.init();
					mytaskdetails.egridpanel2.on('activate', function() {
						var conn = synchronize.createXhrObject();
						var myurl = "../JSON/task_TaskRemote.isAllowEditDataEnityByTaskId?taskid="
								+ departmentTaskMain.taskid + "&d=" + new Date();
						conn.open("GET", myurl, false);
						conn.send(null);
						var enableEdit = conn.responseText == "true"
								? true
								: false;

						mydataObjectPanel.setConfigs(departmentTaskMain.projectid,
								departmentTaskMain.taskid, enableEdit);

					})
					mytaskdetails.tabpanel.insert(1, mytaskdetails.egridpanel2)
				}

			}

		}
	});

	var logAttributeTaskId = new Ext.form.TextField({

				id : 'logAttributeTaskId',
				inputType : 'hidden'
			});

	var logAttributeTask = new Ext.form.TextField({
				fieldLabel : '' + getResource('resourceParam624') + '',
				id : 'logAttributeTask',
				style : 'margin-bottom: 5px;',
				readOnly : true,
				width : 300
			});
	var logName = new Ext.form.TextField({
				id : 'logName',
				fieldLabel : '' + getResource('resourceParam625') + '',
				style : 'margin-bottom: 5px;',
				width : 100,
				allowBlank : false,
				emptyText : '' + getResource('resourceParam621') + '',
				maxLength : 95,
				minLengthText : '' + getResource('resourceParam1449') + '',
				msgTarget : 'side'
			});
	var messageType = new Ext.form.TextField({
				id : 'messageType',
				width : 100,
				value : 1,
				inputType : 'hidden'
			});
	var logContent = new Ext.form.TextArea({
				id : 'logContent',
				fieldLabel : '' + getResource('resourceParam626') + '',
				style : 'margin-bottom: 5px;',
				width : 200,
				height : 100,
				allowBlank : false,
				emptyText : '' + getResource('resourceParam622') + '',
				maxLength : 2000,
				maxLengthText : '' + getResource('resourceParam591') + ''
			});
	// var logFile1 = Ext.ux.form.FileUploadField({
	// fieldLabel : '文件',
	// name : 'file',
	// allowBlank : true,
	// // width : 200,
	// // style : 'margin-bottom: 5px;',
	// buttonText : '浏览',
	// emptyText : '请选择一个文件'
	// });
	// var logFile1 = new Ext.form.TextField({
	// inputType : 'file',
	// allowBlank : true,
	// id : 'logFile1',
	// width : 200,
	// fieldLabel : '文件',
	// listeners : {
	// 'change' : function() {
	// alert("");
	// }
	// }
	// });

	var logAddForm = new Ext.form.FormPanel({
				id : 'logAddForm',
				fileUpload : true,
				// enctype : 'multipart/form-data',
				bodyStyle : 'padding:5px 5px 0',
				// height:800,
				defaults : {
					anchor : '62%',
					// allowBlank : false,
					msgTarget : 'side'
				},
				items : [logAttributeTaskId, logAttributeTask, logName,
						messageType, logContent, {
							xtype : 'fileuploadfield',
							id : 'logfile1',
							fieldLabel : '' + getResource('resourceParam469')
									+ '',
							buttonText : '' + getResource('resourceParam473')
									+ ''

						}],
				buttons : [{
							text : '' + getResource('resourceParam605') + '',
							handler : logSubmit
						}, {
							text : getResource('resourceParam5019'),
							handler : logSave
						}, {
							text : '' + getResource('resourceParam606') + '',
							handler : logReset
						}]
			});
	var feedBackAttributeTaskId = new Ext.form.TextField({

				id : 'feedBackAttributeTaskId',
				inputType : 'hidden'
			});

	var feedBackAttributeTask = new Ext.form.TextField({
				fieldLabel : '' + getResource('resourceParam624') + '',
				id : 'feedBackAttributeTask',
				readOnly : true,
				width : 300
			});
	var feedBackName = new Ext.form.TextField({
				id : 'feedBackName',
				fieldLabel : '' + getResource('resourceParam1451') + '',
				width : 300
			});
	var feedBackContent = new Ext.form.TextArea({
				id : 'feedBackContent',
				fieldLabel : '' + getResource('resourceParam595') + '',
				width : 400,
				height : 100,
				allowBlank : false,
				emptyText : '' + getResource('resourceParam592') + '',
				maxLength : 500,
				maxLengthText : '' + getResource('resourceParam783') + ''
			});
	var feedBackFile1 = new Ext.form.TextField({
		inputType : 'file',
		allowBlank : true,
		id : 'feedBackFile1',
		width : 400,
		fieldLabel : '' + getResource('resourceParam469') + ''
			// ,
			// buttonCfg : {
			// text : '',
			// iconCls : 'upload-icon'
			// }

		});
	var feedBackAddForm = new Ext.form.FormPanel({
				id : 'feedBackAddForm',
				fileUpload : true,
				enctype : 'multipart/form-data',
				bodyStyle : 'padding:5px 5px 0',
				defaults : {
					anchor : '95%',
					// allowBlank : false,
					msgTarget : 'side'
				},
				items : [feedBackAttributeTaskId, feedBackAttributeTask,
						feedBackName, feedBackContent, feedBackFile1],
				buttons : [{
							text : getResource('resourceParam5019'),
							handler : feedBackSubmit
						}, {
							text : '' + getResource('resourceParam606') + '',
							handler : feedBackReset
						}]
			});

	mytaskdetails.egridpanel4 = new Ext.Panel({
				id : 'etabpanel4',
				height : 800,
				title : '' + getResource('resourceParam607') + '',
				activeItem : 0,
				layout : 'card',
				items : [feedBackTabPanel]
			});

	var logTabPanel1 = new Ext.TabPanel({
		id : 'logTabPanel1',
		layoutOnTabChange : true,
		activeTab : 1,
		autoScroll : true,
		animScroll : true,
		resizeTabs : true,
		enableTabScroll : true,
		deferredRender : false,
		tabMargin : 0,

		// height : 800,
		// autoLoad:true,
		items : [{
			id : 'addloginfo',
			title : '  ' + getResource('resourceParam628') + '  ',
			//
			// autoScroll : true,
			layout : 'fit',
			items : [logAddForm],
			listeners : {
				'activate' : function() {
					// logTabPanel.doLayout();
					// logAddForm.disabled = true;'taskcategoryname',
					// 'taskstatusid',
					if ('6' == myGrid.rows[0].get('taskstatusid')
							|| '7' == myGrid.rows[0].get('taskstatusid')) {
						logAddForm.disable();
					} else {
						logAddForm.enable();
					}
				}
			}

		}, {
			id : 'taskloginfo',
			title : '  ' + getResource('resourceParam627') + '  ',
			layout : 'fit',
			html : "<iframe scrolling=auto  id='loginframe'  frameborder=0 width=100% height=100% src='../logInfo.seam' ></iframe>",
			listeners : {
				'activate' : function() {
					document.getElementById('loginframe').src = '../logInfo.seam?taskid='
							+ departmentTaskMain.taskid + '&typeStr=1,';
				}
			}
		}]

	});
	mytaskdetails.egridpanel12 = new Ext.Panel({
				id : 'egridpanel12',
				layout : 'fit',
				items : [logTabPanel1]

			});
	mytaskdetails.egridpanel5 = new Ext.Panel({
				id : 'etabpanel5',
				height : 800,
				title : '' + getResource('resourceParam629') + '',
				activeItem : 0,
				layout : 'card',
				items : [mytaskdetails.egridpanel12],
				listeners : {
					'activate' : function() {
						Ext.getCmp('etabpanel5').removeClass('x-hide-display');
						logTabPanel1.setActiveTab(1);
					}
				}

			});
	function feedBackSubmit() {
		return ;
		// return ;
		// var temp = Ext.getCmp('logContent').getValue();
		// if (!logAddForm.getForm().isValid()) {
		// return;
		// }
		// logAddForm.getForm().submit({
		// url : '../logupload?logAttributeTaskId='
		// + Ext.getCmp('logAttributeTaskId').getValue()
		// + '&logAttributeTask='
		// + Ext.getCmp('logAttributeTask').getValue() + '&logName='
		// + Ext.getCmp('logName').getValue() + '&logContent='
		// + Ext.getCmp('logContent').getValue(),
		// method : 'post',
		// // params:logAddForm,
		// success : function(form, action) {
		//
		// },
		// failure : function(form, action) {
		//
		// }
		//
	}
	function logSubmit() {
		// alert(Ext.getCmp('logAttributeTaskId').getValue());
		// return ;

		var temp = Ext.getCmp('logContent').getValue();
		if (!logAddForm.getForm().isValid()) {
			return;
		}
		logAddForm.getForm().submit({
			url : '../logupload?logAttributeTaskId='
					+ Ext.getCmp('logAttributeTaskId').getValue()
					+ '&logAttributeTask='
					+ Ext.getCmp('logAttributeTask').getValue() + '&logName='
					+ Ext.getCmp('logName').getValue() + '&logContent='
					+ Ext.getCmp('logContent').getValue()
					+ '&messageType=1&publishMode=4',
			method : 'post',
			// params:logAddForm,
			success : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam623') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
				var logAttributeTaskIds = Ext.getCmp('logAttributeTaskId')
						.getValue();
				var logAttributeTasks = Ext.getCmp("logAttributeTask")
						.getValue();
				logAddForm.getForm().reset();
				Ext.getCmp("logAttributeTask").setValue(logAttributeTasks);
				Ext.getCmp("logAttributeTaskId").setValue(logAttributeTaskIds);

			},
			failure : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam594') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
			}

		});
	}
	function logSave() {
		// alert(Ext.getCmp('logAttributeTaskId').getValue());
		// return ;
		var temp = Ext.getCmp('logContent').getValue();
		if (!logAddForm.getForm().isValid()) {
			return;
		}
		logAddForm.getForm().submit({
			url : '../logupload?logAttributeTaskId='
					+ Ext.getCmp('logAttributeTaskId').getValue()
					+ '&logAttributeTask='
					+ Ext.getCmp('logAttributeTask').getValue() + '&logName='
					+ Ext.getCmp('logName').getValue() + '&logContent='
					+ Ext.getCmp('logContent').getValue()
					+ '&messageType=1&publishMode=1',
			method : 'post',
			// params:logAddForm,
			success : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam623') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.INFO
						});
				var logAttributeTaskIds = Ext.getCmp('logAttributeTaskId')
						.getValue();
				var logAttributeTasks = Ext.getCmp("logAttributeTask")
						.getValue();
				logAddForm.getForm().reset();
				Ext.getCmp("logAttributeTask").setValue(logAttributeTasks);
				Ext.getCmp("logAttributeTaskId").setValue(logAttributeTaskIds);

			},
			failure : function(form, action) {
				Ext.Msg.show({
							title : '' + getResource('resourceParam596') + '',
							msg : '' + getResource('resourceParam594') + '',
							width : 170,
							buttons : Ext.Msg.OK,
							icon : Ext.Msg.ERROR
						});
			}

		});
	}
	function logReset() {
		logAddForm.getForm().reset();
	}
	function feedBackReset() {
		feedBackAddForm.getForm().reset();
	}

	mytaskdetails.egridpanel13 = new Ext.Panel({
				id : 'egridpanel13',
				height : 800,
				title : '' + getResource('resourceParam607') + '',
				layout : 'fit',

				listeners : {
					'activate' : function() {
						Ext.getCmp('egridpanel13')
								.removeClass('x-hide-display');
						if ('6' == myGrid.rows[0].get('taskstatusid')
								|| '7' == myGrid.rows[0].get('taskstatusid')) {
							feedback.feedBackTabPanel.items.get(0).items.get(0)
									.disable();
						} else {
							feedback.feedBackTabPanel.items.get(0).items.get(0)
									.enable();
						}

					}
				}
			});
	mytaskdetails.tabpanel = new Ext.TabPanel({
				id : 'taskdetailstabpanel',
				minTabWidth : 40,
				region : 'center',
				resizeTabs : true,
				items : [mytaskdetails.egridpanel1, mytaskdetails.egridpanel2,
						mytaskdetails.egridpanel3, mytaskdetails.egridpanel33,
						mytaskdetails.egridpanel5, mytaskdetails.egridpanel13,
						mytaskdetails.approvalHistoryPanel]
			});

	var panel13 = new Ext.Panel({
				id : 'panel13',
				region : 'north',
				height : 25,
				collapsible : true,
				html : "<div id='panel13div'></div>"
			});
	mytaskdetails.detailspanel = new Ext.Panel({
				id : 'detailspanel',
				layout : 'border',
				items : [panel13, mytaskdetails.tabpanel]

			});

	return mytaskdetails.detailspanel;
}
var feedBackTabPanel = new Ext.TabPanel({
	id : 'feedBackTabPanel',
	layoutOnTabChange : true,
	activeTab : 1,
	autoScroll : true,
	animScroll : true,
	resizeTabs : true,
	enableTabScroll : true,
	deferredRender : false,
	tabMargin : 0,

	items : [{

		title : '  ' + getResource('resourceParam602') + '  '
		}, {
		id : 'feedBackInfo',
		contentEl : 'feedBackInfo',
		title : '  ' + getResource('resourceParam599') + '  ',
		autoScroll : true,
		html : "<iframe scrolling=auto id='feedbackinfoframe' frameborder =0  width=100% height=100% src='../logInfo.seam' ></iframe>",
		listeners : {
			'activate' : function() {
				document.getElementById('feedbackinfoframe').src = '../logInfo.seam?taskid='
						+ departmentTaskMain.taskid + '&typeStr=2,';
			}
		}

	}]

});

