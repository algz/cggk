var participants = {
	north : null,
	card1 : null,
	status : null,
	taskId : null,
	sign : null,
	gridPanel : null,
	adform : null
};
participants.init = function() {
	// participants.dataid = dataId;
	// participants.datatype = dataType;
	// participants.title = "" + getResource('resourceParam1021') + "";

	participants.participantsGrid = participants.getUserGrid(false);
	return participants.participantsGrid;
}
// 得到任务或项目ID
getTaskId = function() {
	var taskId = leftNavigationTree.nodeId;
	var reg = '^[0-9]*$';
	if (taskId != 0) {
		if (!taskId.match(reg)) {
			participants.taskId = taskId.substring(1, taskId.length);
			participants.sign = 0;
		} else {
			participants.taskId = taskId;
			participants.sign = 1;
		}
	}
}
// 根据项目ID或任务ID得到参与人数据
getpStore = function() {
	var ds = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/participants_ParticipantRemote.queryParticipantByTaskid'
		}),
		reader : new Ext.data.JsonReader({
					id : 'username',
					root : 'results',
					totalProperty : 'totalProperty'
				}, ['username', 'rolename', 'depname', 'userid'])
	});
	getTaskId();
	ds.load({
				params : {
					taskid : participants.taskId,
					sign : participants.sign,
					start : 0,
					limit : 25
				}
			});
	return ds;
}
// 得到参与人面板
participants.getUserGrid = function(isPaging) {

	var addBt = {
		id : 'add',
		disabled : true,
		text : '' + getResource('resourceParam466') + '',
		iconCls : 'add1',
		handler : function() { // 此处的信息应该来自于树节点
			userMultiselect.init(participants.selectUserCallback);
//			, getpStore(),
//					"username"
		}
	};

	var selBt = {
		id : 'sel',
		disabled : true,
		text : '' + getResource('resourceParam4014') + '',
		iconCls : 'search1',
		handler : function() { // 此处的信息应该来自于树节点
			participants.selparticipants();
		}
	};

	var delBt = {
		id : 'del',
		disabled : true,
		text : '' + getResource('resourceParam475') + '',
		iconCls : 'del1',
		handler : function() {
			participants.deleteParticipant();
		}
	};

	var backBt = {
		id : 'back',
		disabled : true,
		text : ''+ getResource('resourceParam7064')
				+ getResource('resourceParam6076') + '',
//		iconCls : 'add1',
		handler : function() {
			getTaskId();
			participants.gridPanel.getStore().reload({
						params : {
							taskid : participants.taskId,
							sign : participants.sign,
							userid : null,
							depid : null,
							start : 0,
							limit : 25
						}
					});
		}
	};

	var tb = ['-', addBt, '-', delBt, '-', selBt, '-', backBt, '-'];
	// 参与人面板
	var grid = new Ext.Panel({
//				title : '' + getResource('resourceParam732') + '',
				id : 'participantsPanel',
				layout : 'fit',
				width : '100%',
				height : 800,
				tbar : tb
			});
	// var grid;
	// if (isPaging) {
	// grid = myGrid.init(ds, colModel, tb, sm);
	// } else {
	// grid = myGrid.initNoPaging(ds, colModel, tb, sm);
	// }
	// grid.height = 200;
	// grid.width = 400;
	// grid.title='参与者',
	// grid.autoScroll = 'true';
	// grid.autoWidth = 'true';
	// 更改项目或任务ID时执行的方法
	participants.grid=grid;
	/*
	 * edit by suny,inorder to control the top tool bar in collarbTabPanel
	 * 
	grid.on('activate', function() {
				var reg = '^[0-9]*$';
				var taskId = leftNavigationTree.nodeId;
				if (!taskId.match(reg)) {
					taskId = taskId.substring(1, taskId.length);
					parPanel = participants.parPanel(taskId, 0);
					Ext.getCmp("add").enable();
					Ext.getCmp("del").enable();
					Ext.getCmp("sel").enable();
					Ext.getCmp("back").enable();
				} else {
					var node = collarbMain.leftTree.getNodeById(taskId);
					var nt = node.attributes.nt;
					if (nt == 0 || nt == '0') {
						parPanel = participants.parPanel(taskId, 1);
						Ext.getCmp("add").enable();
						Ext.getCmp("del").enable();
						Ext.getCmp("sel").enable();
						Ext.getCmp("back").enable();
					} else if (taskId == 0 || nt == 1 || nt == '1') {
						Ext.getCmp("add").disable();
						Ext.getCmp("del").disable();
						Ext.getCmp("sel").disable();
						Ext.getCmp("back").disable();
						parPanel = new Ext.Panel({
									width : '100%',
									height : '100%',
									html : ''
											+ getResource('resourceParam7001')
											+ getResource('resourceParam474')
											+ ''
								});
					}
				}
				grid.removeAll();
				grid.add(parPanel);
				grid.layout.setActiveItem(0);
				grid.doLayout();
			});
			*/
	return grid;
}
// 增加参与者的回调方法
participants.selectUserCallback = function() {
	var dataStore = userMultiselect.usersore;
	var toDataStore = getpStore();
	var userids = '';
	var count = 0;
	for (i = 0; i < dataStore.getCount(); i++) {
		var userid = dataStore.getAt(i).get('userid');
		var truename = dataStore.getAt(i).get('truename');

		var record = dataStore.getAt(i);
		if (toDataStore.getById(userid) == null) {// 加入未被选择的用户
			if (!isRep(record)) {
				count++;
				// toDataStore.add(record);
				userids += record.get('userid') + ',';
			}
		}
	}
	if (count != 0) {
		userids = userids.substring(0, userids.length - 1);
		taskId = leftNavigationTree.nodeId;
		var pvo = Seam.Remoting
				.createType("com.sysware.p2m.task.participants.ParticipantsVo");
		getTaskId();
		pvo.setTaskid(participants.taskId);
		pvo.setSign(participants.sign);
		pvo.setUserids(userids);
		Seam.Component.getInstance("participants_ParticipantRemote")
				.addParticipants(pvo, participants.addYN);
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
participants.reset = function() {
	Ext.getCmp('approveStep1').setValue('');
	Ext.getCmp('approvalNote1').setValue('');
	participants.participantsGrid.getStore().removeAll();
}
// 删除参与者
participants.deleteParticipant = function() {
	var result = new Array();
	var rows = participants.gridPanel.getSelectionModel().getSelections();
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
						// var toDataStore = participants.gridPanel
						// .getStore();
						// for (var i = 0; i < size; i++) {
						// toDataStore.remove(rows[i]);
						// }
						var userids = '';
						for (var i = 0; i < size; i++) {
							if (rows[i].get('rolename') != ""
									+ getResource('resourceParam731') + "") {
								userids += rows[i].get('userid') + ',';
							} else {
								Ext.MessageBox.show({
											title : ''
													+ getResource('resourceParam587')
													+ '',
											msg : ''
													+ getResource('resourceParam7062')
													+ getResource('resourceParam1067')
													+ '',
											buttons : Ext.MessageBox.OK,
											icon : Ext.MessageBox.ERROR
										});
								return;
							}
						}
						userids = userids.substring(0, userids.length - 1);
						taskId = leftNavigationTree.nodeId;
						var pvo = Seam.Remoting
								.createType("com.sysware.p2m.task.participants.ParticipantsVo");
						getTaskId();
						pvo.setTaskid(participants.taskId);
						pvo.setSign(participants.sign);
						pvo.setUserids(userids);
						Seam.Component
								.getInstance("participants_ParticipantRemote")
								.deleteParticipants(pvo, participants.deleteYN);
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
// 增加参与者callback方法
participants.addYN = function(value) {
	if (value == true) {
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam631') + "");
		getTaskId();
		participants.gridPanel.getStore().reload({
					params : {
						taskid : participants.taskId,
						sign : participants.sign,
						start : 0,
						limit : 25
					}
				});
	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : '' + getResource('resourceParam804') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}
// 删除参与者callback方法
participants.deleteYN = function(value) {
	if (value == true) {
		Ext.example.msg("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam649') + "");
		getTaskId();
		participants.gridPanel.getStore().reload({
					params : {
						taskid : participants.taskId,
						sign : participants.sign,
						start : 0,
						limit : 25
					}
				});
	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam638') + '',
					msg : '' + getResource('resourceParam650') + '',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
}
/**
 * 根据任务ID列出负责人和所有参与者
 * 
 * @param {}
 *            taskId
 * @return {}
 */
// 获取参与人面板
participants.parPanel = function(taskId, sign) {
	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel({
		defaults: {
	        sortable: false,
	        menuDisabled: true
	    },
		columns : [sm, {
			header : "" + getResource('resourceParam7064') + "",
			width : 100,
			dataIndex : 'username'
		}, {
			header : "" + getResource('resourceParam882') + "",
			width : 100,
			dataIndex : 'depname'
		}, {
			header : "" + getResource('resourceParam1019') + "",
			width : 100,
			dataIndex : 'rolename'
		}]
	});
	var ds = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			url : '../JSON/participants_ParticipantRemote.queryParticipantByTaskid'
		}),
		reader : new Ext.data.JsonReader({
					id : 'username',
					root : 'results',
					totalProperty : 'totalProperty'
				}, ['username', 'rolename', 'depname', 'userid'])
	});
	ds.load({
				params : {
					taskid : taskId,
					sign : sign,
					start : 0,
					limit : 25
				}
			});
	participants.gridPanel = new Ext.grid.GridPanel({
				width : '100%',
				heigth : '100%',
				store : ds, // 绑定数据源
				cm : cm, // 设置列模板
				sm : sm,
				autoScroll : true,
				loadMask : {
					msg : '' + getResource('resourceParam579') + ''
				},
				trackMouseOver : true, // 鼠标放到行上是否有痕迹
				viewConfig : {
					forceFit : true,
					enableRowBody : true,
					showPreview : true
				}
			});
	return participants.gridPanel;
};
// 根据查询条件查询参与人
participants.selparticipants = function() {
	delete departmentUser.departmentCombo;
	delete departmentUser.userComb;
	departmentUser.init("" + getResource('resourceParam7064')
					+ getResource('resourceParam689') + "", ""
					+ getResource('resourceParam7064')
					+ getResource('resourceParam6096') + "");
	departmentUser.departmentCombo.anchor = '95%';
	departmentUser.userComb.anchor = '95%';
	departmentUser.userComb.allowBlank = true;
	// if (!participants.addDialog) {
	// tlework.addHtml(tlework.divHtml, "participants");
	participants.addDialog = new Ext.Window({
				// el : 'participants',
				title : '' + getResource('resourceParam4014')
						+ getResource('resourceParam7064') + '',
				modal : true,
				layout : 'border',
				width : 420,
				height : 150,
				closeAction : 'hide',
				plain : false,
				items : participants.addform()
			});
	// }
	participants.adform.getComponent(0).insert(0, {
				columnWidth : .9,
				layout : 'form',
				defaultType : 'textfield',
				items : [departmentUser.departmentCombo]
			});
	participants.adform.getComponent(0).insert(1, {
				columnWidth : .9,
				layout : 'form',
				defaultType : 'textfield',
				items : [departmentUser.userComb]
			});

	participants.addDialog.show();
	// participants.addDialog.on("hide", function() {
	// participants.addDialog.close();
	// participants.addDialog.destroy();
	// participants.addDialog = null;
	// });
};
participants.addform = function() {
	participants.adform = new Ext.FormPanel({
		/**
		 * bug编号252 已修改
		 * @author wangyf
		 */
		labelWidth : 90, // label settings here cascade unless
		frame : true,
		region : 'center',
		plain : false,
		// shadow: false,
		bodyStyle : 'padding:5px 5px 0',
		width : 100,
		items : [{
					layout : 'column',
					items : []
				}],
		buttons : [{
			text : '' + getResource('resourceParam479') + '',
			handler : function() {
				if (participants.adform.form.isValid()) {
					if (departmentUser.codeid == 0) {
						Ext.MessageBox.show({
									title : ''
											+ getResource('resourceParam587')
											+ '',
									msg : '' + getResource('resourceParam864')
											+ '',
									buttons : Ext.MessageBox.OK,
									icon : Ext.MessageBox.ERROR
								});
						return;
					}
					getTaskId();
					participants.gridPanel.getStore().reload({
								params : {
									taskid : participants.taskId,
									sign : participants.sign,
//									userid : departmentUser.userComb.getValue(),
									//edit by suny ,20101220
									userid : departmentUser.userid,
//									depid : departmentUser.departmentCombo
//											.getValue(),
									depid : departmentUser.codeid,
									start : 0,
									limit : 25
								}
							});
					participants.addDialog.close();
				}
			}
		}, {
			text : '' + getResource('resourceParam6002') + '', // 取消
			handler : function() {
				participants.adform.getForm().reset();
				participants.addDialog.close();
			}
		}]
	});
	return participants.adform;
};
participants.activatePanel=function(dataType,projectId,taskId,taskType){
	if(dataType=='ProjectDataType'){
		parPanel = participants.parPanel(projectId, 0);
		Ext.getCmp("add").enable();
		Ext.getCmp("del").enable();
		Ext.getCmp("sel").enable();
		Ext.getCmp("back").enable();
	}else if(dataType=='taskDataType'){
		if (taskType == 0 || taskType == '0') {
			parPanel = participants.parPanel(taskId, 1);
			Ext.getCmp("add").enable();
			Ext.getCmp("del").enable();
			Ext.getCmp("sel").enable();
			Ext.getCmp("back").enable();
		} else if (taskId == 0 || taskType == 1 || taskType == '1') {
			Ext.getCmp("add").disable();
			Ext.getCmp("del").disable();
			Ext.getCmp("sel").disable();
			Ext.getCmp("back").disable();
			parPanel = new Ext.Panel({
						width : '100%',
						height : '100%',
						html : ''
								+ getResource('resourceParam7001')
								+ getResource('resourceParam474')
								+ ''
					});
		}
	}else{
		Ext.getCmp("add").disable();
		Ext.getCmp("del").disable();
		Ext.getCmp("sel").disable();
		Ext.getCmp("back").disable();
		parPanel = new Ext.Panel({
					width : '100%',
					height : '100%',
					html : ''
							+ getResource('resourceParam7001')
							+ getResource('resourceParam474')
							+ ''
				});
		
	}
	participants.grid.removeAll();
	participants.grid.add(parPanel);
//	participants.grid.layout.setActiveItem(0);
	participants.grid.doLayout();
}
participants.activate=function() {
	var reg = '^[0-9]*$';
	var taskId = leftNavigationTree.nodeId;
	if (!taskId.match(reg)) {
		taskId = taskId.substring(1, taskId.length);
		parPanel = participants.parPanel(taskId, 0);
		Ext.getCmp("add").enable();
		Ext.getCmp("del").enable();
		Ext.getCmp("sel").enable();
		Ext.getCmp("back").enable();
	} else {
		var node = collarbMain.leftTree.getNodeById(taskId);
		var nt = node.attributes.nt;
		if (nt == 0 || nt == '0') {
			parPanel = participants.parPanel(taskId, 1);
			Ext.getCmp("add").enable();
			Ext.getCmp("del").enable();
			Ext.getCmp("sel").enable();
			Ext.getCmp("back").enable();
		} else if (taskId == 0 || nt == 1 || nt == '1') {
			Ext.getCmp("add").disable();
			Ext.getCmp("del").disable();
			Ext.getCmp("sel").disable();
			Ext.getCmp("back").disable();
			parPanel = new Ext.Panel({
						width : '100%',
						height : '100%',
						html : ''
								+ getResource('resourceParam7001')
								+ getResource('resourceParam474')
								+ ''
					});
		}
	}
	participants.grid.removeAll();
	participants.grid.add(parPanel);
//	participants.grid.layout.setActiveItem(0);
	participants.grid.doLayout();
}
