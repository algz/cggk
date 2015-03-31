var createApproveTask = {
	north : null,
	card1 : null,
	status : null
};
/*
 * container 新建实例所处的容器，可以为null，手动添加 dataid 数据id dataType 数据类型 callback 取消操作的回调
 * processName 审批的名称 callback1 操作成功的回调
 * 
 * params:{ title:title名称,update:true or false 是否是更新面版 }
 * 
 */
createApproveTask.init = function(container, dataId, dataType, cancelCallBack,
		processName, successCallBack, params) {
	createApproveTask.params=params||{};
	createApproveTask.dataid = dataId;
	createApproveTask.datatype = dataType;
	createApproveTask.title = "创建" + getResource('resourceParam1020') + "";

	createApproveTask.north = new Ext.Panel({
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
								text : '' + getResource('resourceParam1011') ////选择审核方式
										+ ':'
							}, {
								columnWidth : .4,
								checked : true,
								readOnly : true,
								xtype : 'radio',
								boxLabel : ''
										+ getResource('resourceParam1012') + '',//上游选下游
								name : 'method',
								id : 'freeFlowID1',
								inputValue : 1,
								listeners : {
									check : function(radio, checked) {
										if (checked) {
											createApproveTask.center
													.getLayout()
													.setActiveItem(0);
										} else {
											createApproveTask.center
													.getLayout()
													.setActiveItem(1);
										}
									}
								}
							}, {
								columnWidth : .4,
								disabled : true,
								xtype : 'radio',
								boxLabel : ''
										+ getResource('resourceParam1006') + '',//选择审批流程模板
								name : 'method',
								id : 'method21',
								inputValue : 2
							}

					]
				}]
			});

	createApproveTask.participantsGrid = createApproveTask.getUserGrid(false);
	//审批步骤名称改成下拉框 2010-4-20 gzj
	createApproveTask.ds= new Ext.data.ArrayStore({
        fields: ['display', 'value'],
        data :[['【校对】','【校对】'],['【审核】','【审核】'],['【审定】','【审定】'],['【会签】','【会签】'],['【批准】','【批准】']] // from states.js
    });
	
	createApproveTask.card1 = new Ext.Panel({
		border : false,
		bodyStyle : 'padding-left:40px;',
		autoHeight : 200,
		items : [{
			xtype : 'fieldset',
			title : '' + getResource('resourceParam1015') + '',//审核设置
			labelWidth : 60,
			width : 425,
			region : 'center',
			autoHeight : true,
			items : [{
						xtype : 'textfield',
						width : 130,
						fieldLabel : '' + getResource('resourceParam1016') + '',//流程名称
						id : 'approvePress1',
						allowBlank : false,
						maxLength : 20,
						maxLengthText : '' + getResource('resourceParam1000')
								+ '',
						minLength : 1,
						minLengthText : '' + getResource('resourceParam1002')
								+ '',
						blankText : '' + getResource('resourceParam1009') + '',
						regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
						regexText : '' + getResource('resourceParam679') + '',
						anchor : '95%',
						style : 'margin-bottom:5px;',
						value : processName
					}, 
//					{
//						xtype : 'textfield',
//						width : 130,
//						fieldLabel : '' + getResource('resourceParam1017') + '',//步骤名称  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//						id : 'approveStep1',
//						allowBlank : false,
//						maxLength : 20,
//						maxLengthText : '' + getResource('resourceParam1000')
//								+ '',
//						minLength : 1,
//						minLengthText : '' + getResource('resourceParam1002')
//								+ '',
//						blankText : '' + getResource('resourceParam1010') + '',
//						regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
//						regexText : '' + getResource('resourceParam679') + '',
//						anchor : '95%',
//						style : 'margin-bottom:5px;'
//					} 
					//审批步骤名称改成下拉框 2010-4-20 gzj
					{
						xtype : 'combo',
                        store: createApproveTask.ds,  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        displayField:'value',
                        mode: 'local',
                        triggerAction: 'all',
						width : 130,
						fieldLabel : '' + getResource('resourceParam726') + '',//审批步骤
						id : 'approveStep1',
						allowBlank : false,
						maxLength : 20,
						maxLengthText : '' + getResource('resourceParam1000')//名称长度过长，不能超过20!
								+ '',
						minLength : 1,
						minLengthText : '' + getResource('resourceParam1002')//名称长度过短，不能小于1
								+ '',
						blankText : '' + getResource('resourceParam1010') + '',//请输入步骤名称
						regex : /^[^\s\']+([\u0391-\uFFE5]|[a-zA-Z]|\d|\s)*$/,
						regexText : '' + getResource('resourceParam679') + '',//只能输入中文,字母,数字!
						anchor : '95%',
						style : 'margin-bottom:5px;',
						/**
						 * 取消全角输入时的空格bug
						 * @author wangyf
						 * 2011-04-20 17:00
						 */
						enableKeyEvents : true,
						listeners : {'blur' : function(cur, evt) {
								var curStr = cur.getValue();
								for(var i = 0; i < curStr.length; i++) {
									var str = curStr.charCodeAt(i);
									if(str == 12288) {
										if(typeof curStr[i] == 'undefined' || curStr[i] == '　') {
											curStr = curStr.replace('　', ' ');
										}
									} 
								}
								Ext.getCmp('approveStep1').setValue(curStr);
							}
						}
					}
					, {
						xtype : 'textarea',
						id : 'approvalNote1',
						width : 317,
						style : 'margin-top:5px;',
						height : 80,
						fieldLabel : '' + getResource('resourceParam1018') + ''
					}, createApproveTask.participantsGrid]
		}]

	});
	createApproveTask.card2 = new Ext.Panel({
				border : false,
				bodyStyle : 'padding-left:40px;',
				height : 600,
				items : [new Ext.Panel({
							region : 'center',
							title : 'panel',
							width : 200,
							height : 400
						})]
			});

	createApproveTask.center = new Ext.Panel({
		region : 'center',
		autoHeight : true,
		border : false,
		layout : 'card',
		activeItem : 0,
		autoScroll : 'true',
		items : [createApproveTask.card1, createApproveTask.card2],
		buttonAlign : 'left',
		buttons : [{
			text : '完成',
			style : 'margin-left:170px;',
			handler : function() {
				var method = 'createApproveTask';
				var message = '创建成功';
				var mask = new Ext.LoadMask(document.body, {
							msg : '' + getResource('resourceParam2007') + ''
						});
				if (createApproveTask.params) {
					if (createApproveTask.params.update) {
						method = 'updateApproveTask';
						mask = new Ext.LoadMask(document.body, {
									msg : '' + getResource('resourceParam2008')
											+ ''
								});
						var message = '更新成功';
					}
				}
				mask.show();
				var freeFlow = Ext.getCmp('freeFlowID1').getValue();
				var approveStepName = Ext.getCmp('approveStep1').getValue();
				var approvePressName = Ext.getCmp("approvePress1").getValue();
				var approvalNote = Ext.getCmp("approvalNote1").getValue();
				var chiefManID = null;
				var participantsID = new Array();
				if (freeFlow == true) {
					if (approvePressName) {
					} else {// 如果为空则提示用户输入
						Ext.Msg
								.alert(	'' + getResource('resourceParam575')
												+ '',
										'' + getResource('resourceParam1004')
												+ '');
						mask.hide();
						return;
					}
					if (approveStepName && Ext.getCmp('approveStep1').isValid()) {
					} else {// 如果为空则提示用户输入
						Ext.Msg
								.alert(	'' + getResource('resourceParam575')
												+ '',
										'' + getResource('resourceParam1005')
												+ '');
						mask.hide();
						return;
					}
					var dataStore = createApproveTask.participantsGrid
							.getStore();
					// 判断是否有负责人，如果没有则需要指定，必须有审批参与人
					var count = dataStore.getCount();
					if (count == 0) {
						Ext.Msg
								.alert(	'' + getResource('resourceParam575')
												+ '',
										'' + getResource('resourceParam1007')
												+ '');
						mask.hide();
						return;
					}
					var j = 0;
					for (i = 0; i < count; i++) {// 判断是否指定负责人
						if (dataStore.getAt(i).get('usertype')) {
							chiefManID = dataStore.getAt(i).get('userid');
						} else {
							participantsID[j] = dataStore.getAt(i)
									.get('userid');
							j++;
						}
					}

					if (chiefManID == null) {
						Ext.Msg
								.alert(	'' + getResource('resourceParam575')
												+ '',
										'' + getResource('resourceParam1008')
												+ '');
						mask.hide();
						return;
					}

				}

				var approvalVo = Seam.Remoting
						.createType("com.sysware.common.approval.vo.ApprovalVo");
				approvalVo.setObjectID(createApproveTask.dataid);
				approvalVo.setObjectType(createApproveTask.datatype);// 这里要与权限那边一致
				approvalVo.setApproveStepName(approveStepName);// 步骤名称
				approvalVo.setApprovePressName(approvePressName);// 流程名称
				approvalVo.setChiefManID(chiefManID);
				approvalVo.setParticipantsID(participantsID);
				approvalVo.setApproveNote(approvalNote);

				// 保存到数据库，已经存在的用户不加入
				callSeam("task_TaskRemote", method, [approvalVo], function(
						result) {
					mask.hide();
					var obj = Ext.util.JSON.decode(result);
					if (obj.success) {
						if (successCallBack) {
							successCallBack(obj);
						}
						if (createApproveTask.params) {
							if (createApproveTask.params.update) {
								method = 'updateApproveTask';
							}
						} 
					} else {
						Ext.Msg
						.alert(	'' + getResource('resourceParam575')
										+ '',
										obj.message);
					}
				});

			}
		}, {
			text : '取消',
			handler : function() {
				cancelCallBack();
			}
		}]
	});
	createApproveTask.setBasic=function(){
		createApproveTask.participantsGrid.getStore().removeAll();//移除负责人、参与人中的所有人，防止重复添加
		Ext.Ajax.request({
			url : "../JSON/task_TaskRemote.getTaskInfo",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					var obj = Ext.util.JSON.decode(response.responseText);
					if (obj.success == true) {
						Ext.getCmp('approveStep1').setValue(obj.stepName);
						Ext.getCmp("approvePress1").setValue(obj.pressName);
						Ext.getCmp("approvalNote1").setValue(obj.note);

						var MyRecord = Ext.data.Record.create([{
									name : 'userid'
								}, {
									name : 'truename'
								}, {
									name : 'ginstitutename'
								}, {
									name : 'usertype'
								}]);
						var list = obj.user;
						var toDataStore = createApproveTask.participantsGrid
								.getStore();
						for (i = 0; i < list.length; i++) {
							var userid = list[i].id;
							var truename = list[i].name;
							var depName = list[i].depName;
							var usertype = list[i].type;
							if (list[i].type == 1) {
								usertype = ""
										+ getResource('resourceParam731')
										+ "";
							} else {
								usertype = "";
							}
							var data = new MyRecord({
										userid : userid,
										truename : truename,
										ginstitutename : depName,
										usertype : usertype
									});
							toDataStore.add(data);
						}
					} else {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam499')
											+ '',
									msg : obj.message,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
					}
				}
			},
			params : {
				node : createApproveTask.dataid
			}
		});
	}
	
	if (createApproveTask.params) {
		if (createApproveTask.params.title) {
			createApproveTask.title = createApproveTask.params.title;
		}
		if (createApproveTask.params.update) {
			createApproveTask.setBasic();
		}
	}

	createApproveTask.mainpanel = new Ext.Panel({
				title : createApproveTask.title,
				height : 800,
				autoScroll : true,
				// disabled:true,
				layout : 'border',
				items : [createApproveTask.north, createApproveTask.center]
			});
	if (container) {
		container.add(createApproveTask.mainpanel);
	}
	return createApproveTask.mainpanel;
}

