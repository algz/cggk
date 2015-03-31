var updateTaskBasic = {
	fatherStart : null,
	fatherEnd : null,
	duration : null,
	// 标记类型是否改变了 true改变类型了
	flag : false,
	//计划开始结束时间的父子约束
	allowBlank:true,
	constrain : function(obj) {
		if (obj.start != null) {
			try {
				updateTaskBasic.fatherStart = obj.start;
				updateTaskBasic.start.setMinValue(updateTaskBasic.fatherStart);
				updateTaskBasic.end.setMinValue(updateTaskBasic.fatherStart);
				updateTaskBasic.fatherStart = null;

			} catch (e) {
			}
		}
		if (obj.end != null) {
			try {
				updateTaskBasic.fatherEnd = obj.end;
				updateTaskBasic.start.setMaxValue(updateTaskBasic.fatherEnd);
				updateTaskBasic.end.setMaxValue(updateTaskBasic.fatherEnd);
				updateTaskBasic.fatherEnd = null;
			} catch (e) {
			}
		}
	}

};
updateTaskBasic.init = function(callback) {
	updateTaskBasic.flag = false;
	departmentUser.init('' + getResource('resourceParam986') + '', ''
					+ getResource('resourceParam1041') + '');
	departmentUser.departmentCombo.setWidth(250);
	departmentUser.departmentCombo.allowBlank = true;
	departmentUser.departmentCombo.style = 'margin-bottom: 5px;';
	departmentUser.userComb.setWidth(250);
	departmentUser.userComb.listWidth=250;
	departmentUser.userComb.allowBlank = true;
	departmentUser.userComb.style = 'margin-bottom: 5px;';
	departmentUser.departmentCombo.on('expand', function() {
				departmentUser.treePanel.on('expandnode', function() {
							var node = departmentUser.treePanel.getNodeById(0);
							if (node != null) {
								node.expand();
							}
						});
			});

	updateTaskBasic.application = new Ext.form.ComboBox({
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
				updateTaskBasic.application1 = record.get('applicationid');
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
	updateTaskBasic.application.getStore().on('load',function(store){
		if(store.getTotalCount()<1){
			Ext.example.msg(""+getResource('resourceParam575')+"", store.reader.jsonData.msg);
		}
	})

	departmentUser.userComb.on('select', function(combox, record, index) {
				departmentUser.userid = record.get('userid');
				updateTaskBasic.application.setRawValue('');
				updateTaskBasic.application1 = null;

			});

	updateTaskBasic.whenDurationChange = function(duration) {
		if (updateTaskBasic.saturation1) {
			var v = Math.ceil(duration * updateTaskBasic.saturation1 / 100 * 8);
			updateTaskBasic.manhour.setValue(v);
			updateTaskBasic.manhour1 = v;
		} else if (updateTaskBasic.manhour1) {
			var v = Math.ceil(updateTaskBasic.manhour1 / 8
					/ updateTaskBasic.saturation1 * 100);
			updateTaskBasic.saturation.setValue(v);
			updateTaskBasic.saturation1 = v;
		}
	}

	updateTaskBasic.isApproval = new Ext.form.ComboBox({
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
									[0, '' + getResource('resourceParam9119') + ''],
									[1, '' + getResource('resourceParam9118') + '']
//                                    ,zhengjg 去掉上级审批方式
//									[2, '' + getResource('resourceParam9117') + '']
							]
						}),
				listeners : {
					select : function(combo, record, index) {
						updateTaskBasic.isApproval1 = record.get('key');
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
	var step = {
		one : null,
		two : null,
		flag : 1
	}
	updateTaskBasic.timeMethod = function(name, value) {
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
				updateTaskBasic.duration1 = value;
				updateTaskBasic.whenDurationChange(value);
			} else if (name == 'start') {
				updateTaskBasic.end.setMinValue(value);
				updateTaskBasic.start1 = value.format('Y-m-d');
			} else if (name == 'end') {
				updateTaskBasic.start.setMaxValue(value);
				updateTaskBasic.end1 = value.format('Y-m-d');
			}
		} else {
			if (step.flag == 1) {
				if (name == 'duration') {
					updateTaskBasic.duration1 = value;
					if (step.two == 'end') {
						// 有工期 结束时间 ，设置开始
						// 先设置结束，再设置工期
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanStart',
									method : 'POST',
									success : function(response, options) {
						            	var obj = Ext.util.JSON.decode(response.responseText);
						            	var value=obj.value;
										updateTaskBasic.start
												.setValue(value);
										updateTaskBasic.end
												.setMinValue(value);
										updateTaskBasic.start1 = value;
										if(obj.success==false){
										Ext.MessageBox.show({
								         	title : '提示',
									        msg : obj.message,
									        buttons : Ext.MessageBox.OK,
									        icon : Ext.MessageBox.INFO
								        });
										}
									},
									params : {
										taskId : updateTaskBasic.nodeId,
										duration : updateTaskBasic.duration1,
										end : updateTaskBasic.end1
									}
								});
					} else if (step.two == 'start') {
						// 有 工期，开始时间 ，设置结束
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanEnd',
									method : 'POST',
									success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
			            	var value=obj.value;
										updateTaskBasic.end
												.setValue(value);
										updateTaskBasic.start
												.setMaxValue(value);
										updateTaskBasic.end1 = value;
										if(obj.success==false){
											Ext.MessageBox.show({
									         	title : '提示',
										        msg : obj.message,
										        buttons : Ext.MessageBox.OK,
										        icon : Ext.MessageBox.INFO
									        });
											}
									},
									params : {
										taskId : updateTaskBasic.nodeId,
										duration : updateTaskBasic.duration1,
										start : updateTaskBasic.start1
									}
								});
					}
				} else if (name == 'start') {
					updateTaskBasic.end.setMinValue(value);
					updateTaskBasic.start1 = value.format('Y-m-d');
					if (step.two == 'end') {
						// 有开始 结束，设置工期
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanDuration',
									method : 'POST',
									success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
			            	var value=obj.value;
										var d = value;
										updateTaskBasic.duration.setValue(d);
										updateTaskBasic.whenDurationChange(d);
										updateTaskBasic.duration1 = d;
										if(obj.success==false){
											Ext.MessageBox.show({
									         	title : '提示',
										        msg : obj.message,
										        buttons : Ext.MessageBox.OK,
										        icon : Ext.MessageBox.INFO
									        });
											}
									},
									params : {
										taskId : updateTaskBasic.nodeId,
										start : updateTaskBasic.start1,
										end : updateTaskBasic.end1
									}
								});
					} else if (step.two == 'duration') {
						// 有 开始 工期 ，设置结束

						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanEnd',
									method : 'POST',
									success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
			            	var value=obj.value;
										updateTaskBasic.end
												.setValue(value);
										updateTaskBasic.start
												.setMaxValue(value);
										updateTaskBasic.end1 = value;
										if(obj.success==false){
											Ext.MessageBox.show({
									         	title : '提示',
										        msg : obj.message,
										        buttons : Ext.MessageBox.OK,
										        icon : Ext.MessageBox.INFO
									        });
											}
									},
									params : {
										taskId : updateTaskBasic.nodeId,
										duration : updateTaskBasic.duration1,
										start : updateTaskBasic.start1
									}
								});
					}
				} else if (name == 'end') {
					updateTaskBasic.start.setMaxValue(value);
					updateTaskBasic.end1 = value.format('Y-m-d');
					if (step.two == 'duration') {
						// 结束 工期 ，设置开始
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanStart',
									method : 'POST',
									success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
			            	var value=obj.value;
										updateTaskBasic.start
												.setValue(value);
										updateTaskBasic.end
												.setMinValue(value);
										updateTaskBasic.start1 = value;
										if(obj.success==false){
											Ext.MessageBox.show({
									         	title : '提示',
										        msg : obj.message,
										        buttons : Ext.MessageBox.OK,
										        icon : Ext.MessageBox.INFO
									        });
											}
									},
									params : {
										taskId : updateTaskBasic.nodeId,
										duration : updateTaskBasic.duration1,
										end : updateTaskBasic.end1
									}
								});
					} else if (step.two == 'start') {

						// 结束开始，设置工期
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanDuration',
									method : 'POST',
									success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
			            	var value=obj.value;
										var d = value;
										updateTaskBasic.duration.setValue(d);
										updateTaskBasic.whenDurationChange(d);
										updateTaskBasic.duration1 = d;
										if(obj.success==false){
											Ext.MessageBox.show({
									         	title : '提示',
										        msg : obj.message,
										        buttons : Ext.MessageBox.OK,
										        icon : Ext.MessageBox.INFO
									        });
											}
									},
									params : {
										taskId : updateTaskBasic.nodeId,
										start : updateTaskBasic.start1,
										end : updateTaskBasic.end1
									}
								});
					}
				}

			} else if (step.flag == 2) {
				if (name == 'duration') {
					updateTaskBasic.duration1 = value;
					if (step.one == 'end') {
						// 有工期 结束时间 ，设置开始
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanStart',
									method : 'POST',
									success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
			            	var value=obj.value;
										updateTaskBasic.start
												.setValue(value);
										updateTaskBasic.end
												.setMinValue(value);
										updateTaskBasic.start1 = value;
										if(obj.success==false){
											Ext.MessageBox.show({
									         	title : '提示',
										        msg : obj.message,
										        buttons : Ext.MessageBox.OK,
										        icon : Ext.MessageBox.INFO
									        });
											}
									},
									params : {
										taskId : updateTaskBasic.nodeId,
										duration : updateTaskBasic.duration1,
										end : updateTaskBasic.end1
									}
								});
					} else if (step.one == 'start') {
						// 有 工期，开始时间 ，设置结束

						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanEnd',
									method : 'POST',
									success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
			            	var value=obj.value;
										updateTaskBasic.end
												.setValue(value);
										updateTaskBasic.start
												.setMaxValue(value);
										updateTaskBasic.end1 = value;
										if(obj.success==false){
											Ext.MessageBox.show({
									         	title : '提示',
										        msg : obj.message,
										        buttons : Ext.MessageBox.OK,
										        icon : Ext.MessageBox.INFO
									        });
											}
									},
									params : {
										taskId : updateTaskBasic.nodeId,
										duration : updateTaskBasic.duration1,
										start : updateTaskBasic.start1
									}
								});
					}
				} else if (name == 'start') {
					updateTaskBasic.end.setMinValue(value);
					updateTaskBasic.start1 = value.format('Y-m-d');
					if (step.one == 'end') {
						// 有开始 结束，设置工期
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanDuration',
									method : 'POST',
									success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
			            	var value=obj.value;
										var d = value;
										updateTaskBasic.duration.setValue(d);
										updateTaskBasic.whenDurationChange(d);
										updateTaskBasic.duration1 = d;
										if(obj.success==false){
											Ext.MessageBox.show({
									         	title : '提示',
										        msg : obj.message,
										        buttons : Ext.MessageBox.OK,
										        icon : Ext.MessageBox.INFO
									        });
											}
									},
									params : {
										taskId : updateTaskBasic.nodeId,
										start : updateTaskBasic.start1,
										end : updateTaskBasic.end1
									}
								});
					} else if (step.one == 'duration') {
						// 有 开始 工期 ，设置结束

						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanEnd',
									method : 'POST',
									success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
			            	var value=obj.value;
										updateTaskBasic.end
												.setValue(value);
										updateTaskBasic.start
												.setMaxValue(value);
										updateTaskBasic.end1 = value;
										if(obj.success==false){
											Ext.MessageBox.show({
									         	title : '提示',
										        msg : obj.message,
										        buttons : Ext.MessageBox.OK,
										        icon : Ext.MessageBox.INFO
									        });
											}

									},
									params : {
										taskId : updateTaskBasic.nodeId,
										duration : updateTaskBasic.duration1,
										start : updateTaskBasic.start1
									}
								});
					}
				} else if (name == 'end') {
					updateTaskBasic.start.setMaxValue(value);
					updateTaskBasic.end1 = value.format('Y-m-d');
					if (step.one == 'duration') {
						// 结束 工期 ，设置开始
						// 先设置工期，再设置结束
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanStart',
									method : 'POST',
									success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
			            	var value=obj.value;
										updateTaskBasic.start
												.setValue(value);
										updateTaskBasic.end
												.setMinValue(value);
										updateTaskBasic.start1 = value;
										if(obj.success==false){
											Ext.MessageBox.show({
									         	title : '提示',
										        msg : obj.message,
										        buttons : Ext.MessageBox.OK,
										        icon : Ext.MessageBox.INFO
									        });
											}
									},
									params : {
										taskId : updateTaskBasic.nodeId,
										duration : updateTaskBasic.duration1,
										end : updateTaskBasic.end1
									}
								});
					} else if (step.one == 'start') {
						// 结束开始，设置工期
						Ext.Ajax.request({
									url : '../JSON/task_TaskRemote.getPlanDuration',
									method : 'POST',
									success : function(response, options) {
							var obj = Ext.util.JSON.decode(response.responseText);
			            	var value=obj.value;
										var d = value;
										updateTaskBasic.duration.setValue(d);
										updateTaskBasic.whenDurationChange(d);
										updateTaskBasic.duration1 = d;
										if(obj.success==false){
											Ext.MessageBox.show({
									         	title : '提示',
										        msg : obj.message,
										        buttons : Ext.MessageBox.OK,
										        icon : Ext.MessageBox.INFO
									        });
											}
									},
									params : {
										taskId : updateTaskBasic.nodeId,
										start : updateTaskBasic.start1,
										end : updateTaskBasic.end1
									}
								});
					}
				}
			}

		}

	}
	roleListSelect.init('' + getResource('resourceParam731') + '' + getResource('resourceParam803') + '');
	roleListSelect.roleComb.setWidth(250);
	roleListSelect.roleComb.allowBlank = true;
	roleListSelect.roleComb.style = 'margin-bottom: 5px;';
	roleListSelect.roleComb.on('select', function(combo, record, index) {
		var value = record.get('roleid');
		departmentUser.userComb.clearValue();
		if (value != -1) {
			departmentUser.roleId = value;
			updateTaskBasic.role1 = value;
		} else {
			departmentUser.roleId = null;
			updateTaskBasic.role1 = null;
		}
	});
	updateTaskBasic.role = roleListSelect.roleComb;
	/**
	updateTaskBasic.role = new Ext.form.ComboBox({
		store : new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : '../JSON/task_TaskRemote.getAllRoles'
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
		fieldLabel : '' + getResource('resourceParam731') + ''
				+ getResource('resourceParam803') + '',
		hiddenName : 'role',
		valueField : "id",
		displayField : "name",
		mode : 'remote',
		allowBlank : true,
		disabled : false,
		forceSelection : true,
		editable : false,
		triggerAction : 'all',
		emptyText : '' + getResource('resourceParam1159') + '',
		labelStyle : 'padding:5px 0px 5px 0px',
		listeners : {
			select : function(combo, record, index) {
				var value = record.get('id');
				departmentUser.userComb.clearValue();
				if (value != -1) {
					departmentUser.roleId = value;
					updateTaskBasic.role1 = value;
				} else {
					departmentUser.roleId = null;
					updateTaskBasic.role1 = null;
				}
			}
		},
		style : 'margin-bottom: 5px;',
		width : 250
	});
	*/
	updateTaskBasic.duration = new Ext.form.NumberField({
				fieldLabel : getResource('resourceParam4034'),
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
						updateTaskBasic
								.timeMethod('duration', field.getValue());
						updateTaskBasic.whenDurationChange(field.getValue());
					}
				}
			});

	updateTaskBasic.saturation = new Ext.form.NumberField({
		fieldLabel : getResource('resourceParam4028'),
		name : 'saturation',
		maxValue : 100,
		minValue : 0,
		allowBlank : true,
		enableKeyEvents : true,
		width : 200,
		style : 'margin-bottom: 5px;',
		allowDecimals : false,
		allowNegative : false,
		invalidText : getResource('resourceParam5049'),
		listeners : {
			keyup : function(field) {
				var value = field.getValue();
				updateTaskBasic.saturation1 = value;
				if (updateTaskBasic.duration1) {
					var mh = Math.ceil(updateTaskBasic.duration1 * value / 100 * 8);
					updateTaskBasic.manhour.setValue(mh);
					updateTaskBasic.manhour1 = mh;
				} else {
					if (updateTaskBasic.manhour1) {
						var dura = Math.ceil(updateTaskBasic.manhour1 / 8
								/ value * 100);
						updateTaskBasic.duration1 = dura;
						updateTaskBasic.duration.setValue(dura);
						updateTaskBasic.timeMethod('duration', dura);
					}
				}
			}
		}
	});

	updateTaskBasic.manhour = new Ext.form.NumberField({
		fieldLabel : getResource('resourceParam4029'),
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
				var value = field.getValue();
				updateTaskBasic.manhour1 = value;
				if (updateTaskBasic.duration1) {
					// 工期存在，填入工时，计算饱和度
					var mh = Math.ceil(value / updateTaskBasic.duration1 * 100);
					updateTaskBasic.saturation.setValue(mh);
					updateTaskBasic.saturation1 = mh;
				} else {
					if (updateTaskBasic.saturation1) {
						// 饱和度存在，填入工时，计算工期
						var dura = Math.ceil(value
								/ updateTaskBasic.saturation1 * 100);
						updateTaskBasic.duration1 = dura;
						updateTaskBasic.duration.setValue(dura);
						updateTaskBasic.timeMethod('duration', dura);
					}
				}

			}
		}
	});

	updateTaskBasic.department = departmentUser.departmentCombo;
	updateTaskBasic.user = departmentUser.userComb;
	updateTaskBasic.user.setWidth(200);
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
								projectId :updateTaskBasic.projectId
							});
			});
	updateTaskBasic.type = new Ext.form.ComboBox({
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
						if (updateTaskBasic.original != record
								.get('taskcategoryid')) {
							updateTaskBasic.flag = true;
							Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam575')
												+ '',
										msg : ''
												+ getResource('resourceParam1571')
												+ '',
										minWidth : 100,
										icon : Ext.MessageBox.ERROR,
										buttons : Ext.MessageBox.OK
									});
						} else {
							updateTaskBasic.flag = false;
						}
						updateTaskBasic.taskcategoryid = record
								.get('taskcategoryid');
					},
					beforequery: function(qe){
                        delete qe.combo.lastQuery;
                    }
				},
				style : 'margin-bottom: 5px;',
				width : 250
			});

	updateTaskBasic.status = new Ext.form.ComboBox({
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
	// updateTaskBasic.duration=new Ext.form.TextField({
	// fieldLabel : '计划工期',
	// name : 'duration',
	// // anchor : '95%',
	// style : 'margin-bottom: 5px;',
	// width : 250,
	// hideLabel :false,
	// hidden:false,
	// readOnly : true
	// });
	/*
	 * updateTaskBasic.duration = new Ext.form.Label( { html : '<div
	 * id="durationItem" class="x-form-item " tabindex="-1" style="">' + '<label
	 * class="x-form-item-label" style="width: ' + 100 + 'px;" >' + '计划工期' + '</label>' + '<div
	 * class="x-form-element" style="padding-left: ' + 105 + 'px;">' + '<div
	 * ext:qtip="任务工期不可修改" id="duration" style="color:blue;" ' + '></div>' + '</div>' + '<div
	 * class="x-form-clear-left"/>' + '</div>' });
	 * 
	 * updateTaskBasic.role = new Ext.form.Label( { html : '<div id="roleItem"
	 * class="x-form-item " tabindex="-1" style="">' + '<label
	 * class="x-form-item-label" style="width: ' + 100 + 'px;" >' + '负责人角色' + '</label>' + '<div
	 * class="x-form-element" style="padding-left: ' + 105 + 'px;">' + '<div
	 * ext:qtip="负责人角色不可修改" id="role" style="color:blue;" ' + '></div>' + '</div>' + '<div
	 * class="x-form-clear-left"/>' + '</div>' });
	 */
	updateTaskBasic.start = new Ext.form.DateField({
				format : getResource('resourceParam5043'),// 设置日期格式 月/日/年
				// fieldLabel : '计划开始时间(<span style="color:red;" >＊</span>)',
				fieldLabel : '' + getResource('resourceParam991') + '',
				editable : false,
				name : 'start',
//				minText : 'Can\'t have a start date before today!',
				// disabledDays : [0, 6],// 去掉周六、周日
				disabledDaysText : 'Start date is not available on the weekends',
				allowBlank : updateTaskBasic.allowBlank,
				labelStyle : 'padding:5px 0px 5px 0px',
				style : 'margin-bottom: 5px;',
				width : 250,
				listeners : {
					select : function(field, value) {
						// if (value - updateTaskBasic.originalstart <= 0
						// && value - updateTaskBasic.planstart >= 0) {
						// } else {
						// // if (!leftNavigationTree.node.attributes.leaf) {
						// // Ext.MessageBox.show({
						// // title : '提示',
						// // msg : '推延了任务开始时间，早于此开始时间的子任务也会推延',
						// // buttons : Ext.MessageBox.OK,
						// // icon : Ext.MessageBox.INFO
						// // });
						// // }
						// }
						// if (updateTaskBasic.duration) {
						// Ext.Ajax.request( {
						// url : '../JSON/task_TaskRemote.getPlanEnd',
						// method : 'POST',
						// success : function(response, options) {
						// var json =
						// Ext.util.JSON.decode(response.responseText);
						// updateTaskBasic.end.setValue(response.responseText);
						// updateTaskBasic.start.setMaxValue(response.responseText);
						// updateTaskBasic.end1 = (new
						// Date(response.responseText))
						// .format('Y-m-d');
						// updateTaskBasic.end.setMinValue(value);
						// updateTaskBasic.start1 = (new
						// Date(value)).format('Y-m-d');
						// },
						// params : {
						// duration : updateTaskBasic.duration,
						// start : (new Date(value)).format('Y-m-d')
						// }
						// });
						// } else {
						// updateTaskBasic.end.setMinValue(value);
						// updateTaskBasic.start1 = (new
						// Date(value)).format('Y-m-d');
						// }
						updateTaskBasic.timeMethod('start', value);
						// updateTaskBasic.end.setMinValue(value);
						// // updateTaskBasic.end
						// // .setMaxValue(updateTaskBasic.planend);
						// updateTaskBasic.start1 = (new
						// Date(value)).format('Y-m-d');
					}
				}

			});
	updateTaskBasic.end = new Ext.form.DateField({
				format : getResource('resourceParam5043'),// 设置日期格式 月/日/年
				// fieldLabel : '计划完成时间(<span style="color:red;" >＊</span>)',
				fieldLabel : '' + getResource('resourceParam1032') + '',
				editable : false,
				name : 'end',
//				minText : 'Can\'t have a end date before today!',
				// disabledDays : [0, 6],// 去掉周六、周日
				disabledDaysText : 'End date is not available on the weekends',
				allowBlank : true,
				labelStyle : 'padding:5px 0px 5px 0px',
				style : 'margin-bottom: 5px;',
				width : 250,
				listeners : {
					select : function(field, value) {
						// if (value - updateTaskBasic.originalend >= 0
						// && value - updateTaskBasic.planend <= 0) {
						// } else {
						// // if (!leftNavigationTree.node.attributes.leaf) {
						// // Ext.MessageBox.show({
						// // title : '提示',
						// // msg : '提前了任务完成时间，晚于此完成时间的子任务也会提前',
						// // buttons : Ext.MessageBox.OK,
						// // icon : Ext.MessageBox.INFO
						// // });
						// // }
						// }
						// if (updateTaskBasic.duration) {
						// Ext.Ajax.request( {
						// url : '../JSON/task_TaskRemote.getPlanStart',
						// method : 'POST',
						// success : function(response, options) {
						// updateTaskBasic.start.setValue(response.responseText);
						// updateTaskBasic.end.setMinValue(response.responseText);
						// updateTaskBasic.start1 = (new
						// Date(response.responseText))
						// .format('Y-m-d');
						// updateTaskBasic.start.setMaxValue(value);
						// updateTaskBasic.end1 = (new
						// Date(value)).format('Y-m-d');
						// },
						// params : {
						// duration : updateTaskBasic.duration,
						// end : (new Date(value)).format('Y-m-d')
						// }
						// });
						// } else {
						// updateTaskBasic.start.setMaxValue(value);
						// updateTaskBasic.end1 = (new
						// Date(value)).format('Y-m-d');
						//
						// }
						updateTaskBasic.timeMethod('end', value);
						// updateTaskBasic.start.setMaxValue(value);
						// // updateTaskBasic.start
						// // .setMinValue(updateTaskBasic.planstart);
						// updateTaskBasic.end1 = (new
						// Date(value)).format('Y-m-d');
					}
				},
				invalidText : '' + getResource('resourceParam1567') + ''
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
	enumStore.on('beforeload', function(store, options) {
		options.params = Ext.apply(options.params, {
			type : 3
		});
	});
	updateTaskBasic.backEnum1 = null
	updateTaskBasic.backEnum = new Ext.form.ComboBox({
		store : enumStore,
		id : 'updateTaskBasic.backEnum',
		fieldLabel : '' + getResource('resourceParam9123') + '',
		hiddenName : 'backEnum',
		valueField : "id",
		displayField : "enumsname",
		mode : 'remote',
		editable : false,
		allowBlank : false,
		disabled : false,
		forceSelection : true,
		triggerAction : 'all',
		labelStyle : 'padding:5px 0px 5px 0px',
		style : 'margin-bottom: 5px;',
		width : 250,
		listeners : {
			select : function(combo, record, index) {
				updateTaskBasic.backEnum1 = record.get('id');
				if(updateTaskBasic.backEnum1 != 3832861) {
					updateTaskBasic.plannedquantity.disable();
				} else {
					updateTaskBasic.plannedquantity.enable();
				}
			}
		}
	});		
	
		
	updateTaskBasic.plannedquantity1 = null;
	updateTaskBasic.plannedquantity = new Ext.form.NumberField({
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
	
	updateTaskBasic.securityDegree = new Ext.form.ComboBox({
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
				var value = record.get('id');
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
				updateTaskBasic.securityDegree1 = value;

			},
			beforequery : function(qe) {
				delete qe.combo.lastQuery;
			}
		},
		style : 'margin-bottom: 5px;',
		width : 250
	});
	
	
	var viewPanle = new Ext.Panel({
//		   id : 'htmlView',
		   width : 400,
		   border:false,
		   html:'<div id="updateWang" style="color:#0000FF;text-align:center;margin-left:-55px;"></div>'
	});
	
	
	updateTaskBasic.form = new Ext.form.FormPanel({
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
					id : 'quanjiao2',
					allowBlank : false,
					style : 'margin-bottom: 5px;',
					maxLength : 100,
					maxLengthText : '名称长度过长，不能超过100！',
					minLength : 1,
					minLengthText : '' + getResource('resourceParam1002') + '',
					blankText : '' + getResource('resourceParam1199') + '',
					/**
					 * bug编号971 wangyf
					 * bug信息：项目名称要求只能输入英文字符、数字、汉字，却能输入中文符号。
					 * 2011-06-03 14：09
					 */
					regex : /^([\u4e00-\u9fa5]|[a-zA-Z]|\d)*$/,
//					regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
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
							Ext.getCmp('quanjiao2').setValue(curStr);
						}
					}
				},
				updateTaskBasic.type,
				updateTaskBasic.securityDegree,
				updateTaskBasic.role,
				updateTaskBasic.department,
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
									items : [updateTaskBasic.user]
								}, {

									width : 30,
									layout : 'form',
									border : false,
									items : [new Ext.form.Label({
										// width : 20,
										html : '<a onclick="updateViewLoad()" style="color:#0000FF;text-decoration:underline;cursor:pointer">'
												+ getResource('resourceParam5050')
												+ '</a>'
									})]
								}]
					}]

				}),updateTaskBasic.status,new Ext.Panel({
					border : false,
					width : 550,
					items : [{
						border : false,
						layout : 'column',
						items : [{
									width : 320,
									layout : 'form',
									border : false,
									items : [updateTaskBasic.duration]
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
									items : [updateTaskBasic.saturation]
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
									items : [updateTaskBasic.manhour]
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
				updateTaskBasic.start, updateTaskBasic.end,
				updateTaskBasic.application, updateTaskBasic.isApproval, 
				updateTaskBasic.backEnum, updateTaskBasic.plannedquantity, 
				{
					id : 'updateTextarea',
					xtype : 'textarea',
					fieldLabel : '' + getResource('resourceParam1044') + '',
					name : 'ttextarea',
					style : 'margin-bottom: 5px;',
					width : 250,
					height:100,
					disabled : false,
					maxLength : 500,
//					grow : true,
//					growMin : 50,
					preventScrollbars : true,
					maxLengthText : '' + getResource('resourceParam9180') + '',
					enableKeyEvents : true,
					listeners : {'keyup' : function(cur, evt) {
							var curLen = cur.getValue().length;
							if(curLen <= 500) {
								collarbForm.viewTi = '您还可以输入' + (500 - curLen) + '个字';
								Ext.get('updateWang').dom.innerHTML = collarbForm.viewTi;
							} else {
								collarbForm.viewTi = '<font color="red" style="margin-right:-65px;">字数已超过规定长度，请酌情删减！</font>';
								Ext.get('updateWang').dom.innerHTML = collarbForm.viewTi;
							}
						}
					}
				}, 
				viewPanle,
//				new Ext.Panel({
//					   id : 'htmlView',
//					   width : 400,
//					   border:false,
//					   html:'<div id="ts" style="color:#0000FF;text-align:center;margin-left:-55px;"></div>'
//				}),
				{
					xtype : 'button',
					style : 'margin-left: 315px;',
					text : '' + getResource('resourceParam1151') + '',
					handler : nextPage
				}]
	})

	function nextPage() {
		var textValue = Ext.getCmp('updateTextarea').getValue();
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
		
		if (updateTaskCard.basicForm.getForm().isValid()) {

			Ext.Ajax.request({
				url : '../JSON/task_TaskRemote.getTaskExtendForm',
				method : 'POST',
				success : function(response, options) {
					updateTaskCard.panel2.remove(updateTaskCard.extendForm);
					updateTaskCard.extendForm = updateTaskExtend.init(callback);
					updateTaskCard.panel2.items.add(updateTaskCard.extendForm);
					updateTaskCard.panel2.doLayout();

					updateTaskCard.card.layout.setActiveItem(1);
					var obj = Ext.util.JSON.decode(response.responseText);
					var labelWidth = obj.labelWidth;
					var items = obj.items;
					if (!updateTaskBasic.flag) {
						// 没有改变类型则给表单赋值
						Ext.Ajax.request({
							url : '../JSON/project_ProjectRemote.getExtendFormInstance',
							method : 'POST',
							success : function(response, options) {
								var json = Ext.util.JSON
										.decode(response.responseText);
								if (json.success == true) {
									if (json.items.length == 0) {
										// Ext.Msg.alert('提示',
										// '该类型没有扩展属性');
									} else {
										var jsonitems = json.items;
										if (!updateTaskBasic.flag) {
											// 没有改变类型则给表单赋值
											for (var n = 0; n < jsonitems.length; n++) {
												items[n].value = jsonitems[n].value;
											}
										}
										createExtendForm.createForm(
												updateTaskCard.extendForm,
												items, labelWidth);
									}
								} else {
									Ext.MessageBox.show({
										title : ''
												+ getResource('resourceParam575')
												+ '',
										msg : json.message,
										minWidth : 100,
										icon : Ext.MessageBox.ERROR,
										buttons : Ext.MessageBox.OK
									});
								}

							},
							params : {
								node : updateTaskBasic.nodeId
							}
						});
					} else {
						createExtendForm.createForm(updateTaskCard.extendForm,
								items, labelWidth);
					}
				},
				params : {
					taskcategoryid : updateTaskBasic.taskcategoryid
				}
			});

			try {
				// 传第一个form的data
				updateTaskBasic.name1 = updateTaskCard.basicForm.getForm()
						.findField('name').getValue();
				updateTaskBasic.type1 = updateTaskBasic.taskcategoryid;
				updateTaskBasic.department1 = departmentUser.codeid;
				updateTaskBasic.user1 = departmentUser.userid;
				updateTaskBasic.textarea1 = updateTaskCard.basicForm.getForm()
						.findField('ttextarea').getValue();
				updateTaskBasic.plannedquantity1 = updateTaskCard.basicForm.getForm()
						.findField('plannedquantity').getValue();
				// start,end在其select中
			} catch (e) {
			} finally {
			}
		}
	}

	function setViewTaskForm(obj) {
		updateTaskBasic.form.getForm().findField('name').setValue(obj.tname);
		updateTaskBasic.form.getForm().findField('category')
				.setValue(obj.ttype);
		updateTaskBasic.original = obj.ttypeid;// 用来判断task类型是否改变
		updateTaskBasic.taskcategoryid = obj.ttypeid;
		departmentUser.departmentCombo.setTextValue(obj.tdepart);
		departmentUser.codeid = obj.tdepartid;// 部门id
		departmentUser.userComb.setValue(obj.tuser);
		departmentUser.userid = obj.tuserid;
		departmentUser.currentDegree =obj.currentDegree;
		// updateTaskBasic.form.getForm().findField('duration')
		// .setValue(obj.duration);
		if (obj.roleId) {
			// Ext.get('role').dom.innerHTML = obj.roleName;
			// Ext.get('roleItem').applyStyles("display:inline;");
			if (obj.roleId != -1) {
				departmentUser.roleId = obj.roleId;
				updateTaskBasic.role1 = obj.roleId;
				updateTaskBasic.role.setRawValue(obj.roleName);
			} else {
				departmentUser.roleId = null;
				updateTaskBasic.role1 = null;
			}
		} else {
			// departmentUser.roleId = null;
			// Ext.get('roleItem').applyStyles("display:none;");
		}
		// if (obj.isDuration) {
		updateTaskBasic.duration1 = obj.duration;
		updateTaskBasic.duration.setRawValue(obj.duration);

		updateTaskBasic.saturation1 = obj.saturation;
		updateTaskBasic.saturation.setRawValue(obj.saturation);

		updateTaskBasic.manhour1 = obj.manhour;
		updateTaskBasic.manhour.setRawValue(obj.manhour);

		updateTaskBasic.form.getForm().findField('start').setValue(obj.tstart);
		updateTaskBasic.form.getForm().findField('end').setValue(obj.tend);
		if (obj.duration) {
			step.flag = 1;
			step.one = 'duration';
			if (obj.tstart) {
				step.flag = 2;
				step.two = 'start';
			} else if (obj.tend) {
				step.flag = 2;
				step.two = 'end';
			}
		}
		// Ext.get('duration').dom.innerHTML = obj.duration;
		// Ext.get('durationItem').applyStyles("display:inline;");
		// } else {
		// updateTaskBasic.duration = null;
		// Ext.get('durationItem').applyStyles("display:none;");
		// }
		updateTaskBasic.form.getForm().findField('application')
				.setValue(obj.applicationName);
		updateTaskBasic.form.getForm().findField('isApproval')
				.setValue(obj.isApproval);
		updateTaskBasic.isApproval1 = obj.isApproval;
		updateTaskBasic.application1 = obj.applicationId;
		updateTaskBasic.start1 = obj.tstart;
		updateTaskBasic.end1 = obj.tend;
		updateTaskBasic.form.getForm().findField('ttextarea')
				.setValue(obj.tdesc);

		updateTaskBasic.backEnum1 = obj.backEnum;
		updateTaskBasic.form.getForm().findField('backEnum')
				.setRawValue(obj.backEnumName);
		updateTaskBasic.plannedquantity1 = obj.plannedquantity;
		updateTaskBasic.form.getForm().findField('plannedquantity').setValue(obj.plannedquantity);
		if(updateTaskBasic.backEnum1 != 3832861) {
			updateTaskBasic.plannedquantity.disable();
		} else {
			updateTaskBasic.plannedquantity.enable();
		}
		updateTaskBasic.securityDegree.setValue(obj.securityDegreeName);
		updateTaskBasic.securityDegree1 = obj.securityDegree;
		departmentUser.securityDegree = obj.securityDegree;
	}

	updateTaskBasic.setFirstPage = function() {
		updateTaskCard.card.layout.setActiveItem(0);
	}

	updateTaskBasic.setBasic = function() {

		Ext.Ajax.request({
			url : "../JSON/task_TaskRemote.getTaskInfo",
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.util.JSON.decode(response.responseText);
				if (obj.success == true) {
					// if(obj.isDuration){
					// //如果是模板有工期
					// updateTaskBasic.duration.hidden=!obj.isDuration;
					// updateTaskBasic.duration.hideLabel=!obj.isDuration;
					// }
					if(obj.tstatusid == 4) { // 如果任务是进行中的任务，则不能修改开始时间
						updateTaskBasic.start.disable();
					}
					
					setViewTaskForm(obj);
					updateTaskBasic.originalstart = Date.parseDate(obj.tstart,
							"Y-m-d");
					updateTaskBasic.end
							.setMinValue(updateTaskBasic.originalstart);
					updateTaskBasic.originalend = Date.parseDate(obj.tend,
							"Y-m-d");
					updateTaskBasic.start
							.setMaxValue(updateTaskBasic.originalend);
					Ext.Ajax.request({
						url : "../JSON/task_TaskRemote.getTaskTimeScale",
						method : 'POST',
						success : function(response, options) {
							var obj = Ext.util.JSON
									.decode(response.responseText);
							if (obj.success == true) {
								updateTaskBasic.constrain(obj);
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
						},
						params : {
							node : updateTaskBasic.nodeId,
							method : 'same'
							// 同级任务，或子任务

						}
					});
				} else {
					if (callback) {
						callback();
					}
					updateTaskBasic.form.getComponent('progressbar_wrap').getComponent('progressbar').updateProgress(
							obj.tcomplete / 100,
							'' + getResource('resourceParam1031') + '' + obj.tcomplete
									+ '%');
					Ext.MessageBox.show({
								title : '' + getResource('resourceParam499')
										+ '',
								msg : obj.message,
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
				}
			},
			params : {
				node : updateTaskBasic.nodeId
			}
		});
	}
	return updateTaskBasic.form;
}
function updateViewLoad() {
	if (departmentUser.userid == "") {
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
	personLoad.init(updateTaskBasic.projectId, departmentUser.userid);
}
