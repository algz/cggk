
utils.approvePanel={}
var approvePanel = {
	north : null,
	card1 : null,
	status : null,
	securityDegree : null
};

approvePanel.combPanel = null;

/**
 * 初始化提交审批页面
 * @param {} container 初始化后将审批页面添加到的容器
 * @param {} dataId 审批的数据id（可以是多个）
 * @param {} dataType 审批的数据类型
 * @param {} cancelCallback 点击取消按钮的回调函数
 * @param {} processName 流程名称
 * @param {} success 送审成功的回调函数
 * @param {} failure 送审失败的回调函数
 * @param {} noPrivilege 是否不进行权限验证，true为不进行验证
 * @return {}
 */
approvePanel.init = function(container, dataId, dataType, cancelCallback, processName, success, failure, noPrivilege) {
	approvePanel.dataid = dataId;
	approvePanel.datatype = dataType;
	var title = '';
	if (dataType == "TaskDataType") {
		title = '' + getResource('resourceParam1059') + '';// 送审任务
	} else if (dataType == "ProjectDataType") {
		title = '' + getResource('resourceParam1060') + '';// 送审项目
	} else if (dataType == "TemplateDataType") {
		title = '' + getResource('resourceParam1062') + ''// 送审
			+ getResource('resourceParam943') + '' + getResource('resourceParam5006') + '';// 任务流程+'模板
	} else if (dataType == "DataObjectDataType") {
		title = '' + getResource('resourceParam1062') + '' // 送审
			+ getResource('resourceParam615') + '';// 数据对象';
	} else if (dataType == "DataTagDataType") {
		title = '' + getResource('resourceParam1062') + ''// 送审
			+ getResource('resourceParam1375') + '';// 数据分类'
	} else if (dataType == "DataEntityDataType") {
		title = '' + getResource('resourceParam1062') + ''// 送审
			+ getResource('resourceParam474') + '';
	} else if (dataType == "DataTypeDataType") {
		title = '' + getResource('resourceParam9093') + '';// 数据类型审批'
	} else {
		title = '' + getResource('resourceParam1062') + '';	
	}

	approvePanel.title = title;
	
	// 选择审批方式单选按钮组
	approvePanel.north = new Ext.Panel({
		region : 'north',
		border : false,
		bodyStyle : 'padding-top:20px;padding-left:60px;',
		height : 60,
		items : [{
			layout : 'table',
			border : false,
			items : [{
				columnWidth : .2,
				xtype : 'label',
				text : '' + getResource('resourceParam1011') + '：' // 选择审批方式
			}, {
				columnWidth : .4,
				checked : true,
				xtype : 'radio',
				boxLabel : '' + getResource('resourceParam1012') + '', // 上游选下游
				name : 'method',
				id : 'freeFlowID' + dataId,
				inputValue : 1,
				listeners : {
					check : function(radio, checked) {
						// 不同审批方式对应不同的页面
						if (checked) {
							approvePanel.center.getLayout().setActiveItem(0);
						} else {
							approvePanel.center.getLayout().setActiveItem(1);
						}
					}
				}
			}, {
				columnWidth : .4,
				xtype : 'radio',
				boxLabel : '' + getResource('resourceParam1006') + '', // 选择审批流程模板
				name : 'method',
				id : 'method2' + dataId,
				inputValue : 2
			}]
		}]
	});
	
	// 审批模板列表
	approvePanel.getTemplateGrid = function() {
		var record = Ext.data.Record.create([{
			name : 'id'
		}, {// 获取后台传过来的数据映射
			name : 'itemtype'
		}, {
			name : 'itemname'
		}, {
			name : 'itemdescription'
		}, {
			name : 'parent'
		}, {
			name : 'state'
		}, {
			name : 'createuserid'
		}, {
			name : 'createusername'
		}, {
			name : 'createtime'
		}, {
			name : 'iconCls'
		}, {
			name : 'leaf'
		}]);
		var sm = new Ext.grid.CheckboxSelectionModel({
			singleSelect : true,
			header : ''
		});

		var cm = new Ext.grid.ColumnModel({
			defaults: {
		        sortable: false,
		        menuDisabled: true
		    },
			columns : [sm, {
				id : 'itemname',
				header : getResource('resourceParam480'),
				width : 100,
				dataIndex : 'itemname',
				renderer : function(v, meta, r, rowIndex, colIndex, store) {
					var realWidth = grid.getColumnModel().getColumnWidth(colIndex);
					if (r.data.itemtype == 'FLOW_TEMPLET') {// 如果点击的是模板的话，就跳转到查看页面
						return '<a href="javascript:void(0);" onClick="approvePanel.toTreeView(' + r.data.id
							+ ',\'' + r.data.itemname + '\')"><span ext:qtip=' + v + ' style="color:blue;font-weight:bold;" >'
							+ v + '</span></a>';
					}
					return '<span ext:qtip=' + v + '>' + v + '</span>';
				}
			}, 
			/** 由于列表宽度较小，且这里选择的模板必须为”已发布“状态，因此屏蔽掉该列
			{
				header : getResource('resourceParam500'),// 状态
				width : 100,
				dataIndex : 'state',
				renderer : function(value, p, record) {// 判断当前模板的状态
					if (record.get('itemtype') == 'FLOW_TEMPLET') {
						if (value == 0) {
							return '<span style="color:gray;font-weight:bold;" >'
									+ getResource('resourceParam1267') + '</span>';
						} else if (value == 1) {
							return '<span style="color:gray;font-weight:bold;" >'
									+ getResource('resourceParam1266') + '</span>';
						} else if (value == 2) {
							return '<span style="color:gray;font-weight:bold;" >'
									+ getResource('resourceParam9091') + '</span>';
						} else {
							return '';
						}
					} else {
						return '';
					}
				}
			}, 
			*/ 
			{
				header : getResource('resourceParam5007'),// 创建人
				width : 30,
				dataIndex : 'createusername'
			}, {
				header : getResource('resourceParam981'),// 创建时间
				width : 30,
				dataIndex : 'createtime'
	
			}
			/**
			, {
				header : getResource('resourceParam648'),// 描述
				width : 100,
				dataIndex : 'itemdescription'
	
			}
			*/
			]
		});
		this.proxy = new Ext.data.HttpProxy({
			method : 'POST',
			url : '../JSON/approval_templetRemote.getAllTemplet'
		});
		var store = new Ext.ux.maximgb.tg.sysEditTreeGridStore({
			proxy : this.proxy,
			baseParams : {
				parentTypeid : -1,
				state : 1
			},
			reader : new Ext.data.JsonReader({
				id : 'id',
				root : 'results',
				totalProperty : 'totalProperty'
			}, record)
		});

		store.on('beforeexpandnode', function(store, record) {// 节点展开之前，调用此方法，并传参
			sm.selectRecords([record]);
			var nodeId = record.get('id');
			Ext.apply(store.baseParams, {
				parentTypeid : nodeId,
				state : 1
			});
		})
		var grid = new Ext.ux.maximgb.tg.sysEditTreeGridPanel({// 创建grid面板
			height : 220,
			width : 400,
			store : store,
			viewConfig : {
				forceFit : true
			},
			sm : sm,
			master_column_id : 'itemname',
			cm : cm,
			stripeRows : true,
			autoExpandeColumn : 'itemname',
			bbar : new Ext.ux.maximgb.tg.PagingToolbar({
				store : store,
				displayInfo : true,
				pageSize : 10,
				listeners : {// 分页数据监听
					'beforechange' : function(pagingbar, options) {
						var len = sm.getSelections().length;// 得到选中复选框的长度
						if (len < 1) {// 如果什么都没选,节点ID传-1
							Ext.apply(store.baseParams, {
								parentTypeid : -1,
								state : 1
							});
						} else {// 获取选中节点ID，并传送到后台
							var rec = sm.getSelected();
							nodeId = rec.get('id');
								Ext.apply(store.baseParams, {
								parentTypeid : nodeId,
								state : 1
							});
						}
					}
				}
			})
		});
		store.load({
			params : {
				parentTypeid : -1,
				state : 1
			}
		});
		return grid;
	};
	
	approvePanel.flowViewWindow = null;
	
	/**
	 * 点击审批模板查看流程模板的方法
	 */
	approvePanel.toTreeView = function(id, name) {
		if(!approvePanel.flowViewWindow) {
			approvePanel.flowViewWindow = new FlowViewWindow();
		}
		approvePanel.flowViewWindow.loadFlow(id);
	}
	
	approvePanel.participantsGrid = approvePanel.getUserGrid(false);
	approvePanel.templateGrid = approvePanel.getTemplateGrid();
	approvePanel.ds = new Ext.data.ArrayStore({
		fields : ['display', 'value'],
		data : [
			['【校对】', '【校对】'], 
			['【审核】', '【审核】'], 
			['【审定】', '【审定】'],
			['【会签】', '【会签】'], 
			['【批准】', '【批准】']
		]
	});
	
	// ”上游选下游“方式对应的页面
	approvePanel.card1 = new Ext.Panel({
		border : false,
		bodyStyle : 'padding-left:40px;',
		autoHeight : 200,
		items : [{
			xtype : 'fieldset',
			title : '' + getResource('resourceParam1015') + '',// 审核设置
			labelWidth : 60,
			width : 425,
			region : 'center',
			autoHeight : true,
			items : [{
				xtype : 'textfield',
				width : 130,
				fieldLabel : '' + getResource('resourceParam722') + '',// 审批流程
				id : 'approvePress' + dataId,
				allowBlank : false,
				maxLength : 20,
				maxLengthText : '' + getResource('resourceParam1000')// 名称长度过长，不能超过20!
						+ '',
				minLength : 1,
				minLengthText : '' + getResource('resourceParam1002')// 名称长度过短，不能小于1
						+ '',
				blankText : '' + getResource('resourceParam1009') + '',// 请输入流程名称
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				regexText : '' + getResource('resourceParam679') + '',// 只能输入中文,字母,数字!
				anchor : '95%',
				style : 'margin-bottom:5px;',
				// disabled : true,
				value : processName
			}, {
				xtype : 'combo',
				store : approvePanel.ds, // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				displayField : 'value',
				mode : 'local',
				triggerAction : 'all',
				width : 130,
				fieldLabel : '' + getResource('resourceParam726') + '',// 审批步骤
				id : 'approveStep' + dataId,
				allowBlank : false,
				maxLength : 20,
				maxLengthText : '' + getResource('resourceParam1000')// 名称长度过长，不能超过20!
						+ '',
				minLength : 1,
				minLengthText : '' + getResource('resourceParam1002')// 名称长度过短，不能小于1
						+ '',
				blankText : '' + getResource('resourceParam1010') + '',// 请输入步骤名称
				regex : /^[^\s\']+([\u0391-\uFFE5]|[a-zA-Z]|\d|\s)*$/,
				regexText : '' + getResource('resourceParam679') + '',// 只能输入中文,字母,数字!
				anchor : '95%',
				style : 'margin-bottom:5px;'
			}, {
				xtype : 'textarea',
				id : 'approvalNote' + dataId,
				width : 317,
				style : 'margin-top:5px;',
				height : 80,
				fieldLabel : '' + getResource('resourceParam1018') + '',// 送审附言
				maxLength : 500
			}, approvePanel.participantsGrid]
		}]
	});
	
	// ”选择审批模板“方式对应的页面
	approvePanel.card2 = new Ext.Panel({
		border : false,
		bodyStyle : 'padding-left:40px;',
		autoHeight : 200,
		items : [{
			xtype : 'fieldset',
			title : '' + getResource('resourceParam1015') + '',// 审核设置
			labelWidth : 60,
			width : 425,
			region : 'center',
			autoHeight : true,
			items : [{
				xtype : 'textfield',
				width : 130,
				fieldLabel : '' + getResource('resourceParam1016') + '',// 流程名称
				id : 'approvePress_card2',
				allowBlank : false,
				maxLength : 20,
				maxLengthText : '' + getResource('resourceParam1000')// 名称长度过长，不能超过20!
						+ '',
				minLength : 1,
				minLengthText : '' + getResource('resourceParam1002')// 名称长度过短，不能小于1
						+ '',
				blankText : '' + getResource('resourceParam1009') + '',// 请输入流程名称
				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				regexText : '' + getResource('resourceParam679') + '',// 只能输入中文,字母,数字!
				anchor : '95%',
				style : 'margin-bottom:5px;',
				disabled : true,
				value : processName
			}, {
				xtype : 'textarea',
				id : 'approvalNote_card2',
				width : 317,
				style : 'margin-top:5px;',
				height : 80,
				fieldLabel : '' + getResource('resourceParam1018') + '',
				maxLength : 500
				// 送审附言
			}, approvePanel.templateGrid]
		}]
	});

	// 主页面
	approvePanel.center = new Ext.Panel({
		region : 'center',
		autoHeight : true,
		border : false,
		layout : 'card',
		activeItem : 0,
		autoScroll : 'true',
		items : [approvePanel.card1, approvePanel.card2],
		buttonAlign : 'left',
		buttons : [{
			text : '' + getResource('resourceParam1062') + '', // 送审
			style : 'margin-left:170px;',
			handler : function() {
				if(!approvePanel.combPanel) {
					approvePanel.combPanel = new Ext.LoadMask(document.body, {
						msg : '' + getResource('resourceParam7131') + ''// 正在提交操作，请稍候...
					});
				}
				approvePanel.combPanel.show();
				var freeFlow = Ext.getCmp('freeFlowID' + dataId).getValue();// 上游选下游
				var approveStepName = Ext.getCmp('approveStep' + dataId).getValue(); // 审批步骤
				var approvePressName = Ext.getCmp("approvePress" + dataId).getValue(); // 流程名称
				var approvalNote = Ext.getCmp("approvalNote" + dataId).getValue();// 送审附言
				var chiefManID = null;
				var participantsID = new Array();
				if (freeFlow == true) {
					if (!approvePressName) {
						// 如果为空则提示用户输入
						approvePanel.combPanel.hide();
						Ext.Msg.alert('' + getResource('resourceParam575') + '',  // 提示
							'' + getResource('resourceParam1004') + ''); // 请输入审批流程名称
						return;
					}
					if (!approveStepName){
						// 如果为空则提示用户输入
						approvePanel.combPanel.hide();
						Ext.Msg.alert('' + getResource('resourceParam575') + '', // 提示
							'' + getResource('resourceParam1005') + ''); // 请输入审批步骤名称
						return;
					}
					if(!Ext.getCmp('approveStep' + dataId).isValid()){ 
						//@chenw 添加验证的提示信息
						approvePanel.combPanel.hide();
						Ext.Msg.alert('' + getResource('resourceParam575')// 提示
							+ '', '您输入的审批步骤名称有误，请重新输入！');
						return ;
					}
					
					// 先验证是否有参与人，然后验证是否有负责人
					var dataStore = approvePanel.participantsGrid.getStore();
					var count = dataStore.getCount();
					if (count == 0) {
						approvePanel.combPanel.hide();
						Ext.Msg.alert('' + getResource('resourceParam575') + '', '' // 提示
							+ getResource('resourceParam1007') + ''); // 请指定审批参与人
						return;
					}
					var j = 0;
					for (i = 0; i < count; i++) {// 判断是否指定负责人
						if (dataStore.getAt(i).get('usertype')) {
							chiefManID = dataStore.getAt(i).get('userid');
						} else {
							participantsID[j] = dataStore.getAt(i).get('userid');
							j++;
						}
					}
					if (chiefManID == null) {
						approvePanel.combPanel.hide();
						Ext.Msg.alert('' + getResource('resourceParam575') + '', '' // 提示
							+ getResource('resourceParam1008') + ''); // 请指定审批负责人!
						return;
					}
					// 至此全部验证完成
					
					var freeFlowSubmit = function() {
						Ext.Ajax.request({
							url : '../JSON/approval_ApprovalRemote.begin',
							method : 'POST',
							success : function(response, options) {
								var obj = Ext.util.JSON.decode(response.responseText);
								if (obj.success) {
									Ext.example.msg('' + getResource('resourceParam575') + '', // 提示
										'' + getResource('resourceParam1061'), // 送审成功
										function() {
											if (success) {
												// collrabMain中refresh
												success(true);
											} else {
												if(mytaskMain) {
													mytaskMain.cenpanel.layout.setActiveItem(1);
													mytaskMain.loadtasklist();
												}
											}
										});
									approvePanel.combPanel.hide();
								} else {
									Ext.example.msg(''+ getResource('resourceParam575') + '', "送审失败！" + obj.message);
									approvePanel.combPanel.hide();
								}
							},
							params : {
								objectID : approvePanel.dataid,
								objectType : approvePanel.datatype,// 这里要与权限那边一致
								approveStepName : approveStepName,// 步骤名称
								approvePressName : approvePressName,// 流程名称
								chiefManID : chiefManID,
								approveComments : participantsID.join(','),
								approveNote : approvalNote,
								approvalType : "StepByStep"
							}
						});
					};
					
					// 先提交后台验证权限，通过init方法中的noPrivilege参数控制这里是否提交验证权限
					if(!noPrivilege) {
						Ext.Ajax.request({
							url : '../JSON/approval_ApprovalRemote.filterDataId',
							method : 'POST',
							success : function(response, options) {
								var obj = Ext.util.JSON.decode(response.responseText);
								if(obj.success == 'all') {
									freeFlowSubmit();
								} else if (obj.success == 'notall') {
									Ext.MessageBox.confirm('' + getResource('resourceParam575') + '',
										'部分数据没有权限进行审批：' + obj.message, function(btn, text){
										if(btn == 'yes'){
											approvePanel.dataid = obj.objectID;
											freeFlowSubmit();
										} else {
											approvePanel.combPanel.hide();
										}
									});
								} else if (obj.success == 'false') {
									Ext.example.msg(''+ getResource('resourceParam575') + '', "送审失败！" + obj.message);
									approvePanel.combPanel.hide();
								}
							},
							params : {
								objectID : approvePanel.dataid,
								objectType : approvePanel.datatype // 这里要与权限那边一致
							}
						});
					} else {
						freeFlowSubmit();	
					}
				} else {
					// 审批流程模板方式的提交方式
					var approvePressName = Ext.getCmp("approvePress_card2").getValue(); // 流程名称
					var approvalNote = Ext.getCmp("approvalNote_card2").getValue(); // 送审附言
					
					// 验证流程名称是否为空，流程名称为外部传入
					if (!approvePressName) {
						approvePanel.combPanel.hide();
						Ext.Msg.alert('' + getResource('resourceParam575') + '', '' // 提示
							+ getResource('resourceParam1005') + ''); // 请输入审批步骤名称!
						return;
					}
					// 验证是否选择了流程模板
					var record = approvePanel.templateGrid.getSelectionModel().getSelected();
					if (record == undefined) {
						approvePanel.combPanel.hide();
						Ext.Msg.alert('' + getResource('resourceParam575') + '', 
							'' + getResource('resourceParam7132') + '。'); // 请选择一个模板
						return;
					} else if (record.get('state') != 1) {
						approvePanel.combPanel.hide();
						Ext.Msg.alert('' + getResource('resourceParam575') + '', 
							'' + getResource('resourceParam7133') + '!'); // 只能选择模板
						return;
					} else {
						var flowid = record.get('id');
						var approvalParams={
							objectID : approvePanel.dataid,
							objectType : approvePanel.datatype, // 这里要与权限那边一致
							approvalId : flowid,
							approvePressName : approvePressName,
							approveNote : approvalNote,
							approvalType : "ByTemplet"
						};
						utils.approvePanel.privilege(approvalParams, noPrivilege, success, failure);
					}
				}
			}
		}, {
			text : '' + getResource('resourceParam7007') + '',
			handler : function() {
				if (cancelCallback) {
					cancelCallback();
				}
			}
		}]
	});

	approvePanel.mainpanel = new Ext.Panel({
		title : approvePanel.title,
		height : 800,
		id : 'approvePanel' + dataId,
		autoScroll : true,
		layout : 'border',
		items : [approvePanel.north, approvePanel.center]
	});
	if (container) {
		container.add(approvePanel.mainpanel);
	}

	return approvePanel.mainpanel;
}

/**
 * 提交前验证权限
 * @param {} approvalParams 提交的参数列表
 * @param {} noPrivilege 是否不验证权限
 * @param {} success 提交成功的回调函数
 * @param {} failure 提交失败的回调函数
 */
utils.approvePanel.privilege = function(approvalParams, noPrivilege, success, failure) {
	if(!noPrivilege) {
		Ext.Ajax.request({
			url : '../JSON/approval_ApprovalRemote.filterDataId',
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				approvePanel.combPanel.hide();
				if(obj.success == 'all') {
					utils.approvePanel.getTempletInfo(approvalParams, success, failure);
				} else if (obj.success == 'notall') {
					Ext.MessageBox.confirm('' + getResource('resourceParam575') + '',
						'部分数据没有权限进行审批：' + obj.message, function(btn, text){
						if(btn == 'yes'){
							approvePanel.dataid = obj.objectID;
							approvalParams.objectID = obj.objectID;
							utils.approvePanel.getTempletInfo(approvalParams, success, failure);
						} else {
						}
					});
				} else if (obj.success == 'false') {
					Ext.example.msg(''+ getResource('resourceParam575') + '', "送审失败！" + obj.message);
				}
			},
			params : {
				objectID : approvalParams.objectID,
				objectType : approvalParams.objectType // 这里要与权限那边一致
			}
		});
	} else {
		approvePanel.combPanel.hide();
		utils.approvePanel.getTempletInfo(approvalParams, success, failure);
	}
}

