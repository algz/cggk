Ext.ns('Sysware.P2M');
Sysware.P2M.CollaborateProject = Ext
		.extend(
				Ext.Panel,
				{
					currentNode : null,
					projectFolder : null,
					project : null,

					initComponent : function() {
						var self = this;
						var createMenu = {
							xtype : 'menu',
							items : [
									{
										text : '新建项目夹',
										iconCls : 'new-icon-projectCategory',
										handler : function() {
											if (self.projectFolder == null) {
												self.projectFolder = new Ext.Window(
														{
															maximized : false,
															minimizable : true,
															maximizable : true,
															modal : true,
															minWidth : 500,
															minHeight : 300,
															width : 500,
															height : 300,
															resizable : true,
															closable : true,
															closeAction : 'hide',
															layout : 'fit',
															items : [ {
																xtype : 'sysware.p2m.projectfolder',
																itemId : 'ProjectFolder'
															} ],
															listeners : {
																'minimize' : function(
																		win) {
																	win.hide();
																},
																activate : function(
																		win) {
																}
															}
														});
											}
											var win = self.projectFolder;
											var winForm = win
													.getComponent('ProjectFolder');
											win.setTitle('新建项目夹');
											var contentId;
											if (self.currentNode) {
												contentId = self.currentNode.attributes.projectId;
											} else {
												contentId = 0;
											}
											winForm
													.setProjectFolderId(contentId);
											winForm.setOperation('create');
											win.show();
										}
									},
									{
										text : '新建项目',
										iconCls : 'icon-planningProject',
										handler : function() {
											if (self.project == null) {
												self.project = new Ext.Window(
														{
															resizable : true,
															maximized : true,
															modal : true,
															closable : true,
															closeAction : 'hide',
															layout : 'fit',
															items : [ {
																xtype : 'sysware.p2m.project',
																itemId : 'Project'
															} ],
															listeners : {
																activate : function(
																		win) {
																},
																show : function(
																		win) {
																	win
																			.getComponent(
																					'Project')
																			.reset();
																}
															}
														});
											}
											var win = self.project;
											var winForm = win
													.getComponent('Project');
											win.setTitle('新建项目');
											var contentId;
											if (self.currentNode) {
												contentId = self.currentNode.attributes.projectId;
											} else {
												contentId = 0;
											}
											winForm.setOperation('create');
											win.show();
										}
									} ]
						};
						var updateMenu = function() {
							if (self.projectFolder == null) {
								self.projectFolder = new Ext.Window( {
									resizable : true,
									maximized : true,
									modal : true,
									closable : true,
									closeAction : 'hide',
									layout : 'fit',
									items : [ {
										xtype : 'sysware.p2m.projectfolder',
										itemId : 'ProjectFolder'
									} ],
									listeners : {
										activate : function(win) {
										}
									}
								});
							}
							var win = self.projectFolder;
							var winForm = win.getComponent('ProjectFolder');
							win.setTitle('修改项目夹');
							var contentId;
							if (self.currentNode) {
								contentId = self.currentNode.attributes.projectId;
							} else {
								contentId = 0;
							}
							winForm.setProjectFolderId(contentId);
							winForm.setOperation('update');
							winForm.loadValues();
							win.show();

						}
						var viewProjectFolder = function() {
							if (self.projectFolder == null) {
								self.projectFolder = new Ext.Window( {
									resizable : true,
									maximized : true,
									modal : true,
									closable : true,
									closeAction : 'hide',
									layout : 'fit',
									items : [ {
										xtype : 'sysware.p2m.projectfolder',
										itemId : 'ProjectFolder'
									} ],
									listeners : {
										activate : function(win) {
										}
									}
								});
							}
							var win = self.projectFolder;
							var winForm = win.getComponent('ProjectFolder');
							win.setTitle('项目夹详细');
							var contentId;
							if (self.currentNode) {
								contentId = self.currentNode.attributes.projectId;
							} else {
								contentId = 0;
							}
							winForm.setProjectFolderId(contentId);
							winForm.setOperation('view');
							winForm.loadValues();
							win.show();
						}

						var config = {
							layout : 'border', // 布局模式
							tbar : [ {
								text : '新建',
								menu : createMenu
							}, {
								text : '修改',
								handler : updateMenu
							}, {
								text : '查看项目夹',
								handler : viewProjectFolder
							} ],
							items : [ {// 左侧导航树
										xtype : 'sysware.p2m.navigationtree',
										region : 'west',
										stateId : 'navigationtree',
										title : '协同工程',
										width : 200,
										autoScroll : true,
										collapsible : true,
										split : true,
										layout : 'fit',
										listeners : {
											click : function(node) {
												self.currentNode = node;
												if (node.attributes.dataType == 'ContentDataType') {
													// 项目夹
												}

											}
										}
									}, {// 右侧tab
										xtype : 'sysware.p2m.collaboratetab',
										region : 'center'
									} ],
							listeners : {
								beforerender : function() {
								},
								render : function() {
								},
								afterlayout : function() {
								}
							}
						};
						Ext.apply(this, config);
						Sysware.P2M.CollaborateProject.superclass.initComponent
								.call(this);
					}
				});
Ext.reg('sysware.p2m.collaborateproject', Sysware.P2M.CollaborateProject);