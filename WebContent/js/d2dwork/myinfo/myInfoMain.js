Ext.onReady(myInfoMain);
Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget = 'side';
var myInfoMain = {
	grid : null,
	colModel : null,
	ds : null,
	tb : null,
	baseargs : null
}
var myinforoot = new Ext.tree.TreeNode({
			id : 'myinforoot',
			text : '' + getResource('resourceParam1387') + ''
		});
var myData = new Ext.tree.TreeNode({
			id : 'myData',
			text : '' + getResource('resourceParam1388') + ''// 我的资料
		});
var updateData = new Ext.tree.TreeNode({
			id : 'updateData',
			text : '' + getResource('resourceParam1389') + ''
		});
var updatePassword = new Ext.tree.TreeNode({
			id : 'updatePassword',
			text : '' + getResource('resourceParam780') + '' // 修改 密码
		});
var departuser = new Ext.tree.TreeNode({
			id : 'departuser',
			text : '' + getResource('resourceParam1398') + ''
		});
var coommunicationRecord = new Ext.tree.TreeNode({
	id : 'coommunicationRecord',
	text : getResource('resourceParam5017')
		// 通迅录
	});
myinforoot.appendChild(myData);
// myinforoot.appendChild(updateData);
myinforoot.appendChild(updatePassword);
myinforoot.appendChild(coommunicationRecord);
// myinforoot.appendChild(departuser);
var infoTree = new Ext.tree.TreePanel({
			region : 'west',
			width : 200,

			title : '' + getResource('resourceParam1390') + ''

		});
infoTree.setRootNode(myinforoot);

infoTree.on('click', clickFun);
function clickFun(node) {
	if (node.id != 'myinforoot') {
		// var abc=userinfo_UserInfoRemote.getUserById;
		// alert(abc);

		var nodeId = node.id;
		if (nodeId == 'myData') {

			Ext.getCmp('content_panel').layout.setActiveItem(updateForm);
		} else if (nodeId == 'updatePassword') {
			Ext.getCmp('content_panel').layout
					.setActiveItem(updatePasswordForm);
		} else if (nodeId == 'updateData') {
			explainFormLoad();
			Ext.getCmp('content_panel').layout.setActiveItem(explainForm);
		} else if (nodeId == 'departuser') {
			showdep();
		} else if (nodeId == 'coommunicationRecord') {
			Ext.getCmp('content_panel').layout.setActiveItem(cr);

			myInfoMain.baseargs = {
				findloginname : '',
				findtruename : '',
				findinstcode : ''
			}
			myGrid.loadvalue(ds, {
						start : 0,
						limit : 25
					}, myInfoMain.baseargs);
		}
	}
}
var panel1 = new Ext.Panel({
			width : 150,
			height : 150,
			title : 'abccc'

		});

var comboPanel = new Ext.form.ComboBox({
	mode : 'local',
	store : new Ext.data.SimpleStore({
				fields : [],
				date : [[]]
			}),
	maxHeight : 200,
	triggerAction : 'all',
	tpl : '<tpl for="."> <div style="height:200px"><div id="panel1"></div></div></tpl>',
	selectedClass : ''

});
comboPanel.on('expand', function() {
		});
var checkForm = new Ext.form.FormPanel({
			id : 'checkForm',
			bodyStyle : 'padding:5px 5px 0',
			frame : false,
			labelWidth : 35,
			items : [comboPanel]

		});
var win = new Ext.Window({

			layout : 'fit',
			id : 'win',
			title : '' + getResource('resourceParam1398') + '',
			width : 500,
			height : 300,
			closable : true,
			closeAction : 'hide',
			items : [checkForm]
		});

function showdep() {

	win.show();
}

var loginname = new Ext.form.TextField({
			id : 'loginname',
			fieldLabel : '' + getResource('resourceParam887') + '',
			maxLength : 20,
			style : 'margin-bottom: 5px;',
			maxLengthText : '' + getResource('resourceParam1378') + '20',
			allowBlank : false,
			blankText : '' + getResource('resourceParam1383') + '',
			regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
			regexText : '' + getResource('resourceParam1092') + '!',
			readOnly : true

		});
