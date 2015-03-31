Ext.BLANK_IMAGE_URL = '../lib/ext/resources/images/default/s.gif';
var updatapassword = {
	updatapwdialog : null,
	updatapwform : null
};
//修改用户密码
updatapassword.updatapassword = function() {
	updatapassword.userids = user.useridall();
	if (updatapassword.userids == "false") {
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam904')+'');
		return false;
	}
	if (updatapassword.userids == "admin") {
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam902')+'');
		return false;
	}
	if (updatapassword.userids.length > 1) {
		Ext.MessageBox.alert(''+getResource('resourceParam508')+'', ''+getResource('resourceParam904')+'');
		return false;
	}
	updatapassword.getupdatapwdialog();
};
//修改密码form表单
updatapassword.getupdatapwform = function() {
	updatapassword.updatapwform = new Ext.FormPanel({
				labelWidth : 80, // label settings here cascade unless
				// overridden
				plain : false,
				frame : false,
				bodyStyle : 'padding:5px 5px 0;background:transparent',
				width : 350,
				defaults : {
					width : 230
				},
				defaultType : 'textfield',
				labelWidth : 100,
				items : [{
							fieldLabel : ''+getResource('resourceParam869')+'',
							width : 175,
							name : 'loginname',
							id : 'loginname',
							disabled : true,
							value : [myGrid.rows[0].get('loginname')],
							anchor : '95%'
						}, {
							fieldLabel : ''+getResource('resourceParam872')+'',
							width : 175,
							name : 'truename',
							id : 'truename',
							disabled : true,
							value : [myGrid.rows[0].get('truename')],
							anchor : '95%'
						}, {
							fieldLabel : ''+getResource('resourceParam905')+'',
							width : 175,
							name : 'newpassword1',
							id : 'newpassword1',
							minLength : 1,
							allowBlank : false,
//							emptyText : '请输入新密码',
							maxLength : 20,
							inputType : "password",
							anchor : '95%'
						}, {
							fieldLabel : ''+getResource('resourceParam903')+'',
							width : 175,
							name : 'newpassword2',
							id : 'newpassword2',
							minLength : 1,
							maxLength : 20,
							allowBlank : false,
//							emptyText : '请再次输入新密码',
							inputType : "password",
							anchor : '95%'
						}, {
							fieldLabel : 'userid',
							name : 'userid',
							width : 175,
							inputType : 'hidden',
							value : [myGrid.rows[0].get('userid')],
							anchor : '95%'
						}],
				buttons : [{
					text : ''+getResource('resourceParam505')+'',
					handler : function() {
						if (!updatapassword.updatapwform.getForm().isValid()) {
							return;
						}
						var userform = Seam.Remoting
								.createType("com.luck.itumserv.base.user.GuserForm");
						Ext.apply(userform, updatapassword.updatapwform.form
										.getValues());
						Seam.Component.getInstance("base_user_UserSerivce")
								.updatapassword(userform,
										updatapassword.updatapwsave);
					}
				}, {
					text : ''+getResource('resourceParam3001')+'',
					handler : function() {
						updatapassword.updatapwdialog.hide();
					}
				}]
			});
	return updatapassword.updatapwform;
};
//密码更改后执行的方法
updatapassword.updatapwsave = function(returnvo) {
	if (returnvo.sign == true) {
		Ext.MessageBox.show({
					title : ''+getResource('resourceParam907')+'',
					msg : returnvo.value,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.INFO
				});
		user.sm.clearSelections();
		user.baseargs={start:user.ds.baseParams.start,limit:user.ds.baseParams.limit}
		myGrid.loadvalue(user.grid.store,user.baseargs,null);
		updatapassword.updatapwdialog.hide();
	} else {
		Ext.MessageBox.show({
					title : ''+getResource('resourceParam908')+'',
					msg : returnvo.value,
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.ERROR
				});
	}
};
//更改密码对话框
updatapassword.getupdatapwdialog = function() {
	tlework.addHtml(tlework.divHtml, 'updatapassword');
	if (!updatapassword.updatapwdialog) {
		updatapassword.getupdatapwform();
		updatapassword.updatapwdialog = new Ext.Window({
					el : 'updatapassword',
					title : ''+getResource('resourceParam906')+'',
					layout : 'fit',
					modal : true,
					width : 350,
					height : 200,
					closeAction : 'hide',
					plain : false,
					items : updatapassword.updatapwform
				});
		updatapassword.updatapwdialog.on('hide', updatapassword.close);
	}
	updatapassword.updatapwdialog.show();
};
//关闭对话框
updatapassword.close = function() {
	updatapassword.updatapwform.form.reset();
	updatapassword.updatapwdialog.destroy();
	updatapassword.updatapwform = null;
	updatapassword.updatapwdialog = null;
};
