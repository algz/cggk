var dataPrivilege = {
	url : '../JSON/privilege_DataPrivilegeRemote.getOperationList',
	privileged : true
}
// 针对某个用户或角色，显示权限列表
dataPrivilege.init = function() {

	var strurl = dataPrivilege.url + '?a=' + new Date();

	dataPrivilege.proxy = new Ext.data.HttpProxy( {
		url : strurl,
		method : 'GET'
	});
	dataPrivilege.reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'opertaitonID'
	}, [ 'dataPrivilegeID', 'privilege', 'opertaitonID', 'opertaitonName',
			'isPermitted', 'isRefused' ]);

	var ds = new Ext.data.Store( {
		proxy : dataPrivilege.proxy,
		reader : dataPrivilege.reader
	});
	ds.on('load', function(store, records, options) {
		// if (!dataPrivilege.reader.getSuccess()) {
			// Ext.MessageBox.show({
			// title : ' 错误',
			// msg : dataPrivilege.reader.getMessage(),
			// buttons : Ext.MessageBox.OK,
			// icon : Ext.MessageBox.ERROR
			// });
			// }
		});
	dataPrivilege.setcm1();
	dataPrivilege.cm.defaultSortable = false;
	dataPrivilege.cm.menuDisabled = true;
	dataPrivilege.grid = new Ext.grid.EditorGridPanel( {
		store : ds,
		cm : dataPrivilege.cm,
		trackMouseOver : true,
		loadMask : {
			msg : '' + getResource('resourceParam579') + ''
		},
		// frame:true,
		plugins : [ dataPrivilege.permmissionCheckColumn,
				dataPrivilege.refuseCheckColumn ],
		clicksToEdit : 1
	});

	dataPrivilege.grid
			.on('checkboxclick', function(element, evt, record, row, column) {
				// ds.on('load', function(store, records, options) {
					// var sm = dataPrivilege.grid.getSelectionModel();
					// sm.select(row, column);
					// })
					// 在这里可以处理 允许，拒绝的选中情况，处理存储或者标志表格被操作过了
					var opertationVo = Seam.Remoting
							.createType("com.luck.itumserv.base.privilege.OperationVo");
					var records = selectedUserAndRole.sm.getSelections();
					var ids = '';
					for ( var i = 0; i < records.length; i++) {
						ids += records[i].get('dataPrivilegeID') + ',';
					}
					opertationVo.setDataId(setDataPrivilege.mainpanel.dataId);
					opertationVo
							.setDataType(setDataPrivilege.mainpanel.dataType);
					opertationVo.setDataPrivilegeID(ids);
					opertationVo.setOpertaitonID(record.get('opertaitonID'));
					opertationVo.setFlag(dataPrivilege.flag);
					opertationVo.setCompulsory(false);
					opertationVo.setPrivileged(dataPrivilege.privileged);
					if (row == 0) {
						if (column == 2) {
							opertationVo.setIsPermitted(record
									.get('isPermitted'));
							opertationVo.setIsRefused(record.get('isRefused'));
							if (record.get('isPermitted') == false) {
								Ext.Msg
										.confirm(
												'' + getResource('resourceParam575') + '',
												""
														+ getResource('resourceParam577')
														+ "",
												function(btn) {
													if (btn == 'yes') {
														callSeam(
																"privilege_DataPrivilegeRemote",
																"updateOperation",
																[ opertationVo ],
																function(result) {
																	var obj = Ext.util.JSON
																			.decode(result);
																	setDataPrivilege.mutiFirst = false;
																	if (obj.success == true) {
																		dataPrivilege.flag = false;
																		dataPrivilege
																				.refreshGrid(record
																						.get('dataPrivilegeID'));
																		// Ext.example
																		// .msg(
																		// '更新成功',
																		// '{0}'+getResource('resourceParam582')+''+getResource('resourceParam509')+''+getResource('resourceParam580')+'',
																		// record
																		// .get('opertaitonName'));
																	} else {
																		record
																				.set(
																						'isPermitted',
																						true);
																		record
																				.commit();
																		Ext.MessageBox
																				.show( {
																					title : '' + getResource('resourceParam575') + '',
																					msg : obj.message,
																					buttons : Ext.MessageBox.OK,
																					icon : Ext.MessageBox.ERROR
																				});
																	}
																});
													} else {
														record.set(
																'isPermitted',
																true);
														record.commit();
													}
												})

							} else if (record.get('isPermitted') == true) {
								callSeam(
										"privilege_DataPrivilegeRemote",
										"updateOperation",
										[ opertationVo ],
										function(result) {
											var obj = Ext.util.JSON
													.decode(result);
											setDataPrivilege.mutiFirst = false;
											if (obj.success == true) {
												dataPrivilege.flag = false;
												dataPrivilege
														.refreshGrid(record
																.get('dataPrivilegeID'));
												// Ext.example.msg('更新成功',
												// '{0}'+getResource('resourceParam582')+''+getResource('resourceParam509')+''+getResource('resourceParam482')+'',
												// record
												// .get('opertaitonName'));
											} else {
												record
														.set('isPermitted',
																false);
												record.commit();
												Ext.MessageBox
														.show( {
															title : '' + getResource('resourceParam575') + '',
															msg : obj.message,
															buttons : Ext.MessageBox.OK,
															icon : Ext.MessageBox.ERROR
														});
											}
										});
							}

						} else if (column == 3) {
							opertationVo.setIsPermitted(!record
									.get('isRefused'));
							opertationVo.setIsRefused(record.get('isRefused'));
							if (record.get('isRefused') == true) {
								Ext.Msg
										.confirm(
												'' + getResource('resourceParam575') + '',
												""
														+ getResource('resourceParam578')
														+ "",
												function(btn) {
													if (btn == 'yes') {
														callSeam(
																"privilege_DataPrivilegeRemote",
																"updateOperation",
																[ opertationVo ],
																function(result) {
																	var obj = Ext.util.JSON
																			.decode(result);
																	setDataPrivilege.mutiFirst = false;
																	if (obj.success == true) {
																		if (obj.compulsory == true) {
																			// 如果强制取消查看
																			Ext.Msg
																					.confirm(
																							'' + getResource('resourceParam575') + '',
																							obj.message,
																							function(
																									btn) {
																								if (btn == 'yes') {
																									opertationVo
																											.setCompulsory(true);
																									callSeam(
																											"privilege_DataPrivilegeRemote",
																											"updateOperation",
																											[ opertationVo ],
																											function(
																													result) {
																												var obj = Ext.util.JSON
																														.decode(result);
																												setDataPrivilege.mutiFirst = false;
																												if (obj.success == true) {
																													// compulsory,flag恢复状态
																													opertationVo
																															.setCompulsory(false);
																													dataPrivilege.flag = false;
																													dataPrivilege
																															.refreshGrid(record
																																	.get('dataPrivilegeID'));
																													// Ext.example
																													// .msg(
																													// '更新成功',
																													// '{0}'+getResource('resourceParam582')+''+getResource('resourceParam509')+''+getResource('resourceParam583')+'',
																													// record
																													// .get('opertaitonName'));
																												} else {
																													opertationVo
																															.setCompulsory(false);
																													record
																															.set(
																																	'isRefused',
																																	false);
																													record
																															.commit();
																													collarbMain
																															.refresh();
																													Ext.MessageBox
																															.show( {
																																title : '' + getResource('resourceParam575') + '',
																																msg : obj.message,
																																buttons : Ext.MessageBox.OK,
																																icon : Ext.MessageBox.ERROR
																															});
																												}
																											});
																								} else {
																									record
																											.set(
																													'isRefused',
																													false);
																									record
																											.commit();
																								}
																							});
																		} else {
																			// 如果取消查看
																			dataPrivilege.flag = false;
																			dataPrivilege
																					.refreshGrid(record
																							.get('dataPrivilegeID'));
																			// Ext.example
																			// .msg(
																			// '更新成功',
																			// '{0}'+getResource('resourceParam582')+''+getResource('resourceParam509')+''+getResource('resourceParam583')+'',
																			// record
																			// .get('opertaitonName'));
																		}
																	} else {
																		record
																				.set(
																						'isRefused',
																						false);
																		record
																				.commit();
																		Ext.MessageBox
																				.show( {
																					title : '' + getResource('resourceParam575') + '',
																					msg : obj.message,
																					buttons : Ext.MessageBox.OK,
																					icon : Ext.MessageBox.ERROR
																				});
																	}
																});
													} else {
														record.set('isRefused',
																false);
														record.commit();
													}
												})

							} else if (record.get('isRefused') == false) {
								opertationVo.setIsPermitted(record
										.get('isPermitted'));
								opertationVo.setIsRefused(record
										.get('isRefused'));
								callSeam(
										"privilege_DataPrivilegeRemote",
										"updateOperation",
										[ opertationVo ],
										function(result) {
											var obj = Ext.util.JSON
													.decode(result);
											setDataPrivilege.mutiFirst = false;
											if (obj.success == true) {
												dataPrivilege.flag = false;
												dataPrivilege
														.refreshGrid(record
																.get('dataPrivilegeID'));
												// Ext.example.msg('更新成功',
												// '{0}'+getResource('resourceParam582')+''+getResource('resourceParam509')+''+getResource('resourceParam581')+'',
												// record.get('opertaitonName'));
											} else {
												record.set('isRefused', true);
												record.commit();
												Ext.MessageBox
														.show( {
															title : '' + getResource('resourceParam575') + '',
															msg : obj.message,
															buttons : Ext.MessageBox.OK,
															icon : Ext.MessageBox.ERROR
														});
											}
										});
							}
						}
					} else if (row != 0) {
						var message = '';
						if (column == 2) {
							if (record.get('isPermitted') == false) {
								message = '' + getResource('resourceParam580') + '';
								opertationVo.setIsPermitted(false);
								opertationVo.setIsRefused(record
										.get('isRefused'));
							} else if (record.get('isPermitted') == true) {
								message = '' + getResource('resourceParam482') + '';
								opertationVo.setIsPermitted(true);
								opertationVo.setIsRefused(false);
								record.set('isRefused', false);
							}
						} else if (column == 3) {
							if (record.get('isRefused') == false) {
								message = '' + getResource('resourceParam581') + '';
								opertationVo.setIsRefused(false);
								opertationVo.setIsPermitted(record
										.get('isPermitted'));
							} else if (record.get('isRefused') == true) {
								message = '' + getResource('resourceParam583') + '';
								opertationVo.setIsRefused(true);
								opertationVo.setIsPermitted(false);
								record.set('isPermitted', false);
							}
						}
						callSeam("privilege_DataPrivilegeRemote",
								"updateOperation",
								[ opertationVo ],
								function(result) {
									var obj = Ext.util.JSON.decode(result);
									setDataPrivilege.mutiFirst = false;
									if (obj.success == true) {
										if (obj.compulsory == true) {
											// 如果强制取消查看
								Ext.Msg
										.confirm(
												'' + getResource('resourceParam575') + '',
												obj.message,
												function(btn) {
													if (btn == 'yes') {
														opertationVo
																.setCompulsory(true);
														callSeam(
																"privilege_DataPrivilegeRemote",
																"updateOperation",
																[ opertationVo ],
																function(result) {
																	var obj = Ext.util.JSON
																			.decode(result);
																	setDataPrivilege.mutiFirst = false;
																	if (obj.success == true) {
																		// compulsory,flag恢复状态
																		opertationVo
																				.setCompulsory(false);
																		dataPrivilege.flag = false;
																		dataPrivilege
																				.refreshGrid(record
																						.get('dataPrivilegeID'));
																	} else {
																		opertationVo
																				.setCompulsory(false);
																	}
																});
													} else {
														dataPrivilege.flag = false;
														dataPrivilege
																.refreshGrid(record
																		.get('dataPrivilegeID'));
													}
												});
							} else {
								// 如果取消查看
								dataPrivilege.flag = false;
								dataPrivilege.refreshGrid(record
										.get('dataPrivilegeID'));
							}
						} else {
							if (column == 2) {
								record.set('isPermitted', !record
										.get('isPermitted'));
								record.commit();
							} else if (column == 3) {
								record.set('isRefused', !record
										.get('isRefused'));
								record.commit();
							}
							Ext.MessageBox
									.show( {
										title : '' + getResource('resourceParam575') + '',
										msg : obj.message,
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
						}
					}	);
					}
				});

	dataPrivilege.listpanel = new Ext.Panel( {
		region : 'south',
		title : '' + getResource('resourceParam582') + '',
		height : 200,
		id : 'dataPrivilegeListpanel',
		layout : 'fit',
		resizable : true,
		autoScroll : true,
		split : true,
		items : [ dataPrivilege.grid ],
		listeners : {
			bodyresize : function(panel, width, height) {
				// panel.setHeight(165);
		},
		afterrender : function() {
		}
		}
	});

	dataPrivilege.baseargs = {}
	myGrid.loadvalue(dataPrivilege.grid.store, null, dataPrivilege.baseargs);// 采用myGrid的方法去掉分页
	return dataPrivilege.listpanel;

}
dataPrivilege.setcm1 = function() {
	dataPrivilege.permmissionCheckColumn = new Sysware.Component.AutoCheckColumn( {
		header : "" + getResource('resourceParam482') + "",
		dataIndex : 'isPermitted',
		align : 'center',
		width : 60
	});
	dataPrivilege.refuseCheckColumn = new Sysware.Component.AutoCheckColumn( {
		header : "" + getResource('resourceParam583') + "",
		dataIndex : 'isRefused',
		align : 'center',
		width : 60
	});

	dataPrivilege.cm = new Ext.grid.ColumnModel( [ new Ext.grid.RowNumberer(),
			{
				header : getResource('resourceParam3000'),// "操作",
				dataIndex : 'opertaitonName',
				align : 'center',
				width : 120
			}, dataPrivilege.permmissionCheckColumn,
			dataPrivilege.refuseCheckColumn ]);

}

dataPrivilege.refreshNullGrid = function() {// 刷新空grid
	var proxy = new Ext.data.HttpProxy( {
		url : dataPrivilege.url + '?a=' + new Date()
	});
	dataPrivilege.grid.getStore().proxy = proxy;
	dataPrivilege.grid.getStore().load();
}

dataPrivilege.refreshGrid = function(dataPrivilegeID, flag) {// 刷新grid
	var proxy = new Ext.data.HttpProxy( {
		url : dataPrivilege.url + '?dataPrivilegeID=' + dataPrivilegeID
	});
	if (flag == 0) {
		proxy = new Ext.data.HttpProxy( {
			url : dataPrivilege.url + '?dataPrivilegeID=' + dataPrivilegeID
					+ '&privilege=0'
		});
	}
	dataPrivilege.grid.getStore().proxy = proxy;
	dataPrivilege.grid.getStore().load();
}