createApproveTask.getUserGrid = function(isPaging) {

	var sm = new Ext.grid.CheckboxSelectionModel();
	var colModel = new Ext.grid.ColumnModel([// new Ext.grid.RowNumberer(),
	sm, {
				header : "" + getResource('resourceParam879') + "",
				width : 100,
				hidden : true,
				dataIndex : 'userid'
			}, {
				header : "" + getResource('resourceParam1021') + "",
				width : 120,
				dataIndex : 'truename'
			}, {
				header : "" + getResource('resourceParam882') + "",
				width : 120,
				dataIndex : 'ginstitutename'
			}, {
				header : "" + getResource('resourceParam1019') + "",
				width : 60,
				id : 'usertype',
				dataIndex : 'usertype'
			}

	]);

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
			userMultiselect.init(createApproveTask.selectUserCallback,
					createApproveTask.participantsGrid.getStore(), "truename");
		}
	};

	var setLeaderBt = {
		text : '' + getResource('resourceParam1014') + '',
		iconCls : 'add1',
		handler : function() { // 此处的信息应该来自于树节点
			createApproveTask.setLeader();
		}
	};

	var delBt = {
		text : '' + getResource('resourceParam475') + '',
		iconCls : 'del1',
		handler : function() {
			createApproveTask.deleteParticipant();
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

createApproveTask.selectUserCallback = function() {
	var dataStore = userMultiselect.usersore;
	var toDataStore = createApproveTask.participantsGrid.getStore();
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
createApproveTask.reset = function() {
	Ext.getCmp('approvePress1').reset();
	Ext.getCmp('approveStep1').reset();
	Ext.getCmp('approvalNote1').reset();
	createApproveTask.participantsGrid.getStore().removeAll();
}

createApproveTask.deleteParticipant = function() {
	var result = new Array();
	var rows = createApproveTask.participantsGrid.getSelectionModel()
			.getSelections();
	if (rows != null) {
		var size = rows.length;
		if (size == 0) {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam587') + '',
						msg : '' + getResource('resourceParam1001') + '',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}
		Ext.Msg.confirm('' + getResource('resourceParam575') + '', ""
						+ getResource('resourceParam585') + "", function(btn) {
					if (btn == 'yes') {
						var toDataStore = createApproveTask.participantsGrid
								.getStore();
						for (var i = 0; i < size; i++) {
							toDataStore.remove(rows[i]);
						}

					}
				});
	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam587') + '',
					msg : '' + getResource('resourceParam584') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}

createApproveTask.setLeader = function() {// 设定负责人
	var selectedRows = createApproveTask.participantsGrid.getSelectionModel()
			.getSelections();
	if (selectedRows != null) {
		var size = selectedRows.length;
		if (size == 0) {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam587') + '',
						msg : '' + getResource('resourceParam999') + '',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}

		if (size > 1) {
			Ext.MessageBox.show({
						title : '' + getResource('resourceParam587') + '',
						msg : '' + getResource('resourceParam1003') + '',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}

		var toDataStore = createApproveTask.participantsGrid.getStore();
		for (i = 0; i < toDataStore.getCount(); i++) {// 只能设定一个负责人
			toDataStore.getAt(i).set('usertype', '');
		}
		selectedRows[0].set('usertype', '' + getResource('resourceParam731')
						+ '');
		var copyRow = selectedRows[0].copy();
		copyRow.set('usertype', '' + getResource('resourceParam731') + '');
		toDataStore.remove(selectedRows[0]);
		toDataStore.insert(0, copyRow);
	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam587') + '',
					msg : '' + getResource('resourceParam999') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}
