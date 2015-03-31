var approvePanel = {
	north : null,
	card1 : null,
	status : null
};
/*
 * 参数说明：
 * container:approvePanel所处的容器
 * dataId：要审批的数据id
 * dataType：要审批的数据类型
 * callback: 取消审批 的回调
 * processName: 审批名称
 * callback1:审批成功的 回调
 * 
 * */
approvePanel.init = function(container, dataId, dataType, callback,
		processName, callback1, objejctId) {
	approvePanel.dataid = dataId;
	approvePanel.datatype = dataType;
	approvePanel.objectId = objejctId;
	var title = '';
//	if (dataType == "TaskDataType") {
//		title = ''+getResource('resourceParam1059')+'';
//	} else if (dataType == "ProjectDataType") {
//		title = ''+getResource('resourceParam1060')+'';
//	} else if (dataType == "TemplateDataType") {
//		title = ''+getResource('resourceParam1062')+''+getResource('resourceParam943')+'模板';
//	} else if (dataType == "DataObjectDataType") {
//		title = ''+getResource('resourceParam1062')+''+getResource('resourceParam615')+'';
//	}
	approvePanel.title = title;
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
								text : ''+getResource('resourceParam1011')+':'
							}, {
								columnWidth : .4,
								checked : true,
								xtype : 'radio',
								boxLabel : ''+getResource('resourceParam1012')+'',
								name : 'method',
								id : 'freeFlowID',
								inputValue : 1,
								listeners : {
									check : function(radio, checked) {
										if (checked) {
											approvePanel.center.getLayout()
													.setActiveItem(0);
										} else {
											approvePanel.center.getLayout()
													.setActiveItem(1);
										}
									}
								}
							}, {
								columnWidth : .4,
								disabled : true,
								xtype : 'radio',
								boxLabel : ''+getResource('resourceParam1006')+'',
								name : 'method',
								id : 'method2',
								inputValue : 2
							}

					]
				}]
			});

	approvePanel.participantsGrid = approvePanel.getUserGrid(false);

	approvePanel.card1 = new Ext.Panel({
				border : false,
				bodyStyle : 'padding-left:40px;',
				autoHeight : 200,
				items : [{
							xtype : 'fieldset',
							title : ''+getResource('resourceParam1015')+'',
							labelWidth : 60,
							width : 425,
							region : 'center',
							autoHeight : true,
							items : [{
										xtype : 'textfield',
										width : 130,
										fieldLabel : ''+getResource('resourceParam1016')+'',
										id : 'approvePress',
										allowBlank : false,
										maxLength : 20,
										maxLengthText : ''+getResource('resourceParam1000')+'',
										minLength : 1,
										minLengthText : ''+getResource('resourceParam1002')+'',
										blankText : ''+getResource('resourceParam1009')+'',
										regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
										regexText : ''+getResource('resourceParam679')+'',
										anchor : '95%',
										style : 'margin-bottom:5px;',
										disabled : true,
										//value : processName
										value : '编制中处理'
									}, {
										xtype : 'textfield',
										width : 130,
										fieldLabel : ''+getResource('resourceParam1017')+'',//步骤名称
										id : 'approveStep',
										allowBlank : false,
										maxLength : 20,
										maxLengthText : ''+getResource('resourceParam1000')+'',
										minLength : 1,
										minLengthText : ''+getResource('resourceParam1002')+'',
										blankText : ''+getResource('resourceParam1010')+'',
										regex : /^[^\s]+([\u0391-\uFFE5]|[a-zA-Z]|\d|\s)*$/,
										regexText : ''+getResource('resourceParam679')+'',
										anchor : '95%',
										style : 'margin-bottom:5px;'
									}, {
										xtype : 'textarea',
										id : 'approvalNote',
										width : 317,
										style : 'margin-top:5px;',
										height : 80,
										fieldLabel : ''+getResource('resourceParam1018')+''
									}, approvePanel.participantsGrid]
						}]

			});
	approvePanel.card2 = new Ext.Panel({
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
					text : ''+getResource('resourceParam1062')+'',
					style : 'margin-left:170px;',
					handler : function() {					
						approvePanel.combPanel = new Ext.LoadMask(document.body, {msg:'正在提交操作，请稍候...'});
						approvePanel.combPanel.show();
						var freeFlow = Ext.getCmp('freeFlowID').getValue();
						var approveStepName = Ext.getCmp('approveStep').getValue();
						var approvePressName = Ext.getCmp("approvePress").getValue();
						var approvalNote = Ext.getCmp("approvalNote").getValue();
						var chiefManID = null;
						var participantsID = new Array();
						if (freeFlow == true) {
							if (approvePressName) {
							} else {// 如果为空则提示用户输入
								approvePanel.combPanel.hide();
								Ext.Msg.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam1004')+'');
								return;
							}
							if (approveStepName&&Ext.getCmp('approveStep').isValid()) {
							} else {// 如果为空则提示用户输入
								approvePanel.combPanel.hide();
								Ext.Msg.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam1005')+'');
								return;
							}
							var dataStore = approvePanel.participantsGrid.getStore();
							// 判断是否有负责人，如果没有则需要指定，必须有审批参与人
							var count = dataStore.getCount();
							if (count == 0) {
								approvePanel.combPanel.hide();
								Ext.Msg.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam1007')+'');
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
								Ext.Msg.alert(''+getResource('resourceParam575')+'', ''+getResource('resourceParam1008')+'');
								return;
							}

						}
						//更改状态为处理中
						approvePanel.updateStatus(approvePanel.objectId);
						
						var approvalVo = Seam.Remoting.createType("com.sysware.common.approval.vo.ApprovalVo");
						approvalVo.setObjectID(approvePanel.dataid);
						approvalVo.setObjectType(approvePanel.datatype);// 这里要与权限那边一致
						approvalVo.setApproveStepName(approveStepName);// 步骤名称
						approvalVo.setApprovePressName(approvePressName);// 流程名称
						approvalVo.setChiefManID(chiefManID);
						approvalVo.setParticipantsID(participantsID);
						approvalVo.setApproveNote(approvalNote);

						// approvalVo.setApproveStatus(approvePanel.status);

						// 保存到数据库，已经存在的用户不加入
						callSeam("qualityMgm_qualityTemplate", "startApprovalStep", [approvalVo], function(result) {
							var obj = Ext.util.JSON.decode(result);
							if (obj.success) {
								if (callback1) {
									// collrabMain中refresh
									callback1(true);
								}
								Ext.MessageBox.show({
									title : ''+getResource('resourceParam575')+'',
									msg : ''+getResource('resourceParam1061')+'',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.OK,
									fn : function() {
										/*重新加载*/
										Ext.getCmp('modalWind').close();
										var cneterpanel = Ext.getCmp('centerpanel').items.get(0);
										if (cneterpanel) {
											Ext.getCmp('centerpanel').remove(cneterpanel);
										}
										var attributePanel = wareHouseAttribute.init(wareHouseAttribute.typeid,wareHouseAttribute.wsname,wareHouseAttribute.wsid,wareHouseAttribute.desc);
										Ext.getCmp('centerpanel').add(attributePanel);
										Ext.getCmp('centerpanel').doLayout();
										
									}
								});
							} else {
								Ext.MessageBox.show({
									title : ''+getResource('resourceParam575')+'',
									msg : obj.message,
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.OK
								});
							}
						});
					}
				}, {
					text : '取消',
					handler : function() {
						//callback();
					Ext.getCmp('modalWind').close();
					}
				}]
			});

	approvePanel.mainpanel = new Ext.Panel({
				title : approvePanel.title,
				height : 520,
				autoScroll : true,
				layout : 'border',
				items : [approvePanel.north, approvePanel.center]
			});
	if (container) {
		container.add(approvePanel.mainpanel);
	}
	return approvePanel.mainpanel;
}

