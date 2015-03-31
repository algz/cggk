Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var adduser = {
	adddialog : null,
	addform : null,
	topics : null,
	cs : null,
	userCombo : null,
	depid:null,
	depname:null
};
//增加用户入口
adduser.adduser = function() {
	//departmentUser.codeid = "001";
	Seam.Component.getInstance("base_user_UserSerivce").getCsVo(
			adduser.getadddialog);
};
//增加用户form表单
adduser.getaddform = function() {

	departmentUser.department('' + getResource('resourceParam873') + '');
	departmentUser.departmentCombo.setWidth(162);
	departmentUser.departmentCombo.allowBlank = false;
	//departmentUser.codeid = "001";
	departmentUser.departmentCombo.on('expand', function() {
		departmentUser.treePanel.on('expandnode', function() {
			var node = departmentUser.treePanel.getNodeById(departmentUser.codeid);
			if (node != null) {
				node.select();
			}
		});
		departmentUser.treePanel.getRootNode().expand(true, true);
	});
	Ext.form.Field.prototype.msgTarget = 'qtip';
	adduser.securityDegree1 = null;
	adduser.securityDegree = new Ext.form.ComboBox( {
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
		fieldLabel : getResource('resourceParam1973'),//'密级',
		hiddenName : 'securityDegree',
		valueField : "id",
		displayField : "name",
		mode : 'remote',
		allowBlank : true,
		disabled : false,
		forceSelection : true,
		editable : false,
		triggerAction : 'all',
		emptyText : getResource('resourceParam3003')+/*'请选择密级*/'...',
		labelStyle : 'padding:5px 0px 5px 0px',
		listeners : {
			select : function(combo, record, index) {
				adduser.securityDegree1 = record.get('id');
			},
			beforequery : function(qe) {
				delete qe.combo.lastQuery;
			}
		},
		style : 'margin-bottom: 5px;',
		width : 163
	});
	//增加用户面板
	adduser.addform = new Ext.FormPanel(
			{
				labelWidth : 75, // label settings here cascade unless
				// overridden
				plain : false,
				frame : true,
				bodyStyle : 'padding:5px 5px 0',
				labelWidth : 100,
				items : [
						{
							layout : 'column',
							items : [
									{
										columnWidth : 0.5,
										layout : 'form',
										defaultType : 'textfield',
										items : [ {
											fieldLabel : '' + getResource('resourceParam869') + '',
											name : 'loginname',
											regex : /^([a-zA-Z]|\d|_)*$/,
											regexText : '' + getResource('resourceParam865') + '',
											width : 175,
											minLength : 1,
											maxLength : 20,
											allowBlank : false,
											anchor : '95%'
										} ]
									},
									{
										columnWidth : 0.5,
										layout : 'form',
										defaultType : 'textfield',
										items : [ {
											fieldLabel : '' + getResource('resourceParam872') + '',
											name : 'truename',
											regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|_)*$/,
											regexText : '' + getResource('resourceParam863') + '',
											width : 175,
											minLength : 1,
											maxLength : 20,
											allowBlank : false,
											anchor : '95%'
										} ]
									},
									{
										columnWidth : 0.5,
										layout : 'form',
										defaultType : 'textfield',
										items : [ {
											fieldLabel : '' + getResource('resourceParam870') + '',
											inputType : 'password',
											name : 'newpassword1',
											id : 'newpassword1',
											regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|_)*$/,
											regexText : '' + getResource('resourceParam863') + '',
											width : 175,
											minLength : 1,
											maxLength : 20,
											allowBlank : false,
											value : 123456,
											anchor : '95%',
											listeners : {
												'blur' : function() {
													if ("" != Ext.getCmp(
															'newpassword2')
															.getValue()) {
														Ext.getCmp(
																'newpassword2')
																.validate();
													}
												}
											}
										} ]
									},
									{
										columnWidth : 0.5,
										layout : 'form',
										defaultType : 'textfield',
										items : [ {
											fieldLabel : '' + getResource('resourceParam867') + '',
											inputType : 'password',
											name : 'newpassword2',
											id : 'newpassword2',
											regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|_)*$/,
											regexText : '' + getResource('resourceParam863') + '',
											width : 175,
											minLength : 1,
											maxLength : 20,
											allowBlank : false,
											value : 123456,
											invalidText : '' + getResource('resourceParam871') + '',
											anchor : '95%',
											validator : function() {
												return (Ext.getCmp(
														'newpassword2')
														.getValue() == Ext
														.getCmp('newpassword1')
														.getValue());
											}
										} ]
									},
									{
										columnWidth : 0.5,
										layout : 'form',
										items : [
										// {
										// xtype:'combo',
										// store: new Ext.data.SimpleStore({
										// fields: ["instcode", "name"],
										// data:adduser.cs.instcodelist
										// }),
										// valueField :"instcode",
										// displayField: "name",
										// mode: 'local',
										// forceSelection: true,
										// blankText:'请选择所属机构',
										// emptyText:'选择所属机构',
										// hiddenName:'instcode',
										// editable: false,
										// triggerAction: 'all',
										// allowBlank:false,
										// fieldLabel: '所属机构',
										// name: 'instcode',
										// anchor:'95%'
										// }
										departmentUser.departmentCombo ]
									},
									{
										columnWidth : 0.5,
										layout : 'form',
										items : [ {
											xtype : 'textfield',
											// emptyText : '请输入职业',
											fieldLabel : '' + getResource('resourceParam874') + '',
											name : 'professional',
											maxLength : 99,
											regex : /^([\u0391-\uFFE5]|[ ]|[a-zA-Z]|\d|_)*$/,
											regexText : '' + getResource('resourceParam679') + '，空格和下划线',
											maxLengthText : '' + getResource('resourceParam866') + '',

											anchor : '95%'
										} ]
									} ]
						}, adduser.securityDegree ],
				buttons : [
						{
							text : '' + getResource('resourceParam505') + '',
							handler : function() {
								if (adduser.addform.form.isValid()) {
									if (departmentUser.codeid == 0) {
										Ext.MessageBox
												.show( {
													title : '' + getResource('resourceParam587') + '',
													msg : '' + getResource('resourceParam864') + '',
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.ERROR
												});
										return;
									}
									var userform = Seam.Remoting
											.createType("com.luck.itumserv.base.user.GuserForm");
									Ext.apply(userform, adduser.addform.form
											.getValues());
									userform.setInstcode(departmentUser.codeid);
									userform
											.setSecurityDegree(adduser.securityDegree1);
									Seam.Component.getInstance(
											"base_user_UserSerivce").save(
											userform, adduser.addsave);
								}
							}
						}, {
							text : '' + getResource('resourceParam7007') + '',//取消
							handler : function() {
								adduser.adddialog.hide();
							}
						} ]
			});
	return adduser.addform;
};
//执行完增加用户后执行的方法
adduser.addsave = function(returnvo) {
	if (returnvo.sign == true) {
		Ext.example.msg("" + getResource('resourceParam575') + "",
				returnvo.value);
		user.sm.clearSelections();
		user.baseargs = {
			start : 0,
			limit : 25
		}
		myGrid.loadvalue(user.grid.store, user.baseargs, null);
		adduser.adddialog.hide();
	} else {
		Ext.MessageBox.show( {
			title : '' + getResource('resourceParam634') + '',
			msg : returnvo.value,
			buttons : Ext.MessageBox.OK,
			icon : Ext.MessageBox.ERROR
		});
	}
};
//增加用户对话框
adduser.getadddialog = function(cs) {
	adduser.cs = cs;
	tlework.addHtml(tlework.divHtml, 'adduser');
	if (!adduser.adddialog) {
		adduser.adddialog = new Ext.Window( {
			el : 'adduser',
			title : '' + getResource('resourceParam868') + '',
			layout : 'fit',
			modal : true,
			width : 600,
			height : 190,
			closeAction : 'hide',
			plain : false,
			items : adduser.getaddform()
		});
		adduser.adddialog.on('hide', adduser.close);
	}
	adduser.adddialog.show();
	if(adduser.depid!=null&&adduser.depname!=null)
	{
		departmentUser.codeid = adduser.depid;
		departmentUser.departmentCombo.setTextValue(adduser.depname);
	}
};
//关闭增加用户对话框
adduser.close = function() {
	adduser.addform.form.reset();
	adduser.adddialog.destroy();
	adduser.addform = null;
	adduser.adddialog = null;
};
