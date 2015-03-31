/**
 * 会签配置页面，选择不同的会签方式，页面可操作功能不同，若选择评审会签，不可选择审批负责人，
 * 若选择决审会签，不可填写审批通过比率，若选择会审会签，即不能选择审批负责人，也不可填写审批
 * 通过比率
 */
CounterSignConfigWin = function() {
	var scope = this;
	this.loadMask = null;
	
	// 创建formpanel，展示会签方式和审批通过比率
	this.form_panel = new Ext.FormPanel({
		bodyStyle : 'padding:10px 0px 10px 10px',
		region : 'north',
		frame : false,
		boder : false,
		height : 75,
		labelWidth : 80,
		items : [{
            xtype : 'radiogroup',
            name : 'counterJoin',
            fieldLabel : '选择会签类型',
            items: [{
            	boxLabel : '评审会签', 
            	name : 'counterjoinType',
            	inputValue : 7,
              	listeners : { //监听选中事件，设置页面灰显和正常显示
					check : function(radio, checked) {
						if (checked) {
							Ext.getCmp('agreeRate').setValue('');
							Ext.getCmp('agreeRate').enable();
							Ext.getCmp('setLeader').disable();
							scope.grid_panel.getStore().removeAll();		
						}
					}
				}
			}, {
				boxLabel : '决审会签', 
				name : 'counterjoinType',
				inputValue : 8,
                listeners : {
					check : function(radio, checked) {
						if (checked) {
							Ext.getCmp('agreeRate').setValue('');
							Ext.getCmp('agreeRate').disable();
							Ext.getCmp('setLeader').enable();
							scope.grid_panel.getStore().removeAll();		
						}
									
					}
				}
			}, {
				boxLabel : '会审会签', 
				name : 'counterjoinType',
				inputValue : 9,
                listeners : {
					check : function(radio, checked) {
						if (checked) {
							Ext.getCmp('agreeRate').setValue('');
							Ext.getCmp('agreeRate').disable();
							Ext.getCmp('setLeader').disable();
							scope.grid_panel.getStore().removeAll();			
						}	
					}
				}
			}]
        }, {
			border : false,
			width : 200,
			items : [{
				border : false,
				layout : 'column',
				items : [{
					width : 120,
					layout : 'form',
					labelWidth : 80,
					border : false,
					items : [{
						fieldLabel : '审批通过比率',
						width : 30,
			        	disabled : true,
			        	regex : /^([1-9]|[1-9][0-9]|100)?$/,
						regexText : '只能输入1-100之间的数字',//只能输入1-99之间的数字
						xtype : 'textfield',
						id : 'agreeRate'
					}]
				}, {
					width : 25,
					border : false,
					html : '<div valign="middle" align="left">&nbsp;%</div>'
				}]
			}]
		}]
	});
	
	// 渲染参与人类型
	this.renderExaminer = function(value) {
		if (value == 1) {
			return "负责人";
		} 
	}
	
	// 创建复选框
	this.sm = new Ext.grid.CheckboxSelectionModel();
	
	// 创建展示字段
	this.cm = new Ext.grid.ColumnModel([scope.sm, {
		hidden : true,
		width : 100,
		dataIndex : 'userid'
	}, {
		header : "参与者",
		width : 100,
		dataIndex : 'truename'
	}, {
		header : "机构",
		width : 100,
		dataIndex : 'ginstitutename'
	}, {
		header : "参与类型",
		width : 100,
		dataIndex : 'examinerType',
		renderer:scope.renderExaminer
	}, {
		hidden : true,
		width : 100,
		dataIndex : 'instcode'
	}]);
	
	// 创建列表store
	this.ds = function() {
		var url = "../JSON/approval_templetRemote.getCounterJoinNodeInfo";
		var proxy = new Ext.data.HttpProxy({
			url : url,
			method : 'POST'
		});
		var reader = new Ext.data.JsonReader({
			root : 'results',
			totalProperty : 'totalProperty'
		}, [
			'approvalCommentId',
			'examinerType',
			'userid',  
			'instcode', 
			'truename',
			'ginstitutename',
			'nodeTypeId',
			'agreeRate'
		]);
		return new data.Store(proxy, reader);
	};
	
	// 增加参与人回调
	this.selectUserCallback = function() {
		var dataStore = userMultiselect.usersore;
		var toDataStore = scope.grid_panel.getStore();
		for (i = 0; i < dataStore.getCount(); i++) {
			var userid = dataStore.getAt(i).get('userid');
			var truename = dataStore.getAt(i).get('truename');
	
			var record = dataStore.getAt(i);
			if (toDataStore.getById(userid) == null) {// 加入未被选择的用户
				if (!isRep(record)) toDataStore.add(record);
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
	
	// 删除参与人
	this.deleteParticipant = function() {
		var result = new Array();
		var rows = scope.grid_panel.getSelectionModel().getSelections();
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
			Ext.Msg.confirm('' + getResource('resourceParam575') + '', "" + getResource('resourceParam585') + "", function(btn) {// 是否删除当前记录?
				if (btn == 'yes') {
					var toDataStore = scope.grid_panel.getStore();
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
	
	// 设置负责人
	this.setLeader = function() {
		var selectedRows = scope.grid_panel.getSelectionModel().getSelections();
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
					msg : '' + getResource('resourceParam1003') + '',// 只能选择一个负责人
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
				return;
			}
	
			var toDataStore = scope.grid_panel.getStore();
			for (i = 0; i < toDataStore.getCount(); i++) {// 只能设定一个负责人
				toDataStore.getAt(i).set('examinerType', '');
			}
			selectedRows[0].set('examinerType',1);
			var copyRow = selectedRows[0].copy();
			copyRow.set('examinerType', 1);// 负责人
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
	
	// 增加按钮
	var addUserBt = {
		text : '' + getResource('resourceParam1013') + '',
		iconCls : 'add1',
		handler : function() { // 此处的信息应该来自于树节点
			userMultiselect.init(scope.selectUserCallback);
		}
	};

	// 设置负责人按钮
	var setLeaderBt = {
		text : '' + getResource('resourceParam1014') + '',
		iconCls : 'add1',
		id : 'setLeader',
		handler : function() { // 此处的信息应该来自于树节点
			scope.setLeader();
		}
	};

	// 删除负责人按钮
	var delBt = {
		text : '' + getResource('resourceParam475') + '',
		iconCls : 'del1',
		handler : function() {
			scope.deleteParticipant();
		}
	};

	// 创建工具条
	this.tb = ['-', addUserBt, '-', delBt, '-', setLeaderBt, '-'];

	// 创建列表面板，负责展示所选会签的审批参与人
	this.grid_panel = new Ext.grid.GridPanel({
		region : 'center',
		cm : scope.cm,
		sm : scope.sm,
		tbar : scope.tb,
		viewConfig : {
			forceFit : true
		},
		ds : scope.ds()
	});
	
	// 页面汇总面板，合并formpanel和gridpanel
	this.configPanel = new Ext.Panel({
		frame : false,
		boder : false,
		region : 'center',
		layout : 'border',
		bodyStyle : 'padding:10px 0px 10px 10px',
		listeners : {
        	afterrender : function() {
				scope.loadMask = new Ext.LoadMask(scope.configPanel.body.dom, {
					msg : 'loading...'
				});
        	}
        },
		items:[scope.form_panel,scope.grid_panel]
	});
	
	// 创建弹出窗口
	this.window = new Ext.Window({
		title : '配置',
		width : 500,
		height : 400,
		buttonAlign : 'right',
		closeAction : 'hide',
		layout : 'border',
		resizable : false,
		modal : true,
		plain : true,
		bodystyle : 'padding:5px',
		items : [this.configPanel],
		buttons : [{
			width : 50,
			text : "" + getResource('resourceParam479') + "",//确定按钮
			handler : function(button) {
				scope.save(button);
			}
		}, {
			width : 50,
			text : "" + getResource('resourceParam2006') + "",//关闭按钮
			handler : function() {
				scope.window.hide();
			}
		}]
	});
	
	// 保存页面信息
	this.save = function(button) {
		scope.loadMask.show();
		var counterJionValue=scope.form_panel.getForm().findField('counterJoin').getValue().inputValue;
		var stroe=scope.grid_panel.getStore();
		var conut=stroe.getCount();
		var agreeRateValue=Ext.getCmp('agreeRate').getValue();
		if(conut==0) {
			Ext.MessageBox.show({
				title : '提示',
				msg : '请至少选择一个会签参与人！',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			scope.loadMask.hide();
			return;
		}
		if(counterJionValue == 7) {
			if(agreeRateValue==''||agreeRateValue==null) {
				Ext.MessageBox.show({
					title : '提示',
					msg : '请填写审批通过比例！',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
				scope.loadMask.hide();
				return;
			}
		} else if(counterJionValue == 8) {
			var sign=false;
			for(i=0;i<conut;i++) {
				if(stroe.getAt(i).get('examinerType')==1) {
					sign=true;
					break;
				}
			} 
			if(!sign) {
				Ext.MessageBox.show({
					title : '提示',
					msg : '请选择审批负责人！',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
				scope.loadMask.hide();
				return;
			}
		}
		var listVo = new Array();
		for(i=0;i<conut;i++) {
			var approval_comment_vo = Seam.Remoting.createType("com.sysware.common.approval.vo.ApprovalCommentVo");
			approval_comment_vo.setExaminer(stroe.getAt(i).get('userid'));
			
			if(stroe.getAt(i).get('examinerType')!=1) {
				approval_comment_vo.setExaminerType(2);
			} else {
				approval_comment_vo.setExaminerType(stroe.getAt(i).get('examinerType'));
			}
			listVo.push(approval_comment_vo);
		}
		
		var approval_comment_All = Seam.Remoting.createType("com.sysware.common.approval.vo.ApprovalCommentVo");
		approval_comment_All.setFlowInstanceID(scope.flowId);
		approval_comment_All.setActivityInstanceID(scope.activityId);
		approval_comment_All.setList(listVo);
		approval_comment_All.setCounterJoinType(counterJionValue);
		approval_comment_All.setAgreeRate(agreeRateValue);
		Seam.Component.getInstance("approval_templetRemote").saveCounterJoinNode(approval_comment_All, scope.saveSuccess);
	};
	
	// 保存后的回调
	this.saveSuccess=function(sign) {
		scope.loadMask.hide();
		if(sign) {
			scope.window.hide();
		} else {
			Ext.Msg.alert('提示', '保存失败！');
		}
	}
	
	// 展示窗口
	this.showWin = function(flowId, activityId) {
		this.flowId = flowId;
		this.activityId = activityId;
		this.window.show();
		this.loadMask.show();
		Ext.Ajax.request({
			url : "../JSON/approval_templetRemote.getCounterJoinType",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if(obj.success) {
					scope.form_panel.getForm().findField('counterJoin').setValue(obj.nodeTypeId);
					if(obj.nodeTypeId==7) {
						Ext.getCmp('agreeRate').enable();
						Ext.getCmp('setLeader').disable();
					} else if(obj.nodeTypeId==8) {
						Ext.getCmp('agreeRate').disable();
						Ext.getCmp('setLeader').enable();
					} else {
						Ext.getCmp('agreeRate').disable();
						Ext.getCmp('setLeader').disable();
					}
					Ext.getCmp('agreeRate').setValue(obj.agreeRate);
					scope.grid_panel.getStore().load({
						params : {
							activityID : activityId
						}
					});
					scope.loadMask.hide();
				}
			},
			failure : function(response, options) {
				Ext.Msg.alert('提示', '获取数据失败！');
				scope.loadMask.hide();
			},
			disableCaching : true,
			params : {
				activityID : activityId
			}
		});
	}
}