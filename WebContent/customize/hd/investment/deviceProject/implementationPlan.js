
// 1、引入命名空间
Ext.namespace("implementationPlan.mainGrid");
/**
 * 设备工程项目执行--设备项目执行管理--实施计划
 * 
 * @class implementationPlan.mainGrid
 * @extends Ext.grid.GridPanel
 */
implementationPlan.mainGrid = Ext.extend(Ext.grid.EditorGridPanel, {// 定义主窗体,主窗体前缀带main
	title : '实施计划', // 扩展时初始化
	id : 'implementationPlanGrid', // 对象名+类型后缀(Grid)
	stripeRows: true, //隔行变色，区分表格行
	listeners : {
		'beforeedit' : function(e) {
			var record = e.record;
			var grid = e.grid;
			// 如果状态为3已下发,则不允许修改.
			if (record.get('status') == 1) {
				if (e.column == 7 && !main.IMPLEMENT) {
					userMultiselect.init(function(el) {
								if (el.store.getCount() > 1) {
									Ext.Msg.alert('提示', '请选择一条记录!');
									return;
								} else {
									var rec = el.store.getAt(0)
									record.set('projectmanagerid', rec == null ? "" : rec.get('userid'));
									record.set('projectmanagername', rec == null ? "" : rec.get('truename'));
								}
								el.win.close();
								grid.fireEvent('afteredit', e);
							});
				}
			} else {
				return false;
			}
		},
		afteredit : function(e) {
			var rec = e.record;
			var grid = e.grid;
			if (rec.dirty) {
				var arr = new Array();
				arr.push(rec.data);
				Ext.Ajax.request({
							url : '../JSON/deviceImplementPlanRemote.saveImplementPlan',
							method : 'post',
							waitMsg : '数据加载中，请稍后....',
							params : {
								implementplanid : Ext.util.JSON.encode(arr)
							},
							success : function(response, opts) {
								var obj = Ext.decode(response.responseText);
								if (obj.success == true) {
									// Ext.Msg.alert('提示', '保存成功!');
									grid.store.commitChanges();
								} else {
									Ext.Msg.alert('提示', '保存失败!');
								}
							},
							failure : function(response, opts) {
								Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
							}
						});
			}
		},
		activate : function(grid) {
			grid.store.load();
		}
	},
	initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
		var grid = this;
		var store = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : '../JSON/deviceImplementPlanRemote.getGridData?d=' + new Date(),
								method : 'post'
							}),
					reader : new Ext.data.JsonReader({
								root : 'results',
								totalProperty : 'totalProperty',
								id : 'implementplanid'
							}, ['implementplanid', 'categorys', {
										name : 'submitdate',
										type : 'date',
										dateFormat : 'Y-m-d'
									}, {
										name : 'completiondate',
										type : 'date',
										dateFormat : 'Y-m-d'
									}, {
										name : 'confirmdate',
										type : 'date',
										dateFormat : 'Y-m-d'
									}, {
										name : 'calibrationdate',
										type : 'date',
										dateFormat : 'Y-m-d'
									}, {
										name : 'agreementSigningdate',
										type : 'date',
										dateFormat : 'Y-m-d'
									}, {
										name : 'contractSigningdate',
										type : 'date',
										dateFormat : 'Y-m-d'
									}, {
										name : 'planningdate',
										type : 'date',
										dateFormat : 'Y-m-d'
									}, 'plansremarks', 'status', 'remark', 'equipregistId', 'projectnum', 'nums', 'numsunit', 'projectname', 'projectmanagerid',
									'projectmanagername','headperson','projectcategorys']),
					pruneModifiedRecords : true,
					baseParams : {
						start : 0,
						limit : 20
					}
				});
		var sm = new Ext.grid.CheckboxSelectionModel();
		Ext.applyIf(this, {
					sm : sm,
					store : store,
					columns : [sm, {
								header : '项目编号',
								dataIndex : 'projectnum',
								width : 100,
								sortable : true
							},  {
								header : '分类<span style="color:red;">*</span>',
								dataIndex : 'categorys',
								width : 100,
								sortable : true,
								editor : new Ext.form.TextField({
									disabled : main.IMPLEMENT
								})
							}, {
								header : '项目名称',
								dataIndex : 'projectname',
								width : 100,
								sortable : true
							},
//								{
//								header : '项目类别',
//								dataIndex : 'projectcategorys',
//								width : 100,
//								sortable : true,
//								renderer : function(value){
//									if(value == 1){
//										return '新建';
//									}else if(value == 2){
//										return '大修';
//									}else {
//										return '未知';
//									}
//								}
//							}, 
								{
								header : '状态',
								dataIndex : 'status',
								width : 100,
								sortable : true,
								renderer : function(value) {
									if (value == 1) {
										return '<span style="color:red;">编制中</span>';
									} else if (value == 3) {
										return '已下发';
									} else {
										return '已下发';// value;
									}
								}
							},{
								header : '单位',
								dataIndex : 'numsunit',
								width : 100,
								sortable : true
							}, {
								header : '数量',
								dataIndex : 'nums',
								width : 100,
								sortable : true
							}, {
								header : '项目主管<span style="color:red;">**</span>',
								dataIndex : 'projectmanagername',
								width : 100,
								sortable : true
//								editor : {
//									xtype : "textfield",
//									anchor : '98%',
//									disabled : main.IMPLEMENT
//								}

							}, {
								header : '卡片和论证书提交时间(使用单位)<span style="color:red;">*</span>',
								dataIndex : 'submitdate',
								width : 200,
								sortable : true,
								editor : new Ext.form.DateField({
											format : 'Y-m-d',
											disabled : main.IMPLEMENT
										}),
								renderer : Ext.util.Format.dateRenderer("Y-m-d")

							}, {
								header : '可行性论证完成时间<span style="color:red;">*</span>',
								dataIndex : 'completiondate',
								width : 130,
								sortable : true,
								editor : new Ext.form.DateField({
											format : 'Y-m-d',
											disabled : main.IMPLEMENT
										}),
								renderer : Ext.util.Format.dateRenderer("Y-m-d")
							}, {
								header : '技术指标确定时间(技术改造部)<span style="color:red;">*</span>',
								dataIndex : 'confirmdate',
								width : 180,
								sortable : true,
								editor : new Ext.form.DateField({
											format : 'Y-m-d',
											disabled : main.IMPLEMENT
										}),
								renderer : Ext.util.Format.dateRenderer("Y-m-d")
							}, {
								header : '完成招标和定标时间(技术改造部)<span style="color:red;">*</span>',
								dataIndex : 'calibrationdate',
								width : 200,
								sortable : true,
								editor : new Ext.form.DateField({
											format : 'Y-m-d',
											disabled : main.IMPLEMENT
										}),
								renderer : Ext.util.Format.dateRenderer("Y-m-d")
							}, {
								header : '技术协议签订时间(使用单位)<span style="color:red;">*</span>',
								dataIndex : 'agreementSigningdate',
								width : 170,
								sortable : true,
								editor : new Ext.form.DateField({
											format : 'Y-m-d',
											disabled : main.IMPLEMENT
										}),
								renderer : Ext.util.Format.dateRenderer("Y-m-d")
							}, {
								header : '合同签订时间(签订合同单位)<span style="color:red;">*</span>',
								dataIndex : 'contractSigningdate',
								width : 170,
								sortable : true,
								editor : new Ext.form.DateField({
											format : 'Y-m-d',
											disabled : main.IMPLEMENT
										}),
								renderer : Ext.util.Format.dateRenderer("Y-m-d")
							}, {
								header : '实施计划说明<span style="color:red;">*</span>',
								dataIndex : 'plansremarks',
								width : 160,
								editor : new Ext.form.TextField({
									disabled : main.IMPLEMENT
								}),
								sortable : true
							}, {
								header : '计划编制时间',
								dataIndex : 'planningdate',
								width : 100,
								sortable : true,
								renderer : Ext.util.Format.dateRenderer("Y-m-d")
							}, {
								header : '备注<span style="color:red;">*</span>',
								dataIndex : 'remark',
								width : 100,
								editor : new Ext.form.TextField({
									disabled : main.IMPLEMENT
								}),
								sortable : true
							}],
					bbar : new Ext.PagingToolbar({
								pageSize : 20,
								store : store,
								displayInfo : true,
								displayMsg : '当前行数{0} - {1} 共 {2} 行',
								emptyMsg : "未查询到数据"
							}),//
					tbar : ['-', {
								xtype : 'deviceProjectDateComboxBox',
								projectDataType : 1,
								listeners : {
									beforequery : function(qe) {
										delete qe.combo.lastQuery;
									},
									select : function(combo, record, index) {
										grid.store.baseParams = {
											approvaltime : record.get('value'),
											start : 0,
											limit : 20
										};
										grid.store.load();
									}
								}
							},'-',{
								text : '任务指派',
								iconCls : 'icon-projectHistory-16',
								disabled : main.APPOINT,
								handler : function(){
									var arr = new Array();
									var recs = grid.getSelectionModel().getSelections();
									if (recs.length == 0) {
										Ext.Msg.alert('提示', '请选择一条记录!');
										return false;
									}
									
									userMultiselect.init(function(el) {
										if (el.store.getCount() > 1) {
											Ext.Msg.alert('提示', '请选择一条记录!');
											return;
										} else {
											var headperson = el.store.getAt(0);
											Ext.Ajax.request({
												url : '../JSON/untilsRemote.getRolesByUser2?d='+new Date(),
												method : 'post',
												params : {projectmanagerid : headperson.get('userid')},
												success : function(response, opts) {
													var obj = Ext.decode(response.responseText);
													var isSzr = check_roles(obj.data,"4664301");//室主任角色
													var isYwzg = check_roles(obj.data,"4664304");//业务主管
//													如果当前登录是计划员。要验证选择的是否是室主任
													if(main.PLANER){
														if(isSzr){
															for (var i = 0; i < recs.length; i++) {
																var rec = recs[i];
																if (rec.get('status') != 1) {
																	Ext.Msg.alert('提示', '请选择未下发的数据!');
																	return false;
																}
																rec.set('projectmanagerid', headperson == null ? "" : headperson.get('userid'));
																rec.set('projectmanagername', headperson == null ? "" : headperson.get('truename'));
																rec.set('headperson',headperson == null ? "" : headperson.get('truename'));
																arr.push(rec.data);
															}
															el.win.close();
															Ext.Ajax.request({
																url : '../JSON/deviceImplementPlanRemote.saveImplementPlan',
																method : 'post',
																waitMsg : '数据加载中，请稍后....',
																params : {
																	implementplanid : Ext.util.JSON.encode(arr)
																},
																success : function(response, opts) {
																	var obj = Ext.decode(response.responseText);
																	if (obj.success == true) {
																		grid.store.commitChanges();
																		Ext.Msg.alert('提示', '保存成功!');
																	} else {
																		Ext.Msg.alert('提示', '保存失败!');
																	}
																},
																failure : function(response, opts) {
																	Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
																}
															});
														}else{
															Ext.Msg.alert('提示', '请选择室主任!');
															return false;
														}
													}else{
														if(isYwzg){
															for (var i = 0; i < recs.length; i++) {
																var rec = recs[i];
																if (rec.get('status') != 1) {
																	Ext.Msg.alert('提示', '请选择未下发的数据!');
																	return false;
																}
																rec.set('projectmanagerid', headperson == null ? "" : headperson.get('userid'));
																rec.set('projectmanagername', headperson == null ? "" : headperson.get('truename'));
																arr.push(rec.data);
															}
															el.win.close();
															Ext.Ajax.request({
																url : '../JSON/deviceImplementPlanRemote.saveImplementPlan',
																method : 'post',
																waitMsg : '数据加载中，请稍后....',
																params : {
																	implementplanid : Ext.util.JSON.encode(arr)
																},
																success : function(response, opts) {
																	var obj = Ext.decode(response.responseText);
																	if (obj.success == true) {
																		grid.store.commitChanges();
																		Ext.Msg.alert('提示', '保存成功!');
																	} else {
																		Ext.Msg.alert('提示', '保存失败!');
																	}
																},
																failure : function(response, opts) {
																	Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
																}
															});
														}else{
															Ext.Msg.alert('提示', '请选择业务主管!');
															return false;
														}
														
													}
													
												}
											});

										}
									});
									
								}
							},'-', {
								text : '下发',
								iconCls : 'edit1',
								disabled : main.HEADER,
								handler : function() {
									var recs = grid.getSelectionModel().getSelections();
									if (recs.length == 0) {
										Ext.Msg.alert('提示', '请选择一条记录!');
										return false;
									}
									var arr = new Array();
									for (var i = 0; i < recs.length; i++) {
										var rec = recs[i];
										if (rec.get('status') != 1) {
											Ext.Msg.alert('提示', '请选择编制中的数据!');
											return false;
										} else if (rec.get('projectmanagerid') == null || rec.get('projectmanagerid') == "") {
											Ext.Msg.alert('提示', '请选择项目负责人后在下发!');
											return false;
										}
										arr.push(rec.get('implementplanid'));
									}
									Ext.Ajax.request({
												url : '../JSON/deviceImplementPlanRemote.sendImplementPlan',
												method : 'post',
												waitMsg : '数据加载中，请稍后....',
												params : {
													implementplanid : Ext.util.JSON.encode(arr)
												},
												success : function(response, opts) {
													var obj = Ext.decode(response.responseText);
													if (obj.success == true) {
														Ext.Msg.alert('提示', '下发成功!');
														grid.store.load();
													} else {
														Ext.Msg.alert('提示', '下发失败!');
														// 你后台返回success 为
														// false时执行的代码
													}
													// console.dir(obj);
												},
												failure : function(response, opts) {
													Ext.Msg.alert('提示', '数据问题,请与管理员联系!');
													// console.log('server-side
													// failure with status code
													// ' + response.status);
												}
											});
								}
							}]

				})
		implementationPlan.mainGrid.superclass.initComponent.call(this);// 必须放在末尾,否则出错
	}
})
// 3、注册控件
Ext.reg('implementationPlanMainGrid', implementationPlan.mainGrid);// 第一个参数为自定义控件的xtype
