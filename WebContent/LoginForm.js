var LoginForm = null;
function zhuxiao() {

};

Ext.onReady(function() {
	Ext.QuickTips.init();
	var callback = function(result) {
		if (result != "") {
			alert(result);
		}
	}

	function docacle() {
		document.getElementById("loginName").value = '';
		document.getElementById("loginpassword").value = '';
	}

	LoginForm = new Ext.FormPanel({
				labelWidth : 70, // label settings here cascade unless
									// overridden
				frame : true,

				hideParent : true,

				hideMode : true,
				hideCollapseTool : true,
				hideBorders : true,
				plain : false,
				shadow : false,
				bodyBorder : false,
				border : false,
				width : 360,
				animCollapse : false,
				bodyStyle : 'padding:0px 0px 5,5;background-color:7998cf',
				onSubmit : Ext.emptyFn,
				submit : function() {
					if (navigator.lang) {
						this.getEl().dom.action = 'base/login.seam?lang='
								+ navigator.lang;
					} else {
						this.getEl().dom.action = 'base/login.seam';
					}
					this.getEl().dom.method = "POST";
					this.getEl().dom.submit();
				},
				items : [{
					layout : 'column',
					items : [{
						columnWidth : .49,
						layout : 'form',

						items : [{
							xtype : 'textfield',
							fieldLabel : '<font color="white">'
									+ getResource('resourceParam1847')
									+ '</font>',
							id : 'loginName',
							name : 'username',
							anchor : '95%',
							maxLength : 20,
							value:'jsjhy'
						}]
					}, {
						columnWidth : .49,
						layout : 'form',
						items : [{
							xtype : 'textfield',
							fieldLabel : '<font color="white">'
									+ getResource('resourceParam468')
									+ '</font>',
							id : 'loginpassword',
							inputType : 'password',
							name : 'password',
							anchor : '95%',
							maxLength : 20,
							value:'1'
						}]
					}
					]
				}]
			});

	LoginForm.tijaio = function doLogin() {
		if (LoginForm.form.isValid()) {
			LoginForm.getForm().submit();
		}
	}

	LoginForm.tijaio = function() {
		if (LoginForm.form.isValid()) {
			var name = LoginForm.getForm().getValues().username;
			var password = LoginForm.getForm().getValues().password;
			Seam.Component.getInstance("auth").checkUser(name, password,
					function(result) {
						if (result == "true") {
							LoginForm.getForm().submit();
						} else {
							docacle();
							alert(result);
						}
					});
		}
        
	}
	new Ext.KeyMap(document, {
				key : Ext.EventObject.ENTER,
				fn : LoginForm.tijaio,
				scope : this
			});

	if (Ext.get("loginFormDeng")) {
		LoginForm.render(Ext.get("loginFormDeng"));
		var loginName = Ext.get('loginName');
		loginName.focus();
	}

	});
