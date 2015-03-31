Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var contractManagement2 = {
	importForm : null,// form表单
	selectedRowId : null,
	RawText : null,
	RawValue : null,
	theCmpId : null,
	store : null,
	action : null,
	selectDate : null
};

// 定义方法,获取变量
contractManagement2.getTheRowId = function() {
	return contractManagement2.selectedRowId
}
contractManagement2.setTheRowId = function(value) {
	contractManagement2.selectedRowId = value;
}

contractManagement2.getStore = function() {
	return contractManagement2.store;
}
contractManagement2.setStore = function(value) {
	contractManagement2.store = value;
}

contractManagement2.getAction = function() {
	return contractManagement2.action;
}
contractManagement2.setAction = function(value) {
	contractManagement2.action = value;
}

contractManagement2.getSelectDate = function() {
	return contractManagement2.selectDate;
}
contractManagement2.setSelectDate = function(value) {
	contractManagement2.selectDate = value;
}

/*
 * 多行表头组定义,仅定义合并列,即非最末行表头.EXTJS有示例. new Ext.grid.GridPanel({plugins: group,...})
 * 
 * @type
 * 
 * var group = new Ext.ux.grid.ColumnHeaderGroup({//注:数组元素也为数组类型 rows :
 * [[{header : '',colspan : 5}, {header : '签定单位',colspan : 4,align : 'center'},
 * {header : '',colspan : 5}]] });
 * 
 */

// 1、引入命名空间
Ext.namespace("contractManagement2.mainGrid");
/*
 * 设备工程项目执行--工程项目执行管理--采购合同管理 TAB 3
 * 
 * @class contractManagement.mainGrid @extends Ext.grid.GridPanel
 */