/**
 * 获取审批模板节点的配置信息
 * @param {} approvalParams
 * @param {} success
 * @param {} failure
 */
utils.approvePanel.getTempletInfo=function(approvalParams, success, failure) {
	Ext.Ajax.request({
		url : '../JSON/approval_ApprovalRemote.checkBegin',
		method : 'POST',
		success : function(response, options) {
			var obj = Ext.util.JSON.decode(response.responseText);
			if (obj.success) {
				var nodetypeid = obj.activityInfo.nodetypeid;
				// 判断第一个节点是否是审批节点
				if(nodetypeid == '6') {
					// 审批节点确认界面点击确定时的回调
					var functOK = function(userid) {
						obj.activityInfo.comments[0].examiner=userid;
						obj.activityInfo.comments[0].examinerType=1;
						approvalParams.activityInfo = Ext.encode(obj.activityInfo);
						utils.approvePanel.selectTempletSubmit(approvalParams, success, failure);
					}
					// 创建审批节点确认界面，并展示
					var viewApprovalWin = new ViewApprovalWin(functOK);
					viewApprovalWin.showWin(obj.activityInfo, obj.msg);
				} else if(nodetypeid == '7' || nodetypeid == '8' || nodetypeid == '9') {
					// 会签节点点击确认时的回调函数
					var functOK = function() {
						approvalParams.activityInfo = Ext.encode(obj.activityInfo);
						utils.approvePanel.selectTempletSubmit(approvalParams, success, failure);
					}
					// 创建会签节点确认界面，并展示
					var viewCounterSignWin = new ViewCounterSignWin(functOK);
					viewCounterSignWin.showWin(obj.activityInfo, obj.msg);
				} else if(nodetypeid == '10') {
					var functOK = function(originalindex) {
						var judgeInfo = obj.activityInfo;
						judgeInfo.originalindex = originalindex;
						approvalParams.judgeInfo = Ext.encode(judgeInfo);
						utils.approvePanel.getTempletInfo(approvalParams, success, failure);
					}
					var viewManualJudgeWin = new ViewManualJudgeWin(functOK);
					viewManualJudgeWin.showWin(obj.msg);
				}
			} else {
				Ext.MessageBox.show({
					title : '' + getResource('resourceParam575') + '',// 信息提示
					msg : obj.message,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
			}
		},
		failure : function(result, request) {
			Ext.MessageBox.show({
				title : '' + getResource('resourceParam575') + '',// 信息提示
				msg : "发送请求失败，请重新提交！",
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
		},
		params : approvalParams
	});
}

/**
 * 提交审批
 * @param {} approvalParams 提交审批的参数
 * @param {} success 提交成功的回调函数
 * @param {} failure 提交失败的回调函数
 */
utils.approvePanel.selectTempletSubmit = function(approvalParams, success, failure) {
	approvePanel.combPanel.show();
	Ext.Ajax.request({
		url : '../JSON/approval_ApprovalRemote.begin',
		method : 'POST',
		success : function(response, options) {
			var obj = Ext.util.JSON.decode(response.responseText);
			if (obj.success) {
				approvePanel.combPanel.hide();
				Ext.example.msg('提示', '送审成功！');
				if (success) {
					success(obj.flowInstanceId);
				} else {
					if(mytaskMain) {
						mytaskMain.cenpanel.layout.setActiveItem(1);
						mytaskMain.loadtasklist();
					}
				}
			} else {
				Ext.MessageBox.show({
					title : '' + getResource('resourceParam575') + '',
					msg : obj.message,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
				approvePanel.combPanel.hide();
				if(failure) {
					failure();
				}
			}
		},
		params : approvalParams
	});
};

/**
 * 默认设置审批流程模板走的方法
 * @param {} templetId 审批模板的id
 * @param {} approvePressName 流程名称
 * @param {} approveNote 送审附言
 * @param {} objectID 审批对象ID，可以是多个，用','隔开
 * @param {} objectType 审批对象类型
 * @param {} noPrevilige 是否不进行权限验证,true为不验证，默认为false
 * @param {} success 提交成功的回调函数
 * @param {} failure 提交失败的回调函数
 */

utils.approvePanel.submit = function(templetId, processName, approveNote, objectID, objectType, noPrevilige, success, failure) {
	if(!approvePanel.combPanel) {
		approvePanel.combPanel = new Ext.LoadMask(document.body, {
			msg : '' + getResource('resourceParam7131') + ''// 正在提交操作，请稍候...
		});
	}
	var approvalParams={
		objectID : objectID,
		objectType : objectType, // 这里要与权限那边一致
		approvalId : templetId,
		approvePressName : processName, 
		approveNote : approveNote,
		approvalType : "ByTemplet"
	};
	approvePanel.combPanel.show();
	utils.approvePanel.privilege(approvalParams, noPrevilige, success, failure);
};

approvePanel.getUserGrid = function(isPaging) {

	var sm = new Ext.grid.CheckboxSelectionModel();
	var colModel = new Ext.grid.ColumnModel([// new Ext.grid.RowNumberer(),
	sm, {
				header : "" + getResource('resourceParam879') + "",// 用户ID
				width : 100,
				hidden : true,
				dataIndex : 'userid'
			}, {
				header : "" + getResource('resourceParam1021') + "",// 参与者
				width : 120,
				dataIndex : 'truename'
			}, {
				header : "" + getResource('resourceParam887') + "",// 登录名
				width : 120,
				hidden : true,
				dataIndex : 'loginname'
			}, {
				header : "" + getResource('resourceParam882') + "",// 机构
				width : 120,
				dataIndex : 'ginstitutename'
			}, {
				header : "" + getResource('resourceParam1019') + "",// 参与类型
				width : 60,
				id : 'usertype',
				dataIndex : 'usertype'
			}]);

	var url = "../JSON/base_user_UserSerivce.getGrid";
	var proxy = new Ext.data.HttpProxy({
				url : url,
				method : 'GET'
			});
	var reader = new Ext.data.JsonReader({
				root : 'results',
				totalProperty : 'totalProperty',
				id : 'userid'
			}, ['userid', 'loginname', 'truename', 'strsex', 'sex',
					'accountstate', 'straccountstate', 'instcode',
					'ginstitutename', 'password', 'age', 'address', 'postcode',
					'tel1', 'tel2', 'judgeman', 'viewLevel', 'logLevel']);
	var ascid = 'userid';
	var ascstr = 'desc';
	var ds = new Ext.data.Store({
				proxy : proxy,
				reader : reader,
				sortInfo : {
					field : ascid,
					direction : ascstr
				}
			});

	var addUserBt = {
		text : '' + getResource('resourceParam1013') + '',
		iconCls : 'add1',
		handler : function() { // 此处的信息应该来自于树节点
			userMultiselect.securityDegree = approvePanel.securityDegree;
			userMultiselect.init(approvePanel.selectUserCallback,
					approvePanel.participantsGrid.getStore(), "truename");
		}
	};

	var setLeaderBt = {
		text : '' + getResource('resourceParam1014') + '',
		iconCls : 'add1',
		handler : function() { // 此处的信息应该来自于树节点
			approvePanel.setLeader();
		}
	};

	var delBt = {
		text : '' + getResource('resourceParam475') + '',
		iconCls : 'del1',
		handler : function() {
			approvePanel.deleteParticipant();
		}
	};

	var tb = ['-', addUserBt, '-', delBt, '-', setLeaderBt, '-'];

	var grid;
	if (isPaging) {
		grid = myGrid.init(ds, colModel, tb, sm);
	} else {
		grid = myGrid.initNoPaging(ds, colModel, tb, sm);
	}
	grid.height = 200;
	grid.width = 400;
	grid.autoScroll = 'true';

	// grid.autoWidth = 'true';
	return grid;
}

approvePanel.selectUserCallback = function() {
	var dataStore = userMultiselect.usersore;
	var toDataStore = approvePanel.participantsGrid.getStore();
	for (i = 0; i < dataStore.getCount(); i++) {
		var userid = dataStore.getAt(i).get('userid');
		var truename = dataStore.getAt(i).get('truename');

		var record = dataStore.getAt(i);
		if (toDataStore.getById(userid) == null) {// 加入未被选择的用户
			if (!isRep(record))
				toDataStore.add(record);
		}
	}

	function isRep(record) {
		for (var j = 0; j < toDataStore.getCount(); j++) {
			if (record.get('userid') == toDataStore.getAt(j).get("userid")) {
				return true;
			}
		}
		return false;
	}
}

approvePanel.reset = function() {
	approvePanel.card1.items.get(0).items.get(1).setValue('');
	approvePanel.card1.items.get(0).items.get(2).setValue('');

	// Ext.getCmp('approveStep').setValue('');
	// Ext.getCmp('approvalNote').setValue('');
	approvePanel.participantsGrid.getStore().removeAll();
}

approvePanel.deleteParticipant = function() {
	var result = new Array();
	var rows = approvePanel.participantsGrid.getSelectionModel()
			.getSelections();
	if (rows != null) {
		var size = rows.length;
		if (size == 0) {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam587') + '',// 信息提示
						msg : '' + getResource('resourceParam1001') + '',// 请选择要删除的记录!
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}
		Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""// 提示
						+ getResource('resourceParam585') + "", function(btn) {// 是否删除当前记录?
					if (btn == 'yes') {
						var toDataStore = approvePanel.participantsGrid
								.getStore();
						for (var i = 0; i < size; i++) {
							toDataStore.remove(rows[i]);
						}

					}
				});
	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam587') + '',// 信息提示
					msg : '' + getResource('resourceParam584') + '',// 请选择要删除的记录
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}

approvePanel.setLeader = function() {// 设定负责人
	var selectedRows = approvePanel.participantsGrid.getSelectionModel()
			.getSelections();
	if (selectedRows != null) {
		var size = selectedRows.length;
		if (size == 0) {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam587') + '',// 信息提示
						msg : '' + getResource('resourceParam999') + '',// 请选择要设定的负责人的记录!
						width : 200,
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}

		if (size > 1) {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam587') + '',// 信息提示
						msg : '' + getResource('resourceParam1003') + '',// 只能选择一个负责人只能选择一个负责人
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}

		var toDataStore = approvePanel.participantsGrid.getStore();
		for (i = 0; i < toDataStore.getCount(); i++) {// 只能设定一个负责人
			toDataStore.getAt(i).set('usertype', '');
		}
		selectedRows[0].set('usertype', '' + getResource('resourceParam731')// 负责人
						+ '');
		var copyRow = selectedRows[0].copy();
		copyRow.set('usertype', '' + getResource('resourceParam731') + '');// 负责人
		toDataStore.remove(selectedRows[0]);
		toDataStore.insert(0, copyRow);
	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam587') + '',// 信息提示
					msg : '' + getResource('resourceParam999') + '',// 请选择要设定的负责人的记录!
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}
