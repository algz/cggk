ApprovalConfigWin = function() {
	var scope = this;
	
	/**
	 * 定义选择类型下拉列表
	 */
	// 选择类型下拉列表数据
	var selTypeData = [
		[0, '随机'],
		[1, '自选']
 	];
	
 	//定义选择类型store
	var selTypeStore = new Ext.data.SimpleStore({
				fields : ['value', 'text'],
				data : selTypeData
	});

	//定义选择类型下拉列表
	selTypeCom = new Ext.form.ComboBox({
		store : selTypeStore,
		mode : 'local',
		fieldLabel:'审批人产生方式',
		triggerAction : 'all',
		valueField : 'value',
		displayField : 'text',
		value : 0
	});
	
	selTypeCom.anchor = '90%';
	
	/**
	 * 定义部门和人员下拉列表
	 */
	departmentUser.init('负责人部门', '负责人');
	departmentUser.departmentCombo.anchor = '90%';
	departmentUser.departmentCombo.allowBlank = true;
	departmentUser.userComb.anchor = '90%';
	departmentUser.userComb.allowBlank = true;
	departmentUser.treePanel.getRootNode().on('load',function(){
		var _root=departmentUser.treePanel.getRootNode();
		var _rec=new Ext.tree.TreeNode({
	        id : '-1',
	        text : '提交人所在部门',
	        qtip : '提交人所在部门',
	        leaf : true
		});
		_root.appendChild(_rec);
        var _rec2=new Ext.tree.TreeNode({
            id : '-2',
            text : '提交人',
            qtip : '提交人',
            leaf : true
        });
        _root.appendChild(_rec2);
	});
	
	/**
	 * 定义角色下拉列表
	 */
	roleListSelect.init('' + getResource('resourceParam731') + ''
			+ getResource('resourceParam803') + '');
	roleListSelect.roleComb.anchor='90%';
	roleListSelect.roleComb.allowBlank = true;
	roleListSelect.roleComb.on('select', function(combo, record, index) {
		var value = record.get('roleid');
		departmentUser.userComb.clearValue();
		if (value != -1) {
			departmentUser.roleId = value;
		} else {
			departmentUser.roleId = null;
		}
	});
	
	this.loadMask = null;
	this.configPanel = new Ext.FormPanel({
		frame : false,
		boder : false,
		bodyStyle : 'padding:10px 0px 10px 10px',
		labelWidth : 100,
		layout : 'form',
		region : 'center',
		items : [departmentUser.departmentCombo, roleListSelect.roleComb,departmentUser.userComb,selTypeCom],
		listeners : {
        	afterrender : function() {
				scope.loadMask = new Ext.LoadMask(scope.configPanel.body.dom, {
					msg : 'loading...'
				});
        	}
        }
	});
	
	this.window = new Ext.Window({
		title : '配置',
		width : 400,
		height : 300,
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
			text : "" + getResource('resourceParam479') + "",
			handler : function(button) {
				scope.save(button);
			}
		}, {
			width : 50,
			text : "" + getResource('resourceParam2006') + "",
			handler : function() {
				scope.window.hide();
			}
		}]
	});
	
	this.save = function(button) {
		scope.loadMask.show();
		Ext.Ajax.request({
			url : "../JSON/approval_templetRemote.saveApprovalNodeExaminer",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				scope.loadMask.hide();
				if(obj.success) {
					scope.window.hide();
				} else {
					Ext.Msg.alert('提示', '保存失败！');
				}
			},
			failure : function(response, options) {
			},
			disableCaching : true,
			params : {
				activityInstanceID : scope.activityId,
				flowInstanceID : scope.flowId,
				id : scope.approvalCommentId,
				examiner : departmentUser.userid,
				chargedDepId : departmentUser.codeid,
				chargedRoleId : departmentUser.roleId,
				selectManMode : selTypeCom.getValue()
			}
		});
	};
	
	this.showWin = function(flowId, activityId) {
		this.flowId = flowId;
		this.activityId = activityId;
		
		this.window.show();
		delete scope.approvalCommentId;
		delete departmentUser.userid;
		delete departmentUser.codeid,
		delete departmentUser.roleId,
		scope.configPanel.getForm().reset();
		this.loadMask.show();
		Ext.Ajax.request({
			url : "../JSON/approval_templetRemote.getApprovalNodeExaminer",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if(obj.success) {
					if(obj.approvalCommentId && obj.approvalCommentId != null && obj.approvalCommentId != '') {
						scope.approvalCommentId = obj.approvalCommentId;
						if(obj.userid!='null') {
							departmentUser.userid = obj.userid;
							departmentUser.userComb.setRawValue(obj.username);
						}
						if(obj.departmentId!='null') {
							departmentUser.codeid=obj.departmentId;
							if(obj.departmentId=='-1') {
								departmentUser.departmentCombo.setTextValue("提交人所在部门");
							} else if (obj.departmentId == '-2') {
								departmentUser.departmentCombo.setTextValue("提交人");
                            } else {
								departmentUser.departmentCombo.setTextValue(obj.departmentName);	
							}	
						}
						if(obj.roleId!='null') {
							departmentUser.roleId=obj.roleId;
							roleListSelect.roleComb.setRawValue(obj.roleName);	
						}
						selTypeCom.setValue(obj.selectManMode);
					}
				}
				scope.loadMask.hide();
			},
			failure : function(response, options) {
			},
			disableCaching : true,
			params : {
				activityID : activityId
			}
		});
	}
}