// 2、封装
contractManagement2.mainGrid = Ext.extend(Ext.grid.EditorGridPanel, {// 定义主窗体,主窗体前缀带main
	title : '合同管理', // 扩展时初始化
	id : 'contractManagementGrid', // 对象名+类型后缀(Grid)
	loadMask : {
		msg : '正在加载数据,请稍后...'
	},
	frame : true, // True表示为面板的边框外框可自定义的
	columnLines : true,// True表示为在列分隔处显示分隔符
	stripeRows : true, // 隔行变色，区分表格行
	clicksToEdit : 3, // 表示点击多少次数才可以编辑表格
	// collapsible: true, //是否在右上角显示收缩按钮
	// animCollapse: true, //表示收缩（闭合）面板时，显示动画效果
	trackMouseOver : true, // 鼠标在行上移动时显示高亮
	enableColumnMove : false,// 禁止用户拖动表头
	viewConfig : {
		enableRowBody : true
	},
	listeners : {
		"rowclick" : function(grid, rowIndex, e) {
			Ext.getCmp("newButton").setDisabled(false);
			Ext.getCmp("updateButton").setDisabled(false);
			Ext.getCmp("deleteButton").setDisabled(false);
			Ext.getCmp("sendButton").setDisabled(false);

			var r = grid.store.getAt(rowIndex);
			// alert(r.get("id"));
			contractManagement2.setTheRowId(r.get("engineeringContractId"));
			// contractManagement2.getTheRowId = r.get("id");
		},
		'activate' : function(grid) {
			grid.store.load();
		}

	},
	initComponent : function() {// 事件绑定不要放在初始时,可以放在扩展时或Renderer中.
		var grid = this;

		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/engineeringProject_EngineeringProjectRemote.getAll?d=' + new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						totalProperty : 'totalProperty',
						id : 'engineeringContractId'
					}, ['engineeringContractId', 'projectCode', 'projectName', 'contractCode', 'contractName', 'partTwo', 'fund', 'fundUnit', 'partOne', 'contractLevel',
							'unitName', 'workPerson', 'contractManagerPerson', 'superiorPerson', 'uploadFileId', 'uploadFile', 'status', 'remarks', 'approvalLog', 'ymd'])
				// autoLoad : true,
				/*
				 * baseParams : { start : 0, limit : 25, time : 211 }
				 */
			});
		// contractManagement2.store = store;//保存到全局变量
		contractManagement2.setStore(store);// 保存到全局变量

		var rm = new Ext.grid.RowNumberer({
					header : "序号",
					width : 40
				});
		var sm = new Ext.grid.CheckboxSelectionModel({
					singleSelect : true
				});// 只能单选
		// var sm = new
		// Ext.grid.CheckboxSelectionModel({handleMouseDown:Ext.emptyFn});//只能勾选前面的方格,可以多选

		var continentGroupRow = new Ext.ux.grid.ColumnHeaderGroup({
					// 注:数组元素也为数组类型
					// 多表头
					rows : [[{
								header : '',
								colspan : 8,
								align : 'center'
							}, {
								header : '签定单位',
								colspan : 4,
								align : 'center'
							}, {
								header : '',
								colspan : 4,
								align : 'center'
							}]]
				});

		var cm = new Ext.grid.ColumnModel([rm, {
			header : '项目编号',
			dataIndex : 'projectCode',
			width : 150,
			sortable : true

				/*
				 * renderer : function(value, cellmeta, record, rowIndex,
				 * columnIndex,store) { //var partId = record.get("id"); var
				 * partId = 3333; return "<a
				 * href=javascript:openSearchDataWindow('"+partId+"','"+value+"')>"+"<font
				 * color='blue'><u>"+ value + "</u></font></a>"; }
				 */
			}, {
			header : '项目名称',
			dataIndex : 'projectName',
			width : 150,
			sortable : true
		}, {
			header : '状态',
			dataIndex : 'status',
			width : 100,
			sortable : true,
			renderer : function(value, cellmeta, record, rowIndex) {
				var status = record.get('status');
				if (status == '编制中') {
					return '<font color="red">编制中</font>';
				} else if (status == '审批中') {
					return '审批中';
				} else if (status == '已审批') {
					return '<font color="green">已审批</font>';
				} else if (status == '已下发') {
					return '<font color="green">已下发</font>';
				} else {
					return value;
				}
				/*
				 * if (status == 1) { return '编制中'; } else if (status == 2) {
				 * return '审批中'; } else if (status == 3) { return '已审批'; } else {
				 * return value; }
				 */
			}
		}, {
			header : '合同编号',
			dataIndex : 'contractCode',
			width : 150,
			sortable : true
		}, {
			header : '合同名称',
			dataIndex : 'contractName',
			width : 150,
			sortable : true
		}, {
			header : '乙方',
			dataIndex : 'partTwo',
			width : 100,
			align : 'center',
			sortable : true
		}, {
			header : '单位名称',
			dataIndex : 'unitName',
			width : 100,
			align : 'center',
			sortable : true
		}, {
			header : '经办人',
			dataIndex : 'workPerson',
			width : 150,
			align : 'center',
			sortable : true
		}, {
			header : '合同管理员',
			dataIndex : 'contractManagerPerson',
			width : 150,
			align : 'center',
			sortable : true
		}, {
			header : '行政分管领导',
			dataIndex : 'superiorPerson',
			width : 150,
			align : 'center',
			sortable : true
		}, {
			header : '金额',
			dataIndex : 'fund',
			width : 100,
			align : 'center',
			sortable : true
		}, {
			header : '金额单位',
			dataIndex : 'fundUnit',
			width : 100,
			align : 'center',
			sortable : true
		}, {
			header : '合同秘级',
			dataIndex : 'contractLevel',
			width : 100,
			align : 'center',
			sortable : true
		}, {
			header : '审批记录',
			dataIndex : '',
			width : 100,
			align : 'center',
			sortable : true,
			renderer : function(value, cellmeta, record, rowIndex) {
				var id = record.get('engineeringContractId');
				if (record.get('status') != 1) {
					return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
				}
			}
		}, {
			header : '备注',
			dataIndex : 'remarks',
			width : 100,
			align : 'center',
			sortable : true
		}]);

		// 上工具条1
		var tbar1 = new Ext.Toolbar({
					items : ['-', {
								id : "newButton",
								text : '新建',
								iconCls : 'add1',
								disabled : false,
								handler : function() {
									contractManagement2.setAction("add");// 新增
									var win = new contractManagement2.contractEditorWin({
												loadForm : function(form, fileForm) {

												}
											});
									win.show();
								}
							}, '-', {
								id : "updateButton",
								text : '修改',
								iconCls : 'edit1',
								disabled : true,
								handler : function() {
									contractManagement2.setAction("update");// 新增
									var recode = grid.getSelectionModel().getSelected();
									if (recode.get('status') != "编制中") {
										Ext.Msg.alert('提示', '请选择编制中的记录!');
										return;
									}
									var win = new contractManagement2.contractEditorWin({
												loadForm : function(mainForm, fileForm) {
													// Ext.getCmp('unitNameId').setTextValue("你妹");
													mainForm.getForm().loadRecord(recode);
													fileForm.getForm().loadRecord(recode);
												}
											});
									win.show();
									// 这个单位的赋值比较特殊点,要单独处理
									Ext.getCmp('unitNameId').setTextValue(recode.get('unitName'));
									Ext.getCmp('projectCode').setDisabled(true);
									Ext.getCmp('projectName').setDisabled(true);
								}
							}, '-', {
								id : "deleteButton",
								text : '删除',
								iconCls : 'del1',
								disabled : true,
								handler : function() {
									var recode = grid.getSelectionModel().getSelected();
									if (recode.get('status') != "编制中") {
										Ext.Msg.alert('提示', '请选择编制中的记录!');
										return;
									}

									var isbox = Ext.MessageBox.confirm('提示', "您确定要删除吗?", function(btn, text) {
												if (btn == 'yes') {
													var engineeringContractId = contractManagement2.getTheRowId();

													var getSelectStringUrl = "../JSON/engineeringProject_EngineeringProjectRemote.delThisModel";
													var conn = synchronize.createXhrObject();
													conn.open('POST', getSelectStringUrl, false);// false同步,运行到此程序需要等待返回
													conn.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");// 如果想通过send发送参数,这个必须
													conn.send("engineeringContractId=" + engineeringContractId);
													// conn.send(null);
													if (conn.responseText == "1") {
														Ext.MessageBox.show({
																	title : "提示",
																	msg : "删除成功!",
																	buttons : Ext.MessageBox.OK,
																	icon : Ext.MessageBox.INFO,
																	maxWidth : 800,
																	minWidth : 300
																});
														// contractManagement2.store.load({start
														// : 0,limit : 25,time :
														// 0});
														contractManagement2.getStore().load({
																	start : 0,
																	limit : 25,
																	time : 0
																});
														return;
													} else if (conn.responseText == "0") {
														Ext.MessageBox.show({
																	title : "提示",
																	msg : "删除失败!",
																	buttons : Ext.MessageBox.OK,
																	icon : Ext.MessageBox.INFO,
																	maxWidth : 800,
																	minWidth : 300
																});
														return;
													}

												}
											})
								}
							}, '-', {
								id : "sendButton",
								text : '送审',
								iconCls : 'icon-importTasks',
								disabled : true,
								handler : function() {
									// 这里限制了选择,只能选择一条数据
									var recs = grid.getSelectionModel().getSelections();// 获取勾选的记录集
									var arr = new Array();
									if (recs.length == 0) {
										Ext.Msg.alert('提示', '请选择一条记录!');
										return;
									}
									var bool = true
									for (var i = 0; i < recs.length; i++) {
										arr.push(recs[i].get('engineeringContractId'));
										if (recs[i].get('status') != '编制中') {// 如果选中的记录行有其中一条的状态不是'编制中'
											Ext.Msg.alert("提示", "请选择编制中的数据!");
											return;
										}
									}
									/*
									 * //这里的参数需要修改
									 * Untils.approvePanel.submit('600000',
									 * "工程项目合同审批","工程项目合同审批", arr,
									 * "DeviceContractmanagement", true,
									 * function() { Ext.Msg.alert('提示',
									 * '送审成功!'); grid.store.load(); },
									 * function() { Ext.Msg.alert('提示',
									 * '提交失败!'); });
									 */
									Untils.approvePanel.submit("487800", "工程项目合同管理", "工程项目合同管理", arr, "ContractManagement2", true, function() {
												Ext.Msg.alert('提示', '送审成功!');
												contractManagement2.getStore().baseParams = {
													start : 0,
													limit : 25,
													time : contractManagement2.getSelectDate() == null ? 0 : contractManagement2.getSelectDate()
												};
												contractManagement2.getStore().load();
											}, function() {
												Ext.Msg.alert('提示', '提交失败!');
											});

								}
							}, '-']
				});

		// 上工具条2
		var tbar2 = new Ext.Toolbar({
					items : ['选择年月：', '<input id="selectDate" type="text" onClick="WdatePicker()" style="width:120px"/>', {
								text : '查询',
								iconCls : 'search1',
								handler : function() {
									// equipreServiceAction.search();//调用搜索方法
									var selectDate = document.getElementById('selectDate').value;// 2009-08-08格式字符串
									contractManagement2.setSelectDate(selectDate);// 保存到全局变量

									contractManagement2.getStore().baseParams = {
										start : 0,
										limit : 25,
										time : contractManagement2.getSelectDate() == null ? 0 : contractManagement2.getSelectDate()
									};
									contractManagement2.getStore().load();
								}
							}]
				});

		var tbar3 = [{
					xtype : 'deviceProjectDateComboxBox2',
					projectDataType : 3,
					listeners : {
						'beforequery' : function(qe) {
							delete qe.combo.lastQuery;
						},
						'select' : function(combo, record, index) {
							grid.store.baseParams = {
								time : record.get('value'),
								start : 0,
								limit : 25
							};
							grid.store.load();
						}
					}
				}];

		var tbar4 = [{
					xtype : 'myTextField',
					id : 'myTextField',
					optionType : 222
				}];

		openSearchDataWindow = function(partId, planId) {
			var win = new contractManagement2.contractEditorWin()
			win.show();
			// createZykSearchDataWindow(planId+'收支台账',partId,planId);
		}

		Ext.applyIf(this, {
					store : store,
					plugins : continentGroupRow,
					cm : cm,
					sm : sm,
					bbar : new Ext.PagingToolbar({
								pageSize : 25,
								store : store,
								displayInfo : true,
								displayMsg : '当前行数{0} - {1} 共 {2} 行',
								emptyMsg : "未查询到数据"
							}),
					tbar : {
						items : [tbar3, tbar1]
					}

				});
		// 默认时间为0
		this.getStore().baseParams = {
			start : 0,
			limit : 25,
			time : contractManagement2.getSelectDate() == null ? 0 : contractManagement2.getSelectDate()
		};
		this.getStore().load();

		contractManagement2.mainGrid.superclass.initComponent.call(this);// 必须放在末尾,否则出错
	}
})
// 3、注册控件
Ext.reg('contractManagementMainGrid2', contractManagement2.mainGrid);// 第一个参数为自定义控件的xtype

