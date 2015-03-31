Ext.ns('Sysware.P2M');
Sysware.P2M.Project = Ext
		.extend(
				Ext.Panel,
				{
					// create,update,view
					operation : 'view',

					createUrl : '../JSON/p2m_project_ProjectRemote.createProject',
					createCallback : null,
					updateUrl : '../JSON/p2m_project_ProjectRemote.updateProject',
					updateCallback : null,
					viewUrl : '../JSON/p2m_project_ProjectRemote.viewProject',
					descriptionNum : 500,// 项目描述可填写的字数
					/*
					 * 记录选取前项目类型Id,
					 * 用于判断项目类型是否已经修改，
					 * 是否需要重新实例化扩展属性
					 */
					_preCategoryId:null,
					// 当前选中的结点
					currentNode : {
						fatherDataId : null,
						fatherDataType : null,
						projectId : null
					},
					anchor : '90%',// 默认的panel内组件的anchor
					// 基本属性的formpanel
					basicForm : null,
					// 扩展属性的formpanel
					extendedForm : null,

					/*
					 * 上一步
					 */
					pre : function(panel) {
						panel.getLayout().setActiveItem(0);
					},
					/*
					 * 下一步
					 */
					next : function(panel) {
						panel.getLayout().setActiveItem(1);
					},
					submit : function() {
						console.log('submit');
					},
					setOperation : function(operation) {
						this.operation = operation;
					},
					reset : function() {
						this.basicForm.getForm().reset();//清除基本属性
						this.removeExtendedItems();//移除所有扩展属性
						this.getLayout().setActiveItem(0);//重新置为第一页
						_preCategoryId=null;//记录选取前项目类型Id
					},
					initComponent : function() {
						var self = this;
						self.basicForm = new Ext.form.FormPanel(
								{
									bodyStyle : 'padding:10px 0px 10px 10px',
									xtype : 'form',
									border : false,
									autoScroll : true,
									defaults : {
										anchor : self.anchor,
										style : 'margin-bottom: 5px;'
									},
									bbar : new Ext.ux.StatusBar(
											{
												itemId : 'statusbar',
												items : [ {
													xtype : 'tbtext',
													itemId : 'wordCount',
													text : '项目描述可填写字数:' + self.descriptionNum
												} ]
											}),
									items : [
											{
												xtype : 'textfield',
												name : 'projectName',
												fieldLabel : getResource('resourceParam1035'),
												plugins : [ new Sysware.P2M.AllowBlank() ]
											},
											{
												xtype : 'sysware.p2m.combobox',
												hiddenName : 'category',
												itemId : 'categoryId',
												ref : '../category',
												fieldLabel : getResource('resourceParam1037'),
												pageSize : 10,
												store : new Ext.data.Store(
														{
															proxy : new Ext.data.HttpProxy(
																	{
																		url : '../JSON/project_ProjectRemote.getProjectPagedCategory'
																	}),
															reader : new Ext.data.JsonReader(
																	{
																		totalProperty : 'totalProperty',
																		root : 'root'
																	},
																	[
																			{
																				name : 'categoryId'
																			},
																			{
																				name : 'categoryName'
																			},
																			{
																				name : 'attibuteSum'
																			} ]),
															listeners : {
																'load' : function(
																		store,
																		records,
																		options) {
																}
															}
														}),
												valueField : "categoryId",
												displayField : "categoryName",
												mode : 'remote',
												minChars : 0,
												plugins : [ new Sysware.P2M.AllowBlank() ],
												forceSelection : true,
												editable : true,
												enableKeyEvents : true,
												disableKeyFilter : true,
												triggerAction : 'all',
												listeners : {
													'beforequery' : function(qe) {
														delete qe.combo.lastQuery;
													},
													'beforeselect' : function(combo,
															record, index) {
														self._preCategoryId=combo.getValue();
													},
													'select' : function(combo,
															record, index) {
														if(combo.getValue()==self._preCategoryId){
															/*
															 * 如果选取的值和以前的值一样，
															 */
														}else{
														    /*
														     * 如果改换了项目类型,清空扩展属性
														     */
															self.removeExtendedItems();
														}
														
														var submit = self.basicForm.basicForm_submit;
														var next = self.basicForm.next;
														if (record.data.attibuteSum == 0) {
															Ext.example
																	.msg('提示',
																			'选取的项目类型没有扩展属性.');
															submit
																	.setVisible(true);
															next
																	.setVisible(false);
															// 针对在基本属性页面完成按钮的重新布局
															self.basicForm
																	.doLayout();
														} else {
															submit.setVisible(false);
															next.setVisible(true);
														}
													}
												}
											},
											{
												xtype : 'sysware.p2m.combobox',
												hiddenName : 'securityDegree',
												itemId : 'securityDegree',
												fieldLabel : getResource('resourceParam1973'),
												store : new Ext.data.Store(
														{
															proxy : new Ext.data.HttpProxy(
																	{
																		url : '../JSON/groups_GroupsRemote.getSecurityDegree'
																	}),
															reader : new Ext.data.JsonReader(
																	{
																		totalProperty : 'totalProperty',
																		root : 'root'
																	},
																	[
																			{
																				name : 'id'
																			},
																			{
																				name : 'name'
																			} ])
														}),
												valueField : "id",
												displayField : "name",
												mode : 'remote',
												forceSelection : true,
												editable : false,
												triggerAction : 'all',
												listeners : {
													select : function(combo,
															record, index) {

														var user = combo.ownerCt
																.getComponent('userId');
														var userId = user
																.getValue();
														if (userId) {
															/*
															 * 如果已经选中了负责人
															 */
															var value = record
																	.get('id');
															var userSecurityDegree = user.store
																	.getById(
																			userId)
																	.get(
																			'securityDegree');
															/*
															 * 如果选择的密级大于负责人的密级，清空已选的负责人
															 */
															if (value > userSecurityDegree) {
																Ext.example
																		.msg(
																				'提示',
																				getResource('resourceParam9174'));
																user.reset();
																return;
															}
														}
														/*
														 * 选取密级时给出密级时选取负责人的过滤条件的提示
														 */
														Ext.example
																.msg(
																		'设置项目密级为:' + record.data.name,
																		'项目负责人的密级必须高于当前项目密级');

													}
												}
											},
											{
												xtype : 'combotree',
												fieldLabel : getResource('resourceParam986'),
												hiddenName : 'departmentId',
												itemId : 'departmentId',
												tree : new Ext.tree.TreePanel(
														{
															rootVisible : false,
															containerScroll : true,
															loader : new Ext.tree.TreeLoader(
																	{
																		dataUrl : "../JSON/common_inst_InstSelectSvr.getMenuDatas"
																	}),
															root : new Ext.tree.AsyncTreeNode(
																	{
																		id : '-1',// 已于后台关联，不能修改，否则影响自动回填
																		text : '' + getResource('resourceParam573') + ''
																	})
														}),
												resizable : true,
												selectNodeModel : 'all',
												onViewClick : function(doFocus) {
													var index = this.view
															.getSelectedIndexes()[0], s = this.store, r = s
															.getAt(index);
													if (r) {
														this.onSelect(r, index);
													} else {
														// this.collapse();
													}
													if (doFocus !== false) {
														this.el.focus();
													}
												},
												listeners : {
													afterrender : function(
															department) {
														Ext.Ajax
																.request( {
																	url : '../JSON/common_inst_InstSelectSvr.getCurrentDepartment',
																	method : 'GET',
																	success : function(
																			response,
																			options) {
																		department.tree
																				.getRootNode().attributes.defaultPath = response.responseText;
																	},
																	params : {
																		id : ''
																	}
																});
													},
													select : function(combo,
															record, index) {
														// 如果选取的部门不和负责人是同一部门，则清空已选的负责人
														var user = combo.ownerCt
																.getComponent('userId');
														var userId = user
																.getValue();
														if (userId) {
															/*
															 * 如果已经选中了负责人
															 */
															var value = record.id;
															var userDepartmentId = user.store
																	.getById(
																			userId)
																	.get(
																			'instcode');
															if (value != userDepartmentId) {
																Ext.example
																		.msg(
																				'提示',
																				'已选的负责人不在当前选取的部门中');
																user.reset();
															}
														}
													},
													expand : function(combo) {
														var user = combo.ownerCt
																.getComponent('userId');
														var userId = user
																.getValue();
														var departmentId = combo
																.getValue();
														/*
														 * 选取没有选取负责人,则选中默认的部门
														 */
														var path = null;
														if (departmentId == '') {
															if (userId == '') {
																path = combo.tree
																		.getRootNode().attributes.defaultPath;
																if (path) {
																	combo.tree
																			.selectPath(path);
																}
															}
														} else {
															if (userId) {
																path = combo.tree
																		.getRootNode().attributes.currentPath;
																if (path) {
																	combo.tree
																			.selectPath(path);
																}
															}

														}

													}
												}
											},
											{
												xtype : 'sysware.p2m.combobox',
												fieldLabel : getResource('resourceParam1034'),
												hiddenName : 'userId',
												itemId : 'userId',
												store : new Ext.data.Store(
														{
															proxy : new Ext.data.HttpProxy(
																	{
																		method : 'POST',
																		url : "../JSON/base_user_UserSerivce.findpageDepartmentList?a="
																				+ new Date()
																	}),
															reader : new Ext.data.JsonReader(
																	{
																		id : "userid",
																		totalProperty : 'totalProperty',
																		root : 'results'
																	},
																	[
																			{
																				name : 'truename'
																			},
																			{
																				name : 'userid'
																			},
																			{
																				name : 'loginname'
																			},
																			{
																				name : 'ginstitutename'
																			},
																			{
																				name : 'instcode'
																			},
																			{
																				name : 'securityDegree'
																			},
																			{
																				name : 'depPath'
																			} ]),
															listeners : {
																'load' : function(
																		store,
																		records,
																		options) {
																	if (records.length == 0) {
																		Ext.example
																				.msg(
																						'提示',
																						'没有符合条件的用户存在,请修改过滤条件.');
																	}

																}
															}
														}),
												valueField : "userid",
												displayField : "truename",
												mode : 'remote',
												queryParam : 'truename',
												minChars : 0,
												pageSize : 10,
												forceSelection : true,
												editable : true,
												triggerAction : 'all',
												typeAhead : false,
												resizable : true,
												name : 'userid',
												blankText : '' + getResource('resourceParam570') + '',
												enableKeyEvents : true,
												disableKeyFilter : true,
												tpl : '<tpl for="."><div ext:qtip="{loginname}"  class="x-combo-list-item">' + '<div style="float:left; text-align:left; padding-left:3px">{truename}</div>' + '<div style="float:right; text-align:right padding-right:3px"><font color="green">{loginname}</font></div>' + '</div></tpl>',
												listeners : {
													'select' : function(combo,
															record, index) {

														var department = combo.ownerCt
																.getComponent('departmentId');
														var departmentId = department
																.getValue();
														/*
														 * 
														 * 选取负责人后，回填负责人所在部门
														 */
														var node = new Ext.tree.TreeNode(
																{
																	id : record.data.instcode,
																	text : record.data.ginstitutename
																});
														department
																.setValue(node);
														department.tree
																.getRootNode().attributes.currentPath = record.data.depPath;
													},
													'beforequery' : function(qe) {
														var combo = qe.combo;
														Ext
																.apply(
																		combo.store.baseParams,
																		{
																			instcode : combo.ownerCt
																					.getComponent(
																							'departmentId')
																					.getValue(),
																			securityDegree : combo.ownerCt
																					.getComponent(
																							'securityDegree')
																					.getValue()
																		});
														delete qe.combo.lastQuery;
													}
												}
											},
											{
												xtype : 'datefield',
												name : 'createTime',
												fieldLabel : '' + getResource('resourceParam858') + '',
												format : 'Y-m-d',
												style : 'margin-bottom: 5px;',
												value : (new Date())
														.format('Y-m-d'),
												width : 250,
												disabled : true
											},
											{
												xtype : 'sysware.p2m.combobox',
												fieldLabel : getResource('resourceParam1038'),
												hiddenName : 'projectStatusId',
												store : new Ext.data.ArrayStore(
														{
															fields : [
																	"projectstatusid",
																	"projectstatusname" ],
															data : [ [
																	1,
																	getResource('resourceParam947') ] ]
														}),
												valueField : "projectstatusid",
												displayField : "projectstatusname",
												forceSelection : true,
												editable : false,
												triggerAction : 'all',
												value : 1,// 默认设置为编制中
												disabled : true
											},
											{
												xtype : 'sysware.p2m.datefield',
												name : 'start',
												itemId : 'start',
												fieldLabel : getResource('resourceParam991'),
												format : 'Y-m-d',
												editable : false,
												showToday : true,
												listeners : {
													select : function(field,
															value) {
														field.ownerCt
																.getComponent(
																		'end')
																.setMinValue(
																		value);
														field.plannedStart = value;
														field.ownerCt
																.getComponent('end').plannedStart = value;

													}
												}
											},
											{
												xtype : 'sysware.p2m.datefield',
												name : 'end',
												itemId : 'end',
												fieldLabel : getResource('resourceParam1032'),
												format : 'Y-m-d',
												editable : false,
												showToday : true,
												listeners : {
													select : function(field,
															value) {
														field.ownerCt
																.getComponent(
																		'start')
																.setMaxValue(
																		value);
														field.plannedEnd = value;
														field.ownerCt
																.getComponent('start').plannedEnd = value;
													}
												}
											},
											{
												xtype : 'sysware.p2m.combobox',
												fieldLabel : getResource('resourceParam3019'),// '理由',
												hiddenName : 'reason',
												store : new Ext.data.Store(
														{
															proxy : new Ext.data.HttpProxy(
																	{
																		method : 'POST',
																		url : "../JSON/data_Remote.getSysEnumsVos?type=1"
																	}),
															reader : new Ext.data.JsonReader(
																	{
																		id : "id",
																		totalProperty : 'totalProperty',
																		root : 'results'
																	},
																	[
																			{
																				name : 'enumsname'
																			},
																			{
																				name : 'id'
																			} ])
														}),
												valueField : "id",
												displayField : "enumsname",
												mode : 'remote',
												queryParam : 'enumsname',
												minChars : 0,
												pageSize : 10,
												forceSelection : true,
												editable : false,
												triggerAction : 'all',
												typeAhead : true,
												enableKeyEvents : true,
												disableKeyFilter : true
											},
											{
												xtype : 'textarea',
												name : 'projectNote',
												grow : true,
												growMin : 50,
												maxLength : self.descriptionNum,
												enableKeyEvents : true,
												fieldLabel : getResource('resourceParam1039'),
												listeners : {
													'keyup' : function(t) {
														var len = t.getValue().length;
														if (len <= 500) {
															t.ownerCt
																	.getBottomToolbar()
																	.getComponent(
																			'wordCount')
																	.setText(
																			'项目描述可填写字数：' + (self.descriptionNum - len));
														} else {
															t.ownerCt
																	.getBottomToolbar()
																	.getComponent(
																			'wordCount')
																	.setText(
																			'<span color="red">项目描述字数已超过规定长度,请酌情删减!</span>');
														}
													}
												}
											},
											{
												layout : 'hbox',
												layoutConfig : {
													align : 'middle',
													pack : 'end',
													defaultMargins : {
														top : 0,
														right : 5,
														bottom : 0,
														left : 0
													}
												},
												border : false,
												items : [
														{
															xtype : 'button',
															text : getResource('resourceParam1151'),
															ref : '../next',
															handler : function() {
																if (self.basicForm
																		.getForm()
																		.isValid()) {
																	var categoryId=self.basicForm.getComponent('categoryId').getValue();
																	if (categoryId==self._preCategoryId) {
																		/*
																		 * 如果项目类型与上一次的值一样，
																		 * 则直接进入扩展属性页面
																		 */
																		self
																				.getLayout()
																				.setActiveItem(
																						1);
																		return;
																	} else {
																		/*
																		 * 在选取了类型后，
																		 * 点击下一步后，再返回，再点下一步时
																		 * 保证不会重复添加扩展属性
																		 * 
																		 */
																		self._preCategoryId=categoryId;
																		/*
																		 * 如果项目类型与上一次的值不一样，
																		 * 则实例化扩展属性
																		 */
																		Ext.Ajax
																				.request( {
																					url : '../JSON/project_ProjectRemote.getExtendForm',
																					success : function(
																							response,
																							options) {
																						var obj = Ext.util.JSON
																								.decode(response.responseText);
																						var labelWidth = obj.labelWidth;
																						var items = obj.items;
																						self
																								.createForm(
																										self.extendedForm,
																										items,
																										labelWidth);
																						if (obj.length == 0) {
																							Ext.Msg
																									.alert(
																											'提示',
																											'当前项目类型没有扩展属性!');
																						}
																						self
																								.getLayout()
																								.setActiveItem(
																										1);
																					},
																					params : {
																						projectcategoryid : categoryId
																					}
																				});

																	}

																} else {
																	Ext.example
																			.msg(
																					'提示',
																					'请填写必填项');
																}
															}
														},
														{
															xtype : 'button',
															text : getResource('resourceParam5046'),
															ref : '../basicForm_submit',
															hidden : true,
															handler : function() {
																if (self.basicForm
																		.getForm()
																		.isValid()) {
																	self
																			.submit();
																} else {
																	Ext.example
																			.msg(
																					'提示',
																					'请填写必填项');
																}
															}
														} ]
											} ]
								});
						self.extendedForm = new Ext.form.FormPanel(
								{
									bodyStyle : 'padding:10px 0px 10px 10px',
									xtype : 'form',
									border : false,
									autoScroll : true,
									fileUpload : true,
									defaults : {
										anchor : self.anchor,
										style : 'margin-bottom: 5px;'
									},
									items : [ {
										layout : 'hbox',
										layoutConfig : {
											align : 'middle',
											pack : 'end',
											defaultMargins : {
												top : 0,
												right : 5,
												bottom : 0,
												left : 0
											}
										},
										border : false,
										items : [
												{
													xtype : 'button',
													ref : '../pre',
													text : '' + getResource('resourceParam1152') + '',
													handler : function() {
														self.getLayout()
																.setActiveItem(
																		0);

													}
												},
												{
													xtype : 'button',
													ref : '../extendedForm_submit',
													text : getResource('resourceParam5046'),
													handler : function() {
														
																
													}
												} ]
									} ]
								});

						var config = {
							layout : 'card',
							hideMode : 'offsets',
							autoScroll : true,
							split : true,
							activeItem : 0,
							border : false,
							frame : false,
							items : [ {
								xtype : 'panel',
								layout : 'fit',
								items : [ self.basicForm ]
							}, {
								xtype : 'panel',
								layout : 'fit',
								items : [ self.extendedForm ]
							} ]
						};
						Ext.apply(this, config);
						Sysware.P2M.Project.superclass.initComponent.call(this);
					},
					/*
					 * 移除所有动态加入的扩展属性
					 */
					removeExtendedItems : function() {
						var extendedForm=this.extendedForm;
						var length=extendedForm.items.length-1;
				        for(var i=0;i<length;i++){
				        	extendedForm.remove(extendedForm.items.items[0],true);
				        }
					},
					createForm : function(form, items, labelWidth) {
						var paddingleft = labelWidth + 5;
						if (paddingleft < 105) {
							paddingleft = 105;
						}
						if (labelWidth < 100) {
							labelWidth = 100;
						}
						var length = items.length;
						var fileSequence = 0;// 标记是第几个文件
						for ( var i = 0; i < length; i++) {
							if (items[i].allowBlank == false) {
								items[i].label += '(<span style="color:red;" >＊</span>)';
							}
							form.insert(i, this.addItem(items[i], fileSequence,
									labelWidth, paddingleft));
						}
						/*
						 * 这样每次动态加入后才能正确渲染页面
						 */
						form.doLayout(true,true);
					},
					addItem : function toFormItem(item, fileSequence,
							labelWidth, paddingleft) {
						var formItem = null;
						if (item.type == 'string') {
							fileSequence += 1;
							formItem = new Ext.form.TextField(
									{
										fieldLabel : item.label,
										labelStyle : 'width:' + labelWidth + 'px;',
										name : item.objid,
										value : item.value,
										allowBlank : item.allowBlank,
										width : item.width,
										style : 'margin-bottom: 5px',
										maxLength : 20,
										maxLengthText : '' + getResource('resourceParam1000') + '',
										minLength : 1,
										minLengthText : '' + getResource('resourceParam1002') + '',
										blankText : '' + getResource('resourceParam1027') + '',
										emptyText : '' + getResource('resourceParam1027') + '',
										// regex :
										// /^([\u0391-\uFFE5]|[a-zA-Z]|\d)*$/,
										// regexText : '只能输入中文,字母,数字',
										validator : function(val) {
											if (this.allowBlank) {
												return true;
											}
											if (val.trim() == '') {
												return ""
														+ getResource('resourceParam1027')
														+ "";
											}
											return true;
										},
										listeners : {
											render : function() {
												this.el.dom.parentNode
														.setAttribute(
																'style',
																'padding-left:' + paddingleft + 'px');
											}
										}
									});
						} else if (item.type == 'integer') {
							fileSequence += 1;
							formItem = new Ext.form.NumberField(
									{
										fieldLabel : item.label,
										labelStyle : 'width:' + labelWidth + 'px',
										name : item.objid,
										value : item.value,
										maxValue : Math.pow(2, 31) - 1,
										minValue : -Math.pow(2, 31),
										allowBlank : item.allowBlank,
										width : item.width,
										style : 'margin-bottom: 5px;',
										allowDecimals : false,
										allowNegative : true,
										blankText : '' + getResource('resourceParam1028') + '',
										emptyText : '' + getResource('resourceParam1028') + '',
										invalidText : '' + getResource('resourceParam1024') + '',
										listeners : {
											render : function() {
												this.el.dom.parentNode
														.setAttribute(
																'style',
																'padding-left:' + paddingleft + 'px');
											}
										}
									});
						} else if (item.type == 'double') {
							fileSequence += 1;
							formItem = new Ext.form.NumberField(
									{
										fieldLabel : item.label,
										labelStyle : 'width:' + labelWidth + 'px',
										name : item.objid,
										value : item.value,
										maxValue : Math.pow(2, 63) - 1,
										minValue : -Math.pow(2, 63),
										allowBlank : item.allowBlank,
										width : item.width,
										style : 'margin-bottom: 5px;',
										allowDecimals : true,
										allowNegative : true,
										decimalPrecision : 9,
										blankText : '' + getResource('resourceParam1025') + '',
										emptyText : '' + getResource('resourceParam1025') + '',
										invalidText : '' + getResource('resourceParam1023') + '',
										listeners : {
											render : function() {
												this.el.dom.parentNode
														.setAttribute(
																'style',
																'padding-left:' + paddingleft + 'px');
											}
										}
									});
						} else if (item.type == 'date') {
							fileSequence += 1;
							formItem = new Ext.form.DateField(
									{
										fieldLabel : item.label,
										labelStyle : 'width:' + labelWidth + 'px',
										name : item.objid,
										value : item.value,
										allowBlank : item.allowBlank,
										width : item.width,
										style : 'margin-bottom: 5px;',
										format : 'Y年m月d日',
										editable : false,
										blankText : '' + getResource('resourceParam1029') + '',
										emptyText : '' + getResource('resourceParam1029') + ''
									});
						} else if (item.type == 'boolean') {
							fileSequence += 1;
							formItem = new Ext.form.ComboBox(
									{
										value : 'false',
										fieldLabel : item.label,
										value : item.value,
										labelStyle : 'width:' + labelWidth + 'px',
										hiddenName : item.objid,
										allowBlank : item.allowBlank,
										width : item.width,
										style : 'margin-bottom: 5px;',
										store : new Ext.data.SimpleStore(
												{
													fields : [ 'value', 'state' ],
													data : [
															[
																	'false',
																	'' + getResource('resourceParam510') + '' ],
															[
																	'true',
																	'' + getResource('resourceParam512') + '' ] ]
												}),
										valueField : 'value',
										displayField : 'state',
										typeAhead : false,
										mode : 'local',
										triggerAction : 'all',
										selectOnFocus : true,
										forceSelection : true,
										editable : false
									});
						} else if (item.type == 'file') {
							fileSequence += 1;
							var filename;
							if (item.value != null) {
								filename = item.value.split("/")[1];
								if (filename == null) {
									filename = item.value.split("\\")[1];
								}
							}
							formItem = new Ext.ux.form.FileUploadField(
									{
										fieldLabel : item.label,
										value : filename,
										labelStyle : 'width:' + labelWidth + 'px',
										name : 'file' + fileSequence,
										allowBlank : item.allowBlank,
										width : item.width,
										style : 'margin-bottom: 5px;',
										buttonText : '' + getResource('resourceParam473') + '',
										emptyText : '' + getResource('resourceParam1022') + '',
										listeners : {
											render : function() {
												this.el.dom.parentNode.parentNode
														.setAttribute(
																'style',
																'padding-left:' + paddingleft + 'px');
												this.el.dom.parentNode
														.setAttribute(
																'style',
																'width:' + item.width + 'px;' + 'margin-bottom: 5px;');
											}
										}
									});
						}
						return formItem;
					}
				});
Ext.reg('sysware.p2m.project', Sysware.P2M.Project);