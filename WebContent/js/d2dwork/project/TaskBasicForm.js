var TaskBasicForm = {

	fatherStart : null,
	fatherEnd : null,
	// 计划开始结束时间的父子约束
	allowBlank : false,
	constrain : function(obj,config) {
	config=config||{};
	config.timeConstrain=true;
	if(config&&config.timeConstrain){
	if (obj.start != null) {
		try {
			TaskBasicForm.fatherStart = obj.start;
			TaskBasicForm.start.setMinValue(TaskBasicForm.fatherStart);
			TaskBasicForm.end.setMinValue(TaskBasicForm.fatherStart);
			TaskBasicForm.fatherStart = null;
		} catch (e) {
		}
	}
	if (obj.end != null) {
		try {
			TaskBasicForm.fatherEnd = obj.end;
			TaskBasicForm.start.setMaxValue(TaskBasicForm.fatherEnd);
			TaskBasicForm.end.setMaxValue(TaskBasicForm.fatherEnd);
			TaskBasicForm.fatherEnd = null;
			
		} catch (e) {
		}
	}
	}
	if(config&&config.timeExtend){
	//计划开始时间、结束时间的继承 
		TaskBasicForm.start.setValue(obj.start);
		TaskBasicForm.start1=TaskBasicForm.start.getValue();
		TaskBasicForm.end.setValue(obj.end)
		TaskBasicForm.end1=TaskBasicForm.end.getValue();
	}
	if(config&&config.chargedExtend){
	//负责人负责部门的继承
		departmentUser.departmentCombo.setTextValue(obj.tdepart);
		departmentUser.codeid = obj.tdepartid;// 部门id
		departmentUser.userComb.setValue(obj.tuser);
		departmentUser.userid = obj.tuserid;
		departmentUser.currentDegree =obj.securityDegree;
	}
	
	}
};
function viewLoad() {
	// leftNavigationTree.nodeId
	if (TaskBasicForm.user.getValue() == "") {
		Ext.example.msg(getResource('resourceParam596'),
				getResource('resourceParam5048'));
		return;
	}
	// var projectId = '';
	// if (leftNavigationTree.nodeId.substring(0, 1) == 'p') {
	// projectId =
	// collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId).id
	// .substring(1);
	// } else {
	// projectId =
	// collarbMain.leftTree.getNodeById(leftNavigationTree.nodeId).attributes.projectId;
	// }
    
    /**
     * zhengjg
     * TaskBasicForm.user.getValue()不是用户ID，导致无法显示个人负荷
     */
	//personLoad.init(TaskBasicForm.projectId, TaskBasicForm.user.getValue());
    personLoad.init(TaskBasicForm.projectId, departmentUser.userid);
}
TaskBasicForm.init = function(callback) {
	departmentUser.init('' + getResource('resourceParam986') + '', ''
					+ getResource('resourceParam1041') + '');
	departmentUser.departmentCombo.setWidth(250);
	departmentUser.departmentCombo.allowBlank = true;
	departmentUser.departmentCombo.style = 'margin-bottom: 5px;';
	departmentUser.userComb.setWidth(200);
	departmentUser.userComb.listWidth=250;
	departmentUser.userComb.allowBlank = true;
	departmentUser.userComb.style = 'margin-bottom: 5px;';
	var deptID = null;
	/**
	 * getDepartmentID RPC method
	 * 参数值传null时，只返回当前用户所在部门的ID值，用于全部展开，并选中
	 * 参数值传all时，则返回当前用户所在部门及所有上级部门的的ID值序列，以"/"分隔，用于只展开所在部门所属分支，并选中
	 */
	Seam.Component.getInstance("common_inst_InstSelectSvr").getDepartmentID('all',
			function(dept){
				deptID = dept;
			});
/** 只展开当前用户所在部门并选中的设置函数 begin */
	var ff = function(arrId, pos, dest){
		if (pos >= arrId.length) return false;
		
		var node = departmentUser.treePanel.getNodeById(arrId[pos]);
		if (node) {
			node.expand(false, false, function(node){
				var tmpNode = departmentUser.treePanel.getNodeById(dest);
				if (tmpNode) {
					tmpNode.select();
				} else {
					ff(arrId, (pos + 1), dest);
				}
			});
		}
	}
/** 只展开当前用户所在部门并选中的设置函数 end */
	
	departmentUser.departmentCombo.on('expand', function() {
		departmentUser.treePanel.on('expandnode', function(node) {
			/*
			 * 原来写法
			var node = departmentUser.treePanel.getNodeById(0);
			if (node != null) {
				node.expand();
			}*/
			
/** 只展开当前用户所在部门并选中 begin */
			var arr = deptID.split('/');
			var dest = arr[arr.length - 1];
			arr.length = arr.length - 1;
			ff(arr, 0, dest);
/** 只展开当前用户所在部门并选中 end */

/** 全部展开选中当前部门 begin */
//			var firstNode = departmentUser.treePanel.getNodeById(0);
//			if (firstNode.attributes.id == '0') {
//				firstNode.expand(true, true, function(node){
//					var tmpNode = departmentUser.treePanel.getNodeById(deptID);
//					if (tmpNode) {
//						tmpNode.select();
//					}
//				});
//				return firstNode;
//			}
/** 全部展开选中当前部门 end */
		});
	});

	TaskBasicForm.application1 = null;
	TaskBasicForm.application = new Ext.form.ComboBox({
		store : new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/applicationop_tapplicationsvr.getApplication'
					}),
			reader : new Ext.data.JsonReader({
						totalProperty : 'totalProperty',
						root : 'root'
					}, [{
								name : 'applicationid'
							}, {
								name : 'applicationname'
							}])
		}),
		fieldLabel : '' + getResource('resourceParam558') + '',
		hiddenName : 'application',
		valueField : "applicationid",
		displayField : "applicationname",
		mode : 'remote',
		allowBlank : true,
		disabled : false,
		forceSelection : true,
		editable : false,
		triggerAction : 'all',
		emptyText : '' + getResource('resourceParam459') + ''
				+ getResource('resourceParam558') + '...',
		labelStyle : 'padding:5px 0px 5px 0px',
		listeners : {
			select : function(combo, record, index) {
				TaskBasicForm.application1 = record.get('applicationid');
			},
			beforequery : function(qe) {
				var userId = departmentUser.userid;
//				if (userId == null||userId == '') {
//					Ext.example.msg(""+getResource('resourceParam575')+"", "请先选择负责人!");
//					return;
//				}
				this.store.baseParams = {
					userId : userId
				}
				delete qe.combo.lastQuery;
			}
		},
		style : 'margin-bottom: 5px;',
		width : 250
	});
	TaskBasicForm.application.getStore().on('load',function(store){
		if(store.getTotalCount()<1){
			Ext.example.msg(""+getResource('resourceParam575')+"", store.reader.jsonData.msg);
		}
	})

	TaskBasicForm.saturation1 = 100;
	TaskBasicForm.saturation = new Ext.form.NumberField({
				fieldLabel : getResource('resourceParam4028'),
				name : 'saturation',
				maxValue : 100,
				minValue : 0,
				allowBlank : true,
				enableKeyEvents : true,
				value : TaskBasicForm.saturation1,
				width : 200,
				style : 'margin-bottom: 5px;',
				allowDecimals : false,
				allowNegative : false,
				invalidText : getResource('resourceParam4049'),
				listeners : {
					keyup : function(field) {
						var value = field.getValue();
						TaskBasicForm.saturation1 = value;
						if (TaskBasicForm.duration1) {
							var mh = Math.ceil(TaskBasicForm.duration1 * value
									/ 100*8);
							TaskBasicForm.manhour.setValue(mh);
							TaskBasicForm.manhour1 = mh;
						} else {
							if (TaskBasicForm.manhour1) {
								var dura = Math.ceil(TaskBasicForm.manhour1/8
										/ value * 100);
								TaskBasicForm.duration1 = dura;
								TaskBasicForm.duration.setValue(dura);
								TaskBasicForm.timeMethod('duration', dura);
							}
						}
					}
				}
			});

	TaskBasicForm.manhour1 = null;
	TaskBasicForm.manhour = new Ext.form.NumberField({
				fieldLabel : getResource('resourceParam4029'),//工时
				name : 'manhour',
				maxValue : Math.pow(2, 31) - 1,
				minValue : 0,
				allowBlank : true,
				enableKeyEvents : true,
				width : 200,
				style : 'margin-bottom: 5px;',
				allowDecimals : false,
				allowNegative : false,
				readOnly : true,
				listeners : {
					keyup : function(field) {
//						var value = field.getValue();
//						TaskBasicForm.manhour1 = value;
//						if (TaskBasicForm.duration1) {
//							// 工期存在，填入工时，计算饱和度
//							var mh = Math.ceil(value / (TaskBasicForm.duration1*8)
//									* 100);
//							TaskBasicForm.saturation.setValue(mh);
//							TaskBasicForm.saturation1 = mh;
//						} else {
//							if (TaskBasicForm.saturation1) {
//								// 饱和度存在，填入工时，计算工期
//								var dura = Math.ceil(value
//										/ TaskBasicForm.saturation1 * 100);
//								TaskBasicForm.duration1 = dura;
//								TaskBasicForm.duration.setValue(dura);
//								TaskBasicForm.timeMethod('duration', dura);
//							}
//						}

					}
				}
			});

	TaskBasicForm.whenDurationChange = function(duration) {
		if (TaskBasicForm.saturation1) {
			var v = Math.ceil(duration * TaskBasicForm.saturation1 / 100*8);
			TaskBasicForm.manhour.setValue(v);
			TaskBasicForm.manhour1 = v;
		} else if (TaskBasicForm.manhour1) {
			var v = Math.ceil(TaskBasicForm.manhour1/8
					/ TaskBasicForm.saturation1 * 100);
			TaskBasicForm.saturation.setValue(v);
			TaskBasicForm.saturation1 = v;
		}
	}

	departmentUser.userComb.on('select', function(combo, record, index) {
				TaskBasicForm.application.setRawValue('');
				TaskBasicForm.application1 = null;
			});

	TaskBasicForm.department = departmentUser.departmentCombo;
	TaskBasicForm.user = departmentUser.userComb;
	TaskBasicForm.isApproval1 = 1;// 默认为自定义审批人
	TaskBasicForm.isApproval = new Ext.form.ComboBox({
				value : 1,
				fieldLabel : '' + getResource('resourceParam9116') + '',
				hiddenName : 'isApproval',
				allowBlank : false,
				width : 250,
				labelStyle : 'padding:5px 0px 5px 0px',
				style : 'margin-bottom: 5px;',
				store : new Ext.data.SimpleStore({
							fields : ['key', 'value'],
							data : [
									[
											0,
											''
													+ getResource('resourceParam9119')
													+ ''],
									[
											1,
											''
													+ getResource('resourceParam9118')
													+ '']
//                                    ,zhengjg 去掉上级审批方式
//									[
//											2,
//											''
//													+ getResource('resourceParam9117')
//													+ '']
                                  ]
						}),
				listeners : {
					select : function(combo, record, index) {
						TaskBasicForm.isApproval1 = record.get('key');
					}
				},
				valueField : 'key',
				displayField : 'value',
				typeAhead : false,
				mode : 'local',
				triggerAction : 'all',
				selectOnFocus : true,
				forceSelection : true,
				editable : false
			});
	var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/task_TaskRemote.getTaskTypes'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'root'
						}, [{
									name : 'taskcategoryid'
								}, {
									name : 'taskcategoryname'
								}])
			});
	store.on('beforeload', function(store, options) {
				options.params = Ext.apply(options.params, {
							projectId : TaskBasicForm.projectId
						});
			});
			
	store.on('load',function(){
		var size = store.getTotalCount();
		if(size<1){
			Ext.example.msg(""+getResource('resourceParam575')+"", "任务类型没有创建,请你首先创建任务类型!");
		}
	});		
	
	TaskBasicForm.type = new Ext.form.ComboBox({
				store : store,
				fieldLabel : '' + getResource('resourceParam1043')
						+ '(<span style="color:red;" >＊</span>)',
				hiddenName : 'category',
				valueField : "taskcategoryid",
				displayField : "taskcategoryname",
				mode : 'remote',
				allowBlank : false,
				disabled : false,
				forceSelection : true,
				editable : false,
				triggerAction : 'all',
				emptyText : '' + getResource('resourceParam1159') + '',
				labelStyle : 'padding:5px 0px 5px 0px',
				listeners : {
					select : function(combo, record, index) {
						TaskBasicForm.taskcategoryid = record
								.get('taskcategoryid');
						createExtendForm.isExtendFormExist = false;
					},
					beforequery : function(qe) {
						delete qe.combo.lastQuery;
					}
				},
				style : 'margin-bottom: 5px;',
				width : 250
			});

	// 任务进度反馈方式
	var enumStore = new Ext.data.Store({
				autoLoad : true,
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/data_Remote.getSysEnumsVo'
						}),
				reader : new Ext.data.JsonReader({
							totalProperty : 'totalProperty',
							root : 'results'
						}, [{
									name : 'id'
								}, {
									name : 'enumsname'
								}])
			});
	enumStore.on('load', function(store, options) {
				TaskBasicForm.backEnum.setValue(store.getAt(0).get('id'));
				TaskBasicForm.backEnum1 = store.getAt(0).get('id');
			});
	enumStore.on('beforeload', function(store, options) {
				options.params = Ext.apply(options.params, {
							type : 3
						});
			});
	TaskBasicForm.backEnum1 = null
	TaskBasicForm.backEnum = new Ext.form.ComboBox({
				store : enumStore,
				fieldLabel : '' + getResource('resourceParam9123') + '',
				hiddenName : 'backEnum',
				valueField : "id",
				displayField : "enumsname",
				mode : 'remote',
				allowBlank : false,
				disabled : false,
				forceSelection : true,
				editable : false,
				triggerAction : 'all',
				emptyText : '' + getResource('resourceParam459') + '...',
				labelStyle : 'padding:5px 0px 5px 0px',
				style : 'margin-bottom: 5px;',
				width : 250,
				listeners : {
					select : function(combo, record, index) {
						TaskBasicForm.backEnum1 = record.get('id');
						if (TaskBasicForm.backEnum1 != 3832861) {
							TaskBasicForm.plannedquantity.disable();
						} else {
							TaskBasicForm.plannedquantity.enable();
						}
					}
				}
			});

	TaskBasicForm.plannedquantity1 = null;
	TaskBasicForm.plannedquantity = new Ext.form.NumberField({
				fieldLabel : getResource('resourceParam9133'),
				name : 'plannedquantity',
				maxValue : Math.pow(2, 31) - 1,
				minValue : 1,
				allowBlank : true,
				enableKeyEvents : true,
				disabled : true,
				width : 250,
				emptyText : '' + getResource('resourceParam9134') + '',
				style : 'margin-bottom: 5px;',
				allowDecimals : false,
				allowNegative : false
			});

	TaskBasicForm.role1 = null;
	roleListSelect.init('' + getResource('resourceParam731') + ''
			+ getResource('resourceParam803') + '');
	roleListSelect.roleComb.setWidth(250);
	roleListSelect.roleComb.allowBlank = true;
	roleListSelect.roleComb.style = 'margin-bottom: 5px;';
	roleListSelect.roleComb.on('select', function(combo, record, index) {
				var value = record.get('roleid');
				departmentUser.userComb.clearValue();
				if (value != -1) {
					departmentUser.roleId = value;
					TaskBasicForm.role1 = value;
				} else {
					departmentUser.roleId = null;
					TaskBasicForm.role1 = null;
				}
			});
	TaskBasicForm.role = roleListSelect.roleComb;
	/**
	 * TaskBasicForm.role = new Ext.form.ComboBox({ store : new Ext.data.Store({
	 * proxy : new Ext.data.HttpProxy({ url :
	 * '../JSON/task_TaskRemote.getAllRoles' }), reader : new
	 * Ext.data.JsonReader({ totalProperty : 'totalProperty', root : 'root' }, [{
	 * name : 'id' }, { name : 'name' }]) }), fieldLabel : '' +
	 * getResource('resourceParam731') + '' + getResource('resourceParam803') +
	 * '', hiddenName : 'role', valueField : "id", displayField : "name", mode :
	 * 'remote', allowBlank : true, disabled : false, forceSelection : true,
	 * editable : false, triggerAction : 'all', emptyText : '' +
	 * getResource('resourceParam1159') + '', labelStyle : 'padding:5px 0px 5px
	 * 0px', listeners : { select : function(combo, record, index) { var value =
	 * record.get('id'); departmentUser.userComb.clearValue(); if (value != -1) {
	 * departmentUser.roleId = value; TaskBasicForm.role1 = value; } else {
	 * departmentUser.roleId = null; TaskBasicForm.role1 = null; } } }, style :
	 * 'margin-bottom: 5px;', width : 250 });
	 */
	TaskBasicForm.status = new Ext.form.ComboBox({
		store : new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : "../JSON/project_ProjectRemote.getTaskStatus"
							}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'totalProperty',
								root : 'root'
							}, [{
										name : 'taskstatusid'
									}, {
										name : 'taskstatusname'
									}])
				}),
		valueField : "taskstatusid",
		displayField : "taskstatusname",
		mode : 'remote',
		forceSelection : true,
		disabled : false,
		hiddenName : 'taskstatusid',
		editable : false,
		triggerAction : 'all',
		fieldLabel : '' + getResource('resourceParam739') + '',
		// anchor : '95%',
		style : 'margin-bottom: 5px;',
		width : 250,
		allowBlank : true,
		value : '' + getResource('resourceParam947') + '',// 默认设置为编制中
		disabled : true
	});
	var step = {
		one : null,
		two : null,
		flag : 1
	}

	TaskBasicForm.timeMethod = function(name, value) {
		// 用来标记当前更改的位置
		if (!step.one) {
			step.flag = 1;
			step.one = name;
		} else if (!step.two) {
			if (step.one == name) {
				// 与one中内容一样，
				step.flag = 1;
				step.one = name;
			} else {
				step.flag = 2;
				step.two = name;
			}
		} else if (step.one && step.two) {
			if (step.flag == 1) {
				if (step.one == name) {
					// 与one中内容一样，
					step.flag = 1;
					step.one = name;
				} else {
					step.flag = 2;
					step.two = name;
				}
			} else if (step.flag == 2) {
				if (step.two == name) {
					step.flag = 2;
					step.two = name;
				} else {
					step.flag = 1;
					step.one = name;
				}
			}
		}
		if (step.one && !step.two) {
			// 第一次
			// 设置选择的节点
			if (name == 'duration') {
				TaskBasicForm.duration1 = value;
				TaskBasicForm.whenDurationChange(value);
			} else if (name == 'start') {
				TaskBasicForm.end.setMinValue(value);
				TaskBasicForm.start1 = value.format('Y-m-d');
			} else if (name == 'end') {
				TaskBasicForm.start.setMaxValue(value);
				TaskBasicForm.end1 = value.format('Y-m-d');
			}
		} else {
			if (step.flag == 1) {
				if (name == 'duration') {
					TaskBasicForm.duration1 = value;
					if (step.two == 'end') {
						// 有工期 结束时间 ，设置开始
						// 先设置结束，再设置工期
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanStart',
									method : 'POST',
									success : function(response, options) {
										TaskBasicForm.start
												.setValue(response.responseText);
										TaskBasicForm.end
												.setMinValue(response.responseText);
										TaskBasicForm.start1 = response.responseText;
									},
									params : {
										duration : TaskBasicForm.duration1,
										end : TaskBasicForm.end1
									}
								});
					} else if (step.two == 'start') {
						// 有 工期，开始时间 ，设置结束
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanEnd',
									method : 'POST',
									success : function(response, options) {
										TaskBasicForm.end
												.setValue(response.responseText);
										TaskBasicForm.start
												.setMaxValue(response.responseText);
										TaskBasicForm.end1 = response.responseText;
									},
									params : {
										duration : TaskBasicForm.duration1,
										start : TaskBasicForm.start1
									}
								});
					}
				} else if (name == 'start') {
					TaskBasicForm.end.setMinValue(value);
					TaskBasicForm.start1 = value.format('Y-m-d');
					if (step.two == 'end') {
						// 有开始 结束，设置工期
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanDuration',
									method : 'POST',
									success : function(response, options) {
										var d = response.responseText;
										TaskBasicForm.duration.setValue(d);
										TaskBasicForm.whenDurationChange(d);
										TaskBasicForm.duration1 = d;
									},
									params : {
										start : TaskBasicForm.start1,
										end : TaskBasicForm.end1
									}
								});
					} else if (step.two == 'duration') {
						// 有 开始 工期 ，设置结束
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanEnd',
									method : 'POST',
									success : function(response, options) {
										TaskBasicForm.end
												.setValue(response.responseText);
										TaskBasicForm.start
												.setMaxValue(response.responseText);
										TaskBasicForm.end1 = response.responseText;
									},
									params : {
										duration : TaskBasicForm.duration1,
										start : TaskBasicForm.start1
									}
								});
					}
				} else if (name == 'end') {
					TaskBasicForm.start.setMaxValue(value);
					TaskBasicForm.end1 = value.format('Y-m-d');
					if (step.two == 'duration') {
						// 结束 工期 ，设置开始
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanStart',
									method : 'POST',
									success : function(response, options) {
										TaskBasicForm.start
												.setValue(response.responseText);
										TaskBasicForm.end
												.setMinValue(response.responseText);
										TaskBasicForm.start1 = response.responseText;
									},
									params : {
										duration : TaskBasicForm.duration1,
										end : TaskBasicForm.end1
									}
								});
					} else if (step.two == 'start') {
						// 结束开始，设置工期
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanDuration',
									method : 'POST',
									success : function(response, options) {
										var d = response.responseText;
										TaskBasicForm.duration.setValue(d);
										TaskBasicForm.whenDurationChange(d);
										TaskBasicForm.duration1 = d;
									},
									params : {
										start : TaskBasicForm.start1,
										end : TaskBasicForm.end1
									}
								});
					}
				}

			} else if (step.flag == 2) {
				if (name == 'duration') {
					TaskBasicForm.duration1 = value;
					if (step.one == 'end') {
						// 有工期 结束时间 ，设置开始
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanStart',
									method : 'POST',
									success : function(response, options) {
										TaskBasicForm.start
												.setValue(response.responseText);
										TaskBasicForm.end
												.setMinValue(response.responseText);
										TaskBasicForm.start1 = response.responseText;
									},
									params : {
										duration : TaskBasicForm.duration1,
										end : TaskBasicForm.end1
									}
								});
					} else if (step.one == 'start') {
						// 有 工期，开始时间 ，设置结束
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanEnd',
									method : 'POST',
									success : function(response, options) {
										TaskBasicForm.end
												.setValue(response.responseText);
										TaskBasicForm.start
												.setMaxValue(response.responseText);
										TaskBasicForm.end1 = response.responseText;
									},
									params : {
										duration : TaskBasicForm.duration1,
										start : TaskBasicForm.start1
									}
								});
					}
				} else if (name == 'start') {
					TaskBasicForm.end.setMinValue(value);
					TaskBasicForm.start1 = value.format('Y-m-d');
					if (step.one == 'end') {
						// 有开始 结束，设置工期
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanDuration',
									method : 'POST',
									success : function(response, options) {
										var d = response.responseText;
										TaskBasicForm.duration.setValue(d);
										TaskBasicForm.whenDurationChange(d);
										TaskBasicForm.duration1 = d;
									},
									params : {
										start : TaskBasicForm.start1,
										end : TaskBasicForm.end1
									}
								});
					} else if (step.one == 'duration') {
						// 有 开始 工期 ，设置结束
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanEnd',
									method : 'POST',
									success : function(response, options) {
										TaskBasicForm.end
												.setValue(response.responseText);
										TaskBasicForm.start
												.setMaxValue(response.responseText);
										TaskBasicForm.end1 = response.responseText;
									},
									params : {
										duration : TaskBasicForm.duration1,
										start : TaskBasicForm.start1
									}
								});
					}
				} else if (name == 'end') {
					TaskBasicForm.start.setMaxValue(value);
					TaskBasicForm.end1 = value.format('Y-m-d');
					if (step.one == 'duration') {
						// 结束 工期 ，设置开始
						// 先设置工期，再设置结束
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanStart',
									method : 'POST',
									success : function(response, options) {
										TaskBasicForm.start
												.setValue(response.responseText);
										TaskBasicForm.end
												.setMinValue(response.responseText);
										TaskBasicForm.start1 = response.responseText;
									},
									params : {
										duration : TaskBasicForm.duration1,
										end : TaskBasicForm.end1
									}
								});
					} else if (step.one == 'start') {
						// 结束开始，设置工期
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanDuration',
									method : 'POST',
									success : function(response, options) {
										var d = response.responseText;
										TaskBasicForm.duration.setValue(d);
										TaskBasicForm.whenDurationChange(d);
										TaskBasicForm.duration1 = d;
									},
									params : {
										start : TaskBasicForm.start1,
										end : TaskBasicForm.end1
									}
								});
					}
				}
			}

		}

	}
	TaskBasicForm.duration1 = null;
	TaskBasicForm.duration = new Ext.form.NumberField({
				fieldLabel : getResource('resourceParam4034'),//工期
				name : 'duration',
				maxValue : Math.pow(2, 31) - 1,
				minValue : 1,
				allowBlank : true,
				enableKeyEvents : true,
				width : 200,
				style : 'margin-bottom: 5px;',
				allowDecimals : false,
				allowNegative : false,
				blankText : '请' + getResource('resourceParam494') + '天数',
				emptyText : '请' + getResource('resourceParam494') + '天数',
				invalidText : '' + getResource('resourceParam1024') + '',
				listeners : {
					keyup : function(field) {
						TaskBasicForm.timeMethod('duration', field.getValue());
						TaskBasicForm.whenDurationChange(field.getValue());
					}
				}
			});

	TaskBasicForm.start = new Sysware.P2M.DateField({
				format : getResource('resourceParam5043'),// 设置日期格式 月/日/年
				// fieldLabel : '计划开始时间(<span style="color:red;" >＊</span>)',
				fieldLabel : '' + getResource('resourceParam991') + '(<span style="color:red;" >＊</span>)',
				editable : false,
				name : 'start',
//				minText : 'Can\'t have a start date before today!',
				// disabledDays : [0, 6],// 去掉周六、周日
				disabledDaysText : 'Start date is not available on the weekends',
				allowBlank : TaskBasicForm.allowBlank,
				labelStyle : 'padding:5px 0px 5px 0px',
				style : 'margin-bottom: 5px;',
				width : 250,
				listeners : {
					select : function(field, value) {
						TaskBasicForm.timeMethod('start', value);
						/*
						 * 定位计划结束时间的可选范围
						 */
						TaskBasicForm.end.plannedStart = value;
						
					}
				}

			});
	TaskBasicForm.end = new Sysware.P2M.DateField({
				format : getResource('resourceParam5043'),// 设置日期格式 月/日/年
				// fieldLabel : '计划完成时间(<span style="color:red;" >＊</span>)',
				fieldLabel : '' + getResource('resourceParam1032') + '(<span style="color:red;" >＊</span>)',
				editable : false,
				name : 'end',
//				minText : 'Can\'t have a end date before today!',
				// disabledDays : [0, 6],// 去掉周六、周日
				disabledDaysText : 'End date is not available on the weekends',
				allowBlank : TaskBasicForm.allowBlank,
				labelStyle : 'padding:5px 0px 5px 0px',
				style : 'margin-bottom: 5px;',
				width : 250,
				listeners : {
					select : function(field, value) {
						TaskBasicForm.timeMethod('end', value);
						// TaskBasicForm.start.setMaxValue(value);
						// //
						// TaskBasicForm.start.setMinValue(collarbMain.start);
						// TaskBasicForm.end1 = (new
						// Date(value)).format('Y-m-d');
					}
				}
			});
	TaskBasicForm.securityDegree1 = null;
	TaskBasicForm.securityDegree = new Ext.form.ComboBox({
		store : new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : '../JSON/groups_GroupsRemote.getSecurityDegree'
							}),
					reader : new Ext.data.JsonReader({
								totalProperty : 'totalProperty',
								root : 'root'
							}, [{
										name : 'id'
									}, {
										name : 'name'
									}])
				}),
		fieldLabel : getResource('resourceParam1973'),
		hiddenName : 'securityDegree',
		valueField : "id",
		displayField : "name",
		mode : 'remote',
		allowBlank : true,
		disabled : false,
		forceSelection : true,
		editable : false,
		triggerAction : 'all',
		emptyText : getResource('resourceParam5044'),
		labelStyle : 'padding:5px 0px 5px 0px',
		listeners : {
			select : function(combo, record, index) {
				var value = record.get('id')
				//当前用户的密级
				if(departmentUser.currentDegree!=null){
					//如果选取的密级大于负责人密级
					if(value>departmentUser.currentDegree){
						Ext.example.msg('',getResource('resourceParam9174'));
						departmentUser.userComb.clearValue();
						departmentUser.userid = null;
					    departmentUser.currentDegree=null;
					}
				}
				departmentUser.securityDegree = value;
				TaskBasicForm.securityDegree1 = value;
			},
			beforequery : function(qe) {
				delete qe.combo.lastQuery;
			}
		},
		style : 'margin-bottom: 5px;',
		width : 250
	});

	TaskBasicForm.form = new Ext.form.FormPanel({
		bodyStyle : 'padding:10px 0px 10px 10px',
		autoScroll : true,
		split : true,
		border : false,
		autoWidth : true,
		items : [
				{
					xtype : 'textfield',
					fieldLabel : '' + getResource('resourceParam998')
							+ '(<span style="color:red;" >＊</span>)',
					name : 'name',
					id : 'quanjiao1',
					allowBlank : false,
					style : 'margin-bottom: 5px;',
					maxLength : 100,
					maxLengthText : '名称长度过长，不能超过100！',
					minLength : 1,
					minLengthText : '' + getResource('resourceParam1002') + '',
					blankText : '' + getResource('resourceParam1199') + '',
//					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
					/**
					 * bug编号971 wangyf
					 * bug信息：项目名称要求只能输入英文字符、数字、汉字，却能输入中文符号。
					 * 2011-06-03 14：09
					 */
					regex : /^([\u4e00-\u9fa5]|[a-zA-Z]|\d)*$/,
					// regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
					// regexText : '只能输入中文,字母,数字',
					width : 250,
					invalidText : '' + getResource('resourceParam1563') + '',
					validator : function() {
						var value = this.getValue();
						var length = value.length;
						var s = 0;
						var e = length - 1;
						while (s < length) {
							if (value.charAt(s) == ' ') {
								s++;
							} else {
								break;
							}
						}
						while (e > s) {
							if (value.charAt(e) == ' ') {
								e--;
							} else {
								break;
							}
						}
						value = value.substring(s, e + 1);
						if (value.length > 0) {
							return true;
						} else {
							return false;
						}
					},
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
							Ext.getCmp('quanjiao1').setValue(curStr);
						}
					}
				},
				TaskBasicForm.type,
				TaskBasicForm.securityDegree,
				TaskBasicForm.role,
				TaskBasicForm.department,
				new Ext.Panel({
					border : false,
					width : 550,
					items : [{
						border : false,
						layout : 'column',
						items : [{
									width : 320,
									layout : 'form',
									border : false,
									items : [TaskBasicForm.user]
								}, {
									width : 30,
									layout : 'form',
									border : false,
									items : [new Ext.form.Label({
										// width : 20,
										html : '<a onclick="viewLoad()" style="color:#0000FF;text-decoration:underline;cursor:pointer">'
												+ getResource('resourceParam5050')
												+ '</a>'
									})]
								}]
					}]
				}), TaskBasicForm.status,new Ext.Panel({
					border : false,
					width : 550,
					items : [{
						border : false,
						layout : 'column',
						items : [{
									width : 320,
									layout : 'form',
									border : false,
									items : [TaskBasicForm.duration]
								}, {
									width : 30,
									layout : 'form',
									border : false,
									items : [new Ext.form.Label({
										// width : 20,
										html : '天'
									})]
								}]
					}]
				}) ,
				new Ext.Panel({
					border : false,
					width : 550,
					items : [{
						border : false,
						layout : 'column',
						items : [{
									width : 320,
									layout : 'form',
									border : false,
									items : [TaskBasicForm.saturation]
								}, {
									width : 30,
									layout : 'form',
									border : false,
									items : [new Ext.form.Label({
										// width : 20,
										html : '%'
									})]
								}]
					}]
				}) , new Ext.Panel({
					border : false,
					width : 550,
					items : [{
						border : false,
						layout : 'column',
						items : [{
									width : 320,
									layout : 'form',
									border : false,
									items : [TaskBasicForm.manhour]
								}, {
									width : 30,
									layout : 'form',
									border : false,
									items : [new Ext.form.Label({
										// width : 20,
										html : '小时'
									})]
								}]
					}]
				}) ,
				TaskBasicForm.start, TaskBasicForm.end,
				TaskBasicForm.application, TaskBasicForm.isApproval,
				TaskBasicForm.backEnum, TaskBasicForm.plannedquantity, 
				{
					id : 'addTextarea',
					xtype : 'textarea',
					fieldLabel : '' + getResource('resourceParam1044') + '',
					name : 'ttextarea',
					style : 'margin-bottom: 0px;',
					width : 250,
					height:100,
					disabled : false,
					maxLength : 500,
//					grow : true,
//					growMin : 50,
					preventScrollbars : false,
					maxLengthText : getResource('resourceParam9180'),
					enableKeyEvents : true,
					listeners : {'keyup' : function(cur, evt) {
							var curLen = cur.getValue().length;
							if(curLen <= 500) {
								collarbForm.viewTi = '您还可以输入' + (500 - curLen) + '个字';
								Ext.get('addTaskWang').dom.innerHTML = collarbForm.viewTi;
							} else {
								collarbForm.viewTi = '<font color="red" style="margin-right:-65px;">字数已超过规定长度，请酌情删减！</font>';
								Ext.get('addTaskWang').dom.innerHTML = collarbForm.viewTi;
							}
							
						}
					}
				}, 
				new Ext.Panel({
					   width : 400,
					   border:false,
					   html:'<div id="addTaskWang" style="color:#0000FF;text-align:center;margin-left:-55px;"></div>'
				}),
				{
					xtype : 'button',
					style : 'margin-left: 315px;',
					text : '' + getResource('resourceParam1151') + '',
					handler : nextPage
				}]
	})

	function nextPage() {
		var textValue = Ext.getCmp('addTextarea').getValue();
		if(textValue.length > 500) {
			Ext.MessageBox.show({
				title : '' + getResource('resourceParam634')
						+ '',
				msg : '' + "字数不能超过500，请酌情删减！" + '',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.ERROR
			});
			return ;
		} 
		if (TaskCardFrame.basicForm.getForm().isValid()) {
			if (createExtendForm.isExtendFormExist) {
				TaskCardFrame.card.layout.setActiveItem(1);
				try {
					// 传第一个form的data
					TaskBasicForm.name1 = TaskCardFrame.basicForm.getForm()
							.findField('name').getValue();
					TaskBasicForm.type1 = TaskCardFrame.basicForm.getForm()
							.findField('category').getValue();
					TaskBasicForm.department1 = departmentUser.codeid;
					TaskBasicForm.user1 = departmentUser.userid;
					TaskBasicForm.textarea1 = TaskCardFrame.basicForm.getForm()
							.findField('ttextarea').getValue();
					TaskBasicForm.plannedquantity1 = TaskCardFrame.basicForm
							.getForm().findField('plannedquantity').getValue();
					// start,end在其select中
				} catch (e) {
				} finally {
				}
			} else {
				Ext.Ajax.request({
							url : '../JSON/task_TaskRemote.getTaskExtendForm',
							method : 'POST',
							success : function(response, options) {
								TaskCardFrame.panel2
										.remove(TaskCardFrame.extendForm);
								TaskCardFrame.extendForm = TaskExtendForm
										.init(callback);
								TaskCardFrame.panel2.items
										.add(TaskCardFrame.extendForm);
								TaskCardFrame.panel2.doLayout();

								TaskCardFrame.card.layout.setActiveItem(1);
								var obj = Ext.util.JSON
										.decode(response.responseText);
								var labelWidth = obj.labelWidth;
								var items = obj.items;
								createExtendForm.createForm(
										TaskCardFrame.extendForm, items,
										labelWidth);
								if (obj.length == 0) {
									Ext.Msg
											.alert(
													''
															+ getResource('resourceParam575')
															+ '',
													''
															+ getResource('resourceParam1148')
															+ '');
								}
							},
							params : {
								taskcategoryid : TaskBasicForm.taskcategoryid
							}
						});

				try {
					// 传第一个form的data
					TaskBasicForm.name1 = TaskCardFrame.basicForm.getForm()
							.findField('name').getValue();
					TaskBasicForm.type1 = TaskCardFrame.basicForm.getForm()
							.findField('category').getValue();
					TaskBasicForm.department1 = departmentUser.codeid;
					TaskBasicForm.user1 = departmentUser.userid;
					TaskBasicForm.textarea1 = TaskCardFrame.basicForm.getForm()
							.findField('ttextarea').getValue();
					TaskBasicForm.plannedquantity1 = TaskCardFrame.basicForm
							.getForm().findField('plannedquantity').getValue();
					// start,end在其select中
				} catch (e) {
				} finally {
				}
			}
		}
	}

	return TaskBasicForm.form;
}
