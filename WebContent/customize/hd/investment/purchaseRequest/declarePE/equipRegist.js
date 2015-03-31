var equipRegist = {

	currentFileName : "",
	
	getPanel : function() {
		var sm = new Ext.grid.CheckboxSelectionModel();
		var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : '../JSON/PEdeclareRemote.getEquipRegistList?d=' + new Date(),
								method : 'post'
							}),
					reader : new Ext.data.JsonReader({
								root : 'results',
								id : 'id',
								totalProperty : 'totalProperty'
							}, ['projectname', 'referencemodel', 'mainparam', 'nums', 'numsunit', 'marketprice', 'schedule', 'fileid', 'installsite', 'installcondition',
									'mainuse', 'demandreason', 'categorys', 'approvalstate', 'createtime', 'remarke', 'useunit', 'uploadfile', 'id'])
				});
		// 分页工具栏
		var paging = new Ext.PagingToolbar({
					store : store,
					pageSize : 20,
					displayInfo : true,
					displayMsg : '第 {0} 到 {1} 条，一共  {2} 条',
					emptyMsg : '没有记录'
				});
		var cm = new Ext.grid.ColumnModel([sm, new Ext.grid.RowNumberer({
					header : "序号",
					width : 40
						// renderer:function(value,metadata,record,rowIndex){
						// return record_start + 1 + rowIndex;
						// }
					}), {
					header : '项目名称',
					dataIndex : 'projectname',
					sortable : true,
					width : 100,
					renderer : function(value, cellmeta, record, rowIndex) {
						var id = record.get('id');
						if (record.get('approvalstate') == "待审批"||record.get('approvalstate') == "已退回") {
							return "<a href='javascript:void(0);' onclick = equipRegist.createWindow('" + id + "')>" + "<font color=blue>" + value + "</font></a>";
						} else {
							return value;
						}
					}
				}, {
					header : '状态',
					dataIndex : 'approvalstate',
					sortable : true,
					width : 50,
					renderer : function(value, cellmeta, record, rowIndex) {
						var id = record.get('id');
						if (record.get('approvalstate') == "待审批"||record.get('approvalstate') == "已退回") {
							return "<font color=red>" + value + "</font>";
						} else if (record.get('approvalstate') == '已审批') {
							return "<font color=green>" + value + "</font>";
						} else {
							return value;
						}
					}
				}, {
					header : '类别',
					dataIndex : 'categorys',
					sortable : true,
					width : 60
				}, {
					header : '参考型号',
					dataIndex : 'referencemodel',
					sortable : true,
					width : 100

				}, {
					header : '主要性能参数及其配置(含附件)',
					dataIndex : 'mainparam',
					sortable : true,
					width : 100
				}, {
					header : '数量',
					dataIndex : 'nums',
					sortable : true,
					width : 100
				}, {
					header : '单位',
					dataIndex : 'numsunit',
					sortable : true,
					width : 50
				}, {
					header : '市场价格',
					dataIndex : 'marketprice',
					sortable : true,
					width : 100
				}, {
					header : '进度要求',
					dataIndex : 'schedule',
					sortable : true,
					width : 100
				}, {
					header : '安装地点',
					dataIndex : 'installsite',
					sortable : true,
					width : 100
				}, {
					header : '安装条件',
					dataIndex : 'installcondition',
					sortable : true,
					width : 100
				}, {
					header : '主要用途',
					dataIndex : 'mainuse',
					sortable : true,
					width : 100
				}, {
					header : '使用单位',
					dataIndex : 'useunit',
					sortable : true,
					width : 100
				}, {
					header : '需求原因',
					dataIndex : 'demandreason',
					sortable : true,
					width : 100
				}, {
					header : '时间',
					dataIndex : 'createtime',
					sortable : true,
					width : 100
				}, {
					header : '审批记录',
					dataIndex : '',
					sortable : true,
					width : 100,
					renderer : function(value, cellmeta, record, rowIndex) {
						var id = record.get('id');
						if (record.get('approvalstate') == "已审批"||record.get('approvalstate') == "已退回") {
							return "<a href='javascript:void(0);' onclick = approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
						}
					}
				}, {
					header : '备注',
					dataIndex : 'remarke',
					sortable : true,
					width : 100
				},{ 
					header : '更多',
					id : 'uploadfile',
					dataIndex : 'uploadfile',
					sortable : true,
					width : 100 ,
					renderer : function(value, cellmeta, record, rowIndex){
						var ID = record.get('fileid');
						var name = "";
						var ORIGINALNAME = record.get('uploadfile');
						if(ORIGINALNAME!=""){
							name = "浏览";
						}
						var value = "<a href='../FILEDOWN/?ID="// 着用的是下载。需传值文件的id和文件名，才能查到
								+ ID + "&ORIGINALNAME=" + encodeURI(encodeURI(ORIGINALNAME)) + "' cursor：hand>" +
								"<font color='blue'> "+name+" </font></a>";
						return value;
					}
				}]);
		var grid = new Ext.grid.GridPanel({
					title : '设备登记',
					width : 300,
					id : 'equipRegistGrid',
					cm : cm,
					sm : sm,
					columnLines : true,
					stripeRows : true,
					bbar : paging,
					region : 'center',
					store : store,
					loadMask : {
						msg : '正在加载数据，请稍侯……'
					},
					tbar : new Ext.Toolbar({
								items : ['-', {
											extype : 'button',
											iconCls : 'add1',
											text : '新增',
											disabled : main.leaderRole&&!main.directorRole,
											handler : function() {
												equipRegist.createWindow();
											}
										}, '-', {
											extype : 'button',
											iconCls : 'del1',
											text : '删除',
											disabled : main.leaderRole&&!main.directorRole,
											handler : function() {
												equipRegist.delEquipRegist();
											}
										}, '-', {
											extype : 'button',
											iconCls : 'icon-importTasks',
											text : '提交审批',
											disabled : main.leaderRole&&!main.directorRole,
											handler : function() {
												equipRegist.doApproval();
											}
										}, '-']
							})

				});

		grid.on('activate', function() {
					store.baseParams = {
						start : 0,
						limit : 20
					};
					store.reload();
				});
		return grid;
	},

	createWindow : function(id) {

		var isEdit = true;
		if (typeof(id) == "undefined") {
			isEdit = false;
		}
		var window = new Ext.Window({
					id : 'equipRegistWindow',
					width : 800,
					title : "设备登记",
					autoScroll : false,
					autoDestroy : true,
					items : [{
								xtype : 'form',
								border : false,
								id : 'equipRegistForm',
								items : [{

											layout : 'column',
											border : false,
											items : [{
														columnWidth : .3,
														layout : "form",
														border : false,
														labelWidth : 60,
														bodyStyle : 'padding:5px 5px 0px 5px;',
														items : [{
																	xtype : 'hidden',
																	id : 'id',
																	value : id
																}, {
																	id : 'projectname',
																	xtype : "textfield",
																	fieldLabel : "项目名称",
																	anchor : "95%",
																	allowBlank : false,
																	blankText : '不能为空!'
																}]
													}, {
														columnWidth : .3,
														layout : "form",
														border : false,
														labelWidth : 60,
														bodyStyle : 'padding:5px 5px 0px 5px;',
														items : {
															id : 'referencemodel',
															xtype : "textfield",
															fieldLabel : "参考型号",
															anchor : "95%",
															allowBlank : false,
															blankText : '不能为空!'
														}
													}, {
														columnWidth : .4,
														layout : "form",
														border : false,
														labelWidth : 120,
														bodyStyle : 'padding:5px 5px 0px 5px;',
														items : {
															id : 'mainparam',
															xtype : "textfield",
															fieldLabel : "主要性能参数及配置",
															anchor : "95%",
															allowBlank : false,
															blankText : '不能为空!'
														}
													}]
										}, {
											layout : 'column',
											border : false,
											items : [{
														columnWidth : .3,
														layout : "form",
														border : false,
														labelWidth : 60,
														bodyStyle : 'padding:0px 5px;',
														items : {
															id : 'nums',
															xtype : "numberfield",
															fieldLabel : "数量",
															anchor : "95%",
															allowBlank : false,
															allowNegative : false,
															blankText : '不能为空!'
														}
													}, {
														columnWidth : .3,
														layout : "form",
														border : false,
														labelWidth : 60,
														bodyStyle : 'padding:0px 5px;',
														items : {
															id : 'numsunit',
															xtype : "textfield",
															fieldLabel : "单位",
															anchor : "95%",
															allowBlank : false,
															blankText : '不能为空!'
														}
													}, {
														columnWidth : .4,
														layout : "form",
														border : false,
														labelWidth : 120,
														bodyStyle : 'padding:0px 5px;',
														items : {
															id : 'marketprice',
															xtype : "numberfield",
															fieldLabel : "市场价格",
															anchor : "95%",
															allowBlank : false,
															allowNegative : false,
															blankText : '不能为空!'
														}
													}]
										}, {
											layout : 'column',
											border : false,
											items : [{
														columnWidth : .3,
														layout : "form",
														border : false,
														labelWidth : 60,
														bodyStyle : 'padding:0px 5px;',
														items : {
															id : 'schedule',
															xtype : "textfield",
															fieldLabel : "进度要求",
															anchor : "95%",
															allowBlank : false,
															blankText : '不能为空!'
														}
													}, {
														columnWidth : .3,
														layout : "form",
														border : false,
														labelWidth : 60,
														bodyStyle : 'padding:0px 5px;',
														items : {
															id : 'installsite',
															xtype : "textfield",
															fieldLabel : "安装地点",
															anchor : "95%",
															allowBlank : false,
															blankText : '不能为空!'
														}
													}, {
														columnWidth : .4,
														layout : "form",
														border : false,
														labelWidth : 120,
														bodyStyle : 'padding:0px 5px;',
														items : {
															id : 'installcondition',
															xtype : "textfield",
															fieldLabel : "安装条件",
															anchor : "95%",
															allowBlank : false,
															blankText : '不能为空!'
														}
													}]
										}, {
											layout : 'column',
											border : false,
											items : [{
														columnWidth : .3,
														layout : "form",
														border : false,
														labelWidth : 60,
														bodyStyle : 'padding:0px 5px;',
														items : {
															id : 'mainuse',
															xtype : "textfield",
															fieldLabel : "主要用途",
															anchor : "95%",
															allowBlank : false,
															blankText : '不能为空!'
														}
													}, {
														columnWidth : .3,
														layout : "form",
														border : false,
														labelWidth : 60,
														bodyStyle : 'padding:0px 5px;',
														items : {
															id : 'categorys',
															xtype : 'combo',
															fieldLabel : '类别',
															emptyText : '请选择',
															anchor : "95%",
															triggerAction : 'all',
															store : [['股份','股份'],['集团','集团']],
															allowBlank : false,
															editable : false,
															blankText : '不能为空!'
														}
													}, {
														columnWidth : .4,
														layout : "form",
														border : false,
														labelWidth : 120,
														bodyStyle : 'padding:0px 5px;',
														items : {
															id : 'remarke',
															xtype : "textfield",
															fieldLabel : "备注",
															anchor : "95%"
														}
													}]
										}, {
											layout : 'column',
											border : false,
											items : [{
														columnWidth : .3,
														layout : "form",
														border : false,
														labelWidth : 60,
														bodyStyle : 'padding:0px 5px;',
														items : {
															id : 'demandreason',
															xtype : "textfield",
															fieldLabel : "需求原因",
															anchor : "95%",
															allowBlank : false,
															blankText : '不能为空!'
														}
													}, {
														columnWidth : .3,
														layout : "form",
														border : false,
														labelWidth : 60,
														bodyStyle : 'padding:0px 5px;',
														items : {
															id : 'useunit',
															xtype : 'combo',
															fieldLabel : '使用单位',
															emptyText : '请选择',
															anchor : "95%",
															triggerAction : 'all',
															displayField : 'departmetname',
															valueField : 'departmetname',
															store : new Ext.data.Store({
																		proxy : new Ext.data.HttpProxy({
																					url : '../JSON/PEdeclareRemote.getDepartment?d=' + new Date(),
																					method : 'post'
																				}),
																		reader : new Ext.data.JsonReader({
																					root : 'results',
																					id : 'idd',
																					totalProperty : 'totalProperty'
																				}, ['departmetname', 'departmetname'])
																	}),
															allowBlank : false,
															editable : false,
															blankText : '不能为空!'

														}
													}]
										}]
							}, {
								xtype : 'form',
								border : false,
								id : 'fileFormPanel',
								fileUpload : true,
								labelWidth : 60,
								items : [{
									xtype : 'panel',
									layout : 'column',
									border : false,
									items : [{
										xtype : 'panel',
										layout : 'form',
										bodyStyle : 'padding:0px 5px;',
										columnWidth : .5,
										border : false,
										items : [{
													xtype : 'hidden',
													id : 'fileid',
													name : 'fileid'
												}, {
													id : 'uploadfile',
													xtype : 'fileuploadfield',
													name : 'uploadfile',
													buttonText : '浏览...',
													anchor : '100%',
													fieldLabel : '上传附件'
												}]
									}]
								}]

							}],
					modal : true,
					border : true,
					bodyStyle : 'background:#fff;',
					resizable : false,
					buttonAlign : 'center',
					buttons : [{
								text : ' 保存 ',
								handler : function() {
									var equipRegistForm = Ext.getCmp('equipRegistForm');
									if (!equipRegistForm.getForm().isValid()) {
										return false;
									}
									equipRegist.saveEquipRegist(id);

								}
							}, {
								text : ' 关闭 ',
								handler : function() {
									window.close()
								}
							}]
				});

		if (isEdit) {
			var rec = Ext.getCmp('equipRegistGrid').store.getById(id);
			Ext.getCmp('equipRegistForm').getForm().loadRecord(rec);
			Ext.getCmp('fileFormPanel').getForm().loadRecord(rec);
			equipRegist.currentFileName = rec.data.uploadfile;
		}
		window.show();
	},
	delEquipRegist : function() {
		var grid = Ext.getCmp('equipRegistGrid');
		var id = "";
		var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
		if (rows.length == 0) {
			Ext.MessageBox.alert('提示', '请选择一条记录!');
			return;
		}

		for (i = 0; i < rows.length; i++) {
			id = id + rows[i].get('id') + ",";
			var approvalState = rows[i].get('approvalstate');
			if (approvalState == '已审批' || approvalState == '审批中') {
				Ext.MessageBox.alert('提示', '请选择待审批记录!');
				return;
			}
		}

		Ext.Msg.confirm("提示", "是否确定删除?", function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.request({
									url : "../JSON/PEdeclareRemote.delEquipRegist",
									params : {
										id : id
									},
									success : function(response, opt) {
										var value = response.responseText;
										if (value == "true") {
											Ext.MessageBox.hide();
											if (Ext.Msg.alert('提示', '删除成功!')) {
												// main.tabs.setActiveTab(1);
												Ext.getCmp('equipRegistGrid').getStore().reload();
											}
										} else {
											Ext.Msg.alert("提示", "数据异常，请与管理员联系。")
										}
									},
									disableCaching : true,
									autoAbort : true
								});
					}
				});

	},
	saveEquipRegist : function(id) {
		var projectname = Ext.getCmp('projectname').getValue();
		var referencemodel = Ext.getCmp('referencemodel').getValue();
		var mainparam = Ext.getCmp('mainparam').getValue();
		var nums = Ext.getCmp('nums').getValue();
		var numsunit = Ext.getCmp('numsunit').getValue();
		var marketprice = Ext.getCmp('marketprice').getValue();
		var schedule = Ext.getCmp('schedule').getValue();
		var installsite = Ext.getCmp('installsite').getValue();
		var installcondition = Ext.getCmp('installcondition').getValue();
		var mainuse = Ext.getCmp('mainuse').getValue();
		var demandreason = Ext.getCmp('demandreason').getValue();
		var categorys = Ext.getCmp('categorys').getValue();
		var remarke = Ext.getCmp('remarke').getValue();
		var useunit = Ext.getCmp('useunit').getValue();
		var uploadfile = Ext.getCmp('uploadfile').getValue();
		var fileform = Ext.getCmp('fileFormPanel');

		if (typeof(id) == "undefined") {// 保存
			if (uploadfile == "") {
				var json = {
					projectname : projectname,
					referencemodel : referencemodel,
					nums : nums,
					numsunit : numsunit,
					mainparam : mainparam,
					marketprice : marketprice,
					schedule : schedule,
					installsite : installsite,
					installcondition : installcondition,
					mainuse : mainuse,
					demandreason : demandreason,
					categorys : categorys,
					useunit : useunit, // 使用单位
					remarke : remarke
				}
				Ext.Ajax.request({
							url : "../JSON/PEdeclareRemote.saveEquipRegist",
							params : {
								json : Ext.encode(json)
							},
							success : function(response, opt) {
								var value = response.responseText;
								if (value == "true") {
									Ext.MessageBox.hide();
									if (Ext.Msg.alert('提示', '保存成功!')) {
										// main.tabs.setActiveTab(1);
										Ext.getCmp('equipRegistWindow').close();
										Ext.getCmp('equipRegistGrid').getStore().reload();
									}
								} else {
									Ext.Msg.alert("提示", "数据异常，请与管理员联系。")
								}
							},
							disableCaching : true,
							autoAbort : true
						});

			} else {
				fileform.getForm().doAction('submit', {
							waitMsg : '正在保存数据，请稍候...',
							waitTitle : '提示',
							url : '../FILEUP/',// 这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
							method : 'post',
							success : function(form, action) {
								var file = action.result;
								var json = {
									projectname : projectname,
									referencemodel : referencemodel,
									nums : nums,
									numsunit : numsunit,
									mainparam : mainparam,
									marketprice : marketprice,
									schedule : schedule,
									installsite : installsite,
									installcondition : installcondition,
									mainuse : mainuse,
									demandreason : demandreason,
									categorys : categorys,
									remarke : remarke,
									fileid : file.fileId,
									uploadfile : file.fileName
								}
								Ext.Ajax.request({
											url : "../JSON/PEdeclareRemote.saveEquipRegist",
											params : {
												json : Ext.encode(json)
											},
											success : function(response, opt) {
												var value = response.responseText;
												if (value == "true") {
													Ext.MessageBox.hide();
													if (Ext.Msg.alert('提示', '保存成功!')) {
														// main.tabs.setActiveTab(1);
														Ext.getCmp('equipRegistWindow').close();
														Ext.getCmp('equipRegistGrid').getStore().reload();
													}
												} else {
													Ext.Msg.alert("提示", "数据异常，请与管理员联系。")
												}
											},
											disableCaching : true,
											autoAbort : true
										});

							},
							failure : function(form, action) {
								Ext.Msg.alert('提示', "保存失败");
							}
						});
			}

		} else {// 更新
			if (uploadfile == ""||uploadfile == equipRegist.currentFileName) {
				var json = {
					id:id,
					projectname : projectname,
					referencemodel : referencemodel,
					nums : nums,
					numsunit : numsunit,
					mainparam : mainparam,
					marketprice : marketprice,
					schedule : schedule,
					installsite : installsite,
					installcondition : installcondition,
					mainuse : mainuse,
					demandreason : demandreason,
					categorys : categorys,
					useunit : useunit, // 使用单位
					remarke : remarke,
					fileid : Ext.getCmp('fileid').getValue(),
					uploadfile : Ext.getCmp('uploadfile').getValue()
				}
				Ext.Ajax.request({
					url : "../JSON/PEdeclareRemote.saveEquipRegist",
					params : {
						json : Ext.encode(json)
					},
					success : function(response, opt) {
						var value = response.responseText;
						if (value == "true") {
							Ext.MessageBox.hide();
							if (Ext.Msg.alert('提示', '更新成功!')) {
								// main.tabs.setActiveTab(1);
								Ext.getCmp('equipRegistWindow').close();
								Ext.getCmp('equipRegistGrid').getStore().reload();
							}
						} else {
							Ext.Msg.alert("提示", "数据异常，请与管理员联系。")
						}
					},
					disableCaching : true,
					autoAbort : true
				});

			} else {
				fileform.getForm().doAction('submit', {
							waitMsg : '正在保存数据，请稍候...',
							waitTitle : '提示',
							url : '../FILEUP/',// 这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
							method : 'post',
							success : function(form, action) {
								var file = action.result;
								var json = {
									id:id,
									projectname : projectname,
									referencemodel : referencemodel,
									nums : nums,
									numsunit : numsunit,
									mainparam : mainparam,
									marketprice : marketprice,
									schedule : schedule,
									installsite : installsite,
									installcondition : installcondition,
									mainuse : mainuse,
									demandreason : demandreason,
									categorys : categorys,
									useunit : useunit, // 使用单位
									remarke : remarke,
									fileid : file.fileId,
									uploadfile : file.fileName
								}
								Ext.Ajax.request({
											url : "../JSON/PEdeclareRemote.saveEquipRegist",
											params : {
												json : Ext.encode(json)
											},
											success : function(response, opt) {
												var value = response.responseText;
												if (value == "true") {
													Ext.MessageBox.hide();
													if (Ext.Msg.alert('提示', '更新成功!')) {
														// main.tabs.setActiveTab(1);
														Ext.getCmp('equipRegistWindow').close();
														Ext.getCmp('equipRegistGrid').getStore().reload();
													}
												} else {
													Ext.Msg.alert("提示", "数据异常，请与管理员联系。")
												}
											},
											disableCaching : true,
											autoAbort : true
										});

							},
							failure : function(form, action) {
								Ext.Msg.alert('提示', "保存失败");
							}
						});
			}
		}

	},
	doApproval : function() {
		var grid = Ext.getCmp('equipRegistGrid');
		var id = "";
		var rows = grid.getSelectionModel().getSelections();// 返回值为 Record 数组
		if (rows.length == 0) {
			Ext.MessageBox.alert('提示', '请选择一条记录!');
			return;
		}
		for (i = 0; i < rows.length; i++) {
			id = id + rows[i].get('id') + ",";
			var approvalState = rows[i].get('approvalstate');
			if (approvalState != '待审批') {
				Ext.MessageBox.alert('提示', '请选择待审批记录!');
				return;
			}
		}
		approvePanel
				.submit("501802", "设备登记申报审批", "设备登记申报审批", id.substring(0, id.length - 1), "EquipRegist", true, equipRegist.approvePanelSuccess, equipRegist.approvePanelFailure);

	},
	approvePanelSuccess : function() {
		var rows = Ext.getCmp("equipRegistGrid").getSelectionModel().getSelections();
		for (i = 0; i < rows.length; i++) {
			rows[i].set('approvalstate', '审批中');
		}
	},

	approvePanelFailure : function() {
		Ext.Msg.alert('提示', '没有送审权限！');
	}
}