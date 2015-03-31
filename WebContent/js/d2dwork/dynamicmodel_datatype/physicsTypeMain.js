Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';

var physicsTypeMain = {
	modelEdit : true,
	approvalModel : false,
	mainUrl : '../JSON/dynamicmodel_datatype.getDataTypeList?datatypeRank=8'
}
physicsTypeMain.sizePerPage = 25;
physicsTypeMain.init = function() {
	Ext.QuickTips.init();
	physicsTypeMain.hm = false;
	var sm = new Ext.grid.CheckboxSelectionModel();
	var comStore = new Ext.data.Store({
				reader : new Ext.data.ArrayReader({
							idIndex : 0
						}, Ext.data.Record.create([{
									name : 'id'
								}, {
									name : 'name'
								}]))
			});
	var comData = [[0, getResource('resourceParam947')],
			[1, getResource('resourceParam948')],
			[2, getResource('resourceParam1266')],
			[3, getResource('resourceParam9090')],
			[4, getResource('resourceParam9091')]];
	comStore.loadData(comData);
	var filterCombo = new Ext.ux.form.LovCombo({
		id : 'filterCombo',
		width : 80,
		listWidth : 120,
		hideOnSelect : false,
		maxHeight : 200,
		store : comStore,
		triggerAction : 'all',
		valueField : 'id',
		displayField : 'name',
		mode : 'local',
		beforeBlur : Ext.emptyFn,
		emptyText : '状态'
		});
	var com_record = Ext.data.Record.create([{
				name : 'name'
			}, {
				name : 'id'
			}]);
	var com_selectAll = new com_record({
				name : getResource('resourceParam5029'),
				id : '-1'
			});
	var com_deSelectAll = new com_record({
				name : '' + getResource('resourceParam808') + '',
				id : '-2'
			});
	filterCombo.on('expand', function(combo) {
				var store = combo.getStore();
				var firstRecord = store.getAt(0);
				if (firstRecord.get('id') == -1 || firstRecord.get('id') == -2) {
					store.remove(firstRecord);
				}
				var checkSum = null;// 选中的总数
				if (combo.getCheckedValue() == '') {
					checkSum = 0;
				} else {
					checkSum = combo.getCheckedValue().split(',').length;
				}
				if (checkSum == store.getCount()) {
					// 已全部选中
					store.insert(0, com_deSelectAll);
				} else {
					store.insert(0, com_selectAll);
				}
			});
	filterCombo.on('select', function(combo, record, index) {
				if (record.get('id') == -1) {
					// click selectAll
					record.set('checked', false);
					combo.getStore().remove(record);
					combo.selectAll();
					combo.fireEvent('blur');
				} else if (record.get('id') == -2) {
					// click deSelectAll
					combo.deselectAll();
					combo.getStore().remove(record);
					combo.getStore().insert(0, com_selectAll);
				} else {
					var checkSum = null;// 选中的总数
					if (combo.getCheckedValue() == '') {
						checkSum = 0;
					} else {
						checkSum = combo.getCheckedValue().split(',').length;
					}
					if (checkSum < (combo.getStore().getCount() - 1)) {
						combo.getStore().remove(combo.getStore().getAt(0));
						combo.getStore().insert(0, com_selectAll);
					}
				}
			});
	filterCombo.on('blur', function() {
				if(filterCombo.lastCheckedValue==filterCombo.getCheckedValue()){
					return;
				}
				var statuses = filterCombo.getValue();
				if (statuses.length == 0) {
					filterCombo.setRawValue('')//getResource('resourceParam1474'));// 所有状态
				}
				if(physicsTypeMain.hm){
					searchHistory(physicsTypeMain.hmDatatypeId);
				}else{
					search();
				}
			    filterCombo.lastCheckedValue = filterCombo.getCheckedValue();
			});
	filterCombo.getStore().getAt(0).set('checked', true);
	filterCombo.getStore().getAt(1).set('checked', true);
	filterCombo.getStore().getAt(2).set('checked', true);
	filterCombo.getStore().getAt(3).set('checked', true);

	departmentUser.init('','',{
		userEmptyText : '创建者',
		userSelectCallback : search
	});
	departmentUser.userComb.setWidth(80);
	departmentUser.userComb.listWidth=150;
	departmentUser.userComb.allowBlank = true;
	
	var colArray = [new Ext.grid.RowNumberer(), sm, {
		header : '' + getResource('resourceParam1139') + '',
		dataIndex : 'datatypeName',
		renderer : function(value, p, r) {
			return '<a href="javascript:void(0);" style="color:#0000FF;text-decoration:underline;">'
					+ value + '</a>'
		},
		editor : new Ext.form.TextField({
					allowBlank : false,
					validator : function(value) {
						if (Ext.util.Format.trim(value).length == 0) {
							this.invalidText = ""
									+ getResource('resourceParam1089') + "";
							return false;
						}
						if (value.length > 50) {
							this.invalidText = ''
									+ getResource('resourceParam1271') + '';
							return false;
						}
						var reg = /^.*[/\\:\*\?\"<>\|]+.*$/;
						if (reg.test(value)) {
							this.invalidText = ""
									+ getResource('resourceParam1087') + "";
							return false;
						} else {
							return true;
						}
					}
				})
	}, {
		header : getResource('resourceParam500'),// 状态
		width : 70,
		renderer : function(value, p, r) {
			switch (value) {
				case 0 :
					return getResource('resourceParam947');// 编制中
				case 1 :
					return getResource('resourceParam948');// 审批中
				case 2 :
					return getResource('resourceParam1266');// 已发布
				case 3 :
					return getResource('resourceParam9090');// 修改中
				case 4 :
					return getResource('resourceParam9091');// 已废弃
			}
			return '<a href="javascript:void(0);" style="color:#0000FF;text-decoration:underline;">'
					+ value + '</a>'
		},
		dataIndex : 'status'
	}, {
		header : '' + getResource('resourceParam462'),
		width : 50,
		dataIndex : 'version',
		renderer : function(value, p, r) {
			return '<a href="javascript:void(0);" style="color:#0000FF;text-decoration:underline;" onclick="Ext.getCmp(\'physicsTypeGridPanelViewHistory\').fireEvent(\'click\')">'
					+ value + '</a>';
		}
	}, {
		header : getResource('resourceParam1341'),
		dataIndex : 'userTrueName'
	}];
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : colArray
	})
	physicsTypeMain.ds = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							method : 'GET',
							url : physicsTypeMain.mainUrl
						}),
				reader : new Ext.data.JsonReader({
							id : 'id',
							root : 'results',
							totalProperty : 'totalProperty'
						}, Ext.data.Record.create([{
							name : 'datatypeName',
							mapping : 'datatypeName',
							type : 'string'
						}, {
							name : 'datatype',
							mapping : 'datatype',
							type : 'string'
						}, {
							name : 'basetypeName',
							mapping : 'basetypeName',
							type : 'string'
						}, {
							name : 'datatypeId',
							mapping : 'datatypeId',
							type : 'string'
						}, {
							name : 'datatypeDiscription',
							mapping : 'datatypeDiscription',
							type : 'string'
						}, {
							name : 'version',
							mapping : 'version',
							type : 'long'
						}, {
							name : 'status',
							mapping : 'status',
							type : 'long'
						}, {
							name : 'userId',
							mapping : 'userId',
							type : 'long'
						}, {
							name : 'userTrueName',
							mapping : 'userTrueName',
							type : 'string'
						}]))
			})

	physicsTypeMain.grid = new Ext.grid.EditorGridPanel({
				store : physicsTypeMain.ds,
				cm : cm,
				sm : sm,
				clicksToEdit : 2,
				viewConfig : {
					forceFit : true
				},
				bbar : new Ext.PagingToolbar({
					pageSize : physicsTypeMain.sizePerPage,
					store : physicsTypeMain.ds,
					displayInfo : true
				}),
				listeners : {
					'celldblclick' : function(g, r) {
						if (physicsTypeMain.modelEdit == false) {
							return false;
						}
						var s = g.getStore();
						var arr = document.cookie.split(';');
						var loginuserid = '';
						for (var i = 0; i < arr.length; i++) {
							if (arr[i].indexOf('userid') != -1) {
								loginuserid = arr[i].split('=')[1];
								break;
							}
						}
						var userid = s.getAt(r).get('userId');
						if (userid == 1 && loginuserid != 1) {// 管理员创建的类型其他人不允许修改
							return false;
						}
						var status = s.getAt(r).get('status');
						switch (status) {
							case 0 :// 编制中,修改中,已发布
							case 2 :
							case 3 :
								return true;
							case 1 :// 审批中,已废弃
							case 4 :
								return false;
						}
					}
				}
			})
	var physicsTypeColumnTree = physicTypeTreeGridPanel.init();
	var mainPanel = new Ext.Panel({
		editable : true,
		layout : 'fit',
		region : 'west',
		width : 400,
		tbar : [{
			text : '' + getResource('resourceParam483') + '',
			iconCls : 'add1',
			disabled : true,
			id : 'physicsTypeGridPanelAdd',
			handler : function() {
				var Plant = physicsTypeMain.grid.getStore().recordType;
				var p = new Plant({
							datatypeName : ''
									+ getResource('resourceParam1278') + '',
							basetypeName : ''
									+ getResource('resourceParam1079') + '',
							datatype : 'string',
							status : 0,
							version : '',
							datatypeDiscription : ''
						});
				physicsTypeMain.grid.stopEditing();
				p.markDirty()
				physicsTypeMain.ds.insert(0, p);
				sm.selectFirstRow();
			}

		}, {
			text : '' + getResource('resourceParam475') + '',
			iconCls : 'del1',
			id : 'physicsTypeGridPanelDel',
			disabled : true,
			handler : function() {
				if (sm.getSelections().length > 0) {
					var arr = sm.getSelections();
					var feiqiCount = 0;
					for (var i = 0; i < arr.length; i++) {
						var stat = arr[i].get('status');
						if (stat == 1) {
							Ext.example.msg(getResource('resourceParam596'),
									getResource('resourceParam9105') + '！');
							return;
						}else if(stat == 4){
							feiqiCount++;
						}
					}
					var feiqiFlag = false;
					if(feiqiCount == arr.length){//全部是已废弃的类型
						feiqiFlag = true;
					}
					Ext.MessageBox.confirm('' + getResource('resourceParam596')
									+ '', feiqiFlag?'确定要彻底删除？':(getResource('resourceParam1274')
											.substring(0, 3)
									+ Ext.getCmp('physicsTypeGridPanelDel')
											.getText() + '?'), function(btn) {
								if (btn == 'yes') {
									var DataTypeVos = Seam.Remoting
											.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
									var list = new Array();
									var list1 = new Array();
									for (var i = 0; i < sm.getSelections().length; i++) {
										if (sm.getSelections()[i]
												.get("datatypeId") != undefined) {
											var DataTypeVo = Seam.Remoting
													.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
											DataTypeVo.setDatatypeId(sm
													.getSelections()[i]
													.get("datatypeId"))
											DataTypeVo.setStatus(sm
													.getSelections()[i]
													.get("status"));
											list.push(DataTypeVo);
										} else {
											list1.push(sm.getSelections()[i]);
										}
									}
									if (list.length > 0) {
										DataTypeVos.setDataTypeVoList(list);
										Seam.Component
												.getInstance("dynamicmodel_datatype")
												.delDataType(DataTypeVos,
														function(result) {
															var obj = Ext.util.JSON
																	.decode(result);
															if (obj.success == true) {
																physicsTypeMain.ds
																		.clearModified();
																Ext
																		.getCmp("physicsTypeGridPanelDel")
																		.disable();
																physicsTypeMain.ds
																		.reload(
																				{
																					'callback' : function() {
																						sm
																								.selectFirstRow();
																						Ext.example
																								.msg(
																										""
																												+ getResource('resourceParam575')
																												+ "",
																										""
																												+ getResource('resourceParam1515')
																												+ "");
																					}
																				});
															} else {
																Ext.MessageBox
																		.show({
																			title : ''
																					+ getResource('resourceParam651')
																					+ '',
																			msg : obj.message,
																			buttons : Ext.MessageBox.OK,
																			icon : Ext.MessageBox.ERROR
																		});
															}
														});
									}
									for (var j = 0; j < list1.length; j++) {
										physicsTypeMain.ds.remove(list1[j])
									}

								}
							});
				} else {
					Ext.MessageBox.show({
								title : "" + getResource('resourceParam575')
										+ "",
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR,
								msg : "" + getResource('resourceParam1835')
										+ ""
							})
				}
			}
		}, {
			text : '' + getResource('resourceParam7002') + '',// 保存
			iconCls : 'save1',
			id : 'physicsTypeGridPanelSave',
			disabled : true,
			handler : function() {
				this.disable();//防止表单重复提交
				physicsTypeMain.grid.stopEditing();
				var addlist = new Array();
				physicsTypeMain.ds.findBy(function(record, id) {
							if (record.get("datatypeId") === undefined) {
								addlist.push(record)
							}
						}, physicsTypeMain.ds)
				var DataTypeVos = Seam.Remoting
						.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
				var list = new Array();
				/**
				 * 去掉页面判断重名的问题，都通过数据库来判断
				 * at 2011-05-25  by liuxj
				 */
				for (var i = 0; i < physicsTypeMain.ds.getModifiedRecords().length; i++) {
					var record = physicsTypeMain.ds.getModifiedRecords()[i];
					var DataTypeVo = Seam.Remoting
							.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
					if (record.get("datatypeId") !== undefined) {
						/*
						if (hasReName(record.get("datatypeName"))) {
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam651')
												+ '',
										msg : ''
												+ getResource('resourceParam7035')
												+ '：<span style="color:blue;">'
												+ record.get("datatypeName")
												+ '       </span>',// 已存在重名对象
										buttons : Ext.MessageBox.OK,
										icon : Ext.MessageBox.ERROR
									});
							return false;
						}
						*/
						DataTypeVo.setDatatype("dataset")
						DataTypeVo.setDatatypeName(record.get("datatypeName"))
						DataTypeVo.setDatatypeId(record.get("datatypeId"))
						DataTypeVo.setDatatypeRank(8);
						list.push(DataTypeVo);
					}
				}
				for (var j = 0; j < addlist.length; j++) {
					/*
					if (hasReName(addlist[j].get("datatypeName"))) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam651')
											+ '',
									msg : '' + getResource('resourceParam7035')
											+ '：<span style="color:blue;">'
											+ addlist[j].get("datatypeName")
											+ '       </span>',// 已存在重名对象
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return false;
					}
					*/
					var DataTypeVo = Seam.Remoting
							.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
					DataTypeVo.setDatatype("dataset")
					DataTypeVo.setDatatypeName(addlist[j].get("datatypeName"))
					DataTypeVo.setDatatypeRank(8);
					list.push(DataTypeVo);
				}
				if (list.length < 1) {
					return false;
				}
				DataTypeVos.setDataTypeVoList(list);
				Seam.Component.getInstance("dynamicmodel_datatype")
						.insertOrUpdateDataTypes(DataTypeVos, function(result) {
							if (result === 'true') {
								var r = physicsTypeMain.grid
										.getSelectionModel().getSelected();
								if(r!=undefined){
									var rowName = r.get('datatypeName');
									physicsTypeMain.ds.load({
												params: {
											        start: 0,          
											        limit: physicsTypeMain.sizePerPage
											    },
												callback : function(s) {
													physicsTypeMain.grid
															.getSelectionModel()
															.selectRow(physicsTypeMain.ds.findExact('datatypeName',rowName));
												}
											});
									physicsTypeMain.ds.clearModified();
									physicsTypeMain.ds.modified = [];
								}else{
									physicsTypeMain.ds.load({
										params: {
									        start: 0,          
									        limit: physicsTypeMain.sizePerPage
									    }
									});
								}
								Ext.example.msg(
										"" + getResource('resourceParam575')
												+ "",
										"" + getResource('resourceParam1072')
												+ "");
								
							} else {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam651')
													+ '',
											msg : ''
													+ getResource('resourceParam7035')
													+ '：<span style="color:blue;">'
													+ result.replace("]", "")
															.replace("[", "")
													+ '       </span>',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
							}
							this.enable();;
						});
			}
		}, {
			id : 'physicsTypeGridPanelApprove',
			disabled : true,
			text : '' + getResource('resourceParam1062') + '',
			menu : [new Ext.Action({
				id : 'physicsTypeGridPanelpassApprove',
				text : '' + getResource('resourceParam1365') + '',
				disabled : true,
				handler : function() {
					var datatypeIdArr = [];
					for (var i = 0; i < sm.getSelections().length; i++) {
						/**
						 * 只有类型的创建者才能直接审批通过 at 2010-10-25 下午03:44:42 by limj
						 */
						// var arr = document.cookie.split(';');
						// var userid = '';
						// for (var i = 0; i < arr.length; i++) {
						// if (arr[i].indexOf('userid') != -1) {
						// userid = arr[i].split('=')[1];
						// break;
						// }
						// }
						// if (sm.getSelections()[i].get("userId") != userid) {
						// Ext.example.msg(getResource('resourceParam596'),
						// getResource('resourceParam9114'));
						// return;
						// }
						/**
						 * 编制中或修改中的类型才能直接审批通过 at 2010-10-25 下午03:46:57 by limj
						 * 
						 * 增加判断version是否为空来判断数据是否保存，没保存的不允许提交 at 2011-05-23 by liuxj
						 */
						var s = sm.getSelections()[i].get('status');
						var v = sm.getSelections()[i].get('version');
						if (v == null || s == 1 || s == 2 || s == 4) {
							Ext.example.msg(getResource('resourceParam596'),
									getResource('resourceParam9115'));
							return;
						} else {
							datatypeIdArr.push(sm.getSelections()[i]
									.get("datatypeId"));
						}
					}
					Ext.Ajax.request({
						url : "../JSON/dynamicmodel_datatype.getSubTypes",
						method : 'POST',
						success : function(response, options) {
							var obj1 = Ext.util.JSON
									.decode(response.responseText);
							Ext.Msg.confirm(getResource('resourceParam575'),
									'要将以下类型审批通过吗？<br/><br/>' + obj1.msg, function(
											btn) {
										if (btn == 'yes') {
											Ext.Ajax.request({
												url : "../JSON/approval_ApprovalRemote.agree",
												method : 'POST',
												success : function(response,
														options) {
													var obj = Ext.util.JSON
															.decode(response.responseText);
													if (obj.success == true) {
														Ext.example
																.msg(
																		getResource('resourceParam596'),
																		getResource('resourceParam3002')
																				+ '！');
													}else if(obj.success == false){
														Ext.MessageBox.show({
															title : getResource('resourceParam596'),
															msg : ''
																	+ obj.message
																	+ '！       ',
															buttons : Ext.MessageBox.OK,
															icon : Ext.MessageBox.ERROR
														});
														/**
														 * 强制弹出错误
														Ext.example
																.msg(
																		getResource('resourceParam596'),
																		obj.message
																				+ '！');
														*/
													}
													var r = physicsTypeMain.grid
															.getSelectionModel()
															.getSelected();
													var rowIndex = physicsTypeMain.ds
															.indexOf(r)
													physicsTypeMain.ds .load({
														/**
														 * 修改bug211
														 * @author wangyf
														 * 2011-04-20
														 */
														params : {
															start: 0,          
													        limit: physicsTypeMain.sizePerPage
														},
														callback : function(s) {
															physicsTypeMain.grid
																	.getSelectionModel()
																	.selectRow(rowIndex);
														}
													});
												},
												disableCaching : true,
												autoAbort : true,
												params : {
													approvalType : 'StepByStep',
													objectID : obj1.ids,
													objectType : 'DataTypeDataType'
												}
											});
										}
									});
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							datatypeId : datatypeIdArr.join(',')
						}
					});
				}
			}), new Ext.Action({
				id : 'physicsTypeGridPanelsubmitApprove',
				text : '' + getResource('resourceParam1550') + '...',
				disabled : true,
				handler : function() {
					if (Ext.getCmp('physicsTypeApprovalHistorySubPanel') != undefined) {
						Ext.getCmp('physicsTypeApprovalHistorySubPanel').hide();
					}
					if (Ext.getCmp('physicsTypeApprovalSubPanel') != undefined) {
						Ext.getCmp('physicsTypeApprovalSubPanel').hide();
					}
					Ext.getCmp("physicTypeTreeGridPanel").show();

					var datatypeIdArr = [];
					for (var i = 0; i < sm.getSelections().length; i++) {
						/**
						 * 只有类型的创建者才能直接审批通过 at 2010-10-25 下午03:48:52 by limj
						 */
						// var arr = document.cookie.split(';');
						// var userid = '';
						// for (var i = 0; i < arr.length; i++) {
						// if (arr[i].indexOf('userid') != -1) {
						// userid = arr[i].split('=')[1];
						// break;
						// }
						// }
						// if (sm.getSelections()[i].get("userId") != userid) {
						// Ext.example.msg(getResource('resourceParam596'),
						// getResource('resourceParam9114'));
						// return;
						// }
						/**
						 * 编制中或修改中的类型才能直接审批通过 at 2010-10-25 下午03:49:12 by limj
						 * 
						 * 增加判断version是否为空来判断数据是否保存，没保存的不允许提交 at 2011-05-23 by liuxj
						 */
						var s = sm.getSelections()[i].get('status');
						var v = sm.getSelections()[i].get('version');
						if (v == null || s == 1 || s == 2 || s == 4) {
							Ext.example.msg(getResource('resourceParam596'),
									getResource('resourceParam9115'));
							return;
						} else {
							datatypeIdArr.push(sm.getSelections()[i]
									.get("datatypeId"));
						}
					}
					Ext.Ajax.request({
						url : "../JSON/dynamicmodel_datatype.getSubTypes",
						method : 'POST',
						success : function(response, options) {
							var obj1 = Ext.util.JSON
									.decode(response.responseText);
							/**
							 * 去掉物理类型提交审批的提示功能
							 * at 2011-06-09 by liuxj
							 */
//							Ext.Msg.confirm(getResource('resourceParam575'),
//									'要同时将以下类型提交审批吗？<br/><br/>' + obj1.msg, function(
//											btn) {
//										if (btn == 'yes') {
											var p = null;
											if (Ext
													.getCmp('physicsTypeApprovalSubPanel') == undefined) {
												p = new Ext.Panel({
													id : 'physicsTypeApprovalSubPanel',
													bodyStyle : 'overflow:auto;width:584;height:366px',
													layout:'fit',
													autoScroll:true
												})
												Ext.getCmp("eastPanel").insert(
														0, p);
												Ext.override(
														Ext.ux.grid.BufferView,
														{
															getVisibleRowCount : function() {
																if (this.scroller.dom) {
																	var rh = this
																			.getCalculatedRowHeight();
																	var visibleHeight = this.scroller.dom.clientHeight;
																	return (visibleHeight < 1)
																			? 0
																			: Math
																					.ceil(visibleHeight
																							/ rh);
																}
															}
														});
											} else {
												p = Ext
														.getCmp('physicsTypeApprovalSubPanel');
											}
											p.removeAll();
											approvePanel.init(
													p,
													obj1.ids,
													'DataTypeDataType',
													function() {
														Ext
																.getCmp("physicTypeTreeGridPanel")
																.show();
														Ext
																.getCmp('physicsTypeApprovalSubPanel')
																.hide();
													},
													getResource('resourceParam9093'),// '数据类型审批',
													function() {
														Ext.Ajax.request({
															url : "../JSON/dynamicmodel_datatype.submitApproval",
															method : 'POST',
															success : function(
																	response,
																	options) {
																var obj = Ext.util.JSON
																		.decode(response.responseText);
																if (obj.success == true) {
																	Ext
																			.getCmp("physicTypeTreeGridPanel")
																			.show();
																	Ext
																			.getCmp('physicsTypeApprovalSubPanel')
																			.hide();
																	var r = physicsTypeMain.grid
																			.getSelectionModel()
																			.getSelected();
																	var rowIndex = physicsTypeMain.ds
																			.indexOf(r)
																	physicsTypeMain.ds
																			.load(
																					{
																						callback : function(
																								s) {
																							physicsTypeMain.grid
																									.getSelectionModel()
																									.selectRow(rowIndex);
																						}
																					});
																	// physicTypeTreeGridPanel.store
																	// .load();
																}
															},
															disableCaching : true,
															autoAbort : true,
															params : {
																datatypeId : obj1.ids
															}
														});
													});
											Ext
													.getCmp("physicTypeTreeGridPanel")
													.hide();
											Ext
													.getCmp('physicsTypeApprovalSubPanel')
													.show();
											Ext.getCmp("eastPanel").doLayout();
						/**
						 * 去掉物理类型提交审批的提示功能
						 * at 2011-06-09 by liuxj
						 */
//										}
//									});
						},
						disableCaching : true,
						autoAbort : true,
						params : {
							datatypeId : datatypeIdArr.join(',')
						}
					});
				}
			}), new Ext.Action({
				id : 'physicsTypeGridPanelviewApproveHistory',
				text : '' + getResource('resourceParam1448') + '',
				disabled : true,
				handler : function() {
					if (sm.getSelections().length == 1) {
						if (Ext.getCmp('physicsTypeApprovalHistorySubPanel') != undefined) {
							Ext.getCmp('physicsTypeApprovalHistorySubPanel')
									.hide();
						}
						if (Ext.getCmp('physicsTypeApprovalSubPanel') != undefined) {
							Ext.getCmp('physicsTypeApprovalSubPanel').hide();
						}
						Ext.getCmp("physicTypeTreeGridPanel").show();

						var datatypeId = sm.getSelections()[0]
								.get("datatypeId");
						var p = null;
						if (Ext.getCmp('physicsTypeApprovalHistorySubPanel') == undefined) {
							p = new Ext.Panel({
										id : 'physicsTypeApprovalHistorySubPanel',
										bodyStyle : 'overflow:auto'
									})
							Ext.getCmp("eastPanel").insert(0, p);
						} else {
							p = Ext
									.getCmp('physicsTypeApprovalHistorySubPanel');
						}
						p.removeAll()
						examApproval.getCommentGrid(p, datatypeId,
								'DataTypeDataType', function() {
									Ext.getCmp("physicTypeTreeGridPanel")
											.show();
									Ext
											.getCmp('physicsTypeApprovalHistorySubPanel')
											.hide();
								});
						Ext.getCmp("physicTypeTreeGridPanel").hide();
						Ext.getCmp('physicsTypeApprovalHistorySubPanel').show();
						Ext.getCmp("eastPanel").doLayout();
					}
				}
			})]
		}, {
			id : 'physicsTypeGridPanelViewHistory',
			hidden : true,
			text : getResource('resourceParam9094'),// '查看历史',
			listeners : {
				'click' : function() {
					if (Ext.getCmp('physicsTypeGridPanelViewHistory').getText() == getResource('resourceParam944')/* 返回 */) {
						physicsTypeMain.hm = false;
						sm.clearSelections();
						physicsTypeMain.grid.reconfigure(physicsTypeMain.ds,
								new Ext.grid.ColumnModel(colArray));
						comStore.loadData(comData);
						filterCombo.clearValue();
						departmentUser.userComb.show();
						Ext.getCmp('btnRevert').show();
						Ext.getCmp('physicsTypeGridPanelApprove').show();
						Ext.getCmp('physicsTypeGridPanelApprove').disable();
						Ext.getCmp('physicsTypeGridPanelSave').show();
						Ext.getCmp('physicsTypeGridPanelSave').disable();
						Ext.getCmp('physicsTypeGridPanelDel').show();
						Ext.getCmp('physicsTypeGridPanelDel').disable();
						if (physicsTypeMain.approvalModel) {
							Ext.getCmp('physicsTypeGridPanelAdd').disable();
						} else {
							Ext.getCmp('physicsTypeGridPanelAdd').enable();
						}
						Ext.getCmp('physicsTypeGridPanelAdd').show();
						Ext.getCmp('physicsTypeGridPanelViewHistory').hide();
						Ext.getCmp('physicsTypeGridPanelViewHistory')
								.setText(getResource('resourceParam9094'));// '查看历史');
						search();
					} else {
						if (sm.getSelections().length == 1) {
							physicsTypeMain.hm = true;
							physicsTypeMain.hmDatatypeId = sm.getSelections()[0]
									.get("datatypeId");
							physicsTypeMain.grid
									.reconfigure(
											physicsTypeMain.ds,
											new Ext.grid.ColumnModel([
													new Ext.grid.RowNumberer(),
													new Ext.grid.RadioboxSelectionModel(),
													{
														header : ''
																+ getResource('resourceParam1139')
																+ '',
														dataIndex : 'datatypeName',
														renderer : function(
																value, p, r) {
															return '<a href="javascript:void(0);" style="color:#0000FF;text-decoration:underline;">'
																	+ value
																	+ '</a>'
														}
													}, {
														header : getResource('resourceParam500'),// 状态
														width : 70,
														renderer : function(
																value, p, r) {
															switch (value) {
																case 0 :
																	return getResource('resourceParam947');// 编制中
																case 1 :
																	return getResource('resourceParam948');// 审批中
																case 2 :
																	return getResource('resourceParam1266');// 已发布
																case 3 :
																	return getResource('resourceParam9090');// 修改中
																case 4 :
																	return getResource('resourceParam9091');// 已废弃
															}
															return '<a href="javascript:void(0);" style="color:#0000FF;text-decoration:underline;">'
																	+ value
																	+ '</a>'
														},
														dataIndex : 'status'
													}, {
														header : getResource('resourceParam462'),// 版本
														width : 50,
														dataIndex : 'version'
													}]));
							filterCombo.clearValue();
							comStore.remove(comStore.getById(0));
							comStore.remove(comStore.getById(1));
							comStore.remove(comStore.getById(3));
							departmentUser.userComb.hide();
							Ext.getCmp('btnRevert').hide();
							Ext.getCmp('physicsTypeGridPanelApprove').hide();
							Ext.getCmp('physicsTypeGridPanelSave').hide();
							Ext.getCmp('physicsTypeGridPanelDel').hide();
							Ext.getCmp('physicsTypeGridPanelAdd').hide();
							Ext.getCmp('physicsTypeGridPanelViewHistory')
									.show();
							Ext.getCmp('physicsTypeGridPanelViewHistory')
									.enable();
							Ext.getCmp('physicsTypeGridPanelViewHistory')
									.setText(getResource('resourceParam944'));// '返回');
							searchHistory(physicsTypeMain.hmDatatypeId);
						}
					}
				}
			}
		},{
			text : '恢复',
			id : 'btnRevert',
			disabled : true,
			handler : function(){
				if (sm.getSelections().length > 0) {
					var arr = sm.getSelections();
					var feiqiCount = 0;
					for (var i = 0; i < arr.length; i++) {
						var stat = arr[i].get('status');
						if(stat == 4){
							feiqiCount++;
						}
					}
					if(feiqiCount != arr.length){
						/**
						 * bug编号628 wangyf
						 * bug信息：在扩展类型界面点击恢复按钮时系统的提示逻辑不合理
						 * 2011-05-16
						 */
						Ext.example.msg(getResource('resourceParam575'),'' +getResource('resourceParam1835')+ '');
						return;
					}
					Ext.MessageBox.confirm('' + getResource('resourceParam596')
									+ '', '确定要恢复？', function(btn) {
								if (btn == 'yes') {
									var DataTypeVos = Seam.Remoting
											.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
									var list = new Array();
									var list1 = new Array();
									for (var i = 0; i < sm.getSelections().length; i++) {
										if (sm.getSelections()[i]
												.get("datatypeId") != undefined) {
											var DataTypeVo = Seam.Remoting
													.createType("com.sysware.edm.dynamicmodel.DataTypeVo");
											DataTypeVo.setDatatypeId(sm
													.getSelections()[i]
													.get("datatypeId"))
											list.push(DataTypeVo);
										} else {
											list1.push(sm.getSelections()[i]);
										}
									}
									if (list.length > 0) {
										DataTypeVos.setDataTypeVoList(list);
										Seam.Component
												.getInstance("dynamicmodel_datatype")
												.revertDataType(DataTypeVos,
														function(result) {
															var obj = Ext.util.JSON
																	.decode(result);
															if (obj.success == true) {
																physicsTypeMain.ds
																		.clearModified();
																Ext
																		.getCmp("physicsTypeGridPanelDel")
																		.disable();
																physicsTypeMain.ds
																		.reload(
																				{
																					'callback' : function() {
																						sm
																								.selectFirstRow();
																						Ext.example
																								.msg(
																										""
																												+ getResource('resourceParam575')
																												+ "",
																										""
																												+ getResource('resourceParam1515')
																												+ "");
																					}
																				});
															} else {
																Ext.MessageBox
																		.show({
																			title : '恢复失败!',
																			msg : obj.message,
																			buttons : Ext.MessageBox.OK,
																			icon : Ext.MessageBox.ERROR
																		});
															}
														});
									}
									for (var j = 0; j < list1.length; j++) {
										physicsTypeMain.ds.remove(list1[j])
									}

								}
							});
				} else {
					Ext.MessageBox.show({
								title : "" + getResource('resourceParam575')
										+ "",
								buttons : Ext.MessageBox.OK,
								/**
								 * bug编号628 wangyf
								 * bug信息：在扩展类型界面点击恢复按钮时系统的提示逻辑不合理
								 * 注：在次更改了JsResource_zh.js文件中相对应得值(resourceParam1835)
								 * 2011-05-16
								 */
								icon : Ext.MessageBox.ERROR,
								msg : "" + getResource('resourceParam1835')
										+ ""
							})
				}
			}
		}
		// ,
		// '->',{
		// text : '清理废弃类型',
		// handler : function(){
		// Ext.MessageBox.confirm('' + getResource('resourceParam596')
		// + '', '次操作将会清理掉所有未被引用的已废弃的类型，确定继续吗？',
		// function(btn){
		// if(btn=='yes'){
		// Ext.Ajax.request({
		// url : '../JSON/dynamicmodel_datatype.clearDataType',
		// method : 'POST',
		// success : function(response, options) {
		// Ext.MessageBox.alert(getResource('resourceParam596'),'类型：'+response.responseText+'
		// ,已清理');
		// physicsTypeMain.ds
		// .clearModified();
		// Ext
		// .getCmp("physicsTypeGridPanelDel")
		// .disable();
		// physicsTypeMain.ds
		// .reload(
		// {
		// 'callback' : function() {
		// sm.selectFirstRow();
		// Ext.example.msg("" + getResource('resourceParam575') + "",
		// "" + getResource('resourceParam1515') + "");
		// }
		// });
		// },
		// disableCaching : true,
		// autoAbort : true,
		// params : {
		// datatypeRank:8
		// }
		// });
		// }
		// });
		// }
		// }
		],
		items : [physicsTypeMain.grid],
		listeners : {
			'render' : function(p){
		/**
		 * 当选定一个用户后，只能查该用户组的用户
		 * 复写该参数方法
		 * at 2011-06-08 by liuxj
		 */
			departmentUser.userComb.on('beforequery', function(qe) {
	                if (departmentUser.keypress) {
	                    departmentUser.comboboxStore.baseParams = {
	                        truename : null,
	                        instcode : null,
	                        roleId : null,
	                        securityDegree: null,
	                        start : 0,
	                        limit : 10
	                    }
	                } else {
	                    departmentUser.comboboxStore.baseParams = {
	                        instcode : null,
	                        roleId : null,
	                        securityDegree: null,
	                        start : 0,
	                        limit : 10
	                    }
	                }
	                departmentUser.keypress = false;
	               delete qe.combo.lastQuery;
	            });
				physicsTypeMain.secondTbar = new Ext.Toolbar([filterCombo,departmentUser.userComb,{
					xtype : 'textfield',
					width : 100,
					emptyText : '类型名称',
					id : 'search_name'
				},{
					text : '查询',
					handler : function(){
						if(physicsTypeMain.hm){
							searchHistory(physicsTypeMain.hmDatatypeId)
						}else{
							search();
						}
					}
				}]);
				physicsTypeMain.secondTbar.render(p.tbar);
			},
			'afterlayout' : function(panel) {
				if (physicsTypeMain.approvalModel) {
					Ext.getCmp("physicTypeTreeGridPanel").getTopToolbar()
							.disable();
				} else {
					var mask = new Ext.LoadMask(Ext.getBody(), {
								msg : 'Loading...'
							});
					mask.show();
					setTimeout(function() {
						Ext.Ajax.request({
							url : '../JSON/privilege_PrivilegeRemote.getPagePrivileges',
							method : 'POST',
							success : function(response, options) {
								var obj = Ext.util.JSON
										.decode(response.responseText);
								if (obj.modelEdit == true) {
									physicsTypeMain.modelEdit = true;
									Ext.getCmp('physicsTypeGridPanelAdd')
											.enable();
								} else {
									physicsTypeMain.modelEdit = false;
								}
								mask.hide();
							},
							disableCaching : true,
							autoAbort : true,
							params : {
								privilegename : "{'modelEdit':''}"
							}
						});
					}, 10);
				}
			}
		}
	})

	function search(){
			physicsTypeMain.searchMap = '&statuses='
													+ filterCombo.getValue()+'&userId='
													+ departmentUser.userComb.getValue()
						physicsTypeMain.ds.on('beforeload',
							function(store, options) {
								this.proxy = new Ext.data.HttpProxy({
											url : physicsTypeMain.mainUrl + physicsTypeMain.searchMap
										})
							});
						physicsTypeMain.ds.load({params: {
					        start: 0,          
					        limit: physicsTypeMain.sizePerPage,
					        datatypeName : Ext.getCmp('search_name').getValue() //@chenw
					    }});
	}
	
	function searchHistory(datatypeId){
			physicsTypeMain.searchHistoryMap = '&statuses='
													+ filterCombo.getValue()+'&datatypeName='
													+Ext.getCmp('search_name').getValue();
						physicsTypeMain.ds.on('beforeload',
							function(store, options) {
								this.proxy = new Ext.data.HttpProxy({
											method : 'GET',
											url : '../JSON/dynamicmodel_datatype.getDataTypeHistoryVersions?datatypeId='
											+ datatypeId + physicsTypeMain.searchHistoryMap
										})
							});
						physicsTypeMain.ds.load({params: {
					        start: 0,          
					        limit: physicsTypeMain.sizePerPage
					    }});
	}
	
	// 加载store数据
	function loadPhysicTypeTreeGrid(r) {
		if(r.get("datatypeId")==undefined){
			physicTypeTreeGridPanel.store.removeAll();
			return;
		}
		physicTypeTreeGridPanel.grid.stopEditing();
		physicTypeTreeGridPanel.grid.getSelectionModel().clearSelections();
		physicTypeTreeGridPanel.store.clearModified();
		function physicsTypeMainBeforeLoad(store, options) {
			if (physicsTypeMain.hm) {
				options.params = Ext.apply(options.params, {
							dataCenterID : r.get("datatypeId"),
							parentDataEntityID : "0",
							disableCheck : false,
							version : r.get("version")
						});
			} else {
				options.params = Ext.apply(options.params, {
							dataCenterID : r.get("datatypeId"),
							parentDataEntityID : "0",
							disableCheck : false
						});
			}
			store.removeAll();
		}
		physicTypeTreeGridPanel.store.on('beforeload',
				physicsTypeMainBeforeLoad);
		physicTypeTreeGridPanel.store.load({
					callback : function(rs) {
						physicTypeTreeGridPanel.store.un('beforeload',
								physicsTypeMainBeforeLoad);
						if (rs.length > 0) {
							physicTypeTreeGridPanel.orderNumber = rs[rs.length
									- 1].get("orderNumber")
									+ 1;
						} else {
							physicTypeTreeGridPanel.orderNumber = 0;
						}
					}
				});
	}
	// 是否有未保存的数据
	function hasUnSavedRecords() {
		var flag = physicsTypeMain.ds.findBy(function(record, id) {
					if (record.get("datatypeId") === undefined) {
						return true;
					}
				}, physicsTypeMain.ds) >= 0
		flag |= physicsTypeMain.ds.getModifiedRecords().length > 0;
		return flag;
	}
	function hasReName(value) {
		var ss = false;
		var num = 0;
		var rows = physicsTypeMain.ds
		for (var i = 0; i < rows.getCount(); i++) {
			if (value == rows.getAt(i).get("datatypeName")) {
				num++;
				if (num > 1) {
					ss = true;
					break;
				}
			}
		}
		return ss;
	}
	sm.on("selectionchange", function(selection) {
		if (Ext.getCmp('physicsTypeApprovalHistorySubPanel') != undefined) {
			Ext.getCmp('physicsTypeApprovalHistorySubPanel').hide();
		}
		if (Ext.getCmp('physicsTypeApprovalSubPanel') != undefined) {
			Ext.getCmp('physicsTypeApprovalSubPanel').hide();
		}
		Ext.getCmp("physicTypeTreeGridPanel").show();
		
		
		//----------------------start-----------------------------
		/*
		 * 2011-5-13 yangh
		 * 如果当前行为非’已废弃‘，那么工具条中的”恢复“按钮设置为不可用，否则设置可用
		 * 如果选中的行数大于2，”恢复“按钮也设置为不可用
		 * 
		 * 2011-5-23 liuxj
		 * 将 【如果选中的行数大于2，”恢复“按钮也设置为不可用】的限制去掉
		 * if(statusColumn!==4||selection.getSelections().length>1){
		 * 
		 * 2011-5-26 liuxj
		 * 如果没有选择任何checkbox时，JS报错的问题，故加上if(selectedRowed)判断
		 */
		var selectedRowed = selection.getSelected();
		if(selectedRowed){
			var statusColumn = selectedRowed.get("status"); 
			if(statusColumn!==4){
				Ext.getCmp('btnRevert').disable();
			}else{
				Ext.getCmp('btnRevert').enable();
			}
		}else{
			Ext.getCmp('btnRevert').disable();
		}
		//-----------------------end----------------------------
		
		
		if (physicsTypeMain.modelEdit == false) {// 没有编辑权限
			if (selection.getSelections().length == 1) {
				Ext.getCmp('physicsTypeGridPanelApprove').enable();
				Ext.getCmp('physicsTypeGridPanelviewApproveHistory').enable();
				var selectedRow = selection.getSelected();
				physicsTypeMain.dataCenterId = selectedRow.get("datatypeId");
				if (physicsTypeMain.dataCenterId != undefined) {
					Ext.getCmp("physicTypeTreeGridPanel").enable();
					loadPhysicTypeTreeGrid(selectedRow);
				}
			} else {
				Ext.getCmp('physicsTypeGridPanelApprove').disable();
				Ext.getCmp("physicTypeTreeGridPanel").disable();
			}
		} else {// 有编辑权限
			if (physicsTypeMain.approvalModel) { // 审批模式
				if (physicsTypeMain.hm) {// 审批模式中的历史模式
					if (selection.getSelections().length == 1) {
						Ext.getCmp("physicsTypeColumnTreeAdd").disable();
						Ext.getCmp("physicsTypeColumnTreeSave").disable();
						Ext.getCmp("physicsTypeColumnTreeRefresh").enable();
						Ext.getCmp("physicTypeTreeGridPanel").enable();
						var selectedRow = selection.getSelected();
						physicsTypeMain.dataCenterId = selectedRow
								.get("datatypeId");
						if (physicsTypeMain.dataCenterId != undefined) {
							loadPhysicTypeTreeGrid(selectedRow);
						}
					} else {
						Ext.getCmp("physicTypeTreeGridPanel").disable();
					}
				} else {// 审批模式中的正常模式
					Ext.getCmp('physicsTypeGridPanelSave').disable();
					Ext.getCmp('physicsTypeGridPanelDel').disable();
					Ext.getCmp('physicsTypeGridPanelAdd').disable();
					if (selection.getSelections().length == 1) {
						Ext.getCmp('physicsTypeGridPanelApprove').enable();
						Ext.getCmp('physicsTypeGridPanelviewApproveHistory')
								.enable();
						Ext.getCmp("physicsTypeColumnTreeAdd").disable();
						Ext.getCmp("physicsTypeColumnTreeSave").disable();
						Ext.getCmp("physicsTypeColumnTreeRefresh").enable();
						Ext.getCmp("physicTypeTreeGridPanel").enable();
						var selectedRow = selection.getSelected();
						physicsTypeMain.dataCenterId = selectedRow
								.get("datatypeId");
						if (physicsTypeMain.dataCenterId != undefined) {
							loadPhysicTypeTreeGrid(selectedRow);
						}
					} else if (selection.getSelections().length > 1) {
						Ext.getCmp('physicsTypeGridPanelApprove').disable();
						Ext.getCmp("physicTypeTreeGridPanel").disable();
					} else {
						Ext.getCmp('physicsTypeGridPanelApprove').disable();
						Ext.getCmp("physicTypeTreeGridPanel").disable();
					}
				}
			} else {// 非审批模式
				if (physicsTypeMain.hm) {// 非审批模式中的历史模式
					if (selection.getSelections().length == 1) {
						Ext.getCmp("physicsTypeColumnTreeAdd").disable();
						Ext.getCmp("physicsTypeColumnTreeSave").disable();
						Ext.getCmp("physicsTypeColumnTreeRefresh").enable();
						Ext.getCmp("physicTypeTreeGridPanel").enable();
						var selectedRow = selection.getSelected();
						physicsTypeMain.dataCenterId = selectedRow
								.get("datatypeId");
						if (physicsTypeMain.dataCenterId != undefined) {
							loadPhysicTypeTreeGrid(selectedRow);
						}
					} else {
						Ext.getCmp("physicTypeTreeGridPanel").disable();
					}
				} else {// 非审批模式中的正常模式
					if (selection.getSelections().length == 1) {
						var selectedRow = selection.getSelected();
						physicsTypeMain.dataCenterId = selectedRow
								.get("datatypeId");
						loadPhysicTypeTreeGrid(selectedRow);
						if(selectedRow
								.get("datatypeId")==undefined){
							Ext.getCmp('physicsTypeGridPanelSave').enable();
							Ext.getCmp('physicsTypeGridPanelDel').enable();
							Ext.getCmp('physicsTypeGridPanelAdd').enable();
							Ext.getCmp("physicsTypeGridPanelApprove").disable();
							Ext.getCmp("physicTypeTreeGridPanel").disable();
							return false;
						}

						var userid = selectedRow.get("userId");
						var arr = document.cookie.split(';');
						var loginuserid = '';
						for (var i = 0; i < arr.length; i++) {
							if (arr[i].indexOf('userid') != -1) {
								loginuserid = arr[i].split('=')[1];
								break;
							}
						}
						physicsTypeMain.userid = userid;
						physicsTypeMain.loginuserid = loginuserid;
						if (userid == 1 && loginuserid != 1) {// 管理员创建的类型不允许其他人修改
							Ext.getCmp('physicsTypeGridPanelDel')
									.setText(getResource('resourceParam9095'));// '废弃');
							Ext.getCmp('physicsTypeGridPanelSave').disable();
							Ext.getCmp('physicsTypeGridPanelDel').disable();
							Ext.getCmp('physicsTypeGridPanelAdd').disable();
							Ext.getCmp("physicsTypeGridPanelApprove").disable();
							Ext.getCmp("physicTypeTreeGridPanel").enable();
							Ext.getCmp("physicTypeTreeGridPanel")
									.getTopToolbar().disable();
							return false;
						}

						Ext.getCmp('physicsTypeGridPanelApprove').enable();
						Ext.getCmp('physicsTypeGridPanelviewApproveHistory')
								.enable();
						Ext.getCmp("physicsTypeColumnTreeAdd").enable();
						Ext.getCmp("physicsTypeColumnTreeSave").enable();
						Ext.getCmp("physicsTypeColumnTreeRefresh").enable();
						Ext.getCmp("physicTypeTreeGridPanel").enable();
						var status = selectedRow.get("status");
						switch (status) {
							case 0 :// 编制中
								Ext
										.getCmp('physicsTypeGridPanelDel')
										.setText(getResource('resourceParam475'));// '删除');
								Ext.getCmp('physicsTypeGridPanelSave').enable();
								Ext.getCmp('physicsTypeGridPanelDel').enable();
								Ext.getCmp('physicsTypeGridPanelAdd').enable();
								Ext.getCmp('physicsTypeGridPanelsubmitApprove')
										.enable();
								Ext.getCmp('physicsTypeGridPanelpassApprove')
										.enable();
								break;
							case 2 :// 已发布
								Ext
										.getCmp('physicsTypeGridPanelDel')
										.setText(getResource('resourceParam9095'));// '废弃');
								Ext.getCmp('physicsTypeGridPanelSave').enable();
								Ext.getCmp('physicsTypeGridPanelDel').enable();
								Ext.getCmp('physicsTypeGridPanelAdd').enable();
								Ext.getCmp('physicsTypeGridPanelsubmitApprove')
										.disable();
								Ext.getCmp('physicsTypeGridPanelpassApprove')
										.disable();
								break;
							case 3 :// 修改中
								Ext
										.getCmp('physicsTypeGridPanelDel')
										.setText(getResource('resourceParam9095'));// '废弃');
								Ext.getCmp('physicsTypeGridPanelSave').enable();
								Ext.getCmp('physicsTypeGridPanelDel').enable();
								Ext.getCmp('physicsTypeGridPanelAdd').enable();
								Ext.getCmp('physicsTypeGridPanelsubmitApprove')
										.enable();
								Ext.getCmp('physicsTypeGridPanelpassApprove')
										.enable();
								break;
							case 1 :// 审批中
								Ext.getCmp("physicTypeTreeGridPanel")
										.getTopToolbar().disable();
								Ext.getCmp('physicsTypeGridPanelSave').enable();
								Ext.getCmp('physicsTypeGridPanelDel').disable();
								Ext.getCmp('physicsTypeGridPanelAdd').enable();
								Ext.getCmp('physicsTypeGridPanelsubmitApprove')
										.disable();
								Ext.getCmp('physicsTypeGridPanelpassApprove')
										.disable();
								break;
							case 4 ://已废弃
								Ext
										.getCmp('physicsTypeGridPanelDel')
										.setText(getResource('resourceParam475'));// '删除');
								Ext.getCmp("physicTypeTreeGridPanel")
										.getTopToolbar().disable();
								Ext.getCmp('physicsTypeGridPanelSave').enable();
								Ext.getCmp('physicsTypeGridPanelDel').enable();
								Ext.getCmp('physicsTypeGridPanelAdd').enable();
								Ext.getCmp('physicsTypeGridPanelsubmitApprove')
										.disable();
								Ext.getCmp('physicsTypeGridPanelpassApprove')
										.disable();
						}
					} else if (selection.getSelections().length > 1) {
						Ext.getCmp('physicsTypeGridPanelApprove').enable();
						Ext.getCmp('physicsTypeGridPanelviewApproveHistory')
								.disable();
						Ext.getCmp("physicTypeTreeGridPanel").disable();
						Ext.getCmp('physicsTypeGridPanelSave').enable();
						Ext.getCmp('physicsTypeGridPanelDel').enable();
						Ext.getCmp('physicsTypeGridPanelAdd').enable();
						Ext.getCmp('physicsTypeGridPanelsubmitApprove')
								.enable();
						Ext.getCmp('physicsTypeGridPanelpassApprove').enable();
					} else {
						Ext.getCmp('physicsTypeGridPanelApprove').disable();
						Ext.getCmp("physicTypeTreeGridPanel").disable();
						Ext.getCmp('physicsTypeGridPanelSave').enable();
						Ext.getCmp('physicsTypeGridPanelDel').disable();
						Ext.getCmp('physicsTypeGridPanelAdd').enable();
					}
				}
			}
		}
	})

	return new Ext.Panel({
				layout : 'border',
				items : [new Ext.Panel({
									region : 'center',
									layout : 'fit',
									split : true,
									items : [mainPanel]
								}), new Ext.Panel({
									region : 'east',
									id : 'eastPanel',
									width : 490,
									layout : 'fit',
									items : [physicsTypeColumnTree]
								})]
			});
}

physicsTypeMain.initViewport = function() {
	var viewport = new Ext.Viewport({ // 页面布局
		items : [physicsTypeMain.init()],
		layout : 'fit'
	});
	physicsTypeMain.ds.load({
    	params: {
	        start: 0,          
	        limit: physicsTypeMain.sizePerPage
	    }
	});
}
