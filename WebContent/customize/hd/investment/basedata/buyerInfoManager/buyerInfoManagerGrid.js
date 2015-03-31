Ext.namespace("buyerInfoManager.mainGrid")
/**
 * 采购员信息管理
 * @class buyerInfoManager.mainGrid
 * @extends Ext.grid.GridPanel
 */
buyerInfoManager.mainGrid = Ext.extend(Ext.grid.GridPanel, {
	id : 'buyerInfoManagerGrid', //对象名+类型后缀(Grid)
	loadMask : true,
	sm : new Ext.grid.CheckboxSelectionModel(),
	store : new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
					url : '../JSON/buyerRemote.getInfo',
					method : 'POST'
				}),
		reader : new Ext.data.JsonReader({
					root : 'results',
					totalProperty : 'totalProperty',
					id : 'id'
				}, ['id', 'purchase_code', 'purchase_name', 'purchase_sex',
						'age', 'title', 'post', 'dept','yn_life','term_life']),
		baseParams:{start:0,limit:20}, 
		autoLoad:true
	}),
	cm : new Ext.grid.ColumnModel({
		defaults : {
			sortable : false,
			menuDisabled : true
		},
		columns : [new Ext.grid.RowNumberer(), {
					header : "登陆名称",
					width : 130,
					dataIndex : 'purchase_code'
				}, {
					header : "姓名",
					width : 130,
					dataIndex : 'purchase_name'
				}, {
					header : "性别",
					width : 130,
					dataIndex : 'purchase_sex'
				}, {
					header : "职称",
					width : 130,
					dataIndex : 'title'
				}, {
					header : "职务",
					width : 130,
					dataIndex : 'post'
				}, {
					header : "部门",
					width : 130,
					dataIndex : 'dept'
				}, {
					header : "年龄",
					width : 130,
					dataIndex : 'age'
				}, {
					header : "任期",
					width : 130,
					dataIndex : 'term_life'
				}, {
					header : "是否超过任期",
					width : 130,
					dataIndex : 'yn_life',
					renderer:function(value){return value==1?"是":"否"}
				}]
	}),
	initComponent : function() {
		var grid = this;
		Ext.applyIf(this, {
			tbar : [{
						text : '编辑',
						handler : function() {
							var record = grid.getSelectionModel().getSelected();
							if (record) {
								grid.editorWin(record);
							} else {
								Ext.Msg.alert("提示", "请选择采购员信息!")
							}
						}
					}, '-', '登陆名称:', {
						xtype : 'textfield',
						id : 'purchase_code'
					}, '姓名:', {
						xtype : 'textfield',
						id : 'purchase_name'
					}, '部门:', {
						xtype : 'textfield',
						id : 'dept'
					}, {
						text : '查询',
						handler : function() {
							var purchase_code= Ext.getCmp('purchase_code').getValue();
							var purchase_name= Ext.getCmp('purchase_name').getValue();
							var dept=Ext.getCmp('dept').getValue();
//							if (purchase_code==""&&purchase_name==""&&dept==""){
//								return ;
//							}
							grid.store.baseParams = {
								purchase_code : purchase_code,
								purchase_name : purchase_name,
								dept : dept,
								start : 0,
								limit : 20
							}
							grid.store.load();

						}
					}],
			bbar : new Ext.PagingToolbar({
						pageSize : 20,
						store : this.store,
						displayInfo : true
					})
		})
		buyerInfoManager.mainGrid.superclass.initComponent.call(this);//必须放在末尾,否则出错
	},
	editorWin : function(record) {
		var win = Ext.getCmp('buyerInfoManagerWin');
		if (!win) {
			win = new Ext.Window({
				title : '编辑采购员信息',
				width : 600,
				autoHeight : true,
				items : [new Ext.FormPanel({
					labelAlign : 'top',
					id : 'buyerInfoManagerForm',
					border : false,
					frame : true,
					bodyStyle : 'padding:5px 5px 0',
					// width : 600,
					items : [{
								xtype : 'hidden',
								name : "id"
							}, {
								layout : 'column',
								items : [{
									columnWidth : .5,
									layout : 'form',
									items : [{
												xtype : 'textfield',
												fieldLabel : '登陆名称',
												readOnly :true,
												
												name : 'purchase_code',
												anchor : '95%'
											},{
											xtype:'combo',
												fieldLabel : '性别',
												name : 'purchase_sex',
												anchor : '95%',
												typeAhead : true,// 必须项
												triggerAction : 'all',// 必须项
												lazyRender : true,
												resizable : true,// 是否手动扩展大小,默认false
												mode : 'local',
												forceSelection : true,// 限制输入范围在可选择的文本内
												editable : false,// 不允许输入,只能选择文本列表
												anchor : '95%',
												store : new Ext.data.ArrayStore(
														{
															id : 0,
															fields : ['value',
																	'displayText'],
															data : [['男', '男'],
																	['女','女'],['未知','未知']]
														}),
												valueField : 'value',
												value : '未知',
												hiddenName : 'purchase_sex',// 作为FORM表单提交时的参数名
												displayField : 'displayText'
											}, {
												xtype : 'textfield',
												fieldLabel : '职务',
												name : 'post',
												anchor : '95%',
												readOnly :true
											}, {
												xtype : 'textfield',
												fieldLabel : '年龄',
												name : 'age',
												anchor : '95%'
											}, new Ext.form.ComboBox({
												name : 'yn_life',
												fieldLabel : '是否超过任期',
												typeAhead : true,// 必须项
												triggerAction : 'all',// 必须项
												lazyRender : true,
												resizable : true,// 是否手动扩展大小,默认false
												mode : 'local',
												forceSelection : true,// 限制输入范围在可选择的文本内
												editable : false,// 不允许输入,只能选择文本列表
												anchor : '95%',
												store : new Ext.data.ArrayStore(
														{
															id : 0,
															fields : ['value',
																	'displayText'],
															data : [[1, '是'],
																	[0, '否']]
														}),
												valueField : 'value',
												value : 1,
												hiddenName : 'yn_life',// 作为FORM表单提交时的参数名
												displayField : 'displayText'
											})]
								}, {
									columnWidth : .5,
									layout : 'form',
									items : [{
												xtype : 'textfield',
												fieldLabel : '姓名',
												name : 'purchase_name',
												readOnly:true,
												anchor : '95%'
											}, {
												xtype : 'textfield',
												fieldLabel : '职称',
												name : 'title',
												anchor : '95%'
											}, {
												xtype : 'textfield',
												fieldLabel : '部门',
												name : 'dept',
												readOnly:true,
												anchor : '95%'
											}, {
												xtype : 'textfield',
												fieldLabel : '任期',
												name : 'term_life',
												anchor : '95%'
											}]
								}]
							}]

				})],
				buttons : [{
					text : '确定',
					handler : function() {
						var form = Ext.getCmp('buyerInfoManagerForm');
						if (!form.getForm().isDirty()) {
							win.close();
							return;
						}
						form.getForm().submit({
							clientValidation : true,
							url : '../JSON/buyerRemote.saveBuyerInfo',
							success : function(form, action) {
								if (action.result.success) {
									Ext.getCmp('buyerInfoManagerGrid').store
											.reload();
									win.close();
								} else {
									Ext.Msg.alert('Success', action.result.msg);
								}
							},
							failure : function(form, action) {
								switch (action.failureType) {
									case Ext.form.Action.CLIENT_INVALID :
										Ext.Msg
												.alert('Failure',
														'Form fields may not be submitted with invalid values');
										break;
									case Ext.form.Action.CONNECT_FAILURE :
										Ext.Msg.alert('Failure',
												'Ajax communication failed');
										break;
									case Ext.form.Action.SERVER_INVALID :
										Ext.Msg.alert('Failure',
												action.result.msg);
								}
							}
						});

					}
				}, {
					text : '取消',
					handler : function() {
						win.close();
					}
				}]
			})
		}
		Ext.getCmp('buyerInfoManagerForm').getForm().loadRecord(record);
		win.show();
	}
})