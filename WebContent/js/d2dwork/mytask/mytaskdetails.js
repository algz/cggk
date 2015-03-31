var mytaskdetails = {
	wbsPanel : null,
	viewTi : null
}
var data = {
	modify : true
}

// zhengjg 重构任务详细面板

mytaskdetails.mainpanelAll = function() {
	var b = new Ext.Panel({
				id : 'mainpanelAllid',
				layout : 'border',
				items : [mytaskdetails.panel13(), mytaskdetails.mainTabpanel()]
			});
	return b;
}

mytaskdetails.panel13 = function() {
	var panel = new Ext.Panel({
				id : 'panel13',
				region : 'north',
				height : 25,
				html : '<div id="hhid"></div>'
			});
	return panel;
}
mytaskdetails.mainTabpanel = function() {

	function resetSM() {
		wbsdata.sm.on('selectionchange', function(sm) {
					if (sm.getCount() == 0) {
						setDataPrivilege.mutiFirst = false;
						// 不选时，默认操作根节点
						mytaskdetails.targetId = mytaskMain.taskid;
						Ext.getCmp('create').enable();
						Ext.getCmp('createSameLevelTask').setVisible(false);
						Ext.getCmp('createApproveTask').setVisible(true);
						Ext.getCmp('createSubLevelTask').setVisible(true);
						Ext.getCmp('createByWBSTemplate').setVisible(true);

						Ext.getCmp('update').disable();
						/**
						 * bug：若选择多个，则上移和下移按钮灰显 gaoyn
						 */
						Ext.getCmp('moveUp').disable();
						Ext.getCmp('moveDown').disable();

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

					} else if (sm.getCount() == 1) {
						setDataPrivilege.mutiFirst = false;
						var r = sm.getSelected();
						mytaskdetails.taskType = r.data.taskType;
						mytaskdetails.targetId = r.data.id;
						mytaskdetails.preId = r.data.pre;
						mytaskdetails.nextId = r.data.next;
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
						/**
						 * bug：若选择多个，则上移和下移按钮灰显 gaoyn
						 */

						Ext.getCmp('moveUp').disable();
						Ext.getCmp('moveDown').disable();
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
		wbsdata.nodeId = mytaskMain.taskid;
		// 不选时，默认操作根节点
		mytaskdetails.targetId = mytaskMain.taskid;
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

	var panel1 = new Ext.Panel({
				id : 'mytaskdetailspanel1',
				title : getResource('resourceParam5001'),
				region : 'center',
				layout : 'fit',
				items : [TaskAttributePanel.init()]
			});
	panel1.on("activate", function(p) {
				TaskAttributePanel.taskId = mytaskMain.taskid;
				TaskAttributePanel.setBasicForm(TaskAttributePanel.taskId);
				this.removeClass('x-hide-display');
				Ext.getCmp("taskdetailstabpanel").doLayout();
				TaskAttributePanel.setFirstPage();
			});
	panel1.on("deactivate", function(p) {
				TaskAttributePanel.setFirstPage();
			});

	// var panel2=new Ext.Panel({
	// id:'mytaskdetailspanel2',
	// title : '' + getResource('resourceParam474') + '',
	// region : 'center',
	// layout : 'fit'
	// });

	var mydataObjectPanel = new dataObjectPanel();
	var panel2 = mydataObjectPanel.init();
	panel2.on("activate", function(p) {
		var conn = synchronize.createXhrObject();
		var myurl = "../JSON/task_TaskRemote.isAllowEditDataEnityByTaskId?taskid="
				+ mytaskMain.taskid + "&d=" + new Date();
		conn.open("GET", myurl, false);
		conn.send(null);
		var enableEdit = conn.responseText == "true" ? true : false;
		if (4 != myGrid.rows[0].data.taskstatusid) {
			enableEdit = false;
		}
		mydataObjectPanel.setConfigs(mytaskMain.projectid, mytaskMain.taskid,
				enableEdit);

		/**
		 * bug编号30 —— 数据
		 * 
		 * @author wangyf 2011-05-06 16:39
		 */
		if (mytaskMain.taskdW != null && mytaskMain.taskdW == 3) {
			Ext.getCmp("dataObjectColumnTreeAdd").setDisabled(true);
			Ext.getCmp("dataObjectColumnTreeDel").setDisabled(true);
			Ext.getCmp("dataObjectColumnTreeSave").setDisabled(true);
			Ext.getCmp("dataObjectColumnTreeDataCenterView").setDisabled(true);
			Ext.getCmp("dataObjectColumnTreeRefresh").setDisabled(true);
			Ext.getCmp("dataObjectColumnTreeDataSetTagBat").setDisabled(true);
			Ext.getCmp("dataObjectColumnTreeDefaultType").setDisabled(true);
			Ext.getCmp("dataObjectColumnTreeEdit").setDisabled(true);
			// 把EDM:?隐藏起来，这样比较容易控制
			Ext.getCmp("edmWang").setVisible(false);
		}
	});

	var panel3 = new Ext.Panel({
		id : 'mytaskdetailspanel3',
		title : '' + getResource('resourceParam1154') + '',
		region : 'center',
		layout : 'fit'
			// itmes:[]
		});
	var relationPanel_content = null;
	panel3.on("activate", function(p) {
				if (relationPanel_content == null) {
					relationPanel_content = relationPanel.init();
					this.add(relationPanel_content);
					this.doLayout();
				}
				relationPanel.active(mytaskMain.projectid, mytaskMain.taskid,
						mytaskMain.taskname);

				/**
				 * bug编号30 —— 关系
				 * 
				 * @author wangyf 2011-05-06 17:51
				 */
				if (mytaskMain.taskdW != null && mytaskMain.taskdW == 3) {
					Ext.getCmp("relationPanelwbsbutton").setDisabled(true);
					Ext.getCmp("relationPanelflowbutton").setDisabled(true);
					Ext.getCmp("blowUpW").setDisabled(true);
					Ext.getCmp("lessenW").setDisabled(true);
					Ext.getCmp("startupp2m").setDisabled(true);
				}
			});
	var panel4 = new Ext.Panel({
		id : 'mytaskdetailspanel4',
		title : 'WBS',
		region : 'center',
		layout : 'fit',
		listeners : {
			activate : function() {

				// wbs展开时的任务id
				Ext.getCmp('mytaskdetailspanel4').removeClass('x-hide-display');
				wbsdata.nodeId = mytaskMain.taskid;
				// 新建任务的目标id
				mytaskdetails.targetId = mytaskMain.taskid;
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
							mytaskdetails.targetId = mytaskMain.taskid;
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
							/**
							 * bug：508 若选择多个，则上移和下移按钮灰显 gaoyn
							 */
							Ext.getCmp('moveUp').disable();
							Ext.getCmp('moveDown').disable();
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
										TaskCardFrame.panel1.doLayout();
										TaskBasicForm.projectId = mytaskMain.projectid;
										TaskExtendForm.nodeId = mytaskdetails.targetId;
										mytaskdetails.wbsPanel.getLayout()
												.setActiveItem(2);
										TaskCardFrame.basicForm
												.setTitle(getResource('resourceParam5023'));
										TaskCardFrame.basicForm.doLayout();
										TaskCardFrame.card.layout
												.setActiveItem(0);
										TaskCardFrame.card
												.doLayout(false, true);
										TaskCardFrame.basicForm.getForm()
												.reset();
										/*
										 * by suny,2011-05-23 增加新建任务配置
										 */
										var config = {
											timeExtend : mytaskMain.timeExtend,
											chargedExtend : mytaskMain.chargedExtend
										};
										TaskBasicForm.constrain(obj, config);
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
										TaskCardFrame.panel1.doLayout();
										TaskBasicForm.projectId = mytaskMain.projectid;
										TaskExtendForm.nodeId = mytaskdetails.targetId;
										mytaskdetails.wbsPanel.getLayout()
												.setActiveItem(2);
										mytaskdetails.wbsPanel.doLayout();
										TaskCardFrame.basicForm
												.setTitle(getResource('resourceParam5024'));
										TaskCardFrame.card.layout
												.setActiveItem(0);
										TaskCardFrame.card
												.doLayout(false, true);
										TaskCardFrame.basicForm.getForm()
												.reset();
										/*
										 * by suny,2011-05-23 增加新建任务配置
										 */
										var config = {
											timeExtend : mytaskMain.timeExtend,
											chargedExtend : mytaskMain.chargedExtend
										};
										TaskBasicForm.constrain(obj, config);
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
										createApproveTask.params = {
											title : getResource('resourceParam5011'),// 新建审批任务
											update : false
										}
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
										createByWBSTemplate, cApproveTask, {
											id : 'taskCreateRules',// 任务创建规则
											text : getResource('resourceParam9797'),// 任务创建规则
											menu : {
												items : [{
													xtype : 'menucheckitem',
													text : '<span ext:qtip="勾选该选项，在创建任务时可以继承<br/>父节点的计划开始和计划结束时间">继承父节点计划时间</span>',
													checkHandler : function() {
														mytaskMain.timeExtend = this.checked;
													},
													stateId : 'timeExtend',
													stateful : true,
													hideOnClick : false,
													stateEvents : ['click'],
													applyState : function(state) {
														this.checked = state.checked;
														mytaskMain.timeExtend = this.checked;
													},
													getState : function() {
														return {
															checked : this.checked
														};
													}
												}, {
													xtype : 'menucheckitem',
													text : '<span ext:qtip="勾选该选项，在创建任务时可以继承<br/>父节点的负责部门和负责人">继承父节点负责部门和负责人</span>',
													checkHandler : function() {
														mytaskMain.chargedExtend = this.checked;
													},
													stateId : 'chargedExtend',
													stateful : true,
													hideOnClick : false,
													stateEvents : ['click'],
													applyState : function(state) {
														this.checked = state.checked;
														mytaskMain.chargedExtend = this.checked;
													},
													getState : function() {
														return {
															checked : this.checked
														};
													}
												}]
											},
											hideOnClick : false
										}]
							}, '-', {
								text : getResource('resourceParam478'),
								id : 'update',
								disabled : true,
								handler : function() {
									if (mytaskdetails.taskType == 1) {
										createApproveTask.params = {
											title : getResource('resourceParam5025'),// 修改审批任务
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

										updateTaskBasic.projectId = mytaskMain.projectid;
										updateTaskBasic.nodeId = mytaskdetails.targetId;
										updateTaskBasic.setFirstPage();
										updateTaskBasic.setBasic();
										updateTaskCard.card.doLayout(false,
												true);
										mytaskdetails.wbsPanel.getLayout()
												.setActiveItem(3);
									}
								}
							}, '-', {
								text : getResource('resourceParam475'),
								id : 'delete',
								disabled : true,
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
																+ "",
														function(btn) {
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
																							mytaskdetails.targetId = mytaskMain.taskid;
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
														}).getDialog()
												.setWidth(250);
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
								disabled : true,
								menu : [projectApprove, projectVerify]
							}, '-', {
								text : getResource('resourceParam582'),
								id : 'privilege',
								disabled : true,
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
																			projectId = mytaskMain.projectid;
																			mytaskdetails.cutTaskId = null;
																			mytaskdetails.cutTaskNode = null;
																		} else if (mytaskdetails.pasteType == 'copy') {
																			projectId = mytaskMain.projectid;
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
													}).getDialog()
											.setWidth(250);
								}

							}, '-', {
								id : 'moveUp',
								iconCls : 'icon-taskUp',
								text : '' + getResource('resourceParam488')
										+ '',
								disabled : true,
								handler : function() {
									/**
									 * 加一个是否是最底层的判断
									 * bug：如果选择顶端或末端任务，上或下移动时，系统应该直接提示，不要再询问是否移动；
									 * gaoyn
									 */
									if (mytaskdetails.preId == 0) {
										Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam6086')
													+ '',
											msg : ''
													+ getResource('resourceParam7041')
													+ '! ',
											width : 250,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO
										});
										return;
									}

									Ext.Msg
											.confirm(
													''
															+ getResource('resourceParam575')
															+ '',
													""
															+ getResource('resourceParam1186')
															+ "",
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
													}).getDialog()
											.setWidth(250);
								}
							}, '-', {
								id : 'moveDown',
								iconCls : 'icon-taskDown',
								text : '' + getResource('resourceParam489')
										+ '',
								disabled : true,
								handler : function() {
									/**
									 * 加一个是否是最底层的判断
									 * bug：如果选择顶端或末端任务，上或下移动时，系统应该直接提示，不要再询问是否移动；
									 * gaoyn
									 */
									if (mytaskdetails.nextId == 0) {
										Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam6086')
													+ '',
											msg : ''
													+ getResource('resourceParam7042')
													+ '!',
											width : 250,
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.INFO
										});
										return;
									}

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
													}).getDialog()
											.setWidth(250);
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

				/**
				 * bug编号30 —— WBS
				 * 
				 * @author wangyf 2011-05-06 17:51
				 */
				if (mytaskMain.taskdW != null && mytaskMain.taskdW == 3) {
					Ext.getCmp('create').setDisabled(true);
					Ext.getCmp('update').setDisabled(true);
					Ext.getCmp('delete').setDisabled(true);
					Ext.getCmp('terminate').setDisabled(true);
					Ext.getCmp('approve').setDisabled(true);
					Ext.getCmp('privilege').setDisabled(true);
					Ext.getCmp('copyTask').setDisabled(true);
					Ext.getCmp('cutTask').setDisabled(true);
					Ext.getCmp('pasteTask').setDisabled(true);
					Ext.getCmp('moveUp').setDisabled(true);
					Ext.getCmp('moveDown').setDisabled(true);
				}
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
								+ mytaskMain.taskid + "&d=" + new Date();
						conn.open("GET", myurl, false);
						conn.send(null);
						var enableEdit = conn.responseText == "true"
								? true
								: false;

						mydataObjectPanel.setConfigs(mytaskMain.projectid,
								mytaskMain.taskid, enableEdit);

					})
					mytaskdetails.tabpanel.insert(1, mytaskdetails.egridpanel2)
				}

			}

		}
	});
	// panel4.on("activate", function(p) {
	// this.removeAll();
	// this.add();
	// this.doLayout();
	// });
	var tb = [{
				text : '' + getResource('resourceParam483') + '',
				iconCls : 'priv-add',
				listeners : {
					'click' : function() {
						mytaskdetails.logpanel.getLayout().setActiveItem(1);
						mytaskdetails.logpanel.getTopToolbar().disable();
						taskLogAdd.taskid.setValue(mytaskMain.taskid);
						Ext.getCmp('richEditor').load({
									url : '../js/richEditor.jsp?height=200'
								});
					}
				}

			}, {
				text : '修改',
				iconCls : 'priv-add',
				listeners : {
					'click' : function() {
						if (mytaskdetails.loggrid.getSelectionModel().getCount() != 1) {
							Ext.Msg.alert('提示信息', '请选一条记录！');
							return;
						}
						mytaskdetails.logpanel.getLayout().setActiveItem(2);
						mytaskdetails.logpanel.getTopToolbar().disable();

						Ext.Ajax.request({
							url : '../JSON/RecordRemote.getRecordById',
							method : 'POST',
							success : function(response, options) {
								Ext.getCmp('richEditor1').load({
											url : '../js/richEditor.jsp?height=200'
										});
								var obj = Ext.util.JSON
										.decode(response.responseText);
								taskLogUpdate.title.setValue(obj.result.title);
								taskLogUpdate.file.setValue(obj.result.filename);
								taskLogUpdate.recordid
										.setValue(obj.result.recordid);
								// try {
								try {
									FCKeditorAPI.GetInstance("dictContent")
											.setHtml(content);
								} catch (e) {
									Ext.getCmp('richEditor1').load({
										url : '../js/richEditor.jsp?height=200',
										params : {
											content : obj.result.content
										}
									});
								}

							},
							disableCaching : true,
							autoAbort : true,
							params : {
								recordid : mytaskdetails.loggrid
										.getSelectionModel().getSelected()
										.get("recordid")
							}
						});
					}
				}

			},{
				text : '删除',
				iconCls : 'priv-add',
				listeners:{
					'click':function(){
					
						
					if (mytaskdetails.loggrid.getSelectionModel().getCount() < 1) {
							Ext.Msg.alert('提示信息', '请选一条记录！');
							return;
						}
				 Ext.MessageBox.confirm('提示', '确实要删除吗?', function(btn){
		           if(btn=="yes"){
		             var records=mytaskdetails.loggrid.getSelectionModel().getSelections();
					var recordids=[];
					for(var i=0;i<records.length;i++){
						recordids.push("'"+records[i].get("recordid")+"'");
					}
					
						callSeam("RecordRemote", "deleteTaskRecords",
											[recordids.join(",")], function(result) {
												mytaskdetails.loggrid.getStore().reload();
											})
					
					
		           }
		       	 });
				
			
						
				
						
					}
				}
			}];
	mytaskdetails.loggrid = taskLogGrid.init();
	mytaskdetails.logaddform = taskLogAdd.init();
	mytaskdetails.logeditform = taskLogUpdate.init();

	mytaskdetails.logpanel = new Ext.Panel({
				layout : 'card',
				border : false,
				activeItem : 0,
				items : [mytaskdetails.loggrid, mytaskdetails.logaddform,
						mytaskdetails.logeditform],
				tbar : tb

			});
	mytaskdetails.loggrid.getStore().on('beforeload', function(store, options) {
				this.proxy = new Ext.data.HttpProxy({
							method : 'POST',
							url : '../JSON/RecordRemote.getTaskRecordList'
						})
				options.params = Ext.apply(options.params, {
							taskid : mytaskMain.taskid
						});
			});

	var panel5 = new Ext.Panel({
				id : 'mytaskdetailspanel5',
				title : '' + getResource('resourceParam629') + '',
				layout : 'fit',
				items : [mytaskdetails.logpanel]
			});

	// panel5.add(mytaskdetails.logpanel);
	// panel5.doLayout();

	panel5.on("activate", function(p) {
				myGrid.loadvalue(mytaskdetails.loggrid.getStore(),
						taskLogGrid.args, taskLogGrid.baseargs);
			})
	// // log.init(mytaskMain.taskid, mytaskMain.taskname);
	// this.add(mytaskdetails.logpanel);
	// this.doLayout();
	//
	//	
	// /**
	// * bug编号30 —— 日志
	// *
	// * @author wangyf 2011-05-06 17:51
	// */
	// // if (mytaskMain.taskdW != null && mytaskMain.taskdW == 3) {
	// // Ext.getCmp('logSubmit').setDisabled(true);
	// // Ext.getCmp('logSave').setDisabled(true);
	// // Ext.getCmp('logReset').setDisabled(true);
	// // }
	// });

	panel5.on("deactivate", function(p) {
			});

	var panel6 = new Ext.Panel({
				id : 'mytaskdetailspanel6',
				region : 'center',
				title : '' + getResource('resourceParam607') + '',
				layout : 'fit'
			});

	panel6.on("activate", function(p) {
				feedback.init(mytaskMain.taskid, mytaskMain.taskname);
				this.add(feedback.feedBackTabPanel);
				/**
				 * bug编号30 —— 反馈
				 * 
				 * @author wangyf 2011-05-06 17:51
				 */
				if (mytaskMain.taskdW != null && mytaskMain.taskdW == 3) {
					Ext.getCmp('feedSubmit').setDisabled(true);
					Ext.getCmp('feedReset').setDisabled(true);
				}
				this.doLayout();
			});

	panel6.on("deactivate", function(p) {
			});

	var panel7 = new Ext.Panel({
				id : 'mytaskdetailspanel7',
				region : 'center',
				title : '' + getResource('resourceParam1448') + '',
				layout : 'fit',
				items : [historyMessage.init()]
			});
	panel7.on("activate", function(p) {
				// this.removeAll();
				// this.add(historyMessage.init());
				// this.doLayout();
				historyMessage.refresh(mytaskMain.taskid,"TaskDataType");
			});

	var tabpanel = new Ext.TabPanel({
				id : 'taskdetailstabpanel',
				region : 'center',
				items : [panel1, panel2, panel3, panel4, panel5, panel6, panel7]
			});
	return tabpanel;
}
