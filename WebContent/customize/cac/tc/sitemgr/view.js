var tablePanel = {};
var toolbar = {};
var siteMgrForm = {};
var siteMgr = {};

/** **************** Tab视图 **************************** */
tablePanel.tabInput = function() {
	var panel = new Ext.Panel({
				title : '信息录入',
				id : 'tab1',
				resizeTabs : true,
				tabWidth : 300,
				tabMargin : 300,
				layout : 'fit',
				//tbar : [toolbar.saveBtn],
				items : siteMgrForm.docInputForm(),
				listeners : {
					'activate' : {
						fn : function() {
							isViewForm = true;
							isViewList = false;
							returnForm();
						},
						'load' : {
							fn : function() {
								returnForm();
							}
						}
					}
				}
			});
	return panel;
}
tablePanel.tabList = function() {

	var panel = new Ext.Panel({
				title : '列表',
				id : 'tab2',
				layout : 'fit',
				tbar : [toolbar.queryBtn, '-', toolbar.editBtn, '-',
						toolbar.statisBtn, '-', toolbar.processBtn],
				listeners : {
					'activate' : {
						fn : function() {
							returnList(this);
							// this.removeAll();
							// this.add(returnList());
							// this.doLayout();

						}
					}
				}
			});
	return panel;
}

/** ******************** 工具栏*** */
// 保存
toolbar.saveBtn = {
	id : 'saveBtn',
	text : ' 保存 ',
	xtype : 'tbbutton',
	handler : function() {
		// Ext.Ajax.request({
		// url : '../seam/resource/siteMgrUploadDownServlet?a='
		// + new Date(),
		// form : 'docInputForm',
		// method : 'POST',
		// headers : 'Content-Type :multipart/form-data',
		// callback : function(options, success, response) {
		// alert(response);
		// }
		// });

		// '../seam/resource/siteMgrUploadDownServlet?a='
		var fm = Ext.getCmp('docInputForm');

		if (fm.getForm().isValid()) {
			fm.form.submit({
						url : '../JSON/siteMgrRemote.saveFormalDoc',
						waitMsg : '正在保存您的数据...',
						metohd : 'POST',
						success : function(form, action) {
							Ext.Msg.alert('提示', action.failureType);
						},
						failure : function(form, action) {
							Ext.Msg.alert('提示', action.failureType);
						}
					});
		}

	}
}
// 编辑
toolbar.editBtn = {
	id : 'editBtn',
	text : ' 编辑 ',
	handler : function() {
		XX.common.msg(this.text, this.id + '--' + this.text);
	}
}
// 查询
toolbar.queryBtn = {
	id : 'queryBtn',
	text : ' 查询 ',
	handler : function() {
		returnFindForm();
	}
}
// 统计
toolbar.statisBtn = {
	id : 'statisBtn',
	text : ' 统计 ',
	handler : function() {
		XX.common.msg(this.text, this.id + '--' + this.text);
	}
}
// 处理
toolbar.processBtn = {
	id : 'processBtn',
	text : ' 处理 ',
	handler : function() {
		XX.common.msg(this.text, this.id + '--' + this.text);
	}
}
/** *************************表单Form*********** */
// 书面正式文档Form
siteMgrForm.docInputForm = function() {
	// 来源
	departmentUser.department('来源');
	departmentUser.departmentCombo.setWidth(200);
	departmentUser.departmentCombo.allowBlank = false;

	var form = new Ext.FormPanel({
				id : 'docInputForm',
//				fileUpload : true,
				frame : true,
				height : 100,
				labelSeparator : ' : ',
				labelAlign : 'right',
				labelWidth : 100,
				bodyStyle : 'padding: 5 5 5 5',
				buttonAlign : 'center',
				items : [new Ext.form.TextField({
									id : 'docNum',
									fieldLabel : '文档编号',
									allowBlank : false,
									blankText : '请填写项目编号',
									msgTarget : 'qtip',
									width : 200
								}), new Ext.form.DateField({
									id : 'time',
									fieldLabel : '时间',
									allowBlank : false,
									format : 'Y年m月d日',
									blankText : '请填写时间',
									msgTarget : 'qtip',
									width : 200
								}), new Ext.form.TextField({
									id : 'source',
									fieldLabel : '来源',
									//allowBlank : false,
									msgTarget : 'qtip',
									width : 200
								}),new Ext.form.TextField({
									id : 'author',
									fieldLabel : '提交人',
									//allowBlank : false,
									msgTarget : 'qtip',
									width : 200
								}),
									getRecevier(), 
									new Ext.form.TextField({
									id : 'planNum',
									fieldLabel : '计划编号',
									blankText : '请填写计划编号',
									//allowBlank : false,
									msgTarget : 'qtip',
									width : 200
								}),
								{
									xtype : 'textfield',
									fieldLabel : '附加文档',
									width : 150,
									id : 'fileUpload',
									name : 'fileUpload',
									inputType : 'file'
								},
								{
									buttons : [{
										xtype : 'button',
										text : '保存',
										handler : function(){
											if(form.form.isValid()) {
												form.form.submit({
													url : '../JSON/siteMgrRemote.saveFormalDoc',
													method : 'post',
													success : function(form, action) {
														XX.common.msg('提示', '保存数据成功！');
														form.reset();
													}
												})
											}
										}
									}]
								}
				]

			});
	return form;

}