// 1、引入命名空间
Ext.namespace('contractManagement2.contractEditorWin');
/*
 * 合同管理编辑窗口
 * 
 * @class contractManagement.contractEditorWin @extends Ext.Window
 */
// 2、封装
contractManagement2.contractEditorWin = Ext.extend(Ext.Window, {
			id : "extendWindowId",
			title : '合同编辑窗口',
			width : 600,
			modal : true,// window显示时对其后面的一切内容进行遮罩
			constrainHeader : true, // window头必须在窗口中
			maximizable : true, // 添加最大按钮
			// height : 300,
			// layout : 'fit',
			closeAction : 'close',// 当关闭按钮被点击时执行的动作
			plain : false,// True表示为渲染window body的背景为透明的背景
			// items : importjyjh.getimportform(o)//formPanel
			buttonAlign : "right",
			// 窗口是否编辑(可修改)
			isEdit : true,
			// 页面加载时,加载窗口内的表单元素
			loadForm : function(form, fileForm) {

			},
			initComponent : function() {
				var win = this;
				// 获取选取行的ID
				// alert(contractManagement2.getTheRowId());

				// //////////////////////////////////////新增选择审批人/////////////////////

				// 调用回调函数
				selectUserPanel.callBack = function() {
					var dataStore = userMultiselect.usersore;
					// var store = Ext.getCmp('pingFenGrid').getStore();
					var theCmpId = contractManagement2.theCmpId;
					var outApprover = Ext.getCmp(theCmpId);
					var records = Ext.data.Record.create([{
								name : 'userid'
							}, {
								name : 'truename'
							}]);

					if (dataStore.getCount() > 1) {
						Ext.MessageBox.show({
									title : "提示",
									msg : "请只选择一个用户!!!",
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.INFO,
									maxWidth : 800,
									minWidth : 300
								});
						return;
					}

					// 只会有一个循环
					for (var i = 0; i < dataStore.getCount(); i++) {
						var userid = dataStore.getAt(i).get('userid');
						var truename = dataStore.getAt(i).get('truename');
						// var record = dataStore.getAt(i);
						var data = new records({
									userid : userid,
									truename : truename
								});
						// records.set('userid',userid);
						// records.set('truename',truename);
						// store.add(data);
						outApprover.setValue(truename + "[" + userid + "]");
					}
					Ext.getCmp('userMultiselectWindow').close();
				}
				// //////////////////////////////////////新增选择审批人/////////////////////

				// //////////////////////单位选择/////////////////////////////////////////////////////////////
				// 部门选择的下拉列表树
				var comboBoxTree = new Ext.ux.ComboBoxTree({
							id : "unitNameId",
							width : 350,
							fieldLabel : '单位名称',
							triggerAction : 'all',
							emptyText : '请选择机构!',
							style : 'margin-bottom: 2px;',
							tree : {
								xtype : 'treepanel',
								rootVisible : false,
								loader : new Ext.tree.TreeLoader({
											dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
										}),
								root : new Ext.tree.AsyncTreeNode({
											id : '0',
											text : '根结点'
										})
							},
							onViewClick : function(doFocus) {
								var index = this.view.getSelectedIndexes()[0], s = this.store, r = s.getAt(index);
								if (r) {
									this.onSelect(r, index);
								} else {
									// this.collapse();
								}
								if (doFocus !== false) {
									this.el.focus();
								}
							},

							// all:所有结点都可选中
							// exceptRoot：除根结点，其它结点都可选(默认)
							// folder:只有目录（非叶子和非根结点）可选
							// leaf：只有叶子结点可选
							selectNodeModel : 'all'
						});

				// 添加选择事件
				comboBoxTree.on('select', function(combo, record, index) {
							// var instcode = record.id;
							// var a =
							// Ext.getCmp("equipreServiceGridPanelId").getSelectionModel().record;
							// var b =
							// Ext.getCmp("equipreServiceGridPanelId").getSelectionModel().getSelected();
							// 写法一
							// equipreServiceGrid.RawText =
							// comboBoxTree.getRawValue();//保存全局变量
							// equipreServiceGrid.RawValue =
							// comboBoxTree.getValue();//保存全局变量
							// 写法二
							// var a =
							// Ext.getCmp('unitNameId').setTextValue("你妹");
							contractManagement2.RawText = record.attributes.text;// 保存全局变量
							contractManagement2.RawValue = record.attributes.id;// 保存全局变量

						});
				// //////////////////////单位选择/////////////////////////////////////////////////////////////

				Ext.applyIf(this, {
							items : [{
										xtype : 'form',
										id : 'contractEditorMainForm',
										border : false,
										items : [{
													xtype : 'panel',
													layout : 'column',
													border : false,
													items : [{
																xtype : 'panel',
																layout : 'form',
																columnWidth : .5,
																border : false,
																labelWidth : 60,
																bodyStyle : 'padding:5px;',
																defaults : {
																	anchor : '95%'
																},
																items : [{
																			xtype : 'hidden',
																			id : 'uploadFileId',
																			name : 'uploadFileId'
																		}, {
																			xtype : "textfield",
																			fieldLabel : '项目编号',
																			id : 'projectCode',
																			name : 'projectCode',
																			anchor : '98%',
																			allowBlank : false,
																			blankText : "不能为空",
																			disabled : false,
																			listeners : {
																				afterrender : function(cmp) {
																					cmp.el.on("click", function() {
																								// alert("fdasfds");
																								// projectMultiselect.init(selectProjectPanelCallBack);//调用回调函数
																								projectMultiselect.init();

																							})
																				}
																			}
																		}, {
																			xtype : "textfield",
																			fieldLabel : '合同编号',
																			id : 'contractCode',
																			name : 'contractCode',
																			anchor : '98%',
																			allowBlank : false,
																			blankText : "不能为空"
																		}, {
																			xtype : 'combo',
																			fieldLabel : '乙方',
																			mode : "remote",
																			forceSelection : true,
																			allowBlank : false,
																			triggerAction : 'all', // 显示所有下列数.必须指定为'all'
																			emptyText : '请选择...', // 没有默认值时,显示的字符串
																			store : new Ext.data.JsonStore({ // 填充的数据
																				url : "../JSON/untilsRemote.getSupplierData",
																				fields : new Ext.data.Record.create(['text', 'value']), // 也可直接为["text","value"]
																				root : "results",
																				totalProperty : 'totalProperty'
																			}),
																			pageSize : 10,
																			hiddenName : 'partTwo',//'partyb',// 不能与name相同.
																			// hiddenValue:'value',
																			valueField : 'value', // 传送的值
																			displayField : 'text' // UI列表显示的文本
//																			readOnly : !panel.isEdit
																		}, /*
																			 * {
																			 * xtype :
																			 * "textfield",
																			 * fieldLabel :
																			 * '乙方',
																			 * id :
																			 * 'partTwo',
																			 * name :
																			 * 'partTwo',
																			 * anchor :
																			 * '98%',
																			 * allowBlank :
																			 * false,
																			 * blankText :
																			 * "不能为空" },
																			 */{
																			xtype : "textfield",
																			fieldLabel : '金额单位',
																			id : 'fundUnit',
																			name : 'fundUnit',
																			anchor : '98%',
																			allowBlank : false,
																			blankText : "不能为空",
																			decimalPrecision : 4,// 小数位数
																			maxLength : 20,// 最大长度
																			maxLengthText : '不能超过10个字符，请重新输入！',
																			maxValue : 999999999
																			// 最大值

																	}]
															}, {
																xtype : 'panel',
																layout : 'form',
																columnWidth : .5,
																border : false,
																labelWidth : 60,
																bodyStyle : 'padding:5px;',
																defaultType : 'textfield',
																defaults : {
																	anchor : '95%'
																},
																items : [{
																			xtype : "textfield",
																			fieldLabel : '项目名称',
																			id : 'projectName',
																			name : 'projectName',
																			anchor : '98%',
																			allowBlank : false,
																			blankText : "不能为空",
																			disabled : false,
																			listeners : {
																				afterrender : function(cmp) {
																					cmp.el.on("click", function() {
																								// alert("fdasfds");
																								// projectMultiselect.init(selectProjectPanelCallBack);//调用回调函数
																								projectMultiselect.init();
																							})
																				}
																			}
																		}, {
																			xtype : "textfield",
																			fieldLabel : '合同名称',
																			id : 'contractName',
																			name : 'contractName',
																			anchor : '98%',
																			allowBlank : false,
																			blankText : "不能为空"
																		}, {
																			xtype : "textfield",
																			fieldLabel : '金额',
																			id : 'fund',
																			name : 'fund',
																			anchor : '98%',
																			allowDecimals : true,
																			allowBlank : false,
																			decimalPrecision : 4,// 小数位数
																			maxLength : 20,// 最大长度
																			maxLengthText : '不能超过10个字符，请重新输入！',
																			maxValue : 999999999
																		}, {
																			xtype : "textfield",
																			fieldLabel : '合同密级',
																			id : 'contractLevel',
																			name : 'contractLevel',
																			anchor : '98%',
																			allowBlank : false,
																			blankText : "不能为空"
																		}]
															}]
												}, {
													xtype : 'panel',
													border : false,
													bodyStyle : 'padding:5px;',
													items : [{
																xtype : 'fieldset',
																title : '签定单位',
																layout : 'column',
																items : [{
																			xtype : 'panel',
																			layout : 'form',
																			columnWidth : .5,
																			border : false,
																			labelWidth : 70,
																			defaults : {
																				anchor : '95%'
																			},
																			items : [
																					/*
																					 * {
																					 * xtype:"textfield",
																					 * fieldLabel:'单位名称',
																					 * id:'unitName',
																					 * name:'unitName',
																					 * anchor:'98%',
																					 * allowBlank:false,
																					 * blankText:"不能为空", }
																					 */
																					comboBoxTree, {
																						xtype : "textfield",
																						fieldLabel : '合同管理员',
																						id : 'contractManagerPerson',
																						name : 'contractManagerPerson',
																						anchor : '98%',
																						allowBlank : false,
																						emptyText : '点击,请选择人员',
																						blankText : "不能为空",
																						listeners : {
																							afterrender : function(cmp) {

																								cmp.el.on("click", function() {
																											contractManagement2.theCmpId = cmp.id;
																											// alert("fdasfds");
																											userMultiselect.init(selectUserPanel.callBack);// 调用回调函数
																										})
																							}
																						}
																					}]
																		}, {
																			xtype : 'panel',
																			layout : 'form',
																			columnWidth : .5,
																			labelWidth : 80,
																			border : false,
																			defaults : {
																				anchor : '95%'
																			},
																			items : [{
																						xtype : "textfield",
																						fieldLabel : '经办人',
																						id : 'workPerson',
																						name : 'workPerson',
																						anchor : '98%',
																						allowBlank : false,
																						emptyText : '点击,请选择人员',
																						blankText : "不能为空",
																						listeners : {
																							afterrender : function(cmp) {
																								cmp.el.on("click", function() {
																											contractManagement2.theCmpId = cmp.id;
																											// alert("fdasfds");
																											userMultiselect.init(selectUserPanel.callBack);// 调用回调函数
																										})
																							}
																						}
																					}, {
																						xtype : "textfield",
																						fieldLabel : '行政分管领导',
																						id : 'superiorPerson',
																						name : 'superiorPerson',
																						anchor : '98%',
																						allowBlank : false,
																						emptyText : '点击,请选择人员',
																						blankText : "不能为空",
																						listeners : {
																							afterrender : function(cmp) {

																								cmp.el.on("click", function() {
																											contractManagement2.theCmpId = cmp.id;
																											// alert("fdasfds");
																											userMultiselect.init(selectUserPanel.callBack);// 调用回调函数
																										});
																							}
																						}
																					}]
																		}]
															}]
												}]
									}, {
										xtype : 'form',
										border : false,
										// layout : 'form',
										labelWidth : 60,
										id : 'fileFormPanel',
										bodyStyle : 'padding:5px;',
										fileUpload : true,
										items : [{
													xtype : !win.isEdit ? 'hidden' : 'fileuploadfield',
													id : 'form-file',
													fieldLabel : '上传附件',
													name : 'uploadFile',
													anchor : '90%',
													buttonText : '浏览...',
													allowBlank : false,
													blankText : '不能为空!'
												}, {
													xtype : win.isEdit ? 'hidden' : 'displayfield',
													name : 'uploadFile',
													fieldLabel : '合同文件',
													listeners : {
														afterrender : function(field) {
															var ID = Ext.getCmp('uploadFileId').getValue();
															var ORIGINALNAME = Ext.getCmp('form-file').getValue();
															var value = "<a href='../FILEDOWN/?ID="// 这用的是下载。需传值文件的id和文件名，才能查到
																	+ ID + "&ORIGINALNAME=" + encodeURI(encodeURI(ORIGINALNAME)) + "' cursor：hand>" + ORIGINALNAME + "</a>";
															field.setValue(value);
														}
													}
												}]
									}],
							buttons : [{
								text : '确定',
								handler : function() {
									var form1 = win.findById("contractEditorMainForm");
									var data = form1.getForm().getValues();
									if (!form1.getForm().isValid()) {
										return;
									}
									var form2 = win.findById("fileFormPanel");
									var data = form2.getForm().getValues();
									if (!form2.getForm().isValid()) {
										return;
									}

									var fileid = "";// 上传文件的ID
									var filename = "";// 上传文件的name

									// 首先上传附件并且保存
									Ext.getCmp('fileFormPanel').getForm().doAction('submit', {
										waitMsg : '正在保存数据，请稍候...',
										waitTitle : '提示',
										url : '../FILEUP/',// 这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
										method : 'post',
										success : function(form, action) {
											fileid = action.result.fileId; // 获取上传后的文件ID
											filename = action.result.fileName; // 获取上传后的文件名字

											// 其次,保存剩余的表格
											var projectCode = common.removeAllSpace(document.getElementById('projectCode').value);// 项目编号
											var contractCode = common.removeAllSpace(document.getElementById('contractCode').value);// 合同编号
											var partTwo = common.removeAllSpace(document.getElementById('partTwo').value);// 乙方
											var fundUnit = common.removeAllSpace(document.getElementById('fundUnit').value);// 金额单位
											var projectName = common.removeAllSpace(document.getElementById('projectName').value);// 项目名称
											var contractName = common.removeAllSpace(document.getElementById('contractName').value);// 合同名称
											var fund = common.removeAllSpace(document.getElementById('fund').value);// 金额
											var contractLevel = common.removeAllSpace(document.getElementById('contractLevel').value);// 合同密级
											var unitName = common.removeAllSpace(document.getElementById('unitNameId').value);// 单位名称
											var contractManagerPerson = common.removeAllSpace(document.getElementById('contractManagerPerson').value);// 合同管理员
											var workPerson = common.removeAllSpace(document.getElementById('workPerson').value);// 经办人
											var superiorPerson = common.removeAllSpace(document.getElementById('superiorPerson').value);// 行政分管领导
											// var uploadFile =
											// common.removeAllSpace(document.getElementById('uploadFile').value);//上传附件
											var projectId = projectMultiselect.engineeringContractId;// 如果选取了项目编号,这个项目ID就有,反之则无
											var action = contractManagement2.getAction();// 获取是
																							// add
																							// or
																							// update
											var engineeringContractId = contractManagement2.getTheRowId();// 获取本实体表的主键ID

											var getSelectStringUrl = "../JSON/engineeringProject_EngineeringProjectRemote.addOrUpdateEngineeringProject";
											var conn = synchronize.createXhrObject();
											conn.open('POST', getSelectStringUrl, false);// false同步,运行到此程序需要等待返回
											conn.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");// 如果想通过send发送参数,这个必须
											conn.send("projectCode=" + projectCode + "&contractCode=" + contractCode + "&partTwo=" + partTwo + "&fundUnit=" + fundUnit
													+ "&projectName=" + projectName + "&contractName=" + contractName + "&fund=" + fund + "&contractLevel=" + contractLevel
													+ "&unitName=" + unitName + "&contractManagerPerson=" + contractManagerPerson + "&workPerson=" + workPerson
													+ "&superiorPerson=" + superiorPerson + "&uploadFileId=" + fileid + "&uploadFile=" + filename + "&status=1" // 默认为1
													+ "&projectId=" + projectId + "&action=" + action + "&engineeringContractId=" + engineeringContractId);
											// conn.send(null);
											if (conn.responseText == "1") {
												Ext.MessageBox.show({
															title : "提示",
															msg : "操作成功!",
															buttons : Ext.MessageBox.OK,
															icon : Ext.MessageBox.INFO,
															maxWidth : 800,
															minWidth : 300
														});
												// contractManagement2.store.load({start
												// : 0,limit : 25,time : 0});
												contractManagement2.getStore().load({
															start : 0,
															limit : 25,
															time : 0
														});
												win.close();
												win.destroy();
											} else if (conn.responseText == "0") {
												Ext.MessageBox.show({
															title : "提示",
															msg : "操作失败,请联系系统维护人员查看原因!",
															buttons : Ext.MessageBox.OK,
															icon : Ext.MessageBox.INFO,
															maxWidth : 800,
															minWidth : 300
														});
												return;
											}
										},
										failure : function(form, action) {
											Ext.Msg.alert('提示', "上传文件失败,请检查原因后再保存!");
											return;
										}
									});

									// 直接调用remote的方法,在命名空间的这样写法,类创建不出来
									/*
									 * var engineeringProjectFormVo =
									 * Seam.Remoting.createType("com.sysware.customize.hd.investment.engineeringProject.EngineeringProjectVo");
									 * var a = Ext.getCmp('formId'); var b =
									 * Ext.getCmp('formId').getForm(); var c =
									 * Ext.getCmp('formId').getForm().getValues();
									 * Ext.apply(engineeringProjectFormVo,Ext.getCmp('formId').getForm().getValues());
									 * callSeam("engineeringProject_EngineeringProjectRemote","addEngineeringProject",[engineeringProjectFormVo],contractManagement2.save);
									 * contractManagement2.save =
									 * function(result){ var sign = result;
									 * //alert(sign); if (sign=="{success :
									 * true}"){
									 * 
									 * Ext.MessageBox.show({ title:
									 * ''+'添加成功'+'', msg: ''+'成功增加记录'+'',
									 * buttons: Ext.MessageBox.OK, icon:
									 * Ext.MessageBox.INFO, width:300 }); }else{
									 * wlzlAdd.form.form.reset();
									 * Ext.MessageBox.show({ title:
									 * ''+'添加失败'+'', msg: ''+'增加记录失败,请重新增加'+'',
									 * buttons: Ext.MessageBox.OK, icon:
									 * Ext.MessageBox.ERROR }); }
									 * 
									 * //myGrid.loadvalue(wlzlMain.rightgrid.store,
									 * {start:0,limit:25},{});//重新加载表格
									 * //wlzlMain.lefttree.getRootNode().reload();//重新加载树 }
									 */

								}
							}, {
								text : '取消',
								handler : function() {
									win.close();
									win.destroy();
									// contractManagement2.contractEditorWin.hide();
								}
							}]
						});

				contractManagement2.contractEditorWin.superclass.initComponent.call(this);
			},
			onRender : function(ct, position) {// 扩展渲染,在内部函数的顶层,可以使用this对此对象的引用.注意,不要在镶嵌的函数层次太深,不然this就不是此对象,需要sope指定.
				contractManagement2.contractEditorWin.superclass.onRender.call(this, ct, position);// 必须放在开始
				this.loadForm(this.findById("contractEditorMainForm"), this.findById('fileFormPanel'));
			}
		})
// 3、注册控件
Ext.reg('contractManagement2', contractManagement2.contractEditorWin);// 第一个参数为自定义控件的xtype

