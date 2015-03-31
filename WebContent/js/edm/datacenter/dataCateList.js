var dataCateList = {
	grid : null,
	start : 0,
	checkrecord : null,
	limit : 25,
	args : {
		start : 0,
		limit : 25
	},
	baseargs : null,
	flag : '1' // 1 :datacenter 2, 任务
}
dataCateList.init = function() {
	var strurl = '../JSON/datacenter_DataCenterRemote.getDataCateList';
	var proxy = new Ext.data.HttpProxy( {
		url : strurl
	});
	var reader = new Ext.data.JsonReader( {
		root : 'results',
		totalProperty : 'totalProperty',
		id : 'id'
	}, [ 'id', 'categoryinstanceid', 'categoryinstancename', 'categorytype',
			'truename', 'departmentname', 'createtime', 'description',
			'version', 'revision', 'categoryid', 'categoryName']);
	var ascid = 'id';
	var ascstr = 'asc';
	var ds = new Ext.data.Store( {
		proxy : proxy,
		reader : reader
	});
	var sm = new Ext.grid.CheckboxSelectionModel(
			{
				listeners : {
					rowselect : function(sm, rowIndex, r) {
						if (sm.getCount() > 1) {
							setDataPrivilege.mutiFirst = true;
						} else {
							setDataPrivilege.mutiFirst = false;
						}
					},
					selectionchange : function(sm) {
						if (sm.getCount()) {
							Ext.getCmp('delcat').enable();

						} else {
							Ext.getCmp('delcat').disable();
						}
						if (sm.getCount() == 1) {
							var sm = dataCateList.grid.getSelectionModel();
							var count = sm.getCount();
							var records = sm.getSelections();
							var record;
							Ext.getCmp('privcontrol').enable();
							if (dataCateList.flag == 1) {
								var opertationVo = Seam.Remoting
										.createType("com.luck.itumserv.base.privilege.OperationVo");
								opertationVo.setDataId(records[0]
										.get('categoryinstanceid'));
								opertationVo.setIsPermitted(false);
								opertationVo.setIsRefused(false);
								opertationVo.setFlag(false);
								opertationVo.setCompulsory(false);
								callSeam("privilege_DataPrivilegeRemote",
										"getDataCenterDataManipultations",
										[ opertationVo ], function(result) {
											var obj = Ext.util.JSON.decode(result);
											/**
											 * bug编号633 wangyf
											 * bug信息：在数据中心，把付于张明用户的h1信息的编辑，删除，审批，置通过与权限，功能取消后，此两个按钮应置恢。
											 *	同时不应再支持进行编辑操作。二级页面也存在此问题，同时二级页面的删除按钮也应置恢。
											 * 2011-05-17
											 */
											if (obj.modify == false) {
												Ext.getCmp('updateNew').disable();
											} else {
												Ext.getCmp('updateNew').enable();
											}
											if (obj.del == false) {
												Ext.getCmp('delcat').disable();
											} else {
												Ext.getCmp('delcat').enable();
											}
											if (obj.setprivilege == false) {
												Ext.getCmp('privcontrol').disable();
											} else {
												Ext.getCmp('privcontrol').enable();
											}
										});
							}
							for ( var i = 0; i < count; i++) {
								record = records[i];
								dataCateList.checkrecord = record;
							}
							//
							Ext.getCmp('updateNew').enable();
						} else {

							Ext.getCmp('updateNew').disable();
							Ext.getCmp('privcontrol').disable();
						}
					}

				}

			});
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [
			sm,
			new Ext.grid.RowNumberer(),
			{
				header : "" + getResource('resourceParam480') + "",
				dataIndex : 'categoryinstancename',
				width : 150,
				renderer : function(value, p, record) {
					if (dataCateList.flag == 1) {
						return '<a href="javascript:void(0);" style="color:blue;text-decoration:underline;" onclick=window.parent.clickNode(\''
								+ record.get('categoryinstanceid')
								+ '\')>' + value + '</a>';
					} else {
						return value;
					}
				}
			}, {
				header : "" + getResource('resourceParam1248') + "",
				dataIndex : 'truename',
				width : 300
			}, {
				header : "" + getResource('resourceParam1292') + "",
				dataIndex : 'departmentname',
				width : 300
			}, {
				header : "" + getResource('resourceParam9788') + "",
				dataIndex : 'categoryName',
				width : 300
			},{
				header : "" + getResource('resourceParam981') + "",
				dataIndex : 'createtime',
				width : 300
			}, {
				header : "" + getResource('resourceParam648') + "",
				dataIndex : 'description',
				width : 300,
				renderer : function(value) {
					var qtip = " ext:qtip='" + value + "'";
					return "<pre " + qtip + " >" + value + "</pre>"
				}
			} 
		]
	});
	var addmenu = new Ext.menu.Menu( {
		id : 'addmenu',
		items : [ {
			text : '' + getResource('resourceParam1725') + '',
			listeners : {
				'click' : function() {
					dateCateAddFri.init();
				}
			}
		} ]

	});
	var tb = [
			{
				text : '' + getResource('resourceParam483') + '',
				id : 'addNew',
				iconCls : 'add1',
				listeners : {
					'afterrender' : function(btn) {
						if (dataCateList.flag == 1) {
							var privVo = Seam.Remoting
									.createType("com.luck.itumserv.base.privilege.PrivVo");
							privVo.setPrivilegename("{'AddDataCenter':''}");
							callSeam("privilege_PrivilegeRemote",
									"getPagePrivileges", [ privVo ], function(
											result) {
										try {
											var obj = Ext.util.JSON
													.decode(result);
											if (obj.AddDataCenter == false) {
												btn.disable();
											}
										} catch (e) {
											// throw new Error("catch privilege
											// error")
								}
							});
						}
					},
					'click' : function() {
						dateCateAddFri.init();
					}
				}
			},
			'-',
			{
				text : '' + getResource('resourceParam490') + '',// 编辑
				id : 'updateNew',
				iconCls : 'edit1',
				disabled : true,
				listeners : {
					'click' : function() {
						var sm = dataCateList.grid.getSelectionModel();
						if (dataCateList.checkrecord == null
								|| sm.getSelections().length == 0) {
							Ext.MessageBox.show( {
								title : '提示信息',
								msg : '请选择一条信息进行操作',
								buttons : Ext.MessageBox.OK
							});
							return false;
						}
						dataInstanceUpdate.init(dataCateList.checkrecord
								.get("categoryinstanceid"),
								dataCateList.checkrecord
										.get("categoryinstancename"),
								dataCateList.checkrecord.get("description"), 1);
					}
				}

			},
			'-',
			{
				text : '' + getResource('resourceParam475') + '',// 删除
				id : 'delcat',
				iconCls : 'del1',
				disabled : true,
				listeners : {
					'click' : function() {
						var sm = dataCateList.grid.getSelectionModel();
						var count = sm.getCount();
						var records = sm.getSelections();
						var record;

						var idSequence = '';
						for ( var i = 0; i < count; i++) {
							record = records[i];
							idSequence += record.get('categoryinstanceid') + ',';

						}
						Ext.Msg
								.confirm(
										'' + getResource('resourceParam1724') + '',
										"" + getResource('resourceParam1720')
												+ "?",
										function(btn) {
											if (btn == 'yes') {
												Ext.Ajax
														.request( {
															url : '../JSON/datacenter_DataCenterRemote.delDataCateInstance',
															method : 'POST',
															success : function(
																	response,
																	options) {
																var obj = Ext.util.JSON
																		.decode(response.responseText);
																if (obj.success == true) {
																	window.parent
																			.removenode(idSequence);
																} else {
																	Ext.MessageBox
																			.show( {
																				title : '' + getResource('resourceParam1724') + '',
																				msg : '' + getResource('resourceParam651') + '',
																				buttons : Ext.MessageBox.OK,
																				icon : Ext.MessageBox.ERROR
																			})

																}
																myGrid
																		.loadvalue(
																				dataCateList.grid.store,
																				dataCateList.args,
																				dataCateList.baseargs);
															},
															disableCaching : true,
															autoAbort : true,
															params : {
																idSequence : idSequence
															}
														});
											}
										});
					}
				}

			},
			'-',
			{
				text : '' + getResource('resourceParam652') + '',// 查询
				id : 'querycat',
				iconCls : 'search1',
				listeners : {
					'click' : function() {
						var name = new Ext.form.TextField(
								{
									fieldLabel : '&nbsp&nbsp' + getResource('resourceParam480') + '',
									anchor : '95%',
									style : 'margin-bottom: 2px;'
								});
						var createtime = new Ext.form.DateField(
								{
									fieldLabel : '&nbsp&nbsp' + getResource('resourceParam981') + '',
									format : 'Y-m-d'

								});
						departmentUser.init(
								'' + getResource('resourceParam689') + '',
								'' + getResource('resourceParam1248') + '');
						var queryForm = new Ext.form.FormPanel(
								{

									items : [ name, createtime ],
									defaults : {
										anchor : '90%'

									},
									buttons : [
											{
												text : '' + getResource('resourceParam479') + '',
												listeners : {
													'click' : function() {
														dataCateList.grid
																.getStore()
																.on(
																		'beforeload',
																		function(
																				store,
																				options) {

																			// options.params
																			// =
																			// Ext.apply(
																			// options.params,
																			// {
																			// name
																			// :
																			// name
																			// .getValue(),
																			// userid
																			// :
																			// usersComb
																			// .getValue(),
																			// depid
																			// :
																			// comboBoxTree
																			// .getValue(),
																			// start
																			// : 0,
																			// limit
																			// : 25
																			// });
																			options.params.name = name
																					.getValue();
																			// options.params.userid
																			// =
																			// departmentUser.userComb;
																			// options.params.depid
																			// =
																			// departmentUser.departmentCombo
																			// .getValue();
																			options.params.createtime = Ext.util.Format
																					.date(
																							createtime
																									.getValue(),
																							'Y-m-d');
																			options.params.start = 0;
																			options.params.limit = 25;
																		});
														dataCateList.grid
																.getStore()
																.load();
														queryWin.hide();
													}
												}
											},
											{
												text : '' + getResource('resourceParam606') + '',
												listeners : {
													'click' : function() {
														queryForm.getForm()
																.reset();
													}
												}
											},
											/**
											 * 增加取消按钮 at 2011-05-27 by liuxj
											 */
											{
												text : '' + getResource('resourceParam3001') + '',
												listeners : {
													'click' : function() {
														queryWin.hide();
													}
												}
											} ]
								});
						var queryWin = new Ext.Window( {
							title : '' + getResource('resourceParam652') + '',
							layout : 'fit',
							defaults : {
								padding : 15
							// 2011-4-20 gzj
							},
							width : 340,
							height : 180,
							modal : true,
							items : [ queryForm ]

						});
						queryWin.show();
					}
				}

			},
			'-',
			{
				text : '' + getResource('resourceParam582') + '', // 权限
				id : 'privcontrol',
				iconCls : 'view1',
				disabled : true,
				listeners : {
					'click' : function() {
						if (sm.getCount() == 0) {
							return false;
						}
						var arr = sm.getSelections();
						var temp = [];
						var titleNames = [];
						for ( var i = 0; i < arr.length; i++) {
							temp[i] = arr[i].get('categoryinstanceid');
							titleNames[i] = arr[i].get('categoryinstancename');
						}
						var dpp = setDataPrivilege.init( {
							'dataId' : temp.join(','),
							'dataType' : 'DataObjectDataType',
							'height' : 421
						});
						setDataPrivilege.mainpanel.dataId = temp.join(',');
						setDataPrivilege.mainpanel.dataType = "DataObjectDataType";
						setDataPrivilege.refresh();

						/**
						 * bug编号21 bug信息：为一个数据中心设置权限时，点添加用户，系统不能弹出选择人员页面
						 * 修改方法：暂时先把下面这段赋值语句注释掉（因火狐和IE的兼容问题）
						 * @author wangyf
						 * 2011-04-21 19:57
						 */
						/**start**/
//						window.parent.document.getElementById("center_frame").firstChild.nextSibling.firstChild.innerHTML = ''
//								+ getResource('resourceParam464')
//								+ ''
//								+ getResource('resourceParam561')
//								+ '【'
//								+ titleNames.join(',')
//								+ '】'
//								+ getResource('resourceParam582') + '';
						/**end**/
						
						// window.parent.document.getElementById("center_frame").firstChild.firstChild.innerHTML
						// = ''
						// + getResource('resourceParam464')
						// + ''
						// + getResource('resourceParam561')
						// + '【<a href="#"
						// style="color:blue;text-decoration:underline;"
						// onclick=window.parent.clickNode(\''
						// + sm.getSelected().get('categoryinstanceid')
						// + '\')>'
						// + sm.getSelected().get('categoryinstancename')
						// + '</a>】' + getResource('resourceParam582') + '';
						dataCateList.grid.hide();
						if (Ext.getCmp('dataPrivilegePanel')) {
							Ext.getCmp('dataPrivilegePanel').removeAll();
							Ext.getCmp('dataPrivilegePanel').add(dpp);
							Ext.getCmp('dataPrivilegePanel').show();
						} else {
							dataCateList.mainPanel.insert(0,new Ext.Panel(
									{
										id : 'dataPrivilegePanel',
										layout : 'fit',
										items : [ dpp ],
										buttonAlign : 'right',
										buttons : [ {
											xtype : 'button',
											text : '' + getResource('resourceParam944') + '',
											style : 'margin-right:70px',
											listeners : {
												click : function() {
													window.parent.document
															.getElementById("center_frame").firstChild.firstChild.innerHTML = '<a style="cursor: hand" onclick=menu_base("defaultDataCenter","'
															+ getResource('resourceParam561')
															+ '");>'
															+ getResource('resourceParam561')
															+ '</a>';
													dataCateList.grid
															.show();
													Ext
															.getCmp(
																	'dataPrivilegePanel')
															.hide();
													dataCateList.mainPanel
															.doLayout();
												}
											}
										} ]
									}
								)
							);
						}
						dataCateList.mainPanel.doLayout();
					}
				}

			},
			/**
			 * 增加返回按钮 at 2011-05-27 by liuxj
			 */
			'-',
			{
				text : '' + getResource('resourceParam944') + '', // 返回
				id : 'backcontrol',
				disabled : false,
				listeners : {
					'click' : function() {
					dataCateList.grid.getStore().on(
						'beforeload',function(
								store,
								options) {
							options.params.name = '';
							options.params.createtime = Ext.util.Format.date('', 'Y-m-d');
							options.params.start = 0;
							options.params.limit = 25;
						});
				dataCateList.grid.getStore().load();
					}
				}

			} ];
	dataCateList.grid = myGrid.init(ds, cm, null, sm);
	myGrid.loadvalue(dataCateList.grid.store, dataCateList.args,
			dataCateList.baseargs);
	dataCateList.mainPanel = new Ext.Panel( {
		layout : 'fit',
		tbar : tb,
		items : [ dataCateList.grid ]
	});
	return dataCateList.mainPanel;

}