var truename = new Ext.form.TextField({
			id : 'truename',
			fieldLabel : '' + getResource('resourceParam872') + '',
			style : 'margin-bottom: 5px;',
			maxLength : 20,
			maxLengthText : '' + getResource('resourceParam1376') + '20',
			allowBlank : false,
			blankText : '' + getResource('resourceParam1379') + '',
			regex : /^([\u0391-\uFFE5]|[a-zA-Z]|\d|[,.])*$/,
			regexText : '' + getResource('resourceParam1092') + '!'
		});
var description = new Ext.form.TextField({
			id : 'description',
			style : 'margin-bottom: 5px;',
			fieldLabel : '' + getResource('resourceParam1391') + '',
			maxLength : 50,
			maxLengthText : '' + getResource('resourceParam467') + ''
					+ getResource('resourceParam9030') + ''
		});
var sexType = [['1', '男'], ['2', '女']];
var sex = new Ext.form.ComboBox({
			id : 'sex',
			fieldLabel : '' + getResource('resourceParam936') + '',
			triggerAction : 'all',
			style : 'margin-bottom: 5px;',
			mode : 'local',
			width : 80,
			editable : false,
			store : new Ext.data.SimpleStore({
						fields : ['value', 'text'],
						data : sexType
					}),
			valueField : 'value',
			displayField : 'text'

		});
// sex.on('expand', function() {
// alert('ff');
// });

var age = new Ext.form.NumberField({
			id : 'age',
			fieldLabel : '' + getResource('resourceParam937') + '',
			style : 'margin-bottom: 5px;',
			regex : /^-?[1-9]*[1-9][0-9]*$|^0$/,
			regexText : '' + getResource('resourceParam1384') + '!',
			maxLength : 3,
			maxLengthText : '' + getResource('resourceParam1386') + '3',
			minValue : 16,
			minText : '年龄太小不能注册！',
			maxValue : 100,
			maxText : '' + getResource('resourceParam1385') + '100!'

		});
var address = new Ext.form.TextField({
			id : 'address',
			style : 'margin-bottom: 5px;',
			fieldLabel : '' + getResource('resourceParam497') + '',
			maxLength : 100,
			maxLengthText : '' + getResource('resourceParam1381') + '100'
		});
var postcode = new Ext.form.NumberField({
			id : 'postcode',
			fieldLabel : '' + getResource('resourceParam938') + '',
			style : 'margin-bottom: 5px;',
			maxLength : 6,
			maxLengthText : '' + getResource('resourceParam1382') + '6',
			regex : /^[1-9]\d{5}$/,
			regexText : '邮编格式不正确!'

		});
var tel1 = new Ext.form.TextField({
			id : 'tel1',
			fieldLabel : '手机号码',
			maxLength : 20,
			maxLengthText : '长度不能超过20',
			style : 'margin-bottom: 5px;',
			//bug:788 可以输入数字（）-三种字符，数量为20个  gaoyn 2011-5-25 11:17
			regex : /^[0-9-()]*$/,
			regexText : '只能输入数字()-三种字符!'
		});
var tel2 = new Ext.form.TextField({
			id : 'tel2',
			fieldLabel : '' + getResource('resourceParam1393') + '',
			 maxLength : 12,
			 maxLengthText : '' + getResource('resourceParam1377') + '12',
			regex : /^\d{3}-\d{8}|\d{4}-\d{7}$/,
			regexText : '电话号码格式不正确(如:0730-3687732)!'
		});
var regtime = new Ext.form.TimeField({
			id : 'regtime',
			style : 'margin-bottom: 5px;',
			fieldLabel : '' + getResource('resourceParam1394') + ''
		});
var accountstate = new Ext.form.ComboBox({
			id : 'accountstate',
			style : 'margin-bottom: 5px;',
			fieldLabel : '' + getResource('resourceParam1395') + ''
		});
var judgeman = new Ext.form.ComboBox({
			id : 'judgeman',
			style : 'margin-bottom: 5px;',
			fieldLabel : 'XXXX'
		});
var viewLevel = new Ext.form.ComboBox({
			id : 'viewLevel',
			style : 'margin-bottom: 5px;',
			fieldLabel : '' + getResource('resourceParam1399') + ''
		});