approvePanel.getUserGrid = function(isPaging) {

	var sm = new Ext.grid.CheckboxSelectionModel();
	var colModel = new Ext.grid.ColumnModel([// new Ext.grid.RowNumberer(),
	sm, {
				header : ""+getResource('resourceParam879')+"",
				width : 100,
				hidden : true,
				dataIndex : 'userid'
			}, {
				header : ""+getResource('resourceParam1021')+"",
				width : 120,
				dataIndex : 'truename'
			}, {
				header : ""+getResource('resourceParam882')+"",
				width : 120,
				dataIndex : 'ginstitutename'
			}, {
				header : ""+getResource('resourceParam1019')+"",
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
		text : ''+getResource('resourceParam1013')+'',
		iconCls : 'add1',
		handler : function() { // 此处的信息应该来自于树节点
			userMultiselect.init(approvePanel.selectUserCallback,
					approvePanel.participantsGrid.getStore(), "truename");
		}
	};

	var setLeaderBt = {
		text : ''+getResource('resourceParam1014')+'',
		iconCls : 'add1',
		handler : function() { // 此处的信息应该来自于树节点
			approvePanel.setLeader();
		}
	};

	var delBt = {
		text : ''+getResource('resourceParam475')+'',
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
	Ext.getCmp('approveStep').setValue('');
	Ext.getCmp('approvalNote').setValue('');
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
						title : ''+getResource('resourceParam587')+'',
						msg : ''+getResource('resourceParam1001')+'',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}
		Ext.Msg.confirm(''+getResource('resourceParam575')+'', ""+getResource('resourceParam585')+"", function(btn) {
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
					title : ''+getResource('resourceParam587')+'',
					msg : ''+getResource('resourceParam584')+'',
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
						title : ''+getResource('resourceParam587')+'',
						msg : ''+getResource('resourceParam999')+'',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}

		if (size > 1) {
			Ext.MessageBox.show({
						title : ''+getResource('resourceParam587')+'',
						msg : ''+getResource('resourceParam1003')+'',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return;
		}

		var toDataStore = approvePanel.participantsGrid.getStore();
		for (i = 0; i < toDataStore.getCount(); i++) {// 只能设定一个负责人
			toDataStore.getAt(i).set('usertype', '');
		}
		selectedRows[0].set('usertype', ''+getResource('resourceParam731')+'');
		var copyRow = selectedRows[0].copy();
		copyRow.set('usertype', ''+getResource('resourceParam731')+'');
		toDataStore.remove(selectedRows[0]);
		toDataStore.insert(0, copyRow);
	} else {
		Ext.MessageBox.show({
					title : ''+getResource('resourceParam587')+'',
					msg : ''+getResource('resourceParam999')+'',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}

approvePanel.updateStatus = function(objectId) {
	var conn = synchronize.createXhrObject();
	url = "../JSON/qualityMgm_qualityTemplate.updateObjectInfo?objectId="+ objectId;
	conn.open("GET", url, false);
	conn.send(null);
}