// 问题处理Form
siteMgrForm.problemForm = function() {

	departmentUser.department('专业室');
	departmentUser.departmentCombo.setWidth(200);
	departmentUser.departmentCombo.allowBlank = true;
	var form = new Ext.form.FormPanel({
				id : 'problemForm',
				frame : true,
				//fileUpload : true,
				labelSeparator : ' : ',
				labelAlign : 'right',
				labelWidth : 100,
				bodyStyle : 'padding: 5 5 5 5',
				buttonAlign : 'center',
				items : [new Ext.form.TextField({
									id : 'source',
									fieldLabel : '任务来源',
									//allowBlank : false,
									blankText : '请填写项目编号',
									msgTarget : 'qtip',
									width : 200
								}), new Ext.form.TextField({
									id : 'taskNum',
									fieldLabel : '任务编号',
									//allowBlank : false,
									blankText : '请填写任务编号',
									msgTarget : 'qtip',
									width : 200
								}), new Ext.form.DateField({
									id : 'time',
									fieldLabel : '提出时间',
									//allowBlank : false,
									format : 'Y年m月d日',
									blankText : '请填写提出时间',
									msgTarget : 'qtip',
									width : 200
								}), new Ext.form.TextField({
									id : 'problemName',
									fieldLabel : '问题名称',
									allowBlank : false,
									blankText : '请填写问题名称',
									msgTarget : 'qtip',
									width : 200
								}), new Ext.form.TextField({
									id : 'content',
									fieldLabel : '问题内容',
									//allowBlank : false,
									blankText : '请填写问题内容',
									msgTarget : 'qtip',
									width : 200
								}), new Ext.form.DateField({
									id : 'progressRequire',
									fieldLabel : '进度要求',
									//allowBlank : false,
									format : 'Y年m月d日',
									blankText : '请填写进度要求',
									msgTarget : 'qtip',
									width : 200
								}), departmentUser.departmentCombo,
						new Ext.form.TextField({
									id : 'impact',
									fieldLabel : '影响程度',
									//allowBlank : false,
									blankText : '请填写影响程度',
									msgTarget : 'qtip',
									width : 200
								}), getPerson('responsible', '责任人'),
						new Ext.form.TextArea({
									id : 'advice',
									preventScrollbars : true,
									fieldLabel : '处理意见',
									//allowBlank : false,
									blankText : '请填写处理意见',
									msgTarget : 'qtip',
									width : 200
								}), new Ext.form.TextField({
									id : 'remark',
									fieldLabel : '备注',
									//allowBlank : true,
									blankText : '请填写备注',
									msgTarget : 'qtip',
									width : 200
								}), XX.view.upload('附加文档'),
								{
									buttons : [{
										xtype : 'button',
										text : '保存',
										handler : function(){
											if(form.form.isValid()) {
												form.form.submit({
													url : '../JSON/siteMgrRemote.saveDelProblem',
													method : 'post',
													success : function(form, action) {
														XX.common.msg('提示', '保存数据成功！');
														form.reset();
													}
												})
											}
										}
									}]
								}]
			});
	return form;
}
siteMgrForm.findDocInput = function() {

	var window = new Ext.Window({
		title : '查询书面正式文档处理',
		width : 400,
		modal : true,
		height : 220,
		maximazable : true,
		autoScroll : false,
		plain : true,
		layout : 'fit',
		items : findDocInput = new Ext.FormPanel({
					id : 'findDocInput',
					labelWidth : 75,
					hidemode : "offsets",
					frame : true,
					bodyStyle : 'padding:5px 5px 0',
					baseCls : "x-plain",
					width : 500,
					labelAlign : 'right',
					items : [

							new Ext.form.TextField({
										fieldLabel : "文档编号",
										name : "col1",
										id : "col1",
										width : 200,
										allowBlank : true
									}), new Ext.form.DateField({
										id : 'col2',
										fieldLabel : '时间',
										width : 200,
										format : 'Y年m月d日'
									}), new Ext.form.TextField({
										id : 'col3',
										fieldLabel : '来源',
										width : 200,
										allowBlank : true
									})]
				}),
		buttons : [{
			text : '查询',
			handler : function() {
				var form = Ext.getCmp('findDocInput');
				
				var grid = Ext.getCmp('gridDoc');
				grid.getStore().baseParams={col1 :form.findById('col1').getValue(),
											col2 :form.findById('col2').getValue(),
											col3 :form.findById('col3').getValue()};
				grid.getStore().load();
				window.close();
//				var grid = siteMgr.list.docInput;
//				form.form.submit({
//							url : '../JSON/siteMgrRemote.findFormalDocList?a='
//									+ new Date(),
//							waitMsg : '正在查询您的数据...',
//							metohd : 'POST',
//
//							success : function(form, action) {
//								
//							},
//							failure : function(form, action) {
//
//							}
//						});

			}
		}, {
			text : '取消',
			handler : function() {
				findDocInput.form.reset();
				window.close();
			}
		}]

	})
	window.show();

};
siteMgr.list = function() {
	return {
		docInput : function() {
			var sm = new Ext.grid.CheckboxSelectionModel();

			var store = new Ext.data.Store({
				proxy : new Ext.data.HttpProxy({
							url : '../JSON/siteMgrRemote.getFormalDocList?a=545',
							method : 'post'
						}),
				reader : new Ext.data.JsonReader({
							root : 'results',
							id : 'id',
							totalProperty : 'totalProperty'
						}, ['id', 'docNum', 'time', 'source', 'author',
								'receiver', 'planNum', 'doc', 'docUrl',
								'status', 'executor', 'details']),
				baseParams :{
					col1:'',co2:'',col3 :''
				}
			});
			sm.on('selectionchange', function(selection) {

						var count = selection.getSelections().length;
						var rows = selection.getSelections();
						for (var i = 0; i < rows.length; i++) {
							XX.common.msg('ID', rows[i].get('id'));
						}
					});
			var cm = new Ext.grid.ColumnModel({
				defaults: {
			        sortable: false,
			        menuDisabled: true
			    },
				columns : [sm, {
						header : '文档编号',
						dataIndex : 'docNum',
						width : 110
					}, {
						header : '时间',
						dataIndex : 'time',
						width : 100
					}, {
						header : '来源',
						dataIndex : 'source',
						width : 100
					}, {
						header : '经手人',
						dataIndex : 'author',
						width : 100
					}, {
						header : '接收人',
						dataIndex : 'receiver',
						width : 100
					}, {
						header : '计划编号',
						dataIndex : 'planNum',
						width : 100
					}, {
						header : '文档',
						dataIndex : 'doc',
						width : 100,
						renderer : function(value, cellmeta, record, rowIndex,
								columnIndex, store) {
							return "<a url=" + record.get("docUrl") + " >"
									+ value + "</a>";
						}
					}, {
						header : '状态',
						dataIndex : 'status',
						width : 100
					}, {
						header : '执行人',
						dataIndex : 'executor',
						width : 110
					}, {
						header : '明细',
						dataIndex : 'details',
						width : 110
					}]
			});
			var grid = new Ext.grid.GridPanel({
						height : 210,
						width : '100%',
						id : 'gridDoc',
						cm : cm,
						sm : sm,
						store : store
					});
			store.load();
			return grid;
		},
		problem : function() {
			var sm = new Ext.grid.CheckboxSelectionModel();
			var store = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
									url : '../JSON/siteMgrRemote.getProblemList?a=545',
									method : 'post'
								}),
						reader : new Ext.data.JsonReader({
									root : 'results',
									id : 'id',
									totalProperty : 'totalProperty'
								}, ['id', 'source', 'taskNum', 'time',
										'problemName', 'content', 'advice',
										'progressRequire', 'responsible',
										'status', 'details'])
					});
			sm.on('selectionchange', function(selection) {

						var count = selection.getSelections().length;
						var rows = selection.getSelections();
						for (var i = 0; i < rows.length; i++) {
							XX.common.msg('任务编号', rows[i].get('taskNum'));
						}
					});
			var cm = new Ext.grid.ColumnModel({
				defaults: {
			        sortable: false,
			        menuDisabled: true
			    },
				columns : [sm, {
						header : '任务来源',
						dataIndex : 'source',
						width : 110
					}, {
						header : '任务编号',
						dataIndex : 'taskNum',
						width : 100
					}, {
						header : '提交时间',
						dataIndex : 'time',
						width : 100
					}, {
						header : '问题名称',
						dataIndex : 'problemName',
						width : 100
					}, {
						header : '问题内容',
						dataIndex : 'content',
						width : 100
					}, {
						header : '处理意见',
						dataIndex : 'advice',
						width : 100
					}, {
						header : '要求答复时间',
						dataIndex : 'progressRequire',
						width : 100
					}, {
						header : '责任人',
						dataIndex : 'responsible',
						width : 100
					}, {
						header : '状态',
						dataIndex : 'status',
						width : 110
					}, {
						header : '明细',
						dataIndex : 'details',
						width : 110
					}]
			});
			var grid = new Ext.grid.GridPanel({
						height : 210,
						width : '100%',
						id : 'problemGrid',
						cm : cm,
						store : store
					});
			store.load();
			return grid;
		}

	};

}();