var logLevel = new Ext.form.ComboBox({
			id : 'logLevel',
			style : 'margin-bottom: 5px;',
			fieldLabel : 'logLevel'
		});
var userid = new Ext.form.TextField({
			id : 'userid',
			style : 'margin-bottom: 5px;',
			hidden : true,
			inputType : 'hidden'
		});
var email = new Ext.form.TextField({
			id : 'email',
			fieldLabel : getResource('resourceParam5018'),// 邮件地址
			style : 'margin-bottom: 5px;',
			vtype : 'email',
			/**
			 * bug编号966 wangyf
			 * bug信息：邮件地址如果超长，保存时系统提示失败
			 * 注：修改为长度为20个字符
			 * 2011-06-03 10：09 
			 */
			maxLength : 50,
			vtypeText : '不是有效的邮箱地址!'
		});
var updateForm = new Ext.form.FormPanel({

			id : 'updateForm',
			title : '' + getResource('resourceParam1392') + '',
			bodyStyle : 'padding:5px 5px 0',

			defaults : {
				anchor : '61%',
				msgTarget : 'side'
			},
			items : [loginname, truename, sex, age, address, postcode, tel1,
					tel2, email, description],
			buttons : [{
						text : getResource('resourceParam5019'),// 保存
						handler : updateUser
					}]

		});
