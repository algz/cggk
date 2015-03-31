var civilServiceContract = {

	isEdit : true,
	contracttype : 4,
	
	getPanel : function(){
		var sm = new Ext.grid.CheckboxSelectionModel(); 
		var store = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/deviceContractmanagementRemote.getGridData?d=' + new Date(),
						method : 'post'
					}),
			reader : new Ext.data.JsonReader({
						root : 'results',
						totalProperty : 'totalProperty',
						id : 'contractid'
					}, ['contractid', 'contractcode', 'contractname', 'partyb', 'partybname', 'amount', 'amountUnit', 'secrecy', 'partya', 'partya_name', 'operatorid',
							'equipregistId', 'projectnum', 'projectname', 'contractmanager', 'leader', 'status', 'remark', 'equipregistId', 'fileid', 'filename',
							'contracttype', 'contractlevel','projectcategorys']),
			baseParams : {
				contracttype : 4,
				start : 0,
				limit : 20
			}
		});
		//分页工具栏   
		var paging = new Ext.PagingToolbar({
			store : store,
			pageSize : 20,
			displayInfo : true,
			displayMsg : '第 {0} 到 {1} 条，一共  {2} 条',
			emptyMsg : '没有记录'
		}); 
		var continentGroupRow=[
				{header:' ',align: 'left',colspan: 8},
				{header:'签订单位',align:'center',colspan:4},  
                {header:'',align:'center',colspan:4}
        ];  
		var group = new Ext.ux.grid.ColumnHeaderGroup({  
        	rows: [continentGroupRow]  
        }); 
        
		var cm = new Ext.grid.ColumnModel([sm, {
			header : '项目编号',
			dataIndex : 'projectnum',
			width : 100,
			sortable : true,
			renderer : function(value, cellmeta, record, rowIndex) {
				return "<a href='javascript:void(0);' onclick=civilServiceContract.createContractWin('" + record.get('contractid') + "')>" + value
						+ "</a>";;
			}
		}, {
			header : '项目名称',
			dataIndex : 'projectname',
			width : 100,
			sortable : true
		},	{
			header : '状态',
			dataIndex : 'status',
			width : 100,
			sortable : true,
			renderer : function(value, cellmeta, record, rowIndex) {
				var status = record.get('status');
				if (status == 1) {
					return '<span style="color:red;">编制中</span>';
				} else if (status == 2) {
					return '审批中';
				} else if (status == 3) {
					return '<span style="color:green">已审批</span>';
				}else if (status == -1) {
					return '<span style="color:red">已退回</span>';
				} else {
					return value;
				}
			}
		}, {
			header : '合同编号',
			dataIndex : 'contractcode',
			width : 100,
			sortable : true
		}, {
			header : '合同名称',
			dataIndex : 'contractname',
			width : 100,
			sortable : true
		}, {
			header : '乙方',
			dataIndex : 'partybname',
			width : 100,
			sortable : true
		}, {
			header : '合同级别',
			dataIndex : 'contractlevel',
			width : 100,
			sortable : true,
			renderer : function(value, cellmeta, record, rowIndex) {
				if (record.get('contractlevel') == 1) {
					return '股份合同';
				}else if(record.get('contractlevel') == 2){
					return '集团合同';
				}else{
					return value;
				}
			}
		}, {
			header : '单位名称',
			dataIndex : 'partya',
			width : 100,
			sortable : true
		}, {
			header : '经办人',
			dataIndex : 'operatorid',
			width : 100,
			sortable : true
		}, {
			header : '合同管理员',
			dataIndex : 'contractmanager',
			width : 100,
			sortable : true
		}, {
			header : '行政分管领导',
			dataIndex : 'leader',
			width : 100,
			sortable : true
		}, {
			header : '金额',
			dataIndex : 'amount',
			width : 100,
			sortable : true
		}, {
			header : '金额单位',
			dataIndex : 'amountUnit',
			width : 100,
			sortable : true
		}, {
			header : '合同密级',
			dataIndex : 'secrecy',
			width : 100,
			sortable : true
		}, {
			header : '审批记录',
			dataIndex : '',
			width : 100,
			sortable : true,
			renderer : function(value, cellmeta, record, rowIndex) {
				var id = record.get('contractid');
				if (record.get('status') == 3) {
					return "<a href='javascript:void(0);' onclick=approvalInfoList.showWin('" + id + "')><font color=blue>查看</font></a>";
				}
			}
		}]);
		
		var comboStore = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : "../JSON/untilsRemote.getProjectDateData?d=" + new Date(),
						method : 'POST'
					}),
			reader : new Ext.data.JsonReader({
						totalProperty : 'totalProperty',
						root : 'results',
						id : 'projectDate'
					}, ['text', 'value']),
			baseParams : {
				projectDataType : '1'
			}
		});
		var grid = new Ext.grid.EditorGridPanel({
			title : '合同管理',
			width : 300,
			id : 'civilServiceContractGrid',
			cm : cm, 
			sm : sm,
			columnLines : true,
			stripeRows : true,
			bbar : paging,
			region : 'center',
			clicksToEdit: 1,
			store : store,
			plugins: group,
			loadMask : {
		    	 msg : '正在加载数据，请稍侯……'
		    },
			tbar : new Ext.Toolbar({
				items : ['-', {
					xtype : 'combo',
					mode : 'remote',
					pageSize : 10,
					forceSelection : true,
					triggerAction : 'all',
					emptyText : '请选择...',
					// 弹出选择添加缩放按钮
					resizable : true,
					blankText : '请选择项目日期',
					projectDataType : '1', // 数据获取类型.1实施计划中获取;2执行管理中获取(实施计划状态不为1或2);3合同管理中获取
					valueField : "value",
					displayField : "text",
					store : comboStore
				}, '-', {
						text : '新建',
						iconCls : 'add1',
						disabled : main.CONTRACT,
						handler : function() {civilServiceContract.createContractWin("");}
					}, '-', {
						text : '修改',
						iconCls : 'edit1',
						disabled : main.CONTRACT,
						handler : function() {
							var recs = grid.getSelectionModel().getSelections();
							if(recs.length != 1){
								Ext.Msg.alert('提示', '请选择一条记录!');
								return;
							}
							if (recs[0] == null || (recs[0].get('status') != 1&& recs[0].get('status') != -1)) {
								Ext.Msg.alert('提示', '请选择编制中的记录!');
								return;
							}
							civilServiceContract.createContractWin(recs[0].get('contractid'),true);
						}
					}, '-', {
						text : '删除',
						iconCls : 'del1',
						disabled : main.CONTRACT,
						handler : function() {civilServiceContract.deleteContract();}
					}, '-', {
						text : '送审',
						iconCls : 'icon-importTasks',
						disabled : main.CONTRACT,
						handler : function() {civilServiceContract.doApproval();}
					}]})
		
		});
	
		grid.on('activate', function() { 
			store.reload();
		});
		grid.on('beforeedit',function(obj){
//			修改的列
			var record = obj.record;
			if(record.get('approvalstate')=="待审批"||record.get('approvalstate')=="已退回"){
				return true;
			}else{
				return false;
			}
		});
		grid.on('afteredit',function(obj){
//			修改的列
			var record = obj.record;
			var column = obj.field;
			var value = record.get(column);
			var id = record.get('id');
			Ext.Ajax.request({  
				url: '../JSON/pePlanRemote.editEquipRepairPlan',  
				params: {id : id,column:column,value :value},
				success : function(response, opts) {
					var obj = response.responseText;
					if (obj == "true") {
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
		});
		return grid;
	},
	
	createContractWin : function(id,flag){
		
		if("" == id){//新建
			civilServiceContract.isEdit = true;
		}else{//查看、编辑
			civilServiceContract.isEdit = false;
			if(flag){//编辑
				civilServiceContract.isEdit = true;
			}
		}
		var win = new Ext.Window({
			title : '合同添加窗口',
			width : 600,
			id : 'civilServiceContractWin',
			height : 360,
			autoScroll:false,
			autoDestroy: true,
			resizable: false,  
			buttonAlign : 'center',
			items : [{
				xtype : 'form',
				id : 'contractEditorForm',
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
													name : 'contractid'
												}, {
													xtype : 'hidden',
													name : 'contracttype',
													value : civilServiceContract.contracttype
												}, {
													xtype : 'hidden',
													id : 'equipregistId',
													name : 'equipregistId'
												}, {
													xtype : 'combo',
													mode : 'remote',
													pageSize : 10,
													forceSelection : true,
													triggerAction : 'all',
													emptyText : '请选择...',
													// 弹出选择添加缩放按钮
													resizable : true,
													blankText : '请选择项目编号',				
													valueField : "projectid",
													displayField : "projectnum",
													store : new Ext.data.Store({
														proxy : new Ext.data.HttpProxy({
																	url : '../JSON/civilServiceManageRemote.getProjectNums?d=' + new Date(),
																	method : 'POST'
																}),
														reader : new Ext.data.JsonReader({
																	totalProperty : 'totalProperty',
																	root : 'results',
																	id : 'projectid'
																}, ['projectid', 'projectnum','projectname']),
														baseParams : {
															projectDataType : this.projectDataType
														}
													}),
													fieldLabel : '项目编号',
													allowBlank : false,
													name : 'projectnum',
													projectDataType : civilServiceContract.contracttype,
													listeners : {
														select : function(combo, record, index) {
															var projectname = record.get('projectname');
															var projectid = record.get('projectid');
															var projectcategorys = record.get('projectcategorys')==1?'新建':'大修';
															Ext.getCmp('contractEditorForm').findById('projectname').setValue(projectname);
															Ext.getCmp('contractEditorForm').findById('equipregistId').setValue(projectid);
															Ext.getCmp('contractEditorForm').findById('projectcategorys').setValue(projectcategorys);
														}
													}
												}, {
													xtype : 'textfield',
													fieldLabel : '合同编号',
													name : 'contractcode',
													allowBlank : false,
													maxLength : 50,
													maxLengthText : '最大50个字符!',
													readOnly : !civilServiceContract.isEdit
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
													id : 'partTwo',
													hiddenName : 'partyb',// 不能与name相同.
													// hiddenValue:'value',
													valueField : 'value', // 传送的值
													displayField : 'text', // UI列表显示的文本
													readOnly : !civilServiceContract.isEdit
												}, {
													xtype : 'textfield',
													name : 'amountUnit',
													fieldLabel : '金额单位',
													allowBlank : false,
													value : '万元',
													maxLength : 50,
													maxLengthText : '最大50个字符!',
													readOnly : true
													// !panel.isEdit
											}	, {
													xtype : 'combo',
													hiddenName : 'contractlevel',
													// 作为FORM表单提交时的参数名,并且hiddenName!=id
													// hiddenName
													// :
													// 'yn_life',//
													// 创建一个新的控件,id=hiddenName
													fieldLabel : '合同级别',
													typeAhead : true,// 必须项
													triggerAction : 'all',// 必须项
													lazyRender : true,
													resizable : true,// 是否手动扩展大小,默认false
													mode : 'local',
													forceSelection : true,// 限制输入范围在可选择的文本内
													editable : false,// 不允许输入,只能选择文本列表
													anchor : '95%',
													store : new Ext.data.ArrayStore({
																id : 0,
																fields : ['value', 'text'],
																data : [[1, '股份公司'], [2, '集团公司']]
															}),
													valueField : 'value',
													value : 1,
													displayField : 'text'
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
													fieldLabel : '项目名称',
													id : 'projectname',
													name : 'projectname',
													readOnly : true
												}, {
													name : 'contractname',
													fieldLabel : '合同名称',
													allowBlank : false,
													maxLength : 50,
													maxLengthText : '最大50个字符!'
												}, {
													xtype : 'numberfield',
													fieldLabel : '金额',
													name : 'amount',
													allowDecimals : true,
													allowBlank : false,
													decimalPrecision : 4,// 小数位数
													maxLength : 20,// 最大长度
													maxLengthText : '不能超过10个字符，请重新输入！',
													maxValue : 999999999
													// 最大值
											}	, {
													name : 'secrecy',
													fieldLabel : '合同密级',
													// allowBlank
													// :
													// false,
													maxLength : 50,
													maxLengthText : '最大50个字符!'
												},{
													xtype : 'hidden',
													fieldLabel : '项目类别',
													id : 'projectcategorys',
													name : 'projectcategorys',
													readOnly : true
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
													items : [{
																xtype : 'textfield',
																fieldLabel : '单位名称',
																id : 'partya',
																name : 'partya',
																allowBlank : false,
																maxLength : 50,
																maxLengthText : '最大50个字符!',
																readOnly : true,
																listeners : {
																	focus : function(field) {
																		if (civilServiceContract.isEdit) {
																			userMultiselect.init(function(e) {
																						if (e.store.getCount() > 1) {
																							Ext.Msg.alert('提示', '请选择一条记录!');
																							return;
																						} else {
																							var rec = e.store.getAt(0);
																							field.setValue(rec.get('ginstitutename'));// 部门名称
																							Ext.getCmp('operatorid').setValue(rec.get('truename'));
																						}
																						e.win.close();
																					});
																		}
																	}
																}
															}, {
																xtype : 'textfield',
																name : 'contractmanager',
																fieldLabel : '合同管理员',
																allowBlank : false,
																maxLength : 50,
																maxLengthText : '最大50个字符!',
																readOnly : true,
																listeners : {
																	focus : function(field) {
																		if (civilServiceContract.isEdit) {
																			userMultiselect.init(function(e) {
																						if (e.store.getCount() > 1) {
																							Ext.Msg.alert('提示', '请选择一条记录!');
																							return;
																						} else {
																							var rec = e.store.getAt(0);
																							field.setValue(rec.get('truename'));
																						}
																						e.win.close();
																					});
																		}
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
																xtype : 'hidden',
																id : 'fileid',
																name : 'fileid'
															}, {
																xtype : 'textfield',
																fieldLabel : '经办人',
																readOnly : true,
																allowBlank : false,
																maxLength : 50,
																maxLengthText : '最大50个字符!',
																id : 'operatorid',
																name : 'operatorid'
															}, {
																xtype : 'textfield',
																name : 'leader',
																fieldLabel : '行政分管领导',
																allowBlank : false,
																maxLength : 50,
																maxLengthText : '最大50个字符!',
																listeners : {
																	focus : function(field) {
																		if (civilServiceContract.isEdit) {
																			userMultiselect.init(function(e) {
																						if (e.store.getCount() > 1) {
																							Ext.Msg.alert('提示', '请选择一条记录!');
																							return;
																						} else {
																							var rec = e.store.getAt(0);
																							field.setValue(rec.get('truename'));
																						}
																						e.win.close();
																					});
																		}
																	}
																}
															}]
												}]
									}]
						}]
			}, {
				xtype : 'form',
				border : false,
				labelWidth : 60,
				id : 'fileFormPanel',
				bodyStyle : 'padding:5px;',
				fileUpload : true,
				items : [{
					xtype : !civilServiceContract.isEdit ? 'hidden' : 'fileuploadfield',
					id : 'form-file',
					fieldLabel : '上传附件',
					name : 'filename',
					anchor : '90%',
					buttonText : '浏览...',
					allowBlank : false,
					blankText : '不能为空!'
				}, {
					xtype : civilServiceContract.isEdit ? 'hidden' : 'displayfield',
					id : 'form-filename',
					name : 'filename',
					fieldLabel : '合同文件',
					listeners : {
						afterrender : function(field) {
							if("" != id){
								var grid = Ext.getCmp('civilServiceContractGrid');
								var form = win.findById("contractEditorForm");
								var fileForm = Ext.getCmp('fileFormPanel');
								var rec = grid.getSelectionModel().getSelected();
								form.getForm().loadRecord(rec);
								fileForm.getForm().loadRecord(rec);
							}
							var ID = Ext.getCmp('fileid').getValue();
							var ORIGINALNAME = Ext.getCmp('form-file').getValue();
							var value = "<a href='../FILEDOWN/?ID="// 着用的是下载。需传值文件的id和文件名，才能查到
									+ ID + "&ORIGINALNAME=" + encodeURI(encodeURI(ORIGINALNAME)) + "' cursor：hand>" + ORIGINALNAME + "</a>";
							field.setValue(value);
						}
					}
				}]
			}],
			buttons : [{
						text : '确定',
						hidden : !civilServiceContract.isEdit,
						handler : function() {
							var form = win.findById("contractEditorForm");
							var fileform = Ext.getCmp("fileFormPanel");
							var data = form.getForm().getValues();
							if (!form.getForm().isValid() || !fileform.getForm().isValid()) {
								return;
							}

							// ******************
							fileform.getForm().doAction('submit', {
										waitMsg : '正在保存数据，请稍候...',
										waitTitle : '提示',
										url : '../FILEUP/',// 这里用的上传文件，同时要保存返回来的Json中的文件ID，文件名
										method : 'post',
										success : function(form, action) {
											var file = action.result;
											Ext.Ajax.request({
														url : '../JSON/deviceContractmanagementRemote.saveDeviceContractmanagement?d=' + new Date(),
														method : 'post',
														waitMsg : '数据加载中，请稍后....',
														params : {
															contractid : data.contractid,
															contracttype : data.contracttype,
															contractlevel : data.contractlevel,
															equipregistId : data.equipregistId,
															contractcode : data.contractcode,
															partyb : data.partyb,
															amount : data.amount,
															projectname : data.projectname,
															projectcategorys : data.projectcategorys=='新建'?1:2,//项目类别
															contractname : data.contractname,// 合同名称
															amountUnit : data.amountUnit,
															secrecy : data.secrecy,
															partya : data.partya,
															contractmanager : data.contractmanager,
															operatorid : data.operatorid,
															leader : data.leader,
															fileid : file.fileId,
															filename : file.fileName,
															status : 1
														},
														success : function(response, opts) {
															var obj = Ext.decode(response.responseText);
															if (obj.success == true) {
																win.close();
																Ext.getCmp('civilServiceContractGrid').store.load()
																
															} else {
																win.close();
															}
														},
														failure : function(response, opts) {
															win.close();
														}
													});

										},
										failure : function(form, action) {
											Ext.Msg.alert('提示', "保存失败");
										}
									})
							return;
							// ******************

						}
					}, {
						text : '取消',
						handler : function() {
							win.close();
						}
					}]

		});
		win.show();
	
	},
	
	deleteContract : function(){
		var grid = Ext.getCmp('civilServiceContractGrid');
		var recs = grid.getSelectionModel().getSelections();
		var arr = new Array();
		if (recs.length == 0) {
			Ext.Msg.alert('提示', '请选择记录!');
			return;
		}
		var bool = true
		for (var i = 0; i < recs.length; i++) {
			arr.push(recs[i].get('contractid'));
			if (recs[i].get('status') != 1&& recs[i].get('status') != '-1') {
				Ext.Msg.alert('提示', '请选择编制中的数据!');
				return;
			}
		}
		Ext.Msg.confirm('提示','确定是否删除数据!',function(btn){
			if(btn=='yes'){
											Ext.Ajax.request({
					url : '../JSON/deviceContractmanagementRemote.deleteDeviceContractmanagement',
					method : 'post',
					waitMsg : '数据加载中，请稍后....',
					params : {
						contractid : Ext.util.JSON.encode(arr)
						// rec.get('contractid')
					},
					success : function(response, opts) {
						var obj = Ext.decode(response.responseText);
						if (obj.success == true) {
							grid.store.load();
						} else {
							Ext.Msg.alert('提示', obj.msg);
						}
					},
					failure : function(response, opts) {
						Ext.Msg.alert('提示', obj.msg);
					}
				});
			}
		})
	},
	
	doApproval : function(){
		var grid = Ext.getCmp('civilServiceContractGrid');
		var recs = grid.getSelectionModel().getSelections();
		var stock_arr = new Array();// 股份合同
		var group_arr = new Array();// 集团合同

		if (recs.length == 0) {
			Ext.Msg.alert('提示', '请选择一条记录!');
			return;
		}
		var bool = true
		for (var i = 0; i < recs.length; i++) {
			if (recs[i].get('contractlevel') == 1) {// 股份
				stock_arr.push(recs[i].get('contractid'));
			} else if (recs[i].get('contractlevel') == 2) {// 集团
				group_arr.push(recs[i].get('contractid'));
			} else {
				Ext.Msg.alert('提示', '选择的数据中没有正确的合同级别!');
				return;
			}
			if (recs[i].get('status') != 1&&recs[i].get('status') != -1) {
				Ext.Msg.alert('提示', '请选择编制中的数据!');
				return;
			}
		}

		if (stock_arr.length != 0) {
			approvePanel.submit('478106', "设备项目合同审批(股份)", "设备项目合同审批(股份)", stock_arr, 
				"DeviceContractmanagement", true,civilServiceContract.approvePanelSuccess,
				civilServiceContract.approvePanelFailure );
		}
		if (group_arr.length != 0) {
			approvePanel.submit('478150', "设备项目合同审批(集团)", "设备项目合同审批(集团)", group_arr, 
				"DeviceContractmanagementGroup", true, civilServiceContract.approvePanelSuccess,
				civilServiceContract.approvePanelFailure);
		}

	
	},
	
	approvePanelSuccess : function(){
		var rows = Ext.getCmp("civilServiceContractGrid").getSelectionModel().getSelections();
		for(i=0;i < rows.length;i++){
			rows[i].set('status',2);
		} 
	},
	
	approvePanelFailure : function(){
		Ext.Msg.alert('提示', '没有送审权限！');
	}
}