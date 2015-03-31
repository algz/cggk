Ext.ns('Sysware.P2M');
Sysware.P2M.CollaborateTab = Ext
		.extend(
				Ext.TabPanel,
				{
					privileged : true,// 是否需要获取权限
					forceGetPrivilege : false,// 当检查权限时privileged==true，如果forceGetPrivilege==true，即使数据没有变化，也要请求权限。只一次生效
					currentNode : {
						dataType : null,
						contentId : null,
						projectId : null,
						taskId : null,
						taskType : null,
						name : null
					},
					previousNode : {// {taskId:1,projectId:2,contentId:3,dataType:'',taskType:0,name:''}
						dataType : null,
						contentId : null,
						projectId : null,
						taskId : null,
						taskType : null,
						name : null
					},
					args : {//该容器内分页的参数
						start : 0,
						limit : 25
					},
					baseargs : null,

					component : {
						ct_attribute : null,
						ct_data : null,
						ct_relation : null,
						ct_wbs : null,
						ct_progress : null,
						ct_complete : null,
						ct_duration : null,
						ct_time : null,
						ct_remind : null,
						ct_log : null,
						ct_participant : null
					},
					setCurrentNode : function(config) {
						if (!config)
							return;
						this.currentNode.dataType = config.dataType ? config.dataType
								: '';
						this.currentNode.contentId = config.contentId ? config.contentId
								: 0;
						this.currentNode.projectId = config.projectId ? config.projectId
								: 0;
						this.currentNode.taskId = config.taskId ? config.taskId
								: 0;
						this.currentNode.taskType = config.taskType ? config.taskType
								: 0;
						this.currentNode.name = config.name ? config.name : '';
					},
					isSameNode : function() {
						if (this.currentNode == null
								|| this.previousNode == null){
							return false;
						}
						if (this.currentNode.dataType != this.previousNode.dataType)
						{
							return false;
						}
						if (this.currentNode.contentId != this.previousNode.contentId)
						{
							return false;
						}
						if (this.currentNode.projectId != this.previousNode.projectId)
						{
							return false;
						}
						if (this.currentNode.taskId != this.previousNode.taskId)
						{
							return false;
						}
						return true;
					},
					initComponent : function() {
						var self = this;
						var config = {
							minTabWidth : 300,
							resizeTabs : false,
							boder : false,
							layoutOnCardChange : true,
							enableTabScroll : true
						};
						config.items = [];
						self.defaultItems = [
								{
									itemId : 'ct_attribute',
									frame : false,
									boder : false,
									title : '属性',
									layout : 'fit',
									listeners : {
										activate : function(p) {
									
											this.removeClass('x-hide-display');
											if (self.component.ct_attribute == null) {
												self.component.ct_attribute = attributePanel
														.init();
												p
														.add(self.component.ct_attribute);
											}
											var dataType = self.currentNode.dataType;
											var callback = function(obj) {
												if (dataType == 'ContentDataType') {

												} else if (dataType == 'ProjectDataType') {
													ProjectAttributePanel
															.setFirstPage();
													attributePanel.attributePanel
															.getLayout()
															.setActiveItem(0);
													ProjectAttributePanel.projectId = self.currentNode.projectId;
													ProjectAttributePanel
															.setBasicForm(
																	ProjectAttributePanel.projectId,
																	null);
												} else if (dataType == 'TaskDataType') {
													TaskAttributePanel
															.setFirstPage();
													if (self.taskType == 0) {
														// 普通任务
														attributePanel.attributePanel
																.getLayout()
																.setActiveItem(
																		1);
														TaskAttributePanel
																.setBasicForm(
																		self.currentNode.taskId,
																		null);
													} else if (self.taskType == 1) {
														// 审批任务
														attributePanel.attributePanel
																.getLayout()
																.setActiveItem(
																		2);
														viewApproveTask
																.setBasicForm(
																		self.currentNode.taskId,
																		null);
													}
												} else {
													return;
												}
											}
											self.permission(callback);
										}
									}
								},
								{
									itemId : 'ct_data',
									frame : false,
									boder : false,
									title : '数据',
									layout : 'fit',
									listeners : {
										activate : function(p) {
											this.removeClass('x-hide-display');
											if (self.component.ct_data == null) {
												self.component.ct_data = new dataObjectPanel();
												p.add(self.component.ct_data
														.init());
											}
											var dataType = self.currentNode.dataType;
											var projectId = self.currentNode.projectId;
											var taskId = self.currentNode.taskId;
											var callback = function(obj) {
												if (dataType == 'ContentDataType') {
												} else if (dataType == 'ProjectDataType') {
													self.component.ct_data
															.setConfigs(
																	projectId,
																	taskId,
																	obj.modify);
												} else if (dataType == 'TaskDataType') {
													self.component.ct_data
															.setConfigs(
																	projectId,
																	taskId,
																	obj.modify);
												} else {
													return;
												}
											}
											self.permission(callback);

										}
									}
								},
								{
									itemId : 'ct_relation',
									frame : false,
									boder : false,
									title : '关系',
									layout : 'fit',
									listeners : {
										activate : function(p) {
											this.removeClass('x-hide-display');
											if (self.component.ct_relation == null) {
												self.component.ct_relation = relationPanel
														.init();
												p
														.add(self.component.ct_relation);
											}
											var dataType = self.currentNode.dataType;
											var projectId = self.currentNode.projectId;
											var taskId = self.currentNode.taskId;
											var name = self.currentNode.name;
											var callback = function() {
												if (dataType == 'ContentDataType') {
												} else if (dataType == 'ProjectDataType') {
													relationPanel.active(
															projectId, taskId,
															name);
												} else if (dataType == 'TaskDataType') {
													relationPanel.active(
															projectId, taskId,
															name);
												} else {
													return;
												}
											}
											self.permission(callback);
										}
									}
								},
								{
									itemId : 'ct_wbs',
									frame : false,
									boder : false,
									title : 'WBS',
									layout : 'fit',
									listeners : {
										activate : function(p) {
											this.removeClass('x-hide-display');
											if (self.component.ct_wbs == null) {
												self.component.ct_wbs = new Sysware.P2M.WBS();
												p.add(self.component.ct_wbs);
											}
											var dataType = self.currentNode.dataType;
											var callback = function() {
												if (dataType == 'ContentDataType') {
													return;
												} else if (dataType == 'ProjectDataType') {
												} else if (dataType == 'TaskDataType') {
												} else {
													return;
												}
												var config = {
													projectId : self.currentNode.projectId,
													taskId : self.currentNode.taskId
												}
												self.component.ct_wbs.setCurrentNode(config);
												self.component.ct_wbs.refresh();
											}
											self.permission(callback);
										}
									}
								},
								{
									itemId : 'ct_progress',
									frame : false,
									boder : false,
									title : '进度',
									layout : 'fit',
									listeners : {
										activate : function(p) {
											this.removeClass('x-hide-display');
											if (self.component.ct_progress == null) {
												self.component.ct_progress = processSharingPanel
														.init();
												p
														.add(self.component.ct_progress);
											}
											var dataType = self.currentNode.dataType;
											var dataId;
											var callback = function() {
												if (dataType == 'ContentDataType') {
													dataId = 'c' + self.currentNode.contentId;
												} else if (dataType == 'ProjectDataType') {
													dataId = 'p' + self.currentNode.projectId;
												} else if (dataType == 'TaskDataType') {
													dataId = self.currentNode.taskId;
												} else {
													return;
												}
												var proxy = new Ext.data.HttpProxy(
														{
															url : '../JSON/anotherprocessquery_ProcessquerySvr.getProjectTaskAndId?taskname=' + dataId
														});
												processSharingPanel.grid
														.getStore().proxy = proxy;
												myGrid
														.loadvalue(
																processSharingPanel.grid
																		.getStore(),
																self.args,
																self.baseargs);
											}
											self.permission(callback);

										}
									}
								},
								{
									itemId : 'ct_complete',
									frame : false,
									boder : false,
									title : '完成量',
									layout : 'fit',
									listeners : {
										activate : function(p) {
											this.removeClass('x-hide-display');
											if (self.component.ct_complete == null) {
												self.component.ct_complete = Sch.ganttQuantityMain
														.init();
												p
														.add(self.component.ct_complete);
											}
											var dataType = self.currentNode.dataType;
											var dataId = '';
											var callback = function() {
												if (dataType == 'ContentDataType') {
													dataId = 'c' + self.currentNode.contentId;
												} else if (dataType == 'ProjectDataType') {
													dataId = 'p' + self.currentNode.projectId;
												} else if (dataType == 'TaskDataType') {
													dataId = self.currentNode.taskId;
												} else {
													return;
												}
												var proxy = new Ext.data.HttpProxy(
														{
															url : '../JSON/gantt_ganttRemote.getGanttList?nodeid=' + dataId
														});
												Sch.ganttQuantityMain
														.getDay(dataId);
												Sch.ganttQuantityMain.ganttGrid
														.getStore().proxy = proxy;
												myGrid
														.loadvalue(
																Sch.ganttQuantityMain.ganttGrid
																		.getStore(),
																self.args,
																self.baseargs);
												var proxy1 = new Ext.data.HttpProxy(
														{
															url : '../JSON/ganttRelation_GanttRelationRemote.getGantLines?nodeid=' + dataId
														});
												Sch.ganttQuantityMain.ganttGrid.dependencyStore.proxy = proxy1;
												myGrid
														.loadvalue(
																Sch.ganttQuantityMain.ganttGrid.dependencyStore,
																self.args,
																self.baseargs);
											}
											self.permission(callback);

										}
									}
								},
								{
									itemId : 'ct_duration',
									frame : false,
									boder : false,
									title : '工时进度',
									layout : 'fit',
									listeners : {
										activate : function(p) {
											this.removeClass('x-hide-display');
											if (self.component.ct_duration == null) {
												self.component.ct_duration = Sch.actualmanhourMain
														.init();
												p
														.add(self.component.ct_duration);
											}
											var dataType = self.currentNode.dataType;
											var dataId = '';
											var callback = function() {
												if (dataType == 'ContentDataType') {
													dataId = 'c' + self.currentNode.contentId;
												} else if (dataType == 'ProjectDataType') {
													dataId = 'p' + self.currentNode.projectId;
												} else if (dataType == 'TaskDataType') {
													dataId = self.currentNode.taskId;
												} else {
													return;
												}
												var proxy = new Ext.data.HttpProxy(
														{
															url : '../JSON/gantt_ganttRemote.getActualmanHourGanttList?nodeid=' + dataId
														});
												Sch.actualmanhourMain.ganttGrid
														.getStore().proxy = proxy;
												myGrid
														.loadvalue(
																Sch.actualmanhourMain.ganttGrid
																		.getStore(),
																self.args,
																self.baseargs);
											}
											self.permission(callback);

										}
									}
								},
								{
									itemId : 'ct_time',
									frame : false,
									boder : false,
									title : '时间进度',
									layout : 'fit',
									listeners : {
										activate : function(p) {
											this.removeClass('x-hide-display');
											if (self.component.ct_time == null) {
												self.component.ct_time = Sch.timeMain
														.init();
												p.add(self.component.ct_time);
											}
											var dataType = self.currentNode.dataType;
											var dataId = '';
											var callback = function() {
												if (dataType == 'ContentDataType') {
													dataId = 'c' + self.currentNode.contentId;
												} else if (dataType == 'ProjectDataType') {
													dataId = 'p' + self.currentNode.projectId;
												} else if (dataType == 'TaskDataType') {
													dataId = self.currentNode.taskId;
												} else {
													return;
												}
												var proxy = new Ext.data.HttpProxy(
														{
															url : '../JSON/gantt_ganttRemote.getTimeGanttList?nodeid=' + dataId
														});
												Sch.timeMain.getDay(dataId);
												Sch.timeMain.ganttGrid
														.getStore().proxy = proxy;
												myGrid.loadvalue(
														Sch.timeMain.ganttGrid
																.getStore(),
														self.args,
														self.baseargs);
												var proxy1 = new Ext.data.HttpProxy(
														{
															url : '../JSON/ganttRelation_GanttRelationRemote.getGantLines?nodeid=' + dataId
														});
												Sch.timeMain.ganttGrid.dependencyStore.proxy = proxy1;
												myGrid
														.loadvalue(
																Sch.timeMain.ganttGrid.dependencyStore,
																self.args,
																self.baseargs);
											}
											self.permission(callback);

										}
									}
								},
								{
									itemId : 'ct_remind',
									frame : false,
									boder : false,
									title : '提醒',
									layout : 'fit',
									listeners : {
										activate : function(p) {
											this.removeClass('x-hide-display');
											if (self.component.ct_remind == null) {
												self.component.ct_remind = attributePanel
														.init();
												p.add(self.component.ct_remind);
											}
											var dataType = self.currentNode.dataType;
											var callback = function() {
												if (dataType == 'ContentDataType') {
												} else if (dataType == 'ProjectDataType') {
												} else if (dataType == 'TaskDataType') {
												} else {
													return;
												}
											}
											self.permission(callback);

										}
									}
								},
								{
									itemId : 'ct_log',
									frame : false,
									boder : false,
									title : '日志',
									layout : 'fit',
									listeners : {
										activate : function(p) {
											this.removeClass('x-hide-display');
											if (self.component.ct_log == null) {
												self.component.ct_log = attributePanel
														.init();
												p.add(self.component.ct_log);
											}
											var dataType = self.currentNode.dataType;
											var callback = function() {
												if (dataType == 'ContentDataType') {
												} else if (dataType == 'ProjectDataType') {
												} else if (dataType == 'TaskDataType') {
												} else {
													return;
												}
											}
											self.permission(callback);

										}
									}
								},
								{
									itemId : 'ct_participant',
									frame : false,
									boder : false,
									title : '参与人',
									layout : 'fit',
									listeners : {
										activate : function(p) {
											this.removeClass('x-hide-display');
											if (self.component.ct_participant == null) {
												self.component.ct_participant = participants
														.init();
												p
														.add(self.component.ct_participant);
											}
											var dataType = self.currentNode.dataType;
											var projectId, taskId;
											var callback = function() {
												if (dataType == 'ContentDataType') {
													return;
												} else if (dataType == 'ProjectDataType') {
													projectId = 'p' + self.currentNode.projectId;
												} else if (dataType == 'TaskDataType') {
													taskId = self.currentNode.taskId;
												} else {
													return;
												}
												participants
														.activatePanel(
																dataType,
																projectId,
																taskId,
																self.currentNode.taskType);
											}
											self.permission(callback);

										}
									}
								} ];
						if (self.defaultItems != null) {
							for ( var i = 0; i < self.defaultItems.length; i++) {
								config.items.push(self.defaultItems[i]);
							}
						}
						if (self.items != null) {
							for ( var i = 0; i < self.items.length; i++) {
								if (!self.items[i].hidden) {
									config.items.push(self.items[i]);
								}
							}
						}
						Ext.apply(this, config);
						Sysware.P2M.CollaborateTab.superclass.initComponent
								.call(this);
					},
					permission : function(callback) {// 获取权限
						var self = this;
						var buttonControl = self.buttonControl;
						var dataType = this.currentNode.dataType;
						var dataId = '';
						if (dataType == 'ContentDataType') {
							dataId = self.currentNode.contentId;
						} else if (dataType == 'ProjectDataType') {
							dataId = self.currentNode.projectId;
						} else if (dataType == 'TaskDataType') {
							dataId = self.currentNode.taskId;
						}
						var getPerimisson = function(callback) {
							Ext.Ajax
									.request( {
										url : "../JSON/privilege_DataPrivilegeRemote.getManipulations",
										method : 'GET',
										success : function(response, options) {
											var obj = Ext.util.JSON
													.decode(response.responseText);
											self.permissionResult = obj;
											if (buttonControl) {
												buttonControl(self.permissionResult);// 控制外部按钮的显示
											}
											if (callback) {
												callback(self.permissionResult);
											}
										},
										params : {
											dataId : dataId,
											dataType : dataType
										}
									});
						};
						if (this.privileged) {
							// 如果需要请求权限
							if (this.isSameNode()) {
								// 上一次与本次是同一条数据
								if (this.forceGetPrivilege) {
									// 如果forceGetPrivilege==true,仍需要检查权限
									getPerimisson(callback);
									forceGetPrivilege = false;
								} else {
									// 如果没有改变数据
									if (callback) {
										callback(self.permissionResult);
									}
								}

							} else {
								// 上一次与本次不是同一条数据
								getPerimisson(callback);
							}
						} else {
							if (callback) {
								callback(self.permissionResult);
							}
						}
						// 记录上一个数据
						Ext.apply(this.previousNode,this.currentNode);
					},
					permissionResult : null,// 权限结果
					buttonControl : null,// 对于外部button的控制,只有privileged==true时生效
					setActiveTab : function(item) {
						item = this.getComponent(item);
						if (!item
								|| this.fireEvent('beforetabchange', this,
										item, this.activeTab) === false) {
							return;
						}
						if (!this.rendered) {
							this.activeTab = item;
							return;
						}
						if (this.activeTab != item) {
							if (this.activeTab) {
								var flag = this.activeTab.fireEvent(
										"beforedeactivate", this.activeTab);
								if (!flag) {
									return false;
								}
								var oldEl = this.getTabEl(this.activeTab);
								if (oldEl) {
									Ext.fly(oldEl).removeClass(
											'x-tab-strip-active');
								}
								this.activeTab.fireEvent('deactivate',
										this.activeTab);
							}
							var el = this.getTabEl(item);
							Ext.fly(el).addClass('x-tab-strip-active');
							this.activeTab = item;
							this.stack.add(item);
							this.layout.setActiveItem(item);
							if (this.scrolling) {
								this.scrollToTab(item, this.animScroll);
							}
//							item.fireEvent('activate', item);
							this.fireEvent('tabchange', this, item);
						}
					}

				});

Ext.reg('sysware.p2m.collaboratetab', Sysware.P2M.CollaborateTab);