function updateUser() {
	if (!updateForm.getForm().isValid()) {
		return;
	} else if (updateForm.getForm().isValid()) {
		//bug：863 gaoyn  
		var guser = Seam.Remoting.createType("com.luck.itumserv.entity.Guser");
		Ext.apply(guser, updateForm.getForm().getValues());
		guser.setSex(updateForm.getComponent("sex").value);
		callSeam("userinfo_UserInfoRemote", "updateUser", [guser],
				updateCallBack);

	}


}
function updateCallBack(result) {
	if (result == 'true') {
		Ext.Msg.alert("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam677') + "");
		// userformload();
	} else {
		Ext.Msg.alert("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam572') + "")
		userformload();
	}
}
// 修改密码
var updatePasswordForm = new Ext.form.FormPanel({

			labelWidth : 75, // label settings here cascade unless overridden
			frame : false,
			plain : false,
			bodyStyle : 'padding:5px 5px 0',
			defaultType : 'textfield',
			defaults : {
				msgTarget : 'side'
			},
			items : [ // 定义面板中的表单元素
			{
				inputType : 'hidden',
				id : 'usersid',
				name : 'usersid',
				width : 175
					// ,value : Index.user.userid
				}, {
				fieldLabel : '' + getResource('resourceParam777') + '',
				id : 'oldpassword',
				style : 'margin-bottom: 5px;',
				name : 'oldpassword',
				width : 175,
				blankText : '请' + getResource('resourceParam494') + '旧的登陆'
						+ getResource('resourceParam468') + '',
				allowBlank : false,
				inputType : "password"
			}, {
				fieldLabel : '' + getResource('resourceParam778') + '',
				id : 'newpassword1',
				style : 'margin-bottom: 5px;',
				name : 'newpassword1',
				width : 175,
				blankText : '请' + getResource('resourceParam494') + '新的登陆'
						+ getResource('resourceParam468') + '',
				allowBlank : false,
				inputType : "password"
			}, {
				fieldLabel : '' + getResource('resourceParam779') + '',
				id : 'newpassword2',
				style : 'margin-bottom: 5px;',
				name : 'newpassword2',
				width : 175,
				blankText : '请再次' + getResource('resourceParam494') + '新的登陆'
						+ getResource('resourceParam468') + '',
				allowBlank : false,
				inputType : "password",
				validationEvent : false,
				validator : function() {
					var newpassword1 = updatePasswordForm
							.getComponent('newpassword1');

					var newpassword1 = Ext.getCmp('newpassword1');
					var newpassword2 = Ext.getCmp('newpassword2');

					var newpassword2 = updatePasswordForm
							.getComponent('newpassword2');
					if (newpassword1.el.dom.value != newpassword2.el.dom.value) {
						newpassword2.invalidText = ''
								+ getResource('resourceParam775') + '';
						newpassword1.focus();
						return false;
					} else {
						return true;
					}
				}
			}],
			buttons : [{
				text : '' + getResource('resourceParam505') + '',
				handler : function() {

					if (updatePasswordForm.getForm().isValid()) {
						var userform = Seam.Remoting
								.createType("com.luck.itumserv.base.user.GuserForm");
						Ext.apply(userform, updatePasswordForm.getForm()
										.getValues());
						// Seam.Component.getInstance("base_user_UserSerivce")
						// .updataPassWord(userform, pwdUpdateCallBack);
						callSeam("base_user_UserSerivce", "updataPassWord",
								[userform], pwdUpdateCallBack);

					}

				}
			}, {
				text : '' + getResource('resourceParam606') + '',
				handler : function() {
					updatePasswordForm.form.reset(); // 表单重置
					// pwdUpdate.pwdDialog.hide();
					// pwdUpdate.pwdDialog.destroy(); // 摧毁当前元素相关的所有对象，包括Div等
					// pwdUpdate.pwdDialog = null;
				}
			}]
		});
pwdUpdateCallBack = function(result) {

	var sign = result.sign;
	if (sign == true) {

		Ext.MessageBox.show({
					title : getResource('resourceParam1072'),// 保存成功
					msg : '' + getResource('resourceParam776') + '',
					buttons : Ext.MessageBox.OK
				});

	} else {
		Ext.MessageBox.show({
					title : '' + getResource('resourceParam634') + '',
					msg : result.value,
					buttons : Ext.MessageBox.OK
				});

	}

};
// 修改说明档
var explaininfo = new Ext.form.TextArea({
			id : 'explaininfo',
			width : 500,
			height : 300,
			fieldLabel : '' + getResource('resourceParam1397') + '',
			maxLength : 99,
			maxLengthText : '' + getResource('resourceParam866') + ''
		});

var explainForm = new Ext.form.FormPanel({
			id : 'explainForm',

			// items : [description],
			buttons : [{
						text : '' + getResource('resourceParam478') + '',
						handler : updateDescription
					}]
		});
function updateDescription() {
	var guserDesc = Seam.Remoting.createType("com.luck.itumserv.entity.Guser");
	
	guserDesc
			.setDescription(explainForm.getComponent("description").getValue());
	callSeam("userinfo_UserInfoRemote", "updateUserDesc", [guserDesc],
			updateDescriptionCallBack);
}
function updateDescriptionCallBack(result) {
	if (result == 'true') {
		Ext.Msg.alert("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam677') + "!");
		// userformload();
	} else {
		Ext.Msg.alert("" + getResource('resourceParam575') + "", ""
						+ getResource('resourceParam572') + "!")
		// explainFormLoad();
	}
}
function explainFormLoad() {
	explainForm.getForm().load({
				url : '../JSON/userinfo_UserInfoRemote.getUserById?id=1',
				method : 'GET',
				success : function(form, action) {

				}
			});
}
var userInfoStore = new Ext.data.Store({
			id : "userInfoStore",
			proxy : new Ext.data.HttpProxy({
						url : '../JSON/userinfo_UserInfoRemote.getUserById?id=1'
					}),
			reader : new Ext.data.JsonReader({

			})
		});

var sm = new Ext.grid.CheckboxSelectionModel();
var colModel = new Ext.grid.ColumnModel([sm,
// {
		// header : "用户ID",
		// width : 100,
		// dataIndex : 'userid'
		// },
		{
	header : "" + getResource('resourceParam878') + "",
	width : 100,
	dataIndex : 'truename'
}, {
	header : "" + getResource('resourceParam874') + "",
	width : 100,
	dataIndex : 'professional'
}, {
	header : "" + getResource('resourceParam882') + "",
	width : 100,
	dataIndex : 'ginstitutename'
}, {
	header : getResource('resourceParam5020') + '1',
	width : 100,
	dataIndex : 'tel1'
}, {
	header : getResource('resourceParam5020') + '2',
	width : 100,
	dataIndex : 'tel2'
}, {
	header : getResource('resourceParam5018'),
	width : 100,
	dataIndex : 'email',
	renderer : function(value, cellmeta, record, rowIndex, columnIndex, store) {
		var name = '';
		if (value.length > 45) {
			for (i = 0; i < value.length; i = i + 45) {
				name = name + value.substring(i, i + 45) + ' ';
			}
		} else {
			name = value;
		}
		return '<font ext:qtip="' + name + '">' + value + '</font>';
	}
}]);
var url = "../JSON/base_user_UserSerivce.getGrid";
var proxy = new Ext.data.HttpProxy({
			url : url,
			method : 'POST'
		});
var reader = new Ext.data.JsonReader({
			root : 'results',
			totalProperty : 'totalProperty',
			id : 'userid'
		}, ['userid', 'loginname', 'truename', 'strsex', 'sex', 'accountstate',
				'straccountstate', 'instcode', 'ginstitutename', 'password',
				'age', 'address', 'postcode', 'tel1', 'tel2', 'judgeman',
				'viewLevel', 'rolename', 'logLevel', 'professional',
				'securityDegreeName', 'securityDegree', 'email']);
var ascid = 'userid';
var ascstr = 'desc';
var ds = new data.Store(proxy, reader, ascid, ascstr);
ds.on('datachanged', function(ds) {
			if (finduser.sel && ds.getCount() == 0) {
				Ext.MessageBox.alert('' + getResource('resourceParam508') + '',
						"" + getResource('resourceParam765') + "");
			}
		});
var grid = myGrid.initBox(ds, colModel, null, sm);
var cr = new Ext.Panel({
	layout : 'fit',
	tbar : [{
		text : getResource('resourceParam652'),
		iconCls : 'user-select',
		handler : function() {
			departmentUser
					.department('' + getResource('resourceParam873') + '');
			departmentUser.departmentCombo.setWidth(180);
			var findform = new Ext.FormPanel({
				labelWidth : 75, // label settings here cascade unless
				// overridden
				plain : false,
				frame : false,
				bodyStyle : 'padding:5px 5px 0;background:transparent',
				defaultType : 'textfield',
				items : [{
							fieldLabel : '' + getResource('resourceParam872')
									+ '',
							width : 180,
							name : 'findtruename',
							id : 'findtruename',
							minLength : 1,
							maxLength : 20
						}, departmentUser.departmentCombo

				],
				buttons : [{
					text : '' + getResource('resourceParam505') + '',
					handler : function() {
						if (departmentUser.codeid == 0) {
							Ext.MessageBox.show({
								title : '' + getResource('resourceParam587')
										+ '',
								msg : '' + getResource('resourceParam864') + '',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.ERROR
							});
							return;
						}
						myInfoMain.baseargs = {
							// findloginname :
							// findform.form.getValues().findloginname,
							findtruename : findform.form.getValues().findtruename,
							findinstcode : departmentUser.codeid
						}
						sm.clearSelections();
						myGrid.loadvalue(ds, {
									start : 0,
									limit : 25
								}, myInfoMain.baseargs);
						// user.loadvalue();
						win.close();
					}
				}, {
					text : '取消',
					handler : function() {
						win.close();
					}
				}]
			});
			var win = new Ext.Window({
						title : '' + getResource('resourceParam652') + '',
						layout : 'fit',
						modal : true,
						width : 300,
						height : 160,
						closeAction : 'close',
						plain : false,
						items : [findform]
					});
			win.show();
			win.close = function() {
				departmentUser.codeid=null;
				findform.form.reset();
				win.destroy();
				findform = null;
				win = null;
				myInfoMain.baseargs = {
					findtruename : '',
					findinstcode : ''
				};
			};
		}
	}],
	items : [grid]
});
function myInfoMain() {

	// userInfoStore.reload();
	userformload();
	//
	new Ext.Viewport({

				layout : 'border',
				fitToFrame : true,
				items : [infoTree, {
							id : 'content_panel',
							region : 'center',

							layout : 'card',
							// margins:'2 5 5 0',
							activeItem : 0,
							border : false,
							items : [updateForm, updatePasswordForm,
									explainForm, cr]

						}]
			});

}
function userformload() {
	updateForm.getForm().load({
				url : '../JSON/userinfo_UserInfoRemote.getUserById?id=1',
				method : 'GET',
				success : function(form, action) {

				}
			});

}

// var deleteflag ;
// var userImage=new Ext.form.;
