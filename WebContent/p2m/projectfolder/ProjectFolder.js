Ext.ns('Sysware.P2M');
Sysware.P2M.ProjectFolder = Ext
		.extend(
				Ext.form.FormPanel,
				{
					operation : 'view',// create,update,view
					createUrl : '../JSON/projectfolder_ProjectFolderRemote.createProjectFolder',
					createCallback : null,
					updateUrl : '../JSON/projectfolder_ProjectFolderRemote.updateProjectFolder',
					updateCallback : null,
					viewUrl : '../JSON/projectfolder_ProjectFolderRemote.viewProjectFolder',
					projectFolderId : null,
					setProjectFolderId : function(projectFolderId) {
						this.getForm().reset();
						this.projectFolderId = projectFolderId;
					},
					setOperation : function(operation) {
						this.operation = operation;
						if (operation == 'view') {
							this.setDisabled(true);
							this.getComponent('button').setVisible(false);
						} else {
							this.setDisabled(false);
							this.getComponent('button').setVisible(true);
						}
					},
					reset : function() {
						this.getForm.reset();
					},
					defaultAnchor : '90%',// 默认的panel内组件的anchor
					loadValues : function() {
						this
								.getForm()
								.load(
										{
											url : this.viewUrl,
											method : 'POST',
											success : function(form, action) {
												var obj = Ext.util.JSON
														.decode(action.response.responseText);
											},
											failure : function(form, action) {
												var obj = Ext.util.JSON
														.decode(action.response.responseText);
											},
											params : {
												contentId : this.projectFolderId
											}
										});
					},
					initComponent : function() {
						var self = this;
						self.defaultItems = [
								{
									xtype : 'textfield',
									name : 'contentName',
									fieldLabel : getResource('resourceParam1561'),
									style : 'margin-bottom: 5px;',
									blankText : getResource('resourceParam1560'),
									minLength : 1,
									plugins : [ new Sysware.P2M.AllowBlank() ],
									minLengthText : getResource('resourceParam1002')
								},
								{
									xtype : 'sysware.p2m.combobox',
									fieldLabel : getResource('resourceParam1973'),
									hiddenName : 'securityDegree',
									// plugins : [ new Sysware.P2M.AllowBlank()
									// ],
									store : new Ext.data.Store(
											{
												proxy : new Ext.data.HttpProxy(
														{
															url : '../JSON/groups_GroupsRemote.getSecurityDegree'
														}),
												reader : new Ext.data.JsonReader(
														{
															totalProperty : 'totalProperty',
															root : 'root'
														}, [ {
															name : 'id'
														}, {
															name : 'name'
														} ])
											}),
									valueField : "id",
									displayField : "name",
									mode : 'remote',
									allowBlank : true,
									disabled : false,
									forceSelection : true,
									editable : false,
									triggerAction : 'all',
									emptyText : getResource('resourceParam5044'),
									labelStyle : 'padding:5px 0px 5px 0px',
									listeners : {
										render : function(combo) {
										},
										select : function(combo, record, index) {
										},
										beforequery : function(qe) {
											// delete
										// qe.combo.lastQuery;
									}
									},
									style : 'margin-bottom: 5px;',
									width : 250
								},
								{
									xtype : 'textarea',
									name : 'contentNote',
									// plugins : [ new Sysware.P2M.AllowBlank()
									// ],
									fieldLabel : getResource('resourceParam1256'),
									height : 150,
									style : 'margin-bottom: 5px;',
									maxLength : 250,
									grow : true,
									growMin : 150,
									preventScrollbars : true,
									minLengthText : getResource('resourceParam5047')
								},
								{
									layout : 'hbox',
									itemId : 'button',
									layoutConfig : {
										align : 'middle',
										pack : 'end',
										defaultMargins : {
											top : 0,
											right : 5,
											bottom : 0,
											left : 0
										}
									},
									border : false,
									items : [
											{
												xtype : 'button',
												text : self.operation === 'create' ? getResource('resourceParam5019')
														: getResource('resourceParam5019'),
												handler : function() {
													var url, callback, params;
													if (self.operation === 'update') {
														url = self.updateUrl;
														callback = self.updateCallback;
														self.loadValues();
													} else if (self.operation === 'create') {
														url = self.createUrl;
														callback = self.createCallback;
													}
													var form = self.getForm();
													if (!form.isValid())
														return;
													self
															.getForm()
															.submit(
																	{
																		url : url,
																		params : {
																			contentId : self.projectFolderId
																		},
																		success : function(
																				form,
																				action) {
																			if (callback) {
																				callback(action);
																			}
																		},
																		failure : function(
																				form,
																				action) {
																			switch (action.failureType) {
																			case Ext.form.Action.CLIENT_INVALID:
																				break;
																			case Ext.form.Action.CONNECT_FAILURE:
																				break;
																			case Ext.form.Action.SERVER_INVALID:
																			}
																			if (callback) {
																				callback(action);
																			}
																		}
																	});
												}
											},
											{
												xtype : 'button',
												text : getResource('resourceParam606'),
												handler : function() {
													self.getForm().reset();
												}
											} ]

								} ];
						var config = {
							bodyStyle : 'padding:10px 0px 10px 10px',
							frame : false,
							boder : false,
							autoScroll : true,
							maskDisabled : false,
							onRender : function() {
								Sysware.P2M.ProjectFolder.superclass.onRender
										.apply(this, arguments);
								this.getForm().waitMsgTarget = this.getEl();
							},
							disabled : self.operation === 'view' ? true : false,
							defaults : {
								anchor : self.anchor == null ? self.defaultAnchor
										: self.anchor
							}
						};
						config.items = [];
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
						Sysware.P2M.ProjectFolder.superclass.initComponent
								.call(this);
					}
				});
Ext.reg('sysware.p2m.projectfolder', Sysware.P2M.ProjectFolder);