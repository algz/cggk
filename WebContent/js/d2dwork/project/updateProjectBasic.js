var updateProjectBasic = {
	flag : false
// 标记类型是否改变了 true改变类型了
};
updateProjectBasic.init = function() {
	var checkTime=function(){
		Ext.Ajax
		.request( {
			url : '../JSON/task_TaskRemote.checkTime',
			method : 'POST',
			success : function(response,
					options) {
				var obj = Ext.util.JSON
						.decode(response.responseText);
				if(obj.success==false){
					Ext.MessageBox
					.show( {
						title : '提示',
						msg : obj.message,
						minWidth : 100,
						icon : Ext.MessageBox.INFO,
						buttons : Ext.MessageBox.OK
					});
				}
			},
			params : {
				projectId : leftNavigationTree.node.attributes.projectId,
				plannedStartTime : updateProjectBasic.start1,
				plannedEndTime : updateProjectBasic.end1
			}
		});
	}
	
	
	updateProjectBasic.flag = false;// 标记是否更换了类型
	departmentUser.init('' + getResource('resourceParam986') + '',
			'' + getResource('resourceParam1034') + '');
	departmentUser.departmentCombo.setWidth(250);
	departmentUser.departmentCombo.allowBlank = true;
	departmentUser.departmentCombo.style = 'margin-bottom: 5px;';
	departmentUser.userComb.setWidth(250);
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

	updateProjectBasic.department = departmentUser.departmentCombo;
	updateProjectBasic.user = departmentUser.userComb;

	updateProjectBasic.datacenterStore = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			method : 'POST',
			url : '../JSON/datacenter_DataCenterRemote.getDataCateList'
		}),
		reader : new Ext.data.JsonReader( {
			id : "id",
			totalProperty : 'totalProperty',
			root : 'results'
		}, [ {
			name : 'id'
		}, {
			name : 'categoryinstancename'
		}, {
			name : 'description'
		} ])
	});

	updateProjectBasic.securityDegree = new Ext.form.ComboBox( {
		store : new Ext.data.Store( {
			proxy : new Ext.data.HttpProxy( {
				url : '../JSON/groups_GroupsRemote.getSecurityDegree'
			}),
			reader : new Ext.data.JsonReader( {
				totalProperty : 'totalProperty',
				root : 'root'
			}, [ {
				name : 'id'
			}, {
				name : 'name'
			} ])
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
				updateProjectBasic.securityDegree1 = value;
			},
			beforequery : function(qe) {
				delete qe.combo.lastQuery;
			}
		},
		style : 'margin-bottom: 5px;',
		width : 250
	});

	updateProjectBasic.datacenter = new Ext.ux.form.LovPageCombo(
			{
				store : updateProjectBasic.datacenterStore,
				fieldLabel : '' + getResource('resourceParam561') + '(<span style="color:red;" >＊</span>)',
				valueField : "id",
				displayField : "categoryinstancename",
				mode : 'remote',
				queryParam : 'categoryinstancename',
				minChars : 0,
				pageSize : 5,
				width : 250,
				forceSelection : true,
				hiddenName : 'datacenterid',
				editable : true,
				triggerAction : 'all',
				typeAhead : true,
				name : 'datacenterid',
				blankText : '' + getResource('resourceParam1555') + '',
				allowBlank : false,
				enableKeyEvents : true,
				disableKeyFilter : true,
				emptyText : '' + getResource('resourceParam569') + '',
				hideOnSelect : false,
				beforeBlur : Ext.emptyFn
			});
	var selectedDatacenterIds = [];
	var selectedDatacenterNames = [];
	updateProjectBasic.datacenter.on('pagechange', function(combo) {
		combo.getStore().each(function(record) {
			var flag = false;
			var rec = record.get('id');
			for ( var i = 0; i < selectedDatacenterIds.length; i++) {
				if (rec == selectedDatacenterIds[i]) {
					flag = true;
				}
			}
			if (flag) {
				record.set('checked', true);
			} else {
				record.set('checked', false);
			}
		});
	});
	updateProjectBasic.datacenter.on('select', function(combo, record, index) {
		if (record.get('checked')) {
			selectedDatacenterIds.push(record.get('id'));
			selectedDatacenterNames.push(record.get('categoryinstancename'));
		} else {
			selectedDatacenterIds.remove(record.get('id'));
			selectedDatacenterNames.remove(record.get('categoryinstancename'));
		}
		combo.setValue(selectedDatacenterIds.join(','), selectedDatacenterNames
				.join(','));
	});

	updateProjectBasic.name = new Ext.form.TextField(
			{
				fieldLabel : '' + getResource('resourceParam1035') + '(<span style="color:red;" >＊</span>)',
				name : 'name',
				id : 'quanjiao3',
				allowBlank : false,
				disabled : false,
				labelStyle : 'padding:5px 0px 5px 0px',
				style : 'margin-bottom: 5px;',
				width : 250,
				maxLength : 100,
				maxLengthText : '名称长度过长，不能超过100！',
				minLength : 1,
				minLengthText : '' + getResource('resourceParam1002') + '',
				blankText : '' + getResource('resourceParam1161') + '',
//				regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				/**
				 * bug编号971 wangyf
				 * bug信息：项目名称要求只能输入英文字符、数字、汉字，却能输入中文符号。
				 * 2011-06-03 14：09
				 */
				regex : /^([\u4e00-\u9fa5]|[a-zA-Z]|\d)*$/,
				// regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
				// regexText : '只能输入中文,字母,数字'
				invalidText : '' + getResource('resourceParam1554') + '',
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
						Ext.getCmp('quanjiao3').setValue(curStr);
					}
				}
			});

	// 新建工程可选类型combo
	updateProjectBasic.type = new Ext.form.ComboBox(
			{
				store : new Ext.data.Store( {
					proxy : new Ext.data.HttpProxy( {
						url : '../JSON/project_ProjectRemote.getTypes'
					}),
					reader : new Ext.data.JsonReader( {
						totalProperty : 'totalProperty',
						root : 'root'
					}, [ {
						name : 'projectcategoryid'
					}, {
						name : 'projectcategoryname'
					} ])
				}),
				fieldLabel : '' + getResource('resourceParam1037') + '(<span style="color:red;" >＊</span>)',
				hiddenName : 'category',
				valueField : "projectcategoryid",
				displayField : "projectcategoryname",
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
						if (updateProjectBasic.original != record
								.get('projectcategoryid')) {
							updateProjectBasic.flag = true;
							Ext.MessageBox
									.show( {
										title : '' + getResource('resourceParam575') + '',
										msg : '' + getResource('resourceParam1566') + '',
										minWidth : 100,
										icon : Ext.MessageBox.ERROR,
										buttons : Ext.MessageBox.OK
									});
						} else {
							updateProjectBasic.flag = false;
						}
						updateProjectBasic.projectcategoryid = record
								.get('projectcategoryid');
					},
					beforequery: function(qe){
                        delete qe.combo.lastQuery;
                    }
				},
				style : 'margin-bottom: 5px;',
				width : 250
			});

	updateProjectBasic.status = new Ext.form.ComboBox( {
		store : new Ext.data.Store( {
			proxy : new Ext.data.HttpProxy( {
				url : "../JSON/project_ProjectRemote.getStatus"
			}),
			reader : new Ext.data.JsonReader( {
				totalProperty : 'totalProperty',
				root : 'root'
			}, [ {
				name : 'projectstatusname'
			}, {
				name : 'projectstatusid'
			} ])
		}),
		valueField : "projectstatusid",
		displayField : "projectstatusname",
		mode : 'remote',
		forceSelection : true,
		disabled : false,
		hiddenName : 'projectstatus',
		editable : false,
		triggerAction : 'all',
		fieldLabel : '' + getResource('resourceParam1038') + '',
		// anchor : '95%',
		style : 'margin-bottom: 5px;',
		width : 250,
		allowBlank : true,
		value : '' + getResource('resourceParam947') + '',// 默认设置为编制中
		disabled : true
	});

	updateProjectBasic.start = new Ext.form.DateField( {
		format : getResource('resourceParam5043'),// 设置日期格式 月/日/年
		// fieldLabel : '计划开始时间(<span style="color:red;" >＊</span>)',
		fieldLabel : '' + getResource('resourceParam991') + '',
		editable : false,
		name : 'start',
		// minValue : (new Date()).format('m/d/Y'),// 设置可选择的最小日期为今天
		// minText : '不能选择以前的日期',
		// disabledDays : [0, 6],// 去掉周六、周日
		// disabledDaysText : '开始的日期不能在周六、周日',
		allowBlank : true,
		disabled : false,
		labelStyle : 'padding:5px 0px 5px 0px',
		style : 'margin-bottom: 5px;',
		width : 250,
		listeners : {
			select : function(field, value) {
				// if (value - updateProjectBasic.originalstart < 0) {
		// } else {
		// if (!leftNavigationTree.node.attributes.leaf) {
		// Ext.MessageBox.show({
		// title : '提示',
		// msg : '推延了项目的开始时间，早于此开始时间的子任务也会推延',
		// buttons : Ext.MessageBox.OK,
		// icon : Ext.MessageBox.INFO
		// });
		// }
		// }
		updateProjectBasic.end.setMinValue(value);
		updateProjectBasic.start1 = (new Date(value)).format('Y-m-d');
	    
		checkTime();
		
		
		
		
	}
}

	});
	updateProjectBasic.end = new Ext.form.DateField( {
		format : getResource('resourceParam5043'),// 设置日期格式 月/日/年
		// fieldLabel : '计划完成时间(<span style="color:red;" >＊</span>)',
		fieldLabel : '' + getResource('resourceParam1032') + '',
		editable : false,
		name : 'end',
		// minValue : (new Date()).format('m/d/Y'),// 设置可选择的最小日期为今天
		minText : '' + getResource('resourceParam1160') + '',
		// disabledDays : [0, 6],// 去掉周六、周日
		// disabledDaysText : '结束的日期不能在周六、周日',
		allowBlank : true,
		disabled : false,
		labelStyle : 'padding:5px 0px 5px 0px',
		style : 'margin-bottom: 5px;',
		width : 250,
		listeners : {
			select : function(field, value) {
				// if (value - updateProjectBasic.originalend < 0) {
		// if (!leftNavigationTree.node.attributes.leaf) {
		// Ext.MessageBox.show({
		// title : '提示',
		// msg : '提前了项目完成时间，晚于此完成时间的子任务也会提前',
		// buttons : Ext.MessageBox.OK,
		// icon : Ext.MessageBox.INFO
		// });
		// }
		// }
		updateProjectBasic.start.setMaxValue(value);
		// // updateProjectBasic.start
		// // .setMinValue(updateProjectBasic.createtime);
		updateProjectBasic.end1 = (new Date(value)).format('Y-m-d');
		checkTime();
	}
},
invalidText : '' + getResource('resourceParam1567') + ''
	});

	updateProjectBasic.textarea = new Ext.form.TextArea( {
		fieldLabel : '' + getResource('resourceParam1039') + '',
		id : 'updatePtextarea',
		name : 'ptextarea',
		allowBlank : true,
		labelStyle : 'padding:5px 0px 5px 0px',
		style : 'margin-bottom: 0px;',
		width : 250,
		height:100,
		disabled : false,
		maxLength : 500,
//		grow : true,
//		growMin : 50,
		preventScrollbars : false,
		maxLengthText : '' + getResource('resourceParam9179') + '',
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
	});

	enmusEntity.init();
	enmusEntity.usersComb.setWidth(250);

	updateProjectBasic.myform = new Ext.form.FormPanel( {
		standardSubmit : true,
		bodyStyle : 'padding:10px 0px 10px 10px',
		buttonAlign : 'right',
		autoScroll : true,
		labelWidth : 150,
		split : true,
		border : false,
		items : [ updateProjectBasic.name, updateProjectBasic.type,
				updateProjectBasic.securityDegree,
				updateProjectBasic.department, updateProjectBasic.user, {
					xtype : 'datefield',
					fieldLabel : '' + getResource('resourceParam858') + '',
					format : getResource('resourceParam5043'),
					name : 'createtime',
					// anchor : '95%',
					style : 'margin-bottom: 5px;',
					value : (new Date()).format(getResource('resourceParam5043')),
					width : 250,
					disabled : true
				}, updateProjectBasic.status, updateProjectBasic.start,
				updateProjectBasic.end, // updateProjectBasic.datacenter,
				enmusEntity.usersComb, 
//				updateProjectBasic.textarea, 
				
				new Ext.Panel({
					border : false,
					width : 550,
					items : [{
						border : false,
//						layout : 'column',
						items : [{
									width : 420,
									layout : 'form',
									border : false,
									items : [updateProjectBasic.textarea]
								}, 
								new Ext.Panel({
								   width : 400,
								   border:false,
								   html:'<div id="updateWang" style="color:#0000FF;text-align:center;margin-right:-50px;"></div>'
								})
								]
					}]
				}),
				
				{
					xtype : 'button',
					style : 'margin-left: 315px;',
					text : '' + getResource('resourceParam1151') + '',
					handler : nextPage
				}

		]
	});

	function nextPage() {
		var textValue = Ext.getCmp('updatePtextarea').getValue();
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
		
		
		if (updateProjectCard.form.getForm().isValid()) {
			Ext.Ajax
					.request( {
						url : '../JSON/project_ProjectRemote.getExtendForm',
						method : 'POST',
						success : function(response, options) {
							updateProjectCard.panel2
									.remove(updateProjectCard.extendform);
							updateProjectCard.extendform = updateProjectExtend
									.init();
							updateProjectCard.panel2.items
									.add(updateProjectCard.extendform);
							updateProjectCard.panel2.doLayout();
							updateProjectCard.card.layout.setActiveItem(1);
							var obj = Ext.util.JSON
									.decode(response.responseText);
							var labelWidth = obj.labelWidth;
							var items = obj.items;
							if (!updateProjectBasic.flag) {
								// 没有改变类型则，则获取其实例，以用来赋值
								Ext.Ajax
										.request( {
											url : '../JSON/project_ProjectRemote.getExtendFormInstance',
											method : 'POST',
											success : function(response,
													options) {
												var json = Ext.util.JSON
														.decode(response.responseText);
												if (json.success == true) {
													if (json.items.length == 0) {
														// Ext.Msg.alert('提示',
														// '该类型没有扩展属性');
													} else {
														var jsonitems = json.items;
														if (!updateProjectBasic.flag) {
															// 没有改变类型则给表单赋值
															for ( var n = 0; n < jsonitems.length; n++) {
																items[n].value = jsonitems[n].value;
															}
														}
														createExtendForm
																.createForm(
																		updateProjectCard.extendform,
																		items,
																		labelWidth);
													}
												} else {
													Ext.MessageBox
															.show( {
																title : '' + getResource('resourceParam575') + '',
																msg : json.message,
																minWidth : 100,
																icon : Ext.MessageBox.ERROR,
																buttons : Ext.MessageBox.OK
															});
												}

											},
											params : {
												node : leftNavigationTree.nodeId
											// 后台处理时有前缀
											}
										});
							} else {
								createExtendForm.createForm(
										updateProjectCard.extendform, items,
										labelWidth);

							}
						},
						params : {
							projectcategoryid : updateProjectBasic.projectcategoryid
						}
					});
			try {
				// 传第一个form的data
				updateProjectBasic.name1 = updateProjectCard.form.getForm()
						.findField('name').getValue();
				updateProjectBasic.type1 = updateProjectBasic.projectcategoryid;
				updateProjectBasic.department1 = departmentUser.codeid;
				updateProjectBasic.user1 = departmentUser.userid;
				updateProjectBasic.textarea1 = updateProjectCard.form.getForm()
						.findField('ptextarea').getValue();
				var t = updateProjectCard.form.getForm()
						.findField('createtime').getValue();
				updateProjectBasic.createtime1 = (new Date(t)).format('Y-m-d');
				updateProjectBasic.why = enmusEntity.id;
				// var start1 = updateProjectCard.form.getForm()
				// .findField('start').getValue();
				// updateProjectBasic.start1 = (new
				// Date(start1)).format('Y-m-d');
				// updateProjectBasic.datacenter1 =
				// updateProjectBasic.datacenter.getValue();

				// 结束时间获取 在 updateProjectBasic.end的select中获取
			} catch (e) {
			} finally {
			}
		}
	}

	function setViewProjectForm(obj) {
		updateProjectBasic.myform.getForm().findField('name').setValue(
				obj.vname);
		updateProjectBasic.myform.getForm().findField('category').setValue(
				obj.vtype);
		updateProjectBasic.original = obj.vtypeid;// 用来判断project类型是否改变
		updateProjectBasic.projectcategoryid = obj.vtypeid;
		departmentUser.departmentCombo.setTextValue(obj.vdepart);
		departmentUser.codeid = obj.vdepartid;// 部门id
		departmentUser.userComb.setValue(obj.vuser);
		departmentUser.userid = obj.vuserid;
		departmentUser.currentDegree =obj.currentDegree;
		updateProjectBasic.myform.getForm().findField('createtime').setValue(
				obj.vcreate);
		updateProjectBasic.myform.getForm().findField('projectstatus')
				.setValue(obj.vstatus);
		updateProjectBasic.myform.getForm().findField('start').setValue(
				obj.vstart);
		updateProjectBasic.myform.getForm().findField('end').setValue(obj.vend);
		updateProjectBasic.start1 = obj.vstart;
		updateProjectBasic.end1 = obj.vend;
		updateProjectBasic.myform.getForm().findField('ptextarea').setValue(
				obj.vdesc);
		updateProjectBasic.securityDegree.setValue(obj.securityDegreeName);
		updateProjectBasic.securityDegree1 = obj.securityDegree;
		departmentUser.securityDegree =  obj.securityDegree;
		enmusEntity.usersComb.setValue(obj.whyname);
		enmusEntity.id = obj.whyid;

	}

	Ext.Ajax.request( {
		url : "../JSON/project_ProjectRemote.getProjectInfo",
		method : 'POST',
		success : function(response, options) {
			var obj = Ext.util.JSON.decode(response.responseText);
			if (obj.success == true) {
				if (obj.vstart != null) {
					try {
						updateProjectBasic.originalstart = Date.parseDate(
								obj.vstart, "Y-m-d");
						updateProjectBasic.end
								.setMinValue(updateProjectBasic.originalstart);
					} catch (e) {
					}
				}
				if (obj.vend != null) {
					try {
						updateProjectBasic.originalend = Date.parseDate(
								obj.vend, "Y-m-d");
						updateProjectBasic.start
								.setMaxValue(updateProjectBasic.originalend);
					} catch (e) {
					}
				}
				if (obj.vcreate != null) {
					try {
						updateProjectBasic.createtime = Date.parseDate(
								obj.vcreate, "Y-m-d");
						// updateProjectBasic.start
						// .setMinValue(updateProjectBasic.createtime);
						// updateProjectBasic.end
						// .setMinValue(updateProjectBasic.createtime);
					} catch (e) {
					}
				}
				setViewProjectForm(obj);
			} else {
				collarbMain.refresh();
				Ext.MessageBox.show( {
					title : '' + getResource('resourceParam499') + '',
					msg : obj.message,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
			}
		},
		params : {
			node : leftNavigationTree.nodeId
		}
	});

	return updateProjectBasic.myform;
}
